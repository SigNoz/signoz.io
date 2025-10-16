import React from 'react';

const TabItem = ({ value, label, children }) => {
  return (
    <div value={value} label={label} data-tab-value={value}>
      {children}
    </div>
  )
}

export default TabItem;
