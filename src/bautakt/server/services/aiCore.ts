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

import Anthropic from '@anthropic-ai/sdk'
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

// ---------------------------------------------------------------- Modellwahl
/** Claude-Modelle laufen über die Anthropic-API, alles andere über OpenAI bzw. das Lovable-Gateway. */
const isClaude = (model: string) => /^(anthropic\/)?claude-/.test(model)

/** Modell für Planung und Import (AI_PLAN_MODEL, z. B. „o3-mini“ oder „claude-sonnet-5-5“) - bei jedem Aufruf neu gelesen. */
export function planModel(): string {
  return process.env['AI_PLAN_MODEL'] || AI_PLAN_MODEL
}

/** Ist für das eingestellte Planungsmodell ein Zugang hinterlegt? */
export function planAiConfigured(): boolean {
  return isClaude(planModel()) ? !!process.env['ANTHROPIC_API_KEY'] : !!getAiProvider()
}

let anthropic: Anthropic | null = null
function anthropicClient(): Anthropic {
  const apiKey = process.env['ANTHROPIC_API_KEY']
  if (!apiKey) throw new HttpError(503, 'Für Claude ist kein ANTHROPIC_API_KEY hinterlegt.')
  // Das SDK wiederholt 408/409/429/5xx und Verbindungsfehler selbst (mit Retry-After)
  // Schlüssel ohne Workspace-Bindung brauchen die Workspace-ID als Kopfzeile (ANTHROPIC_WORKSPACE_ID)
  const workspace = process.env['ANTHROPIC_WORKSPACE_ID']
  if (!anthropic) anthropic = new Anthropic({ apiKey, maxRetries: 5, timeout: 20 * 60_000, ...(workspace ? { defaultHeaders: { 'anthropic-workspace-id': workspace } } : {}) })
  return anthropic
}

/**
 * Schema für Claude anpassen: Anthropic begrenzt Felder mit „Wert oder null“ (Typ-Listen/anyOf)
 * auf 16 je Anfrage. Solche Felder werden darum zu optionalen Feldern (Grenze 24) - ein
 * fehlendes Feld bedeutet „leer“, genau wie null in unserem Code.
 */
export function toClaudeSchema(schema: unknown): unknown {
  if (Array.isArray(schema)) return schema.map(toClaudeSchema)
  if (!schema || typeof schema !== 'object') return schema
  const src = schema as Record<string, unknown>
  const nullable = (p: unknown) => {
    const q = p as { type?: unknown; enum?: unknown[] } | null
    return (Array.isArray(q?.type) && q!.type.includes('null')) || (Array.isArray(q?.enum) && q!.enum.includes(null))
  }
  const stripNull = (p: unknown): unknown => {
    if (!p || typeof p !== 'object') return p
    const q = { ...(p as Record<string, unknown>) }
    if (Array.isArray(q.type)) {
      const types = (q.type as string[]).filter((t) => t !== 'null')
      q.type = types.length === 1 ? types[0] : types
    }
    if (Array.isArray(q.enum)) q.enum = (q.enum as unknown[]).filter((v) => v !== null)
    return q
  }
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(src)) {
    if (k === 'properties' && v && typeof v === 'object') {
      out[k] = Object.fromEntries(Object.entries(v as Record<string, unknown>).map(([pk, pv]) => [pk, toClaudeSchema(stripNull(pv))]))
    } else out[k] = toClaudeSchema(v)
  }
  if (src.type === 'object' && src.properties && Array.isArray(src.required)) {
    const props = src.properties as Record<string, unknown>
    out.required = (src.required as string[]).filter((k) => !nullable(props[k]))
  }
  return out
}

interface RunResult { out: string; incomplete: boolean; usage: { input: number; output: number } }

/** Anzahl optionaler Felder eines (für Claude angepassten) Schemas - Maß für die Komplexität. */
function optionalCount(schema: unknown): number {
  let n = 0
  const walk = (x: unknown) => {
    if (!x || typeof x !== 'object') return
    if (Array.isArray(x)) return x.forEach(walk)
    const o = x as Record<string, unknown>
    if (o.type === 'object' && o.properties && typeof o.properties === 'object') {
      const req = new Set(Array.isArray(o.required) ? (o.required as string[]) : [])
      for (const k of Object.keys(o.properties as object)) if (!req.has(k)) n++
    }
    for (const v of Object.values(o)) walk(v)
  }
  walk(schema)
  return n
}

/**
 * Große Schemata lehnt Anthropics strikte JSON-Ausgabe mit „Schema is too complex“ ab (interne,
 * nicht dokumentierte Grenze). Solche Schemata bekommt Claude als Vorgabe in der Anweisung und
 * antwortet mit reinem JSON; einmal abgelehnte Schemata werden gemerkt.
 */
