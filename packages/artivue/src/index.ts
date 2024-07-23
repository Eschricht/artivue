export * from './plugin'
export * from './composables'
export * from './components'
export * as themes from './themes'

export * from './types'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $artivue: import('./types').ThemeData
  }
}
