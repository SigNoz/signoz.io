'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSearchParamsState } from '@/hooks/useSearchParamsState'
import { isDocsOnboardingPathname } from '@/utils/docs/onboardingPath'
import type { TabItemProps } from './TabItem'

interface TabsProps {
  children: React.ReactNode
  entityName?: string
  variant?: 'default' | 'pill'
  className?: string
}

const Tabs = ({ children, entityName, variant = 'default', className }: TabsProps) => {
  const searchParams = useSearchParamsState()
  const router = useRouter()
  const pathname = usePathname()

  const childrenArray = React.Children.toArray(children)
  const validChildren = childrenArray.filter((child): child is React.ReactElement<TabItemProps> =>
    React.isValidElement(child)
  )

  const tabValuesKey = validChildren.map((child) => child.props.value).join(',')
  const tabValuesSet = useMemo(
    () => new Set(validChildren.map((child) => child.props.value as string)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tabValuesKey]
  )

  const defaultChild = validChildren.find((child) => child.props.default)
  const firstChild = validChildren[0]
  const defaultActiveTab = defaultChild?.props.value ?? firstChild?.props.value ?? null

  const urlKey = entityName || null

  const resolveActiveTab = useCallback((): string | null => {
    if (urlKey) {
      const urlValue = searchParams.get(urlKey)
      if (urlValue && tabValuesSet.has(urlValue)) return urlValue
    }

    return defaultActiveTab
  }, [urlKey, searchParams, tabValuesSet, defaultActiveTab])

  const [localActiveTab, setLocalActiveTab] = useState(resolveActiveTab)

  const activeTab = urlKey ? resolveActiveTab() : localActiveTab

  const handleTabChange = useCallback(
    (value: string) => {
      setLocalActiveTab(value)

      if (!urlKey) return

      const current = new URLSearchParams(Array.from(searchParams.entries()))
      current.set(urlKey, value)
      router.replace(`${pathname}?${current.toString()}`, { scroll: false })
    },
    [urlKey, searchParams, router, pathname]
  )

  const isOnboarding = isDocsOnboardingPathname(pathname)
  const hideSelfHostTab = isOnboarding && entityName === 'plans'

  const isPill = variant === 'pill'

  return (
    <div className={className ?? 'w-full'} data-tabs-root>
      <div
        className={
          isPill
            ? 'mb-6 flex flex-wrap gap-2'
            : 'flex border-b border-gray-200 dark:border-gray-700'
        }
      >
        {validChildren.map((child) => {
          const { value, label } = child.props

          if (hideSelfHostTab && (value as string).startsWith('self-host')) return null
          return (
            <button
              key={value as string}
              data-tab-value={value}
              className={
                isPill
                  ? `rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                      activeTab === value
                        ? 'bg-signoz_robin-500 text-white shadow-sm dark:bg-signoz_robin-400'
                        : 'border-signoz_vanilla-300 bg-signoz_vanilla-100 text-signoz_ink-200 hover:border-signoz_robin-400 hover:text-signoz_ink-100 dark:border-signoz_ink-200 dark:bg-signoz_ink-400 dark:text-signoz_vanilla-200 dark:hover:text-white'
                    }`
                  : `border-b-2 px-4 py-2 text-sm font-medium focus:outline-none ${
                      activeTab === value
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
                    }`
              }
              onClick={() => handleTabChange(value as string)}
            >
              {label}
            </button>
          )
        })}
      </div>
      <div className="mt-4">
        {validChildren.map((child) => {
          if (hideSelfHostTab && (child.props.value as string).startsWith('self-host')) {
            return null
          }

          const isActive = child.props.value === activeTab
          return (
            <div
              key={child.props.value as string}
              data-tab-value={child.props.value}
              hidden={!isActive}
            >
              {child.props.children}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Tabs
