import { registerFeature } from '../core/plugin/registry'
import { hoyFeature } from '../features/hoy'
import { inicioFeature } from '../features/inicio'
import { entrenarFeature } from '../features/entrenar'
import { practicarFeature } from '../features/practicar'
import { caminoFeature } from '../features/camino'
import { alfabetoFeature } from '../features/alfabeto'
import { vocabularioFeature } from '../features/vocabulario'
import { lecturaFeature } from '../features/lectura'
import { gramaticaFeature } from '../features/gramatica'
import { teoriaFeature } from '../features/teoria'
import { etimologiaFeature } from '../features/etimologia'
import { museoFeature } from '../features/museo'
import { nousFeature } from '../features/nous'

/**
 * Punto ÚNICO donde se enchufan los features al shell.
 *
 * Añadir una funcionalidad nueva = importar su FeatureModule aquí y
 * registrarlo (una línea). Nada más cambia en el núcleo ni en la navegación.
 */
export function registerFeatures(): void {
  // «Hoy» primero: es la puerta de entrada del viaje (pantalla inicial).
  registerFeature(hoyFeature)
  registerFeature(inicioFeature)
  registerFeature(entrenarFeature)
  registerFeature(caminoFeature)
  registerFeature(practicarFeature)
  registerFeature(alfabetoFeature)
  registerFeature(vocabularioFeature)
  registerFeature(lecturaFeature)
  registerFeature(gramaticaFeature)
  registerFeature(teoriaFeature)
  registerFeature(etimologiaFeature)
  registerFeature(museoFeature)
  registerFeature(nousFeature)
}
