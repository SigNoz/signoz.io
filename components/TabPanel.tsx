'use client'

import React from 'react'

interface TabPanelProps {
  value: string
  label: string
  children: React.ReactNode
}

const TabPanel: React.FC<TabPanelProps> = ({ value, label, children }) => {
  return (
    <div data-value={value} data-label={label}>
      {children}
    </div>
  )
}

export default TabPanel
