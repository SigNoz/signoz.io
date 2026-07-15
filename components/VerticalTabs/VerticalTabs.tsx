'use client'

import React, { useState } from 'react'

interface VerticalTabsProps {
  tabData: {
    [key: string]: React.ReactNode
  }
}

const VerticalTabs: React.FC<VerticalTabsProps> = ({ tabData }) => {
  const [activeTab, setActiveTab] = useState(Object.keys(tabData)[0])

  return (
    <div className="bg-card text-card-foreground border-border flex h-auto flex-col overflow-hidden rounded-lg border shadow-lg md:h-[500px] md:flex-row">
      <div className="bg-muted w-full md:w-1/4">
        <ul className="m-0 flex list-none flex-row overflow-x-auto p-0 md:flex-col md:overflow-x-visible">
          {Object.keys(tabData).map((tabKey) => (
            <li
              key={tabKey}
              className={`my-0 cursor-pointer p-3 whitespace-nowrap transition-colors duration-200 md:whitespace-normal ${
                activeTab === tabKey
                  ? 'bg-primary text-primary-foreground h-full w-full'
                  : 'hover:bg-accent'
              }`}
              onClick={() => setActiveTab(tabKey)}
            >
              <div className="flex h-full w-full items-center justify-center">{tabKey}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full overflow-y-auto p-4 md:w-3/4 md:p-6">{tabData[activeTab]}</div>
    </div>
  )
}

export default VerticalTabs
