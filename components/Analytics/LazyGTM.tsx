'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

const GTM_ID = 'GTM-N9B6D4H'
const FALLBACK_DELAY_MS = 5000 // Fallback if LCP observer not supported

export default function LazyGTM() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (shouldLoad) return

    let loaded = false
    const loadGTM = () => {
      if (loaded) return
      loaded = true
      setShouldLoad(true)
      cleanup()
    }

    let lcpObserver: PerformanceObserver | undefined
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined

    // Primary: Load after LCP completes
    if ('PerformanceObserver' in window) {
      try {
        lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries()
          if (entries.length > 0) {
            // LCP detected, load GTM after a small delay to ensure paint completes
            setTimeout(loadGTM, 100)
          }
        })
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })
      } catch {
        // LCP observation not supported, use fallback
      }
    }

    // Fallback: load after delay if LCP observer fails or takes too long
    fallbackTimer = setTimeout(loadGTM, FALLBACK_DELAY_MS)

    const cleanup = () => {
      if (lcpObserver) lcpObserver.disconnect()
      if (fallbackTimer) clearTimeout(fallbackTimer)
    }

    return cleanup
  }, [shouldLoad])

  if (!shouldLoad) return null

  return (
    <>
      <Script
        id="gtm-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,l){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            })(window,'dataLayer');
          `,
        }}
      />
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
      />
    </>
  )
}
