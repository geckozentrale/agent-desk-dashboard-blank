# Agent Desk Dashboard Blank, Design, Aufbau und Einrichtung

Diese Datei ist die zentrale Beschreibung fuer das oeffentliche Blanko-Repo. Sie erklaert Design, Seitenaufbau, Grundfunktionen, lokale Einrichtung und die Regeln fuer eine spaetere Nutzung mit einem neuen lokalen Agenten.

Die Vorlage ist ein leeres Produktmuster. Die Struktur ist an einem operativen Agent-Desk-Dashboard ausgerichtet, bleibt aber bewusst ohne reale Daten, Kundennamen, Mailboxen, Tokens, interne Pfade, Runtime-Anschluesse oder produktive Automationen.

## Schnellstart fuer ein neues lokales Setup

Voraussetzung ist ein Rechner mit Node.js und npm. Die Vorlage braucht keine Datenbank, keinen lokalen Dienst und keine API-Schluessel.

```bash
git clone https://github.com/geckozentrale/agent-desk-dashboard-blank.git
cd agent-desk-dashboard-blank
npm install
npm run dev
```

Danach zeigt Vite im Terminal eine lokale Adresse. Diese Adresse im Browser oeffnen. Fuer einen Produktions-Build:

```bash
npm run build
```

Zum lokalen Vorabtest des Builds:

```bash
npm run preview
```

Die Vorlage kann direkt als Ausgangspunkt fuer einen neuen lokalen Agenten genutzt werden. Dafuer zuerst das Design und die Seiten so lassen, dann schrittweise eigene Adapter anlegen. Adapter sind die spaeteren Verbindungsstellen zu einem Backend, einer Agent-Runtime, Speicher, E-Mail oder Analytics. In diesem Repo sind solche Adapter absichtlich nicht vorhanden.

## Repo-Inhalt

Die Vorlage ist bewusst klein gehalten.

- `src/App.tsx`: komplette Demo-App mit Navigation, Seiten, lokalen Demo-Funktionen und Theme-Schalter
- `src/styles.css`: alle Farben, Layouts, Cards, Sticky-Navigation, responsive Regeln und Theme-Tokens
- `src/main.tsx`: React-Einstieg
- `README.md`: kurzer Einstieg
- `DESIGN.md`: diese vollstaendige Hauptdokumentation
- `package.json`: Scripts und Abhaengigkeiten
- `.env.example`: bewusst leere Vorlage, weil die Blanko-Version keine Secrets braucht

Nicht im Repo enthalten sind produktive Inhalte, Umgebungsvariablen, Servercode, Worker, Cronjobs, Proxy-Regeln, Datenbankzugriffe und API-Clients.

## Technische Basis

Das Projekt nutzt React, Vite, TypeScript und lucide-react. Lucide liefert die Linien-Icons. Es gibt keine State-Management-Bibliothek und keinen Router. Die Seiten werden lokal in einer einzigen App-Datei ueber einen Seitenzustand gewechselt. Das macht die Vorlage leicht lesbar und einfach kopierbar.

Demo-Daten werden nur im Browser gespeichert, ueber localStorage. Das betrifft Kachelreihenfolge, Theme, lokale Notizen, Aufgaben, Ideen, Ziele und den Demo-Chatverlauf. Wenn localStorage blockiert ist, bleibt die App trotzdem nutzbar, nur ohne dauerhafte Demo-Speicherung.

## Sicherheitsgrenzen der Blanko-Version

Die Vorlage ist oeffentlich geeignet, weil sie keine produktiven Verbindungen enthaelt.

Ausdruecklich nicht enthalten:

- echte Kundendaten
- echte E-Mail-Adressen
- echte Website-Domains aus Projekten
- Tokens
- Secrets
- interne Ports und interne Pfade
- produktive API-Endpunkte
- Proxy-Konfigurationen
- konkrete Runbooks
- alte Chat- oder Logbuchinhalte
- produktive Background-Jobs
- echte Agent-Runtime
- KI-, E-Mail-, Analytics-, Datenbank- oder Memory-Anbindung

Wenn aus dieser Vorlage spaeter wieder ein echtes Dashboard wird, sollten echte Daten nur ueber klar getrennte Adapter eingebunden werden. Die UI soll auch dann weiter mit Leerzustaenden funktionieren, wenn kein Backend erreichbar ist.

