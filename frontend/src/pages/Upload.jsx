import { useState, useRef } from 'react'
import { UploadCloud, CheckCircle, XCircle } from 'lucide-react'

export default function Upload() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle') // idle, uploading, success, error
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
      setStatus('idle')
    }
  }

  const handleUpload = () => {
    if (!file) return
    setStatus('uploading')

    // Simulate backend upload
    setTimeout(() => {
      setStatus('success')
    }, 2000)
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-display text-[var(--color-brand-accent)] mb-6">Upload Notes</h1>

      <div
        className="border-2 border-dashed border-[var(--color-brand-border)] p-12 text-center rounded-lg bg-[var(--color-brand-surface)] transition-all hover:border-[var(--color-brand-accent)]"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0])
            setStatus('idle')
          }
        }}
      >
        <UploadCloud className="w-16 h-16 mx-auto mb-4 text-[var(--color-brand-muted)]" />
        <h3 className="text-xl font-display mb-2">Drag and drop your PDF here</h3>
        <p className="text-[var(--color-brand-muted)] mb-6 text-sm">or click below to browse</p>

        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-[var(--color-brand-border)] hover:bg-[var(--color-brand-accent)] text-[var(--color-brand-text)] hover:text-black font-mono py-2 px-6 rounded transition-colors"
        >
          Select File
        </button>
      </div>

      {file && (
        <div className="mt-8 p-4 bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="font-mono text-[var(--color-brand-accent)] truncate max-w-xs">{file.name}</span>
            <span className="text-xs text-[var(--color-brand-muted)] font-mono">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>

          {status === 'idle' && (
            <button
              onClick={handleUpload}
              className="bg-[var(--color-brand-accent)] text-black font-mono py-1 px-4 rounded hover:bg-yellow-600 transition-colors"
            >
              Upload
            </button>
          )}
          {status === 'uploading' && <span className="text-[var(--color-brand-muted)] animate-pulse font-mono">Uploading...</span>}
          {status === 'success' && <CheckCircle className="text-[var(--color-brand-success)]" />}
          {status === 'error' && <XCircle className="text-[var(--color-brand-danger)]" />}
        </div>
      )}

      {status === 'success' && (
        <div className="mt-4 p-4 text-center text-sm font-mono text-[var(--color-brand-success)] bg-[#102410] border border-[var(--color-brand-success)] rounded">
          Document successfully uploaded and indexed.
        </div>
      )}
    </div>
  )
}
