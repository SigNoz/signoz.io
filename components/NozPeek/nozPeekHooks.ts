'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'
import { usePathname } from 'next/navigation'
import { ensureDecimalScript, isDecimalChatOpen } from '@/utils/decimal'
import { isDocsOnboardingPathname } from '@/utils/docs/onboardingPath'
import {
  DOC_SIDENAV_WIDTH_PX,
  DOC_TOC_WIDTH_PX,
  DOCS_CONTENT_COLUMN_ATTR,
} from '@/components/DocsTOC/docLayoutClasses'

const SESSION_KEY = 'noz-peek-appeared'
const ARTICLE_MAX_WIDTH = 1200
const ARTICLE_TOC_GAP_PX = 16
const TOC_VISIBLE_MIN_PX = 1024

function isDocsIntroPath(pathname: string | null): boolean {
  if (!pathname) return false
  const normalized =
    pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname
  return normalized === '/docs' || normalized === '/docs/introduction'
}

function computeDockLeft(isIntro: boolean): number {
  if (typeof window === 'undefined') return 0
  const vw = window.innerWidth
  const isMobile = vw < 768
  const sidebar = isMobile ? 0 : DOC_SIDENAV_WIDTH_PX

  if (isIntro) {
    return sidebar + (vw - sidebar) / 2
  }

  const contentCol = document.querySelector(`[${DOCS_CONTENT_COLUMN_ATTR}]`)
  if (contentCol) {
    const r = contentCol.getBoundingClientRect()
    if (r.width > 0) return r.left + r.width / 2
  }

  const contentSectionWidth = vw - sidebar
  const shellWidth = Math.min(ARTICLE_MAX_WIDTH, contentSectionWidth)
  const shellLeft = sidebar + Math.max(0, (contentSectionWidth - shellWidth) / 2)
  const tocVisible = vw >= TOC_VISIBLE_MIN_PX
  const proseWidth = tocVisible
    ? Math.max(0, shellWidth - DOC_TOC_WIDTH_PX - ARTICLE_TOC_GAP_PX)
    : shellWidth
  return shellLeft + proseWidth / 2
}

