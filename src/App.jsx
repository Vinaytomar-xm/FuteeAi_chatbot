import { useEffect, useRef, useState, useCallback } from 'react'
import { Bot, AlertCircle, X, Menu } from 'lucide-react'
import Sidebar from './components/Sidebar'
import ChatMessage, { TypingIndicator } from './components/ChatMessage'
import ChatInput from './components/ChatInput'
import { useChat } from './hooks/useChat'
import { ENV_API_KEY } from './api/groq'
import './App.css'

// Key is hardcoded in api/groq.js — no login screen, opens directly to chat
const API_KEY = ENV_API_KEY

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

export default function App() {
  const messagesEndRef = useRef(null)
  const isMobile = useIsMobile()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const {
    messages, chatHistory, model, setModel,
    isLoading, error, setError,
    sendMessage, newChat, loadChat, deleteChat, clearHistory,
  } = useChat(API_KEY)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleLoadChat = useCallback((id) => {
    loadChat(id)
    if (isMobile) setSidebarOpen(false)
  }, [loadChat, isMobile])

  const handleNewChat = useCallback(() => {
    newChat()
    if (isMobile) setSidebarOpen(false)
  }, [newChat, isMobile])

  // Always render chat directly — no key entry screen
  return (
    <div style={styles.layout}>
      {isMobile && sidebarOpen && (
        <div style={styles.backdrop} onClick={() => setSidebarOpen(false)} />
      )}

      <div style={{
        ...styles.sidebarWrap,
        ...(isMobile ? styles.sidebarMobile : {}),
        ...(isMobile && sidebarOpen ? styles.sidebarMobileOpen : {}),
      }}>
        <Sidebar
          chatHistory={chatHistory}
          model={model}
          setModel={setModel}
          onNewChat={handleNewChat}
          onLoadChat={handleLoadChat}
          onDeleteChat={deleteChat}
          onClearHistory={clearHistory}
          onClose={() => setSidebarOpen(false)}
          isMobile={isMobile}
        />
      </div>

      <main style={styles.main}>
        <header style={styles.topBar}>
          <div style={styles.topBarLeft}>
            {isMobile && (
              <button style={styles.hamburger} onClick={() => setSidebarOpen((o) => !o)}>
                <Menu size={20} />
              </button>
            )}
            <Bot size={16} style={{ color: 'var(--accent)' }} />
            <span style={styles.topBarTitle}> Chat With FuteeAI</span>
          </div>
          <div style={styles.statusDot} title="Connected" />
        </header>

        <div style={styles.messages}>
          {messages.length === 0 ? (
            <WelcomeScreen />
          ) : (
            <>
              {messages.map((msg, i) => (
                <ChatMessage key={i} message={msg} />
              ))}
              {isLoading && <TypingIndicator />}
            </>
          )}
          {error && (
            <div style={styles.errorBanner}>
              <AlertCircle size={14} style={{ flexShrink: 0 }} />
              <span style={styles.errorText}>{error}</span>
              <button style={styles.errorClose} onClick={() => setError(null)}>
                <X size={12} />
              </button>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </main>
    </div>
  )
}

function WelcomeScreen() {
  const suggestions = [
    'Explain quantum computing simply',
    'Write a Python hello world',
    'What is the meaning of life?',
    'Help me brainstorm app ideas',
  ]
  return (
    <div style={welcomeStyles.container}>
      <div style={welcomeStyles.glow} />
      <div style={welcomeStyles.icon}>⬡</div>
      <h2 style={welcomeStyles.heading}>How can I assist you?</h2>
      <p style={welcomeStyles.sub}>Fast & Free AI — powered by Groq</p>
      <div style={welcomeStyles.suggestions}>
        {suggestions.map((s) => (
          <div key={s} style={welcomeStyles.chip}>{s}</div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  layout: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    background: 'var(--bg-base)',
    position: 'relative',
  },
  backdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.55)',
    zIndex: 10,
    backdropFilter: 'blur(2px)',
  },
  sidebarWrap: {
    flexShrink: 0,
    height: '100%',
  },
  sidebarMobile: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    zIndex: 20,
    transform: 'translateX(-100%)',
    transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
  },
  sidebarMobileOpen: {
    transform: 'translateX(0)',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    minWidth: 0,
  },
  topBar: {
    height: 52,
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    background: 'var(--bg-surface)',
    flexShrink: 0,
  },
  topBarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  topBarTitle: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: '0.05em',
    color: 'var(--text-primary)',
  },
  hamburger: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: 4,
    borderRadius: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: 'var(--success)',
    boxShadow: '0 0 6px var(--success)',
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  errorBanner: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
    background: 'rgba(240, 92, 122, 0.08)',
    border: '1px solid rgba(240, 92, 122, 0.3)',
    borderRadius: 'var(--radius-sm)',
    padding: '12px 14px',
    color: 'var(--danger)',
    fontSize: 12,
    fontFamily: 'var(--font-mono)',
    lineHeight: 1.6,
  },
  errorText: { flex: 1, wordBreak: 'break-word' },
  errorClose: {
    marginLeft: 'auto',
    background: 'transparent',
    border: 'none',
    color: 'var(--danger)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    paddingTop: 2,
  },
}

const welcomeStyles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 32,
    position: 'relative',
    animation: 'fadeIn 0.5s ease-out',
  },
  glow: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: '50%',
    background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  icon: {
    fontSize: 44,
    color: 'var(--accent-bright)',
    lineHeight: 1,
    textShadow: '0 0 30px var(--accent)',
  },
  heading: {
    fontFamily: 'var(--font-display)',
    fontSize: 24,
    fontWeight: 800,
    color: 'var(--text-primary)',
    letterSpacing: '-0.02em',
    textAlign: 'center',
  },
  sub: {
    color: 'var(--text-secondary)',
    fontSize: 13,
    fontFamily: 'var(--font-mono)',
    textAlign: 'center',
  },
  suggestions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginTop: 8,
    maxWidth: 480,
  },
  chip: {
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    padding: '8px 14px',
    fontSize: 12,
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-secondary)',
    cursor: 'default',
  },
}
