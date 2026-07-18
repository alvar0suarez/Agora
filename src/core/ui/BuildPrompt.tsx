import { useState } from 'react'
import { shuffledBank, isBuildCorrect, type BuildItem, type BuildChip } from '../greek'
import { Card } from './Card'
import { audio } from '../audio'
import type { Grade } from '../srs'

/**
 * Prompt de "construir la frase": ves la traducción y el banco de palabras
 * desordenado; tocas para montar la frase griega en orden. Presentacional y
 * reutilizable: lo usan el modo Construir de lectura y la sesión mixta de
 * Entrenar. El banco se reparte una vez por ítem (el padre lo remonta con `key`).
 */
export function BuildPrompt({
  item,
  onGrade,
}: {
  item: BuildItem
  onGrade: (g: Grade) => void
}) {
  const [bank, setBank] = useState<BuildChip[]>(() => shuffledBank(item))
  const [placed, setPlaced] = useState<BuildChip[]>([])
  const [correct, setCorrect] = useState<boolean | null>(null)
  const answered = correct !== null

  const place = (chip: BuildChip) => {
    setBank((b) => b.filter((c) => c.key !== chip.key))
    setPlaced((p) => [...p, chip])
  }
  const unplace = (chip: BuildChip) => {
    setPlaced((p) => p.filter((c) => c.key !== chip.key))
    setBank((b) => [...b, chip])
  }

  return (
    <>
      <Card>
        <p className="alfabeto__prompt">Ordena la frase griega:</p>
        <p className="build__translation">«{item.translation}»</p>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() =>
            void audio.pronounceAphorism(item.aphorismId, { force: true })
          }
        >
          🔊 Oír la frase
        </button>
      </Card>

      <div className="build__line" lang="grc" aria-live="polite">
        {placed.length === 0 ? (
          <span className="build__placeholder">Toca las palabras abajo…</span>
        ) : (
          placed.map((c) => (
            <button
              key={c.key}
              type="button"
              className="build__chip build__chip--placed"
              disabled={answered}
              onClick={() => unplace(c)}
            >
              {c.text}
            </button>
          ))
        )}
      </div>

      {!answered ? (
        <>
          <div className="build__bank" lang="grc">
            {bank.map((c) => (
              <button
                key={c.key}
                type="button"
                className="build__chip"
                onClick={() => place(c)}
              >
                {c.text}
              </button>
            ))}
          </div>
          <button
            className="btn btn--primary"
            disabled={bank.length > 0}
            onClick={() => setCorrect(isBuildCorrect(item, placed.map((c) => c.text)))}
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
            <p className="answer__line" lang="grc">
              <strong>{item.tokens.join(' ')}</strong>
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
