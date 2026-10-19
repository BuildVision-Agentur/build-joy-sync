/**
 * KI-Funktionen rund um Pläne - gebaut für beliebig große Texte, Dokumente und Pläne:
 *   - extractPlanFromText: Dokument (PDF/Word/Excel/CSV/Text) → strukturierter Plan
 *   - generatePlanFromBrief: freie Beschreibung → strukturierter Plan
 *   - refinePlan: bestehenden Plan nach Anweisung überarbeiten (über Änderungslisten, siehe aiPlanEdit)
 *   - sortPlanWithAi: Reihenfolge von Phasen und Vorgängen sinnvoll sortieren
 *
 * Große Eingaben werden in Teile zerlegt, die gedrosselt parallel laufen (aiCore); ist eine
 * Antwort zu lang, halbiert sich der Teil automatisch. Bei mehreren Teilen führt ein letzter
 * Schritt doppelte Phasen zusammen und ergänzt Abhängigkeiten zwischen den Teilen. Zitate
 * schreibt die KI nicht ab: sie nennt Anfang und Ende des Originalabschnitts, das Programm
 * schneidet den vollständigen Abschnitt aus dem Text heraus (kurze Antworten, voller Kontext).
 */

import { normalizeExtractedPlan, type ExtractedPlan } from '../../shared/integrations/planextract/types.ts'
import { HttpError } from '../auth.ts'
import { aiJson, AiTruncatedError, cachedStep, runPool, stepHash, type StepCache } from './aiCore.ts'
import { editPlanStream } from './aiPlanEdit.ts'

const TASK_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['key', 'name', 'source_from', 'source_to', 'type', 'parent_key', 'duration', 'responsible', 'notes', 'depends_on'],
  properties: {
    key: { type: 'string', description: 'Kurzer eindeutiger Schlüssel, z. B. a1' },
    name: {
      type: 'string',
      description:
        'Bei type "task": nah an der tatsächlichen Formulierung aus dem Quelltext bleiben, nicht in eigene Fachbegriffe abstrahieren oder umbenennen - wenn dort "Fenster bestellen" steht, nicht zu "Beschaffung der Fensterelemente" machen. Kürzen/aufräumen ist erlaubt (Füllwörter, Wiederholungen, Verhaspler raus), aber die Wortwahl und der Sinn des Originals müssen erkennbar bleiben. Bei type "phase"/"group": eine kurze, zum Blockinhalt wirklich passende Überschrift - nicht generisch ("Sonstiges") oder erfunden. Bei type "milestone": der erreichte Zustand konkret benannt, z. B. "Fenster bestellt und eingebaut".',
    },
    source_from: {
      type: ['string', 'null'],
      description:
        'Die ERSTEN 6-12 Wörter des Original-Textabschnitts, der zu diesem Eintrag geführt hat - exakt wörtlich (gleiche Schreibweise), damit das Programm die Stelle im Text findet. Umfang des Abschnitts: bei "phase"/"group" und beim Ziel-"milestone" der ganze Block; bei "task" großzügig (ganzer Satz oder mehrere zusammenhängende Sätze), damit er für sich verständlich ist. Bei einer Tabellenzeile null. null nur, wenn der Eintrag eine reine Ergänzung von dir ist.',
    },
    source_to: {
      type: ['string', 'null'],
      description: 'Die LETZTEN 4-10 Wörter desselben Abschnitts, exakt wörtlich. Das Programm übernimmt alles von source_from bis source_to als Zitat. null, wenn source_from null ist.',
    },
    type: { type: 'string', enum: ['phase', 'group', 'task', 'milestone'] },
    parent_key: { type: ['string', 'null'], description: 'Schlüssel der übergeordneten Gliederung' },
    duration: { type: ['integer', 'null'], description: 'Dauer in Arbeitstagen, Meilenstein 0' },
    responsible: { type: ['string', 'null'], description: 'Name oder E-Mail der verantwortlichen Person' },
    notes: { type: ['string', 'null'], description: 'Kurz halten (höchstens 1-2 Sätze).' },
    depends_on: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['predecessor_key', 'type', 'lag_days'],
        properties: {
          predecessor_key: { type: 'string' },
          type: { type: 'string', enum: ['FS', 'SS', 'FF', 'SF'] },
          lag_days: { type: 'integer' },
        },
      },
    },
  },
} as const