## Grundidee

Das Dashboard ist kein Marketing-Screen, sondern eine Arbeitsoberflaeche. Der erste Eindruck soll ruhig, dicht und wiederholt nutzbar sein. Nutzer sollen schnell sehen, was heute wichtig ist, welche Bereiche offen sind und wo Entscheidungen anstehen.

Die Oberflaeche besteht aus drei festen Ebenen:

1. Shell mit linker Navigation
2. Kopfzeile mit Seitentitel, Theme und globalem Zustand
3. Seitenbereich mit der jeweiligen Fachansicht

Zusatzfunktion: Eine Split View kann zwei Dashboard-Seiten nebeneinander anzeigen. Das ist fuer Situationen gedacht, in denen man zum Beispiel Kontrolle und Dokumentation oder Workflow und Logbuch parallel offen halten will.

## Theme Pastel V2

Pastel V2 ist ein dunkles, mattes Charcoal-Theme. Der Hintergrund ist nicht schwarz, sondern mittelgrau bis anthrazit. Flaechen liegen leicht heller darauf. Linien bleiben sichtbar, aber zurueckhaltend.

Farbprinzip:

- Grund: charcoal/grau
- Text: hellgrau statt rein weiss
- Linien: mittelgrau mit wenig Kontrast
- Akzent: petrol/mint fuer aktive oder positive Zustaende
- Pastellkarten: mint, sky, rose, butter, peach und lavender

Pastellfarben werden sparsam eingesetzt. Sie markieren Status, aktive Tabs, Kennzahlen, Freigabezonen oder kleine Markierungen. Die App soll nicht bunt wirken, sondern ruhig mit klaren Signalen.

Die Vorlage enthaelt drei Themes:

- Light: warmer heller Sandton
- Dark: klassisches dunkles Braun/Schwarz
- Charcoal: Pastel V2 und Standard

Der Theme-Schalter liegt unten in der Sidebar. Per Tastatur ist Ctrl + Shift + T vorgesehen.

Das Light Theme ist nicht nur ein Fallback, sondern ein eigener Modus fuer helle Arbeitsumgebungen. Es nutzt warme helle Flaechen, dunklen Text, weiche Linien und dieselben Pastell-Akzente wie Pastel V2. Dadurch bleiben Aufbau, Abstaende und Bedienlogik gleich, nur die Helligkeit aendert sich.

## Navigation

Die linke Navigation ist die Hauptstruktur des Dashboards. Sie nutzt Icon, Titel und kurzen Hinweistext pro Seite.

Seiten in dieser Blanko-Version:

- Dashboard
- Chat
- Kontrolle
- Designsystem
- Dokumentation
- Workflows
- Logbuch
- Ziele & Ideen
- Website Tracking

Das echte Muster sieht Systemseiten wie Kontrolle, Dokumentation, Workflows und Logbuch als zusammenhaengenden Block. Cronjobs sind dabei kein eigener Navigationspunkt, sondern ein Reiter innerhalb der Kontrollseite.

Auf kleinen Bildschirmen wird die Sidebar durch ein Drawer-Menue ersetzt.

## Icons und Pastellfarben

Das Repo enthaelt die Icon-Vorgaben direkt in der Oberflaeche auf der Designsystem-Seite. Die Vorlage nutzt Lucide-Icons mit ruhigem, duennem Strich und kleinen Icon-Kacheln. Die Icons sind keine dekorativen Bilder, sondern dienen der Wiedererkennung von Bereichen und Aktionen.

Haupticons:

- Dashboard: LayoutDashboard
- Chat: MessageSquare
- Kontrolle: Activity
- Dokumentation: BookOpen
- Workflows: ListChecks
- Logbuch: ShieldCheck
- Ziele & Ideen: Target
- Website Tracking: Globe

Die Pastellfarben liegen als CSS-Tokens vor und sind auf der Designsystem-Seite sichtbar:

- Mint: #c2e8d6
- Sky: #c4ddee
- Rose: #ecc4d0
- Butter: #f3e0a8
- Peach: #f5d2b8
- Lavender: #d8c4e6
- Sage: #cfdcb6
- Brand: #49a5a2

