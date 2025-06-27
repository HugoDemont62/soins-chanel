import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    // Configuration pour SPA - redirige toutes les routes vers index.html
    historyApiFallback: {
      // Redirige toutes les routes vers index.html sauf les fichiers statiques
      rewrites: [
        { from: /^\/(?!api|assets|public).*/, to: '/index.html' }
      ]
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  // Configuration pour le mode preview aussi
  preview: {
    port: 4173,
    open: true,
    historyApiFallback: true
  }
})