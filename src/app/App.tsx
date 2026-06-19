import { useMemo, useState } from 'react'
import { getFeatures } from '../core/plugin/registry'
import { registerFeatures } from './features'

// Registramos los features una sola vez, al cargar el módulo del shell.
registerFeatures()

export function App() {
  const features = useMemo(() => getFeatures(), [])
  const [activeId, setActiveId] = useState<string | null>(
    features[0]?.id ?? null,
  )

  const active = features.find((f) => f.id === activeId) ?? null

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Agora</h1>
        <p className="app__subtitle">App personal · local-first</p>
      </header>

      <main className="app__main">
        {active ? (
          <active.Screen />
        ) : (
          <p className="empty">
            Aún no hay funcionalidades. Las crearemos juntos.
          </p>
        )}
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
    </div>
  )
}
