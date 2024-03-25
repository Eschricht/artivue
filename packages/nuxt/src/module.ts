import { addComponent, addImports, addPlugin, createResolver, defineNuxtModule, extendViteConfig } from '@nuxt/kit'
import type { Options } from 'artivue'

export type ModuleOptions = Partial<Options>

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@artivue/nuxt',
    configKey: 'artivue',
  },
  defaults: {},
  hooks: {
    'prepare:types': (ctx) => {
      ctx.tsConfig.compilerOptions ||= {}
      ctx.tsConfig.compilerOptions.types ||= []
      ctx.tsConfig.compilerOptions!.types.push('artivue')
      ctx.references.push({
        types: 'artivue',
      })
    },
  },
  setup(moduleOptions, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Add plugin
    nuxt.options.runtimeConfig.public.artivue = {
      ...moduleOptions,
    }

    addImports([{
      name: 'useThemeLayer',
      as: 'useThemeLayer',
      from: 'artivue',
    }, {
      name: 'useBaseTheme',
      as: 'useBaseTheme',
      from: 'artivue',
    }, {
      name: 'useCurrentTheme',
      as: 'useCurrentTheme',
      from: 'artivue',
    }, {
      name: 'useArtivue',
      as: 'useArtivue',
      from: 'artivue',
    }])

    addComponent({
      name: 'ThemeLayer',
      export: 'ThemeLayer',
      filePath: 'artivue',
    })

    addPlugin({
      src: resolver.resolve('runtime/plugin'),
      name: 'artivue',
      mode: 'all',
    })

    extendViteConfig((config) => {
      config.build = config.build || {}
      config.build.rollupOptions = config.build.rollupOptions || {}
      config.build.rollupOptions.output = config.build.rollupOptions.output || {}

      config.build.rollupOptions.output = {
        ...config.build.rollupOptions.output,
        manualChunks: (id) => {
          if (id.includes('/node_modules/artivue'))
            return 'artivue'
        },
      }
    })
  },
})
