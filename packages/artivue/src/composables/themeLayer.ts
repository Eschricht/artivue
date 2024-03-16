import { type MaybeRef, computed, inject, provide, unref } from 'vue'
import { useHead } from '@unhead/vue'
import { GLOBAL_BASE_THEME_DATA, LAYER_THEME_DATA } from '../symbols'
import type { BaseTheme } from '../_theme'
import { resolvedToBase, themeToVars } from '../_theme'
import { themeVarsToCSS } from '../_theme/themeVarsToCss'

function getId(theme: BaseTheme) {
  return Object.keys(theme).map(key => theme[key as keyof BaseTheme].replace('#', '')).join('-')
}

function isThemeOverride(arg: number | undefined | BaseTheme): arg is BaseTheme {
  return typeof unref(arg) === 'object'
}

function isMultiplier(arg: number | undefined | BaseTheme): arg is number {
  return typeof unref(arg) === 'number'
}

export function useThemeLayer(arg: MaybeRef<number | undefined | BaseTheme> = undefined) {
  const themeLevel = inject(LAYER_THEME_DATA)
  const globalConfig = inject(GLOBAL_BASE_THEME_DATA)

  if (!themeLevel || !globalConfig)
    throw new Error('Artivue is not installed')

  const { layer: parentLevel, id: parentId, theme } = themeLevel

  const isCustomTheme = computed(() => isThemeOverride(unref(arg)))

  const baseTheme = computed(() => {
    const _arg = unref(arg)

    if (isThemeOverride(_arg))
      return { ..._arg }

    return { ...theme.value }
  })

  const id = computed(() => isCustomTheme.value ? unref(getId(theme.value)) : unref(parentId))

  const multiplier = computed(() => {
    const _arg = unref(arg)

    if (isMultiplier(_arg))
      return _arg

    if (isThemeOverride(_arg))
      return 0

    return 1
  })

  const currentLevel = computed(() => (isCustomTheme.value ? 0 : parentLevel.value) + multiplier.value)

  // TODO: Make the string acceptable as CSS name
  const uniqueId = computed(() => isCustomTheme.value ? `${globalConfig.prefix}-${unref(id)}` : `${globalConfig.prefix}-${unref(id)}-${currentLevel.value}`)
  const localTheme = computed(() => globalConfig.resolver(baseTheme.value, unref(currentLevel)))
  const isDark = computed(() => localTheme.value.surface.isDark())
  const cssVars = computed(() => themeToVars(localTheme.value, `-${globalConfig.prefix}`))
  const cssTextContent = computed(() => {
    return themeVarsToCSS(cssVars.value, `.${uniqueId.value}`)
  })
  const localThemeBaseConfig = computed(() => resolvedToBase(localTheme.value))

  useHead({
    style: [
      {
        id: uniqueId,
        key: uniqueId,
        textContent: cssTextContent,
      },
    ],
  })

  provide(LAYER_THEME_DATA, {
    layer: currentLevel,
    generatedTheme: localTheme,
    theme: baseTheme,
    id,
  })

  return {
    className: uniqueId,
    theme: localThemeBaseConfig,
    generatedTheme: localTheme,
    isDark,
    cssVars,
  }
}
