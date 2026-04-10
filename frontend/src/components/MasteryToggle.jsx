export default function MasteryToggle({ isCodeMode, setIsCodeMode }) {
  return (
    <button
      onClick={() => setIsCodeMode(!isCodeMode)}
      className="flex items-center gap-3 p-1 rounded-full bg-[var(--color-brand-bg)] border border-[var(--color-brand-border)] transition-colors"
    >
      <span className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${!isCodeMode ? 'bg-[var(--color-brand-surface)] text-[var(--color-brand-text)]' : 'bg-transparent text-[var(--color-brand-muted)] hover:text-white'}`}>Normal</span>
      <span className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${isCodeMode ? 'bg-[var(--color-brand-accent)] text-black' : 'bg-transparent text-[var(--color-brand-muted)] hover:text-white'}`}>Code Mode</span>
    </button>
  )
}

