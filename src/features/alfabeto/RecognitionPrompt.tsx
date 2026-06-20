import { useEffect, useState } from 'react'
import { Card } from '../../core/ui/Card'
import { audio } from '../../core/audio'
import type { GreekLetter } from '../../core/greek'
import type { Grade } from '../../core/srs'

/**
 * Pregunta de RECONOCER una letra: ves el glifo, lo recuerdas, te autocalificas.
 * Es presentacional: el estado de la sesión (qué letra, calificar) lo gestiona
 * quien lo usa (la vista de reconocer o la mixta). Reutilizable.
 */
export function RecognitionPrompt({
  letter,
  onGrade,
}: {
  letter: GreekLetter
  onGrade: (g: Grade) => void
}) {
  const [revealed, setRevealed] = useState(false)

  // Acción → audio: al revelar la respuesta suena el sonido de la letra
  // (pronunciación reconstruida ática). El usuario puede repetirlo abajo.
  useEffect(() => {
    if (revealed) void audio.pronounce(letter, 'sound')
  }, [revealed, letter])

  const grade = (g: Grade) => {
    onGrade(g)
    setRevealed(false)
  }

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
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => void audio.pronounce(letter, 'sound')}
            >
              🔊 Oír de nuevo
            </button>
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
