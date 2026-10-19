/**
 * Fundament für alle größeren KI-Aufgaben (Import, Überarbeitung):
 *   - Drosselung: höchstens AI_MAX_CONCURRENCY Aufrufe gleichzeitig (über alle Anfragen hinweg),
 *     damit das Token-Limit des Anbieters nicht überläuft
 *   - Wiederholung bei abgebrochenem Stream, Stille (Leerlauf-Zeitlimit) und ungültigem JSON;
 *     HTTP-Fehler wie 429/5xx wiederholt bereits aiPost
 *   - Ausweichmodell (AI_FALLBACK_MODEL), wenn das Hauptmodell wiederholt scheitert
 *   - abgeschnittene Antworten werden als AiTruncatedError gemeldet - der Aufrufer teilt dann
 *     die Arbeit auf, statt aufzugeben
 *   - Protokoll jedes Aufrufs (Modell, Dauer, Token, Fehler) über einen austauschbaren Ausgang
 *   - Schritt-Zwischenspeicher: bricht die Verbindung ab, liefert ein erneuter Aufruf mit
 *     derselben Auftragskennung fertige Schritte sofort, statt sie neu zu rechnen
 */

import { HttpError } from '../auth.ts'
import { AI_FALLBACK_MODEL, AI_PLAN_MODEL, aiPost, getAiProvider, modelId, readSse } from './aiGateway.ts'

export class AiTruncatedError extends HttpError {
  constructor() {
    super(502, 'Die KI-Antwort war zu lang und wurde abgeschnitten.')
  }
}

export interface AiLogEntry {
  label: string
  model: string
  status: 'ok' | 'error' | 'truncated'
  duration_ms: number
  input_tokens: number
  output_tokens: number
  attempts: number
  error: string | null
}

let logSink: ((e: AiLogEntry) => void) | null = null
/** Ausgang für das Aufrufprotokoll (wird beim Start mit der Datenbank verbunden). */
export function setAiLogSink(fn: ((e: AiLogEntry) => void) | null): void {
  logSink = fn
}
function log(e: AiLogEntry): void {
  const line = `[ki] ${e.label} · ${e.model} · ${e.status} · ${(e.duration_ms / 1000).toFixed(1)} s · ${e.input_tokens}/${e.output_tokens} Token${e.attempts > 1 ? ` · ${e.attempts} Versuche` : ''}${e.error ? ` · ${e.error}` : ''}`
  if (e.status === 'ok') console.info(line)
  else console.warn(line)
  try {
    logSink?.(e)
  } catch {
    /* Protokoll darf nie die eigentliche Arbeit stören */
  }
}

// ---------------------------------------------------------------- Drosselung
const MAX_CONCURRENCY = Math.max(1, Number(process.env['AI_MAX_CONCURRENCY']) || 4)
let active = 0
const waiting: (() => void)[] = []
async function acquire(): Promise<void> {
  if (active < MAX_CONCURRENCY) {
    active++
    return
  }
  await new Promise<void>((resolve) => waiting.push(resolve))
}
function release(): void {
  const next = waiting.shift()
  if (next) next()
  else active--
}

// ---------------------------------------------------------------- Schritt-Zwischenspeicher
export interface StepCache {
  get(key: string): Promise<unknown>
  set(key: string, value: unknown): Promise<void>
}

/** Führt einen Schritt aus oder liefert sein gespeichertes Ergebnis (bei Wiederaufnahme nach Abbruch). */
export async function cachedStep<T>(cache: StepCache | undefined, key: string, fn: () => Promise<T>): Promise<T> {
  const TRUNCATED = { __ki_abgeschnitten: true }
  if (cache) {
    const hit = await cache.get(key).catch(() => undefined)
    // Auch „Antwort war zu lang“ wird gemerkt - bei der Wiederaufnahme wird gleich kleiner geteilt statt erneut zu warten
    if (hit && typeof hit === 'object' && '__ki_abgeschnitten' in hit) throw new AiTruncatedError()
    if (hit !== undefined && hit !== null) return hit as T
  }
  let value: T
  try {
    value = await fn()
  } catch (e) {
    if (e instanceof AiTruncatedError && cache) await cache.set(key, TRUNCATED).catch(() => {})
    throw e
  }
  if (cache) await cache.set(key, value).catch(() => {})
  return value
}

/** Kurze, stabile Prüfsumme für Schritt-Schlüssel (gleicher Inhalt → gleicher Schlüssel). */
export function stepHash(text: string): string {
  let h = 5381
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) | 0
  return `${text.length.toString(36)}${(h >>> 0).toString(36)}`
}

// ---------------------------------------------------------------- strukturierter Aufruf
export interface AiJsonOptions {
  /** Kurzer Name für Protokoll und Fehlermeldungen, z. B. „Import Teil 3/9“ */
  label: string
  system: string
  user: string
  schema: object
  schemaName: string
  effort?: 'low' | 'medium' | 'high'
  maxOutputTokens?: number
  /** Wird mit der Anzahl der Treffer von progressPattern im bisher empfangenen Text aufgerufen */
  onProgress?: (count: number) => void
  progressPattern?: RegExp
  /** Ohne jedes Lebenszeichen der KI so lange warten, dann neu versuchen (Denkmodelle schweigen anfangs lange) */
  idleTimeoutMs?: number
  signal?: AbortSignal
}

const ATTEMPTS = 3

