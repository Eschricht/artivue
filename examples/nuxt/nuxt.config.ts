import { themes } from 'artivue'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@artivue/nuxt',
  ],

  artivue: {
    theme: themes.dark,
  },

  devtools: { enabled: true },
})
