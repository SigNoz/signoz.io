import Link from 'next/link'
import React from 'react'

export default function Tabs({ activeTab }) {
  return (
    <div className="mb-4">
      <ul
        className="-mb-px flex flex-wrap pl-0 text-center text-sm font-medium gap-6 text-signoz_vanilla-400"
        id="default-tab"
        data-tabs-toggle="#default-tab-content"
        role="tablist"
      >
        <Link className="me-2" role="presentation" href="/resource-center/blog">
          <button
            className={`inline-block rounded-t-lg px-1 py-1.5 pb-3 ${activeTab === 'blog-tab' ? ' text-signoz_vanilla-100 border-b-2 border-signoz_robin-500' : ''}`}
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
            className={`inline-block rounded-t-lg px-1 py-1.5 pb-3 ${activeTab === 'comparisons-tab' ? ' text-signoz_vanilla-100 border-b-2 border-signoz_robin-500' : ''}`}
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
        <Link className="me-2" role="presentation" href="/resource-center/guides">
          <button
            className={`inline-block rounded-t-lg px-1 py-1.5 pb-3 ${activeTab === 'guides-tab' ? ' text-signoz_vanilla-100 border-b-2 border-signoz_robin-500' : ''}`}
            id="guides-tab"
            data-tabs-target="#guides"
            type="button"
            role="tab"
            aria-controls="guides"
            aria-selected="false"
          >
            Guides
          </button>
        </Link>

        <Link role="presentation" href="/resource-center/opentelemetry">
          <button
            className={`inline-block rounded-t-lg px-1 py-1.5 pb-3 ${activeTab === 'openTelemetry-tab' ? ' text-signoz_vanilla-100 border-b-2 border-signoz_robin-500' : ''}`}
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
