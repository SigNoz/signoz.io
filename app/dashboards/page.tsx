"use client"; // To ensure client-side interactivity

import React, { useState } from 'react';
import { ClipboardIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import dashboards from './dashboards-list.json'; // Importing the dashboards list from the local JSON file

// Accessing environment variables
const API_URL = process.env.NEXT_PUBLIC_SIGNOZ_CMS_API_URL;
const DASHBOARD_API_PATH = process.env.NEXT_PUBLIC_SIGNOZ_CMS_DASHBOARD_PATH;

// Function to send search query to Strapi (Dashboard Search collection type)
const logSearchQueryToStrapi = async (query: string) => {
  try {
    const response = await fetch(`${API_URL}${DASHBOARD_API_PATH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          query,
          timestamp: new Date().toISOString(),
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

// Function to check if the JSON exists by making a HEAD request
const checkJSONExists = async (url: string) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok; // Returns true if the file exists, false otherwise
  } catch (error) {
    console.error("Error checking JSON existence:", error);
    return false;
  }
};

// Function to fetch the JSON and trigger download
const downloadJSON = async (url: string, filename: string, setError: (message: string | null) => void) => {
  const jsonExists = await checkJSONExists(url); // Check if the file exists

  if (!jsonExists) {
    setError("JSON doesn't exist for this dashboard."); // If file doesn't exist, show error
    return;
  }

  try {
    const response = await fetch(url);
    const data = await response.blob(); // Fetch the data as a Blob (binary large object)
    const urlObject = window.URL.createObjectURL(data); // Create a URL for the Blob

    // Create an invisible download link
    const link = document.createElement('a');
    link.href = urlObject;
    link.download = filename;

    // Append the link to the document and trigger the click
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(urlObject);
    setError(null); // Clear the error message after successful download
  } catch (error) {
    console.error('Error downloading the JSON file:', error);
    setError('Error downloading the JSON file.');
  }
};

const Dashboards = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedNotification, setCopiedNotification] = useState<{ [key: string]: boolean }>({}); // Track which card has the copied notification
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

  const handleSetErrorMessage = (id: number, message: string | null) => {
    setErrorMessages((prev) => ({ ...prev, [id]: message }));
  };

  const copyJSONToClipboard = async (url: string, dashboardId: number) => {
    try {
      const response = await fetch(url);
      const json = await response.json();

      await navigator.clipboard.writeText(JSON.stringify(json, null, 2));
      setCopiedNotification((prev) => ({ ...prev, [dashboardId]: true })); // Set the notification for the relevant card
      setTimeout(() => setCopiedNotification((prev) => ({ ...prev, [dashboardId]: false })), 2000); // Clear notification after 2 seconds
    } catch (error) {
      handleSetErrorMessage(dashboardId, "JSON doesn't exists.");
    }
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
            href="https://github.com/SigNoz/dashboards/issues/new?template=dashboard_request_template.md"
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

      {/* Conditional Rendering for No Dashboards Found */}
      {filteredDashboards.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-8">
          <div className="p-6 border border-gray-700 bg-gray-800 text-center rounded-lg">
            <p className="text-xl font-semibold text-white mb-4">No Dashboard Found</p>
            <p className="text-gray-400 mb-6">
              You can create an issue to {' '}
              <a
                href="https://github.com/SigNoz/dashboards/issues/new?template=dashboard_request_template.md"
                target="_blank"
                className="text-blue-500 hover:text-blue-400"
              >
                request a dashboard
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
              <div className="flex justify-end space-x-4 mt-auto relative">
                {/* Download Button */}
                <div className="group relative">
                  <button
                    className="bg-blue-700 hover:bg-blue-600 text-white font-semibold py-1 px-1 rounded-lg transition-colors duration-200 ease-in-out flex items-center space-x-2"
                    onClick={() =>
                      downloadJSON(
                        dashboard.jsonUrl,
                        `${dashboard.name}.json`,
                        (message) => handleSetErrorMessage(dashboard.id, message)
                      )
                    }
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
                    onClick={() =>
                      copyJSONToClipboard(dashboard.jsonUrl, dashboard.id)
                    }
                  >
                    <ClipboardIcon className="h-6 w-6 text-white" />
                  </button>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    Copy JSON
                  </span>
                </div>

                {/* Copied Notification for specific card */}
                {copiedNotification[dashboard.id] && (
                  <p className="absolute -top-6 left-0 text-sm text-green-500 mt-2">JSON copied to clipboard!</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboards;
