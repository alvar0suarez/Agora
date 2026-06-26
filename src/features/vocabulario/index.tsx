import type { FeatureModule } from '../../core/plugin/types'
import { VocabularioScreen } from './VocabularioScreen'

/** Feature: aprender vocabulario griego núcleo con repetición espaciada. */
export const vocabularioFeature: FeatureModule = {
  id: 'vocabulario',
  title: 'Vocabulario',
  icon: '📚',
  security: 'normal',
  nav: false,
  Screen: VocabularioScreen,
}
