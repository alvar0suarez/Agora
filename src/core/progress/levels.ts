/**
 * Niveles a partir del XP. Es la cara visible y motivadora del progreso: la XP
 * se acumula a lo largo de TODAS las fases (alfabeto, vocabulario, lectura…) y
 * sube de nivel con una curva larga, pensada para un arco de meses/años hasta un
 * nivel de LECTURA equivalente a B2 (leer prosa ática / filosofía con apoyo).
 *
 * Las bandas usan etiquetas estilo CEFR pero referidas a la COMPRENSIÓN LECTORA
 * (producción libre y conversación quedan fuera del alcance del proyecto).
 *
 * Lógica PURA: solo aritmética sobre el XP, sin estado externo.
 */

/** Paso base de la curva: pasar del nivel n al n+1 cuesta LEVEL_STEP_XP·n. */
export const LEVEL_STEP_XP = 100

/** Banda de competencia (lectura) asociada a un nivel a partir de `from`. */
export interface Band {
  /** Nivel mínimo en el que empieza la banda. */
  from: number
  /** Etiqueta de la banda. */
  code: string
}

/**
 * Bandas calibradas sobre la curva: B2 (≈ nivel 36, ~63 000 XP) marca el techo
 * objetivo de lectura; el nivel sigue creciendo más allá dentro de la banda B2.
 */
const BANDS: Band[] = [
  { from: 1, code: 'Cimientos' },
  { from: 5, code: 'A1' },
  { from: 13, code: 'A2' },
  { from: 23, code: 'B1' },
  { from: 36, code: 'B2' },
]

/** Bandas de lectura, en orden, para construir el "Camino" (mapa de progreso). */
export const READING_BANDS: readonly Band[] = BANDS

/** Resumen del nivel para mostrar (nivel, banda y progreso dentro del nivel). */
export interface LevelInfo {
  /** Nivel actual (1, 2, 3…). */
  level: number
  /** Banda de lectura ('Cimientos', 'A1'… 'B2'). */
  band: string
  /** XP total acumulada (saneada: entera y no negativa). */
  totalXp: number
  /** XP ya conseguida dentro del nivel actual. */
  xpIntoLevel: number
  /** XP que cuesta pasar del nivel actual al siguiente. */
  xpForNextLevel: number
}

/**
 * XP acumulada necesaria para ALCANZAR el nivel `n` (n ≥ 1). El nivel 1 está en
 * 0 XP; cada nivel cuesta un poco más que el anterior (curva triangular), así el
 * principio recompensa rápido y el avance se hace más lento (y largo) arriba.
 */
export function xpToReachLevel(n: number): number {
  if (n <= 1) return 0
  return (LEVEL_STEP_XP * n * (n - 1)) / 2
}

/** Banda de lectura correspondiente a un nivel. */
export function bandForLevel(level: number): string {
  let code = BANDS[0].code
  for (const b of BANDS) if (level >= b.from) code = b.code
  return code
}

/** Calcula el nivel (y el progreso dentro de él) a partir del XP total. */
export function levelFromXp(totalXp: number): LevelInfo {
  const xp = Math.max(0, Math.floor(totalXp))
  let level = 1
  while (xpToReachLevel(level + 1) <= xp) level++
  const base = xpToReachLevel(level)
  const next = xpToReachLevel(level + 1)
  return {
    level,
    band: bandForLevel(level),
    totalXp: xp,
    xpIntoLevel: xp - base,
    xpForNextLevel: next - base,
  }
}
