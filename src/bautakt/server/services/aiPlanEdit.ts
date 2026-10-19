/**
 * Plan überarbeiten über Änderungslisten - unabhängig von der Größe des Plans und der Anweisung.
 *
 * Die KI schreibt nie den ganzen Plan zurück, sondern nur Operationen (anlegen, ändern,
 * verschieben, entfernen, verknüpfen). Das Programm wendet sie exakt an: unveränderte Vorgänge
 * bleiben Byte für Byte erhalten (inkl. Notizen, Zitaten, festen Terminen), nichts geht verloren.
 *
 *   - Kompakte Planansicht mit Kurzkennungen (v1, v2, …) statt langer IDs → wenig Eingabe-Token
 *   - Sehr große Pläne: erst Bereiche bestimmen (Gliederung), dann nur diese im Detail zeigen
 *   - Lange Anweisungen werden in Teile zerlegt und nacheinander umgesetzt (jeder Teil sieht den
 *     Stand nach den vorigen)
 *   - Braucht ein Teil mehr Änderungen, als in eine Antwort passen, meldet die KI complete=false
 *     und macht im nächsten Aufruf weiter; eine abgeschnittene Antwort wird kleiner wiederholt
 *   - Dauern aus Stunden rechnet das Programm (work_hours ÷ hours_per_day, Wochenrhythmus),
 *     nicht die KI
 */

import { normalizeExtractedPlan, type ExtractedPlan, type ExtractedTask } from '../../shared/integrations/planextract/types.ts'
import type { TaskType } from '../../shared/types.ts'
import { HttpError } from '../auth.ts'
import { aiJson, AiTruncatedError, cachedStep, stepHash, type StepCache } from './aiCore.ts'

// ---------------------------------------------------------------- Schema
const DEP_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['predecessor_key', 'type', 'lag_days'],
  properties: {
    predecessor_key: { type: 'string' },
    type: { type: 'string', enum: ['FS', 'SS', 'FF', 'SF'] },
    lag_days: { type: 'integer' },
  },
} as const

const OP_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['op', 'req', 'key', 'name', 'type', 'parent_key', 'after_key', 'duration', 'work_hours', 'hours_per_day', 'days_per_week', 'start_no_earlier', 'responsible', 'notes', 'predecessor_key', 'dep_type', 'lag_days', 'depends_on'],
  properties: {
    op: { type: 'string', enum: ['add', 'update', 'remove', 'move', 'link', 'unlink'], description: 'add = neuer Vorgang; update = Felder ändern; remove = entfernen; move = an andere Stelle/unter andere Phase; link/unlink = Abhängigkeit setzen/lösen' },
    req: { type: ['string', 'null'], description: 'Kennung der Anforderung (R1, R2, …), die diese Operation umsetzt. Immer angeben.' },
    key: { type: ['string', 'null'], description: 'add: NEUER eindeutiger Schlüssel (n1, n2, …). update/remove/move: Schlüssel des bestehenden Vorgangs (v…). link/unlink: der NACHFOLGER.' },
    name: { type: ['string', 'null'], description: 'add: Bezeichnung (Pflicht). update: neue Bezeichnung oder null = unverändert.' },
    type: { type: ['string', 'null'], enum: ['phase', 'group', 'task', 'milestone', null], description: 'add: Art (Standard task). update: neue Art oder null.' },
    parent_key: { type: ['string', 'null'], description: 'add/move: übergeordnete Phase/Gruppe (v… oder n…), null = oberste Ebene. update: ignoriert.' },
    after_key: { type: ['string', 'null'], description: 'add/move: direkt hinter diesem Geschwister einordnen; null = ans Ende der übergeordneten Phase.' },
    duration: { type: ['integer', 'null'], description: 'Dauer in Arbeitstagen (Meilenstein 0). Nur wenn direkt bekannt - sonst work_hours nutzen. null = unverändert/automatisch.' },
    work_hours: { type: ['number', 'null'], description: 'Arbeitsaufwand in Stunden. Das Programm rechnet daraus die Dauer: aufgerundet work_hours ÷ hours_per_day Arbeitstage, umgerechnet auf days_per_week. Für alle Zeitberechnungen aus Stunden verwenden - nicht selbst in Tage umrechnen.' },
    hours_per_day: { type: ['number', 'null'], description: 'Stunden pro Arbeitstag für work_hours (Standard 8).' },
    days_per_week: { type: ['number', 'null'], description: 'Arbeitstage pro Woche für diesen Vorgang, falls abweichend von 5 (z. B. 6). Der Plan rechnet mit Mo–Fr; das Programm rechnet die Dauer passend um.' },
    start_no_earlier: { type: ['string', 'null'], description: 'Frühester Beginn als Datum JJJJ-MM-TT, wenn die Anweisung einen festen Start nennt (z. B. „ab 9.11.“). null = unverändert/kein fester Start.' },
    responsible: { type: ['string', 'null'], description: 'Verantwortliche Person (Name oder E-Mail aus der Personenliste) oder null = unverändert.' },
    notes: { type: ['string', 'null'], description: 'add: Notiz. update: wird an die bestehende Notiz ANGEHÄNGT (z. B. Rechenweg, Begründung). null = nichts.' },
    predecessor_key: { type: ['string', 'null'], description: 'link/unlink: Vorgänger.' },
    dep_type: { type: ['string', 'null'], enum: ['FS', 'SS', 'FF', 'SF', null], description: 'link: Art der Abhängigkeit (Standard FS).' },
    lag_days: { type: ['integer', 'null'], description: 'link: Abstand in Arbeitstagen (Standard 0).' },
    depends_on: { type: 'array', items: DEP_SCHEMA, description: 'add: Vorgänger des neuen Vorgangs. Sonst [].' },
  },
} as const

