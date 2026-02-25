import { useEffect, useRef, useState, useCallback } from 'react'
import { Bot, AlertCircle, X, Menu } from 'lucide-react'
import Sidebar from './components/Sidebar'
import ChatMessage, { TypingIndicator } from './components/ChatMessage'
import ChatInput from './components/ChatInput'
import { useChat } from './hooks/useChat'
import { ENV_API_KEY } from './api/groq'
import './App.css'

const API_KEY = ENV_API_KEY

export default function App() {
  const messagesEndRef = useRef(null)
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
    setSidebarOpen(false)
  }, [loadChat])

  const handleNewChat = useCallback(() => {
    newChat()
    setSidebarOpen(false)
  }, [newChat])

  return (
    <div className="app-layout">
      {/* Backdrop — only visible on mobile when sidebar is open */}
      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`sidebar-wrap ${sidebarOpen ? 'open' : ''}`}>
        <Sidebar
          chatHistory={chatHistory}
          model={model}
          setModel={setModel}
          onNewChat={handleNewChat}
          onLoadChat={handleLoadChat}
          onDeleteChat={deleteChat}
          onClearHistory={clearHistory}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main */}
      <main className="app-main">
        <header className="app-topbar">
          <div className="topbar-left">
            {/* Hamburger — CSS shows on mobile, hides on desktop */}
            <button
              className="hamburger-btn"
              onClick={() => setSidebarOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <Menu size={22} />
            </button>
            {/* <Bot size={16} color="var(--accent)" /> */}
            <span style={styles.logoIcon}>⬡</span>
            <span className="topbar-title">ChatWithFuteeAI</span>
          </div>
          <div className="topbar-right">
            {/* New Chat — CSS shows on mobile, hides on desktop */}
            <button className="topbar-new-chat" onClick={handleNewChat}>
              + New Chat
            </button>
            <span className="status-dot" title="Connected" />
          </div>
        </header>

        <div className="messages-area" ref={messagesEndRef}>
          <div className="messages-inner">
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
              <div className="error-banner">
                <AlertCircle size={14} style={{ flexShrink: 0 }} />
                <span className="error-text">{error}</span>
                <button className="error-close" onClick={() => setError(null)}>
                  <X size={12} />
                </button>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </main>
    </div>
  )
}

function WelcomeScreen() {
  const suggestions = [
    'Explain quantum computing simply',
    'Help me write a code snippet',
    'What is the meaning of life?',
    'Help me brainstorm app ideas',
  ]
  return (
    <div className="welcome">
      <div className="welcome-glow" />
      <div className="welcome-icon">⬡</div>
      <h2 className="welcome-heading">How can I assist you?</h2>
      <p className="welcome-sub">Fast & Free AI Chatbot</p>
      <div className="welcome-chips">
        {suggestions.map((s) => (
          <div key={s} className="welcome-chip">{s}</div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  logoIcon: {
    fontSize: 20,
    color: 'var(--accent-bright)',
    lineHeight: 1,
  }
}
