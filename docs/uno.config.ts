import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetArtivue } from '@artivue/unocss'

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

  shortcuts: [
    ['card', 'bg-artivue-surface-bg border border-solid border-artivue-surface-border rounded-lg p-4 [&>p]:my-0'],
  ],
})
