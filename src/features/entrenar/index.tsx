import type { FeatureModule } from '../../core/plugin/types'
import { EntrenarScreen } from './EntrenarScreen'

/** Feature: sesión mixta (la forma principal y variada de practicar). */
export const entrenarFeature: FeatureModule = {
  id: 'entrenar',
  title: 'Entrenar',
  icon: '🎯',
  security: 'normal',
  nav: false,
  Screen: EntrenarScreen,
}
