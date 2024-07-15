import Link from 'next/link'
import React from 'react'

export default function Tabs({ activeTab }) {
  return (
    <header className='header-bg mx-auto box-border flex h-[56px] w-full items-center border-b border-signoz_slate-500 px-4 text-signoz_vanilla-100 backdrop-blur-[20px] dark:text-signoz_vanilla-100 md:px-8 lg:px-8'>

    <div className="container h-full" >
      <ul
        className="flex flex-wrap pl-0 text-center text-sm font-medium gap-6 text-signoz_vanilla-400 mb-0 h-full"
        id="default-tab"
        data-tabs-toggle="#default-tab-content"
        role="tablist"
      >
        <Link className="me-2 h-full" role="presentation" href="/resource-center/blog">
          <button
            className={`inline-block rounded-t-lg px-1 py-1.5 pb-3.5 h-full ${activeTab === 'blog-tab' ? ' text-signoz_vanilla-100 border-b-2 border-signoz_robin-500' : ''}`}
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
            className={`inline-block rounded-t-lg px-1 py-1.5 pb-3.5 h-full ${activeTab === 'comparisons-tab' ? ' text-signoz_vanilla-100 border-b-2 border-signoz_robin-500' : ''}`}
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
            className={`inline-block rounded-t-lg px-1 py-1.5 pb-3.5 h-full ${activeTab === 'guides-tab' ? ' text-signoz_vanilla-100 border-b-2 border-signoz_robin-500' : ''}`}
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
            className={`inline-block rounded-t-lg px-1 py-1.5 pb-3.5 h-full ${activeTab === 'openTelemetry-tab' ? ' text-signoz_vanilla-100 border-b-2 border-signoz_robin-500' : ''}`}
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
    </header>
  )
}
