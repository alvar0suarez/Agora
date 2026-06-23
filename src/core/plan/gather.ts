import { db } from '../storage/db'
import { LETTERS, VOCAB, VERB_FORMS, NOUN_FORMS, APHORISMS } from '../greek'
import type { PlanInput } from './plan'

/**
 * Recoge de la BD el estado resumido por área para alimentar al planificador:
 * cuántas cartas vencen ahora y cuántas nuevas quedan por empezar. Las áreas se
 * identifican por el PREFIJO de la clave SRS ('alfabeto:', 'vocab:', 'verb:').
 *
 * Totales por área (para calcular lo "nuevo disponible"):
 *  - alfabeto: 24 letras × 2 direcciones (reconocer/escribir).
 *  - vocabulario: palabras × 3 direcciones (reconocer/elegir/teclear).
 *  - gramática: una carta por forma verbal.
 */
export async function gatherPlanInput(now: number = Date.now()): Promise<PlanInput> {
  const all = await db.srs.toArray()
  const due = (prefix: string) =>
    all.filter((r) => r.id.startsWith(prefix) && r.due <= now).length
  const seen = (prefix: string) =>
    all.filter((r) => r.id.startsWith(prefix)).length

  const alfabetoTotal = LETTERS.length * 2
  const vocabTotal = VOCAB.length * 3
  // Gramática agrupa morfología verbal ('verb:') y nominal ('noun:').
  const morphTotal = VERB_FORMS.length + NOUN_FORMS.length
  const morphDue = due('verb:') + due('noun:')
  const morphSeen = seen('verb:') + seen('noun:')

  return {
    alfabeto: {
      due: due('alfabeto:'),
      newAvailable: Math.max(0, alfabetoTotal - seen('alfabeto:')),
    },
    vocabulario: {
      due: due('vocab:'),
      newAvailable: Math.max(0, vocabTotal - seen('vocab:')),
    },
    gramatica: {
      due: morphDue,
      newAvailable: Math.max(0, morphTotal - morphSeen),
    },
    // Lectura agrupa recuerdo de aforismos ('lectura:rec:') y huecos
    // ('lectura:cloze:'): ambos son SRS y cuentan como repaso de lectura.
    lecturaDue: due('lectura:'),
    lecturaNew: APHORISMS.length > 0 ? 1 : 0,
  }
}
