import { Card } from '../../core/ui/Card'
import { levelFromXp } from '../../core/progress'
import type { LecturaStats } from './useLecturaSession'

/** Fin de sesión de lectura: aciertos + XP/racha/nivel (núcleo compartido). */
export function LecturaSummary({
  stats,
  onRestart,
  onExit,
}: {
  stats: LecturaStats
  onRestart: () => void
  onExit: () => void
}) {
  const { reviewed, recalled, xpGained, totalXp, streakDays } = stats
  const lvl = levelFromXp(totalXp)
  const pct =
    lvl.xpForNextLevel > 0
      ? Math.round((lvl.xpIntoLevel / lvl.xpForNextLevel) * 100)
      : 0
  return (
    <Card title="¡Sesión completada! 🎉">
      {reviewed === 0 ? (
        <p>No hay nada que repasar ahora mismo. Vuelve más tarde 👋</p>
      ) : (
        <>
          <p>
            Repasados: <strong>{reviewed}</strong> · Acertados:{' '}
            <strong>{recalled}</strong>
          </p>
          <p className="summary__cheer">
            {recalled / reviewed >= 0.9
              ? '¡Excelente lectura! 🌟'
              : recalled / reviewed >= 0.6
                ? '¡Buen trabajo! 💪'
                : 'Sigue así, cada lectura cuenta. 🌱'}
          </p>
          <p>
            XP ganada: <strong>+{xpGained}</strong>
            {streakDays > 0 && (
              <>
                {' '}
                · Racha: <strong>🔥 {streakDays}</strong>
              </>
            )}
          </p>
          <p className="level__head">
            Nivel <strong>{lvl.level}</strong> · Lectura{' '}
            <strong>{lvl.band}</strong>
          </p>
          <div
            className="level-bar"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span className="level-bar__fill" style={{ width: `${pct}%` }} />
          </div>
          <p className="level__foot">
            {lvl.xpIntoLevel} / {lvl.xpForNextLevel} XP para el nivel{' '}
            {lvl.level + 1}
          </p>
        </>
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
