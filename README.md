# ⬡ FuteeAI Chatbot

> A fast, free AI chatbot built with **Vite + React** powered by **Groq API** — blazing fast inference, no OpenAI costs.

<div align="center">

![FuteeAI Chatbot](https://img.shields.io/badge/FuteeAI-Chatbot-7c6af5?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Groq](https://img.shields.io/badge/Groq-API-F55036?style=for-the-badge)

### 🚀 [Live Demo → futeeai-chatbot.vercel.app](https://chatwithfutee.vercel.app)

</div>

---

## ✨ Features

- ⚡ **Blazing fast** — powered by Groq (fastest LLM inference available)
- 🤖 **Multiple AI models** — Llama 3.1 8B, Llama 3.3 70B, Mixtral 8x7B, Gemma 2 9B
- 💬 **Chat history** — saves up to 20 conversations in browser session
- 📱 **Fully responsive** — hamburger sidebar on mobile/tablet, static on desktop
- 🎨 **Beautiful dark UI** — custom design with Syne + JetBrains Mono fonts
- ✅ **Markdown rendering** — bold, italic, inline code, code blocks
- 🔐 **No login required** — opens directly to chat

---

## 📸 Preview

```
┌─────────────────────────────────────────────┐
│  ⬡ FuteeAI          ⬡ FuteeAI    🟢        │
│  ➕ New Chat  ────────────────────────────  │
│                                              │
│  MODEL                 How can I assist you? │
│  [Llama 3.1 8B ▾]                           │
│                   ┌─────────────────────┐    │
│  HISTORY          │ tell me about AI    │    │
│  💬 tell me...  🗑│ ───────────────     │    │
│  💬 write code  🗑│ I'm an AI assistant │    │
│                   └─────────────────────┘    │
│  🗑 Clear History                            │
│  ⚡ Powered by Groq   [Type a message... ➤] │
└─────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| Groq API | AI inference (free tier available) |
| Lucide React | Icons |
| CSS Variables | Theming |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A free Groq API key from [console.groq.com/keys](https://console.groq.com/keys)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/futeeai-chatbot.git
cd futeeai-chatbot

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open in browser
# → http://localhost:5173
```

### Environment Variables (optional)

Create a `.env.local` file to use your own key:

```env
VITE_GROQ_API_KEY=gsk_your_key_here
```

---

## 📦 Project Structure

```
futeeai-chatbot/
├── public/
├── src/
│   ├── api/
│   │   └── groq.js          # Groq API calls + model list
│   ├── components/
│   │   ├── Sidebar.jsx       # Chat history + model selector
│   │   ├── ChatMessage.jsx   # Message bubbles + typing indicator
│   │   └── ChatInput.jsx     # Textarea + send button
│   ├── hooks/
│   │   └── useChat.js        # Chat state management
│   ├── App.jsx               # Main layout + responsive sidebar
│   ├── App.css               # CSS media queries + animations
│   └── index.css             # CSS variables + global styles
├── vite.config.js            # Vite + proxy config
├── vercel.json               # Vercel API proxy rewrite
└── package.json
```

---

## 🌐 Deploying to Vercel

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/futeeai-chatbot.git
git push -u origin main
```

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo
3. Framework: **Vite** (auto-detected)
4. Click **Deploy** ✅

> Vercel auto-deploys on every `git push` to main.

---

## 🤖 Available Models

| Model | Speed | Best For |
|-------|-------|----------|
| Llama 3.1 8B | ⚡⚡⚡ Fastest | Quick answers, everyday chat |
| Llama 3.3 70B | ⚡⚡ Fast | Complex reasoning, detailed answers |
| Mixtral 8x7B | ⚡⚡ Fast | Coding, multilingual |
| Gemma 2 9B | ⚡⚡ Fast | Precise, factual responses |

---

## 📱 Responsive Behavior

| Screen Size | Sidebar | Navigation |
|-------------|---------|------------|
| Desktop (≥768px) | Always visible | Static left panel |
| Tablet / Mobile (<768px) | Hidden by default | ☰ Hamburger toggle |

---

## 📄 License

MIT © [FuteeAI](https://github.com/Vinaytomar-xm/FuteeAi-chatbot)

---

<div align="center">
  Made with ❤️ using React + Groq
  <br/>
  <a href="https://futeeai-chatbot.vercel.app">🚀 Live Demo</a> •
  <a href="https://console.groq.com/keys">🔑 Get Free API Key</a> •
  <a href="https://github.com/Vinaytomar-xm/FuteeAi-chatbot">⭐ Star on GitHub</a>
</div>