const EDIT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['operations', 'no_change_needed', 'answers', 'warnings', 'complete'],
  properties: {
    operations: { type: 'array', items: OP_SCHEMA },
    no_change_needed: {
      type: 'array',
      description: 'Anforderungen, die keine Planänderung brauchen (z. B. reine Information, schon im Plan enthalten) - mit kurzer Begründung.',
      items: { type: 'object', additionalProperties: false, required: ['id', 'reason'], properties: { id: { type: 'string' }, reason: { type: 'string' } } },
    },
    answers: { type: 'array', items: { type: 'string' }, description: 'Antworten auf Fragen der Anweisung (z. B. „wie lange würde es dauern“) - konkret mit Zahlen, Rechenweg und Ergebnis (Stunden, Arbeitstage, voraussichtliches Datum). Leer, wenn keine Frage gestellt ist oder sie schon beantwortet wurde.' },
    warnings: { type: 'array', items: { type: 'string' }, description: 'Kurze Hinweise: getroffene Annahmen, Rechenwege, offene Fragen, ergänzte Punkte.' },
    complete: { type: 'boolean', description: 'true, wenn alle Änderungen für diesen Teil der Anweisung enthalten sind. false, wenn noch Änderungen fehlen (Antwort wäre sonst zu lang) - du wirst dann zum Weitermachen aufgefordert.' },
  },
} as const

const LOCATE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['areas'],
  properties: {
    areas: { type: 'array', items: { type: 'string' }, description: 'Schlüssel (v…) aller Phasen/Gruppen, die für diesen Teil der Anweisung gelesen oder geändert werden müssen - lieber eine zu viel als eine zu wenig.' },
  },
} as const

export interface PlanOp {
  op: 'add' | 'update' | 'remove' | 'move' | 'link' | 'unlink'
  req?: string | null
  key: string | null
  name: string | null
  type: TaskType | null
  parent_key: string | null
  after_key: string | null
  duration: number | null
  work_hours: number | null
  hours_per_day: number | null
  days_per_week: number | null
  start_no_earlier: string | null
  responsible: string | null
  notes: string | null
  predecessor_key: string | null
  dep_type: 'FS' | 'SS' | 'FF' | 'SF' | null
  lag_days: number | null
  depends_on: { predecessor_key: string; type: 'FS' | 'SS' | 'FF' | 'SF'; lag_days: number }[]
}

interface EditResponse { operations?: PlanOp[]; no_change_needed?: { id: string; reason: string }[]; answers?: string[]; warnings?: string[]; complete?: boolean }

const OPS_PER_RESPONSE = 80
const INSTRUCTION_CHUNK_CHARS = 8_000
const VIEW_LIMIT_CHARS = 90_000
const MAX_ROUNDS_PER_CHUNK = 15

const SYSTEM_EDIT = `Du bist Projektplaner und überarbeitest einen bestehenden Projektplan nach einer Anweisung.
Du gibst NICHT den Plan zurück, sondern nur eine Liste von Änderungen (operations). Alles, was du nicht änderst, bleibt exakt erhalten.

Planansicht (eine Zeile je Vorgang): key | Art | übergeordnet | Dauer AT | verantwortlich | Vorgänger | fester Start | Bezeichnung | Notiz (gekürzt)
Vorgänger-Schreibweise: v7 = Ende→Start; v7:SS+2 = Start→Start mit 2 AT Abstand.

Regeln:
- Du bekommst die Anweisung zusätzlich als nummerierte ANFORDERUNGEN (R1, R2, …). Setze jede OFFENE Anforderung vollständig um und nenne bei jeder Operation in req die Anforderung, die sie umsetzt. Braucht eine Anforderung keine Planänderung, führe sie in no_change_needed mit Begründung auf. Der Nutzer erwartet, dass nichts fehlt - eine einzelne Operation für eine lange Anweisung ist fast immer zu wenig.
- Anforderungen mit Mengen (z. B. „jedes Modul“, „alle Wege“, „pro Modul 2 Tage“) bedeuten je Modul/Weg einen eigenen Vorgang bzw. eine eigene Berechnung - nicht eine Sammelposition.
- Stehen FAKTEN im Auftrag (z. B. KLIM-Tabelle mit Lektionen und Sprechzeit je Modul und Weg), rechne mit genau diesen Zahlen. Schätze nur, wo die Fakten nichts hergeben, und sage das in warnings.
- Ändere nur, was die Anweisung betrifft oder was zwingend daraus folgt. Bestehende Vorgänge nicht umbenennen oder umsortieren, wenn es nicht verlangt ist.
- Neue Vorgänge (op add) bekommen neue Schlüssel n1, n2, … (nie einen v-Schlüssel) und eine sinnvolle Stelle (parent_key, after_key). Neue Phasen zuerst anlegen, dann ihre Vorgänge mit parent_key = Schlüssel der neuen Phase.
- Zeitberechnungen aus Stunden (z. B. Aufnahmezeit, Schnitt = Vielfaches der Aufnahmezeit) gibst du als work_hours (+ hours_per_day, days_per_week) an - das Programm rechnet die Arbeitstage exakt aus. Schreibe deine Herleitung kurz in notes (z. B. „S-Weg Finanzen: 95 Min Sprechzeit = 1,6 Std.“).
- Feste Termine aus der Anweisung („ab 9.11.“, „Ende November“) als start_no_earlier (JJJJ-MM-TT). Fehlt das Jahr, nimm das nächstliegende künftige Datum ab heute.
- Abhängigkeiten sorgfältig: Was zwingend vorher fertig sein muss, wird verknüpft (depends_on bei add, sonst op link). Unabhängige Arbeiten laufen parallel - keine künstlichen Ketten.
- Jede neue Phase/jeder neue Block bekommt einen Ziel-Meilenstein (type milestone, Dauer 0) am Ende, der den erreichten Zustand benennt und von den letzten Vorgängen des Blocks abhängt.
- Wird um Ergänzungen gebeten („falls dir noch etwas einfällt“), ergänze fachlich Wichtiges und nenne es in warnings.
- Personen nur aus der Personenliste als responsible verwenden. Externe Personen (z. B. Fotograf, Dienstleister) gehören in Bezeichnung oder Notiz - dafür KEINEN Hinweis in warnings.
- Stellt die Anweisung eine Frage (z. B. „wie lange würde es dauern“), beantworte sie in answers konkret mit Rechenweg und Ergebnis - zusätzlich zu den Planänderungen.
- Benenne neue Vorgänge nach ihrem tatsächlichen Inhalt (nicht „Marketingaufgaben“, wenn es um Texte geht).
- Beim Entfernen einer Phase mit Inhalt die enthaltenen Vorgänge ebenfalls einzeln entfernen, sonst rücken sie eine Ebene nach oben.
- Höchstens ${OPS_PER_RESPONSE} Operationen pro Antwort. Sind mehr nötig, setze complete=false - du wirst zum Weitermachen aufgefordert. Sonst complete=true.
- Antworte ausschließlich im vorgegebenen JSON-Schema, auf Deutsch.`

