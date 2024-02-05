# HSL Color Preset for UnoCSS: Vibrant Colors Made Easy

Welcome to the HSL Color Preset for UnoCSS – your new best friend for crafting vibrant, expressive color schemes in your web projects. This preset is all about making color manipulation as straightforward and flexible as possible. Say goodbye to the endless cycle of picking shades like `bg-dark-200` and hello to a world where creating the perfect color is a breeze.

## Why Choose HSL Color Preset?

- [x] **Simplicity at Its Best**: Forget about the confusion of hex codes and the intricacies of RGB. Our HSL values are intuitive, making your color customization process a walk in the park.
- [x] **Precision Control**: Dive into the nuances of hue, saturation, and lightness with direct access via CSS variables. Adjusting your colors has never been so effortless.
- [x] **Perfect Harmony with UnoCSS**: Crafted to complement the UnoCSS ecosystem, this preset enhances your utility toolkit, enabling more dynamic and expressive designs.

## Getting started

### Installation

First things first, let's add `unocss-preset-hsl` to your project:
 ```bash
 pnpm add -D unocss-preset-hsl
 ```

### Configuration

Next up, configure your uno.config.ts to include the HSL preset:
 ```typescript
 import {
   defineConfig,
   presetMini,
 } from 'unocss'
 import presetHsl from 'unocss-preset-hsl'
  
 export default defineConfig({
   presets: [
     presetMini(), // Optional but recommended to include any preset that extends presetMini for theme color enhancements
     presetHsl(),
   ],
 })
 ```

## Usage

Get ready to unleash the power of HSL in your designs:

```html
 <!-- Set base HSL colors -->
 <div
   class="p-4 min-h-screen bg-hsl-22252e border-hsl-gray-500 text-hsl-light-100"
 >
   <!-- Reuse HSL values and modify with darken, lighten, saturate and more -->
   <div class="p-4 inline-block border rounded-lg bg-hsl border-hsl border-hsl-darken-20 bg-hsl-lighten-2">
     <label>
       <p>Hello World</p>

       <input
         placeholder="Enter a value"
         class="px-2 border rounded-md outline-none transition-all duration-300 bg-hsl border-hsl border-hsl-darken-10 bg-hsl-lighten-5 focus:border-hsl-teal placeholder:text-hsl focus:border-hsl-darken-20 placeholder:text-hsl-darken-50 focus:-bg-hsl-spin-100"
       >
       <p class="text-xs text-hsl text-hsl-darken-30">
         Theming made easy with HSL colors
       </p>
     </label>
   </div>
 </div>
```

## Preset Rules

| Rule | Description |
|------|-------------|
| `<bg\|text\|border>-hsl-<color>` | Sets a base HSL color |
| `<bg\|text\|border>-hsl` | Apply inherited HSL CSS variables |
| `<bg\|text\|border>-hsl-<hue\|saturation\|lightness\|alpha>-<level>` | Fine-tune HSL components individually |
| `<bg\|text\|border>-hsl-<darken\|lighten\|saturate\|desaturate\|spin>-<level>` | Dynamically modify inherited HSL values |

## TODO
- [ ] Combine HSL colors with linear-gradient
- [ ] Combine HSL colors with box-shadow
