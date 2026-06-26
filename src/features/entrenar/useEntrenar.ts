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
import {
  ALL_ITEMS,
  TYPE_ORDER,
  earnsXp,
  type ExerciseItem,
  type ExerciseType,
} from './items'

/** Máximo de ítems por sesión (corta y constante) y de cuántos nuevos meter. */
const SESSION_CAP = 18
const NEW_PER_SESSION = 6

export interface EntrenarStats {
  reviewed: number
  recalled: number
  xpGained: number
  totalXp: number
  streakDays: number
  newAchievements: Achievement[]
}

/** Intercala listas por turnos (round-robin): [a1,b1,c1,a2,b2,…]. */
function interleave(lists: ExerciseItem[][]): ExerciseItem[] {
  const out: ExerciseItem[] = []
  const max = Math.max(0, ...lists.map((l) => l.length))
  for (let i = 0; i < max; i++) {
    for (const list of lists) if (i < list.length) out.push(list[i])
  }
  return out
}

/**
 * Motor de la sesión mixta: arma una cola INTERCALANDO tipos (primero lo que
 * toca repasar, luego algo nuevo) y centraliza —una sola vez— la lógica de SRS,
 * XP, racha y logros que antes estaba repetida en cada feature.
 */
export function useEntrenar() {
  const [loading, setLoading] = useState(true)
  const [states, setStates] = useState<Map<string, SrsState>>(new Map())
  const [queue, setQueue] = useState<ExerciseItem[]>([])
  const [total, setTotal] = useState(0)
  const [stats, setStats] = useState<EntrenarStats>({
    reviewed: 0,
    recalled: 0,
    xpGained: 0,
    totalXp: 0,
    streakDays: 0,
    newAchievements: [],
  })
  const progress = useRef<ProgressState | null>(null)
  const baseUnlocked = useRef<Set<string>>(new Set())

  const build = useCallback(async () => {
    setLoading(true)
    const now = Date.now()
    const [loaded, loadedProgress] = await Promise.all([
      loadStates(ALL_ITEMS.map((it) => it.srsKey)),
      loadProgress(),
    ])
    progress.current = loadedProgress
    baseUnlocked.current = new Set(
      unlockedAchievements(loadedProgress).map((a) => a.id),
    )

    const byKey = new Map<string, SrsState>()
    const duePerType = new Map<ExerciseType, ExerciseItem[]>()
    const freshPerType = new Map<ExerciseType, ExerciseItem[]>()
    for (const t of TYPE_ORDER) {
      duePerType.set(t, [])
      freshPerType.set(t, [])
    }
    for (const it of ALL_ITEMS) {
      const s = loaded.get(it.srsKey)
      if (!s) {
        freshPerType.get(it.type)!.push(it)
      } else {
        byKey.set(it.srsKey, s)
        if (isDue(s, now)) duePerType.get(it.type)!.push(it)
      }
    }

    const due = interleave(TYPE_ORDER.map((t) => duePerType.get(t)!))
    const fresh = interleave(TYPE_ORDER.map((t) => freshPerType.get(t)!)).slice(
      0,
      NEW_PER_SESSION,
    )
    const picked = [...due, ...fresh].slice(0, SESSION_CAP)

    setStates(byKey)
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

  const current = queue[0] ?? null

  const grade = useCallback(
    (g: Grade) => {
      const item = queue[0]
      if (!item) return
      const now = Date.now()
      const prev = states.get(item.srsKey) ?? newCard(now)
      const next = review(prev, g, now)
      void saveState(item.srsKey, next)

      let gainedXp = 0
      let newStreak: number | null = null
      let newTotalXp: number | null = null
      let fresh: Achievement[] | null = null
      if (g === 'good' && earnsXp(item.type) && progress.current) {
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

      setStates((prevMap) => new Map(prevMap).set(item.srsKey, next))
      setStats((s) => ({
        reviewed: s.reviewed + 1,
        recalled: s.recalled + (g === 'good' ? 1 : 0),
        xpGained: s.xpGained + gainedXp,
        totalXp: newTotalXp ?? s.totalXp,
        streakDays: newStreak ?? s.streakDays,
        newAchievements: fresh ?? s.newAchievements,
      }))
      setQueue((q) => (g === 'again' ? [...q.slice(1), item] : q.slice(1)))
    },
    [queue, states],
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
