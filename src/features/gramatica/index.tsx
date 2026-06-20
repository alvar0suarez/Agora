import type { FeatureModule } from '../../core/plugin/types'
import { GramaticaScreen } from './GramaticaScreen'

/** Feature: gramática (morfología verbal) con drills de conjugación. */
export const gramaticaFeature: FeatureModule = {
  id: 'gramatica',
  title: 'Gramática',
  icon: '🏛️',
  security: 'normal',
  Screen: GramaticaScreen,
}
