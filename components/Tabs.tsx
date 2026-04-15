'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { QUERY_PARAMS } from '@/constants/queryParams'
import { isDocsOnboardingPathname } from '@/utils/docs/onboardingPath'
import { useBrowserSearch } from '@/hooks/useBrowserSearch'

const Tabs = ({ children, entityName }) => {
  const pathname = usePathname()
  const search = useBrowserSearch()
  const isOnboarding = isDocsOnboardingPathname(pathname)
  const searchParams = new URLSearchParams(search)

  const environment = searchParams.get(QUERY_PARAMS.ENVIRONMENT)

  // Ensure children is always an array
  const childrenArray = React.Children.toArray(children)

  // Type guard to check if the element is a valid React element
  const isValidElement = (element: any): element is React.ReactElement => {
    return React.isValidElement(element)
  }

  const firstValidChild = childrenArray.find(isValidElement)
  const defaultChild = childrenArray.find(
    (child): child is React.ReactElement => isValidElement(child) && child.props.default
  )
  const defaultActiveTab = defaultChild?.props.value ?? firstValidChild?.props.value ?? null

  let selectedTab
  if (entityName === 'plans') {
    selectedTab = defaultActiveTab
  } else if (
    environment &&
    childrenArray.some(
      (child): child is React.ReactElement =>
        isValidElement(child) && child.props.value === environment
    )
  ) {
    // If environment matches a tab value directly, use it
    selectedTab = environment
  } else if (environment) {
    // If environment is set but doesn't match any tab directly, use default tab
    selectedTab = defaultActiveTab
  } else {
    // No environment parameter, use default tab
    selectedTab = defaultActiveTab
  }
  const [activeTab, setActiveTab] = useState(selectedTab)
  const hideSelfHostTab = isOnboarding && entityName === 'plans'

  useEffect(() => {
    setActiveTab(selectedTab)
  }, [selectedTab])

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
              onClick={() => setActiveTab(value)}
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
