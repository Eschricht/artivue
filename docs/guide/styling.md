# Theming introduction

Based on your current theme configuration, Artivue generates a set of CSS variables and add it to your application, example:

```css
:root {
  --artivue-text-alt: var(--artivue-text-alt-2);
  --artivue-surface: 23, 23, 23;
  --artivue-border: 42, 42, 42;
  --artivue-text: 255, 255, 255;
  --artivue-action: 36, 36, 36;
  --artivue-input: 14, 14, 14;
  --artivue-action-hover: 48, 48, 48;
  --artivue-text-alt-1: 204, 204, 204;
  --artivue-text-alt-2: 179, 179, 179;
  --artivue-text-alt-3: 153, 153, 153;
  --artivue-surface-hover: 36, 36, 36;
  --artivue-surface-light: 48, 48, 48;
  --artivue-surface-dark: 0, 0, 0;
  --artivue-input-focus: 25, 20, 29;
  --artivue-accent: 158, 76, 240;
  --artivue-accent-text: 255, 255, 255;
  --artivue-accent-hover: 171, 99, 242;
  --artivue-accent-light: 184, 123, 244;
  --artivue-accent-dark: 133, 29, 236;
}
```

> [!NOTE]
> This is automatically injected to your application, powered by `@unhead/vue`.

## Usage

I highly recommend using [`@artivue/unocss`](/integrations/unocss) to simplify styling. If that's not an option, the CSS variables are available throughout the application and may be used as you see fit. Example:

```css
/* src/assets/main.css */

:root {
  background-color: rgba(var(--artivue-surface), 1);
  color: rgba(var(--artivue-text), 1);
}

button {
  border: 1px solid rgba(var(--artivue-border), 1);
  border-radius: 0.5em;

  background-color: rgba(var(--artivue-action)), 1);
  color: rgba(var(--artivue-text)), 1);

  padding: 1em;
}

button .accent {
  border: 1px solid rgba(var(--artivue-accent), 1);
  border-radius: 0.5em;

  background-color: rgba(var(--artivue-accent)), 1);
  color: rgba(var(--artivue-accent-text)), 1);
}

input {
    border: 1px solid rgba(var(--artivue-border), 1);
    border-radius: 0.5em;

    background-color: rgba(var(--artivue-input), 1);
    
    padding: 1em;
}
```
