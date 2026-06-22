/**
 * Logros (insignias): la cara celebratoria del progreso. Capa de motivación
 * anclada al RECUERDO REAL, no a tocar botones: cada logro se desbloquea por
 * hitos que solo se alcanzan estudiando (nivel —y por tanto XP acumulada en
 * ejercicios reales— y días de racha). Por eso v1 se deriva ENTERO de lo que
 * `ProgressState` ya guarda: cero cambios en el bucle de estudio y cero
 * persistencia nueva. Lógica PURA (testeable).
 */
import type { ProgressState } from './progress'
import { levelFromXp } from './levels'

/** Un logro del catálogo. */
export interface Achievement {
  /** Identificador estable. */
  id: string
  /** Emoji ilustrativo. */
  icon: string
  /** Nombre corto y celebratorio. */
  title: string
  /** Cómo se consigue (sirve de pista cuando está bloqueado). */
  hint: string
  /** Predicado PURO: ¿lo tiene ya, según su progreso? */
  test: (state: ProgressState) => boolean
}

/** Desbloqueado al alcanzar (o superar) el nivel `n`. */
const atLevel = (n: number) => (s: ProgressState) => levelFromXp(s.xp).level >= n
/** Desbloqueado al alcanzar (o superar) `n` días de racha. */
const atStreak = (n: number) => (s: ProgressState) => s.streakDays >= n

/**
 * Catálogo en orden de progresión (de lo más asequible a lo más exigente).
 * Mezcla hitos de nivel (la línea larga hacia B2) con hitos de racha (la
 * constancia diaria), las dos palancas de motivación que ya medimos.
 */
export const ACHIEVEMENTS: readonly Achievement[] = [
  {
    id: 'first-xp',
    icon: '🌱',
    title: 'Primeros pasos',
    hint: 'Completa tu primer ejercicio',
    test: (s) => s.xp >= 1,
  },
  {
    id: 'streak-3',
    icon: '🔥',
    title: 'Constancia',
    hint: 'Mantén una racha de 3 días',
    test: atStreak(3),
  },
  {
    id: 'level-5',
    icon: '🧱',
    title: 'Cimientos firmes',
    hint: 'Llega al nivel 5 (lectura A1)',
    test: atLevel(5),
  },
  {
    id: 'streak-7',
    icon: '🗓️',
    title: 'Una semana entera',
    hint: 'Mantén una racha de 7 días',
    test: atStreak(7),
  },
  {
    id: 'level-13',
    icon: '🚶',
    title: 'En marcha',
    hint: 'Llega al nivel 13 (lectura A2)',
    test: atLevel(13),
  },
  {
    id: 'level-23',
    icon: '📖',
    title: 'Lector intermedio',
    hint: 'Llega al nivel 23 (lectura B1)',
    test: atLevel(23),
  },
  {
    id: 'streak-30',
    icon: '🌙',
    title: 'Un mes de hábito',
    hint: 'Mantén una racha de 30 días',
    test: atStreak(30),
  },
  {
    id: 'level-36',
    icon: '🏛️',
    title: 'Banda B2',
    hint: 'Llega al nivel 36: leer prosa ática con apoyo',
    test: atLevel(36),
  },
]

/** ¿Está desbloqueado este logro para ese progreso? */
export function isUnlocked(a: Achievement, state: ProgressState): boolean {
  return a.test(state)
}

/** Logros ya conseguidos, en el orden del catálogo. */
export function unlockedAchievements(state: ProgressState): Achievement[] {
  return ACHIEVEMENTS.filter((a) => a.test(state))
}
