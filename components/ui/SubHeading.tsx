import React from "react";

const SubHeading = ({ children, className = "" }) => {
  return (
    <h3
      className={`font-heading text-lg font-normal text-gray-200 ${className}`}
    >
      {children}
    </h3>
  );
};

export default SubHeading;
