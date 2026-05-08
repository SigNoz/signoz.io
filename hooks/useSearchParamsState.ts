'use client'

import { useEffect, useMemo, useState } from 'react'

if (typeof window !== 'undefined' && !(history as any).__spPatched) {
  const origPushState = history.pushState.bind(history)
  const origReplaceState = history.replaceState.bind(history)

  history.pushState = function (...args: Parameters<typeof history.pushState>) {
    origPushState(...args)
    window.dispatchEvent(new Event('searchparamschange'))
  }

  history.replaceState = function (...args: Parameters<typeof history.replaceState>) {
    origReplaceState(...args)
    window.dispatchEvent(new Event('searchparamschange'))
  }
  ;(history as any).__spPatched = true
}

export function useSearchParamsState(): URLSearchParams {
  const [search, setSearch] = useState('')

  useEffect(() => {
    const sync = (): void => setSearch(window.location.search)
    sync()

    window.addEventListener('popstate', sync)
    window.addEventListener('searchparamschange', sync)

    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener('searchparamschange', sync)
    }
  }, [])

  return useMemo(() => new URLSearchParams(search), [search])
}
