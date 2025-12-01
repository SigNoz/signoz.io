import { useEffect } from 'react'

const scrollToHash = () => {
  const hash = window.location.hash
  if (!hash) {
    return
  }

  const targetId = decodeURIComponent(hash.startsWith('#') ? hash.slice(1) : hash)
  if (!targetId) {
    return
  }

  const element = document.getElementById(targetId)
  if (!element) {
    return
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' })
}

export const useScrollToHash = () => {
  useEffect(() => {
    const rIC =
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback
        : (cb: () => void) => setTimeout(cb, 0)

    rIC(scrollToHash)

    const handleHashChange = () => scrollToHash()
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])
}
