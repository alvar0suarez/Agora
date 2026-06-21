import { useCallback, useEffect, useRef, useState } from 'react'
import { APHORISMS, aphorismById, type Aphorism } from '../../core/greek'
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

/** Aforismos nuevos que se introducen como máximo en una sesión. */
const NEW_PER_SESSION = 5

/** Clave SRS de un aforismo en la dirección "recordar el sentido". */
const cardId = (id: string) => `lectura:rec:${id}`

export interface LecturaStats {
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
 * Sesión de lectura con recuerdo activo: ves el aforismo en griego, intentas
 * recordar qué significa, revelas la traducción y te autocalificas. Acertar de
 * memoria (`good`) da XP, igual que en alfabeto y vocabulario: la gamificación
 * va anclada al recuerdo real, no a tocar botones.
 *
 * Reutiliza el SRS y el progreso del núcleo (XP/racha/nivel son transversales).
 * Mismo patrón que `useVocabSession`, pero independiente (el contrato prohíbe
 * que un feature dependa de otro). Cierra el agujero de que LEER —la meta del
 * proyecto— no contara para el progreso.
 */
export function useLecturaSession() {
  const [loading, setLoading] = useState(true)
  const [states, setStates] = useState<Map<string, SrsState>>(new Map())
  const [queue, setQueue] = useState<string[]>([])
  const [total, setTotal] = useState(0)
  const [stats, setStats] = useState<LecturaStats>({
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
    const ids = APHORISMS.map((a) => cardId(a.id))
    const [loaded, loadedProgress] = await Promise.all([
      loadStates(ids),
      loadProgress(),
    ])
    progress.current = loadedProgress

    const byCard = new Map<string, SrsState>()
    const due: string[] = []
    const fresh: string[] = []
    for (const a of APHORISMS) {
      const key = cardId(a.id)
      const s = loaded.get(key)
      if (!s) {
        fresh.push(a.id)
      } else {
        byCard.set(key, s)
        if (isDue(s, now)) due.push(a.id)
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
    })
    setLoading(false)
  }, [])

  useEffect(() => {
    void build()
  }, [build])

  const currentId = queue[0] ?? null
  const current: Aphorism | null = currentId
    ? aphorismById.get(currentId) ?? null
    : null

  const grade = useCallback(
    (g: Grade) => {
      if (!currentId) return
      const now = Date.now()
      const key = cardId(currentId)
      const prev = states.get(key) ?? newCard(now)
      const next = review(prev, g, now)
      void saveState(key, next)

      // XP anclada al recuerdo real: acertar recordando el sentido del aforismo.
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

      setStates((prevMap) => new Map(prevMap).set(key, next))
      setStats((s) => ({
        reviewed: s.reviewed + 1,
        recalled: s.recalled + (g === 'good' ? 1 : 0),
        xpGained: s.xpGained + gainedXp,
        totalXp: newTotalXp ?? s.totalXp,
        streakDays: newStreak ?? s.streakDays,
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
