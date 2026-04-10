export default function TopicCard({ name, weight, order }) {
  return (
    <div className="bg-[var(--color-brand-surface)] p-6 rounded-lg border border-[var(--color-brand-border)] hover:border-[var(--color-brand-accent)] transition-all">
      <div className="flex justify-between items-start mb-4">
        <span className="text-3xl font-display text-[var(--color-brand-muted)] opacity-50">#{order}</span>
        <span className="bg-[var(--color-brand-border)] text-xs font-mono px-2 py-1 rounded text-[var(--color-brand-accent)]">{weight}% Probability</span>
      </div>
      <h3 className="text-2xl font-display text-[var(--color-brand-text)] mb-2">{name}</h3>
      <div className="w-full bg-[var(--color-brand-border)] rounded-full h-2 mt-4">
        <div
          className="bg-[var(--color-brand-accent)] h-2 rounded-full"
          style={{ width: `${weight}%` }}
        ></div>
      </div>
    </div>
  )
}

