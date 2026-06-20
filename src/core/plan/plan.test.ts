import { describe, it, expect } from 'vitest'
import { buildPlan, type PlanInput } from './plan'

const empty: PlanInput = {
  alfabeto: { due: 0, newAvailable: 0 },
  vocabulario: { due: 0, newAvailable: 0 },
  gramatica: { due: 0, newAvailable: 0 },
  lecturaNew: 0,
}

describe('buildPlan', () => {
  it('sin nada que hacer: plan vacío', () => {
    expect(buildPlan(empty)).toEqual({ steps: [], totalItems: 0 })
  })

  it('pone los repasos antes que lo nuevo', () => {
    const plan = buildPlan({
      ...empty,
      vocabulario: { due: 3, newAvailable: 10 },
    })
    expect(plan.steps[0].title).toContain('repaso')
    expect(plan.steps[1].title).toContain('nuevo')
  })

  it('limita los repasos al tope por área', () => {
    const plan = buildPlan({
      ...empty,
      alfabeto: { due: 40, newAvailable: 0 },
    })
    expect(plan.steps[0].count).toBe(15)
  })

  it('reparte un presupuesto limitado de material nuevo', () => {
    const plan = buildPlan({
      ...empty,
      vocabulario: { due: 0, newAvailable: 10 },
      gramatica: { due: 0, newAvailable: 10 },
    })
    const newCount = plan.steps
      .filter((s) => s.title.includes('nuevo'))
      .reduce((sum, s) => sum + s.count, 0)
    expect(newCount).toBe(5)
  })

  it('añade la lectura al final cuando hay material', () => {
    const plan = buildPlan({ ...empty, lecturaNew: 1 })
    expect(plan.steps.at(-1)?.area).toBe('lectura')
    expect(plan.totalItems).toBe(1)
  })
})