const SYSTEM_LOCATE = `Du bist Projektplaner. Du siehst die Gliederung (Phasen und Gruppen) eines sehr großen Plans und einen Teil einer Änderungsanweisung.
Nenne alle Bereiche (Schlüssel), die für diesen Teil gelesen oder geändert werden müssen - auch solche, an die neue Vorgänge angehängt oder von denen sie abhängen werden. Lieber einen Bereich zu viel als zu wenig. Antworte im JSON-Schema.`

// ---------------------------------------------------------------- Planansicht mit Kurzkennungen
interface View {
  text: string
  aliasToKey: Map<string, string>
  keyToAlias: Map<string, string>
}

function oneLine(s: string | null | undefined, max: number): string {
  const t = (s ?? '').replace(/\s+/g, ' ').trim()
  return t.length > max ? `${t.slice(0, max)}…` : t
}

function aliases(plan: ExtractedPlan): { aliasToKey: Map<string, string>; keyToAlias: Map<string, string> } {
  const aliasToKey = new Map<string, string>()
  const keyToAlias = new Map<string, string>()
  plan.tasks.forEach((t, i) => {
    aliasToKey.set(`v${i + 1}`, t.key)
    keyToAlias.set(t.key, `v${i + 1}`)
  })
  return { aliasToKey, keyToAlias }
}

function taskLine(t: ExtractedTask, a: (k: string) => string, notesMax: number): string {
  const deps = (t.depends_on ?? []).map((d) => `${a(d.predecessor_key)}${d.type && d.type !== 'FS' ? `:${d.type}` : ''}${d.lag_days ? `${d.lag_days > 0 ? '+' : ''}${d.lag_days}` : ''}`).join(',')
  return [a(t.key), t.type, t.parent_key ? a(t.parent_key) : '-', String(t.type === 'milestone' ? 0 : (t.duration ?? 1)), t.responsible || '-', deps || '-', t.start_no_earlier || '-', oneLine(t.name, 160), oneLine(t.notes, notesMax) || '-'].join(' | ')
}

/** Vollständige Ansicht; ist sie zu groß, nur die gewählten Bereiche im Detail und der Rest als Gliederung. */
function buildView(plan: ExtractedPlan, focus?: Set<string>): View {
  const { aliasToKey, keyToAlias } = aliases(plan)
  const a = (k: string) => keyToAlias.get(k) ?? k
  const head = `Plan: ${plan.name} (${plan.tasks.length} Vorgänge)\nSpalten: key | Art | übergeordnet | Dauer AT | verantwortlich | Vorgänger | fester Start | Bezeichnung | Notiz`
  if (!focus) {
    const lines = plan.tasks.map((t) => taskLine(t, a, t.type === 'phase' || t.type === 'group' ? 400 : 160))
    return { text: `${head}\n${lines.join('\n')}`, aliasToKey, keyToAlias }
  }
  // Fokus: Vorgänge in den gewählten Bereichen voll, übrige Phasen/Gruppen als Gliederungszeile
  const byKey = new Map(plan.tasks.map((t) => [t.key, t]))
  const inFocus = (t: ExtractedTask): boolean => {
    let cur: ExtractedTask | undefined = t
    let guard = 0
    while (cur && guard++ < 50) {
      if (focus.has(cur.key)) return true
      cur = cur.parent_key ? byKey.get(cur.parent_key) : undefined
    }
    return false
  }
  const counts = childCounts(plan)
  const lines = plan.tasks
    .filter((t) => inFocus(t) || t.type === 'phase' || t.type === 'group')
    .map((t) => (inFocus(t) ? taskLine(t, a, t.type === 'phase' || t.type === 'group' ? 1200 : 300) : `${taskLine(t, a, 120)} [Gliederung: ${counts.get(t.key) ?? 0} Vorgänge nicht im Detail gezeigt]`))
  return { text: `${head}\nHinweis: Nur die für diese Anweisung relevanten Bereiche sind im Detail gezeigt; die übrigen Phasen erscheinen nur als Gliederungszeile. Auf alle Schlüssel darfst du verweisen.\n${lines.join('\n')}`, aliasToKey, keyToAlias }
}

function childCounts(plan: ExtractedPlan): Map<string, number> {
  const counts = new Map<string, number>()
  const byKey = new Map(plan.tasks.map((t) => [t.key, t]))
  for (const t of plan.tasks) {
    let p = t.parent_key ? byKey.get(t.parent_key) : undefined
    let guard = 0
    while (p && guard++ < 50) {
      counts.set(p.key, (counts.get(p.key) ?? 0) + 1)
      p = p.parent_key ? byKey.get(p.parent_key) : undefined
    }
  }
  return counts
}

function outlineView(plan: ExtractedPlan): View {
  const { aliasToKey, keyToAlias } = aliases(plan)
  const a = (k: string) => keyToAlias.get(k) ?? k
  const counts = childCounts(plan)
  const lines = plan.tasks
    .filter((t) => t.type === 'phase' || t.type === 'group')
    .map((t) => `${a(t.key)} | ${t.parent_key ? a(t.parent_key) : '-'} | ${oneLine(t.name, 140)} | ${counts.get(t.key) ?? 0} Vorgänge | ${oneLine(t.notes, 160) || '-'}`)
  const loose = plan.tasks.filter((t) => !t.parent_key && t.type !== 'phase' && t.type !== 'group').length
  return { text: `Gliederung: key | übergeordnet | Bezeichnung | Umfang | Notiz\n${lines.join('\n')}${loose ? `\n(${loose} Vorgänge ohne Phase auf oberster Ebene)` : ''}`, aliasToKey, keyToAlias }
}

