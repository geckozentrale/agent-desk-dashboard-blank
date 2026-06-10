import {
  Activity,
  Archive,
  BookOpen,
  Bot,
  CalendarClock,
  Check,
  ChevronDown,
  CircleDot,
  ClipboardList,
  Code2,
  Columns2,
  Database,
  FileText,
  Globe,
  GripVertical,
  LayoutDashboard,
  ListChecks,
  Lock,
  Mail,
  Menu,
  MessageSquare,
  Moon,
  Palette,
  Paperclip,
  Plus,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  Trash2,
  Unlock,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent } from 'react'

type ThemeMode = 'light' | 'dark' | 'charcoal'
type PageId = 'dashboard' | 'chat' | 'control' | 'docs' | 'workflows' | 'logbook' | 'ideas' | 'website'
type PanelId = 'today' | 'signals' | 'approvals' | 'website' | 'notes' | 'tasks'

type NavItem = {
  id: PageId
  title: string
  detail: string
  icon: LucideIcon
}

type PanelMeta = {
  id: PanelId
  title: string
  detail: string
  icon: LucideIcon
}

type Idea = {
  id: string
  title: string
  body: string
  status: 'Offen' | 'Naechster Schritt' | 'Geparkt' | 'Erledigt'
}

type Goal = {
  id: string
  title: string
  horizon: string
  progress: number
}

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  text: string
  state?: 'streaming' | 'done'
}

const navItems: NavItem[] = [
  { id: 'dashboard', title: 'Dashboard', detail: 'Tagesuebersicht', icon: LayoutDashboard },
  { id: 'chat', title: 'Chat', detail: 'Composer und Antworten', icon: MessageSquare },
  { id: 'control', title: 'Kontrolle', detail: 'Betrieb und Jobs', icon: Activity },
  { id: 'docs', title: 'Dokumentation', detail: 'Aufbau und Regeln', icon: BookOpen },
  { id: 'workflows', title: 'Workflows', detail: 'Ablaufsteuerung', icon: ListChecks },
  { id: 'logbook', title: 'Logbuch', detail: 'Nachweis und Verlauf', icon: ShieldCheck },
  { id: 'ideas', title: 'Ziele & Ideen', detail: 'Planung und Sammlung', icon: Target },
  { id: 'website', title: 'Website Tracking', detail: 'Signale und Funnel', icon: Globe },
]

const panelCatalog: PanelMeta[] = [
  { id: 'today', title: 'Heute', detail: 'Termine, Fristen, offene Punkte', icon: CalendarClock },
  { id: 'signals', title: 'Signale', detail: 'Neue Meldungen aus angeschlossenen Quellen', icon: CircleDot },
  { id: 'approvals', title: 'Freigaben', detail: 'Dinge, die eine menschliche Entscheidung brauchen', icon: ShieldCheck },
  { id: 'website', title: 'Website', detail: 'Schneller Blick auf Besucher und Leads', icon: Globe },
  { id: 'notes', title: 'Notizen', detail: 'Kleine lokale Merkzettel', icon: FileText },
  { id: 'tasks', title: 'Aufgaben', detail: 'Einfache To-do-Liste', icon: ClipboardList },
]

const defaultPanels: PanelId[] = ['today', 'signals', 'approvals', 'website']

const pageTitle: Record<PageId, string> = {
  dashboard: 'Dashboard',
  chat: 'Chat',
  control: 'Kontrolle',
  docs: 'Dokumentation',
  workflows: 'Workflows',
  logbook: 'Logbuch',
  ideas: 'Ziele & Ideen',
  website: 'Website Tracking',
}

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeStorage<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // The blank template keeps working even when browser storage is blocked.
  }
}

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random())
}

