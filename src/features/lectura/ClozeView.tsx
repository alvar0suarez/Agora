import { useState } from 'react'
import { Card } from '../../core/ui/Card'
import { GreekKeypad } from '../../core/ui/GreekKeypad'
import { SessionHeader } from '../../core/ui/SessionHeader'
import { useClozeSession } from './useClozeSession'
import { isClozeCorrect } from './cloze'
import { ClozeSummary } from './ClozeSummary'

/**
 * Corre una sesión de "rellenar huecos": ves el aforismo con una palabra tapada
 * (más su traducción y una pista) y la escribes con el teclado griego. Se
 * comprueba sin acentos ni mayúsculas. Producción real → da XP. Mismo armazón
 * de teclado que el drill de morfología.
 */
export function ClozeView({ onExit }: { onExit: () => void }) {
  const s = useClozeSession()
  const [typed, setTyped] = useState('')
  const [correct, setCorrect] = useState<boolean | null>(null)

  if (s.loading) return <p className="empty">Cargando…</p>
  if (s.done) {
    return <ClozeSummary stats={s.stats} onRestart={s.restart} onExit={onExit} />
  }

  const item = s.current
  if (!item) return null

  const answered = correct !== null
  const check = () => setCorrect(isClozeCorrect(item, typed))
  const next = () => {
    s.grade(correct ? 'good' : 'again')
    setTyped('')
    setCorrect(null)
  }

  return (
    <div className="alfabeto">
      <SessionHeader
        onExit={onExit}
        label="Completar"
        remaining={s.remaining}
        total={s.total}
      />

      <Card>
        <p className="alfabeto__prompt">Escribe la palabra que falta:</p>
        <p className="cloze__sentence">
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
            onClick={check}
          >
            Comprobar
          </button>
        </>
      ) : (
        <>
          <Card
            className={
              correct
                ? 'feedback feedback--correct'
                : 'feedback feedback--wrong'
            }
          >
            <p className="answer__name">{correct ? '✓ ¡Correcto!' : '✗ Casi'}</p>
            <p className="answer__line">
              Respuesta: <strong>{item.answer}</strong>
              {' — '}
              {item.hint}
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
