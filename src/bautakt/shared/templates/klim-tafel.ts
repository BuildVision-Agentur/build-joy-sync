/**
 * Stand der Tafel „KLIM-Weg – Baufortschritt“ (Datenblock DATA, bereinigt: ohne interne Dateilinks und Einspieler-Texte).
 * Nicht von Hand pflegen – neu einspielen mit `npm run klim:tafel -- <index.html>` (siehe docs/klim/README.md).
 */

import type { TafelSnapshot } from './klim-tafel-typen.ts'

export const TAFEL: TafelSnapshot = {
 "stand": "15.10.2026",
 "wpm": 140,
 "steps": [
  "1 Bestandsaufnahme (Dopplungen, Hauptstellen)",
  "2 Sortierung S / GF / U",
  "3 Fließtext / Board-Text",
  "4 Sprechtexte",
  "5 Geschichten (Archiv, Edis gelb, Herkunft)",
  "6 Schlüsselmoment Jetzt-Zeit (V5)",
  "7 Meta-Techniken (V4)",
  "8 Aufgaben nur aus Original (V6)",
  "9 Workbook",
  "10 Freigabe Edis",
  "11 Zustimmung Coach (aufnahmebereit)"
 ],
 "coaches": [
  "Amir Mustafic",
  "Dino Sejdinovic",
  "Simon Maugg",
  "Katrin Sesselmann",
  "Johannes Steiger",
  "Peter Petridis",
  "Edis (vorläufig)",
  "Alan Jahic"
 ],
 "pakete": [
  "Paket Social Media",
  "Paket Marketing",
  "Paket Verkauf",
  "Paket Webseite & SEO"
 ],
 "sprecherRegel": "Edis spricht in jedem Modul das 0er-Video. „Edis komplett“-Module spricht er ganz. In allen Coach-Modulen werden die Edis-Geschichten (gelb, Ich-Form) als kurze Edis-Einspieler aufgenommen und ins Coach-Video geschnitten; der Coach kündigt sie mit einem Satz an. „Zitat“ = im Sprechtext schon als Zitat geschrieben („So erzählt Edis: …“) – der Teil in Anführungszeichen ist der Einspieler. Liste geprüft am 08.10. aus allen 59 verlinkten Sprechtext-Docs: 134 Einspieler, ca. 2 Std. 55 Min. Zeiten bei 140 Wörtern/Min.",
 "quelle": "Tafel „KLIM-Weg – Baufortschritt“ https://claude.ai/artifact/9GV3rDFbuhU5UjyWrmpm7b",
 "modules": [
  {
   "nr": "1",
   "name": "Mitarbeitergewinnung",
   "title": "Zwei Hände reichen nicht",
   "slogan": "Finden statt hoffen.",
   "bereich": "Wirbelsäule",
   "coach": "Simon Maugg",
   "src": "Das System hinter deinem Mitarbeiterzufluss · Die Kraft der richtigen Menschen · Ein Team aufbauen das mitdenkt · Onboarding Mitarbeiter · Name/Slogan freigegeben 06.10. · Zweck/Vision/Werte → Hauptstelle Bauplan U (U-Weg hier verdichten) · Klick-Anleitung Anzeigenaufbau (S18–S24) → gemeinsames Bildschirmvideo/Workbook mit Social Media, Sprechtext nur Warum/Was",
   "faden": "abgenommen",
   "etisch": {
    "status": "freigegeben",
    "url": "https://claude.ai/artifact/DeABk7sy1ypcBMBSsgtPpz",
    "stand": "09.10.",
    "note": "Freigegeben 09.10. Offen für später: Beweise mit Zahlen (eigene Recruiting-Zahlen, Teilnehmer-Testimonial)."
   },
   "video0": {
    "status": "in Arbeit",
    "url": "https://claude.ai/code/artifact/a63ff1e9-48ce-4b5d-934b-42ceca6029a2"
   },
   "webinar": {
    "status": "geplant",
    "stand": "10.10.",
    "note": "Offenes Webinar für Neukunden (Nicht-Kunden), ca. 45 Min., führt zum kostenlosen Betriebs-Check. Thema Fachkräftemangel: Warum sich bei dir keiner bewirbt – und was Betriebe anders machen, bei denen es klappt. Für zahlende Kunden bleibt der Stammtisch."
   },
   "zip": {
    "name": "Zwei Haende reichen nicht (Mitarbeitergewinnung) - Paket zur Pruefung 2026-10-07.zip",
    "stand": "07.10.",
    "coach": "Simon Maugg"
   },
   "prod": {
    "logo": {
     "status": "Idee",
     "url": "https://claude.ai/artifact/AdQpbZqznmveVVJwaxihmv",
     "note": "Idee/Vorschlag 07.10. (Board „Jedes Modul seine eigene Farbwelt“): Petrol-Mint: zwei Hände strecken sich zum Licht und berühren sich. Noch offen: Modulname in die Kachel (Regeln Buchcover), Freigabe."
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach + Edis-Einspieler",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 27.8,
    "einspielerAnzahl": 23
   },
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "zur Abnahme",
      "offen"
     ],
     "ls": 24,
     "lf": 34,
     "rw": "V6",
     "note": "13.10.: Neufassung nach Skill klim-sprechtexte läuft (eigenes Doc): L1–3 Maßstab, L4–30 freigegeben (6,5–13,5 Min.), L31–34 zur Freigabe (9–9,5 Min.). Alle 34 Lektionen geschrieben. Bis zur Freigabe der ganzen Neufassung gilt die V6-Fassung. S-Weg komplett nach V6 (06.10.): 34 Lektionen geschrieben, Abschlussprüfung bestanden, Abschlusspaket fertig – zur Abnahme durch Edis. Offen: AGG-Frist (Entwurf 4 Monate, Verkündung prüfen), Zeiterfassungsgesetz 2027, Bildschirmvideo Klickwege mit Social Media. 07.10.: Pilot Workbook 2.0 (Ergebnis, Edi-Fragen, Handgriffe, 6 Stammtisch-Stationen mit Prüflisten) zur Freigabe; ersetzt nach Freigabe das bisherige S-Workbook.",
     "coach": "Simon Maugg",
     "sprech": {
      "lessons": 34,
      "words": 25716,
      "min": 184
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/WKDcxGBrdrJXb8sCmttpUe",
       "typ": "sprechtexte"
      },
      {
       "label": "Sprechtexte Neufassung (Textregeln 13.10.)",
       "url": "https://claude.ai/artifact/AS26gx1jipbUqBoewU4LPY",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook S-Weg",
       "url": "https://claude.ai/artifact/6ATsbknyYBwFtQrDG5XUEV",
       "typ": "workbook"
      },
      {
       "label": "Workbook S-Weg 2.0 (Entwurf: Edi + Stammtisch)",
       "url": "https://claude.ai/artifact/Ya4uEt8pyv7krMSQjAu6pS",
       "typ": "workbook"
      },
      {
       "label": "To-dos S-Weg",
       "url": "https://claude.ai/artifact/4dGTHCrDqc18s7WvNyFoce",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung S-Weg",
       "url": "https://claude.ai/artifact/JDWw24wsF23Ax849ttSHJY",
       "typ": "zusammenfassung"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "zur Abnahme",
      "offen"
     ],
     "ls": 29,
     "lf": 26,
     "rw": "V7",
     "note": "Freigegeben 06.10.: Sprechtexte L1–26 (V6/V7) und Abschlusspaket. Offen: Freigabe Edis, Begrüßung/Coach. · 07.10.: KLIM-Werkzeuge im Workbook ergänzt (Recruiting-Cockpit, Fertig bedeutet), Ergänzung KLIM, Freigabe Edis offen. · 10.10.: CFO-Lektion (Board L11) verschoben nach Finanzen U4/U5. Erledigt (Dopplung): L9 „Wie Zusammenarbeit …“ ist wortgleich mit Online-Marketing-Board L18 → Hauptstelle Partnergewinnung (Kooperations-Paket); L10 „Verkaufsstarke Sprachmuster“ ist wortgleich mit Online-Marketing-Board L13 → Hauptstelle 6c „Worte, die führen“ (Schritte 1–8), Schritt 9 „Was und Warum, nicht Wie“ → 6b. Alle drei verschobenen Lektionen untergebracht.",
     "coach": "Simon Maugg",
     "sprech": {
      "lessons": 26,
      "words": 26116,
      "min": 187
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/AoUNEgGxMBhM6op6PRjz3H",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook GF-Weg",
       "url": "https://claude.ai/code/artifact/bb04799c-f566-4e3a-b403-03149132ab27",
       "typ": "workbook"
      },
      {
       "label": "To-dos GF-Weg",
       "url": "https://claude.ai/code/artifact/1931816f-7c8e-4eb1-8e56-17c0a7b8b42c",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung GF-Weg",
       "url": "https://claude.ai/code/artifact/2b83e4cc-aaaf-4ba3-a994-49ec2a40ebfb",
       "typ": "zusammenfassung"
      }
     ]
    },
    "U": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "zur Abnahme",
      "offen"
     ],
     "ls": 8,
     "lf": 8,
     "rw": "V7",
     "note": "Freigegeben 06.10.: Sprechtexte U1–8 (V6/V7, verdichtet von 11; Zweck als Kurzfassung mit Verweis auf Innerer Bauplan) und Abschlusspaket. Offen: Freigabe Edis. · 07.10.: KLIM-Werkzeuge im Workbook ergänzt (30-60-90-Plan, HR-Rhythmus, Bindungscheck, Fertig bedeutet), Ergänzung KLIM, Freigabe Edis offen.",
     "coach": "Simon Maugg",
     "sprech": {
      "lessons": 8,
      "words": 7604,
      "min": 54
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/LxPzCFhgVyq6B2MfNqBLJP",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook U-Weg",
       "url": "https://claude.ai/code/artifact/946e1bbf-b4dd-416b-bd0c-7b281a9f7a55",
       "typ": "workbook"
      },
      {
       "label": "To-dos U-Weg",
       "url": "https://claude.ai/code/artifact/e44d5ede-524f-451e-83a0-e86cd5dac15e",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung U-Weg",
       "url": "https://claude.ai/code/artifact/4048fd2a-8255-47ca-a455-24e7393a24fc",
       "typ": "zusammenfassung"
      }
     ]
    }
   }
  },
  {
   "nr": "9",
   "name": "Fundament – Kompass",
   "title": "Der Kompass unter dem Fundament",
   "slogan": "Hier wird mein Kopf geführt – und mein Betrieb gebaut.",
   "bereich": "KLIM-Weg",
   "coach": "Katrin Sesselmann",
   "src": "Kompass = Kopf und Mensch (Abgrenzung zum Bauplan = Betrieb)",
   "faden": "abgenommen",
   "etisch": {
    "status": "freigegeben",
    "url": "https://claude.ai/artifact/7SNSGHRuqYww3BFg4Zp9t8",
    "stand": "09.10.",
    "note": "Freigegeben 09.10. Offen für später: Teilnehmerstimme als Beweis."
   },
   "video0": {
    "status": "in Arbeit",
    "url": "https://claude.ai/code/artifact/e29449b0-c446-439c-8640-e02c35495f59"
   },
   "zip": {
    "name": "Der Kompass unter dem Fundament (Fundament) - Paket zur Pruefung 2026-10-08.zip",
    "stand": "08.10.",
    "coach": "Katrin Sesselmann"
   },
   "prod": {
    "logo": {
     "status": "Idee",
     "url": "https://claude.ai/artifact/AdQpbZqznmveVVJwaxihmv",
     "note": "Idee/Vorschlag 07.10. (Board „Jedes Modul seine eigene Farbwelt“): Waldgrün und Kupfer: Haus steht auf einer Windrose (Slogan offen). Noch offen: Modulname in die Kachel (Regeln Buchcover), Freigabe."
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach + Edis-Einspieler",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 8.5,
    "einspielerAnzahl": 8
   },
   "docs": [
    {
     "label": "Modulbeschreibung",
     "url": "https://claude.ai/artifact/72E8Jjv44gR9UyWBBNqF1x",
     "typ": "zusammenfassung"
    },
    {
     "label": "Modulreview",
     "url": "https://claude.ai/artifact/Rmp1ZtcPSa2tz8wiMYQ6xb",
     "typ": "arbeit"
    }
   ],
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen"
     ],
     "ls": 6,
     "lf": 18,
     "rw": "V7",
     "note": "S-Weg komplett nach V7 (08.10.): 18 Lektionen freigegeben, Regelwerk-Prüfung bestanden (Checkliste, 24 Schreibregeln, Satzlängen, Brücken max. 2 Sätze, kein „Stell dir vor“ als Einstieg, Geschichten in jeder Lektion wieder aufgegriffen, keine genauen Uhrzeiten/Tage), Abschlusspaket fertig (Workbook mit Kompass-Blatt und Kompass auf einer Seite, To-dos, Zusammenfassung, 0er-Skript) – zur Abnahme durch Edis. Nur S-Weg laut S/GF/U-Liste. Edis-Einspieler L2, L6, L7, L8, L11, L12, L14, L16; Thomas Huber L4 und L13. Offen: Coach festlegen. Freigabe Edis erteilt (08.10.). Fehlt nur noch: Zustimmung Coach (Katrin Sesselmann).",
     "coach": "Katrin Sesselmann",
     "sprech": {
      "lessons": 18,
      "words": 15050,
      "min": 108
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/5GhxhZU2aRCWqVmtK2HmbP",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook S-Weg",
       "url": "https://claude.ai/code/artifact/d04d8ca3-d46d-4ebf-bf6c-1efe8b3d3c9a",
       "typ": "workbook"
      },
      {
       "label": "To-dos S-Weg",
       "url": "https://claude.ai/code/artifact/eb9aae0d-1909-48dc-acc6-4e28cccd0a19",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung S-Weg",
       "url": "https://claude.ai/code/artifact/21639953-29a1-45f8-9387-ac0040f76356",
       "typ": "zusammenfassung"
      }
     ]
    }
   }
  },
  {
   "nr": "9",
   "name": "Fundament – Innerer Bauplan",
   "title": "Der innere Bauplan deines Unternehmens",
   "slogan": "Gut gebaut trägt sich selbst.",
   "bereich": "Wirbelsäule",
   "coach": "Katrin Sesselmann",
   "src": "„Bauplan der vier Ebenen“ hier Hauptstelle · Betriebsversicherungen als 1 Lektion im S-Weg · Schnellstart-Formel (20 Schritte im Bauplan-Board) → Angebotsmagie",
   "faden": "abgenommen",
   "etisch": {
    "status": "freigegeben",
    "url": "https://claude.ai/artifact/JZG6hVjUbzUY3vUz9pBgc2",
    "stand": "09.10.",
    "note": "Freigegeben 09.10. Offen für später: Versicherungsteil fachlich prüfen, Teilnehmerstimme."
   },
   "video0": {
    "status": "in Arbeit",
    "url": "https://claude.ai/code/artifact/aeec69dd-1d06-45da-b023-810ba1a78988"
   },
   "zip": {
    "name": "Der innere Bauplan (Fundament) - Paket zur Pruefung 2026-10-08.zip",
    "stand": "08.10.",
    "coach": "Katrin Sesselmann"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach + Edis-Einspieler",
    "edis0": true,
    "hinweis": "Geprüft 08.10.: Coach spricht, Edis als Einspieler (S1, S6, S13, S14, S15, U15). Versicherungs-Lektionen S7–12: evtl. Versicherungsfachmann als Sprecher (offen).",
    "einspielerMin": 10.9,
    "einspielerAnzahl": 18
   },
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen"
     ],
     "ls": 15,
     "lf": 15,
     "rw": "V7",
     "note": "16.10.: Wird noch einmal in Ruhe komplett überarbeitet (Entscheidung Edis), danach Lektor-Checkliste. Bisher: S-Weg komplett nach V7 (08.10.): 15 Lektionen freigegeben, Regelwerk-Prüfung bestanden (kein „Stell dir vor“, keine Uhrzeiten/Tage, Geschichten in jeder Lektion wieder aufgegriffen, Brücken max. 2 Sätze), Abschlusspaket fertig (Workbook mit Prüfliste Absicherung und Abnahme-Checkliste, To-dos, Zusammenfassung, 0er-Skript für alle Ebenen) – zur Abnahme durch Edis. Aufgaben direkt aus dem Board (Bauplan Video 1–4, 6, 9, 22; Vier Ebenen S1–5 aus dem EVE-Board; Betriebsversicherungen S1–18; Trotz Wissen S1+S5 übertragen). Edis-Einspieler L1, L6, L13, L14, L15; Thomas Huber L2, L10, L14. Offen: Name des Versicherungsfachmanns (L7, Platzhalter) und ob er L7–12 selbst spricht; L7–12 fachlich prüfen lassen; Coach festlegen. Senke: geklärt, steht im GF-Weg L3. Korrektur 08.10.: L3 enthält jetzt alle vier Mythen und den gefährlichsten (schon angekommen), Aufgabe um Video 3, Schritt 2–3 ergänzt; Workbook, To-dos und Zusammenfassung angepasst. Freigabe Edis erteilt (08.10.). Fehlt nur noch: Zustimmung Coach (Katrin Sesselmann).",
     "coach": "Katrin Sesselmann",
     "sprech": {
      "lessons": 15,
      "words": 11420,
      "min": 82
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/GzST44BAyks1nG5t3ymTAS",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook S-Weg",
       "url": "https://claude.ai/code/artifact/ce165422-e18a-48c4-907c-298baa10a012",
       "typ": "workbook"
      },
      {
       "label": "To-dos S-Weg",
       "url": "https://claude.ai/code/artifact/77db4d3f-d9bc-43d0-a7c2-12b2294f0872",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung S-Weg",
       "url": "https://claude.ai/code/artifact/f9334c6b-1e46-4dbc-9564-d0abd7c88460",
       "typ": "zusammenfassung"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen"
     ],
     "ls": 17,
     "lf": 17,
     "rw": "V7",
     "note": "GF-Weg komplett nach V7 (08.10.): 17 Lektionen (L1–6 freigegeben, L7–17 auf Wunsch durchgeschrieben), Regelwerk-Prüfung bestanden, Abschlusspaket fertig (Workbook mit Abnahme-Checkliste, To-dos, Zusammenfassung) – zur Abnahme durch Edis. Rückblick und „Darum geht es in diesem Weg“ in L1, Senke aus „Wachstum mit System“ in L3, Abschluss des Wegs mit Upsell (U-Weg, Rezeptbuch) in L17. Edis-Einspieler L2, L3, L6, L7, L14; Thomas Huber als Geschäftsführer L4, L9, L13, L16. Verweis L11 auf „Erst du, dann dein Team“ aktualisiert. Offen: Coach festlegen. Freigabe Edis erteilt (08.10.). Fehlt nur noch: Zustimmung Coach (Katrin Sesselmann).",
     "coach": "Katrin Sesselmann",
     "sprech": {
      "lessons": 17,
      "words": 11990,
      "min": 86
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/S86hMqDWyLPYCGVbqdCn2y",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook GF-Weg",
       "url": "https://claude.ai/code/artifact/6886fb9c-5a21-4fd4-99d2-a24c455f511a",
       "typ": "workbook"
      },
      {
       "label": "To-dos GF-Weg",
       "url": "https://claude.ai/code/artifact/1b3ec84e-e72b-4678-9a74-98fdc4ccd698",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung GF-Weg",
       "url": "https://claude.ai/code/artifact/950e852b-8af0-4f31-85bb-ea6d7c91b73a",
       "typ": "zusammenfassung"
      }
     ]
    },
    "U": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen"
     ],
     "ls": 19,
     "lf": 20,
     "rw": "V7",
     "note": "U-Weg komplett nach V7 (08.10.): 19 Lektionen auf Wunsch („mach einfach fertig“) in einem Zug neu geschrieben, Regelwerk-Prüfung bestanden, Abschlusspaket fertig (Workbook mit Abnahme-Checkliste, To-dos, Zusammenfassung) – zur Abnahme durch Edis. Aufgaben direkt aus dem Board (Vier Ebenen S7–10, Warum S1–6, Unternehmenszweck S1–9, Ethik S1–10, Video 8 Entwicklungsfahrplan, Vom schweren Erfolg S1–11, Übergabe S1–10, Video 23). Rückblick und „Darum geht es in diesem Weg“ in L1, Abschluss des Wegs in L19, Abschluss des Moduls in der eigenen Abschluss-Lektion (alle Ebenen); frühere L19 „Das ganze Werk von oben“ dorthin verschoben. Edis-Einspieler L3, L6, L9, L11, L13, L15 (drei Söhne), L16; Thomas Huber als Unternehmer L1, L10. Hinweis in L16–18: ersetzt keine Fachberatung. Alte Fassung V3 als Archiv-Tab. Freigabe Edis erteilt (08.10.). Fehlt nur noch: Zustimmung Coach (Katrin Sesselmann).",
     "coach": "Katrin Sesselmann",
     "sprech": {
      "lessons": 19,
      "words": 12373,
      "min": 88
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/JaJwK4WvvEFKQBdsPuquFh",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook U-Weg",
       "url": "https://claude.ai/code/artifact/1b2bd0c1-a65d-44c8-bf9d-c4a95c903cd0",
       "typ": "workbook"
      },
      {
       "label": "To-dos U-Weg",
       "url": "https://claude.ai/code/artifact/d357f28f-4e4d-41f1-acba-dd9e5414d102",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung U-Weg",
       "url": "https://claude.ai/code/artifact/aef8f977-da29-41cb-bbc6-0cff4a6ceb9c",
       "typ": "zusammenfassung"
      }
     ]
    },
    "ALL": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen"
     ],
     "ls": 1,
     "lf": 1,
     "rw": "V7",
     "note": "Abschluss-Lektion „Vom Keller bis zum Dach“ geschrieben (08.10.), Regelwerk-Prüfung V7 bestanden. Inhalt: Board Video 23, Schritt 1 (Ebene ehrlich prüfen, Stillstand ist Rückgang, Wachstum ist Pflicht, erster Hebel = Zufluss) und Vier Ebenen, Schritt 9. Die frühere U-Lektion 19 „Das ganze Werk von oben“ ist hierher gewandert (U-Weg jetzt 19 Lektionen). Edis-Einspieler „Das Gebäude als Ganzes“. Hier steht „Abschluss des Moduls“ mit Upsell (Wirkung statt Werbung, Erst du dann dein Team, Rezeptbuch, Vom Wasserträger zum Brunnenbauer); S15, GF17 und U19 enden mit „Abschluss des Wegs“. Workbook-Seite in allen drei Workbooks. Fehlt: Freigabe Edis, Zustimmung Coach. Freigabe Edis erteilt (08.10.). Fehlt nur noch: Zustimmung Coach (Katrin Sesselmann).",
     "coach": "Katrin Sesselmann",
     "sprech": {
      "lessons": 1,
      "words": 872,
      "min": 6
     },
     "docs": [
      {
       "label": "Sprechtext Abschluss-Lektion",
       "url": "https://claude.ai/code/artifact/137fc55c-bf26-4b85-8f0f-b75b990120ae",
       "typ": "sprechtexte"
      }
     ]
    }
   }
  },
  {
   "nr": "30",
   "name": "Selbstvermarktung",
   "title": "Licht an",
   "slogan": "Gute Arbeit gehört ins Licht.",
   "bereich": "Paket Marketing",
   "paket": "Paket Marketing",
   "coach": "Amir Mustafic",
   "src": "Board „Selbstvermarktung – Die Kunst, erkannt zu werden“ (L1–L4 → S, L5–L7 → GF/U, Content-Lektion nicht hier) · Hauptstelle für „Das Mindset, das dich sichtbar macht“ (Doppellektion im Mindset entfällt) · Mindset „Vom Macher zum Marktführer“ S3 (zwei Stimmen) → S5, S4 (charismatischer Held) → neue S11 · übrige Board-Aufgaben → Workbook",
   "faden": "abgenommen",
   "etisch": {
    "status": "freigegeben",
    "url": "https://claude.ai/artifact/7qNDnC8GJCMp1izsg2iuAz",
    "stand": "09.10.",
    "note": "Freigegeben 09.10. Offen für später: Beweise mit Zahlen, Teilnehmerstimme."
   },
   "video0": {
    "status": "offen"
   },
   "zip": {
    "name": "Licht an (Selbstvermarktung) - Paket zur Pruefung 2026-10-06.zip",
    "stand": "06.10.",
    "versand": {
     "datum": "",
     "coach": "Amir Mustafic"
    },
    "verlauf": [
     {
      "datum": "",
      "typ": "mail",
      "nr": "E1",
      "text": "Coach-Paket zur Prüfung an Amir Mustafic"
     }
    ],
    "coach": "Amir Mustafic"
   },
   "prod": {
    "logo": {
     "status": "Idee",
     "url": "https://claude.ai/artifact/AdQpbZqznmveVVJwaxihmv",
     "note": "Idee/Vorschlag 07.10. (Board „Jedes Modul seine eigene Farbwelt“): Bühnenlicht: Scheinwerfer auf einen Hammer auf dem Sockel. Noch offen: Modulname in die Kachel (Regeln Buchcover), Freigabe."
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach + Edis-Einspieler",
    "edis0": true,
    "hinweis": "ZIP ist schon bei Amir – ihm das Einspieler-Prinzip kurz erklären.",
    "einspielerMin": 4.9,
    "einspielerAnzahl": 4
   },
   "docs": [
    {
     "label": "Modul 30 – Endfassung (Fließtext)",
     "url": "https://claude.ai/artifact/L4JVAJFKwd8fCEb8tpQmdn",
     "typ": "arbeit"
    }
   ],
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "ls": 9,
     "lf": 11,
     "rw": "V6",
     "note": "S1–S11 freigegeben (06.10.), Abschlussprüfung V6 bestanden. Schriftliche Aufgaben verweisen aufs Workbook statt aufs Blatt. Workbook, To-dos und Zusammenfassung angelegt (06.10.). Fehlt: Freigabe Edis (gelbe Stellen S1, S4, S5, S8, S10, S11).",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 11,
      "words": 8570,
      "min": 61
     },
     "prod2": {
      "stage": "rueckmeldung",
      "zustand": "wartet auf Coach",
      "version": 1,
      "feedback": [],
      "verlauf": [
       {
        "datum": "",
        "typ": "mail",
        "nr": "E1",
        "text": "ZIP an Amir Mustafic verschickt"
       }
      ]
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/WiG8VvKrs8NeD29Ygco4Vv"
      },
      {
       "label": "Workbook S-Weg",
       "url": "https://claude.ai/code/artifact/74072864-ed3b-4b9e-84a0-3e5740b4554e"
      },
      {
       "label": "To-dos S-Weg",
       "url": "https://claude.ai/code/artifact/3e0f18c8-cabe-4e5b-93d6-3b02c1a39119"
      },
      {
       "label": "Zusammenfassung S-Weg",
       "url": "https://claude.ai/code/artifact/9da2c1d7-7903-43f3-921b-f95885e00203"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "lf": 7,
     "rw": "V6",
     "note": "GF1–GF7 freigegeben (06.10.), Abschlussprüfung V6 bestanden. Workbook, To-dos und Zusammenfassung angelegt (06.10.). Fehlt: Freigabe Edis (Flyer-Geschichte GF4).",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 7,
      "words": 4961,
      "min": 35
     },
     "prod2": {
      "stage": "rueckmeldung",
      "zustand": "wartet auf Coach",
      "version": 1,
      "feedback": [],
      "verlauf": [
       {
        "datum": "",
        "typ": "mail",
        "nr": "E1",
        "text": "ZIP an Amir Mustafic verschickt"
       }
      ]
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/1AfcZwfcNZnp6WYUEM16qG"
      },
      {
       "label": "Workbook GF-Weg",
       "url": "https://claude.ai/code/artifact/1d6e473d-16b0-431b-b152-7da9cbdbb642"
      },
      {
       "label": "To-dos GF-Weg",
       "url": "https://claude.ai/code/artifact/73b182b8-e052-4997-9176-2a8a01292904"
      },
      {
       "label": "Zusammenfassung GF-Weg",
       "url": "https://claude.ai/code/artifact/c5f2ffb4-fba4-4bb5-9934-dbc5eb873a71"
      }
     ]
    },
    "U": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "lf": 3,
     "rw": "V6",
     "note": "U1–U3 freigegeben (06.10.), U3 = Abschluss über alle Ebenen. Abschlussprüfung V6 bestanden. Workbook, To-dos und Zusammenfassung angelegt (06.10.). Fehlt: Freigabe Edis (Edis-Geschichte U2). Modul gesamt 21 Lektionen, ca. 113 min.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 3,
      "words": 2322,
      "min": 17
     },
     "prod2": {
      "stage": "rueckmeldung",
      "zustand": "wartet auf Coach",
      "version": 1,
      "feedback": [],
      "verlauf": [
       {
        "datum": "",
        "typ": "mail",
        "nr": "E1",
        "text": "ZIP an Amir Mustafic verschickt"
       }
      ]
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/AMq1P2Laa88v571HwvRrbE"
      },
      {
       "label": "Workbook U-Weg",
       "url": "https://claude.ai/code/artifact/cea4abb7-8eb7-4777-b004-4f429ca11062"
      },
      {
       "label": "To-dos U-Weg",
       "url": "https://claude.ai/code/artifact/b05f9fb1-8fd5-47dd-bec2-d424381dda73"
      },
      {
       "label": "Zusammenfassung U-Weg",
       "url": "https://claude.ai/code/artifact/2738708c-c4c5-4487-8c69-f52965fb6d51"
      }
     ]
    }
   }
  },
  {
   "nr": "35+36",
   "name": "Positionierung",
   "title": "Raus vom Wühltisch",
   "slogan": "Nicht besser. Anders.",
   "bereich": "Wirbelsäule",
   "coach": "Dino Sejdinovic",
   "src": "Linke + rechte Positionierung zusammengeführt, Aufbau als Pyramide (ICH-Dreieck als Boden). Türöffner/Info-/Nagelprodukt → Produktpalette/EVE/Angebotsmagie",
   "faden": "abgenommen",
   "bereichHinweis": "Vorschlag: In der Liste stehen Linke/Rechte POS als Einzelmodule. Da „falsche Positionierung“ KLIM-Schmerzpunkt Nr. 1 ist und alles darauf aufbaut, hier als Wirbelsäule eingeordnet – bitte bestätigen.",
   "etisch": {
    "status": "freigegeben",
    "url": "https://claude.ai/artifact/U5j1uxer7pgBHvPRrDCE7E",
    "stand": "09.10.",
    "note": "Freigegeben 09.10. Offen für später: Beweise mit Zahlen, Teilnehmerstimme."
   },
   "video0": {
    "status": "offen"
   },
   "webinar": {
    "status": "geplant",
    "stand": "10.10.",
    "note": "Offenes Webinar für Neukunden (Nicht-Kunden), Thema Preiskampf / Raus vom Wühltisch, ca. 45 Min., führt zum kostenlosen Betriebs-Check. Für zahlende Kunden bleibt der Stammtisch."
   },
   "zip": {
    "name": "Raus vom Wuehltisch (Positionierung) - Paket zur Pruefung 2026-10-07.zip",
    "stand": "07.10.",
    "coach": "Dino Sejdinovic"
   },
   "prod": {
    "logo": {
     "status": "Idee",
     "url": "https://claude.ai/artifact/AdQpbZqznmveVVJwaxihmv",
     "note": "Idee/Vorschlag 07.10. (Board „Jedes Modul seine eigene Farbwelt“): Weinrot und Creme: ein Paket hebt sich leuchtend vom Wühltisch ab. Noch offen: Modulname in die Kachel (Regeln Buchcover), Freigabe."
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach + Edis-Einspieler",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 11.2,
    "einspielerAnzahl": 7
   },
   "docs": [
    {
     "label": "Rechte Positionierung – Lektion 9 (überarbeitet)",
     "url": "https://claude.ai/artifact/XTgoMt2mDpFGL2keRaJXVF",
     "typ": "arbeit"
    }
   ],
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen"
     ],
     "ls": 18,
     "lf": 11,
     "rw": "V7",
     "note": "15.10.: Übergang zum Avatar: Der Rückweg steht jetzt dreimal im Text – L8 kündigt ihn an, L9 nennt den Positionssatz einen Arbeitsstand, der nach dem Avatar mit Kundenworten geschärft wird, L11 verabschiedet mit dem Rückweg. PDF neu. · 15.10.: Lektor-Checkliste und Ebenen-Bewertung durchlaufen (Prüfbericht und Änderungsprotokoll im Doc, Änderungen gelb): Aufgaben eine Frage pro Absatz, KI-Muster abgebaut, L1 gekürzt, Vogelperspektive in L2/L7/L10. Workbook und EDI entstehen aus dem Sprechtext. PDF neu. · 15.10.: Neufassung mit Skill „klim-sprechtexte“ freigegeben – 11 Lektionen statt 15 (Pyramide in vier Ebenen, Figur Jana mit Blumenladen und Vitrine als roter Faden, Leitgeschichten Geige in der U-Bahn und Flohmarkt-Dinge, Slogan „Nicht besser. Anders.“), ca. 120 Min. Tiefe zum Kunden → Avatar (Nachtrag-Liste im Fahrplan), Nagel-Entwurf → Produktpalette. KLIM-PDF angehängt. Offen: Workbook auf 11 Lektionen anpassen, alten Reiter als ersetzt markieren, Coach-Paket (ZIP) neu bauen. · Alte Fassung: S1–S14 (15 Videos) nach Regelwerk V7. Freigabe Edis 07.10.: Sprechtexte (S1 heißt jetzt „Das Angebot, das keiner verstand“), Workbook, Zusammenfassung und To-dos. Offen: Begrüßung S1 Platzhalter (Coach), Zustimmung Coach. Abschlussprüfung 07.10.: S1 mit „Darum geht es in diesem Modul“ ergänzt (V7), Verweise S3/S14 nachgeschärft. Entscheidung 07.10.: „fünf Gespräche“ (S10, U5) bleibt. · 10.10.: Lektion 14 „Nutzen der Positionierung formulieren“ (rechte Positionierung, war nirgendwo eingebaut) in S12 eingearbeitet: Nutzen und Nutzen des Nutzens, Verdichten in drei Stufen (ausführlich – ein Satz – wenige Worte), Überschrift und Kurzbeschreibung, Fehler „klug klingen wollen“, nicht zurückrudern. Aufgabe und Workbook S12 ergänzt. Wiederholung im ganzen Betrieb bleibt Hauptstelle GF4, Dranbleiben trotz Zweifel S13. Ergänzung von Edis freigegeben 10.10.",
     "coach": "Dino Sejdinovic",
     "lektor": "15.10.",
     "sprech": {
      "lessons": 11,
      "words": 16743,
      "min": 120
     },
     "docs": [
      {
       "label": "Sprechtexte S-Weg (Doc, Reiter 2 = Neufassung 15.10.)",
       "url": "https://claude.ai/code/artifact/8c29a19f-ac89-41ff-ad94-a76107f31e3f",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook S-Weg",
       "url": "https://claude.ai/code/artifact/05290de0-8747-4388-8ecd-f940c71241ae",
       "typ": "workbook"
      },
      {
       "label": "To-dos S-Weg",
       "url": "https://claude.ai/code/artifact/724db64d-09a3-4fa9-94a8-c6781b692c2b",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung S-Weg",
       "url": "https://claude.ai/code/artifact/724db64d-09a3-4fa9-94a8-c6781b692c2b",
       "typ": "zusammenfassung"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen"
     ],
     "ls": 20,
     "lf": 4,
     "rw": "V7",
     "note": "GF1–GF4 nach Regelwerk V7. Freigabe Edis 07.10.: Sprechtexte (GF1 Zurückerklären und GF4 Teamverteilung als Ergänzung für den GF-Weg), Workbook, Zusammenfassung und To-dos. Offen: Zustimmung Coach.",
     "coach": "Dino Sejdinovic",
     "sprech": {
      "lessons": 4,
      "words": 5669,
      "min": 40
     },
     "docs": [
      {
       "label": "Sprechtexte GF-Weg (GF1–GF4)",
       "url": "https://claude.ai/code/artifact/debfd1d8-9c35-48e6-b737-2395219c6135",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook GF-Weg",
       "url": "https://claude.ai/code/artifact/dda88733-1e4b-4b42-9881-7069da7804ac",
       "typ": "workbook"
      },
      {
       "label": "To-dos GF-Weg",
       "url": "https://claude.ai/code/artifact/12619e47-2dc9-4d46-b021-7d59db806247",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung GF-Weg",
       "url": "https://claude.ai/code/artifact/12619e47-2dc9-4d46-b021-7d59db806247",
       "typ": "zusammenfassung"
      }
     ]
    },
    "U": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "zur Abnahme",
      "zur Abnahme",
      "offen"
     ],
     "lf": 5,
     "rw": "V7",
     "note": "U1–U5 nach Regelwerk V7, Entscheidungen Edis 07.10. eingearbeitet (U3 „Vier Buchstaben“ bleibt hier, U4 Aufgabe aus Leitfragen, Ergänzungen für den U-Weg in U3/U5). U5 = Modulabschluss mit Upsell auf „Die Treppe zum großen Ja“. Workbook, Zusammenfassung und To-dos angeglichen 07.10. – zur Freigabe. · 10.10.: aus dem Mindset-Board ergänzt und freigegeben – U2 blauer Ozean (Ergebnis mit Zeitraum, benanntes System, Verbindungssatz), U3 Kultur „vom Angebot zur Bewegung“.",
     "coach": "Dino Sejdinovic",
     "sprech": {
      "lessons": 5,
      "words": 7246,
      "min": 52
     },
     "docs": [
      {
       "label": "Sprechtexte U-Weg (U1–U5)",
       "url": "https://claude.ai/code/artifact/b8321129-4f7f-49f4-9312-3569022fc964",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook U-Weg",
       "url": "https://claude.ai/code/artifact/ee8d59a2-ddef-4270-9897-6a779e679134",
       "typ": "workbook"
      },
      {
       "label": "To-dos U-Weg",
       "url": "https://claude.ai/code/artifact/9e796c8e-0433-436b-bed7-e15a88591929",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung U-Weg",
       "url": "https://claude.ai/code/artifact/9e796c8e-0433-436b-bed7-e15a88591929",
       "typ": "zusammenfassung"
      }
     ]
    }
   }
  },
  {
   "nr": "40",
   "name": "Produktpalette",
   "title": "Die Treppe zum großen Ja",
   "slogan": "Ein Weg statt eines Sprungs.",
   "bereich": "Wirbelsäule",
   "coach": "Dino Sejdinovic",
   "src": "Grundlage: geschriebene Fassung „Die Treppe zum großen Ja“ (Produktpalette + EVE, Regelwerk V4, Edis-Entscheidungen 03.10.; Board „KLIM Produktpalette“, alle 112 Schritte zugeordnet) · seit 06.10. ohne EVE: S1–S17, GF2–GF6, U1–U5 + U7 bleiben hier; S18–S20, GF1, GF7–GF11, U6 gehen an die EVE · EVE-Fassung der EINEN Dienstleistung (Dialog-Methodik) bleibt im Workbook S3–S5, S17, GF5 · 1-zu-9 + Teile aus „Wachstum mit System“ in U4/U5 · Entscheidungstisch → Angebotsmagie · L/XL/XXL, Wiederkehr → EVE",
   "faden": "offen",
   "etisch": {
    "status": "freigegeben",
    "url": "https://claude.ai/artifact/XquZNS4bayjfgXkkCa3FVt",
    "stand": "09.10.",
    "note": "Freigegeben 09.10. Offen für später: Beweise mit Zahlen, Teilnehmerstimme."
   },
   "video0": {
    "status": "offen"
   },
   "zip": {
    "name": "Die Treppe zum grossen Ja (Produktpalette) - Paket zur Pruefung 2026-10-10.zip",
    "stand": "10.10.",
    "coach": "Dino Sejdinovic"
   },
   "prod": {
    "logo": {
     "status": "Idee",
     "url": "https://claude.ai/artifact/AdQpbZqznmveVVJwaxihmv",
     "note": "Idee/Vorschlag 07.10. (Board „Jedes Modul seine eigene Farbwelt“): Morgenrot: helle Stufen zur offenen Tür mit warmem Licht. Noch offen: Modulname in die Kachel (Regeln Buchcover), Freigabe."
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach + Edis-Einspieler",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 8.7,
    "einspielerAnzahl": 7
   },
   "docs": [
    {
     "label": "Umsetzungsplan (Vorschlag)",
     "url": "https://claude.ai/code/artifact/80c2dfdd-9d89-469d-ad7c-0e95b821b55b",
     "typ": "arbeit"
    }
   ],
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen"
     ],
     "ls": 15,
     "lf": 15,
     "rw": "1.2",
     "note": "15.10.: S-Weg Neufassung FREIGEGEBEN (15 Lektionen, Reiter „S-Weg Neufassung 15.10.“). Übergang zur EVE am Ende von L15 („Wie es weitergeht“: Tobias fragt, wie viele der 22 vom Winter-Check oben ankommen – die EVE: fünf Regler wie ein Mischpult, am Anfang die ersten beiden – mehr Menschen zur Treppe, mehr Ja – „Die Treppe hast du gebaut. In der EVE bringst du Menschen darauf.“). Lektor-Checkliste inkl. KI-Phrasen über alle 15 Lektionen durchgeführt (Note 9/10). PDF mit Flipchart-Tafeln und Gesamtbild angehängt (84 S., ca. 139 Min.). Gesamtbild: Leuchtturm, Bucht mit Anker, Steg, Treppe am Hügel, Haus auf der Insel. Als Nächstes: Entscheidungstisch. Zweites Bild neben der Treppe: Bucht, Anker, Steg, Insel (L10, L14, L15). Geschichten mit wechselnden Einstiegen (L6 jetzt Oetker-Rezept auf der Backpulvertüte statt Michelin). Figur Tobias mit Fahrradwerkstatt, Leitgeschichte Elisha Otis und der sichere Aufzug (keiner traut der Bremse, bis er 1854 vor Publikum das Seil mit der Axt kappen lässt), Flipchart: die Treppe wächst. Kollegin heißt Nora. · Alt: Freigabe Edis 07.10.; S17 am 08.10. ergänzt (EINES Produkt: Ding oder Dienstleistung, Beispiele Handwerk/Planer). Offen: Zustimmung Coach. S14: zwei Sätze zum Vertragsfall noch Platzhalter.",
     "coach": "Dino Sejdinovic",
     "lektor": "15.10.",
     "sprech": {
      "lessons": 15,
      "words": 19390,
      "min": 139
     },
     "docs": [
      {
       "label": "Sprechtexte S-Weg (Neufassung, 15 Lektionen)",
       "url": "https://claude.ai/code/artifact/d5d172f0-89d8-43bd-8be9-78111b40521c",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook S-Weg (alt, wird neu erstellt)",
       "url": "https://claude.ai/code/artifact/469a834e-4fa1-45f2-901f-65edf028514b",
       "typ": "workbook"
      },
      {
       "label": "To-dos S-Weg",
       "url": "https://claude.ai/code/artifact/cae57bdd-0ace-4c68-8175-fd00d85296cd",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung S-Weg",
       "url": "https://claude.ai/code/artifact/cae57bdd-0ace-4c68-8175-fd00d85296cd",
       "typ": "zusammenfassung"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen"
     ],
     "ls": 5,
     "lf": 5,
     "rw": "V7",
     "note": "Freigabe Edis 07.10. Offen: Zustimmung Coach (Coach-Paket).",
     "coach": "Dino Sejdinovic",
     "sprech": {
      "lessons": 5,
      "words": 5213,
      "min": 37
     },
     "docs": [
      {
       "label": "Sprechtexte GF-Weg (GF1–GF5)",
       "url": "https://claude.ai/code/artifact/ad97fc18-55d5-437a-9817-01382386c722",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook GF-Weg",
       "url": "https://claude.ai/code/artifact/3e54c776-2b57-4111-af0b-1996572f4f38",
       "typ": "workbook"
      },
      {
       "label": "To-dos GF-Weg",
       "url": "https://claude.ai/code/artifact/02c23739-4fd5-4a08-b404-60c55965231e",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung GF-Weg",
       "url": "https://claude.ai/code/artifact/02c23739-4fd5-4a08-b404-60c55965231e",
       "typ": "zusammenfassung"
      }
     ]
    },
    "U": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen"
     ],
     "ls": 11,
     "lf": 11,
     "rw": "V7",
     "note": "U1–U11 freigegeben (10.10.), inkl. neuer Lektionen U6–U10 „92 Stunden Produktzeit“; Workbook, Zusammenfassung und To-dos ergänzt. Offen: Zustimmung Coach.",
     "coach": "Dino Sejdinovic",
     "sprech": {
      "lessons": 11,
      "words": 8864,
      "min": 63
     },
     "docs": [
      {
       "label": "Sprechtexte U-Weg (U1–U6)",
       "url": "https://claude.ai/code/artifact/e70fdeb4-afc8-40cf-8f11-11b4b2f4f110",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook U-Weg",
       "url": "https://claude.ai/code/artifact/75aa6b28-ad2b-448b-9c07-a4cd750b9090",
       "typ": "workbook"
      },
      {
       "label": "To-dos U-Weg",
       "url": "https://claude.ai/code/artifact/ab04ee18-a67f-46f5-a151-eb76b9a3b39a",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung U-Weg",
       "url": "https://claude.ai/code/artifact/ab04ee18-a67f-46f5-a151-eb76b9a3b39a",
       "typ": "zusammenfassung"
      }
     ]
    }
   }
  },
  {
   "nr": "12",
   "name": "EVE",
   "title": "Das Mischpult deines Vertriebs",
   "slogan": "Fünf Regler statt mehr Lautstärke.",
   "bereich": "Wirbelsäule",
   "coach": "Dino Sejdinovic",
   "src": "Board „KLIM EVE“ · 06.10. von der Produktpalette getrennt, folgt im KLIM-Weg direkt nach ihr · Grundlage: EVE-Teil der früheren „Treppe zum großen Ja“ (Regelwerk V4, Edis-Entscheidungen 03.10.): S18–S20, GF1, GF7–GF11, U6 = 10 Lektionen, ca. 102 Min. · „Brücke der Wandlung“ heißt „Das Gespräch in drei Fragen“ · Türöffner = leichter Schritt nach dem Info-Produkt, nicht der erste Kontakt · Raus an Hauptstellen: Nagel 1+2, Info-Produkt, EINE Dienstleistung → Produktpalette (EVE-Fassung der EINEN DL: Dialog-Methodik ins Produktpalette-Workbook, „kaufbar statt perfekt“/Selbstvertrauen in S-Weg) · „Sofort mehr Umsatz ohne neue Kunden“ (EVE-250–256) bleibt in der EVE als GF6 – in den freigegebenen Angebotsmagie-Texten nicht enthalten, Angebotsmagie bekommt nur Verweis (Entscheidung 07.10.) · Zielgruppenkompetenz → Avatar · „Wenn dein Betrieb nicht mehr an dir hängt“ → Betriebssystem · Bauplan der vier Ebenen → Innerer Bauplan · Regelwerk V7, durchgehendes Beispiel Wohnungssanierung, keine Showroom-Szenen (07.10.) · Aufbau-Vorschlag S 3 / GF 7 / U 2 (U2 = Abschluss über alle Ebenen) · Name/Slogan und Aufbau S 3 / GF 7 / U 2 freigegeben 07.10. · Geschichten: Claude wählt aus dem Archiv oder erfindet (Edis gelb) · geprüft 07.10.: „Wenn dein Betrieb nicht mehr an dir hängt“ (EVE-319–332) steht vollständig im Betriebssystem (S2, S3, S6, GF11, U1, U2, U4, U8); Küchen-Bild dort Hauptstelle (U2 „Die zweite Küche“), Ausfall-Test dort (S2, U1) → EVE U1 ohne Küche, nur Verweis; Boot-Geschichte dort nicht verwendet → EVE U1 · Abschlussprüfung 07.10.: Board vollständig abgedeckt, Aufgaben nur aus dem Board, 7 Schlüsselmomente in Jetzt-Zeit, Brücken ok; nachgebessert: alle 12 Spiegel auf höchstens 8 Sätze gekürzt, Einwand-Einleitung in 5 Lektionen variiert · Nachträge für andere Module (Produktpalette, Angebotsmagie, Abo, VIM, Positionierung, Nagelprodukt, Anker, Handschlag, Betriebssystem, Finanzen): https://claude.ai/artifact/C9iqZrxPd6kz91KjiwTBgT",
   "faden": "abgenommen",
   "etisch": {
    "status": "freigegeben",
    "url": "https://claude.ai/artifact/5aLZ2wdQVMQgJoSDo1EpQp",
    "stand": "09.10.",
    "note": "Freigegeben 09.10. Offen für später: Beweise mit Zahlen, Teilnehmerstimme."
   },
   "video0": {
    "status": "in Arbeit",
    "url": "https://claude.ai/artifact/E5JFRLSyrZatgPJpq1KhG1"
   },
   "zip": {
    "name": "Das Mischpult deines Vertriebs (EVE) - Paket zur Pruefung 2026-10-08.zip",
    "stand": "08.10.",
    "coach": "Dino Sejdinovic"
   },
   "prod": {
    "logo": {
     "status": "Idee",
     "url": "https://claude.ai/artifact/AdQpbZqznmveVVJwaxihmv",
     "note": "Idee/Vorschlag 07.10. (Board „Jedes Modul seine eigene Farbwelt“): Aubergine und Pink: Mischpult mit fünf leuchtenden Reglern. Noch offen: Modulname in die Kachel (Regeln Buchcover), Freigabe."
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach + Edis-Einspieler",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 10.3,
    "einspielerAnzahl": 7
   },
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "in Arbeit",
      "offen"
     ],
     "ls": 12,
     "lf": 3,
     "rw": "V7",
     "note": "16.10.: Neufassung S-Weg begonnen – 12 Lektionen, Reiter „S-Weg Neufassung 16.10.“, Figur Mira (Goldschmiedin), Leitgeschichte Brian Epstein und die Beatles, Abschluss der Kette ohne Ausblick nach außen; L1–L3 geschrieben, zur Freigabe. Bisher: S1–S3 nach Regelwerk V7 freigegeben (07.10.): Edis-Geschichte S1 („Zu allem Ja gesagt“) und Aufgaben bestätigt. Begrüßung S1 Platzhalter (Coach offen). Workbook/To-dos/Zusammenfassung freigegeben (07.10.). Roter-Faden-Prüfung 07.10.: S1 Modul-Einleitung ergänzt. Bitte von Edis gegenlesen. · 08.10.: To-dos und Zusammenfassung als eigene Docs angelegt (Inhalt unverändert), Coach-Paket neu (Version 2).",
     "coach": "Dino Sejdinovic",
     "sprech": {
      "lessons": 3,
      "words": 3557,
      "min": 25
     },
     "docs": [
      {
       "label": "Sprechtexte S-Weg",
       "url": "https://claude.ai/artifact/TYVbKvcWcJ3dRcUyFN6sX3",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook S-Weg (enthält auch To-dos und Zusammenfassung)",
       "url": "https://claude.ai/artifact/7yEvZktcS2nwGzoEkBnqFF",
       "typ": "workbook"
      },
      {
       "label": "To-dos S-Weg",
       "url": "https://claude.ai/code/artifact/bc79027c-0a35-47b3-8790-0f0eceb8d4b4",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung S-Weg",
       "url": "https://claude.ai/code/artifact/45335d1f-a9ef-4e05-85b2-100711ff3c36",
       "typ": "zusammenfassung"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "in Arbeit",
      "offen"
     ],
     "ls": 7,
     "lf": 7,
     "rw": "V7",
     "note": "GF1–GF7 nach Regelwerk V7 freigegeben (07.10.). Edis gelb in GF1, GF2, GF5, GF6. GF7 „Zwei Taxis“ statt Regentonne. Workbook/To-dos/Zusammenfassung freigegeben (07.10.); GF6 neu aus EVE-250–256. · 08.10.: To-dos und Zusammenfassung als eigene Docs angelegt (Inhalt unverändert), Coach-Paket neu (Version 2).",
     "coach": "Dino Sejdinovic",
     "sprech": {
      "lessons": 7,
      "words": 7648,
      "min": 55
     },
     "docs": [
      {
       "label": "Sprechtexte GF-Weg",
       "url": "https://claude.ai/artifact/FeT7bEXCFRfAUGHsiKaP1r",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook GF-Weg (enthält auch To-dos und Zusammenfassung)",
       "url": "https://claude.ai/artifact/EEwyJMFVvi9hf6f3TEpbqo",
       "typ": "workbook"
      },
      {
       "label": "To-dos GF-Weg",
       "url": "https://claude.ai/code/artifact/d67c2a68-489d-44c3-a368-b0748b654ac3",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung GF-Weg",
       "url": "https://claude.ai/code/artifact/b070fc70-0f69-479a-b0ca-81dde7a199d2",
       "typ": "zusammenfassung"
      }
     ]
    },
    "U": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "in Arbeit",
      "offen"
     ],
     "ls": 2,
     "lf": 2,
     "rw": "V7",
     "note": "U1–U2 nach Regelwerk V7 freigegeben (07.10.). U1 Boot-Geschichte (gelb), kein Küchen-Bild. U2 Abschluss über alle Ebenen, verstärkt. Workbook/To-dos/Zusammenfassung freigegeben (07.10.). Roter-Faden-Prüfung 07.10.: U2 Leitplanke und Abschluss des Moduls mit Empfehlung ergänzt. Bitte von Edis gegenlesen. · 08.10.: To-dos und Zusammenfassung als eigene Docs angelegt (Inhalt unverändert), Coach-Paket neu (Version 2).",
     "coach": "Dino Sejdinovic",
     "sprech": {
      "lessons": 2,
      "words": 2150,
      "min": 15
     },
     "docs": [
      {
       "label": "Sprechtexte U-Weg",
       "url": "https://claude.ai/artifact/2pU7TobmzpDBQecGsxQF3h",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook U-Weg (enthält auch To-dos und Zusammenfassung)",
       "url": "https://claude.ai/artifact/MPwLQDsVuawXmbRAftddFK",
       "typ": "workbook"
      },
      {
       "label": "To-dos U-Weg",
       "url": "https://claude.ai/code/artifact/cf8ce07a-dbbd-488f-ac66-a3b999e394a6",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung U-Weg",
       "url": "https://claude.ai/code/artifact/e33d43d2-6cbf-4f32-9509-9e68a7def1e2",
       "typ": "zusammenfassung"
      }
     ]
    }
   }
  },
  {
   "nr": "14",
   "name": "Systeme",
   "title": "Das Rezeptbuch deines Betriebs",
   "slogan": "Rezept statt Zuruf.",
   "bereich": "Wirbelsäule",
   "coach": "Simon Maugg",
   "src": "Ursprungsmodul „Das Betriebssystem deines Unternehmens“ · „Wachstum mit System“ aufgelöst: Name wird U-Weg; Skalieren, Faktor X, Wachstumsfallen und „Vom Unternehmer zur Organisation“ bleiben hier; übrige Teile an Hauptstellen (Produktpalette, Angebotsmagie, Finanzen, Bauplan) · + Bauplan-Lektion 13 (Stellenbeschreibung) · + EVE „Wenn dein Betrieb nicht mehr an dir hängt“",
   "faden": "offen",
   "etisch": {
    "status": "freigegeben",
    "url": "https://claude.ai/artifact/24G3M2mjrJLTMe5J2u7Myw",
    "stand": "09.10.",
    "note": "Freigegeben 09.10. Offen für später: Beweise mit Zahlen, Teilnehmerstimme."
   },
   "video0": {
    "status": "offen"
   },
   "webinar": {
    "status": "geplant",
    "stand": "10.10.",
    "note": "Offenes Webinar für Neukunden (Nicht-Kunden), ca. 45 Min., führt zum kostenlosen Betriebs-Check. Titelidee: „Urlaub ohne Anrufe – wie dein Betrieb eine Woche ohne dich läuft.“ Nicht über Systeme reden, sondern über den Urlaub. Aha-Übung: einen Ablauf aufschreiben, den heute nur du kannst. Abgrenzung zum Zeit-Webinar: Zeit = deine Woche und dein Kopf, Systeme = Abläufe, die ohne dich laufen. Für zahlende Kunden bleibt der Stammtisch."
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Edis komplett",
    "edis0": true,
    "hinweis": "Seine Lebensgeschichte ist das Modulthema. S-, GF- und U-Weg freigegeben, Abschluss-Lektion geschrieben (08.10.).",
    "einspielerMin": 0,
    "einspielerAnzahl": 1
   },
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen",
      "offen"
     ],
     "ls": 10,
     "lf": 10,
     "rw": "V7",
     "note": "Sprechtexte S1–S10 freigegeben (08.10.). Regelwerk-Prüfung V7 bestanden (08.10.): Spiegel auf max. 8 Sätze gekürzt, S1 ergänzt (Betrieb, der auf den Punkt liefert). Fehlt: Workbook, Freigabe Edis (gelbe Stellen S1, S5, S8, S10). · 10.10.: Slogan geändert auf „Rezept statt Zuruf.“ · 10.10.: DTK → SOV umgestellt (S10 „Standardisieren ist der Anfang“, Hinweise, Brückenkarte), freigegeben 10.10.",
     "coach": "Simon Maugg",
     "sprech": {
      "lessons": 10,
      "words": 6987,
      "min": 50
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/HitPJhsmfoWvXsHVHRrp9s",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook S-Weg",
       "url": "https://claude.ai/artifact/KnKQefoNbQxwTSS1aYkFX5",
       "typ": "workbook"
      },
      {
       "label": "To-dos S-Weg",
       "url": "https://claude.ai/artifact/H4Ms9SKWmHeaKRA4zSFPVP",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung S-Weg",
       "url": "https://claude.ai/artifact/YFCGtPsbDDfonWsD1EioJR",
       "typ": "zusammenfassung"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen",
      "offen"
     ],
     "ls": 8,
     "lf": 8,
     "rw": "V7",
     "note": "Sprechtexte GF1–GF8 freigegeben (08.10.). Regelwerk-Prüfung V7 bestanden (08.10.): Spiegel gekürzt, GF6 Reihenfolge ohne Organigramm (Vorausverweis U-Weg). Fehlt: Workbook inkl. Excel-Vorlage Aufgabentabelle, Freigabe Edis (gelbe Stellen GF1, GF7, GF8). · 10.10.: Slogan geändert auf „Rezept statt Zuruf.“ · 10.10.: DTK → SOV (Standardisieren – Onboarden – Verifizieren) in L6–L8, Workbook und Zusammenfassung umgestellt, freigegeben 10.10.",
     "coach": "Simon Maugg",
     "sprech": {
      "lessons": 8,
      "words": 6190,
      "min": 44
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/7YsFstjbBa9wyeVEgXmNrX",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook GF-Weg",
       "url": "https://claude.ai/artifact/QP4nUbYeLKAwPK2qqk37Mq",
       "typ": "workbook"
      },
      {
       "label": "To-dos GF-Weg",
       "url": "https://claude.ai/artifact/8VWzwtoS6J5jHRBDjWGzQX",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung GF-Weg",
       "url": "https://claude.ai/artifact/KYy3MbVdkvob8iZphzdbKn",
       "typ": "zusammenfassung"
      }
     ]
    },
    "U": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen",
      "offen"
     ],
     "ls": 11,
     "lf": 11,
     "rw": "V7",
     "note": "Name: Wachstum mit System. Sprechtexte U1–U11 freigegeben (08.10.). Regelwerk-Prüfung V7 bestanden (08.10.): Spiegel gekürzt, Aufgaben in U9 und U11 entschlackt – Einzelschritte (fünf Strategien, zehn Lügen, Leitfragen) gehören ins Workbook. Fehlt: Workbook, Freigabe Edis (gelbe Stellen U1, U2, U4, U8, U11). · 10.10.: aus dem Mindset-Board ergänzt und freigegeben – U5 Schlüsselpositionen mit Stellvertretern, U7 Zahlen-Rhythmus, U10 Profitcenter. Slogan geändert auf „Rezept statt Zuruf.“ (alle Wege). · 10.10.: Workbook, To-dos und Zusammenfassung U-Weg um Schlüsselpositionen, Zahlen-Rhythmus und Profitcenter ergänzt; Slogan in allen Begleit-Docs und im Entscheidungstisch angeglichen.",
     "coach": "Simon Maugg",
     "sprech": {
      "lessons": 11,
      "words": 8994,
      "min": 64
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/SKFQt7gVSwN9VBQ4yRh2jZ",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook U-Weg",
       "url": "https://claude.ai/artifact/Xp6Y4kEPzJYGyiJ5UjR7cc",
       "typ": "workbook"
      },
      {
       "label": "To-dos U-Weg",
       "url": "https://claude.ai/artifact/5EMrTmAyuqSAAvNKHzvAYi",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung U-Weg",
       "url": "https://claude.ai/artifact/JVGpUofDDQh8e3CtbaRktu",
       "typ": "zusammenfassung"
      }
     ]
    },
    "ALL": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen",
      "offen"
     ],
     "ls": 1,
     "lf": 1,
     "rw": "V7",
     "note": "Abschluss-Lektion „Den Kochlöffel abgeben, ohne die Küche zu verlieren“ freigegeben (08.10.), mit „Abschluss des Moduls“ und Upsell. Regelwerk-Prüfung V7 bestanden. Fehlt: Freigabe Edis (gelb: Feuerwehr-Abschluss). · 10.10.: Slogan geändert auf „Rezept statt Zuruf.“",
     "coach": "Simon Maugg",
     "sprech": {
      "lessons": 1,
      "words": 950,
      "min": 7
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/DL8WRW4anFZ1B3mJzzGjkb",
       "typ": "sprechtexte"
      }
     ]
    }
   }
  },
  {
   "nr": "13",
   "name": "Finanzen",
   "title": "Der Eimer mit dem Loch",
   "slogan": "Jeder Euro braucht einen Platz.",
   "bereich": "Wirbelsäule",
   "coach": "Johannes Steiger",
   "src": "Finanzmodul · Erweiterung · Bonus + Geld-Teile aus Wachstum mit System (R4/R5) · „Echtes Vermögen“ wird eigenes Modul · Verschoben: Cash-Aktion → Angebotsmagie, faule Äpfel → Mitarbeiter/Leader, Positionieren → Positionierung, Exit → Bauplan U16–18 (siehe „KLIM Finanzen – Nachträge für andere Module“) · Vorlagen: KLIM_Liquiditaetstabelle.xlsx, KLIM_Rechnungstabelle.xlsx, KLIM_Projekttabelle.xlsx (neu 06.10.)",
   "faden": "abgenommen",
   "etisch": {
    "status": "freigegeben",
    "url": "https://claude.ai/artifact/TagSkNxpAtiUGMfRLynmsK",
    "stand": "09.10.",
    "note": "Freigegeben 09.10. Offen für später: Teilnehmerstimme, fachliche Prüfung Steuerberater."
   },
   "video0": {
    "status": "offen"
   },
   "zip": {
    "name": "Der Eimer mit dem Loch (Finanzen) - Paket zur Pruefung 2026-10-10.zip",
    "stand": "10.10.",
    "coach": "Johannes Steiger"
   },
   "prod": {
    "logo": {
     "status": "Idee",
     "url": "https://claude.ai/artifact/AdQpbZqznmveVVJwaxihmv",
     "note": "Idee/Vorschlag 07.10. (Board „Jedes Modul seine eigene Farbwelt“): Tannengrün und Gold: Eimer voll Gold, das unten heraustropft. Noch offen: Modulname in die Kachel (Regeln Buchcover), Freigabe."
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach + Edis-Einspieler",
    "edis0": true,
    "hinweis": "Coach Johannes Steiger (07.10.) – 14 Edis-Geschichten als Einspieler.",
    "einspielerMin": 24.3,
    "einspielerAnzahl": 14
   },
   "docs": [
    {
     "label": "Tabellen: Rechnungs-, Liquiditäts- & Projekttabelle",
     "url": "https://claude.ai/artifact/MhreHFe6TrhJqdjqBiDFGS",
     "typ": "tabellen"
    }
   ],
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "ls": 14,
     "lf": 13,
     "rw": "V6",
     "note": "S1–S13 freigegeben (05.10.), Abschlussprüfung V6 bestanden (05.10.), Workbook fertig (Liquiditäts- und Rechnungstabelle). Fehlt: Freigabe Edis (laut lesen/gegenlesen). · Nachbesserung Paket 1 (06.10., nach Modulbewertung): Umsatzsteuer S6, Unternehmerlohn S8/S9, Begriffe Fixkosten/Gewinn, Dreifach-Regel am Beispiel (S9, GF5), Kriegskasse S5/U4, Projekttabelle als Excel-Vorlage (GF7/GF8/GF14). Paket 2 (Kürzen auf ca. 6 Std.) offen. · Entscheidungen Edis 06.10.: Minibagger 60 €/Std. ohne Fahrer (340 Std. Laufzeit; GF6, GF7, GF8, GF10 und Projekttabelle neu gerechnet: Dachgeschoss 37.991,40 € netto, DB2 7.895 → 4.945 €, 50,38 €/m³), Ampel Grün ab 15 % Rendite / Gelb 0–15 % / Rot unter 0 (GF8, U3), S9 Bad-Zielpreis 12.400 € ergänzt, Unternehmerlohn bleibt. Nächster Schritt: To-dos, Zusammenfassungen, Prüfbogen und ZIP für den Wirtschaftsprüfer (Coach). · 08.10. Mindset-Abgleich: S-Weg bleibt unverändert (Mindset GF5 ist GF-Ebene, S-Teilnehmer kennen es nicht).",
     "coach": "Johannes Steiger",
     "sprech": {
      "lessons": 13,
      "words": 17034,
      "min": 122
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/1YdNaJFe7B214eXeDFLmmF",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook S-Weg",
       "url": "https://claude.ai/artifact/91NnfmJPPU4wWc9tctbUkA",
       "typ": "workbook"
      },
      {
       "label": "To-dos S-Weg",
       "url": "https://claude.ai/code/artifact/eaa4fa87-4f89-4c3b-b9e4-73b2b0edb864",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung S-Weg",
       "url": "https://claude.ai/code/artifact/512d9830-6dce-41d9-a990-56466e997992",
       "typ": "zusammenfassung"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "ls": 57,
     "lf": 18,
     "rw": "V6",
     "note": "GF1–GF18 freigegeben (05.10.), Abschlussprüfung V6 bestanden (05.10.), Workbook fertig. Fehlt: Freigabe Edis. · Nachbesserung Paket 1 (06.10., nach Modulbewertung): Umsatzsteuer S6, Unternehmerlohn S8/S9, Begriffe Fixkosten/Gewinn, Dreifach-Regel am Beispiel (S9, GF5), Kriegskasse S5/U4, Projekttabelle als Excel-Vorlage (GF7/GF8/GF14). Paket 2 (Kürzen auf ca. 6 Std.) offen. · Entscheidungen Edis 06.10.: Minibagger 60 €/Std. ohne Fahrer (340 Std. Laufzeit; GF6, GF7, GF8, GF10 und Projekttabelle neu gerechnet: Dachgeschoss 37.991,40 € netto, DB2 7.895 → 4.945 €, 50,38 €/m³), Ampel Grün ab 15 % Rendite / Gelb 0–15 % / Rot unter 0 (GF8, U3), S9 Bad-Zielpreis 12.400 € ergänzt, Unternehmerlohn bleibt. Nächster Schritt: To-dos, Zusammenfassungen, Prüfbogen und ZIP für den Wirtschaftsprüfer (Coach). · 08.10. Mindset-Abgleich (Mindset GF5 „Der Steuerberater ist nicht dein Steuermann“): GF1 Hauptgeschichte jetzt die Arzt-Geschichte (Basis Video 2, nicht gelb), Edis-Teil gekürzt in „Hier dreht sich alles“, Haltung nur als Rückanker, Technik bleibt; GF13 neuer Spiegel, Rückanker Steuermann/vier Zahlen/„Wie lange reicht mein Geld?“, Aufgabe führt die Mindset-Liste weiter; GF7 Rückanker „Gewinn ist eine Entscheidung“. Änderungen GF1, GF7, GF13 freigegeben (08.10.), ZIP neu gebaut (Stand 08.10.).",
     "coach": "Johannes Steiger",
     "sprech": {
      "lessons": 18,
      "words": 24388,
      "min": 174
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/22Cj2J5m1ifMmiuk824gqd",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook GF-Weg",
       "url": "https://claude.ai/artifact/6NqrsJ2PZ5nKLCz2FW1T1Y",
       "typ": "workbook"
      },
      {
       "label": "To-dos GF-Weg",
       "url": "https://claude.ai/code/artifact/dbba7e79-0115-477c-834e-476873601fea",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung GF-Weg",
       "url": "https://claude.ai/code/artifact/a465dd3a-cc54-4889-83a4-82cb3adf106f",
       "typ": "zusammenfassung"
      }
     ]
    },
    "U": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "ls": 6,
     "lf": 12,
     "rw": "V6",
     "note": "U1–U12 freigegeben (05.10.), U12 = Abschluss über alle Ebenen. Immobilien-Beispiel: eigenes Einfamilienhaus. Abschlussprüfung V6 bestanden (05.10.), Workbook fertig. Fehlt: Freigabe Edis. · Nachbesserung Paket 1 (06.10., nach Modulbewertung): Umsatzsteuer S6, Unternehmerlohn S8/S9, Begriffe Fixkosten/Gewinn, Dreifach-Regel am Beispiel (S9, GF5), Kriegskasse S5/U4, Projekttabelle als Excel-Vorlage (GF7/GF8/GF14). Paket 2 (Kürzen auf ca. 6 Std.) offen. · Entscheidungen Edis 06.10.: Minibagger 60 €/Std. ohne Fahrer (340 Std. Laufzeit; GF6, GF7, GF8, GF10 und Projekttabelle neu gerechnet: Dachgeschoss 37.991,40 € netto, DB2 7.895 → 4.945 €, 50,38 €/m³), Ampel Grün ab 15 % Rendite / Gelb 0–15 % / Rot unter 0 (GF8, U3), S9 Bad-Zielpreis 12.400 € ergänzt, Unternehmerlohn bleibt. Nächster Schritt: To-dos, Zusammenfassungen, Prüfbogen und ZIP für den Wirtschaftsprüfer (Coach). · 08.10. Mindset-Abgleich: keine Änderung nötig. · 10.10.: CFO-Lektion aus „Ein Team aufbauen, das mitdenkt“ als U4 „Die Stimme der Zahlen“ und U5 „Der Bautagesbericht für dein Geld“ eingebaut (bisher U4–U12 jetzt U6–U14); Workbook, To-dos und Zusammenfassung U ergänzt; GF1-Verweis repariert. U4/U5 freigegeben 10.10.",
     "coach": "Johannes Steiger",
     "sprech": {
      "lessons": 14,
      "words": 20643,
      "min": 146
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/QLmP1UGXmgDKXUav9oTndu",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook U-Weg",
       "url": "https://claude.ai/artifact/Uhq75Pr4NJM35Mv5NQwPfD",
       "typ": "workbook"
      },
      {
       "label": "To-dos U-Weg",
       "url": "https://claude.ai/code/artifact/3a6fc9b2-c3c6-46cd-aa78-af16c1228dc2",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung U-Weg",
       "url": "https://claude.ai/code/artifact/46906b20-ecd2-4ba2-9662-d45402e4d8d4",
       "typ": "zusammenfassung"
      }
     ]
    }
   }
  },
  {
   "nr": "13",
   "name": "Echtes Vermögen",
   "title": "Vom Wasserträger zum Brunnenbauer",
   "slogan": "Ein Teil gehört immer dir.",
   "bereich": "KLIM-Weg",
   "coach": "Johannes Steiger",
   "src": "Board „Echtes Vermögen“ (12 Rahmen, 105 Schritte und 12 Abschlüsse) · aus dem Finanzen-Paket herausgelöst · + „Wachstum mit System“ ID 56, 58 · R3+R6 und R9+R11 zusammengeführt · Leidenschaft → Kompass, Positionierung → Positionierung, ID 57 → Leadership (Gedanke kurz in GF1), Investor-Ebene → Mindset R29 (siehe „KLIM Echtes Vermögen – Nachträge für andere Module“) · GF-Weg mit 1 Lektion ergänzt (06.10.)",
   "faden": "abgenommen",
   "bereichHinweis": "Vorschlag: gehört zum Finanzen-Paket (Wirbelsäule). Falls es ein freigeschaltetes Zusatzmodul sein soll, auf KLIM-Weg umstellen – bitte bestätigen.",
   "etisch": {
    "status": "Entwurf",
    "url": "https://claude.ai/artifact/AMc2cemnYeK1nUkgPumP2e",
    "stand": "09.10.",
    "note": "Zur Freigabe durch Edis. Offen: konkreter Moment für die Heldengeschichte, eigene Zahlen, Teilnehmerstimme."
   },
   "video0": {
    "status": "offen"
   },
   "zip": {
    "name": "Vom Wassertraeger zum Brunnenbauer (Echtes Vermoegen) - Paket zur Pruefung 2026-10-08.zip",
    "stand": "08.10.",
    "coach": "Johannes Steiger"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach + Edis-Einspieler",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 2,
    "einspielerAnzahl": 1
   },
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "ls": 12,
     "lf": 12,
     "rw": "V6",
     "note": "S1–S12 freigegeben (05.10.), ca. 124 Min. Abschlussprüfung V6 bestanden (05.10.), Workbook fertig. Fehlt: Freigabe Edis (laut lesen/gegenlesen). · 06.10.: Ausblick S12 zeigt jetzt auf GF- und U-Weg (blau), Lektionsübersicht GF im S-Doc. · 06.10.: To-dos und Zusammenfassung angelegt (zur Freigabe).",
     "coach": "Johannes Steiger",
     "sprech": {
      "lessons": 12,
      "words": 17282,
      "min": 123
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/3LdwkVnKJT6h8FfAb8kqfg"
      },
      {
       "label": "Workbook S-Weg",
       "url": "https://claude.ai/artifact/JPGsMYppMzkiWmUh8PLSrE",
       "typ": "workbook"
      },
      {
       "label": "To-dos S-Weg",
       "url": "https://claude.ai/code/artifact/a832467c-034c-4f90-abda-d344353ebced",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung S-Weg",
       "url": "https://claude.ai/code/artifact/d4782e99-29a2-4b4c-a894-1cff65161182",
       "typ": "zusammenfassung"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "lf": 1,
     "rw": "V7",
     "note": "GF1 „Mehr Wasser, mehr Krüge“ von Edis freigegeben (06.10.), Abschlussprüfung V7 bestanden (Feinschliff eingearbeitet). Lohnstufe und Speicherstufe am selben Tag, Lohn wächst nur mit der Rolle (Aufgabe aus Finanzmodul ID 171 + Echtes Vermögen ID 44). Brücken blau. Workbook GF-Weg fertig. Fehlt: Freigabe Edis (laut lesen), Zustimmung Coach. · 06.10.: To-dos und Zusammenfassung angelegt (zur Freigabe).",
     "coach": "Johannes Steiger",
     "sprech": {
      "lessons": 1,
      "words": 1510,
      "min": 11
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/B42sTxeM2627dkaUZTPiLL"
      },
      {
       "label": "Workbook GF-Weg",
       "url": "https://claude.ai/artifact/VWHKT1CMoXvbGYk8g2wfgC",
       "typ": "workbook"
      },
      {
       "label": "To-dos GF-Weg",
       "url": "https://claude.ai/code/artifact/5dafade4-4e5f-4bb7-9ad7-6c76106ae2c0",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung GF-Weg",
       "url": "https://claude.ai/code/artifact/0b1626b4-c618-4bb9-b4f9-bc924958b6a3",
       "typ": "zusammenfassung"
      }
     ]
    },
    "U": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "ls": 3,
     "lf": 3,
     "rw": "V6",
     "note": "U1–U3 freigegeben (05.10.), U3 = Abschluss über alle Ebenen, Aufgabe aus Mindset ID 270. Ca. 33 Min. Abschlussprüfung V6 bestanden (05.10.), Workbook fertig. Fehlt: Freigabe Edis. · 06.10.: Rückblick U1 und „Dein ganzer Weg“ U3 um den GF-Weg ergänzt (blau, drei Wege, 16 Lektionen). · 06.10.: To-dos und Zusammenfassung angelegt (zur Freigabe).",
     "coach": "Johannes Steiger",
     "sprech": {
      "lessons": 3,
      "words": 4653,
      "min": 33
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/MpZkrdPjqsuCeLiijg8z86"
      },
      {
       "label": "Workbook U-Weg",
       "url": "https://claude.ai/artifact/D16HqZKNft217v2GG1VGDa",
       "typ": "workbook"
      },
      {
       "label": "To-dos U-Weg",
       "url": "https://claude.ai/code/artifact/a6eccf94-e9eb-4492-a170-e3ee22dc6f6b",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung U-Weg",
       "url": "https://claude.ai/code/artifact/21c54dad-fc22-4f78-b9c4-9f1e0cf2ac14",
       "typ": "zusammenfassung"
      }
     ]
    }
   }
  },
  {
   "nr": "11",
   "name": "Zeit",
   "title": "Vom Hamsterrad zur Wendeltreppe",
   "slogan": "Jede Runde eine Stufe höher.",
   "bereich": "KLIM-Weg",
   "coach": "Edis (vorläufig)",
   "src": "Die Ordnung der Zeit + Kalender-Teile aus dem Mindset (Lektion 11, Lektion 7 Schritt 3). 21 Videos, Sprechzeit ≈ 2 Std. 21 Min. (S1 ohne Begrüßung).",
   "faden": "abgenommen",
   "etisch": {
    "status": "Entwurf",
    "url": "https://claude.ai/artifact/Wy7evKpFvZE5XSqDWqVce9",
    "stand": "09.10.",
    "note": "Zur Freigabe durch Edis. Offen: Zahlen, Teilnehmerstimme, Wendepunkt in S1 angleichen?"
   },
   "video0": {
    "status": "offen"
   },
   "webinar": {
    "status": "geplant",
    "stand": "10.10.",
    "note": "Offenes Webinar für Neukunden (Nicht-Kunden), ca. 45 Min., führt zum kostenlosen Betriebs-Check. Thema 60 Stunden die Woche und trotzdem nicht fertig. Kann direkt zum Zeit-Produkt mit Logbuch führen. Für zahlende Kunden bleibt der Stammtisch."
   },
   "zip": {
    "name": "Vom Hamsterrad zur Wendeltreppe (Zeit) - Paket zur Pruefung 2026-10-08.zip",
    "stand": "08.10.",
    "coach": "Edis (vorläufig)"
   },
   "prod": {
    "logo": {
     "status": "Idee",
     "url": "https://claude.ai/artifact/AdQpbZqznmveVVJwaxihmv",
     "note": "Idee/Vorschlag 07.10. (Board „Jedes Modul seine eigene Farbwelt“): Nachtblau und Flieder: vom Hamsterrad zur Wendeltreppe ins Licht. Noch offen: Modulname in die Kachel (Regeln Buchcover), Freigabe."
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach + Edis-Einspieler",
    "edis0": true,
    "hinweis": "Coach Katrin Sesselmann (08.10.) leitet den Stammtisch. Vorschlag 08.10.: Edis spricht die Videos – 12 von 21 Lektionen tragen eine persönliche Edis-Geschichte; ganzes Modul ca. 2 Std. 06 Min. Info-Produkt-Idee noch nicht freigegeben.",
    "einspielerMin": 9.3,
    "einspielerAnzahl": 6
   },
   "docs": [
    {
     "label": "Das Logbuch – Workbook & Planbuch (Entwurf 1)",
     "url": "https://claude.ai/artifact/AcRQWzS85vEMZijXnH3JEm",
     "typ": "workbook"
    }
   ],
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "in Arbeit",
      "offen",
      "offen"
     ],
     "ls": 12,
     "lf": 10,
     "rw": "V7",
     "note": "S1–S10 auf Regelwerk V7 nachgezogen (07.10., zur Freigabe): Leitplanke nach jeder Aufgabe, S1 „Darum geht es in diesem Modul“ mit Warum-Frage, Brücken und Modul-Verweise blau und spannend, Limbi als KLIM-Bild, S6 Warum Dankbarkeit, S10 Akku-Bild, Wochenrückblick, Ausblick. S1 jetzt 10 Min. Sprecher: Edis selbst (08.10.). Offen: Workbook pro Weg, Freigabe Edis. Entscheidungen 08.10.: 7-7-7-Atmung in S6 (kurzer Satz), S1 bleibt lang, Modulname „Erst du, dann dein Team“ bestätigt, GF5-Logbuch passt. 08.10.: Workbook S-Weg als Entwurf angelegt (Warum-Seite, S1–S10 mit Beispiel Thomas Huber, Störungsregel, Atemübung, Wochenrückblick lassen/schützen/verstärken, vier Abschlussfragen + 30-Tage-Messpunkt) – zur Freigabe. · 10.10.: S7 um Abschnitt „Warum gerade ein Block: der Flow“ ergänzt (Fremdtranskript zum Buch „Flow“, auf KLIM umgeschrieben), Rückanker in S8; dabei „Erinnere dich“/„Stell dir … vor“ in S7 und S8 ersetzt. Danach alle übrigen 17 „Stell dir … vor“ im S-Weg (S1–S10, auch in einer Aufgabe nur sprachlich) umformuliert. Freigabe Edis für den Nachtrag offen. 12.10.: Zusammenfassung und To-dos angelegt, Paket (ZIP) zur Prüfung erstellt.",
     "coach": "Edis (vorläufig)",
     "sprech": {
      "lessons": 10,
      "words": 10229,
      "min": 73
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/HPL5XSn5LyZURgBHAXSQ77",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook S-Weg (Entwurf, Beispiel Thomas Huber)",
       "url": "https://claude.ai/artifact/JPubQapo7fxL37FJ1VrCj3",
       "typ": "workbook"
      },
      {
       "label": "Flow – bereinigtes Transkript + Einbau-Vorschlag",
       "url": "https://claude.ai/code/artifact/40f68efc-b16e-481f-8189-4edaeaf71dd7",
       "typ": "arbeit"
      },
      {
       "label": "Zusammenfassung und To-dos",
       "url": "https://claude.ai/artifact/1BoGvUA23M9QQmHZRxXGES",
       "typ": "zusammenfassung"
      },
      {
       "label": "To-dos (im selben Doc)",
       "url": "https://claude.ai/artifact/1BoGvUA23M9QQmHZRxXGES",
       "typ": "todos"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "in Arbeit",
      "offen",
      "offen"
     ],
     "lf": 7,
     "rw": "V7",
     "note": "GF1–GF7 auf Regelwerk V7 nachgezogen (zur Freigabe): Leitplanken, Begrüßung Simon mit Übergabe von Edis und Rückblick in GF1, Brücken blau, Betriebstakt GF4, GF5 an Logbuch (Woche pro Doppelseite) angepasst, Ausblick GF7. Edis-Einspieler GF2, GF5, GF6. Offen: Workbook GF, Freigabe Edis. 12.10.: Zusammenfassung und To-dos angelegt, Paket (ZIP) zur Prüfung erstellt.",
     "coach": "Edis (vorläufig)",
     "sprech": {
      "lessons": 7,
      "words": 6120,
      "min": 44
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/W1rcTTgvTETs5ddqQQzJiF",
       "typ": "sprechtexte"
      },
      {
       "label": "Zusammenfassung und To-dos",
       "url": "https://claude.ai/code/artifact/a0e82c03-8160-41ab-92f6-dbec1b4cf571",
       "typ": "zusammenfassung"
      },
      {
       "label": "To-dos (im selben Doc)",
       "url": "https://claude.ai/code/artifact/a0e82c03-8160-41ab-92f6-dbec1b4cf571",
       "typ": "todos"
      }
     ]
    },
    "U": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "in Arbeit",
      "offen",
      "offen"
     ],
     "lf": 4,
     "rw": "V7",
     "note": "U1–U4 auf Regelwerk V7 nachgezogen (08.10., zur Freigabe): Leitplanken, Rückblick auf GF in U1, Betriebssystem-Verweis U2 spannend, U4 mit „Abschluss des Moduls“ und Empfehlung (Betriebssystem, Zwei Hände reichen nicht, Innerer Bauplan). Edis-Einspieler U1, U3, U4. Offen: Workbook U, Freigabe Edis. 12.10.: Zusammenfassung und To-dos angelegt, Paket (ZIP) zur Prüfung erstellt.",
     "coach": "Edis (vorläufig)",
     "sprech": {
      "lessons": 4,
      "words": 3499,
      "min": 25
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/YSX7sP6heqzhxyrjnZisCb",
       "typ": "sprechtexte"
      },
      {
       "label": "Zusammenfassung und To-dos",
       "url": "https://claude.ai/code/artifact/f34f91e9-4bfe-46b9-995a-5e2b247577df",
       "typ": "zusammenfassung"
      },
      {
       "label": "To-dos (im selben Doc)",
       "url": "https://claude.ai/code/artifact/f34f91e9-4bfe-46b9-995a-5e2b247577df",
       "typ": "todos"
      }
     ]
    }
   }
  },
  {
   "nr": "3",
   "name": "Leadership + Leadership 2",
   "title": "Erst du, dann dein Team",
   "slogan": "Erst du. Dann dein Team.",
   "bereich": "Wirbelsäule",
   "coach": "Simon Maugg",
   "src": "Zusammengeführt: „Der Leader in dir“ (Inhalt) + „Leadership 2“ (Namen, Startsignal) · Gültige Fassung S 19 / GF 12 / U 5 Videos (Entscheidung Edis 05.10.) · Video 12: Sympathie, Knappheit, Autorität, soziale Bewährtheit → Verkauf (siehe Nachträge) · Leadership 2 ist hier aufgegangen (07.10.): Board aus 27 Seminar-Mitschriften, 21 Lektionen – übernommen wurden Namen, Begriff „Startsignal“, „Wofür“ als S2 und 11 Betriebsszenen; Board-Übungen ohne Grundlage in den 25 Videos sind weggelassen. Die Leadership-2-Dokumente bleiben als Archiv (Links im S-Weg).",
   "faden": "offen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach + Edis-Einspieler",
    "edis0": true,
    "hinweis": "Sprechtexte nicht auf der Tafel verlinkt – Einspieler-Liste folgt, sobald verlinkt.",
    "einspielerMin": 0,
    "einspielerAnzahl": 0
   },
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "fertig",
      "offen"
     ],
     "ls": 12,
     "lf": 19,
     "rw": "V6",
     "note": "08.10.: Freigegeben (Edis): Abgrenzung zum Mindset GF4 „Vom Retter zum Chef“ eingebaut: S2, S12 (Thermostat bleibt Hauptstelle), S13 (Einspieler-Geschichte Leader Video 24 ersetzt durch Gleichnis „Der Mann für die Nebenrolle“) mit blauem Rückanker, Technik vertieft. Nachbessern nach Regelwerk V7 ergänzt: Leitplanke bei jeder Aufgabe, „Darum geht es in diesem Modul“ in S1, Brückenkarte und Brücken blau. · Aus Leadership 2 hier gelandet: L1 Grundlagen der Führung → S1 · L11 Wofür du führst → S2 · L2 Nachhaltige Veränderung → S3 (Zustand) und S15 (Zukunftsbild) · L10 Körper als Startknopf → S4 T1/T2 · L5 Pfad der Bedeutung → S5 T1/T2 · L13 Hebel → S6 (an dir) · L15 Alte Muster unterbrechen → S7 · L16 Neue Bedeutung → S8 (an dir) · L18 Stärkende Ressourcen → S9 · L6 Startsignale → S10 · L19 Festigen und prüfen → S11 T1/T2 · L9 Selbstbild → S12, S13 · L8 Stimme → S14 T1/T2 · L20 Maßnahmenplan → S15. · Gültig ist die zusammengeführte Fassung (Entscheidung Edis, 05.10.): S 19 Videos (S1–S15, teils zweiteilig), ca. 170 Min. Begrüßung S1 eingesetzt. Ältere Fassung aus dem Leadership-Chat (25 Videos) ist Archiv. Weiterarbeit nur im Leadership-Chat. Fehlt: Workbook, Freigabe Edis. · 10.10.: Dopplungen mit Mindset/Kompass aufgelöst: Trampelpfad in S9/S11 nur noch kurzer Rückgriff (Hauptstelle Mindset S L2), Retter-Geschichte in S12 durch Rückgriff auf Kompass L11 ersetzt (Hauptstellen Mindset GF L2 + Kompass L11), Thermostat bleibt gewollter Rückanker. Rückgriffe kursiv. Sprechzeit neu gezählt. (erledigt, siehe 10.10. (2)) · 10.10. (2): Neue Hauptgeschichten aus dem Story-Archiv: S11 T1 „Warum du trotz Wissen noch nicht umsetzt“ (Edis, gelb), S12 Eselsbrücke „Der Thermostat und das Thermometer“. S9 und S11 T2 weiter nur Rückgriff (keine unbenutzte Archiv-Geschichte; Feuerwehr ist im Rezeptbuch belegt). Alle Brücken kursiv statt gelb. Freigegeben (Edis) 10.10.: Ich-Geschichte S11 T1; S9 und S11 T2 bleiben mit Rückgriff ohne eigene Hauptgeschichte. · 10.10.: Freigabe Edis (Schritt 10) erteilt. · 10.10. (3): Schritt 8 geprüft und fertig: alle Aufgaben gegen „Der Leader in dir“ abgeglichen; erfundene Zeit-/Reihenfolge-Vorschläge gestrichen (S2, S12, S13, S14 T2, S15), Herkunft S11 T1 korrigiert. Workbook/To-dos dazu nachziehen. Offen (Edis): „Aufgabe offen“ in S1 Einstieg und S15 Punkt 3.",
     "coach": "Simon Maugg",
     "ziel": "8–11 Min. pro Video",
     "sprech": {
      "lessons": 19,
      "words": 24425,
      "min": 174
     },
     "docs": [
      {
       "label": "Videotexte S-Weg (gültige Fassung)",
       "url": "https://claude.ai/code/artifact/4861b5f4-9f9f-46d8-9a19-e6d1ae0fb88c"
      },
      {
       "label": "Nachträge für andere Module",
       "url": "https://claude.ai/code/artifact/bd35cfeb-f623-4b21-9678-089a43d171b1"
      },
      {
       "label": "Board Leadership 2 (Lucid)",
       "url": "https://lucid.app/lucidchart/cc42a0c0-e596-499f-9ec5-05d242378afb/edit"
      },
      {
       "label": "Workbook S-Weg",
       "url": "https://claude.ai/artifact/XFPx1tm6yGBfkR8zkFmTSA",
       "typ": "workbook"
      },
      {
       "label": "Archiv Leadership 2: Board-Text (Fertigstellung)",
       "url": "https://claude.ai/artifact/WfCGeWT1TuSr7snJ6Qs7PW",
       "typ": "arbeit"
      },
      {
       "label": "Archiv Leadership 2: Videotexte S",
       "url": "https://claude.ai/code/artifact/db1dc122-55ab-4fca-be5b-60cf42d46de8",
       "typ": "arbeit"
      },
      {
       "label": "Archiv Leadership 2: Videotexte GF",
       "url": "https://claude.ai/code/artifact/63de0cd3-79f8-45dc-a398-6e3d67195096",
       "typ": "arbeit"
      },
      {
       "label": "Archiv Leadership 2: Arbeitsdokument",
       "url": "https://claude.ai/code/artifact/f02e3ac9-d973-46e5-a3a0-7e80c2586511",
       "typ": "arbeit"
      },
      {
       "label": "Workbook S-Weg (Claude Doc, passt Satz für Satz zu den Videotexten)",
       "url": "https://claude.ai/code/artifact/f4f4b712-259c-49c3-8e1b-f0eb7cedaebb",
       "typ": "workbook"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "fertig",
      "offen"
     ],
     "ls": 10,
     "lf": 13,
     "rw": "V6",
     "note": "08.10.: Freigegeben (Edis): Abgrenzung zum Mindset GF4 eingebaut: GF1 (Szene „zu spät entschieden“ raus, Vorbild-Technik vertieft), GF4 (Engpass/Gegenfragen als Rückanker, vier Fragearten vertieft), GF6, GF10 (Aufgabe baut auf Mindset auf). Nachbessern nach V7 ergänzt: Leitplanken, Rückblick nach Begrüßung in GF1, Brücken blau. · Aus Leadership 2 hier gelandet: L1 Grundlagen (Menschen führen) → GF1 · L9 (glauben, befähigen, wertschätzen) → GF1 · L2 + L3 + L5 (Bedürfnisse, Verbindung) → GF2, GF3 · L14 Fragen → GF4 · L4 Veränderung wirksam gestalten + L13 Hebel (im Gespräch) + L21 Meisterschritte sicher anwenden → GF5 T1/T2, GF6 · L7 Zustimmungsrahmen → GF7 T1 · L16 Rahmen setzen und Körpersprache → GF7 T2, GF8 · L12 Sieben Wege Ja (Gegenseitigkeit, Zugehörigkeit, Verbindlichkeit) → GF9, Rest → Verkauf · L17 Team nach oben → GF10. · Gültig: zusammengeführte Fassung, GF 12 Videos, ca. 106 Min. Fehlt: Workbook, Freigabe Edis. · 10.10.: Neue Lektion GF7 (Teil 3) „Den Streit gewinnen, die Baustelle verlieren“ geschrieben (aus Fremdtranskript, auf KLIM umgeschrieben; Recht oder Ergebnis, Konsequenzfrage, Klärungsgespräch statt Schweigen; ca. 1.160 Wörter ≈ 8,3 Min.). Freigegeben 10.10. und eingebaut: Haupt-Doc (zwischen GF7 Teil 2 und GF8, Vorausverweis blau), Workbook-Seite, Satz im Rückblick GF10. GF jetzt 13 Videos. Regelwerk-Prüfung V7 für GF7 (Teil 3) bestanden (Fünf Elemente nachgebessert, jetzt ca. 1.220 Wörter ≈ 8,7 Min.). To-dos und Zusammenfassung GF-Weg (13 Lektionen) neu angelegt. Offen: Freigabe Edis. · 10.10.: „Waldweg“ in GF1/GF6 an aufgelösten Trampelpfad angepasst. Sprechzeit neu gezählt. · 10.10. (2): Alle Brücken kursiv statt gelb (gelb nur Edis). · 10.10.: Freigabe Edis (Schritt 10) erteilt. · 10.10. (3): Schritt 8 geprüft und fertig: alle Aufgaben stimmen mit dem Original; GF7 T3 Quelle Fremdtranskript (freigegeben) vermerkt. Offen (Edis): „Aufgabe offen“ im Rückblick GF10.",
     "coach": "Simon Maugg",
     "ziel": "8–11 Min. pro Video",
     "sprech": {
      "lessons": 13,
      "words": 17144,
      "min": 122
     },
     "docs": [
      {
       "label": "Videotexte GF-Weg (gültige Fassung)",
       "url": "https://claude.ai/code/artifact/bee55656-2df6-479e-b79f-ca41530c2332"
      },
      {
       "label": "Nachträge für andere Module",
       "url": "https://claude.ai/code/artifact/bd35cfeb-f623-4b21-9678-089a43d171b1"
      },
      {
       "label": "Board Leadership 2 (Lucid)",
       "url": "https://lucid.app/lucidchart/cc42a0c0-e596-499f-9ec5-05d242378afb/edit"
      },
      {
       "label": "Workbook GF-Weg",
       "url": "https://claude.ai/artifact/19tASKdPMjeef3wM8Wxrs6",
       "typ": "workbook"
      },
      {
       "label": "Workbook GF-Weg (Claude Doc, passt Satz für Satz zu den Videotexten)",
       "url": "https://claude.ai/code/artifact/013d7af4-89d4-4476-b39c-717159fece05",
       "typ": "workbook"
      },
      {
       "label": "Nachtrag GF7 (Teil 3) – Den Streit gewinnen, die Baustelle verlieren (freigegeben, eingebaut)",
       "url": "https://claude.ai/code/artifact/b7de304b-b5e9-4885-8012-0be96e6f8119",
       "typ": "arbeit"
      },
      {
       "label": "To-dos GF-Weg",
       "url": "https://claude.ai/code/artifact/8148c9f0-7865-4296-9567-bc5f7e45de6b",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung GF-Weg",
       "url": "https://claude.ai/code/artifact/542f2635-f6c7-490a-afae-b840011299c8",
       "typ": "zusammenfassung"
      }
     ]
    },
    "U": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "fertig",
      "offen"
     ],
     "ls": 3,
     "lf": 5,
     "rw": "V6",
     "note": "08.10.: Freigegeben (Edis): Abgrenzung zum Mindset GF4 eingebaut: U1, U5 (Rückanker). Nachbessern nach V7 ergänzt: Leitplanken, Rückblick in U1, „Abschluss des Moduls“ mit Upsell in U5, Brücken blau. · Aus Leadership 2 hier gelandet: L17 Ein Team, das sich gegenseitig nach oben zieht → U1, U2, U3, U5 · L5 Pfad der Bedeutung (Reifegrade) + L6 gemeinsame Startsignale + L19 Rituale → U4. · Gültig: zusammengeführte Fassung, U 5 Videos (U1 Der falsche Ton darf hörbar sein · U2 Die Druckprobe · U3 Wer mit auf dem Gerüst steht · U4 Der Ruf vor dem Spiel · U5 Erst tief, dann breit). Ergänzt 05.10.: U1 „Was du duldest, wird Kultur“, U5 „Wen du entwickelst“ (Nachträge Finanzen/Echtes Vermögen). Sprechzeit wird neu gezählt. Fehlt: Workbook, Freigabe Edis. · 10.10.: Dopplung aufgelöst: Wachstums-Einspieler + Boot Kroatien in U5 durch kurzen Rückgriff auf Mindset U L2 ersetzt (dort Hauptstelle). Sprechzeit neu gezählt. (erledigt, siehe 10.10. (2)) · 10.10. (2): U5 neue Hauptgeschichte „Was von Führung bleibt“ (Edis, Chef 2002, gelb). Alle Brücken kursiv statt gelb. Freigegeben (Edis) 10.10.: Edis-Geschichte U5. · 10.10.: Freigabe Edis (Schritt 10) erteilt. · 10.10. (3): Schritt 8 geprüft und fertig: erfundenes Beispiel in U4 und Zeitvorgabe in U5 gestrichen. Workbook/To-dos dazu nachziehen. Offen (Edis): „Aufgabe offen“ im Modul-Rückblick U5.",
     "coach": "Simon Maugg",
     "ziel": "8–11 Min. pro Video",
     "sprech": {
      "lessons": 5,
      "words": 6872,
      "min": 49
     },
     "docs": [
      {
       "label": "Videotexte U-Weg (gültige Fassung)",
       "url": "https://claude.ai/code/artifact/4fd8d26e-c2a2-4a51-94e3-f295b5e205a1"
      },
      {
       "label": "Nachträge für andere Module",
       "url": "https://claude.ai/code/artifact/bd35cfeb-f623-4b21-9678-089a43d171b1"
      },
      {
       "label": "Board Leadership 2 (Lucid)",
       "url": "https://lucid.app/lucidchart/cc42a0c0-e596-499f-9ec5-05d242378afb/edit"
      },
      {
       "label": "Workbook U-Weg",
       "url": "https://claude.ai/artifact/9KkWSYKnrJgagnoPjSd9on",
       "typ": "workbook"
      },
      {
       "label": "Workbook U-Weg (Claude Doc, passt Satz für Satz zu den Videotexten)",
       "url": "https://claude.ai/code/artifact/43674f44-fa11-41c7-8c69-88461bb04fa9",
       "typ": "workbook"
      }
     ]
    }
   }
  },
  {
   "nr": "15",
   "name": "Anker",
   "title": "Der Anker, der hält",
   "slogan": "Nicht lauter. Passender.",
   "bereich": "Paket Verkauf",
   "paket": "Paket Verkauf",
   "coach": "Dino Sejdinovic",
   "src": "Anker-Strategie + Erweiterung „Der Anker, der hält“ verschmolzen (Erweiterung liegt seit 08.10. vor: Fassung V3, Menschentypen, Textbausteine, Verkauf × Anker – zusammengeführt) · sechs Anker (5 + Mischanker, festgelegt bei der Positionierung) · Board 7 Videos / 114 Schritte · Excel-L1 Türöffnerprodukt → Produktpalette + EVE · Hauptstellen: Mitgehen/Führen, Einwand-Werkzeuge, Verhandeln → Handschlag; Stimme/Körper/Startsignal → Leadership; innere Stimmen → Licht an; Disziplin/Ausreden → Mindset · Name/Slogan und Sortierung freigegeben 06.10.; 08.10. zusammengeführt: S 21 / GF 6 / U 4 (U-Plan als Vorschlag) · Nach dem Kauf/Abo → „Kunden, die bleiben“",
   "faden": "abgenommen",
   "video0": {
    "status": "in Arbeit",
    "url": "https://claude.ai/artifact/Qw4HjQBoThLFeLB1bp5i3d"
   },
   "zip": {
    "name": "Der Anker, der haelt (Anker) - Paket zur Pruefung 2026-10-08.zip",
    "stand": "08.10.",
    "coach": "Dino Sejdinovic"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach + Edis-Einspieler",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 12.6,
    "einspielerAnzahl": 11
   },
   "docs": [
    {
     "label": "Bestandsaufnahme (Phase 1)",
     "url": "https://claude.ai/artifact/2pVLK7zXh6GvQmCj36NcSk",
     "typ": "arbeit"
    },
    {
     "label": "Sortierung S/GF/U (Phase 2)",
     "url": "https://claude.ai/artifact/WFa4mnARZJ48ajzugykvxW",
     "typ": "arbeit"
    }
   ],
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "zur Abnahme",
      "offen"
     ],
     "ls": 8,
     "lf": 21,
     "rw": "V7",
     "note": "08.10.: Alte Fassung V3 und neue Fassung zusammengeführt (freigegeben). S-Weg jetzt 21 Lektionen: neu S7 „Der Kunde verrät sich in der ersten Nachricht“ (mit Anker-Frage im Formular), S17 „Das Ja ist erst der Anfang“ (BMW-Ingenieur), S18 „Wenn der Kunde strahlt, frag“; Nachricht nach dem Termin jetzt S16. V7-Nacharbeit erledigt: Leitplanke bei jeder Aufgabe, „Darum geht es in diesem Modul“ in S1, kein „Stell dir vor“ als Einstieg, Modul-Verweise spannend. Zur Freigabe: Mischanker-Teile S5/S14, S7/S16 Aufgabe offen (mit Vorschlag), Aufgaben S17/S18 aus Meisterhaft verkaufen (Kundenbindung). Danach Regelwerk-Prüfung (Schritte 5–8) und Workbook. · 08.10. (später): Entscheidungen umgesetzt – S7/S16 Vorschlag als Aufgabe (Freigabe Edis offen), S18 an Weiterempfehlungsprogramm angepasst, Mischanker S5/S14 freigegeben. Regelwerk-Prüfung Schritte 5–8 erledigt: Tage/Uhrzeiten entfernt, Geschichten in S3, S5, S12, S21 im Nutzen wieder aufgegriffen, Brücken max. 2 Sätze. Nächster Schritt: Workbook. · 08.10.: Abschlusspaket fertig (Workbook mit Aufgabe, Leitplanke und Eintrag je Lektion, Anker-Karte, To-dos, Zusammenfassung) – zur Abnahme durch Edis. · 08.10.: Roter Faden geprüft, Coach-Paket (ZIP) erstellt.",
     "coach": "Dino Sejdinovic",
     "sprech": {
      "lessons": 21,
      "words": 14597,
      "min": 104
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/VyLHJjLfjhGgjokZ2qpwfH",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook S-Weg",
       "url": "https://claude.ai/artifact/6wKsKwkCPaSi6rWoo6r7SX",
       "typ": "workbook"
      },
      {
       "label": "To-dos S-Weg",
       "url": "https://claude.ai/artifact/P7kwfDhfbEPMsrqRQv3ShG",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung S-Weg",
       "url": "https://claude.ai/artifact/6VeURf2yAikRw7MRBXrKNY",
       "typ": "zusammenfassung"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "zur Abnahme",
      "offen"
     ],
     "ls": 6,
     "lf": 6,
     "rw": "V7",
     "note": "08.10.: GF-Weg komplett geschrieben (6 Lektionen, freigegeben 08.10.): GF1 Auch dein Team sucht Halt (Begrüßung, Rückblick, „Darum geht es in diesem Weg“, Aufgabe Board V2 S12), GF2 Großzügigkeit braucht einen Rahmen (V3, Edis freigegeben, Aufgabe offen mit Vorschlag), GF3 Der Anker im System (CRM, Formular-Frage, Bausteine – Aufgabe Vorschlag), GF4 Gesprächsleitfaden für alle (Edis: Preisgrenze, Aufgabe Board V7 S10), GF5 Empfehlungen, die nicht vom Zufall leben (Aufgabe Vorschlag), GF6 Wer am Tisch wirklich entscheidet (Aufgabe Board V4 S14, Ausblick U). Reihenfolge GF3/GF4 getauscht, damit die Art der Geschichte wechselt. · 08.10.: Abschlusspaket fertig (Workbook mit Aufgabe, Leitplanke und Eintrag je Lektion, To-dos, Zusammenfassung) – zur Abnahme durch Edis. · 08.10.: Roter Faden geprüft, Coach-Paket (ZIP) erstellt.",
     "coach": "Dino Sejdinovic",
     "sprech": {
      "lessons": 6,
      "words": 4458,
      "min": 32
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/HVT6MH288Ra5wAgP3t6DQg",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook GF-Weg",
       "url": "https://claude.ai/artifact/Q7znCv5UJHovdWbge1evrM",
       "typ": "workbook"
      },
      {
       "label": "To-dos GF-Weg",
       "url": "https://claude.ai/artifact/QvFWYQof9PC3qGz6EX7qip",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung GF-Weg",
       "url": "https://claude.ai/artifact/WAnMyaG5LmPND32VVae3jd",
       "typ": "zusammenfassung"
      }
     ]
    },
    "U": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "zur Abnahme",
      "offen"
     ],
     "ls": 4,
     "lf": 4,
     "rw": "V7",
     "note": "08.10.: U-Weg komplett geschrieben (4 Lektionen, zur Freigabe): U1 Kommunikation ist kein Zufall (Begrüßung, Rückblick GF, „Darum geht es in diesem Weg“, „Was du misst, wächst“ mit Kennzahlen je Anker; Edis: Kontrollbuch; Aufgabe Board V5 S1), U2 Macht, die Verantwortung trägt (Gleichnis Kapitän, Gegensätze als Pole; Aufgabe V5 S15), U3 Die drei Prozent (Schlüsselgespräche; Aufgabe V5 S12), U4 Kein Mensch ist nur ein Anker (Edis: Zustrom neuer Kunden; Aufgabe V4 S20; Abschluss des Moduls mit Upsell Angebotsmagie, Handschlag, Kunden, die bleiben). Alle Aufgaben aus dem Board. · 08.10.: U-Weg freigegeben. Abschlusspaket fertig (Workbook mit Aufgabe, Leitplanke und Eintrag je Lektion, To-dos, Zusammenfassung) – zur Abnahme durch Edis. · 08.10.: Roter Faden geprüft, Coach-Paket (ZIP) erstellt.",
     "coach": "Dino Sejdinovic",
     "sprech": {
      "lessons": 4,
      "words": 2987,
      "min": 21
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/5CAhUqovuVNDajPxB1M7Xb",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook U-Weg",
       "url": "https://claude.ai/artifact/6pPuqTiWwssShVT9cLY538",
       "typ": "workbook"
      },
      {
       "label": "To-dos U-Weg",
       "url": "https://claude.ai/artifact/8SDT7j4VCBstQRU1JX2BuN",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung U-Weg",
       "url": "https://claude.ai/artifact/T5d7CPcs4S3bnU8Nfac1xB",
       "typ": "zusammenfassung"
      }
     ]
    }
   }
  },
  {
   "nr": "5",
   "name": "Verkauf – Angebotsmagie",
   "title": "Die Angebotsmagie",
   "slogan": "Wert zuerst. Preis zuletzt.",
   "bereich": "Paket Verkauf",
   "paket": "Paket Verkauf",
   "coach": "Amir Mustafic",
   "src": "Hauptstelle für Entscheidungstisch (wortgleich auch in Meisterhaft → dort Verweis), „Der Markt wartet nicht“ und „Die unsichtbare Linie“ · Schnellstart-Formel (Text aus dem Bauplan-Board, 20 Schritte) + Pre-Launch/Launch aus Meisterhaft · Preis Teil 1+2 verschmolzen · Kontrast/Garantie aus Meisterhaft · Webinar-Schritt raus · Käuferbrücke → Treppe · „Abschlüsse vor Ort“ bleibt im Abo · „Wenn der Kunde innerlich Ja sagt“ Teil 1+2: Board-Text nachgeliefert (10.10.) → S8, S9, S13–S15, GF4–GF7, U4, U5; Edis-Geschichten → S6, S12; „Preis nicht mehr erklärt“ → S9 (Inhalt) und S11 (Geschichte) · Kontrastprinzip → GF4 · Pre-Launch/Launch/Relaunch heißen Vorfreude / Eröffnung / Wiedereröffnung · Cash-Aktion aus Finanzen („Wachstum mit System“ R4 S15–S24) → GF14–GF15 (Notfall-Block)",
   "faden": "eingebaut – zu prüfen",
   "video0": {
    "status": "offen",
    "note": "Beim Entscheidungstisch nicht das Bild erzählen: Auf Edis' Tisch stehen zwei kleine Schuhe seiner Söhne, die jeder getragen hat; die Schnürsenkel sind mit einem Ring verbunden, der die Schuhe zusammenhält – der Ring seines verstorbenen Vaters."
   },
   "webinar": {
    "status": "geplant",
    "stand": "10.10.",
    "note": "Offenes Webinar für Neukunden (Nicht-Kunden), ca. 45 Min., führt zum kostenlosen Betriebs-Check. Thema: Du schreibst Angebote, und keiner meldet sich. Aha mit Vorher-Nachher-Angebot von Thomas Huber. Für zahlende Kunden bleibt der Stammtisch."
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach + Edis-Einspieler",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 7.7,
    "einspielerAnzahl": 7
   },
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen"
     ],
     "ls": 17,
     "lf": 17,
     "rw": "V7",
     "note": "10.10.: Freigabe Edis erteilt – alle neuen Lektionen, Workbook-Ergänzungen, Leitplanken und der von Claude ergänzte Board-Schritt S3 (Preis) freigegeben. Fehlt nur noch: Zustimmung Coach. · 10.10.: Leitplanken in allen älteren Lektionen nachgetragen (Regelwerk V7 ergänzt) – jetzt hat jede Lektion des Wegs eine; Workbook, To-dos und Zusammenfassung an die korrigierten Aufgaben angeglichen, „Eine Hilfe“ im Workbook bei allen Lektionen. · 10.10.: Regelwerk-Prüfung V7 für alle neuen Lektionen gemacht und direkt korrigiert (fehlende Board-Schritte in Aufgaben ergänzt, Geschichten in der Lehre wieder aufgegriffen, Spiegel gekürzt, Modul-Verweise nach 11.3). · 10.10.: Workbook, To-dos und Zusammenfassung um alle neuen Lektionen ergänzt und neu nummeriert; „Zum Vertiefen“ und „Zum Nachlesen“ der neuen Lektionen aus den Board-Nachträgen (IJ, PE inkl. ergänztem S3) auf die Tiefe der alten Lektionen gebracht – Workbook zur Freigabe. · 10.10. (später): Board-Nachtrag „Wenn dein Preis nicht mehr erklärt werden muss“ eingebaut (S1–S7; S3 fehlte und wurde auf Wunsch von Claude ergänzt: mindestens 20 Gespräche pro Preis, besser 30, Testblatt – zur Freigabe durch Edis): neu S17 Der Markt sagt dir deinen Preis, S10 erweitert (Ausgangslage, Zielbild, Größe des Problems, Stärke des Wunsches) – zur Freigabe. Ausblick auf den GF-Weg von S16 ans Ende von S17 verschoben. · 10.10.: Board-Nachtrag „Wenn der Kunde innerlich Ja sagt“ (Teil 1+2, 21 Schritte) eingebaut: neu S8 Der Mann mit den vielen Stiften, S9 Der Wert, der im Kopf entsteht, S13 Der Kaufmoment, der sich richtig anfühlt, S14 Gekauft wird sowieso, S15 Dein Preis beginnt bei dir (Regelwerk V7 ergänzt, mit Leitplanke) – zur Freigabe. Alte S8–S11 heißen jetzt S10–S12 und S16. Hauptgeschichten S6 und S12 durch Edis-Geschichten aus dem Archiv ersetzt. · S1–S11 freigegeben (05.10.). Workbook folgt später, dann Freigabe Edis. · 10.10.: Hauptgeschichten S6 und S10 durch echte Edis-Geschichten aus dem Archiv ersetzt („Wenn der Kunde innerlich Ja sagt“ Teil 1/2), Sprechzeit neu gezählt – zur Durchsicht. · Abschlusspaket angelegt 07.10. (Workbook aus Board-Schritten, To-dos, Zusammenfassung), zur Freigabe. Danach: Freigabe Edis.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 17,
      "words": 13411,
      "min": 96
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/7bvJaJL7qM8MNzBdx5Q19B"
      },
      {
       "label": "Workbook S-Weg",
       "url": "https://claude.ai/code/artifact/7b37e4b2-46a6-4598-abd0-225c7e09af76",
       "typ": "workbook"
      },
      {
       "label": "To-dos S-Weg",
       "url": "https://claude.ai/code/artifact/e2f62c32-8ca7-4d81-a5e3-8f96abdd875c",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung S-Weg",
       "url": "https://claude.ai/code/artifact/45d7fe08-d2e2-41ab-b57e-8f9ada81a1f7",
       "typ": "zusammenfassung"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen"
     ],
     "ls": 17,
     "lf": 17,
     "rw": "V7",
     "note": "10.10.: Freigabe Edis erteilt – alle neuen Lektionen, Workbook-Ergänzungen, Leitplanken und der von Claude ergänzte Board-Schritt S3 (Preis) freigegeben. Fehlt nur noch: Zustimmung Coach. · 10.10.: Leitplanken in allen älteren Lektionen nachgetragen (Regelwerk V7 ergänzt) – jetzt hat jede Lektion des Wegs eine; Workbook, To-dos und Zusammenfassung an die korrigierten Aufgaben angeglichen, „Eine Hilfe“ im Workbook bei allen Lektionen. · 10.10.: Regelwerk-Prüfung V7 für alle neuen Lektionen gemacht und direkt korrigiert (fehlende Board-Schritte in Aufgaben ergänzt, Geschichten in der Lehre wieder aufgegriffen, Spiegel gekürzt, Modul-Verweise nach 11.3). GF4 (≈7,6 Min.) und GF9 (≈8,2 Min.) verdichtet, GF16 spielt jetzt in einem Malerbetrieb. · 10.10.: Workbook, To-dos und Zusammenfassung um alle neuen Lektionen ergänzt und neu nummeriert; „Zum Vertiefen“ und „Zum Nachlesen“ der neuen Lektionen aus den Board-Nachträgen (IJ, PE inkl. ergänztem S3) auf die Tiefe der alten Lektionen gebracht – Workbook zur Freigabe. · 10.10. (später): neu GF16 Ein Preistest, kein Menschentest (mit Board-S3: mindestens 20 Gespräche pro Preis, Testblatt), GF17 Die Preisleiter (Board „Wenn dein Preis nicht mehr erklärt werden muss“) – zur Freigabe. Am Ende angehängt, damit die Verweise auf GF1–GF15 gleich bleiben; Ausblick auf den U-Weg von GF15 ans Ende von GF17 verschoben. · 10.10.: GF4 erweitert (Moment nach dem Ja, Kontrastprinzip aus Meisterhaft), neu GF5 Heiß, warm, kalt, GF6 Die Bäume, die die Ernte tragen, GF7 Der rote Teppich nach der Unterschrift – zur Freigabe. Alte GF5–GF12 heißen jetzt GF8–GF15; Verweise in anderen Modulen umgestellt. · GF1–GF10 freigegeben (05.10.). GF11 „Wenn das Konto drückt“ und GF12 „Die Cash-Aktion“ (aus Finanzen, Wachstum mit System R4 S15–S24) neu geschrieben nach Regelwerk V7 und ins Sprechtext-Doc eingefügt (06.10.), zur Freigabe. Ausblick auf den U-Weg am Ende von GF12 eingebaut. Danach: Abschlusspaket (Workbook, To-dos, Zusammenfassung), dann Freigabe Edis. · Abschlusspaket angelegt 07.10. (Workbook aus Board-Schritten, To-dos, Zusammenfassung), zur Freigabe. Danach: Freigabe Edis.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 17,
      "words": 17771,
      "min": 127
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/UYd83Bf4kra9hchPW1CMLL"
      },
      {
       "label": "Workbook GF-Weg",
       "url": "https://claude.ai/code/artifact/421be0a4-bb7d-4b19-a85c-7d00ba15c0ee",
       "typ": "workbook"
      },
      {
       "label": "To-dos GF-Weg",
       "url": "https://claude.ai/code/artifact/75e03eba-7eef-4c1d-9590-dc9767fafe30",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung GF-Weg",
       "url": "https://claude.ai/code/artifact/351f7ee3-ae55-479c-8d27-8f0cebc4a185",
       "typ": "zusammenfassung"
      }
     ]
    },
    "U": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen"
     ],
     "ls": 7,
     "lf": 7,
     "rw": "V7",
     "note": "10.10.: Freigabe Edis erteilt – alle neuen Lektionen, Workbook-Ergänzungen, Leitplanken und der von Claude ergänzte Board-Schritt S3 (Preis) freigegeben. Fehlt nur noch: Zustimmung Coach. · 10.10.: Leitplanken in allen älteren Lektionen nachgetragen (Regelwerk V7 ergänzt) – jetzt hat jede Lektion des Wegs eine; Workbook, To-dos und Zusammenfassung an die korrigierten Aufgaben angeglichen, „Eine Hilfe“ im Workbook bei allen Lektionen. · 10.10.: Regelwerk-Prüfung V7 für alle neuen Lektionen gemacht und direkt korrigiert (fehlende Board-Schritte in Aufgaben ergänzt, Geschichten in der Lehre wieder aufgegriffen, Spiegel gekürzt, Modul-Verweise nach 11.3). U7 hat jetzt den Abschnitt „Abschluss des Moduls“ mit Upsell (blau). · 10.10.: Workbook, To-dos und Zusammenfassung um alle neuen Lektionen ergänzt und neu nummeriert; „Zum Vertiefen“ und „Zum Nachlesen“ der neuen Lektionen aus den Board-Nachträgen (IJ, PE inkl. ergänztem S3) auf die Tiefe der alten Lektionen gebracht – Workbook zur Freigabe. · 10.10. (später): neu U6 Der Preis wächst mit (Board „Wenn dein Preis nicht mehr erklärt werden muss“ S7) – zur Freigabe. „Der ganze Weg“ heißt jetzt U7, Rückblick um den Preistest ergänzt; Verweis in Mitarbeitergewinnung GF umgestellt. · 10.10.: neu U4 Von den Besten abschauen, U5 Der Rückschnitt – zur Freigabe. Alte U4 „Der ganze Weg“ heißt jetzt U6 (Rückblick um die neuen Inhalte ergänzt). · U1–U4 freigegeben (05.10.), U4 = Abschluss über alle Ebenen. U2 erzählt jetzt die Baustelle des Vaters (statt Schreibmaschine/Freund, 05.10.). Abschlussprüfung erledigt. Workbook folgt später, dann Freigabe Edis. · Abschlusspaket angelegt 07.10. (Workbook aus Board-Schritten, To-dos, Zusammenfassung), zur Freigabe. Danach: Freigabe Edis.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 7,
      "words": 6256,
      "min": 45
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/728emVZhkj2GEcBji3hJts"
      },
      {
       "label": "Workbook U-Weg",
       "url": "https://claude.ai/code/artifact/a9accf89-03ac-4c85-8a23-9d583f9e2761",
       "typ": "workbook"
      },
      {
       "label": "To-dos U-Weg",
       "url": "https://claude.ai/code/artifact/ba476d6d-3858-45f8-a511-5e489cc5b7ef",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung U-Weg",
       "url": "https://claude.ai/code/artifact/08e89eac-8ca5-42dc-82e3-c295de92ae8c",
       "typ": "zusammenfassung"
      }
     ]
    }
   }
  },
  {
   "nr": "5",
   "name": "Verkauf – Verkaufsgespräch",
   "title": "Der Weg zum Handschlag",
   "slogan": "Wer fragt, führt.",
   "bereich": "Paket Verkauf",
   "paket": "Paket Verkauf",
   "coach": "Amir Mustafic",
   "src": "Meisterhaft verkaufen + Klar verkaufen zusammengeführt (05.10.) · Gerüst: 10-Phasen-Verkaufsreise aus „Verkauf × Anker“ · Kaufmotive: Liste aus Klar verkaufen · Einwand-Drehung heißt „Richtungswechsel-Frage“ · + Sympathie, Knappheit, Autorität, soziale Bewährtheit aus Leadership Video 12 · Kundenbindung → Abo, Entscheidungstisch/Pre-Launch → Angebotsmagie, Vertriebsmathematik → Vertrieb, Mindset-Teile → Mindset · Phase 2 freigegeben 05.10.: S 21 / GF 4, kein U",
   "faden": "abgenommen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach + Edis-Einspieler",
    "edis0": true,
    "hinweis": "Workbook folgt laut Tafel nach der Sprecher-Verteilung.",
    "einspielerMin": 11.8,
    "einspielerAnzahl": 9
   },
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen",
      "offen"
     ],
     "ls": 21,
     "lf": 21,
     "rw": "V6",
     "note": "S1–S21 freigegeben (05.10.). Workbook folgt später (nach Code-Überarbeitung und Sprecher-Verteilung), dann Freigabe Edis. Nachtrag aus Webseite (10.10.): nach „Deine Haltung“ zwei Absätze (vorbereitete Kunden, klares Nein ohne neue Schleife; Knoten Teil 1 S2, S3, S7) eingefügt, grün markiert – zur Durchsicht.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 21,
      "words": 19122,
      "min": 137
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/AvfVUbTkXHzjWaUwzKygyc"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen",
      "offen"
     ],
     "ls": 4,
     "lf": 4,
     "note": "GF1–GF4 freigegeben (05.10.), GF4 = Abschluss über alle Ebenen. Abschlussprüfung erledigt. Workbook folgt später, dann Freigabe Edis.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 4,
      "words": 3050,
      "min": 22
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/HZQsA2ET9QNsiGgZV9o7mL"
      }
     ]
    }
   }
  },
  {
   "nr": "32",
   "name": "ABO-Modell",
   "title": "Kunden, die bleiben",
   "slogan": "Einmal gewinnen. Immer begeistern.",
   "bereich": "Paket Verkauf",
   "paket": "Paket Verkauf",
   "coach": "Amir Mustafic",
   "src": "Board „Das Abo-Modell“ (Hauptteil L1–L24, digitales Abo K1–K10, Kundenbindung Teil 1+2 = Hauptstelle) · + MV L24 Gratis-Start, Wechselträgheit · Zeitungsanzeige → Neue Aufträge gewinnen · Gewinnspiel-Prinzip → Angebotsmagie · Empfehlungen → Weiterempfehlungsprogramm · Reklamations-Geschichte vorgemerkt",
   "faden": "abgenommen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach + Edis-Einspieler",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 1.7,
    "einspielerAnzahl": 2
   },
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen",
      "offen"
     ],
     "ls": 12,
     "lf": 12,
     "note": "S1–S12 freigegeben (05.10.), 12 Lektionen, ca. 78 min. Workbook folgt später, dann Freigabe Edis.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 12,
      "words": 10986,
      "min": 78
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/QAwDDu5pUpekvVyZrYaoL5"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen",
      "offen"
     ],
     "ls": 8,
     "lf": 8,
     "note": "GF1–GF8 freigegeben (05.10.), ca. 37 min. Workbook folgt später, dann Freigabe Edis.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 8,
      "words": 5212,
      "min": 37
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/2HnsfPnMwDVXeLmMjWBEJ9"
      }
     ]
    },
    "U": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen",
      "offen"
     ],
     "ls": 5,
     "lf": 5,
     "note": "U1–U5 freigegeben (05.10.), U5 = Abschluss über alle Ebenen. Abschlussprüfung erledigt. Modul gesamt 25 Lektionen, ca. 143 min. Workbook folgt später, dann Freigabe Edis.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 5,
      "words": 3915,
      "min": 28
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/PD2fcRruV42vGCjacXycEd"
      }
     ]
    }
   }
  },
  {
   "nr": "33",
   "name": "VIM",
   "title": "Der Brief, der Türen öffnet",
   "slogan": "Weniger Zufall. Mehr System.",
   "bereich": "Paket Verkauf",
   "paket": "Paket Verkauf",
   "coach": "Amir Mustafic",
   "src": "Board „VIM – Der Verbindungsimpuls“ (33 Lektionen) · Hauptstelle für B2B-Postversand, Drucksachen und Recht der Kontaktwege · Telefontechnik allgemein → Handschlag · Schlagzahl, Bestand → Vertrieb · VIM Hauptstelle für Flyer/Anschreiben/Druck/Umschlag, „Vom Kontakt zum Auftrag“ für Vertrauenspaket (freigegeben) · Glossar verteilt + Workbook",
   "faden": "abgenommen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach + Edis-Einspieler",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 3.9,
    "einspielerAnzahl": 4
   },
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen",
      "offen"
     ],
     "ls": 12,
     "lf": 12,
     "note": "S1–S12 freigegeben (05.10.), 12 Lektionen, ca. 67 min. Workbook folgt später, dann Freigabe Edis.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 12,
      "words": 9339,
      "min": 67
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/61SKSa6tFcgX232W4u6Hqa"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen",
      "offen"
     ],
     "ls": 3,
     "lf": 3,
     "note": "GF1–GF3 freigegeben (05.10.): Lead-Liste, Dashboard, Rollen. Ca. 15 min. Workbook folgt später, dann Freigabe Edis.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 3,
      "words": 2055,
      "min": 15
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/SdFpWSiNM37AR3LpbSX5MX"
      }
     ]
    },
    "U": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen",
      "offen"
     ],
     "ls": 2,
     "lf": 2,
     "note": "U1–U2 freigegeben (05.10.), U2 = Abschluss über alle Ebenen. Abschlussprüfung erledigt. Modul gesamt 17 Lektionen, ca. 97 min. Workbook folgt später, dann Freigabe Edis.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 2,
      "words": 2052,
      "min": 15
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/3A9eD58yqokHebZPtMXGaX"
      }
     ]
    }
   }
  },
  {
   "nr": "4",
   "name": "Vertrieb",
   "title": "Vertrieb, der nicht an dir hängt",
   "slogan": "Architektur statt Feuerwehr.",
   "bereich": "Paket Verkauf",
   "paket": "Paket Verkauf",
   "coach": "Amir Mustafic",
   "src": "Board „Vertrieb“ (Teil A Team + Teil B/C Online) · MV L23/L26 (Vertriebsmathematik, Umsatzquellen, 90 Tage) · KV V10 S1–S9 (Kundensystem) · Online-Bauanleitung (B1–B11, C1, C7–C9, C12) → Webseite-Modul, hier die Vertriebs-Sicht · „Zielpunkt“ statt „Fixstern“",
   "faden": "abgenommen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach + Edis-Einspieler",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 3.1,
    "einspielerAnzahl": 3
   },
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen",
      "offen"
     ],
     "ls": 7,
     "lf": 7,
     "note": "S1–S7 freigegeben (05.10.). Workbook folgt später, dann Freigabe Edis.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 7,
      "words": 5137,
      "min": 37
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/G6X2Jm9SeN6qNigoJSunra"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen",
      "offen"
     ],
     "ls": 9,
     "lf": 9,
     "note": "GF1–GF9 freigegeben (05.10.). Workbook folgt später, dann Freigabe Edis.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 9,
      "words": 5718,
      "min": 41
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/EpJ71Dgksx8Gx6H1GJ98w4"
      }
     ]
    },
    "U": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen",
      "offen"
     ],
     "ls": 4,
     "lf": 4,
     "note": "U1–U4 freigegeben (05.10.), U4 = Abschluss über alle Ebenen. Abschlussprüfung erledigt. Workbook folgt später, dann Freigabe Edis. · 08.10.: Coach Amir Mustafic.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 4,
      "words": 2626,
      "min": 19
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/D22Tw4yoGy3eDun1PMq8yb"
      }
     ]
    }
   }
  },
  {
   "nr": "10",
   "name": "Mindset",
   "title": "Vom Autopiloten ans Steuer",
   "slogan": "Erst der Kurs. Dann das Tempo.",
   "bereich": "Wirbelsäule",
   "coach": "Katrin Sesselmann",
   "src": "Board „Mindset“ (Kern L1–L20, Vom Tragen zum Steuern, Verkaufs-Mindset T1/T2, Unternehmer-, Investor-Ebene, Macher → Marktführer) + MV L2/L5/L6/L7/L17 · Sichtbar-Mindset → Selbstvermarktung · L11, L7 S3 → Zeit · Protokolle/Profitcenter → Betriebssystem U · Exit → Bauplan · Investor-Ebene (sechs Hebel) hier Hauptstelle · Zugänge 08.10.: Anker S2 Disziplin → S10, Anker S19 Ausreden → S18, Haltung aus Online-Marketing 6a → S3/GF2 · Macher S3/S4 → Licht an (umgesetzt)",
   "faden": "offen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach + Edis-Einspieler",
    "edis0": true,
    "hinweis": "Sprecherin Katrin Sesselmann (Entscheidung 08.10.), Edis-Geschichten als Einspieler.",
    "einspielerMin": 11.9,
    "einspielerAnzahl": 10
   },
   "docs": [
    {
     "label": "Sortierung S/GF/U (Phase 2)",
     "url": "https://claude.ai/code/artifact/62067638-a649-49aa-a66f-42ebfd0f14d4",
     "typ": "arbeit"
    }
   ],
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen",
      "offen"
     ],
     "ls": 25,
     "lf": 18,
     "rw": "V7",
     "note": "S-Weg nach V7 freigegeben (08.10.): 18 Lektionen. Edis-Einspieler S1, S9, S16, S17 (Vater-Geschichte). Abschluss S18 mit Checkliste und Ausblick auf den GF-Weg. Offen: Workbook, Freigabe Edis, Zustimmung Coach. · Ergänzt 08.10. nach Abgleich mit den KI-Zusammenfassungen: S2 (70.000 Gedanken), S7 (Genie-Zone, Kalender-Reihenfolge im Verweis), S9 (mentale Kraft durch Belastung, mit Gesundheitshinweis), S10 (Belohnung und Systemhilfe in der Routine). · 08.10.: Ergänzungen aus dem Fragenkatalog eingebaut, Abschlussprüfung V7 bestanden (Brücken max. 2 Sätze, lange Sätze gekürzt, Kursiv/Blau geprüft). 1-Mio-Marke und kalte Dusche nur als Anhaltspunkt/Empfehlung, nicht als Versprechen. Sprechzeit gezählt. Nächster Schritt: Workbook. · 14.10.: Neufassung mit Skill „klim-sprechtexte“ läuft (Bildwelt Fliegen, Figur Elena mit Konditorei, Leitfrage „Wer hat diesen Kurs eingegeben?“, Leitgeschichten Brüder Wright und Lindbergh): S-Weg L1–18 freigegeben (14.10.), Lektor-Checkliste durchlaufen (KI-Phrasen raus, Änderungen gelb, Änderungsprotokoll), PDF erstellt. Rund 194 Min. (9,1–13,2 Min. je Lektion). Offen: Workbook (inkl. WORKBOOK-Schritte L14–17), Edi-Impulse, Experten-Stellen, 0er-Video. Neue Regel: Begrüßung in jedem Video. Gorilla-Versuch durch Cocktailparty-Effekt ersetzt, Ray Kroc statt Rowling (L9).",
     "coach": "Katrin Sesselmann",
     "lektor": "14.10.",
     "sprech": {
      "lessons": 18,
      "words": 16772,
      "min": 120
     },
     "docs": [
      {
       "label": "Sprechtexte S-Weg",
       "url": "https://claude.ai/artifact/KbjSc7wW1onNcQWYXo7gTV",
       "typ": "sprechtexte"
      },
      {
       "label": "S-Weg Neufassung 14.10. (Elena)",
       "url": "https://claude.ai/artifact/VKYN3MHQLey4Ze7E7g9roz",
       "typ": "sprechtexte"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen",
      "offen"
     ],
     "lf": 5,
     "rw": "V7",
     "note": "GF-Weg nach V7 freigegeben (08.10.): GF1 Wachstum steckt schon in dir (Muskel), GF2 Vom Tragen zum Steuern (Edis-Einspieler „Die Firma lief“), GF3 Die zweite Ebene (Thomas Huber, Dachdecker mit sieben Leuten) mit Ausblick auf den U-Weg. Offen: Workbook, Freigabe Edis, Zustimmung Coach. Sprechzeit geschätzt. · Ergänzt 08.10. nach Abgleich mit den KI-Zusammenfassungen: GF3 (EVE als Fundament, Mehr-Produkt-Wachstum, rund 1 Mio. Umsatz als Marker, Fundament-Check als dritter Aufgabenteil; Original-Text fehlt im Board). · 08.10.: Ergänzungen aus dem Fragenkatalog eingebaut, Abschlussprüfung V7 bestanden (Brücken max. 2 Sätze, lange Sätze gekürzt, Kursiv/Blau geprüft). 1-Mio-Marke und kalte Dusche nur als Anhaltspunkt/Empfehlung, nicht als Versprechen. Sprechzeit gezählt. Nächster Schritt: Workbook. · 08.10.: GF4 „Vom Retter zum Chef“ (Haltung Mitarbeiterführung, Leadership 2 + Der Leader in dir, Edis-Einspieler Maurer → Chef) und GF5 „Der Steuerberater ist nicht dein Steuermann“ (Haltung Zahlen, Finanzmodul + Erweiterung + Bonus, Thomas Huber) ergänzt; Ausblick auf den U-Weg von GF3 nach GF5 verschoben. Technik bleibt in „Erst du, dann dein Team“ und „Der Eimer mit dem Loch“ (dort Nachtrag mit Rückverweis).",
     "coach": "Katrin Sesselmann",
     "sprech": {
      "lessons": 5,
      "words": 4872,
      "min": 35
     },
     "docs": [
      {
       "label": "Sprechtexte GF-Weg",
       "url": "https://claude.ai/artifact/8GncczcBQ7a6K7MZVkCe9z",
       "typ": "sprechtexte"
      }
     ]
    },
    "U": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen",
      "offen"
     ],
     "ls": 5,
     "lf": 4,
     "rw": "V7",
     "note": "U-Weg nach V7 freigegeben (08.10.): U1 Dein Erfolg trägt mehr als dich, U2 Die dritte Ebene (Edis „Lange war Wachstum …“ + Thomas Huber als Bauunternehmer), U3 Die vierte Ebene (Hauptstelle sechs Hebel), U4 Vom Wie zum Wer (Abschluss über alle Ebenen, Abschluss des Moduls mit Upsell). Alle 25 Lektionen freigegeben. Offen: Abschlussprüfung, Workbooks, To-dos, Zusammenfassung, ZIP, Freigabe Edis, Zustimmung Coach. Sprechzeit GF/U geschätzt. · Ergänzt 08.10. nach Abgleich mit den KI-Zusammenfassungen: U2 (Durchbrüche der drei Ebenen, Tempo aus innerer Klarheit), U4 (Persönlichkeit, fünf Elemente der emotionalen Führung, Kultur mit Verweisen; Upsell um „Raus vom Wühltisch“ erweitert). · 10.10.: Verweise korrigiert (Rezeptbuch statt Betriebssystem, Kultur → Raus vom Wühltisch); Nachträge in Rezeptbuch, Wühltisch und Worte, die führen eingebaut.",
     "coach": "Katrin Sesselmann",
     "sprech": {
      "lessons": 4,
      "words": 4858,
      "min": 35
     },
     "docs": [
      {
       "label": "Sprechtexte U-Weg",
       "url": "https://claude.ai/artifact/HKnE1frX4os3psu1WmH9tM",
       "typ": "sprechtexte"
      }
     ]
    }
   }
  },
  {
   "nr": "6a",
   "name": "Online-Marketing – Grundlagen",
   "title": "Wirkung statt Werbung",
   "slogan": "Erst verstehen, dann senden.",
   "bereich": "Paket Marketing",
   "paket": "Paket Marketing",
   "coach": "Amir Mustafic",
   "src": "Aufgeteilt aus Modul 6 (07.10.) · Einstieg V1, V2, V6, V8 · Wenn aus Werbung Wirkung wird · Marketing ohne Rätsel · Warum du trotz Wissen nicht umsetzt · Digitale Betriebsarchitektur (S1 Workshop-Organisation entfällt) · Haltung → Mindset, Verwertungspyramide → Treppe/EVE, Sog/Positionierung → Positionierung · Kooperationen (56 Schritte) → Partnergewinnung · Kontaktmagnet, Liste, Nachfrage-Test → Webseite · Testimonials → Avatar · Anlass, Markt wartet nicht, Entscheidungstisch → Angebotsmagie · Direct Marketing → Telefon · Nagelprodukt-Einsatz → Treppe (Nachtrag) · Einstieg V9–V30, V33 → Social Media, V27 → Canva · Zugang aus Webseite (07.10.): „Bauplan für dein Online-Marketing-System“ S1–S4, S7–S8, S15 → GF4/U1 (S5, S9–S11 bleiben Webseite, S6, S12–S14 → 6c) · „Wie gutes Marketing Kunden entlastet“ → S10",
   "faden": "abgenommen",
   "video0": {
    "status": "offen"
   },
   "zip": {
    "name": "Wirkung statt Werbung (Online-Marketing 6a) - Paket zur Pruefung 2026-10-07.zip",
    "stand": "07.10.",
    "coach": "Amir Mustafic"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach + Edis-Einspieler",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 9,
    "einspielerAnzahl": 7
   },
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "ls": 10,
     "lf": 10,
     "rw": "V7",
     "note": "S1–S10 nach Regelwerk V7 freigegeben (07.10.). Edis gelb in S1, S3, S5, S7; Brücken blau. S7 „Aufgabe offen“ (im Original keine Aufgabe). Begrüßung S1 Platzhalter (Coach offen). Jede Aufgabe mit Leitplanke. Upsells spannend erzählt. Einstiege der Versprechen und Edis-Geschichten abgewechselt. Sprechzeit ca. 44 Min., 3,6–5,0 Min. je Lektion. Abschlussprüfung V7 bestanden (07.10.). Workbook freigegeben, To-dos und Zusammenfassung angelegt (07.10.). Zur Abnahme: Freigabe Edis, dann Coach. Nachbesserung aus Abschlussprüfung: S6 „Keine Reaktion ist auch eine Antwort“ (Rätsel S2–S3) ergänzt, S7 Schlüsselmoment in Jetzt-Zeit. Modul-Einleitung „Darum geht es in diesem Modul“ in S1 ergänzt (07.10.), Sprechzeit ca. 45 Min. Qualitätsprüfung 07.10.: Wendepunkte variiert, Verweise aktualisiert (YouTube → Video).",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 10,
      "words": 6320,
      "min": 45
     },
     "docs": [
      {
       "label": "Sprechtexte S-Weg",
       "url": "https://claude.ai/code/artifact/eafbe39d-2499-41aa-8955-e4a2566c8bde",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook S-Weg",
       "url": "https://claude.ai/code/artifact/8d867727-477e-4cbf-899d-4f090b865aa0",
       "typ": "workbook"
      },
      {
       "label": "To-dos S-Weg",
       "url": "https://claude.ai/code/artifact/fab98af7-ab6d-4794-bfc2-c44263ffd8f5",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung S-Weg",
       "url": "https://claude.ai/code/artifact/4364f7ee-01ab-47ff-a1b4-a23dab49505b",
       "typ": "zusammenfassung"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "ls": 4,
     "lf": 4,
     "rw": "V7",
     "note": "GF1–GF4 nach Regelwerk V7 freigegeben (07.10.). Edis gelb in GF1 und GF3; Rückblick GF1, Ausblick GF4 (blau). Upsells spannend erzählt (Neugier vor Modulname). Jede Aufgabe mit Leitplanke. Sprechzeit ca. 19 Min. Abschlussprüfung V7 bestanden (07.10.). Workbook freigegeben, To-dos und Zusammenfassung angelegt (07.10.). Zur Abnahme: Freigabe Edis, dann Coach. Nachbesserung: GF3 Schlüsselmoment in Jetzt-Zeit. Qualitätsprüfung 07.10.: Wendepunkte variiert, Verweise aktualisiert (YouTube → Video).",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 4,
      "words": 2710,
      "min": 19
     },
     "docs": [
      {
       "label": "Sprechtexte GF-Weg",
       "url": "https://claude.ai/code/artifact/2abfeadd-d1ba-4fda-8c95-6e57710752ee",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook GF-Weg",
       "url": "https://claude.ai/code/artifact/bf838faf-6e73-42da-a2de-0b5e2d7b8a09",
       "typ": "workbook"
      },
      {
       "label": "To-dos GF-Weg",
       "url": "https://claude.ai/code/artifact/4f740c02-06f4-4ace-b7f1-fe4fe90bc356",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung GF-Weg",
       "url": "https://claude.ai/code/artifact/a830f7a8-0c5f-48e2-830b-48c119057fd3",
       "typ": "zusammenfassung"
      }
     ]
    },
    "U": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "ls": 1,
     "lf": 1,
     "rw": "V7",
     "note": "U1 „Richtung statt Klicks“ = Abschluss über alle Ebenen, freigegeben (07.10.). Endet mit „Abschluss des Moduls“ + Upsell auf 6b und 6c (blau). Edis gelb. Aufgabe mit Leitplanke. Sprechzeit ca. 7,3 Min. Abschlussprüfung V7 bestanden (07.10.). Workbook freigegeben, To-dos und Zusammenfassung angelegt (07.10.). Zur Abnahme: Freigabe Edis, dann Coach. Abschluss-Upsell als Empfehlung je nach Lage umformuliert (07.10.). Qualitätsprüfung 07.10.: Wendepunkte variiert, Verweise aktualisiert (YouTube → Video).",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 1,
      "words": 1020,
      "min": 7
     },
     "docs": [
      {
       "label": "Sprechtext U-Weg",
       "url": "https://claude.ai/code/artifact/00684cb5-7ea3-4449-b8b2-85fb6ac1d7aa",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook U-Weg",
       "url": "https://claude.ai/code/artifact/77bffbea-be48-460f-8751-436d6b34688c",
       "typ": "workbook"
      },
      {
       "label": "To-dos U-Weg",
       "url": "https://claude.ai/code/artifact/fa952b56-bd68-41c7-ae53-262c86cf4212",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung U-Weg",
       "url": "https://claude.ai/code/artifact/744af309-fa16-42fe-abda-a2db915197c2",
       "typ": "zusammenfassung"
      }
     ]
    }
   }
  },
  {
   "nr": "6b",
   "name": "Online-Marketing – Content und Video",
   "title": "Wissen, das gefunden wird",
   "slogan": "Zeigen statt behaupten.",
   "bereich": "Paket Marketing",
   "paket": "Paket Marketing",
   "coach": "Amir Mustafic",
   "src": "Aufgeteilt aus Modul 6 (07.10.) · Vom Unsichtbaren zum Gefundenen · Content ist kein Beitrag · YouTube ist deine digitale Lage · Hauptstelle „Was und Warum, nicht Wie“ · Zielgruppenkompetenz/Marktforschung → Avatar (kurz) · Upsell zu SEO und Webseite · Entscheidung 07.10.: Startplattform TikTok statt YouTube, YouTube als zweite Lage (GF3)",
   "faden": "abgenommen",
   "video0": {
    "status": "offen"
   },
   "zip": {
    "name": "Wissen das gefunden wird (Online-Marketing 6b) - Paket zur Pruefung 2026-10-07.zip",
    "stand": "07.10.",
    "coach": "Amir Mustafic"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach + Edis-Einspieler",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 4,
    "einspielerAnzahl": 4
   },
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "ls": 7,
     "lf": 7,
     "rw": "V7",
     "note": "S1–S7 nach Regelwerk V7 freigegeben (07.10.). S1 mit Modul-Einleitung „Darum geht es in diesem Modul“. Startplattform TikTok (S5/S6 angepasst, Einwand „bringt nichts“ offen angesprochen). Edis gelb in S1, S3, S7. Upsells spannend mit Zusatz. Jede Aufgabe mit Leitplanke. Sprechzeit ca. 30 Min. Abschlussprüfung V7 bestanden (07.10.). Workbook, To-dos und Zusammenfassung fertig (07.10.). Zur Abnahme: Freigabe Edis, dann Coach. Qualitätsprüfung 07.10.: Wendepunkte variiert, Verweise aktualisiert (TikTok-Modul).",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 7,
      "words": 4100,
      "min": 30
     },
     "docs": [
      {
       "label": "Sprechtexte S-Weg",
       "url": "https://claude.ai/code/artifact/b2d62fb0-a6a8-4d88-be92-01ec9b6e4996",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook S-Weg",
       "url": "https://claude.ai/code/artifact/f574f642-fc5c-4688-aeb8-49b711a73b26",
       "typ": "workbook"
      },
      {
       "label": "To-dos S-Weg",
       "url": "https://claude.ai/code/artifact/158a5e34-e699-4cc5-b74d-1880bdc0fbba",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung S-Weg",
       "url": "https://claude.ai/code/artifact/c433b238-c7a3-4a19-a5eb-d0cbbeb64a00",
       "typ": "zusammenfassung"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "ls": 4,
     "lf": 4,
     "rw": "V7",
     "note": "GF1–GF4 nach Regelwerk V7 freigegeben (07.10.). GF4 = Abschluss über alle Ebenen + „Abschluss des Moduls“ mit Upsell auf 6c und SEO. Edis gelb in GF4 (Online-Vertrieb Teil 2; prüfen, ob in Webseite verwendet). Rückblick GF1 blau. YouTube als zweite Lage in GF3. Sprechzeit ca. 17 Min. Abschlussprüfung V7 bestanden (07.10.). Workbook, To-dos und Zusammenfassung fertig (07.10.). Zur Abnahme: Freigabe Edis, dann Coach. Abschluss-Upsell als Empfehlung je nach Lage umformuliert (07.10.). Qualitätsprüfung 07.10.: Wendepunkte variiert, Verweise aktualisiert (TikTok-Modul).",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 4,
      "words": 2428,
      "min": 17
     },
     "docs": [
      {
       "label": "Sprechtexte GF-Weg",
       "url": "https://claude.ai/code/artifact/89bc4f20-7110-4ae0-b75f-b5dff3c23163",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook GF-Weg",
       "url": "https://claude.ai/code/artifact/42c00bd5-ef1b-49c4-be13-c705c073bfbf",
       "typ": "workbook"
      },
      {
       "label": "To-dos GF-Weg",
       "url": "https://claude.ai/code/artifact/3ad08cee-1774-4c28-9ca8-cf423ad53c9b",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung GF-Weg",
       "url": "https://claude.ai/code/artifact/d7058f53-dba0-4ad6-b183-0c8819cbaff0",
       "typ": "zusammenfassung"
      }
     ]
    }
   }
  },
  {
   "nr": "6c",
   "name": "Online-Marketing – Texte und E-Mail",
   "title": "Worte, die führen",
   "slogan": "Führen statt drücken.",
   "bereich": "Paket Marketing",
   "paket": "Paket Marketing",
   "coach": "Amir Mustafic",
   "src": "Aufgeteilt aus Modul 6 (07.10.) · Werbung, die nicht drückt · Sprachmuster (Hauptstelle geschriebene Sprache, Verkaufsgespräch verweist) · E-Mail-Marketing · 7-Kontakt-System (von der Webseite, mit Webseite abstimmen) · Newsletter · Kundenweg Teil 3 (Xing) · Betreffzeile aus Betriebsarchitektur S9 · Zugänge (07.10.): Neugier-Überschriften und Aufbau einer Geschichte (Hauptstelle hier, Buch verweist) · Teile aus interner Lektion „Wie dein Schreiben Menschen wirklich erreicht“ (freigegeben, nur wo passend; Schreibzeit und To-dos → Workbook) · Knoten Teil 2 (Webseite L10) · E-Mail-Teil aus Webseite L2 (S6, S12–S14)",
   "faden": "abgenommen",
   "video0": {
    "status": "offen"
   },
   "zip": {
    "name": "Worte die fuehren (Online-Marketing 6c) - Paket zur Pruefung 2026-10-07.zip",
    "stand": "07.10.",
    "coach": "Amir Mustafic"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach + Edis-Einspieler",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 6,
    "einspielerAnzahl": 7
   },
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "ls": 14,
     "lf": 14,
     "rw": "V7",
     "note": "S1–S14 nach Regelwerk V7 freigegeben (07.10.). S1 mit Modul-Einleitung. KI-Absatz in jeder Lektion (Auftrag an die KI + Prüfung). Edis gelb in S2, S3, S7, S11, S13. S14 mit Ausblick auf GF. Upsells mit Zusatz, jede Aufgabe mit Leitplanke. Sprechzeit ca. 63 Min. Abschlussprüfung V7 bestanden (07.10.). Workbook, To-dos und Zusammenfassung fertig (07.10.). Zur Abnahme: Freigabe Edis, dann Coach. Qualitätsprüfung 07.10.: Wendepunkte variiert, Verweise aktualisiert; Rechtliches zu Werbemails ergänzt (S13, GF2, GF6); GF5 auf LinkedIn umgestellt. · 10.10.: S12 um die fünf Elemente der emotionalen Führung ergänzt (aus dem Mindset-Board), freigegeben. Nachtrag aus Webseite (10.10.): S14 „Jede Mail mit einem Plan“ (E-Mail-Reise, 80/20, Vertrieb B11) eingefügt, grün markiert – zur Durchsicht. Workbook S14 (Plan je Mail) und Zusammenfassung S14 nachgezogen. Coach-Paket (ZIP) dadurch veraltet – nach der Durchsicht neu bauen.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 14,
      "words": 8800,
      "min": 63
     },
     "docs": [
      {
       "label": "Sprechtexte S-Weg",
       "url": "https://claude.ai/code/artifact/05a33da4-7d6d-42e9-8c64-b7d4f7687ee3",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook S-Weg",
       "url": "https://claude.ai/code/artifact/be24e063-2e93-4685-8ae1-3a23aa87dd9a",
       "typ": "workbook"
      },
      {
       "label": "To-dos S-Weg",
       "url": "https://claude.ai/code/artifact/f7fe82b9-4afe-4e81-bfe8-f3ba5271f083",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung S-Weg",
       "url": "https://claude.ai/code/artifact/969f66de-6b4c-46b0-a7ee-13ee781ffcfd",
       "typ": "zusammenfassung"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "ls": 6,
     "lf": 6,
     "rw": "V7",
     "note": "GF1–GF6 nach Regelwerk V7 freigegeben (07.10.). KI-Absatz in jeder Lektion. Rückblick GF1 blau. Edis gelb in GF3 (Kunden, die mitgingen) und GF6 (Schreibmaschine 2004). GF6 = Abschluss über alle Ebenen + „Abschluss des Moduls“ mit Upsell auf Verkaufsgespräch und Angebot. Sprechzeit ca. 27 Min. Treppe an Produktpalette angeglichen (Türöffner ergänzt, Beispiel Wohnung: Einstiegsprodukt Badsanierung). Upsell als Empfehlung je nach Lage. Abschlussprüfung V7 bestanden (07.10.). Workbook, To-dos und Zusammenfassung fertig (07.10.). Zur Abnahme: Freigabe Edis, dann Coach. Qualitätsprüfung 07.10.: Wendepunkte variiert, Verweise aktualisiert; Rechtliches zu Werbemails ergänzt (S13, GF2, GF6); GF5 auf LinkedIn umgestellt.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 6,
      "words": 3743,
      "min": 27
     },
     "docs": [
      {
       "label": "Sprechtexte GF-Weg",
       "url": "https://claude.ai/code/artifact/6456924e-6e5b-4201-8bd6-939d1c350d3a",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook GF-Weg",
       "url": "https://claude.ai/code/artifact/bfdf644d-a2ba-4f2b-84e6-03477bcb7a43",
       "typ": "workbook"
      },
      {
       "label": "To-dos GF-Weg",
       "url": "https://claude.ai/code/artifact/14e548f4-9d21-404e-91ab-15fb09303806",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung GF-Weg",
       "url": "https://claude.ai/code/artifact/ab61cdb9-95a8-4b3b-8b95-640ef15c871c",
       "typ": "zusammenfassung"
      }
     ]
    }
   }
  },
  {
   "nr": "7",
   "name": "Direkt-Marketing",
   "title": "Das Telefon klingelt nicht von allein",
   "slogan": "Anstoßen statt abwarten.",
   "bereich": "Paket Marketing",
   "paket": "Paket Marketing",
   "coach": "Amir Mustafic",
   "src": "Neue Aufträge gewinnen (26 Videos + L40) · + Abo L22 Zeitungsanzeige · Hauptstelle für Vorqualifizierung, Empfehlungen auslösen, öffentliche Bewertungen · Flyer/Anschreiben/Druck → VIM · Canva → Canva-Modul · „Vom Kontakt zum Auftrag“ eigenes Modul (05.10.)",
   "faden": "abgenommen",
   "video0": {
    "status": "offen"
   },
   "webinar": {
    "status": "geplant",
    "stand": "10.10.",
    "note": "Offenes Webinar für Neukunden (Nicht-Kunden), ca. 45 Min., führt zum kostenlosen Betriebs-Check. Thema Auftragsflaute; hängt an der Konjunktur, eher bei Bedarf einsetzen. Für zahlende Kunden bleibt der Stammtisch."
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach + Edis-Einspieler",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 2.4,
    "einspielerAnzahl": 2
   },
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "ls": 10,
     "lf": 10,
     "rw": "V6",
     "note": "S1–S10 freigegeben (05.10.), 10 Lektionen, ca. 59 min. Abschlussprüfung erledigt (05.10.). Workbook, To-dos und Zusammenfassung angelegt (06.10.), zur Durchsicht (Platzhalter für leere Board-Beispiele V3.1–3.3, V11.1, V18.1). Fehlt: Freigabe Edis.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 10,
      "words": 8302,
      "min": 59
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/AyeB3KFMnAoRB1UbnLCSim"
      },
      {
       "label": "Workbook S-Weg",
       "url": "https://claude.ai/code/artifact/ff06b40c-7e33-40d5-8a2c-2664d675ba61",
       "typ": "workbook"
      },
      {
       "label": "To-dos S-Weg",
       "url": "https://claude.ai/code/artifact/8e0fe051-542d-415e-879f-fb458dd0dc09",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung S-Weg",
       "url": "https://claude.ai/code/artifact/8296ae04-a8f4-4a01-a4e1-a85f77208f51",
       "typ": "zusammenfassung"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "ls": 4,
     "lf": 4,
     "rw": "V6",
     "note": "GF1–GF4 freigegeben (05.10.), GF4 = Abschluss über alle Ebenen. Ca. 24 min. Modul gesamt 14 Lektionen, ca. 83 min. Abschlussprüfung erledigt (05.10.). Workbook, To-dos und Zusammenfassung angelegt (06.10.), zur Durchsicht (offen: Empfehlungs-Video Kunde/Empfänger, Edis-Absatz im Workbook GF2 freigeben). Fehlt: Freigabe Edis.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 4,
      "words": 3385,
      "min": 24
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/3CRZngxSDPjLbFzd2YFbUv"
      },
      {
       "label": "Workbook GF-Weg",
       "url": "https://claude.ai/code/artifact/c7d87e47-11e3-4310-b29e-0000e66b6bd5",
       "typ": "workbook"
      },
      {
       "label": "To-dos GF-Weg",
       "url": "https://claude.ai/code/artifact/cb0f0fc5-1998-4e87-9229-b5dafc827a99",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung GF-Weg",
       "url": "https://claude.ai/code/artifact/406b07ad-6c37-47c9-8e25-a6f2e1549f74",
       "typ": "zusammenfassung"
      }
     ]
    }
   }
  },
  {
   "nr": "7",
   "name": "Vom Kontakt zum Auftrag",
   "title": "Das Angebot, das unterschrieben wird",
   "slogan": "Schnell. Klar. Unterschrieben.",
   "bereich": "Paket Verkauf",
   "paket": "Paket Verkauf",
   "coach": "Amir Mustafic",
   "src": "Board „Vom Kontakt zum Auftrag“ (V0–V15, 73 Schritte) · Hauptstelle für Angebot in 48 h, Pauschalpreis, Preiserhöhung, Nutzenangebot + Checkliste, Vertrauenspaket, Dokumentenstandard, Auftrags-Logik · Sympathie/Nutzen-Gespräch → Handschlag · Nachtrags-Liste im Projekt",
   "faden": "abgenommen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach + Edis-Einspieler",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 1.3,
    "einspielerAnzahl": 1
   },
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "ls": 7,
     "lf": 7,
     "rw": "V6",
     "note": "S1–S7 freigegeben (05.10.), 7 Lektionen, ca. 49 min. Abschlussprüfung erledigt (05.10.). Workbook, To-dos und Zusammenfassung angelegt (06.10.), zur Durchsicht (Platzhalter Beispiel-Galerie V7.1–7.3 und Hüllen). Fehlt: Freigabe Edis.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 7,
      "words": 6824,
      "min": 49
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/5QmMTvU3PGX6mnuxyHxUjr"
      },
      {
       "label": "Workbook S-Weg",
       "url": "https://claude.ai/code/artifact/0753c1f0-559a-4a5f-ad86-0585d8808eaf",
       "typ": "workbook"
      },
      {
       "label": "To-dos S-Weg",
       "url": "https://claude.ai/code/artifact/1d75857b-e945-482c-974a-0760b0d7b457",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung S-Weg",
       "url": "https://claude.ai/code/artifact/17f81347-7139-4377-9231-82c744455f80",
       "typ": "zusammenfassung"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "ls": 3,
     "lf": 3,
     "rw": "V6",
     "note": "GF1–GF3 freigegeben (05.10.), GF3 = Abschluss über alle Ebenen. Ca. 19 min. Modul gesamt 10 Lektionen, ca. 67 min. Abschlussprüfung erledigt (05.10.). Nachtrags-Liste im Projekt. Workbook, To-dos und Zusammenfassung angelegt (06.10.), zur Durchsicht. Fehlt: Freigabe Edis.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 3,
      "words": 2619,
      "min": 19
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/artifact/3pWsZatTJwz9A8RBoUCtsn"
      },
      {
       "label": "Workbook GF-Weg",
       "url": "https://claude.ai/code/artifact/95699f67-eb83-403a-a51c-d7076508a953",
       "typ": "workbook"
      },
      {
       "label": "To-dos GF-Weg",
       "url": "https://claude.ai/code/artifact/1214d899-380f-4a3f-8746-2d8035743bca",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung GF-Weg",
       "url": "https://claude.ai/code/artifact/3b7e318c-f196-4ef0-83c6-4edeee1c64af",
       "typ": "zusammenfassung"
      }
     ]
    }
   }
  },
  {
   "nr": "8a",
   "name": "Social Media – Einrichten",
   "title": "Social Media 1: Facebook und Instagram richtig einrichten – Konto, Seite und Werbekonto sicher aufsetzen, bevor du Zeit und Geld hineinsteckst",
   "slogan": "Erst prüfen, dann abheben.",
   "bereich": "Paket Social Media",
   "paket": "Paket Social Media",
   "coach": "Amir Mustafic",
   "src": "Aufgeteilt aus Modul 8 Social Media Marketing (Bestandsaufnahme freigegeben 10.10.) · Paket Social Media (nach der Wirbelsäule) · Business-Portfolio nach Ground-Truth-Fassung 2026-09-20 (alte Business-Manager-Fassung = Archiv), Begriff „Business Manager“ überall anpassen · Einstieg V9–16, V18–21 (Profil, Seite, Apps, Messenger, Instagram-Konto, Verknüpfung) · Board Business-Portfolio V1–18 (Sicherheit, Hack-Notfall, Werbekonto, Zahlung, Rechte, Partner) · Hauptstelle Bedienung am Handy = Einstieg, Verwaltung/Rechte/Sicherheit = Portfolio · Untertitel-Variante offen: „sicher vor Hackern und Sperren“ · Namen freigegeben 10.10. (klarer Titel, Bild „Cockpit vor dem Start“ nur für Logo und Sprechtexte) · Kein U-Weg (Sortierung 10.10.)",
   "faden": "offen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 0,
    "einspielerAnzahl": 0
   },
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "entfällt",
      "entfällt",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "lf": 16,
     "rw": "V7 + 1.2",
     "note": "Sortierung freigegeben 10.10.: S 16 / GF 4 / kein U. Sprechtexte S1–S16 freigegeben (10.10.), inkl. Stolperstellen-Prüfung und Faktencheck gegen aktuelle Meta-Abläufe (S7 Instagram-Verbindung am Computer aktualisiert, S2 SMS/App sachlich korrigiert). Praxis-Modul ohne Hauptgeschichten: Versprechen, Spiegel in Vogelperspektive, Das Wichtigste vorab, Schritt für Schritt, Typische Fehler, Am Ende steht, Aufgabe (verweist auf Praxisteil), Leitplanke. Keine feste Beispielfigur (Thomas Huber nicht verwenden, 10.10.). Sprechzeit gezählt: 16 Lektionen, ca. 123 Min. (6,3–10,7 Min. je Lektion). Video: ab „Schritt für Schritt“ Bildschirmaufnahme mit Coach-Stimme, kein eigenes Handgriff-Video. Menünamen vor der Aufnahme live gegenprüfen. Phase-4-Prüfung 10.10.: Geschichten und Schlüsselmoment entfallen (Praxis-Modul), Meta-Techniken geprüft (Richtung im Hauptnutzen ergänzt), Aufgaben aus dem Original, 12 überlange Sätze geteilt. Sprechzeit neu gezählt: ca. 127 Min. Einstieg V13 Schritt 2–4 → Hauptstelle Social Media 2, Anfang Facebook-Teil (Entscheidung 10.10.). Workbook S angelegt 10.10. Fehlt noch: Freigabe Edis.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 16,
      "words": 17848,
      "min": 127
     },
     "docs": [
      {
       "label": "Sprechtexte S-Weg",
       "url": "https://claude.ai/code/artifact/174be7a1-534b-4da0-a660-4a099debcb0f",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook S-Weg",
       "url": "https://claude.ai/code/artifact/097c5a03-54f8-4b34-8e11-208b377206b3",
       "typ": "workbook"
      },
      {
       "label": "Zusammenfassung S-Weg",
       "url": "https://claude.ai/code/artifact/3498de41-a6d0-4b23-b091-6399d394ceb5",
       "typ": "zusammenfassung"
      },
      {
       "label": "To-dos S-Weg",
       "url": "https://claude.ai/code/artifact/3498de41-a6d0-4b23-b091-6399d394ceb5",
       "typ": "todos"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "entfällt",
      "entfällt",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "lf": 4,
     "note": "Sortierung freigegeben 10.10.: GF1 Wenn mehrere Hände am Konto sind · GF2 Ein Arbeitsplatz für alles · GF3 Jeder bekommt den Schlüssel, den er braucht · GF4 Die Agentur darf rein, aber nur bis hierher (Abschluss über alle Ebenen + Abschluss des Moduls mit Weiterempfehlung Social Media 2 und 3). Sprechtexte GF1–GF4 freigegeben (10.10.), gleicher Aufbau wie S-Weg. Quellen: Board V6, V7, V16, V17; Einstieg V12 S5, V13 S5/S7. Phase-4-Prüfung 10.10. bestanden (Geschichten/Schlüsselmoment entfallen, Fundorte und Meta-Begriffe ergänzt, Richtung im Hauptnutzen ergänzt). Sprechzeit ca. 39 Min. (aus Textumfang geschätzt, genaue Zählung beim nächsten Durchgang). Workbook GF angelegt 10.10. Fehlt noch: Freigabe Edis.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 4,
      "words": 5500,
      "min": 39
     },
     "docs": [
      {
       "label": "Sprechtexte GF-Weg",
       "url": "https://claude.ai/code/artifact/df65c49e-d96d-4569-8640-ba7a7463664b",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook GF-Weg",
       "url": "https://claude.ai/code/artifact/ecbda1c3-85fe-4931-8cc7-cdfb949c6c02",
       "typ": "workbook"
      },
      {
       "label": "Zusammenfassung GF-Weg",
       "url": "https://claude.ai/code/artifact/10a81301-5f96-4adc-bc9a-79be9d270963",
       "typ": "zusammenfassung"
      },
      {
       "label": "To-dos GF-Weg",
       "url": "https://claude.ai/code/artifact/10a81301-5f96-4adc-bc9a-79be9d270963",
       "typ": "todos"
      }
     ]
    }
   }
  },
  {
   "nr": "8b",
   "name": "Social Media – Ohne Budget",
   "title": "Social Media 2: Kunden gewinnen mit Facebook und Instagram, ohne Werbebudget – Wie Beiträge, Storys und Gespräche dir regelmäßig Anfragen bringen",
   "slogan": "Gesprächsstoff statt Werbebudget.",
   "bereich": "Paket Social Media",
   "paket": "Paket Social Media",
   "coach": "Amir Mustafic",
   "src": "Aufgeteilt aus Modul 8 Social Media Marketing (Bestandsaufnahme freigegeben 10.10.) · Paket Social Media (nach der Wirbelsäule) · Business-Portfolio nach Ground-Truth-Fassung 2026-09-20 (alte Business-Manager-Fassung = Archiv), Begriff „Business Manager“ überall anpassen · Facebook und Instagram ohne Budget zusammengelegt (10.10.), Aufbau: erst Facebook, dann Instagram, am Ende Planen für beide · Facebook-Teil: Extras „Facebook als Motor“ + organischer Teil „Facebook als Adressmaschine“ (S1, S2, S7–S10) zu einem Strang verschmolzen; Huckepack kurz (Hauptstelle Partnergewinnung); Aufzugs-Modell mit Webseite abstimmen; „Freunde“ vs. „Follower“ trennen · Instagram-Teil: Einstieg V17, V22–26, V28 + Extras „Instagram endlich klar verstehen“ (S8 Werbung → 8c, S9 E-Mail-Liste → Verweis Webseite); Reels: Warum → 6b, Bedienung hier · Planen: Einstieg V29 Posting-Plan (Hauptstelle), V30 Redaktionsplan (Trello-Bedienung → Trello-Modul), V33 Checkliste · Namen freigegeben 10.10. (Bild „Dorfplatz und Schaufenster“ nur für Logo und Sprechtexte)",
   "faden": "offen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 0,
    "einspielerAnzahl": 0
   },
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "entfällt",
      "entfällt",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "lf": 14,
     "rw": "V7 + 1.2",
     "note": "Sortierung freigegeben 10.10.: S 14 (Facebook S1–S6, Instagram S7–S14) / GF 7 / kein U. S1 Vom Zeitvertreib zum Anfragen-Motor · S2 Die fünf Fehler, die Facebook stumm machen · S3 Mundpropaganda 2.0 · S4 Inhalte, über die man spricht · S5 Aus Fremden werden Freunde und Follower · S6 Vom Daumen hoch zur Adresse · S7 Instagram: das Schaufenster, das nie schließt · S8 Ein Profil, das in drei Sekunden überzeugt · S9 Der Beitrag, der gesehen wird · S10 Hashtags · S11 Storys · S12 Reels und Musik · S13 Erst das Ziel, dann das Gespräch · S14 Sieben Fehler und ein Schritt in die Parallelwelt. Aufbau gemischt: Geschichten-Lektionen nach Regelwerk, S9–S12 als Praxis-Lektionen wie Social Media 1; Spiegel in Vogelperspektive. Geschichten nach Regelwerk 1.2 (keine Edis-Geschichten; Rahmen Facebook: zwei Fahrradläden in S1/S6, dazwischen eigene Bilder; Rahmen Instagram: Schaufenster). Sprechtexte S1–S14 freigegeben (10.10.); Regelwerk-Prüfung 10.10. (Brücken gekürzt, Ausblick 2 Sätze); Faktencheck: Instagram max. 5 Hashtags seit Dez. 2025 in S9/S10 korrigiert. Sprechzeit geschätzt. Workbook, Zusammenfassung und To-dos angelegt (10.10.). Nächster Schritt: Freigabe Edis.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 14,
      "words": 10700,
      "min": 76
     },
     "docs": [
      {
       "label": "Sprechtexte S-Weg",
       "url": "https://claude.ai/code/artifact/72f440b9-7ed9-4d40-9333-e14c7aef60b4",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook S-Weg",
       "url": "https://claude.ai/code/artifact/dcaf9c2e-1307-4e2f-a7d0-c2c78bbb9275",
       "typ": "workbook"
      },
      {
       "label": "Zusammenfassung S-Weg",
       "url": "https://claude.ai/code/artifact/a73df312-2b41-4073-8752-29fea74c00fc",
       "typ": "zusammenfassung"
      },
      {
       "label": "To-dos S-Weg",
       "url": "https://claude.ai/code/artifact/a73df312-2b41-4073-8752-29fea74c00fc",
       "typ": "todos"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "entfällt",
      "entfällt",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "lf": 7,
     "rw": "V7 + 1.2",
     "note": "Sortierung freigegeben 10.10.: GF1 Der Aufzug durch deine Kanäle · GF2 Facebook mit Takt statt nach Laune · GF3 Reichweite leihen statt mühsam aufbauen · GF4 Der Plan, der sechs Wochen vorausdenkt · GF5 Vom Einfall zum Beitrag · GF6 Aus Aktionen wird ein System · GF7 Startklar für jeden Montag (Abschluss über alle Ebenen + Modul-Abschluss mit Upsell auf Social Media 3 / Webseite). Geschichten nach Regelwerk 1.2 (Kaufhaus-Aufzug, Orchester, Bäcker+Café, Fahrplan, Zeitungsredaktion, Gärtner, Rückkehr Fahrradladen/Schaufenster). Sprechtexte GF1–GF7 freigegeben (10.10.); Regelwerk-Prüfung 10.10. (Rückblick 2 Sätze, GF7 ohne S-Wissen verständlich). Sprechzeit geschätzt. Workbook, Zusammenfassung und To-dos angelegt (10.10.). Nächster Schritt: Freigabe Edis.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 7,
      "words": 7000,
      "min": 50
     },
     "docs": [
      {
       "label": "Sprechtexte GF-Weg",
       "url": "https://claude.ai/code/artifact/f6c618a8-164c-4aac-bf70-6a58ccb543c4",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook GF-Weg",
       "url": "https://claude.ai/code/artifact/e188d361-4197-4043-ab56-4c667b9efc8b",
       "typ": "workbook"
      },
      {
       "label": "Zusammenfassung GF-Weg",
       "url": "https://claude.ai/code/artifact/e3951df5-01f7-4728-bd7a-29200b9ec385",
       "typ": "zusammenfassung"
      },
      {
       "label": "To-dos GF-Weg",
       "url": "https://claude.ai/code/artifact/e3951df5-01f7-4728-bd7a-29200b9ec385",
       "typ": "todos"
      }
     ]
    }
   }
  },
  {
   "nr": "8c",
   "name": "Social Media – Anzeigen",
   "title": "Social Media 3: Kunden gewinnen mit Werbeanzeigen auf Facebook und Instagram – Wie du mit überschaubarem Budget planbar Anfragen bekommst",
   "slogan": "Mit Budget ist alles möglich. Mit System lohnt es sich.",
   "bereich": "Paket Social Media",
   "paket": "Paket Social Media",
   "coach": "Amir Mustafic",
   "src": "Aufgeteilt aus Modul 8 Social Media Marketing (Bestandsaufnahme freigegeben 10.10.) · Paket Social Media (nach der Wirbelsäule) · Business-Portfolio nach Ground-Truth-Fassung 2026-09-20 (alte Business-Manager-Fassung = Archiv), Begriff „Business Manager“ überall anpassen · Board „Vom Übersehenwerden zum Gefragtsein“ V1–22 · bezahlter Teil „Adressmaschine“ (S3–S6: bezahltes Wachstum, Landingpage, 4 Wege, Verlosungen) · Extras „Facebook Pixel“ als Ausbau GF/U · Lead-Anzeige in Facebook = Startweg, Landingpage/Pixel = Ausbau · Aufbau freigegeben 10.10.: erst Facebook-Teil vollständig (Board V1–22), dann Instagram als Aufbau-Teil (1–2 Lektionen: Platzierungen, Hochformat Storys/Reels, Extras-Instagram S8; Formatunterschiede ergänzt, nicht aus dem Board – kennzeichnen), dann Ausbau GF/U für beide Plattformen · Hauptstelle Klickweg Anzeigen (Mitarbeiter-Modul verweist, gemeinsames Bildschirmvideo) · Equipment = gemeinsamer Handgriff mit Mitarbeiter-Modul · Canva-Bedienung → Canva · Titel/Text: Neugier/Geschichte → 6c · CRM → Vertrieb · Pixel: Cookie-Einwilligung/Datenschutz ergänzen (fehlt im Board) · Namen freigegeben 10.10. (Bild „Wasserstelle in der Wüste“ nur für Logo und Sprechtexte)",
   "faden": "offen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 0,
    "einspielerAnzahl": 0
   },
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "lf": 14,
     "rw": "V7 + 1.2",
     "note": "Sortierung freigegeben 10.10.: S1 Mit Budget ist alles möglich, mit System lohnt es sich · S2 Der kürzeste Weg zur Anfrage · S3 Der erste Blick entscheidet · S4 Titel und erster Satz, die stoppen · S5 Das Handy reicht · S6 Die Spielregeln · S7 Startklar im richtigen Werbekonto · S8 Die Kampagne anlegen · S9 Wen deine Anzeige erreicht · S10 Das Formular, das gute Anfragen bringt · S11 Die Anzeige zusammensetzen · S12 Wo deine Anfragen ankommen · S13 Instagram: Werbung im Hochformat · S14 Die Checkliste vor dem Start. Praxis-Lektionen S7–S9, S11, S12. Hauptstelle Klickweg Anzeigen (Mitarbeiter-Modul verweist) und Werberichtlinien (SM1 L15 verweist). Faktencheck 10.10.: Advantage+ Zielgruppe bei Leads Standard, Interessen-Ausschlüsse entfernt. Geschichten nach Regelwerk 1.2, Rahmenbild Wasserstelle in der Wüste. Sprechtexte S1–S14 freigegeben (10.10.). Vorlagen unter den Videos erstellt: Benennungsdokument, Textvorlage, KLIM-Prüfblatt, Checkliste. ⚠ LINKS NOCH EINFÜGEN (Team): Nutzungsbedingungen Formulare in Anzeigen (S7), Werberichtlinien Meta (S6). Regelwerk-Prüfung, Workbook, Zusammenfassung und To-dos erledigt (10.10.). Nächster Schritt: Freigabe Edis.",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 14,
      "words": 9000,
      "min": 64
     },
     "docs": [
      {
       "label": "Sprechtexte S-Weg",
       "url": "https://claude.ai/code/artifact/09396a91-f7f3-437b-ade7-cd80a3ce0002",
       "typ": "sprechtexte"
      },
      {
       "label": "Vorlage Benennungsdokument",
       "url": "https://claude.ai/code/artifact/92b3e520-5292-44df-9670-e2eed56ccaaf",
       "typ": "vorlage"
      },
      {
       "label": "Vorlage Textvorlage Anzeigen",
       "url": "https://claude.ai/code/artifact/f3d3afb9-e1b8-4cbb-b657-ec6bc6de3499",
       "typ": "vorlage"
      },
      {
       "label": "Vorlage KLIM-Prüfblatt",
       "url": "https://claude.ai/code/artifact/8e2b45fd-3257-44de-ba5a-c12340d18e64",
       "typ": "vorlage"
      },
      {
       "label": "Vorlage Checkliste Kundengewinnung",
       "url": "https://claude.ai/code/artifact/52a90c60-f0af-4436-9616-6c5de956ed79",
       "typ": "vorlage"
      },
      {
       "label": "Workbook S-Weg",
       "url": "https://claude.ai/code/artifact/21385896-59a9-4457-a901-b860c0020fd2",
       "typ": "workbook"
      },
      {
       "label": "Zusammenfassung S-Weg",
       "url": "https://claude.ai/code/artifact/c17e19f7-0a98-4d7a-9d41-bef730433bf5",
       "typ": "zusammenfassung"
      },
      {
       "label": "To-dos S-Weg",
       "url": "https://claude.ai/code/artifact/c17e19f7-0a98-4d7a-9d41-bef730433bf5",
       "typ": "todos"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "lf": 8,
     "rw": "V7 + 1.2",
     "note": "Sortierung freigegeben 10.10.: GF1 Ordnung im Werbekonto · GF2 Keine Anfrage geht verloren · GF3 Das Budget auf vier Wege verteilen · GF4 Vom Klick zur eigenen Seite · GF5 Aktionen und Verlosungen, die Adressen bringen · GF6 Wer zurückkommt, kauft eher · GF7 Den Pixel einbauen und Zielgruppen bilden · GF8 Vom Pixel zum Werbesystem (Abschluss über alle Ebenen + Modul). Kein U-Weg. Pixel: Cookie-Einwilligung ergänzen. Sprechtexte GF1–GF8 freigegeben (10.10.). 📝 NOTIZ: Geschichten passen hier nicht rein – im GF-Weg keine eigenen Geschichten, nur je ein Vergleichssatz in GF3 und GF4 (10.10.). Gewinnspiel-Teilnahme über Teilen/Markieren nicht übernommen (Meta-Regeln); Pixel mit Cookie-Einwilligung. Regelwerk-Prüfung, Workbook, Zusammenfassung und To-dos erledigt (10.10.). Nächster Schritt: Freigabe Edis. ⚠ LINK NOCH EINFÜGEN (Team): Gewinnspiel-Regeln Meta (GF5).",
     "coach": "Amir Mustafic",
     "sprech": {
      "lessons": 8,
      "words": 4550,
      "min": 33
     },
     "docs": [
      {
       "label": "Sprechtexte GF-Weg",
       "url": "https://claude.ai/code/artifact/528cde36-0210-460b-a31e-f8f4a25790a6",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook GF-Weg",
       "url": "https://claude.ai/code/artifact/fe8f0b40-cdc2-4954-841d-0ecdfe408f29",
       "typ": "workbook"
      },
      {
       "label": "Zusammenfassung GF-Weg",
       "url": "https://claude.ai/code/artifact/cb1ec96c-f8a4-42b5-89f7-b2726134a13e",
       "typ": "zusammenfassung"
      },
      {
       "label": "To-dos GF-Weg",
       "url": "https://claude.ai/code/artifact/cb1ec96c-f8a4-42b5-89f7-b2726134a13e",
       "typ": "todos"
      }
     ]
    }
   }
  },
  {
   "nr": "29",
   "name": "Webseite",
   "title": "Die Webseite – Der Mitarbeiter, der niemals schläft",
   "bereich": "Paket Webseite & SEO",
   "paket": "Paket Webseite & SEO",
   "coach": "Peter Petridis",
   "src": "Bekommt aus dem Vertrieb die Online-Bauanleitung B1–B11, C1, C7–C9, C12, Gestaltung aus C13 (freigegeben 05.10.); Unikate ergänzen: CleverReach/KlickTipp, 80/20, „vom Oje zum Hurra“, Durstige und Wasser",
   "faden": "offen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 0,
    "einspielerAnzahl": 0
   },
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "ls": 19,
     "lf": 19,
     "rw": "V7 + 1.2",
     "note": "Bestandsaufnahme und Reihenfolge freigegeben (10.10., mit den Vorschlägen zu den offenen Punkten): 19 Lektionen, Material aus 76 Board-Schritten + Vertrieb B1–B11, C1, C7–C9, C12, C13. Hauptstellen hier: Kontaktmagnet, Listenaufbau, Nachfrage-Test, Eintrageseite, Verkaufsseite, Homepage, Verkaufsvideo, Technik, Adressquellen, drei Kreise/„Aufzug“ (Social Media verweist). Raus: Wirkung, Rätsel, Entlastet, Bauplan S1–S4/S7/S8/S15 → 6a; Unsichtbar → 6a/6b; 7-Kontakt, Knoten Teil 2, Neugier-Überschriften, Geschichte, Bauplan S6/S12–S14, Vertrieb B11 → 6c; Testimonials → Avatar; Knoten Teil 1 S2–S7 → Handschlag (Nachtrag prüfen); digitales Info-Produkt, Käuferbrücke → Treppe. Leitgeschichte (Bildwelt) Berg: durstige Wanderer, Wasserstelle = Eintrageseite, Bergbahn = E-Mails/Videos (statt „Aufzug“), Hütte = Verkaufsseite, Hüttenwirt = Webseite. Voraussetzung (10.10.): Positionierung, Avatar, Produktpalette und EVE werden vorher geschaut (Module immer erklärend nennen: was dort erarbeitet wurde, wo es im Workbook steht) – Brücke in S1, Rückanker mit Verweis aufs Workbook in S1, S5 (Geschenk = Info-Produkt), S7 (Problem aus Zielgruppe, im Dialogprodukt mit dem Kunden herausgearbeitet), S13 (Angebot von der Treppe). S1–S19 freigegeben (10.10.), S13/S17/S19 gekürzt. Abschlussprüfung V7 + 1.2 bestanden (10.10.), offen nur E2 Faktenprüfung (Faustregeln, Google-Zielseiten) vor Abgabe an den Coach. Workbook (inkl. Klick-Anleitung), To-dos, Zusammenfassung und Nachträge-Doc angelegt. Zur Abnahme: Freigabe Edis. Sprechzeit geschätzt, ca. 9 Min./Lektion (Richtwert 6). Offen: endgültige Lektionsnamen, Slogan (Vorschlag „Erst das Wasser. Dann der Gipfel.“), GF-Weg ja/nein, Edis-Geschichte „vom Schaufenster zum ersten Mitarbeiter im Vertrieb“ fürs 0er-Video.",
     "coach": "Peter Petridis",
     "sprech": {
      "lessons": 19,
      "words": 23840,
      "min": 170
     },
     "docs": [
      {
       "label": "Sprechtexte S-Weg (S1–S19)",
       "url": "https://claude.ai/code/artifact/7e13125a-86c1-43c6-8d78-05cc00a4f457",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook S-Weg",
       "url": "https://claude.ai/code/artifact/753545b8-6f61-452e-96fa-54932b16bf57",
       "typ": "workbook"
      },
      {
       "label": "To-dos S-Weg",
       "url": "https://claude.ai/code/artifact/f8b39e68-2492-4d07-9c92-6f87c42df041",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung S-Weg",
       "url": "https://claude.ai/code/artifact/cc562d70-e9d2-47da-8ce5-8b003cb78748",
       "typ": "zusammenfassung"
      },
      {
       "label": "Nachträge für andere Module",
       "url": "https://claude.ai/code/artifact/caf12936-7c30-4283-9494-4178f17965c4",
       "typ": "arbeit"
      }
     ]
    }
   }
  },
  {
   "nr": "31",
   "name": "SEO",
   "title": "Erst gefunden, dann gefragt – SEO für deinen Betrieb",
   "slogan": "Wer sucht, soll dich finden.",
   "bereich": "Paket Webseite & SEO",
   "paket": "Paket Webseite & SEO",
   "coach": "Peter Petridis",
   "src": "Board „SEO-Ground-Truth“ (7 Kapitel, 35 Schritte) · eigenes Modul (06.10.) · Google-Profil/Bewertungen → Telefon S10/GF3 (hier Verweis) · Hauptstelle hier: Suchabsicht, Keyword-Recherche (Google Ads verweist), mobile Webseite und Ladezeit · Upsell-Brücken zu Webseite und Online-Marketing (in beide Richtungen) · Board gilt: passende Anfragen statt Seite 1",
   "faden": "abgenommen",
   "video0": {
    "status": "offen"
   },
   "zip": {
    "name": "Erst gefunden dann gefragt (SEO) - Paket zur Pruefung 2026-10-06.zip",
    "stand": "06.10.",
    "coach": "Peter Petridis"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 0,
    "einspielerAnzahl": 0
   },
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "in Arbeit",
      "offen",
      "offen"
     ],
     "ls": 7,
     "lf": 14,
     "rw": "V6",
     "note": "S1–S14 freigegeben (06.10.), ca. 87 Min. Abschlussprüfung V6 bestanden (06.10.): alle 35 Board-Schritte als Aufgaben-Herkunft belegt, keine Platz-Garantie, keine Edis-Geschichte (nichts gelb). Upsell-Brücken zu Webseite und Online-Marketing (S2, S4, S8, S10–S12, große Brücke S14). Workbook S-Weg als Entwurf (06.10.): Wörterbuch, 4 Klick-Anleitungen, Vorlagen S1–S14, zur Freigabe. To-dos und Zusammenfassung angelegt (06.10.), zur Freigabe. Fehlt: Freigabe Workbook/To-dos/Zusammenfassung, Freigabe Edis.",
     "coach": "Peter Petridis",
     "sprech": {
      "lessons": 14,
      "words": 12212,
      "min": 87
     },
     "docs": [
      {
       "label": "Sprechtexte S-Weg",
       "url": "https://claude.ai/code/artifact/d795b7c8-1f3b-4de3-b764-7bec8da7ebd0"
      },
      {
       "label": "Workbook S-Weg (Entwurf)",
       "url": "https://claude.ai/code/artifact/d721731b-e162-4483-a537-2ef4fc113184",
       "typ": "workbook"
      },
      {
       "label": "To-dos S-Weg",
       "url": "https://claude.ai/code/artifact/bc6a7827-8166-409d-b214-a0a32b5d72e6",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung S-Weg",
       "url": "https://claude.ai/code/artifact/dc14641e-299c-40b5-b87b-c32f8a470db2",
       "typ": "zusammenfassung"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "in Arbeit",
      "offen",
      "offen"
     ],
     "lf": 5,
     "rw": "V6",
     "note": "GF1–GF5 freigegeben (06.10.), GF5 = Abschluss über alle Ebenen inkl. Unternehmer-Blick (kein eigener U-Weg). Fachwörter in GF1/GF2 und S5, S9, S11, S12, S14 einfach erklärt. Abschlussprüfung V6 bestanden. Modul gesamt 19 Lektionen, ca. 122 Min. Workbook GF-Weg als Entwurf (06.10.): Vorlagen GF1–GF5; sieht zusätzlich das S-Workbook. Zur Freigabe. To-dos und Zusammenfassung angelegt (06.10.), zur Freigabe. Fehlt: Freigabe Workbook/To-dos/Zusammenfassung, Freigabe Edis.",
     "coach": "Peter Petridis",
     "sprech": {
      "lessons": 5,
      "words": 4900,
      "min": 35
     },
     "docs": [
      {
       "label": "Sprechtexte GF-Weg",
       "url": "https://claude.ai/code/artifact/6294d057-b930-446c-ab27-7055f058fbba"
      },
      {
       "label": "Workbook GF-Weg (Entwurf)",
       "url": "https://claude.ai/code/artifact/e86398b5-1490-408c-b3e5-183051396ee7",
       "typ": "workbook"
      },
      {
       "label": "To-dos GF-Weg",
       "url": "https://claude.ai/code/artifact/f2349005-d33b-4677-ad55-f5da1df86d92",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung GF-Weg",
       "url": "https://claude.ai/code/artifact/b943d4ee-2bc8-4569-a6b3-340a86ed4e05",
       "typ": "zusammenfassung"
      }
     ]
    }
   }
  },
  {
   "nr": "34",
   "name": "KI",
   "bereich": "KLIM-Weg",
   "coach": "Peter Petridis",
   "faden": "offen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 0,
    "einspielerAnzahl": 0
   },
   "wege": {
    "S": {
     "steps": [
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen"
     ],
     "ls": 17,
     "coach": "Peter Petridis"
    }
   }
  },
  {
   "nr": "19",
   "name": "Avatar",
   "title": "Der Kundenmagnet – Der Mensch, der deine Sprache spricht",
   "slogan": "Treffen statt streuen.",
   "bereich": "Wirbelsäule",
   "coach": "Dino Sejdinovic",
   "src": "Board „Der Avatar“ (Kundenmagnet · Idealer Kunde · Testimonials · Zielgruppenkompetenz, 48 Schritte) · Hauptstelle für Testimonials (Online Marketing + Webseite verweisen) und Zielgruppenkompetenz (EVE verweist) · Spezialisierung/Grundbedürfnisse → Positionierung · sieben Stufen → Treppe · Preis → Angebotsmagie · Bewertungen → Telefon (siehe „KLIM Avatar – Nachträge für andere Module“) · Phase 2 freigegeben 06.10.: S 20 / GF 3 / U 2",
   "faden": "abgenommen",
   "video0": {
    "status": "offen"
   },
   "zip": {
    "name": "Der Kundenmagnet (Avatar) - Paket zur Pruefung 2026-10-06.zip",
    "stand": "06.10.",
    "coach": "Dino Sejdinovic"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach + Edis-Einspieler",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 6,
    "einspielerAnzahl": 5
   },
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "in Arbeit",
      "offen",
      "offen"
     ],
     "ls": 15,
     "lf": 15,
     "rw": "1.2",
     "note": "15.10.: Übergänge zur Positionierung: Brücke Janas Vitrine → Oliver und Wechsel der Leitfrage (L1), Streichen von Menschengruppen statt Aufträgen (L3), Kernproblem neben den Problemsatz legen (L5), Abschnitt „Zurück zu deinem Satz“: nach dem Avatar zurück zur Positionierung und den Positionssatz mit Kundenworten schärfen (L15, Pfeil „schärfen“ auf den Vier Stationen); Preis-Szenen in L2/L7 ersetzt, Spiegel L1 neu. PDF neu. · 15.10.: Flipchart neu: Der Mensch wächst Lektion für Lektion (Schultern, Gesicht, Ohren, Herz, Mund, Füße, Hände …), dazu Erklär-Tafeln zu jedem Inhalt; PDF mit allen Tafeln neu. · 15.10.: S-Weg Neufassung fertig (15 Lektionen). Lektor-Checkliste und Ebenen-Bewertung durchlaufen (Note 8, nach Änderungen 9; Prüfbericht und Änderungsprotokoll im Doc, Änderungen gelb). PDF angehängt, alter S-Weg im Doc als ersetzt markiert. Workbook und EDI entstehen aus dem Sprechtext. · 15.10.: Neufassung mit Skill „klim-sprechtexte“ läuft (Reiter 2 im Sprechtexte-Doc): 15 statt 20 Lektionen, Bildwelt „Mit seinen Augen“, Leitgeschichte Doug Dietz (Kinder-MRT), Figur Oliver mit Hundeschule, Leitfrage „Würde er sagen: Das bin ja ich?“, Nachträge aus der Positionierung eingebaut. L1–L12 freigegeben, L13–L15 geschrieben, zur Freigabe. Danach Lektor-Checkliste und PDF. Bis zur Freigabe der Neufassung gilt die alte Fassung. · S1–S20 freigegeben (06.10.), Abschlussprüfung V6 bestanden (06.10.). Edis gelb in S1, S5, S15, S20. Abschlusspaket (Workbook, To-dos, Zusammenfassung) angelegt 06.10., zur Freigabe. Danach: Freigabe Edis. · 08.10.: Coach Dino Sejdinovic (spricht ein und leitet den Stammtisch in Monat 2 zusammen mit der Positionierung).",
     "coach": "Dino Sejdinovic",
     "lektor": "15.10.",
     "sprech": {
      "lessons": 15,
      "words": 20725,
      "min": 143
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/code/artifact/6c32c09d-1ec1-411c-b4d5-d61b46ff8833",
       "typ": "sprechtexte"
      },
      {
       "label": "Bestandsaufnahme",
       "url": "https://claude.ai/code/artifact/dd2532e9-ffcb-4016-94e4-5f24c18afeda"
      },
      {
       "label": "Sortierung S-GF-U (Phase 2)",
       "url": "https://claude.ai/code/artifact/6528159d-ed17-440c-a11c-1b773b8168da"
      },
      {
       "label": "Workbook S-Weg",
       "url": "https://claude.ai/code/artifact/527c8b68-87e0-4ac4-b4f5-dd6ba3fb7276",
       "typ": "workbook"
      },
      {
       "label": "To-dos S-Weg",
       "url": "https://claude.ai/code/artifact/c6c641c8-129e-46cb-a4e3-9b4b157d98a9",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung S-Weg",
       "url": "https://claude.ai/code/artifact/73a8eb72-3708-4598-81c3-1d6caafb2539",
       "typ": "zusammenfassung"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "in Arbeit",
      "offen",
      "offen"
     ],
     "ls": 3,
     "lf": 3,
     "rw": "V6",
     "note": "GF1–GF3 freigegeben (06.10.), Abschlussprüfung V6 bestanden. Edis gelb in GF1 (Stellvertreter-Geschichte – prüfen, ob sie anderswo schon Hauptgeschichte ist). Sprechzeit geschätzt. Abschlusspaket (Workbook, To-dos, Zusammenfassung) angelegt 06.10., zur Freigabe. Danach: Freigabe Edis.",
     "coach": "Dino Sejdinovic",
     "sprech": {
      "lessons": 3,
      "words": 2270,
      "min": 16
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/code/artifact/a0e12e54-d581-49b3-8b11-ab5a251e8daf",
       "typ": "sprechtexte"
      },
      {
       "label": "Bestandsaufnahme",
       "url": "https://claude.ai/code/artifact/dd2532e9-ffcb-4016-94e4-5f24c18afeda"
      },
      {
       "label": "Sortierung S-GF-U (Phase 2)",
       "url": "https://claude.ai/code/artifact/6528159d-ed17-440c-a11c-1b773b8168da"
      },
      {
       "label": "Workbook GF-Weg",
       "url": "https://claude.ai/code/artifact/47774e1c-6a29-405c-b4b3-70ff504997d1",
       "typ": "workbook"
      },
      {
       "label": "To-dos GF-Weg",
       "url": "https://claude.ai/code/artifact/67e92fde-f9db-45eb-95cc-9654d3e98581",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung GF-Weg",
       "url": "https://claude.ai/code/artifact/4ab83abf-335a-4d64-ab0f-1721690a9162",
       "typ": "zusammenfassung"
      }
     ]
    },
    "U": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "in Arbeit",
      "offen",
      "offen"
     ],
     "ls": 2,
     "lf": 2,
     "rw": "V6",
     "note": "U1–U2 freigegeben (06.10.), U2 = Abschluss über alle Ebenen mit Abschluss-Check aus B19 (Entscheidung 06.10.). Abschlussprüfung V6 bestanden. Modul gesamt 25 Lektionen, ca. 130 min (S gezählt, GF/U geschätzt). Abschlusspaket (Workbook, To-dos, Zusammenfassung) angelegt 06.10., zur Freigabe. Danach: Freigabe Edis.",
     "coach": "Dino Sejdinovic",
     "sprech": {
      "lessons": 2,
      "words": 1470,
      "min": 11
     },
     "docs": [
      {
       "label": "Sprechtexte",
       "url": "https://claude.ai/code/artifact/4593218a-f159-4113-8f3e-34b41dabf55b",
       "typ": "sprechtexte"
      },
      {
       "label": "Bestandsaufnahme",
       "url": "https://claude.ai/code/artifact/dd2532e9-ffcb-4016-94e4-5f24c18afeda"
      },
      {
       "label": "Sortierung S-GF-U (Phase 2)",
       "url": "https://claude.ai/code/artifact/6528159d-ed17-440c-a11c-1b773b8168da"
      },
      {
       "label": "Workbook U-Weg",
       "url": "https://claude.ai/code/artifact/18c17ed1-bf20-4bdc-8bbf-d7aa740f9dd8",
       "typ": "workbook"
      },
      {
       "label": "To-dos U-Weg",
       "url": "https://claude.ai/code/artifact/27a8b671-305c-4f0d-9cf8-3fbb8845f19c",
       "typ": "todos"
      },
      {
       "label": "Zusammenfassung U-Weg",
       "url": "https://claude.ai/code/artifact/50790383-86bd-4817-b4ed-1fb91ee6f8f8",
       "typ": "zusammenfassung"
      }
     ]
    }
   }
  },
  {
   "nr": "28",
   "name": "Partnergewinnung",
   "title": "Wo deine Kunden schon zuhören",
   "slogan": "Vertrauen leihen statt Reichweite kaufen.",
   "bereich": "KLIM-Weg",
   "coach": "Simon Maugg",
   "src": "Kein eigenes Board: Kooperations-Paket aus dem Board „Online Marketing“ (Teiche, Wachstumsmotor, Kooperationsstrategie, Partnerstrategie, Co-Registrierung, Titelanker – 56 Schritte) · Fremdprodukt-Start und Partnerprogramm bleiben in Angebotsmagie U2 (Vorschlag) · „Verkaufen durch Vorträge“ (MV L28) → neues Modul „Webinar und Vortrag“ (10.10.) · Dopplung: „Wie Zusammenarbeit dein System auf ein neues Niveau hebt“ steht wortgleich auch im Board „Ein Team aufbauen, das mitdenkt“ (L9) – Hauptstelle hier (10.10.)",
   "faden": "offen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 0,
    "einspielerAnzahl": 0
   },
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "ls": 8,
     "lf": 8,
     "rw": "V7 + 1.2",
     "note": "Sortierung freigegeben 10.10. (S 8 / GF 10 / U 6). S1–S8 freigegeben 10.10. (S1/S2: Angler fragt den anderen Angler = Partner, eingebaut). Leitgeschichten: See und Teich, Lena die Hochzeitsfotografin; Nutella/Deutsche Bahn (S5) und Zitat Zig Ziglar (S6) vor Abgabe mit Quelle prüfen. Edis-Geschichte See/Teich (Board A2, wohl Haftnotiz „künstlicher See“) in Sammlung fürs 0er-Video. Phase-4-Prüfung 10.10. bestanden: Aufbau vollständig, Slogan am Ende jeder Lektion, keine Edis-Geschichten, keine Verbote (Stell dir vor, Erinnerst du dich, Bau-Begriffe, Wochentage), Lena höchstens zweimal pro Lektion, Nutella/Bahn belegt. Workbook angelegt 10.10. Fehlt: Freigabe Edis.",
     "coach": "Simon Maugg",
     "sprech": {
      "lessons": 8,
      "words": 7212,
      "min": 52
     },
     "docs": [
      {
       "label": "Sprechtexte S-Weg (S1–S8)",
       "url": "https://claude.ai/artifact/CQxMVfX8V7g2Tf88yM3WCA",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook S-Weg",
       "url": "https://claude.ai/artifact/NypKe7zkMfDq9jXyy1pVEL",
       "typ": "workbook"
      }
     ]
    },
    "GF": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "ls": 10,
     "lf": 10,
     "rw": "V7 + 1.2",
     "note": "Sortierung freigegeben 10.10.: GF1–GF10 (u. a. GF6 „Schwarz auf weiß, bevor es losgeht“ = Vereinbarung + Kampagne vorbereiten, B11). Haftnotiz „zu KLIM-lastig, Seminare/Bücher“ (A6/A7) hier branchenneutral umsetzen. GF1–GF10 freigegeben 10.10. Leitgeschichten weitererzählt: Teich (Fangbuch GF2, Jahreszeiten GF9, Pflege GF10), Lenas Studio mit Team (Juwelier, Brautmodengeschäft). Phase-4-Prüfung 10.10. bestanden: Aufbau vollständig, Slogan am Ende jeder Lektion, keine Edis-Geschichten, keine Verbote (Stell dir vor, Erinnerst du dich, Bau-Begriffe, Wochentage), Lena höchstens zweimal pro Lektion, Nutella/Bahn belegt. Workbook angelegt 10.10. Fehlt: Freigabe Edis.",
     "coach": "Simon Maugg",
     "sprech": {
      "lessons": 10,
      "words": 8101,
      "min": 58
     },
     "docs": [
      {
       "label": "Sprechtexte GF-Weg (GF1–GF10)",
       "url": "https://claude.ai/artifact/U4P7GrPZzbNUmxRQreyAQt",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook GF-Weg",
       "url": "https://claude.ai/artifact/44Ya9Hh1Xc9EAwpMWCZbFN",
       "typ": "workbook"
      }
     ]
    },
    "U": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen"
     ],
     "ls": 6,
     "lf": 6,
     "rw": "V7 + 1.2",
     "note": "Sortierung freigegeben 10.10.: U1 Einstiegstor, U2 Premium-Zielgruppen, U3 Veranstaltungen mit Partnern, U4 Co-Registrierung, U5 Titelanker, U6 Abschluss über alle Ebenen. U1–U6 geschrieben 10.10., warten auf Freigabe. U3 enthält Meisterhaft verkaufen L28 S10 (Räume mit Partnern füllen). U6 Abschluss über alle Ebenen + Abschluss des Moduls (Upsell: Ein Raum voller Kunden, Das Telefon klingelt nicht von allein). U6: Aufgabe offen (Board-Abschlüsse ohne Aufgabe). Lena-Beispiel ausgedünnt in allen drei Wegen (10.10.): nur noch S3/S6/S8, GF1/GF4/GF7/GF10, U1/U3/U6, Name höchstens zweimal pro Lektion (vorher 82-mal in 22 Lektionen); übrige Lektionen mit Beispielen aus anderen Branchen. U1 an Produktpalette angepasst (10.10.): Einstiegstor = meist Türöffner, nicht das Einstiegsprodukt – nur kurz eingeordnet, keine ausführliche Treppen-Erklärung (Wunsch: keine Widersprüche, nicht zu detailliert). Phase-4-Prüfung 10.10. bestanden: Aufbau vollständig, Slogan am Ende jeder Lektion, keine Edis-Geschichten, keine Verbote (Stell dir vor, Erinnerst du dich, Bau-Begriffe, Wochentage), Lena höchstens zweimal pro Lektion, Nutella/Bahn belegt. Workbook angelegt 10.10. Fehlt: Freigabe Edis. U6-Aufgabe: Partner-Fahrplan (Vorschlag Claude, gewählt 10.10.; keine Board-Aufgabe, Freigabe Edis nötig).",
     "coach": "Simon Maugg",
     "sprech": {
      "lessons": 6,
      "words": 5240,
      "min": 37
     },
     "docs": [
      {
       "label": "Sprechtexte U-Weg (U1–U6)",
       "url": "https://claude.ai/artifact/1Tph2GeujxSCS1SDgy3zJT",
       "typ": "sprechtexte"
      },
      {
       "label": "Workbook U-Weg",
       "url": "https://claude.ai/artifact/XxMf51ba4c7DEe6owxLCtJ",
       "typ": "workbook"
      }
     ]
    }
   }
  },
  {
   "nr": "41",
   "name": "Webinar und Vortrag",
   "title": "Ein Raum voller Kunden – Verkaufen mit Webinar und Vortrag",
   "slogan": "Einer spricht. Viele entscheiden.",
   "bereich": "KLIM-Weg",
   "src": "Neu (10.10.) · Interne Lektionen „Das Webinar als Verkaufsgespräch“ (30 Schritte + Abschluss) · Meisterhaft verkaufen „Verkaufen durch Vorträge“ (MV L28, 12 Schritte + Abschluss; vorher an Partnergewinnung) · Angebotsmagie-Board Schritt 14 „Webinare einsetzen“ (dort entfallen) · Bestandsaufnahme freigegeben 10.10. (goldene Gliederung = Hauptstelle Ablauf, V11-Zusatzpunkte eingebaut) · Sortierung 10.10.: ganzes Modul im S-Weg (21 Lektionen), kein GF/U · Name und Slogan Arbeitstitel/Vorschlag",
   "faden": "offen",
   "bereichHinweis": "Vorschlag: Paket Verkauf (noch nicht bestätigt)",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 0,
    "einspielerAnzahl": 0
   },
   "wege": {
    "S": {
     "steps": [
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "fertig",
      "offen",
      "offen",
      "offen"
     ],
     "ls": 21,
     "lf": 21,
     "rw": "V7 + 1.2",
     "note": "S-Weg S1–S21 freigegeben (10.10.). Phase-4-Prüfung 10.10. bestanden: Aufbau vollständig (Versprechen, Spiegel, Hauptgeschichte, Hauptlehre, Hauptnutzen, Aufgabe, Leitplanke, Slogan), Aufgaben aus dem Original, keine Edis-Geschichten, keine Verbote (Stell dir vor, Erinnerst du dich, Bau-Begriffe, Wochentage/Uhrzeiten), Spiegel ohne „Vielleicht“-Einstieg, Workbook-Hinweis in jeder Aufgabe, Brücken blau, Produktpalette-Abgleich. Fehlt: Workbook, Freigabe Edis, Coach. Leitgeschichten: Sandra die Hörakustikerin, Der Flug, Hundert Stühle. Edis-Geschichte Webagentur in Sammlung fürs 0er-Video.",
     "sprech": {
      "lessons": 21,
      "words": 16076,
      "min": 115
     },
     "docs": [
      {
       "label": "Sprechtexte S-Weg (S1–S21)",
       "url": "https://claude.ai/artifact/DKgEoPMNuydqfTtWdKhkaQ",
       "typ": "sprechtexte"
      }
     ]
    }
   }
  },
  {
   "nr": "38",
   "name": "Buch",
   "title": "Buchmodul",
   "bereich": "KLIM-Weg",
   "faden": "offen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 0,
    "einspielerAnzahl": 0
   },
   "wege": {
    "GF": {
     "steps": [
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen"
     ],
     "ls": 48
    }
   }
  },
  {
   "nr": "20",
   "name": "Google Ads",
   "bereich": "KLIM-Weg",
   "coach": "Peter Petridis",
   "faden": "offen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 0,
    "einspielerAnzahl": 0
   },
   "wege": {
    "GF": {
     "steps": [
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen"
     ],
     "ls": 26,
     "coach": "Peter Petridis"
    }
   }
  },
  {
   "nr": "22",
   "name": "Trello I und II",
   "bereich": "KLIM-Weg",
   "coach": "Peter Petridis",
   "faden": "offen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 0,
    "einspielerAnzahl": 0
   },
   "wege": {
    "GF": {
     "steps": [
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen"
     ],
     "ls": 64,
     "coach": "Peter Petridis"
    }
   }
  },
  {
   "nr": "16",
   "name": "HubSpot",
   "bereich": "KLIM-Weg",
   "coach": "Peter Petridis",
   "faden": "offen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 0,
    "einspielerAnzahl": 0
   },
   "wege": {
    "GF": {
     "steps": [
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen"
     ],
     "ls": 7,
     "coach": "Peter Petridis"
    }
   }
  },
  {
   "nr": "17",
   "name": "Canva",
   "bereich": "KLIM-Weg",
   "coach": "Peter Petridis",
   "faden": "offen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 0,
    "einspielerAnzahl": 0
   },
   "wege": {
    "GF": {
     "steps": [
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen"
     ],
     "ls": 7,
     "coach": "Peter Petridis"
    }
   }
  },
  {
   "nr": "39",
   "name": "Onboarding",
   "title": "Onboarding – Einstieg",
   "bereich": "Wirbelsäule",
   "coach": "Alan Jahic",
   "faden": "offen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 0,
    "einspielerAnzahl": 0
   },
   "wege": {
    "S": {
     "steps": [
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen"
     ],
     "ls": 1,
     "coach": "Alan Jahic"
    }
   }
  },
  {
   "nr": "2",
   "name": "Meister Boost",
   "bereich": "KLIM-Weg",
   "coach": "Simon Maugg",
   "src": "Software für Handwerksbetriebe – später eigener Weg",
   "faden": "offen",
   "video0": {
    "status": "offen"
   },
   "webinar": {
    "status": "geplant",
    "stand": "10.10.",
    "optionen": [
     {
      "name": "Ein Auftrag, null Zettel",
      "inhalt": "Gesamtüberblick: ein Auftrag von Thomas Huber läuft komplett durch Meister Boost"
     },
     {
      "name": "Das Angebot, das mehr verkauft",
      "inhalt": "Angebote erstellen mit Upselling"
     },
     {
      "name": "Der Verkäufer, der nie vergisst",
      "inhalt": "Automatisierter Verkauf per E-Mail, fasst von allein nach"
     },
     {
      "name": "Vergeben statt selber machen",
      "inhalt": "Vergabe"
     },
     {
      "name": "Die Baustelle im Griff",
      "inhalt": "Prozesse einer Baustelle führen"
     },
     {
      "name": "Ziele, die man sieht",
      "inhalt": "Eigene Ziele messen – aus dem Zeitmodul, angepasst auf den Betrieb"
     },
     {
      "name": "Dein Betrieb in 5 und 10 Jahren",
      "inhalt": "5- und 10-Jahresplan"
     }
    ],
    "punkte": [
     "Angebote erstellen mit Upselling",
     "Automatisierter Verkauf per E-Mail (fasst von allein nach)",
     "Vergabe",
     "Prozesse einer Baustelle führen",
     "Eigene Ziele messen – aus dem Zeitmodul, angepasst auf den Betrieb",
     "5- und 10-Jahresplan"
    ],
    "note": "Ein Auftrag von Thomas Huber läuft komplett durch Meister Boost: Angebot mit Upselling → automatisierter Verkauf per E-Mail → Vergabe und Baustellenprozess → Ziele messen (aus dem Zeitmodul) → 5- und 10-Jahresplan. Keine Software-Demo, nur zeigen, was live fertig läuft. Zwei Einsätze: Neukunden (Einladung Betriebs-Check) und Coaching-Kunden Monat 5–6 (Einladung Abo Meister Boost mit Edi). Schwerpunkt je Weg: S Angebot, E-Mail-Verkauf, Ziele · GF Vergabe, Baustelle, Team · U Kennzahlen, 5-/10-Jahresplan, mehrere Nutzer. Details auf Seite ④."
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 0,
    "einspielerAnzahl": 0
   },
   "wege": {
    "S": {
     "steps": [
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen"
     ],
     "note": "Kein Lektionsbestand im Board.",
     "coach": "Simon Maugg"
    }
   }
  },
  {
   "nr": "18",
   "name": "Tiktok",
   "bereich": "KLIM-Weg",
   "coach": "Peter Petridis",
   "faden": "offen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 0,
    "einspielerAnzahl": 0
   },
   "wege": {
    "S": {
     "steps": [
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen"
     ],
     "note": "Kein Lektionsbestand im Board.",
     "coach": "Peter Petridis"
    }
   }
  },
  {
   "nr": "21",
   "name": "Fitness",
   "bereich": "KLIM-Weg",
   "faden": "offen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 0,
    "einspielerAnzahl": 0
   },
   "wege": {
    "S": {
     "steps": [
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen"
     ],
     "note": "Kein Lektionsbestand im Board."
    }
   }
  },
  {
   "nr": "23",
   "name": "Zapier",
   "bereich": "KLIM-Weg",
   "coach": "Peter Petridis",
   "faden": "offen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 0,
    "einspielerAnzahl": 0
   },
   "wege": {
    "GF": {
     "steps": [
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen"
     ],
     "note": "Kein Lektionsbestand im Board.",
     "coach": "Peter Petridis"
    }
   }
  },
  {
   "nr": "24",
   "name": "IT",
   "bereich": "KLIM-Weg",
   "coach": "Peter Petridis",
   "faden": "offen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 0,
    "einspielerAnzahl": 0
   },
   "wege": {
    "GF": {
     "steps": [
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen"
     ],
     "note": "Kein Lektionsbestand im Board.",
     "coach": "Peter Petridis"
    }
   }
  },
  {
   "nr": "25",
   "name": "Videosoftware",
   "bereich": "KLIM-Weg",
   "coach": "Peter Petridis",
   "faden": "offen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 0,
    "einspielerAnzahl": 0
   },
   "wege": {
    "S": {
     "steps": [
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen"
     ],
     "note": "Kein Lektionsbestand im Board.",
     "coach": "Peter Petridis"
    }
   }
  },
  {
   "nr": "26",
   "name": "AI-Software",
   "bereich": "KLIM-Weg",
   "coach": "Peter Petridis",
   "faden": "offen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 0,
    "einspielerAnzahl": 0
   },
   "wege": {
    "S": {
     "steps": [
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen"
     ],
     "note": "Kein Lektionsbestand im Board.",
     "coach": "Peter Petridis"
    }
   }
  },
  {
   "nr": "27",
   "name": "AI-Ads",
   "bereich": "KLIM-Weg",
   "coach": "Peter Petridis",
   "faden": "offen",
   "video0": {
    "status": "offen"
   },
   "prod": {
    "logo": {
     "status": "offen"
    },
    "intro": {
     "status": "offen"
    },
    "outro": {
     "status": "offen"
    },
    "preis": "",
    "animation": {
     "status": "offen"
    }
   },
   "sprecher": {
    "art": "Coach",
    "edis0": true,
    "hinweis": "",
    "einspielerMin": 0,
    "einspielerAnzahl": 0
   },
   "wege": {
    "GF": {
     "steps": [
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen",
      "offen"
     ],
     "note": "Kein Lektionsbestand im Board.",
     "coach": "Peter Petridis"
    }
   }
  }
 ]
}