const CLAUDE_STRICT_MAX_OPTIONAL = 8
const tooComplexForClaude = new Set<string>()

/** JSON aus einer Textantwort holen (ohne Markdown-Zaun, ohne Text davor/danach). */
function extractJson(text: string): string {
  const t = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')
  const a = t.indexOf('{')
  const b = t.lastIndexOf('}')
  return a >= 0 && b > a ? t.slice(a, b + 1) : t
}

/** OpenAI / Lovable-Gateway: Responses API mit striktem JSON-Schema. */
async function runOpenAi(o: AiJsonOptions, model: string, signal: AbortSignal, touch: () => void, onText: (t: string) => void): Promise<RunResult> {
  const provider = getAiProvider()
  if (!provider) throw new HttpError(503, 'KI ist nicht konfiguriert.')
  const res = await aiPost('/responses', {
    model: modelId(provider, model),
    stream: true,
    instructions: o.system,
    input: [{ role: 'user', content: [{ type: 'input_text', text: o.user }] }],
    reasoning: { effort: o.effort ?? 'medium' },
    text: { format: { type: 'json_schema', name: o.schemaName, strict: true, schema: o.schema } },
    store: false,
    max_output_tokens: o.maxOutputTokens ?? 32_000,
  }, { provider, signal })
  let out = ''
  let incomplete = false
  let usage = { input: 0, output: 0 }
  for await (const ev of readSse(res)) {
    touch()
    if (ev.type === 'response.output_text.delta' && typeof ev.delta === 'string') {
      out += ev.delta
      onText(ev.delta)
    } else if (ev.type === 'response.completed' || ev.type === 'response.incomplete') {
      const r = ev.response as { output_text?: string; usage?: { input_tokens?: number; output_tokens?: number } } | undefined
      if (!out && r?.output_text) out = r.output_text
      usage = { input: r?.usage?.input_tokens ?? usage.input, output: r?.usage?.output_tokens ?? usage.output }
      if (ev.type === 'response.incomplete') incomplete = true
    } else if (ev.type === 'error' || ev.type === 'response.failed') {
      throw new HttpError(502, `KI-Fehler: ${JSON.stringify(ev).slice(0, 200)}`)
    }
  }
  return { out, incomplete, usage }
}

