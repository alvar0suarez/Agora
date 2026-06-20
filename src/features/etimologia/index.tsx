import type { FeatureModule } from '../../core/plugin/types'
import { EtimologiaScreen } from './EtimologiaScreen'

/** Feature: árbol de etimología (raíces griegas ↔ palabras españolas). */
export const etimologiaFeature: FeatureModule = {
  id: 'etimologia',
  title: 'Raíces',
  icon: '🌳',
  security: 'normal',
  Screen: EtimologiaScreen,
}
