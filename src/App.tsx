import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { AppIcon, type AppIconName } from './components/icons/AppIcon'

type ThemeMode = 'light' | 'dark' | 'charcoal'
type PageId =
  | 'home'
  | 'workspace'
  | 'calendar'
  | 'ideas'
  | 'customers'
  | 'immobilien'
  | 'website'
  | 'social'
  | 'baufi'
  | 'runs'
  | 'docs'
  | 'workflows'
  | 'logbook'
  | 'design'

type NavItem = {
  id: PageId
  title: string
  icon: AppIconName
  system?: boolean
}

type ChatMessage = {
  id: string
  role: 'user' | 'assistant' | 'commentary' | 'tool'
  text: string
}

const navItems: NavItem[] = [
  { id: 'home', title: 'Dashboard', icon: 'focus' },
  { id: 'workspace', title: 'Chat', icon: 'chat' },
  { id: 'calendar', title: 'Kalender', icon: 'calendar' },
  { id: 'ideas', title: 'Ziele & Ideen', icon: 'target' },
  { id: 'customers', title: 'Kunden', icon: 'users' },
  { id: 'immobilien', title: 'Immobilien', icon: 'home' },
  { id: 'website', title: 'Website', icon: 'globe' },
  { id: 'social', title: 'Social Media', icon: 'share' },
  { id: 'baufi', title: 'Baufi', icon: 'fileText' },
  { id: 'runs', title: 'Kontrolle', icon: 'activity', system: true },
  { id: 'docs', title: 'Dokumentation', icon: 'bookOpen', system: true },
  { id: 'workflows', title: 'Workflows', icon: 'listChecks', system: true },
  { id: 'logbook', title: 'Logbuch', icon: 'shieldCheck', system: true },
  { id: 'design', title: 'Designsystem', icon: 'palette', system: true },
]

const demoSessions = [
  { title: 'Blanko Einrichtung', meta: 'lokal, ohne Runtime' },
  { title: 'Designabgleich', meta: 'Pastel V2, Light, Dark' },
  { title: 'Workflow Skizze', meta: 'Beispielverlauf' },
]

function readStored<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeStored<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage is optional in the blank template.
  }
}