/** Claude (Anthropic Messages API): Streaming, adaptives Denken, JSON-Schema über output_config.format. */
async function runClaude(o: AiJsonOptions, model: string, signal: AbortSignal, touch: () => void, onText: (t: string) => void): Promise<RunResult> {
  const client = anthropicClient()
  const id = model.replace(/^anthropic\//, '')
  // Bei Ablehnung durch Sicherheitsfilter springt die API selbst auf ein passendes Modell um (nur bei Modellen, die das unterstützen)
  const fallback = /^claude-(sonnet-5-5|opus-5-5|opus-5|fable-5-1)$/.test(id)
  const schema = toClaudeSchema(o.schema) as Record<string, unknown>
  const strict = !tooComplexForClaude.has(o.schemaName) && optionalCount(schema) <= CLAUDE_STRICT_MAX_OPTIONAL
  const system = strict
    ? o.system
    : `${o.system}\n\nANTWORTFORMAT: Antworte ausschließlich mit einem einzigen JSON-Objekt - ohne Markdown, ohne Text davor oder danach -, das genau diesem JSON-Schema entspricht. Felder, die laut Beschreibung leer bleiben dürfen, kannst du weglassen.\n${JSON.stringify(schema)}`
  try {
    const stream = client.beta.messages.stream({
      model: id,
      // Denken zählt in max_tokens mit - darum Luft über der eigentlichen Antwortlänge
      max_tokens: Math.min(128_000, (o.maxOutputTokens ?? 32_000) + 32_000),
      system,
      messages: [{ role: 'user', content: o.user }],
      thinking: { type: 'adaptive' },
      output_config: { effort: o.effort ?? 'medium', ...(strict ? { format: { type: 'json_schema' as const, schema } } : {}) },
      ...(fallback ? { betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' as const } : {}),
    }, { signal })
    for await (const ev of stream) {
      touch()
      if (ev.type === 'content_block_delta' && ev.delta.type === 'text_delta') onText(ev.delta.text)
    }
    const msg = await stream.finalMessage()
    if (msg.stop_reason === 'refusal') throw new HttpError(502, 'Claude hat die Anfrage abgelehnt.')
    // Endgültiger Inhalt statt gesammelter Teilstücke (bei einem Modellwechsel mitten im Lauf zählt nur das Ergebnis)
    const text = msg.content.filter((b) => b.type === 'text').map((b) => (b as { text: string }).text).join('')
    const out = strict ? text : extractJson(text)
    const incomplete = msg.stop_reason === 'max_tokens' || msg.stop_reason === 'model_context_window_exceeded'
    return { out, incomplete, usage: { input: (msg.usage.input_tokens ?? 0) + (msg.usage.cache_read_input_tokens ?? 0), output: msg.usage.output_tokens ?? 0 } }
  } catch (e) {
    if (e instanceof HttpError || signal.aborted) throw e
    if (e instanceof Anthropic.APIError) {
      // Schema zu komplex: merken und sofort ohne strikte Ausgabe wiederholen
      if (strict && e.status === 400 && /schema is too complex/i.test(e.message)) {
        tooComplexForClaude.add(o.schemaName)
        return runClaude(o, model, signal, touch, onText)
      }
      const status = e.status ?? 502
      throw new HttpError(status === 429 ? 429 : status >= 500 ? 502 : status, `Claude: ${e.message.slice(0, 300)}`)
    }
    throw e
  }
}

/**
 * Ein strukturierter KI-Aufruf (Streaming, festes JSON-Schema) mit Drosselung, Wiederholung,
 * Ausweichmodell und Protokoll - für OpenAI, Lovable-Gateway und Claude. Liefert das geparste JSON.
 */
export async function aiJson<T = unknown>(o: AiJsonOptions): Promise<T> {
  const started = Date.now()
  let lastError: unknown = null
  let usage = { input: 0, output: 0 }
  const primary = planModel()
  let modelUsed = primary
  let attempts = 0

  await acquire()
  try {
    for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
      attempts = attempt
      // Letzter Versuch mit dem Ausweichmodell, sofern eines eingestellt ist
      modelUsed = attempt === ATTEMPTS && AI_FALLBACK_MODEL ? AI_FALLBACK_MODEL : primary
      const ctrl = new AbortController()
      const onAbort = () => ctrl.abort(o.signal?.reason)
      o.signal?.addEventListener('abort', onAbort, { once: true })
      let idle: ReturnType<typeof setTimeout> | null = null
      const idleMs = o.idleTimeoutMs ?? 240_000
      const touch = () => {
        if (idle) clearTimeout(idle)
        idle = setTimeout(() => ctrl.abort(new Error('Zeitüberschreitung: keine Antwort der KI')), idleMs)
      }
      let seen = ''
      let lastCount = 0
      const onText = (t: string) => {
        if (!o.onProgress || !o.progressPattern) return
        seen += t
        const count = (seen.match(o.progressPattern) ?? []).length
        if (count > lastCount) {
          lastCount = count
          o.onProgress(count)
        }
      }
      try {
        touch()
        const r = await (isClaude(modelUsed) ? runClaude : runOpenAi)(o, modelUsed, ctrl.signal, touch, onText)
        usage = r.usage
        if (r.incomplete) {
          // Parsebar trotz Abbruch? Dann nehmen wir es (selten); sonst ehrlich als abgeschnitten melden.
          try {
            const parsed = JSON.parse(r.out) as T
            log({ label: o.label, model: modelUsed, status: 'ok', duration_ms: Date.now() - started, input_tokens: usage.input, output_tokens: usage.output, attempts: attempt, error: null })
            return parsed
          } catch {
            log({ label: o.label, model: modelUsed, status: 'truncated', duration_ms: Date.now() - started, input_tokens: usage.input, output_tokens: usage.output, attempts: attempt, error: null })
            throw new AiTruncatedError()
          }
        }
        if (!r.out.trim()) throw new HttpError(502, 'Die KI hat keine verwertbare Antwort geliefert.')
        const parsed = JSON.parse(r.out) as T
        log({ label: o.label, model: modelUsed, status: 'ok', duration_ms: Date.now() - started, input_tokens: usage.input, output_tokens: usage.output, attempts: attempt, error: null })
        return parsed
      } catch (e) {
        if (e instanceof AiTruncatedError) throw e
        if (o.signal?.aborted) throw e
        lastError = e
        // Endgültige Fehler (Guthaben, Zugriff, Konfiguration) nicht wiederholen
        if (e instanceof HttpError && [400, 401, 402, 403, 404, 503].includes(e.status)) break
      } finally {
        if (idle) clearTimeout(idle)
        o.signal?.removeEventListener('abort', onAbort)
      }
    }
  } finally {
    release()
  }
  const msg = lastError instanceof Error ? lastError.message : String(lastError)
  log({ label: o.label, model: modelUsed, status: 'error', duration_ms: Date.now() - started, input_tokens: usage.input, output_tokens: usage.output, attempts, error: msg.slice(0, 300) })
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
