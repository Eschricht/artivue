import { createArtivue } from 'artivue'
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin(({ vueApp }) => {
  const { artivue } = useRuntimeConfig().public

  const plugin = createArtivue({
    ...artivue,
  })

  vueApp.use(plugin)
})
