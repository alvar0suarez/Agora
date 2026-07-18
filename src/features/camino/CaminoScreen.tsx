import { useEffect, useState } from 'react'
import {
  SYLLABUS,
  loadCurso,
  completeUnit,
  type Unit,
} from '../../core/curso'
import { loadProgress, levelFromXp, emptyProgress } from '../../core/progress'
import type { ProgressState } from '../../core/progress'
import { Card } from '../../core/ui/Card'
import { UnidadView } from '../../core/ui/UnidadView'

const KIND_ICON: Record<Unit['kind'], string> = {
  letras: '🔠',
  vocab: '📚',
  lectura: '📜',
  teoria: '📖',
}

/** Tramo (banda) al que pertenece cada unidad, para agrupar el mapa. */
function bandOf(unit: Unit): string {
  if (unit.kind === 'letras') return 'Cimientos'
  if (unit.kind === 'teoria') {
    return unit.lessonId === 'acentos' || unit.lessonId === 'espiritus'
      ? 'Cimientos'
      : 'Hacia A2'
  }
  return 'A1'
}

type Estado = 'hecha' | 'actual' | 'bloqueada'

/**
 * Camino: el MAPA del syllabus. Cada unidad es una parada con su estado; tu
 * posición es la primera no completada. Tocar la actual la corre; tocar una
 * hecha la repite (repaso); las futuras esperan. La teoría se ve como paradas
 * propias, intercaladas donde tocan.
 */
export function CaminoScreen() {
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [progress, setProgress] = useState<ProgressState>(emptyProgress())
  const [loading, setLoading] = useState(true)
  const [running, setRunning] = useState<Unit | null>(null)

  const refresh = async () => {
    const [curso, p] = await Promise.all([loadCurso(), loadProgress()])
    setCompleted(new Set(curso.completed))
    setProgress(p)
    setLoading(false)
  }

  useEffect(() => {
    void refresh()
  }, [])

  if (loading) return <p className="empty">Cargando…</p>

  if (running) {
    return (
      <UnidadView
        unit={running}
        onFinish={() => {
          void completeUnit(running.id).then(() => {
            setRunning(null)
            void refresh()
          })
        }}
        onExit={() => {
          setRunning(null)
          void refresh()
        }}
      />
    )
  }

  const currentIdx = SYLLABUS.findIndex((u) => !completed.has(u.id))
  const lvl = levelFromXp(progress.xp)

  let lastBand = ''
  return (
    <div className="camino">
      <Card title="Tu camino al griego antiguo">
        <p>
          Nivel <strong>{lvl.level}</strong> · Lectura <strong>{lvl.band}</strong>{' '}
          · <strong>{completed.size}</strong> / {SYLLABUS.length} unidades. Toca
          la parada actual para continuar, o una hecha para repasarla.
        </p>
      </Card>

      <ol className="ruta">
        {SYLLABUS.map((u, i) => {
          const estado: Estado =
            i === currentIdx
              ? 'actual'
              : completed.has(u.id)
                ? 'hecha'
                : 'bloqueada'
          const band = bandOf(u)
          const heading =
            band !== lastBand ? (
              <p className="ruta__band">{band}</p>
            ) : null
          lastBand = band
          const tappable = estado !== 'bloqueada'
          return (
            <li key={u.id}>
              {heading}
              <button
                type="button"
                className={`ruta__stop ruta__stop--${estado}`}
                disabled={!tappable}
                onClick={() => setRunning(u)}
              >
                <span className="ruta__icon">
                  {estado === 'hecha' ? '✓' : KIND_ICON[u.kind]}
                </span>
                <span className="ruta__title" lang={u.kind === 'lectura' ? 'grc' : undefined}>
                  {u.title}
                </span>
                {estado === 'actual' ? (
                  <span className="ruta__cta">Continuar ›</span>
                ) : estado === 'hecha' ? (
                  <span className="ruta__cta ruta__cta--muted">Repasar</span>
                ) : (
                  <span className="ruta__icon">🔒</span>
                )}
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
