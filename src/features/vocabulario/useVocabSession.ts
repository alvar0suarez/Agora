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
  unlockedAchievements,
  type ProgressState,
  type Achievement,
} from '../../core/progress'

/** Palabras nuevas que se introducen como máximo en una sesión (en total). */
const NEW_PER_SESSION = 8

/**
 * Dirección del repaso de una palabra:
 *  - `rec` (reconocer): ves la palabra griega y recuerdas su significado.
 *  - `prod` (producir): ves el significado y ELIGES la palabra griega.
 *  - `type` (teclear): ves el significado y ESCRIBES la palabra griega.
 * Cada dirección es una carta SRS separada.
 */
export type VocabMode = 'rec' | 'prod' | 'type'

/** Una carta de la cola: una palabra en una dirección concreta. */
interface VocabCard {
  wordId: string
  dir: VocabMode
}

/** Clave SRS de la carta de una palabra en una dirección concreta. */
const cardId = (mode: VocabMode, wordId: string) => `vocab:${mode}:${wordId}`

/** Intercala varias listas por turnos (round-robin): [a1,b1,a2,b2,…]. */
function interleave<T>(lists: T[][]): T[] {
  const out: T[] = []
  const max = Math.max(0, ...lists.map((l) => l.length))
  for (let i = 0; i < max; i++) {
    for (const list of lists) if (i < list.length) out.push(list[i])
  }
  return out
}

export interface VocabStats {
  reviewed: number
  recalled: number
  /** XP ganada en esta sesión (anclada a aciertos recordando). */
  xpGained: number
  /** XP total acumulada (para derivar el nivel). */
  totalXp: number
  /** Racha diaria actual. */
  streakDays: number
  /** Logros desbloqueados durante esta sesión (para celebrarlos al final). */
  newAchievements: Achievement[]
}

/**
 * Sesión de vocabulario en una o varias direcciones, con interleaving cuando hay
 * varias. Reutiliza el SRS y el progreso del núcleo (XP/racha/nivel son
 * transversales). Mismo patrón que la sesión del alfabeto, pero independiente
 * (el contrato prohíbe que un feature dependa de otro).
 */
export function useVocabSession(modes: VocabMode | VocabMode[]) {
  const dirKey = Array.isArray(modes) ? modes.join(',') : modes

  const [loading, setLoading] = useState(true)
  const [states, setStates] = useState<Map<string, SrsState>>(new Map())
  const [queue, setQueue] = useState<VocabCard[]>([])
  const [total, setTotal] = useState(0)
  const [stats, setStats] = useState<VocabStats>({
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
    const dirs = dirKey.split(',') as VocabMode[]
    const ids = dirs.flatMap((d) => VOCAB.map((v) => cardId(d, v.id)))
    const [loaded, loadedProgress] = await Promise.all([
      loadStates(ids),
      loadProgress(),
    ])
    progress.current = loadedProgress
    baseUnlocked.current = new Set(
      unlockedAchievements(loadedProgress).map((a) => a.id),
    )

    const byCard = new Map<string, SrsState>()
    const duePerDir: VocabCard[][] = []
    const freshPerDir: VocabCard[][] = []
    for (const d of dirs) {
      const due: VocabCard[] = []
      const fresh: VocabCard[] = []
      for (const v of VOCAB) {
        const key = cardId(d, v.id)
        const s = loaded.get(key)
        if (!s) {
          fresh.push({ wordId: v.id, dir: d })
        } else {
          byCard.set(key, s)
          if (isDue(s, now)) due.push({ wordId: v.id, dir: d })
        }
      }
      duePerDir.push(due)
      freshPerDir.push(fresh)
    }
    const due = interleave(duePerDir)
    const fresh = interleave(freshPerDir).slice(0, NEW_PER_SESSION)

    setStates(byCard)
    setQueue([...due, ...fresh])
    setTotal(due.length + fresh.length)
    setStats({
      reviewed: 0,
      recalled: 0,
      xpGained: 0,
      totalXp: loadedProgress.xp,
      streakDays: loadedProgress.streakDays,
      newAchievements: [],
    })
    setLoading(false)
  }, [dirKey])

  useEffect(() => {
    void build()
  }, [build])

  const currentCard = queue[0] ?? null
  const current: VocabEntry | null = currentCard
    ? vocabById.get(currentCard.wordId) ?? null
    : null
  const currentMode: VocabMode | null = currentCard?.dir ?? null

  const grade = useCallback(
    (g: Grade) => {
      if (!currentCard) return
      const now = Date.now()
      const key = cardId(currentCard.dir, currentCard.wordId)
      const prev = states.get(key) ?? newCard(now)
      const next = review(prev, g, now)
      void saveState(key, next)

      // Gamificación anclada al recuerdo real: XP al acertar PRODUCIENDO de
      // memoria — reconocer el sentido ('rec') o escribir la palabra ('type').
      // 'prod' (elección múltiple) no da XP por ser reconocimiento asistido.
      let gainedXp = 0
      let newStreak: number | null = null
      let newTotalXp: number | null = null
      let fresh: Achievement[] | null = null
      const earnsXp = currentCard.dir === 'rec' || currentCard.dir === 'type'
      if (g === 'good' && earnsXp && progress.current) {
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

      setStates((prevMap) => new Map(prevMap).set(key, next))
      setStats((s) => ({
        reviewed: s.reviewed + 1,
        recalled: s.recalled + (g === 'good' ? 1 : 0),
        xpGained: s.xpGained + gainedXp,
        totalXp: newTotalXp ?? s.totalXp,
        streakDays: newStreak ?? s.streakDays,
        newAchievements: fresh ?? s.newAchievements,
      }))
      setQueue((q) =>
        g === 'again' ? [...q.slice(1), currentCard] : q.slice(1),
      )
    },
    [currentCard, states],
  )

  return {
    loading,
    done: !loading && queue.length === 0,
    current,
    currentMode,
    remaining: queue.length,
    total,
    grade,
    restart: build,
    stats,
  }
}