const PLAN_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['name', 'tasks', 'warnings'],
  properties: {
    name: { type: 'string', description: 'Kurzer Projekt-/Plantitel' },
    tasks: { type: 'array', items: TASK_SCHEMA },
    warnings: { type: 'array', items: { type: 'string' }, description: 'Unklarheiten oder Hinweise' },
  },
} as const

const BASE_RULES = `- Arbeite in zwei Schritten. Schritt 1: Lies den GANZEN Text zuerst durch und gliedere ihn in thematische Blöcke - zusammengehörige Punkte werden zusammensortiert, auch wenn sie im Text an verschiedenen Stellen verstreut vorkommen (nicht einfach stur der Textreihenfolge nach abarbeiten). Schritt 2: Arbeite Block für Block weiter, wie unten beschrieben.
- Jeder Block wird zu einer Phase/Gruppe (type "phase"/"group") - Überschrift siehe name-Feld. Darunter kommen die konkreten Vorgänge (type "task") aus genau diesem Block - Benennung siehe name-Feld.
- Jeder Block bekommt GENAU EINEN Ziel-Meilenstein (type "milestone", duration 0) ans Blockende, der den erreichten Zustand benennt (siehe name-Feld). Er hängt per depends_on (type FS) von den letzten Vorgängen seines Blocks ab. Nennt der Text selbst schon einen Termin/eine Abnahme/Freigabe als Blockende, ist DAS der Ziel-Meilenstein - keinen zusätzlichen erfinden. Nur wenn der Text keinen expliziten Endpunkt nennt, formulierst du den Zielzustand selbst.
- Quellenangabe bei Phase, Ziel-Meilenstein und jedem Vorgang über source_from/source_to (Anfang und Ende des Originalabschnitts, wörtlich) - das Programm übernimmt daraus den vollständigen Abschnitt. Schreibe den Abschnitt selbst NICHT ab.
- Schätze für jede Aufgabe eine realistische Dauer in Arbeitstagen, wenn keine vorgegeben ist.
- Abhängigkeiten (depends_on) sind der wichtigste Teil deiner Arbeit - nimm dir dafür besondere Sorgfalt:
  - Prüfe JEDE Aufgabe einzeln: Was muss zwingend vorher fertig sein, bevor diese beginnen kann? Trage das als depends_on ein, auch wenn es nicht wörtlich im Text steht, sondern sich aus der Fachlogik ergibt.
  - Sprachliche Signale ("nach", "sobald", "erst wenn", "Voraussetzung", "im Anschluss", "danach", "bevor") IMMER in eine Abhängigkeit übersetzen - nie nur in die Reihenfolge des Arrays.
  - Aufgaben OHNE echte inhaltliche Abhängigkeit voneinander bekommen KEINE künstliche Abhängigkeit - sie dürfen parallel laufen.
  - type FS (Ende→Start, Standard) heißt: Vorgänger muss fertig sein. SS (Start→Start) heißt: darf gleichzeitig beginnen. Wähle bewusst.
  - Innerhalb eines Blocks: aufeinanderfolgende Schritte bekommen eine Kette von Abhängigkeiten.
  - Zwischen Blöcken: hängt ein Vorgang in Block B vom Abschluss von Block A ab, trage eine Abhängigkeit zum ZIEL-MEILENSTEIN von Block A ein.
- Die Reihenfolge im tasks-Array ist die Ausführungsreihenfolge: Block für Block (Phase, dann ihre Vorgänge, dann ihr Ziel-Meilenstein), Blöcke chronologisch. Ein Vorgänger steht nie nach seinem Nachfolger im Array.
- Personen, die einer Aufgabe zugeordnet sind, kommen in responsible (Name oder E-Mail, sonst null).
- Antworte ausschließlich im vorgegebenen JSON-Schema, auf Deutsch.`

const SYSTEM_DOCUMENT = `Du bist Projektplaner für interne Projekte (Organisation, Coaching, Software, Bauabwicklung).
Du erhältst den Text eines Dokuments (Protokoll, Leistungsbeschreibung, Angebot, Projektbeschreibung)
und extrahierst daraus einen Aufgabenplan.
${BASE_RULES}
- Erfinde keine Inhalte. Unklares gehört in warnings. Einzige Ausnahme: die Ziel-Meilensteine pro Block (siehe oben) darfst und sollst du selbst formulieren, auch wenn der genaue Wortlaut nicht im Text steht.`

