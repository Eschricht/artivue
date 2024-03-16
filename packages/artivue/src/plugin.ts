import { type Plugin, computed, ref } from 'vue'
import { createHead, useHead } from '@unhead/vue'
import { type BaseTheme, type ColordTheme, resolveTheme, themeToVars, themes } from './_theme'
import { GLOBAL_BASE_THEME_DATA, LAYER_THEME_DATA } from './symbols'
import { themeVarsToCSS } from './_theme/themeVarsToCss'
import * as components from './components'

type UseHeadReturn = Exclude<ReturnType<typeof useHead>, void>

export type Options = Partial<{
  theme: BaseTheme
  resolver: (theme: BaseTheme, layer: number) => ColordTheme
  prefix: string
  registerComponents: boolean
}>

const defaultOptions: Required<Options> = {
  theme: themes.DEFAULT,
  resolver: resolveTheme,
  prefix: 'artivue',
  registerComponents: true,
}

export function createArtivue(_options: Options = {}): Plugin {
  return {
    install(app) {
      if (app.config.globalProperties.$unhead === undefined && app.config.globalProperties.$head === undefined) {
        const head = createHead()
        app.use(head)
      }

      const options = { ...defaultOptions, ..._options }

      if (options.registerComponents) {
        for (const [key] of Object.entries(components))
          app.component(key, components[key as keyof typeof components])
      }

      const theme = ref(options.theme)
      const resolvedTheme = computed(() => options.resolver(theme.value, 0))
      const isDark = computed(() => resolvedTheme.value.surface.isDark())
      const cssVars = computed(() => themeToVars(resolvedTheme.value, `-${options.prefix}`))

      const styleClass = computed(() => {
        return [
          themeVarsToCSS(cssVars.value),
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
      })

      app.provide(GLOBAL_BASE_THEME_DATA, {
        theme,
        generatedTheme: resolvedTheme,
        resolver: options.resolver,
        prefix: options.prefix,
        isDark,
        cssVars,
      })

      app.provide(LAYER_THEME_DATA, {
        layer: ref(0),
        theme: computed(() => theme.value),
        generatedTheme: resolvedTheme,
        id: 'base',
      })
    },
  }
}
