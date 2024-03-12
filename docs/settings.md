<script setup lang="ts">
import Settings from './components/Settings.vue'
import Card from './components/Card.vue'
import { useBaseTheme } from 'artivue'

const { theme } = useBaseTheme()
</script>

# Theme settings

<Card un-p="4" un-m="t-4">
  <Settings />
</Card>

Current theme output:

```js-vue
{{ theme }}
```