function App() {
  const [page, setPage] = useState<PageId>(() => readStored('cb.blank.page', 'home'))
  const [theme, setTheme] = useState<ThemeMode>(() => readStored('cb.theme', 'charcoal'))
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarView, setSidebarView] = useState<'navigation' | 'history'>('navigation')
  const [splitOpen, setSplitOpen] = useState(false)
  const [secondaryPage, setSecondaryPage] = useState<PageId>('docs')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme === 'light' ? 'light' : 'dark'
    writeStored('cb.theme', theme)
  }, [theme])

  useEffect(() => {
    writeStored('cb.blank.page', page)
  }, [page])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 't') {
        event.preventDefault()
        setTheme((current) => nextTheme(current))
      }
      if ((event.ctrlKey || event.metaKey) && event.key === '<') {
        event.preventDefault()
        setSidebarCollapsed((current) => !current)
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'y') {
        event.preventDefault()
        setSplitOpen((current) => !current)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  function selectPage(next: PageId) {
    setPage(next)
    setSidebarOpen(false)
  }

  return (
    <main
      className={`cb-shell${sidebarCollapsed ? ' cb-shell--sidebar-collapsed' : ''}`}
      data-sidebar-open={sidebarOpen ? 'true' : 'false'}
    >
      <aside
        className={`cb-sidebar${sidebarCollapsed ? ' cb-sidebar--collapsed' : ''}`}
        aria-label="Navigation"
      >
        <div className="cb-mark" aria-label="Agent Desk">
          <img className="cb-mark__logo cb-mark__logo--on-light" src="/assets/agent-desk-logo.svg" alt="" />
          <img
            className="cb-mark__logo cb-mark__logo--on-dark"
            src="/assets/agent-desk-logo-light.svg"
            alt=""
          />
        </div>

        <div className="cb-sidebar-view-toggle" role="tablist" aria-label="Sidebar-Bereich">
          <button
            type="button"
            role="tab"
            aria-selected={sidebarView === 'navigation'}
            onClick={() => setSidebarView('navigation')}
          >
            Navigation
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={sidebarView === 'history'}
            onClick={() => setSidebarView('history')}
          >
            Verläufe
          </button>
        </div>

        <div
          className="cb-sidebar-panel cb-sidebar-panel--nav"
          data-active={sidebarView === 'navigation' ? 'true' : 'false'}
        >
          <SidebarNav activePage={page} onSelect={selectPage} />
        </div>

        <div
          className="cb-sidebar-panel cb-sidebar-panel--history"
          data-active={sidebarView === 'history' ? 'true' : 'false'}
        >
          <SidebarHistory />
        </div>

        <div className="cb-sidebar__utilities">
          <button
            className="cb-sidebar__button"
            type="button"
            aria-label={sidebarCollapsed ? 'Sidebar erweitern' : 'Sidebar einklappen'}
            onClick={() => setSidebarCollapsed((current) => !current)}
          >
            <AppIcon name="menu" size={16} />
            <span>Sidebar</span>
          </button>
          <ThemeSwitcher theme={theme} onThemeChange={setTheme} />
          <button
            className={splitOpen ? 'cb-sidebar__button cb-sidebar__button--active' : 'cb-sidebar__button'}
            type="button"
            onClick={() => setSplitOpen((current) => !current)}
          >
            <AppIcon name="more" size={16} />
            <span>Split</span>
          </button>
        </div>
      </aside>

      <section className="cb-workspace" aria-label="Workspace">
        <header className="cb-mobile-header" aria-label="Mobile Navigation">
          <button
            type="button"
            className="cb-mobile-header__button"
            aria-label="Navigation öffnen"
            onClick={() => setSidebarOpen((current) => !current)}
          >
            <AppIcon name={sidebarOpen ? 'close' : 'menu'} size={22} />
          </button>
          <span className="cb-mobile-header__title">{titleForPage(page)}</span>
          <span className="cb-mobile-header__spacer" aria-hidden="true" />
        </header>

        <div className={splitOpen ? 'cb-dashboard-split cb-dashboard-split--active' : 'cb-dashboard-split cb-dashboard-split--single'}>
          <DashboardPane page={page} active framed={splitOpen} onSelect={selectPage} />
          {splitOpen ? (
            <>
              <div className="cb-dashboard-split__resize" aria-hidden="true"><span /></div>
              <DashboardPane
                page={secondaryPage}
                active={false}
                framed
                canClose
                onClose={() => setSplitOpen(false)}
                onSelect={setSecondaryPage}
              />
            </>
          ) : null}
        </div>
      </section>
    </main>
  )
}

function SidebarNav({ activePage, onSelect }: { activePage: PageId; onSelect: (page: PageId) => void }) {
  const mainItems = navItems.filter((item) => !item.system)
  const systemItems = navItems.filter((item) => item.system)
  return (
    <nav className="cb-sidebar-nav" aria-label="Hauptnavigation">
      <div className="cb-sidebar-nav__section">
        <span className="cb-sidebar-nav__section-label">Arbeitsseiten</span>
        {mainItems.map((item) => (
          <NavLinkLike key={item.id} item={item} active={activePage === item.id} onSelect={onSelect} />
        ))}
      </div>
      <div className="cb-sidebar-nav__section">
        <span className="cb-sidebar-nav__section-label">System</span>
        {systemItems.map((item) => (
          <NavLinkLike key={item.id} item={item} active={activePage === item.id} onSelect={onSelect} />
        ))}
      </div>
    </nav>
  )
}

function NavLinkLike({
  item,
  active,
  onSelect,
}: {
  item: NavItem
  active: boolean
  onSelect: (page: PageId) => void
}) {
  return (
    <a
      href={`#${item.id}`}
      className="cb-sidebar-nav__link"
      aria-current={active ? 'page' : undefined}
      onClick={(event) => {
        event.preventDefault()
        onSelect(item.id)
      }}
      title={item.title}
    >
      <AppIcon name={item.icon} size={16} />
      <span>{item.title}</span>
    </a>
  )
}

