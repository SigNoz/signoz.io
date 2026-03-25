import Link from 'next/link'
import React from 'react'

export default function Tabs({ activeTab }) {
  return (
    <header className="header-bg mx-auto box-border flex h-[56px] w-full items-center overflow-x-auto border-b border-signoz_slate-500 px-4 text-signoz_vanilla-100 backdrop-blur-[20px] dark:text-signoz_vanilla-100 md:px-8 lg:px-8">
      <div className="container h-full">
        <ul
          className="mb-0 flex h-full gap-6 pl-0 text-center text-sm font-medium text-signoz_vanilla-400"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          <Link className="me-2 h-full" role="presentation" href="/resource-center/blog">
            <button
              className={`inline-block h-full rounded-t-lg px-1 py-1.5 pb-3.5 ${activeTab === 'blog-tab' ? ' border-b-2 border-signoz_robin-500 text-signoz_vanilla-100' : ''}`}
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
              className={`inline-block h-full rounded-t-lg px-1 py-1.5 pb-3.5 ${activeTab === 'comparisons-tab' ? ' border-b-2 border-signoz_robin-500 text-signoz_vanilla-100' : ''}`}
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
              className={`inline-block h-full rounded-t-lg px-1 py-1.5 pb-3.5 ${activeTab === 'guides-tab' ? ' border-b-2 border-signoz_robin-500 text-signoz_vanilla-100' : ''}`}
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
              className={`inline-block h-full rounded-t-lg px-1 py-1.5 pb-3.5 ${activeTab === 'openTelemetry-tab' ? ' border-b-2 border-signoz_robin-500 text-signoz_vanilla-100' : ''}`}
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
          <Link
            href="https://newsletter.signoz.io/?utm_source=signoz_website&utm_medium=resource_center_tabs&utm_campaign=newsletter"
            className="flex h-full items-center rounded-t-lg px-1 py-1.5 pb-3.5 text-signoz_vanilla-400 transition-colors hover:text-signoz_cherry-500"
            target="_blank"
            prefetch={false}
          >
            Newsletter
          </Link>
        </ul>
      </div>
    </header>
  )
}
