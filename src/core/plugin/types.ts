import type { ComponentType } from 'react'

/**
 * Nivel de sensibilidad de los datos que maneja un feature.
 * En Agora (seguridad ligera) los datos 'sensible' se cifran con WebCrypto
 * antes de guardarse; los 'normal' se guardan tal cual.
 */
export type SecurityLevel = 'normal' | 'sensible'

/**
 * Contrato que TODO feature debe cumplir.
 *
 * El shell (`src/app`) descubre los features a través de este contrato y
 * construye la navegación. Regla de oro de la arquitectura: los features
 * dependen de `core`, NUNCA entre sí.
 *
 * Añadir una funcionalidad nueva = crear `src/features/<id>/`, implementar
 * este contrato y registrarla en `src/app/features.ts`. El núcleo no se toca.
 */
export interface FeatureModule {
  /** Identificador único y estable (p. ej. "notas"). */
  id: string
  /** Nombre visible en la navegación. */
  title: string
  /** Icono (emoji) para la navegación. Opcional. */
  icon?: string
  /** Política de seguridad del feature. */
  security: SecurityLevel
  /**
   * ¿Se muestra en la barra de navegación inferior? Por defecto sí. Los
   * features con `nav: false` siguen registrados y son accesibles por `goTo`
   * (p. ej. desde un hub como «Practicar»), pero no ocupan sitio en la barra.
   */
  nav?: boolean
  /** Componente de pantalla principal del feature. */
  Screen: ComponentType
}