function App() {
  const [page, setPage] = useState<PageId>(() => readStorage('blank.page', 'dashboard'))
  const [theme, setTheme] = useState<ThemeMode>(() => readStorage('blank.theme', 'charcoal'))
  const [compact, setCompact] = useState(false)
  const [split, setSplit] = useState(false)
  const [secondaryPage, setSecondaryPage] = useState<PageId>('docs')
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    writeStorage('blank.theme', theme)
  }, [theme])

  useEffect(() => {
    writeStorage('blank.page', page)
  }, [page])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 't') {
        event.preventDefault()
        setTheme((current) => (current === 'light' ? 'dark' : current === 'dark' ? 'charcoal' : 'light'))
      }
      if (event.ctrlKey && event.key.toLowerCase() === 'y') {
        event.preventDefault()
        setSplit((current) => !current)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className={`app-shell${compact ? ' is-compact' : ''}`}>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">AD</div>
          <div>
            <strong>Agent Desk</strong>
            <span>Blank dashboard</span>
          </div>
        </div>

        <nav className="side-nav" aria-label="Hauptnavigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="side-nav__item"
              aria-current={page === item.id}
              onClick={() => setPage(item.id)}
            >
              <item.icon size={17} />
              <span>
                <strong>{item.title}</strong>
                <small>{item.detail}</small>
              </span>
            </button>
          ))}
        </nav>

        <div className="sidebar__tools">
          <button type="button" onClick={() => setCompact((value) => !value)} title="Sidebar umschalten">
            <Menu size={16} />
          </button>
          <ThemeButton theme={theme} onTheme={setTheme} />
          <button type="button" onClick={() => setSplit((value) => !value)} title="Split View">
            <Columns2 size={16} />
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <button type="button" className="mobile-menu" onClick={() => setDrawerOpen(true)}>
            <Menu size={18} />
          </button>
          <div>
            <span>Pastel V2</span>
            <h1>{pageTitle[page]}</h1>
          </div>
          <div className="topbar__actions">
            <StatusPill icon={Database} label="Blanko" tone="neutral" />
            <StatusPill icon={Check} label="Keine Live-Daten" tone="ok" />
          </div>
        </header>

        {split ? (
          <div className="split-layout">
            <section className="pane">
              <PaneHeader title={pageTitle[page]} onClose={() => setSplit(false)} />
              {renderPage(page)}
            </section>
            <section className="pane">
              <div className="pane-switcher">
                <select
                  value={secondaryPage}
                  onChange={(event) => setSecondaryPage(event.target.value as PageId)}
                  aria-label="Zweite Seite waehlen"
                >
                  {navItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
                <button type="button" onClick={() => setSplit(false)}>
                  <X size={15} />
                </button>
              </div>
              {renderPage(secondaryPage)}
            </section>
          </div>
        ) : (
          <div className="page-wrap">{renderPage(page)}</div>
        )}
      </main>

      {drawerOpen ? (
        <div className="drawer" role="dialog" aria-modal="true">
          <div className="drawer__panel">
            <button type="button" className="drawer__close" onClick={() => setDrawerOpen(false)}>
              <X size={17} />
            </button>
            <nav className="side-nav">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="side-nav__item"
                  aria-current={page === item.id}
                  onClick={() => {
                    setPage(item.id)
                    setDrawerOpen(false)
                  }}
                >
                  <item.icon size={17} />
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.detail}</small>
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function renderPage(page: PageId) {
  switch (page) {
    case 'chat':
      return <ChatPage />
    case 'control':
      return <ControlPage />
    case 'docs':
      return <DocsPage />
    case 'workflows':
      return <WorkflowsPage />
    case 'logbook':
      return <LogbookPage />
    case 'ideas':
      return <IdeasPage />
    case 'website':
      return <WebsitePage />
    default:
      return <DashboardPage />
  }
}

function ThemeButton({ theme, onTheme }: { theme: ThemeMode; onTheme: (theme: ThemeMode) => void }) {
  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Palette
  const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'charcoal' : 'light'
  return (
    <button type="button" onClick={() => onTheme(next)} title="Theme wechseln">
      <Icon size={16} />
    </button>
  )
}

function StatusPill({ icon: Icon, label, tone }: { icon: LucideIcon; label: string; tone: string }) {
  return (
    <span className="status-pill" data-tone={tone}>
      <Icon size={14} />
      {label}
    </span>
  )
}

function PaneHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="pane-header">
      <span>{title}</span>
      <button type="button" onClick={onClose}>
        <X size={15} />
      </button>
    </div>
  )
}

