import { useMemo, useState } from 'react'
import { normalizeGreek } from '../../core/greek'
import { Card } from '../../core/ui/Card'
import { GreekKeypad } from '../../core/ui/GreekKeypad'
import { levelFromXp } from '../../core/progress'
import { useVerbDrill } from './useVerbDrill'

/**
 * Practicar: te damos verbo + persona/número y escribes la forma con el teclado
 * griego. Se comprueba sin acentos ni mayúsculas. Producción real → da XP.
 */
export function VerbDrillView({ onExit }: { onExit: () => void }) {
  const d = useVerbDrill()
  const [typed, setTyped] = useState('')
  const [correct, setCorrect] = useState<boolean | null>(null)

  const target = d.current
  const accepted = useMemo(
    () => (target ? normalizeGreek(target.form.form) : ''),
    [target],
  )

  if (d.loading) return <p className="empty">Cargando…</p>

  if (d.done) {
    const lvl = levelFromXp(d.stats.totalXp)
    return (
      <Card title="¡Sesión completada! 🎉">
        {d.stats.reviewed === 0 ? (
          <p>No hay nada que repasar ahora mismo. Vuelve más tarde 👋</p>
        ) : (
          <p>
            Acertadas: <strong>{d.stats.recalled}</strong> /{' '}
            {d.stats.reviewed} · XP: <strong>+{d.stats.xpGained}</strong> ·
            Nivel <strong>{lvl.level}</strong>
          </p>
        )}
        <div className="grade">
          <button className="btn" onClick={onExit}>
            Volver
          </button>
          <button
            className="btn btn--primary"
            onClick={() => {
              setTyped('')
              setCorrect(null)
              d.restart()
            }}
          >
            Otra ronda
          </button>
        </div>
      </Card>
    )
  }

  if (!target) return null

  const answered = correct !== null
  const check = () => setCorrect(normalizeGreek(typed) === accepted)
  const next = () => {
    d.grade(correct ? 'good' : 'again')
    setTyped('')
    setCorrect(null)
  }

  return (
    <div className="alfabeto">
      <div className="alfabeto__top">
        <button className="btn btn--ghost" onClick={onExit}>
          ← Menú
        </button>
        <span className="alfabeto__progress">Quedan {d.remaining}</span>
      </div>

      <Card>
        <p className="alfabeto__prompt">Conjuga este verbo:</p>
        <p className="answer__name">
          {target.verb.lemma} <span className="verb__gloss">— {target.verb.gloss}</span>
        </p>
        <p className="answer__line">
          <strong>
            {target.form.pronoun}
          </strong>{' '}
          ({target.form.person}.ª {target.form.number === 'sg' ? 'singular' : 'plural'})
        </p>
      </Card>

      <div className="typed" aria-live="polite">
        {typed || ' '}
      </div>

      {!answered ? (
        <>
          <GreekKeypad
            onInput={(l) => setTyped((t) => t + l)}
            onBackspace={() => setTyped((t) => t.slice(0, -1))}
          />
          <button
            className="btn btn--primary"
            disabled={typed.length === 0}
            onClick={check}
          >
            Comprobar
          </button>
        </>
      ) : (
        <>
          <Card>
            <p className="answer__name">{correct ? '✓ ¡Correcto!' : '✗ Casi'}</p>
            <p className="answer__line">
              Respuesta: <strong>{target.form.form}</strong>
            </p>
          </Card>
          <button className="btn btn--primary" onClick={next}>
            Siguiente
          </button>
        </>
      )}
    </div>
  )
}
