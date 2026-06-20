/**
 * Nivel de dominio DERIVADO del SRS: no se persiste nada nuevo, la caja de
 * Leitner de cada carta ya es su nivel. Genérico (lo usan alfabeto y
 * vocabulario): un ítem puede tener varias cartas (p. ej. reconocer y producir)
 * y se domina cuando se sabe en todas, por eso el nivel es el MÍNIMO de las
 * cajas existentes. Lógica PURA: recibe las cajas, no toca el almacenamiento.
 */

/** Nivel de dominio: 0 = sin empezar; 1..5 = caja de Leitner. */
export type MasteryLevel = 0 | 1 | 2 | 3 | 4 | 5

/**
 * Nivel de dominio a partir de las cajas de las cartas existentes del ítem.
 * Sin cartas (no practicado) → 0; con cartas → la caja más baja.
 */
export function masteryLevel(boxes: number[]): MasteryLevel {
  if (boxes.length === 0) return 0
  return Math.min(...boxes) as MasteryLevel
}
