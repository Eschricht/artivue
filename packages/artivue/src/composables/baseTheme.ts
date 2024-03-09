import { type MaybeRef, type UnwrapRef, inject, unref } from 'vue'
import { GLOBAL_BASE_THEME_DATA } from '../symbols'
import { themes } from '..'

export function useBaseTheme() {
  const globalData = inject(GLOBAL_BASE_THEME_DATA)

  if (!globalData)
    throw new Error('Nortic UI is not installed')

  const {
    theme,
  } = globalData

  const setGlobalTheme = (newTheme: MaybeRef<UnwrapRef<typeof theme>> = themes.DEFAULT) => {
    theme.value = { ...unref(newTheme) }
  }

  return {
    setGlobalTheme,
    theme,
  }
}
