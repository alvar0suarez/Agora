/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Configuración de Vite + PWA.
// La capa PWA es lo que hace a Agora instalable en Android y capaz de
// funcionar sin conexión (offline).
//
// `base`: en producción la app se publica en GitHub Pages bajo
// `https://<usuario>.github.io/Agora/`, así que las rutas cuelgan de `/Agora/`.
// En desarrollo (`npm run dev`) se queda en la raíz `/` por comodidad.
// Identificador de build visible en la app (pie de página). Sirve para saber,
// desde el móvil, si la PWA está sirviendo la última versión o una cacheada.
const buildId = new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Agora/' : '/',
  define: {
    __BUILD_ID__: JSON.stringify(buildId),
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon.svg'],
      // SW propio (src/sw.ts): mismo precache/offline que generaba generateSW,
      // más el manejador del Web Share Target (recibir vocabulario desde Nous).
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      // Precache offline: el set por defecto no incluye audio, así que añadimos
      // .wav (clips eSpeak) y .m4a (grabaciones humanas) para que suenen sin conexión.
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg,wav,m4a}'],
        // Las muestras A/B de voz (audio/samples) son material de decisión, no
        // de la app: fuera del precache offline para no engordar la PWA.
        globIgnores: ['**/audio/samples/**'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
      manifest: {
        name: 'Agora',
        short_name: 'Agora',
        description: 'App personal local-first.',
        lang: 'es',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait',
        // start_url y scope se derivan automáticamente de `base` (no los fijamos
        // a '/', que rompería la instalación bajo /Agora/ en GitHub Pages).
        icons: [
          {
            src: 'icons/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
        // Web Share Target: Agora aparece en el share sheet de Android para
        // ficheros JSON («Estudiar en Agora» desde Nous). El POST lo atiende
        // src/sw.ts, que deja el fichero en la bandeja y abre la feature nous.
        // `action` es relativa al scope (en Pages: /Agora/share-nous).
        share_target: {
          action: 'share-nous',
          method: 'POST',
          enctype: 'multipart/form-data',
          params: {
            files: [
              { name: 'vocab', accept: ['application/json', '.json'] },
            ],
          },
        },
      },
      // Permite probar la PWA también en modo desarrollo (module: el SW de
      // injectManifest se sirve sin bundlear en dev).
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],
  // Vitest: tests de lógica pura (sin DOM), por eso environment 'node'.
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
}))
