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
        [`--un-${m}-opacity`]: opacityToDecimal(opacity),
        [`--un-${m}-hue`]: `${colorAsHsl[0]}deg`,
        [`--un-${m}-saturation`]: `${colorAsHsl[1]}%`,
        [`--un-${m}-lightness`]: `${colorAsHsl[2]}%`,
        [property]: `hsl(var(--un-${m}-hue, 0) var(--un-${m}-saturation, 0) var(--un-${m}-lightness, 0) \/ var(--un-${m}-opacity, 1))`,
      }
    }],
    [/^(bg|text|color|border)-hsl$/, ([, m]) => {
      const property = Object.keys(propertyMap).find(p => propertyMap[p as keyof typeof propertyMap].includes(m)) as string

      return {
        [property]: `hsl(var(--un-${m}-hue, 0) var(--un-${m}-saturation, 0) var(--un-${m}-lightness, 0) \/ var(--un-${m}-opacity, 1))`,
      }
    }],
    [/^(bg|text|color|border)-hsl-(hue|saturation|lightness|opacity)-(\d+)$/, ([, m, hsl, level]) => {
      const hslHelper = hslHelpers[hsl]
      const levelParsed = Number.parseInt(level)
      const property = hsl === 'alpha' ? 'opacity' : hsl

      if (hslHelper && levelParsed >= hslHelper.range[0] && levelParsed <= hslHelper.range[1]) {
        return {
          [`--un-${m}-${property}`]: hslHelper.formatter(levelParsed),
        }
      }

      return undefined
    }],
  ],
}))

export default presetHsl
