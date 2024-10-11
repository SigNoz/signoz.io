'use client'

import React, { useState } from 'react';

interface VerticalTabsProps {
  tabData: {
    [key: string]: React.ReactNode;
  };
}

const VerticalTabs: React.FC<VerticalTabsProps> = ({ tabData }) => {
  const [activeTab, setActiveTab] = useState(Object.keys(tabData)[0]);

  return (
    <div className="flex flex-row bg-gray-900 text-gray-100 rounded-lg shadow-lg overflow-hidden h-[500px]">
      <div className="w-1/4 bg-gray-800">
        <ul className="flex flex-col list-none p-0 m-0">
          {Object.keys(tabData).map((tabKey) => (
            <li
              key={tabKey}
              className={`cursor-pointer p-3 transition-colors duration-200 ${
                activeTab === tabKey ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab(tabKey)}
            >
              {tabKey}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 p-6 overflow-y-auto">
        {tabData[activeTab]}
      </div>
    </div>
  );
};

export default VerticalTabs;
