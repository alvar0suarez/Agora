import { useEffect, useState } from 'react'
import {
  SYLLABUS,
  nextUnit,
  loadCurso,
  completeUnit,
  type Unit,
} from '../../core/curso'
import { loadProgress, levelFromXp, emptyProgress } from '../../core/progress'
import type { ProgressState } from '../../core/progress'
import { Card } from '../../core/ui/Card'
import { useNavigate } from '../../core/ui/navigation'
import { UnidadView } from '../../core/ui/UnidadView'

const KIND_ICON: Record<Unit['kind'], string> = {
  letras: '🔠',
  vocab: '📚',
  lectura: '📜',
  teoria: '📖',
  morfo: '🏛️',
}

/**
 * «Hoy»: la puerta de entrada del viaje. Un solo botón —Continuar— que corre la
 * siguiente unidad del syllabus (oír → asociar → usar → premio). Muestra dónde
 * estás y tu progreso de un vistazo; el detalle vive en Camino y en Progreso.
 */
export function HoyScreen() {
  const { goTo } = useNavigate()
  const [unit, setUnit] = useState<Unit | null>(null)
  const [doneCount, setDoneCount] = useState(0)
  const [progress, setProgress] = useState<ProgressState>(emptyProgress())
  const [loading, setLoading] = useState(true)
  const [running, setRunning] = useState(false)

  const refresh = async () => {
    const [curso, p] = await Promise.all([loadCurso(), loadProgress()])
    setUnit(nextUnit(new Set(curso.completed)))
    setDoneCount(curso.completed.length)
    setProgress(p)
    setLoading(false)
  }

  useEffect(() => {
    void refresh()
  }, [])

  if (loading) return <p className="empty">Cargando…</p>

  if (running && unit) {
    return (
      <UnidadView
        unit={unit}
        onFinish={() => {
          void completeUnit(unit.id).then(() => {
            setRunning(false)
            void refresh()
          })
        }}
        onExit={() => {
          // Salir a mitad: la unidad NO se marca; se retoma después.
          setRunning(false)
          void refresh()
        }}
      />
    )
  }

  const lvl = levelFromXp(progress.xp)

  return (
    <div className="modes">
      <Card title="Hoy">
        <p>
          Nivel <strong>{lvl.level}</strong> · Lectura <strong>{lvl.band}</strong>
          {progress.streakDays > 0 && (
            <>
              {' '}
              · Racha: <strong>🔥 {progress.streakDays}</strong>
            </>
          )}
        </p>
        <p>
          Camino: <strong>{doneCount}</strong> / {SYLLABUS.length} unidades
        </p>
      </Card>

      {unit ? (
        <button
          className="btn btn--primary entrenar-cta"
          onClick={() => setRunning(true)}
        >
          <span className="entrenar-cta__title">
            {KIND_ICON[unit.kind]} {unit.title}
          </span>
          <span className="entrenar-cta__hint">Continuar · 5-8 min</span>
        </button>
      ) : (
        <Card>
          <p>
            ¡Camino completado! 🎉 Sigue con <strong>Entrenar</strong> (sesión
            libre) mientras llega el siguiente tramo.
          </p>
        </Card>
      )}

      <button className="btn mode-btn" onClick={() => goTo('entrenar')}>
        <span className="mode-btn__title">🎯 Sesión libre</span>
        <span className="mode-btn__hint">
          Repaso mixto de todo, sin guion (Entrenar)
        </span>
      </button>
      <button className="btn mode-btn" onClick={() => goTo('camino')}>
        <span className="mode-btn__title">🗺️ Ver el camino</span>
        <span className="mode-btn__hint">El mapa de tu viaje hasta B2</span>
      </button>
      <button className="btn mode-btn" onClick={() => goTo('inicio')}>
        <span className="mode-btn__title">📊 Tu progreso</span>
        <span className="mode-btn__hint">XP, logros y plan del día</span>
      </button>
    </div>
  )
}