function SidebarHistory() {
  return (
    <section className="cb-sidebar-history" aria-label="Chatverläufe">
      <header className="cb-sidebar-history__head">
        <span>Projekte</span>
        <div className="cb-sidebar-history__tools">
          <small>2</small>
          <button type="button" title="Neues Projekt">
            <AppIcon name="folderPlus" size={13} />
          </button>
        </div>
      </header>
      <div className="cb-sidebar-history__projects">
        <div className="cb-sidebar-project" data-expanded="true">
          <div className="cb-sidebar-project__row">
            <button className="cb-sidebar-project__toggle" type="button">
              <AppIcon name="chevronDown" size={13} />
              <span className="cb-sidebar-project__name">Blanko Projekt</span>
              <small>3</small>
            </button>
          </div>
          <div className="cb-sidebar-project__sessions">
            {demoSessions.map((session, index) => (
              <HistoryItem key={session.title} current={index === 0} title={session.title} meta={session.meta} />
            ))}
          </div>
        </div>
      </div>

      <header className="cb-sidebar-history__head">
        <span>Chatverläufe</span>
        <div className="cb-sidebar-history__tools">
          <small>1</small>
          <button type="button" title="Neuer Chat">
            <AppIcon name="plus" size={13} />
          </button>
        </div>
      </header>
      <div className="cb-sidebar-history__list">
        <HistoryItem title="Lokale Demo" meta="keine Verbindung" />
      </div>
    </section>
  )
}

function HistoryItem({ title, meta, current = false }: { title: string; meta: string; current?: boolean }) {
  return (
    <div className="cb-sidebar-history__item" data-current={current ? 'true' : undefined}>
      <button className="cb-sidebar-history__open" type="button" aria-current={current ? 'true' : undefined}>
        <span className="cb-sidebar-history__dot" aria-hidden="true" />
        <span className="cb-sidebar-history__copy">
          <span className="cb-sidebar-history__title">{title}</span>
          <span className="cb-sidebar-history__meta">{meta}</span>
        </span>
      </button>
    </div>
  )
}

function ThemeSwitcher({
  theme,
  onThemeChange,
}: {
  theme: ThemeMode
  onThemeChange: (theme: ThemeMode) => void
}) {
  const options: Array<{ icon: AppIconName; label: string; mode: ThemeMode }> = [
    { icon: 'sun', label: 'Light', mode: 'light' },
    { icon: 'moon', label: 'Dark', mode: 'dark' },
    { icon: 'palette', label: 'Pastel V2', mode: 'charcoal' },
  ]
  return (
    <div className="cb-theme-switcher" role="radiogroup" aria-label="Theme">
      {options.map((option) => (
        <button
          key={option.mode}
          type="button"
          role="radio"
          aria-checked={theme === option.mode}
          aria-label={option.label}
          title={option.label}
          onClick={() => onThemeChange(option.mode)}
        >
          <AppIcon name={option.icon} size={14} />
        </button>
      ))}
    </div>
  )
}

