'use client'

import { openCookiePreferences } from '@/utils/consent/client'
import { getConsentProvider } from '@/utils/consent/provider'

export default function CookieSettingsLink() {
  switch (getConsentProvider()) {
    case 'probo':
      // Probo's own element: it opens the preference panel and shows when GPC was honoured.
      return (
        <probo-settings-link className="footer-pill-link mt-5">Cookie settings</probo-settings-link>
      )
    case 'cookieyes':
      return (
        <button
          type="button"
          className="footer-pill-link mt-5 appearance-none border-0 bg-transparent text-left"
          onClick={openCookiePreferences}
        >
          Cookie settings
        </button>
      )
    default:
      return null
  }
}
