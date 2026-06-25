import { useEffect, useState } from 'react'
import { Card } from '../../core/ui/Card'
import { SessionHeader } from '../../core/ui/SessionHeader'
import { useBuildSession } from './useBuildSession'
import { isBuildCorrect, shuffledBank, type BuildChip } from './build'
import { BuildSummary } from './BuildSummary'

/**
 * Corre una sesión de "construir la frase": ves la traducción y el banco de
 * palabras desordenado; tocas para montar la frase griega en orden. Producción
 * de orden/sintaxis → da XP. Estilo Duolingo, sin teclear.
 */
export function BuildView({ onExit }: { onExit: () => void }) {
  const s = useBuildSession()
  const [bank, setBank] = useState<BuildChip[]>([])
  const [placed, setPlaced] = useState<BuildChip[]>([])
  const [correct, setCorrect] = useState<boolean | null>(null)

  const item = s.current

  // Al cambiar de frase, reparte un banco nuevo y limpia la construcción.
  useEffect(() => {
    if (!item) return
    setBank(shuffledBank(item))
    setPlaced([])
    setCorrect(null)
  }, [item?.id])

  if (s.loading) return <p className="empty">Cargando…</p>
  if (s.done) {
    return <BuildSummary stats={s.stats} onRestart={s.restart} onExit={onExit} />
  }
  if (!item) return null

  const answered = correct !== null

  const place = (chip: BuildChip) => {
    setBank((b) => b.filter((c) => c.key !== chip.key))
    setPlaced((p) => [...p, chip])
  }
  const unplace = (chip: BuildChip) => {
    setPlaced((p) => p.filter((c) => c.key !== chip.key))
    setBank((b) => [...b, chip])
  }
  const check = () => setCorrect(isBuildCorrect(item, placed.map((c) => c.text)))
  const next = () => s.grade(correct ? 'good' : 'again')

  return (
    <div className="alfabeto">
      <SessionHeader
        onExit={onExit}
        label="Construir"
        remaining={s.remaining}
        total={s.total}
      />

      <Card>
        <p className="alfabeto__prompt">Ordena la frase griega:</p>
        <p className="build__translation">«{item.translation}»</p>
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
            onClick={check}
          >
            Comprobar
          </button>
        </>
      ) : (
        <>
          <Card
            className={
              correct
                ? 'feedback feedback--correct'
                : 'feedback feedback--wrong'
            }
          >
            <p className="answer__name">{correct ? '✓ ¡Correcto!' : '✗ Casi'}</p>
            <p className="answer__line" lang="grc">
              <strong>{item.tokens.join(' ')}</strong>
            </p>
          </Card>
          <button className="btn btn--primary" onClick={next}>
            Siguiente
          </button>
        </>
      )}
    </div>
  )
}
