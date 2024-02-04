type HSL = [h: number, s: number, l: number]

type RGB = [r: number, g: number, b: number]

function verifyHex(hex: string) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)
}

// Utility function to normalize hex string to 6 characters
export function normalizeHex(hex: string) {
  hex = hex.replace(/^#/, '')

  if (hex.length === 3)
    hex = hex.split('').map(char => char + char).join('')

  return verifyHex(`#${hex}`) ? hex : undefined
}

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

// Convert RGB to HSL
export function rgbToHsl(...args: RGB): HSL {
  let [r, g, b] = args

  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  }
  else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }

  return [h * 360, s * 100, l * 100]
}

// Convert hex to HSL
export function hexToHsl(hex: string): HSL | undefined {
  const rgb = hexToRgb(hex)

  if (!rgb)
    return undefined

  return rgbToHsl(...rgb)
}
