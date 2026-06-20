import { useEffect, useMemo, useState } from 'react'
import { getFeatures } from '../core/plugin/registry'
import { useAudioEnabled, loadAudioSetting } from '../core/settings'
import { requestPersistentStorage } from '../core/storage/persist'
import { NavigationProvider } from '../core/ui/navigation'
import { registerFeatures } from './features'

// Registramos los features una sola vez, al cargar el módulo del shell.
registerFeatures()

export function App() {
  const features = useMemo(() => getFeatures(), [])
  const [activeId, setActiveId] = useState<string | null>(
    features[0]?.id ?? null,
  )
  const [audioOn, toggleAudio] = useAudioEnabled()

  // Al arrancar: cargamos la preferencia de audio y pedimos almacenamiento
  // persistente (best-effort) para blindar los datos locales.
  useEffect(() => {
    void loadAudioSetting()
    void requestPersistentStorage()
  }, [])

  const active = features.find((f) => f.id === activeId) ?? null

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <h1 className="app__title">Agora</h1>
          <p className="app__subtitle">App personal · local-first</p>
        </div>
        <button
          type="button"
          className="app__audio"
          aria-pressed={audioOn}
          aria-label={audioOn ? 'Silenciar audio' : 'Activar audio'}
          title={audioOn ? 'Audio activado (tocar para silenciar)' : 'Audio silenciado (tocar para activar)'}
          onClick={toggleAudio}
        >
          {audioOn ? '🔊' : '🔇'}
        </button>
      </header>

      <main className="app__main">
        <NavigationProvider goTo={setActiveId}>
          {active ? (
            <active.Screen />
          ) : (
            <p className="empty">
              Aún no hay funcionalidades. Las crearemos juntos.
            </p>
          )}
        </NavigationProvider>
      </main>

      {features.length > 0 ? (
        <nav className="app__nav">
          {features.map((f) => (
            <button
              key={f.id}
              className={`nav-btn${f.id === activeId ? ' nav-btn--active' : ''}`}
              onClick={() => setActiveId(f.id)}
            >
              {f.title}
            </button>
          ))}
        </nav>
      ) : null}

      <footer className="app__version">build {__BUILD_ID__}</footer>
    </div>
  )
}
