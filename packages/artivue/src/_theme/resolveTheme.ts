import type { Colord } from 'colord'
import { colord, extend } from 'colord'
import mixPlugin from 'colord/plugins/mix'
import type { BaseTheme } from './themes'

extend([mixPlugin])

export interface ColordTheme {
  'surface': Colord
  'border': Colord
  'text': Colord
  'action': Colord
  'input': Colord
  'action-hover': Colord
  'text-alt-1': Colord
  'text-alt-2': Colord
  'text-alt-3': Colord
  'surface-hover': Colord
  'surface-light': Colord
  'surface-dark': Colord
  'input-focus': Colord
  'accent': Colord
  'accent-text': Colord
  'accent-hover': Colord
  'accent-light': Colord
  'accent-dark': Colord
}

function changeLightnessBy(color: Colord, level: number) {
  const { l, ...rest } = color.toHsl()

  return colord({ ...rest, l: l + level })
}

export function resolveTheme(theme: BaseTheme, level: number): ColordTheme
export function resolveTheme(theme: BaseTheme, _level = 0) {
  const surface = changeLightnessBy(colord(theme.surfaceColor), _level * 2)

  const isDarkTheme = surface.isDark()

  const text = colord(theme.surfaceTextColor)

  const accent = colord(theme.accentColor)
  const accentText = colord(theme.accentTextColor)
  const accentHover = changeLightnessBy(colord(accent), 5)
  const accentLight = accent.lighten(0.1)
  const accentDark = accent.darken(0.1)

  const border = isDarkTheme ? surface.lighten(0.075) : surface.darken(0.075)
  const action = surface.lighten(0.05)
  const actionHover = changeLightnessBy(action, 5)
  const input = isDarkTheme ? colord('#000').mix(surface, 0.5) : colord('#fff').mix(surface, 0.5)
  const inputFocus = input.mix(accent, 0.075)
  const surfaceHover = surface.lighten(0.05)
  const surfaceLight = surface.lighten(0.1)
  const surfaceDark = surface.darken(0.1)

  return {
    surface,
    border,
    text,
    action,
    input,
    'action-hover': actionHover,
    'text-alt-1': isDarkTheme ? text.darken(0.2) : text.lighten(0.2),
    'text-alt-2': isDarkTheme ? text.darken(0.3) : text.lighten(0.3),
    'text-alt-3': isDarkTheme ? text.darken(0.4) : text.lighten(0.4),
    'surface-hover': surfaceHover,
    'surface-light': surfaceLight,
    'surface-dark': surfaceDark,
    'input-focus': inputFocus,
    'accent': accent,
    'accent-text': accentText,
    'accent-hover': accentHover,
    'accent-light': accentLight,
    'accent-dark': accentDark,
  }
}
