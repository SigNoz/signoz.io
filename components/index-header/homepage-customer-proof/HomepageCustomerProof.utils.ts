import { carouselCycleWidth } from './HomepageCustomerProof.constants'
import type { LogoSpec } from './HomepageCustomerProof.types'

export function normalizeCarouselOffset(offset: number) {
  const remainder = offset % carouselCycleWidth
  return remainder > 0 ? remainder - carouselCycleWidth : remainder
}

export function getCarouselTranslateX(element: HTMLDivElement | null) {
  if (!element) return 0

  const transform = window.getComputedStyle(element).transform
  if (!transform || transform === 'none') return 0

  const matrix = transform.match(/^matrix(3d)?\((.+)\)$/)
  if (!matrix) return 0

  const values = matrix[2].split(',').map(Number)
  const translateX = matrix[1] ? values[12] : values[4]
  return Number.isFinite(translateX) ? translateX : 0
}

export function isMigrationLabel(theme: string) {
  return /\bmigrat(?:ed|ion)\b/i.test(theme) || /^replaced\b/i.test(theme)
}

export function getVisibleAttribution(attribution: string, logo?: LogoSpec) {
  if (!logo) return attribution

  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '')
  const parts = attribution.split(' · ').map((part) => part.trim())
  const companyName = normalize(logo.name)
  const finalPart = normalize(parts.at(-1) ?? '')

  if (finalPart === companyName) {
    return parts.length === 1 ? null : parts.slice(0, -1).join(' · ')
  }

  if (parts.length > 1 && (finalPart.includes(companyName) || companyName.includes(finalPart))) {
    return parts.slice(0, -1).join(' · ')
  }

  return attribution
}
