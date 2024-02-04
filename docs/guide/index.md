# What is Artivue?

Artivue is a Vue.js plugin designed to streamline and enhance the process of theming in Vue applications. It offers a set of tools and features that allow developers to easily create, manage, and apply dynamic themes across their projects.

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
import { createArtivue, themes } from 'artivue'
import App from './App.vue'

import './styles/main.css'

const artivuePlugin = createArtivue()

const app = createApp(App)
app.use(artivuePlugin)
app.mount('#app')
```

You can optionally specify the initial theme to use, either with your own definitions or use a provided theme

```typescript
import { themes } from 'artivue'

const artivuePlugin = createArtivue({ theme: themes.dark })

```

```typescript
const artivuePlugin = createArtivue({
  theme: {
    accentColor: '#2b6be3',
    accentTextColor: '#ffffff',
    surfaceColor: '#191A23',
    surfaceTextColor: '#ffffff',
  }
})
```
