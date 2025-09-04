import React from 'react';

const TabItem = ({ value, label, children, default: defaultProp }) => {
  return <div value={value} label={label} data-default={defaultProp}>{children}</div>;
};

export default TabItem;