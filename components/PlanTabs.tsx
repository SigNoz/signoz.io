'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { QUERY_PARAMS } from '@/constants/queryParams'
import { ONBOARDING_SOURCE } from '@/constants/globals'
import Tabs from './Tabs'

const PlanTabs = ({ children, tabGroupId, defaultTab, tabIdArray }) => {
  const searchParams = useSearchParams()
  const source = searchParams.get(QUERY_PARAMS.SOURCE)

  // Ensure children is always an array
  const childrenArray = React.Children.toArray(children)

  // Type guard to check if the element is a valid React element
  const isValidElement = (element: any): element is React.ReactElement => {
    return React.isValidElement(element)
  }

  const hideSelfHostTab = source === ONBOARDING_SOURCE && tabGroupId === 'plans'

  const filteredChildrenArray = childrenArray.filter((child) => {
    if (!isValidElement(child)) return false
    const { tabId } = child.props
    if (hideSelfHostTab && tabId === 'self-host') return false
    return true
  })

//   console.log('uncaught PlanTabs', tabGroupId, defaultTab, tabIdArray)

  return (
    <Tabs
      tabGroupId={tabGroupId}
      defaultTab={defaultTab}
      tabIdArray={tabIdArray}
      useSearchParamForInitialTab={!(source === ONBOARDING_SOURCE && tabGroupId === 'plans')}
    >
      {filteredChildrenArray}
    </Tabs>
  )
}

export default PlanTabs
