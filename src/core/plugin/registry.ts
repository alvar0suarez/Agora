import type { FeatureModule } from './types'

/**
 * Registro central de features. Es el "enchufe" donde cada funcionalidad se
 * conecta al shell. Mantener esto en el núcleo permite añadir features sin
 * tocar el código de navegación.
 */
const features: FeatureModule[] = []

/**
 * Registra un feature. Es idempotente por `id` (si ya existe, lo reemplaza),
 * para que el recargado en caliente (HMR) durante el desarrollo no falle.
 */
export function registerFeature(feature: FeatureModule): void {
  const i = features.findIndex((f) => f.id === feature.id)
  if (i >= 0) features[i] = feature
  else features.push(feature)
}

/** Devuelve los features registrados (solo lectura). */
export function getFeatures(): readonly FeatureModule[] {
  return features
}
