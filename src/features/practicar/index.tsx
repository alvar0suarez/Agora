import type { FeatureModule } from '../../core/plugin/types'
import { PracticarScreen } from './PracticarScreen'

/** Feature: hub de las áreas de estudio enfocado (aligera la barra inferior). */
export const practicarFeature: FeatureModule = {
  id: 'practicar',
  title: 'Practicar',
  icon: '✍️',
  security: 'normal',
  Screen: PracticarScreen,
}
