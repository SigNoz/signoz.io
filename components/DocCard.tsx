import React from 'react';

interface CardProps {
  title: string;
  description: string;
  href: string;
}

const DocCard: React.FC<CardProps> = ({ title, description, href }) => {
  return (
    <a
      href={href}
      className="block rounded overflow-hidden shadow-lg  p-6 bg-gray-900 dark:bg-gray-800 border border-gray-700 hover:border-blue-500 transition-all duration-200 ease-in-out no-underline"
    >
      <div className="font-bold text-xl mb-2 text-white dark:text-gray-100">
        {title}
      </div>
      <p className="text-gray-400 dark:text-gray-300 text-base">
        {description}
      </p>
    </a>
  );
};

export default DocCard;
