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
  required: ['op', 'key', 'name', 'type', 'parent_key', 'after_key', 'duration', 'work_hours', 'hours_per_day', 'days_per_week', 'start_no_earlier', 'responsible', 'notes', 'predecessor_key', 'dep_type', 'lag_days', 'depends_on'],
  properties: {
    op: { type: 'string', enum: ['add', 'update', 'remove', 'move', 'link', 'unlink'], description: 'add = neuer Vorgang; update = Felder ändern; remove = entfernen; move = an andere Stelle/unter andere Phase; link/unlink = Abhängigkeit setzen/lösen' },
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
  required: ['operations', 'warnings', 'complete'],
  properties: {
    operations: { type: 'array', items: OP_SCHEMA },
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

interface EditResponse { operations?: PlanOp[]; warnings?: string[]; complete?: boolean }

const OPS_PER_RESPONSE = 80
const INSTRUCTION_CHUNK_CHARS = 8_000
const VIEW_LIMIT_CHARS = 90_000
const MAX_ROUNDS_PER_CHUNK = 15

const SYSTEM_EDIT = `Du bist Projektplaner und überarbeitest einen bestehenden Projektplan nach einer Anweisung.
Du gibst NICHT den Plan zurück, sondern nur eine Liste von Änderungen (operations). Alles, was du nicht änderst, bleibt exakt erhalten.

Planansicht (eine Zeile je Vorgang): key | Art | übergeordnet | Dauer AT | verantwortlich | Vorgänger | fester Start | Bezeichnung | Notiz (gekürzt)
Vorgänger-Schreibweise: v7 = Ende→Start; v7:SS+2 = Start→Start mit 2 AT Abstand.

Regeln:
- Setze die Anweisung VOLLSTÄNDIG um - jede genannte Aufgabe, Phase, Zeitangabe, Reihenfolge und jeder Termin. Der Nutzer erwartet, dass nichts fehlt.
- Ändere nur, was die Anweisung betrifft oder was zwingend daraus folgt. Bestehende Vorgänge nicht umbenennen oder umsortieren, wenn es nicht verlangt ist.
- Neue Vorgänge (op add) bekommen neue Schlüssel n1, n2, … (nie einen v-Schlüssel) und eine sinnvolle Stelle (parent_key, after_key). Neue Phasen zuerst anlegen, dann ihre Vorgänge mit parent_key = Schlüssel der neuen Phase.
- Zeitberechnungen aus Stunden (z. B. Aufnahmezeit, Schnitt = Vielfaches der Aufnahmezeit) gibst du als work_hours (+ hours_per_day, days_per_week) an - das Programm rechnet die Arbeitstage exakt aus. Schreibe deine Herleitung kurz in notes (z. B. „S-Weg Finanzen: 95 Min Sprechzeit = 1,6 Std.“).
- Feste Termine aus der Anweisung („ab 9.11.“, „Ende November“) als start_no_earlier (JJJJ-MM-TT). Fehlt das Jahr, nimm das nächstliegende künftige Datum ab heute.
- Abhängigkeiten sorgfältig: Was zwingend vorher fertig sein muss, wird verknüpft (depends_on bei add, sonst op link). Unabhängige Arbeiten laufen parallel - keine künstlichen Ketten.
- Jede neue Phase/jeder neue Block bekommt einen Ziel-Meilenstein (type milestone, Dauer 0) am Ende, der den erreichten Zustand benennt und von den letzten Vorgängen des Blocks abhängt.
- Wird um Ergänzungen gebeten („falls dir noch etwas einfällt“), ergänze fachlich Wichtiges und nenne es in warnings.
- Personen nur aus der Personenliste als responsible verwenden.
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

function summarizeOps(ops: PlanOp[]): string {
  return ops.slice(-120).map((o) => {
    const name = o.name ?? ''
    if (o.op === 'add') return `+ ${o.key} „${name}“`
    if (o.op === 'link' || o.op === 'unlink') return `${o.op} ${o.predecessor_key}→${o.key}`
    return `${o.op} ${o.key}${name ? ` „${name}“` : ''}`
  }).join('\n')
}

// ---------------------------------------------------------------- Ablauf
export type EditProgress = { type: 'progress'; tasks: number; message?: string }

export interface EditOptions {
  people?: string[]
  /** Bekannte Fakten, die der Plan nicht enthält (z. B. heutiges Datum, Projektstart) */
  context?: string
  cache?: StepCache
  label?: string
}

/**
 * Überarbeitet einen Plan nach einer beliebig langen Anweisung. Liefert den vollständigen neuen
 * Plan (unveränderte Vorgänge exakt erhalten) samt Hinweisen, was geändert wurde.
 */
export async function* editPlanStream(plan: ExtractedPlan, instruction: string, opts: EditOptions = {}): AsyncGenerator<EditProgress | { type: 'done'; plan: ExtractedPlan }> {
  const text = instruction.trim()
  if (!text) throw new HttpError(400, 'Bitte beschreibe, was geändert werden soll.')
  const label = opts.label ?? 'Überarbeitung'
  const peopleLine = opts.people?.length ? `\nPersonenliste (nur diese als responsible): ${opts.people.join('; ')}` : ''
  const today = new Date().toISOString().slice(0, 10)
  const contextLine = `\nHeute: ${today}.${opts.context ? ` ${opts.context}` : ''}`
  const parts = splitInstruction(text)
  const total: ApplyStats = { added: 0, updated: 0, removed: 0, moved: 0, linked: 0, unlinked: 0 }
  const notes: string[] = []
  let current = plan
  const baseHash = stepHash(JSON.stringify(plan.tasks.map((t) => [t.key, t.name, t.parent_key, t.duration])) + text)

  for (let pi = 0; pi < parts.length; pi++) {
    const part = parts[pi]!
    const partLabel = parts.length > 1 ? `Teil ${pi + 1} von ${parts.length}` : ''
    let opsSoFar: PlanOp[] = []
    let rounds = 0
    let opLimit = OPS_PER_RESPONSE
    for (;;) {
      rounds++
      if (rounds > MAX_ROUNDS_PER_CHUNK) {
        notes.push(`${partLabel || 'Anweisung'}: nach ${MAX_ROUNDS_PER_CHUNK} Runden beendet - bitte prüfen, ob alles umgesetzt ist.`)
        break
      }
      yield { type: 'progress', tasks: total.added + total.updated + total.removed + total.moved, message: `${partLabel ? `${partLabel}: ` : ''}${rounds === 1 ? 'Änderungen werden geplant …' : `weitere Änderungen (Runde ${rounds}) …`}` }

      // Große Pläne: zuerst die betroffenen Bereiche bestimmen
      let view = buildView(current)
      if (view.text.length > VIEW_LIMIT_CHARS) {
        const outline = outlineView(current)
        const loc = await cachedStep(opts.cache, `${baseHash}:locate:${pi}:${rounds}`, () =>
          aiJson<{ areas: string[] }>({ label: `${label}: Bereiche bestimmen`, system: SYSTEM_LOCATE, user: `Anweisung (${partLabel || 'vollständig'}):\n${part}\n\n${outline.text}`, schema: LOCATE_SCHEMA, schemaName: 'bereiche', effort: 'low', maxOutputTokens: 4_000 }),
        )
        const focus = new Set((loc.areas ?? []).map((k) => outline.aliasToKey.get(k.trim())).filter((k): k is string => !!k))
        view = buildView(current, focus.size ? focus : undefined)
      }

      const already = opsSoFar.length ? `\n\nBereits umgesetzt für diesen Teil (NICHT wiederholen, im Plan oben schon enthalten):\n${summarizeOps(opsSoFar)}\n\nSetze jetzt die noch fehlenden Änderungen um.` : ''
      const earlier = pi > 0 ? `\n\nFrühere Teile der Anweisung sind bereits umgesetzt und im Plan enthalten.` : ''
      const user = `Anweisung${partLabel ? ` (${partLabel})` : ''}:\n${part}${peopleLine}${contextLine}${earlier}\n\nHöchstens ${opLimit} Operationen in dieser Antwort.\n\n${view.text}${already}`

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
        throw e instanceof HttpError ? new HttpError(e.status, `${partLabel ? `${partLabel}: ` : ''}${e.message}`) : e
      }

      const ops = Array.isArray(res.operations) ? res.operations : []
      const applied = applyPlanOps(current, ops, view.aliasToKey, `ki${pi + 1}r${rounds}_`)
      current = applied.plan
      for (const k of Object.keys(total) as (keyof ApplyStats)[]) total[k] += applied.stats[k]
      for (const w of [...(res.warnings ?? []), ...applied.warnings]) if (w && !notes.includes(w)) notes.push(w)
      // Neue Schlüssel aus dieser Runde sind jetzt echte Vorgänge (v-Kennungen in der nächsten Ansicht)
      opsSoFar = opsSoFar.concat(ops.map((o) => ({ ...o })))
      if (res.complete !== false || !ops.length) break
    }
  }

  const next = normalizeExtractedPlan({ ...current, warnings: [`KI-Überarbeitung: ${describeStats(total)}.`, ...notes] }, { source: plan.source, name: plan.name, reference: plan.reference })
  if (!next.tasks.length) throw new HttpError(422, 'Nach der Überarbeitung ist der Plan leer - es wurde nichts übernommen.')
  yield { type: 'done', plan: next }
}