function DashboardPane({
  page,
  active,
  framed = false,
  canClose = false,
  onClose,
  onSelect,
}: {
  page: PageId
  active: boolean
  framed?: boolean
  canClose?: boolean
  onClose?: () => void
  onSelect: (page: PageId) => void
}) {
  if (!framed) {
    return (
      <section className="cb-dashboard-split__pane" aria-current={active ? 'true' : undefined}>
        <div className="cb-route-stack">
          <div className="cb-route-layer">{renderPage(page)}</div>
        </div>
      </section>
    )
  }

  return (
    <section className="cb-dashboard-split__pane" aria-current={active ? 'true' : undefined}>
      <div className="cb-dashboard-split__surface">
        <aside className="cb-dashboard-split-rail" aria-label="Unterseiten">
          <div className="cb-dashboard-split-rail__mark" aria-label="Agent Desk">
            <img
              className="cb-dashboard-split-rail__logo cb-dashboard-split-rail__logo--on-light"
              src="/assets/agent-desk-logo.svg"
              alt=""
            />
            <img
              className="cb-dashboard-split-rail__logo cb-dashboard-split-rail__logo--on-dark"
              src="/assets/agent-desk-logo-light.svg"
              alt=""
            />
          </div>
          <nav className="cb-dashboard-split-rail__nav" aria-label="Unterseiten">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="cb-dashboard-split-rail__link"
                title={item.title}
                data-active={item.id === page ? 'true' : undefined}
                onClick={() => onSelect(item.id)}
              >
                <AppIcon name={item.icon} size={16} />
                <span>{item.title}</span>
              </button>
            ))}
          </nav>
        </aside>
        <div className="cb-dashboard-split__content">
          <div className="cb-route-stack">
            <div className="cb-route-layer">{renderPage(page)}</div>
          </div>
        </div>
      </div>
      <div className="cb-dashboard-split__controls" data-split-controls="true">
        {canClose ? (
          <button className="cb-dashboard-split__control" type="button" title="Split schließen" onClick={onClose}>
            <AppIcon name="close" size={14} />
          </button>
        ) : null}
        <button className="cb-dashboard-split__control cb-dashboard-split__control--launcher" type="button">
          <AppIcon name="more" size={15} />
        </button>
      </div>
    </section>
  )
}

function renderPage(page: PageId) {
  switch (page) {
    case 'workspace':
      return <ChatPage />
    case 'calendar':
      return <GenericPage title="Kalender" icon="calendar" />
    case 'ideas':
      return <IdeasPage />
    case 'customers':
      return <GenericPage title="Kunden" icon="users" />
    case 'immobilien':
      return <GenericPage title="Immobilien" icon="home" />
    case 'website':
      return <WebsitePage />
    case 'social':
      return <GenericPage title="Social Media" icon="share" />
    case 'baufi':
      return <GenericPage title="Baufi" icon="fileText" />
    case 'runs':
      return <ControlPage />
    case 'docs':
      return <DocsPage />
    case 'workflows':
      return <WorkflowsPage />
    case 'logbook':
      return <LogbookPage />
    case 'design':
      return <DesignPage />
    default:
      return <DashboardPage />
  }
}

