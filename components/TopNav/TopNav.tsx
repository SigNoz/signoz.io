'use client'

import { useEffect, useState } from 'react'
import { Button, Dialog } from '@headlessui/react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import {
  ArrowBigLeft,
  ArrowRight,
  BookOpenText,
  Brain,
  ChevronDown,
  Cone,
  Logs,
  PenSquare,
  ShieldPlus,
  WorkflowIcon,
} from 'lucide-react'
import SearchButton from '../SearchButtonDeferred'
import GitHubStars from '../GithubStars/GithubStars'
import React from 'react'
import DocsSidebar from '../DocsSidebar/DocsSidebar'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Tabs from '@/components/ResourceCenter/Tabs'
import * as Popover from '@radix-ui/react-popover'
import Accordion from '../Accordion/Accordion'
import { QUERY_PARAMS } from '@/constants/queryParams'
import { ONBOARDING_SOURCE } from '@/constants/globals'
import TrackingLink from '@/components/TrackingLink'
import TrackingButton from '@/components/TrackingButton'
import SigNozLogo from '@/public/img/SigNozLogo-orange.svg'
import BarChartFeatureIcon from '@/public/img/index_features/bar-chart-2_feature.svg'
import BoxesIcon from '@/public/img/index_features/boxes.svg'
import BrainfishIcon from '@/public/img/index_features/brainfish.svg'
import BugFeatureIcon from '@/public/img/index_features/bug_feature.svg'
import ConciergeBellFeatureIcon from '@/public/img/index_features/concierge-bell_feature.svg'
import DraftingCompassFeatureIcon from '@/public/img/index_features/drafting-compass_feature.svg'
import LayoutGridFeatureIcon from '@/public/img/index_features/layout-grid_feature.svg'
import LogsFeatureIcon from '@/public/img/index_features/logs_feature.svg'

enum TABS {
  BLOG = 'blog-tab',
  COMPARISONS = 'comparisons-tab',
  GUIDES = 'guides-tab',
  OPENTELEMETRY = 'openTelemetry-tab',
}

enum TAB_PATHNAMES {
  BLOG = '/blog',
  COMPARISONS = '/comparisons',
  GUIDES = '/guides',
  OPENTELEMETRY = '/opentelemetry',
}

const PRODUCT_ICON_CLASSNAME = 'h-5 w-5 shrink-0'

