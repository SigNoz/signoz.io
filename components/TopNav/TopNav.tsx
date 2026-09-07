'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { isHubShellRoute } from '@/utils/opentelemetryHub'
import SigNozLogo from '@/public/img/SigNozLogo-orange.svg'
import SearchButtonDeferred from '../SearchButtonDeferred'
import GitHubStars from '../GithubStars/GithubStars'
import Tabs from '@/components/ResourceCenter/Tabs'
import TrackingLink from '@/components/TrackingLink'
import NavCtaButtons from './NavCtaButtons'
import { NAV_PILL_CLASS } from './NavPill'
import { cn } from 'app/lib/utils'
import { TABS, TAB_PATHNAMES } from './constants'
import { useNavVisibility } from './useNavVisibility'
import ProductDropdown from './ProductDropdown'
import UseCasesDropdown from './UseCasesDropdown'
import ResourcesDropdown from './ResourcesDropdown'
import { NavDropdownProvider } from './NavDropdownContext'
import NavDropdownPanel from './NavDropdownPanel'
import MobileMenu from './MobileMenu'
import LoginActions from './LoginActions'
import { useMobileDocsSidebar } from '@/components/DocsSidebar/MobileDocsSidebarContext'

export default function TopNav() {
  const pathname = usePathname()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(TABS.GUIDES)
  const [shouldShowTabs, setShouldShowTabs] = useState(false)

  const docsSidebar = useMobileDocsSidebar()
  const isDocsBasePath = pathname.startsWith('/docs')
  const isShellLayoutPath = isDocsBasePath || isHubShellRoute(pathname)
  const visibility = useNavVisibility()

  useEffect(() => {
    return docsSidebar.onMainMenuRequest(() => setMobileMenuOpen(true))
  }, [docsSidebar])

  const isLoginRoute = pathname === '/login/'
  const isSignupRoute = pathname === '/teams/'
  const isContactUsRoute = pathname === '/contact-us/'
  const isWordleRoute = pathname === '/todaysdevopswordle/'

  useEffect(() => {
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
    <div
      className={cn(
        'fixed left-0 right-0 z-[50]',
        (mobileMenuOpen || docsSidebar.isOpen) && 'z-[1200]'
      )}
    >
      <header
        className={cn(
          'header-bg relative z-10 mx-auto box-border flex h-[56px] w-full items-center border-b border-[var(--l1-border)] text-[var(--l1-foreground)] backdrop-blur-[20px]',
          (mobileMenuOpen || docsSidebar.isOpen) && '!bg-[var(--l1-background)]'
        )}
      >
        <nav
          className={cn(
            'mx-auto flex w-full justify-between text-[var(--l1-foreground)]',
            !isShellLayoutPath && 'max-w-8xl'
          )}
          aria-label="Global"
        >
          <div className="flex items-center justify-start">
            <TrackingLink
              href="/"
              className={cn(
                '-m-1.5 flex items-center p-1.5',
                isShellLayoutPath ? 'gap-1.5' : 'gap-2'
              )}
              clickType="Nav Click"
              clickName="SigNoz Logo"
              clickText="SigNoz"
              clickLocation="Top Navbar"
              onClick={() => {
                setMobileMenuOpen(false)
                docsSidebar.close()
              }}
            >
              <SigNozLogo
                className="h-5 w-auto shrink-0"
                aria-hidden="true"
                title="Open Source Datadog Alternative"
              />
              <span className="text-[17.111px] font-medium">SigNoz</span>
            </TrackingLink>
            {!isLoginRoute && (
              <NavDropdownProvider>
                <div
                  className={cn(
                    'hidden items-center gap-x-3 min-[840px]:flex',
                    isShellLayoutPath ? 'ml-7' : visibility.showProduct ? 'ml-6' : ''
                  )}
                >
                  {visibility.showProduct && <ProductDropdown />}
                  {visibility.showUseCases && <UseCasesDropdown />}
                  {visibility.showDocs && (
                    <TrackingLink
                      href="/docs/introduction/"
                      className={NAV_PILL_CLASS}
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
                  {visibility.showPricing && (
                    <TrackingLink
                      href="/pricing/"
                      className={NAV_PILL_CLASS}
                      clickType="Nav Click"
                      clickName="Pricing Link"
                      clickText="Pricing"
                      clickLocation="Top Navbar"
                    >
                      Pricing
                    </TrackingLink>
                  )}
                  {visibility.showCustomers && (
                    <TrackingLink
                      href="/customers/"
                      className={NAV_PILL_CLASS}
                      clickType="Nav Click"
                      clickName="Customers Link"
                      clickText="Customers"
                      clickLocation="Top Navbar"
                      prefetch={false}
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
                {visibility.showSignInGetStarted && <NavCtaButtons location="Top Navbar" />}
              </>
            )}

            {isLoginRoute && <LoginActions />}

            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 min-[1320px]:hidden"
              onClick={() => {
                if (mobileMenuOpen) {
                  setMobileMenuOpen(false)
                  return
                }
                if (docsSidebar.isOpen) {
                  docsSidebar.close()
                  return
                }
                if (isDocsBasePath) {
                  docsSidebar.toggle()
                } else {
                  setMobileMenuOpen(true)
                }
              }}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen || docsSidebar.isOpen ? (
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
          isSignupRoute={isSignupRoute}
        />
      </header>

      {shouldShowTabs ? <Tabs activeTab={activeTab} /> : null}
    </div>
  )
}
