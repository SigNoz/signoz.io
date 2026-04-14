import Link from 'next/link'
import React from 'react'

const TAB_STYLE = 'inline-flex h-full items-center rounded-t-lg px-1 py-1.5 pb-3.5'
const ACTIVE_STYLE = 'border-b-2 border-signoz_robin-500 text-signoz_vanilla-100'

function TabLink({
  href,
  tabId,
  activeTab,
  children,
}: {
  href: string
  tabId: string
  activeTab: string
  children: React.ReactNode
}) {
  return (
    <Link
      className={`me-2 ${TAB_STYLE} ${activeTab === tabId ? ACTIVE_STYLE : ''}`}
      href={href}
      role="tab"
      aria-selected={activeTab === tabId}
    >
      {children}
    </Link>
  )
}

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
          <TabLink href="/blog" tabId="blog-tab" activeTab={activeTab}>
            Blog
          </TabLink>
          <TabLink href="/comparisons" tabId="comparisons-tab" activeTab={activeTab}>
            Comparisons
          </TabLink>
          <TabLink href="/guides" tabId="guides-tab" activeTab={activeTab}>
            Guides
          </TabLink>
          <TabLink href="/opentelemetry" tabId="openTelemetry-tab" activeTab={activeTab}>
            OpenTelemetry
          </TabLink>
          <Link
            href="https://newsletter.signoz.io/?utm_source=signoz_website&utm_medium=resource_center_tabs&utm_campaign=newsletter"
            className={`${TAB_STYLE} text-signoz_vanilla-400 transition-colors hover:text-signoz_cherry-500`}
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
