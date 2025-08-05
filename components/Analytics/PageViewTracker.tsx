'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useLogEvent } from '../../hooks/useLogEvent'
import { getPageType } from '../../utils/getPageType'

export default function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const logEvent = useLogEvent()
  const previousPath = useRef<string | null>(null)

  useEffect(() => {
    // Combine pathname and searchParams for a complete URL identifier
    const currentUrl = `${pathname}${searchParams ? `?${searchParams}` : ''}`

    // Prevent logging the same URL twice in quick succession (e.g., initial render)
    // Or if only the hash changes.
    if (previousPath.current === currentUrl) {
      return
    }

    const pageType = getPageType(pathname || '') // Ensure pathname is defined

    logEvent({
      eventName: 'Website Page View',
      eventType: 'track',
      attributes: {
        pageLocation: pathname, // Use pathname for consistency with rules
        pageType: pageType,
        // $current_url: currentUrl, // Optionally log full URL if needed
        // Add other relevant attributes here if derivable, e.g., based on pageType
      },
    })

    // Update the previous path
    previousPath.current = currentUrl
  }, [pathname, searchParams, logEvent]) // Rerun effect when path or search params change

  return null // This component doesn't render anything visible
}
