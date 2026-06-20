import { registerFeature } from '../core/plugin/registry'
import { inicioFeature } from '../features/inicio'
import { caminoFeature } from '../features/camino'
import { alfabetoFeature } from '../features/alfabeto'
import { vocabularioFeature } from '../features/vocabulario'
import { lecturaFeature } from '../features/lectura'
import { gramaticaFeature } from '../features/gramatica'
import { etimologiaFeature } from '../features/etimologia'

/**
 * Punto ÚNICO donde se enchufan los features al shell.
 *
 * Añadir una funcionalidad nueva = importar su FeatureModule aquí y
 * registrarlo (una línea). Nada más cambia en el núcleo ni en la navegación.
 */
export function registerFeatures(): void {
  registerFeature(inicioFeature)
  registerFeature(caminoFeature)
  registerFeature(alfabetoFeature)
  registerFeature(vocabularioFeature)
  registerFeature(lecturaFeature)
  registerFeature(gramaticaFeature)
  registerFeature(etimologiaFeature)
}
