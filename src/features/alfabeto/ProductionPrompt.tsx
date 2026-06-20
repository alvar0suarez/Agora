import { useMemo, useState } from 'react'
import { LETTERS, type GreekLetter } from '../../core/greek'
import { Card } from '../../core/ui/Card'
import type { Grade } from '../../core/srs'
import { pickOptions } from '../../core/quiz'

/** Número de opciones (la correcta + distractores) en cada pregunta. */
const OPTION_COUNT = 4

/**
 * Pregunta de PRODUCIR una letra: te damos el sonido y eliges el glifo. El
 * nombre griego no se muestra hasta revelar (delataría el glifo). Presentacional
 * y reutilizable (vista de escribir y vista mixta).
 */
export function ProductionPrompt({
  letter,
  onGrade,
}: {
  letter: GreekLetter
  onGrade: (g: Grade) => void
}) {
  const [picked, setPicked] = useState<string | null>(null)

  // Opciones estables por letra (se rebarajan solo al cambiar de carta).
  const options = useMemo(
    () => pickOptions(letter, LETTERS, OPTION_COUNT),
    [letter],
  )

  const answered = picked !== null
  const correct = picked === letter.id

  const next = () => {
    onGrade(correct ? 'good' : 'again')
    setPicked(null)
  }

  return (
    <>
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
          <Card className={correct ? 'feedback feedback--correct' : 'feedback feedback--wrong'}>
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
    </>
  )
}
