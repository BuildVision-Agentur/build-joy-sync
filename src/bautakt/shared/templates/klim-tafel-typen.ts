/** Typen des Tafel-Stands „KLIM-Weg – Baufortschritt“ (siehe klim-tafel.ts) */

/** Zustand eines der 11 Text-Schritte auf der Tafel */
export type TafelSchritt = 'fertig' | 'zur Abnahme' | 'in Arbeit' | 'nachbessern' | 'offen' | 'entfällt'

export interface TafelLink {
  label?: string
  url: string
  typ?: string
}

export interface TafelStatus {
  status?: string
  url?: string
  stand?: string
  note?: string
  [k: string]: unknown
}

export interface TafelProd2 {
  stage?: string
  zustand?: string
  version?: number
  feedback?: unknown[]
  verlauf?: { datum?: string; typ?: string; nr?: string; text?: string }[]
  termin?: { datum?: string; uhrzeit?: string; ende?: string; plan?: string; ort?: string }
  teleprompter?: string
  [k: string]: unknown
}

export interface TafelWeg {
  /** 11 Einträge in der Reihenfolge von TafelSnapshot.steps */
  steps: string[]
  /** Lektionen „geschrieben“ */
  ls?: number | null
  /** Lektionen „fertig“ geplant (Lektionszahl des Wegs) */
  lf?: number | null
  /** Regelwerk-Version */
  rw?: string
  note?: string
  coach?: string
  done?: string
  /** Datum der Lektor-Checkliste (Qualitätsprüfung) */
  lektor?: string
  ziel?: unknown
  sprech?: { lessons?: number | null; words?: number | null; min?: number | null }
  prod2?: TafelProd2
  docs?: TafelLink[]
}

export interface TafelModul {
  nr?: string
  name: string
  title?: string
  slogan?: string
  bereich?: string
  paket?: string
  coach?: string
  src?: string
  faden?: string
  bereichHinweis?: string
  etisch?: TafelStatus
  video0?: TafelStatus
  webinar?: TafelStatus
  zip?: { name?: string; stand?: string; coach?: string; versand?: { datum?: string; coach?: string }; verlauf?: unknown[]; [k: string]: unknown }
  prod?: { logo?: TafelStatus; intro?: TafelStatus; outro?: TafelStatus; animation?: TafelStatus; preis?: string; [k: string]: unknown }
  sprecher?: { art?: string; edis0?: boolean; hinweis?: string; einspielerMin?: number; einspielerAnzahl?: number }
  docs?: TafelLink[]
  /** Wege S, GF, U und ggf. ALL (Abschluss-Lektion über alle Ebenen) */
  wege: Record<string, TafelWeg>
}

export interface TafelSnapshot {
  stand: string
  /** Wörter pro Minute für die Sprechzeit */
  wpm: number
  steps: string[]
  coaches: string[]
  pakete: string[]
  sprecherRegel: string
  quelle: string
  modules: TafelModul[]
}
