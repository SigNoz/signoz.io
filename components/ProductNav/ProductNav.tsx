'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navigationItems = [
  {
    key: 'apm',
    href: '/application-performance-monitoring',
    label: 'APM',
    whitespaceNowrap: false,
  },
  {
    key: 'tracing',
    href: '/distributed-tracing',
    label: 'Distributed Tracing',
    whitespaceNowrap: true,
  },
  {
    key: 'logs',
    href: '/log-management',
    label: 'Log Management',
    whitespaceNowrap: true,
  },
  {
    key: 'metrics',
    href: '/metrics-and-dashboards',
    label: 'Metrics & Dashboards',
    whitespaceNowrap: true,
  },
  {
    key: 'exceptions',
    href: '/exceptions-monitoring',
    label: 'Exceptions',
    whitespaceNowrap: false,
  },
  {
    key: 'alerts',
    href: '/alerts-management',
    label: 'Alerts',
    whitespaceNowrap: false,
  },
]

export default function ProductNav() {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState('')

  useEffect(() => {
    const activeItem = navigationItems.find((item) => pathname.startsWith(item.href))
    if (activeItem) {
      setActiveTab(activeItem.key)
    }
  }, [pathname])

  return (
    <div className="fixed top-[56px] right-0 left-0 z-10">
      <header className="header-bg border-border text-foreground dark:text-foreground mx-auto box-border h-[56px] w-full border-b backdrop-blur-[20px]">
        <div className="max-w-8xl mx-auto h-fit overflow-x-auto">
          <nav
            className="text-muted-foreground mb-0 flex h-[55px] gap-3 pl-0 text-center text-sm font-medium sm:gap-6"
            aria-label="Product Navigation"
          >
            {navigationItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`inline-flex h-full shrink-0 items-center rounded-t-lg px-1 py-1.5 pb-3.5 whitespace-nowrap ${
                  activeTab === item.key ? 'border-primary text-foreground border-b-2' : ''
                }`}
                prefetch={false}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </div>
  )
}
