'use client'

import React, { useState } from 'react';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.value);

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {children.map((child) => {
          const { value, label } = child.props;
          return (
            <button
              key={value}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === value
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab(value)}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="p-4">
        {children.map((child) => {
          if (child.props.value === activeTab) return <div key={child.props.value}>{child.props.children}</div>;
          return null;
        })}
      </div>
    </div>
  );
};

export default Tabs;
