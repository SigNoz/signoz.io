'use client'

import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { TabsRoot, TabsList, TabsTrigger } from '@signozhq/ui/tabs'
import { useSearchParamsState } from '@/hooks/useSearchParamsState'
import { isDocsOnboardingPathname } from '@/utils/docs/onboardingPath'
import type { TabItemProps } from './TabItem'
import styles from './Tabs.module.css'

const PILLS_THRESHOLD = 6

interface TabsProps {
  children: React.ReactNode
  entityName?: string
  variant?: 'default' | 'pill'
  className?: string
  segmented?: boolean
  layout?: 'auto' | 'tabs' | 'pills'
}

// Segmented button bar look for DS secondary tabs, shared with
// TroubleshootingWizard's SegmentedControl. Pairs with styles.segmented.
export const segmentedTabVars = (size: 'default' | 'small' = 'default'): React.CSSProperties =>
  ({
    '--tab-list-wrapper-secondary-padding-left': '0px',
    '--tab-trigger-secondary-padding': `var(--spacing-5, 10px) ${
      size === 'small' ? 'var(--spacing-6, 12px)' : 'var(--spacing-12, 24px)'
    }`,
    '--tab-trigger-secondary-font-size': 'var(--periscope-font-size-small, 11px)',
    '--tab-trigger-secondary-gap': 'var(--spacing-3, 6px)',
    /* Bar border lives on the wrapper (Tabs.module.css); no per-cell borders */
    '--tab-trigger-secondary-border-width': '0px',
    /* Border-radius rounds the active cell bg even at 0 border width */
    '--tab-trigger-secondary-border-radius': '0px',
    '--tab-trigger-secondary-bg': 'transparent',
    '--tab-trigger-secondary-active-bg': 'var(--l3-background-60)',
    '--tab-text-color': 'var(--l2-foreground)',
    /* DS fallbacks for hover/active text are broken (missing inner var()) */
    '--tab-hover-text-color': 'var(--l1-foreground-hover)',
    '--tab-active-text-color': 'var(--l1-foreground-hover)',
  }) as React.CSSProperties

const Tabs = ({
  children,
  entityName,
  variant = 'default',
  className,
  segmented = false,
  layout = 'auto',
}: TabsProps) => {
  const searchParams = useSearchParamsState()
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

  const resolvedFromUrl = useMemo((): string | null => {
    if (urlKey) {
      const urlValue = searchParams.get(urlKey)
      if (urlValue && tabValuesSet.has(urlValue)) return urlValue
    }
    return null
  }, [urlKey, searchParams, tabValuesSet])

  const [override, setOverride] = useState<string | null>(null)

  useEffect(() => {
    if (!urlKey) return
    if (override !== null && resolvedFromUrl === override) {
      setOverride(null)
    }
  }, [urlKey, resolvedFromUrl, override])

  const activeTab = override ?? resolvedFromUrl ?? defaultActiveTab

  const handleTabChange = useCallback(
    (value: string) => {
      setOverride(value)

      if (!urlKey) return

      const current = new URLSearchParams(window.location.search)
      current.set(urlKey, value)
      const query = current.toString()
      const next = `${pathname}${query ? `?${query}` : ''}${window.location.hash}`
      window.history.replaceState(window.history.state, '', next)
    },
    [urlKey, pathname]
  )

  const isOnboarding = isDocsOnboardingPathname(pathname)
  const hideSelfHostTab = isOnboarding && entityName === 'plans'

  const dsVariant = variant === 'pill' ? 'primary' : 'secondary'
  const isSegmented = segmented && variant !== 'pill'

  const segmentedVars = isSegmented ? segmentedTabVars() : {}

  const visibleChildren = validChildren.filter((child) => {
    if (hideSelfHostTab && (child.props.value as string).startsWith('self-host')) {
      return false
    }
    return true
  })

  const usePills =
    layout === 'pills' || (layout === 'auto' && visibleChildren.length >= PILLS_THRESHOLD)

  const panels = (
    <div data-tab-panels="" className="[&>[data-tab-value]>*:first-child]:mt-0">
      {visibleChildren.map((child) => {
        const isActive = child.props.value === activeTab
        const { value, label } = child.props
        return (
          <div
            key={value as string}
            data-tab-value={value}
            hidden={!isActive}
            role={usePills ? 'region' : undefined}
            aria-label={
              usePills ? (typeof label === 'string' ? label : (value as string)) : undefined
            }
          >
            {child.props.children}
          </div>
        )
      })}
    </div>
  )

  if (usePills) {
    return (
      <div data-tabs-root="" className={className || 'w-full'}>
        <div className="mb-3 flex flex-wrap gap-2">
          {visibleChildren.map((child) => {
            const value = child.props.value as string
            const isActive = value === activeTab
            return (
              <button
                key={value}
                type="button"
                data-tab-value={value}
                aria-pressed={isActive}
                onClick={() => handleTabChange(value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)] ${
                  isActive
                    ? 'bg-[var(--primary-background)] text-[var(--primary-foreground)]'
                    : 'bg-[var(--l3-background)] text-[var(--l2-foreground)] hover:bg-[var(--l3-background-hover)]'
                }`}
              >
                {child.props.label}
              </button>
            )
          })}
        </div>
        {panels}
      </div>
    )
  }

  return (
    <TabsRoot
      className={`${styles.root} ${isSegmented ? styles.segmented : ''} ${
        className || 'w-full'
      } [&>div:first-child]:overflow-x-auto`}
      data-tabs-root=""
      value={activeTab ?? undefined}
      onValueChange={handleTabChange}
      activationMode="manual"
      style={
        {
          '--tab-list-wrapper-secondary-padding-left': '0px',
          /* Short left gutter stub (faded in Tabs.module.css) */
          '--tab-border-spacer-min-width': 'var(--spacing-5)',
          '--tab-gap': 'var(--spacing-6, 12px)',
          ...segmentedVars,
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
              } as Record<string, unknown>)}
            >
              {label}
            </TabsTrigger>
          )
        })}
      </TabsList>
      {panels}
    </TabsRoot>
  )
}

export default Tabs
