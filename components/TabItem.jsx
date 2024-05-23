import React from 'react';

const TabItem = ({ value, label, children }) => {
  return <div value={value} label={label}>{children}</div>;
};

export default TabItem;
