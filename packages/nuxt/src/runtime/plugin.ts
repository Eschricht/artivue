import { createArtivue, defineNuxtPlugin } from '#imports'
import * as artivueOptions from '#artivue-options'

export default defineNuxtPlugin(({ vueApp }) => {
  const plugin = createArtivue({
    ...artivueOptions,
  })

  vueApp.use(plugin)
})
