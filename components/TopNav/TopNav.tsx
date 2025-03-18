'use client'

import { useEffect, useState } from 'react'
import { Button, Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowBigLeft, ArrowRight, BookOpenText, ChevronDown, PenSquare } from 'lucide-react'
import GitHubStars from '../GithubStars/GithubStars'
import DocsSidebar from '../DocsSidebar/DocsSidebar'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Banner from '../Banner/Banner'
import Tabs from '../../app/resource-center/Shared/Tabs'
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react'
import Accordion from '../Accordion/Accordion'
import { Color } from '@signozhq/design-tokens'
import { QUERY_PARAMS } from '@/constants/queryParams'
import { ONBOARDING_SOURCE } from '@/constants/globals'
import dynamic from 'next/dynamic'

const SearchButton = dynamic(() => import('../SearchButton'), { ssr: false })

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
    description: "Always know what's going on",
    name: 'Alerts',
    order: 5,
  },
  {
    key: 'DistributedTracing',
    url: '/distributed-tracing',
    icon: '/img/index_features/drafting-compass_feature.svg',
    description: 'Track requests across your services',
    name: 'Distributed Tracing',
    order: 2,
  },
  {
    key: 'MetricsDashboards',
    url: '/metrics-and-dashboards',
    icon: '/img/index_features/layout-grid_feature.svg',
    description: 'Monitor key metrics and build dashboards',
    name: 'Metrics & Dashboards',
    order: 6,
  },
  {
    key: 'LogManagement',
    url: '/log-management',
    icon: '/img/index_features/logs_feature.svg',
    description: 'Unlock key insights from logs',
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
    key: 'InfraMonitoring',
    url: '/docs/infrastructure-monitoring/overview/',
    icon: '/img/index_features/boxes.svg',
    description: 'Monitor your infrastructure',
    name: 'Infrastructure Monitoring',
    order: 4,
  },
  {
    key: 'ingest',
    url: '/blog/introducing-ingest-guard-feature/',
    icon: '/img/index_features/shield-plus.svg',
    description: 'Control your observability costs',
    name: 'Ingest Guard',
    order: 8,
  },
]

const comparisionItems = [
  {
    key: 'signozvsdatadog',
    url: '/product-comparison/signoz-vs-datadog/',
    name: 'SigNoz vs DataDog',
  },
  {
    key: 'signozvsgrafana',
    url: '/product-comparison/signoz-vs-grafana/',
    name: 'SigNoz vs Grafana',
  },
  {
    key: 'signozvsnewrelic',
    url: '/product-comparison/signoz-vs-newrelic/',
    name: 'SigNoz vs New Relic',
  },
]

// Sort the productDropdownItems based on the 'order' property
const productDropdownItemsForMobile = [...productDropdownItems].sort((a, b) => a.order - b.order)

const resourcesDropdownItems = {
  learn: [
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
      key: 'opentelemetry',
      url: '/resource-center/opentelemetry',
      description: 'OpenTelemetry concepts and its use cases',
      name: 'OpenTelemetry',
    },
  ],
  explore: [
    {
      key: 'faqs',
      url: '/faqs/',
      description: 'Frequently asked questions about SigNoz',
      name: 'Product FAQs',
    },
    {
      key: 'migrations',
      url: '/docs/migration/migrate-from-datadog/',
      description: 'Guides for migrating to SigNoz',
      name: 'Migrations',
    },
    {
      key: 'dashboards',
      url: '/dashboards/',
      description: 'Explore dashboard templates for your use cases',
      name: 'Dashboard Templates',
    },
  ],
}

