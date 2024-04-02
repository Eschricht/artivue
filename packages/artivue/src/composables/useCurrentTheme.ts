import { useArtivue } from './useArtivue'

export function useCurrentTheme() {
  const { baseThemeData: _, ...currentTheme } = useArtivue()

  return currentTheme
}
