'use client'

import React, { useState } from 'react';

const Tabs = ({ children }) => {
  // Ensure children is always an array
  const childrenArray = React.Children.toArray(children);
  
  // Type guard to check if the element is a valid React element
  const isValidElement = (element: any): element is React.ReactElement => {
    return React.isValidElement(element);
  };

  // Find the first valid React element to set as the initial active tab
  const firstValidChild = childrenArray.find(isValidElement);
  const initialActiveTab = firstValidChild ? firstValidChild.props.value : null;
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {childrenArray.map((child) => {
          if (!isValidElement(child)) return null;
          const { value, label } = child.props;
          return (
            <button
              key={value}
              className={`px-4 py-2 text-sm font-medium focus:outline-none ${
                activeTab === value
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab(value)}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="p-4">
        {childrenArray.map((child) => {
          if (!isValidElement(child)) return null;
          if (child.props.value === activeTab) return <div key={child.props.value}>{child.props.children}</div>;
          return null;
        })}
      </div>
    </div>
  );
};

export default Tabs;