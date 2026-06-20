import { useState } from 'react'
import { APHORISMS } from '../../core/greek'
import { Card } from '../../core/ui/Card'

/**
 * Lectura (semilla de la Fase 3): input comprensible con aforismos célebres.
 * Lees la frase en griego, intentas entenderla y revelas la traducción más el
 * desglose palabra por palabra. Sin SRS todavía: aquí prima la EXPOSICIÓN.
 */
export function LecturaScreen() {
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const total = APHORISMS.length
  const aphorism = APHORISMS[index]

  const go = (delta: number) => {
    setIndex((i) => (i + delta + total) % total)
    setRevealed(false)
  }

  return (
    <div className="lectura">
      <div className="alfabeto__top">
        <span className="alfabeto__progress">
          {index + 1} / {total}
        </span>
      </div>

      <p className="aphorism__greek">{aphorism.greek}</p>
      <p className="aphorism__source">{aphorism.source}</p>

      {!revealed ? (
        <button className="btn btn--primary" onClick={() => setRevealed(true)}>
          Ver traducción
        </button>
      ) : (
        <Card>
          <p className="aphorism__translation">{aphorism.translation}</p>
          <ul className="aphorism__words">
            {aphorism.words.map((w, i) => (
              <li key={i} className="aphorism__word">
                <span className="aphorism__word-gr">{w.gr}</span>
                <span className="aphorism__word-gloss">{w.gloss}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <div className="grade">
        <button className="btn" onClick={() => go(-1)}>
          ← Anterior
        </button>
        <button className="btn" onClick={() => go(1)}>
          Siguiente →
        </button>
      </div>
    </div>
  )
}
