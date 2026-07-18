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
  buildUnitSteps,
  type Unit,
  type Step,
  type SrsItem,
  type ExerciseType,
} from '../../core/curso'

export interface UnidadStats {
  reviewed: number
  recalled: number
  xpGained: number
  totalXp: number
  streakDays: number
  newAchievements: Achievement[]
}

/** Intercala listas por turnos (round-robin). */
function interleave(lists: SrsItem[][]): SrsItem[] {
  const out: SrsItem[] = []
  const max = Math.max(0, ...lists.map((l) => l.length))
  for (let i = 0; i < max; i++) {
    for (const list of lists) if (i < list.length) out.push(list[i])
  }
  return out
}

/**
 * Corre UNA unidad del syllabus: construye sus pasos (arco oír → asociar →
 * usar → premio, con repasos SRS vencidos intercalados) y centraliza SRS + XP +
 * racha + logros al calificar. Mismo motor que Entrenar, pero guiado.
 */
export function useUnidad(unit: Unit) {
  const [loading, setLoading] = useState(true)
  const [states, setStates] = useState<Map<string, SrsState>>(new Map())
  const [queue, setQueue] = useState<Step[]>([])
  const [total, setTotal] = useState(0)
  const [stats, setStats] = useState<UnidadStats>({
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

    // Repasos vencidos de TODAS las áreas, intercalados por tipo (variedad).
    // Lo que esta unidad introduce se excluye: aún no toca repasarlo.
    const introduced = new Set([
      ...(unit.letterIds ?? []),
      ...(unit.vocabIds ?? []),
    ])
    const duePerType = new Map<ExerciseType, SrsItem[]>()
    for (const t of TYPE_ORDER) duePerType.set(t, [])
    const byKey = new Map<string, SrsState>()
    for (const it of ALL_ITEMS) {
      const s = loaded.get(it.srsKey)
      if (!s) continue
      byKey.set(it.srsKey, s)
      const contentId =
        'letter' in it ? it.letter.id : 'entry' in it ? it.entry.id : null
      if (contentId && introduced.has(contentId)) continue
      if (isDue(s, now)) duePerType.get(it.type)!.push(it)
    }
    const due = interleave(TYPE_ORDER.map((t) => duePerType.get(t)!))

    const steps = buildUnitSteps(unit, due)
    setStates(byKey)
    setQueue(steps)
    setTotal(steps.length)
    setStats({
      reviewed: 0,
      recalled: 0,
      xpGained: 0,
      totalXp: loadedProgress.xp,
      streakDays: loadedProgress.streakDays,
      newAchievements: [],
    })
    setLoading(false)
  }, [unit])

  useEffect(() => {
    void build()
  }, [build])

  const current = queue[0] ?? null

  /** Pasos sin nota (intro, teoría, museo): solo avanzar. */
  const advance = useCallback(() => {
    setQueue((q) => q.slice(1))
  }, [])

  const grade = useCallback(
    (g: Grade) => {
      const step = queue[0]
      if (!step || step.kind !== 'ejercicio') return
      const item = step.item
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
      // Fallar reencola el paso al final (se reintenta en esta unidad).
      setQueue((q) => (g === 'again' ? [...q.slice(1), step] : q.slice(1)))
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
    advance,
    stats,
  }
}
