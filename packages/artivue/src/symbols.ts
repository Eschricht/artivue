import type { ComputedRef, InjectionKey, MaybeRef, Ref } from 'vue'
import type { BaseTheme, resolveTheme } from './_theme'

export const GLOBAL_BASE_THEME_DATA = Symbol('GLOBAL_BASE_THEME') as InjectionKey<{
  theme: Ref<BaseTheme>
  generatedTheme: ComputedRef<ReturnType<typeof resolveTheme>>
  resolver: typeof resolveTheme
  prefix: string
  isDark: ComputedRef<boolean>
}>

export const LAYER_THEME_DATA = Symbol('LAYER_THEME') as InjectionKey<{
  theme: ComputedRef<BaseTheme>
  layer: Ref<number>
  generatedTheme: Ref<ReturnType<typeof resolveTheme>>
  id: MaybeRef<string>
}>
