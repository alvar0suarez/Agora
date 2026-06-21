import { useState } from 'react'
import type { Aphorism } from '../../core/greek'
import type { Grade } from '../../core/srs'
import { AphorismCue } from './AphorismCue'
import { AphorismDetail } from './AphorismDetail'

/**
 * Pregunta de RECORDAR un aforismo: ves la frase en griego, intentas recordar
 * qué significa, revelas la traducción + desglose y te autocalificas.
 * Presentacional; la lógica de SRS/XP vive en `useLecturaSession`.
 */
export function LecturaRecallPrompt({
  aphorism,
  onGrade,
}: {
  aphorism: Aphorism
  onGrade: (g: Grade) => void
}) {
  const [revealed, setRevealed] = useState(false)

  const grade = (g: Grade) => {
    onGrade(g)
    setRevealed(false)
  }

  return (
    <>
      <AphorismCue aphorism={aphorism} />

      {!revealed ? (
        <>
          <p className="alfabeto__prompt">¿Qué significa?</p>
          <button className="btn btn--primary" onClick={() => setRevealed(true)}>
            Mostrar traducción
          </button>
        </>
      ) : (
        <>
          <AphorismDetail aphorism={aphorism} />
          <div className="grade">
            <button className="btn btn--again" onClick={() => grade('again')}>
              No lo entendí
            </button>
            <button className="btn btn--good" onClick={() => grade('good')}>
              Lo entendí
            </button>
          </div>
        </>
      )}
    </>
  )
}
