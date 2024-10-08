"use client"; // To ensure client-side interactivity

import React, { useState } from 'react';
import { ClipboardIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import dashboards from './dashboards-list.json'; // Importing the dashboards list from the local JSON file

// Use environment variables for API URL and path
const API_URL = process.env.NEXT_PUBLIC_SIGNOZ_CMS_API_URL;
const DASHBOARD_API_PATH = process.env.NEXT_PUBLIC_SIGNOZ_CMS_DASHBOARD_PATH;

// Function to send search query to Strapi (Dashboard Search collection type)
const logSearchQueryToStrapi = async (query) => {
  try {
    const response = await fetch(`${API_URL}${DASHBOARD_API_PATH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: { 
          query, 
          timestamp: new Date().toISOString() 
        },
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to log search query');
    }
    console.log('Search query logged successfully in Strapi');
  } catch (error) {
    console.error('Error logging search query:', error);
  }
};

const Dashboards = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState<string | null>(null);
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string | null }>({});
  const [hasLogged, setHasLogged] = useState(false); // Track whether the search has already been logged

  const filteredDashboards = dashboards.filter((dashboard) =>
    dashboard.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to log search query when user presses "Enter" or input loses focus
  const handleSearchSubmit = (event) => {
    if ((event.key === 'Enter' || event.type === 'blur') && !hasLogged) {
      if (searchQuery.trim()) {
        logSearchQueryToStrapi(searchQuery);
        setHasLogged(true); // Set flag to true after logging the query
      }
    }
  };

  // Reset the logged state when the search query changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setHasLogged(false); // Allow logging again when the search query changes
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-black-900">
      {/* Page Heading with Request Button */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-left">
          <h1 className="text-4xl font-bold text-white mb-2">SigNoz Dashboards</h1>
          <p className="text-lg text-gray-400">
            Browse a collection of pre-built SigNoz dashboards designed to monitor and gain insights about your infrastructure.
          </p>
        </div>
        <div>
          <a
            href="https://github.com/SigNoz/dashboards/issues/new"
            target="_blank"
            className="bg-gray-600 hover:bg-gray-500 text-gray-300 font-semibold py-2 px-4 rounded-lg text-sm transition-colors duration-200 ease-in-out border border-gray-500"
          >
            Request a Dashboard
          </a>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8 text-center">
        <input
          type="text"
          placeholder="Search dashboards"
          className="w-full max-w-lg p-3 rounded-lg border border-gray-700 bg-gray-800 text-gray-300 placeholder-gray-500"
          value={searchQuery}
          onChange={handleSearchChange} // Track the search query
          onKeyDown={handleSearchSubmit} // Log search query when pressing "Enter"
          onBlur={handleSearchSubmit} // Log search query when the input loses focus
        />
      </div>

      {/* Notification */}
      {notification && (
        <div className="mb-6 p-4 text-center text-green-500 bg-gray-800 rounded-lg">
          {notification}
        </div>
      )}

      {/* Conditional Rendering for No Dashboards Found */}
      {filteredDashboards.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-8">
          <div className="p-6 border border-gray-700 bg-gray-800 text-center rounded-lg">
            <p className="text-xl font-semibold text-white mb-4">
              No Dashboard Found
            </p>
            <p className="text-gray-400 mb-6">
              You can create an issue to request a new dashboard on our{' '}
              <a
                href="https://github.com/SigNoz/dashboards/issues/new"
                target="_blank"
                className="text-blue-500 hover:text-blue-400"
              >
                GitHub repository
              </a>.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDashboards.map((dashboard) => (
            <div
              key={dashboard.id}
              className="relative bg-gray-900 border border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-6 flex flex-col justify-between min-h-[250px]"
            >
              {/* Dashboard Title */}
              <h2 className="text-2xl font-semibold mb-4 text-white">{dashboard.name}</h2>
              
              {/* Dashboard Description */}
              <p className="text-base text-gray-400 mb-6 flex-grow">{dashboard.description}</p>

              {/* Error Message */}
              {errorMessages[dashboard.id] && (
                <p className="text-sm text-red-500 mb-4">{errorMessages[dashboard.id]}</p>
              )}

              {/* Icon Group */}
              <div className="flex justify-end space-x-4 mt-auto">
                {/* Download Button */}
                <div className="group relative">
                  <button
                    className="bg-blue-700 hover:bg-blue-600 text-white font-semibold py-1 px-1 rounded-lg transition-colors duration-200 ease-in-out flex items-center space-x-2"
                    onClick={() => downloadJSON(dashboard.jsonUrl, `${dashboard.name}.json`, (message) => handleSetErrorMessage(dashboard.id, message))}
                  >
                    <ArrowDownTrayIcon className="h-6 w-6 text-white" />
                  </button>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    Download JSON
                  </span>
                </div>

                {/* Copy to Clipboard Button */}
                <div className="group relative">
                  <button
                    className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-1 px-1 rounded-lg transition-colors duration-200 ease-in-out flex items-center space-x-2"
                    onClick={() => copyJSONToClipboard(dashboard.jsonUrl, setNotification, (message) => handleSetErrorMessage(dashboard.id, message))}
                  >
                    <ClipboardIcon className="h-6 w-6 text-white" />
                  </button>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    Copy JSON
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboards;
