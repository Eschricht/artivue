import { themes } from 'artivue'
import githubDark from 'shiki/themes/github-dark-default.mjs'
import githubLight from 'shiki/themes/github-light-default.mjs'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@artivue/nuxt',
    '@unocss/nuxt',
    'nuxt-shiki',
    '@eschricht/nuxt-color-mode',
  ],

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  artivue: {
    theme: themes.dark,
  },

  shiki: {
    highlightOptions: {
      lang: 'typescript',
      themes: {
        dark: {
          ...githubDark,
          bg: 'rgba(var(--artivue-surface-bg))',
        },
        light: {
          ...githubLight,
          bg: 'rgba(var(--artivue-surface-bg))',
        },
      },
    },
  },

  devtools: { enabled: true },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/css/main.css',
  ],

  compatibilityDate: '2024-07-02',
})
