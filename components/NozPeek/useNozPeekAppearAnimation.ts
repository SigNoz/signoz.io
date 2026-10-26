'use client'

import { useEffect, useRef, useState } from 'react'

const SESSION_KEY = 'noz-peek-appeared'

function readSessionAppeared(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

/** One-shot appear animation + sessionStorage settle. */
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

    return () => clearTimeout(startTimer)
  }, [enabled])

  return { anchoredRef, shouldAnimate, settled }
}
