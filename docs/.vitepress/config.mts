import Unocss from 'unocss/vite'
import { defineConfig } from 'vitepress'

const mainSideBar = [{
  text: 'Guide',
  items: [
    {
      text: 'Getting started',
      link: '/guide/',
    },
    {
      text: 'Styling',
      link: '/guide/styling',
    },
  ],
}, {
  text: 'Composables',
  items: [
    { text: 'useBaseTheme', link: '/guide/composables/use-base-theme' },
    { text: 'useThemeLayer', link: '/guide/composables/use-theme-layer' },
  ],
}, {
  text: 'Integrations',
  items: [
    { text: 'Nuxt', link: '/integrations/nuxt' },
    { text: 'UnoCSS', link: '/integrations/unocss' },
  ],
}]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Artivue',
  description: 'Simplify theme creation and management in your Vue applications. Artivue combines dynamic theming with an intuitive API, making it easier than ever to design outstanding user interfaces.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    nav: [
      { text: 'Guide', link: '/guide/index' },
      { text: 'Theme settings', link: '/settings' },
    ],

    sidebar: {
      '/guide/': mainSideBar,
      '/integrations/': mainSideBar,
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Eschricht/artivue' },
    ],
  },

  appearance: 'dark',

  vite: {
    plugins: [
      Unocss({
        configFile: '../../uno.config.ts',
      }),
    ],
  },
})
