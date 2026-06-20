import { useEffect, useState } from 'react'
import {
  loadProgress,
  levelFromXp,
  READING_BANDS,
  emptyProgress,
  type ProgressState,
} from '../../core/progress'
import { buildPlan, gatherPlanInput, type DailyPlan } from '../../core/plan'
import { Card } from '../../core/ui/Card'
import { useNavigate } from '../../core/ui/navigation'

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

/** Área principal a la que enlaza cada banda (para repasar / empezar). */
const BAND_FEATURE: Record<string, string> = {
  Cimientos: 'alfabeto',
  A1: 'vocabulario',
  A2: 'gramatica',
  B1: 'lectura',
  B2: 'lectura',
}

/**
 * Camino: mapa interactivo del viaje de cero hasta leer griego antiguo. Cada
 * parada es una banda de lectura; tu nivel marca dónde estás. Y es NAVEGABLE:
 * tocar una etapa te lleva directo al ejercicio. La etapa ACTUAL enlaza con la
 * primera recomendación del "Plan de hoy" (lo que más te hace avanzar ahora).
 */
export function CaminoScreen() {
  const { goTo } = useNavigate()
  const [progress, setProgress] = useState<ProgressState>(emptyProgress())
  const [plan, setPlan] = useState<DailyPlan | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    void (async () => {
      const [p, planInput] = await Promise.all([
        loadProgress(),
        gatherPlanInput(),
      ])
      if (alive) {
        setProgress(p)
        setPlan(buildPlan(planInput))
        setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  const lvl = levelFromXp(progress.xp)

  let currentIndex = 0
  READING_BANDS.forEach((b, i) => {
    if (lvl.level >= b.from) currentIndex = i
  })

  /** A dónde lleva tocar una etapa (null = bloqueada, no navegable). */
  const targetFor = (status: StageStatus, code: string): string | null => {
    if (status === 'locked') return null
    if (status === 'current') return plan?.steps[0]?.featureId ?? BAND_FEATURE[code]
    return BAND_FEATURE[code] // 'done' → repasar esa área
  }

  return (
    <div className="camino">
      <Card title="Tu camino al griego antiguo">
        {loading ? (
          <p>Cargando…</p>
        ) : (
          <p>
            Estás en <strong>{lvl.band}</strong>, nivel{' '}
            <strong>{lvl.level}</strong>. Toca una etapa para ir directo al
            ejercicio que te hace avanzar.
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
          const target = targetFor(status, band.code)

          const inner = (
            <>
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
                      {pct}% hacia {next.code}
                    </p>
                  </>
                ) : null}
                {target ? (
                  <p className="camino__cta">
                    {status === 'current' ? 'Seguir avanzando' : 'Repasar'} ›
                  </p>
                ) : (
                  <p className="camino__hint">Sube de nivel para desbloquear</p>
                )}
              </div>
            </>
          )

          return (
            <li
              key={band.code}
              className={`camino__stage camino__stage--${status}`}
            >
              {target ? (
                <button
                  type="button"
                  className="camino__row camino__row--link"
                  onClick={() => goTo(target)}
                >
                  {inner}
                </button>
              ) : (
                <div className="camino__row">{inner}</div>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