Die Regel: Ein Icon oder eine Karte darf einen Pastellakzent tragen, aber eine ganze Seite soll nicht vollflaechig in einer Pastellfarbe liegen. Pastell ist Signal, nicht Hintergrundtapete.

## Cards und zweite Seitennavigation

Karten sind die wiederkehrenden Arbeitseinheiten des Dashboards. Sie haben klare Linien, kleine Radien, wenig Schatten und kurze Inhalte. Eine Karte soll scannbar bleiben: Titel, optionales Icon, kurze Beschreibung, dann Werte, Liste oder Leerzustand.

Card-Muster:

- KPI-Karte fuer Kennzahlen
- Arbeitskarte fuer Aufgaben, Signale oder Status
- Freigabezone fuer menschliche Entscheidungen
- Leerzustand fuer noch nicht verbundene Bereiche

Unterseiten mit vielen Kategorien nutzen eine zweite Seitennavigation links im Inhaltsbereich. Diese Navigation ist sticky, bleibt also beim Scrollen sichtbar. Das Muster wird auf Kontrolle, Workflows und der Designsystem-Seite gezeigt. Es trennt Hauptnavigation und Seitenunterbereiche sauber voneinander.

## Kopfzeile

Die Kopfzeile zeigt:

- aktuelles Theme beziehungsweise Designsystem
- Seitentitel
- globale Statuschips
- auf Mobilgeraeten den Menuebutton

In der Blanko-Version stehen die Statuschips auf "Blanko" und "Keine Live-Daten". In einer produktiven App koennen dort Runtime, Verbindung, Speicherstatus oder Warnungen erscheinen.

## Dashboard-Seite

Die Startseite ist ein Tagesdeck. Sie ist fuer schnelle Orientierung gebaut.

Aufbau:

- Hero-Leiste mit kurzem Kontext
- Aktionsbereich zum Fixieren oder Zuruecksetzen der Anordnung
- Plus-Leiste fuer optionale Kacheln
- Kachelraster

Kacheln:

- Heute
- Signale
- Freigaben
- Website
- Notizen
- Aufgaben

Funktionen:

- Kacheln per Drag and Drop sortieren
- Kacheln entfernen
- entfernte Kacheln wieder hinzufuegen
- Layout fixieren
- Layout zuruecksetzen
- Notizen und Aufgaben lokal speichern

Die produktive Idee dahinter: Das Dashboard zeigt keine Rohdatenflut, sondern nur verdichtete Signale, die eine Aktion oder einen Blick wert sind.

## Chat

Die Chat-Seite zeigt das zentrale Arbeitsmuster fuer Unterhaltungen mit einem Agenten, ohne eine echte Runtime zu verbinden.

Aufbau:

- linke Kontextspalte mit Beschreibung, Prozessanzeige und Freigabehinweis
- rechte Chatflaeche mit Verlauf
- Eingabeleiste mit Anhang-Platzhalter, Textfeld und Senden-Button
- Reset-Aktion zum lokalen Leeren des Demo-Verlaufs

Verhalten:

- Nachrichten werden lokal im Browser gespeichert
- Antworten werden als simuliertes Streaming schrittweise eingeblendet
- waehrend des Antwortens zeigt die Prozessanzeige den laufenden Zustand
- der Composer sperrt weiteres Senden, solange die Demo-Antwort laeuft
- es gibt keine Verbindung zu einem KI-Anbieter, Backend, Websocket, Memory, E-Mail oder anderen Diensten

Die sichtbare Prozessanzeige ist fuer echte Zwischenstaende gedacht: Kontext sammeln, pruefen, schreiben, Freigaben erkennen. In dieser Vorlage ist sie rein visuell. Die Freigabezone macht klar, dass Aktionen mit Aussenwirkung spaeter nicht automatisch passieren sollen.

## Kontrollseite

Die Kontrollseite ist die Betriebsseite. Sie sammelt technische und organisatorische Zustandsbereiche an einem Ort.

Reiter:

- Heartbeats
- Cronjobs
- Waechter
- Skills
- Plugins
- Verbindungen

Funktionen:

- linker Reiterwechsel
- rechte Detailflaeche pro Kategorie
- Tabellenmuster fuer Status, naechsten Lauf und Hinweise
- Leerzustaende ohne echte Jobs

