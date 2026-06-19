import { useCallback, useEffect, useState } from 'react'
import { LETTERS, type GreekLetter } from './letters'
import {
  loadStates,
  saveState,
  newCard,
  review,
  isDue,
  type Grade,
  type SrsState,
} from '../../core/srs'

/** Letras nuevas que se introducen como máximo en una sesión. */
const NEW_PER_SESSION = 8

/** Clave SRS de la carta de reconocimiento de una letra. */
const cardId = (letterId: string) => `alfabeto:rec:${letterId}`

const letterById = new Map(LETTERS.map((l) => [l.id, l]))

export interface SessionStats {
  reviewed: number
  recalled: number
}

/**
 * Orquesta una sesión de repaso del alfabeto: carga el progreso, arma la cola
 * (lo que vence + alguna letra nueva), y aplica las calificaciones al SRS.
 */
export function useAlfabetoSession() {
  const [loading, setLoading] = useState(true)
  const [states, setStates] = useState<Map<string, SrsState>>(new Map())
  const [queue, setQueue] = useState<string[]>([])
  const [revealed, setRevealed] = useState(false)
  const [stats, setStats] = useState<SessionStats>({ reviewed: 0, recalled: 0 })

  const build = useCallback(async () => {
    setLoading(true)
    const now = Date.now()
    const loaded = await loadStates(LETTERS.map((l) => cardId(l.id)))

    const byLetter = new Map<string, SrsState>()
    const due: string[] = []
    const fresh: string[] = []
    for (const l of LETTERS) {
      const s = loaded.get(cardId(l.id))
      if (!s) {
        fresh.push(l.id)
      } else {
        byLetter.set(l.id, s)
        if (isDue(s, now)) due.push(l.id)
      }
    }

    setStates(byLetter)
    setQueue([...due, ...fresh.slice(0, NEW_PER_SESSION)])
    setStats({ reviewed: 0, recalled: 0 })
    setRevealed(false)
    setLoading(false)
  }, [])

  useEffect(() => {
    void build()
  }, [build])

  const currentId = queue[0] ?? null
  const current: GreekLetter | null = currentId
    ? letterById.get(currentId) ?? null
    : null

  const grade = useCallback(
    (g: Grade) => {
      if (!currentId) return
      const now = Date.now()
      const prev = states.get(currentId) ?? newCard(now)
      const next = review(prev, g, now)
      void saveState(cardId(currentId), next)

      setStates((prevMap) => new Map(prevMap).set(currentId, next))
      setStats((s) => ({
        reviewed: s.reviewed + 1,
        recalled: s.recalled + (g === 'good' ? 1 : 0),
      }))
      // 'again' devuelve la letra al final de la cola (reaparece esta sesión).
      setQueue((q) =>
        g === 'again' ? [...q.slice(1), currentId] : q.slice(1),
      )
      setRevealed(false)
    },
    [currentId, states],
  )

  return {
    loading,
    done: !loading && queue.length === 0,
    current,
    remaining: queue.length,
    revealed,
    reveal: () => setRevealed(true),
    grade,
    restart: build,
    stats,
  }
}
