import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    { builder: 'mkdist', input: './src', pattern: ['**/*.ts'], format: 'esm', loaders: ['js', 'vue'] },
    { builder: 'mkdist', input: './src', pattern: ['**/*.ts'], format: 'cjs', loaders: ['js', 'vue'] },
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
