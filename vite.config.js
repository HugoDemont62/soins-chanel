import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    // Configuration pour SPA en local
    historyApiFallback: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  // Configuration pour le mode preview
  preview: {
    port: 4173,
    open: true,
    historyApiFallback: true
  }
})