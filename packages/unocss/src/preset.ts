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

export function presetArtivue(_options: Partial<Options> = {}): Preset {
  const options = { ...defaultOptions, ..._options }

  const prefix = options.prefix ?? defaultOptions.prefix

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
          const resolvedType = typeResolver[type as keyof typeof typeResolver]

          return `${prefix}-${resolvedType}-bg ${prefix}-${type}-text`
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
          const resolvedType = typeResolver[type as keyof typeof typeResolver]

          if (!utilityFallback || !specifier)
            return

          return `${utilityFallback}-${prefix}-${resolvedType}-${specifier}${alphaSuffix ?? ''}`
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
        new RegExp(`^${prefix}-input(-within)?$`),
        ([, within = '']) => `
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
      [`${prefix}-button`, [
        `border`,
        `border-solid`,
        `disabled:opacity-50`,
        `disabled:cursor-not-allowed`,
        `transition-property-[background-color,border-color,color]`,
        `duration-300`,
        `rounded-md`,
        `px-2`,
      ].join(' ')],

      [`${prefix}-button-solid`, [
        `${prefix}-button`,
        `bg-[rgba(var(--${prefix}-btn-bg,var(--${prefix}-surface-action)))]`,
        `text-[rgba(var(--${prefix}-btn-text,var(--${prefix}-surface-text)))]`,
        `hover:bg-[rgba(var(--${prefix}-btn-bg-hover,var(--${prefix}-surface-action-hover)))]`,
        `border-[rgba(var(--${prefix}-btn-border,var(--${prefix}-surface-action)))]`,
      ].join(' ')],
      [`${prefix}-button-outline`, [
        `${prefix}-button bg-[rgba(var(--${prefix}-btn-bg-hover,var(--${prefix}-surface-action-hover)))]/0`,
        `text-[rgba(var(--${prefix}-btn-bg,var(--${prefix}-surface-text)))]`,
        `border-[rgba(var(--${prefix}-btn-bg,var(--${prefix}-surface-border)))]`,
        `hover:bg-[rgba(var(--${prefix}-btn-bg-hover,var(--${prefix}-surface-action-hover)))]/20`,
      ].join(' ')],
      [`${prefix}-button-text`, [
        `${prefix}-button bg-[rgba(var(--${prefix}-btn-bg-hover,var(--${prefix}-surface-action-hover)))]/0`,
        `text-[rgba(var(--${prefix}-btn-bg,var(--${prefix}-surface-text)))]`,
        'border-transparent',
        `hover:bg-[rgba(var(--${prefix}-btn-bg-hover,var(--${prefix}-surface-action-hover)))]/20`,
      ].join(' ')],

      [`${prefix}-button-accent`, [
        `var-btn-bg-[var(--${prefix}-accent-bg)]`,
        `var-btn-text-[var(--${prefix}-accent-text)]`,
        `var-btn-bg-hover-[var(--${prefix}-accent-hover)]`,
        `var-btn-border-[var(--${prefix}-accent-bg)]`,
      ].join(' ')],
    ],

    theme: {
      colors: {
        [`${prefix}-surface`]: `rgba(var(--${prefix}-surface-bg))`,
        [`${prefix}-surface-bg`]: `rgba(var(--${prefix}-surface-bg))`,

        [`${prefix}-surface-text`]: `rgba(var(--${prefix}-surface-text))`,
        [`${prefix}-surface-text-alt`]: `rgba(var(--${prefix}-surface-text-alt))`,
        [`${prefix}-surface-text-alt-1`]: `rgba(var(--${prefix}-surface-text-alt-1))`,
        [`${prefix}-surface-text-alt-2`]: `rgba(var(--${prefix}-surface-text-alt-2))`,
        [`${prefix}-surface-text-alt-3`]: `rgba(var(--${prefix}-surface-text-alt-3))`,

        [`${prefix}-surface-border`]: `rgba(var(--${prefix}-surface-border))`,

        [`${prefix}-surface-action`]: `rgba(var(--${prefix}-surface-action))`,
        [`${prefix}-surface-action-hover`]: `rgba(var(--${prefix}-surface-action-hover))`,

        [`${prefix}-surface-hover`]: `rgba(var(--${prefix}-surface-hover))`,

        [`${prefix}-surface-light`]: `rgba(var(--${prefix}-surface-light))`,
        [`${prefix}-surface-light-hover`]: `rgba(var(--${prefix}-surface-light-hover))`,
        [`${prefix}-surface-dark`]: `rgba(var(--${prefix}-surface-dark))`,
        [`${prefix}-surface-dark-hover`]: `rgba(var(--${prefix}-surface-dark-hover))`,

        [`${prefix}-accent`]: `rgba(var(--${prefix}-accent-bg))`,
        [`${prefix}-accent-bg`]: `rgba(var(--${prefix}-accent-bg))`,

        [`${prefix}-accent-text`]: `rgba(var(--${prefix}-accent-text))`,
        [`${prefix}-accent-text-alt`]: `rgba(var(--${prefix}-accent-text-alt))`,
        [`${prefix}-accent-text-alt-1`]: `rgba(var(--${prefix}-accent-text-alt-1))`,
        [`${prefix}-accent-text-alt-2`]: `rgba(var(--${prefix}-accent-text-alt-2))`,
        [`${prefix}-accent-text-alt-3`]: `rgba(var(--${prefix}-accent-text-alt-3))`,

        [`${prefix}-accent-border`]: `rgba(var(--${prefix}-accent-border))`,

        [`${prefix}-accent-action`]: `rgba(var(--${prefix}-accent-action))`,
        [`${prefix}-accent-action-hover`]: `rgba(var(--${prefix}-accent-action-hover))`,

        [`${prefix}-accent-hover`]: `rgba(var(--${prefix}-accent-hover))`,

        [`${prefix}-accent-light`]: `rgba(var(--${prefix}-accent-light))`,
        [`${prefix}-accent-light-hover`]: `rgba(var(--${prefix}-accent-light-hover))`,
        [`${prefix}-accent-dark`]: `rgba(var(--${prefix}-accent-dark))`,
        [`${prefix}-accent-dark-hover`]: `rgba(var(--${prefix}-accent-dark-hover))`,

        [`${prefix}-input-bg`]: `rgba(var(--${prefix}-input-bg))`,
        [`${prefix}-input-focus`]: `rgba(var(--${prefix}-input-focus))`,
      },
    },
  }
}
