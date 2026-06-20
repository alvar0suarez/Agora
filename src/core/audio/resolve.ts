import type { GreekLetter } from '../greek'
import type { Utterance } from './types'

/**
 * Texto griego que se envía al motor para pronunciar una letra. Función PURA
 * (testeable sin audio): aísla la decisión de "qué se dice" del motor que lo
 * convierte en sonido.
 *
 *  - `sound` → el glifo en minúscula (α): el motor grc lo vocaliza como su
 *    fonema del ático reconstruido.
 *  - `name`  → el nombre griego con diacríticos (ἄλφα).
 *
 * Nota: para el `sound` usamos el glifo (no el AFI de `letter.ipa`) porque el
 * motor eSpeak-NG espera texto griego, no símbolos AFI. Si en el paso de
 * cableado real suena mal, este es el único sitio que habría que afinar.
 */
export function letterText(letter: GreekLetter, what: Utterance): string {
  return what === 'name' ? letter.name : letter.lower
}
