import { addComponent, addImports, addPlugin, addTemplate, addTypeTemplate, createResolver, defineNuxtModule, extendViteConfig } from '@nuxt/kit'
import type { Options } from 'artivue'
import { light } from 'artivue/themes'

export type ModuleOptions = Omit<Partial<Options>, 'registerComponents'>

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@artivue/nuxt',
    configKey: 'artivue',
  },
  defaults: {
    prefix: 'artivue',
    theme: light,
  },
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

    nuxt.options.vite.optimizeDeps = nuxt.options.vite.optimizeDeps || {}
    nuxt.options.vite.optimizeDeps.include = nuxt.options.vite.optimizeDeps.include || []
    nuxt.options.vite.optimizeDeps.include.push('artivue')

    nuxt.options.alias['#artivue-options'] = addTemplate({
      filename: 'artivue-options.mjs',
      getContents: () => Object.entries(moduleOptions).map(([key, value]) =>
        `export const ${key} = ${JSON.stringify(value, null, 2)}
      `).join('\n'),
    }).dst

    addTypeTemplate({
      filename: 'artivue-options.d.ts',
      getContents: () => `
declare module '#artivue-options' {
  export const { ${Object.entries(moduleOptions).map(([key]) => key).join(', ')} }: Omit<import('artivue').Options, 'registerComponents'>
}
`,
    })

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
    }, {
      name: 'createArtivue',
      as: 'createArtivue',
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
  },
})
