import { type MaybeRef, computed, inject, provide, unref } from 'vue'
import { useHead } from '@unhead/vue'
import { GLOBAL_BASE_THEME_DATA, LAYER_THEME_DATA } from '../symbols'
import type { BaseTheme } from '../_theme'
import { resolvedToBase, themeToVars } from '../_theme'
import { themeVarsToCSS } from '../_theme/themeVarsToCss'

function getId() {
  const idGen = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  return Array.from({ length: 6 }, () => idGen[Math.floor(Math.random() * idGen.length)]).join('')
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

  const uniqueId = getId()

  const { layer: parentLevel, id: parentId, theme } = themeLevel

  const isCustomTheme = computed(() => isThemeOverride(unref(arg)))

  const baseTheme = computed(() => {
    const _arg = unref(arg)

    if (isThemeOverride(_arg))
      return { ..._arg }

    return { ...theme.value }
  })

  const multiplier = computed(() => {
    const _arg = unref(arg)

    if (isMultiplier(_arg))
      return _arg

    if (isThemeOverride(_arg))
      return 0

    return 1
  })

  const currentLevel = computed(() => parentLevel.value + multiplier.value)

  // TODO: Make the string acceptable as CSS name
  const id = computed(() => (isCustomTheme.value ? `${globalConfig.prefix}-${uniqueId}` : `${globalConfig.prefix}-${unref(parentId)}-${currentLevel.value}`))
  const localTheme = computed(() => globalConfig.resolver(baseTheme.value, unref(currentLevel)))
  const isDark = computed(() => localTheme.value.surface.isDark())
  const cssVars = computed(() => {
    return themeVarsToCSS(themeToVars(localTheme.value, `-${globalConfig.prefix}`), `.${id.value}`)
  })
  const providerId = computed(() => isCustomTheme.value ? uniqueId : unref(parentId))

  useHead({
    style: [
      {
        id,
        key: id,
        textContent: cssVars,
      },
    ],
  })

  provide(LAYER_THEME_DATA, {
    layer: currentLevel,
    generatedTheme: localTheme,
    theme: baseTheme,
    id: providerId,
  })

  return {
    className: id,
    theme: baseTheme,
    generatedTheme: localTheme,
    isDark,
  }
}
