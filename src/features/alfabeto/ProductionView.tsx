import { useMemo, useState } from 'react'
import { LETTERS } from '../../core/greek'
import { Card } from '../../core/ui/Card'
import { pickOptions } from './options'
import { useLetterSession } from './useLetterSession'
import { SessionSummary } from './SessionSummary'

/** Número de opciones (la correcta + distractores) en cada pregunta. */
const OPTION_COUNT = 4

/**
 * Modo ESCRIBIR / PRODUCIR (1b): te damos el sonido (transliteración + AFI +
 * pista) y eliges el glifo correcto. Recuerdo activo en dirección escritura.
 *
 * El nombre griego de la letra NO se muestra en la pregunta (contiene el propio
 * glifo y lo delataría); solo aparece al revelar la respuesta.
 */
export function ProductionView({ onExit }: { onExit: () => void }) {
  const s = useLetterSession('prod')
  const [picked, setPicked] = useState<string | null>(null)

  const letter = s.current
  // Opciones estables por letra (se rebarajan solo al cambiar de carta).
  const options = useMemo(
    () => (letter ? pickOptions(letter, LETTERS, OPTION_COUNT) : []),
    [letter],
  )

  if (s.loading) return <p className="empty">Cargando…</p>

  if (s.done) {
    return <SessionSummary stats={s.stats} onRestart={s.restart} onExit={onExit} />
  }

  if (!letter) return null

  const answered = picked !== null
  const correct = picked === letter.id

  const next = () => {
    s.grade(correct ? 'good' : 'again')
    setPicked(null)
  }

  return (
    <div className="alfabeto">
      <div className="alfabeto__progress">Quedan {s.remaining}</div>

      <Card>
        <p className="alfabeto__prompt">¿Qué letra suena así?</p>
        <p className="answer__line">
          Translit.: <strong>{letter.translit}</strong> · AFI:{' '}
          <strong>{letter.ipa}</strong>
        </p>
        <p className="answer__sound">{letter.sound}</p>
      </Card>

      <div className="options">
        {options.map((opt) => {
          const isTarget = opt.id === letter.id
          const isPicked = opt.id === picked
          const cls = !answered
            ? 'option'
            : isTarget
              ? 'option option--correct'
              : isPicked
                ? 'option option--wrong'
                : 'option option--dim'
          return (
            <button
              key={opt.id}
              className={cls}
              disabled={answered}
              onClick={() => setPicked(opt.id)}
            >
              {opt.lower}
            </button>
          )
        })}
      </div>

      {answered ? (
        <>
          <Card>
            <p className="answer__name">
              {correct ? '✓ ' : '✗ '}
              {letter.name} ({letter.lower} {letter.upper})
            </p>
            {!correct ? (
              <p className="answer__line">La correcta está en verde.</p>
            ) : null}
          </Card>
          <button className="btn btn--primary" onClick={next}>
            Siguiente
          </button>
        </>
      ) : null}
    </div>
  )
}
