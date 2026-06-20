import { useCallback, useEffect, useRef, useState } from 'react'
import { VOCAB, vocabById, type VocabEntry } from '../../core/greek'
import {
  loadStates,
  saveState,
  newCard,
  review,
  isDue,
  type Grade,
  type SrsState,
} from '../../core/srs'
import {
  loadProgress,
  saveProgress,
  addXp,
  registerActivity,
  dayIndex,
  XP_PER_RECALL,
  type ProgressState,
} from '../../core/progress'

/** Palabras nuevas que se introducen como máximo en una sesión. */
const NEW_PER_SESSION = 8

/** Clave SRS de una palabra en reconocimiento (ver griego → recordar sentido). */
const cardId = (id: string) => `vocab:rec:${id}`

export interface VocabStats {
  reviewed: number
  recalled: number
  /** XP ganada en esta sesión (anclada a aciertos recordando). */
  xpGained: number
  /** XP total acumulada (para derivar el nivel). */
  totalXp: number
  /** Racha diaria actual. */
  streakDays: number
}

/**
 * Sesión de RECONOCIMIENTO de vocabulario: ves la palabra griega y recuerdas su
 * significado. Reutiliza el SRS y el progreso del núcleo (XP/racha/nivel son
 * transversales). Mismo patrón que la sesión del alfabeto, pero independiente
 * (el contrato prohíbe que un feature dependa de otro).
 */
export function useVocabSession() {
  const [loading, setLoading] = useState(true)
  const [states, setStates] = useState<Map<string, SrsState>>(new Map())
  const [queue, setQueue] = useState<string[]>([])
  const [stats, setStats] = useState<VocabStats>({
    reviewed: 0,
    recalled: 0,
    xpGained: 0,
    totalXp: 0,
    streakDays: 0,
  })
  const progress = useRef<ProgressState | null>(null)

  const build = useCallback(async () => {
    setLoading(true)
    const now = Date.now()
    const [loaded, loadedProgress] = await Promise.all([
      loadStates(VOCAB.map((v) => cardId(v.id))),
      loadProgress(),
    ])
    progress.current = loadedProgress

    const byId = new Map<string, SrsState>()
    const due: string[] = []
    const fresh: string[] = []
    for (const v of VOCAB) {
      const s = loaded.get(cardId(v.id))
      if (!s) {
        fresh.push(v.id)
      } else {
        byId.set(v.id, s)
        if (isDue(s, now)) due.push(v.id)
      }
    }

    setStates(byId)
    setQueue([...due, ...fresh.slice(0, NEW_PER_SESSION)])
    setStats({
      reviewed: 0,
      recalled: 0,
      xpGained: 0,
      totalXp: loadedProgress.xp,
      streakDays: loadedProgress.streakDays,
    })
    setLoading(false)
  }, [])

  useEffect(() => {
    void build()
  }, [build])

  const currentId = queue[0] ?? null
  const current: VocabEntry | null = currentId
    ? vocabById.get(currentId) ?? null
    : null

  const grade = useCallback(
    (g: Grade) => {
      if (!currentId) return
      const now = Date.now()
      const prev = states.get(currentId) ?? newCard(now)
      const next = review(prev, g, now)
      void saveState(cardId(currentId), next)

      // Gamificación anclada al recuerdo real: XP solo al acertar recordando.
      let gainedXp = 0
      let newStreak: number | null = null
      let newTotalXp: number | null = null
      if (g === 'good' && progress.current) {
        const withActivity = registerActivity(progress.current, dayIndex(now))
        const updated = addXp(withActivity, XP_PER_RECALL)
        progress.current = updated
        void saveProgress(updated)
        gainedXp = XP_PER_RECALL
        newStreak = updated.streakDays
        newTotalXp = updated.xp
      }

      setStates((prevMap) => new Map(prevMap).set(currentId, next))
      setStats((s) => ({
        reviewed: s.reviewed + 1,
        recalled: s.recalled + (g === 'good' ? 1 : 0),
        xpGained: s.xpGained + gainedXp,
        totalXp: newTotalXp ?? s.totalXp,
        streakDays: newStreak ?? s.streakDays,
      }))
      setQueue((q) =>
        g === 'again' ? [...q.slice(1), currentId] : q.slice(1),
      )
    },
    [currentId, states],
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
