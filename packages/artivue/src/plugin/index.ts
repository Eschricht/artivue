import { type MaybeRef, type Plugin, computed, nextTick, ref, unref } from 'vue'
import { createHead, useHead } from '@unhead/vue'
import { getActiveHead } from 'unhead'
import { generateFullTheme } from '../utils/generateTheme'
import { THEME_DATA } from '../utils/symbols'
import { themeToCssContent, themesToVars } from '../utils/themeToCssContent'
import type { Options, PartialTheme } from '../types'
import { resolvePartialTheme } from '../utils/resolvePartialTheme'
import { light } from '../themes'
import * as components from '../components'

export function createArtivue(options: Partial<Options> = {}): Plugin {
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

  return {
    install(app) {
      /**
       * Add Unhead if not already installed
       */
      if (app.config.globalProperties.$unhead === undefined && app.config.globalProperties.$head === undefined) {
        const head = createHead()
        app.use(head)
      }

      const head = getActiveHead()

      if (!head)
        throw new Error('Artivue: Unhead is not installed. Unhead should have been installed with Artivue. Something went wrong - please report this issue.')

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

      const rootThemeData = {
        theme: computed(() => baseTheme.value),
        generatedTheme,
        className: null,
        id: null,
        isDark,
      }

      app.provide(THEME_DATA, {
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
      })
    },
  }
}
