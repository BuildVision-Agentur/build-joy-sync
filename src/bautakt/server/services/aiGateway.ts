/**
 * Einheitlicher Zugang zu den KI-Modellen. In Lovable läuft alles über das AI Gateway
 * (LOVABLE_API_KEY wird dort automatisch gesetzt), lokal direkt über OpenAI (OPENAI_API_KEY in
 * .env.local). Beide sprechen dasselbe Format (Responses API, Audio-Endpunkte).
 */

import { HttpError } from '../auth.ts'

export interface AiProvider {
  kind: 'lovable' | 'openai'
  baseUrl: string
  headers: Record<string, string>
}

export const AI_PLAN_MODEL = process.env['AI_PLAN_MODEL'] || 'openai/gpt-6-astra'

export function getAiProvider(): AiProvider | null {
  const forced = process.env['AI_PROVIDER']
  const lovableKey = process.env['LOVABLE_API_KEY']
  const openaiKey = process.env['OPENAI_API_KEY']
  if (lovableKey && forced !== 'openai') {
    return { kind: 'lovable', baseUrl: 'https://ai.gateway.lovable.dev/v1', headers: { 'Lovable-API-Key': lovableKey, 'X-Lovable-AIG-SDK': 'fetch' } }
  }
  if (openaiKey && forced !== 'lovable') {
    const baseUrl = (process.env['OPENAI_BASE_URL'] || 'https://api.openai.com/v1').replace(/\/$/, '')
    return { kind: 'openai', baseUrl, headers: { Authorization: `Bearer ${openaiKey}` } }
  }
  return null
}

export function requireAiProvider(): AiProvider {
  const provider = getAiProvider()
  if (!provider) throw new HttpError(503, 'KI ist nicht konfiguriert.')
  return provider
}

/** Das Gateway erwartet „anbieter/modell“, OpenAI direkt nur den Modellnamen. */
export function modelId(provider: AiProvider, id: string): string {
  if (provider.kind === 'lovable') return id
  if (id.startsWith('openai/')) return id.slice('openai/'.length)
  if (id.includes('/')) throw new HttpError(500, `Das Modell „${id}“ ist lokal nicht verfügbar – lokal werden nur OpenAI-Modelle unterstützt.`)
  return id
}

/** Ausweichmodell, falls das Hauptmodell wiederholt scheitert (optional, z. B. AI_FALLBACK_MODEL=gpt-4.1). */
export const AI_FALLBACK_MODEL = process.env['AI_FALLBACK_MODEL'] || ''

const RETRY_STATUS = new Set([408, 409, 425, 429, 500, 502, 503, 504, 520, 522, 524, 529])
const MAX_ATTEMPTS = 6
/** Parameter, die ein Modell nicht kennt, werden je Modell gemerkt und künftig weggelassen. */
const unsupportedParams = new Map<string, Set<string>>()

const sleepMs = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const t = setTimeout(resolve, ms)
    signal?.addEventListener('abort', () => { clearTimeout(t); reject(signal.reason ?? new Error('abgebrochen')) }, { once: true })
  })

/** Wartezeit vor dem nächsten Versuch: Vorgabe des Anbieters (Retry-After bzw. „try again in 7.2s“), sonst exponentiell mit Streuung. */
function retryDelay(attempt: number, res: Response | null, text: string): number {
  const header = res?.headers.get('retry-after-ms') ?? null
  if (header && Number(header) > 0) return Math.min(60_000, Number(header))
  const after = res?.headers.get('retry-after')
  if (after && Number(after) > 0) return Math.min(60_000, Number(after) * 1000)
  const m = /try again in ([\d.]+)\s*(ms|s)/i.exec(text)
  if (m) return Math.min(60_000, Number(m[1]) * (m[2]!.toLowerCase() === 'ms' ? 1 : 1000) + 250)
  return Math.min(30_000, 1000 * 2 ** attempt) * (0.75 + Math.random() * 0.5)
}

