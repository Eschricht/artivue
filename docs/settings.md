<script setup lang="ts">
import Settings from './components/Settings.vue'
import ExampleElements from './components/ExampleElements.vue'
import Card from './components/Card.vue'
import { useBaseTheme } from 'artivue'

const { theme } = useBaseTheme()
</script>

# Theme settings

<Card un-p="4" un-m="t-4">
  <Settings />
</Card>

### Examples with current theme configuration:

<ExampleElements />

### Current theme configuration:

```json-vue
{
  "surface": {
    "bg": "{{ theme.surface.background }}",
    "text": "{{ theme.surface.text }}"
  },
  "accent": {
    "bg": "{{ theme.accent.background }}",
    "text": "{{ theme.accent.text }}"
  }
}
```

### Usage to set base theme with current configuration:

```js-vue
const {
  setBaseTheme
} = useBaseTheme()

setBaseTheme({
  surface: {
    bg: "{{ theme.surface.background }}",
    text: "{{ theme.surface.text }}",
  },
  accent: {
    bg: "{{ theme.accent.background }}",
    text: "{{ theme.accent.text }}",
  },
})
```

### Usage to create a new theme layer with current configuration:

```js-vue
const { className } = useThemeLayer({
  surface: {
    bg: "{{ theme.surface.background }}",
    text: "{{ theme.surface.text }}",
  },
  accent: {
    bg: "{{ theme.accent.background }}",
    text: "{{ theme.accent.text }}",
  },
})
```
