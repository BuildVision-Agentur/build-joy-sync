# KLIM in BauTakt

BauTakt plant mit diesem Wissen die **Produktion der KLIM-Coaching-Module** und den **Markteinstieg nach der KLIM-Produktpalette**. Grundlage ist der echte Baufortschritt der Tafel „KLIM-Weg – Baufortschritt“.

Ein Modul wird dabei wie ein Bauprojekt behandelt. Die Arbeitsschritte sind die Vorgänge, die Rollen und Coaches sind die Gewerke (im internen BauTakt heißen sie „Kategorien“), und Aufnahmetermine sind Meilensteine. Was auf der Tafel schon erledigt ist, steht in BauTakt als „fertig“. So plant BauTakt nur noch den offenen Rest.

| Datei | Inhalt |
|---|---|
| [module.md](module.md) | alle Module der Tafel: Bereich, Arbeitstitel, Lektionen und Sprechzeit je Weg, Stand der 11 Text-Schritte, Coach-Paket, Produktion, Zeitbedarf, Voraussetzungen (erzeugt) |
| [produktpalette.md](produktpalette.md) | die eigene Produktpalette von KLIM (Treppe), Positionierung, „hinter der Tür“, offene Überlegungen (erzeugt) |
| [ablauf.md](ablauf.md) | der feste Ablauf je Modul: 11 Text-Schritte und 7 Produktionsstufen mit den E-Mails E1–E9 |
| [zeitmodell.md](zeitmodell.md) | wie BauTakt die Dauer jedes Schritts berechnet und wo man es anpasst |

Es gibt zwei Quellen:
- `src/bautakt/shared/templates/klim-tafel.ts` ist der Stand der Tafel. Diese Datei wird nicht von Hand gepflegt.
- `src/bautakt/shared/templates/klim.ts` enthält alles, was die Tafel nicht hat: Empfehlungsweg, Voraussetzungen zwischen Modulen, Zeitmodell, Produktpalette und die Vorlagen.

Die Dateien `module.md` und `produktpalette.md` werden aus beiden Quellen erzeugt (`npm run docs:klim`).

## Stand aktualisieren – direkt in BauTakt

Die Tafel bleibt der Ort, an dem der Baufortschritt gepflegt wird. BauTakt holt sich den neuen Stand auf Knopfdruck.

1. Claude im Projekt „KLIM Wissen“ bitten: „Lies die Tafel KLIM-Weg – Baufortschritt und gib mir die index.html.“
2. In BauTakt das KLIM-Projekt öffnen, dann **Projektdaten → KLIM-Tafel → Tafel abgleichen** und die index.html hochladen.
3. Auf **Vorschau** klicken. Sie zeigt:
   - welche Schritte jetzt fertig oder begonnen sind
   - welche Dauern sich geändert haben (mehr Lektionen oder längere Sprechzeit, zum Beispiel eine längere Aufnahme)
   - Coach-Wechsel
   - neue Module und Wege
   - was nicht mehr auf der Tafel steht
4. **Änderungen prüfen** erzeugt einen Änderungsvorschlag. Unter „Vorschläge“ siehst du die Auswirkung auf alle Termine, zum Beispiel „S-Ebene bereit“. Dort entscheidest du: übernehmen, ablehnen oder als Szenario bearbeiten.

Regeln des Abgleichs:
- **Nie zurückstufen.** Was in BauTakt schon weiter ist als auf der Tafel, bleibt so.
- **Dauern nur bei offenen Schritten.** Erledigte Schritte behalten ihre Dauer.
- **Entfernt wird nur Unberührtes.** Was nicht mehr auf der Tafel steht, wird nur entfernt, wenn dort noch nichts begonnen wurde. Begonnenes bleibt und wird im Vorschlag genannt.
- **Eigene Abhängigkeiten bleiben.** Abhängigkeiten zwischen bestehenden Vorgängen werden nicht angefasst. Was du im Gantt bewusst gelöst hast, bleibt gelöst.
- **Erst entscheiden, dann neu abgleichen.** Solange ein Tafel-Vorschlag offen ist, gibt es keinen zweiten.

Die Verknüpfung entsteht automatisch, wenn ein Projekt aus einer KLIM-Vorlage angelegt wird. Projekte aus der allerersten Version des Pakets (vor dem Abgleich) haben sie noch nicht. In dem Fall das Projekt einmal neu aus der Vorlage anlegen.

**Eingebauten Stand erneuern (optional).** Neue Projekte starten mit dem Stand, der in BauTakt eingebaut ist. Um ihn zu erneuern:
1. `npm run klim:tafel -- /pfad/zur/index.html` ausführen. Das schreibt `klim-tafel.ts` neu und erzeugt die Doku.
2. `npm test` laufen lassen, committen und deployen.

Danach können laufende Projekte den Abgleich auch ohne Datei machen. Der Knopf nimmt dann den eingebauten Stand.

## So nutzt du es in BauTakt

1. **Kategorien (Gewerke) anlegen** (Seitenleiste → Kategorien). Die Namen müssen genau so lauten, sonst werden die Vorgänge keinem Gewerk zugeordnet:
   - `KLIM-Text`, `Edis`, `Design`, `Schnitt`, `Animation`
   - je Coach sein Name wie auf der Tafel: `Amir Mustafic`, `Dino Sejdinovic`, `Simon Maugg`, `Katrin Sesselmann`, `Johannes Steiger`, `Peter Petridis`, `Edis (vorläufig)`, `Alan Jahic`
