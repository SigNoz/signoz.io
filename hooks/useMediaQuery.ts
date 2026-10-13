'use client'

import { useCallback, useSyncExternalStore } from 'react'

// SSR-safe render-time media query (server snapshot is always false). Unlike
// CSS hiding, gating a render on this keeps the subtree's JS from downloading
// and hydrating at all.
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mediaQuery = window.matchMedia(query)
      mediaQuery.addEventListener('change', onStoreChange)
      return () => mediaQuery.removeEventListener('change', onStoreChange)
    },
    [query]
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  )
}
