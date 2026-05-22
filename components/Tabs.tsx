'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSearchParamsState } from '@/hooks/useSearchParamsState'
import { isDocsOnboardingPathname } from '@/utils/docs/onboardingPath'

const Tabs = ({ children, entityName }: { children: React.ReactNode; entityName?: string }) => {
  const searchParams = useSearchParamsState()
  const router = useRouter()
  const pathname = usePathname()

  type TabItemProps = {
    value: string
    label: React.ReactNode
    default?: boolean
    children?: React.ReactNode
  }
  const childrenArray = React.Children.toArray(children)

  const isValidElement = (element: unknown): element is React.ReactElement<TabItemProps> => {
    return React.isValidElement(element)
  }

  const validChildren = childrenArray.filter(isValidElement)

  const tabValuesKey = validChildren.map((child) => child.props.value).join(',')
  const tabValuesSet = useMemo(
    () => new Set(validChildren.map((child) => child.props.value as string)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tabValuesKey]
  )

  const defaultChild = validChildren.find((child) => child.props.default)
  const firstChild = validChildren[0]
  const defaultActiveTab = defaultChild?.props.value ?? firstChild?.props.value ?? null

  const urlKey = entityName && entityName !== 'plans' ? entityName : null

  const resolveActiveTab = useCallback((): string | null => {
    if (entityName === 'plans') return defaultActiveTab

    if (urlKey) {
      const urlValue = searchParams.get(urlKey)
      if (urlValue && tabValuesSet.has(urlValue)) return urlValue
    }

    return defaultActiveTab
  }, [urlKey, searchParams, tabValuesSet, defaultActiveTab, entityName])

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

  return (
    <div className="w-full" data-tabs-root>
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {childrenArray.map((child) => {
          if (!isValidElement(child)) return null
          const { value, label } = child.props

          if (hideSelfHostTab && value === 'self-host') return null
          return (
            <button
              key={value}
              data-tab-value={value}
              className={`border-b-2 px-4 py-2 text-sm font-medium focus:outline-none ${
                activeTab === value
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
              onClick={() => handleTabChange(value)}
            >
              {label}
            </button>
          )
        })}
      </div>
      <div className="mt-4">
        {childrenArray.map((child) => {
          if (!isValidElement(child) || (hideSelfHostTab && child.props.value === 'self-host')) {
            return null
          }

          const isActive = child.props.value === activeTab
          return (
            <div key={child.props.value} data-tab-value={child.props.value} hidden={!isActive}>
              {child.props.children}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Tabs
