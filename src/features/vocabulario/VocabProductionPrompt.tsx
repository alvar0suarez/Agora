import { useMemo, useState } from 'react'
import { VOCAB, type VocabEntry } from '../../core/greek'
import { Card } from '../../core/ui/Card'
import { pickOptions } from '../../core/quiz'
import type { Grade } from '../../core/srs'
import { VocabAnswer } from './VocabAnswer'

/** Número de opciones (la correcta + distractores) en cada pregunta. */
const OPTION_COUNT = 4

/**
 * Pregunta de PRODUCIR una palabra: te damos el significado y eliges la palabra
 * griega correcta. Presentacional y reutilizable (sesión suelta o mixta).
 */
export function VocabProductionPrompt({
  word,
  onGrade,
}: {
  word: VocabEntry
  onGrade: (g: Grade) => void
}) {
  const [picked, setPicked] = useState<string | null>(null)

  // Opciones estables por palabra (se rebarajan solo al cambiar de carta).
  const options = useMemo(
    () => pickOptions(word, VOCAB, OPTION_COUNT),
    [word],
  )

  const answered = picked !== null
  const correct = picked === word.id

  const next = () => {
    onGrade(correct ? 'good' : 'again')
    setPicked(null)
  }

  return (
    <>
      <Card>
        <p className="alfabeto__prompt">¿Qué palabra significa esto?</p>
        <p className="answer__name">{word.gloss}</p>
        <p className="answer__line">
          <strong>{word.pos}</strong>
        </p>
      </Card>

      <div className="options">
        {options.map((opt) => {
          const isTarget = opt.id === word.id
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
              {opt.lemma}
            </button>
          )
        })}
      </div>

      {answered ? (
        <>
          <Card className={correct ? 'feedback feedback--correct' : 'feedback feedback--wrong'}>
            <p className="answer__name">
              {correct ? '✓ ' : '✗ '}
              {word.lemma} — {word.gloss}
            </p>
            <VocabAnswer word={word} />
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
