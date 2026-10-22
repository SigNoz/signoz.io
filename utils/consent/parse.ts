export const CONSENT_COOKIE = 'cookieyes-consent'

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

export const isConsentManagerEnabled = (): boolean => Boolean(process.env.NEXT_PUBLIC_COOKIEYES_ID)

const ALL_DENIED: Record<ConsentCategory, boolean> = {
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

// Cookie value: consentid:<id>,consent:yes|no,action:yes|,necessary:yes,functional:no,...,lastRenewedDate:<ms>
export const hasExplicitChoice = (raw: string | null | undefined): boolean => {
  if (!raw) return false
  try {
    return /(^|,)action:yes(,|$)/.test(decodeURIComponent(raw))
  } catch {
    return /(^|,)action:yes(,|$)/.test(raw)
  }
}

export const parseConsentCookie = (raw: string | null | undefined): ConsentSnapshot => {
  if (!raw) return UNDECIDED_CONSENT

  let value = raw
  try {
    value = decodeURIComponent(raw)
  } catch {
    // keep raw value
  }

  const fields = new Map<string, string>()
  for (const pair of value.split(',')) {
    const separator = pair.indexOf(':')
    if (separator === -1) continue
    fields.set(pair.slice(0, separator).trim(), pair.slice(separator + 1).trim())
  }

  const categories = CONSENT_CATEGORIES.reduce(
    (acc, category) => {
      acc[category] = fields.get(category) === 'yes'
      return acc
    },
    { ...ALL_DENIED }
  )

  // Opt-in only: categories count only after an explicit choice (action:yes), never from
  // defaults the banner may pre-set.
  if (fields.get('action') !== 'yes') return UNDECIDED_CONSENT

  return { status: 'decided', categories }
}

export const consentFromCategoryList = (accepted: string[]): ConsentSnapshot => ({
  status: 'decided',
  categories: CONSENT_CATEGORIES.reduce(
    (acc, category) => {
      acc[category] = accepted.includes(category)
      return acc
    },
    { ...ALL_DENIED }
  ),
})
