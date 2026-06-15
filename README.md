# Agent Desk Dashboard Blank

Oeffentliche Blanko-Version der Agent-Desk-Oberflaeche. Die Vorlage nutzt die echten Dashboard-Grundlagen fuer Shell, Fonts, Theme-Tokens, Sidebar, Split View, Karten, Sticky-Unterseiten und Seitenraster. Inhalte, Runtime, Backend, E-Mail, Kundendaten, produktive Jobs und API-Keys sind nicht enthalten.

Die zentrale Anleitung liegt in `DESIGN.md`. Dort stehen Einrichtung, Seitenaufbau, Themes, Icons, Cards, Chat-Verhalten, Split View und die Regeln fuer eine spaetere Anbindung an einen neuen lokalen Agenten.

## Schnellstart

```bash
git clone https://github.com/geckozentrale/agent-desk-dashboard-blank.git
cd agent-desk-dashboard-blank
npm install
npm run dev
```

Pruefbarer Build:

```bash
npm run build
```

## Enthalten

- echte Agent-Desk-Shell mit linker Sticky-Navigation, Verlaufsspalte, Theme-Schalter und einklappbarer Sidebar
- Pastel V2 als Standard, plus Light und Dark
- Dashboard mit Tagesdeck, Kartenraster, lokaler Kachel-Sortierung, Entfernen und Zuruecksetzen
- Chat-Seite mit lokalem Composer, Verlauf, Prozess- und Tool-Nachrichten
- Kontrolle, Dokumentation, Workflows, Logbuch, Ziele & Ideen und Website Tracking als neutrale Seitenaufbauten
- Designsystem-Seite mit Pastellfarben, Icon-Namen, Card-Mustern und Layoutvorgaben
- keine Live-Verbindungen, keine Secrets, keine echten Daten
