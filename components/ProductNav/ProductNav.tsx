// components/ProductNav/ProductNav.tsx
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
    <div className="fixed left-0 right-0 top-[56px] z-10">
      <header className="header-bg mx-auto box-border h-[56px] w-full border-b border-signoz_slate-500 px-4 text-signoz_vanilla-100 backdrop-blur-[20px] dark:text-signoz_vanilla-100 md:px-8 lg:px-8">
        <div className="container h-fit overflow-x-auto">
          <nav
            className="mb-0 flex h-[55px] gap-3 pl-0 text-center text-sm font-medium text-signoz_vanilla-400 sm:gap-6"
            aria-label="Product Navigation"
          >
            {navigationItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`inline-flex h-full shrink-0 items-center whitespace-nowrap rounded-t-lg px-1 py-1.5 pb-3.5 ${
                  activeTab === item.key
                    ? 'border-b-2 border-signoz_robin-500 text-signoz_vanilla-100'
                    : ''
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
