import { type App, type MaybeRef, type Plugin, computed, ref, unref } from 'vue'
import { createHead, useHead } from '@unhead/vue'
import { generateFullTheme } from '../utils/generateTheme'
import { THEME_DATA } from '../utils/symbols'
import { themeToCssContent, themesToVars } from '../utils/themeToCssContent'
import type { Options, PartialTheme, ThemeData } from '../types'
import { resolvePartialTheme } from '../utils/resolvePartialTheme'
import { light } from '../themes'
import * as components from '../components'

export function createArtivue(options: Partial<Options> = {}): ThemeData & Plugin {
  const _options: Options = {
    prefix: 'artivue',
    theme: light,
    registerComponents: true,
    ...options,
  }

  // Prefix must be a non-empty string consisting of letters, numbers, and hyphens for CSS class name compatibility
  if (!_options.prefix && _options.prefix.match(/^[a-z0-9-]+$/i))
    throw new Error('Artivue: Prefix does not match the required pattern. It must be a non-empty string consisting of letters, numbers, and hyphens only')

  const baseTheme = ref({ ..._options.theme })
  const generatedTheme = computed(() => generateFullTheme(baseTheme.value))
  const isDark = computed(() => generatedTheme.value.surface.bg.isDark())
  const themeVars = computed(() => themesToVars(generatedTheme.value, _options.prefix))
  const cssTextContent = computed(() => themeToCssContent(themeVars.value))

  const rootThemeData = {
    theme: computed(() => baseTheme.value),
    generatedTheme,
    className: null,
    id: null,
    isDark,
  }

  const themeData = {
    ...rootThemeData,
    parentThemeData: null,
    baseThemeData: {
      ...rootThemeData,
      setBaseTheme: (theme: MaybeRef<PartialTheme>) => {
        const newTheme = resolvePartialTheme({ ...unref(theme) }, { ...baseTheme.value })

        baseTheme.value = { ...newTheme }
      },
      options: _options,
    },
  }

  return Object.assign(themeData, {
    install(app: App) {
      /**
       * Add Unhead if not already installed
       */
      if (app.config.globalProperties.$unhead === undefined && app.config.globalProperties.$head === undefined) {
        const head = createHead()
        app.use(head)
      }

      if (_options.registerComponents) {
        // Register components
        Object.entries(components).forEach(([name, component]) => {
          app.component(name, component)
        })
      }

      app.runWithContext(() => {
        useHead({
          style: [
            {
              id: `${_options.prefix}-base`,
              key: `${_options.prefix}-base`,
              textContent: cssTextContent,
            },
          ],
        })
      })

      app.config.globalProperties.$artivue = themeData

      app.provide(THEME_DATA, themeData)
    },
  })
}
