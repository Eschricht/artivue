import DefaultTheme from 'vitepress/theme'
import 'virtual:uno.css'

import { plugin } from '@nortic/vue-ui'

DefaultTheme.enhanceApp = ({ app }) => {
  app.use(plugin)
}

export default DefaultTheme