function DashboardPage() {
  const [hidden, setHidden] = useState<string[]>([])
  const catalog = useMemo(() => [
    { id: 'events', title: 'Heute', icon: 'calendarClock' as AppIconName, count: '3' },
    { id: 'mails', title: 'Posteingang', icon: 'mail' as AppIconName, count: '5' },
    { id: 'approvals', title: 'Zur Freigabe', icon: 'shieldCheck' as AppIconName, count: '2' },
    { id: 'website', title: 'Website (7 Tage)', icon: 'globe' as AppIconName, count: '4' },
    { id: 'notes', title: 'Notizen', icon: 'fileText' as AppIconName, count: '2' },
    { id: 'todos', title: 'To-dos', icon: 'listChecks' as AppIconName, count: '6' },
  ], [])
  const [order, setOrder] = useState<string[]>(() =>
    readStored('cb.blank.deckOrder', catalog.map((panel) => panel.id)),
  )
  const [dragged, setDragged] = useState<string | null>(null)
  const panels = order
    .map((id) => catalog.find((panel) => panel.id === id))
    .filter((panel): panel is (typeof catalog)[number] => Boolean(panel))
    .filter((panel) => !hidden.includes(panel.id))

  useEffect(() => {
    writeStored('cb.blank.deckOrder', order)
  }, [order])

  function movePanel(targetId: string) {
    if (!dragged || dragged === targetId) return
    setOrder((current) => {
      const from = current.indexOf(dragged)
      const to = current.indexOf(targetId)
      if (from < 0 || to < 0) return current
      const next = current.slice()
      const [item] = next.splice(from, 1)
      next.splice(to, 0, item)
      return next
    })
  }

  return (
    <section className="cb-deck">
      <div className="cb-deck__scroll">
        <header className="cb-deck-hero">
          <div className="cb-deck-hero__logo">
            <img className="cb-deck-hero__logo-img cb-deck-hero__logo-img--on-light" src="/assets/agent-desk-logo.svg" alt="" />
            <img className="cb-deck-hero__logo-img cb-deck-hero__logo-img--on-dark" src="/assets/agent-desk-logo-light.svg" alt="" />
          </div>
          <div className="cb-deck-hero__copy">
            <span>Blanko Dashboard</span>
            <h1>Agent Desk</h1>
            <p>Gleiche Raster, Karten, Sticky-Flächen und Composer-Position wie die echte Oberfläche, aber nur mit lokalen Beispieldaten.</p>
          </div>
          <div className="cb-deck-bar">
            <span className="cb-deck-bar__chip"><AppIcon name="database" size={14} /> Lokal</span>
            <span className="cb-deck-bar__chip"><AppIcon name="check" size={14} /> Ohne Backend</span>
            <button
              className="cb-deck-bar__lock"
              type="button"
              title="Layout zurücksetzen"
              onClick={() => {
                setHidden([])
                setOrder(catalog.map((panel) => panel.id))
              }}
            >
              <AppIcon name="regenerate" size={15} />
            </button>
          </div>
        </header>

        <div className="cb-deck-canvas cb-blank-deck-canvas" data-dragging={dragged ? 'true' : undefined}>
          {panels.map((panel, index) => (
            <article
              key={panel.id}
              className="cb-deck-panel cb-blank-deck-panel"
              draggable
              data-dragging={dragged === panel.id ? 'true' : undefined}
              onDragStart={() => setDragged(panel.id)}
              onDragEnd={() => setDragged(null)}
              onDragOver={(event) => {
                event.preventDefault()
                movePanel(panel.id)
              }}
            >
              <header className="cb-deck-panel__head">
                <span className="cb-deck-panel__grip"><AppIcon name="more" size={15} /></span>
                <span className="cb-deck-panel__title"><AppIcon name={panel.icon} size={18} />{panel.title}</span>
                <span className="cb-deck-panel__count">{panel.count}</span>
                <button className="cb-deck-panel__remove" type="button" onClick={() => setHidden((current) => [...current, panel.id])}>
                  <AppIcon name="close" size={13} />
                </button>
              </header>
              <div className="cb-deck-panel__body">
                <DemoRows index={index} />
              </div>
              <span className="cb-deck-panel__resize" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
      <DashboardComposer />
    </section>
  )
}

function DemoRows({ index }: { index: number }) {
  if (index === 3) {
    return (
      <div className="cb-deck-metrics">
        <span className="cb-deck-metric" data-accent="true"><strong>124</strong><span>Besuche</span></span>
        <span className="cb-deck-metric"><strong>18</strong><span>Signale</span></span>
        <span className="cb-deck-metric"><strong>7</strong><span>Formulare</span></span>
        <span className="cb-deck-metric"><strong>4</strong><span>Rückrufe</span></span>
      </div>
    )
  }
  return (
    <>
      {['09:00', '11:30', '14:15'].map((time, row) => (
        <div key={time} className="cb-deck-row">
          <span className="cb-deck-row__time">{time}</span>
          <span className="cb-deck-row__main">
            <strong>Beispieleintrag {row + 1}</strong>
            <small>Neutraler Platzhalter für die Kartenstruktur</small>
          </span>
          <span className="cb-deck-row__btns">
            <button className="cb-deck-row__btn" type="button"><AppIcon name="check" size={13} /></button>
          </span>
        </div>
      ))}
    </>
  )
}

function DashboardComposer() {
  const [draft, setDraft] = useState('')
  return (
    <form
      className="cb-deck-composer"
      onSubmit={(event) => {
        event.preventDefault()
        setDraft('')
      }}
    >
      <div className="cb-deck-composer__note">Lokaler Demo-Composer, sendet nichts nach außen.</div>
      <div className="cb-deck-composer__bar">
        <textarea
          className="cb-deck-composer__input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Kurze Aufgabe oder Frage notieren..."
        />
        <button className="cb-deck-composer__send" type="submit" aria-label="Senden">
          <AppIcon name="send" size={16} />
        </button>
      </div>
    </form>
  )
}

function ChatPage() {
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'user', text: 'Bitte skizziere den nächsten Schritt.' },
    { id: '2', role: 'commentary', text: 'Ich prüfe die vorhandenen Platzhalter und bereite eine lokale Antwort vor.' },
    { id: '3', role: 'tool', text: 'Lokaler Werkzeugblock: keine Runtime, kein Netzwerk, kein Konto.' },
    { id: '4', role: 'assistant', text: 'Der nächste Schritt ist als neutrale Demo angelegt. Das Verhalten zeigt Chat, Prozessblock und Composer, ohne echte Läufe zu starten.' },
  ])

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!draft.trim()) return
    const userText = draft.trim()
    setDraft('')
    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: 'user', text: userText },
      { id: crypto.randomUUID(), role: 'commentary', text: 'Ich simuliere das Streaming lokal und fasse den Auftrag neutral zusammen.' },
      { id: crypto.randomUUID(), role: 'assistant', text: 'Demo-Antwort: Die Eingabe wurde nur im Browser verarbeitet. Es gibt keine Backend-Verbindung.' },
    ])
  }

  return (
    <section className="cb-columns cb-columns--single">
      <div className="cb-workspace-column cb-workspace-column--active cb-blank-chat">
        <div className="cb-blank-chat__messages">
          {messages.map((message) => (
            <article key={message.id} className={`cb-blank-message cb-blank-message--${message.role}`}>
              <span>{message.role === 'assistant' ? 'Codex' : message.role === 'user' ? 'Du' : message.role}</span>
              <p>{message.text}</p>
            </article>
          ))}
        </div>
        <form className="cb-blank-chat__composer" onSubmit={submit}>
          <button type="button" aria-label="Anhang"><AppIcon name="attach" size={16} /></button>
          <textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Nachricht schreiben..." />
          <button type="submit" aria-label="Senden"><AppIcon name="send" size={16} /></button>
        </form>
      </div>
    </section>
  )
}

