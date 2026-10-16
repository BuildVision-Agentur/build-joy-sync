/**
 * Erzeugt docs/klim/module.md (Module, Baufortschritt, Zeitbedarf) und docs/klim/produktpalette.md
 * aus src/bautakt/shared/templates/klim.ts und dem Tafel-Stand. Aufruf: npm run docs:klim
 */
import { writeFileSync } from 'node:fs'
import { BEREICHE, EMPFEHLUNGSWEG, KLIM_HINTER_DER_TUER, KLIM_MODULE, KLIM_POSITIONIERUNG, KLIM_TREPPE, modulKennzahlen } from '../src/bautakt/shared/templates/klim.ts'
import { TAFEL } from '../src/bautakt/shared/templates/klim-tafel.ts'

const h = (min: number) => (min >= 60 ? `${Math.floor(min / 60)}:${String(Math.round(min % 60)).padStart(2, '0')} Std.` : `${Math.round(min)} Min.`)
const kurz = (s: string) => ({ fertig: '✅', 'zur Abnahme': '⏳', 'in Arbeit': '▶️', nachbessern: '🔧', offen: '⬜', 'entfällt': '➖' } as Record<string, string>)[s] ?? s
const name = new Map(KLIM_MODULE.map((m) => [m.key, m.name]))

const out: string[] = ['# KLIM – Module, Baufortschritt, Zeitbedarf', '',
  `> Automatisch erzeugt (\`npm run docs:klim\`) aus dem Tafel-Stand **${TAFEL.stand}** und \`src/bautakt/shared/templates/klim.ts\`. Nicht von Hand ändern.`, '',
  `Sprechzeit: aus der Tafel gezählt (${TAFEL.wpm} Wörter/Min.), sonst geschätzt (9 Min./Lektion). „Text %“ = Anteil erledigter Text-Schritte 1–10. „Text AT“ / „Produktion AT“ = Aufwand nach dem Zeitmodell, über alle Wege summiert.`, '',
  `**Empfehlungsweg (Wirbelsäule):** ${EMPFEHLUNGSWEG.map((k) => name.get(k) ?? k).join(' → ')}`, '']

let gl = 0, gs = 0
for (const b of BEREICHE) {
  const mods = KLIM_MODULE.filter((m) => m.bereich === b)
  if (!mods.length) continue
  out.push(`## ${b}`, '', '| Modul | Arbeitstitel | Wege (Lektionen) | Sprechzeit | Text % | Text AT | Prod. AT | Coach | Coach-Paket | Baut auf |', '|---|---|---|---:|---:|---:|---:|---|---|---|')
  let bl = 0, bs = 0
  for (const m of mods) {
    const k = modulKennzahlen(m)
    bl += k.lektionen; bs += k.sprechzeitMin
    const wege = m.wege.map((w) => `${w.ebene} ${w.lektionen}${w.geschaetzt ? '*' : ''}`).join(' · ') || '–'
    out.push(`| ${m.name} | ${m.titel ?? '–'} | ${wege} | ${h(k.sprechzeitMin)} | ${k.textFertig} % | ${k.textAT} | ${k.produktionAT} | ${m.coach ?? 'offen'} | ${m.bausteine.coachPaket ?? '–'} | ${m.bautAuf.map((x) => name.get(x) ?? x).join(', ') || '–'} |`)
  }
  out.push(`| **Summe** | | **${bl} Lektionen** | **${h(bs)}** | | | | | | |`, '')
  gl += bl; gs += bs
}
out.push(`**Gesamt:** ${gl} Lektionen · ${h(gs)} Sprechzeit · * = Lektionszahl noch nicht auf der Tafel (Annahme 3)`, '')

out.push('## Stand je Weg (11 Text-Schritte)', '', `Schritte: ${TAFEL.steps.join(' · ')}`, '', '✅ fertig · ⏳ zur Abnahme · ▶️ in Arbeit · 🔧 nachbessern · ⬜ offen · ➖ entfällt', '')
out.push('| Modul | Weg | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | Produktion |', '|---|---|---|---|---|---|---|---|---|---|---|---|---|---|')
for (const m of KLIM_MODULE) for (const w of m.wege) {
  const pr = w.produktion ? `${w.produktion.stage ?? ''} (${w.produktion.zustand ?? ''})` : '–'
  out.push(`| ${m.name} | ${w.ebene} | ${w.schritte.map(kurz).join(' | ')} | ${pr} |`)
}
out.push('')