function DashboardPage() {
  const [panels, setPanels] = useState<PanelId[]>(() => readStorage('blank.panels', defaultPanels))
  const [locked, setLocked] = useState(false)
  const [notes, setNotes] = useState<string[]>(() => readStorage('blank.notes', []))
  const [tasks, setTasks] = useState<string[]>(() => readStorage('blank.tasks', []))
  const [noteDraft, setNoteDraft] = useState('')
  const [taskDraft, setTaskDraft] = useState('')
  const [dragged, setDragged] = useState<PanelId | null>(null)

  useEffect(() => writeStorage('blank.panels', panels), [panels])
  useEffect(() => writeStorage('blank.notes', notes), [notes])
  useEffect(() => writeStorage('blank.tasks', tasks), [tasks])

  const available = panelCatalog.filter((panel) => !panels.includes(panel.id))

  function addPanel(id: PanelId) {
    setPanels((current) => [...current, id])
  }

  function removePanel(id: PanelId) {
    setPanels((current) => current.filter((panel) => panel !== id))
  }

  function movePanel(target: PanelId) {
    if (!dragged || dragged === target || locked) return
    setPanels((current) => {
      const next = current.filter((id) => id !== dragged)
      const targetIndex = next.indexOf(target)
      next.splice(targetIndex, 0, dragged)
      return next
    })
  }

  return (
    <section className="dashboard-page">
      <div className="hero-strip">
        <div>
          <span>Blank workspace</span>
          <h2>Tagesdeck ohne Kundendaten.</h2>
          <p>
            Die Startseite sammelt operative Kacheln, lokale Notizen und optionale Signale. Alles in
            dieser Vorlage bleibt im Browser und verbindet sich mit keinem Konto.
          </p>
        </div>
        <div className="hero-actions">
          <button type="button" onClick={() => setLocked((value) => !value)}>
            {locked ? <Lock size={16} /> : <Unlock size={16} />}
            {locked ? 'Fixiert' : 'Frei sortierbar'}
          </button>
          <button type="button" onClick={() => setPanels(defaultPanels)}>
            <RefreshCw size={16} />
            Reset
          </button>
        </div>
      </div>

      <div className="add-row">
        {available.map((panel) => (
          <button key={panel.id} type="button" onClick={() => addPanel(panel.id)}>
            <Plus size={15} />
            {panel.title}
          </button>
        ))}
      </div>

      <div className="panel-grid">
        {panels.map((id) => {
          const meta = panelCatalog.find((panel) => panel.id === id)
          if (!meta) return null
          return (
            <article
              key={id}
              className="dashboard-card"
              draggable={!locked}
              onDragStart={() => setDragged(id)}
              onDragEnter={() => movePanel(id)}
              onDragEnd={() => setDragged(null)}
            >
              <header>
                <span>
                  <meta.icon size={18} />
                  {meta.title}
                </span>
                <div>
                  {!locked ? <GripVertical size={15} /> : null}
                  <button type="button" onClick={() => removePanel(id)} title="Kachel entfernen">
                    <X size={14} />
                  </button>
                </div>
              </header>
              <p>{meta.detail}</p>
              {renderPanelBody(id, {
                notes,
                tasks,
                noteDraft,
                taskDraft,
                setNoteDraft,
                setTaskDraft,
                setNotes,
                setTasks,
              })}
            </article>
          )
        })}
      </div>
    </section>
  )
}

function renderPanelBody(
  id: PanelId,
  state: {
    notes: string[]
    tasks: string[]
    noteDraft: string
    taskDraft: string
    setNoteDraft: (value: string) => void
    setTaskDraft: (value: string) => void
    setNotes: (updater: (items: string[]) => string[]) => void
    setTasks: (updater: (items: string[]) => string[]) => void
  },
) {
  if (id === 'website') {
    return (
      <div className="metric-grid">
        <Metric label="Besucher" value="0" />
        <Metric label="Leads" value="0" accent />
        <Metric label="Conversion" value="0%" />
      </div>
    )
  }

  if (id === 'notes') {
    return (
      <MiniList
        placeholder="Notiz schreiben"
        draft={state.noteDraft}
        items={state.notes}
        onDraft={state.setNoteDraft}
        onAdd={(value) => state.setNotes((items) => [value, ...items])}
        onRemove={(index) => state.setNotes((items) => items.filter((_, itemIndex) => itemIndex !== index))}
      />
    )
  }

  if (id === 'tasks') {
    return (
      <MiniList
        placeholder="Aufgabe schreiben"
        draft={state.taskDraft}
        items={state.tasks}
        onDraft={state.setTaskDraft}
        onAdd={(value) => state.setTasks((items) => [value, ...items])}
        onRemove={(index) => state.setTasks((items) => items.filter((_, itemIndex) => itemIndex !== index))}
      />
    )
  }

  return (
    <div className="empty-state">
      <Sparkles size={18} />
      <span>Leerzustand. Hier erscheinen spaeter echte Karten, wenn ein Backend angeschlossen wird.</span>
    </div>
  )
}

