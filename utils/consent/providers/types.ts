import type { ConsentSnapshot } from '../parse'

export type ConsentAdapterCallbacks = {
  // The consent manager loaded and reports the stored choice (undecided if there is none).
  onLoad: (stored: ConsentSnapshot) => void
  // The visitor made or changed a choice.
  onChoice: (next: ConsentSnapshot) => void
}

export type ConsentAdapter = {
  cookieName: string
  // False when the scripts GTM's tags add must be held back by us until consent.
  blocksScripts: boolean
  // Returns undecided unless the cookie records an explicit choice.
  parseCookie: (raw: string | null | undefined) => ConsentSnapshot
  // State to use before the consent manager has loaded.
  readStoredConsent: () => ConsentSnapshot
  // True when a stored choice exists that readStoredConsent can't confirm yet.
  hasPendingChoice?: () => boolean
  start: (callbacks: ConsentAdapterCallbacks) => void
  // Reads the consent manager's state synchronously; false if it hasn't loaded.
  poll?: (callbacks: ConsentAdapterCallbacks) => boolean
  openPreferences: () => void
  // Lets the consent record finish sending before a withdrawal reloads the page.
  beforeReload?: () => Promise<void>
}
