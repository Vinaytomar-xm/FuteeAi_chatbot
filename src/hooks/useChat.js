import { useState, useCallback, useRef } from 'react'
import { getAIResponse } from '../api/groq'

const MAX_HISTORY = 20

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function getTitle(messages) {
  const first = messages.find((m) => m.role === 'user')
  if (!first) return 'New Chat'
  return first.content.length > 50
    ? first.content.slice(0, 50) + '…'
    : first.content
}

function getTimestamp() {
  return new Date().toLocaleString('en-US', {
    month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export function useChat(apiKey) {
  const [messages, setMessages] = useState([])
  const [chatHistory, setChatHistory] = useState([])
  const [model, setModel] = useState('llama-3.1-8b-instant')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // FIX: Store apiKey in a ref so sendMessage always reads the latest value
  // without needing apiKey in its dependency array. Without this, if the
  // parent re-renders with a new apiKey (e.g. after key change), sendMessage
  // still holds the old key from its original closure — causing silent 401s.
  const apiKeyRef = useRef(apiKey)
  apiKeyRef.current = apiKey

  const saveCurrentChat = useCallback((msgs, mdl) => {
    if (msgs.length === 0) return
    const entry = {
      id: generateId(),
      title: getTitle(msgs),
      timestamp: getTimestamp(),
      messages: msgs,
      model: mdl,
    }
    setChatHistory((prev) => [entry, ...prev].slice(0, MAX_HISTORY))
  }, [])

  const sendMessage = useCallback(async (content) => {
    setError(null)
    const userMsg = { role: 'user', content }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setIsLoading(true)

    try {
      // FIX: Read from ref, not from closure — always the freshest key
      const reply = await getAIResponse(
        newMessages.map(({ role, content }) => ({ role, content })),
        model,
        apiKeyRef.current,
      )
      const aiMsg = { role: 'assistant', content: reply }
      const finalMessages = [...newMessages, aiMsg]
      setMessages(finalMessages)
      saveCurrentChat(finalMessages, model)
    } catch (err) {
      setError(err.message)
      // Roll back the user message so they can retry cleanly
      setMessages(messages)
    } finally {
      setIsLoading(false)
    }
  }, [messages, model, saveCurrentChat])
  // NOTE: apiKey intentionally NOT in deps — we use apiKeyRef.current instead.

  const newChat = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  const loadChat = useCallback((id) => {
    const chat = chatHistory.find((c) => c.id === id)
    if (chat) {
      setMessages(chat.messages)
      setModel(chat.model)
      setError(null)
    }
  }, [chatHistory])

  const deleteChat = useCallback((id) => {
    setChatHistory((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const clearHistory = useCallback(() => {
    setChatHistory([])
  }, [])

  return {
    messages, chatHistory, model, setModel,
    isLoading, error, setError,
    sendMessage, newChat, loadChat, deleteChat, clearHistory,
  }
}
