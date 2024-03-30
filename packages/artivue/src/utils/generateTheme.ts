import { colord, extend } from 'colord'
import mixPlugin from 'colord/plugins/mix'
import type { Theme, ThemeProperty } from '../types'
import { changeLightnessBy } from './colors'

extend([mixPlugin])

function generateFullThemeProperty(themeProperty: ThemeProperty, multiplier = 0) {
  const {
    background,
  } = {
    background: changeLightnessBy(colord(themeProperty.background), multiplier * 2),
  }

  const isDark = background.isDark()
  // TODO: Check if text color should be modified
  const text = colord(themeProperty.text)
  const action = isDark ? background.lighten(0.1) : background.darken(0.1)
  const light = background.lighten(0.1)
  const dark = background.darken(0.1)

  return {
    'bg': background,
    'text': text,
    'text-alt-1': isDark ? text.darken(0.2) : text.lighten(0.2),
    'text-alt-2': isDark ? text.darken(0.4) : text.lighten(0.4),
    'text-alt-3': isDark ? text.darken(0.6) : text.lighten(0.6),
    'border': isDark ? background.lighten(0.075) : background.darken(0.075),
    'action': action,
    'action-hover': isDark ? action.lighten(0.05) : action.darken(0.05),
    'hover': isDark ? background.lighten(0.05) : background.darken(0.05),
    'light': light,
    'dark': dark,
    'light-hover': light.lighten(0.1),
    'dark-hover': dark.darken(0.1),
  }
}

export function generateFullTheme(theme: Theme, multiplier = 0) {
  const result = Object.fromEntries(
    Object.entries(theme).map(([key, value]) => [key as keyof Theme, generateFullThemeProperty(value, key === 'accent' ? 0 : multiplier)]),
  ) as {
    [K in keyof Theme]: ReturnType<typeof generateFullThemeProperty>
  }

  const input = result.surface.bg.isDark() ? colord('#000').mix(result.surface.bg, 0.5) : colord('#fff').mix(result.surface.bg, 0.5)

  const final = {
    ...result,
    input: {
      bg: input,
      focus: input.mix(result.accent.bg, 0.075),
    },
  }

  return final
}
