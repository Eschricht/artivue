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
function useCurrentTheme(): {
  theme: ComputedRef<Theme>
  generatedTheme: ComputedRef<GeneratedTheme>
  className: ComputedRef<string> | null
  id: ComputedRef<string> | null
  isDark: ComputedRef<boolean>
  parentThemeData: ThemeData | null
}
```
