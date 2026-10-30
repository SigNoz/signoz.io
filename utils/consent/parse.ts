import { getConsentProvider } from './provider'

export const CONSENT_CATEGORIES = [
  'functional',
  'analytics',
  'performance',
  'advertisement',
] as const

export type ConsentCategory = (typeof CONSENT_CATEGORIES)[number]

export type ConsentStatus = 'undecided' | 'decided'

export type ConsentSnapshot = {
  status: ConsentStatus
  categories: Record<ConsentCategory, boolean>
}

export const isConsentManagerEnabled = (): boolean => getConsentProvider() !== null

export const ALL_DENIED: Record<ConsentCategory, boolean> = {
  functional: false,
  analytics: false,
  performance: false,
  advertisement: false,
}

const ALL_GRANTED: Record<ConsentCategory, boolean> = {
  functional: true,
  analytics: true,
  performance: true,
  advertisement: true,
}

export const UNDECIDED_CONSENT: ConsentSnapshot = { status: 'undecided', categories: ALL_DENIED }

// Do Not Track / Global Privacy Control: treated as a refusal until the visitor makes an
// explicit choice in the banner.
export const BROWSER_OPT_OUT_CONSENT: ConsentSnapshot = {
  status: 'decided',
  categories: ALL_DENIED,
}

// Without a consent manager configured (local dev, previews) the site behaves as before.
export const UNMANAGED_CONSENT: ConsentSnapshot = { status: 'decided', categories: ALL_GRANTED }

export const decidedConsent = (
  granted: Partial<Record<ConsentCategory, boolean>>
): ConsentSnapshot => ({
  status: 'decided',
  categories: CONSENT_CATEGORIES.reduce(
    (acc, category) => {
      acc[category] = granted[category] === true
      return acc
    },
    { ...ALL_DENIED }
  ),
})
