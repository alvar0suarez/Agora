import { useEffect, useState } from 'react'
import { LETTERS, VOCAB, APHORISMS } from '../../core/greek'
import {
  loadProgress,
  levelFromXp,
  emptyProgress,
  ACHIEVEMENTS,
  isUnlocked,
} from '../../core/progress'
import type { ProgressState } from '../../core/progress'
import { buildPlan, gatherPlanInput, type DailyPlan } from '../../core/plan'
import { Card } from '../../core/ui/Card'
import { useNavigate } from '../../core/ui/navigation'

/**
 * Inicio: el progreso de un vistazo (nivel, banda de lectura, racha y XP) más un
 * resumen del contenido disponible. Hace visible la gamificación todo el tiempo,
 * no solo al terminar una sesión. Solo lee; no modifica nada.
 */
export function InicioScreen() {
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
  const pct =
    lvl.xpForNextLevel > 0
      ? Math.round((lvl.xpIntoLevel / lvl.xpForNextLevel) * 100)
      : 0

  return (
    <div className="inicio">
      <button
        className="btn btn--primary entrenar-cta"
        onClick={() => goTo('entrenar')}
      >
        <span className="entrenar-cta__title">🎯 Entrenar</span>
        <span className="entrenar-cta__hint">
          Sesión variada: reconocer, escribir y más, intercalado
        </span>
      </button>

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

      {!loading ? (
        <Card title="Logros">
          {(() => {
            const earned = ACHIEVEMENTS.filter((a) => isUnlocked(a, progress))
            return (
              <>
                <p className="achv-count">
                  <strong>{earned.length}</strong> / {ACHIEVEMENTS.length}{' '}
                  conseguidos
                </p>
                <ul className="achv-grid">
                  {ACHIEVEMENTS.map((a) => {
                    const ok = isUnlocked(a, progress)
                    return (
                      <li
                        key={a.id}
                        className={ok ? 'achv' : 'achv achv--locked'}
                        title={a.hint}
                      >
                        <span className="achv__icon">{ok ? a.icon : '🔒'}</span>
                        <span className="achv__title">{a.title}</span>
                        <span className="achv__hint">{a.hint}</span>
                      </li>
                    )
                  })}
                </ul>
              </>
            )
          })()}
        </Card>
      ) : null}

      <Card title="Plan de hoy">
        {!plan ? (
          <p>Preparando tu plan…</p>
        ) : plan.steps.length === 0 ? (
          <p>¡Todo al día! 🎉 Vuelve más tarde o explora una pestaña.</p>
        ) : (
          <>
            <p>
              Tu entrenador te propone{' '}
              <strong>{plan.totalItems}</strong> ejercicios. Empieza por arriba:
            </p>
            <ol className="plan">
              {plan.steps.map((step, i) => (
                <li key={i} className="plan__step">
                  <span className="plan__info">
                    <span className="plan__title">{step.title}</span>
                    <span className="plan__detail">{step.detail}</span>
                  </span>
                  <button
                    className="btn btn--primary plan__go"
                    onClick={() => goTo(step.featureId)}
                  >
                    Ir
                  </button>
                </li>
              ))}
            </ol>
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
