import { type Plugin, type Ref, computed, reactive, ref } from 'vue'
import { createHead, useHead } from '@unhead/vue'
import { resolveTheme, themeToVars, themes } from './_theme'
import { GLOBAL_BASE_THEME_DATA, LAYER_THEME_DATA } from './symbols'
import { themeVarsToCSS } from './_theme/themeVarsToCss'

type UseHeadReturn = Exclude<ReturnType<typeof useHead>, void>

const defaultOptions = {
  theme: themes.DEFAULT,
  resolver: resolveTheme,
  prefix: 'artivue',
}

export type Options = Partial<typeof defaultOptions>

export function createArtivue(_options: Options = {}): Plugin {
  return {
    install(app) {
      if (app.config.globalProperties.$unhead === undefined && app.config.globalProperties.$head === undefined) {
        const head = createHead()
        app.use(head)
      }

      const options = { ...defaultOptions, ..._options }

      const theme = ref(options.theme)
      const resolvedTheme = computed(() => options.resolver(theme.value, 0))
      const isDark = computed(() => resolvedTheme.value.surface.isDark())

      const styleClass = computed(() => {
        return [
          themeVarsToCSS(themeToVars(resolvedTheme.value, `-${options.prefix}`)),
        ].join(' ')
      })

      app.runWithContext(() => {
        useHead({
          style: [
            {
              id: `${options.prefix}-base`,
              key: `${options.prefix}-base`,
              textContent: styleClass,
            },
          ],
        }) as UseHeadReturn

        app.provide(GLOBAL_BASE_THEME_DATA, {
          theme,
          resolver: options.resolver,
          prefix: options.prefix,
          isDark,
        })
      })

      app.provide(LAYER_THEME_DATA, {
        layer: ref(0),
        resolvedTheme,
        id: 'base',
      })
    },
  }
}
