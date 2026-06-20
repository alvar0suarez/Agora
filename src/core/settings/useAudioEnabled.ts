import { useCallback, useEffect, useState } from 'react'
import {
  isAudioEnabled,
  setAudioEnabled,
  subscribeAudioEnabled,
} from './audio'

/**
 * Hook del ajuste de audio: devuelve si está activado y una función para
 * alternarlo. Se sincroniza con el store (otros puntos pueden cambiarlo).
 */
export function useAudioEnabled(): readonly [boolean, () => void] {
  const [enabled, setEnabled] = useState(isAudioEnabled())
  useEffect(() => subscribeAudioEnabled(setEnabled), [])
  const toggle = useCallback(() => setAudioEnabled(!isAudioEnabled()), [])
  return [enabled, toggle] as const
}
