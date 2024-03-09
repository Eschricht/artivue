import type { Preset } from '@unocss/core'
import type { Theme } from '@unocss/preset-mini'

interface Options {
  // TODO
  prefix: string
}

const defaultOptions: Options = {
  prefix: 'artivue',
}

const specifierUtilMap: Record<string, string | undefined> = {
  'text-alt': 'text-',
  'surface': 'bg-',
  'border': 'border-',
  'text': 'text-',
  'action': 'bg-',
  'action-hover': 'hover:bg-',
  'input': 'bg-',
  'text-alt-1': 'text-',
  'text-alt-2': 'text-',
  'text-alt-3': 'text-',
  'surface-hover': 'hover:bg-',
  'surface-light': 'light:bg-',
  'surface-dark': 'dark:bg-',
  'input-focus': 'bg-',
  'accent': 'bg-',
  'accent-text': 'text-',
  'accent-hover': 'bg-',
  'accent-light': 'bg-',
  'accent-dark': 'bg-',
}

export function presetArtivue(_options: Partial<Options> = {}): Preset<Theme> {
  const options = { ...defaultOptions, ..._options }

  const prefix = options.prefix ?? defaultOptions.prefix

  const baseUtilityRegexString = `^((bg|text|border|shadow|ring|outline)-)?${prefix}-(.*?)-var(\/(\d+))?$`
  const baseUtilityRegex = new RegExp(baseUtilityRegexString)

  return {
    name: 'unocss-preset-theme-maker',
    rules: [
      [/^var-(.*?)-\[(.*?)\]$/, ([, name, value]) => {
        return {
          [`--${prefix}-${name}`]: `${value};`,
        }
      }],
    ],
    shortcuts: [
      // Base utility
      [baseUtilityRegex, ([, utility,, specifier, alpha]) => {
        const utilityFallback = specifierUtilMap[specifier as keyof typeof specifierUtilMap]

        if (!utilityFallback)
          return

        const result = `${utility || utilityFallback}[rgba(var(--${prefix}-${specifier}))]${alpha || ''}`

        return result
      }],

      // UI Shortcuts
      [`${prefix}-button`, `px-1em h-2.5em rounded-md text-center border inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed ${prefix}-border-var transition-property-[background-color,border-color,color] duration-300`],

      [`${prefix}-button-solid`, [
        `${prefix}-button bg-[rgba(var(--${prefix}-btn-bg,var(--${prefix}-action)))]`,
        `text-[rgba(var(--${prefix}-btn-text,var(--${prefix}-text)))]`,
        `hover:bg-[rgba(var(--${prefix}-btn-bg-hover,var(--${prefix}-action-hover)))]`,
        `border-[rgba(var(--${prefix}-btn-border,var(--${prefix}-action)))]`,
      ].join(' ')],
      [`${prefix}-button-outline`, [
        `${prefix}-button bg-[rgba(var(--${prefix}-btn-bg-hover,var(--${prefix}-action-hover)))]/0`,
        `text-[rgba(var(--${prefix}-btn-bg,var(--${prefix}-text)))]`,
        `border-[rgba(var(--${prefix}-btn-bg,var(--${prefix}-border)))]`,
        `hover:bg-[rgba(var(--${prefix}-btn-bg-hover,var(--${prefix}-action-hover)))]/20`,
      ].join(' ')],
      [`${prefix}-button-text`, [
        `${prefix}-button bg-[rgba(var(--${prefix}-btn-bg-hover,var(--${prefix}-action-hover)))]/0`,
        `text-[rgba(var(--${prefix}-btn-bg,var(--${prefix}-text)))]`,
        'border-transparent',
        `hover:bg-[rgba(var(--${prefix}-btn-bg-hover,var(--${prefix}-action-hover)))]/20`,
      ].join(' ')],

      [`${prefix}-button-accent`, [
        `var-btn-bg-[var(--${prefix}-accent)]`,
        `var-btn-text-[var(--${prefix}-accent-text)]`,
        `var-btn-bg-hover-[var(--${prefix}-accent-hover)]`,
        `var-btn-border-[var(--${prefix}-accent)]`,
      ].join(' ')],

      // Card
      [`${prefix}-card`, `${prefix}-surface-var border ${prefix}-border-var`],

      // Input
      [`${prefix}-input-base`, `w-64 ${prefix}-border-var rounded-md inline-flex border outline-none min-h-2.5em focus:border-${prefix}-accent-var focus-within:border-${prefix}-accent-var transition-colors duration-300`],

      [`${prefix}-input`, `${prefix}-input-base ${prefix}-input-var focus:${prefix}-input-focus-var focus-within:${prefix}-input-focus-var`],
    ],

    theme: {
      colors: {
        [`${prefix}-surface`]: `rgba(var(--${prefix}-surface))`,
        [`${prefix}-surface-hover`]: `rgba(var(--${prefix}-surface-hover))`,
        [`${prefix}-surface-light`]: `rgba(var(--${prefix}-surface-light))`,
        [`${prefix}-surface-dark`]: `rgba(var(--${prefix}-surface-dark))`,
        [`${prefix}-text`]: `rgba(var(--${prefix}-text))`,
        [`${prefix}-text-alt`]: `rgba(var(--${prefix}-text-alt))`,
        [`${prefix}-text-alt-1`]: `rgba(var(--${prefix}-text-alt-1))`,
        [`${prefix}-text-alt-2`]: `rgba(var(--${prefix}-text-alt-2))`,
        [`${prefix}-text-alt-3`]: `rgba(var(--${prefix}-text-alt-3))`,
        [`${prefix}-action`]: `rgba(var(--${prefix}-action))`,
        [`${prefix}-action-hover`]: `rgba(var(--${prefix}-action-hover))`,
        [`${prefix}-input`]: `rgba(var(--${prefix}-input))`,
        [`${prefix}-input-focus`]: `rgba(var(--${prefix}-input-focus))`,
        [`${prefix}-accent`]: `rgba(var(--${prefix}-accent))`,
        [`${prefix}-accent-text`]: `rgba(var(--${prefix}-accent-text))`,
        [`${prefix}-accent-hover`]: `rgba(var(--${prefix}-accent-hover))`,
        [`${prefix}-accent-light`]: `rgba(var(--${prefix}-accent-light))`,
        [`${prefix}-accent-dark`]: `rgba(var(--${prefix}-accent-dark))`,
        [`${prefix}-border`]: `rgba(var(--${prefix}-border))`,
      },
    },
  }
}
