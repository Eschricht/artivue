# Artivue

Empower your Vue applications with effortlessly implemented, customizable layered themes! Artivue offers a straightforward way to introduce a dynamic theming system, supporting both predefined themes and your unique designs.

## Getting Started

### Installation

To begin using Artivue in your project, install it using the following command:

```bash
pnpm add artivue
```

### Basic Setup

Integrate Artivue into your Vue application to enrich it with a versatile theming system. Here's how to get started:

```typescript
// Main entry file, e.g., src/main.ts

import { createApp } from 'vue';
import { createArtivue, themes } from 'artivue';
import App from './App.vue';
import './styles/main.css';

const app = createApp(App);

// Define a custom theme or use one from Artivue's collection
const myCustomTheme = {
  surfaceColor: '#161616',
  surfaceTextColor: '#ffffff',
  accentColor: '#a84375',
  accentTextColor: '#ffffff',
};

// Apply a theme to your application
app.use(createArtivue({ theme: themes.midnight })); // or use your custom theme
app.mount('#app');
```

This setup enriches your application with a collection of CSS variables, enabling dynamic theming:

```css
/* Example in src/assets/main.css */

:root {
  background-color: rgba(var(--artivue-surface), 1);
  color: rgba(var(--artivue-text), 1);
}

.btn {
  background-color: rgba(var(--artivue-accent), 1);
  padding: 0 1em;
}
```

### Composables

Artivue provides composables such as `useThemeLayer` and `useBaseTheme` for creating dynamic, layered themes and managing global theme settings.

#### `useThemeLayer`

Create visually distinct layers within your components by applying different theme intensities:

```vue
<script setup lang="ts">
import { useThemeLayer } from 'artivue';

const { className } = useThemeLayer(1); // Adjust the intensity of the theme's shade
</script>

<template>
  <div :class="className" class="card">
    <slot />
  </div>
</template>

<style>
.card {
  border: 1px solid rgba(var(--artivue-border), 1);
  background-color: rgba(var(--artivue-surface), 1);
  padding: 1em;
}
</style>
```

#### `useBaseTheme`

Facilitate theme customization and mode toggling (e.g., switching between dark and light modes) with the `useBaseTheme` composable:

```ts
import { useBaseTheme, themes } from 'artivue';

const { setGlobalTheme, isDark } = useBaseTheme();

function onChange() {
  setGlobalTheme(isDark.value ? themes.light : themes.dark);
}
```

## Integration with Nuxt 3

Enhance your Nuxt 3 projects with Artivue's dynamic theming capabilities:

### Installation

```bash
pnpm add @artivue/nuxt
```

### Setup

Configure Artivue within your `nuxt.config.ts` to start using it in your Nuxt project:

```ts
export default defineNuxtConfig({
  modules: [
    '@artivue/nuxt',
  ],

  // Configuration options (similar to the Vue plugin setup)
  artivue: {},
})
```

### Automatic Imports

The composables `useBaseTheme` and `useThemeLayer` are automatically imported, streamlining their usage in your Nuxt 3 applications.

## Using UnoCSS with Artivue

For projects that leverage UnoCSS, Artivue offers a preset to simplify the definition of utility classes related to theming.

### Installation

```bash
pnpm add -D @artivue/unocss
```

### Configuration

Incorporate the Artivue preset into your UnoCSS configuration:

```ts
import { defineConfig } from 'unocss';
import { presetArtivue } from '@artivue/unocss';

export default defineConfig({
  presets: [
    presetArtivue(),
  ],
});
```