// ---------------------------------------------------------------- Anweisung zerlegen
/** Lange Anweisungen an Absatz-/Satzgrenzen in Teile zerlegen (Reihenfolge bleibt). */
export function splitInstruction(text: string, max = INSTRUCTION_CHUNK_CHARS): string[] {
  const t = text.trim()
  if (t.length <= max) return [t]
  const units = t.split(/\n\s*\n/).flatMap((p) => (p.length <= max ? [p] : p.split(/(?<=[.!?])\s+|\n/)))
  const out: string[] = []
  let cur = ''
  for (const u of units) {
    const piece = u.length > max ? u.match(new RegExp(`[\\s\\S]{1,${max}}`, 'g')) ?? [u] : [u]
    for (const p of piece) {
      if (cur && cur.length + p.length + 2 > max) {
        out.push(cur)
        cur = ''
      }
      cur = cur ? `${cur}\n\n${p}` : p
    }
  }
  if (cur) out.push(cur)
  return out
}

// ---------------------------------------------------------------- Operationen anwenden
export interface ApplyStats { added: number; updated: number; removed: number; moved: number; linked: number; unlinked: number }

/** Dauer aus Stunden: aufgerundet auf ganze Tage, bei abweichendem Wochenrhythmus auf Mo–Fr umgerechnet. */
export function durationFromHours(hours: number, hoursPerDay?: number | null, daysPerWeek?: number | null): { days: number; note: string } {
  const hpd = hoursPerDay && hoursPerDay > 0 ? hoursPerDay : 8
  const workDays = Math.max(1, Math.ceil(hours / hpd - 1e-9))
  const dpw = daysPerWeek && daysPerWeek > 0 && daysPerWeek !== 5 ? daysPerWeek : 5
  const days = dpw === 5 ? workDays : Math.max(1, Math.ceil((workDays * 5) / dpw - 1e-9))
  const fmt = (n: number) => String(Math.round(n * 100) / 100).replace('.', ',')
  const note = `Berechnung: ${fmt(hours)} Std. ÷ ${fmt(hpd)} Std./Tag = ${workDays} Arbeitstage${dpw !== 5 ? ` bei ${fmt(dpw)} Tagen/Woche ≙ ${days} AT im Kalender (Mo–Fr)` : ''}`
  return { days, note }
}

/**
 * Wendet Operationen auf einen Plan an. Verweise dürfen Kurzkennungen (v…), neue Schlüssel (n…)
 * oder echte Schlüssel sein. Ungültiges wird übersprungen und als Hinweis gemeldet.
 */
