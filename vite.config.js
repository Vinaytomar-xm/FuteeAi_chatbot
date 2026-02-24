import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// FIX: Proxy /api/groq → https://api.groq.com/openai/v1
// This solves the CORS preflight 401 that browsers trigger when sending
// an Authorization header cross-origin. The Vite dev server forwards the
// request server-side (no CORS restrictions) and passes all headers through.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/groq': {
        target: 'https://api.groq.com',
        changeOrigin: true,           // sets Host header to api.groq.com
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/groq/, '/openai/v1'),
        // e.g. /api/groq/chat/completions → /openai/v1/chat/completions
      },
    },
  },
})
