import { useEffect, useState } from 'react'
import { LETTERS } from '../../core/greek'
import { loadStates } from '../../core/srs'
import { Card } from '../../core/ui/Card'
import { cardId } from './useLetterSession'
import { letterMastery, type MasteryLevel } from './mastery'

/** Etiqueta legible de cada nivel de dominio. */
const LEVEL_LABEL: Record<MasteryLevel, string> = {
  0: 'Sin empezar',
  1: 'Aprendiendo',
  2: 'Frágil',
  3: 'En camino',
  4: 'Casi',
  5: 'Dominada',
}

/**
 * Vista de dominio: las 24 letras con su nivel, DERIVADO del SRS (la caja más
 * baja entre reconocer y escribir). Solo lee; no modifica nada.
 */
export function MasteryView({ onExit }: { onExit: () => void }) {
  const [loading, setLoading] = useState(true)
  const [levels, setLevels] = useState<Map<string, MasteryLevel>>(new Map())

  useEffect(() => {
    let alive = true
    void (async () => {
      const ids = LETTERS.flatMap((l) => [
        cardId('rec', l.id),
        cardId('prod', l.id),
      ])
      const states = await loadStates(ids)
      const map = new Map<string, MasteryLevel>()
      for (const l of LETTERS) {
        const boxes = [cardId('rec', l.id), cardId('prod', l.id)]
          .map((id) => states.get(id)?.box)
          .filter((b): b is number => b !== undefined)
        map.set(l.id, letterMastery(boxes))
      }
      if (alive) {
        setLevels(map)
        setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  return (
    <div className="mastery">
      <Card title="Dominio del alfabeto">
        <p>Tu nivel por letra, según lo bien que la recuerdas (leer y escribir).</p>
      </Card>

      {loading ? (
        <p>Cargando…</p>
      ) : (
        <ul className="mastery-grid">
          {LETTERS.map((l) => {
            const level = levels.get(l.id) ?? 0
            return (
              <li
                key={l.id}
                className="mastery-cell"
                data-level={level}
                title={`${l.name} · ${LEVEL_LABEL[level]}`}
              >
                <span className="mastery-cell__glyph">{l.lower}</span>
                <span className="mastery-cell__bar" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      className={
                        'mastery-cell__pip' +
                        (n <= level ? ' mastery-cell__pip--on' : '')
                      }
                    />
                  ))}
                </span>
              </li>
            )
          })}
        </ul>
      )}

      <button className="btn" onClick={onExit}>
        Volver
      </button>
    </div>
  )
}
