import type { ComputedRef, MaybeRef } from 'vue'
import type { generateFullTheme } from '../utils/generateTheme'

export interface ThemeProperty {
  text: string
  background: string
}

export interface Theme {
  surface: ThemeProperty
  accent: ThemeProperty
}

export interface Options {
  // TODO: Add options
  theme: Theme
  prefix: string
  registerComponents: boolean
}

export type PartialTheme = {
  [K in keyof Theme]?: Partial<ThemeProperty>
}

export interface Options {
  // TODO: Add options
  theme: Theme
  prefix: string
}

export type GeneratedTheme = ReturnType<typeof generateFullTheme>

export interface UseThemeLayerReturn {
  className: ComputedRef<string>
  theme: ComputedRef<Theme>
  generatedTheme: ComputedRef<GeneratedTheme>
  isDark: ComputedRef<boolean>
  id: ComputedRef<string>
  _multiplier: ComputedRef<number>
}

export interface ThemeData {
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
