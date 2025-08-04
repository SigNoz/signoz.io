'use client'

import React, { useEffect, useState } from 'react'
import { Button, Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import {
  ArrowBigLeft,
  ArrowRight,
  BookOpenText,
  ChevronDown,
  PenSquare,
} from 'lucide-react'
import SearchButton from '../SearchButton'
import GitHubStars from '../GithubStars/GithubStars'
import DocsSidebar from '../DocsSidebar/DocsSidebar'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Tabs from '../../app/resource-center/Shared/Tabs'
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react'
import Accordion from '../Accordion/Accordion'
import { QUERY_PARAMS } from '@/constants/queryParams'
import { ONBOARDING_SOURCE } from '@/constants/globals'
import TrackingLink from '@/components/TrackingLink'
import TrackingButton from '@/components/TrackingButton'
import {
  TABS,
  TAB_PATHNAMES,
  resourcesDropdownItems,
  productDropdownItemsForMobile,
} from './constants'

import ProductPopoverContent from './ProductPopoverContent'
import ResourcesPopoverContent from './ResourcesPopoverContent'
import AuthButtons from './AuthButtons'

export default function TopNavContent() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDocsBasePath, setIsDocsBasePath] = useState(false)
  const [showMainMenu, setShowMainMenu] = useState(false)
  const [activeTab, setActiveTab] = useState(TABS.GUIDES)
  const [shouldShowTabs, setShouldShowTabs] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenResources, setIsOpenResources] = useState(false)
  const [timeoutId, setTimeoutId] = useState<any>(null)
  const [timeoutIdResources, setTimeoutIdResources] = useState<any>(null)

  const loginRoute = '/login/'
  const signupRoute = '/teams/'
  const wordleRoute = '/todaysdevopswordle/'
  const isLoginRoute = pathname === loginRoute
  const isSignupRoute = pathname === signupRoute
  const isWordleRoute = pathname === wordleRoute
  const source = searchParams.get(QUERY_PARAMS.SOURCE)
  const delay = 500

  useEffect(() => {
    const isDocs = pathname.startsWith('/docs')
    setIsDocsBasePath(isDocs)

    if (!isDocs) {
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

  // Hide TopNav on teams page or if source is onboarding
  if (isSignupRoute || isWordleRoute || source === ONBOARDING_SOURCE) {
    return null
  }

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

  return (
    <div className="fixed left-0 right-0 z-30">
      <header
        className={`header-bg mx-auto box-border flex h-[56px] w-full items-center border-b border-signoz_slate-500 px-4 text-signoz_vanilla-100 backdrop-blur-[20px] dark:text-signoz_vanilla-100 md:px-8 lg:px-8`}
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
              <Image
                className="h-5 w-auto"
                src="/img/SigNozLogo-orange.svg"
                width={160}
                height={60}
                alt=""
              />
              <span className="text-[17.111px] font-medium">SigNoz</span>
            </TrackingLink>

            {!isLoginRoute && (
              <div className="hidden items-center gap-x-6 lg:flex">
                <div
                  onMouseEnter={handleMouseEnterProduct}
                  onMouseLeave={handleMouseLeaveProduct}
                  className="flex items-center"
                >
                  <Popover placement="bottom-start" showArrow={false} isOpen={isOpen} className="py-2.5">
                    <PopoverTrigger>
                      <Button
                        className="truncate px-1.5 py-1 text-sm font-extralight hover:text-signoz_robin-500 "
                        onMouseEnter={() => setIsOpen(true)}
                      >
                        <div className="flex items-center">
                          Product
                          <ChevronDown
                            size={12}
                            className={`ml-1 transform transition-transform duration-300 ease-in-out ${
                              isOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                          />
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="rounded-[4px] p-0">
                      <ProductPopoverContent handleProductDropdownClick={handleProductDropdownClick} />
                    </PopoverContent>
                  </Popover>
                </div>
                <TrackingLink
                  href="/docs"
                  className="flex items-center truncate px-1.5 py-1 text-sm font-normal hover:text-signoz_robin-500"
                  clickType="Nav Click"
                  clickName="Docs Link"
                  clickText="Docs"
                  clickLocation="Top Navbar"
                >
                  Docs
                </TrackingLink>

                <div
                  onMouseEnter={handleMouseEnterResources}
                  onMouseLeave={handleMouseLeaveResources}
                  className="flex items-center"
                >
                  <Popover placement="bottom-start" showArrow={false} isOpen={isOpenResources} className="py-2.5">
                    <PopoverTrigger>
                      <Button
                        className="truncate px-1.5 py-1 text-sm font-extralight hover:text-signoz_robin-500 "
                        onMouseEnter={() => setIsOpenResources(true)}
                      >
                        <div className="flex items-center">
                          Resources
                          <ChevronDown
                            size={12}
                            className={`ml-1 transform transition-transform duration-300 ease-in-out ${
                              isOpenResources ? 'rotate-180' : 'rotate-0'
                            }`}
                          />
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="rounded-[4px] p-0">
                      <ResourcesPopoverContent
                        handleResourcesDropdownClick={handleResourcesDropdownClick}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

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
                <GitHubStars location="Top Navbar" />

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
          </div>
        </nav>

        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
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
                      href="/docs"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-signoz_ink-200"
                      clickType="Nav Click"
                      clickName="Docs Link"
                      clickText="Documentation"
                      clickLocation="Mobile Menu"
                      onClick={() => setMobileMenuOpen(false)}
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
                      <AuthButtons
                        router={router}
                        closeMobileMenu={() => setMobileMenuOpen(false)}
                      />
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