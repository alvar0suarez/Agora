import { useEffect, useState } from 'react'
import {
  loadProgress,
  levelFromXp,
  READING_BANDS,
  emptyProgress,
  type ProgressState,
} from '../../core/progress'
import { Card } from '../../core/ui/Card'

/** Estado de cada parada del camino respecto a tu nivel actual. */
type StageStatus = 'done' | 'current' | 'locked'

/** Presentación de cada banda: nombre amable, descripción e icono. */
const STAGE_INFO: Record<string, { name: string; blurb: string; icon: string }> = {
  Cimientos: {
    name: 'Cimientos',
    blurb: 'El alfabeto y los primeros sonidos del griego.',
    icon: '🪨',
  },
  A1: {
    name: 'A1 · Primeros pasos',
    blurb: 'Palabras frecuentes y frases muy simples.',
    icon: '🌱',
  },
  A2: {
    name: 'A2 · Básico',
    blurb: 'Más vocabulario y las formas elementales (casos, presente).',
    icon: '🌿',
  },
  B1: {
    name: 'B1 · Intermedio',
    blurb: 'Leer frases y textos sencillos con apoyo.',
    icon: '🌳',
  },
  B2: {
    name: 'B2 · Avanzado',
    blurb: 'Leer prosa ática y filosofía con apoyo. ¡La meta!',
    icon: '🏛️',
  },
}

/**
 * Camino: mapa interactivo del viaje de cero hasta leer griego antiguo. Cada
 * parada es una banda de lectura (Cimientos → A1 → A2 → B1 → B2); tu nivel marca
 * dónde estás. Una ruta vertical con nodos: completados, el actual (con pulso) y
 * los que quedan por desbloquear. Solo lee el progreso.
 */
export function CaminoScreen() {
  const [progress, setProgress] = useState<ProgressState>(emptyProgress())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    void (async () => {
      const p = await loadProgress()
      if (alive) {
        setProgress(p)
        setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  const lvl = levelFromXp(progress.xp)

  // Índice de la banda actual: la última cuyo nivel mínimo ya has alcanzado.
  let currentIndex = 0
  READING_BANDS.forEach((b, i) => {
    if (lvl.level >= b.from) currentIndex = i
  })

  return (
    <div className="camino">
      <Card title="Tu camino al griego antiguo">
        {loading ? (
          <p>Cargando…</p>
        ) : (
          <p>
            Estás en <strong>{lvl.band}</strong>, nivel{' '}
            <strong>{lvl.level}</strong>. Cada repaso te acerca a leer filosofía
            en su lengua original.
          </p>
        )}
      </Card>

      <ol className="camino__path">
        {READING_BANDS.map((band, i) => {
          const status: StageStatus =
            i < currentIndex ? 'done' : i === currentIndex ? 'current' : 'locked'
          const info = STAGE_INFO[band.code] ?? {
            name: band.code,
            blurb: '',
            icon: '•',
          }
          // Progreso dentro de la banda actual (de su nivel inicial al siguiente).
          const next = READING_BANDS[i + 1]
          const pct =
            status === 'current' && next
              ? Math.min(
                  100,
                  Math.round(
                    ((lvl.level - band.from) / (next.from - band.from)) * 100,
                  ),
                )
              : status === 'done'
                ? 100
                : 0

          return (
            <li
              key={band.code}
              className={`camino__stage camino__stage--${status}`}
            >
              <div className="camino__rail">
                <span className={`camino__node camino__node--${status}`}>
                  {status === 'locked' ? '🔒' : info.icon}
                </span>
              </div>
              <div className="camino__content">
                <p className="camino__name">{info.name}</p>
                <p className="camino__blurb">{info.blurb}</p>
                {status === 'current' && next ? (
                  <>
                    <div className="level-bar">
                      <span
                        className="level-bar__fill"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="camino__hint">
                      {pct}% hacia {READING_BANDS[i + 1].code}
                    </p>
                  </>
                ) : status === 'current' ? (
                  <p className="camino__hint">¡Estás en la cima del mapa! 🎉</p>
                ) : null}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
