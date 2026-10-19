/**
 * Zwischenspeicher fertiger Schritte großer KI-Aufgaben in der Datenbank (siehe aiCore.cachedStep).
 * Die Auftragskennung kommt vom Browser und bleibt bei automatischen Wiederholungen gleich;
 * sie wird je Organisation getrennt, damit niemand fremde Ergebnisse lesen kann.
 */

import { nowISO, type Db } from '../db.ts'
import type { StepCache } from './aiCore.ts'

export function dbStepCache(db: Db, orgId: string, jobId: string | undefined | null): StepCache | undefined {
  if (!jobId || !/^[\w-]{8,80}$/.test(jobId)) return undefined
  const job = `${orgId}:${jobId}`
  return {
    async get(key) {
      const row = await db.get<{ result: string }>('SELECT result FROM ai_step_cache WHERE job_id = ? AND step_key = ?', job, key)
      return row ? JSON.parse(row.result) : undefined
    },
    async set(key, value) {
      await db.upsert('ai_step_cache', { job_id: job, step_key: key, result: JSON.stringify(value), created_at: nowISO() }, ['job_id', 'step_key'])
    },
  }
}

let lastPrune = 0
/** Alte Einträge (älter als zwei Tage) gelegentlich aufräumen - Protokoll nach 60 Tagen. */
export function pruneAiTables(db: Db): void {
  if (Date.now() - lastPrune < 6 * 3600_000) return
  lastPrune = Date.now()
  const day = 24 * 3600_000
  void db.run('DELETE FROM ai_step_cache WHERE created_at < ?', new Date(Date.now() - 2 * day).toISOString()).catch(() => {})
  void db.run('DELETE FROM ai_calls WHERE created_at < ?', new Date(Date.now() - 60 * day).toISOString()).catch(() => {})
}
