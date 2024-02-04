import {
  defineConfig,
  presetMini,
} from 'unocss'
import presetHsl from '../../src'

export default defineConfig({
  presets: [
    presetMini(),
    presetHsl(),
  ],
})