function readSessionAppeared(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export function useNozPeekVisibility() {
  const pathname = usePathname()
  const [pathKey, setPathKey] = useState(pathname)
  const [dismissed, setDismissed] = useState(false)

  if (pathname !== pathKey) {
    setPathKey(pathname)
    setDismissed(false)
  }

  const enabled = !isDocsOnboardingPathname(pathname)
  const isIntro = isDocsIntroPath(pathname)

  useEffect(() => {
    if (!enabled) return
    document.documentElement.setAttribute('data-docs-route', '')
    ensureDecimalScript()
    return () => {
      document.documentElement.removeAttribute('data-docs-route')
    }
  }, [enabled])

  return { enabled, isIntro, pathname, dismissed, setDismissed }
}

export function useNozPeekPosition({
  enabled,
  isIntro,
  pathname,
}: {
  enabled: boolean
  isIntro: boolean
  pathname: string | null
}) {
  const [dockLeft, setDockLeft] = useState(0)

  useEffect(() => {
    if (!enabled) return

    const update = () => setDockLeft(computeDockLeft(isIntro))
    update()
    window.addEventListener('resize', update)

    const resizeObserver = new ResizeObserver(update)
    const observeContentCol = () => {
      const contentCol = document.querySelector(`[${DOCS_CONTENT_COLUMN_ATTR}]`)
      if (!contentCol) return
      resizeObserver.disconnect()
      resizeObserver.observe(contentCol)
    }
    observeContentCol()
    const raf = window.requestAnimationFrame(() => {
      update()
      observeContentCol()
    })

    return () => {
      window.removeEventListener('resize', update)
      resizeObserver.disconnect()
      window.cancelAnimationFrame(raf)
    }
  }, [enabled, isIntro, pathname])

  return dockLeft
}

export function useNozPeekAppearAnimation({ enabled }: { enabled: boolean }) {
  const anchoredRef = useRef(readSessionAppeared())
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [settled, setSettled] = useState(() => readSessionAppeared())

  useEffect(() => {
    if (!enabled) return

    if (readSessionAppeared()) {
      anchoredRef.current = true
      return
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const startTimer = window.setTimeout(() => {
      setShouldAnimate(true)
      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        // ignore
      }
      window.setTimeout(
        () => {
          anchoredRef.current = true
          setSettled(true)
          setShouldAnimate(false)
        },
        reduce ? 0 : 1200
      )
    }, 200)

    return () => clearTimeout(startTimer)
  }, [enabled])

  return { anchoredRef, shouldAnimate, settled }
}

export function useNozPeekEyeTracking({
  enabled,
  dismissed,
  anchoredRef,
  bodyRef,
}: {
  enabled: boolean
  dismissed: boolean
  anchoredRef: RefObject<boolean>
  bodyRef: RefObject<HTMLDivElement | null>
}) {
  useEffect(() => {
    if (!enabled || dismissed) return

    const onMove = (e: MouseEvent) => {
      if (!anchoredRef.current) return
      const eye = bodyRef.current?.querySelector('.noz-peek-eye-white') as SVGCircleElement | null
      const pupil = bodyRef.current?.querySelector('.noz-peek-pupil') as SVGGElement | null
      if (!eye || !pupil) return

      const r = eye.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy) || 1
      const maxOffset = 1.25
      const mag = Math.min(1, dist / 160) * maxOffset
      const ox = (dx / dist) * mag
      const oy = (dy / dist) * mag
      pupil.style.transform = `translate(${ox.toFixed(3)}px, ${oy.toFixed(3)}px)`
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [enabled, dismissed, anchoredRef, bodyRef])
}

/** Restore the dock when Decimal chat closes. */
export function useDecimalChatRestore({
  dismissed,
  onRestore,
}: {
  dismissed: boolean
  onRestore: () => void
}) {
  useEffect(() => {
    if (!dismissed) return

    let sawOpen = isDecimalChatOpen()

    const restoreIfClosed = () => {
      const open = isDecimalChatOpen()
      if (open) {
        sawOpen = true
        return
      }
      if (sawOpen) onRestore()
    }

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://app.getdecimal.ai') return
      if (event.data?.type === 'decimal-widget-request-close') {
        window.setTimeout(restoreIfClosed, 50)
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') window.setTimeout(restoreIfClosed, 50)
    }

    const onClickCapture = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      if (target.closest?.('.decimal-widget-button, .decimal-widget-modal-backdrop')) {
        window.setTimeout(restoreIfClosed, 50)
      }
    }

    const observer = new MutationObserver(() => {
      restoreIfClosed()
    })

    let bodyObserver: MutationObserver | null = null
    const observeContainer = () => {
      const el = document.querySelector('.decimal-widget-container')
      if (!el) return false
      observer.observe(el, { attributes: true, attributeFilter: ['class'] })
      return true
    }

    if (!observeContainer()) {
      bodyObserver = new MutationObserver(() => {
        if (observeContainer()) bodyObserver?.disconnect()
      })
      bodyObserver.observe(document.body, { childList: true, subtree: true })
    }

    const poll = window.setInterval(() => {
      if (isDecimalChatOpen()) {
        sawOpen = true
        window.clearInterval(poll)
      }
    }, 100)
    const pollStop = window.setTimeout(() => window.clearInterval(poll), 5000)

    window.addEventListener('message', onMessage)
    window.addEventListener('keydown', onKeyDown)
    document.addEventListener('click', onClickCapture, true)

    return () => {
      observer.disconnect()
      bodyObserver?.disconnect()
      window.clearInterval(poll)
      window.clearTimeout(pollStop)
      window.removeEventListener('message', onMessage)
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('click', onClickCapture, true)
    }
  }, [dismissed, onRestore])
}
