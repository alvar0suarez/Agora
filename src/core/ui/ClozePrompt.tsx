import { useState } from 'react'
import { isClozeCorrect, type ClozeItem } from '../greek'
import { Card } from './Card'
import { GreekKeypad } from './GreekKeypad'
import type { Grade } from '../srs'

/**
 * Prompt de "rellenar huecos": ves el aforismo con una palabra tapada (más su
 * traducción y una pista) y la escribes con el teclado griego; se comprueba sin
 * acentos ni mayúsculas. Presentacional y reutilizable: lo usan el modo
 * Completar de lectura y la sesión mixta de Entrenar. La lógica de SRS/XP vive
 * en quien lo monta; aquí solo se califica con `onGrade`.
 */
export function ClozePrompt({
  item,
  onGrade,
}: {
  item: ClozeItem
  onGrade: (g: Grade) => void
}) {
  const [typed, setTyped] = useState('')
  const [correct, setCorrect] = useState<boolean | null>(null)
  const answered = correct !== null

  return (
    <>
      <Card>
        <p className="alfabeto__prompt">Escribe la palabra que falta:</p>
        <p className="cloze__sentence" lang="grc">
          {item.words.map((w, i) =>
            i === item.blankIndex ? (
              <span key={i}>
                <span className="cloze__blank">
                  {answered ? item.answer : typed || '____'}
                </span>{' '}
              </span>
            ) : (
              <span key={i}>{w.gr} </span>
            ),
          )}
        </p>
        <p className="cloze__translation">«{item.translation}»</p>
        <p className="cloze__hint">
          Pista: <strong>{item.hint}</strong>
        </p>
      </Card>

      {!answered ? (
        <>
          <GreekKeypad
            onInput={(l) => setTyped((t) => t + l)}
            onBackspace={() => setTyped((t) => t.slice(0, -1))}
          />
          <button
            className="btn btn--primary"
            disabled={typed.length === 0}
            onClick={() => setCorrect(isClozeCorrect(item, typed))}
          >
            Comprobar
          </button>
        </>
      ) : (
        <>
          <Card
            className={
              correct ? 'feedback feedback--correct' : 'feedback feedback--wrong'
            }
          >
            <p className="answer__name">{correct ? '✓ ¡Correcto!' : '✗ Casi'}</p>
            <p className="answer__line">
              Respuesta: <strong lang="grc">{item.answer}</strong>
              {' — '}
              {item.hint}
            </p>
          </Card>
          <button
            className="btn btn--primary"
            onClick={() => onGrade(correct ? 'good' : 'again')}
          >
            Siguiente
          </button>
        </>
      )}
    </>
  )
}
