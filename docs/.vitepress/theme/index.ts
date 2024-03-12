import DefaultTheme from 'vitepress/theme'
import { createArtivue, themes } from 'artivue'
import LayoutOverride from './LayoutOverride.vue'

import './custom.css'

import 'virtual:uno.css'

DefaultTheme.enhanceApp = ({ app }) => {
  app.use(createArtivue({
    theme: themes.dark,
  }))
}

export default {
  extends: DefaultTheme,
  Layout: LayoutOverride,
}
