import { definePreset } from '@unocss/core'
import { parseColor } from '@unocss/preset-mini'
import { hexToHsl } from './utils'

function opacityToDecimal(opacity: string | number) {
  return Number.parseFloat(opacity.toString()) / 100
}

const propertyMap = {
  'background-color': ['bg'],
  'color': ['text', 'color'],
  'border-color': ['border'],
}

const hslHelpers: {
  [key: string]: {
    range: [number, number]
    formatter: (value: number) => string
  } | undefined
} = {
  hue: {
    range: [0, 360],
    formatter: value => `${value}deg`,
  },
  saturation: {
    range: [0, 100],
    formatter: value => `${value}%`,
  },
  lightness: {
    range: [0, 100],
    formatter: value => `${value}%`,
  },
  opacity: {
    range: [0, 100],
    formatter: value => `${opacityToDecimal(value)}`,
  },
}

export const presetHsl = definePreset(() => ({
  name: 'preset-hsl',
  rules: [
    [/^(bg|text|color|border)-hsl-(.+)$/, ([, m, r], { theme }) => {
      const property = Object.keys(propertyMap).find(p => propertyMap[p as keyof typeof propertyMap].includes(m)) as string
      const parsedColor = parseColor(r, theme)
      const color = parsedColor?.color ?? r
      const opacity = parsedColor?.opacity || '100'

      if (!color)
        return undefined

      const colorAsHsl = hexToHsl(color)

      if (!colorAsHsl)
        return undefined

      return {
        [`--un-hsl-${m}-alpha-base`]: opacityToDecimal(opacity),
        [`--un-hsl-${m}-hue-base`]: `${colorAsHsl[0]}deg`,
        [`--un-hsl-${m}-saturation-base`]: `${colorAsHsl[1]}%`,
        [`--un-hsl-${m}-lightness-base`]: `${colorAsHsl[2]}%`,
        [`--un-hsl-${m}-alpha`]: opacityToDecimal(opacity),
        [`--un-hsl-${m}-hue`]: `${colorAsHsl[0]}deg`,
        [`--un-hsl-${m}-saturation`]: `${colorAsHsl[1]}%`,
        [`--un-hsl-${m}-lightness`]: `${colorAsHsl[2]}%`,
        [property]: `hsl(var(--un-hsl-${m}-hue, 0) var(--un-hsl-${m}-saturation, 0) var(--un-hsl-${m}-lightness, 0)  / var(--un-hsl-${m}-alpha, 1))`,
      }
    }],
    [/^(bg|text|color|border)-hsl$/, ([, m]) => {
      const property = Object.keys(propertyMap).find(p => propertyMap[p as keyof typeof propertyMap].includes(m)) as string

      return {
        [property]: `hsl(var(--un-hsl-${m}-hue, 0) var(--un-hsl-${m}-saturation, 0) var(--un-hsl-${m}-lightness, 0) / var(--un-hsl-${m}-alpha, 1))`,
      }
    }],
    [/^(bg|text|color|border)-hsl-(hue|saturation|lightness|opacity|alpha)-(\d+)$/, ([, m, hsl, level]) => {
      const hslHelper = hslHelpers[hsl]
      const levelParsed = Number.parseInt(level)
      const property = hsl === 'opacity' ? 'alpha' : hsl

      if (hslHelper && levelParsed >= hslHelper.range[0] && levelParsed <= hslHelper.range[1]) {
        return {
          [`--un-hsl-${m}-${property}`]: hslHelper.formatter(levelParsed),
        }
      }

      return undefined
    }],
    [/^(bg|text|color|border)-hsl-darken-(\d+)$/, ([, m, level]) => {
      const levelParsed = Number.parseInt(level)

      if (levelParsed >= 0 && levelParsed <= 100) {
        return {
          [`--un-hsl-${m}-lightness`]: `calc(var(--un-hsl-${m}-lightness-base) - ${levelParsed}%)`,
        }
      }

      return undefined
    }],
    [/^(bg|text|color|border)-hsl-lighten-(\d+)$/, ([, m, level]) => {
      const levelParsed = Number.parseInt(level)

      if (levelParsed >= 0 && levelParsed <= 100) {
        return {
          [`--un-hsl-${m}-lightness`]: `calc(var(--un-hsl-${m}-lightness-base) + ${levelParsed}%)`,
        }
      }

      return undefined
    }],
    [/^(bg|text|color|border)-hsl-spin-(\d+)$/, ([, m, level]) => {
      const levelParsed = Number.parseInt(level)

      if (levelParsed >= 0 && levelParsed <= 360) {
        return {
          [`--un-hsl-${m}-hue`]: `calc(var(--un-hsl-${m}-hue-base) + ${levelParsed}deg)`,
        }
      }

      return undefined
    }],
    [/^(bg|text|color|border)-hsl-desaturate-(\d+)$/, ([, m, level]) => {
      const levelParsed = Number.parseInt(level)

      if (levelParsed >= 0 && levelParsed <= 100) {
        return {
          [`--un-hsl-${m}-saturation`]: `calc(var(--un-hsl-${m}-saturation-base) - ${levelParsed}%)`,
        }
      }

      return undefined
    }],
    [/^(bg|text|color|border)-hsl-saturate-(\d+)$/, ([, m, level]) => {
      const levelParsed = Number.parseInt(level)

      if (levelParsed >= 0 && levelParsed <= 100) {
        return {
          [`--un-hsl-${m}-saturation`]: `calc(var(--un-hsl-${m}-saturation-base) + ${levelParsed}%)`,
        }
      }

      return undefined
    }],
  ],
}))

export default presetHsl
