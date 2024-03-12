import type { ComputedRef, InjectionKey, MaybeRef, Ref } from 'vue'
import type { BaseTheme, resolveTheme } from './_theme'

export const GLOBAL_BASE_THEME_DATA = Symbol('GLOBAL_BASE_THEME') as InjectionKey<{
  theme: Ref<BaseTheme>
  resolver: typeof resolveTheme
  prefix: string
  isDark: ComputedRef<boolean>
}>

export const LAYER_THEME_DATA = Symbol('LAYER_THEME') as InjectionKey<{
  layer: Ref<number>
  resolvedTheme: Ref<ReturnType<typeof resolveTheme>>
  id: MaybeRef<string>
}>
