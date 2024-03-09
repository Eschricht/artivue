export interface BaseTheme {
  surfaceColor: string
  surfaceTextColor: string
  accentColor: string
  accentTextColor: string
}

const light = {
  accentColor: '#4051be',
  accentTextColor: '#ffffff',
  surfaceColor: '#d8d8d8',
  surfaceTextColor: '#000000',
}

export const themes = {
  DEFAULT: light,
  light,
  dark: {
    accentColor: '#4051be',
    accentTextColor: '#ffffff',
    surfaceColor: '#191A23',
    surfaceTextColor: '#ffffff',
  },
  dawn: {
    accentColor: '#a84375',
    accentTextColor: '#ffffff',
    surfaceColor: '#2a222d',
    surfaceTextColor: '#ffffff',
  },
  midnight: {
    accentColor: '#a84375',
    accentTextColor: '#ffffff',
    surfaceColor: '#161616',
    surfaceTextColor: '#ffffff',
  },
  pale: {
    accentColor: '#0059ff',
    accentTextColor: '#ffffff',
    surfaceColor: '#292c3d',
    surfaceTextColor: '#ffffff',
  },
} as const satisfies Record<string, BaseTheme>
