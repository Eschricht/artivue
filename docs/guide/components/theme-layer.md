# `ThemeLayer` component

The `ThemeLayer` is a component that simply wraps [useThemeLayer composable](/guide/composables/use-theme-layer).

## Props

#### is - `string | Component` - _optional_

Default: `undefined`

By default, `ThemeLayer` is a functional component, not adding any DOM elements. You can disable this behavior by setting this prop to a tag- or component name. The class name will be added to the root component class list

---

#### theme - `object (BaseTheme)` - _optional_

Default: `undefined`

Lets you completely change the theme from it's parent theme

---

#### multiplier - `number` - _optional_

Default: `undefined`

The multiplier passed to `useThemeLayer` which controls how much tint/shade to apply from the parent theme. This will be omitted if `theme` prop is passed.

## Slot props

The slot passes the values returned from `useThemeLayer`:

- `className`: The generated class name which contains the CSS variables
- `isDark`: A boolean which tells if the theme is dark or not
- `theme`: The current theme configuration
- `generatedTheme` - The full generated theme configuration

## Examples

### Basic

```vue
<template>
  <ThemeLayer v-slot="{ className }">
    <div :class="className" class="card">
      <p>Hello world</p>
    </div>
  </ThemeLayer>
</template>
```

Output:

<ThemeLayer v-slot="{ className }">
  <div :class="className" class="card">
    <p>Hello world</p>
  </div>
</ThemeLayer>

---

### Setting `is` prop

```vue
<template>
  <ThemeLayer as="div" class="card">
    <p>Hello world</p>
  </ThemeLayer>
</template>
```

Output:

<ThemeLayer as="div" class="card">
  <p>Hello world</p>
</ThemeLayer>

---

### Nesting

```vue
<template>
  <ThemeLayer as="div" class="card">
    <ThemeLayer as="div" class="card">
      <p>Hello world</p>
    </ThemeLayer>
  </ThemeLayer>
</template>
```

Output:

<ThemeLayer as="div" class="card">
  <ThemeLayer as="div" class="card">
    <p>Hello world</p>
  </ThemeLayer>
</ThemeLayer>

---

### Overriding the default multiplier

```vue
<template>
  <ThemeLayer as="div" class="card" :multiplier="8">
    <p>Hello world</p>
  </ThemeLayer>
</template>
```

Output:

<ThemeLayer as="div" class="card" :multiplier="8">
  <p>Hello world</p>
</ThemeLayer>

---

### Overriding the base theme

```vue
<template>
  <ThemeLayer
    as="div"
    class="card"
    :theme="{
      surfaceColor: '#589edf',
      surfaceTextColor: '#000000',
      accentColor: '#5c72ff',
      accentTextColor: '#ffffff',
    }"
  >
    <p>Hello world</p>
  </ThemeLayer>
</template>
```

Output:

<ThemeLayer as="div" class="card"
  :theme="{
    surface: {
      background: '#589edf',
      text: '#000000',
    },
    accent: {
      background: '#5c72ff',
      text: '#ffffff',
    }
  }">

<p>Hello world</p>
</ThemeLayer>

---

### Using slot props

```vue
<template>
  <ThemeLayer v-slot="{ className, isDark, theme }">
    <div :class="className" class="card">
      <p>The theme is {{ isDark ? 'dark' : 'light' }} and was generated with the following configuration:</p>

      <div class="code-container">
        <pre><code>{{ theme }}</code></pre>
      </div>
    </div>
  </ThemeLayer>
</template>
```

Output:

<ThemeLayer v-slot="{ className, isDark, theme }">
  <div :class="className" class="card">
    <p>The theme is {{ isDark ? 'dark' : 'light' }} and has the following configuration:</p>
    <div un-max="h-32" un-overflow="auto" un-text="xs artivue-surface-text-alt-1" un-border="~ solid artivue-surface-border" un-rounded="xl" un-p="x-4 y-0" un-bg="artivue-surface-action">
      <pre un-m="t-0!"><code>{{ theme }}</code></pre>
    </div>
  </div>
</ThemeLayer>
