import { useArtivue } from './useArtivue'

export function useCurrentTheme() {
  const { currentTheme } = useArtivue()

  return currentTheme
}
