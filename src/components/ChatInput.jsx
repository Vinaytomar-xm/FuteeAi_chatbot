import { useState } from 'react'
import { Send } from 'lucide-react'

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('')

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  function submit() {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }

  return (
    <div style={styles.container}>
      <div style={styles.inputRow}>
        <textarea
          style={styles.textarea}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Chat with futeeAI... (Enter to send, Shift+Enter for newline)"
          disabled={disabled}
          rows={1}
        />
        <button
          style={{
            ...styles.sendBtn,
            opacity: !value.trim() || disabled ? 0.4 : 1,
          }}
          onClick={submit}
          disabled={!value.trim() || disabled}
        >
          <Send size={16} />
        </button>
      </div>
      <p style={styles.hint}>@ 2026⚡Build wiith Vinay Singh Tomar</p>
    </div>
  )
}

const styles = {
  container: {
    padding: '12px 20px 16px',
    borderTop: '1px solid var(--border)',
    background: 'var(--bg-surface)',
  },
  inputRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 10,
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '8px 8px 8px 14px',
    transition: 'border-color 0.2s',
  },
  textarea: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-mono)',
    fontSize: 13,
    lineHeight: 2.5,
    resize: 'none',
    maxHeight: 160,
    overflowY: 'auto',
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    background: 'var(--accent)',
    border: 'none',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'all 0.15s',
  },
  hint: {
    fontSize: 10,
    color: 'var(--text-muted)',
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'var(--font-display)',
    letterSpacing: '0.05em',
  },
}
