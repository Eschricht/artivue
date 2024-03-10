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

type Options = Partial<typeof defaultOptions>

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
        const baseStyleTag = useHead({
          style: [
            {
              id: `${options.prefix}-base`,
              key: `${options.prefix}-base`,
              textContent: styleClass,
            },
          ],
        }) as UseHeadReturn

        const layerSubscriptions = reactive<Record<string, UseHeadReturn & {
          subscribers: number
        }>>({
          base: reactive({
            ...baseStyleTag,
            subscribers: 1,
          }),
        })

        const subscribe = (key: string, css: Ref<string>) => {
          const entry = layerSubscriptions[key]
          if (entry === undefined) {
            const styleTag = useHead({
              style: [
                {
                  id: `${options.prefix}-${key}`,
                  key: `${options.prefix}-${key}`,
                  textContent: css,
                },
              ],
            }) as Exclude<ReturnType<typeof useHead>, void>

            layerSubscriptions[key] = reactive({
              ...styleTag,
              subscribers: 1,
            })
          }
          else {
            entry.subscribers += 1
          }
        }

        const unsubscribe = (key: string) => {
          const entry = layerSubscriptions[key]

          if (entry === undefined)
            return

          entry.subscribers -= 1

          if (entry.subscribers === 0) {
            entry.dispose()
            delete layerSubscriptions[key]
          }
        }

        app.provide(GLOBAL_BASE_THEME_DATA, {
          theme,
          resolver: options.resolver,
          prefix: options.prefix,
          subscribe,
          unsubscribe,
          isDark,
        })
      })

      app.provide(LAYER_THEME_DATA, {
        layer: ref(0),
        resolvedTheme,
      })
    },
  }
}
