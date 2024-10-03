"use client"; // To ensure client-side interactivity

import React, { useState, useEffect } from 'react';
import { ClipboardIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import dashboards from './dashboards-list.json'; // Importing the dashboards list from the local JSON file

// Function to check if the JSON exists by making a HEAD request
const checkJSONExists = async (url: string) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error("Error checking JSON existence:", error);
    return false;
  }
};

// Function to fetch the JSON and trigger download
const downloadJSON = async (url: string, filename: string, setError: (message: string | null) => void) => {
  const jsonExists = await checkJSONExists(url);

  if (!jsonExists) {
    setError("JSON doesn't exist for this dashboard.");
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
    setError(null); // Clear the error message
  } catch (error) {
    console.error('Error downloading the JSON file:', error);
  }
};

// Function to fetch and copy the JSON to clipboard
const copyJSONToClipboard = async (url: string, setNotification: (message: string | null) => void, setError: (message: string | null) => void) => {
  const jsonExists = await checkJSONExists(url);

  if (!jsonExists) {
    setError("JSON doesn't exist for this dashboard.");
    return;
  }

  try {
    const response = await fetch(url);
    const json = await response.json(); // Fetch the JSON data as text

    // Copy JSON to clipboard
    await navigator.clipboard.writeText(JSON.stringify(json, null, 2)); // Indent JSON for better readability in clipboard

    // Show a notification instead of an alert
    setNotification("JSON copied to clipboard!");
    setTimeout(() => setNotification(null), 2000); // Clear notification after 2 seconds
    setError(null); // Clear the error message
  } catch (error) {
    console.error('Error copying JSON:', error);
  }
};

const Dashboards = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState<string | null>(null);
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string | null }>({}); // Track errors for each dashboard

  const filteredDashboards = dashboards.filter((dashboard) =>
    dashboard.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSetErrorMessage = (id: number, message: string | null) => {
    setErrorMessages((prev) => ({ ...prev, [id]: message }));
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-black-900">
      {/* Page Heading with Request Button */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-left">
          <h1 className="text-4xl font-bold text-white mb-2">SigNoz Dashboards</h1>
          <p className="text-lg text-gray-400">
            Browse a collection of pre-built SigNoz dashboards designed to monitor and gain insights about your infrastructure
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
          onChange={(e) => setSearchQuery(e.target.value)}
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
