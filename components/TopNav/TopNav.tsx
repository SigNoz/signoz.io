'use client'

import { useEffect, useState } from 'react'
import { Button, Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowBigLeft, ArrowRight, ChevronDown } from 'lucide-react'
import SearchButton from '../SearchButton'
import GitHubStars from '../GithubStars/GithubStars'
import React from 'react'
import DocsSidebar from '../DocsSidebar/DocsSidebar'
import { usePathname } from 'next/navigation'
import Banner from '../Banner/Banner'
import Tabs from '../../app/resource-center/Shared/Tabs'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import Accordion from '../Accordion/Accordion'

enum TABS {
  BLOG = 'blog-tab',
  COMPARISONS = 'comparisons-tab',
  GUIDES = 'guides-tab',
  OPENTELEMETRY = 'openTelemetry-tab',
}

enum TAB_PATHNAMES {
  BLOG = '/resource-center/blog',
  COMPARISONS = '/resource-center/comparisons',
  GUIDES = '/resource-center/guides',
  OPENTELEMETRY = '/resource-center/opentelemetry',
}
const productDropdownItems = [
  {
    key: 'apm',
    url: '/application-performance-monitoring',
    icon: '/img/index_features/bar-chart-2_feature.svg',
    description: 'Monitor your applications',
    name: 'APM',
    order: 1,
  },
  {
    key: 'Alerts',
    url: '/alerts-management',
    icon: '/img/index_features/concierge-bell_feature.svg',
    description: 'Stay aware with alerts',
    name: 'Alerts',
    order: 5,
  },
  {
    key: 'DistributedTracing',
    url: '/distributed-tracing',
    icon: '/img/index_features/drafting-compass_feature.svg',
    description: 'Track requests across services',
    name: 'Distributed Tracing',
    order: 2,
  },
  {
    key: 'MetricsDashboards',
    url: '/metrics-and-dashboards',
    icon: '/img/index_features/layout-grid_feature.svg',
    description: 'Monitor metrics & build dashboards',
    name: 'Metrics & Dashboards',
    order: 6,
  },
  {
    key: 'LogManagement',
    url: '/log-management',
    icon: '/img/index_features/logs_feature.svg',
    description: 'Unlock insights from logs',
    name: 'Log Management',
    order: 3,
  },
  {
    key: 'Exceptions',
    url: '/exceptions-monitoring',
    icon: '/img/index_features/bug_feature.svg',
    description: 'Record exceptions automatically',
    name: 'Exceptions',
    order: 7,
  },
  {
    key: 'ingest',
    url: '/blog/introducing-ingest-guard-feature/',
    icon: '/img/index_features/shield-plus.svg',
    description: 'Control Observability Costs',
    name: 'Ingest Guard',
    order: 4,
  },
]

// Sort the productDropdownItems based on the 'order' property
const productDropdownItemsForMobile = [...productDropdownItems].sort((a, b) => a.order - b.order)

const resourcesDropdownItems = [
  {
    key: 'blog',
    url: '/resource-center/blog',
    description: 'News, ideas, and insights on observability',
    name: 'Blog',
  },
  {
    key: 'comparisons',
    url: '/resource-center/comparisons',
    description: 'Compare observability tools',
    name: 'Comparisons',
  },
  {
    key: 'guides',
    url: '/resource-center/guides',
    description: 'How-to guides and tutorials',
    name: 'Guides',
  },
  {
    key: 'examples',
    url: '/resource-center/opentelemetry',
    description: 'OpenTelemetry concepts and its use cases',
    name: 'OpenTelemetry',
  },
]

