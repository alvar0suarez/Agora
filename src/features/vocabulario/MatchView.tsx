import { useEffect, useState } from 'react'
import { Card } from '../../core/ui/Card'
import { newMatchRound, type MatchCard, type MatchRound } from './match'

/**
 * "Emparejar": casa cada palabra griega con su significado. Práctica ligera de
 * reconocimiento (calentamiento), no puntúa ni mueve el SRS —como "Explorar" en
 * lectura—. Toca una carta de cualquier columna y luego su pareja en la otra.
 */
type Side = 'gr' | 'es'

export function MatchView({ onExit }: { onExit: () => void }) {
  const [round, setRound] = useState<MatchRound>(() => newMatchRound())
  const [selected, setSelected] = useState<{ side: Side; id: string } | null>(
    null,
  )
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [wrong, setWrong] = useState<Set<string>>(new Set())

  // El destello de error se borra solo tras un instante.
  useEffect(() => {
    if (wrong.size === 0) return
    const t = setTimeout(() => setWrong(new Set()), 600)
    return () => clearTimeout(t)
  }, [wrong])

  const total = round.greek.length
  const done = matched.size === total

  const reset = () => {
    setRound(newMatchRound())
    setSelected(null)
    setMatched(new Set())
    setWrong(new Set())
  }

  // Se puede empezar por cualquier columna: el primer toque selecciona; el
  // segundo, en la OTRA columna, comprueba si casan (mismo id de palabra).
  const pick = (side: Side, id: string) => {
    if (matched.has(id)) return
    if (selected === null || selected.side === side) {
      setSelected({ side, id })
      return
    }
    if (selected.id === id) {
      setMatched((m) => new Set(m).add(id))
    } else {
      setWrong(new Set([id, selected.id]))
    }
    setSelected(null)
  }

  if (done) {
    return (
      <Card title="¡Emparejado todo! 🎉">
        <p>Buen calentamiento. ¿Otra ronda con palabras nuevas?</p>
        <div className="grade">
          <button className="btn" onClick={onExit}>
            Volver
          </button>
          <button className="btn btn--primary" onClick={reset}>
            Otra ronda
          </button>
        </div>
      </Card>
    )
  }

  const cardClass = (side: Side, c: MatchCard) =>
    'match__card' +
    (matched.has(c.id) ? ' match__card--done' : '') +
    (selected?.side === side && selected.id === c.id
      ? ' match__card--sel'
      : '') +
    (wrong.has(c.id) ? ' match__card--wrong' : '')

  return (
    <div className="match">
      <Card>
        <p className="alfabeto__prompt">
          Toca una palabra y su significado. Calentamiento — no puntúa.
        </p>
        <p className="match__count">
          {matched.size} / {total} emparejadas
        </p>
      </Card>

      <div className="match__cols">
        <div className="match__col">
          {round.greek.map((c) => (
            <button
              key={c.id}
              type="button"
              className={cardClass('gr', c)}
              disabled={matched.has(c.id)}
              onClick={() => pick('gr', c.id)}
              lang="grc"
            >
              {c.text}
            </button>
          ))}
        </div>
        <div className="match__col">
          {round.spanish.map((c) => (
            <button
              key={c.id}
              type="button"
              className={cardClass('es', c)}
              disabled={matched.has(c.id)}
              onClick={() => pick('es', c.id)}
            >
              {c.text}
            </button>
          ))}
        </div>
      </div>

      <button className="btn" onClick={onExit}>
        Volver
      </button>
    </div>
  )
}
