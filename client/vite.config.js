import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages/*': '/src/pages/*',
      '@hooks': '/src/hooks'
    }
  },
  plugins: [react()]
})
