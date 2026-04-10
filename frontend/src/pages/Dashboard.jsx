import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Upload, FileSearch, MessageSquare } from 'lucide-react'
import { getUnits } from '../api'
import { useStudyUnit } from '../studyUnitContext'

export default function Dashboard() {
  const { unitId, setUnitId } = useStudyUnit()
  const [units, setUnits] = useState([])
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    let cancelled = false
    getUnits()
      .then((data) => {
        if (!cancelled) {
          setUnits(data.units ?? [])
          setLoadError(null)
        }
      })
      .catch((e) => {
        if (!cancelled) setLoadError(e.message || 'Could not load units')
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (units.length > 0 && !units.some((u) => u.id === unitId)) {
      setUnitId(units[0].id)
    }
  }, [units, unitId, setUnitId])

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-display text-[var(--color-brand-accent)] mb-2">Welcome Back.</h1>
          <p className="text-[var(--color-brand-muted)] font-body text-lg">Pick a unit and let&apos;s start studying.</p>
        </div>
        <select
          value={unitId}
          onChange={(e) => setUnitId(e.target.value)}
          disabled={units.length === 0}
          className="bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] text-[var(--color-brand-text)] font-mono p-2 rounded focus:outline-none focus:border-[var(--color-brand-accent)] disabled:opacity-50"
        >
          {units.length === 0 ? (
            <option value="">Loading units…</option>
          ) : (
            units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))
          )}
        </select>
      </div>

      {loadError && (
        <p className="text-sm font-mono text-[var(--color-brand-danger)] border border-[var(--color-brand-danger)] rounded p-3">
          {loadError}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/upload"
          className="group p-6 rounded-lg bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] hover:border-[var(--color-brand-accent)] transition-all"
        >
          <Upload className="w-10 h-10 mb-4 text-[var(--color-brand-muted)] group-hover:text-[var(--color-brand-accent)] transition-colors" />
          <h2 className="text-xl font-display mb-2">Upload Notes</h2>
          <p className="text-[var(--color-brand-muted)] font-body text-sm">Add new PDFs and slides to your study context.</p>
        </Link>

        <Link
          to="/analyzer"
          className="group p-6 rounded-lg bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] hover:border-[var(--color-brand-accent)] transition-all"
        >
          <FileSearch className="w-10 h-10 mb-4 text-[var(--color-brand-muted)] group-hover:text-[var(--color-brand-accent)] transition-colors" />
          <h2 className="text-xl font-display mb-2">Analyze Papers</h2>
          <p className="text-[var(--color-brand-muted)] font-body text-sm">See predictions for top topics based on past exams.</p>
        </Link>

        <Link
          to="/chat"
          className="group p-6 rounded-lg bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] hover:border-[var(--color-brand-accent)] transition-all"
        >
          <MessageSquare className="w-10 h-10 mb-4 text-[var(--color-brand-muted)] group-hover:text-[var(--color-brand-accent)] transition-colors" />
          <h2 className="text-xl font-display mb-2">Open Study Chat</h2>
          <p className="text-[var(--color-brand-muted)] font-body text-sm">Ask questions and discuss topics with your AI buddy.</p>
        </Link>
      </div>
    </div>
  )
}
