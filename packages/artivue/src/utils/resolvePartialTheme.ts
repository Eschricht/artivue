import type { PartialTheme, Theme } from '../types'

export function resolvePartialTheme(theme: PartialTheme, parent: Theme) {
  const normalizedTheme: Theme = {
    accent: {
      ...parent.accent,
      ...theme.accent || {},
    },
    surface: {
      ...parent.surface,
      ...theme.surface || {},
    },
  }

  return normalizedTheme
}
