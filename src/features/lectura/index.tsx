import type { FeatureModule } from '../../core/plugin/types'
import { LecturaScreen } from './LecturaScreen'

/** Feature: leer aforismos griegos con traducción y desglose (Fase 3, semilla). */
export const lecturaFeature: FeatureModule = {
  id: 'lectura',
  title: 'Lectura',
  icon: '📜',
  security: 'normal',
  Screen: LecturaScreen,
}
