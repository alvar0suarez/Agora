import type { FeatureModule } from '../../core/plugin/types'
import { MuseoScreen } from './MuseoScreen'

/** Feature: museo de textos/piezas reales en griego (leer griego de verdad). */
export const museoFeature: FeatureModule = {
  id: 'museo',
  title: 'Museo',
  icon: '🏺',
  security: 'normal',
  Screen: MuseoScreen,
}
