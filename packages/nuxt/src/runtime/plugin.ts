import type { Options, themes } from 'artivue'
import { createArtivue } from 'artivue'
import { defineNuxtPlugin, useCookie } from '#app'

export default defineNuxtPlugin(({ vueApp }) => {
  const options = JSON.parse('<%= JSON.stringify(options) %>') as unknown as Options

  const theme = useCookie<typeof themes['DEFAULT'] | undefined>('artivue-custom-theme', { default: undefined })

  const plugin = createArtivue({
    ...options,
    theme: theme.value || options.theme,
    registerComponents: false,
  })

  vueApp.use(plugin)
})
