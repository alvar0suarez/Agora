import type { FeatureModule } from '../../core/plugin/types'
import { HoyScreen } from './HoyScreen'

/** Feature: «Hoy» — la puerta de entrada del viaje (unidades guiadas). */
export const hoyFeature: FeatureModule = {
  id: 'hoy',
  title: 'Hoy',
  icon: '☀️',
  security: 'normal',
  Screen: HoyScreen,
}
