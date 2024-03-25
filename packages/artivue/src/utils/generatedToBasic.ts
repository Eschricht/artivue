import type { GeneratedTheme, Theme } from '../types'

export function generatedToBasic(resolvedTheme: GeneratedTheme): Theme {
  return {
    accent: {
      background: resolvedTheme.accent.bg.toHex(),
      text: resolvedTheme.accent.text.toHex(),
    },
    surface: {
      background: resolvedTheme.surface.bg.toHex(),
      text: resolvedTheme.surface.text.toHex(),
    },
  }
}
