# Artivue UnoCSS Preset

Enhance your Vue applications with the power of Artivue themes combined with the flexibility and efficiency of UnoCSS. The Artivue UnoCSS preset allows you to seamlessly integrate dynamic theming into your project, utilizing UnoCSS's utility-first approach for an efficient and expressive styling experience.

## Features

- **Seamless Integration**: Easily add Artivue theming capabilities to your UnoCSS setup.
- **Dynamic Theming**: Utilize Artivue's dynamic themes with UnoCSS utilities.
- **Customizable Prefix**: Configure the prefix for your CSS variables and utilities to avoid conflicts and maintain consistency.
- **Efficient Styling**: Leverage UnoCSS's on-demand utility generation to keep your project lightweight.

## Installation

Install the Artivue UnoCSS preset:

```bash
pnpm add @artivue/unocss
```

## Setup

In your UnoCSS configuration file (e.g., `unocss.config.ts`), import and use the `presetArtivue`:

```typescript
import { defineConfig } from 'unocss'
import { presetArtivue } from '@artivue/unocss'

export default defineConfig({
  presets: [
    presetArtivue({
      // options here, such as custom prefix
      prefix: 'artivue',
    }),
    // other presets
  ],
})
```

## Usage

With the preset configured, you can start using the themed utilities in your application. The utilities are generated based on your Artivue theme colors and can be used directly in your Vue components:

```html
<div class="artivue-text artivue-bg-surface artivue-border">
  Themed component using Artivue with UnoCSS
</div>
```

## Customization

You can customize the prefix and other options to fit your project needs. This allows for seamless integration and ensures that the generated utilities align with your project's naming conventions.

## Contributing

Contributions to the Artivue UnoCSS preset are welcome! Whether it's suggesting new features, improving the documentation, or fixing bugs, your input helps make this project better for everyone.

## License

This project is open-source and available under the MIT License.
