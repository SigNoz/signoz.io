'use client'

import { useEffect, useState } from 'react'
import { NAV_BREAKPOINTS } from './constants'

export function useNavVisibility() {
  const [windowWidth, setWindowWidth] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const update = () => setWindowWidth(window.innerWidth)
    update()
    let rafId: number
    const handleResize = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return {
    showGithubStars: windowWidth === null || windowWidth >= NAV_BREAKPOINTS.GITHUB_STARS,
    showPricing: windowWidth === null || windowWidth >= NAV_BREAKPOINTS.PRICING,
    showResources: windowWidth === null || windowWidth >= NAV_BREAKPOINTS.RESOURCES,
    showDocs: windowWidth === null || windowWidth >= NAV_BREAKPOINTS.DOCS,
    showUseCases: windowWidth === null || windowWidth >= NAV_BREAKPOINTS.USE_CASES,
    showProduct: windowWidth === null || windowWidth >= NAV_BREAKPOINTS.PRODUCT,
    showSignInGetStarted: windowWidth === null || windowWidth >= NAV_BREAKPOINTS.SIGN_IN,
  }
}
