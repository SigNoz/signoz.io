'use client'
import { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

/**
 * Hook to manage tab state via URL query parameters
 * @param tabGroupId - Unique identifier for this tab group
 * @param defaultTab - Default tab to select if none is specified in URL
 * @param tabIdArray - Array of available tab options
 */
export function useTabState(tabGroupId: string, defaultTab: string, tabIdArray: string[]) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get current tab from URL or use default
  const currentTab = searchParams.get(tabGroupId) || defaultTab

  // Validate that the tab exists, fallback to default if not
  const validTab = tabIdArray?.includes(currentTab) ? currentTab : defaultTab

  // Update URL when tab changes
  const setTab = useCallback(
    (newTab: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(tabGroupId, newTab)

      // Update URL without refreshing the page
      const newUrl = `${pathname}${params.toString() ? '?' + params.toString() : ''}`
      router.push(newUrl, { scroll: false })
    },
    [router, pathname, searchParams, tabGroupId]
  )

  // Ensure URL is in sync with valid tab on initial load
  useEffect(() => {
    if (currentTab !== validTab) {
      setTab(validTab)
    }
  }, [currentTab, validTab, setTab])

  return [validTab, setTab] as const
}
