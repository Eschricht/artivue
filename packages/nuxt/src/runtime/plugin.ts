import createArtivue, { type Options } from 'artivue'
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin(({ vueApp }) => {
  const { artivue } = useRuntimeConfig().public

  const plugin = createArtivue({
    ...artivue,
    registerComponents: false,
  })

  vueApp.use(plugin)
})