const productDropdownItems = [
  {
    key: 'apm',
    url: '/application-performance-monitoring',
    icon: <BarChartFeatureIcon className={PRODUCT_ICON_CLASSNAME} aria-hidden="true" />,
    description: 'Monitor your applications',
    name: 'APM',
    order: 1,
  },
  {
    key: 'Alerts',
    url: '/alerts-management',
    icon: <ConciergeBellFeatureIcon className={PRODUCT_ICON_CLASSNAME} aria-hidden="true" />,
    description: 'Multiple thresholds and dynamic routing at scale',
    name: 'Alerts',
    order: 5,
  },
  {
    key: 'external-apis',
    url: '/external-apis/',
    icon: <WorkflowIcon className={`${PRODUCT_ICON_CLASSNAME} text-signoz_robin-400`} />,
    description: 'Track third-party API performance',
    name: 'External API Monitoring',
    order: 9,
  },
  {
    key: 'DistributedTracing',
    url: '/distributed-tracing',
    icon: <DraftingCompassFeatureIcon className={PRODUCT_ICON_CLASSNAME} aria-hidden="true" />,
    description: 'Track requests across your services',
    name: 'Distributed Tracing',
    order: 2,
  },
  {
    key: 'MetricsDashboards',
    url: '/metrics-and-dashboards',
    icon: <LayoutGridFeatureIcon className={PRODUCT_ICON_CLASSNAME} aria-hidden="true" />,
    description: 'Monitor key metrics and build dashboards',
    name: 'Metrics & Dashboards',
    order: 6,
  },
  {
    key: 'messaging-queues',
    url: '/docs/messaging-queues/overview/',
    icon: <Logs className={`${PRODUCT_ICON_CLASSNAME} text-signoz_robin-400`} />,
    description: 'Monitor Kafka, Celery lag & throughput',
    name: 'Messaging Queues',
    order: 10,
  },
  {
    key: 'LogManagement',
    url: '/log-management',
    icon: <LogsFeatureIcon className={PRODUCT_ICON_CLASSNAME} aria-hidden="true" />,
    description: 'Fast queries with columnar database',
    name: 'Log Management',
    order: 3,
  },
  {
    key: 'Exceptions',
    url: '/exceptions-monitoring',
    icon: <BugFeatureIcon className={PRODUCT_ICON_CLASSNAME} aria-hidden="true" />,
    description: 'Record exceptions automatically',
    name: 'Exceptions',
    order: 7,
  },
  {
    key: 'llm-observability',
    url: '/llm-observability/',
    icon: <Brain className={`${PRODUCT_ICON_CLASSNAME} text-signoz_robin-400`} />,
    description: 'Monitor AI and LLM workflows',
    name: 'LLM Observability',
    order: 11,
  },
  {
    key: 'InfraMonitoring',
    url: '/docs/infrastructure-monitoring/overview/',
    icon: <BoxesIcon className={PRODUCT_ICON_CLASSNAME} aria-hidden="true" />,
    description: 'Monitor your infrastructure',
    name: 'Infrastructure Monitoring',
    order: 4,
  },
  {
    key: 'trace-funnels',
    url: '/trace-funnels/',
    icon: <Cone className={`${PRODUCT_ICON_CLASSNAME} text-signoz_sakura-400`} />,
    description: 'Track drop-offs in multi-step flows',
    name: 'Trace Funnels',
    order: 8,
  },
  {
    key: 'observability-for-ai-native-companies',
    url: '/observability-for-ai-native-companies/',
    icon: <ShieldPlus className={`${PRODUCT_ICON_CLASSNAME} text-signoz_robin-400`} />,
    description: 'Full-stack monitoring for AI applications',
    name: 'AI Observability',
    order: 12,
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
  {
    key: 'cloudwatch-alternative',
    url: '/cloudwatch-alternative/',
    name: 'SigNoz vs CloudWatch',
  },
  {
    key: 'clickstack-alternative',
    url: '/clickstack-alternative/',
    name: 'SigNoz vs ClickStack',
  },
]

// Sort the productDropdownItems based on the 'order' property
const productDropdownItemsForMobile = [...productDropdownItems].sort((a, b) => a.order - b.order)

const resourcesDropdownItems = {
  learn: [
    {
      key: 'blog',
      url: '/blog',
      description: 'News, ideas, and insights on observability',
      name: 'Blog',
    },
    {
      key: 'comparisons',
      url: '/comparisons',
      description: 'Compare observability tools',
      name: 'Comparisons',
    },
    {
      key: 'guides',
      url: '/guides',
      description: 'How-to guides and tutorials',
      name: 'Guides',
    },
    {
      key: 'opentelemetry',
      url: '/opentelemetry',
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
      url: '/docs/migration/migrate-from-datadog-to-signoz/',
      description: 'Guides for migrating to SigNoz',
      name: 'Migrations',
    },
    {
      key: 'dashboards',
      url: '/docs/dashboards/dashboard-templates/overview/',
      description: 'Explore dashboard templates for your use cases',
      name: 'Dashboard Templates',
    },
  ],
}

const NAV_BREAKPOINTS = {
  SIGN_IN: 640,
  PRODUCT: 840,
  WHY_SIGNOZ: 900,
  DOCS: 960,
  RESOURCES: 1020,
  PRICING: 1100,
  GITHUB_STARS: 1180,
  FULL_NAV: 1280,
} as const

export default function TopNav() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  // All hooks must be called at the top level, before any conditional returns
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDocsBasePath, setIsDocsBasePath] = useState(false)
  const [showMainMenu, setShowMainMenu] = useState(false)
  const [activeTab, setActiveTab] = useState(TABS.GUIDES)
  const [shouldShowTabs, setShouldShowTabs] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenResources, setIsOpenResources] = useState(false)
  // Track viewport width for progressive nav item hiding
  const [windowWidth, setWindowWidth] = useState<number | null>(null)

  const loginRoute = '/login/'
  const signupRoute = '/teams/'
  const contactUsRoute = '/contact-us/'
  const wordleRoute = '/todaysdevopswordle/'
  const isLoginRoute = pathname === loginRoute
  const isSignupRoute = pathname === signupRoute
  const isContactUsRoute = pathname === contactUsRoute
  const isWordleRoute = pathname === wordleRoute
  const source = searchParams.get(QUERY_PARAMS.SOURCE)

  const showCustomerStories = windowWidth === null || windowWidth >= NAV_BREAKPOINTS.FULL_NAV
  const showGithubStars = windowWidth === null || windowWidth >= NAV_BREAKPOINTS.GITHUB_STARS
  const showPricing = windowWidth === null || windowWidth >= NAV_BREAKPOINTS.PRICING
  const showResources = windowWidth === null || windowWidth >= NAV_BREAKPOINTS.RESOURCES
  const showDocs = windowWidth === null || windowWidth >= NAV_BREAKPOINTS.DOCS
  const showWhySignoz = windowWidth === null || windowWidth >= NAV_BREAKPOINTS.WHY_SIGNOZ
  const showProduct = windowWidth === null || windowWidth >= NAV_BREAKPOINTS.PRODUCT
  const showHamburger = windowWidth !== null && windowWidth < NAV_BREAKPOINTS.FULL_NAV
  const showSignInGetStarted = windowWidth === null || windowWidth >= NAV_BREAKPOINTS.SIGN_IN

  useEffect(() => {
    const isDocsBasePath = pathname.startsWith('/docs')
    setIsDocsBasePath(isDocsBasePath)

    if (!isDocsBasePath) {
      setShowMainMenu(true)
    } else {
      setShowMainMenu(false)
    }

    const isListingOrPagination = (base: string) =>
      pathname === base || pathname === `${base}/` || pathname.startsWith(`${base}/page/`)

    if (isListingOrPagination(TAB_PATHNAMES.BLOG)) {
      setActiveTab(TABS.BLOG)
      setShouldShowTabs(true)
    } else if (isListingOrPagination(TAB_PATHNAMES.COMPARISONS)) {
      setActiveTab(TABS.COMPARISONS)
      setShouldShowTabs(true)
    } else if (isListingOrPagination(TAB_PATHNAMES.GUIDES)) {
      setActiveTab(TABS.GUIDES)
      setShouldShowTabs(true)
    } else if (pathname.startsWith(`${TAB_PATHNAMES.OPENTELEMETRY}/page/`)) {
      setActiveTab(TABS.OPENTELEMETRY)
      setShouldShowTabs(true)
    } else {
      setShouldShowTabs(false)
    }
  }, [pathname])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const update = () => setWindowWidth(window.innerWidth)
    update()
    let rafId: number
    const handleResize = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(rafId)
    }
  }, [])

