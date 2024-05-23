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
      className="block rounded overflow-hidden shadow-lg p-6 bg-white dark:bg-gray-800 transform transition-transform hover:scale-105 no-underline w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3"
      style={{ textDecoration: 'none' }}
    >
      <div className="font-bold text-xl mb-2 text-gray-900 dark:text-gray-100">
        {title}
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-base">
        {description}
      </p>
    </a>
  );
};

export default DocCard;