export function applyPlanOps(plan: ExtractedPlan, ops: PlanOp[], aliasToKey: Map<string, string>, newKeyPrefix: string): { plan: ExtractedPlan; stats: ApplyStats; warnings: string[] } {
  const tasks: ExtractedTask[] = plan.tasks.map((t) => ({ ...t, depends_on: [...(t.depends_on ?? [])] }))
  const stats: ApplyStats = { added: 0, updated: 0, removed: 0, moved: 0, linked: 0, unlinked: 0 }
  const warnings: string[] = []
  const existing = new Set(tasks.map((t) => t.key))
  const newKeys = new Map<string, string>()
  let counter = 0
  const freshKey = () => {
    let k = ''
    do k = `${newKeyPrefix}${++counter}`
    while (existing.has(k))
    existing.add(k)
    return k
  }
  // Neue Schlüssel vorab vergeben, damit Verweise innerhalb derselben Antwort (auch nach vorn) funktionieren
  for (const op of ops) if (op.op === 'add' && op.key && !newKeys.has(op.key) && !aliasToKey.has(op.key)) newKeys.set(op.key, freshKey())

  const resolve = (ref: string | null | undefined): string | null => {
    if (!ref) return null
    const r = ref.trim()
    const k = aliasToKey.get(r) ?? newKeys.get(r) ?? (existing.has(r) ? r : null)
    return k && tasks.some((t) => t.key === k) ? k : null
  }
  const find = (key: string | null) => (key ? tasks.find((t) => t.key === key) : undefined)
  const isAncestor = (anc: string, key: string): boolean => {
    let cur = find(key)
    let guard = 0
    while (cur?.parent_key && guard++ < 100) {
      if (cur.parent_key === anc) return true
      cur = find(cur.parent_key)
    }
    return false
  }
  /** Würde „pred → succ“ einen Kreis schließen? (succ ist schon direkt/indirekt Vorgänger von pred) */
  const createsCycle = (pred: string, succ: string): boolean => {
    const seen = new Set<string>()
    const stack = [pred]
    while (stack.length) {
      const k = stack.pop()!
      if (k === succ) return true
      if (seen.has(k)) continue
      seen.add(k)
      for (const d of find(k)?.depends_on ?? []) stack.push(d.predecessor_key)
    }
    return false
  }
  /** Einfügestelle im Array: direkt hinter dem Geschwister (samt dessen Unterbaum), sonst hinter dem letzten Element der Eltern. */
  const insertIndex = (parent: string | null, after: string | null): number => {
    const lastOfSubtree = (key: string): number => {
      let last = tasks.findIndex((t) => t.key === key)
      tasks.forEach((t, i) => { if (i > last && isAncestor(key, t.key)) last = i })
      return last
    }
    if (after) {
      const a = find(after)
      if (a && (a.parent_key ?? null) === parent) return lastOfSubtree(after) + 1
    }
    if (parent) return lastOfSubtree(parent) + 1
    return tasks.length
  }
  const durationOf = (op: PlanOp, type: TaskType, fallback: number | undefined): { duration: number | undefined; note: string } => {
    if (type === 'milestone') return { duration: 0, note: '' }
    if (op.work_hours && op.work_hours > 0) {
      const r = durationFromHours(op.work_hours, op.hours_per_day, op.days_per_week)
      return { duration: r.days, note: r.note }
    }
    if (op.duration !== null && op.duration !== undefined && op.duration >= 0) {
      const d = Math.max(1, Math.round(op.duration))
      if (op.days_per_week && op.days_per_week > 0 && op.days_per_week !== 5) return { duration: Math.max(1, Math.ceil((d * 5) / op.days_per_week)), note: `Umrechnung: ${d} Tage bei ${op.days_per_week} Tagen/Woche ≙ ${Math.max(1, Math.ceil((d * 5) / op.days_per_week))} AT (Mo–Fr)` }
      return { duration: d, note: '' }
    }
    return { duration: fallback, note: '' }
  }
  const validDate = (s: string | null) => (s && /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : null)
  const joinNotes = (...parts: (string | null | undefined)[]) => parts.map((p) => (p ?? '').trim()).filter(Boolean).join('\n')

  for (const op of ops) {
    try {
      switch (op.op) {
        case 'add': {
          const key = (op.key && newKeys.get(op.key)) || freshKey()
          const name = (op.name ?? '').trim()
          if (!name) { warnings.push('Ein neuer Vorgang ohne Bezeichnung wurde übersprungen.'); break }
          const type: TaskType = op.type ?? 'task'
          const parent = resolve(op.parent_key)
          const d = durationOf(op, type, 1)
          const t: ExtractedTask = {
            key, name, type, parent_key: parent, duration: d.duration ?? 1,
            responsible: op.responsible?.trim() || null, notes: joinNotes(op.notes, d.note), source_excerpt: null,
            start_no_earlier: validDate(op.start_no_earlier), depends_on: [],
          }
          tasks.splice(insertIndex(parent, resolve(op.after_key)), 0, t)
          for (const dep of op.depends_on ?? []) {
            const p = resolve(dep.predecessor_key)
            if (p && p !== key && !createsCycle(p, key)) t.depends_on!.push({ predecessor_key: p, type: dep.type ?? 'FS', lag_days: dep.lag_days | 0 })
          }
          stats.added++
          break
        }
        case 'update': {
          const t = find(resolve(op.key))
          if (!t) { warnings.push(`Änderung übersprungen: Vorgang ${op.key} nicht gefunden.`); break }
          if (op.name?.trim()) t.name = op.name.trim()
          if (op.type) t.type = op.type
          const d = durationOf(op, t.type, undefined)
          if (d.duration !== undefined) t.duration = d.duration
          if (t.type === 'milestone') t.duration = 0
          if (op.responsible?.trim()) t.responsible = op.responsible.trim()
          const sne = validDate(op.start_no_earlier)
          if (sne) t.start_no_earlier = sne
          if (op.notes?.trim() || d.note) t.notes = joinNotes(t.notes, op.notes, d.note)
          stats.updated++
          break
        }
        case 'remove': {
          const key = resolve(op.key)
          const t = find(key)
          if (!t || !key) break
          const idx = tasks.indexOf(t)
          tasks.splice(idx, 1)
          for (const x of tasks) {
            if (x.parent_key === key) x.parent_key = t.parent_key ?? null
            x.depends_on = (x.depends_on ?? []).filter((d) => d.predecessor_key !== key)
          }
          stats.removed++
          break
        }
        case 'move': {
          const key = resolve(op.key)
          const t = find(key)
          if (!t || !key) { warnings.push(`Verschieben übersprungen: Vorgang ${op.key} nicht gefunden.`); break }
          const parent = resolve(op.parent_key)
          if (parent && (parent === key || isAncestor(key, parent))) { warnings.push(`„${t.name}“ kann nicht unter sich selbst verschoben werden.`); break }
          // Ganzen Unterbaum herauslösen und an der neuen Stelle wieder einsetzen
          const block = tasks.filter((x) => x.key === key || isAncestor(key, x.key))
          for (const b of block) tasks.splice(tasks.indexOf(b), 1)
          t.parent_key = parent
          tasks.splice(insertIndex(parent, resolve(op.after_key)), 0, ...block)
          stats.moved++
          break
        }
        case 'link': {
          const succ = find(resolve(op.key))
          const pred = resolve(op.predecessor_key)
          if (!succ || !pred || pred === succ.key) { warnings.push('Eine Abhängigkeit wurde übersprungen (Vorgang nicht gefunden).'); break }
          if (createsCycle(pred, succ.key)) { warnings.push(`Abhängigkeit „${find(pred)?.name}“ → „${succ.name}“ übersprungen: sie würde einen Kreis bilden.`); break }
          const existingDep = succ.depends_on!.find((d) => d.predecessor_key === pred)
          if (existingDep) {
            existingDep.type = op.dep_type ?? existingDep.type
            existingDep.lag_days = op.lag_days ?? existingDep.lag_days
          } else succ.depends_on!.push({ predecessor_key: pred, type: op.dep_type ?? 'FS', lag_days: op.lag_days ?? 0 })
          stats.linked++
          break
        }
        case 'unlink': {
          const succ = find(resolve(op.key))
          const pred = resolve(op.predecessor_key)
          if (!succ || !pred) break
          const before = succ.depends_on!.length
          succ.depends_on = succ.depends_on!.filter((d) => d.predecessor_key !== pred)
          if (succ.depends_on.length < before) stats.unlinked++
          break
        }
      }
    } catch (e) {
      warnings.push(`Eine Änderung konnte nicht angewendet werden: ${(e as Error).message}`)
    }
  }
  return { plan: { ...plan, tasks: treeOrder(tasks) }, stats, warnings }
}

