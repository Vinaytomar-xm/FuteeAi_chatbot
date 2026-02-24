// API key hardcoded — no login screen needed
export const ENV_API_KEY = import.meta.env.VITE_GROQ_API_KEY || HARDCODED_KEY

const GROQ_API_URL = '/api/groq/chat/completions'

export const MODELS = {
  'Llama 3.1 8B (Fast)': 'llama-3.1-8b-instant',
  'Llama 3.3 70B': 'llama-3.3-70b-versatile',
  'Mixtral 8x7B': 'mixtral-8x7b-32768',
  'Gemma 2 9B': 'gemma2-9b-it',
}

export function validateApiKey(key) {
  if (!key || typeof key !== 'string') return 'API key is required.'
  if (!key.startsWith('gsk_')) return 'Invalid key format — Groq keys start with "gsk_".'
  if (key.length < 40) return 'Key looks too short.'
  return null
}

export async function getAIResponse(messages, model, apiKey) {
  const validationError = validateApiKey(apiKey)
  if (validationError) throw new Error(validationError)

  let response
  try {
    response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model, messages, temperature: 0.7, max_tokens: 1024 }),
    })
  } catch (networkErr) {
    throw new Error(`Network error — make sure "npm run dev" is running. Detail: ${networkErr.message}`)
  }

  if (!response.ok) {
    let detail = `HTTP ${response.status}`
    try {
      const errBody = await response.json()
      detail = errBody?.error?.message || JSON.stringify(errBody)
    } catch {
      detail = await response.text().catch(() => `HTTP ${response.status}`)
    }
    if (response.status === 401) throw new Error(`401 Unauthorized — ${detail}. Check your Groq key at console.groq.com/keys.`)
    if (response.status === 429) throw new Error(`429 Rate Limited — ${detail}. Wait a moment and try again.`)
    throw new Error(`API Error ${response.status} — ${detail}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}
