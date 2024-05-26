import React from 'react';

const GitHubUserGrid = ({ contributors }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {contributors.map((contributor, index) => (
        <a
          key={index}
          href={contributor.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-gray-800 text-white rounded-lg p-4 shadow-md hover:bg-gray-700 transition-colors duration-200"
          style={{ maxWidth: '400px', maxHeight:'100px', textDecoration: 'none' }}
        >
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={contributor.imageUrl}
            alt={contributor.username}
          />
          <div className="ml-4">
            <p className=" text-white font-semibold">
              {contributor.name} <span className="text-gray-400">(@{contributor.username})</span>
            </p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default GitHubUserGrid;
