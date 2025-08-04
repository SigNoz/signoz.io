'use client'

import React, { useState, Suspense, isValidElement } from 'react'
import { useSearchParams } from 'next/navigation'
import { QUERY_PARAMS } from '@/constants/queryParams'
import { ONBOARDING_SOURCE } from '@/constants/globals'

const TabsStaticContent = ({ hideSelfHostTab, childrenArray, selectedTab, setActiveTab, isValidElement }: { hideSelfHostTab: boolean, childrenArray: React.ReactElement[], selectedTab: string, setActiveTab: (tab: string) => void, isValidElement: (element: any) => boolean | undefined }) => {
  return (
    <div className="w-full">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {childrenArray.map((child: React.ReactElement) => {
          if (!isValidElement(child)) return null
          const { value, label } = child.props as any

          if (hideSelfHostTab && value === 'self-host') return null
          return (
            <button
              key={value}
              className={`px-4 py-2 text-sm font-medium focus:outline-none ${
                selectedTab === value
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
              onClick={() => (setActiveTab ?? (() => {}))?.(value)}
            >
              {label}
            </button>
          )
        })}
      </div>
      <div className="p-4">
        {childrenArray.map((child: React.ReactElement) => {
          if (!isValidElement(child) || (hideSelfHostTab && (child.props as any).value === 'self-host')) {
            return null
          }

          if ((child.props as any).value === selectedTab)
            return <div key={(child.props as any).value}>{(child.props as any).children}</div>
          return null
        })}
      </div>
    </div>
  )
}

const TabsContent = ({ children, entityName, initialActiveTab }) => {
  const searchParams = useSearchParams()

  const environment = searchParams.get(QUERY_PARAMS.ENVIRONMENT)
  const source = searchParams.get(QUERY_PARAMS.SOURCE)

  const selectedTab = entityName === 'plans' ? initialActiveTab : environment || initialActiveTab

  // Ensure children is always an array
  const childrenArray = React.Children.toArray(children)
  
  const [activeTab, setActiveTab] = useState(selectedTab)
  const hideSelfHostTab = source === ONBOARDING_SOURCE && entityName === 'plans'

  return (
    <TabsStaticContent hideSelfHostTab={hideSelfHostTab} childrenArray={childrenArray as React.ReactElement[]} selectedTab={activeTab} setActiveTab={setActiveTab} isValidElement={isValidElement} />
  )
}

export default function Tabs(props) {
  const childrenArray = React.Children.toArray(props?.children) as React.ReactElement[]

  // Type guard to check if the element is a valid React element
  const isValidElement = (element: any): element is React.ReactElement => {
    return React.isValidElement(element)
  }

  const firstValidChild = childrenArray.find(isValidElement)
  const initialActiveTab = firstValidChild ? (firstValidChild.props as any).value : null
  
  return (
    <Suspense fallback={<TabsStaticContent hideSelfHostTab={false} childrenArray={childrenArray} selectedTab={initialActiveTab} setActiveTab={() => {}} isValidElement={isValidElement} />}>
      <TabsContent {...props} initialActiveTab={initialActiveTab} />
    </Suspense>
  )
}
