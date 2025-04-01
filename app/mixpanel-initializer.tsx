'use client'

import React, { useEffect, ReactNode, useRef, useState } from 'react'
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
  const [initError, setInitError] = useState(false)

  useEffect(() => {
    // Initialize Mixpanel only once, with error handling
    if (!isInitialized.current && !initError) {
      const initializeAnalytics = async () => {
        try {
          await initMixpanel()
          isInitialized.current = true

          // If initialization is successful and we have a pathname, track the initial page view
          if (pathname && pathname !== lastTrackedPath.current) {
            const trackingTimeout = setTimeout(() => {
              try {
                trackPageView(pathname, contentMetadata)
                lastTrackedPath.current = pathname
              } catch (error) {
                console.warn('Failed to track initial page view:', error)
              }
            }, 50)

            return () => clearTimeout(trackingTimeout)
          }
        } catch (error) {
          console.warn('Failed to initialize Mixpanel:', error)
          setInitError(true)
        }
      }

      // Run initialization but don't block rendering
      initializeAnalytics().catch((error) => {
        console.warn('Unhandled error during Mixpanel initialization:', error)
        setInitError(true)
      })
    }
  }, []) // Only run once on mount

  // Track page views on navigation, but only if successfully initialized
  useEffect(() => {
    if (!isInitialized.current || initError) return

    // Only track page view if pathname exists and is different from the last tracked path
    if (pathname && pathname !== lastTrackedPath.current) {
      // Track the page view with any content metadata
      // Small timeout to ensure content metadata has loaded properly
      const trackingTimeout = setTimeout(() => {
        try {
          trackPageView(pathname, contentMetadata)
          lastTrackedPath.current = pathname
        } catch (error) {
          console.warn(`Failed to track page view for "${pathname}":`, error)
        }
      }, 50)

      return () => clearTimeout(trackingTimeout)
    }
  }, [pathname, contentMetadata, initError])

  // Always render children regardless of Mixpanel initialization status
  return <>{children}</>
}
