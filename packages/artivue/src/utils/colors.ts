import type { Colord } from 'colord'
import { colord } from 'colord'

export function changeLightnessBy(color: Colord, level: number) {
  const { l, ...rest } = color.toHsl()

  return colord({ ...rest, l: l + level })
}
