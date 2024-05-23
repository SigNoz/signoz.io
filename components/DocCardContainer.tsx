import React from 'react';

interface CardContainerProps {
  children: React.ReactNode;
}

const DocCardContainer: React.FC<CardContainerProps> = ({ children }) => {
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {children}
    </div>
  );
};

export default DocCardContainer;
