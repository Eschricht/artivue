// @unocss-include

import { dark } from 'artivue/themes'

export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@unocss/nuxt',
  ],

  artivue: {
    prefix: 'artivue',
    theme: dark,
  },

  css: [
    '@unocss/reset/tailwind.css',
  ],

  app: {
    head: {
      htmlAttrs: {
        class: 'artivue-surface',
      },
    },
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-07-22',
})
