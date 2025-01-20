'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface TabsProps {
  children: React.ReactNode
  level?: string
}

const Tabs = ({ children, level = 'primary' }: TabsProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Ensure children is always an array
  const childrenArray = React.Children.toArray(children)

  // Type guard to check if the element is a valid React element
  const isValidElement = (element: any): element is React.ReactElement => {
    return React.isValidElement(element)
  }

  // Get initial active tab from URL or first valid child
  const getInitialActiveTab = () => {
    const tabFromUrl = searchParams.get(`tab_${level}`)
    if (
      tabFromUrl &&
      childrenArray.some((child) => isValidElement(child) && child.props.value === tabFromUrl)
    ) {
      return tabFromUrl
    }
    const firstValidChild = childrenArray.find(isValidElement)
    return firstValidChild ? firstValidChild.props.value : null
  }

  const [activeTab, setActiveTab] = useState(getInitialActiveTab)

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(`tab_${level}`, value)
    router.push(`?${params.toString()}`, { scroll: false })
    setActiveTab(value)
  }

  // Update active tab when URL changes
  useEffect(() => {
    const tabFromUrl = searchParams.get(`tab_${level}`)
    if (
      tabFromUrl &&
      childrenArray.some((child) => isValidElement(child) && child.props.value === tabFromUrl)
    ) {
      setActiveTab(tabFromUrl)
    }
  }, [searchParams, level, childrenArray])

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {childrenArray.map((child) => {
          if (!isValidElement(child)) return null
          const { value, label } = child.props
          return (
            <button
              key={value}
              className={`px-4 py-2 text-sm font-medium focus:outline-none ${
                activeTab === value
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
              onClick={() => handleTabChange(value)}
            >
              {label}
            </button>
          )
        })}
      </div>
      <div className="p-4">
        {childrenArray.map((child) => {
          if (!isValidElement(child)) return null
          if (child.props.value === activeTab)
            return <div key={child.props.value}>{child.props.children}</div>
          return null
        })}
      </div>
    </div>
  )
}

export default Tabs
