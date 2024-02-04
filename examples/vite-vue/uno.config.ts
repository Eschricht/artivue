import {
  defineConfig,
  presetUno,
} from 'unocss'
import presetHsl from '../../src'

export default defineConfig({
  presets: [
    presetUno(),
    presetHsl(),
  ],
})
