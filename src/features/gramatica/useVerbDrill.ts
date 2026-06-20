import { useCallback, useEffect, useRef, useState } from 'react'
import { VERB_FORMS, type Verb, type VerbForm } from '../../core/greek'
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

/** Formas nuevas que se introducen como máximo en una sesión. */
const NEW_PER_SESSION = 8

/** Clave SRS de una forma verbal (producción: escribir la forma). */
const cardId = (formId: string) => `verb:type:${formId}`

export interface DrillStats {
  reviewed: number
  recalled: number
  xpGained: number
  totalXp: number
  streakDays: number
}

const formById = new Map(VERB_FORMS.map((vf) => [vf.form.id, vf]))

/**
 * Drill de conjugación: te damos un verbo y una persona/número, escribes la
 * forma. Producción real (recuerdo activo) → da XP. Reutiliza el SRS y el
 * progreso del núcleo, como el vocabulario.
 */
export function useVerbDrill() {
  const [loading, setLoading] = useState(true)
  const [states, setStates] = useState<Map<string, SrsState>>(new Map())
  const [queue, setQueue] = useState<string[]>([])
  const [stats, setStats] = useState<DrillStats>({
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
      loadStates(VERB_FORMS.map((vf) => cardId(vf.form.id))),
      loadProgress(),
    ])
    progress.current = loadedProgress

    const byForm = new Map<string, SrsState>()
    const due: string[] = []
    const fresh: string[] = []
    for (const { form } of VERB_FORMS) {
      const s = loaded.get(cardId(form.id))
      if (!s) {
        fresh.push(form.id)
      } else {
        byForm.set(form.id, s)
        if (isDue(s, now)) due.push(form.id)
      }
    }

    setStates(byForm)
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
  const current: { verb: Verb; form: VerbForm } | null = currentId
    ? formById.get(currentId) ?? null
    : null

  const grade = useCallback(
    (g: Grade) => {
      if (!currentId) return
      const now = Date.now()
      const prev = states.get(currentId) ?? newCard(now)
      const next = review(prev, g, now)
      void saveState(cardId(currentId), next)

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
