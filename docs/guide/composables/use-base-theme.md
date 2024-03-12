# `useBaseTheme` - Base theme configuration

The base theme is the root theme of the application which all descendant theme layers is based on. Well... [almost all](/guide/composables/use-theme-layer.html#advanced).

The `useBaseTheme` composable allows you to change your theme whenever you need to - also modifying all descendant layers!

```vue
<script setup lang="ts">
import { themes, useBaseTheme } from 'artivue'

const {
  theme,
  isDark,
  setBaseTheme,
} = useBaseTheme()

function switchTheme() {
  setBaseTheme(isDark.value ? themes.light : themes.dark)
}
</script>
```
