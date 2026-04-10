import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Dashboard from './pages/Dashboard'
import Upload from './pages/Upload'
import Analyzer from './pages/Analyzer'
import Chat from './pages/Chat'
import { Download } from 'lucide-react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  // Handle PWA installation
  useState(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  }

  return (
    <Router>
      <div className="min-h-screen bg-[var(--color-brand-bg)] text-[var(--color-brand-text)]">
        <header className="border-b border-[var(--color-brand-border)] p-4 bg-[var(--color-brand-surface)]">
          <div className="container mx-auto flex items-center justify-between">
            <Link to="/" className="text-xl font-bold font-display text-[var(--color-brand-accent)]">
              Study Buddy
            </Link>
            <nav className="space-x-4 flex items-center">
              <Link to="/" className="hover:text-[var(--color-brand-accent)] transition-colors hidden sm:block">Dashboard</Link>
              <Link to="/upload" className="hover:text-[var(--color-brand-accent)] transition-colors hidden sm:block">Upload</Link>
              <Link to="/analyzer" className="hover:text-[var(--color-brand-accent)] transition-colors hidden sm:block">Analyzer</Link>
              <Link to="/chat" className="hover:text-[var(--color-brand-accent)] transition-colors hidden sm:block">Chat</Link>

              {deferredPrompt && (
                <button
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
  )
}

export default App
