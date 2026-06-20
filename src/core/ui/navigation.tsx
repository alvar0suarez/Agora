import { createContext, useContext, type ReactNode } from 'react'

/**
 * Navegación entre features, expuesta por el shell (`src/app`) y consumida por
 * cualquier feature que necesite enviar al usuario a otra pestaña (p. ej. el
 * "Plan de hoy" de Inicio). Vive en `core` para que los features NO dependan del
 * shell ni entre sí: solo conocen este contrato.
 */
interface Navigation {
  /** Cambia la pestaña activa por el id de su feature. */
  goTo: (featureId: string) => void
}

const NavigationContext = createContext<Navigation>({ goTo: () => {} })

export function NavigationProvider({
  goTo,
  children,
}: {
  goTo: (featureId: string) => void
  children: ReactNode
}) {
  return (
    <NavigationContext.Provider value={{ goTo }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigate(): Navigation {
  return useContext(NavigationContext)
}
