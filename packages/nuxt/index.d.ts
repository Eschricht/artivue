import type { Options } from 'artivue'

export type ModuleOptions = Omit<Options, 'registerComponents'>

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    artivue: Options
  }
}
// It is always important to ensure you import/export something when augmenting a type
export {}