out.push('## Details je Modul', '')
for (const m of KLIM_MODULE) {
  const b = m.bausteine
  out.push(`### ${m.name}${m.titel ? ` – „${m.titel}“` : ''}`, '')
  if (m.slogan) out.push(`- Slogan: „${m.slogan}“`)
  out.push(`- Bereich: ${m.bereich}${m.nr ? ` (Nr. ${m.nr})` : ''} · Coach: ${m.coach ?? 'offen'}${b.sprecher ? ` · Sprecher: ${b.sprecher}` : ''}`)
  out.push(`- Bausteine: Entscheidungstisch ${b.entscheidungstisch} · 0er-Video ${b.video0} · Logo ${b.logo} · Intro ${b.intro} · Outro ${b.outro} · Animation ${b.animation} · Roter Faden ${b.faden} · Coach-Paket ${b.coachPaket ?? 'offen'}`)
  if (m.ursprung) out.push(`- Ursprung/Entscheidungen: ${m.ursprung}`)
  if (m.hinweis) out.push(`- Hinweis: ${m.hinweis}`)
  for (const w of m.wege) if (w.notiz) out.push(`- ${w.ebene}: ${w.notiz}`)
  out.push('')
}
writeFileSync(new URL('../docs/klim/module.md', import.meta.url), out.join('\n'))

const pp: string[] = ['# KLIM – die eigene Produktpalette (Treppe)', '',
  '> Automatisch erzeugt aus `src/bautakt/shared/templates/klim.ts` (`npm run docs:klim`).', '',
  'KLIM wendet die eigene Produktpalette aus dem Modul „Die Treppe zum großen Ja“ auf sich selbst an. Zielbild erarbeitet am 12.10.2026. Die frühere KLIM-Linie (Version 22 vom 09.10.) ist damit nicht mehr maßgeblich. Preise und Produktnamen werden erst am Ende festgelegt.', '',
  '## Positionierung von KLIM', '',
  `- Schlagwort: „${KLIM_POSITIONIERUNG.schlagwort}“`, `- Kategorie: ${KLIM_POSITIONIERUNG.kategorie}`, `- Zielgruppe: ${KLIM_POSITIONIERUNG.zielgruppe}`, `- Wofür KLIM bezahlt werden will: ${KLIM_POSITIONIERUNG.kernAussage}`, '',
  'Ab 16.10.2026 baut Edis Positionierung, Avatar, Produktpalette und EVE für KLIM von Grund auf neu auf, bevor das Dialogprodukt geplant wird.', '',
  '## Die Treppe', '', '| Stufe | Produkt für KLIM | Aufgabe | Was sich beim Kunden verändert | Warum der nächste Schritt logisch ist | Stand |', '|---|---|---|---|---|---|',
  ...KLIM_TREPPE.map((s) => `| ${s.stufe} | ${s.produkt} | ${s.aufgabe} | ${s.beimKunden} | ${s.weiter} | ${s.stand} |`), '',
  'Die Reihenfolge der Stufen ist fest. Eingeordnet wird nach Funktion, nicht nach Preis oder Format.', '',
  '## Hinter der Tür (nicht beworben)', '', ...KLIM_HINTER_DER_TUER.map((x) => `- ${x}`), '',
  '## Verbindung zur Modulproduktion', '',
  '- **Einstiegsprodukt (S-Weg im Abo)** geht online, sobald die S-Ebene der Wirbelsäule produziert ist. Bis dahin gibt es keine Live-Calls.',
  '- **EINE Dienstleistung (Coaching mit Stammtisch)** startet mit der GF-Ebene der Wirbelsäule.',
  '- **Zeitmodul** als eigenes Produkt mit Logbuch, sobald das Modul Zeit fertig produziert ist.',
  '- In BauTakt bilden die Vorlagen „KLIM-Markteinstieg (Produktpalette)“ und „KLIM Gesamtplan“ das ab.', '',
  '## Überlegungen, noch nicht entschieden (Stand 14.–16.10.2026)', '',
  '- Coaching (GF-Weg, 12 Monate) für 3.500 €, die ersten 100 zu 2.500 €. GF-Weg aufgeteilt in Teil A (= S-Ebene) und Teil B. Teil A auch einzeln für 2.000 € mit 6 Monaten Nutzung.',
  '- S-Weg der Wirbelsäule als erstes Produkt, Zugang 6 oder 12 Monate, ohne Stammtisch und Coaching. Erwartung im ersten Jahr: mindestens 500 Käufer.',
  '- Sprecher der S-Ebene zum Markteinstieg: Edis alle 0er-Videos, Dino seine Module, die übrigen Edis und Ammar, Onboarding Alan.',
  '- Vor dem Dialogprodukt: Partner nach der VIM-Strategie anschreiben, Social-Media-Kanäle einrichten, Leads schalten. Der Kundenweg läuft in zwei Schienen, Online und Direktmarketing.', '']
writeFileSync(new URL('../docs/klim/produktpalette.md', import.meta.url), pp.join('\n'))
console.log('docs/klim/module.md und docs/klim/produktpalette.md geschrieben')
