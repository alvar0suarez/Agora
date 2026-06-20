import { useCallback, useEffect, useRef, useState } from 'react'
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
import {
  loadProgress,
  saveProgress,
  addXp,
  registerActivity,
  dayIndex,
  XP_PER_RECALL,
  type ProgressState,
} from '../../core/progress'

/** Letras nuevas que se introducen como máximo en una sesión (en total). */
const NEW_PER_SESSION = 8

/**
 * Dirección del repaso:
 *  - `rec` (reconocer): ves el glifo y recuerdas su nombre/sonido.
 *  - `prod` (producir): ves el nombre/sonido y eliges el glifo.
 * Cada dirección se memoriza por separado en el SRS (saber leer una letra no
 * implica saber escribirla), por eso forma parte de la clave de la carta.
 */
export type SessionMode = 'rec' | 'prod'

/** Una carta de la cola: una letra en una dirección concreta. */
interface SessionCard {
  letterId: string
  dir: SessionMode
}

/** Clave SRS de la carta de una letra en una dirección concreta. */
export const cardId = (mode: SessionMode, letterId: string) =>
  `alfabeto:${mode}:${letterId}`

const letterById = new Map(LETTERS.map((l) => [l.id, l]))

/** Intercala varias listas por turnos (round-robin): [a1,b1,a2,b2,…]. */
function interleave<T>(lists: T[][]): T[] {
  const out: T[] = []
  const max = Math.max(0, ...lists.map((l) => l.length))
  for (let i = 0; i < max; i++) {
    for (const list of lists) if (i < list.length) out.push(list[i])
  }
  return out
}

export interface SessionStats {
  reviewed: number
  recalled: number
  /** XP ganada en esta sesión (anclada a aciertos recordando). */
  xpGained: number
  /** XP total acumulada (para derivar el nivel). */
  totalXp: number
  /** Racha diaria actual (días consecutivos con actividad). */
  streakDays: number
}

/**
 * Orquesta una sesión de repaso del alfabeto en una o varias direcciones: carga
 * el progreso, arma la cola (lo que vence + alguna letra nueva) y aplica las
 * calificaciones al SRS. Con varias direcciones las cartas se INTERCALAN
 * (interleaving). La presentación (cómo se pregunta cada carta) la decide la
 * vista, que se guía por `currentMode`.
 */
export function useLetterSession(modes: SessionMode | SessionMode[]) {
  // Clave estable de las direcciones para las dependencias (evita rehacer la
  // sesión por recibir un array nuevo con el mismo contenido en cada render).
  const dirKey = Array.isArray(modes) ? modes.join(',') : modes

  const [loading, setLoading] = useState(true)
  const [states, setStates] = useState<Map<string, SrsState>>(new Map())
  const [queue, setQueue] = useState<SessionCard[]>([])
  const [total, setTotal] = useState(0)
  const [stats, setStats] = useState<SessionStats>({
    reviewed: 0,
    recalled: 0,
    xpGained: 0,
    totalXp: 0,
    streakDays: 0,
  })
  // Progreso transversal (XP + racha). Vive en una ref porque solo lo leemos
  // y actualizamos al calificar; lo visible (xpGained, streak) va en `stats`.
  const progress = useRef<ProgressState | null>(null)

  const build = useCallback(async () => {
    setLoading(true)
    const now = Date.now()
    const dirs = dirKey.split(',') as SessionMode[]
    const ids = dirs.flatMap((d) => LETTERS.map((l) => cardId(d, l.id)))
    const [loaded, loadedProgress] = await Promise.all([
      loadStates(ids),
      loadProgress(),
    ])
    progress.current = loadedProgress

    const byCard = new Map<string, SrsState>()
    const duePerDir: SessionCard[][] = []
    const freshPerDir: SessionCard[][] = []
    for (const d of dirs) {
      const due: SessionCard[] = []
      const fresh: SessionCard[] = []
      for (const l of LETTERS) {
        const key = cardId(d, l.id)
        const s = loaded.get(key)
        if (!s) {
          fresh.push({ letterId: l.id, dir: d })
        } else {
          byCard.set(key, s)
          if (isDue(s, now)) due.push({ letterId: l.id, dir: d })
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
    })
    setLoading(false)
  }, [dirKey])

  useEffect(() => {
    void build()
  }, [build])

  const currentCard = queue[0] ?? null
  const current: GreekLetter | null = currentCard
    ? letterById.get(currentCard.letterId) ?? null
    : null
  const currentMode: SessionMode | null = currentCard?.dir ?? null

  const grade = useCallback(
    (g: Grade) => {
      if (!currentCard) return
      const now = Date.now()
      const key = cardId(currentCard.dir, currentCard.letterId)
      const prev = states.get(key) ?? newCard(now)
      const next = review(prev, g, now)
      void saveState(key, next)

      // Gamificación anclada al recuerdo real: XP solo al acertar recordando
      // (grade 'good' en reconocimiento). La actividad alimenta la racha diaria.
      let gainedXp = 0
      let newStreak: number | null = null
      let newTotalXp: number | null = null
      if (g === 'good' && currentCard.dir === 'rec' && progress.current) {
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
      // 'again' devuelve la carta al final de la cola (reaparece esta sesión).
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
