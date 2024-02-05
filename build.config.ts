import { fileURLToPath } from 'node:url'
import { defineBuildConfig } from 'unbuild'
import { isWindows } from 'std-env'

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/utils',
    'src/types',
  ],
  externals: [
    '@unocss/core',
    '@unocss/preset-mini',
  ],
  alias: {
    '@': fileURLToPath(new URL('src', import.meta.url)),
  },
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    esbuild: {
      minify: true,
    },
    output: {
      compact: true,
      minifyInternalExports: true,
    },
    dts: {
      respectExternal: false,
    },
    inlineDependencies: true,
  },
  failOnWarn: !isWindows,
})
