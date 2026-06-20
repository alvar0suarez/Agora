import { useEffect, useState } from 'react'
import { VOCAB } from '../../core/greek'
import { loadStates, masteryLevel, type MasteryLevel } from '../../core/srs'
import { Card } from '../../core/ui/Card'

/** Clave SRS de una palabra en una dirección (igual que en useVocabSession). */
const cardId = (mode: 'rec' | 'prod', id: string) => `vocab:${mode}:${id}`

/**
 * Vista de dominio del vocabulario: cada palabra con su nivel, DERIVADO del SRS
 * (la caja más baja entre reconocer y escribir). Solo lee; no modifica nada.
 */
export function VocabMasteryView({ onExit }: { onExit: () => void }) {
  const [loading, setLoading] = useState(true)
  const [levels, setLevels] = useState<Map<string, MasteryLevel>>(new Map())

  useEffect(() => {
    let alive = true
    void (async () => {
      const ids = VOCAB.flatMap((v) => [cardId('rec', v.id), cardId('prod', v.id)])
      const states = await loadStates(ids)
      const map = new Map<string, MasteryLevel>()
      for (const v of VOCAB) {
        const boxes = [cardId('rec', v.id), cardId('prod', v.id)]
          .map((id) => states.get(id)?.box)
          .filter((b): b is number => b !== undefined)
        map.set(v.id, masteryLevel(boxes))
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
      <Card title="Dominio del vocabulario">
        <p>Tu nivel por palabra, según lo bien que la recuerdas (leer y escribir).</p>
      </Card>

      {loading ? (
        <p>Cargando…</p>
      ) : (
        <ul className="vocab-mastery">
          {VOCAB.map((v) => {
            const level = levels.get(v.id) ?? 0
            return (
              <li key={v.id} className="vocab-mastery__row" data-level={level}>
                <span className="vocab-mastery__word">
                  <span className="vocab-mastery__lemma">{v.lemma}</span>
                  <span className="vocab-mastery__gloss">{v.gloss}</span>
                </span>
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
