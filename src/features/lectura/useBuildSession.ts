import { useCallback, useEffect, useRef, useState } from 'react'
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
  unlockedAchievements,
  type ProgressState,
  type Achievement,
} from '../../core/progress'
import { BUILD_ITEMS, buildItemById, type BuildItem } from './build'

/** Frases nuevas que se introducen como máximo en una sesión. */
const NEW_PER_SESSION = 5

export interface BuildStats {
  reviewed: number
  recalled: number
  /** XP ganada en esta sesión (anclada a montar bien la frase de memoria). */
  xpGained: number
  /** XP total acumulada (para derivar el nivel). */
  totalXp: number
  /** Racha diaria actual. */
  streakDays: number
  /** Logros desbloqueados durante esta sesión (para celebrarlos al final). */
  newAchievements: Achievement[]
}

/**
 * Sesión de "construir la frase": ordenas las palabras de un aforismo. Producción
 * de orden/sintaxis → da XP, como el resto. Reutiliza el SRS y el progreso del
 * núcleo. Mismo patrón que `useClozeSession`, pero sobre `BuildItem`.
 */
export function useBuildSession() {
  const [loading, setLoading] = useState(true)
  const [states, setStates] = useState<Map<string, SrsState>>(new Map())
  const [queue, setQueue] = useState<string[]>([])
  const [total, setTotal] = useState(0)
  const [stats, setStats] = useState<BuildStats>({
    reviewed: 0,
    recalled: 0,
    xpGained: 0,
    totalXp: 0,
    streakDays: 0,
    newAchievements: [],
  })
  const progress = useRef<ProgressState | null>(null)
  // Logros que YA tenía al empezar: lo nuevo se mide contra esta base.
  const baseUnlocked = useRef<Set<string>>(new Set())

  const build = useCallback(async () => {
    setLoading(true)
    const now = Date.now()
    const ids = BUILD_ITEMS.map((it) => it.id)
    const [loaded, loadedProgress] = await Promise.all([
      loadStates(ids),
      loadProgress(),
    ])
    progress.current = loadedProgress
    baseUnlocked.current = new Set(
      unlockedAchievements(loadedProgress).map((a) => a.id),
    )

    const byCard = new Map<string, SrsState>()
    const due: string[] = []
    const fresh: string[] = []
    for (const it of BUILD_ITEMS) {
      const s = loaded.get(it.id)
      if (!s) {
        fresh.push(it.id)
      } else {
        byCard.set(it.id, s)
        if (isDue(s, now)) due.push(it.id)
      }
    }

    const picked = [...due, ...fresh.slice(0, NEW_PER_SESSION)]
    setStates(byCard)
    setQueue(picked)
    setTotal(picked.length)
    setStats({
      reviewed: 0,
      recalled: 0,
      xpGained: 0,
      totalXp: loadedProgress.xp,
      streakDays: loadedProgress.streakDays,
      newAchievements: [],
    })
    setLoading(false)
  }, [])

  useEffect(() => {
    void build()
  }, [build])

  const currentId = queue[0] ?? null
  const current: BuildItem | null = currentId
    ? buildItemById.get(currentId) ?? null
    : null

  const grade = useCallback(
    (g: Grade) => {
      if (!currentId) return
      const now = Date.now()
      const prev = states.get(currentId) ?? newCard(now)
      const next = review(prev, g, now)
      void saveState(currentId, next)

      let gainedXp = 0
      let newStreak: number | null = null
      let newTotalXp: number | null = null
      let fresh: Achievement[] | null = null
      if (g === 'good' && progress.current) {
        const withActivity = registerActivity(progress.current, dayIndex(now))
        const updated = addXp(withActivity, XP_PER_RECALL)
        progress.current = updated
        void saveProgress(updated)
        gainedXp = XP_PER_RECALL
        newStreak = updated.streakDays
        newTotalXp = updated.xp
        fresh = unlockedAchievements(updated).filter(
          (a) => !baseUnlocked.current.has(a.id),
        )
      }

      setStates((prevMap) => new Map(prevMap).set(currentId, next))
      setStats((s) => ({
        reviewed: s.reviewed + 1,
        recalled: s.recalled + (g === 'good' ? 1 : 0),
        xpGained: s.xpGained + gainedXp,
        totalXp: newTotalXp ?? s.totalXp,
        streakDays: newStreak ?? s.streakDays,
        newAchievements: fresh ?? s.newAchievements,
      }))
      setQueue((q) => (g === 'again' ? [...q.slice(1), currentId] : q.slice(1)))
    },
    [currentId, states],
  )

  return {
    loading,
    done: !loading && queue.length === 0,
    current,
    remaining: queue.length,
    total,
    grade,
    restart: build,
    stats,
  }
}
