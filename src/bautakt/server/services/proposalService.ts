/**
 * Entscheidung über Änderungsvorschläge (Nachunternehmer, E-Mail, BuildFlow, Jarvis). Beim
 * Annehmen werden Plan, Vorschlagsstatus, neue Voraussetzungen und ggf. die BuildFlow-Zuordnung
 * in einem einzigen Batch geschrieben - entweder alles oder nichts. Ein bereits entschiedener
 * Vorschlag kann nicht ein zweites Mal übernommen werden.
 */

import type { BatchStatement, Db } from '../db.ts'
import { BatchExpectationError, buildInsert, newId, nowISO } from '../db.ts'
import { HttpError } from '../auth.ts'
import { Repo } from '../repo.ts'
import { ProjectService } from './projectService.ts'
import { broadcastProject } from './realtime.ts'
import type { ChangeProposal, ChangeSource, Session } from '../../shared/types.ts'
import { applyOperations, proposalOperations } from '../../shared/engine/proposals.ts'
import { newNodeKey } from '../../shared/integrations/buildflow/adapter.ts'
import { NEU_PREFIX as KLIM_NEU_PREFIX } from '../../shared/templates/klim-abgleich.ts'

const ALREADY_DECIDED = 'Vorschlag ist bereits entschieden.'

export async function decideProposal(db: Db, session: Session, projectId: string, proposalId: string, decision: 'accept' | 'reject', note = ''): Promise<ChangeProposal> {
  const repo = new Repo(db)
  const p = await repo.proposal(projectId, proposalId)
  if (!p) throw new HttpError(404, 'Vorschlag nicht gefunden.')
  if (p.status !== 'open') throw new HttpError(409, ALREADY_DECIDED)

  const now = nowISO()
  const markDecided: BatchStatement = {
    sql: 'UPDATE change_proposals SET status = ?, decided_at = ?, decided_by = ?, decision_note = ? WHERE id = ? AND project_id = ? AND status = ?',
    params: [decision === 'accept' ? 'accepted' : 'rejected', now, session.user.id, note, p.id, projectId, 'open'],
    expect: 1,
    tag: 'proposal_decided',
  }

  try {
    if (decision === 'accept') {
      const svc = new ProjectService(db)
      const bundle = await svc.requireBundle(session.org.id, projectId)
      const ctx = svc.planContext(bundle)
      const trades = await repo.trades(session.org.id)
      const applied = applyOperations({ tasks: bundle.tasks, dependencies: bundle.dependencies }, ctx, proposalOperations(p), { newId: (pre) => newId(pre), trades })
      const extra: BatchStatement[] = [markDecided]
      for (const nc of applied.constraints) {
        extra.push(buildInsert('task_constraints', {
          id: newId('cs'), project_id: projectId, task_id: nc.task_id, type: nc.type, title: nc.title, status: 'open', due_date: nc.due_date,
          responsible_user_id: null, note: `Aus Vorschlag (${p.submitted_by_name})`, created_at: now, updated_at: now,
        }))
      }
      if (p.origin_kind === 'buildflow' && p.origin_ref) {
        // Zuordnung Schritt → Vorgang um die neu angelegten Schritte ergänzen
        const link = await db.get<{ snapshot: string; mapping: string }>('SELECT snapshot, mapping FROM project_process_links WHERE id = ?', p.origin_ref)
        if (link) {
          const snapshot = JSON.parse(link.snapshot) as { nodes?: { id: string }[] }
          const mapping = JSON.parse(link.mapping) as Record<string, string>
          for (const n of snapshot.nodes ?? []) {
            const tid = applied.keyToId.get(newNodeKey(n.id))
            if (tid) mapping[n.id] = tid
          }
          extra.push({ sql: 'UPDATE project_process_links SET mapping = ?, last_synced_at = ? WHERE id = ?', params: [JSON.stringify(mapping), now, p.origin_ref] })
        }
      }
      if (p.origin_kind === 'klim' && p.origin_ref) {
        // Zuordnung um neue Vorgänge ergänzen, entfernte streichen, Tafel-Stand übernehmen
        const link = await db.get<{ mapping: string; pending_stand: string | null; tafel_stand: string }>('SELECT mapping, pending_stand, tafel_stand FROM project_klim_links WHERE id = ?', p.origin_ref)
        if (link) {
          // Zuordnungen entfernter Vorgänge bleiben als Merker stehen - sonst legt der nächste Abgleich sie wieder an
          const mapping = JSON.parse(link.mapping) as Record<string, string>
          for (const [k, id] of applied.keyToId) if (k.startsWith(KLIM_NEU_PREFIX)) mapping[k.slice(KLIM_NEU_PREFIX.length)] = id
          extra.push({ sql: 'UPDATE project_klim_links SET mapping = ?, tafel_stand = ?, pending_stand = NULL, last_synced_at = ? WHERE id = ?', params: [JSON.stringify(mapping), link.pending_stand ?? link.tafel_stand, now, p.origin_ref] })
        }
      }
      await svc.savePlan(
        session,
        projectId,
        { expected_version: bundle.project.version, tasks: applied.state.tasks, dependencies: applied.state.dependencies, reason: `Vorschlag ${p.submitted_by_name}: ${p.title || p.comment || p.reason}`, source: sourceOf(p) },
        { extra },
      )
    } else {
      const rejected: BatchStatement[] = [markDecided]
      if (p.origin_kind === 'klim' && p.origin_ref) rejected.push({ sql: 'UPDATE project_klim_links SET pending_stand = NULL WHERE id = ?', params: [p.origin_ref] })
      await db.batch(rejected)
    }
  } catch (e) {
    if (e instanceof BatchExpectationError && e.tag === 'proposal_decided') throw new HttpError(409, ALREADY_DECIDED)
    throw e
  }

  await broadcastProject(session.org.id, projectId, 'proposal')
  return (await repo.proposal(projectId, p.id))!
}

function sourceOf(p: ChangeProposal): ChangeSource {
  if (p.source === 'FUTURE_AI' || p.source === 'EMAIL' || p.source === 'BUILDFLOW_SYNC' || p.source === 'KLIM_SYNC') return p.source
  return 'SUBCONTRACTOR_PROPOSAL'
}
