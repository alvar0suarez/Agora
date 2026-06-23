/**
 * Planificador del "Plan de hoy": el entrenador que decide QUÉ practicar y en qué
 * orden, de forma transversal a todos los features. Principio pedagógico: primero
 * lo que toca repasar (combate del olvido), luego un poco de material nuevo, y al
 * final una lectura como recompensa/exposición.
 *
 * Lógica PURA: recibe un resumen de cuántas cartas vencen y cuántas nuevas hay
 * por área (lo recoge `gatherPlanInput` desde la BD) y devuelve el plan ordenado.
 * No genera contenido con IA en vivo (la app es local-first y offline): es un
 * planificador determinista y adaptativo. Fácil de testear.
 */

export type PlanArea = 'alfabeto' | 'vocabulario' | 'gramatica' | 'lectura'

/** Áreas que usan SRS (tienen `due`/`newAvailable` en la entrada). */
type SrsArea = 'alfabeto' | 'vocabulario' | 'gramatica'

/** Conteos de una área con SRS. */
export interface AreaCounts {
  /** Cartas que vencen ahora (toca repasarlas). */
  due: number
  /** Cartas nuevas disponibles (aún sin empezar). */
  newAvailable: number
}

/** Entrada del planificador: el estado resumido de cada área. */
export interface PlanInput {
  alfabeto: AreaCounts
  vocabulario: AreaCounts
  gramatica: AreaCounts
  /** Repasos de lectura vencidos (recuerdo + huecos/cloze, prefijo 'lectura:'). */
  lecturaDue: number
  /** Aforismos para leer (no usan SRS): 1 si hay material, 0 si no. */
  lecturaNew: number
}

/** Un paso del plan: a qué pestaña ir y qué hacer. */
export interface PlanStep {
  area: PlanArea
  /** Id del feature al que enlaza (para navegar). */
  featureId: string
  /** Título corto, p. ej. 'Vocabulario · repaso'. */
  title: string
  /** Detalle, p. ej. '6 que tocan'. */
  detail: string
  /** Cuántos ítems propone. */
  count: number
}

export interface DailyPlan {
  steps: PlanStep[]
  /** Total de ítems del plan (para barra/recuento). */
  totalItems: number
}

/** Máximo de repasos por área en un plan (sesión corta y constante). */
const REVIEW_CAP = 15
/** Máximo de ítems nuevos a introducir en un plan. */
const NEW_CAP = 5

const LABEL: Record<PlanArea, string> = {
  alfabeto: 'Alfabeto',
  vocabulario: 'Vocabulario',
  gramatica: 'Gramática',
  lectura: 'Lectura',
}

/** Construye el plan del día a partir del resumen de áreas. */
export function buildPlan(input: PlanInput): DailyPlan {
  const steps: PlanStep[] = []

  // 1) Repasos primero (lo más eficaz contra el olvido).
  const reviewAreas: [SrsArea, string][] = [
    ['alfabeto', 'alfabeto'],
    ['vocabulario', 'vocabulario'],
    ['gramatica', 'gramatica'],
  ]
  for (const [area, featureId] of reviewAreas) {
    const due = input[area].due
    if (due > 0) {
      const count = Math.min(due, REVIEW_CAP)
      steps.push({
        area,
        featureId,
        title: `${LABEL[area]} · repaso`,
        detail: `${count} que ${count === 1 ? 'toca' : 'tocan'}`,
        count,
      })
    }
  }

  // Lectura también es repaso (recuerdo de aforismos + huecos): combate olvido.
  if (input.lecturaDue > 0) {
    const count = Math.min(input.lecturaDue, REVIEW_CAP)
    steps.push({
      area: 'lectura',
      featureId: 'lectura',
      title: 'Lectura · repaso',
      detail: `${count} que ${count === 1 ? 'toca' : 'tocan'}`,
      count,
    })
  }

  // 2) Algo nuevo, repartiendo un presupuesto limitado (vocabulario primero).
  let newBudget = NEW_CAP
  const newAreas: [SrsArea, string][] = [
    ['vocabulario', 'vocabulario'],
    ['gramatica', 'gramatica'],
    ['alfabeto', 'alfabeto'],
  ]
  for (const [area, featureId] of newAreas) {
    if (newBudget <= 0) break
    const avail = input[area].newAvailable
    if (avail > 0) {
      const count = Math.min(avail, newBudget)
      steps.push({
        area,
        featureId,
        title: `${LABEL[area]} · nuevo`,
        detail: `${count} por aprender`,
        count,
      })
      newBudget -= count
    }
  }

  // 3) Lectura como cierre (input comprensible / recompensa).
  if (input.lecturaNew > 0) {
    steps.push({
      area: 'lectura',
      featureId: 'lectura',
      title: 'Lectura',
      detail: '1 aforismo',
      count: 1,
    })
  }

  return { steps, totalItems: steps.reduce((sum, s) => sum + s.count, 0) }
}
