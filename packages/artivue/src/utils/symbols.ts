import type { InjectionKey } from 'vue'
import type { ThemeData } from '../types'

export const THEME_DATA = Symbol('BASE_THEME') as InjectionKey<ThemeData>
