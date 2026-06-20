import type { FeatureModule } from '../../core/plugin/types'
import { InicioScreen } from './InicioScreen'

/** Feature: pantalla de inicio con el progreso y el contenido de un vistazo. */
export const inicioFeature: FeatureModule = {
  id: 'inicio',
  title: 'Inicio',
  icon: '🏠',
  security: 'normal',
  Screen: InicioScreen,
}
