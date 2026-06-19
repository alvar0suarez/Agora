/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Configuración de Vite + PWA.
// La capa PWA es lo que hace a Agora instalable en Android y capaz de
// funcionar sin conexión (offline).
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon.svg'],
      manifest: {
        name: 'Agora',
        short_name: 'Agora',
        description: 'App personal local-first.',
        lang: 'es',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'icons/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      // Permite probar la PWA también en modo desarrollo.
      devOptions: {
        enabled: true,
      },
    }),
  ],
  // Vitest: tests de lógica pura (sin DOM), por eso environment 'node'.
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
