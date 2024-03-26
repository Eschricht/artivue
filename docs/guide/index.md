<script setup>
import Card from '../components/Card.vue'
</script>

# What is Artivue?

<Card un-p="4" un-m="t-6" un-inline="block" un-transition="colors" un-duration="200" class="hover:(bg-artivue-accent/25 border-artivue-accent-hover/25) [&_div]:hover:(bg-artivue-accent/25 border-artivue-accent-hover/25) [&_p>span]:hover:text-artivue-accent-text-alt-1 [&_p]:hover:text-artivue-accent-text">
  <Card un-p="4" un-transition="colors" un-duration="400">
      <Card un-p="4" un-transition="colors" un-duration="600">
        <p un-m="0!" un-text="xl artivue-accent" un-transition="colors" un-duration="600"><span un-text="artivue-accent-action" un-transition="colors" un-duration="600">Layered themes</span> made easy</p>
      </Card>
  </Card>
</Card>

Artivue is a Vue.js plugin designed to streamline and enhance the process of theming in Vue applications. It offers a set of tools and features that allow developers to easily create, manage, and apply dynamic and layered themes across their projects.

With Artivue, handling themes becomes an intuitive and integrated part of the development process, freeing developers to focus on creating exceptional user experiences without getting bogged down by the complexities of CSS and styling conventions.

## Installation

::: code-group

```bash [pnpm]
pnpm add artivue
```

```bash [yarn]
yarn add artivue
```

```bash [npm]
npm install artivue
```

:::

Then, install add the plugin in your entry file

```typescript
// main.ts
import { createApp } from 'vue'
import { createArtivue } from 'artivue'
import App from './App.vue'

import './styles/main.css'

const artivuePlugin = createArtivue()

const app = createApp(App)
app.use(artivuePlugin)
app.mount('#app')
```

You can optionally specify the initial theme to use, either by using a provided theme

```typescript
import { createArtivue, themes } from 'artivue'

const artivuePlugin = createArtivue({ theme: themes.dark })
```

Or with your own definitions

```typescript
const artivuePlugin = createArtivue({
  theme: {
    surface: {
      background: '#191A23',
      text: '#ffffff',
    },
    accent: {
      background: '#2b6be3',
      text: '#ffffff',
    }
  }
})
```
