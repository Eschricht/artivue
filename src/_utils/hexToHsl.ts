import type { HSL } from '../_types'
import { hexToRgb } from './hexToRgb'
import { rgbToHsl } from './rgbToHsl'

// Convert hex to HSL
export function hexToHsl(hex: string): HSL | undefined {
  const rgb = hexToRgb(hex)

  if (!rgb)
    return undefined

  return rgbToHsl(...rgb)
}
