# Artivue

Create layered themes in Vue applications with ease!

## Usage

### Install
```bash
pnpm add artivue
```

### Basic setup
```typescript
// Main entry file, i.e. src/main.ts

import { createApp } from 'vue'

import artivue, { themes } from 'artivue'
import App from './App.vue'

import './styles/main.css'

const app = createApp(App)

const myCustomTheme = {
  surfaceColor: '#161616',
  surfaceTextColor: '#ffffff',
  accentColor: '#a84375',
  accentTextColor: '#ffffff',
}

// Pass a provided theme object or create your own using only 4 properties
app.use(plugin, { theme: themes.midnight })
// app.use(plugin, { theme: myCustomTheme })

app.mount('#app')
```

This adds a bunch of CSS variables to your application

```css
/* src/assets/main.css */

:root {
  background-color: rgba(var(--artivue-surface), 1);
  color: rgba(var(--artivue-text), 1);
}

.btn {
  padding: 0 1em;
  background-color: rgba(var(--artivue-accent), 1);
}
```

### Usage
#### 

#### Create layered components

Layered components are elements which inherits the theme from it's parent element but with a different shade to it, i.e `Card.vue`
This is done by the `useThemeLayer` composable. The composable defines a new CSS class that overrrides the base theme. This class is then used on the component to create the layer effect:
```vue
<script setup lang="ts">
import { useThemeLayer } from 'artivue'

const {
  className,
} = useThemeLayer(1) // The passed argument acts as a multiplier for the shades
</script>

<template>
  <div :class="className">
    <slot />
  </div>
</tempalte>
```
