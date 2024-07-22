import { createArtivue } from 'artivue'
import { defineNuxtPlugin } from '#imports'
import * as artivueOptions from '#artivue-options'

export default defineNuxtPlugin(({ vueApp }) => {
  const plugin = createArtivue({
    ...artivueOptions,
  })

  vueApp.use(plugin)
})
