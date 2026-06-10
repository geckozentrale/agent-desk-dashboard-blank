# Design- und Aufbau-Beschreibung

Diese Vorlage beschreibt das Dashboard als leeres Produktmuster. Die Struktur ist an einem operativen Agent-Desk-Dashboard ausgerichtet, bleibt aber bewusst ohne reale Daten, Kundennamen, Mailboxen, Tokens oder produktive Automationen.

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
- Dokumentation
- Workflows
- Logbuch
- Ziele & Ideen
- Website Tracking

Das echte Muster sieht Systemseiten wie Kontrolle, Dokumentation, Workflows und Logbuch als zusammenhaengenden Block. Cronjobs sind dabei kein eigener Navigationspunkt, sondern ein Reiter innerhalb der Kontrollseite.

Auf kleinen Bildschirmen wird die Sidebar durch ein Drawer-Menue ersetzt.

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
- es gibt keine Verbindung zu OpenAI, einem Backend, Websocket, Memory, E-Mail oder anderen Diensten

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

Die Blanko-Version zeigt neutrale Nullwerte und eine Demo-Chartform, damit Aufbau und Verhalten sichtbar sind. Es gibt keine Verbindung zu Analytics, Supabase, Vercel oder anderen Diensten.

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

## Sicherheitsprinzip fuer die Blanko-Version

Diese Vorlage darf oeffentlich sein, weil sie keine produktiven Informationen enthaelt.

Ausdruecklich nicht enthalten:

- echte Kundendaten
- echte E-Mail-Adressen
- echte Website-Domains aus Projekten
- Tokens
- Secrets
- Ports und interne Pfade
- produktive API-Endpunkte
- konkrete Runbooks
- alte Chat- oder Logbuchinhalte

Wenn aus dieser Vorlage spaeter wieder ein echtes Dashboard wird, sollten echte Daten nur ueber klar getrennte Adapter eingebunden werden. Die UI sollte weiterhin mit Leerzustaenden funktionieren, wenn kein Backend vorhanden ist.
