declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    artivue: import('artivue').Options
  }
}
// It is always important to ensure you import/export something when augmenting a type
export {}
