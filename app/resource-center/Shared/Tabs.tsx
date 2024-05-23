import Link from 'next/link'
import React from 'react'

export default function Tabs({ activeTab, onSelectTab }) {
  return (
    <div className="mb-4">
      <ul
        className="-mb-px flex flex-wrap pl-0 text-center text-sm font-medium"
        id="default-tab"
        data-tabs-toggle="#default-tab-content"
        role="tablist"
      >
        <Link className="me-2" role="presentation" href="/resource-center/blog">
          <button
            className={`inline-block rounded-t-lg px-4 py-2 ${activeTab === 'blog-tab' ? 'border-b-2 border-indigo-500 text-indigo-500' : ''}`}
            id="blog-tab"
            data-tabs-target="#blog"
            type="button"
            role="tab"
            aria-controls="blog"
            aria-selected="false"
            // onClick={() => onSelectTab(`blog-tab`)}
          >
            Blog
          </button>
        </Link>
        <Link className="me-2" role="presentation" href="/resource-center/comparisons">
          <button
            className={`inline-block rounded-t-lg px-4 py-2 ${activeTab === 'comparisons-tab' ? 'border-b-2 border-indigo-500 text-indigo-500' : ''}`}
            id="comparisons-tab"
            data-tabs-target="#comparisons"
            type="button"
            role="tab"
            aria-controls="comparisons"
            aria-selected="false"
            // onClick={() => onSelectTab(`comparisons-tab`)}
          >
            Comparisons
          </button>
        </Link>

        <Link role="presentation" href="/resource-center/opentelemetry">
          <button
            className={`inline-block rounded-t-lg px-4 py-2 ${activeTab === 'openTelemetry-tab' ? 'border-b-2 border-indigo-500 text-indigo-500' : ''}`}
            id="openTelemetry-tab"
            data-tabs-target="#openTelemetry"
            type="button"
            role="tab"
            aria-controls="openTelemetry"
            aria-selected="false"
            // onClick={() => onSelectTab(`openTelemetry-tab`)}
          >
            OpenTelemetry
          </button>
        </Link>
      </ul>
    </div>
  )
}
