import { presetArtivue } from '@artivue/unocss'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      unit: 'em',
    }),
    presetWebFonts({
      fonts: {
        sans: 'Inter',
        mono: 'Jet Brains Mono',
      },
    }),

    // Artivue preset
    presetArtivue(),
    presetAttributify({
      prefix: 'un-',
      prefixedOnly: true,
    }),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],

  content: {
    pipeline: {
      include: ['./**/*.vue', './**/*.md'],
    },
  },
})
