/**
 * Liest die Tafel „KLIM-Weg – Baufortschritt“ ein: die index.html der Tafel (Datenblock `const DATA = {…}`)
 * oder eine JSON-Datei mit diesem Datenblock. Ergebnis ist ein bereinigter TafelSnapshot – ohne interne
 * Dateilinks (/_blob) und ohne Einspieler-Texte. Reine Funktion (Server, Client und Skript nutzen sie).
 */

import type { TafelSnapshot } from './klim-tafel-typen.ts'

type O = Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any

export const TAFEL_QUELLE = 'Tafel „KLIM-Weg – Baufortschritt“ https://claude.ai/artifact/9GV3rDFbuhU5UjyWrmpm7b'

/** Das JSON-Objekt hinter `const DATA = ` herauslösen (Klammern zählen, Strings beachten) */
function datenblock(html: string): O {
  const i = html.indexOf('const DATA')
  if (i < 0) throw new Error('In der Datei steht kein Tafel-Datenblock („const DATA = …“). Bitte die index.html der Tafel „KLIM-Weg – Baufortschritt“ verwenden.')
  const start = html.indexOf('{', i)
  let tiefe = 0, inStr = false, esc = false
  for (let k = start; k < html.length; k++) {
    const ch = html[k]
    if (inStr) {
      if (esc) esc = false
      else if (ch === '\\') esc = true
      else if (ch === '"') inStr = false
      continue
    }
    if (ch === '"') inStr = true
    else if (ch === '{') tiefe++
    else if (ch === '}' && --tiefe === 0) return JSON.parse(html.slice(start, k + 1)) as O
  }
  throw new Error('Der Tafel-Datenblock ist unvollständig.')
}

const leer = (v: unknown) => v === undefined || v === null || v === ''
const links = (docs: O[] | undefined) => (docs ?? []).filter((d) => String(d?.url ?? '').startsWith('https://')).map(({ label, url, typ }) => ({ label, url, typ }))
const ohneBlob = (x: O) => Object.fromEntries(Object.entries(x).filter(([k, v]) => !(k === 'url' && String(v).startsWith('/_blob'))))

/** Rohdaten (DATA der Tafel) → bereinigter Snapshot */
export function bereinigeTafel(data: O): TafelSnapshot {
  if (!Array.isArray(data?.modules)) throw new Error('Kein gültiger Tafel-Stand: „modules“ fehlt.')
  const modules = (data.modules as O[]).map((m) => {
    const o: O = {}
    for (const k of ['nr', 'name', 'title', 'slogan', 'bereich', 'paket', 'coach', 'src', 'faden', 'bereichHinweis']) if (!leer(m[k])) o[k] = m[k]
    for (const k of ['etisch', 'video0', 'webinar', 'zip']) if (m[k] && typeof m[k] === 'object') o[k] = ohneBlob(m[k])
    o.prod = m.prod ?? {}
    const sp = (m.sprecher ?? {}) as O
    const ein = (sp.einspieler ?? []) as O[]
    o.sprecher = { art: sp.art, edis0: sp.edis0, hinweis: sp.hinweis, einspielerMin: ein.length ? Math.round(ein.reduce((s, e) => s + (Number(e.min) || 0), 0) * 10) / 10 : (sp.einspielerMin ?? 0), einspielerAnzahl: ein.length || (sp.einspielerAnzahl ?? 0) }
    const d = links(m.docs)
    if (d.length) o.docs = d
    o.wege = Object.fromEntries(Object.entries((m.wege ?? {}) as O).map(([e, w]) => {
      const y: O = {}
      for (const k of ['steps', 'ls', 'lf', 'rw', 'note', 'coach', 'done', 'lektor', 'ziel']) if (!leer(w[k])) y[k] = w[k]
      if (!Array.isArray(y.steps)) y.steps = []
      if (w.sprech) y.sprech = { lessons: w.sprech.lessons, words: w.sprech.words, min: w.sprech.min }
      if (w.prod2) y.prod2 = w.prod2
      const dd = links(w.docs)
      if (dd.length) y.docs = dd
      return [e, y]
    }))
    return o
  })
  return {
    stand: String(data.stand ?? ''), wpm: Number(data.wpm) || 140, steps: data.steps ?? [], coaches: data.coaches ?? [], pakete: data.pakete ?? [],
    sprecherRegel: data.sprecherRegel ?? '', quelle: TAFEL_QUELLE, modules,
  } as TafelSnapshot
}

/** Datei-Inhalt (index.html der Tafel oder JSON: DATA oder bereits bereinigter Snapshot) → Snapshot */
export function parseTafel(text: string): TafelSnapshot {
  const t = text.trim()
  if (!t) throw new Error('Leere Datei.')
  const roh = t.startsWith('{') ? (JSON.parse(t) as O) : datenblock(t)
  return bereinigeTafel(roh)
}
