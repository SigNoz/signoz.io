import React from 'react';

const Admonition = ({ type, title, children }) => {
  return (
    <div className={`admonition ${getAdmonitionStyles(type)}`}>
      <div className="flex items-center mb-2">
        <span className="mr-2 text-xl">{getIcon(type)}</span>
        <span className="font-bold text-white">{title}</span>
      </div>
      <div className="text-gray-300">
        {children}
      </div>
    </div>
  );
};

const getAdmonitionStyles = (type) => {
  switch(type) {
    case 'note':
      return 'border-l-4 border-blue-400 bg-blue-900 p-4';
    case 'tip':
      return 'border-l-4 border-green-400 bg-green-900 p-4';
    case 'warning':
      return 'border-l-4 border-yellow-400 bg-yellow-900 p-4';
    case 'danger':
      return 'border-l-4 border-red-400 bg-red-900 p-4';
    case 'info':
      return 'border-l-4 border-indigo-400 bg-indigo-900 p-4';
    default:
      return 'border-l-4 border-gray-400 bg-gray-900 p-4';
  }
};

const getIcon = (type) => {
  switch(type) {
    case 'tip':
      return '💡 Tip';
    case 'warning':
      return '⚠️ Warning';
    case 'danger':
      return '❗Danger';
    case 'info':
      return '✅ Info';
    default:
      return '📝 Note';
  }
};

export default Admonition;
