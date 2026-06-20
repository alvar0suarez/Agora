import { useState } from 'react'
import { APHORISMS, vocabById } from '../../core/greek'
import { Card } from '../../core/ui/Card'
import { audio } from '../../core/audio'

/** Aforismos con clip de voz generado (offline). */
const AUDIO_IDS = new Set([
  'gnothi-seauton',
  'panta-rhei',
  'meden-agan',
  'speude-bradeos',
  'hen-oida',
])

/**
 * Lectura (semilla de la Fase 3): input comprensible con aforismos célebres.
 * Lees la frase en griego, intentas entenderla y revelas la traducción más el
 * desglose palabra por palabra. Las palabras que ya estudias en el vocabulario
 * aparecen RESALTADAS: al tocarlas ves su ficha (lema + significado + derivados),
 * enlazando lectura y vocabulario. Sin SRS todavía: aquí prima la EXPOSICIÓN.
 */
export function LecturaScreen() {
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [openWord, setOpenWord] = useState<number | null>(null)

  const total = APHORISMS.length
  const aphorism = APHORISMS[index]

  const go = (delta: number) => {
    setIndex((i) => (i + delta + total) % total)
    setRevealed(false)
    setOpenWord(null)
  }

  return (
    <div className="lectura">
      <div className="alfabeto__top">
        <span className="alfabeto__progress">
          {index + 1} / {total}
        </span>
      </div>

      <p className="aphorism__greek">{aphorism.greek}</p>
      {AUDIO_IDS.has(aphorism.id) ? (
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => void audio.pronounceAphorism(aphorism.id)}
        >
          🔊 Oír
        </button>
      ) : null}
      <p className="aphorism__source">{aphorism.source}</p>

      {!revealed ? (
        <button className="btn btn--primary" onClick={() => setRevealed(true)}>
          Ver traducción
        </button>
      ) : (
        <Card>
          <p className="aphorism__translation">{aphorism.translation}</p>
          <p className="aphorism__hint">
            Toca las palabras resaltadas para ver su ficha.
          </p>
          <ul className="aphorism__words">
            {aphorism.words.map((w, i) => {
              const entry = w.lemmaId ? vocabById.get(w.lemmaId) : undefined
              const open = openWord === i
              return (
                <li key={i} className="aphorism__word">
                  <div className="aphorism__word-row">
                    {entry ? (
                      <button
                        type="button"
                        className={
                          'aphorism__word-gr aphorism__word-gr--link' +
                          (open ? ' is-open' : '')
                        }
                        aria-expanded={open}
                        onClick={() => setOpenWord(open ? null : i)}
                      >
                        {w.gr}
                      </button>
                    ) : (
                      <span className="aphorism__word-gr">{w.gr}</span>
                    )}
                    <span className="aphorism__word-gloss">{w.gloss}</span>
                  </div>

                  {entry && open ? (
                    <div className="aphorism__lemma">
                      <span className="aphorism__lemma-head">
                        Lema: <strong>{entry.lemma}</strong> — {entry.gloss}
                      </span>
                      {entry.derivados && entry.derivados.length > 0 ? (
                        <span className="aphorism__lemma-deriv">
                          En español: {entry.derivados.join(', ')}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </li>
              )
            })}
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
