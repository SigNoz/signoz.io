import React from 'react'

const TabItem = ({ value, label, children, tabId }) => {
  return (
    <div value={value} label={label} tabId={tabId || value}>
      {children}
    </div>
  )
}

export default TabItem
