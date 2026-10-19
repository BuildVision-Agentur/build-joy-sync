/**
 * KLIM-Wissen als kompakte Faktentabelle für die KI: je Modul und Weg Lektionen, Sprechzeit
 * (reine Aufnahmezeit laut Tafel) und Coach, in Empfehlungsweg-Reihenfolge, mit Summen je
 * Bereich und Ebene. Damit rechnet die KI mit echten Zahlen statt zu schätzen.
 */

import { BEREICHE, EBENEN_NAME, EMPFEHLUNGSWEG, KLIM_MODULE, TAFEL_STAND, type Ebene, type KlimModul } from './klim.ts'

const std = (min: number) => (Math.round((min / 60) * 10) / 10).toString().replace('.', ',')

function sortiert(): KlimModul[] {
  const rang = (m: KlimModul) => {
    const b = BEREICHE.indexOf(m.bereich)
    const e = EMPFEHLUNGSWEG.indexOf(m.key)
    return b * 1000 + (e >= 0 ? e : 500) + (Number(m.nr) || 0) / 1000
  }
  return KLIM_MODULE.slice().sort((a, b) => rang(a) - rang(b))
}

/** Faktentabelle (ca. 10-20k Zeichen) für die Überarbeitung von KLIM-Plänen. */
export function klimFaktenText(): string {
  const lines: string[] = []
  const summe = new Map<string, number>()
  const add = (k: string, min: number) => summe.set(k, (summe.get(k) ?? 0) + min)
  for (const m of sortiert()) {
    for (const w of m.wege) {
      if (w.ebene === 'ALL') continue
      lines.push(`${m.bereich} | ${m.name} | ${w.ebene} | ${w.lektionen}${w.geschaetzt ? ' (geschätzt)' : ''} | ${w.sprechMin} Min = ${std(w.sprechMin)} Std | ${w.coach ?? m.coach ?? '-'}`)
      add(`${m.bereich}|${w.ebene}`, w.sprechMin)
      add(`${m.bereich}|*`, w.sprechMin)
      add(`*|${w.ebene}`, w.sprechMin)
      add('*|*', w.sprechMin)
    }
  }
  const sums: string[] = []
  for (const b of BEREICHE) {
    const parts = (['S', 'GF', 'U'] as Ebene[]).filter((e) => summe.has(`${b}|${e}`)).map((e) => `${e} ${std(summe.get(`${b}|${e}`)!)} Std`)
    if (parts.length) sums.push(`${b}: ${parts.join(', ')} (gesamt ${std(summe.get(`${b}|*`) ?? 0)} Std)`)
  }
  sums.push(`Alle Bereiche: ${(['S', 'GF', 'U'] as Ebene[]).map((e) => `${EBENEN_NAME[e]} (${e}) ${std(summe.get(`*|${e}`) ?? 0)} Std`).join(', ')}; gesamt ${std(summe.get('*|*') ?? 0)} Std`)
  return [
    `KLIM-Wissen (Stand der Tafel „KLIM-Weg – Baufortschritt“ vom ${TAFEL_STAND}). Sprechzeit = reine Aufnahmezeit laut Tafel (140 Wörter/Min; ohne Tafelwert 9 Min je Lektion geschätzt).`,
    'Reihenfolge Wirbelsäule (Empfehlungsweg): Onboarding → Mindset → Innerer Bauplan → Positionierung → Avatar → Produktpalette → EVE → Finanzen → Mitarbeitergewinnung → Leadership → Systeme. Danach die Pakete (Social Media, Marketing, Verkauf, Webseite & SEO), danach der KLIM-Weg.',
    'Ebenen: S = Selbständiger, GF = Geschäftsführer, U = Unternehmer.',
    'Bereich | Modul | Weg | Lektionen | Sprechzeit | Coach',
    ...lines,
    'Summen Sprechzeit:',
    ...sums,
  ].join('\n')
}

/** Hat ein Plan oder eine Anweisung KLIM-Bezug? (Dann wird die Faktentabelle mitgegeben.) */
export function hatKlimBezug(text: string): boolean {
  return /\bklim\b|wirbelsäule|empfehlungsweg|\b(s|gf|u)[- ]weg\b|sprechzeit|sprechtext|coach-paket|teleprompter/i.test(text)
}