function ControlPage() {
  return (
    <section className="cb-runs-page">
      <div className="cb-inventory">
        <header className="cb-inventory__head">
          <h1>Kontrolle</h1>
          <div className="cb-inventory__summary">
            <span><strong>0</strong>Live-Jobs</span>
            <span data-tone="ok"><strong>12</strong>Vorlagen</span>
            <span data-tone="warn"><strong>3</strong>Hinweise</span>
          </div>
        </header>
        <p className="cb-inventory__notice"><AppIcon name="shieldCheck" size={16} /> Blanko-Kontrollseite mit denselben Reitern und Karten, aber ohne laufende Prozesse.</p>
        <div className="cb-control-layout">
          <aside className="cb-blank-sticky-nav">
            {['Übersicht', 'Cronjobs', 'Skills', 'System'].map((item) => <button key={item} type="button">{item}</button>)}
          </aside>
          <div className="cb-blank-card-grid">
            {['Runtime', 'Cronjobs', 'Freigaben', 'Logs'].map((item, index) => (
              <article className="cb-blank-card" key={item}>
                <AppIcon name={index === 0 ? 'runtime' : index === 1 ? 'activity' : index === 2 ? 'shieldCheck' : 'terminal'} size={20} />
                <h3>{item}</h3>
                <p>Neutrale Karte mit Status, Beschreibung und Platz für Aktionen.</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function DocsPage() {
  return (
    <section className="cb-docs-page">
      <aside className="cb-docs-page__side">
        {['Start', 'Aufbau', 'Themes', 'Chat', 'Einrichtung'].map((item) => <a key={item} href={`#${item}`}>{item}</a>)}
      </aside>
      <div className="cb-docs-page__body">
        <header className="cb-docs-page__intro" id="Start">
          <p>Blanko Dokumentation</p>
          <h1>Aufbau der Agent Desk Oberfläche</h1>
          <span>Diese Seite beschreibt Shell, Navigation, Themes, Karten, Chat-Verhalten und lokale Einrichtung als neutrale Vorlage.</span>
        </header>
        {['Aufbau', 'Themes', 'Chat', 'Einrichtung'].map((section) => (
          <section className="cb-docs-section" id={section} key={section}>
            <span>{section}</span>
            <h2>{section === 'Aufbau' ? 'Eine feste Shell trägt alle Arbeitsseiten.' : `${section} als austauschbares Muster.`}</h2>
            <p>Die Inhalte sind Platzhalter. Die Funktion, Abstände, Sticky-Navigation und Kartenstruktur bleiben erhalten, damit ein neuer lokaler Agent darauf aufsetzen kann.</p>
            <pre><code>{`npm install\nnpm run dev`}</code></pre>
          </section>
        ))}
      </div>
    </section>
  )
}

function WorkflowsPage() {
  const [active, setActive] = useState('briefing')
  return (
    <section className="cb-workflows-page">
      <aside className="cb-workflows-nav">
        <span className="cb-workflows-nav__label">Workflows</span>
        {[
          ['briefing', 'Briefing', 'Sammeln, prüfen, freigeben'],
          ['handoff', 'Handoff', 'Übergabe an einen Agenten'],
          ['review', 'Review', 'Kontrolle und Logbuch'],
        ].map(([id, title, meta]) => (
          <button key={id} className="cb-workflows-nav__button" type="button" aria-pressed={active === id} onClick={() => setActive(id)}>
            <AppIcon name={id === 'briefing' ? 'listChecks' : id === 'handoff' ? 'bot' : 'shieldCheck'} size={16} />
            <span><strong>{title}</strong><small>{meta}</small></span><em>Blanko</em>
          </button>
        ))}
      </aside>
      <main className="cb-workflows-main">
        <header className="cb-workflows-header">
          <div><span>Workflow Vorlage</span><h1>{active}</h1><p>Neutraler Ablauf ohne echte Kampagne, Mailbox oder Kundendaten.</p></div>
        </header>
        <div className="cb-blank-card-grid">
          {['Eingang', 'Analyse', 'Freigabe', 'Ausgabe'].map((step) => (
            <article className="cb-blank-card" key={step}><h3>{step}</h3><p>Beispielschritt mit Status, Verantwortlichkeit und Aktion.</p></article>
          ))}
        </div>
      </main>
    </section>
  )
}

function LogbookPage() {
  return (
    <section className="cb-logbook">
      <header className="cb-logbook__head">
        <div className="cb-logbook__title">
          <AppIcon name="shieldCheck" size={22} />
          <div><h1>Logbuch</h1><p>Lokaler Nachweisbereich mit neutralen Beispielereignissen.</p></div>
        </div>
        <span className="cb-logbook__count">4 Einträge</span>
      </header>
      <div className="cb-logbook__filters">
        <label className="cb-logbook__search"><AppIcon name="search" size={15} /><input placeholder="Suchen" /></label>
        <select><option>Alle Typen</option></select>
      </div>
      <div className="cb-logbook__list">
        <div className="cb-logbook__group">
          <span className="cb-logbook__day">Heute</span>
          {['create', 'update', 'read', 'delete'].map((tone, index) => (
            <article className="cb-logbook__row" data-tone={tone} key={tone}>
              <div className="cb-blank-log-row"><strong>Beispielereignis {index + 1}</strong><span>Keine echten Daten, nur Struktur und Tonalität.</span></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function IdeasPage() {
  return (
    <section className="cb-board-page">
      <div className="cb-board-page__body">
        <header className="cb-board-head">
          <div><span>Planung</span><h1>Ziele & Ideen</h1><p>Kanban- und Listenmuster für lokale Planung.</p></div>
        </header>
        <div className="cb-board-toggle">
          <button type="button" data-active="true">Ideen</button>
          <button type="button">Ziele</button>
        </div>
        <div className="cb-blank-kanban">
          {['Offen', 'Nächster Schritt', 'Geparkt'].map((column) => (
            <section className="cb-blank-card" key={column}>
              <h3>{column}</h3>
              <p>Beispielkarte für eine neutrale Idee.</p>
              <p>Priorität, Notiz und nächster Schritt können lokal ergänzt werden.</p>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}

function WebsitePage() {
  return (
    <section className="cb-website">
      <div className="cb-website__sticky">
        <div className="cb-website__head">
          <h1>Website Tracking</h1>
          <span className="cb-website__sub">Blanko-Signale ohne echte Domain</span>
        </div>
        <div className="cb-website__bar">
          <div className="cb-website__tabs"><button type="button" aria-pressed="true">Tracking Übersicht</button></div>
          <div className="cb-website__controls">
            <select className="cb-website__select"><option>Letzte 7 Tage</option></select>
            <button className="cb-website__go" type="button">Aktualisieren</button>
          </div>
        </div>
      </div>
      <div className="cb-blank-card-grid">
        {['Besuche', 'Kontaktklicks', 'Formulare', 'Kampagnen'].map((item, index) => (
          <article className="cb-blank-card" key={item}>
            <h3>{item}</h3>
            <strong>{[124, 18, 7, 4][index]}</strong>
            <p>Neutrale Kennzahl als Platzhalter für spätere echte Messpunkte.</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function DesignPage() {
  const swatches = ['--cb-pastel-blush', '--cb-pastel-mint', '--cb-pastel-lavender', '--cb-pastel-butter', '--cb-pastel-sky', '--cb-pastel-peach', '--cb-pastel-sage', '--cb-pastel-rose']
  const icons: AppIconName[] = ['focus', 'chat', 'calendar', 'target', 'users', 'home', 'globe', 'share', 'activity', 'bookOpen', 'listChecks', 'shieldCheck']
  return (
    <section className="cb-page">
      <header className="cb-page__intro">
        <h1>Designsystem</h1>
        <p>Farben, Icons, Karten, Radius, Sidebar und Sticky-Muster sind als sichtbare Vorgabe im Repo enthalten.</p>
      </header>
      <div className="cb-blank-swatch-grid">
        {swatches.map((swatch) => <span key={swatch} style={{ background: `var(${swatch})` }}>{swatch}</span>)}
      </div>
      <div className="cb-blank-icon-grid">
        {icons.map((icon) => <span key={icon}><AppIcon name={icon} size={18} />{icon}</span>)}
      </div>
      <div className="cb-blank-card-grid">
        <article className="cb-blank-card"><h3>Standard Card</h3><p>Eine einfache Karte mit Rand, ruhiger Fläche und kompaktem Text.</p></article>
        <article className="cb-blank-card cb-blank-card--pastel"><h3>Pastell Card</h3><p>Akzentkarte für Status, Icon-Kachel oder kurze Hinweise.</p></article>
      </div>
    </section>
  )
}

function GenericPage({ title, icon }: { title: string; icon: AppIconName }) {
  return (
    <section className="cb-page">
      <header className="cb-page__intro">
        <h1>{title}</h1>
        <p>Blanko-Unterseite im echten Seitenrahmen. Inhalte sind neutral, Aufbau und Kartenmuster bleiben als Vorlage erhalten.</p>
      </header>
      <div className="cb-blank-card-grid">
        {['Übersicht', 'Liste', 'Detail', 'Aktionen'].map((item) => (
          <article className="cb-blank-card" key={item}>
            <AppIcon name={icon} size={20} />
            <h3>{item}</h3>
            <p>Platzhalter für den späteren Fachinhalt.</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function titleForPage(page: PageId) {
  return navItems.find((item) => item.id === page)?.title ?? 'Agent Desk'
}

function nextTheme(theme: ThemeMode): ThemeMode {
  if (theme === 'light') return 'dark'
  if (theme === 'dark') return 'charcoal'
  return 'light'
}

export default App
