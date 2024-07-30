import type { Preset } from '@unocss/core'

interface Options {
  prefix: string
}

const defaultOptions: Options = {
  prefix: 'artivue',
}

const specifierUtilMap = {
  'bg': 'bg',
  'text': 'text',
  'text-alt-1': 'text',
  'text-alt-2': 'text',
  'text-alt-3': 'text',
  'border': 'border',
  'action': 'bg',
  'action-hover': 'bg',
  'hover': 'bg',
  'light': 'bg',
  'dark': 'bg',
  'light-hover': 'bg',
  'dark-hover': 'bg',
}

const typeResolver = {
  surface: 'surface',
  accent: 'accent',
  s: 'surface',
  a: 'accent',
}

const buttonAliases = [
  'button',
  'btn',
  'b',
]

export function presetArtivue(_options: Partial<Options> = {}): Preset {
  const options = { ...defaultOptions, ..._options }

  const prefix = options.prefix ?? defaultOptions.prefix

  const colors = Object.keys(typeResolver).reduce((acc, key) => {
    const value = typeResolver[key as keyof typeof typeResolver]

    return {
      ...acc,
      [`${prefix}-${key}`]: `rgba(var(--${prefix}-${value}-bg))`,
      [`${prefix}-${key}-bg`]: `rgba(var(--${prefix}-${value}-bg))`,

      [`${prefix}-${key}-text`]: `rgba(var(--${prefix}-${value}-text))`,
      [`${prefix}-${key}-text-alt`]: `rgba(var(--${prefix}-${value}-text-alt))`,
      [`${prefix}-${key}-text-alt-1`]: `rgba(var(--${prefix}-${value}-text-alt-1))`,
      [`${prefix}-${key}-text-alt-2`]: `rgba(var(--${prefix}-${value}-text-alt-2))`,
      [`${prefix}-${key}-text-alt-3`]: `rgba(var(--${prefix}-${value}-text-alt-3))`,

      [`${prefix}-${key}-border`]: `rgba(var(--${prefix}-${value}-border))`,

      [`${prefix}-${key}-action`]: `rgba(var(--${prefix}-${value}-action))`,
      [`${prefix}-${key}-action-hover`]: `rgba(var(--${prefix}-${value}-action-hover))`,

      [`${prefix}-${key}-hover`]: `rgba(var(--${prefix}-${value}-hover))`,

      [`${prefix}-${key}-light`]: `rgba(var(--${prefix}-${value}-light))`,
      [`${prefix}-${key}-light-hover`]: `rgba(var(--${prefix}-${value}-light-hover))`,
      [`${prefix}-${key}-dark`]: `rgba(var(--${prefix}-${value}-dark))`,
      [`${prefix}-${key}-dark-hover`]: `rgba(var(--${prefix}-${value}-dark-hover))`,
    }
  }, {
    [`${prefix}-input-bg`]: `rgba(var(--${prefix}-input-bg))`,
    [`${prefix}-input-focus`]: `rgba(var(--${prefix}-input-focus))`,
    [`${prefix}-i-bg`]: `rgba(var(--${prefix}-input-bg))`,
    [`${prefix}-i-focus`]: `rgba(var(--${prefix}-input-focus))`,
  })

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
      // Base utilities

      /**
       * Assign background / text quick shortcut
       *
       * @example "artivue-surface" -> "bg-artivue-surface-bg text-artivue-surface-text"
       */
      [
        new RegExp(`^${prefix}-(surface|accent|s|a)`),
        ([, type]) => {
          return `${prefix}-${type}-bg ${prefix}-${type}-text`
        },
      ],

      /**
       * Base utility
       *
       * @example "artivue-surface-bg" -> "bg-artivue-surface-bg"
       * @example "artivue-accent-text/10" -> "text-artivue-accent-text/10"
       */
      [
        new RegExp(`^${prefix}-(surface|accent|s|a)-(.*?)(/(\\d+))?$`),
        ([, type, specifier, alphaSuffix]) => {
          const utilityFallback = specifierUtilMap[specifier as keyof typeof specifierUtilMap]

          if (!utilityFallback || !specifier)
            return

          return `${utilityFallback}-${prefix}-${type}-${specifier}${alphaSuffix ?? ''}`
        },
      ],

      // Element utilities

      /**
       * Input
       *
       * @example "artivue-input" -> "bg-artivue-input-bg border-artivue-surface-border text-artivue-surface-text focus:bg-artivue-input-focus focus:text-artivue-surface-text-alt focus:border-artivue-accent-border"
       * @example "artivue-input-within" -> "bg-artivue-input-bg border-artivue-surface-border text-artivue-surface-text focus-within:bg-artivue-input-focus focus-within:text-artivue-surface-text-alt focus-within:border-artivue-accent-border"
       */
      [
        new RegExp(`^${prefix}-(input|i)(-within)?$`),
        ([, , within = '']) => `
          bg-${prefix}-input-bg
          border
          border-${prefix}-surface-border
          text-${prefix}-surface-text
          focus${within}:bg-${prefix}-input-focus
          placeholder:text-${prefix}-surface-text-alt-2
          focus${within}:border-${prefix}-accent-border
          rounded-md
        `,
      ],

      /**
       * Button
       */
      ...buttonAliases.map((alias): [string, string] => [`${prefix}-${alias}`, [
        `border`,
        `border-solid`,
        `disabled:opacity-50`,
        `disabled:cursor-not-allowed`,
        `transition-property-[background-color,border-color,color]`,
        `duration-300`,
        `rounded-md`,
        `px-2`,
      ].join(' ')]),

      ...buttonAliases.map((alias): [string, string] => [`${prefix}-${alias}-solid`, [
        `${prefix}-button`,
        `bg-[rgba(var(--${prefix}-btn-bg,var(--${prefix}-surface-action)))]`,
        `text-[rgba(var(--${prefix}-btn-text,var(--${prefix}-surface-text)))]`,
        `hover:bg-[rgba(var(--${prefix}-btn-bg-hover,var(--${prefix}-surface-action-hover)))]`,
        `border-[rgba(var(--${prefix}-btn-border,var(--${prefix}-surface-action)))]`,
      ].join(' ')]),
      ...buttonAliases.map((alias): [string, string] => [`${prefix}-${alias}-outline`, [
        `${prefix}-button bg-[rgba(var(--${prefix}-btn-bg-hover,var(--${prefix}-surface-action-hover)))]/0`,
        `text-[rgba(var(--${prefix}-btn-bg,var(--${prefix}-surface-text)))]`,
        `border-[rgba(var(--${prefix}-btn-bg,var(--${prefix}-surface-border)))]`,
        `hover:bg-[rgba(var(--${prefix}-btn-bg-hover,var(--${prefix}-surface-action-hover)))]/20`,
      ].join(' ')]),
      ...buttonAliases.map((alias): [string, string] => [`${prefix}-${alias}-text`, [
        `${prefix}-button bg-[rgba(var(--${prefix}-btn-bg-hover,var(--${prefix}-surface-action-hover)))]/0`,
        `text-[rgba(var(--${prefix}-btn-bg,var(--${prefix}-surface-text)))]`,
        'border-transparent',
        `hover:bg-[rgba(var(--${prefix}-btn-bg-hover,var(--${prefix}-surface-action-hover)))]/20`,
      ].join(' ')]),

      ...buttonAliases.map((alias): [string, string] => [`${prefix}-${alias}-accent`, [
        `var-btn-bg-[var(--${prefix}-accent-bg)]`,
        `var-btn-text-[var(--${prefix}-accent-text)]`,
        `var-btn-bg-hover-[var(--${prefix}-accent-hover)]`,
        `var-btn-border-[var(--${prefix}-accent-bg)]`,
      ].join(' ')]),
    ],

    theme: {
      colors,
    },
  }
}
