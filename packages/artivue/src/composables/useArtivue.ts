import { getCurrentInstance, inject } from 'vue'
import type { ThemeData } from 'artivue/types'
import { THEME_DATA } from '../utils/symbols'

function useFallback() {
  const instance = getCurrentInstance()

  return instance?.appContext.config.globalProperties.$artivue as ThemeData
}

export function useArtivue() {
  const injectedThemeData = inject(THEME_DATA) ?? useFallback()

  if (!injectedThemeData)
    throw new Error('Artivue plugin is not installed.')

  return injectedThemeData
}
