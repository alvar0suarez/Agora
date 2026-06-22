import { useMemo, useState } from 'react'
import { normalizeGreek, type VocabEntry } from '../../core/greek'
import { Card } from '../../core/ui/Card'
import { GreekKeypad } from '../../core/ui/GreekKeypad'
import type { Grade } from '../../core/srs'
import { VocabAnswer } from './VocabAnswer'

/**
 * Pregunta de TECLEAR una palabra: te damos el significado y la escribes en
 * griego con el teclado en pantalla. Se compara sin acentos ni mayúsculas. Si el
 * lema tiene varias formas (p. ej. «ὁ, ἡ, τό») vale cualquiera. Producción real.
 */
export function VocabTypingPrompt({
  word,
  onGrade,
}: {
  word: VocabEntry
  onGrade: (g: Grade) => void
}) {
  const [typed, setTyped] = useState('')
  const [correct, setCorrect] = useState<boolean | null>(null)

  // Formas aceptadas (cada parte del lema, normalizada).
  const accepted = useMemo(() => {
    const parts = word.lemma.split(/[,/]/).map((p) => normalizeGreek(p))
    return new Set(parts.filter(Boolean))
  }, [word])

  const check = () => setCorrect(accepted.has(normalizeGreek(typed)))
  const next = () => {
    onGrade(correct ? 'good' : 'again')
    setTyped('')
    setCorrect(null)
  }

  const answered = correct !== null

  return (
    <>
      <Card>
        <p className="alfabeto__prompt">Escribe en griego:</p>
        <p className="answer__name">{word.gloss}</p>
        <p className="answer__line">
          <strong>{word.pos}</strong>
        </p>
      </Card>

      <div className="typed" aria-live="polite">
        {typed || ' '}
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
          <Card className={correct ? 'feedback feedback--correct' : 'feedback feedback--wrong'}>
            <p className="answer__name">
              {correct ? '✓ ¡Correcto!' : '✗ Casi'}
            </p>
            <p className="answer__line">
              Respuesta: <strong>{word.lemma}</strong> — {word.gloss}
            </p>
            <VocabAnswer word={word} />
          </Card>
          <button className="btn btn--primary" onClick={next}>
            Siguiente
          </button>
        </>
      )}
    </>
  )
}
