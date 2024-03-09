import type { BaseTheme } from './themes'
import type { ColordTheme } from './resolveTheme'

export function resolvedToBase(resolvedTheme: ColordTheme): BaseTheme {
  return {
    surfaceColor: resolvedTheme.surface.toHex(),
    surfaceTextColor: resolvedTheme.text.toHex(),
    accentColor: resolvedTheme.accent.toHex(),
    accentTextColor: resolvedTheme['accent-text'].toHex(),
  }
}
