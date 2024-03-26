# Nuxt Module

For your Nuxt projects, Artivue is shipped with a Nuxt module

## Installation

::: code-group

```bash [pnpm]
pnpm add @artivue/nuxt
```

```bash [yarn]
yarn add @artivue/nuxt
```

```bash [npm]
npm install @artivue/nuxt
```

:::

Add the module

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@artivue/nuxt',
  ],

  artivue: {
    // Accepts the same configuration as the Vue plugin
  },
})
```

### Auto Imports

#### Components

- [`LayerTheme`](/guide/components/theme-layer)

#### Composables

- [`useBaseTheme`](/guide/composables/use-base-theme)
- [`useThemeLayer`](/guide/composables/use-theme-layer)
- [`useCurrentTheme`](/guide/composables/use-current-theme)
