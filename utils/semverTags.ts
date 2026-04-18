const SEMVER_TAG_RE = /^v(\d+)\.(\d+)\.(\d+)$/

export type SemverParts = [number, number, number]

export function parseSemverTag(tag: string): SemverParts | null {
  const m = SEMVER_TAG_RE.exec(tag)
  if (!m) return null
  return [Number(m[1]), Number(m[2]), Number(m[3])]
}

export function compareSemverParts(a: SemverParts, b: SemverParts): number {
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) return a[i] - b[i]
  }
  return 0
}

export function compareSemverTags(a: string, b: string): number {
  const pa = parseSemverTag(a)
  const pb = parseSemverTag(b)
  if (pa && pb) return compareSemverParts(pa, pb)
  if (pa && !pb) return -1
  if (!pa && pb) return 1
  return a.localeCompare(b)
}
