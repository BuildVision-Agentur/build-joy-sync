/**
 * KLIM – Modulwissen, Baufortschritt, Produktpalette und Produktionsvorlagen.
 *
 * Quellen:
 *   • klim-tafel.ts  – Stand der Tafel „KLIM-Weg – Baufortschritt“ (Module, Wege, Lektionen, Sprechzeit,
 *                      Coaches, 11 Text-Schritte, Entscheidungstisch, 0er-Video, Logo, Coach-Paket, Produktion)
 *   • diese Datei    – was die Tafel nicht enthält: Schlüssel, Empfehlungsweg, Voraussetzungen zwischen
 *                      Modulen, Zeitmodell, die KLIM-Produktpalette (Treppe) und die Vorlagen
 *
 * Daraus entstehen:
 *   KLIM_MODULE       – Modulkatalog (eine Zeile je Modul, Wege S/GF/U/ALL mit echtem Stand)
 *   KLIM_TREPPE       – die eigene Produktpalette von KLIM (6 Stufen) + „hinter der Tür“
 *   KLIM_TEMPLATES    – Vorlagen „KLIM-Modul (einzeln)“, „KLIM Wirbelsäule – Empfehlungsweg“,
 *                       „KLIM-Markteinstieg (Produktpalette)“, „KLIM Gesamtplan“
 *
 * In den Vorlagen trägt jeder Vorgang den Tafel-Stand: erledigte Schritte sind „fertig“ (Ist-Termin =
 * Tafel-Datum), laufende „in Arbeit“. Damit rechnet BauTakt nur noch den offenen Rest.
 *
 * Gewerke = Rollen: „KLIM-Text“, „Edis“, „Design“, „Schnitt“, „Animation“ und je Coach sein Name.
 */

import type { ISODate, TemplateConstraint } from '../types.ts'
import type { BuiltinTemplate, Row, RowStand } from './builtin.ts'
import { TAFEL } from './klim-tafel.ts'
import type { TafelModul, TafelSnapshot, TafelWeg } from './klim-tafel-typen.ts'

// ---------------------------------------------------------------- Grundbegriffe

export type Ebene = 'S' | 'GF' | 'U' | 'ALL'
export const EBENEN: Ebene[] = ['S', 'GF', 'U', 'ALL']
export const EBENEN_NAME: Record<Ebene, string> = { S: 'Selbständiger', GF: 'Geschäftsführer', U: 'Unternehmer', ALL: 'Abschluss über alle Ebenen' }

export type Bereich = 'Wirbelsäule' | 'Paket Social Media' | 'Paket Marketing' | 'Paket Verkauf' | 'Paket Webseite & SEO' | 'KLIM-Weg'
/** Reihenfolge der Pakete ist noch nicht festgelegt – deshalb nie nummerieren. */
export const BEREICHE: Bereich[] = ['Wirbelsäule', 'Paket Social Media', 'Paket Marketing', 'Paket Verkauf', 'Paket Webseite & SEO', 'KLIM-Weg']

/** Stand der Tafel als ISO-Datum (z. B. „15.10.2026“ → 2026-10-15) */
export function standDatum(t: TafelSnapshot): ISODate {
  const m = t.stand.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/)
  return m ? `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` : new Date().toISOString().slice(0, 10)
}

/**
 * Aktiver Tafel-Stand für die Generatoren. Standard ist der eingebaute Stand (klim-tafel.ts);
 * `klimAus(tafel)` rechnet Katalog und Vorlagen für einen anderen Stand (Abgleich mit hochgeladener Tafel).
 */
let A: { tafel: TafelSnapshot; stand: ISODate; module: KlimModul[] }

// ---------------------------------------------------------------- Was die Tafel nicht weiß

interface Ergaenzung { key: string; bautAuf?: string[]; hinweis?: string }

