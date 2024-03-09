import { useStyleTag } from '@vueuse/core'
import { type Plugin, type Ref, type UnwrapNestedRefs, computed, reactive, ref } from 'vue'
import { resolveTheme, themeToVars, themes } from './_theme'
import { GLOBAL_BASE_THEME_DATA, LAYER_THEME_DATA } from './symbols'
import { themeVarsToCSS } from './_theme/themeVarsToCss'

const defaultOptions = {
  theme: themes.DEFAULT,
  resolver: resolveTheme,
  prefix: 'artivue',
}

type Options = Partial<typeof defaultOptions>

export const plugin: Plugin<[_options: Options]> = {
  install(app, _options = {}) {
    const options = { ...defaultOptions, ..._options }

    const theme = ref(options.theme)
    const resolvedTheme = computed(() => options.resolver(theme.value, 0))
    const isDark = computed(() => resolvedTheme.value.surface.isDark())

    const styleClass = computed(() => {
      return [
        themeVarsToCSS(themeToVars(resolvedTheme.value, `-${options.prefix}`)),
      ].join(' ')
    })

    const baseStyleTag = useStyleTag(styleClass, { id: `${options.prefix}-base` })

    const layerSubscriptions = reactive<Record<string, UnwrapNestedRefs<ReturnType<typeof useStyleTag>> & {
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
        const styleTag = useStyleTag(css, { id: `${options.prefix}-${key}` })

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
        entry.unload()
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

    app.provide(LAYER_THEME_DATA, {
      layer: ref(0),
      resolvedTheme,
    })
  },
}
