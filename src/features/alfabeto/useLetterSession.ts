import { useCallback, useEffect, useState } from 'react'
import { LETTERS, type GreekLetter } from '../../core/greek'
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

/**
 * Dirección del repaso:
 *  - `rec` (reconocer): ves el glifo y recuerdas su nombre/sonido.
 *  - `prod` (producir): ves el nombre/sonido y eliges el glifo.
 * Cada dirección se memoriza por separado en el SRS (saber leer una letra no
 * implica saber escribirla), por eso forma parte de la clave de la carta.
 */
export type SessionMode = 'rec' | 'prod'

/** Clave SRS de la carta de una letra en una dirección concreta. */
const cardId = (mode: SessionMode, letterId: string) =>
  `alfabeto:${mode}:${letterId}`

const letterById = new Map(LETTERS.map((l) => [l.id, l]))

export interface SessionStats {
  reviewed: number
  recalled: number
}

/**
 * Orquesta una sesión de repaso del alfabeto en una dirección dada: carga el
 * progreso, arma la cola (lo que vence + alguna letra nueva) y aplica las
 * calificaciones al SRS. La presentación (cómo se pregunta) la decide la vista.
 */
export function useLetterSession(mode: SessionMode) {
  const [loading, setLoading] = useState(true)
  const [states, setStates] = useState<Map<string, SrsState>>(new Map())
  const [queue, setQueue] = useState<string[]>([])
  const [stats, setStats] = useState<SessionStats>({ reviewed: 0, recalled: 0 })

  const build = useCallback(async () => {
    setLoading(true)
    const now = Date.now()
    const loaded = await loadStates(LETTERS.map((l) => cardId(mode, l.id)))

    const byLetter = new Map<string, SrsState>()
    const due: string[] = []
    const fresh: string[] = []
    for (const l of LETTERS) {
      const s = loaded.get(cardId(mode, l.id))
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
    setLoading(false)
  }, [mode])

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
      void saveState(cardId(mode, currentId), next)

      setStates((prevMap) => new Map(prevMap).set(currentId, next))
      setStats((s) => ({
        reviewed: s.reviewed + 1,
        recalled: s.recalled + (g === 'good' ? 1 : 0),
      }))
      // 'again' devuelve la letra al final de la cola (reaparece esta sesión).
      setQueue((q) =>
        g === 'again' ? [...q.slice(1), currentId] : q.slice(1),
      )
    },
    [currentId, states, mode],
  )

  return {
    loading,
    done: !loading && queue.length === 0,
    current,
    remaining: queue.length,
    grade,
    restart: build,
    stats,
  }
}
