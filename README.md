# Agent Desk Dashboard Blank

Oeffentliche Blanko-Version eines Agent-Desk-Dashboards. Das Repo zeigt Seitenaufbau, Designsystem und Grundfunktionen ohne echte Inhalte, Konten, Tokens, Kundendaten, E-Mail-Verbindungen, Runtime oder produktive Workflows.

Die vollstaendige Hauptdokumentation liegt in `DESIGN.md`. Dort stehen Einrichtung, Seitenbeschreibung, Card-Aufbau, Icon- und Farbvorgaben, Chat-Verhalten, lokale Demo-Speicherung, Split View und die Regeln fuer eine spaetere Anbindung an einen neuen lokalen Agenten.

## Schnellstart

```bash
git clone https://github.com/geckozentrale/agent-desk-dashboard-blank.git
cd agent-desk-dashboard-blank
npm install
npm run dev
```

Fuer einen pruefbaren Build:

```bash
npm run build
```

## Kurzueberblick

- React/Vite Dashboard-Shell mit linker Sticky-Navigation
- Pastel V2 als Standardtheme, plus Light und Dark
- Dashboard-Startseite mit sortierbaren Kacheln
- Chat-Seite mit Composer, lokalem Verlauf, Prozessanzeige und simuliertem Streaming
- Kontrollseite mit Reitern fuer Heartbeats, Cronjobs, Waechter, Skills, Plugins und Verbindungen
- Designsystem-Seite mit Icon-Set, Pastellfarben, Card-Mustern und Sticky-Seitennavigation
- Dokumentationsseite, Workflow-Zentrale, Logbuch, Ziele & Ideen und Website Tracking als neutrale Blanko-Seiten
- keine Backend-Aufrufe, keine API-Keys, keine Proxy-Konfiguration, keine produktiven Jobs
