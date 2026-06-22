import { useState } from 'react'
import { Card } from '../../core/ui/Card'
import { audio } from '../../core/audio'
import type { VocabEntry } from '../../core/greek'
import type { Grade } from '../../core/srs'
import { VocabAnswer } from './VocabAnswer'

/**
 * Pregunta de RECONOCER una palabra: ves el griego, recuerdas el significado y
 * te autocalificas. Presentacional y reutilizable (sesión suelta o mixta).
 */
export function VocabRecognitionPrompt({
  word,
  onGrade,
}: {
  word: VocabEntry
  onGrade: (g: Grade) => void
}) {
  const [revealed, setRevealed] = useState(false)

  const grade = (g: Grade) => {
    onGrade(g)
    setRevealed(false)
  }

  return (
    <>
      <div className="glyph">
        <span className="glyph__lower">{word.lemma}</span>
      </div>
      <button
        type="button"
        className="btn btn--ghost"
        onClick={() => void audio.pronounceWord(word.id, { force: true })}
      >
        🔊 Oír
      </button>

      {!revealed ? (
        <>
          <p className="alfabeto__prompt">¿Qué significa?</p>
          <button className="btn btn--primary" onClick={() => setRevealed(true)}>
            Mostrar
          </button>
        </>
      ) : (
        <>
          <Card>
            <p className="answer__name">{word.gloss}</p>
            <VocabAnswer word={word} />
          </Card>
          <div className="grade">
            <button className="btn btn--again" onClick={() => grade('again')}>
              No la recordé
            </button>
            <button className="btn btn--good" onClick={() => grade('good')}>
              La recordé
            </button>
          </div>
        </>
      )}
    </>
  )
}
