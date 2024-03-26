import type { ComputedRef, Ref } from 'vue'
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
