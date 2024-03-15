# `useBaseTheme` - Base theme configuration

The base theme is the root theme of the application which all descendant theme layers is based on. Well... [almost all](/guide/composables/use-theme-layer.html#advanced).

The `useBaseTheme` composable allows you to change your theme whenever you need to - also modifying all descendant layers!

```vue
<script setup lang="ts">
import { themes, useBaseTheme } from 'artivue'

const {
  // A Ref containing the current theme config
  theme,
  // A ComputedRef with the full generated theme config
  generatedTheme,
  // A ComputedRef which tells if the current theme is dark or not
  isDark,
  // A function to set a new base theme. (It's also possible to modify `theme ref`)
  setBaseTheme,
} = useBaseTheme()

function switchTheme() {
  setBaseTheme(isDark.value ? themes.light : themes.dark)
}
</script>
```

## Type reference

```typescript
declare function useBaseTheme(): {
    setBaseTheme: (newTheme?: MaybeRef<BaseTheme>) => void;
    theme: Ref<BaseTheme>;
    isDark: ComputedRef<boolean>;
    generatedTheme: ComputedRef<ColordTheme>;
};
```
