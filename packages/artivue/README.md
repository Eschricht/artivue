# Artivue

Enhance your Vue applications with dynamic, customizable theming using Artivue. This package allows you to implement layered themes with ease, supporting both predefined and custom themes to tailor your application's look and feel precisely. Artivue is SSR-friendly, ensuring consistent theming on both server-rendered and client-side applications.

## Features

- **Easy Integration**: Seamlessly integrates with any Vue 3 project.
- **Flexible Theming**: Use predefined themes or create your own with simple configurations.
- **Dynamic Theme Switching**: Enable users to switch themes on the fly.
- **Layered Theming**: Effortlessly create nuanced visual layers within your application.
- **CSS Variable Support**: Leverages CSS variables for straightforward theming across your application.
- **SSR Compatibility**: Ensures consistent theming for server-rendered applications, perfect for Nuxt.js projects.

## Installation

```bash
pnpm add artivue
```

## Quick Start

### Setup Artivue

In your main application file (e.g., `src/main.ts` or `src/main.js`), integrate Artivue as follows:

```typescript
import { createApp } from 'vue';
import { createArtivue, themes } from 'artivue';
import App from './App.vue';

const app = createApp(App);

// Initialize Artivue with a predefined theme or your custom theme
app.use(createArtivue({ theme: themes.dark })); // or use your own theme object

app.mount('#app');
```

### Applying Themes

Utilize CSS variables in your application's styles to apply the theme:

```css
/* Example in src/assets/main.css */

body {
  background-color: var(--artivue-surface);
  color: var(--artivue-text);
}
```

## Advanced Usage

### Dynamic Theme Switching

Allow users to switch themes dynamically using `useBaseTheme`:

```vue
<script setup>
import { useBaseTheme, themes } from 'artivue';

const { setGlobalTheme, isDark } = useBaseTheme();

const toggleTheme = () => {
  setGlobalTheme(isDark.value ? themes.light : themes.dark);
};
</script>

<template>
  <button @click="toggleTheme">Toggle Theme</button>
</template>
```

### Creating Thematic Layers

Enhance component visuals with layered themes using `useThemeLayer`:

```vue
<script setup>
import { useThemeLayer } from 'artivue';

const { className } = useThemeLayer(1.5); // Adjust the layer intensity
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
```

## SSR Compatibility

Artivue is fully compatible with Server-Side Rendering, ensuring a seamless integration for SSR frameworks like Nuxt.js. This means that Artivue's dynamic themes and styles are correctly applied and rendered on the server, providing a consistent user experience and improving load times. Whether you're rendering your application on the server or the client, Artivue ensures your themes are applied uniformly, making it an ideal choice for universal Vue applications.

## Contributing

I welcome contributions to Artivue! Whether it's adding new themes, improving the documentation, or reporting issues, your help makes Artivue better for everyone.

## License

Artivue is open-source software licensed under the [MIT license](LICENSE).
