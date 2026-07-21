'use client'

import React, { useState, useCallback, useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { TabsRoot, TabsList, TabsTrigger } from '@signozhq/ui/tabs'
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

  const [activeTab, setActiveTab] = useState(resolveActiveTab)

  const resolvedTab = resolveActiveTab()
  React.useEffect(() => {
    if (urlKey && resolvedTab) {
      setActiveTab(resolvedTab)
    }
  }, [urlKey, resolvedTab])

  const handleTabChange = useCallback(
    (value: string) => {
      setActiveTab(value)

      if (!urlKey) return

      const current = new URLSearchParams(Array.from(searchParams.entries()))
      current.set(urlKey, value)
      router.replace(`${pathname}?${current.toString()}`, { scroll: false })
    },
    [urlKey, searchParams, router, pathname]
  )

  const isOnboarding = isDocsOnboardingPathname(pathname)
  const hideSelfHostTab = isOnboarding && entityName === 'plans'

  // Site `default` → DS secondary (underline); site `pill` → DS primary (segmented)
  const dsVariant = variant === 'pill' ? 'primary' : 'secondary'

  const visibleChildren = validChildren.filter((child) => {
    if (hideSelfHostTab && (child.props.value as string).startsWith('self-host')) {
      return false
    }
    return true
  })

  return (
    <TabsRoot
      className={className || 'w-full'}
      data-tabs-root=""
      value={activeTab ?? undefined}
      onValueChange={handleTabChange}
      style={
        {
          '--tab-list-wrapper-secondary-padding-left': '0px',
          '--tab-border-spacer-min-width': '0px',
        } as React.CSSProperties
      }
    >
      <TabsList variant={dsVariant}>
        {visibleChildren.map((child) => {
          const { value, label } = child.props
          return (
            <TabsTrigger
              key={value as string}
              value={value as string}
              variant={dsVariant}
              {...({
                'data-tab-value': value as string,
                onClick: () => handleTabChange(value as string),
              } as Record<string, unknown>)}
            >
              {label}
            </TabsTrigger>
          )
        })}
      </TabsList>
      <div className="mt-4">
        {visibleChildren.map((child) => {
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
    </TabsRoot>
  )
}

export default Tabs
