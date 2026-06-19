/**
 * Motor de repetición espaciada (SRS), sistema de Leitner.
 *
 * Idea: cada carta vive en una "caja" (1..5). Si la recuerdas, sube de caja y
 * tarda más en reaparecer; si fallas, vuelve a la caja 1 y reaparece enseguida.
 * Así repasas mucho lo que te cuesta y poco lo que dominas (combate la curva
 * del olvido).
 *
 * Es lógica PURA (sin estado externo): fácil de testear y de reemplazar por un
 * algoritmo más avanzado (p. ej. SM-2) sin tocar los features.
 */

/** Calificación de un repaso. v1 simple: fallo o acierto. */
export type Grade = 'again' | 'good'

/** Estado de una carta en el SRS. */
export interface SrsState {
  /** Caja de Leitner (1 = recién/fallada, 5 = dominada). */
  box: number
  /** Marca de tiempo (ms) en que vuelve a tocar repasarla. */
  due: number
  /** Repasos totales. */
  reps: number
  /** Veces falladas. */
  lapses: number
  /** Último repaso (ms) o null si nunca. */
  lastReviewed: number | null
}

const MINUTE = 60_000
const DAY = 24 * 60 * MINUTE
const MAX_BOX = 5

/**
 * Intervalo (ms) hasta el próximo repaso según la caja. Las cajas bajas
 * reaparecen dentro de la misma sesión (minutos); las altas, en días.
 * Índice = número de caja (1..5); la posición 0 no se usa.
 */
const INTERVALS_MS = [0, 0, 10 * MINUTE, 1 * DAY, 4 * DAY, 10 * DAY]

/** Estado de una carta nueva: caja 1 y lista para repasar ya. */
export function newCard(now: number): SrsState {
  return { box: 1, due: now, reps: 0, lapses: 0, lastReviewed: null }
}

/** ¿Toca repasar esta carta ahora? */
export function isDue(state: SrsState, now: number): boolean {
  return state.due <= now
}

/**
 * Aplica un repaso y devuelve el nuevo estado.
 * - 'good': sube de caja (hasta MAX_BOX) y se aleja en el tiempo.
 * - 'again': vuelve a la caja 1 y reaparece enseguida; cuenta como fallo.
 */
export function review(state: SrsState, grade: Grade, now: number): SrsState {
  const box = grade === 'good' ? Math.min(state.box + 1, MAX_BOX) : 1
  return {
    box,
    due: now + INTERVALS_MS[box],
    reps: state.reps + 1,
    lapses: state.lapses + (grade === 'again' ? 1 : 0),
    lastReviewed: now,
  }
}
