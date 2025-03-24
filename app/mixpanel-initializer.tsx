'use client'

import React, { useEffect, ReactNode, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { initMixpanel } from '../lib/mixpanelClient'
import { useContentMetadata } from '../hooks/useContentMetadata'
import { trackPageView } from '../utils/analytics'

export default function MixpanelClientInitializer({
  children,
}: {
  children: ReactNode
}): React.ReactElement {
  const pathname = usePathname()
  const contentMetadata = useContentMetadata(pathname)
  const lastTrackedPath = useRef<string | null>(null)
  const isInitialized = useRef(false)

  useEffect(() => {
    // Initialize Mixpanel only once
    if (!isInitialized.current) {
      initMixpanel()
      isInitialized.current = true
    }

    // Only track page view if pathname exists and is different from the last tracked path
    if (pathname && pathname !== lastTrackedPath.current) {
      // Track the page view with any content metadata
      // Small timeout to ensure content metadata has loaded properly
      const trackingTimeout = setTimeout(() => {
        trackPageView(pathname, contentMetadata)
        lastTrackedPath.current = pathname
      }, 50)

      return () => clearTimeout(trackingTimeout)
    }
  }, [pathname, contentMetadata])

  return <>{children}</>
}
