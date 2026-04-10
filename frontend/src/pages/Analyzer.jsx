import { useState, useEffect } from 'react'
import TopicCard from '../components/TopicCard'
import { Sparkles, BarChart2 } from 'lucide-react'

export default function Analyzer() {
  const [loading, setLoading] = useState(true)

  const topics = [
    { name: "Stacks", weight: 85 },
    { name: "Queues", weight: 70 },
    { name: "Trees", weight: 65 },
    { name: "Graphs", weight: 50 },
    { name: "Linked Lists", weight: 45 },
  ]

  useEffect(() => {
    // Simulate API call for analysis
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[var(--color-brand-border)] pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-display text-[var(--color-brand-accent)] flex items-center gap-3">
            <BarChart2 className="w-8 h-8" />
            Exam Predictions
          </h1>
          <p className="text-[var(--color-brand-muted)] font-body mt-2">Predicted top topics based on past exams and your uploaded documents.</p>
        </div>
        <button className="bg-[var(--color-brand-border)] hover:bg-[var(--color-brand-surface)] text-[var(--color-brand-text)] px-4 py-2 rounded flex items-center gap-2 font-mono transition-colors border border-[var(--color-brand-border)]">
          <Sparkles className="w-4 h-4 text-[var(--color-brand-accent)]" />
          Re-Analyze
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20 text-[var(--color-brand-muted)] font-mono animate-pulse">
          Analyzing past papers...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((t, idx) => (
            <TopicCard key={t.name} name={t.name} weight={t.weight} order={idx + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
