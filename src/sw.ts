/// <reference lib="webworker" />
/**
 * Service worker propio (estrategia `injectManifest` de vite-plugin-pwa).
 *
 * Hace DOS cosas:
 * 1. Lo mismo que hacía el SW generado (`generateSW`): precache de la app y
 *    fallback de navegación → Agora instalable y offline, con auto-update
 *    (skipWaiting + clientsClaim, como `registerType: 'autoUpdate'`).
 * 2. Web Share Target: recibe el POST del sistema cuando compartes un fichero
 *    con Agora («Estudiar en Agora» desde Nous), guarda su contenido en el
 *    Cache Storage (bandeja `nous-inbox`) y redirige a la app abierta en la
 *    feature `nous`, que lo importa y vacía la bandeja.
 *
 * Se typechequea con tsconfig.sw.json (lib WebWorker; la lib DOM del proyecto
 * choca con WebWorker y por eso va en un tsconfig aparte).
 */
import { clientsClaim } from 'workbox-core'
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'

declare const self: ServiceWorkerGlobalScope & {
  /** Lo inyecta vite-plugin-pwa en build (lista de precache). */
  __WB_MANIFEST: Parameters<typeof precacheAndRoute>[0]
}

/** Bandeja de entrada del share: una sola entrada, se consume al importar. */
const INBOX_CACHE = 'nous-inbox'
const INBOX_KEY = '/nous-inbox.json'

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  if (
    event.request.method === 'POST' &&
    url.origin === self.location.origin &&
    url.pathname.endsWith('/share-nous')
  ) {
    event.respondWith(handleShare(event))
  }
})

async function handleShare(event: FetchEvent): Promise<Response> {
  try {
    const form = await event.request.formData()
    const file = form.get('vocab')
    if (file instanceof File) {
      const cache = await caches.open(INBOX_CACHE)
      await cache.put(
        INBOX_KEY,
        new Response(await file.text(), {
          headers: { 'Content-Type': 'application/json' },
        }),
      )
    }
  } catch {
    // Si el formulario no trae fichero, aterrizamos en la app igualmente:
    // la feature explica cómo importar a mano.
  }
  // 303: el navegador hace GET a la app; `?f=nous` abre la feature que importa.
  return Response.redirect('./?f=nous', 303)
}

// ── Precache / offline (equivalente al SW que generaba generateSW) ──────
self.skipWaiting()
clientsClaim()
cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST)
registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html')))
