import { type MaybeRef, computed, provide, unref } from 'vue'
import { useHead } from '@unhead/vue'
import { THEME_DATA } from '../utils/symbols'
import type { PartialTheme, Theme, UseThemeLayerReturn } from '../types'
import { generateFullTheme } from '../utils/generateTheme'
import { resolvePartialTheme } from '../utils/resolvePartialTheme'
import { generatedToBasic } from '../utils/generatedToBasic'
import { themeToCssContent, themesToVars } from '../utils/themeToCssContent'
import { useArtivue } from './useArtivue'

// TODO: Temporary solution until Vue 3.5 is released: https://x.com/youyuxi/status/1745379112456429688?s=20
function generateId(hexColors: string[]): string {
  // const chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  // const hexStr: string = hexColors.map(color => color.substring(1)).join('')
  // const binStr: string = [...hexStr].map(h => Number.parseInt(h, 16).toString(2).padStart(4, '0')).join('')

  // // Mixing bits to create a diverse range of values
  // let id: string = ''
  // for (let i = 0; i < 12; i++) {
  //   let segmentSum: number = 0
  //   for (let j = 0; j < binStr.length; j++) {
  //     // Incorporating more complex operations for bit mixing
  //     const bitValue: number = Number.parseInt(binStr[j] as string, 2)
  //     segmentSum += bitValue * (j + 1) * (i + 1) // Use position-based weighting
  //   }

  //   // Apply a non-linear transformation to the sum before modulo operation
  //   const mixedValue: number = Math.floor(Math.sin(segmentSum + i) * 10000)
  //   id += chars[Math.abs(mixedValue) % 62]
  // }

  const id = hexColors.join('-').replace(/#/g, '')

  return id
}

export function useThemeLayer(multiplier?: MaybeRef<number>): UseThemeLayerReturn
export function useThemeLayer(fn: (parent: Theme, isParentDark: boolean) => PartialTheme, multiplier?: MaybeRef<number>): UseThemeLayerReturn
export function useThemeLayer(theme: MaybeRef<PartialTheme>, multiplier?: MaybeRef<number>): UseThemeLayerReturn
export function useThemeLayer(arg?: MaybeRef<PartialTheme | number | undefined | ((parent: Theme, isParentDark: boolean) => PartialTheme)>, multiplier?: MaybeRef<number | undefined>): UseThemeLayerReturn
export function useThemeLayer(arg?: MaybeRef<PartialTheme | number | undefined | ((parent: Theme, isParentDark: boolean) => PartialTheme)>, multiplier: MaybeRef<number | undefined> = 0): UseThemeLayerReturn {
  const injectedThemeData = useArtivue()

  const {
    theme: parentTheme,
    baseThemeData: { options },
    isDark: isParentDark,
  } = injectedThemeData

  const _multiplier = computed(() => {
    const _arg = unref(arg)

    if (typeof _arg === 'number' || _arg === undefined)
      return _arg || 1
    else
      return unref(multiplier) || 0
  })

  const baseTheme = computed(() => {
    const _arg = unref(arg)

    if (typeof _arg === 'number')
      return parentTheme.value
    else if (typeof _arg === 'function')
      return resolvePartialTheme(_arg(parentTheme.value, isParentDark.value), parentTheme.value)
    else
      return resolvePartialTheme(_arg || {}, parentTheme.value)
  })

  const generatedTheme = computed(() => {
    return generateFullTheme(baseTheme.value, _multiplier.value)
  })

  const theme = computed(() => generatedToBasic(generatedTheme.value))
  const isDark = computed(() => generatedTheme.value.surface.bg.isDark())
  const id = computed(() => generateId([theme.value.surface.background, theme.value.surface.text, theme.value.accent.background, theme.value.accent.text]))
  const className = computed(() => `${options.prefix}-${unref(id)}`)
  const cssTextContent = computed(() => {
    const vars = themesToVars(generatedTheme.value, options.prefix)
    return themeToCssContent(vars, `.${className.value}`)
  })

  useHead({
    style: [
      {
        id: className,
        key: className,
        textContent: cssTextContent,
      },
    ],
  })

  provide(THEME_DATA, {
    ...injectedThemeData,
    isDark,
    className,
    theme,
    id,
    generatedTheme,
    parentThemeData: injectedThemeData,
  })

  return {
    className,
    theme,
    generatedTheme,
    isDark,
    id,
    _multiplier,
  }
}
