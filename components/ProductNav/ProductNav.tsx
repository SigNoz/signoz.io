// components/ProductNav/ProductNav.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ProductNav() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    if (pathname.startsWith('/application-performance-monitoring')) {
      setActiveTab('apm');
    } else if (pathname.startsWith('/distributed-tracing')) {
      setActiveTab('tracing');
    } else if (pathname.startsWith('/log-management')) {
      setActiveTab('logs');
    } else if (pathname.startsWith('/metrics-and-dashboards')) {
      setActiveTab('metrics');
    } else if (pathname.startsWith('/exceptions-monitoring')) {
      setActiveTab('exceptions');
    } else if (pathname.startsWith('/alerts-management')) {
      setActiveTab('alerts');
    }
  }, [pathname]);

  return (
    <div className="fixed left-0 right-0 z-10 top-[56px]">
      <header className="header-bg mx-auto flex h-[56px] items-center border-b border-signoz_slate-500 px-4 text-signoz_vanilla-400 !backdrop-blur-[20px] md:px-8 lg:px-8 overflow-x-auto overflow-y-hidden">
        <nav className="flex w-full justify-between container items-end" aria-label="Product Navigation">
          <div className="flex items-center gap-x-8 h-[56px]">
            <Link href="/application-performance-monitoring" className={`text-sm font-medium h-full flex items-center hover:text-signoz_robin-500 ${activeTab === 'apm' ? 'text-signoz_vanilla-100 border-b-2 border-signoz_robin-500' : ''}`}>
              APM
            </Link>
            <Link href="/distributed-tracing" className={`text-sm whitespace-nowrap font-medium h-full flex items-center hover:text-signoz_robin-500 ${activeTab === 'tracing' ? 'text-signoz_vanilla-100 border-b-2 border-signoz_robin-500' : ''}`}>
              Distributed Tracing
            </Link>
            <Link href="/log-management" className={`text-sm whitespace-nowrap font-medium h-full flex items-center hover:text-signoz_robin-500 ${activeTab === 'logs' ? 'text-signoz_vanilla-100 border-b-2 border-signoz_robin-500' : ''}`}>
              Log Management
            </Link>
            <Link href="/metrics-and-dashboards" className={`text-sm whitespace-nowrap font-medium h-full flex items-center hover:text-signoz_robin-500 ${activeTab === 'metrics' ? 'text-signoz_vanilla-100 border-b-2 border-signoz_robin-500' : ''}`}>
              Metrics & Dashboards
            </Link>
            <Link href="/exceptions-monitoring" className={`text-sm font-medium h-full flex items-center hover:text-signoz_robin-500 ${activeTab === 'exceptions' ? 'text-signoz_vanilla-100 border-b-2 border-signoz_robin-500' : ''}`}>
              Exceptions
            </Link>
            <Link href="/alerts-management" className={`text-sm font-medium h-full flex items-center hover:text-signoz_robin-500 ${activeTab === 'alerts' ? 'text-signoz_vanilla-100 border-b-2 border-signoz_robin-500' : ''}`}>
              Alerts
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
}
