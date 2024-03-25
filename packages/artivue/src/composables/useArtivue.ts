import { inject } from 'vue'
import { THEME_DATA } from '../utils/symbols'

export function useArtivue() {
  const injectedThemeData = inject(THEME_DATA)

  if (!injectedThemeData)
    throw new Error('Artivue plugin is not installed.')

  return injectedThemeData
}
