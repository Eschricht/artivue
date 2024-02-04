import { Colord } from 'colord'
import type { ColordTheme } from './resolveTheme'

export function themeToVars(theme: ColordTheme, prefix = '') {
  const vars: Record<string, string> = Object.keys(theme).reduce((acc, key) => {
    const value = theme[key as keyof ColordTheme]

    if (value instanceof Colord) {
      const { r, g, b } = value.toRgb()

      return {
        ...acc,
        [`-${prefix}-${key}`]: `${r}, ${g}, ${b}`,
      }
    }
    else if (value) {
      return {
        ...acc,
        ...themeToVars(value, `${prefix}-${key}`),
      }
    }

    return acc
  }, {
    [`-${prefix}-text-alt`]: `var(-${prefix}-text-alt-2)`,
  } as Record<string, string>)

  return vars
}
