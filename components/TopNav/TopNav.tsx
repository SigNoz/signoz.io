'use client'

import { useEffect, useState } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import SigNozLogo from '@/public/img/SigNozLogo-orange.svg'
import SearchButtonDeferred from '../SearchButtonDeferred'
import GitHubStars from '../GithubStars/GithubStars'
import Tabs from '@/components/ResourceCenter/Tabs'
import TrackingLink from '@/components/TrackingLink'
import TrackingButton from '@/components/TrackingButton'
import { Button } from '@/components/ui/Button'
import { TABS, TAB_PATHNAMES } from './constants'
import { useNavVisibility } from './useNavVisibility'
import ProductDropdown from './ProductDropdown'
import ResourcesDropdown from './ResourcesDropdown'
import CompareSignozDropdown from './CompareSignozDropdown'
import { NavDropdownProvider } from './NavDropdownContext'
import NavDropdownPanel from './NavDropdownPanel'
import MobileMenu from './MobileMenu'
import LoginActions from './LoginActions'

export default function TopNav() {
  const pathname = usePathname()
  const router = useRouter()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDocsBasePath, setIsDocsBasePath] = useState(false)
  const [showMainMenu, setShowMainMenu] = useState(false)
  const [activeTab, setActiveTab] = useState(TABS.GUIDES)
  const [shouldShowTabs, setShouldShowTabs] = useState(false)

  const visibility = useNavVisibility()

  const isLoginRoute = pathname === '/login/'
  const isSignupRoute = pathname === '/teams/'
  const isContactUsRoute = pathname === '/contact-us/'
  const isWordleRoute = pathname === '/todaysdevopswordle/'

  useEffect(() => {
    const docsBase = pathname.startsWith('/docs')
    setIsDocsBasePath(docsBase)
    setShowMainMenu(!docsBase)

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

  // Hide TopNav on teams, contact-us page
  if (isSignupRoute || isContactUsRoute || isWordleRoute) {
    return null
  }

  return (
    <div className="fixed left-0 right-0 z-[50]">
      <header className="header-bg relative z-10 mx-auto box-border flex h-[56px] w-full items-center border-b border-signoz_slate-500 text-signoz_vanilla-100 backdrop-blur-[20px] dark:text-signoz_vanilla-100">
        <nav
          className="mx-auto flex w-full max-w-8xl justify-between text-signoz_vanilla-100 dark:text-signoz_vanilla-100 md:px-8"
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
              <NavDropdownProvider>
                <div
                  className={`hidden items-center gap-x-3 min-[840px]:flex ${visibility.showProduct ? 'ml-6' : ''}`}
                >
                  {visibility.showProduct && <ProductDropdown />}
                  {visibility.showDocs && (
                    <TrackingLink
                      href="/docs"
                      className="flex items-center truncate rounded-full px-2.5 py-1 text-sm font-normal transition-colors hover:bg-signoz_robin-200/20"
                      clickType="Nav Click"
                      clickName="Docs Link"
                      clickText="Docs"
                      clickLocation="Top Navbar"
                      prefetch={false}
                    >
                      Docs
                    </TrackingLink>
                  )}
                  {visibility.showResources && <ResourcesDropdown />}
                  {visibility.showCompareSignoz && <CompareSignozDropdown />}
                  {visibility.showPricing && (
                    <TrackingLink
                      href="/pricing"
                      className="flex items-center truncate rounded-full px-2.5 py-1 text-sm font-normal transition-colors hover:bg-signoz_robin-200/20"
                      clickType="Nav Click"
                      clickName="Pricing Link"
                      clickText="Pricing"
                      clickLocation="Top Navbar"
                    >
                      Pricing
                    </TrackingLink>
                  )}
                  {visibility.showCustomerStories && (
                    <TrackingLink
                      href="/case-study"
                      className="flex items-center truncate rounded-full px-2.5 py-1 text-sm font-normal transition-colors hover:bg-signoz_robin-200/20"
                      clickType="Nav Click"
                      clickName="Customer Stories Link"
                      clickText="Customers"
                      clickLocation="Top Navbar"
                    >
                      Customers
                    </TrackingLink>
                  )}
                </div>
                <NavDropdownPanel />
              </NavDropdownProvider>
            )}
          </div>

          <div className="flex items-center justify-end gap-2">
            {!isLoginRoute && (
              <>
                <SearchButtonDeferred />
                {visibility.showGithubStars && <GitHubStars location="Top Navbar" />}
                {visibility.showSignInGetStarted && (
                  <>
                    <TrackingButton
                      className="box-border flex h-8 items-center rounded-full bg-signoz_slate-500 px-3 text-sm font-normal text-signoz_vanilla-100 no-underline outline-none hover:bg-slate-700/50 hover:text-white"
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
                      clickType="Primary CTA"
                      clickName="Sign Up Button"
                      clickText="Get Started - Free"
                      clickLocation="Top Navbar"
                    >
                      <Button
                        asChild
                        rounded="full"
                        className="start-free-trial-btn h-8 gap-1.5 px-4 text-sm font-medium text-white hover:text-white"
                      >
                        <span id="btn-get-started-website-navbar">
                          Get Started - Free
                          <ArrowRight size={14} />
                        </span>
                      </Button>
                    </TrackingLink>
                  </>
                )}
              </>
            )}

            {isLoginRoute && <LoginActions />}

            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 min-[1280px]:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X strokeWidth={1.5} className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu strokeWidth={1.5} className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        <MobileMenu
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          showMainMenu={showMainMenu}
          isDocsBasePath={isDocsBasePath}
          isSignupRoute={isSignupRoute}
          onShowMainMenu={() => setShowMainMenu(true)}
        />
      </header>

      {shouldShowTabs ? <Tabs activeTab={activeTab} /> : null}
    </div>
  )
}
