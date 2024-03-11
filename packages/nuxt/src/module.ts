import { addImports, addPluginTemplate, createResolver, defineNuxtModule } from '@nuxt/kit'
import type { Options } from 'artivue'

export default defineNuxtModule<Options>({
  meta: {
    name: 'artivue',
    configKey: 'artivue',
  },
  defaults: {},
  setup(moduleOptions) {
    const resolver = createResolver(import.meta.url)

    addImports([{
      name: 'useThemeLayer',
      as: 'useThemeLayer',
      from: 'artivue',
    }, {
      name: 'useBaseTheme',
      as: 'useBaseTheme',
      from: 'artivue',
    }])

    addPluginTemplate({
      src: resolver.resolve('runtime/plugin.ts'),
      options: {
        ...moduleOptions,
      },
    })
  },
})
