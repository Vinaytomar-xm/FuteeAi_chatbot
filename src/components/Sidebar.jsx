import { Trash2, MessageSquare, Plus, Clock, X } from 'lucide-react'
import { MODELS } from '../api/groq'

export default function Sidebar({
  chatHistory, model, setModel,
  onNewChat, onLoadChat, onDeleteChat, onClearHistory,
  onClose, isMobile,
}) {
  return (
    <aside style={styles.sidebar}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>⬡</span>
          <span style={styles.logoText}>FuteeAI</span>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.newChatBtn} onClick={onNewChat}>
            <Plus size={13} />
            New Chat
          </button>
          {/* Close button — only on mobile */}
          {isMobile && (
            <button style={styles.closeBtn} onClick={onClose} title="Close menu">
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Model Selector */}
      <div style={styles.section}>
        <p style={styles.sectionLabel}>MODEL</p>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          style={styles.select}
        >
          {Object.entries(MODELS).map(([label, value]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div style={styles.divider} />

      {/* Chat History */}
      <div style={styles.historySection}>
        <p style={styles.sectionLabel}>HISTORY</p>
        {chatHistory.length === 0 ? (
          <p style={styles.emptyText}>No saved chats yet</p>
        ) : (
          <div style={styles.historyList}>
            {chatHistory.map((chat) => (
              <div key={chat.id} style={styles.historyItem}>
                <button
                  style={styles.historyBtn}
                  onClick={() => onLoadChat(chat.id)}
                  title={chat.title}
                >
                  <MessageSquare size={12} style={{ flexShrink: 0, color: 'var(--accent)' }} />
                  <span style={styles.historyTitle}>{chat.title}</span>
                </button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => onDeleteChat(chat.id)}
                  title="Delete"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        {chatHistory.length > 0 && (
          <button style={styles.clearBtn} onClick={onClearHistory}>
            <Trash2 size={12} />
            Clear All History
          </button>
        )}
        <div style={styles.footerNote}>
          <Clock size={10} />
          <span>Powered by Groq</span>
        </div>
      </div>
    </aside>
  )
}

const styles = {
  sidebar: {
    width: '280px',
    flexShrink: 0,
    background: 'var(--bg-surface)',
    borderRight: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
  },
  header: {
    padding: '16px 14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid var(--border)',
    gap: 8,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  logoIcon: {
    fontSize: 18,
    color: 'var(--accent-bright)',
    lineHeight: 1,
  },
  logoText: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: 15,
    color: 'var(--text-primary)',
    letterSpacing: '0.05em',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  newChatBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    background: 'var(--accent)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '6px 10px',
    fontSize: 11,
    fontFamily: 'var(--font-mono)',
    fontWeight: 500,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: 4,
    borderRadius: 6,
  },
  section: {
    padding: '14px 14px 10px',
  },
  historySection: {
    padding: '14px 14px 0',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
  },
  sectionLabel: {
    fontSize: 9,
    letterSpacing: '0.15em',
    color: 'var(--text-muted)',
    fontWeight: 600,
    marginBottom: 8,
    fontFamily: 'var(--font-display)',
  },
  select: {
    width: '100%',
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--text-primary)',
    padding: '8px 10px',
    fontSize: 12,
    fontFamily: 'var(--font-mono)',
    cursor: 'pointer',
    outline: 'none',
  },
  divider: {
    height: 1,
    background: 'var(--border)',
    margin: '0 14px',
  },
  historyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    overflowY: 'auto',
    flex: 1,
    paddingRight: 2,
    paddingBottom: 8,
  },
  historyItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  historyBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 7,
    background: 'transparent',
    border: '1px solid transparent',
    borderRadius: '8px',
    color: 'var(--text-secondary)',
    padding: '7px 8px',
    fontSize: 12,
    fontFamily: 'var(--font-mono)',
    cursor: 'pointer',
    textAlign: 'left',
    minWidth: 0,
  },
  historyTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flex: 1,
  },
  deleteBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-muted)',
    padding: '6px',
    cursor: 'pointer',
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  footer: {
    padding: '12px 14px 16px',
    borderTop: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  clearBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    background: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--danger)',
    padding: '7px 10px',
    fontSize: 11,
    fontFamily: 'var(--font-mono)',
    cursor: 'pointer',
    width: '100%',
    justifyContent: 'center',
  },
  footerNote: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    color: 'var(--text-muted)',
    fontSize: 10,
    justifyContent: 'center',
    fontFamily: 'var(--font-display)',
  },
  emptyText: {
    color: 'var(--text-muted)',
    fontSize: 12,
    fontStyle: 'italic',
  },
}
