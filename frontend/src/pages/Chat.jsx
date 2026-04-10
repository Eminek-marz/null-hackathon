import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Code2 } from 'lucide-react'
import MasteryToggle from '../components/MasteryToggle'

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', content: "Hello! I'm your AI Study Buddy. Ask me anything about your uploaded materials." }
  ])
  const [input, setInput] = useState('')
  const [isCodeMode, setIsCodeMode] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMsg = { id: Date.now(), role: 'user', content: input }
    setMessages(prev => [...prev, newMsg])
    setInput('')

    // Simulate bot response
    setTimeout(() => {
      const modeText = isCodeMode 
        ? "Here is the code representation..." 
        : "Here is a simple explanation..."
      
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        role: 'bot', 
        content: modeText,
        isCodeResponse: isCodeMode
      }])
    }, 1000)
  }

  return (
    <div className="max-w-4xl mx-auto h-[80vh] flex flex-col bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] rounded-xl overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-[var(--color-brand-border)] bg-[var(--color-brand-bg)] flex justify-between items-center z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <Bot className="text-[var(--color-brand-accent)] w-6 h-6" />
          <div>
            <h2 className="font-display text-lg text-[var(--color-brand-accent)]">Study Assistant</h2>
            <p className="text-xs font-mono text-[var(--color-brand-muted)]">Data Structures Unit</p>
          </div>
        </div>
        <MasteryToggle isCodeMode={isCodeMode} setIsCodeMode={setIsCodeMode} />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 flex flex-col hide-scrollbar h-full bg-[#0a0a0a]">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] gap-3 items-end ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)]' : 'bg-[var(--color-brand-accent)] bg-opacity-10 border border-[var(--color-brand-accent)]'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-[#e8e2d5]" /> : <Bot className="w-5 h-5 text-[var(--color-brand-accent)]" />}
              </div>
              <div 
                className={`p-4 rounded-2xl font-body leading-relaxed text-[0.95rem] ${
                  msg.role === 'user' 
                    ? 'bg-[#1d1f1c] text-[#e8e2d5] rounded-br-sm border border-[var(--color-brand-border)]'
                    : msg.isCodeResponse
                      ? 'bg-[#0f1110] text-[#a0a59a] font-mono text-sm border border-l-2 border-l-[var(--color-brand-accent)] border-[var(--color-brand-border)] rounded-bl-sm'
                      : 'bg-[#161714] text-[#e8e2d5] rounded-bl-sm border border-[var(--color-brand-border)]'
                }`}
              >
                {msg.isCodeResponse && (
                  <div className="flex items-center gap-2 mb-2 text-xs text-[var(--color-brand-accent)] border-b border-[var(--color-brand-border)] pb-2 mb-3">
                    <Code2 className="w-3 h-3" /> Code Explanation Mode
                  </div>
                )}
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-[var(--color-brand-bg)] border-t border-[var(--color-brand-border)]">
        <form onSubmit={handleSend} className="relative flex items-center max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about the study materials..."
            className="w-full bg-[#161714] text-[#e8e2d5] font-body rounded-full py-4 pl-6 pr-16 border border-[var(--color-brand-border)] focus:outline-none focus:border-[var(--color-brand-accent)] focus:ring-1 focus:ring-[var(--color-brand-accent)] transition-all shadow-inner placeholder-[var(--color-brand-muted)]"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="absolute right-2 bg-[var(--color-brand-accent)] hover:bg-yellow-600 disabled:opacity-50 disabled:hover:bg-[var(--color-brand-accent)] text-black p-2.5 rounded-full transition-transform active:scale-95"
          >
            <Send className="w-5 h-5 -ml-0.5" />
          </button>
        </form>
        <p className="text-center text-[10px] font-mono text-[var(--color-brand-muted)] mt-3">Study Buddy AI can make mistakes. Verify important facts.</p>
      </div>
    </div>
  )
}
