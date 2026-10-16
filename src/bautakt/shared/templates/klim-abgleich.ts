/**
 * KLIM-Tafel-Abgleich: Ein laufendes Projekt, das aus einer KLIM-Vorlage angelegt wurde, wird mit einem
 * neuen Stand der Tafel „KLIM-Weg – Baufortschritt“ verglichen. Ergebnis sind Operationen für einen
 * Änderungsvorschlag (Change Proposal) – der Plan selbst wird hier nie verändert.
 *
 * Grundlage ist die Zuordnung Vorlagen-Schlüssel → Vorgangs-ID, die beim Anlegen gespeichert wurde
 * (Tabelle project_klim_links). Der neue Tafel-Stand wird mit demselben Generator in Vorlagenzeilen
 * übersetzt; dann wird Zeile für Zeile verglichen:
 *   • Stand:   was auf der Tafel jetzt fertig/in Arbeit ist → set_status (nie zurückstufen –
 *              was in BauTakt schon weiter ist, bleibt)
 *   • Dauer:   geänderte Lektionen/Sprechzeit → set_duration (nur offene Vorgänge)
 *   • Name, Notiz, Gewerk (Coach) → update_task
 *   • neue Module/Wege → add_task + Abhängigkeiten + Voraussetzungen
 *   • nicht mehr auf der Tafel → remove_task, aber nur wenn noch nicht begonnen
 */

import type { ProposalOperation, Task, TaskDependency, TemplateTask, Trade } from '../types.ts'
import type { TafelSnapshot } from './klim-tafel-typen.ts'
import { klimAus } from './klim.ts'
import { builtinToTemplateTasks } from './instantiate.ts'

export interface KlimAbgleichEingabe {
  tafel: TafelSnapshot
  templateId: string
  /** Vorlagen-Schlüssel → Vorgangs-ID im Projekt */
  mapping: Record<string, string>
  tasks: Task[]
  dependencies: TaskDependency[]
  trades: Trade[]
}

export interface KlimAbgleichErgebnis {
  stand: string
  operations: ProposalOperation[]
  summary: string[]
  counts: { fertig: number; begonnen: number; dauer: number; coach: number; neu: number; entfernt: number; texte: number }
  /** Schlüssel neuer Vorgänge (für die Zuordnung nach der Übernahme: `NEU_PREFIX + key` → ID) */
  neueKeys: string[]
}

export const NEU_PREFIX = 'klim:'

const RANG: Record<string, number> = { not_started: 0, blocked: 0, delayed: 1, at_risk: 1, in_progress: 1, done: 2 }

