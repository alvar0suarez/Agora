import type { FeatureModule } from '../../core/plugin/types'
import { NousScreen } from './NousScreen'

/**
 * Feature: vocabulario personal importado de Nous (fichero `nous-vocab.v1`).
 * Fichas de las palabras que guardas leyendo; base del futuro mapa de raíces
 * y del repaso SRS de esas palabras. No sale en la barra: se entra desde el
 * hub «Practicar».
 */
export const nousFeature: FeatureModule = {
  id: 'nous',
  title: 'Palabras de Nous',
  icon: '🧠',
  security: 'normal',
  nav: false,
  Screen: NousScreen,
}
