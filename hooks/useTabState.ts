'use client'
import { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

/**
 * Hook to manage tab state via URL query parameters
 * @param tabGroupId - Unique identifier for this tab group
 * @param defaultTab - Default tab to select if none is specified in URL
 * @param tabIdArray - Array of available tab options
 * @param initialActiveTab - Initial tab to select if none is specified in URL
 */
export function useTabState(
  tabGroupId: string,
  defaultTab: string,
  tabIdArray: string[],
  useSearchParamForInitialTab: boolean = true
) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get current tab from URL or use default
  const currentTab = useSearchParamForInitialTab
    ? searchParams.get(tabGroupId) || defaultTab
    : defaultTab

  // If initialActiveTab is provided, use it as the initial active tab
  // Otherwise, use the current tab
  const [activeTab, setActiveTab] = useState(currentTab)

  // Validate that the tab exists, fallback to default if not
  const validTab = tabIdArray?.includes(activeTab) ? activeTab : defaultTab

  // Update URL when tab changes
  const setTab = useCallback(
    (newTab: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(tabGroupId, newTab)
      setActiveTab(newTab)

      // Update URL without refreshing the page
      const newUrl = `${pathname}${params.toString() ? '?' + params.toString() : ''}`
      router.push(newUrl, { scroll: false })
    },
    [router, pathname, searchParams, tabGroupId]
  )

  // Ensure URL is in sync with valid tab on initial load
  useEffect(() => {
    if (activeTab !== validTab) {
      setTab(validTab)
    }
  }, [activeTab, validTab, setTab])

  return [activeTab, setTab] as const
}