export default function TopNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDocsBasePath, setIsDocsBasePath] = useState(false)
  const [showMainMenu, setShowMainMenu] = useState(false)
  const [activeTab, setActiveTab] = useState(TABS.GUIDES)
  const [shouldShowTabs, setShouldShowTabs] = useState(false)
  const router = useRouter()

  const loginRoute = '/login/'
  const signupRoute = '/teams/'
  const isLoginRoute = pathname === loginRoute
  const isSignupRoute = pathname === signupRoute

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
  const [timeoutId, setTimeoutId] = useState<any>(null)
  const [timeoutIdResources, setTimeoutIdResources] = useState<any>(null)
  const delay = 500

  const searchParams = useSearchParams()
  const source = searchParams.get(QUERY_PARAMS.SOURCE)

  // Product dropdown handlers
  const handleMouseEnterProduct = () => {
    clearTimeout(timeoutId)
    setIsOpen(true)
  }

  const handleMouseLeaveProduct = () => {
    const id = setTimeout(() => setIsOpen(false), delay)
    setTimeoutId(id)
  }

  // Resources dropdown handlers
  const handleMouseEnterResources = () => {
    clearTimeout(timeoutIdResources)
    setIsOpenResources(true)
  }

  const handleMouseLeaveResources = () => {
    const id = setTimeout(() => setIsOpenResources(false), delay)
    setTimeoutIdResources(id)
  }

  const handleProductDropdownClick = () => {
    setIsOpen(false)
  }

  const handleResourcesDropdownClick = () => {
    setIsOpenResources(false)
  }

  if (source === ONBOARDING_SOURCE) {
    return null
  }

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

            {!isLoginRoute && (
              <div className="hidden items-center gap-x-6 lg:flex">
                <div
                  onMouseEnter={handleMouseEnterProduct}
                  onMouseLeave={handleMouseLeaveProduct}
                  className="flex items-center"
                >
                  <Popover
                    placement="bottom-start"
                    showArrow={false}
                    isOpen={isOpen}
                    className="py-2.5"
                  >
                    <PopoverTrigger>
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
                    </PopoverTrigger>
                    <PopoverContent className="rounded-[4px] p-0">
                      <div className="flex flex-row">
                        <div className="flex flex-col gap-y-4 p-6">
                          <div
                            className={`text-[11px] font-semibold uppercase leading-[18px] tracking-[0.88px] text-[${Color.BG_SLATE_50}]`}
                          >
                            Product Modules
                          </div>
                          <div className="grid grid-cols-2 gap-x-3 gap-y-5">
                            {productDropdownItems.map((item) => (
                              <Link
                                href={item.url}
                                className="group flex h-auto items-center gap-4"
                                key={item.key}
                                onClick={handleProductDropdownClick}
                              >
                                <Image
                                  src={item.icon}
                                  alt={`${item.name}`}
                                  width={20}
                                  height={20}
                                />
                                <div>
                                  <div className="flex flex-row items-center gap-1">
                                    <span>{item.name}</span>{' '}
                                    <ArrowRight
                                      size={14}
                                      className="opacity-0 group-hover:opacity-100"
                                    />
                                  </div>
                                  <div
                                    className={`line-clamp-2 max-w-[274px] text-xs text-[${Color.TEXT_VANILLA_400}]  group-hover:text-[#FFF]`}
                                  >
                                    {item.description}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div
                          className={`flex flex-col gap-y-6 rounded-r-[4px] border-l border-[${Color.BG_SLATE_400}] bg-[${Color.BG_INK_300}] p-6`}
                        >
                          <div className="flex flex-col gap-y-4">
                            <Link
                              href={'/case-study'}
                              className={`flex flex-row items-center gap-1 text-[11px] font-semibold uppercase leading-[18px] tracking-[0.88px] text-[${Color.BG_SLATE_50}] hover:text-[#fff]`}
                              onClick={handleProductDropdownClick}
                            >
                              <span>Customer Stories</span> <ArrowRight size={14} />
                            </Link>
                            <div>
                              <Link
                                href={'/case-study/brainfish/'}
                                className="group flex h-auto items-center gap-4"
                                onClick={handleProductDropdownClick}
                              >
                                <Image
                                  src={'/img/index_features/brainfish.svg'}
                                  alt={''}
                                  width={20}
                                  height={20}
                                />
                                <div
                                  className={`font-inter line-clamp-2 max-w-[274px] text-[${Color.TEXT_VANILLA_400}] group-hover:text-[#fff]`}
                                >
                                  How Brainfish leveraged SigNoz for effective Kubernetes monitoring
                                </div>
                              </Link>
                            </div>
                          </div>
                          <div className="flex flex-col gap-y-4">
                            <div
                              className={`flex flex-row items-center gap-1 text-[11px] font-semibold uppercase leading-[18px] tracking-[0.88px] text-[${Color.BG_SLATE_50}]`}
                            >
                              <span>Compare Signoz</span>
                            </div>
                            <div
                              className={`font-inter flex flex-col gap-1 text-[${Color.TEXT_VANILLA_400}]`}
                            >
                              {comparisionItems.map((comparisionItem) => (
                                <Link
                                  key={comparisionItem.key}
                                  href={comparisionItem.url}
                                  className="group flex flex-row items-center gap-1 hover:text-[#fff]"
                                  onClick={handleProductDropdownClick}
                                >
                                  <span>{comparisionItem.name}</span>{' '}
                                  <ArrowRight
                                    className="opacity-0 group-hover:opacity-100"
                                    size={14}
                                  />
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <Link
                  href="/docs"
                  className="flex items-center truncate px-1.5 py-1 text-sm font-normal hover:text-signoz_robin-500"
                >
                  Docs
                </Link>

                <div
                  onMouseEnter={handleMouseEnterResources}
                  onMouseLeave={handleMouseLeaveResources}
                  className="flex items-center"
                >
                  <Popover
                    placement="bottom-start"
                    showArrow={false}
                    isOpen={isOpenResources}
                    className="py-2.5"
                  >
                    <PopoverTrigger>
                      <Button
                        className="truncate px-1.5 py-1 text-sm font-extralight hover:text-signoz_robin-500 "
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
                    </PopoverTrigger>
                    <PopoverContent className="rounded-[4px] p-0">
                      <div className="flex flex-row">
                        <div className="flex flex-col gap-y-4 p-6">
                          <div
                            className={`text-[11px] font-semibold uppercase leading-[18px] tracking-[0.88px] text-[${Color.BG_SLATE_50}]`}
                          >
                            Learn
                          </div>
                          <div className="grid grid-cols-1 gap-x-3 gap-y-5">
                            {resourcesDropdownItems.learn.map((item) => (
                              <Link
                                href={item.url}
                                className="group flex h-auto items-center gap-4"
                                key={item.key}
                                onClick={handleResourcesDropdownClick}
                              >
                                <div>
                                  <div className="flex flex-row items-center gap-1">
                                    <span>{item.name}</span>{' '}
                                    <ArrowRight
                                      size={14}
                                      className="opacity-0 group-hover:opacity-100"
                                    />
                                  </div>
                                  <div
                                    className={`line-clamp-2 max-w-[274px] text-xs text-[${Color.TEXT_VANILLA_400}]  group-hover:text-[#FFF]`}
                                  >
                                    {item.description}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col gap-y-4 p-6">
                          <div
                            className={`text-[11px] font-semibold uppercase leading-[18px] tracking-[0.88px] text-[${Color.BG_SLATE_50}]`}
                          >
                            Explore
                          </div>
                          <div className="grid grid-cols-1 gap-x-3 gap-y-5">
                            {resourcesDropdownItems.explore.map((item) => (
                              <Link
                                href={item.url}
                                className="group flex h-auto items-center gap-4"
                                key={item.key}
                                onClick={handleResourcesDropdownClick}
                              >
                                <div>
                                  <div className="flex flex-row items-center gap-1">
                                    <span>{item.name}</span>{' '}
                                    <ArrowRight
                                      size={14}
                                      className="opacity-0 group-hover:opacity-100"
                                    />
                                  </div>
                                  <div
                                    className={`line-clamp-2 max-w-[274px] text-xs text-[${Color.TEXT_VANILLA_400}]  group-hover:text-[#FFF]`}
                                  >
                                    {item.description}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
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
            )}
          </div>
          <div className="flex justify-end lg:hidden">
            {!mobileMenuOpen && <SearchButton />}
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

          <div className="hidden items-center gap-3 lg:flex lg:flex-1 lg:justify-end">
            {!isLoginRoute && (
              <>
                <SearchButton />
                <GitHubStars />

                <Button
                  className="-ml-1 box-border flex h-8 items-center gap-2 rounded-full bg-signoz_slate-500 px-4 py-2 pl-2 pr-2.5 text-sm font-normal not-italic leading-5 text-signoz_vanilla-100 no-underline outline-none hover:text-white"
                  onClick={() => router.push('/login')}
                >
                  Sign In
                </Button>

                <Button
                  id="btn-get-started-website-navbar"
                  className="start-free-trial-btn flex h-8 items-center justify-center gap-1.5 truncate rounded-full px-4 py-2 pl-4 pr-3 text-center text-sm font-medium not-italic leading-5 text-white no-underline outline-none hover:text-white"
                >
                  <Link href="/teams" className="flex-center">
                    Get Started - Free
                    <ArrowRight size={14} />
                  </Link>
                </Button>
              </>
            )}

            {isLoginRoute && (
              <div className="flex items-center gap-2">
                <Link href="mailto:cloud-support@signoz.io" className="flex-center mr-8 text-xs">
                  Need help? <span className="text-signoz_robin-500">Contact support</span>
                </Link>

                <Button
                  id="btn-get-started-website-navbar"
                  className="flex h-8 min-w-24 items-center justify-center gap-1.5 truncate rounded-sm border border-signoz_slate-300 bg-signoz_slate-500 px-4 py-2 pl-2 pr-2.5 text-center text-xs font-normal not-italic leading-5  text-signoz_vanilla-400 no-underline outline-none hover:text-white"
                  onClick={() => router.push('/teams')}
                >
                  <PenSquare size={12} /> Signup
                </Button>

                <Button
                  className="flex h-8 min-w-24 items-center justify-center gap-2 truncate rounded-sm border border-signoz_slate-300 bg-signoz_slate-500 px-4 py-2 pl-4 pr-3 text-center text-xs font-normal not-italic leading-5 text-signoz_vanilla-400 no-underline outline-none hover:text-white"
                  onClick={() => router.push('/docs')}
                >
                  <BookOpenText size={12} /> Docs
                </Button>
              </div>
            )}
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

                    <Accordion
                      topic="Resources"
                      subtopics={[
                        ...resourcesDropdownItems.learn,
                        ...resourcesDropdownItems.explore,
                      ]}
                    />
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

                    {!isSignupRoute && (
                      <Button
                        id="btn-get-started-website-navbar"
                        className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-signoz_ink-200"
                      >
                        <Link
                          href="/teams"
                          className="start-free-trial-btn font-heading flex items-center justify-center gap-1 truncate rounded-md border-none px-4 py-2 text-center text-sm font-bold leading-4 text-white no-underline outline-none hover:text-white"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Get Started - Free
                          <ArrowRight size={14} />
                        </Link>
                      </Button>
                    )}
                  </div>
                )}

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
