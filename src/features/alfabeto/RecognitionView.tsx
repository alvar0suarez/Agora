import { useEffect, useState } from 'react'
import { Card } from '../../core/ui/Card'
import { audio } from '../../core/audio'
import { useLetterSession } from './useLetterSession'
import { SessionSummary } from './SessionSummary'

/**
 * Modo RECONOCER (1a): ves el glifo y recuerdas su nombre y sonido. Es el
 * recuerdo activo en dirección lectura.
 */
export function RecognitionView({ onExit }: { onExit: () => void }) {
  const s = useLetterSession('rec')
  const [revealed, setRevealed] = useState(false)

  // Acción → audio: al revelar la respuesta suena el sonido de la letra
  // (pronunciación reconstruida ática). El usuario puede repetirlo abajo.
  useEffect(() => {
    if (revealed && s.current) void audio.pronounce(s.current, 'sound')
  }, [revealed, s.current])

  if (s.loading) return <p className="empty">Cargando…</p>

  if (s.done) {
    return <SessionSummary stats={s.stats} onRestart={s.restart} onExit={onExit} />
  }

  const letter = s.current
  if (!letter) return null

  return (
    <div className="alfabeto">
      <div className="alfabeto__progress">Quedan {s.remaining}</div>

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
            <button
              className="btn btn--again"
              onClick={() => {
                s.grade('again')
                setRevealed(false)
              }}
            >
              No la recordé
            </button>
            <button
              className="btn btn--good"
              onClick={() => {
                s.grade('good')
                setRevealed(false)
              }}
            >
              La recordé
            </button>
          </div>
        </>
      )}
    </div>
  )
}
