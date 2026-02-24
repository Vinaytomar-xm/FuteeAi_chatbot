# FuteeAI Chatbot — Vite + React

A fast, free AI chatbot built with Vite + React using the Groq API.

---

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173, enter your Groq key (get one free at https://console.groq.com/keys), and start chatting.

---

## Skip the Key-Entry Screen (Recommended)

Create a `.env.local` file in the project root:

```
VITE_GROQ_API_KEY=gsk_your_key_here
```

The app will detect it automatically and skip the login screen entirely.

---

## The 401 Error — Root Causes & Fixes

### Fix 1 — CORS Preflight (Primary Cause)
Browsers cannot call `https://api.groq.com` directly from `localhost` with an `Authorization` header — the browser sends a CORS preflight OPTIONS request first, which gets blocked before your POST even fires.

**Fix:** `vite.config.js` now proxies `/api/groq → https://api.groq.com/openai/v1` through Vite's dev server (server-to-server, no CORS).

### Fix 2 — Stale `apiKey` Closure
`sendMessage` was created with `useCallback([..., apiKey])`. If the key changed after first render, the callback still held the old key.

**Fix:** `useChat.js` stores the key in a `useRef` and always reads `apiKeyRef.current`.

### Fix 3 — No Key Format Validation
Any string was sent to Groq without checking format first.

**Fix:** `validateApiKey()` checks for the `gsk_` prefix and minimum length before any network call.

### Fix 4 — Swallowed Error Details
The 401 handler discarded the real Groq error body, showing only `"Invalid API Key"`.

**Fix:** `groq.js` now parses and surfaces the full Groq error message in the UI.

### Fix 5 — No Way to Change a Bad Key
Once a wrong key was saved, the only fix was clearing DevTools manually.

**Fix:** A **Change Key** button in the top bar resets the key instantly.

---

## Production Note

The Vite proxy only works during `npm run dev`. For production you need your own backend proxy — never expose your API key in a public frontend build.

---

## Project Structure

```
src/
├── api/groq.js          # Groq API + key validation
├── hooks/useChat.js     # Chat state (useRef stale closure fix)
├── components/
│   ├── ApiKeySetup.jsx  # Key entry with inline validation + env var support
│   ├── Sidebar.jsx      # History + model selector
│   ├── ChatMessage.jsx  # Message bubbles + typing indicator
│   └── ChatInput.jsx    # Textarea + send button
├── App.jsx              # Layout + Change Key button
└── index.css            # CSS variables
vite.config.js           # Dev proxy (THE CORS FIX)
.env.example             # Copy to .env.local with your key
```
