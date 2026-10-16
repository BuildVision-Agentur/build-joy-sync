# KLIM – Zeitmodell

BauTakt berechnet die Dauer jedes Schritts aus der Lektionsanzahl des Wegs (`n`). Alle Werte stehen an einer Stelle, nämlich in `KLIM_DAUER` in `src/bautakt/shared/templates/klim.ts`. Die Werte sind **Startannahmen**.

Am besten so nachschärfen:
1. In BauTakt die Ist-Dauern eintragen.
2. Unter Ressourcen → Erfahrungswerte zeigt BauTakt Plan- und Ist-Dauer je Gewerk.
3. Die Werte hier daran anpassen und `npm run docs:klim` laufen lassen.

## Je Modul (einmal)

| Schritt | Arbeitstage | Gewerk |
|---|---:|---|
| Bestandsaufnahme | 2 | KLIM-Text |
| Sortierung S/GF/U, Name & Slogan | 1 | KLIM-Text |
| Modullogo | 2 | Design |
| Entscheidungstisch | 1 | KLIM-Text |
| Abschlussvideo-Text | 1 | KLIM-Text |

## Je Weg (Modul × Ebene)

| Schritt | Arbeitstage | Gewerk |
|---|---:|---|
| Sprechtexte | n ÷ 5, aufgerundet | KLIM-Text |
| Qualitätsprüfung | n ÷ 10, aufgerundet | KLIM-Text |
| Workbook, To-dos, Zusammenfassung | n ÷ 8, aufgerundet | KLIM-Text |
| Freigabe Edis | 2 | Edis |
| 0er-Video Text | 1 | KLIM-Text |
| Coach-Paket bzw. Material senden | 1 | KLIM-Text |
| Coach prüft (Frist 7 Kalendertage) | 5 | Coach |
| Überarbeitung | 2 | KLIM-Text |
| Teleprompter + Terminvorschläge | 1 | KLIM-Text |
| Vorlauf bis zur Aufnahme | 5 (als Abstand) | – |
| Aufnahme (Aufnahme-Planung ≈ Sprechzeit × 2, 6 Std. je Tag) | Sprechzeit × 2 ÷ 360 Min., aufgerundet | Coach |
| 0er-Video Aufnahme | 1 | Edis |
| Schnitt | n ÷ 6, aufgerundet | Schnitt |
| Praxisteil-Animation (nebenher) | n ÷ 3, aufgerundet | Animation |

Die **Sprechzeit** kommt aus der Tafel (gezählt mit 140 Wörtern pro Minute). Wo die Tafel noch keine hat, gilt eine Schätzung von 9 Minuten je Lektion.

## Abhängigkeiten in den Vorlagen

- **Innerhalb eines Wegs** läuft alles nacheinander: Sprechtexte → Prüfung → Workbook → Freigabe → Paket → Coach → Überarbeitung → Abgestimmt → Teleprompter → (5 AT Vorlauf) → Aufnahme → Schnitt → bereit. Animation und 0er-Video hängen an der Freigabe und laufen parallel.
- **Ebenen bauen aufeinander auf.** Die Sprechtexte des GF-Wegs beginnen erst nach der Freigabe des S-Wegs desselben Moduls, U erst nach GF.
- **Kapazitäten laufen nacheinander.** Jede der folgenden Kapazitäten erledigt einen Vorgang nach dem anderen:
  - die Text-Arbeit über alle Module
  - die Freigaben von Edis
  - je Coach die Prüfungen
  - je Coach die Aufnahmen
  - der Schnitt
  
  Die Reihenfolge folgt dem Plan. In der Wirbelsäule kommen zuerst alle S-Wege in Empfehlungsweg-Reihenfolge, dann GF, dann U. Danach folgen die Pakete und der KLIM-Weg. Wer mehr Kapazität hat, löst im Gantt einzelne Ketten-Abhängigkeiten.
- **Parallel** laufen die Animation und die Arbeit verschiedener Coaches.
- **Erledigtes zählt nicht mehr.** Schritte, die laut Tafel fertig sind, haben den Tafel-Stand als Ist-Termin und kosten keine Zeit mehr.

## Ergebnis mit Tafel-Stand 15.10.2026 (Planstart 19.10.2026, Feiertage Bayern)

| Meilenstein | voraussichtlich |
|---|---|
| S-Ebene der Wirbelsäule bereit (Online-Start) | Mitte Januar 2027 |
| GF-Ebene der Wirbelsäule bereit (Start Coaching mit Stammtisch) | Mitte Februar 2027 |
| U-Ebene der Wirbelsäule bereit | Anfang März 2027 |
| Pakete Social Media / Marketing / Verkauf / Webseite & SEO | März bis Juli 2027 |
| KLIM-Weg komplett | September 2027 |
| Einstiegsprodukt online (Markteinstieg) | Februar 2027, gebremst durch Dialogprodukt und Nagelprodukt |

Die genauen Daten hängen vom Firmenkalender und den Ist-Meldungen ab. Die Annahmen für Coach-Prüfung (7 Tage) und Vorlauf zur Aufnahme (5 AT) bestimmen den Takt am stärksten.
