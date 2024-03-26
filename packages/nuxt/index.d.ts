declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    artivue: Omit<Partial<import('artivue').Options>, 'registerComponents'>
  }
}
// It is always important to ensure you import/export something when augmenting a type
export {}
