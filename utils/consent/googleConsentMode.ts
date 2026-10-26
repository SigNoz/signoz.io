import { ConsentSnapshot, UNDECIDED_CONSENT } from './parse'

type ConsentState = 'granted' | 'denied'

export const googleConsentState = (snapshot: ConsentSnapshot): Record<string, ConsentState> => {
  const state = (granted: boolean): ConsentState => (granted ? 'granted' : 'denied')
  const { functional, analytics, advertisement } = snapshot.categories
  return {
    ad_storage: state(advertisement),
    ad_user_data: state(advertisement),
    ad_personalization: state(advertisement),
    analytics_storage: state(analytics),
    functionality_storage: state(functional),
    personalization_storage: state(functional),
    security_storage: 'granted',
  }
}

// gtag() must push the arguments object itself; GTM ignores consent commands pushed as arrays.
function gtag(...args: unknown[]): void
function gtag() {
  window.dataLayer = window.dataLayer || []

  window.dataLayer.push(arguments)
}

let defaultSent = false
let lastSent = ''

// Must run before GTM loads so no tag sees a moment without a consent state.
export const syncGoogleConsentMode = (snapshot: ConsentSnapshot) => {
  if (typeof window === 'undefined') return
  if (!defaultSent) {
    defaultSent = true
    gtag('consent', 'default', googleConsentState(UNDECIDED_CONSENT))
  }
  const update = googleConsentState(snapshot)
  const serialized = JSON.stringify(update)
  if (serialized === lastSent) return
  lastSent = serialized
  gtag('consent', 'update', update)
}
