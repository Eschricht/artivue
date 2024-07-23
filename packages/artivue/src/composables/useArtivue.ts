import { getCurrentInstance, inject } from 'vue'
import { THEME_DATA } from '../utils/symbols'

function useFallback() {
  const instance = getCurrentInstance()

  return instance?.appContext.config.globalProperties.$artivue
}

export function useArtivue() {
  const injectedThemeData = inject(THEME_DATA) ?? useFallback()

  if (!injectedThemeData)
    throw new Error('Artivue plugin is not installed.')

  return injectedThemeData
}
