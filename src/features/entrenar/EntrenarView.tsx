import { useEffect, useMemo, useState } from 'react'
import { normalizeGreek, type VocabEntry, type GreekLetter } from '../../core/greek'
import { Card } from '../../core/ui/Card'
import { GreekKeypad } from '../../core/ui/GreekKeypad'
import { SessionHeader } from '../../core/ui/SessionHeader'
import { audio } from '../../core/audio'
import type { Grade } from '../../core/srs'
import { useEntrenar } from './useEntrenar'
import { EntrenarSummary } from './EntrenarSummary'

/** Reconocer una palabra: ves el griego, recuerdas el sentido, te autocalificas. */
function VocabRecall({
  entry,
  onGrade,
}: {
  entry: VocabEntry
  onGrade: (g: Grade) => void
}) {
  const [revealed, setRevealed] = useState(false)
  return (
    <>
      <Card>
        <p className="alfabeto__prompt">¿Qué significa?</p>
        <p className="answer__name" lang="grc">
          {entry.lemma}
        </p>
      </Card>
      {!revealed ? (
        <button className="btn btn--primary" onClick={() => setRevealed(true)}>
          Mostrar
        </button>
      ) : (
        <>
          <Card>
            <p className="answer__name">{entry.gloss}</p>
            <p className="answer__line">
              <strong>{entry.pos}</strong>
              {entry.pron ? <> · {entry.pron}</> : null}
            </p>
          </Card>
          <div className="grade">
            <button className="btn btn--again" onClick={() => onGrade('again')}>
              No lo recordé
            </button>
            <button className="btn btn--good" onClick={() => onGrade('good')}>
              Lo recordé
            </button>
          </div>
        </>
      )}
    </>
  )
}

/** Reconocer una letra: ves el glifo, recuerdas nombre y sonido. */
function LetterRecall({
  letter,
  onGrade,
}: {
  letter: GreekLetter
  onGrade: (g: Grade) => void
}) {
  const [revealed, setRevealed] = useState(false)
  useEffect(() => {
    if (revealed) void audio.pronounce(letter, 'sound')
  }, [revealed, letter])
  return (
    <>
      <div className="glyph">
        <span className="glyph__lower">{letter.lower}</span>
        <span className="glyph__upper">{letter.upper}</span>
      </div>
      {!revealed ? (
        <>
          <p className="alfabeto__prompt">¿Cómo se llama y cómo suena?</p>
          <button className="btn btn--primary" onClick={() => setRevealed(true)}>
            Mostrar
          </button>
        </>
      ) : (
        <>
          <Card>
            <p className="answer__name">{letter.name}</p>
            <p className="answer__line">
              Translit.: <strong>{letter.translit}</strong> · AFI:{' '}
              <strong>{letter.ipa}</strong>
            </p>
            <p className="answer__sound">{letter.sound}</p>
          </Card>
          <div className="grade">
            <button className="btn btn--again" onClick={() => onGrade('again')}>
              No la recordé
            </button>
            <button className="btn btn--good" onClick={() => onGrade('good')}>
              La recordé
            </button>
          </div>
        </>
      )}
    </>
  )
}

/** Escribir una palabra: te damos el sentido y la tecleas en griego. */
function VocabType({
  entry,
  onGrade,
}: {
  entry: VocabEntry
  onGrade: (g: Grade) => void
}) {
  const [typed, setTyped] = useState('')
  const [correct, setCorrect] = useState<boolean | null>(null)
  const accepted = useMemo(() => {
    const parts = entry.lemma.split(/[,/]/).map((p) => normalizeGreek(p))
    return new Set(parts.filter(Boolean))
  }, [entry])
  const answered = correct !== null
  return (
    <>
      <Card>
        <p className="alfabeto__prompt">Escribe en griego:</p>
        <p className="answer__name">{entry.gloss}</p>
        <p className="answer__line">
          <strong>{entry.pos}</strong>
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
            onClick={() => setCorrect(accepted.has(normalizeGreek(typed)))}
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
              Respuesta: <strong lang="grc">{entry.lemma}</strong> —{' '}
              {entry.gloss}
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

/**
 * «Entrenar»: la sesión mixta. Intercala reconocer, escribir y letras en una
 * sola tarjeta común, con el SRS/XP/logros compartidos. Una forma de practicar
 * variada y simple, en lugar de modos sueltos y monótonos.
 */
export function EntrenarView({ onExit }: { onExit: () => void }) {
  const s = useEntrenar()

  if (s.loading) return <p className="empty">Preparando tu sesión…</p>
  if (s.done) {
    return (
      <EntrenarSummary stats={s.stats} onRestart={s.restart} onExit={onExit} />
    )
  }

  const item = s.current
  if (!item) return null

  return (
    <div className="alfabeto">
      <SessionHeader
        onExit={onExit}
        label="Entrenar"
        remaining={s.remaining}
        total={s.total}
      />
      {/* key por carta → cada ejercicio arranca con su estado limpio */}
      <div key={item.srsKey}>
        {item.type === 'vocab-rec' && (
          <VocabRecall entry={item.entry} onGrade={s.grade} />
        )}
        {item.type === 'vocab-type' && (
          <VocabType entry={item.entry} onGrade={s.grade} />
        )}
        {item.type === 'letter-rec' && (
          <LetterRecall letter={item.letter} onGrade={s.grade} />
        )}
      </div>
    </div>
  )
}