/** Erkennt „Parameter X wird von diesem Modell nicht unterstützt“ und liefert den Parameternamen. */
function rejectedParam(text: string, body: Record<string, unknown>): string | null {
  if (!/unsupported|not supported|unknown parameter|unrecognized|does not support|invalid_request/i.test(text)) return null
  // „include: reasoning.encrypted_content“ behandelt der Aufrufer selbst (Jarvis) - nicht den Denkmodus abschalten.
  if (/encrypted_content|\binclude\b/i.test(text)) return null
  for (const p of ['reasoning', 'max_output_tokens', 'store', 'text']) if (p in body && new RegExp(`\\b${p}\\b`, 'i').test(text)) return p
  return null
}

/**
 * POST an den KI-Anbieter mit automatischer Wiederholung bei Auslastung (429), Serverfehlern
 * und Netzabbrüchen. Lehnt ein Modell einen Parameter ab (z. B. „reasoning“ bei einem Modell
 * ohne Denkmodus), wird er für dieses Modell gemerkt und die Anfrage ohne ihn wiederholt.
 */
export async function aiPost(path: string, body: unknown, opts: { provider?: AiProvider; signal?: AbortSignal } = {}): Promise<Response> {
  const provider = opts.provider ?? requireAiProvider()
  const isForm = typeof FormData !== 'undefined' && body instanceof FormData
  const json = !isForm && body && typeof body === 'object' ? { ...(body as Record<string, unknown>) } : null
  const model = json && typeof json.model === 'string' ? json.model : ''
  for (const p of unsupportedParams.get(model) ?? []) if (json) delete json[p]

  let lastStatus = 0
  let lastText = ''
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    let res: Response | null = null
    try {
      res = await fetch(`${provider.baseUrl}${path}`, {
        method: 'POST',
        headers: isForm ? provider.headers : { ...provider.headers, 'Content-Type': 'application/json' },
        body: isForm ? (body as FormData) : JSON.stringify(json ?? body),
        signal: opts.signal,
      })
    } catch (e) {
      if (opts.signal?.aborted) throw e
      lastStatus = 0
      lastText = (e as Error).message
      await sleepMs(retryDelay(attempt, null, ''), opts.signal)
      continue
    }
    if (res.ok) return res
    lastStatus = res.status
    lastText = await res.text().catch(() => '')
    if (res.status === 400 && json) {
      const p = rejectedParam(lastText, json)
      if (p && p !== 'text') {
        if (!unsupportedParams.has(model)) unsupportedParams.set(model, new Set())
        unsupportedParams.get(model)!.add(p)
        delete json[p]
        attempt--
        continue
      }
    }
    // 402 (Guthaben) und 401/403 sind endgültig; Wiederholen hilft nur bei vorübergehenden Fehlern.
    if (!RETRY_STATUS.has(res.status) || attempt === MAX_ATTEMPTS - 1) break
    await sleepMs(retryDelay(attempt, res, lastText), opts.signal)
  }
  if (lastStatus === 0) throw new HttpError(502, `Die KI ist gerade nicht erreichbar (${lastText.slice(0, 120)}). Bitte gleich noch einmal versuchen.`)
  throw aiError(lastStatus, lastText)
}

export function aiError(status: number, body: string): HttpError {
  if (status === 429) return new HttpError(429, 'Die KI ist gerade ausgelastet. Bitte in einer Minute erneut versuchen.')
  if (status === 402) return new HttpError(402, 'Das KI-Guthaben des Arbeitsbereichs ist aufgebraucht.')
  if (status === 403) return new HttpError(403, 'Die KI hat diese Anfrage abgelehnt.')
  if ((status === 400 || status === 404) && /model/i.test(body)) return new HttpError(502, `Das KI-Modell ist nicht verfügbar. ${body.slice(0, 200)}`)
  return new HttpError(502, `KI-Anfrage fehlgeschlagen (${status}). ${body.slice(0, 300)}`)
}

/** Liest einen Server-Sent-Events-Stream als Folge geparster JSON-Events. */
export async function* readSse(res: Response): AsyncGenerator<Record<string, unknown>> {
  if (!res.body) return
  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const parts = buffer.split(/\r?\n\r?\n/)
    buffer = parts.pop() ?? ''
    for (const part of parts) {
      const data = part
        .split(/\r?\n/)
        .filter((line) => line.startsWith('data:'))
        .map((line) => line.slice(5).trim())
        .join('\n')
      if (!data || data === '[DONE]') continue
      try {
        yield JSON.parse(data) as Record<string, unknown>
      } catch {
        /* unvollständiges Event */
      }
    }
  }
}
