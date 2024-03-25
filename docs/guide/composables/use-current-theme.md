# `useCurrentTheme` - Current theme configuration

Simply loads the current theme configuration without applying any modifications.

```vue
<script setup lang="ts">
import { useCurrent } from 'artivue'

const {
  // A ComputedRef containing the current theme config
  theme,
  // A ComputedRef with the full generated theme config
  generatedTheme,
  // A ComputedRef which tells if the current theme is dark or not
  isDark,
  // A ComputedRef with the current theme CSS name
  className,
} = useCurrentTheme()
</script>
```

## Type reference

```typescript
declare function useThemeLayer(arg?: MaybeRef<number | undefined | BaseTheme>): {
    className: ComputedRef<string>;
    parentTheme: ComputedRef<BaseTheme>;
    theme: ComputedRef<BaseTheme>;
    generatedTheme: ComputedRef<ColordTheme>;
    isDark: ComputedRef<boolean>;
    cssVars: ComputedRef<Record<string, string>>;
};
```
