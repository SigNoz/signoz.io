'use client'

import React from 'react'

export interface TabItemProps {
  value: string
  label: React.ReactNode
  default?: boolean
  children?: React.ReactNode
}

const TabItem = ({ children }: TabItemProps) => {
  return <>{children}</>
}

export default TabItem
