import { Card } from '../../core/ui/Card'
import type { SessionStats } from './useLetterSession'

/** Pantalla de fin de sesión, común a reconocer y escribir. */
export function SessionSummary({
  stats,
  onRestart,
  onExit,
}: {
  stats: SessionStats
  onRestart: () => void
  onExit: () => void
}) {
  const { reviewed, recalled } = stats
  return (
    <Card title="¡Sesión completada! 🎉">
      {reviewed === 0 ? (
        <p>No hay nada que repasar ahora mismo. Vuelve más tarde 👋</p>
      ) : (
        <p>
          Repasadas: <strong>{reviewed}</strong> · Acertadas:{' '}
          <strong>{recalled}</strong>
        </p>
      )}
      <div className="grade">
        <button className="btn" onClick={onExit}>
          Volver
        </button>
        <button className="btn btn--primary" onClick={onRestart}>
          Otra ronda
        </button>
      </div>
    </Card>
  )
}
