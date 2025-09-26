// components/ProductNav/ProductNav.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navigationItems = [
  {
    key: 'apm',
    href: '/application-performance-monitoring',
    label: 'APM',
    whitespaceNowrap: false
  },
  {
    key: 'tracing',
    href: '/distributed-tracing',
    label: 'Distributed Tracing',
    whitespaceNowrap: true
  },
  {
    key: 'logs',
    href: '/log-management',
    label: 'Log Management',
    whitespaceNowrap: true
  },
  {
    key: 'metrics',
    href: '/metrics-and-dashboards',
    label: 'Metrics & Dashboards',
    whitespaceNowrap: true
  },
  {
    key: 'exceptions',
    href: '/exceptions-monitoring',
    label: 'Exceptions',
    whitespaceNowrap: false
  },
  {
    key: 'alerts',
    href: '/alerts-management',
    label: 'Alerts',
    whitespaceNowrap: false
  }
];

export default function ProductNav() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const activeItem = navigationItems.find(item => pathname.startsWith(item.href));
    if (activeItem) {
      setActiveTab(activeItem.key);
    }
  }, [pathname]);

  return (
    <div className="fixed left-0 right-0 z-10 top-[56px]">
      <header className="header-bg mx-auto flex h-[56px] items-center border-b border-signoz_slate-500 px-4 text-signoz_vanilla-400 !backdrop-blur-[20px] md:px-8 lg:px-8 overflow-x-auto overflow-y-hidden">
        <nav className="flex w-full justify-between container items-end" aria-label="Product Navigation">
          <div className="flex items-center gap-x-8 h-[56px]">
            {navigationItems.map((item) => (
              <Link 
                key={item.key}
                href={item.href} 
                className={`text-sm font-medium h-full flex items-center hover:text-signoz_robin-500 border-b-2 ${
                  item.whitespaceNowrap ? 'whitespace-nowrap' : ''
                } ${activeTab === item.key ? 'text-signoz_vanilla-100 border-signoz_robin-500' : 'border-transparent'}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
    </div>
  );
}
