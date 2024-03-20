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
  text: 'Components',
  items: [
    { text: 'ThemeLayer', link: '/guide/components/theme-layer' },
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
  sitemap: {
    hostname: 'https://artivue.eschricht.dev/',
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'author', content: 'Johannes Eschricht' }],
    ['meta', { name: 'keywords', content: 'vue, theme, theming, design, ui, user interface, artivue' }],
    ['meta', { name: 'og:title', content: 'Artivue' }],
    ['meta', { name: 'og:description', content: 'Simplify theme creation and management in your Vue applications. Artivue combines dynamic theming with an intuitive API, making it easier than ever to design outstanding user interfaces.' }],
    ['meta', { name: 'og:image', content: '/og-image.png' }],
    ['meta', { name: 'og:url', content: 'https://artivue.eschricht.dev/' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Artivue' }],
    ['meta', { name: 'twitter:description', content: 'Simplify theme creation and management in your Vue applications. Artivue combines dynamic theming with an intuitive API, making it easier than ever to design outstanding user interfaces.' }],
    ['meta', { name: 'twitter:image', content: '/og-image.png' }],
  ],
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
      '/components/': mainSideBar,
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
