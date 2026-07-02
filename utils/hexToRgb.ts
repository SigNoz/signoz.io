export type RgbUnitTuple = [number, number, number]

const DEFAULT_RGB_UNIT: RgbUnitTuple = [1, 1, 1]

export function hexToRgbUnit(hex: string, fallback: RgbUnitTuple = DEFAULT_RGB_UNIT): RgbUnitTuple {
  const normalized = hex.replace('#', '').padEnd(6, '0').slice(0, 6)

  if (!/^[\da-f]{6}$/i.test(normalized)) {
    return fallback
  }

  return [
    parseInt(normalized.slice(0, 2), 16) / 255,
    parseInt(normalized.slice(2, 4), 16) / 255,
    parseInt(normalized.slice(4, 6), 16) / 255,
  ]
}

export function hexToRgbFloat32(hex: string, fallback?: RgbUnitTuple) {
  return new Float32Array(hexToRgbUnit(hex, fallback))
}
