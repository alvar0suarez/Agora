import { useCallback, useEffect, useRef, useState } from 'react'
import { VERB_FORMS, NOUN_FORMS, CASE_LABEL } from '../../core/greek'
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

/** Una tarea de morfología: produce una forma a partir de su descripción. */
export interface MorphTask {
  /** Clave SRS única (incluye el prefijo de área). */
  id: string
  /** Palabra base (lema). */
  headword: string
  gloss: string
  /** Qué forma se pide, p. ej. 'vosotros (2.ª plural)' o 'genitivo singular'. */
  prompt: string
  /** Forma griega correcta. */
  answer: string
}

const numLabel = (n: 'sg' | 'pl') => (n === 'sg' ? 'singular' : 'plural')

/** Todas las tareas: conjugación (verbos) + declinación (sustantivos). */
const TASKS: MorphTask[] = [
  ...VERB_FORMS.map(({ verb, form }) => ({
    id: `verb:type:${form.id}`,
    headword: verb.lemma,
    gloss: verb.gloss,
    prompt: `${form.pronoun} (${form.person}.ª ${numLabel(form.number)})`,
    answer: form.form,
  })),
  ...NOUN_FORMS.map(({ noun, form }) => ({
    id: `noun:type:${form.id}`,
    headword: noun.lemma,
    gloss: noun.gloss,
    prompt: `${CASE_LABEL[form.case]} ${numLabel(form.number)}`,
    answer: form.form,
  })),
]

const taskById = new Map(TASKS.map((t) => [t.id, t]))

export interface DrillStats {
  reviewed: number
  recalled: number
  xpGained: number
  totalXp: number
  streakDays: number
}

/**
 * Drill de morfología: te damos una palabra y la forma pedida (persona/número o
 * caso/número) y la escribes. Producción real (recuerdo activo) → da XP.
 * Reutiliza el SRS y el progreso del núcleo.
 */
export function useMorphDrill() {
  const [loading, setLoading] = useState(true)
  const [states, setStates] = useState<Map<string, SrsState>>(new Map())
  const [queue, setQueue] = useState<string[]>([])
  const [total, setTotal] = useState(0)
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
      loadStates(TASKS.map((t) => t.id)),
      loadProgress(),
    ])
    progress.current = loadedProgress

    const byTask = new Map<string, SrsState>()
    const due: string[] = []
    const fresh: string[] = []
    for (const t of TASKS) {
      const s = loaded.get(t.id)
      if (!s) {
        fresh.push(t.id)
      } else {
        byTask.set(t.id, s)
        if (isDue(s, now)) due.push(t.id)
      }
    }

    const freshLimited = fresh.slice(0, NEW_PER_SESSION)
    setStates(byTask)
    setQueue([...due, ...freshLimited])
    setTotal(due.length + freshLimited.length)
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
  const current: MorphTask | null = currentId
    ? taskById.get(currentId) ?? null
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
    total,
    grade,
    restart: build,
    stats,
  }
}
