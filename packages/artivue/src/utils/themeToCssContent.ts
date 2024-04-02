import type { GeneratedTheme, Theme } from '../types'

function themeToVars(theme: GeneratedTheme[keyof GeneratedTheme], themeKey: string, prefix = '') {
  const vars: Record<string, string> = Object.keys(theme).reduce((acc, key) => {
    const varKey = [prefix, themeKey, key].filter(Boolean).join('-')
    const value = theme[key as keyof typeof theme]

    if (value) {
      const { r, g, b } = value.toRgb()

      return {
        ...acc,
        [`--${varKey}`]: `${r}, ${g}, ${b}`,
      }
    }

    return acc
  }, {
    [`--${prefix}-${themeKey}-text-alt`]: `var(--${prefix}-${themeKey}-text-alt-2)`,
  } as Record<string, string>)

  return vars
}

export function themesToVars(themes: GeneratedTheme, prefix = '') {
  const vars = Object.keys(themes).reduce<Record<string, string>>((acc, key) => {
    return {
      ...acc,
      ...themeToVars(themes[key as keyof Theme], key, prefix),
    }
  }, {})

  return vars
}

export function themeToCssContent(varsObj: Record<string, string>, selector = ':root') {
  const vars = Object.keys(varsObj).map((key) => {
    return `${key}: ${varsObj[key]};`
  }).join('\n')

  const css = `${selector} {
  ${vars}
}`

  return css.replace(/\s+/g, '')
}
