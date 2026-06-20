import { useEffect, useState } from 'react'
import { LETTERS, VOCAB, APHORISMS } from '../../core/greek'
import { loadProgress, levelFromXp, emptyProgress } from '../../core/progress'
import type { ProgressState } from '../../core/progress'
import { Card } from '../../core/ui/Card'

/**
 * Inicio: el progreso de un vistazo (nivel, banda de lectura, racha y XP) más un
 * resumen del contenido disponible. Hace visible la gamificación todo el tiempo,
 * no solo al terminar una sesión. Solo lee; no modifica nada.
 */
export function InicioScreen() {
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
  const pct =
    lvl.xpForNextLevel > 0
      ? Math.round((lvl.xpIntoLevel / lvl.xpForNextLevel) * 100)
      : 0

  return (
    <div className="inicio">
      <Card title="Tu progreso">
        {loading ? (
          <p>Cargando…</p>
        ) : (
          <>
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
              {lvl.level + 1} · Total <strong>{progress.xp}</strong> XP
            </p>
            <p>
              Racha:{' '}
              <strong>
                {progress.streakDays > 0
                  ? `🔥 ${progress.streakDays} día${progress.streakDays === 1 ? '' : 's'}`
                  : 'aún sin racha — ¡empieza hoy!'}
              </strong>
            </p>
          </>
        )}
      </Card>

      <Card title="Contenido disponible">
        <p>
          Alfabeto: <strong>{LETTERS.length}</strong> letras · Vocabulario:{' '}
          <strong>{VOCAB.length}</strong> palabras · Lectura:{' '}
          <strong>{APHORISMS.length}</strong> aforismos
        </p>
        <p>Practica un poco cada día: lo poco y constante es lo que cala.</p>
      </Card>
    </div>
  )
}
