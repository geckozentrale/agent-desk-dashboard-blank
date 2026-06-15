import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/tokens.css'
import './styles/fonts.css'
import './styles/motion.css'
import './styles/breakpoints.css'
import './styles/app.css'
import './features/dashboard/DashboardHomePage.css'
import './features/runs/RunOverviewPage.css'
import './features/docs/DocsPage.css'
import './features/workflows/WorkflowsPage.css'
import './features/logbook/LogbookPage.css'
import './features/ideas/IdeasPage.css'
import './features/website/WebsiteTrackingPage.css'
import './features/workspace/WorkspaceColumns.css'
import './blank.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