const SYSTEM_BRIEF = `Du bist Projektplaner für interne Projekte (Organisation, Coaching, Software, Bauabwicklung).
Du erhältst eine Beschreibung eines Vorhabens und entwirfst daraus einen vollständigen, praxistauglichen Projektplan.
${BASE_RULES}
- Ist der Text bereits lang und detailliert (z. B. ein abgetipptes/diktiertes Gespräch, ein Protokoll, mehrere konkrete Punkte) - verhalte dich wie beim Dokument-Import: NICHTS erfinden außer den Ziel-Meilensteinen pro Block (siehe oben). Nur wenn der Text erkennbar kurz und vage ist (eine grobe Idee, ein Satz, ohne konkrete Einzelschritte), ergänze die üblichen fehlenden Schritte (Vorbereitung, Abstimmung, Freigabe, Abschluss) und vermerke das deutlich in warnings.`

const SORT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['order'],
  properties: { order: { type: 'array', items: { type: 'string' }, description: 'Alle Schlüssel in der neuen Reihenfolge' } },
} as const

const SYSTEM_SORT = `Du bist Projektplaner. Du erhältst einen Projektplan, dessen Reihenfolge durcheinander ist.
Gib nur die Schlüssel aller Vorgänge in der korrigierten Reihenfolge zurück.
- Sortiere Phasen in der fachlich sinnvollen zeitlichen Abfolge (Anfrage → Angebot → Verhandlung → Auftrag → Planung → Vorbereitung → Ausführung → Abnahme → Rechnung → Abschluss).
- Direkt nach jeder Phase folgen ihre eigenen Vorgänge in Ausführungsreihenfolge.
- Jeder Schlüssel genau einmal. Antworte im vorgegebenen JSON-Schema.`

export type PlanProgress = { type: 'progress'; tasks: number; message?: string }
export interface AiRunOptions { cache?: StepCache }

