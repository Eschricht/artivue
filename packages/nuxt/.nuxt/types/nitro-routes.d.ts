// Generated by nitro
import type { Serialize, Simplify } from 'nitropack'
declare module 'nitropack' {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/__nuxt_error': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../../../node_modules/.pnpm/nuxt@3.10.3_@types+node@20.11.25_eslint@8.57.0_rollup@3.29.4_typescript@5.4.2_vite@5.1.5_vue-tsc@2.0.6/node_modules/nuxt/dist/core/runtime/nitro/renderer').default>>>>
    }
  }
}
export {}