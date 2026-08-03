'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ensureDecimalScript, isDecimalChatOpen, openDecimalChat } from '@/utils/decimal'
import { isDocsOnboardingPathname } from '@/utils/docs/onboardingPath'
import { DOC_SIDENAV_WIDTH_PX } from '@/components/DocsTOC/docLayoutClasses'
import './NozPeek.css'

const SESSION_KEY = 'noz-peek-appeared'
const ARTICLE_MAX_WIDTH = 1200

const NOZ_PEEK_SVG = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ overflow: 'visible' }}
  >
    <rect x="4.35938" y="8.49908" width="15.4569" height="11.978" rx="1.76147" fill="#E5484D" />
    <g className="noz-peek-head">
      <circle className="noz-peek-eye-white" cx="12.0217" cy="14.4881" r="3.87523" fill="#F5F5F5" />
      <g className="noz-peek-pupil">
        <path
          d="M12.0237 12.8024C12.0237 13.7328 11.2673 14.4892 10.337 14.4892C10.0339 14.4892 9.74926 14.4101 9.50152 14.2678C9.47517 14.5551 9.49888 14.8502 9.57795 15.1428C9.93901 16.4921 11.3279 17.2933 12.6773 16.9323C14.0267 16.5712 14.8279 15.1823 14.4668 13.8329C14.1453 12.6285 13.0041 11.8616 11.8023 11.967C11.942 12.2121 12.0237 12.4967 12.0237 12.8024Z"
          fill="#0A0C10"
        />
      </g>
      <path
        d="M8.33833 7.94578L9.83358 4.31319C10.1302 3.59261 10.6676 2.99939 11.355 2.63299L13.9181 1.26684C14.1327 1.15169 14.3804 1.34885 14.3194 1.58439L13.6703 4.06892C13.6511 4.14046 13.6424 4.21374 13.6424 4.28876C13.6424 4.39868 13.6633 4.5086 13.7052 4.61154L15.0382 7.94578H11.4248L11.6307 7.32813L12.3356 7.09259C12.449 7.05421 12.5257 6.94778 12.5257 6.82739C12.5257 6.707 12.449 6.60057 12.3356 6.56218L11.6307 6.32664L11.3951 5.62176C11.3568 5.51009 11.2503 5.43333 11.1299 5.43333C11.0096 5.43333 10.9031 5.5101 10.8647 5.6235L10.6292 6.32839L9.92431 6.56393C9.8109 6.60231 9.73413 6.70874 9.73413 6.82913C9.73413 6.94952 9.8109 7.05595 9.92431 7.09434L10.6292 7.32988L10.8351 7.94752H8.33833V7.94578ZM12.1 3.43558C12.0808 3.378 12.0285 3.33962 11.9674 3.33962C11.9064 3.33962 11.854 3.378 11.8348 3.43558L11.7179 3.78802L11.3655 3.90492C11.3079 3.92411 11.2695 3.97645 11.2695 4.03752C11.2695 4.09859 11.3079 4.15093 11.3655 4.17012L11.7179 4.28702L11.8348 4.63946C11.854 4.69704 11.9064 4.73542 11.9674 4.73542C12.0285 4.73542 12.0808 4.69704 12.1 4.63946L12.2169 4.28702L12.5694 4.17012C12.6269 4.15093 12.6653 4.09859 12.6653 4.03752C12.6653 3.97645 12.6269 3.92411 12.5694 3.90492L12.2169 3.78802L12.1 3.43558ZM7.78 7.91088H15.5965C15.9053 7.91088 16.1548 8.16038 16.1548 8.4692C16.1548 8.77803 15.9053 9.02753 15.5965 9.02753H7.78C7.47118 9.02753 7.22168 8.77803 7.22168 8.4692C7.22168 8.16038 7.47118 7.91088 7.78 7.91088Z"
        fill="#4E74F8"
      />
    </g>
  </svg>
)

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

  const contentSectionWidth = vw - sidebar
  const articleWidth = Math.min(ARTICLE_MAX_WIDTH, contentSectionWidth)
  const articleLeftInset = Math.max(0, (contentSectionWidth - articleWidth) / 2)
  return sidebar + articleLeftInset + articleWidth / 2
}

