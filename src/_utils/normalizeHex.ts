import { verifyHex } from './verifyHex'

// Utility function to normalize hex string to 6 characters
export function normalizeHex(hex: string) {
  hex = hex.replace(/^#/, '')

  if (hex.length === 3)
    hex = hex.split('').map(char => char + char).join('')

  return verifyHex(`#${hex}`) ? hex : undefined
}
