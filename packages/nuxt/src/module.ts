import { addComponent, addImports, addPlugin, addPluginTemplate, createResolver, defineNuxtModule } from '@nuxt/kit'

import type { ModuleOptions } from '@nuxt/schema'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'artivue',
    configKey: 'artivue',
  },
  defaults: {},
  setup(moduleOptions, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Add plugin
    nuxt.options.runtimeConfig.public.artivue = {
      ...moduleOptions,
      registerComponents: false,
    }

    addImports([{
      name: 'useThemeLayer',
      as: 'useThemeLayer',
      from: 'artivue',
    }, {
      name: 'useBaseTheme',
      as: 'useBaseTheme',
      from: 'artivue',
    }])

    addComponent({
      name: 'ThemeLayer',
      export: 'ThemeLayer',
      filePath: 'artivue/components',
    })

    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
