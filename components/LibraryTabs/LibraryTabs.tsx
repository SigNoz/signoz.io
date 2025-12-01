'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import type { LibraryTabProps } from './LibraryTab'

interface LibraryTabsProps {
  children: React.ReactNode
  defaultCategory?: string
  defaultLibrary?: string
  showAllCategory?: boolean
  categoryLabels?: Record<string, string>
  className?: string
}

interface ResolvedTab extends LibraryTabProps {
  content: React.ReactNode
}

const defaultCategoryLabel = (category: string) => category

const getTabsFromChildren = (children: React.ReactNode): ResolvedTab[] => {
  const childArray = React.Children.toArray(children)
  return childArray
    .filter((child): child is React.ReactElement<LibraryTabProps> => React.isValidElement(child))
    .map((child) => ({
      value: child.props.value,
      label: child.props.label,
      category: child.props.category,
      content: child.props.children,
      children: child.props.children,
    }))
}

export default function LibraryTabs({
  children,
  defaultCategory = 'all',
  defaultLibrary,
  showAllCategory = true,
  categoryLabels = {},
  className = '',
}: LibraryTabsProps) {
  const tabs = useMemo(() => getTabsFromChildren(children), [children])

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(tabs.map((tab) => tab.category)))
    return showAllCategory ? ['all', ...uniqueCategories] : uniqueCategories
  }, [tabs, showAllCategory])

  const initialCategory = categories.length
    ? categories.includes(defaultCategory)
      ? defaultCategory
      : categories[0]
    : defaultCategory

  const getFilteredTabs = useCallback(
    (category: string) =>
      category === 'all' ? tabs : tabs.filter((tab) => tab.category === category),
    [tabs]
  )

  const resolveInitialLibrary = (category: string) => {
    const initialTabs = getFilteredTabs(category)

    if (defaultLibrary) {
      const match =
        initialTabs.find((tab) => tab.value === defaultLibrary) ||
        tabs.find((tab) => tab.value === defaultLibrary)
      if (match) {
        return match.value
      }
    }

    return initialTabs[0]?.value || tabs[0]?.value || ''
  }

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory)
  const [activeLibrary, setActiveLibrary] = useState<string>(resolveInitialLibrary(initialCategory))

  const filteredTabs = useMemo(
    () => getFilteredTabs(activeCategory),
    [getFilteredTabs, activeCategory]
  )

  useEffect(() => {
    if (filteredTabs.length === 0) {
      const fallbackCategory = categories[0] ?? 'all'
      setActiveCategory(fallbackCategory)
      return
    }

    if (!filteredTabs.some((tab) => tab.value === activeLibrary)) {
      setActiveLibrary(filteredTabs[0].value)
    }
  }, [filteredTabs, activeCategory, activeLibrary, categories, showAllCategory])

  if (tabs.length === 0) {
    return null
  }

  const activeTab = filteredTabs.find((tab) => tab.value === activeLibrary) ?? filteredTabs[0]
  const resolveCategoryLabel = (category: string) =>
    category === 'all' ? 'All' : (categoryLabels[category] ?? defaultCategoryLabel(category))

  return (
    <div className={className}>
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            aria-current={activeCategory === category ? 'true' : undefined}
            className={`inline-block rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              activeCategory === category
                ? 'bg-signoz_robin-500 text-white shadow-sm dark:bg-signoz_robin-400'
                : 'border border-signoz_vanilla-300 bg-signoz_vanilla-100 text-signoz_ink-200 hover:border-signoz_robin-400 hover:text-signoz_ink-100 dark:border-signoz_ink-200 dark:bg-signoz_ink-400 dark:text-signoz_vanilla-200 dark:hover:text-white'
            }`}
          >
            {resolveCategoryLabel(category)}
          </button>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {filteredTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveLibrary(tab.value)}
            aria-current={activeLibrary === tab.value ? 'true' : undefined}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              activeLibrary === tab.value
                ? 'bg-signoz_robin-50 border-signoz_robin-500 text-signoz_robin-600 dark:border-signoz_robin-300 dark:bg-signoz_robin-300/20 dark:text-white'
                : 'border-signoz_vanilla-300 bg-white text-signoz_ink-200 hover:border-signoz_robin-400 hover:text-signoz_ink-100 dark:border-signoz_ink-300 dark:bg-signoz_ink-400 dark:text-signoz_vanilla-200 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab ? (
        <div className="rounded-2xl border border-signoz_vanilla-400 bg-signoz_vanilla-100 p-6 shadow-sm dark:border-signoz_ink-200 dark:bg-signoz_ink-400">
          <div className="mb-4 flex flex-col gap-2">
            <p className="m-0 text-xs font-semibold uppercase tracking-wide text-signoz_robin-500 dark:text-signoz_robin-300">
              {resolveCategoryLabel(activeTab.category)}
            </p>
            <h3 className="m-0 text-2xl font-semibold text-signoz_ink-200 dark:text-white">
              {activeTab.label}
            </h3>
          </div>

          <div className="space-y-6 [&>*:first-child]:mt-0 [&_code]:text-inherit [&_p]:text-base [&_p]:text-signoz_ink-200 dark:[&_p]:text-signoz_vanilla-200 [&_pre]:mt-0 [&_pre]:rounded-xl [&_pre]:border-none [&_pre]:bg-[rgba(103,103,126,0.323)] [&_pre]:text-signoz_vanilla-100">
            {activeTab.content}
          </div>
        </div>
      ) : null}
    </div>
  )
}
