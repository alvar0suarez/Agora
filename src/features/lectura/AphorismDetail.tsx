import { useState } from 'react'
import { vocabById, type Aphorism } from '../../core/greek'
import { Card } from '../../core/ui/Card'

/**
 * Traducción + desglose palabra por palabra de un aforismo. Las palabras que
 * están en el vocabulario aparecen RESALTADAS: al tocarlas se abre su ficha
 * (lema + significado + derivados españoles), enlazando lectura y vocabulario.
 *
 * Compartido por los dos modos de `lectura`: Explorar (lectura libre) y la
 * revelación tras intentar recordar en Repasar. Vive en el feature porque solo
 * lo usa lectura; los datos (APHORISMS, vocabById) sí están en `core/greek`.
 */
export function AphorismDetail({ aphorism }: { aphorism: Aphorism }) {
  const [openWord, setOpenWord] = useState<number | null>(null)

  return (
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
  )
}
