import { useState } from 'react'
import { Card } from '../../core/ui/Card'
import { useVocabSession } from './useVocabSession'
import { VocabSummary } from './VocabSummary'

/**
 * Pantalla de vocabulario (Fase 2.1): sesión de RECONOCIMIENTO. Ves la palabra
 * griega, recuerdas su significado y te autocalificas. Producción e interleaving
 * llegan en 2.2 (espejando el alfabeto).
 */
export function VocabularioScreen() {
  const s = useVocabSession()
  const [revealed, setRevealed] = useState(false)

  if (s.loading) return <p className="empty">Cargando…</p>
  if (s.done) {
    return (
      <VocabSummary
        stats={s.stats}
        onRestart={() => {
          setRevealed(false)
          s.restart()
        }}
      />
    )
  }

  const word = s.current
  if (!word) return null

  const grade = (g: 'again' | 'good') => {
    s.grade(g)
    setRevealed(false)
  }

  return (
    <div className="alfabeto">
      <div className="alfabeto__top">
        <span className="alfabeto__progress">Quedan {s.remaining}</span>
      </div>

      <div className="glyph">
        <span className="glyph__lower">{word.lemma}</span>
      </div>

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
            <p className="answer__line">
              <strong>{word.pos}</strong>
            </p>
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
    </div>
  )
}
