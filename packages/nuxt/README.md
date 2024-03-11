# Artivue Nuxt Module

Integrate Artivue's dynamic theming capabilities seamlessly into your Nuxt.js projects. This module simplifies the use of Artivue within Nuxt by automatically setting up the Vue plugin for advanced theming and auto-importing necessary composables for immediate use in your application.

## Features

- **Seamless Nuxt Integration**: Designed to integrate smoothly with Nuxt.js projects.
- **Automatic Setup**: Automatically adds the Artivue Vue plugin into your Nuxt application, simplifying the initial setup.
- **Composable Auto-Imports**: Composables `useBaseTheme` and `useThemeLayer` are auto-imported, making them readily available across your project without needing to import them manually.
- **SSR Friendly**: Ensures a consistent theming experience across server-side and client-side rendering.

## Installation

To get started, add the Artivue Nuxt module to your project:

```bash
pnpm add @artivue/nuxt
```

## Setup

Include the Artivue module in your `nuxt.config.ts` or `nuxt.config.js` file to automatically apply Artivue theming to your Nuxt project:

```javascript
export default {
  // Other Nuxt configuration options...
  modules: [
    '@artivue/nuxt',
  ],
  // Optionally, specify Artivue options here
  artivue: {
    // Module options
  },
}
```

## Usage

With the Artivue module for Nuxt, you can directly use Artivue's theming composables within your components without the need for manual imports:

### Dynamic Theme Switching Example

Here's how you can toggle themes in a component:

```vue
<template>
  <button @click="toggleTheme">Toggle Theme</button>
</template>

<script setup>
import { useBaseTheme } from 'artivue';

const { setGlobalTheme, isDark } = useBaseTheme();

function toggleTheme() {
  setGlobalTheme(isDark.value ? 'light' : 'dark');
}
</script>
```

This example demonstrates how to use the `useBaseTheme` composable to dynamically switch between light and dark themes.

## Contributing

Contributions to the Artivue Nuxt module are greatly appreciated. Whether it's enhancing features, improving documentation, or reporting bugs, your input helps make the module better for the community.

## License

This project is open-source and available under the MIT License.