/** Kompakte Darstellung eines Plans für den Prompt (spart Tokens gegenüber Rohdaten). */
function planToPrompt(plan: ExtractedPlan): string {
  const lines = plan.tasks.map((t) => {
    const deps = (t.depends_on ?? []).map((d) => d.predecessor_key).join(',')
    return [t.key, t.type, t.parent_key ?? '-', String(t.duration ?? 1), t.responsible ?? '-', deps || '-', t.name].join(' | ')
  })
  return `Plan: ${plan.name}\nSpalten: key | type | parent_key | duration | responsible | depends_on | name\n${lines.join('\n')}`
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

/**
 * Lässt eine laufende Arbeit (Promise) zu und meldet währenddessen alle paar Sekunden den
 * Zwischenstand - hält die Verbindung lebendig und zeigt Fortschritt statt Stillstand.
 */
async function* whileRunning<T>(work: Promise<T>, status: () => PlanProgress): AsyncGenerator<PlanProgress, T> {
  let settled = false
  work.then(() => { settled = true }, () => { settled = true })
  let last = ''
  while (!settled) {
    await Promise.race([work.catch(() => undefined), sleep(3_000)])
    const s = status()
    const sig = `${s.tasks}|${s.message}`
    // auch ohne Änderung alle paar Sekunden ein Lebenszeichen, damit Proxys die Verbindung nicht kappen
    if (!settled || sig !== last) yield s
    last = sig
  }
  return await work
}

// ---------------------------------------------------------------- Quelltext-Zitate aus Ankern
/** Text normalisieren (Leerraum, Groß/Klein, Anführungszeichen) und Rückabbildung auf Originalpositionen. */
function normalizeWithMap(text: string): { norm: string; map: number[] } {
  let norm = ''
  const map: number[] = []
  let space = false
  for (let i = 0; i < text.length; i++) {
    let ch = text[i]!
    if (/\s/.test(ch)) {
      if (space || !norm) continue
      space = true
      ch = ' '
    } else {
      space = false
      ch = ch.toLowerCase().replace(/[„“”"«»]/g, '"').replace(/[‚‘’`´]/g, "'").replace(/[–—]/g, '-')
    }
    norm += ch
    map.push(i)
  }
  return { norm, map }
}

function findAnchor(norm: string, anchor: string, from = 0): { start: number; end: number } | null {
  const a = normalizeWithMap(anchor).norm.trim()
  if (a.length < 3) return null
  let idx = norm.indexOf(a, from)
  if (idx >= 0) return { start: idx, end: idx + a.length }
  // Unschärfe: erste/letzte Wörter des Ankers genügen, falls die KI ein Wort leicht abweichend geschrieben hat
  const words = a.split(' ')
  for (const n of [6, 4, 3]) {
    if (words.length < n) continue
    const head = words.slice(0, n).join(' ')
    idx = norm.indexOf(head, from)
    if (idx >= 0) return { start: idx, end: idx + head.length }
    const tail = words.slice(-n).join(' ')
    idx = norm.indexOf(tail, from)
    if (idx >= 0) return { start: idx, end: idx + tail.length }
  }
  return null
}

const MAX_EXCERPT = 6_000

/** Vollständigen Originalabschnitt zwischen Anfangs- und Endanker herausschneiden. */
export function resolveExcerpt(source: string, from: string | null | undefined, to: string | null | undefined, index?: { norm: string; map: number[] }): string | null {
  if (!from?.trim()) return null
  const { norm, map } = index ?? normalizeWithMap(source)
  const a = findAnchor(norm, from)
  if (!a) return [from.trim(), to?.trim()].filter(Boolean).join(' … ')
  let endNorm = a.end
  if (to?.trim()) {
    const b = findAnchor(norm, to, a.start)
    if (b && b.end - a.start <= MAX_EXCERPT * 1.2) endNorm = b.end
  }
  if (endNorm === a.end) {
    // Kein Endanker: bis zum Satzende
    const rest = norm.slice(a.end, a.end + 600)
    const m = /[.!?](\s|$)/.exec(rest)
    endNorm = a.end + (m ? m.index + 1 : rest.length)
  }
  const startOrig = map[a.start] ?? 0
  const endOrig = (map[Math.min(endNorm, map.length) - 1] ?? source.length - 1) + 1
  const excerpt = source.slice(startOrig, endOrig).trim()
  return excerpt.length > MAX_EXCERPT ? `${excerpt.slice(0, MAX_EXCERPT)} …` : excerpt
}

interface RawPlanTask { key: string; parent_key: string | null; type: string; name: string; source_from?: string | null; source_to?: string | null; source_excerpt?: string | null; depends_on?: { predecessor_key: string; type: string; lag_days: number }[]; [k: string]: unknown }
interface RawPlan { name?: string; tasks?: RawPlanTask[]; warnings?: string[] }

/** Anker eines Teilergebnisses in vollständige Zitate verwandeln. */
function withExcerpts(raw: RawPlan, sourceText: string): RawPlan {
  const index = normalizeWithMap(sourceText)
  return {
    ...raw,
    tasks: (raw.tasks ?? []).map((t) => {
      const { source_from, source_to, ...rest } = t
      return { ...rest, source_excerpt: resolveExcerpt(sourceText, source_from, source_to, index) }
    }),
  }
}

// ---------------------------------------------------------------- Zerlegen
const SINGLE_CALL_CHARS = 14_000
const CHUNK_CHARS = 12_000
const MAX_DOCUMENT_CHARS = 2_000_000
const CHUNK_CONCURRENCY = 4
// Tabellenzeilen (Excel/CSV) werden knapp ausgegeben (kein Zitat); ein zu großer Teil halbiert sich automatisch.
const MAX_TABLE_ROWS = 150
const TABLE_CHUNK_CHARS = 40_000

function isTableFile(fileName: string) {
  return /\.(csv|xlsx?|xlsm)$/i.test(fileName)
}

/**
 * Teilt einen langen Text an Absatz-/Zeilengrenzen. Tabellen behalten ihren Kontext: bei CSV wird
 * die Kopfzeile, bei Excel (Abschnitte „## Blattname“) Blattname und Kopfzeile jedem Teil vorangestellt.
 */
function splitIntoChunks(text: string, fileName: string): string[] {
  const lines = text.split(/\r?\n/)
  const isCsv = /\.csv$/i.test(fileName)
  let heading: string | null = null
  let header: string | null = isCsv ? lines[0]! : null
  let expectHeader = false
  const chunks: string[] = []
  let cur: string[] = []
  let len = 0
  let rows = 0
  const flush = () => {
    if (cur.length) chunks.push(cur.join('\n'))
    cur = []
    len = 0
    rows = 0
  }
  const start = () => {
    if (heading && !isCsv) cur.push(heading)
    if (header) cur.push(header)
    len = cur.reduce((s, l) => s + l.length + 1, 0)
  }
  if (isCsv) start()
  for (let i = isCsv ? 1 : 0; i < lines.length; i++) {
    let line = lines[i]!
    if (!line.trim()) {
      // Leerzeile = Absatzgrenze: bei Fließtext bevorzugt hier teilen
      if (!isCsv && heading === null && len > CHUNK_CHARS * 0.7 && cur.length) flush()
      // Absatzgrenze im Fließtext erhalten - hilft der KI beim Gliedern in Blöcke
      else if (!isCsv && heading === null && cur.length && cur[cur.length - 1] !== '') {
        cur.push('')
        len += 1
      }
      continue
    }
    if (!isCsv && line.startsWith('## ')) {
      heading = line
      header = null
      expectHeader = true
    } else if (expectHeader) {
      header = line
      expectHeader = false
    }
    const tabular = isCsv || heading !== null
    const limit = tabular ? TABLE_CHUNK_CHARS : CHUNK_CHARS
    // Überlange Einzelzeile (Fließtext ohne Umbrüche) an Satzgrenzen aufteilen
    while (!tabular && line.length > limit) {
      const cut = Math.max(line.lastIndexOf('. ', limit), line.lastIndexOf('! ', limit), line.lastIndexOf('? ', limit))
      const at = cut > limit * 0.5 ? cut + 1 : limit
      if (cur.length) flush()
      chunks.push(line.slice(0, at).trim())
      line = line.slice(at).trim()
    }
    if ((len + line.length + 1 > limit || (tabular && rows >= MAX_TABLE_ROWS)) && cur.length) {
      flush()
      start()
    }
    cur.push(line)
    len += line.length + 1
    if (!line.startsWith('## ') && line !== header) rows++
  }
  flush()
  return chunks.filter((c) => c.trim())
}

/**
 * Teilpläne zusammenführen: Schlüssel je Teil eindeutig machen, gleichnamige Phasen zusammenlegen.
 * Vorgänger-Verweise auf Schlüssel aus einem anderen Teil (z. B. ID-Spalte einer Tabelle) werden
 * über die ursprünglichen Schlüssel aufgelöst.
 */
function mergeChunkPlans(parts: RawPlan[]): RawPlan {
  const phaseByName = new Map<string, string>()
  const globalByRaw = new Map<string, string>()
  const maps: Map<string, string>[] = []
  const droppedSets: Set<string>[] = []
  parts.forEach((part, idx) => {
    const prefix = `p${idx + 1}_`
    const list = Array.isArray(part.tasks) ? part.tasks : []
    const map = new Map<string, string>()
    const dropped = new Set<string>()
    for (const t of list) {
      let newKey = prefix + t.key
      if (t.type === 'phase' || t.type === 'group') {
        const norm = String(t.name ?? '').trim().toLowerCase()
        const existing = phaseByName.get(norm)
        if (existing) {
          newKey = existing
          dropped.add(t.key)
        } else phaseByName.set(norm, newKey)
      }
      map.set(t.key, newKey)
      if (!globalByRaw.has(t.key)) globalByRaw.set(t.key, newKey)
    }
    maps.push(map)
    droppedSets.push(dropped)
  })
  const tasks: RawPlanTask[] = []
  const warnings: string[] = []
  parts.forEach((part, idx) => {
    const map = maps[idx]!
    const resolve = (k: string) => map.get(k) ?? globalByRaw.get(k)
    for (const t of Array.isArray(part.tasks) ? part.tasks : []) {
      if (droppedSets[idx]!.has(t.key)) continue
      tasks.push({
        ...t,
        key: map.get(t.key)!,
        parent_key: t.parent_key ? map.get(t.parent_key) ?? null : null,
        depends_on: (t.depends_on ?? []).filter((d) => resolve(d.predecessor_key)).map((d) => ({ ...d, predecessor_key: resolve(d.predecessor_key)! })),
      })
    }
    for (const w of part.warnings ?? []) if (!warnings.includes(w)) warnings.push(w)
  })
  return { name: parts[0]?.name, tasks, warnings }
}

/** Teilt einen Teil (Kontextzeilen bleiben vorn) in zwei Hälften; null, wenn nicht teilbar. */
function halveChunk(chunk: string, isCsv: boolean): [string, string] | null {
  const lines = chunk.split('\n')
  const ctx = isCsv ? 1 : lines[0]?.startsWith('## ') ? 2 : 0
  const body = lines.slice(ctx)
  if (body.length >= 2) {
    const mid = Math.ceil(body.length / 2)
    return [[...lines.slice(0, ctx), ...body.slice(0, mid)].join('\n'), [...lines.slice(0, ctx), ...body.slice(mid)].join('\n')]
  }
  // Eine einzige lange Zeile: an einer Satzgrenze in der Mitte teilen
  const one = body[0] ?? ''
  if (one.length < 400) return null
  const mid = Math.floor(one.length / 2)
  const cut = one.indexOf('. ', mid)
  const at = cut > 0 && cut < one.length - 50 ? cut + 1 : mid
  return [[...lines.slice(0, ctx), one.slice(0, at)].join('\n'), [...lines.slice(0, ctx), one.slice(at).trim()].join('\n')]
}

interface ChunkJob { effort?: 'low' | 'medium'; system: string; fileName: string; hint: string; label: string; chunk: string; isCsv: boolean; onDraft: (n: number) => void; cache?: StepCache }

/** Einen Teil planen; wird die Antwort zu groß, halbiert sich der Teil und beide Hälften laufen nacheinander. */
async function planChunk(job: ChunkJob, depth = 0): Promise<RawPlan[]> {
  try {
    const raw = await cachedStep(job.cache, `extract:${stepHash(job.system.slice(0, 40) + job.hint + job.chunk)}`, () =>
      aiJson<RawPlan>({
        label: `Import ${job.label}`,
        system: job.system,
        user: `Dateiname: ${job.fileName}\nHinweis: ${job.hint}\n\nText (${job.label}):\n\n${job.chunk}`,
        schema: PLAN_SCHEMA,
        schemaName: 'plan',
        effort: depth > 0 || job.isCsv ? 'low' : (job.effort ?? 'medium'),
        maxOutputTokens: 32_000,
        progressPattern: /"key"\s*:\s*"/g,
        onProgress: job.onDraft,
      }),
    )
    return [withExcerpts(raw, job.chunk)]
  } catch (e) {
    if (e instanceof AiTruncatedError && depth < 4) {
      const halves = halveChunk(job.chunk, job.isCsv)
      if (halves) {
        const first = await planChunk({ ...job, label: `${job.label}a`, chunk: halves[0] }, depth + 1)
        const second = await planChunk({ ...job, label: `${job.label}b`, chunk: halves[1] }, depth + 1)
        return [...first, ...second]
      }
    }
    throw e
  }
}

const CONSOLIDATE_INSTRUCTION = `Dieser Plan wurde aus mehreren Teilen eines langen Dokuments zusammengesetzt. Bereinige die Nahtstellen - inhaltlich nichts erfinden und nichts Echtes löschen:
- Phasen/Gruppen gleichen Themas, die über die Teile zersplittert sind, zusammenführen: Vorgänge per move in die passende Phase, die leere Phase entfernen. Doppelte Ziel-Meilensteine einer zusammengeführten Phase auf einen reduzieren (Abhängigkeiten auf den verbleibenden umhängen).
- Echte Dubletten (derselbe Vorgang zweimal) entfernen, Abhängigkeiten auf das verbleibende Exemplar setzen.
- Fehlende Abhängigkeiten zwischen den Teilen ergänzen, wo die Fachlogik sie verlangt (z. B. Vorgang in einem späteren Teil setzt das Ergebnis eines früheren voraus).
- Reihenfolge der Phasen nur korrigieren, wenn sie fachlich offensichtlich falsch ist.
Sind keine Korrekturen nötig, gib eine leere Liste zurück.`

interface ExtractRun { effort?: 'low' | 'medium'; text: string; fileName: string; hint?: string; system: string; source: ExtractedPlan['source']; fallbackName: string; reference: string; people?: string[]; cache?: StepCache }

/** Gemeinsamer Weg für Dokument und lange Beschreibung: zerlegen → parallel planen → zusammenführen → Nahtstellen bereinigen. */
async function* extractCore(r: ExtractRun): AsyncGenerator<PlanProgress | { type: 'done'; plan: ExtractedPlan }> {
  const clipped = r.text.slice(0, MAX_DOCUMENT_CHARS)
  const table = isTableFile(r.fileName)
  const chunks = clipped.length <= SINGLE_CALL_CHARS ? [clipped] : splitIntoChunks(clipped, r.fileName)
  const isCsv = /\.csv$/i.test(r.fileName)
  const drafted = new Array<number>(chunks.length).fill(0)
  let finished = 0
  const people = r.people?.length ? ` Verfügbare Personen (nur diese als responsible): ${r.people.join('; ')}.` : ''
  const tableHint = table
    ? ' Bei einer Tabelle (Excel/CSV): jede Zeile wird ein Vorgang, source_from/source_to immer null (die Zeile ist die Quelle) und notes nur kurz. Hat die Tabelle eine ID-Spalte, verwende die ID als key und trage Vorgänger aus der Vorgänger-Spalte immer als predecessor_key ein - auch wenn die ID in einem anderen Teil steht. Eine Spalte „Ebene“ oder „Gliederung“ gibt die Hierarchie vor (Phase > Gruppe > Vorgang).'
    : ''

  const work = runPool(chunks, CHUNK_CONCURRENCY, async (chunk, i) => {
    const n = i + 1
    const partHint = chunks.length > 1 ? `Dies ist Teil ${n} von ${chunks.length} eines langen Textes; plane nur die Inhalte dieses Teils. Thematisch gleiche Inhalte bekommen dieselben Phasennamen wie in den übrigen Teilen.` : ''
    try {
      const res = await planChunk({
        system: r.system, fileName: r.fileName, hint: [partHint, tableHint, people, r.hint].filter(Boolean).join(' ') || '-',
        label: chunks.length > 1 ? `Teil ${n}/${chunks.length}` : 'Text', chunk, isCsv, cache: r.cache, effort: r.effort,
        onDraft: (count) => { drafted[i] = count },
      })
      drafted[i] = res.reduce((s, p) => s + (p.tasks?.length ?? 0), 0)
      finished++
      return res
    } catch (e) {
      throw e instanceof HttpError ? new HttpError(e.status, chunks.length > 1 ? `Teil ${n} von ${chunks.length}: ${e.message}` : e.message) : e
    }
  })
  const results = yield* whileRunning(work, () => ({
    type: 'progress',
    tasks: drafted.reduce((s, n) => s + n, 0),
    message: chunks.length > 1 ? `Text wird in ${chunks.length} Teilen ausgewertet – ${finished} fertig` : 'Text wird ausgewertet …',
  }))

  const parts = results.flat()
  const parsed: RawPlan = parts.length === 1 ? parts[0]! : mergeChunkPlans(parts)
  if (chunks.length > 1) parsed.warnings = [`Der Text war lang und wurde in ${chunks.length} Teilen ausgewertet und danach zusammengeführt.`, ...(parsed.warnings ?? [])]
  let plan = normalizeExtractedPlan(parsed, { source: r.source, name: r.fallbackName, reference: r.reference })
  if (!plan.tasks.length) throw new HttpError(422, 'Im Text wurden keine Aufgaben erkannt.')

  // Nahtstellen bereinigen (nur bei mehreren Teilen aus Fließtext; Tabellen verknüpfen sich über ihre IDs)
  if (chunks.length > 1 && !table) {
    try {
      for await (const ev of editPlanStream(plan, CONSOLIDATE_INSTRUCTION, { cache: r.cache, label: 'Zusammenführen' })) {
        if (ev.type === 'done') plan = { ...ev.plan, warnings: [...(plan.warnings ?? []), ...(ev.plan.warnings ?? []).filter((w) => w.startsWith('KI-Überarbeitung')).map((w) => w.replace('KI-Überarbeitung', 'Zusammenführung der Teile'))] }
        else yield { type: 'progress', tasks: plan.tasks.length, message: 'Teile werden zusammengeführt …' }
      }
    } catch (e) {
      plan = { ...plan, warnings: [...(plan.warnings ?? []), `Die Teile konnten nicht automatisch zusammengeführt werden (${(e as Error).message}) - doppelte Phasen bitte prüfen.`] }
    }
  }
  yield { type: 'done', plan }
}

/** Dokumenttext → strukturierter Plan. */
export async function extractPlanFromText(text: string, fileName: string, hint?: string): Promise<ExtractedPlan> {
  let plan: ExtractedPlan | null = null
  for await (const ev of extractPlanFromTextStream(text, fileName, hint)) if (ev.type === 'done') plan = ev.plan
  if (!plan) throw new HttpError(502, 'Die KI hat keine verwertbare Antwort geliefert.')
  return plan
}

/** Wie extractPlanFromText, meldet zwischendurch Fortschritt. Beliebig lange Dokumente. */
export async function* extractPlanFromTextStream(text: string, fileName: string, hint?: string, opts: AiRunOptions = {}): AsyncGenerator<PlanProgress | { type: 'done'; plan: ExtractedPlan }> {
  if (text.trim().length < 40) throw new HttpError(400, 'Aus dem Dokument konnte kein Text gelesen werden (evtl. ein Scan ohne Textebene).')
  yield* extractCore({ text, fileName, hint, system: SYSTEM_DOCUMENT, source: 'document', fallbackName: fileName.replace(/\.[a-z]+$/i, ''), reference: fileName, cache: opts.cache })
}

/** Freie Beschreibung → vollständiger Planentwurf. */
export async function generatePlanFromBrief(brief: string, context?: { kind?: string; people?: string[]; effort?: 'low' | 'medium' }): Promise<ExtractedPlan> {
  let plan: ExtractedPlan | null = null
  for await (const ev of generatePlanFromBriefStream(brief, context)) if (ev.type === 'done') plan = ev.plan
  if (!plan) throw new HttpError(502, 'Die KI hat keine verwertbare Antwort geliefert.')
  return plan
}

/** Wie generatePlanFromBrief, meldet zwischendurch Fortschritt. Beliebig lange Beschreibungen. */
export async function* generatePlanFromBriefStream(brief: string, context?: { kind?: string; people?: string[]; effort?: 'low' | 'medium' }, opts: AiRunOptions = {}): AsyncGenerator<PlanProgress | { type: 'done'; plan: ExtractedPlan }> {
  const text = brief.trim()
  if (text.length < 10) throw new HttpError(400, 'Bitte beschreibe das Vorhaben etwas ausführlicher.')
  const kind = context?.kind ? `Art des Vorhabens: ${context.kind}` : ''
  const gen = extractCore({ text, fileName: 'Beschreibung', hint: kind, system: SYSTEM_BRIEF, source: 'document', fallbackName: 'KI-Projektplan', reference: 'KI-Entwurf', people: context?.people, cache: opts.cache, effort: context?.effort })
  for await (const ev of gen) {
    if (ev.type === 'done') {
      const plan = ev.plan.name === 'Beschreibung' ? { ...ev.plan, name: 'KI-Projektplan' } : ev.plan
      if (!plan.tasks.length) throw new HttpError(422, 'Die KI konnte aus der Beschreibung keinen Plan ableiten.')
      yield { type: 'done', plan }
    } else yield ev
  }
}

/** Bestehenden Plan nach Anweisung überarbeiten - beliebig große Pläne und Anweisungen (Änderungslisten, siehe aiPlanEdit). */
export async function* refinePlanStream(plan: ExtractedPlan, instruction: string, people?: string[], opts: AiRunOptions & { context?: string; facts?: string } = {}): AsyncGenerator<PlanProgress | { type: 'done'; plan: ExtractedPlan }> {
  yield* editPlanStream(plan, instruction, { people, cache: opts.cache, context: opts.context, facts: opts.facts })
}

/** Reihenfolge eines Plans sinnvoll sortieren (Inhalte bleiben unverändert; die KI liefert nur die Schlüsselreihenfolge). */
export async function sortPlanWithAi(plan: ExtractedPlan): Promise<ExtractedPlan> {
  if (plan.tasks.length < 2) return plan
  const res = await aiJson<{ order: string[] }>({ label: 'Sortieren', system: SYSTEM_SORT, user: planToPrompt(plan), schema: SORT_SCHEMA, schemaName: 'reihenfolge', effort: 'low', maxOutputTokens: 16_000 })
  const byKey = new Map(plan.tasks.map((t) => [t.key, t]))
  const out: typeof plan.tasks = []
  const used = new Set<string>()
  for (const k of res.order ?? []) {
    const original = byKey.get(k)
    if (original && !used.has(k)) {
      used.add(k)
      out.push(original)
    }
  }
  for (const t of plan.tasks) if (!used.has(t.key)) out.push(t)
  return { ...plan, tasks: out, warnings: [...(plan.warnings ?? []), 'Die Reihenfolge wurde von der KI sortiert – bitte prüfen.'] }
}
