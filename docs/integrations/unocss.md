# UnoCSS Preset

The UnoCSS preset adds a set of UnoCSS rules and theme colors that simplifies theming with the Artivue CSS variables

## Installation

::: code-group

```bash [pnpm]
pnpm add @artivue/unocss
```

```bash [yarn]
yarn add @artivue/unocss
```

```bash [npm]
npm install @artivue/unocss
```

:::

## Add preset

```ts
// uno.config.ts
import { presetArtivue } from '@artivue/unocss'
import {
  defineConfig,
} from 'unocss'

export default defineConfig({
  presets: [
    presetArtivue(),
  ],
})
```

### Why?

The preset adds a bunch of new theme colors to UnoCSS that is based on the CSS variables.
For example, you may use classes as `text-artivue-text`, `bg-artivue-accent`, `border-artivue-border`, simplifying theming.

The preset also includes a bunch of UnoCSS rules. Check out the [source code](https://github.com/Eschricht/artivue/blob/main/packages/unocss/src/preset.ts) to see the available rules.
