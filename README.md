# Agent Desk Dashboard Blank

Eine oeffentliche Blanko-Version des Agent-Desk-Dashboards. Das Projekt zeigt Aufbau, Seitenlogik und Pastel-V2-Design ohne echte Inhalte, Konten, Tokens, Kundendaten, E-Mail-Verbindungen oder produktive Workflows.

## Enthalten

- React/Vite Dashboard-Shell mit linker Navigation
- Pastel V2 als Standardtheme, plus Light und Dark
- Dashboard-Startseite mit sortierbaren Kacheln
- Chat-Seite mit Composer, lokalem Verlauf, Prozessanzeige und simuliertem Streaming
- Kontrollseite mit Reitern fuer Heartbeats, Cronjobs, Waechter, Skills, Plugins und Verbindungen
- Dokumentationsseite als neutrale Struktur- und Designbeschreibung
- Workflow-Zentrale mit Pipeline und Freigabezone
- Logbuch mit Suche und neutraler Demo-Zeitleiste
- Ziele & Ideen mit lokaler Speicherung im Browser
- Website-Tracking-Seite mit KPI-Karten, Verlauf und Listen als Blanko-Muster
- Split View fuer zwei parallele Dashboard-Seiten
- lokale Speicherung im Browser fuer Demo-Notizen, Aufgaben, Ideen, Ziele und Chatverlauf

## Nicht enthalten

- keine echten Seiteninhalte aus einem produktiven Dashboard
- keine Runtime- oder Backend-Verknuepfung
- keine E-Mail-Konten
- keine Kundendaten
- keine API-Keys oder Secrets
- keine Proxy-Konfiguration zu internen Diensten
- keine produktiven Background-Jobs

## Lokal starten

```bash
npm install
npm run dev
```

Danach Vite im Browser oeffnen. Fuer einen Production-Build:

```bash
npm run build
```

## Design

Die vollstaendige Beschreibung liegt in `DESIGN.md`.