Wichtige Strukturregel: Cronjobs gehoeren in diese Seite und nicht als extra Sidebar-Tab in die Hauptnavigation.

## Dokumentation

Die Dokumentationsseite ist eine interne Handbuchseite innerhalb der App. Sie erklaert Struktur, Designregeln, Seiten und typische Betriebslogik, ohne dass Nutzer extern suchen muessen.

In der Blanko-Version beschreibt sie:

- Design
- Designsystem
- Shell
- Dashboard
- Kontrolle
- Website Tracking
- Workflows
- Logbuch
- Ziele & Ideen

Produktiv kann diese Seite Architektur, Runbooks und Betriebsregeln enthalten. Fuer ein oeffentliches Repo muss sie neutral bleiben und darf keine Pfade, Secrets, Konten oder Kundendetails nennen.

## Workflows

Die Workflow-Seite ist die Schaltzentrale fuer automatisierte oder halbautomatische Ablaeufe.

Aufbau:

- links Workflow-Auswahl
- rechts Detailansicht
- Pipeline-Stufen
- Freigabezone

Blanko-Workflows:

- E-Mail
- Dokumente
- Leads

Pipeline:

1. Eingang
2. Erkennung
3. Pruefung
4. Aktion
5. Archiv

Die Freigabezone ist bewusst sichtbar. Alles, was verbindlich nach aussen wirkt oder Daten veraendert, sollte hier eine menschliche Entscheidung verlangen.

## Logbuch

Das Logbuch ist der nachvollziehbare Verlauf der App. Es ist nicht als Chatverlauf gedacht, sondern als Audit-Ansicht.

Aufbau:

- Einleitung
- Suche
- Timeline
- Aktion, Bereich und Kurzbeschreibung pro Zeile

Funktionen:

- Suche ueber Aktion, Bereich und Text
- neutrale Demo-Eintraege
- Leerzustand bei fehlenden Treffern

Produktiv sollten sensible Quellen oder laute Hintergrundereignisse gezielt ausgeblendet werden, damit das Logbuch lesbar bleibt.

## Ziele & Ideen

Diese Seite verbindet schnelle Ideensammlung mit Zielplanung.

Aufbau:

- Umschalter Ideen / Ziele
- Composer fuer neue Eintraege
- Ideenliste mit Status
- Zielboard mit Horizonten und Fortschritt

Ideenstatus:

- Offen
- Naechster Schritt
- Geparkt
- Erledigt

Zielhorizonte:

- Diese Woche
- Dieser Monat
- Quartal
- Langfristig

In der Blanko-Version werden Eintraege lokal im Browser gespeichert. Es gibt keinen Server und keine Synchronisierung.

## Website Tracking

Die Website-Seite ist fuer verdichtete Analytics gebaut. Sie zeigt nicht jedes Event einzeln, sondern Kennzahlen und Trends.

Aufbau:

- Kopfbereich mit Zeitraumwahl
- KPI-Karten
- Verlauf
- Funnel-Liste
- Top-Seiten
- Kampagnen

KPI-Muster:

- Seitenaufrufe
- Sessions
- Besucher
- Leads
- Conversion
- Events

Die Blanko-Version zeigt neutrale Nullwerte und eine Demo-Chartform, damit Aufbau und Verhalten sichtbar sind. Es gibt keine Verbindung zu Analytics, Hosting-Plattformen, Datenbanken oder anderen Diensten.

## Interaktionsmuster

Die App nutzt wiederkehrende Muster:

- Icons fuer Navigation und Aktionen
- Tabs/Reiter fuer Unterbereiche
- Selects fuer Zeitraum oder Status
- Chips fuer globale Zustaende
- Chat-Composer mit lokalem Verlauf und simuliertem Streaming
- Karten fuer einzelne wiederholbare Einheiten
- Tabellenartige Listen fuer Betriebsdaten
- leere Zustaende statt Fehlermeldungsrauschen
- lokale Speicherung nur fuer einfache Demo-Daten

## Design-Tokens und wiederverwendbare Bausteine

Die wichtigsten Designvorgaben liegen als CSS-Variablen am Anfang von `src/styles.css`. Dadurch kann ein neues Dashboard die Optik uebernehmen, ohne alle Komponenten neu zu erfinden.

