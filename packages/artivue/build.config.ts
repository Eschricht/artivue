import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index.ts',
  ],
  declaration: true,
  clean: true,
  externals: [
    'colord',
    'vue',
    'unhead',
    '@unhead/vue',
    '@vueuse/core',
  ],
})
