import React from 'react';

interface CardContainerProps {
  children: React.ReactNode;
}

const DocCardContainer: React.FC<CardContainerProps> = ({ children }) => {
  return (
    <div className="container mx-auto p-4 flex flex-wrap gap-10">
      {children}
    </div>
  );
};

export default DocCardContainer;
