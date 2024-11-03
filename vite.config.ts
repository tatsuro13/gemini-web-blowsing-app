import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/gemini-web-browsing-app/',
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})
