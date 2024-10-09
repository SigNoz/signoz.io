"use client"; // To ensure client-side interactivity

import React, { useState } from 'react';
import { ClipboardIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import dashboards from './dashboards-list.json'; 

const API_URL = process.env.NEXT_PUBLIC_SIGNOZ_CMS_API_URL;
const DASHBOARD_API_PATH = process.env.NEXT_PUBLIC_SIGNOZ_CMS_DASHBOARD_PATH;

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

const checkJSONExists = async (url: string) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok; 
  } catch (error) {
    console.error("Error checking JSON existence:", error);
    return false;
  }
};

const downloadJSON = async (url: string, filename: string, setError: (message: string | null) => void) => {
  const jsonExists = await checkJSONExists(url); 

  if (!jsonExists) {
    setError("JSON doesn't exist for this dashboard."); 
    return;
  }

  try {
    const response = await fetch(url);
    const data = await response.blob(); 
    const urlObject = window.URL.createObjectURL(data); 

    
    const link = document.createElement('a');
    link.href = urlObject;
    link.download = filename;

    
    document.body.appendChild(link);
    link.click();

    
    document.body.removeChild(link);
    window.URL.revokeObjectURL(urlObject);
    setError(null); 
  } catch (error) {
    console.error('Error downloading the JSON file:', error);
    setError('Error downloading the JSON file.');
  }
};

const Dashboards = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedNotification, setCopiedNotification] = useState<{ [key: string]: boolean }>({}); 
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string | null }>({});
  const [hasLogged, setHasLogged] = useState(false); 

  const filteredDashboards = dashboards.filter((dashboard) =>
    dashboard.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchSubmit = (event) => {
    if ((event.key === 'Enter' || event.type === 'blur') && !hasLogged) {
      if (searchQuery.trim()) {
        logSearchQueryToStrapi(searchQuery);
        setHasLogged(true); 
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setHasLogged(false); 
  };

  const handleSetErrorMessage = (id: number, message: string | null) => {
    setErrorMessages((prev) => ({ ...prev, [id]: message }));
  };

  const copyJSONToClipboard = async (url: string, dashboardId: number) => {
    try {
      const response = await fetch(url);
      const json = await response.json();

      await navigator.clipboard.writeText(JSON.stringify(json, null, 2));
      setCopiedNotification((prev) => ({ ...prev, [dashboardId]: true })); 
      setTimeout(() => setCopiedNotification((prev) => ({ ...prev, [dashboardId]: false })), 2000); 
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
            href="https://github.com/SigNoz/signoz/issues/new?assignees=&labels=dashboard-template&p[…]s=&template=request_dashboard.md&title=%5BDashboard+Request%5D+"
            target="_blank"
            className="bg-gray-600 hover:bg-gray-500 text-gray-300 font-semibold py-2 px-4 rounded-lg text-sm transition-colors duration-200 ease-in-out border border-gray-500"
          >
            Request a Dashboard
          </a>
        </div>
      </div>

    {/* Video and Text Section */}
      {/* <div className="flex flex-col lg:flex-row justify-between items-center mb-8 lg:space-x-12 space-y-8 lg:space-y-0">
        <div className="w-full lg:w-1/2 flex justify-center">
          <iframe
            width="360"  // Adjust the width of the video for better scaling
            height="200"  // Adjust the height proportionally
            src="https://www.youtube.com/embed/lwRSrDo6N48?si=g9Fz9XJcGPGwau_7" // Replace with your actual YouTube video link
            title="How to use a SigNoz dashboard template"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div> */}

        {/* Text Description */}
        {/* <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-semibold text-white mb-4">What are dashboards?</h2>
          <p className="text-gray-400 mb-4">
            Dashboards are visual representations of your system's performance and health. They provide key metrics and panels for monitoring various services and infrastructure.
          </p>
          <p className="text-gray-400">
          Dashboards in SigNoz allow you to observe real-time data, manage performance, and track logs using customizable panels. With a variety of options, you can monitor different aspects of your infrastructure using specific panels tailored to your needs.
          </p>
        </div>
      </div> */}

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
                href="https://github.com/SigNoz/signoz/issues/new?assignees=&labels=dashboard-template&p[…]s=&template=request_dashboard.md&title=%5BDashboard+Request%5D+"
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
