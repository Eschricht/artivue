import { useArtivue } from './useArtivue'

export function useBaseTheme() {
  const {
    baseThemeData: {
      theme,
      setBaseTheme,
      isDark,
      generatedTheme,
    },
  } = useArtivue()

  return {
    theme,
    setBaseTheme,
    isDark,
    generatedTheme,
  }
}
