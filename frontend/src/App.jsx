import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Download } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import Upload from './pages/Upload'
import Analyzer from './pages/Analyzer'
import Chat from './pages/Chat'
import { getHealth } from './api'
import { StudyUnitContext } from './studyUnitContext'
import './App.css'

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [unitId, setUnitId] = useState('ds')
  const [healthLabel, setHealthLabel] = useState('')

  useEffect(() => {
    const onBeforeInstall = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstall)
  }, [])

  useEffect(() => {
    let cancelled = false
    getHealth()
      .then((h) => {
        if (!cancelled && h?.version) setHealthLabel(h.version)
      })
      .catch(() => {
        if (!cancelled) setHealthLabel('')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') setDeferredPrompt(null)
  }

  return (
    <StudyUnitContext.Provider value={{ unitId, setUnitId }}>
      <Router>
        <div className="min-h-screen bg-[var(--color-brand-bg)] text-[var(--color-brand-text)]">
          <header className="border-b border-[var(--color-brand-border)] p-4 bg-[var(--color-brand-surface)]">
            <div className="container mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <Link to="/" className="text-xl font-bold font-display text-[var(--color-brand-accent)] shrink-0">
                  Study Buddy
                </Link>
                {healthLabel && (
                  <span className="text-[10px] font-mono text-[var(--color-brand-muted)] truncate hidden sm:inline">
                    API {healthLabel}
                  </span>
                )}
              </div>
              <nav className="space-x-4 flex items-center shrink-0">
                <Link to="/" className="hover:text-[var(--color-brand-accent)] transition-colors hidden sm:inline">
                  Dashboard
                </Link>
                <Link to="/upload" className="hover:text-[var(--color-brand-accent)] transition-colors hidden sm:inline">
                  Upload
                </Link>
                <Link to="/analyzer" className="hover:text-[var(--color-brand-accent)] transition-colors hidden sm:inline">
                  Analyzer
                </Link>
                <Link to="/chat" className="hover:text-[var(--color-brand-accent)] transition-colors hidden sm:inline">
                  Chat
                </Link>

                {deferredPrompt && (
                  <button
                    type="button"
                    onClick={handleInstallClick}
                    className="ml-4 bg-[var(--color-brand-accent)] text-black px-3 py-1 rounded text-sm font-mono flex items-center gap-2 hover:bg-yellow-600 transition-colors"
                  >
                    <Download className="w-4 h-4" /> Install App
                  </button>
                )}
              </nav>
            </div>
          </header>

          <main className="container mx-auto p-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/analyzer" element={<Analyzer />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </main>
        </div>
      </Router>
    </StudyUnitContext.Provider>
  )
}

export default App
