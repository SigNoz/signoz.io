'use client'

import { useCallback, useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useLogEvent } from '../../hooks/useLogEvent'
import { getPageType } from '../../utils/getPageType'
import { detectBotClientSide } from '../../utils/logEvent'
import { getOrCreateAnalyticsSessionId } from '../../utils/userClient'

const FLAGGED_TIMEZONES = (process.env.NEXT_PUBLIC_PAGEVIEW_FLAGGED_TIMEZONES || '')
  .split(',')
  .map((timezone) => timezone.trim())
  .filter(Boolean)
const FLAGGED_TIMEZONE_SET = new Set(FLAGGED_TIMEZONES)
const FLAGGED_USER_AGENTS = new Set(
  (process.env.NEXT_PUBLIC_PAGEVIEW_FLAGGED_USER_AGENT || '')
    .split(',')
    .map((ua) => ua.trim())
    .filter(Boolean)
)

type TrackedPage = {
  pathname: string
  pageType: string
  pageUrl: string
  pageTitle?: string
  pageReferrer?: string
  sessionId?: string
  startedAt: number
  maxScrollDepthPercentage?: number
  left: boolean
}

const clampRatio = (value: number) => Math.max(0, Math.min(1, value))

const roundPercentage = (value: number) => Math.round(value * 100) / 100

const getCurrentScrollDepthPercentage = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return undefined

  const documentElement = document.documentElement
  const body = document.body
  const viewportHeight = window.innerHeight || documentElement.clientHeight
  const scrollTop = window.scrollY || documentElement.scrollTop || body?.scrollTop || 0
  const scrollHeight = Math.max(
    documentElement.scrollHeight,
    body?.scrollHeight || 0,
    documentElement.offsetHeight,
    body?.offsetHeight || 0,
    documentElement.clientHeight
  )

  if (!viewportHeight || !scrollHeight) return undefined

  const viewportBottom = Math.min(scrollHeight, scrollTop + viewportHeight)
  return roundPercentage(clampRatio(viewportBottom / scrollHeight) * 100)
}

export default function PageViewTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const logEvent = useLogEvent()
  const previousPath = useRef<string | null>(null)
  const previousPageUrl = useRef<string | null>(null)
  const currentPage = useRef<TrackedPage | null>(null)

  const updateMaxScrollDepthPercentage = useCallback((page: TrackedPage) => {
    const currentScrollDepthPercentage = getCurrentScrollDepthPercentage()
    if (currentScrollDepthPercentage === undefined) return

    page.maxScrollDepthPercentage = Math.max(
      page.maxScrollDepthPercentage || 0,
      currentScrollDepthPercentage
    )
  }, [])

  const sendPageLeave = useCallback(
    (page: TrackedPage) => {
      if (page.left) return
      page.left = true
      updateMaxScrollDepthPercentage(page)

      const durationSeconds = Math.max(0, (Date.now() - page.startedAt) / 1000)

      logEvent(
        {
          eventName: 'Website Page Leave',
          eventType: 'track',
          attributes: {
            pageLocation: page.pathname,
            pageType: page.pageType,
            pageUrl: page.pageUrl,
            pageTitle: page.pageTitle,
            pageReferrer: page.pageReferrer,
            $session_id: page.sessionId,
            pageDurationSeconds: durationSeconds,
            scrollDepthPercentage: page.maxScrollDepthPercentage,
          },
        },
        {
          transport: 'beacon',
        }
      )
    },
    [logEvent, updateMaxScrollDepthPercentage]
  )

  useEffect(() => {
    let animationFrameId: number | null = null

    const updateCurrentPageContentPercentage = () => {
      animationFrameId = null

      if (currentPage.current) {
        updateMaxScrollDepthPercentage(currentPage.current)
      }
    }

    const requestContentPercentageUpdate = () => {
      if (!currentPage.current || animationFrameId !== null) {
        return
      }

      animationFrameId = window.requestAnimationFrame(updateCurrentPageContentPercentage)
    }

    const handlePageHide = () => {
      if (currentPage.current) {
        sendPageLeave(currentPage.current)
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && currentPage.current) {
        sendPageLeave(currentPage.current)
      }
    }

    window.addEventListener('pagehide', handlePageHide)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('scroll', requestContentPercentageUpdate, { passive: true })
    window.addEventListener('resize', requestContentPercentageUpdate)

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId)
      }

      window.removeEventListener('pagehide', handlePageHide)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('scroll', requestContentPercentageUpdate)
      window.removeEventListener('resize', requestContentPercentageUpdate)
    }
  }, [sendPageLeave, updateMaxScrollDepthPercentage])

  useEffect(() => {
    // Combine pathname and searchParams for a complete URL identifier
    const queryString = searchParams?.toString()
    const currentUrl = `${pathname}${queryString ? `?${queryString}` : ''}`

    // Prevent logging the same URL twice in quick succession (e.g., initial render)
    // Or if only the hash changes.
    if (previousPath.current === currentUrl) {
      return
    }

    if (currentPage.current) {
      sendPageLeave(currentPage.current)
    }

    const pageType = getPageType(pathname || '') // Ensure pathname is defined
    const botDetection = detectBotClientSide()
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : ''
    const sessionId = getOrCreateAnalyticsSessionId()
    const pageUrl =
      typeof window !== 'undefined' ? `${window.location.origin}${currentUrl}` : currentUrl
    const pageTitle = typeof document !== 'undefined' ? document.title : undefined
    const documentReferrer = typeof document !== 'undefined' ? document.referrer : undefined
    const pageReferrer = previousPageUrl.current || documentReferrer
    const resolvedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const timezoneOffsetMinutes = new Date().getTimezoneOffset()
    const isFlaggedTimeZone = resolvedTimeZone ? FLAGGED_TIMEZONE_SET.has(resolvedTimeZone) : false
    const isFlaggedPageView =
      FLAGGED_USER_AGENTS.size > 0 && FLAGGED_USER_AGENTS.has(userAgent) && isFlaggedTimeZone
    const shouldTrackHumanPageLeave = !isFlaggedPageView && !botDetection.isBot

    if (isFlaggedPageView) {
      logEvent({
        eventName: 'Flagged Page View',
        eventType: 'track',
        attributes: {
          pageLocation: pathname,
          pageType: pageType,
          $session_id: sessionId,
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
          $session_id: sessionId,
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
          pageUrl,
          pageTitle,
          pageReferrer,
          $session_id: sessionId,
        },
      })
    }

    // Update the previous path before returning so repeated renders do not duplicate events.
    previousPath.current = currentUrl

    if (!shouldTrackHumanPageLeave) {
      currentPage.current = null
      previousPageUrl.current = pageUrl
      return
    }

    currentPage.current = {
      pathname: pathname || '',
      pageType,
      pageUrl,
      pageTitle,
      pageReferrer,
      sessionId,
      startedAt: Date.now(),
      maxScrollDepthPercentage: getCurrentScrollDepthPercentage(),
      left: false,
    }

    previousPageUrl.current = pageUrl
  }, [pathname, searchParams, logEvent, sendPageLeave]) // Rerun effect when path or search params change

  return null // This component doesn't render anything visible
}
