# Agent Desk Dashboard Blank, Aufbau, Design und Einrichtung

Diese Datei ist die zentrale Beschreibung der Blanko-Vorlage. Das Repo enthaelt eine entkernte Agent-Desk-Oberflaeche mit echten Design-Grundlagen, aber ohne produktive Inhalte und ohne Runtime.

Die Vorlage ist fuer ein neues lokales Agent-Setup gedacht. Sie zeigt, wie die Oberflaeche aussieht, wie die Seiten aufgebaut sind und welche Grundfunktionen vorgesehen sind. Alles Fachliche ist neutral gehalten.

## Schnellstart

Voraussetzung ist Node.js mit npm.

```bash
git clone https://github.com/geckozentrale/agent-desk-dashboard-blank.git
cd agent-desk-dashboard-blank
npm install
npm run dev
```

Fuer einen Build:

```bash
npm run build
```

Fuer eine lokale Build-Vorschau:

```bash
npm run preview
```

Die App braucht keine Datenbank, keinen lokalen Dienst, keinen API-Key und keine Umgebungsvariable. Die Datei `.env.example` ist absichtlich leer.

## Sicherheitsgrenze

Nicht enthalten sind:

- echte Kundendaten
- echte E-Mail-Adressen
- echte Website-Domains
- Tokens oder Secrets
- Backend-Clients
- Runtime- oder Websocket-Verbindungen
- produktive Cronjobs
- echte Kampagnen, Leads, Mailboxen oder Logbuecher
- interne Pfade oder Runbooks

Alles, was klickbar wirkt, bleibt lokal im Browser. Ein spaeteres echtes Dashboard sollte neue Verbindungen ueber klar getrennte Adapter einbauen, nicht direkt in die Seitenkomponenten.

## Repo-Struktur

- `src/App.tsx`: neutrale Demo-App mit Shell, Navigation, Seiten, Split View, Theme-Wechsel und lokalen Demo-Funktionen
- `src/main.tsx`: React-Einstieg und zentrale CSS-Imports
- `src/styles/`: echte Theme-Tokens, Fonts, Shell- und Basis-Styles
- `src/features/*/*.css`: echte Seiten-CSS-Grundlagen fuer Dashboard, Kontrolle, Doku, Workflows, Logbuch, Ziele und Website
- `src/components/icons/AppIcon.tsx`: Icon-Abbildung auf lucide-react
- `src/blank.css`: kleine Zusatzschicht fuer neutrale Platzhalterkarten
- `public/fonts/`: lokale Fonts, damit Schriftbild und Abstaende stabil bleiben
- `README.md`: kurzer Einstieg
- `DESIGN.md`: diese vollstaendige Beschreibung

## Technische Basis

Die Vorlage nutzt React, Vite, TypeScript und lucide-react. Es gibt bewusst keinen Backend-Client und keinen Router-Zwang. Die aktive Seite wird lokal im Browserzustand gehalten. Kleine Demo-Zustaende wie Theme, aktive Seite und Dashboard-Kachelreihenfolge werden in localStorage gespeichert.

## Shell

Die Shell entspricht dem Agent-Desk-Muster:

- linke feste Sidebar
- Logo-/Markenbereich oben
- Umschalter zwischen Navigation und Verlauf
- Hauptnavigation mit Arbeitsseiten
- Systemblock fuer Kontrolle, Dokumentation, Workflows, Logbuch und Designsystem
- unten Sidebar-Schalter, Theme-Schalter und Split-Schalter
- mobile Kopfzeile mit Menuebutton

Die Sidebar kann eingeklappt werden. Im eingeklappten Zustand bleiben die Icons sichtbar, Texte verschwinden.

## Themes

Es gibt drei Modi:

- Light: warmer heller Arbeitsmodus
- Dark: klassischer dunkler Modus
- Charcoal: Pastel V2 und Standardmodus

Pastel V2 ist matt, grau und ruhig. Es nutzt helle Linien, weiche Flaechen und Pastellakzente. Die wichtigsten Tokens liegen in `src/styles/tokens.css`.

Pastellfarben:

- Blush: #f4c2c2
- Mint: #c2e8d6
- Lavender: #d8c4e6
- Butter: #f3e0a8
- Sky: #c4ddee
- Peach: #f5d2b8
- Sage: #cfdcb6
- Rose: #ecc4d0
- Brand: #49a5a2

Der Theme-Schalter sitzt unten in der Sidebar. Die Tastenkombination Ctrl oder Cmd + Shift + T wechselt den Modus.

## Icons