2. **Projekt aus einer Vorlage anlegen** (Planungsart „Freier Projektplan“):
   - **KLIM Gesamtplan (Stand Tafel)** – alle Module mit echtem Stand: Wirbelsäule nach Ebenen, die vier Pakete, KLIM-Weg und der Markteinstieg
   - **KLIM Wirbelsäule – Empfehlungsweg (Stand Tafel)** – die 11 Hauptmodule, erst S-Ebene, dann GF, dann U
   - **KLIM-Markteinstieg (Produktpalette)** – die Treppe als Plan, vom KLIM-eigenen Aufbau bis zum Coaching-Start
   - **KLIM-Modul (einzeln)** – ein neues Modul vom Board bis „bereit für Pre-Launch“, Beispielumfang S 15 / GF 8 / U 5
3. **Stand prüfen.** Was laut Tafel erledigt ist, steht schon auf „fertig“, mit dem Tafel-Datum als Ist-Termin. Was in Arbeit ist, steht auf „in Arbeit“. Was danach passiert, trägst du direkt in BauTakt ein.
4. **Coach-Plan teilen.** Über die Gewerkeansicht bekommt jeder Coach seinen Gewerkeplan per Link. Dort sieht er, wann Material zur Prüfung kommt und wann seine Aufnahme ist, und kann Termine bestätigen.

In den **Notizen** jeder Modulgruppe stehen Arbeitstitel, Slogan, Lektionen je Ebene mit Quelle, Coach, Ursprungs-Boards, Voraussetzungen und der letzte Stand.

## Grundbegriffe

**Die drei Ebenen (Wege).** Jedes Modul hat bis zu drei Wege. Sie bauen aufeinander auf: GF baut auf S auf, U auf S und GF.

| Ebene | Kürzel | Zuordnung nach Betriebsgröße |
|---|---|---|
| Selbständiger | S | 0–3 Mitarbeiter |
| Geschäftsführer | GF | 4–8 Mitarbeiter |
| Unternehmer | U | über 8 Mitarbeiter |

Investor ist eine vierte Ebene, die in den Coaching-Modulen nicht vorkommt.

**Bereiche.**
- **Wirbelsäule.** Die Hauptmodule, die jeder durchläuft. Sie werden zuerst verfilmt. Die Reihenfolge heißt „Der Empfehlungsweg“: Onboarding → Mindset → Innerer Bauplan → Positionierung → Avatar → Produktpalette → EVE → Finanzen → Mitarbeitergewinnung → Leadership → Systeme.
- **Pakete.** Nach der Wirbelsäule folgt ein gemeinsamer Weg in vier Paketen: Paket Social Media, Paket Marketing, Paket Verkauf, Paket Webseite & SEO. Die Reihenfolge der Pakete ist noch nicht festgelegt, darum werden sie nie nummeriert. Den Begriff „Verkauf & Marketing“ nicht mehr verwenden.
- **KLIM-Weg.** Alle übrigen Module. Sie werden je nach Bedarf freigeschaltet.

**Online-Start.** Zuerst geht nur die S-Ebene der Wirbelsäule online, ohne Live-Calls. Live-Formate („Stammtisch“) kommen erst mit der GF-Ebene. Darum plant die Wirbelsäulen-Vorlage erst alle S-Wege, dann GF, dann U.

**Zusammenhänge zwischen Modulen** (Auswahl, vollständig in module.md):
- Positionierung → Avatar → Produktpalette → EVE bilden eine geschlossene Kette. Nach dem Avatar schärft der Teilnehmer seinen Positionssatz in der Positionierung nach. Die Produktpalette endet mit dem Übergang zur EVE, und am Ende der EVE steht kein Upsell.
- Die Webseite setzt Positionierung, Avatar, Produktpalette und EVE voraus. SEO und Webseite verweisen gegenseitig aufeinander.
- Fundament: Der Kompass steht für Kopf und Mensch, der Innere Bauplan für den Betrieb. Betriebsversicherungen sind eine Lektion im S-Weg des Inneren Bauplans.
- Die Reihenfolge der Produktpalette ist fest und gilt in jedem Modul: Dialogprodukt → Info-Produkt → Türöffner → Nagelprodukt → Einstiegsprodukt → EINE Dienstleistung.

**Die sieben Schmerzpunkte** eines Unternehmers, nach denen KLIM die Wege ordnet:
1. falsche Positionierung
2. kein klarer Bauplan
3. falsche oder fehlende Mitarbeiter
4. täglich Feuer löschen
5. kein planbarer Vertrieb
6. alles hängt am Inhaber
7. Umsatz da, aber es bleibt zu wenig

**Lernkreislauf einer Lektion:** Hauptvideo → Handgriff (kurzes Vormach-Video, nur wo sinnvoll) → digitales Workbook in Meister Boost → Coach prüft → die Einreichung ist Voraussetzung für den Stammtisch.

**Pro Modul gehören zur Fertigstellung:** Sprechtexte je Weg, Workbook, To-dos und Zusammenfassung je Ebene, Entscheidungstisch, Modullogo, 0er-Video (Modul-Intro, gesprochen von Edis), Abschlussvideo (Outro) und das Coach-Paket als ZIP mit PDFs.

## Was hier bewusst nicht steht

Keine Sprechtexte, keine Texte der Edis-Geschichten und keine internen Dateien der Tafel. Diese Inhalte bleiben im Projekt „KLIM Wissen“. Die Tafel-Notizen je Weg (Stand, Entscheidungen) sind enthalten. Preise stehen nur als offene Überlegung in produktpalette.md.

**Das Repo muss privat bleiben.**
