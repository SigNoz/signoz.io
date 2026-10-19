export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export const smooth = (value: number, a: number, b: number) => {
  const t = clamp((value - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}

/** Overshoots slightly past 1 so things pop into place instead of easing in. */
export const pop = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t + 0.35 * Math.sin(Math.PI * t))

/** Deterministic PRNG so confetti lands identically on every render and resize. */
export function createRng(seed: number) {
  let state = seed
  return () => {
    state |= 0
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
