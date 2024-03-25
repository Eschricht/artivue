import type { ComputedRef, InjectionKey, MaybeRef } from 'vue'
import type { GeneratedTheme, Options, Theme } from '../types'

interface ThemeData {
  theme: ComputedRef<Theme>
  generatedTheme: ComputedRef<GeneratedTheme>
  className: ComputedRef<string> | null
  id: ComputedRef<string> | null
  isDark: ComputedRef<boolean>
  parentThemeData: ThemeData | null
  baseThemeData: Omit<ThemeData, 'parentThemeData' | 'baseThemeData'> & {
    setBaseTheme: (theme: MaybeRef<Theme>) => void
    options: Options
  }
}

export const THEME_DATA = Symbol('BASE_THEME') as InjectionKey<ThemeData>