/** Reihenfolge so herstellen, dass jede Phase direkt von ihren Vorgängen gefolgt wird (Geschwisterreihenfolge bleibt). */
function treeOrder(tasks: ExtractedTask[]): ExtractedTask[] {
  const keys = new Set(tasks.map((t) => t.key))
  const children = new Map<string | null, ExtractedTask[]>()
  for (const t of tasks) {
    const p = t.parent_key && keys.has(t.parent_key) ? t.parent_key : null
    if (!children.has(p)) children.set(p, [])
    children.get(p)!.push(t)
  }
  const out: ExtractedTask[] = []
  const seen = new Set<string>()
  const walk = (p: string | null) => {
    for (const c of children.get(p) ?? []) {
      if (seen.has(c.key)) continue
      seen.add(c.key)
      out.push(c)
      walk(c.key)
    }
  }
  walk(null)
  for (const t of tasks) if (!seen.has(t.key)) out.push(t)
  return out
}

function describeStats(s: ApplyStats): string {
  return [s.added && `${s.added} neu`, s.updated && `${s.updated} geändert`, s.moved && `${s.moved} verschoben`, s.removed && `${s.removed} entfernt`, s.linked && `${s.linked} Abhängigkeiten gesetzt`, s.unlinked && `${s.unlinked} Abhängigkeiten gelöst`].filter(Boolean).join(', ') || 'keine Änderungen'
}

/** „(4 AT, ab 23.11.2026)“ für den Bericht - dieselbe Rechnung wie beim Anwenden. */
function describeTiming(o: PlanOp): string {
  const parts: string[] = []
  if (o.type === 'milestone') parts.push('Meilenstein')
  else if (o.work_hours && o.work_hours > 0) {
    const d = durationFromHours(o.work_hours, o.hours_per_day, o.days_per_week)
    parts.push(`${String(Math.round(o.work_hours * 10) / 10).replace('.', ',')} Std → ${d.days} AT`)
  } else if (o.duration && o.type !== 'phase' && o.type !== 'group') parts.push(`${o.duration} AT`)
  if (o.start_no_earlier) parts.push(`ab ${o.start_no_earlier.slice(8, 10)}.${o.start_no_earlier.slice(5, 7)}.${o.start_no_earlier.slice(0, 4)}`)
  return parts.length ? ` (${parts.join(', ')})` : ''
}

function summarizeOps(ops: PlanOp[]): string {
  return ops.slice(-120).map((o) => {
    const name = o.name ?? ''
    if (o.op === 'add') return `+ ${o.key} „${name}“`
    if (o.op === 'link' || o.op === 'unlink') return `${o.op} ${o.predecessor_key}→${o.key}`
    return `${o.op} ${o.key}${name ? ` „${name}“` : ''}`
  }).join('\n')
}

// ---------------------------------------------------------------- Anforderungsliste
const REQ_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['requirements'],
  properties: {
    requirements: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'text', 'items', 'count'],
        properties: {
          id: { type: 'string', description: 'R1, R2, … fortlaufend' },
          text: { type: 'string', description: 'Ein einzelner, konkreter Punkt der Anweisung in einem Satz - mit allen Zahlen, Daten, Namen und Bedingungen daraus.' },
          items: {
            type: 'array',
            description: 'Enthält der Punkt eine Aufzählung („A, B, C und D“), hier JEDES Element einzeln - jedes wird ein eigener Vorgang. Sonst leer.',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['text', 'count'],
              properties: {
                text: { type: 'string', description: 'Das Element als eigenständiger Auftrag (z. B. „Entscheidungstisch für jedes Modul entwickeln“)' },
                count: { type: ['integer', 'null'], description: 'Wie viele getrennte Vorgänge verlangt sind („für jedes Modul“ bei 11 Modulen → 11), sonst null' },
              },
            },
          },
          count: { type: ['integer', 'null'], description: 'Wie viele getrennte Vorgänge dieser Punkt verlangt („pro Modul“, „für jedes Modul“, „je Weg“ → Anzahl laut Fakten/Plan), sonst null' },
        },
      },
    },
  },
} as const

const SYSTEM_REQ = `Du zerlegst eine Änderungsanweisung für einen Projektplan in eine vollständige Liste einzelner Anforderungen.
- Jeder eigenständige Punkt wird eine Anforderung: jede zu ergänzende oder zu ändernde Aufgabe/Phase, jede Berechnung (z. B. Aufnahmedauer, Schnittdauer), jede Reihenfolge, jeder Termin, jede Regel (z. B. Arbeitszeit pro Tag/Woche), jede Abhängigkeit („soll anfangen, wenn …“).
- Aufzählungen in einem Satz („Sprechertexte formulieren, Dopplungen raus, Lücken beheben, …“): jedes Element einzeln in items.
- „für jedes Modul“, „pro Modul“, „je Weg“: in count die Anzahl der getrennten Vorgänge angeben (Anzahl laut FAKTEN bzw. Plan, z. B. 11 Module der Wirbelsäule).
- Wiederholt sich die Anweisung wörtlich, jeden Punkt nur einmal aufnehmen.
- Bittet die Anweisung um eigene Ergänzungen („falls dir noch etwas einfällt“), füge 2-6 fachlich wichtige, konkrete Ergänzungen als eigene Anforderungen hinzu und beginne ihren Text mit „Ergänzung:“.
- Formuliere jede Anforderung so, dass sie für sich allein verständlich und prüfbar ist (Zahlen, Daten, Namen übernehmen).
- Antworte im JSON-Schema, auf Deutsch.`

interface Requirement { id: string; text: string; count?: number | null }
interface RawRequirement { id: string; text: string; items?: { text: string; count: number | null }[]; count?: number | null }

// ---------------------------------------------------------------- Ablauf
export type EditProgress = { type: 'progress'; tasks: number; message?: string }

export interface EditOptions {
  people?: string[]
  /** Bekannte Fakten, die der Plan nicht enthält (z. B. heutiges Datum, Projektstart) */
  context?: string
  /** Verbindliches Fachwissen (z. B. KLIM-Faktentabelle) - statt Schätzungen zu verwenden */
  facts?: string
  cache?: StepCache
  label?: string
}

const MAX_STALL_ROUNDS = 2

