import { registerFeature } from '../core/plugin/registry'
import { inicioFeature } from '../features/inicio'
import { alfabetoFeature } from '../features/alfabeto'
import { vocabularioFeature } from '../features/vocabulario'
import { lecturaFeature } from '../features/lectura'

/**
 * Punto ÚNICO donde se enchufan los features al shell.
 *
 * Añadir una funcionalidad nueva = importar su FeatureModule aquí y
 * registrarlo (una línea). Nada más cambia en el núcleo ni en la navegación.
 */
export function registerFeatures(): void {
  registerFeature(inicioFeature)
  registerFeature(alfabetoFeature)
  registerFeature(vocabularioFeature)
  registerFeature(lecturaFeature)
}
