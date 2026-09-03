import Link from 'next/link'
import React from 'react'

const TAB_STYLE =
  'inline-flex h-full shrink-0 items-center whitespace-nowrap rounded-t-lg px-1 py-1.5 pb-3.5'
const ACTIVE_STYLE = 'border-b-2 border-[var(--accent-primary)] text-[var(--l1-foreground)]'

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
      className={`${TAB_STYLE} ${activeTab === tabId ? ACTIVE_STYLE : ''}`}
      href={href}
      role="tab"
      aria-selected={activeTab === tabId}
    >
      {children}
    </Link>
  )
}

export default function Tabs({ activeTab }: { activeTab: string }) {
  return (
    <header className="header-bg mx-auto box-border h-[56px] w-full border-b border-[var(--l1-border)] text-[var(--l1-foreground)] backdrop-blur-[20px]">
      <div className="mx-auto h-fit max-w-8xl overflow-x-auto md:px-8">
        <ul
          className="mb-0 flex h-[55px] gap-3 pl-0 text-center text-sm font-medium text-[var(--l2-foreground)] sm:gap-6"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          <TabLink href="/blog/" tabId="blog-tab" activeTab={activeTab}>
            Blog
          </TabLink>
          <TabLink href="/comparisons/" tabId="comparisons-tab" activeTab={activeTab}>
            Comparisons
          </TabLink>
          <TabLink href="/guides/" tabId="guides-tab" activeTab={activeTab}>
            Guides
          </TabLink>
          <TabLink href="/opentelemetry/" tabId="openTelemetry-tab" activeTab={activeTab}>
            OpenTelemetry
          </TabLink>
          <Link
            href="https://newsletter.signoz.io/?utm_source=signoz_website&utm_medium=resource_center_tabs&utm_campaign=newsletter"
            className={`${TAB_STYLE} text-[var(--l2-foreground)] transition-colors hover:text-[var(--accent-cherry)]`}
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