function MiniList(props: {
  placeholder: string
  draft: string
  items: string[]
  onDraft: (value: string) => void
  onAdd: (value: string) => void
  onRemove: (index: number) => void
}) {
  function submit(event: FormEvent) {
    event.preventDefault()
    const value = props.draft.trim()
    if (!value) return
    props.onAdd(value)
    props.onDraft('')
  }

  return (
    <div className="mini-list">
      <form onSubmit={submit}>
        <input value={props.draft} onChange={(event) => props.onDraft(event.target.value)} placeholder={props.placeholder} />
        <button type="submit">
          <Plus size={14} />
        </button>
      </form>
      {props.items.length ? (
        props.items.map((item, index) => (
          <div key={`${item}-${index}`} className="mini-row">
            <span>{item}</span>
            <button type="button" onClick={() => props.onRemove(index)}>
              <Trash2 size={13} />
            </button>
          </div>
        ))
      ) : (
        <div className="empty-state">Noch nichts eingetragen.</div>
      )}
    </div>
  )
}

function Metric({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="metric" data-accent={accent || undefined}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    readStorage('blank.chat', [
      {
        id: 'welcome',
        role: 'assistant',
        text:
          'Ich bin der lokale Blanko-Chat. Ich zeige Composer, Prozessanzeige, Streaming und Freigabehinweise, aber ich sende nichts an ein Backend.',
        state: 'done',
      },
    ]),
  )
  const [draft, setDraft] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const scroller = useRef<HTMLDivElement | null>(null)

  useEffect(() => writeStorage('blank.chat', messages), [messages])

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  function submit(event: FormEvent) {
    event.preventDefault()
    const value = draft.trim()
    if (!value || isStreaming) return

    const userMessage: ChatMessage = { id: uid(), role: 'user', text: value }
    const assistantId = uid()
    const response =
      'Verstanden. In der Blanko-Version wuerde der Chat jetzt eine Aufgabe klaeren, sichtbare Zwischenschritte zeigen und vor echten Aussenwirkungen eine Freigabe verlangen. Diese Antwort ist lokal simuliert.'

    setDraft('')
    setIsStreaming(true)
    setMessages((items) => [...items, userMessage, { id: assistantId, role: 'assistant', text: '', state: 'streaming' }])

    let index = 0
    const timer = window.setInterval(() => {
      index += 6
      setMessages((items) =>
        items.map((item) =>
          item.id === assistantId
            ? {
                ...item,
                text: response.slice(0, index),
                state: index >= response.length ? 'done' : 'streaming',
              }
            : item,
        ),
      )

      if (index >= response.length) {
        window.clearInterval(timer)
        setIsStreaming(false)
      }
    }, 42)
  }

  function resetChat() {
    setMessages([
      {
        id: uid(),
        role: 'assistant',
        text:
          'Chat zurueckgesetzt. Die Vorlage bleibt lokal und nutzt keine API. Du kannst das Verhalten weiter ausprobieren.',
        state: 'done',
      },
    ])
    setDraft('')
    setIsStreaming(false)
  }

  return (
    <section className="chat-page">
      <div className="chat-layout">
        <aside className="chat-rail">
          <SectionIntro
            eyebrow="Blanko-Chat"
            title="Chat-Verhalten ohne Runtime."
            text="Diese Seite bildet das Arbeitsgefuehl nach: Eingabe, Antwortfluss, Prozessblock, Status und Freigabehinweis."
          />
          <div className="process-card">
            <strong>Prozessanzeige</strong>
            <span className={isStreaming ? 'is-active' : ''}>{isStreaming ? 'Antwort laeuft' : 'Bereit'}</span>
            <ol>
              <li>Nachricht aufnehmen</li>
              <li>Kontext sichtbar sortieren</li>
              <li>Antwort streamen</li>
              <li>Freigabe pruefen</li>
            </ol>
          </div>
          <div className="approval-zone chat-approval">
            <ShieldCheck size={18} />
            <div>
              <strong>Keine Aussenwirkung</strong>
              <p>Der Blanko-Chat kann nichts senden, aendern oder ausloesen. Produktive Aktionen brauchen spaeter eine klare Freigabe.</p>
            </div>
          </div>
          <button type="button" className="reset-chat" onClick={resetChat}>
            <RefreshCw size={15} />
            Chat leeren
          </button>
        </aside>

        <div className="chat-surface">
          <div className="chat-thread" ref={scroller}>
            {messages.map((message) => (
              <article key={message.id} className="chat-message" data-role={message.role}>
                <div className="chat-avatar">{message.role === 'assistant' ? <Bot size={17} /> : 'Du'}</div>
                <div className="chat-bubble">
                  <p>{message.text || '...'}</p>
                  {message.state === 'streaming' ? <span className="typing-dot" aria-label="Antwort wird geschrieben" /> : null}
                </div>
              </article>
            ))}
          </div>

          <form className="chat-composer" onSubmit={submit}>
            <button type="button" title="Anhang Platzhalter">
              <Paperclip size={16} />
            </button>
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Nachricht schreiben"
              rows={2}
            />
            <button type="submit" disabled={isStreaming || !draft.trim()} title="Senden">
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

function ControlPage() {
  const [active, setActive] = useState('heartbeats')
  const categories = [
    { id: 'heartbeats', title: 'Heartbeats', icon: Activity, count: 0 },
    { id: 'cronjobs', title: 'Cronjobs', icon: CalendarClock, count: 0 },
    { id: 'watchers', title: 'Waechter', icon: ShieldCheck, count: 0 },
    { id: 'skills', title: 'Skills', icon: Code2, count: 0 },
    { id: 'plugins', title: 'Plugins', icon: Sparkles, count: 0 },
    { id: 'connections', title: 'Verbindungen', icon: Globe, count: 0 },
  ]

  return (
    <section className="two-column-page">
      <aside className="section-nav">
        {categories.map((item) => (
          <button key={item.id} type="button" aria-pressed={active === item.id} onClick={() => setActive(item.id)}>
            <item.icon size={17} />
            <span>{item.title}</span>
            <em>{item.count}</em>
          </button>
        ))}
      </aside>
      <div className="content-panel">
        <SectionIntro
          eyebrow="Kontrollseite"
          title={categories.find((item) => item.id === active)?.title ?? 'Kontrolle'}
          text="Alle Betriebsbereiche sitzen in einer Seite. Cronjobs sind ein Reiter innerhalb der Kontrolle und kein eigener Navigationspunkt."
        />
        <div className="table-card">
          <div className="table-head">
            <span>Name</span>
            <span>Status</span>
            <span>Naechster Lauf</span>
          </div>
          <BlankRow label="Keine Live-Jobs verbunden" />
          <BlankRow label="Backend-Adapter kann hier spaeter Daten liefern" />
        </div>
      </div>
    </section>
  )
}

function DocsPage() {
  const sections = [
    ['Design', 'Pastel V2 nutzt einen charcoal Grund, helle Schrift und Pastellfarben nur fuer Akzente, Status und wichtige Karten.'],
    ['Shell', 'Links steht die Navigation. Oben zeigt die Kopfzeile Seite, Zustand und globale Aktionen. Die Seitenflaeche bleibt ruhig und dicht.'],
    ['Dashboard', 'Die Startseite besteht aus frei sortierbaren Kacheln. Nutzer koennen Kacheln entfernen, hinzufuegen, fixieren und zuruecksetzen.'],
    ['Chat', 'Der Chat zeigt lokale Nachrichten, simuliertes Streaming, Prozessanzeige, Composer und Freigabehinweise ohne API-Verbindung.'],
    ['Kontrolle', 'Alle technischen Bereiche liegen in Reitern: Heartbeats, Cronjobs, Waechter, Skills, Plugins und Verbindungen.'],
    ['Website Tracking', 'Die Tracking-Seite ist fuer Kennzahlen, Verlauf, Funnel und Top-Listen gebaut. Diese Blanko-Version zeigt nur neutrale Demo-Werte.'],
    ['Workflows', 'Workflows folgen links der Auswahl und rechts einer Detailansicht mit Pipeline, Status und Freigabezone.'],
    ['Logbuch', 'Das Logbuch ist ein filterbarer Nachweis fuer Aktionen. Sensible Quellen koennen ausgeblendet werden.'],
    ['Ziele & Ideen', 'Eine Seite mit Umschalter zwischen Ideenliste und Zielplanung. Die Vorlage speichert Eintraege lokal im Browser.'],
  ]

  return (
    <section className="docs-page">
      <SectionIntro
        eyebrow="Blanko-Dokumentation"
        title="Aufbau, Design und Funktionen des Dashboards."
        text="Diese Dokumentation beschreibt die Struktur ohne Inhalte, Zugangsdaten, Kundendaten oder echte Automationen."
      />
      <div className="docs-list">
        {sections.map(([title, text]) => (
          <article key={title} className="doc-block">
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function WorkflowsPage() {
  const [active, setActive] = useState('email')
  const workflows = [
    { id: 'email', title: 'E-Mail', state: 'Vorlage', icon: Mail },
    { id: 'documents', title: 'Dokumente', state: 'Vorlage', icon: FileText },
    { id: 'leads', title: 'Leads', state: 'Vorlage', icon: Bot },
  ]

  return (
    <section className="two-column-page">
      <aside className="section-nav">
        {workflows.map((item) => (
          <button key={item.id} type="button" aria-pressed={active === item.id} onClick={() => setActive(item.id)}>
            <item.icon size={17} />
            <span>{item.title}</span>
            <em>{item.state}</em>
          </button>
        ))}
      </aside>
      <div className="content-panel">
        <SectionIntro
          eyebrow="Workflow-Zentrale"
          title={workflows.find((item) => item.id === active)?.title ?? 'Workflow'}
          text="Jeder Workflow bekommt links einen Eintrag und rechts Pipeline, Status, Freigaben und Verlauf."
        />
        <div className="pipeline">
          {['Eingang', 'Erkennung', 'Pruefung', 'Aktion', 'Archiv'].map((step, index) => (
            <article key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
              <p>Blanko-Stufe ohne Live-Anschluss.</p>
            </article>
          ))}
        </div>
        <div className="approval-zone">
          <ShieldCheck size={18} />
          <div>
            <strong>Freigabezone</strong>
            <p>Verbindliche Aktionen bleiben hier blockiert, bis ein Mensch sie freigibt.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function LogbookPage() {
  const [query, setQuery] = useState('')
  const rows = [
    { action: 'Angelegt', area: 'Idee', text: 'Beispielaktion ohne echten Inhalt' },
    { action: 'Geaendert', area: 'Dashboard', text: 'Kachelreihenfolge lokal angepasst' },
    { action: 'Gelesen', area: 'Website', text: 'Demo-Kennzahlen angezeigt' },
  ]
  const filtered = rows.filter((row) => `${row.action} ${row.area} ${row.text}`.toLowerCase().includes(query.toLowerCase()))

  return (
    <section className="logbook-page">
      <SectionIntro
        eyebrow="Nachweis"
        title="Filterbares Logbuch mit ruhiger Zeitleiste."
        text="In der echten App zeigt es dauerhaft gespeicherte Aktionen. Diese Vorlage nutzt nur neutrale Beispielzeilen."
      />
      <label className="searchbox">
        <Search size={15} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Logbuch durchsuchen" />
      </label>
      <div className="timeline">
        {filtered.map((row, index) => (
          <article key={`${row.action}-${index}`}>
            <span>{row.action}</span>
            <strong>{row.area}</strong>
            <p>{row.text}</p>
          </article>
        ))}
        {!filtered.length ? <div className="empty-state">Keine passenden Eintraege.</div> : null}
      </div>
    </section>
  )
}

function IdeasPage() {
  const [mode, setMode] = useState<'ideas' | 'goals'>('ideas')
  const [ideas, setIdeas] = useState<Idea[]>(() => readStorage('blank.ideas', []))
  const [goals, setGoals] = useState<Goal[]>(() => readStorage('blank.goals', []))
  const [draft, setDraft] = useState('')

  useEffect(() => writeStorage('blank.ideas', ideas), [ideas])
  useEffect(() => writeStorage('blank.goals', goals), [goals])

  function submit(event: FormEvent) {
    event.preventDefault()
    const value = draft.trim()
    if (!value) return
    if (mode === 'ideas') {
      setIdeas((items) => [{ id: uid(), title: value, body: '', status: 'Offen' }, ...items])
    } else {
      setGoals((items) => [{ id: uid(), title: value, horizon: 'Naechster Schritt', progress: 0 }, ...items])
    }
    setDraft('')
  }

  return (
    <section className="ideas-page">
      <div className="mode-switch" role="tablist" aria-label="Ansicht">
        <button type="button" aria-selected={mode === 'ideas'} onClick={() => setMode('ideas')}>
          <Sparkles size={15} />
          Ideen
        </button>
        <button type="button" aria-selected={mode === 'goals'} onClick={() => setMode('goals')}>
          <Target size={15} />
          Ziele
        </button>
      </div>
      <form className="composer" onSubmit={submit}>
        <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={mode === 'ideas' ? 'Neue Idee' : 'Neues Ziel'} />
        <button type="submit">
          <Plus size={16} />
          Hinzufuegen
        </button>
      </form>

      {mode === 'ideas' ? (
        <div className="idea-list">
          {ideas.map((idea) => (
            <article key={idea.id}>
              <strong>{idea.title}</strong>
              <select
                value={idea.status}
                onChange={(event) =>
                  setIdeas((items) =>
                    items.map((item) =>
                      item.id === idea.id ? { ...item, status: event.target.value as Idea['status'] } : item,
                    ),
                  )
                }
              >
                <option>Offen</option>
                <option>Naechster Schritt</option>
                <option>Geparkt</option>
                <option>Erledigt</option>
              </select>
            </article>
          ))}
          {!ideas.length ? <div className="empty-state">Noch keine Ideen.</div> : null}
        </div>
      ) : (
        <div className="goal-board">
          {['Diese Woche', 'Dieser Monat', 'Quartal', 'Langfristig'].map((horizon) => (
            <section key={horizon}>
              <h3>{horizon}</h3>
              {goals
                .filter((goal) => goal.horizon === horizon || (horizon === 'Diese Woche' && goal.horizon === 'Naechster Schritt'))
                .map((goal) => (
                  <article key={goal.id}>
                    <strong>{goal.title}</strong>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={goal.progress}
                      onChange={(event) =>
                        setGoals((items) =>
                          items.map((item) => (item.id === goal.id ? { ...item, progress: Number(event.target.value) } : item)),
                        )
                      }
                    />
                    <span>{goal.progress}%</span>
                  </article>
                ))}
            </section>
          ))}
        </div>
      )}
    </section>
  )
}

function WebsitePage() {
  const [range, setRange] = useState('30')
  const points = useMemo(() => [12, 18, 9, 24, 31, 16, 22, 27, 14, 20, 33, 26], [])
  const max = Math.max(...points)
  return (
    <section className="website-page">
      <div className="website-head">
        <SectionIntro
          eyebrow="Tracking"
          title="Website-Signale ohne Live-Anschluss."
          text="Die Seite ist fuer reale Analytics vorbereitet, zeigt hier aber nur neutrale Demo-Zahlen."
        />
        <select value={range} onChange={(event) => setRange(event.target.value)}>
          <option value="7">7 Tage</option>
          <option value="30">30 Tage</option>
          <option value="90">90 Tage</option>
        </select>
      </div>
      <div className="metric-grid metric-grid--wide">
        <Metric label="Seitenaufrufe" value="0" />
        <Metric label="Sessions" value="0" />
        <Metric label="Besucher" value="0" />
        <Metric label="Leads" value="0" accent />
        <Metric label="Conversion" value="0%" />
        <Metric label="Events" value="0" />
      </div>
      <div className="analytics-grid">
        <article className="chart-card">
          <h3>Verlauf</h3>
          <div className="bar-chart">
            {points.map((value, index) => (
              <span key={index} style={{ '--bar-height': `${Math.round((value / max) * 100)}%` } as CSSProperties} />
            ))}
          </div>
        </article>
        <TopList title="Funnel" items={['Aufruf', 'CTA Klick', 'Formularstart', 'Lead']} />
        <TopList title="Top-Seiten" items={['/start', '/angebot', '/kontakt']} />
        <TopList title="Kampagnen" items={['Direkt', 'Suche', 'Newsletter']} />
      </div>
    </section>
  )
}

function TopList({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="top-list">
      <h3>{title}</h3>
      {items.map((item, index) => (
        <div key={item}>
          <span>{item}</span>
          <em>{index === 0 ? 0 : ''}</em>
        </div>
      ))}
    </article>
  )
}

function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <header className="section-intro">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </header>
  )
}

function BlankRow({ label }: { label: string }) {
  return (
    <div className="table-row">
      <span>{label}</span>
      <em>leer</em>
      <small>nicht geplant</small>
    </div>
  )
}

export default App
