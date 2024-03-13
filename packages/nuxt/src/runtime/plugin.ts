import { type BaseTheme, createArtivue, themes } from 'artivue'
import { defineNuxtPlugin, useCookie, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin(({ vueApp }) => {
  const { artivue } = useRuntimeConfig().public

  const theme = useCookie<BaseTheme | undefined>('artivue-custom-theme', { default: undefined })

  const plugin = createArtivue({
    ...artivue,
    theme: theme.value || artivue.theme || themes.DEFAULT,
    registerComponents: false,
  })

  vueApp.use(plugin)
})
