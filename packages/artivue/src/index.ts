export * from './plugin'
export * from './composables'
export * from './components'
export * as themes from './themes'
export * from './utils/symbols'

export * from './types'

declare module 'vue' {
  interface ComponentCustomProperties {
    $artivue: import('./types').ThemeData
  }
}
