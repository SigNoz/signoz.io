'use client'

import React, { useState } from 'react'
import Blogs from './Blog/Blogs'
import Comparisons from './Comparisons/Comparisons'
import Guides from './Guides/Guides'
import OpenTelemetry from './OpenTelemetry/OpenTelemetry'

export default function ResourceCenter() {
  const [activeTab, setActiveTab] = useState('blog-tab')

  return (
    <div className="container mx-auto py-4">
      <div className="mb-4">
        <ul
          className="-mb-px flex flex-wrap text-center text-sm font-medium"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          <li className="me-2" role="presentation">
            <button
              className={`inline-block rounded-t-lg px-4 py-2 ${activeTab === 'blog-tab' ? 'border-b-2 border-indigo-500 text-indigo-500' : ''}`}
              id="blog-tab"
              data-tabs-target="#blog"
              type="button"
              role="tab"
              aria-controls="blog"
              aria-selected="false"
              onClick={() => setActiveTab(`blog-tab`)}
            >
              Blog
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block rounded-t-lg px-4 py-2 ${activeTab === 'comparisons-tab' ? 'border-b-2 border-indigo-500 text-indigo-500' : ''}`}
              id="comparisons-tab"
              data-tabs-target="#comparisons"
              type="button"
              role="tab"
              aria-controls="comparisons"
              aria-selected="false"
              onClick={() => setActiveTab(`comparisons-tab`)}
            >
              Comparisons
            </button>
          </li>
          <li role="presentation">
            <button
              className={`inline-block rounded-t-lg px-4 py-2 ${activeTab === 'guides-tab' ? 'border-b-2 border-indigo-500 text-indigo-500' : ''}`}
              id="guides-tab"
              data-tabs-target="#guides"
              type="button"
              role="tab"
              aria-controls="guides"
              aria-selected="false"
              onClick={() => setActiveTab(`guides-tab`)}
            >
              Guides
            </button>
          </li>

          <li role="presentation">
            <button
              className={`inline-block rounded-t-lg px-4 py-2 ${activeTab === 'openTelemetry-tab' ? 'border-b-2 border-indigo-500 text-indigo-500' : ''}`}
              id="openTelemetry-tab"
              data-tabs-target="#openTelemetry"
              type="button"
              role="tab"
              aria-controls="openTelemetry"
              aria-selected="false"
              onClick={() => setActiveTab(`openTelemetry-tab`)}
            >
              OpenTelemetry
            </button>
          </li>
        </ul>
      </div>

      <div className="tab-content">
        {activeTab === 'blog-tab' && <Blogs />}

        {activeTab === 'comparisons-tab' && <Comparisons />}

        {activeTab === 'guides-tab' && <Guides />}

        {activeTab === 'openTelemetry-tab' && <OpenTelemetry />}
      </div>

      <div id="default-tab-content">
        <div
          className="hidden rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the{' '}
            <strong className="font-medium text-gray-800 dark:text-white">
              Profile tab's associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for the next. The tab
            JavaScript swaps classNamees to control the content visibility and styling.
          </p>
        </div>
        <div
          className="hidden rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
          id="dashboard"
          role="tabpanel"
          aria-labelledby="dashboard-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the{' '}
            <strong className="font-medium text-gray-800 dark:text-white">
              Dashboard tab's associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for the next. The tab
            JavaScript swaps classNamees to control the content visibility and styling.
          </p>
        </div>
        <div
          className="hidden rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
          id="settings"
          role="tabpanel"
          aria-labelledby="settings-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the{' '}
            <strong className="font-medium text-gray-800 dark:text-white">
              Settings tab's associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for the next. The tab
            JavaScript swaps classNamees to control the content visibility and styling.
          </p>
        </div>
        <div
          className="hidden rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
          id="contacts"
          role="tabpanel"
          aria-labelledby="contacts-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is some placeholder content the{' '}
            <strong className="font-medium text-gray-800 dark:text-white">
              Contacts tab's associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for the next. The tab
            JavaScript swaps classNamees to control the content visibility and styling.
          </p>
        </div>
      </div>
    </div>
  )
}
