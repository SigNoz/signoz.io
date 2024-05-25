'use client'

import React, { useState } from 'react';

const figure = ({ children, ...props }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div>
      {isZoomed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleImageClick}>
          <div className="relative">
            {React.Children.map(children, (child) =>
              child.type === 'img' ? React.cloneElement(child, {
                className: 'max-w-full max-h-full shadow-lg transform transition-transform duration-300 ease-in-out scale-110 cursor-zoom-out',
                onClick: handleImageClick,
              }) : child
            )}
          </div>
        </div>
      )}
      <figure {...props} className="cursor-pointer">
        {React.Children.map(children, (child) =>
          child.type === 'img' ? React.cloneElement(child, {
            className: `shadow-lg transition-transform duration-300 ease-in-out ${isZoomed ? 'scale-110' : ''}`,
            onClick: handleImageClick,
          }) : child
        )}
      </figure>
    </div>
  );
};

export default figure;
