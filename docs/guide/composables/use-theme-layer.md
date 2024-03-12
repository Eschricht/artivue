<script setup>
import { ref, watch } from 'vue'
import Card from '../../components/Card.vue'
import CustomThemedLayer from '../../components/CustomThemedLayer.vue'
import ArtivueInput from '../../components/ArtivueInput.vue'
import { useBaseTheme, themes } from 'artivue'
import { useData } from 'vitepress'

const {
  setBaseTheme,
  isDark,
} = useBaseTheme()

const { isDark: isVitepressDark } = useData()

function switchTheme() {
  isVitepressDark.value = !isVitepressDark.value
}
</script>

# `useThemeLayer` - Layered themes

With Artivue, creating theme nuances is straightforward thanks to the `useThemeLayer` composable, allowing you to create theme layers.
For example, a Card component can utilize this:

```vue
<script setup lang="ts">
const {
  // Use this on the element where you want to start overriding
  className,
  // A computed which tells if the current theme is dark or not
  isDark,
  // The current theme variables (ComputedRef)
  theme,
} = useThemeLayer(1)
</script>

<template>
  <div
    :class="className"
    class="card"
  >
    <slot />
  </div>
</template>

<style>
.card {
  background-color: rgba(var(--artivue-surface), 1);
  border: 1px solid rgba(var(--artivue-border), 1);
  border-radius: 0.5em;
  padding: 1em;
  color: rgba(var(--artivue-text), 1);
}
</style>
```

Output:
<Card un-p="4">
Hello world!
</Card>

## How does it work?

`useThemeLayer` dynamically adds a new CSS class which can be used to override the base CSS variables. The variables is a tint of its "ancestor" theme.
The composable returns the generated CSS class name in `className`. Add this to the element where you want the theme to start overriding.

It is possible to nest the composable, the generated variables will be based on the previous theme layer:

```html
<template>
  <Card>
    <Card>
      <Card>
        <p>Hello world</p>
      </Card>
    </Card>
  </Card>
</template>
```

Example:
<Card un-m="y-4" un-p="4">
I'm in a layer!
</Card>

<Card class="[&_p]:(m-0)" un-p="4">
  <p un-m="b-4!">First layer (notice that this is the same layer as the card above? They share the same style tag in head even though they are two different instances!)</p>
  <Card un-p="4">
    <p un-m="b-4!">Second layer</p>
    <Card un-p="4">
      <p>Hello world</p>
      <div class="mb-6">
        <ArtivueInput un-w="full" un-min="w-0" un-max="w-xs" placeholder="Themed input!" />
      </div>
      <div class="vp-doc" un-m="y-2">
        <p>Is dark: <code>{{ isVitepressDark }}</code></p>
      </div>
      <button class="artivue-button artivue-button-accent artivue-button-solid" @click="switchTheme()">
        Click me to toggle stuff
      </button>
    </Card>
  </Card>
</Card>

## Advanced

It's also possible to ignore the base theme completely and pass a custom theme

```vue
<script setup>
const {
  // Use this on the element where you want to start overriding
  className,
  // A computed which tells if the current theme is dark or not
  isDark,
  // The current theme variables
  theme,
} = useThemeLayer(0, {
  surfaceColor: '#589edf',
  surfaceTextColor: '#000000',
  accentColor: '#5c72ff',
  accentTextColor: '#ffffff',
})
</script>
```

Example:
<CustomThemedLayer v-slot="{ className }">

  <div :class="className" un-text="artivue-text">
    <Card class="[&_p]:(m-0)" un-p="4">
      <p un-m="b-4!">I have a custom theme</p>
      <Card un-p="4">
        <p>And I'm still nestable</p>
      </Card>
    </Card>
  </div>
</CustomThemedLayer>
