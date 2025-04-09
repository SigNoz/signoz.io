'use client'

import React from 'react'
import { useTabState } from '@/hooks/useTabState'

const Tabs = ({
  children,
  tabGroupId,
  defaultTab,
  tabIdArray,
  useSearchParamForInitialTab = true,
}) => {
  // console.log('uncaught tabs', tabGroupId, defaultTab, tabIdArray)
  // Ensure children is always an array
  const childrenArray = React.Children.toArray(children)

  // Type guard to check if the element is a valid React element
  const isValidElement = (element: any): element is React.ReactElement => {
    return React.isValidElement(element)
  }

  const [activeTabFromHook, setActiveTabFromHook] = useTabState(
    tabGroupId,
    defaultTab,
    tabIdArray,
    useSearchParamForInitialTab
  )

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {childrenArray.map((child) => {
          if (!isValidElement(child)) return null
          const { tabId, label } = child.props

          return (
            <button
              key={tabId}
              className={`px-4 py-2 text-sm font-medium focus:outline-none ${
                activeTabFromHook === tabId
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTabFromHook(tabId)}
            >
              {label}
            </button>
          )
        })}
      </div>
      <div className="p-4">
        {childrenArray.map((child) => {
          if (!isValidElement(child)) {
            return null
          }

          if (child.props.tabId === activeTabFromHook)
            return <div key={child.props.tabId}>{child.props.children}</div>
          return null
        })}
      </div>
    </div>
  )
}

export default Tabs
