import { type MaybeRef, computed, inject, onUnmounted, provide, unref } from 'vue'
import { useHead } from '@unhead/vue'
import { GLOBAL_BASE_THEME_DATA, LAYER_THEME_DATA } from '../symbols'
import type { BaseTheme } from '../_theme'
import { resolvedToBase, themeToVars } from '../_theme'
import { themeVarsToCSS } from '../_theme/themeVarsToCss'

function getId() {
  const idGen = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  return Array.from({ length: 6 }, () => idGen[Math.floor(Math.random() * idGen.length)]).join('')
}

export function useThemeLayer(levelIncrease: MaybeRef<number> = 0, customTheme: BaseTheme | undefined = undefined) {
  const themeLevel = inject(LAYER_THEME_DATA)
  const globalConfig = inject(GLOBAL_BASE_THEME_DATA)

  if (!themeLevel || !globalConfig)
    throw new Error('Artivue is not installed')

  const { layer: parentLevel, resolvedTheme, id: parentId } = themeLevel
  const currentLevel = computed(() => parentLevel.value + unref(levelIncrease))

  const uniqueId = getId()

  const id = computed(() => customTheme ? `${globalConfig.prefix}-${uniqueId}` : `${globalConfig.prefix}-${unref(parentId)}-${currentLevel.value}`)

  const toBaseTheme = computed<BaseTheme>(() => customTheme ?? resolvedToBase({ ...resolvedTheme.value }))
  const localTheme = computed(() => globalConfig.resolver(toBaseTheme.value, unref(levelIncrease)))
  const isDark = computed(() => localTheme.value.surface.isDark())
  const cssVars = computed(() => {
    return themeVarsToCSS(themeToVars(localTheme.value, `-${globalConfig.prefix}`), `.${id.value}`)
  })
  const providerId = computed(() => customTheme ? uniqueId : unref(parentId))

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
    resolvedTheme: localTheme,
    id: providerId,
  })

  return {
    className: id,
    theme: localTheme,
    isDark,
  }
}
