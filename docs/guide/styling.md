# Theming introduction

Based on your current theme configuration, Artivue generates a set of CSS variables and add it to your application, example:

```css
:root {
  --artivue-accent-text-alt: var(--artivue-accent-text-alt-2);
  --artivue-accent-bg: 43, 107, 227;
  --artivue-accent-text: 255, 255, 255;
  --artivue-accent-text-alt-1: 204, 204, 204;
  --artivue-accent-text-alt-2: 153, 153, 153;
  --artivue-accent-text-alt-3: 102, 102, 102;
  --artivue-accent-border: 77, 131, 232;
  --artivue-accent-action: 65, 123, 230;
  --artivue-accent-action-hover: 111, 155, 236;
  --artivue-accent-hover: 88, 139, 233;
  --artivue-accent-light: 133, 170, 239;
  --artivue-accent-dark: 19, 65, 149;
  --artivue-accent-light-hover: 178, 202, 245;
  --artivue-accent-dark-hover: 13, 45, 104;
  --artivue-surface-text-alt: var(--artivue-surface-text-alt-2);
  --artivue-surface-bg: 25, 26, 36;
  --artivue-surface-text: 255, 255, 255;
  --artivue-surface-text-alt-1: 204, 204, 204;
  --artivue-surface-text-alt-2: 153, 153, 153;
  --artivue-surface-text-alt-3: 102, 102, 102;
  --artivue-surface-border: 41, 43, 58;
  --artivue-surface-action: 36, 37, 51;
  --artivue-surface-action-hover: 57, 59, 81;
  --artivue-surface-hover: 47, 48, 66;
  --artivue-surface-light: 68, 71, 95;
  --artivue-surface-dark: 0, 0, 0;
  --artivue-surface-light-hover: 89, 93, 125;
  --artivue-surface-dark-hover: 0, 0, 0;
  --artivue-input-text-alt: var(--artivue-input-text-alt-2);
  --artivue-input-bg: 16, 16, 22;
  --artivue-input-focus: 21, 23, 35;
}
```

> [!NOTE]
> This is automatically injected in runtime to your application, powered by [`@unhead/vue`](https://unhead.unjs.io/). Depending on your configuration, there might be a brief flash of incorrect colors. Using Nuxt in SSR or SSG mode is recommended to avoid this.

## Usage

Artivue doesn't utilize the CSS variables out-of-the-box. I highly recommend using [`@artivue/unocss`](/integrations/unocss) to simplify styling. If that's not an option, the CSS variables are available throughout the application and may be used as you see fit. Example:

```css
/* src/assets/main.css */

:root {
  background-color: rgba(var(--artivue-surface-bg), 1);
  color: rgba(var(--artivue-surface-text), 1);
}

button {
  border: 1px solid rgba(var(--artivue-surface-border), 1);
  border-radius: 0.5em;
  background-color: rgba(var(--artivue-surface-action)), 1);
  color: rgba(var(--artivue-suface-text)), 1);
  padding: 1em;
}

button .accent {
  border: 1px solid rgba(var(--artivue-accent-border), 1);
  border-radius: 0.5em;
  background-color: rgba(var(--artivue-accent-bg)), 1);
  color: rgba(var(--artivue-accent-text)), 1);
}

input {
  border: 1px solid rgba(var(--artivue-surface-border), 1);
  border-radius: 0.5em;
  background-color: rgba(var(--artivue-input-bg), 1);
  padding: 1em;
}

input:focus {
  background-color: rgba(var(--artivue-input-focus), 1);
}
```