/** Tafel-Name → Schlüssel, Voraussetzungen, Hinweise. Neue Tafel-Module ohne Eintrag bekommen einen Schlüssel aus dem Namen. */
const ERGAENZUNG: Record<string, Ergaenzung> = {
  'Onboarding': { key: 'onboarding', hinweis: 'Teilnehmer-Onboarding; nicht mit Mitarbeiter-Onboarding (Mitarbeiter-Modul) verwechseln.' },
  'Mindset': { key: 'mindset', bautAuf: ['onboarding'], hinweis: 'Trägt alle sieben Schmerzpunkte.' },
  'Fundament – Innerer Bauplan': { key: 'bauplan', bautAuf: ['mindset'], hinweis: 'Fundament = Betrieb (Kompass = Kopf und Mensch). Hauptstelle „Bauplan der vier Ebenen“.' },
  'Positionierung': { key: 'positionierung', bautAuf: ['bauplan'], hinweis: 'Nach dem Avatar kommt der Teilnehmer zurück und schärft seinen Positionssatz mit den Worten seiner Kunden.' },
  'Avatar': { key: 'avatar', bautAuf: ['positionierung'] },
  'Produktpalette': { key: 'produktpalette', bautAuf: ['avatar'], hinweis: 'Feste Reihenfolge: Dialogprodukt → Info-Produkt → Türöffner → Nagelprodukt → Einstiegsprodukt → EINE Dienstleistung. Endet mit Übergang zur EVE.' },
  'EVE': { key: 'eve', bautAuf: ['produktpalette'], hinweis: 'Schließt die Kette Positionierung → Avatar → Produktpalette → EVE; am Ende kein Upsell.' },
  'Finanzen': { key: 'finanzen', bautAuf: ['eve'] },
  'Mitarbeitergewinnung': { key: 'mitarbeiter', bautAuf: ['bauplan'], hinweis: 'Musterbeispiel für die Sprechtexte (S-Weg L1–3).' },
  'Leadership + Leadership 2': { key: 'leadership', bautAuf: ['mitarbeiter'] },
  'Systeme': { key: 'systeme', bautAuf: ['leadership'] },
  'Fundament – Kompass': { key: 'kompass' },
  'Echtes Vermögen': { key: 'echtes_vermoegen', bautAuf: ['finanzen'], hinweis: 'Brücke zur Investor-Ebene.' },
  'Zeit': { key: 'zeit', hinweis: 'Bonus im Coaching und eigenes Produkt mit Logbuch (Jahres-Abo); Einzelverkauf nur als Ganzes.' },
  'Selbstvermarktung': { key: 'selbstvermarktung' },
  'Online-Marketing – Grundlagen': { key: 'om_a', bautAuf: ['positionierung', 'avatar'] },
  'Online-Marketing – Content und Video': { key: 'om_b', bautAuf: ['om_a'], hinweis: 'Startplattform TikTok, YouTube als zweite Lage.' },
  'Online-Marketing – Texte und E-Mail': { key: 'om_c', bautAuf: ['om_a'] },
  'Direkt-Marketing': { key: 'direkt' },
  'Social Media – Einrichten': { key: 'sm1' },
  'Social Media – Ohne Budget': { key: 'sm2', bautAuf: ['sm1'] },
  'Social Media – Anzeigen': { key: 'sm3', bautAuf: ['sm1'] },
  'Anker': { key: 'anker', bautAuf: ['positionierung'] },
  'Verkauf – Angebotsmagie': { key: 'angebotsmagie', bautAuf: ['produktpalette'] },
  'Verkauf – Verkaufsgespräch': { key: 'verkaufsgespraech', bautAuf: ['anker'] },
  'Vom Kontakt zum Auftrag': { key: 'kontakt_auftrag' },
  'ABO-Modell': { key: 'abo' },
  'VIM': { key: 'vim' },
  'Vertrieb': { key: 'vertrieb', bautAuf: ['eve'] },
  'Webseite': { key: 'webseite', bautAuf: ['positionierung', 'avatar', 'produktpalette', 'eve'], hinweis: 'Teilnehmer müssen Positionierung, Avatar, Produktpalette und EVE vorher kennen.' },
  'SEO': { key: 'seo', bautAuf: ['webseite'], hinweis: 'Viel im S-Weg als Einstieg; Upsell auf Webseite- und Marketing-Module.' },
  'Webinar und Vortrag': { key: 'webinar' },
  'Partnergewinnung': { key: 'partner' },
}

/** Feste Reihenfolge der Wirbelsäule – „Der Empfehlungsweg“ (festgelegt 09.10.2026) */
export const EMPFEHLUNGSWEG = ['onboarding', 'mindset', 'bauplan', 'positionierung', 'avatar', 'produktpalette', 'eve', 'finanzen', 'mitarbeiter', 'leadership', 'systeme']

const slug = (s: string) => s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')

// ---------------------------------------------------------------- Modulkatalog aus der Tafel

export interface KlimWeg {
  ebene: Ebene
  lektionen: number
  /** true, wenn die Tafel noch keine Lektionszahl hat (Annahme: 3) */
  geschaetzt: boolean
  /** Sprechzeit in Minuten (aus der Tafel gezählt, sonst geschätzt) */
  sprechMin: number
  coach: string | null
  /** 11 Text-Schritte laut Tafel */
  schritte: string[]
  regelwerk: string | null
  lektor: string | null
  notiz: string
  produktion: TafelWeg['prod2'] | null
}

export interface KlimModul {
  key: string
  name: string
  titel: string | null
  slogan: string | null
  bereich: Bereich
  nr: string | null
  coach: string | null
  wege: KlimWeg[]
  bautAuf: string[]
  ursprung: string | null
  hinweis: string | null
  /** Status der Bausteine je Modul laut Tafel */
  bausteine: { entscheidungstisch: string; video0: string; logo: string; intro: string; outro: string; animation: string; coachPaket: string | null; faden: string; sprecher: string | null }
  quelle: TafelModul
}

const BEREICH_OK = new Set<string>(BEREICHE)
const MIN_JE_LEKTION = 9

function wegAusTafel(e: Ebene, w: TafelWeg, modulCoach: string | null): KlimWeg {
  const echt = w.lf ?? w.sprech?.lessons ?? null
  const lektionen = echt ?? w.ls ?? 3
  const sprech = w.sprech?.min ?? (w.sprech?.words ? Math.round(w.sprech.words / (A.tafel.wpm || 140)) : lektionen * MIN_JE_LEKTION)
  return {
    ebene: e, lektionen: Math.max(1, lektionen), geschaetzt: echt === null,
    sprechMin: sprech, coach: w.coach || modulCoach, schritte: w.steps, regelwerk: w.rw ?? null, lektor: w.lektor ?? null,
    notiz: w.note ?? '', produktion: w.prod2 ?? null,
  }
}

