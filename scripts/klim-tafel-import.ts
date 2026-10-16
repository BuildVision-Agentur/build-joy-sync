/**
 * Spielt einen neuen Stand der Tafel „KLIM-Weg – Baufortschritt“ als eingebauten Stand in BauTakt ein.
 *
 * Aufruf:  npm run klim:tafel -- <pfad zur index.html der Tafel oder JSON>
 * Ergebnis: src/bautakt/shared/templates/klim-tafel.ts neu, docs/klim/*.md neu erzeugt. Nach dem Deploy nutzen
 * die KLIM-Vorlagen diesen Stand, und laufende Projekte können ihn über „KLIM-Tafel abgleichen“
 * (Projektdaten) ohne Datei-Upload übernehmen. Für einen Abgleich zwischendurch reicht der Upload
 * der index.html direkt in BauTakt – dieses Skript ist dafür nicht nötig.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { parseTafel } from '../src/bautakt/shared/templates/klim-tafel-parse.ts'

const pfad = process.argv[2]
if (!pfad) {
  console.error('Bitte Pfad zur Tafel (index.html oder JSON) angeben.')
  process.exit(1)
}
const snap = parseTafel(readFileSync(pfad, 'utf8'))
const kopf = `/**\n * Stand der Tafel „KLIM-Weg – Baufortschritt“ (Datenblock DATA, bereinigt: ohne interne Dateilinks und Einspieler-Texte).\n * Nicht von Hand pflegen – neu einspielen mit \`npm run klim:tafel -- <index.html>\` (siehe docs/klim/README.md).\n */\n\nimport type { TafelSnapshot } from './klim-tafel-typen.ts'\n\nexport const TAFEL: TafelSnapshot = `
writeFileSync(new URL('../src/bautakt/shared/templates/klim-tafel.ts', import.meta.url), kopf + JSON.stringify(snap, null, 1) + '\n')
console.log(`Tafel-Stand ${snap.stand} eingespielt: ${snap.modules.length} Module.`)
execFileSync(process.execPath, [new URL('./klim-docs.ts', import.meta.url).pathname], { stdio: 'inherit' })
