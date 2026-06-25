import type { FeatureModule } from '../../core/plugin/types'
import { TeoriaScreen } from './TeoriaScreen'

/** Feature: teoría de la lengua (mini-artículos) intercalada en el camino. */
export const teoriaFeature: FeatureModule = {
  id: 'teoria',
  title: 'Teoría',
  icon: '📖',
  security: 'normal',
  Screen: TeoriaScreen,
}
