import { SessionHeader } from '../../core/ui/SessionHeader'
import { useLecturaSession } from './useLecturaSession'
import { LecturaRecallPrompt } from './LecturaRecallPrompt'
import { LecturaSummary } from './LecturaSummary'

/**
 * Corre una sesión de lectura con recuerdo activo: barra superior, la pregunta
 * de recordar el aforismo y, al terminar, el resumen con XP/racha/nivel.
 * Mismo armazón que la sesión de vocabulario.
 */
export function LecturaReviewView({ onExit }: { onExit: () => void }) {
  const s = useLecturaSession()

  if (s.loading) return <p className="empty">Cargando…</p>
  if (s.done) {
    return (
      <LecturaSummary stats={s.stats} onRestart={s.restart} onExit={onExit} />
    )
  }

  const aphorism = s.current
  if (!aphorism) return null

  return (
    <div className="alfabeto">
      <SessionHeader
        onExit={onExit}
        label="Recordar"
        remaining={s.remaining}
        total={s.total}
      />
      <LecturaRecallPrompt aphorism={aphorism} onGrade={s.grade} />
    </div>
  )
}
