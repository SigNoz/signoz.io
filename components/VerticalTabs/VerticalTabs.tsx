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
    <div className="flex flex-col md:flex-row bg-gray-900 text-gray-100 rounded-lg shadow-lg overflow-hidden h-auto md:h-[500px]">
      <div className="w-full md:w-1/4 bg-gray-800">
        <ul className="flex flex-row md:flex-col list-none p-0 m-0 overflow-x-auto md:overflow-x-visible">
          {Object.keys(tabData).map((tabKey) => (
            <li
              key={tabKey}
              className={`cursor-pointer my-0 p-3 transition-colors duration-200 whitespace-nowrap md:whitespace-normal ${
                activeTab === tabKey ? 'bg-blue-600 text-white w-full h-full' : 'hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab(tabKey)}
            >
              <div className="w-full h-full flex items-center justify-center">
                {tabKey}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full md:w-3/4 p-4 md:p-6 overflow-y-auto">
        {tabData[activeTab]}
      </div>
    </div>
  );
};

export default VerticalTabs;