/**
 * Ein strukturierter KI-Aufruf (Responses API, Streaming, striktes JSON-Schema) mit
 * Drosselung, Wiederholung, Ausweichmodell und Protokoll. Liefert das geparste JSON.
 */
export async function aiJson<T = unknown>(o: AiJsonOptions): Promise<T> {
  const provider = getAiProvider()
  if (!provider) throw new HttpError(503, 'KI ist nicht konfiguriert.')
  const started = Date.now()
  let lastError: unknown = null
  let usage = { input: 0, output: 0 }
  let modelUsed = AI_PLAN_MODEL

  await acquire()
  try {
    for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
      // Letzter Versuch mit dem Ausweichmodell, sofern eines eingestellt ist
      modelUsed = attempt === ATTEMPTS && AI_FALLBACK_MODEL ? AI_FALLBACK_MODEL : AI_PLAN_MODEL
      const ctrl = new AbortController()
      const onAbort = () => ctrl.abort(o.signal?.reason)
      o.signal?.addEventListener('abort', onAbort, { once: true })
      let idle: ReturnType<typeof setTimeout> | null = null
      const idleMs = o.idleTimeoutMs ?? 240_000
      const touch = () => {
        if (idle) clearTimeout(idle)
        idle = setTimeout(() => ctrl.abort(new Error('Zeitüberschreitung: keine Antwort der KI')), idleMs)
      }
      try {
        touch()
        const res = await aiPost('/responses', {
          model: modelId(provider, modelUsed),
          stream: true,
          instructions: o.system,
          input: [{ role: 'user', content: [{ type: 'input_text', text: o.user }] }],
          reasoning: { effort: o.effort ?? 'medium' },
          text: { format: { type: 'json_schema', name: o.schemaName, strict: true, schema: o.schema } },
          store: false,
          max_output_tokens: o.maxOutputTokens ?? 32_000,
        }, { provider, signal: ctrl.signal })

        let out = ''
        let incomplete = false
        let lastCount = 0
        for await (const ev of readSse(res)) {
          touch()
          if (ev.type === 'response.output_text.delta' && typeof ev.delta === 'string') {
            out += ev.delta
            if (o.onProgress && o.progressPattern) {
              const count = (out.match(o.progressPattern) ?? []).length
              if (count > lastCount) {
                lastCount = count
                o.onProgress(count)
              }
            }
          } else if (ev.type === 'response.completed' || ev.type === 'response.incomplete') {
            const r = ev.response as { output_text?: string; usage?: { input_tokens?: number; output_tokens?: number } } | undefined
            if (!out && r?.output_text) out = r.output_text
            usage = { input: r?.usage?.input_tokens ?? usage.input, output: r?.usage?.output_tokens ?? usage.output }
            if (ev.type === 'response.incomplete') incomplete = true
          } else if (ev.type === 'error' || ev.type === 'response.failed') {
            throw new HttpError(502, `KI-Fehler: ${JSON.stringify(ev).slice(0, 200)}`)
          }
        }
        if (incomplete) {
          // Parsebar trotz „incomplete“? Dann nehmen wir es (selten); sonst ehrlich als abgeschnitten melden.
          try {
            const parsed = JSON.parse(out) as T
            log({ label: o.label, model: modelUsed, status: 'ok', duration_ms: Date.now() - started, input_tokens: usage.input, output_tokens: usage.output, attempts: attempt, error: null })
            return parsed
          } catch {
            log({ label: o.label, model: modelUsed, status: 'truncated', duration_ms: Date.now() - started, input_tokens: usage.input, output_tokens: usage.output, attempts: attempt, error: null })
            throw new AiTruncatedError()
          }
        }
        if (!out.trim()) throw new HttpError(502, 'Die KI hat keine verwertbare Antwort geliefert.')
        const parsed = JSON.parse(out) as T
        log({ label: o.label, model: modelUsed, status: 'ok', duration_ms: Date.now() - started, input_tokens: usage.input, output_tokens: usage.output, attempts: attempt, error: null })
        return parsed
      } catch (e) {
        if (e instanceof AiTruncatedError) throw e
        if (o.signal?.aborted) throw e
        lastError = e
        // Endgültige Fehler (Guthaben, Zugriff, Konfiguration) nicht wiederholen
        if (e instanceof HttpError && [400, 401, 402, 403, 503].includes(e.status)) break
      } finally {
        if (idle) clearTimeout(idle)
        o.signal?.removeEventListener('abort', onAbort)
      }
    }
  } finally {
    release()
  }
  const msg = lastError instanceof Error ? lastError.message : String(lastError)
  log({ label: o.label, model: modelUsed, status: 'error', duration_ms: Date.now() - started, input_tokens: usage.input, output_tokens: usage.output, attempts: ATTEMPTS, error: msg.slice(0, 300) })
  if (lastError instanceof HttpError) throw lastError
  if (lastError instanceof SyntaxError) throw new HttpError(502, `${o.label}: Die KI-Antwort war mehrfach kein gültiges JSON.`)
  throw new HttpError(502, `${o.label}: ${msg}`)
}

/** Kleine Hilfe für parallele Teilaufgaben mit fester Gleichzeitigkeit (Ergebnis in Eingabereihenfolge). */
export async function runPool<T, R>(items: T[], concurrency: number, fn: (item: T, index: number) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length)
  let next = 0
  const worker = async () => {
    while (next < items.length) {
      const i = next++
      out[i] = await fn(items[i]!, i)
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker))
  return out
}