function moduleAus(tafel: TafelSnapshot): KlimModul[] {
  return tafel.modules.map((m) => {
  const erg = ERGAENZUNG[m.name] ?? { key: slug(m.name) }
  const coach = m.coach || null
  const wege = EBENEN.filter((e) => m.wege[e]).map((e) => wegAusTafel(e, m.wege[e], coach))
  const p = m.prod ?? {}
  return {
    key: erg.key, name: m.name, titel: m.title || null, slogan: m.slogan || null,
    bereich: (BEREICH_OK.has(m.bereich ?? '') ? m.bereich : 'KLIM-Weg') as Bereich,
    nr: m.nr ?? null, coach, wege, bautAuf: erg.bautAuf ?? [], ursprung: m.src ?? null, hinweis: erg.hinweis ?? null,
    bausteine: {
      entscheidungstisch: m.etisch?.status ?? 'offen', video0: m.video0?.status ?? 'offen',
      logo: p.logo?.status ?? 'offen', intro: p.intro?.status ?? 'offen', outro: p.outro?.status ?? 'offen', animation: p.animation?.status ?? 'offen',
      coachPaket: m.zip?.stand ?? null, faden: m.faden ?? 'offen', sprecher: m.sprecher?.art ?? null,
    },
    quelle: m,
  }
}).sort((a, b) => {
  const ia = EMPFEHLUNGSWEG.indexOf(a.key), ib = EMPFEHLUNGSWEG.indexOf(b.key)
  const ba = BEREICHE.indexOf(a.bereich), bb = BEREICHE.indexOf(b.bereich)
  return ba - bb || (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
})
}

// ---------------------------------------------------------------- Die eigene Produktpalette von KLIM (Treppe)

export interface TreppenStufe {
  stufe: 'Dialogprodukt' | 'Fertiges Info-Produkt' | 'Türöffner' | 'Nagelprodukt' | 'Einstiegsprodukt' | 'EINE Dienstleistung'
  produkt: string
  aufgabe: string
  beimKunden: string
  weiter: string
  stand: string
}

/**
 * Zielbild der KLIM-Treppe (erarbeitet 12.10.2026 nach „Die Treppe zum großen Ja“, S-Weg).
 * Die frühere KLIM-Linie (Version 22, 09.10.) ist damit nicht mehr maßgeblich.
 * Preise und Produktnamen werden erst am Ende festgelegt.
 */
export const KLIM_TREPPE: TreppenStufe[] = [
  { stufe: 'Dialogprodukt', produkt: 'KLIM-Werkstatt / Pilotgruppe mit 5–10 Selbständigen, bezahlt, ohne Live-Calls', aufgabe: 'mit echten Selbständigen lernen, was wirklich weh tut und wie sie es sagen', beimKunden: 'er wird gehört und bekommt erste Hilfe für sein Problem', weiter: 'aus seinen Sätzen und Fragen entsteht das Buch', stand: 'geplant; davor KLIM selbst neu positionieren (ab 16.10.)' },
  { stufe: 'Fertiges Info-Produkt', produkt: 'Buch zu den 7 Schmerzpunkten (ca. 30–60 Seiten)', aufgabe: 'Ursachen hinter den Symptomen verständlich machen, ohne dass Edis dabei sein muss', beimKunden: 'er versteht, warum es in seinem Betrieb hakt', weiter: 'er will wissen, wie stark es ihn selbst trifft', stand: 'Gliederung in Arbeit' },
  { stufe: 'Türöffner', produkt: '7-Punkte-Check / Betriebs-Check (kostenlos, mit Edi)', aufgabe: 'das eigene Problem messen und erleben', beimKunden: 'er sieht schwarz auf weiß seinen roten Punkt', weiter: 'er will ein Problem sofort lösen', stand: 'Entwurf' },
  { stufe: 'Nagelprodukt', produkt: 'offen (früherer Entwurf „Der Wühltisch-Ausstieg“, auch Engpass-Analyse überlegt)', aufgabe: 'ein konkretes Problem eigenständig lösen, ohne etwas aus dem Coaching vorwegzunehmen', beimKunden: 'erstes echtes Ergebnis, er erlebt die Qualität von KLIM', weiter: 'die größere Aufgabe hinter dem Einzelproblem wird sichtbar', stand: 'nicht entschieden' },
  { stufe: 'Einstiegsprodukt', produkt: 'S-Weg der Wirbelsäule im Abo, Start beim eigenen roten Punkt', aufgabe: 'erster echter Abschnitt des Coachings', beimKunden: 'sein Fundament entsteht, Rot wird Monat für Monat grün', weiter: 'sobald seine Themen GF-Themen werden, braucht er Begleitung', stand: 'Online-Start nur mit S, ohne Live-Calls' },
  { stufe: 'EINE Dienstleistung', produkt: 'KLIM-Coaching S → GF → U', aufgabe: 'vollständiger Umbau mit Begleitung', beimKunden: 'sein Betrieb trägt ihn, nicht er den Betrieb', weiter: '–', stand: 'Live (Stammtisch) erst mit dem Online-Start der GF-Ebene' },
]

/** Angebote „hinter der Tür“ – werden am Markt nicht beworben */
export const KLIM_HINTER_DER_TUER = [
  'Pakete Social Media, Marketing, Verkauf, Webseite & SEO',
  'Einzelmodule (z. B. Zeit mit Logbuch als Jahres-Abo, Kompass, Echtes Vermögen, Buchmodul)',
  'Meister Boost mit Edi (Software im Abo)',
  'Dienstleistungen (Einpflegen in Meister Boost, Umsetzen, Edi-Einarbeitung mit eigenen Daten)',
]

/** Positionierung von KLIM selbst (freigegeben 09.10.2026; wird ab 16.10. von Grund auf neu aufgebaut) */
export const KLIM_POSITIONIERUNG = {
  schlagwort: 'Dein Betrieb soll dich tragen – nicht du ihn.',
  kategorie: 'Betriebsumbau – Coaching und Software in einem',
  zielgruppe: 'Inhaber mit 3–8 Leuten, die selbst noch mit anpacken; nach außen Bau- und Ausbauhandwerk, im Hintergrund offen für andere Branchen',
  kernAussage: 'Dafür, dass ein Selbständiger seinen Betrieb Schritt für Schritt so umbaut, dass der Betrieb ihn trägt und nicht er den Betrieb.',
}

// ---------------------------------------------------------------- Zeitmodell (Arbeitstage)

const ceil = (n: number) => Math.max(1, Math.ceil(n))

/** Startannahmen je Arbeitsschritt; mit den Ist-Dauern in BauTakt nachschärfen (docs/klim/zeitmodell.md) */
export const KLIM_DAUER = {
  bestandsaufnahme: 2,
  sortierung: 1,
  modullogo: 2,
  entscheidungstisch: 1,
  abschlussvideoText: 1,
  sprechtexte: (l: number) => ceil(l / 5),
  qualitaetspruefung: (l: number) => ceil(l / 10),
  workbook: (l: number) => ceil(l / 8),
  freigabeEdis: 2,
  nullerVideoText: 1,
  coachPaket: 1,
  coachPrueft: 5,
  ueberarbeitung: 2,
  teleprompter: 1,
  vorlaufAufnahme: 5,
  /** Aufnahme-Planung ≈ Sprechzeit × 2, 6 Std. Aufnahme je Tag */
  aufnahme: (sprechMin: number) => ceil((sprechMin * 2) / 360),
  nullerVideoAufnahme: 1,
  schnitt: (l: number) => ceil(l / 6),
  animation: (l: number) => ceil(l / 3),
}

// ---------------------------------------------------------------- Tafel-Stand → Fortschritt

const FERTIG = new Set(['fertig', 'entfällt', 'freigegeben', 'abgenommen', 'erledigt'])
const LAUFEND = new Set(['in Arbeit', 'zur Abnahme', 'nachbessern', 'Idee', 'Entwurf', 'geplant'])

function standAus(werte: (string | null | undefined)[]): RowStand | undefined {
  const v = werte.filter((x): x is string => !!x)
  if (!v.length) return undefined
  const fertig = v.filter((x) => FERTIG.has(x)).length
  if (fertig === v.length) return { status: 'done', progress: 100, datum: A.stand }
  const laufend = v.filter((x) => LAUFEND.has(x)).length
  if (fertig + laufend === 0) return undefined
  return { status: 'in_progress', progress: Math.round(((fertig + laufend * 0.5) / v.length) * 100), datum: A.stand }
}

const STUFEN = ['zip', 'rueckmeldung', 'ueberarbeitung', 'abgestimmt', 'teleprompter', 'termin', 'aufgenommen', 'abgeschlossen']
const prodErreicht = (w: KlimWeg, stage: string) => {
  const s = w.produktion?.stage
  return s ? STUFEN.indexOf(s) >= STUFEN.indexOf(stage) : false
}

// ---------------------------------------------------------------- Vorlagen-Generator

const P = 'phase' as const, G = 'group' as const, T = 'task' as const, M = 'milestone' as const
const lc = (e: Ebene) => e.toLowerCase()
const join = (...keys: (string | null | undefined)[]) => keys.filter(Boolean).join(',') || undefined
const coachC = (c: string | null): TemplateConstraint[] => (c ? [] : [{ type: 'staff', title: 'Coach/Sprecher festlegen' }])

export function modulNotiz(m: KlimModul): string {
  const name = new Map(A.module.map((x) => [x.key, x.name]))
  const b = m.bausteine
  return [
    `Bereich: ${m.bereich}${m.nr ? ` · Nr. ${m.nr}` : ''}`,
    m.titel ? `Arbeitstitel: „${m.titel}“` : null,
    m.slogan ? `Slogan: „${m.slogan}“` : null,
    `Wege: ${m.wege.map((w) => `${w.ebene} ${w.lektionen}${w.geschaetzt ? ' (geschätzt)' : ''} Lekt./${w.sprechMin} Min.`).join(' · ')}`,
    `Coach: ${m.coach ?? 'offen'}${b.sprecher ? ` · Sprecher: ${b.sprecher}` : ''}`,
    `Bausteine: Entscheidungstisch ${b.entscheidungstisch} · 0er-Video ${b.video0} · Logo ${b.logo} · Intro ${b.intro} · Outro ${b.outro} · Animation ${b.animation} · Roter Faden ${b.faden} · Coach-Paket ${b.coachPaket ? `raus ${b.coachPaket}` : 'offen'}`,
    m.bautAuf.length ? `Baut auf: ${m.bautAuf.map((k) => name.get(k) ?? k).join(', ')}` : null,
    m.ursprung ? `Ursprung/Entscheidungen: ${m.ursprung}` : null,
    m.hinweis ? `Hinweis: ${m.hinweis}` : null,
    `Stand Tafel: ${A.tafel.stand}`,
  ].filter(Boolean).join('\n')
}

/**
 * Kapazitäten: Text-Arbeit (eine Schreib-Kapazität), Freigabe Edis, je Coach Prüfung und Aufnahme, Schnitt
 * laufen jeweils nacheinander. `kap` merkt sich je Kapazität den letzten Vorgang.
 */
interface Chain { lastText: string | null; kap: Map<string, string> }

/** Vorgänger auf derselben Kapazität liefern und den neuen Vorgang als letzten merken */
function kap(chain: Chain, name: string | null, key: string): string | undefined {
  if (!name) return undefined
  const vor = chain.kap.get(name)
  chain.kap.set(name, key)
  return vor
}

function vorarbeit(m: KlimModul, parent: string, chain: Chain, sec: string): Row[] {
  const k = m.key
  const w0 = m.wege[0]
  const platzhalter = m.wege.every((w) => w.geschaetzt)
  const rows: Row[] = [
    [`${k}_bestand`, parent, 'Bestandsaufnahme (Boards, Dopplungen, Hauptstellen)', T, KLIM_DAUER.bestandsaufnahme, 'KLIM-Text', join(chain.lastText), sec,
      platzhalter ? [{ type: 'planning', title: 'Lektionsbestand fehlt – Inhalte zuerst klären' }] : [], undefined, standAus([w0?.schritte[0]])],
    [`${k}_sort`, parent, 'Sortierung S/GF/U, Name & Slogan', T, KLIM_DAUER.sortierung, 'KLIM-Text', `${k}_bestand`, sec, [], undefined, standAus([w0?.schritte[1]])],
    [`${k}_logo`, parent, 'Modullogo', T, KLIM_DAUER.modullogo, 'Design', `${k}_sort`, sec, [], undefined, standAus([m.bausteine.logo])],
  ]
  chain.lastText = `${k}_sort`
  return rows
}

function weg(m: KlimModul, w: KlimWeg, parent: string, chain: Chain, sec: string, opts: { erstesPaket: boolean; nachWeg?: string; mitModulname?: boolean }): Row[] {
  const n = w.lektionen
  const c = w.coach
  const p = `${m.key}_${lc(w.ebene)}`
  const s = w.schritte
  const zip = !!m.bausteine.coachPaket
  const label = (opts.mitModulname ? `${m.name} · ` : '') + (w.ebene === 'ALL' ? `Abschluss über alle Ebenen · ${n} Lekt.` : `${w.ebene}-Weg · ${EBENEN_NAME[w.ebene]} · ${n} ${n === 1 ? 'Lektion' : 'Lektionen'}`)
  const notiz = [`≈ ${w.sprechMin} Min. Sprechzeit${w.geschaetzt ? ' (Lektionszahl geschätzt)' : ''}`, w.regelwerk ? `Regelwerk ${w.regelwerk}` : null, w.lektor ? `Lektor-Checkliste ${w.lektor}` : null, w.notiz ? `Tafel: ${w.notiz}` : null].filter(Boolean).join('\n')
  const done = (b: boolean) => (b ? standAus(['fertig']) : undefined)
  const rows: Row[] = [
    [p, parent, label, G, 0, null, undefined, sec, [], notiz],
    [`${p}_sprech`, p, 'Sprechtexte schreiben (je 3 Lektionen, mit Prüfung)', T, KLIM_DAUER.sprechtexte(n), 'KLIM-Text', join(chain.lastText, opts.nachWeg), sec, [], undefined, standAus(s.slice(2, 8))],
    [`${p}_qp`, p, 'Qualitätsprüfung vor Freigabe (Lektor-Checkliste)', T, KLIM_DAUER.qualitaetspruefung(n), 'KLIM-Text', `${p}_sprech`, sec, [], undefined, done(!!w.lektor || s[9] === 'fertig')],
    [`${p}_wb`, p, 'Workbook, To-dos, Zusammenfassung', T, KLIM_DAUER.workbook(n), 'KLIM-Text', `${p}_qp`, sec, [], undefined, standAus([s[8]])],
    [`${p}_frei`, p, 'Freigabe Edis', T, KLIM_DAUER.freigabeEdis, 'Edis', join(`${p}_wb`, kap(chain, 'Edis-Freigabe', `${p}_frei`)), sec, [], undefined, standAus([s[9]])],
    [`${p}_null`, p, '0er-Video Text (Edis)', T, KLIM_DAUER.nullerVideoText, 'KLIM-Text', `${p}_frei`, sec, [], undefined, standAus([m.bausteine.video0])],
    [`${p}_paket`, p, opts.erstesPaket ? 'Coach-Paket (ZIP) senden – E1' : `Material ${w.ebene} an Coach – E3`, T, KLIM_DAUER.coachPaket, 'KLIM-Text', `${p}_frei`, sec, [], undefined, done(zip)],
    [`${p}_coach`, p, 'Coach prüft (Frist 7 Tage, ggf. Erinnerung E2)', T, KLIM_DAUER.coachPrueft, c, join(`${p}_paket`, kap(chain, c && `prüft:${c}`, `${p}_coach`)), sec, coachC(c), undefined,
      prodErreicht(w, 'ueberarbeitung') ? done(true) : prodErreicht(w, 'rueckmeldung') ? { status: 'in_progress', progress: 50, datum: A.stand } : undefined],
    [`${p}_ueber`, p, 'Überarbeitung nach Rückmeldung – E3', T, KLIM_DAUER.ueberarbeitung, 'KLIM-Text', `${p}_coach`, sec, [], undefined, done(prodErreicht(w, 'abgestimmt'))],
    [`${p}_ok`, p, 'Abgestimmt – Zustimmung Coach (E4)', M, 0, c, `${p}_ueber`, sec, [], undefined, done(s[10] === 'fertig' || prodErreicht(w, 'abgestimmt'))],
    [`${p}_tele`, p, 'Teleprompter-Version + Terminvorschläge – E5', T, KLIM_DAUER.teleprompter, 'KLIM-Text', `${p}_ok`, sec, [], undefined, done(prodErreicht(w, 'termin'))],
    [`${p}_aufn`, p, 'Aufnahme (Bestätigung E6, Erinnerung E7)', T, KLIM_DAUER.aufnahme(w.sprechMin), c, join(`${p}_tele:FS+${KLIM_DAUER.vorlaufAufnahme}`, kap(chain, c && `aufnahme:${c}`, `${p}_aufn`)), sec,
      [{ type: 'equipment', title: 'Studio & Technik gebucht' }, ...coachC(c)], `Aufnahme-Planung ≈ ${w.sprechMin * 2} Min. (Sprechzeit × 2)`, done(prodErreicht(w, 'aufgenommen'))],
    [`${p}_nullaufn`, p, '0er-Video Aufnahme (Edis)', T, KLIM_DAUER.nullerVideoAufnahme, 'Edis', `${p}_null`, sec],
    [`${p}_schnitt`, p, 'Schnitt (Dank E8)', T, KLIM_DAUER.schnitt(n), 'Schnitt', join(`${p}_aufn`, kap(chain, 'Schnitt', `${p}_schnitt`)), sec, [], undefined, done(prodErreicht(w, 'abgeschlossen'))],
    [`${p}_anim`, p, 'Praxisteil-Animation (Thomas Huber – Format offen)', T, KLIM_DAUER.animation(n), 'Animation', `${p}_frei`, sec, [], undefined, standAus([m.bausteine.animation])],
    [`${p}_fertig`, p, `${m.name} · ${w.ebene === 'ALL' ? 'Abschluss' : `${w.ebene}-Weg`} bereit für Pre-Launch (E9)`, M, 0, null, `${p}_schnitt,${p}_anim,${p}_nullaufn`, sec, [], undefined, done(prodErreicht(w, 'abgeschlossen'))],
  ]
  chain.lastText = `${p}_sprech`
  return rows
}

function nachFreigabe(m: KlimModul, parent: string, ersterWeg: string, sec: string): Row[] {
  return [
    [`${m.key}_tisch`, parent, 'Entscheidungstisch (Vermarktung des Moduls)', T, KLIM_DAUER.entscheidungstisch, 'KLIM-Text', `${ersterWeg}_frei`, sec, [], undefined, standAus([m.bausteine.entscheidungstisch])],
    [`${m.key}_outro`, parent, 'Abschlussvideo (Outro) Text', T, KLIM_DAUER.abschlussvideoText, 'KLIM-Text', `${ersterWeg}_frei`, sec, [], undefined, standAus([m.bausteine.outro])],
  ]
}

const gruppenName = (m: KlimModul) => (m.titel && m.titel !== m.name ? `${m.name} – ${m.titel}` : m.name)

function modulKomplett(m: KlimModul, parent: string | null, chain: Chain): { rows: Row[]; fertig: string[] } {
  const g = `${m.key}_mod`
  const sec = m.bereich
  const rows: Row[] = [[g, parent, gruppenName(m), G, 0, null, undefined, sec, [], modulNotiz(m)]]
  rows.push(...vorarbeit(m, g, chain, sec))
  let vorher: string | undefined
  m.wege.forEach((w, i) => {
    rows.push(...weg(m, w, g, chain, sec, { erstesPaket: i === 0, nachWeg: vorher }))
    vorher = `${m.key}_${lc(w.ebene)}_frei`
  })
  rows.push(...nachFreigabe(m, g, `${m.key}_${lc(m.wege[0].ebene)}`, sec))
  return { rows, fertig: m.wege.map((w) => `${m.key}_${lc(w.ebene)}_fertig`) }
}

/** Wirbelsäule nach Ebenen: erst alle S-Wege (Online-Start nur S), dann GF (Start Stammtisch), dann U inkl. Abschluss-Lektionen */
function wirbelsaeuleNachEbenen(chain: Chain): Row[] {
  const module = EMPFEHLUNGSWEG.map((k) => A.module.find((m) => m.key === k)).filter((m): m is KlimModul => !!m)
  const rows: Row[] = []
  const ziele: Record<'S' | 'GF' | 'U', string> = {
    S: 'S-Ebene der Wirbelsäule bereit – Online-Start Einstiegsprodukt (nur S, ohne Live-Calls)',
    GF: 'GF-Ebene der Wirbelsäule bereit – Start Coaching mit Stammtisch',
    U: 'U-Ebene der Wirbelsäule bereit',
  }
  let vorherMs: string | null = null
  for (const e of ['S', 'GF', 'U'] as const) {
    const ph = `ws_${lc(e)}`
    rows.push([ph, null, `Wirbelsäule · ${EBENEN_NAME[e]}-Ebene (${e})`, P, 0, null, undefined, 'Wirbelsäule', [], `Der Empfehlungsweg: ${module.map((m) => m.name).join(' → ')}`])
    const fertig: string[] = []
    for (const m of module) {
      const hier = m.wege.filter((w) => w.ebene === e || (e === 'U' && w.ebene === 'ALL'))
      for (const w of hier) {
        const idx = m.wege.indexOf(w)
        const erster = idx === 0
        let parent = ph
        if (erster) {
          parent = `${m.key}_mod`
          rows.push([parent, ph, gruppenName(m), G, 0, null, undefined, 'Wirbelsäule', [], modulNotiz(m)])
          rows.push(...vorarbeit(m, parent, chain, 'Wirbelsäule'))
        }
        const vor = idx > 0 ? `${m.key}_${lc(m.wege[idx - 1].ebene)}_frei` : undefined
        rows.push(...weg(m, w, parent, chain, 'Wirbelsäule', { erstesPaket: erster, nachWeg: vor, mitModulname: !erster }))
        if (erster) rows.push(...nachFreigabe(m, parent, `${m.key}_${lc(w.ebene)}`, 'Wirbelsäule'))
        fertig.push(`${m.key}_${lc(w.ebene)}_fertig`)
      }
    }
    const ms = `ms_ws_${lc(e)}`
    rows.push([ms, ph, ziele[e], M, 0, null, join(...fertig, vorherMs), 'Wirbelsäule'])
    vorherMs = ms
  }
  return rows
}

function bereichsPhasen(bereiche: Bereich[], chain: Chain): Row[] {
  const rows: Row[] = []
  for (const b of bereiche) {
    const mods = A.module.filter((x) => x.bereich === b && x.wege.length)
    if (!mods.length) continue
    const ph = `ph_${slug(b)}`
    rows.push([ph, null, b, P, 0, null, undefined, b, [], b === 'KLIM-Weg' ? 'Module werden je nach Bedarf freigeschaltet – die Reihenfolge hier plant nur die Schreib-Kapazität.' : 'Reihenfolge der Pakete ist noch nicht festgelegt.'])
    const fertig: string[] = []
    for (const m of mods) {
      const r = modulKomplett(m, ph, chain)
      rows.push(...r.rows)
      fertig.push(...r.fertig)
    }
    rows.push([`ms_${ph}`, ph, `${b} bereit`, M, 0, null, join(...fertig), b])
  }
  return rows
}

/** Markteinstieg nach der KLIM-Treppe; `msS`/`msGF`/`zeitFertig` verbinden mit der Modulproduktion, falls vorhanden */
function markteinstieg(opts: { msS?: string; msGF?: string; zeitFertig?: string }): Row[] {
  const sec = 'Markteinstieg'
  const t = (i: number) => `${KLIM_TREPPE[i].stufe}: ${KLIM_TREPPE[i].produkt}`
  const laufend: RowStand = { status: 'in_progress', progress: 10, datum: A.stand }
  return [
    ['mk', null, 'KLIM-Markteinstieg nach der Produktpalette (Treppe)', P, 0, null, undefined, sec, [],
      `Schlagwort: „${KLIM_POSITIONIERUNG.schlagwort}“\nZielgruppe: ${KLIM_POSITIONIERUNG.zielgruppe}\nTreppe: ${KLIM_TREPPE.map((s) => s.stufe).join(' → ')}\nDauern sind Startannahmen.`],
    ['mk_pos', 'mk', 'KLIM selbst aufbauen: Positionierung, Avatar, Produktpalette, EVE für KLIM', T, 15, 'Edis', undefined, sec, [], 'Ab 16.10.2026: alles für KLIM von Grund auf neu festlegen, bevor das Dialogprodukt geplant wird.', laufend],
    ['mk_social', 'mk', 'Social-Media-Kanäle einrichten', T, 5, 'KLIM-Text', 'mk_pos', sec],
    ['mk_partner', 'mk', 'Partner mit der Zielgruppe anschreiben (VIM-Strategie)', T, 10, 'Edis', 'mk_pos', sec],
    ['mk_leads', 'mk', 'Leads für das Dialogprodukt schalten', T, 10, 'KLIM-Text', 'mk_social', sec],
    ['mk_dialog', 'mk', t(0), T, 30, 'Edis', 'mk_partner,mk_leads', sec, [{ type: 'client', title: 'Pilotteilnehmer gewonnen (bezahlt)' }], KLIM_TREPPE[0].aufgabe],
    ['mk_forschung', 'mk', 'Forschungsgespräche: 10–15 Gespräche, Kundensätze wörtlich mitschreiben', T, 15, 'Edis', 'mk_dialog:SS', sec],
    ['mk_buch', 'mk', t(1), T, 30, 'Edis', 'mk_forschung', sec, [], KLIM_TREPPE[1].aufgabe],
    ['mk_check', 'mk', t(2), T, 15, 'KLIM-Text', 'mk_pos', sec, [], KLIM_TREPPE[2].aufgabe],
    ['mk_nagel', 'mk', `${KLIM_TREPPE[3].stufe}: festlegen und bauen`, T, 20, 'Edis', 'mk_dialog', sec, [{ type: 'planning', title: 'Entscheidung: welches Produkt wird Nagelprodukt' }], `${KLIM_TREPPE[3].produkt}\n${KLIM_TREPPE[3].aufgabe}`],
    ['mk_einstieg', 'mk', `${KLIM_TREPPE[4].stufe}: S-Weg im Abo online`, M, 0, null, join('mk_check', 'mk_nagel', opts.msS), sec, opts.msS ? [] : [{ type: 'predecessor', title: 'S-Ebene der Wirbelsäule fertig produziert' }], KLIM_TREPPE[4].stand],
    ['mk_coaching', 'mk', `${KLIM_TREPPE[5].stufe}: KLIM-Coaching mit Stammtisch startet (GF)`, M, 0, null, join('mk_einstieg', opts.msGF), sec, opts.msGF ? [] : [{ type: 'predecessor', title: 'GF-Ebene der Wirbelsäule fertig produziert' }], KLIM_TREPPE[5].stand],
    ['mk_zeit', 'mk', 'Zeitmodul als eigenes Produkt mit Logbuch (Jahres-Abo) – hinter der Tür', M, 0, null, join('mk_einstieg', opts.zeitFertig), sec, [], 'Einzelverkauf nur als Ganzes (S/GF/U) inkl. Logbuch und digitaler Version.'],
  ]
}

// ---------------------------------------------------------------- Vorlagen

const BEISPIEL: KlimModul = {
  key: 'modul', name: 'Neues Modul', titel: null, slogan: null, bereich: 'KLIM-Weg', nr: null, coach: null, bautAuf: [], ursprung: null, hinweis: 'Lektionszahlen nach der Sortierung anpassen.',
  wege: (['S', 'GF', 'U'] as const).map((e, i) => ({ ebene: e, lektionen: [15, 8, 5][i], geschaetzt: true, sprechMin: [15, 8, 5][i] * MIN_JE_LEKTION, coach: null, schritte: [], regelwerk: null, lektor: null, notiz: '', produktion: null })),
  bausteine: { entscheidungstisch: 'offen', video0: 'offen', logo: 'offen', intro: 'offen', outro: 'offen', animation: 'offen', coachPaket: null, faden: 'offen', sprecher: null },
  quelle: { name: 'Neues Modul', wege: {} },
}

function vorlage(build: (chain: Chain) => Row[], start: string): Row[] {
  const chain: Chain = { lastText: 'ms_start', kap: new Map() }
  return [['ms_start', null, start, M, 0, null], ...build(chain)]
}

function vorlagenAus(): BuiltinTemplate[] {
  return [
  {
    id: 'tpl_klim_modul', name: 'KLIM-Modul (einzeln)', planning_kind: 'free', project_type: null, construction_method: null, refresh: true,
    description: 'Ein KLIM-Modul vom Board bis „bereit für Pre-Launch“: Bestandsaufnahme → Sortierung → je Weg Sprechtexte, Qualitätsprüfung, Workbook, Freigabe Edis → Coach-Paket, Prüfung, Abstimmung, Teleprompter, Aufnahme, Schnitt, Animation. Beispielumfang S 15 / GF 8 / U 5.',
    rows: vorlage((c) => {
      const r = modulKomplett(BEISPIEL, null, c)
      return [...r.rows, ['ms_fertig', null, 'Modul komplett – alle Ebenen bereit für Pre-Launch', M, 0, null, join(...r.fertig)]]
    }, 'Start Modulbearbeitung'),
  },
  {
    id: 'tpl_klim_wirbelsaeule', name: 'KLIM Wirbelsäule – Empfehlungsweg (Stand Tafel)', planning_kind: 'free', project_type: null, construction_method: null, refresh: true,
    description: `Die 11 Hauptmodule in fester Reihenfolge, erst S-Ebene (Online-Start), dann GF, dann U – mit echten Lektionen, Sprechzeiten, Coaches und dem Baufortschritt der Tafel (Stand ${A.tafel.stand}).`,
    rows: vorlage((c) => wirbelsaeuleNachEbenen(c), 'Start KLIM-Wirbelsäule'),
  },
  {
    id: 'tpl_klim_markt', name: 'KLIM-Markteinstieg (Produktpalette)', planning_kind: 'free', project_type: null, construction_method: null, refresh: true,
    description: 'Die KLIM-Treppe als Plan: KLIM selbst positionieren → Kanäle und Partner → Dialogprodukt (Pilotgruppe) → Buch → 7-Punkte-Check → Nagelprodukt → S-Weg im Abo → KLIM-Coaching mit Stammtisch.',
    rows: vorlage(() => markteinstieg({}), 'Start Markteinstieg'),
  },
  {
    id: 'tpl_klim_gesamt', name: 'KLIM Gesamtplan (Stand Tafel)', planning_kind: 'free', project_type: null, construction_method: null, refresh: true,
    description: `Markteinstieg nach der Produktpalette, Wirbelsäule nach Ebenen, danach die vier Pakete und der KLIM-Weg – alle ${A.module.length} Module mit dem Baufortschritt der Tafel (Stand ${A.tafel.stand}).`,
    rows: vorlage((c) => [
      ...wirbelsaeuleNachEbenen(c),
      ...bereichsPhasen(BEREICHE.filter((b) => b !== 'Wirbelsäule'), c),
      ...markteinstieg({ msS: 'ms_ws_s', msGF: 'ms_ws_gf', zeitFertig: A.module.find((m) => m.key === 'zeit')?.wege.map((w) => `zeit_${lc(w.ebene)}_fertig`).join(',') }),
    ], 'Start KLIM-Gesamtplan'),
  },
]
}

/** Katalog und Vorlagen für einen bestimmten Tafel-Stand berechnen (ohne den eingebauten Stand zu verändern) */
export function klimAus(tafel: TafelSnapshot): { module: KlimModul[]; templates: BuiltinTemplate[]; stand: ISODate } {
  const vorher = A
  try {
    A = { tafel, stand: standDatum(tafel), module: [] }
    A.module = moduleAus(tafel)
    return { module: A.module, templates: vorlagenAus(), stand: A.stand }
  } finally {
    if (vorher) A = vorher
  }
}

const EINGEBAUT = klimAus(TAFEL)
A = { tafel: TAFEL, stand: EINGEBAUT.stand, module: EINGEBAUT.module }

/** Eingebauter Stand (klim-tafel.ts) */
export const TAFEL_STAND: ISODate = EINGEBAUT.stand
export const KLIM_MODULE: KlimModul[] = EINGEBAUT.module
export const KLIM_TEMPLATES: BuiltinTemplate[] = EINGEBAUT.templates
export const KLIM_COACHES = TAFEL.coaches
export const KLIM_TEMPLATE_IDS = KLIM_TEMPLATES.map((t) => t.id)

// ---------------------------------------------------------------- Kennzahlen

export interface ModulKennzahl { key: string; name: string; bereich: Bereich; lektionen: number; sprechzeitMin: number; textAT: number; produktionAT: number; textFertig: number }

export function modulKennzahlen(m: KlimModul): ModulKennzahl {
  const D = KLIM_DAUER
  const lekt = m.wege.reduce((s, w) => s + w.lektionen, 0)
  const textAT = D.bestandsaufnahme + D.sortierung + D.entscheidungstisch + D.abschlussvideoText
    + m.wege.reduce((s, w) => s + D.sprechtexte(w.lektionen) + D.qualitaetspruefung(w.lektionen) + D.workbook(w.lektionen) + D.freigabeEdis + D.nullerVideoText, 0)
  const produktionAT = m.wege.reduce((s, w) => s + D.coachPaket + D.coachPrueft + D.ueberarbeitung + D.teleprompter + D.vorlaufAufnahme + D.aufnahme(w.sprechMin) + D.schnitt(w.lektionen), 0)
  const schritte = m.wege.flatMap((w) => w.schritte.slice(0, 10))
  const textFertig = schritte.length ? Math.round((schritte.filter((s) => FERTIG.has(s)).length / schritte.length) * 100) : 0
  return { key: m.key, name: m.name, bereich: m.bereich, lektionen: lekt, sprechzeitMin: m.wege.reduce((s, w) => s + w.sprechMin, 0), textAT, produktionAT, textFertig }
}
