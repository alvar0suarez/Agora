import { useCallback, useEffect, useRef, useState } from 'react'
import type { NousWordRecord } from '../../core/storage/db'
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
import { splitComment } from './parse'
import { loadNousWords } from './store'

/** Palabras nuevas que se introducen como máximo por sesión. */
const NEW_PER_SESSION = 8

/**
 * Dirección del repaso de una palabra de Nous. Ambas son tarjetas de
 * autoevaluación (recordar → destapar → calificarse):
 *  - `rec`: ves la palabra y recuerdas su significado.
 *  - `prod`: ves el significado y recuerdas la palabra.
 * Cada dirección es una carta SRS separada (prefijo propio `nous:`).
 */
export type NousDir = 'rec' | 'prod'

interface NousCard {
  wordId: string
  dir: NousDir
}

const cardId = (dir: NousDir, wordId: string) => `nous:${dir}:${wordId}`

/** Intercala varias listas por turnos (round-robin): [a1,b1,a2,b2,…]. */
function interleave<T>(lists: T[][]): T[] {
  const out: T[] = []
  const max = Math.max(0, ...lists.map((l) => l.length))
  for (let i = 0; i < max; i++) {
    for (const list of lists) if (i < list.length) out.push(list[i])
  }
  return out
}

/** Lo que se muestra de una palabra en el repaso. */
export interface NousPrompt {
  word: NousWordRecord
  dir: NousDir
  /** Significado a mostrar (sección Significado o, si no, el texto libre). */
  significado: string
}

export interface NousStats {
  reviewed: number
  recalled: number
  xpGained: number
}

/** El significado «repasable» de una palabra ('' si no hay nada que preguntar). */
export function answerOf(w: NousWordRecord): string {
  const p = splitComment(w.comentario)
  return p.significado || p.resto
}

/**
 * Sesión de repaso de las palabras de Nous, mezclando ambas direcciones.
 * Mismo patrón que la sesión de vocabulario (SRS + progreso del núcleo), pero
 * independiente: el contrato prohíbe depender de otra feature. Ambas
 * direcciones dan XP al acertar: son recuerdo real autoevaluado, no elección
 * múltiple asistida.
 */
export function useNousSession() {
  const [loading, setLoading] = useState(true)
  const [words, setWords] = useState<Map<string, NousWordRecord>>(new Map())
  const [queue, setQueue] = useState<NousCard[]>([])
  const [total, setTotal] = useState(0)
  const [stats, setStats] = useState<NousStats>({ reviewed: 0, recalled: 0, xpGained: 0 })
  const states = useRef<Map<string, SrsState>>(new Map())
  const progress = useRef<ProgressState | null>(null)

  const build = useCallback(async () => {
    setLoading(true)
    const now = Date.now()
    const all = (await loadNousWords()).filter((w) => answerOf(w) !== '')
    const dirs: NousDir[] = ['rec', 'prod']
    const ids = dirs.flatMap((d) => all.map((w) => cardId(d, w.id)))
    const [loaded, loadedProgress] = await Promise.all([loadStates(ids), loadProgress()])
    progress.current = loadedProgress
    states.current = loaded

    const duePerDir: NousCard[][] = []
    const freshPerDir: NousCard[][] = []
    for (const d of dirs) {
      const due: NousCard[] = []
      const fresh: NousCard[] = []
      for (const w of all) {
        const s = loaded.get(cardId(d, w.id))
        if (!s) fresh.push({ wordId: w.id, dir: d })
        else if (isDue(s, now)) due.push({ wordId: w.id, dir: d })
      }
      duePerDir.push(due)
      freshPerDir.push(fresh)
    }
    const due = interleave(duePerDir)
    const fresh = interleave(freshPerDir).slice(0, NEW_PER_SESSION)

    setWords(new Map(all.map((w) => [w.id, w])))
    setQueue([...due, ...fresh])
    setTotal(due.length + fresh.length)
    setStats({ reviewed: 0, recalled: 0, xpGained: 0 })
    setLoading(false)
  }, [])

  useEffect(() => {
    void build()
  }, [build])

  const card = queue[0] ?? null
  const word = card ? words.get(card.wordId) ?? null : null
  const current: NousPrompt | null =
    card && word ? { word, dir: card.dir, significado: answerOf(word) } : null

  const grade = useCallback(
    (g: Grade) => {
      if (!card) return
      const now = Date.now()
      const key = cardId(card.dir, card.wordId)
      const prev = states.current.get(key) ?? newCard(now)
      const next = review(prev, g, now)
      states.current.set(key, next)
      void saveState(key, next)

      let gainedXp = 0
      if (g === 'good' && progress.current) {
        const updated = addXp(registerActivity(progress.current, dayIndex(now)), XP_PER_RECALL)
        progress.current = updated
        void saveProgress(updated)
        gainedXp = XP_PER_RECALL
      }

      setStats((s) => ({
        reviewed: s.reviewed + 1,
        recalled: s.recalled + (g === 'good' ? 1 : 0),
        xpGained: s.xpGained + gainedXp,
      }))
      setQueue((q) => (g === 'again' ? [...q.slice(1), card] : q.slice(1)))
    },
    [card],
  )

  return {
    loading,
    done: !loading && queue.length === 0,
    /** null también cuando NO hay ninguna palabra repasable importada. */
    current,
    hasWords: words.size > 0,
    remaining: queue.length,
    total,
    grade,
    restart: build,
    stats,
  }
}