Zentrale Token-Gruppen:

- Grundflaechen: `--bg`, `--surface`, `--surface-2`, `--surface-3`
- Linien: `--border`, `--border-strong`
- Text: `--text-1`, `--text-2`, `--text-3`
- Akzent: `--accent`, `--accent-soft`
- Pastellfarben: `--pastel-mint`, `--pastel-sky`, `--pastel-rose`, `--pastel-butter`, `--pastel-peach`, `--pastel-lavender`, `--pastel-sage`
- Radien: `--radius-sm`, `--radius-md`, `--radius-lg`
- Schatten: `--shadow`

Wiederverwendbare Klassen:

- `app-shell` fuer die Gesamtschale mit linker Navigation
- `sidebar` fuer die feste Hauptnavigation
- `topbar` fuer die obere Kopfzeile
- `page-wrap` fuer normale Seiteninhalte
- `two-column-page` fuer Seiten mit zweiter Navigation
- `section-nav` fuer die sticky Unterseitennavigation
- `content-panel` fuer die rechte Detailflaeche
- `dashboard-card` fuer Arbeitskarten
- `metric` und `metric-grid` fuer Kennzahlen
- `approval-zone` fuer sichtbare Freigaben
- `empty-state` fuer neutrale Leerzustaende
- `chat-surface`, `chat-thread`, `chat-composer` fuer das Chat-Muster

## Einbau eines neuen lokalen Agenten

Die Vorlage kann fuer einen neuen lokalen Agenten genutzt werden, indem die UI zuerst unveraendert bleibt und echte Daten nur hinter klaren Schnittstellen ergaenzt werden.

Empfohlene Reihenfolge:

1. Repo klonen und lokal starten.
2. Namen, Logo und neutrale Texte anpassen.
3. Seiten pruefen und nicht benoetigte Bereiche entfernen.
4. Erst danach Adapter fuer lokale Runtime, Speicher oder Dienste anlegen.
5. Jeder Adapter liefert Daten in einfache UI-Modelle, zum Beispiel Statuszeilen, Chat-Nachrichten, Logbuchzeilen oder KPI-Werte.
6. Jede Seite behaelt Leerzustaende, falls der Adapter fehlt oder nicht erreichbar ist.
7. Aktionen mit Aussenwirkung laufen ueber eine Freigabezone, nicht direkt ueber einen versteckten Klick.

Wichtig: Die UI-Komponenten sollen nicht selbst wissen, woher produktive Daten kommen. Eine echte Anbindung sollte ausserhalb der Seitenlogik gekapselt werden. So bleibt die Blanko-Version sauber und die spaetere produktive Version leichter wartbar.

## Typische Stellen fuer spaetere Adapter

Diese Datei beschreibt nur die Zielstellen. In der Vorlage sind sie nicht umgesetzt.

- Chat: Adapter fuer lokale Agent-Runtime, Streaming und Prozessmeldungen
- Kontrolle: Adapter fuer Heartbeats, geplante Jobs, Waechter, Skills, Plugins und Verbindungsstatus
- Workflows: Adapter fuer Pipeline-Zustaende, Freigaben und Aktionshistorie
- Logbuch: Adapter fuer Audit-Eintraege und Filter
- Ziele & Ideen: optionaler Speicheradapter statt Browser-Speicherung
- Website Tracking: Adapter fuer Kennzahlen, Funnel, Top-Seiten und Kampagnen

## Was beim Oeffentlichmachen geprueft wurde

Vor einem oeffentlichen Repo sollte die Vorlage immer gegen diese Liste laufen:

- keine echten Namen oder Projektbegriffe
- keine echten Mailboxen oder Domains
- keine Tokens, Secrets oder Umgebungsdateien
- keine internen Pfade
- keine Produktiv-Ports
- keine Proxy- oder Runtime-URLs
- keine alten Chatverlaeufe
- keine echten Logbuchzeilen
- keine echten Website-Kennzahlen
- keine Kundendaten

Diese Blanko-Version ist genau darauf ausgelegt: Sie zeigt Aufbau, Design und Verhalten, aber keine Inhalte und keine Anschluesse.