export function klimAbgleich(e: KlimAbgleichEingabe): KlimAbgleichErgebnis {
  const k = klimAus(e.tafel)
  const tpl = k.templates.find((t) => t.id === e.templateId)
  if (!tpl) throw new Error(`Vorlage ${e.templateId} gibt es im neuen Stand nicht.`)
  const zeilen = builtinToTemplateTasks(tpl)
  const byId = new Map(e.tasks.map((t) => [t.id, t]))
  const vorhanden = (key: string) => {
    const id = e.mapping[key]
    return id && byId.has(id) ? id : null
  }
  const ref = (key: string) => vorhanden(key) ?? NEU_PREFIX + key
  const tradeId = new Map(e.trades.map((t) => [t.name.toLowerCase(), t.id]))
  const pfad = (z: TemplateTask) => {
    // „Modul · Weg · Schritt“ für lesbare Zusammenfassungen
    const teile = [z.name]
    let p = z.parent_key
    for (let i = 0; p && i < 3; i++) {
      const eltern = zeilen.find((x) => x.key === p)
      if (!eltern || eltern.type === 'phase') break
      teile.unshift(eltern.name.split(' – ')[0].split(' · ').slice(0, 2).join(' · '))
      p = eltern.parent_key
    }
    return teile.join(' › ')
  }

  const neu: ProposalOperation[] = []
  const neuDeps: ProposalOperation[] = []
  const neuCons: ProposalOperation[] = []
  const status: ProposalOperation[] = []
  const aenderung: ProposalOperation[] = []
  const entfernen: ProposalOperation[] = []
  const counts = { fertig: 0, begonnen: 0, dauer: 0, coach: 0, neu: 0, entfernt: 0, texte: 0 }
  const listen = { fertig: [] as string[], dauer: [] as string[], coach: [] as string[], neu: [] as string[], entfernt: [] as string[], bleibt: [] as string[] }
  const neueKeys: string[] = []

  for (const z of zeilen) {
    const id = vorhanden(z.key)
    if (!id) {
      // ---- neuer Vorgang
      neueKeys.push(z.key)
      const parentNeu = z.parent_key && !vorhanden(z.parent_key)
      neu.push({
        op: 'add_task', key: NEU_PREFIX + z.key, name: z.name, type: z.type, duration: z.duration,
        parent_key: parentNeu ? NEU_PREFIX + z.parent_key : null, parent_id: !parentNeu && z.parent_key ? vorhanden(z.parent_key) : null,
        trade_name: z.trade_name, notes: z.notes,
      })
      for (const c of z.constraints) neuCons.push({ op: 'add_constraint', task_key: NEU_PREFIX + z.key, type: c.type, title: c.title })
      if (z.stand) status.push({ op: 'set_status', task_id: NEU_PREFIX + z.key, status: z.stand.status, progress: z.stand.progress, actual_start: z.stand.datum, actual_finish: z.stand.status === 'done' ? z.stand.datum : null })
      counts.neu++
      // Lesbar nur die oberste neue Gruppe nennen (neues Modul oder neuer Weg), nicht jeden Schritt darin
      const elternAuchNeu = !!z.parent_key && !vorhanden(z.parent_key) && zeilen.some((x) => x.key === z.parent_key && x.type !== 'phase')
      if (z.type === 'group' && !elternAuchNeu) listen.neu.push(pfad(z))
      continue
    }
    const t = byId.get(id)!
    // ---- Stand (nie zurückstufen)
    if (z.stand && z.type !== 'phase' && z.type !== 'group') {
      const ziel = z.stand.status
      if ((RANG[ziel] ?? 0) > (RANG[t.status] ?? 0)) {
        status.push({ op: 'set_status', task_id: id, status: ziel, progress: ziel === 'done' ? 100 : Math.max(t.progress, z.stand.progress), actual_start: t.actual_start ?? z.stand.datum, actual_finish: ziel === 'done' ? z.stand.datum : t.actual_finish })
        if (ziel === 'done') { counts.fertig++; listen.fertig.push(pfad(z)) } else counts.begonnen++
      }
    }
    // ---- Dauer (nur offene Vorgänge)
    if (z.type === 'task' && t.status !== 'done' && z.stand?.status !== 'done' && z.duration !== t.duration) {
      aenderung.push({ op: 'set_duration', task_id: id, duration: z.duration })
      counts.dauer++
      listen.dauer.push(`${pfad(z)}: ${t.duration} → ${z.duration} AT`)
    }
    // ---- Name, Notiz, Gewerk
    const fields: Extract<ProposalOperation, { op: 'update_task' }>['fields'] = {}
    if (z.name !== t.name) fields.name = z.name
    if ((z.notes ?? '') !== (t.notes ?? '') && z.notes) fields.notes = z.notes
    if (z.trade_name) {
      const tid = tradeId.get(z.trade_name.toLowerCase()) ?? null
      if (tid && tid !== t.trade_id) {
        fields.trade_id = tid
        counts.coach++
        listen.coach.push(`${pfad(z)} → ${z.trade_name}`)
      }
    }
    if (Object.keys(fields).length) {
      aenderung.push({ op: 'update_task', task_id: id, fields })
      if (fields.name || fields.notes) counts.texte++
    }
  }

  // ---- Abhängigkeiten, an denen ein neuer Vorgang hängt. Kanten zwischen bestehenden Vorgängen bleiben,
  // wie sie im Projekt sind – dort kann der Projektleiter bewusst etwas gelöst haben.
  for (const z of zeilen) {
    for (const d of z.dependencies) {
      if (vorhanden(d.predecessor_key) && vorhanden(z.key)) continue
      neuDeps.push({ op: 'add_dependency', predecessor: ref(d.predecessor_key), successor: ref(z.key), type: d.type, lag_days: d.lag_days })
    }
  }

  // ---- nicht mehr auf der Tafel
  const keys = new Set(zeilen.map((z) => z.key))
  const weg = new Map<string, string>() // Vorgangs-ID → Schlüssel, die nicht mehr auf der Tafel stehen
  for (const [key, id] of Object.entries(e.mapping)) if (!keys.has(key) && byId.has(id)) weg.set(id, key)
  const unberuehrt = (t: Task) => t.status === 'not_started' && !t.progress && !t.actual_start
  const kinder = new Map<string, Task[]>()
  for (const t of e.tasks) if (t.parent_id) (kinder.get(t.parent_id) ?? kinder.set(t.parent_id, []).get(t.parent_id)!).push(t)
  const ganzUnberuehrt = (t: Task): boolean => unberuehrt(t) && (kinder.get(t.id) ?? []).every(ganzUnberuehrt)
  const entfernbar = (t: Task) => weg.has(t.id) && ganzUnberuehrt(t)
  for (const [id] of weg) {
    const t = byId.get(id)!
    // Nur die oberste entfernbare Ebene entfernen; Begonnenes bleibt im Plan
    if (t.parent_id && byId.has(t.parent_id) && entfernbar(byId.get(t.parent_id)!)) continue
    if (entfernbar(t)) {
      entfernen.push({ op: 'remove_task', task_id: id })
      counts.entfernt++
      listen.entfernt.push(t.name)
    } else if (!unberuehrt(t)) listen.bleibt.push(t.name)
  }

  const kurz = (l: string[], n = 6) => (l.length > n ? `${l.slice(0, n).join('; ')} … (+${l.length - n})` : l.join('; '))
  const summary: string[] = []
  if (counts.fertig) summary.push(`${counts.fertig} Schritte jetzt fertig: ${kurz(listen.fertig)}`)
  if (counts.begonnen) summary.push(`${counts.begonnen} Schritte begonnen`)
  if (counts.dauer) summary.push(`${counts.dauer} Dauern geändert (Lektionen/Sprechzeit): ${kurz(listen.dauer)}`)
  if (counts.coach) summary.push(`${counts.coach} Zuordnungen zu Coach/Gewerk geändert: ${kurz(listen.coach, 4)}`)
  if (counts.neu) summary.push(`${counts.neu} neue Vorgänge${listen.neu.length ? `: ${kurz(listen.neu)}` : ''}`)
  if (listen.entfernt.length) summary.push(`Nicht mehr auf der Tafel (noch nicht begonnen, wird entfernt): ${kurz(listen.entfernt)}`)
  if (listen.bleibt.length) summary.push(`Nicht mehr auf der Tafel, aber schon begonnen – bleibt im Plan: ${kurz(listen.bleibt)}`)
  if (counts.texte) summary.push(`${counts.texte} Namen/Notizen aktualisiert (Titel, Lektionen, Stand)`)

  return { stand: e.tafel.stand, operations: [...neu, ...neuDeps, ...neuCons, ...status, ...aenderung, ...entfernen], summary, counts, neueKeys }
}

/** Zuordnung nach dem Anlegen eines Projekts aus einer KLIM-Vorlage */
export function klimMappingAusAnlage(keyToId: Map<string, string>): Record<string, string> {
  return Object.fromEntries(keyToId)
}
