import type { RGB } from '../_types'
import { normalizeHex } from './normalizeHex'

// Convert hex to RGB
export function hexToRgb(hex: string): RGB | undefined {
  const normalizedHex = normalizeHex(hex)

  if (!normalizedHex)
    return undefined

  const r = Number.parseInt(normalizedHex.slice(0, 2), 16)
  const g = Number.parseInt(normalizedHex.slice(2, 4), 16)
  const b = Number.parseInt(normalizedHex.slice(4, 6), 16)

  return [r, g, b]
}
