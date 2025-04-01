'use client'

import React, { ReactNode, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initMixpanel, trackPageView, getPageType } from '../utils/analytics'

interface MixpanelProviderProps {
  children: ReactNode
}

/**
 * MixpanelProvider component initializes Mixpanel on the client side
 * and tracks page views when the route changes
 */
export default function MixpanelProvider({ children }: MixpanelProviderProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Initialize Mixpanel when the component mounts
  useEffect(() => {
    // Initialize Mixpanel
    initMixpanel()
  }, [])

  // Track page views when the route changes
  useEffect(() => {
    if (pathname) {
      const pageType = getPageType(pathname)
      trackPageView(pathname, pageType)
    }
  }, [pathname, searchParams])

  // Just render the children
  return <>{children}</>
}
