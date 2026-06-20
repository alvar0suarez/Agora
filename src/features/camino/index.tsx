import type { FeatureModule } from '../../core/plugin/types'
import { CaminoScreen } from './CaminoScreen'

/** Feature: mapa del camino de aprendizaje (progreso por bandas de lectura). */
export const caminoFeature: FeatureModule = {
  id: 'camino',
  title: 'Camino',
  icon: '🗺️',
  security: 'normal',
  Screen: CaminoScreen,
}
