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

```typescript
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
For example, you may use classes that match the CSS variables such as `artivue-surface-text`, `artivue-accent-bg`, `artivue-surface-border`, simplifying theming.
If you want to go crazy, there's also utilities like `bg-artivue-surface-text` and `text-artivue-input-focus` etc.

The preset also includes a bunch of other useful UnoCSS rules and shortcuts for easy styling of elements such as buttons and inputs. Check out the [source code](https://github.com/Eschricht/artivue/blob/main/packages/unocss/src/preset.ts) to see the available rules. Example:

```vue
<template>
  <button class="artivue-button-accent artivue-button artivue-button-solid">
    The button
  </button>
</template>
```

Output:

<button class="artivue-button-accent artivue-button artivue-button-solid">
  The button
</button>
