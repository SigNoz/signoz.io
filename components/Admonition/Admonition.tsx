import React from 'react';
import './Admonition.styles.css'; // This will be our CSS file for styling the component

const Admonition = ({ type, title, children }) => {
  return (
    <div className={`admonition admonition-${type}`}>
      <div className="admonition-header">
        <span className="admonition-icon">{getIcon(type)}</span>
        <span className="admonition-title">{title}</span>
      </div>
      <div className="admonition-content">
        {children}
      </div>
    </div>
  );
};

const getIcon = (type) => {
  switch(type) {
    case 'note':
      return '📝';
    case 'tip':
      return '💡';
    case 'warning':
      return '⚠️';
    case 'danger':
      return '❗';
    default:
      return 'ℹ️';
  }
};

export default Admonition;
