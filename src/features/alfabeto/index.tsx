import type { FeatureModule } from '../../core/plugin/types'
import { AlfabetoScreen } from './AlfabetoScreen'

/** Feature: aprender el alfabeto griego con repetición espaciada. */
export const alfabetoFeature: FeatureModule = {
  id: 'alfabeto',
  title: 'Alfabeto',
  security: 'normal',
  Screen: AlfabetoScreen,
}
