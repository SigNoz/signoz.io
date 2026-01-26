'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useLogEvent } from '../../hooks/useLogEvent'
import { getPageType } from '../../utils/getPageType'
import { detectBotClientSide } from '../../utils/logEvent'

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
    const botDetection = detectBotClientSide()
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : ''
    const resolvedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const timezoneOffsetMinutes = new Date().getTimezoneOffset()
    const chinaTimeZones = new Set([
      'Asia/Shanghai',
      'Asia/Chongqing',
      'Asia/Harbin',
      'Asia/Urumqi',
    ])
    const isChinaTimeZone =
      (resolvedTimeZone && chinaTimeZones.has(resolvedTimeZone)) || timezoneOffsetMinutes === -480
    const suspiciousUserAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36'
    const isSuspiciousPageView = userAgent === suspiciousUserAgent && isChinaTimeZone

    if (isSuspiciousPageView) {
      logEvent({
        eventName: 'Suspicious Page View',
        eventType: 'track',
        attributes: {
          pageLocation: pathname,
          pageType: pageType,
          userAgent: userAgent,
          timeZone: resolvedTimeZone || 'unknown',
          timezoneOffsetMinutes: timezoneOffsetMinutes,
        },
      })
    } else if (botDetection.isBot) {
      // Log a separate event for bots that execute JavaScript (like Googlebot)
      // This helps distinguish simple bots from advanced ones that render JS content
      // Useful for SEO debugging - verifies if search engine bots are rendering your pages
      logEvent({
        eventName: 'Bot Page View',
        eventType: 'track',
        attributes: {
          pageLocation: pathname,
          pageType: pageType,
          botType: botDetection.botType,
          botDetectionReason: botDetection.reason,
        },
      })
    } else {
      // Log regular page view for human visitors
      logEvent({
        eventName: 'Website Page View',
        eventType: 'track',
        attributes: {
          pageLocation: pathname,
          pageType: pageType,
        },
      })
    }

    // Update the previous path
    previousPath.current = currentUrl
  }, [pathname, searchParams, logEvent]) // Rerun effect when path or search params change

  return null // This component doesn't render anything visible
}