function readSessionAppeared(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export default function NozPeekDock() {
  const pathname = usePathname()
  const bodyRef = useRef<HTMLDivElement>(null)
  const anchoredRef = useRef(readSessionAppeared())
  const [dismissed, setDismissed] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [settled, setSettled] = useState(() => readSessionAppeared())
  const [dockLeft, setDockLeft] = useState(0)
  const [pathKey, setPathKey] = useState(pathname)

  // Reset dock when navigating between docs pages (render-time adjust).
  if (pathname !== pathKey) {
    setPathKey(pathname)
    setDismissed(false)
  }

  const isOnboarding = isDocsOnboardingPathname(pathname)
  const isIntro = isDocsIntroPath(pathname)

  useEffect(() => {
    if (isOnboarding) return
    document.documentElement.setAttribute('data-docs-route', '')
    ensureDecimalScript()
    return () => {
      document.documentElement.removeAttribute('data-docs-route')
    }
  }, [isOnboarding])

  useEffect(() => {
    if (isOnboarding) return

    const update = () => setDockLeft(computeDockLeft(isIntro))
    update()
    window.addEventListener('resize', update)

    if (readSessionAppeared()) {
      anchoredRef.current = true
      return () => window.removeEventListener('resize', update)
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const startTimer = window.setTimeout(() => {
      setShouldAnimate(true)
      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        // ignore
      }
      // Bar rise ~0.6s + body peek delay 0.35s + 0.7s ≈ settle by ~1.2s
      window.setTimeout(
        () => {
          anchoredRef.current = true
          setSettled(true)
          setShouldAnimate(false)
        },
        reduce ? 0 : 1200
      )
    }, 200)

    return () => {
      clearTimeout(startTimer)
      window.removeEventListener('resize', update)
    }
  }, [isOnboarding, isIntro])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!anchoredRef.current || dismissed) return
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
  }, [dismissed])

  // Bring NozPeek back when Decimal chat closes (X, Escape, or request-close).
  useEffect(() => {
    if (!dismissed) return

    let sawOpen = isDecimalChatOpen()

    const restoreIfClosed = () => {
      const open = isDecimalChatOpen()
      if (open) {
        sawOpen = true
        return
      }
      if (sawOpen) setDismissed(false)
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
  }, [dismissed])

  const handleOpen = useCallback(() => {
    if (dismissed) return
    setDismissed(true)
    openDecimalChat({ presentation: 'modal' })
  }, [dismissed])

  if (isOnboarding) return null

  const animateClass = shouldAnimate ? 'animate' : ''
  const settledClass = settled && !shouldAnimate ? 'settled' : ''

  return (
    <div
      className={`noz-peek-dock ${animateClass} ${settledClass} ${dismissed ? 'dismissed' : ''}`}
      style={{ left: dockLeft || '50%' }}
    >
      <div className="noz-peek-stage">
        <div
          ref={bodyRef}
          className={`noz-peek-body ${animateClass} ${settledClass}`}
          aria-hidden="true"
        >
          {NOZ_PEEK_SVG}
        </div>
        <svg
          className="noz-peek-hands"
          width="34"
          height="7"
          viewBox="0 0 34 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect width="3.52294" height="6.16514" rx="1.46789" fill="#E5484D" />
          <rect x="30.4775" width="3.52294" height="6.16514" rx="1.46789" fill="#E5484D" />
        </svg>
        <button
          type="button"
          className={`noz-peek-input ${animateClass} ${settledClass}`}
          onClick={handleOpen}
          aria-label="Ask SigNoz AI"
        >
          <span className="noz-peek-placeholder">Ask SigNoz AI…</span>
        </button>
      </div>
    </div>
  )
}
