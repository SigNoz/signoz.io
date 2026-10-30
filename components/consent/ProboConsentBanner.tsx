'use client'

import dynamic from 'next/dynamic'

// Probo's web components rewrite their own DOM, so the banner renders only in the browser.
const ProboBanner = dynamic(() => import('./ProboBanner'), { ssr: false })

export default function ProboConsentBanner() {
  return <ProboBanner />
}
