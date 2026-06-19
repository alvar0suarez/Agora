import { Card } from '../../core/ui/Card'
import type { FeatureModule } from '../../core/plugin/types'

/**
 * Feature de EJEMPLO. Su único objetivo es demostrar el contrato
 * FeatureModule de punta a punta: el shell lo descubre y lo pinta.
 * Es borrable en cuanto creemos los features reales de Agora.
 */
function WelcomeScreen() {
  return (
    <Card title="Agora — Fase 0 ✅">
      <p>
        Esqueleto PWA local-first funcionando. Esta pantalla es un feature de
        ejemplo que demuestra el contrato modular del proyecto.
      </p>
      <p>
        Lo siguiente: definir juntos las funcionalidades reales y crearlas en{' '}
        <code>src/features/</code> sin tocar el núcleo.
      </p>
    </Card>
  )
}

export const welcomeFeature: FeatureModule = {
  id: 'welcome',
  title: 'Inicio',
  security: 'normal',
  Screen: WelcomeScreen,
}
