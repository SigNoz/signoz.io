'use client'

import React, { useEffect, ReactNode, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { initMixpanel } from '../lib/mixpanelClient'
import { useContentMetadata } from '../hooks/useContentMetadata'
import { trackPageView } from '../utils/analytics'

const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second

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
  const retryCount = useRef(0)

  // Function to safely track page view
  const safeTrackPageView = async (path: string, metadata: any) => {
    try {
      await trackPageView(path, metadata)
      lastTrackedPath.current = path
    } catch (error) {
      console.warn(`Failed to track page view for "${path}":`, error)
      // Don't throw the error, just log it
    }
  }

  // Function to initialize mixpanel with retries
  const initializeMixpanelWithRetry = async () => {
    if (isInitialized.current || initError) return

    try {
      await initMixpanel()
      isInitialized.current = true
      retryCount.current = 0 // Reset retry count on success

      // If initialization is successful and we have a pathname, track the initial page view
      if (pathname && pathname !== lastTrackedPath.current) {
        const trackingTimeout = setTimeout(() => {
          safeTrackPageView(pathname, contentMetadata)
        }, 50)

        return () => clearTimeout(trackingTimeout)
      }
    } catch (error) {
      console.warn('Failed to initialize Mixpanel:', error)

      // Implement retry logic
      if (retryCount.current < MAX_RETRIES) {
        retryCount.current++
        console.log(
          `Retrying Mixpanel initialization (attempt ${retryCount.current}/${MAX_RETRIES})...`
        )

        // Schedule retry with exponential backoff
        setTimeout(
          () => {
            initializeMixpanelWithRetry()
          },
          RETRY_DELAY * Math.pow(2, retryCount.current - 1)
        )
      } else {
        // If all retries failed, mark as error
        console.error('All Mixpanel initialization attempts failed')
        setInitError(true)
      }
    }
  }

  // Initialize Mixpanel on mount
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Start initialization process
    initializeMixpanelWithRetry()

    // Cleanup function
    return () => {
      // Reset state on unmount
      isInitialized.current = false
      retryCount.current = 0
    }
  }, []) // Only run once on mount

  // Track page views on navigation
  useEffect(() => {
    // Skip if not initialized or in error state
    if (!isInitialized.current || initError) return

    // Only track if pathname exists and is different from last tracked
    if (pathname && pathname !== lastTrackedPath.current) {
      // Use a small timeout to ensure content metadata has loaded
      const trackingTimeout = setTimeout(() => {
        safeTrackPageView(pathname, contentMetadata)
      }, 50)

      return () => clearTimeout(trackingTimeout)
    }
  }, [pathname, contentMetadata, initError])

  // Always render children regardless of Mixpanel initialization status
  return <>{children}</>
}
