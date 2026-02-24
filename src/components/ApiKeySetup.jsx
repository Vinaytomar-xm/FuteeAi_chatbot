import { useState } from 'react'
import { Key, ExternalLink, AlertCircle } from 'lucide-react'
import { validateApiKey, ENV_API_KEY } from '../api/groq'

export default function ApiKeySetup({ onSave }) {
  // FIX: Pre-fill from VITE_GROQ_API_KEY env var if present.
  // Users can create .env.local with VITE_GROQ_API_KEY=gsk_... to skip this screen.
  const [key, setKey] = useState(ENV_API_KEY)
  const [validationError, setValidationError] = useState(null)

  // FIX: Auto-save immediately if env var is already set and valid
  if (ENV_API_KEY && !validateApiKey(ENV_API_KEY)) {
    onSave(ENV_API_KEY)
    return null
  }

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = key.trim()
    // FIX: Validate key format before even trying to call the API
    const err = validateApiKey(trimmed)
    if (err) {
      setValidationError(err)
      return
    }
    setValidationError(null)
    onSave(trimmed)
  }

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <div style={styles.iconWrap}>
          <Key size={24} style={{ color: 'var(--accent-bright)' }} />
        </div>
        <h1 style={styles.title}>FuteeAI Chatbot</h1>
        <p style={styles.subtitle}>Enter your Groq API key to get started</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputWrapper}>
            <input
              type="password"
              placeholder="gsk_..."
              value={key}
              onChange={(e) => {
                setKey(e.target.value)
                setValidationError(null) // clear error on change
              }}
              style={{
                ...styles.input,
                borderColor: validationError ? 'var(--danger)' : undefined,
              }}
              autoFocus
            />
            {/* FIX: Show format validation error inline before any network call */}
            {validationError && (
              <div style={styles.inlineError}>
                <AlertCircle size={12} />
                <span>{validationError}</span>
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={!key.trim()}
            style={{ ...styles.btn, opacity: key.trim() ? 1 : 0.5 }}
          >
            Start Chatting
          </button>
        </form>

        <a
          href="https://console.groq.com/keys"
          target="_blank"
          rel="noreferrer"
          style={styles.link}
        >
          <ExternalLink size={12} />
          Get a free Groq API key at console.groq.com
        </a>

        {/* FIX: Inform users about the .env.local option */}
        <div style={styles.envNote}>
          <code style={styles.code}>VITE_GROQ_API_KEY=gsk_...</code>
          <span style={styles.envLabel}>in .env.local to skip this screen</span>
        </div>

        <p style={styles.note}>Key is stored only in your browser session (sessionStorage).</p>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'var(--bg-base)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 440,
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '40px 36px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 14,
    animation: 'fadeIn 0.4s ease-out',
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    background: 'var(--accent-glow)',
    border: '1px solid var(--accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 26,
    fontWeight: 800,
    color: 'var(--text-primary)',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: 13,
    fontFamily: 'var(--font-mono)',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginTop: 8,
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  input: {
    width: '100%',
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-primary)',
    padding: '12px 14px',
    fontSize: 13,
    fontFamily: 'var(--font-mono)',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  inlineError: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    color: 'var(--danger)',
    fontSize: 12,
    fontFamily: 'var(--font-mono)',
  },
  btn: {
    width: '100%',
    background: 'var(--accent)',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    color: '#fff',
    padding: '12px',
    fontSize: 14,
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    cursor: 'pointer',
    letterSpacing: '0.03em',
    transition: 'all 0.15s',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    color: 'var(--accent-bright)',
    fontSize: 12,
    fontFamily: 'var(--font-mono)',
    textDecoration: 'none',
    marginTop: 4,
  },
  envNote: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
    justifyContent: 'center',
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    padding: '8px 12px',
    width: '100%',
  },
  code: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--accent-bright)',
  },
  envLabel: {
    fontSize: 11,
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-mono)',
  },
  note: {
    color: 'var(--text-muted)',
    fontSize: 11,
    fontFamily: 'var(--font-mono)',
    textAlign: 'center',
  },
}

