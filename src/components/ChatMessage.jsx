import { Bot, User } from 'lucide-react'

function parseMarkdown(text) {
  // Basic markdown: bold, inline code, code blocks, line breaks
  return text
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br />')
}

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  return (
    <div style={{ ...styles.wrapper, justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      {!isUser && (
        <div style={styles.avatar}>
          <Bot size={14} />
        </div>
      )}
      <div
        style={{
          ...styles.bubble,
          ...(isUser ? styles.userBubble : styles.aiBubble),
        }}
        dangerouslySetInnerHTML={{ __html: parseMarkdown(message.content) }}
      />
      {isUser && (
        <div style={{ ...styles.avatar, ...styles.userAvatar }}>
          <User size={14} />
        </div>
      )}
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div style={{ ...styles.wrapper, justifyContent: 'flex-start' }}>
      <div style={styles.avatar}>
        <Bot size={14} />
      </div>
      <div style={{ ...styles.bubble, ...styles.aiBubble, ...styles.typingBubble }}>
        <span style={{ ...styles.dot, animationDelay: '0ms' }} />
        <span style={{ ...styles.dot, animationDelay: '150ms' }} />
        <span style={{ ...styles.dot, animationDelay: '300ms' }} />
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 10,
    animation: 'fadeIn 0.25s ease-out',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 8,
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--accent)',
    flexShrink: 0,
  },
  userAvatar: {
    color: 'var(--text-secondary)',
    border: '1px solid var(--user-border)',
    background: 'var(--user-bubble)',
  },
  bubble: {
    maxWidth: '72%',
    padding: '10px 14px',
    borderRadius: 'var(--radius)',
    fontSize: 13,
    lineHeight: 1.65,
    fontFamily: 'var(--font-mono)',
  },
  userBubble: {
    background: 'var(--user-bubble)',
    border: '1px solid var(--user-border)',
    color: 'var(--text-primary)',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    background: 'var(--ai-bubble)',
    border: '1px solid var(--ai-border)',
    color: 'var(--text-primary)',
    borderBottomLeftRadius: 4,
  },
  typingBubble: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    padding: '12px 16px',
  },
  dot: {
    display: 'inline-block',
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: 'var(--accent)',
    animation: 'pulse 1.2s infinite',
  },
}
