import { useEffect, useState } from 'react'
import { Card } from '../../core/ui/Card'
import { newMatchRound, type MatchRound } from './match'

/**
 * "Emparejar": casa cada palabra griega con su significado. Práctica ligera de
 * reconocimiento (calentamiento), no puntúa ni mueve el SRS —como "Explorar" en
 * lectura—. Toca una palabra griega y luego su significado; si casan, se fijan.
 */
export function MatchView({ onExit }: { onExit: () => void }) {
  const [round, setRound] = useState<MatchRound>(() => newMatchRound())
  const [selected, setSelected] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [wrong, setWrong] = useState<string | null>(null)

  // El destello de error se borra solo tras un instante.
  useEffect(() => {
    if (!wrong) return
    const t = setTimeout(() => setWrong(null), 600)
    return () => clearTimeout(t)
  }, [wrong])

  const total = round.greek.length
  const done = matched.size === total

  const reset = () => {
    setRound(newMatchRound())
    setSelected(null)
    setMatched(new Set())
    setWrong(null)
  }

  const pickSpanish = (id: string) => {
    if (matched.has(id)) return
    if (selected === null) return
    if (selected === id) {
      setMatched((m) => new Set(m).add(id))
      setSelected(null)
    } else {
      setWrong(id)
      setSelected(null)
    }
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

  return (
    <div className="match">
      <Card>
        <p className="alfabeto__prompt">
          Toca una palabra y luego su significado. Calentamiento — no puntúa.
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
              className={
                'match__card' +
                (matched.has(c.id) ? ' match__card--done' : '') +
                (selected === c.id ? ' match__card--sel' : '')
              }
              disabled={matched.has(c.id)}
              onClick={() => setSelected(c.id)}
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
              className={
                'match__card' +
                (matched.has(c.id) ? ' match__card--done' : '') +
                (wrong === c.id ? ' match__card--wrong' : '')
              }
              disabled={matched.has(c.id)}
              onClick={() => pickSpanish(c.id)}
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