const handleProductDropdownClick = () => setIsOpen(false)
  const handleResourcesDropdownClick = () => setIsOpenResources(false)

  // Hide TopNav on teams, contact-us page or if source is onboarding
  if (isSignupRoute || isContactUsRoute || isWordleRoute || source === ONBOARDING_SOURCE) {
    return null
  }

  return (
    <div className="fixed left-0 right-0 z-[50]">
      <header
        className={`header-bg relative z-10 mx-auto box-border flex h-[56px] w-full items-center border-b border-signoz_slate-500 px-4 text-signoz_vanilla-100 backdrop-blur-[20px] dark:text-signoz_vanilla-100 md:px-8 lg:px-8`}
      >
        <nav
          className="container flex w-full justify-between text-signoz_vanilla-100 dark:text-signoz_vanilla-100"
          aria-label="Global"
        >
          <div className="flex justify-start gap-x-6">
            <TrackingLink
              href="/"
              className="-m-1.5 flex items-center gap-2 p-1.5"
              clickType="Nav Click"
              clickName="SigNoz Logo"
              clickText="SigNoz"
              clickLocation="Top Navbar"
              onClick={() => setMobileMenuOpen(false)}
            >
              <SigNozLogo className="h-5 w-auto shrink-0" aria-hidden="true" />

              <span className="text-[17.111px] font-medium">SigNoz</span>
            </TrackingLink>

            {!isLoginRoute && (
              <div className={`flex items-center gap-x-6 ${showProduct ? 'ml-6' : ''}`}>
                {showProduct && (
                  <div
                    onPointerEnter={() => setIsOpen(true)}
                    onPointerLeave={() => setIsOpen(false)}
                    className="flex items-center"
                  >
                    <Popover.Root
                      open={isOpen}
                      onOpenChange={(open) => {
                        if (!open) setIsOpen(false)
                      }}
                      modal={false}
                    >
                      <Popover.Trigger asChild>
                        <Button className="truncate px-1.5 py-1 text-sm outline-none hover:text-signoz_robin-500">
                          <div className="flex items-center">
                            Product
                            <ChevronDown
                              size={12}
                              className={`ml-1 transform transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                            />
                          </div>
                        </Button>
                      </Popover.Trigger>
                      <Popover.Content
                        side="bottom"
                        align="start"
                        sideOffset={4}
                        className="z-50 min-w-fit origin-top-left rounded-[4px] border border-signoz_slate-500 bg-[hsl(240_5.88%_10%)] p-0 shadow-[0_12px_48px_rgba(0,0,0,0.55)] outline-none will-change-transform before:absolute before:-top-[4px] before:left-0 before:right-0 before:h-[4px] before:content-[''] data-[state=closed]:animate-nav-popover-out data-[state=open]:animate-nav-popover-in motion-reduce:animate-none"
                      >
                        <div className="flex min-w-0 flex-row">
                          <div className="flex min-w-0 flex-1 flex-col gap-y-4 p-6">
                            <div
                              className={`text-[11px] font-semibold uppercase leading-[18px] tracking-[0.88px] text-signoz_vanilla-100`}
                            >
                              Product Modules
                            </div>
                            <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-x-0 gap-y-4">
                              {productDropdownItems.map((item) => (
                                <TrackingLink
                                  href={item.url || ''}
                                  disabled={item.url === undefined}
                                  className={`group flex h-auto min-w-0 items-center gap-4 ${item.url === undefined ? 'cursor-not-allowed opacity-80' : ''}`}
                                  key={item.key}
                                  clickType="Nav Click"
                                  clickName={`${item.name} Product Link`}
                                  clickText={item.name}
                                  clickLocation="Top Navbar"
                                  onClick={handleProductDropdownClick}
                                  prefetch={false}
                                >
                                  {item.icon}
                                  <div className="min-w-0">
                                    <div className="flex flex-row items-center gap-1">
                                      <span className="text-sm">{item.name}</span>{' '}
                                      <ArrowRight
                                        size={14}
                                        className="shrink-0 opacity-0 group-hover:opacity-100"
                                      />
                                    </div>
                                    <div
                                      className={`line-clamp-2 max-w-[274px] text-xs text-signoz_vanilla-400  group-hover:text-[#FFF]`}
                                    >
                                      {item.description}
                                    </div>
                                  </div>
                                </TrackingLink>
                              ))}
                            </div>
                          </div>
                          <div className="flex w-[280px] shrink-0 flex-col gap-y-6 border-l border-signoz_slate-400 bg-[hsl(240_5.88%_10%)] p-6 sm:w-[300px] lg:w-[320px]">
                            <div className="flex flex-col gap-y-4">
                              <Link
                                href={'/case-study'}
                                className={`flex flex-row items-center gap-1 text-[11px] font-semibold uppercase leading-[18px] tracking-[0.88px] text-signoz_vanilla-100 hover:text-[#fff]`}
                                onClick={handleProductDropdownClick}
                                prefetch={false}
                              >
                                <span>Customer Stories</span> <ArrowRight size={14} />
                              </Link>
                              <div>
                                <TrackingLink
                                  href={'/case-study/brainfish/'}
                                  className="group flex h-auto min-w-0 items-center gap-4"
                                  clickType="Nav Click"
                                  clickName="Customer Stories Link"
                                  clickText="How Brainfish leveraged SigNoz for effective Kubernetes monitoring"
                                  clickLocation="Top Navbar"
                                  onClick={handleProductDropdownClick}
                                  prefetch={false}
                                >
                                  <BrainfishIcon
                                    className="h-5 w-5 shrink-0 rounded-sm"
                                    aria-hidden="true"
                                  />
                                  <div
                                    className={`line-clamp-2 max-w-[274px] text-sm text-signoz_vanilla-400 group-hover:text-[#fff]`}
                                  >
                                    How Brainfish leveraged SigNoz for effective Kubernetes
                                    monitoring
                                  </div>
                                </TrackingLink>
                              </div>
                            </div>
                            <div className="flex flex-col gap-y-4">
                              <div
                                className={`flex flex-row items-center gap-1 text-[11px] font-semibold uppercase leading-[18px] tracking-[0.88px] text-signoz_vanilla-100`}
                              >
                                <span>Compare Signoz</span>
                              </div>
                              <div
                                className={`flex flex-col gap-1 text-sm text-signoz_vanilla-400`}
                              >
                                {comparisionItems.map((comparisionItem) => (
                                  <TrackingLink
                                    key={comparisionItem.key}
                                    href={comparisionItem.url}
                                    className="group flex flex-row items-center gap-1 hover:text-[#fff]"
                                    clickType="Nav Click"
                                    clickName={`${comparisionItem.name} Comparison Link`}
                                    clickText={comparisionItem.name}
                                    clickLocation="Top Navbar"
                                    onClick={handleProductDropdownClick}
                                    prefetch={false}
                                  >
                                    <span>{comparisionItem.name}</span>{' '}
                                    <ArrowRight
                                      className="opacity-0 group-hover:opacity-100"
                                      size={14}
                                    />
                                  </TrackingLink>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Popover.Content>
                    </Popover.Root>
                  </div>
                )}
                {showWhySignoz && (
                  <TrackingLink
                    href="/why-signoz"
                    className="flex items-center truncate px-1.5 py-1 text-sm font-normal hover:text-signoz_robin-500"
                    clickType="Nav Click"
                    clickName="Why Signoz Link"
                    clickText="Why Signoz"
                    clickLocation="Top Navbar"
                    prefetch={false}
                  >
                    Why SigNoz
                  </TrackingLink>
                )}
                {showDocs && (
                  <TrackingLink
                    href="/docs"
                    className="flex items-center truncate px-1.5 py-1 text-sm font-normal hover:text-signoz_robin-500"
                    clickType="Nav Click"
                    clickName="Docs Link"
                    clickText="Docs"
                    clickLocation="Top Navbar"
                    prefetch={false}
                  >
                    Docs
                  </TrackingLink>
                )}

                {showResources && (
                  <div
                    onPointerEnter={() => setIsOpenResources(true)}
                    onPointerLeave={() => setIsOpenResources(false)}
                    className="flex items-center"
                  >
                    <Popover.Root
                      open={isOpenResources}
                      onOpenChange={(open) => {
                        if (!open) setIsOpenResources(false)
                      }}
                      modal={false}
                    >
                      <Popover.Trigger asChild>
                        <Button className="truncate px-1.5 py-1 text-sm outline-none hover:text-signoz_robin-500">
                          <div className="flex items-center">
                            Resources
                            <ChevronDown
                              size={12}
                              className={`ml-1 transform transition-transform duration-300 ease-in-out ${isOpenResources ? 'rotate-180' : 'rotate-0'}`}
                            />
                          </div>
                        </Button>
                      </Popover.Trigger>
                      <Popover.Content
                        side="bottom"
                        align="start"
                        sideOffset={4}
                        className="z-50 min-w-fit origin-top-left rounded-[4px] border border-signoz_slate-500 bg-[hsl(240_5.88%_10%)] p-0 shadow-[0_12px_48px_rgba(0,0,0,0.55)] outline-none will-change-transform before:absolute before:-top-[4px] before:left-0 before:right-0 before:h-[4px] before:content-[''] data-[state=closed]:animate-nav-popover-out data-[state=open]:animate-nav-popover-in motion-reduce:animate-none"
                      >
                        <div className="flex min-w-0 flex-row">
                          <div className="flex min-w-0 flex-1 flex-col gap-y-4 p-6">
                            <div
                              className={`text-[11px] font-semibold uppercase leading-[18px] tracking-[0.88px] text-signoz_vanilla-100`}
                            >
                              Learn
                            </div>
                            <div className="grid grid-cols-1 gap-x-3 gap-y-5">
                              {resourcesDropdownItems.learn.map((item) => (
                                <TrackingLink
                                  href={item.url}
                                  className="group flex h-auto items-center gap-4"
                                  key={item.key}
                                  clickType="Nav Click"
                                  clickName={`${item.name} Link`}
                                  clickText={item.name}
                                  clickLocation="Top Navbar"
                                  onClick={handleResourcesDropdownClick}
                                  prefetch={false}
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
                                      className={`line-clamp-2 max-w-[274px] text-xs text-signoz_vanilla-400  group-hover:text-[#FFF]`}
                                    >
                                      {item.description}
                                    </div>
                                  </div>
                                </TrackingLink>
                              ))}
                            </div>
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col gap-y-4 p-6">
                            <div
                              className={`text-[11px] font-semibold uppercase leading-[18px] tracking-[0.88px] text-signoz_vanilla-100`}
                            >
                              Explore
                            </div>
                            <div className="grid grid-cols-1 gap-x-3 gap-y-5">
                              {resourcesDropdownItems.explore.map((item) => (
                                <TrackingLink
                                  href={item.url}
                                  className="group flex h-auto items-center gap-4"
                                  key={item.key}
                                  clickType="Nav Click"
                                  clickName={`${item.name} Link`}
                                  clickText={item.name}
                                  clickLocation="Top Navbar"
                                  onClick={handleResourcesDropdownClick}
                                  prefetch={false}
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
                                      className={`line-clamp-2 max-w-[274px] text-xs text-signoz_vanilla-400  group-hover:text-[#FFF]`}
                                    >
                                      {item.description}
                                    </div>
                                  </div>
                                </TrackingLink>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Popover.Content>
                    </Popover.Root>
                  </div>
                )}

                {showPricing && (
                  <TrackingLink
                    href="/pricing"
                    className="flex items-center truncate px-1.5 py-1 text-sm font-normal hover:text-signoz_robin-500"
                    clickType="Nav Click"
                    clickName="Pricing Link"
                    clickText="Pricing"
                    clickLocation="Top Navbar"
                  >
                    Pricing
                  </TrackingLink>
                )}
                {showCustomerStories && (
                  <TrackingLink
                    href="/case-study"
                    className="flex items-center truncate px-1.5 py-1 text-sm font-normal hover:text-signoz_robin-500"
                    clickType="Nav Click"
                    clickName="Customer Stories Link"
                    clickText="Customer Stories"
                    clickLocation="Top Navbar"
                  >
                    Customer Stories
                  </TrackingLink>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center justify-end gap-3">
            {!isLoginRoute && (
              <>
                <SearchButton />
                {showGithubStars && <GitHubStars location="Top Navbar" />}

                {showSignInGetStarted && (
                  <>
                    <TrackingButton
                      className="-ml-1 box-border flex h-8 items-center gap-2 rounded-full bg-signoz_slate-500 px-4 py-2 pl-2 pr-2.5 text-sm font-normal not-italic leading-5 text-signoz_vanilla-100 no-underline outline-none hover:text-white"
                      clickType="Secondary CTA"
                      clickName="Sign In Button"
                      clickText="Sign In"
                      clickLocation="Top Navbar"
                      onClick={() => router.push('/login')}
                    >
                      Sign In
                    </TrackingButton>

                    <TrackingLink
                      href="/teams"
                      className="start-free-trial-btn flex h-8 items-center justify-center gap-1.5 truncate rounded-full px-4 py-2 pl-4 pr-3 text-center text-sm font-medium not-italic leading-5 text-white no-underline outline-none hover:text-white"
                      clickType="Primary CTA"
                      clickName="Sign Up Button"
                      clickText="Get Started - Free"
                      clickLocation="Top Navbar"
                    >
                      <Button id="btn-get-started-website-navbar" className="flex-center">
                        Get Started - Free
                        <ArrowRight size={14} />
                      </Button>
                    </TrackingLink>
                  </>
                )}
              </>
            )}

            {isLoginRoute && (
              <div className="flex items-center gap-2">
                <TrackingLink
                  href="mailto:cloud-support@signoz.io"
                  className="flex-center mr-8 text-xs"
                  clickType="Support Link"
                  clickName="Contact Support Link"
                  clickText="Need help? Contact support"
                  clickLocation="Top Navbar"
                >
                  Need help? <span className="text-signoz_robin-500">Contact support</span>
                </TrackingLink>

                <TrackingButton
                  id="btn-get-started-website-navbar"
                  className="flex h-8 min-w-24 items-center justify-center gap-1.5 truncate rounded-sm border border-signoz_slate-300 bg-signoz_slate-500 px-4 py-2 pl-2 pr-2.5 text-center text-xs font-normal not-italic leading-5  text-signoz_vanilla-400 no-underline outline-none hover:text-white"
                  clickType="Primary CTA"
                  clickName="Signup Button"
                  clickText="Signup"
                  clickLocation="Top Navbar"
                  onClick={() => router.push('/teams')}
                >
                  <PenSquare size={12} /> Signup
                </TrackingButton>

                <TrackingButton
                  className="flex h-8 min-w-24 items-center justify-center gap-2 truncate rounded-sm border border-signoz_slate-300 bg-signoz_slate-500 px-4 py-2 pl-4 pr-3 text-center text-xs font-normal not-italic leading-5 text-signoz_vanilla-400 no-underline outline-none hover:text-white"
                  clickType="Secondary CTA"
                  clickName="Docs Button"
                  clickText="Docs"
                  clickLocation="Top Navbar"
                  onClick={() => router.push('/docs')}
                >
                  <BookOpenText size={12} /> Docs
                </TrackingButton>
              </div>
            )}

            {showHamburger && (
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X strokeWidth={1.5} className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu strokeWidth={1.5} className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            )}
          </div>
        </nav>
        <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 top-[56px]" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 mt-[56px] w-full overflow-y-auto bg-signoz_ink-500 px-6 py-24 !pt-[calc(6rem-56px)] sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 ">
            <div className="flex items-center justify-between">
              <TrackingLink
                href="/"
                className="-m-1.5 p-1.5"
                clickType="Nav Click"
                clickName="SigNoz Logo"
                clickText="SigNoz"
                clickLocation="Mobile Menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">SigNoz</span>
              </TrackingLink>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                {showMainMenu && (
                  <div className="space-y-2 py-8">
                    <Accordion
                      topic="Product"
                      subtopics={productDropdownItemsForMobile}
                      onLinkClick={() => setMobileMenuOpen(false)}
                    />
                    <TrackingLink
                      href="/why-signoz"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-signoz_ink-200"
                      clickType="Nav Click"
                      clickName="Why Signoz Link"
                      clickText="Why Signoz"
                      clickLocation="Mobile Menu"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Why Signoz
                    </TrackingLink>
                    <TrackingLink
                      href="/docs"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-signoz_ink-200"
                      clickType="Nav Click"
                      clickName="Docs Link"
                      clickText="Documentation"
                      clickLocation="Mobile Menu"
                      onClick={() => setMobileMenuOpen(false)}
                      prefetch={false}
                    >
                      Documentation
                    </TrackingLink>

                    <Accordion
                      topic="Resources"
                      subtopics={[
                        ...resourcesDropdownItems.learn,
                        ...resourcesDropdownItems.explore,
                      ]}
                      onLinkClick={() => setMobileMenuOpen(false)}
                    />
                    <TrackingLink
                      href="/pricing"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-signoz_ink-200"
                      clickType="Nav Click"
                      clickName="Pricing Link"
                      clickText="Pricing"
                      clickLocation="Mobile Menu"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Pricing
                    </TrackingLink>
                    <TrackingLink
                      href="/case-study"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-signoz_ink-200"
                      clickType="Nav Click"
                      clickName="Customer Stories Link"
                      clickText="Customer Stories"
                      clickLocation="Mobile Menu"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Customer Stories
                    </TrackingLink>

                    <div className="-mx-3 inline-block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-signoz_ink-200">
                      <GitHubStars location="Mobile Menu" />
                    </div>

                    {!isSignupRoute && (
                      <>
                        <TrackingButton
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-signoz_ink-200"
                          clickType="Secondary CTA"
                          clickName="Sign In Button"
                          clickText="Sign In"
                          clickLocation="Mobile Menu"
                          onClick={() => {
                            router.push('/login')
                            setMobileMenuOpen(false)
                          }}
                        >
                          Sign In
                        </TrackingButton>

                        <TrackingLink
                          href="/teams"
                          clickType="Primary CTA"
                          clickName="Sign Up Button"
                          clickText="Get Started - Free"
                          className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-signoz_ink-200"
                          clickLocation="Mobile Menu"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Button
                            className="start-free-trial-btn font-heading flex items-center justify-center gap-1 truncate rounded-md border-none px-4 py-2 text-center text-sm font-bold leading-4 text-white no-underline outline-none hover:text-white"
                            id="btn-get-started-website-navbar"
                          >
                            Get Started - Free
                            <ArrowRight size={14} />
                          </Button>
                        </TrackingLink>
                      </>
                    )}
                  </div>
                )}

                {isDocsBasePath && !showMainMenu && (
                  <div className="docs-sidebar-mobile-nav">
                    <TrackingButton
                      className="mt-4 inline-flex items-center gap-1 rounded px-1 py-1 text-sm font-bold text-white"
                      clickType="Nav Click"
                      clickName="Back to Main Menu Button"
                      clickText="Back to main menu"
                      clickLocation="Mobile Menu"
                      onClick={() => {
                        setShowMainMenu(true)
                      }}
                    >
                      <ArrowBigLeft size={16} /> Back to main menu
                    </TrackingButton>

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