Icons kommen aus lucide-react und laufen ueber `AppIcon.tsx`. Dadurch bleiben Strichstaerke und Benennung einheitlich.

Wichtige Seitensymbole:

- Dashboard: focus
- Chat: chat
- Kalender: calendar
- Ziele & Ideen: target
- Kunden: users
- Immobilien: home
- Website: globe
- Social Media: share
- Baufi: fileText
- Kontrolle: activity
- Dokumentation: bookOpen
- Workflows: listChecks
- Logbuch: shieldCheck
- Designsystem: palette

Die Designsystem-Seite zeigt diese Icons und die Pastellfarben sichtbar in der App.

## Seiten

Die Vorlage enthaelt die volle Seitenstruktur als neutrale Blanko-Version.

Dashboard:

- Hero-Zeile
- Statuschips
- Tagesdeck
- Kartenraster
- lokale Kachel-Sortierung per Drag and Drop
- Karten entfernen
- Layout zuruecksetzen
- schwebender Composer am unteren Rand

Chat:

- lokale Nachrichtenliste
- Nutzer-, Agent-, Prozess- und Tool-Nachrichten
- Eingabeleiste mit Anhang-Icon und Senden-Button
- kein API-Call, kein Websocket, keine echte Agent-Runtime

Kontrolle:

- Betriebsseite mit linker Sticky-Unterseiten-Navigation
- Statuskarten fuer Runtime, Cronjobs, Freigaben und Logs
- nur Platzhalter, keine echten Jobs

Dokumentation:

- zweispaltiger Aufbau
- Sticky-Inhaltsnavigation links
- lange Textabschnitte rechts
- neutrale Anleitung ohne interne Details

Workflows:

- linke Workflow-Auswahl
- rechte Detailflaeche
- Pipeline-Karten fuer Eingang, Analyse, Freigabe und Ausgabe
- Freigabeprinzip sichtbar, aber ohne echte Aktion

Logbuch:

- Kopfbereich
- Suche und Filter
- gruppierte Timeline
- neutrale Beispielereignisse

Ziele & Ideen:

- Kopfbereich
- Sticky-Umschalter
- Kanban-Muster mit drei Spalten
- neutrale Ideenkarten

Website Tracking:

- Sticky-Kopf mit Zeitraumsteuerung
- Tab-Leiste
- Kennzahlenkarten
- keine echte Domain und keine Analytics-Anbindung

Designsystem:

- Pastell-Swatches
- Icon-Palette
- Standardkarte
- Pastellkarte

Weitere Arbeitsseiten wie Kalender, Kunden, Immobilien, Social Media und Baufi sind als neutrale Unterseiten mit dem echten Seitenrahmen angelegt. Sie dienen als Platzhalter fuer spaetere Fachmodule.

## Cards

Cards sind die wichtigste Arbeitseinheit. Sie nutzen:

- kleine bis mittlere Radien
- klare, helle Linien
- wenig Schatten
- kurze Titel
- optionales Icon
- knappe Beschreibung
- Werte, Listen oder Leerzustand

Pastell ist Signal, nicht Hintergrundtapete. Eine Karte oder ein Icon darf Pastell tragen, eine ganze Seite soll nicht in einer einzigen Pastellfarbe liegen.

## Split View

Die Split View zeigt zwei Seiten nebeneinander. Sie nutzt die echte Split-Shell mit zweiter Seitenleiste im Pane. Gedacht ist sie fuer Arbeitspaare wie Kontrolle und Dokumentation, Workflow und Logbuch oder Website und Ziele.

Der Split-Schalter sitzt unten in der Sidebar. Ctrl oder Cmd + Y schaltet die Split View ebenfalls um.

## Lokale Speicherung

Gespeichert werden nur harmlose UI-Zustaende:

- Theme
- aktive Seite
- Reihenfolge der Dashboard-Karten

Es werden keine Nachrichten an Server gesendet und keine externen Daten geladen.

## Neue lokale Agent-Anbindung

Wenn aus der Vorlage ein neues echtes lokales Agent-Dashboard werden soll:

1. UI unveraendert starten und erst testen.
2. Einen separaten Adapter fuer Runtime, Speicher oder Agent-API anlegen.
3. Seiten weiter mit Leerzustaenden betreiben, wenn der Adapter offline ist.
4. Aktionen mit Aussenwirkung zuerst als Freigabe modellieren.
5. Keine Secrets in Komponenten oder Dokumentation schreiben.

Die Vorlage ist absichtlich so gebaut, dass man zuerst das Aussehen und die Bedienlogik sauber uebernehmen kann, bevor echte Daten angeschlossen werden.
