import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/gemini-web-browsing-app/',
  server: {
    port: 9000,
    proxy: {
      '/api': 'http://localhost:2000',
    },
  },
})