/**
 * Überarbeitet einen Plan nach einer beliebig langen Anweisung:
 *   1. Anweisung in nummerierte Einzelanforderungen zerlegen (R1, R2, …)
 *   2. Änderungen in Runden planen; jede Operation nennt ihre Anforderung
 *   3. Das Programm prüft die Abdeckung selbst und fordert offene Anforderungen nach -
 *      die KI kann nicht „fertig“ melden, solange Punkte fehlen
 * Liefert den vollständigen neuen Plan (unveränderte Vorgänge exakt erhalten) und je
 * Anforderung, was umgesetzt wurde.
 */
export async function* editPlanStream(plan: ExtractedPlan, instruction: string, opts: EditOptions = {}): AsyncGenerator<EditProgress | { type: 'done'; plan: ExtractedPlan }> {
  const text = instruction.trim()
  if (!text) throw new HttpError(400, 'Bitte beschreibe, was geändert werden soll.')
  const label = opts.label ?? 'Überarbeitung'
  const peopleLine = opts.people?.length ? `\nPersonenliste (nur diese als responsible): ${opts.people.join('; ')}` : ''
  const today = new Date().toISOString().slice(0, 10)
  const contextLine = `\nHeute: ${today}.${opts.context ? ` ${opts.context}` : ''}`
  const factsBlock = opts.facts ? `\n\nFAKTEN (verbindlich - rechne mit diesen Zahlen, schätze nicht):\n${opts.facts}` : ''
  const parts = splitInstruction(text)
  const total: ApplyStats = { added: 0, updated: 0, removed: 0, moved: 0, linked: 0, unlinked: 0 }
  const notes: string[] = []
  const report: string[] = []
  const answers: string[] = []
  let current = plan
  const baseHash = stepHash(JSON.stringify(plan.tasks.map((t) => [t.key, t.name, t.parent_key, t.duration])) + text + (opts.facts ?? ''))
  const changed = () => total.added + total.updated + total.removed + total.moved + total.linked

  for (let pi = 0; pi < parts.length; pi++) {
    const part = parts[pi]!
    const partLabel = parts.length > 1 ? `Teil ${pi + 1} von ${parts.length}` : ''
    const prefix = partLabel ? `${partLabel}: ` : ''

    // 1) Anforderungen
    yield { type: 'progress', tasks: changed(), message: `${prefix}Anweisung wird in Einzelpunkte zerlegt …` }
    const reqRes = await cachedStep(opts.cache, `${baseHash}:req:${pi}`, () =>
      aiJson<{ requirements: RawRequirement[] }>({ label: `${label}: Anforderungen${partLabel ? ` ${partLabel}` : ''}`, system: SYSTEM_REQ, user: `Anweisung${partLabel ? ` (${partLabel})` : ''}:\n${part}${contextLine}${factsBlock}`, schema: REQ_SCHEMA, schemaName: 'anforderungen', effort: 'medium', maxOutputTokens: 12_000 }),
    )
    // Aufzählungen werden zu eigenen Anforderungen (R9.1, R9.2, …) - so kann nichts in einem Sammelvorgang verschwinden
    const tp = pi > 0 ? `T${pi + 1}` : ''
    const clampCount = (n: number | null | undefined) => (n && n > 1 ? Math.min(60, Math.round(n)) : null)
    const reqs: Requirement[] = (reqRes.requirements ?? []).filter((r) => r?.text?.trim()).flatMap((r, i) => {
      const items = (r.items ?? []).filter((it) => it?.text?.trim())
      if (items.length >= 2) return items.map((it, k) => ({ id: `${tp}R${i + 1}.${k + 1}`, text: it.text.trim(), count: clampCount(it.count) }))
      return [{ id: `${tp}R${i + 1}`, text: r.text.trim(), count: clampCount(r.count ?? items[0]?.count) }]
    })
    if (!reqs.length) reqs.push({ id: 'R1', text: part.slice(0, 2000) })
    const covered = new Map<string, string[]>() // Anforderung → Kurzbeschreibung der Änderungen
    const need = new Map(reqs.map((r) => [r.id, r.count ?? 1]))
    const isDone = (id: string) => noChange.has(id) || (covered.get(id)?.length ?? 0) >= (need.get(id) ?? 1)
    const noChange = new Map<string, string>()
    const reqIds = new Map(reqs.map((r) => [r.id.toUpperCase(), r.id]))
    // Die KI nummeriert R1, R2 …; bei mehreren Teilen auf die Teil-Kennung abbilden
    const reqOf = (raw: string | null | undefined): string | null => {
      if (!raw) return null
      const k = raw.trim().toUpperCase()
      return reqIds.get(k) ?? reqIds.get(`${pi > 0 ? `T${pi + 1}` : ''}${k}`) ?? null
    }

    // 2) Änderungen in Runden, bis jede Anforderung abgedeckt ist
    let opsSoFar: PlanOp[] = []
    let rounds = 0
    let stall = 0
    let opLimit = OPS_PER_RESPONSE
    for (;;) {
      const open = reqs.filter((r) => !isDone(r.id))
      if (!open.length) break
      rounds++
      if (rounds > MAX_ROUNDS_PER_CHUNK || stall >= MAX_STALL_ROUNDS) break
      yield { type: 'progress', tasks: changed(), message: `${prefix}${reqs.length - open.length} von ${reqs.length} Punkten umgesetzt – ${rounds === 1 ? 'Änderungen werden geplant …' : `Runde ${rounds} …`}` }

      // Große Pläne: zuerst die betroffenen Bereiche bestimmen
      let view = buildView(current)
      if (view.text.length > VIEW_LIMIT_CHARS) {
        const outline = outlineView(current)
        const loc = await cachedStep(opts.cache, `${baseHash}:locate:${pi}:${rounds}`, () =>
          aiJson<{ areas: string[] }>({ label: `${label}: Bereiche bestimmen`, system: SYSTEM_LOCATE, user: `Anforderungen:\n${open.map((r) => `${r.id}: ${r.text}`).join('\n')}\n\n${outline.text}`, schema: LOCATE_SCHEMA, schemaName: 'bereiche', effort: 'low', maxOutputTokens: 4_000 }),
        )
        const focus = new Set((loc.areas ?? []).map((k) => outline.aliasToKey.get(k.trim())).filter((k): k is string => !!k))
        view = buildView(current, focus.size ? focus : undefined)
      }

      const checklist = reqs.map((r) => {
        const n = covered.get(r.id)?.length ?? 0
        const want = need.get(r.id) ?? 1
        return `${isDone(r.id) ? '[erledigt]' : want > 1 ? `[OFFEN – ${n} von ${want} Vorgängen]` : '[OFFEN]'} ${r.id}: ${r.text}${want > 1 ? ` (je ein eigener Vorgang, insgesamt ${want})` : ''}`
      }).join('\n')
      const already = opsSoFar.length ? `\n\nBereits umgesetzte Änderungen (NICHT wiederholen, im Plan oben schon enthalten):\n${summarizeOps(opsSoFar)}` : ''
      const earlier = pi > 0 ? `\n\nFrühere Teile der Anweisung sind bereits umgesetzt und im Plan enthalten.` : ''
      const user = `Anweisung${partLabel ? ` (${partLabel})` : ''}:\n${part}${peopleLine}${contextLine}${earlier}${factsBlock}\n\nANFORDERUNGEN - setze jetzt alle OFFENEN um (jede Operation nennt in req ihre Anforderung; Punkte ohne nötige Planänderung in no_change_needed):\n${checklist}\n\nHöchstens ${opLimit} Operationen in dieser Antwort.\n\n${view.text}${already}`

      let res: EditResponse
      try {
        res = await cachedStep(opts.cache, `${baseHash}:edit:${pi}:${rounds}:${opLimit}`, () =>
          aiJson<EditResponse>({ label: `${label}${partLabel ? ` ${partLabel}` : ''} Runde ${rounds}`, system: SYSTEM_EDIT, user, schema: EDIT_SCHEMA, schemaName: 'aenderungen', effort: 'medium', maxOutputTokens: 32_000 }),
        )
      } catch (e) {
        // Zu lange Antwort: dieselbe Runde mit weniger Operationen wiederholen
        if (e instanceof AiTruncatedError && opLimit > 10) {
          opLimit = Math.max(10, Math.floor(opLimit / 2))
          rounds--
          continue
        }
        throw e instanceof HttpError ? new HttpError(e.status, `${prefix}${e.message}`) : e
      }

      const ops = Array.isArray(res.operations) ? res.operations : []
      const nameBefore = new Map(current.tasks.map((t) => [t.key, t.name]))
      const targetName = (ref: string | null) => (ref ? nameBefore.get(view.aliasToKey.get(ref.trim()) ?? ref.trim()) : undefined)
      const applied = applyPlanOps(current, ops, view.aliasToKey, `ki${pi + 1}r${rounds}_`)
      current = applied.plan
      for (const k of Object.keys(total) as (keyof ApplyStats)[]) total[k] += applied.stats[k]
      for (const w of [...(res.warnings ?? []), ...applied.warnings]) if (w && !notes.includes(w)) notes.push(w)
      const units = () => reqs.reduce((s, r) => s + (noChange.has(r.id) ? (need.get(r.id) ?? 1) : Math.min(covered.get(r.id)?.length ?? 0, need.get(r.id) ?? 1)), 0)
      const unitsBefore = units()
      for (const o of ops) {
        const r = reqOf(o.req)
        if (!r) continue
        const list = covered.get(r) ?? []
        const tn = targetName(o.key)
        const was = tn ? ` „${tn}“` : ''
        list.push(
          o.op === 'add' ? `neu „${o.name ?? ''}“${describeTiming(o)}`
          : o.op === 'link' ? `Abhängigkeit${targetName(o.predecessor_key) ? ` „${targetName(o.predecessor_key)}“ →` : ''}${was}`
          : o.op === 'remove' ? `entfernt${was}`
          : o.op === 'move' ? `verschoben${was}`
          : `geändert${was}${o.name && o.name !== tn ? ` → „${o.name}“` : ''}${describeTiming(o)}`,
        )
        covered.set(r, list)
      }
      for (const n of res.no_change_needed ?? []) {
        const r = reqOf(n.id)
        if (r && !covered.has(r)) noChange.set(r, n.reason || 'keine Planänderung nötig')
      }
      for (const a of res.answers ?? []) {
        if (a?.trim() && !answers.includes(a.trim())) answers.push(a.trim())
      }
      // Operationen ohne Zuordnung zählen nicht als Abdeckung - aber als Fortschritt, falls sonst nichts passiert
      const unitsAfter = units()
      stall = unitsAfter > unitsBefore ? 0 : stall + 1
      opsSoFar = opsSoFar.concat(ops.map((o) => ({ ...o })))
    }

    // 3) Bericht je Anforderung
    for (const r of reqs) {
      const c = covered.get(r.id)
      const want = need.get(r.id) ?? 1
      if (c && c.length >= want) report.push(`✓ ${r.text} – ${c.length > 6 ? `${c.slice(0, 6).join(', ')} und ${c.length - 6} weitere` : c.join(', ')}`)
      else if (c) report.push(`◐ ${r.text} – nur ${c.length} von ${want} Vorgängen: ${c.slice(0, 6).join(', ')}`)
      else if (noChange.has(r.id)) report.push(`○ ${r.text} – ${noChange.get(r.id)}`)
      else report.push(`✗ NICHT umgesetzt: ${r.text} – bitte gezielt nachfordern`)
    }
  }

  const missing = report.filter((r) => r.startsWith('✗') || r.startsWith('◐')).length
  const head = `KI-Überarbeitung: ${describeStats(total)}. ${report.length - missing} von ${report.length} Punkten der Anweisung umgesetzt${missing ? `, ${missing} offen` : ''}.`
  const next = normalizeExtractedPlan({ ...current, warnings: [head, ...answers.map((a) => `Antwort: ${a}`), ...report, ...notes] }, { source: plan.source, name: plan.name, reference: plan.reference })
  if (!next.tasks.length) throw new HttpError(422, 'Nach der Überarbeitung ist der Plan leer - es wurde nichts übernommen.')
  yield { type: 'done', plan: next }
}
