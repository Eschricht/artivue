export interface BaseTheme {
  surfaceColor: string
  surfaceTextColor: string
  accentColor: string
  accentTextColor: string
}

const light = {
  accentColor: '#5c72ff',
  accentTextColor: '#ffffff',
  surfaceColor: '#d8d8d8',
  surfaceTextColor: '#000000',
}

export const themes = {
  DEFAULT: light,
  light,
  dark: {
    accentColor: '#2b6be3',
    accentTextColor: '#ffffff',
    surfaceColor: '#191A23',
    surfaceTextColor: '#ffffff',
  },
  dawn: {
    accentColor: '#d1478c',
    accentTextColor: '#ffffff',
    surfaceColor: '#2a222d',
    surfaceTextColor: '#ffffff',
  },
  midnight: {
    accentColor: '#9e4cf0',
    accentTextColor: '#ffffff',
    surfaceColor: '#161616',
    surfaceTextColor: '#ffffff',
  },
  pale: {
    accentColor: '#6e80f2',
    accentTextColor: '#ffffff',
    surfaceColor: '#292c3d',
    surfaceTextColor: '#ffffff',
  },
} as const satisfies Record<string, BaseTheme>
