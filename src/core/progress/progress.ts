/**
 * Progreso transversal de Agora: XP y racha diaria. Es la capa de motivación
 * (gamificación ligera), COMPARTIDA por todos los features (alfabeto hoy,
 * vocabulario mañana), por eso vive en `core` y no dentro de un feature.
 *
 * Lógica PURA (sin estado externo ni reloj): se le pasa el tiempo/día desde
 * fuera, igual que el SRS. Así es fácil de testear y de razonar.
 *
 * Principio: la gamificación va ANCLADA al recuerdo real. Quien suma XP es el
 * feature, y solo al acertar recordando (no por tocar botones).
 */

/** XP por cada acierto recordando. Constante, ajustable. */
export const XP_PER_RECALL = 10

/** Estado persistido del progreso. */
export interface ProgressState {
  /** Puntos de experiencia acumulados. */
  xp: number
  /** Días consecutivos con actividad (la racha actual). */
  streakDays: number
  /** Último día con actividad como índice de día local, o null si nunca. */
  lastActiveDay: number | null
}

const DAY_MS = 24 * 60 * 60_000

/** Estado inicial: sin XP y sin racha. */
export function emptyProgress(): ProgressState {
  return { xp: 0, streakDays: 0, lastActiveDay: null }
}

/**
 * Índice de día LOCAL (días enteros desde la época) de una marca de tiempo.
 * Dos instantes del mismo día natural comparten índice; ayer es `hoy - 1`.
 * `tzOffsetMin` es el desfase horario en minutos (como `Date.getTimezoneOffset`,
 * positivo al oeste de UTC); por defecto, el del propio instante.
 */
export function dayIndex(
  now: number,
  tzOffsetMin: number = new Date(now).getTimezoneOffset(),
): number {
  return Math.floor((now - tzOffsetMin * 60_000) / DAY_MS)
}

/** Suma XP (no negativo) y devuelve un estado nuevo. */
export function addXp(state: ProgressState, amount: number): ProgressState {
  return { ...state, xp: state.xp + Math.max(0, amount) }
}

/**
 * Registra actividad en el día `today` (índice de día local) y actualiza la
 * racha:
 *  - mismo día que la última actividad → sin cambios (no rompe ni alarga);
 *  - día inmediatamente posterior → la racha crece en 1;
 *  - primer día o hueco de más de un día → la racha se reinicia a 1.
 */
export function registerActivity(
  state: ProgressState,
  today: number,
): ProgressState {
  if (state.lastActiveDay === today) return state
  const streakDays =
    state.lastActiveDay === today - 1 ? state.streakDays + 1 : 1
  return { ...state, streakDays, lastActiveDay: today }
}
