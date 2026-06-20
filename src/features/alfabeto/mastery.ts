/**
 * Dominio de una letra DERIVADO del SRS: no se persiste nada nuevo, la caja de
 * Leitner de cada carta ya es su nivel. Cada letra tiene hasta dos cartas
 * (reconocer y escribir); se domina cuando se sabe en ambas direcciones, por eso
 * el nivel es el MÍNIMO de las cajas existentes.
 *
 * Lógica PURA: recibe las cajas, no toca el almacenamiento.
 */

/** Nivel de dominio de una letra: 0 = sin empezar; 1..5 = caja de Leitner. */
export type MasteryLevel = 0 | 1 | 2 | 3 | 4 | 5

/**
 * Nivel de dominio a partir de las cajas de las cartas existentes de la letra.
 * Sin cartas (no practicada) → 0; con cartas → la caja más baja (dominar es
 * saberla leer y escribir).
 */
export function letterMastery(boxes: number[]): MasteryLevel {
  if (boxes.length === 0) return 0
  return Math.min(...boxes) as MasteryLevel
}
