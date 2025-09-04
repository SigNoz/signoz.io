'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { QUERY_PARAMS } from '@/constants/queryParams'
import { ONBOARDING_SOURCE } from '@/constants/globals'
const Tabs = ({ children, entityName }) => {
  const searchParams = useSearchParams()

  const environment = searchParams.get(QUERY_PARAMS.ENVIRONMENT)
  const source = searchParams.get(QUERY_PARAMS.SOURCE)

  // Ensure children is always an array
  const childrenArray = React.Children.toArray(children)

  // Type guard to check if the element is a valid React element
  const isValidElement = (element: any): element is React.ReactElement => {
    return React.isValidElement(element)
  }

  const firstValidChild = childrenArray.find(isValidElement)
  const defaultChild = childrenArray.find((child): child is React.ReactElement => 
    isValidElement(child) && child.props.default
  )
  const defaultActiveTab = (defaultChild?.props.value || defaultChild?.props.label) ?? (firstValidChild?.props.value || firstValidChild?.props.label) ?? null
  
  let selectedTab
  if (entityName === 'plans') {
    selectedTab = defaultActiveTab
  } else if (environment && childrenArray.some((child): child is React.ReactElement => 
    isValidElement(child) && (child.props.value || child.props.label) === environment
  )) {
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
  const hideSelfHostTab = source === ONBOARDING_SOURCE && entityName === 'plans'

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {childrenArray.map((child) => {
          if (!isValidElement(child)) return null
          const { value, label } = child.props
          const tabValue = value || label

          if (hideSelfHostTab && tabValue === 'self-host') return null
          return (
            <button
              key={tabValue}
              className={`px-4 py-2 text-sm font-medium focus:outline-none ${
                activeTab === tabValue
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab(tabValue)}
            >
              {label}
            </button>
          )
        })}
      </div>
      <div className="p-4">
        {childrenArray.map((child) => {
          if (!isValidElement(child) || (hideSelfHostTab && (child.props.value || child.props.label) === 'self-host')) {
            return null
          }

          if ((child.props.value || child.props.label) === activeTab)
            return <div key={(child.props.value || child.props.label)}>{child.props.children}</div>
          return null
        })}
      </div>
    </div>
  )
}

export default Tabs