export default function TopNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDocsBasePath, setIsDocsBasePath] = useState(false)
  const [showMainMenu, setShowMainMenu] = useState(false)
  const [activeTab, setActiveTab] = useState(TABS.GUIDES)
  const [shouldShowTabs, setShouldShowTabs] = useState(false)

  useEffect(() => {
    const isDocsBasePath = pathname.startsWith('/docs')
    setIsDocsBasePath(isDocsBasePath)

    if (!isDocsBasePath) {
      setShowMainMenu(true)
    } else {
      setShowMainMenu(false)
    }

    if (pathname.startsWith(TAB_PATHNAMES.BLOG)) {
      setActiveTab(TABS.BLOG)
      setShouldShowTabs(true)
    } else if (pathname.startsWith(TAB_PATHNAMES.COMPARISONS)) {
      setActiveTab(TABS.COMPARISONS)
      setShouldShowTabs(true)
    } else if (pathname.startsWith(TAB_PATHNAMES.GUIDES)) {
      setActiveTab(TABS.GUIDES)
      setShouldShowTabs(true)
    } else if (pathname.startsWith(TAB_PATHNAMES.OPENTELEMETRY)) {
      setActiveTab(TABS.OPENTELEMETRY)
      setShouldShowTabs(true)
    } else {
      setShouldShowTabs(false)
    }
  }, [pathname])

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenResources, setIsOpenResources] = useState(false)

  return (
    <div className="fixed left-0 right-0 z-30">
      <Banner />

      <header
        className={`header-bg mx-auto box-border flex h-[56px] w-full items-center border-b border-signoz_slate-500 px-4 text-signoz_vanilla-100 backdrop-blur-[20px] dark:text-signoz_vanilla-100 md:px-8 lg:px-8`}
      >
        <nav
          className="container flex w-full justify-between text-signoz_vanilla-100 dark:text-signoz_vanilla-100"
          aria-label="Global"
        >
          <div className="flex justify-start gap-x-6">
            <Link
              href="/"
              className="-m-1.5 flex items-center gap-2 p-1.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Image
                className="h-5 w-auto"
                src="/img/SigNozLogo-orange.svg"
                width={160}
                height={60}
                alt=""
              />

              <span className="text-[17.111px] font-medium">SigNoz</span>
            </Link>
            <div className="hidden items-center gap-x-6 lg:flex">
              <div
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className="flex items-center"
              >
                <Dropdown
                  className="px-4"
                  placement="bottom-start"
                  classNames={{ base: 'top-[9px]' }}
                  isOpen={isOpen}
                  onMouseLeave={() => setIsOpen(false)}
                >
                  <DropdownTrigger>
                    <Button
                      className="truncate px-1.5 py-1 text-sm font-extralight hover:text-signoz_robin-500 "
                      onMouseEnter={() => setIsOpen(true)}
                    >
                      <div className="flex items-center">
                        Product
                        <ChevronDown
                          size={12}
                          className={`ml-1 transform transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                        />
                      </div>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Static Actions"
                    classNames={{ list: 'pl-1 grid grid-cols-2 w-max gap-3 items-center h-auto' }}
                    topContent={
                      <div className="px-4 py-2 text-[13px] font-semibold uppercase leading-5 text-[#3C4152]">
                        Product
                      </div>
                    }
                  >
                    {productDropdownItems.map((item) => (
                      <DropdownItem key={item.key} className="h-auto">
                        <Link href={item.url} className="flex items-center gap-4">
                          <Image src={item.icon} alt={`${item.name} Icon`} width={20} height={20} />
                          <div>
                            <div>{item.name}</div>
                            <div className="text-xs text-gray-400">{item.description}</div>
                          </div>
                        </Link>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>

              <Link
                href="/docs"
                className="flex items-center truncate px-1.5 py-1 text-sm font-normal hover:text-signoz_robin-500"
              >
                Documentation
              </Link>

              <div
                onMouseEnter={() => setIsOpenResources(true)}
                onMouseLeave={() => setIsOpenResources(false)}
                className="flex items-center"
              >
                <Dropdown
                  className="px-4"
                  placement="bottom-start"
                  classNames={{ base: 'top-[6px]' }}
                  isOpen={isOpenResources}
                  onMouseLeave={() => setIsOpenResources(false)}
                >
                  <DropdownTrigger>
                    <Button
                      className="truncate px-1.5 py-1 text-sm !font-extralight leading-7 text-signoz_vanilla-100 hover:text-signoz_robin-500"
                      onMouseEnter={() => setIsOpenResources(true)}
                    >
                      <div className="flex items-center">
                        Resources
                        <ChevronDown
                          size={12}
                          className={`ml-1 transform transition-transform duration-300 ease-in-out ${isOpenResources ? 'rotate-180' : 'rotate-0'}`}
                        />
                      </div>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Static Actions"
                    classNames={{ list: 'pl-0 w-max gap-3 items-center' }}
                    topContent={
                      <div className="py-2 pl-2 pr-4 text-[13px] font-semibold uppercase leading-5 text-[#3C4152]">
                        Resources
                      </div>
                    }
                  >
                    {resourcesDropdownItems.map((item) => (
                      <DropdownItem key={item.key} className="h-auto">
                        <Link href={item.url} className="flex flex-col">
                          <div>{item.name}</div>
                          <div className="text-xs text-gray-400">{item.description}</div>
                        </Link>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>

              <Link
                href="/pricing"
                className="flex items-center truncate px-1.5 py-1 text-sm font-normal hover:text-signoz_robin-500"
              >
                Pricing
              </Link>
              <Link
                href="/case-study"
                className="flex items-center truncate px-1.5 py-1 text-sm font-normal hover:text-signoz_robin-500"
              >
                Customer Stories
              </Link>
            </div>
          </div>
          <div className="flex justify-end lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          <div className="hidden gap-3 lg:flex lg:flex-1 lg:justify-end">
            <SearchButton />
            <GitHubStars />

            <Button
              id="btn-get-started-website-navbar"
              className="start-free-trial-btn mx-2 flex h-8 items-center justify-center gap-1.5 truncate rounded-full px-4 py-2 pl-4 pr-3 text-center text-sm font-medium not-italic leading-5 text-white no-underline outline-none hover:text-white"
            >
              <Link href="/teams" className="flex-center">
                Try SigNoz Cloud <ArrowRight size={14} />
              </Link>
            </Button>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 top-[56px]" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 mt-[56px] w-full overflow-y-auto bg-signoz_ink-500 px-6 py-24 !pt-[calc(6rem-56px)] sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 ">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">SigNoz</span>
              </Link>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                {showMainMenu && (
                  <div className="space-y-2 py-8">
                    <Accordion topic="Product" subtopics={productDropdownItemsForMobile} />
                    <Link
                      href="/docs"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-signoz_ink-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Documentation
                    </Link>

                    <Accordion topic="Resources" subtopics={resourcesDropdownItems} />
                    <Link
                      href="/pricing"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-signoz_ink-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Pricing
                    </Link>
                    <Link
                      href="/case-study"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-signoz_ink-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Customer Stories
                    </Link>

                    <div className="-mx-3 inline-block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-signoz_ink-200">
                      <GitHubStars />
                    </div>

                    <Button
                      id="btn-get-started-website-navbar"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-signoz_ink-200"
                    >
                      <Link
                        href="/teams"
                        className="start-free-trial-btn font-heading flex items-center justify-center gap-1 truncate rounded-md border-none px-4 py-2 text-center text-sm text-xs  font-bold leading-4 text-white no-underline outline-none hover:text-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Try SigNoz Cloud <ArrowRight size={14} />
                      </Link>
                    </Button>
                  </div>
                )}
                <div className="hidden py-6 md:block">
                  <SearchButton />
                </div>

                {isDocsBasePath && !showMainMenu && (
                  <div className="docs-sidebar-mobile-nav">
                    <div
                      className="mt-4 inline-flex items-center gap-1 rounded px-1 py-1 text-sm font-bold text-white"
                      onClick={() => {
                        setShowMainMenu(true)
                      }}
                    >
                      <ArrowBigLeft size={16} /> Back to main menu
                    </div>

                    <DocsSidebar onNavItemClick={() => setMobileMenuOpen(false)} />
                  </div>
                )}
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      {shouldShowTabs ? <Tabs activeTab={activeTab} /> : null}
    </div>
  )
}
