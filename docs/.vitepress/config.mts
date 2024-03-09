import Unocss from 'unocss/vite'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Nortic UI',
  description: 'A collection of Nortic Vue Components',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/index' },
      { text: 'Components', link: '/components/index' },
    ],

    sidebar: {
      '/guide/': [{
        text: 'Guide',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      }],
      '/components/': [{
        text: 'Overview',
        link: '/components/index',
      }, {
        text: 'Basic',
        collapsed: true,
        items: [
          { text: 'Button', link: '/components/button' },
          { text: 'Label', link: '/api-examples' },
        ],
      }, {
        text: 'Form elements',
        collapsed: true,
        items: [
          { text: 'Input', link: '/markdown-examples' },
          { text: 'Checkbox', link: '/api-examples' },
        ],
      }],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },

  vite: {
    plugins: [
      Unocss({
        configFile: '../../uno.config.ts',
      }),
    ],
  },
})
