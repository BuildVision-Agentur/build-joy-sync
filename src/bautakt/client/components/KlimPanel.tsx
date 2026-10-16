/**
 * KLIM-Tafel je Projekt: Stand der Tafel „KLIM-Weg – Baufortschritt“, mit dem der Plan zuletzt
 * abgeglichen wurde. Neuen Stand einspielen (index.html der Tafel hochladen oder den in BauTakt
 * eingebauten Stand nehmen) → Vorschau (fertig / Dauern / Coach / neu / entfernt) → „Änderungen
 * prüfen“ erzeugt einen Änderungsvorschlag. Der Plan ändert sich erst, wenn jemand übernimmt.
 */

import { useEffect, useState } from 'react'
import { ListChecks, Upload, RefreshCw, ArrowRight } from 'lucide-react'
import { api, type KlimDiff, type KlimLinkInfo } from '../lib/api'
import { useProject } from '../store/project'
import { useAuth } from '../store/auth'
import { useToast } from '../store/toast'
import { navigate } from '../lib/router'
import { Badge, Button, Card, Modal } from './ui'
import { formatDateTime } from '../../shared/engine/dates'
import { parseTafel } from '../../shared/templates/klim-tafel-parse'
import type { TafelSnapshot } from '../../shared/templates/klim-tafel-typen'

export function KlimPanel() {
  const p = useProject()
  const { can } = useAuth()
  const toast = useToast()
  const [info, setInfo] = useState<KlimLinkInfo | null>(null)
  const [open, setOpen] = useState(false)
  const [tafel, setTafel] = useState<TafelSnapshot | null>(null)
  const [fehler, setFehler] = useState<string | null>(null)
  const [diff, setDiff] = useState<KlimDiff | null>(null)
  const [busy, setBusy] = useState(false)
  const load = () => api.klim.status(p.projectId).then(setInfo).catch(() => setInfo(null))
  useEffect(() => {
    void load()
  }, [p.projectId]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!info?.linked) return null
  const ro = !can('plan.edit')
  const quelle = tafel ?? undefined // undefined = eingebauter Stand

  const datei = async (f: File) => {
    setDiff(null)
    try {
      setTafel(parseTafel(await f.text()))
      setFehler(null)
    } catch (e) {
      setTafel(null)
      setFehler((e as Error).message)
    }
  }
  const vorschau = async () => {
    try {
      setDiff(await api.klim.diff(p.projectId, quelle))
    } catch (e) {
      toast.push((e as Error).message, 'error')
    }
  }
  const abgleichen = async () => {
    setBusy(true)
    try {
      const r = await api.klim.sync(p.projectId, quelle)
      if (r.changed) {
        toast.push('Änderungen der Tafel als Vorschlag angelegt – bitte prüfen und entscheiden.', 'success')
        navigate(`/projects/${p.projectId}/proposals`)
      } else toast.push(r.message ?? 'Keine Änderungen.', 'info')
      setOpen(false)
      await load()
    } catch (e) {
      toast.push((e as Error).message, 'error')
    } finally {
      setBusy(false)
    }
  }
  const c = diff?.counts

  return (
    <>
      <Card title={<span className="flex items-center gap-2"><ListChecks size={15} /> KLIM-Tafel</span>} actions={!ro && !info.open_proposal_id && <Button size="sm" onClick={() => { setOpen(true); setTafel(null); setDiff(null); setFehler(null) }}><RefreshCw size={13} /> Tafel abgleichen</Button>}>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium">KLIM-Weg – Baufortschritt</span>
              <Badge tone="neutral">Stand {info.tafel_stand}</Badge>
              {info.open_proposal_id && <Badge tone="warn">Abgleich offen</Badge>}
            </div>
            <div className="text-xs text-ink-faint">{info.mapped_tasks} zugeordnete Vorgänge{info.last_synced_at ? ` · letzter Abgleich ${formatDateTime(info.last_synced_at)}` : ' · noch nicht abgeglichen'} · in BauTakt eingebaut: Stand {info.eingebauter_stand}</div>
          </div>
          {info.open_proposal_id && <Button size="sm" variant="primary" onClick={() => navigate(`/projects/${p.projectId}/proposals`)}>Änderungen prüfen <ArrowRight size={13} /></Button>}
        </div>
        <p className="mt-2 text-[11px] text-ink-faint">Die Tafel bleibt der Ort, an dem der Baufortschritt gepflegt wird. Ein Abgleich erzeugt einen Änderungsvorschlag: was jetzt fertig ist, geänderte Lektionen und Sprechzeiten, Coach-Wechsel, neue und entfallene Module. Was in BauTakt schon weiter ist, wird nie zurückgesetzt.</p>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="KLIM-Tafel abgleichen" width="xl" footer={<><Button variant="ghost" onClick={() => setOpen(false)}>Abbrechen</Button><Button onClick={vorschau} disabled={!!fehler}>Vorschau</Button><Button variant="primary" loading={busy} disabled={!!fehler} onClick={abgleichen}>Änderungen prüfen (Vorschlag erzeugen)</Button></>}>
        <div className="space-y-3 text-sm">
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line px-3 py-2 hover:bg-surface-2"><Upload size={15} /> index.html der Tafel wählen<input type="file" accept=".html,.htm,.json,text/html,application/json" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) void datei(f) }} /></label>
            {tafel ? <Button size="sm" variant="ghost" onClick={() => { setTafel(null); setDiff(null) }}>Stattdessen eingebauten Stand ({info.eingebauter_stand}) nehmen</Button> : <span className="text-xs text-ink-faint">ohne Datei: eingebauter Stand {info.eingebauter_stand}</span>}
          </div>
          {fehler && <p className="text-xs text-danger">{fehler}</p>}
          {tafel && <p className="text-xs text-ink-soft">Erkannt: Tafel-Stand {tafel.stand} mit {tafel.modules.length} Modulen.</p>}
          <p className="text-xs text-ink-faint">Die index.html bekommst du von Claude im Projekt „KLIM Wissen“: „Lies die Tafel KLIM-Weg – Baufortschritt und gib mir die index.html.“</p>
          {diff && c && (
            <div className="rounded-lg border border-line bg-surface-2 p-3">
              <p className="mb-2 text-xs text-ink-soft">Stand {diff.stand_alt} → {diff.stand_neu} · {diff.operations} Änderungen</p>
              <div className="mb-2 flex flex-wrap gap-2">
                <Badge tone="ok">{c.fertig} fertig</Badge>
                <Badge tone="brand">{c.begonnen} begonnen</Badge>
                <Badge tone="warn">{c.dauer} Dauern</Badge>
                <Badge tone="neutral">{c.coach} Coach</Badge>
                <Badge tone="ok">{c.neu} neu</Badge>
                <Badge tone="danger">{c.entfernt} entfernt</Badge>
              </div>
              {diff.summary.length === 0 ? <p className="text-ink-soft">Keine Änderungen – der Plan entspricht diesem Stand.</p> : <ul className="list-disc space-y-1 pl-5 text-xs text-ink-soft">{diff.summary.map((s, i) => <li key={i}>{s}</li>)}</ul>}
              <p className="mt-2 text-[11px] text-ink-faint">Die Auswirkung auf Termine (z. B. „S-Ebene bereit“) zeigt der Änderungsvorschlag – dort übernehmen, ablehnen oder als Szenario bearbeiten.</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}
