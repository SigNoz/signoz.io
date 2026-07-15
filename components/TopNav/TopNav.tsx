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
import { Badge } from '@signozhq/ui/badge'
import { Button } from '@/components/ui/Button'
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
  const router = useRouter()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(TABS.GUIDES)
  const [shouldShowTabs, setShouldShowTabs] = useState(false)

  const docsSidebar = useMobileDocsSidebar()
  const isDocsBasePath = pathname.startsWith('/docs')
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
    <div className="fixed right-0 left-0 z-[50]">
      <header className="header-bg border-border text-foreground dark:text-foreground relative z-10 mx-auto box-border flex h-[56px] w-full items-center border-b backdrop-blur-[20px]">
        <nav
          className={cn(
            'text-l1-foreground dark:text-l1-foreground mx-auto flex w-full justify-between',
            !isDocsBasePath && 'max-w-8xl'
          )}
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
            {isDocsBasePath && (
              <Badge color="cherry" className="self-center uppercase">
                docs
              </Badge>
            )}

            {!isLoginRoute && (
              <NavDropdownProvider>
                <div
                  className={`hidden items-center gap-x-3 min-[840px]:flex ${visibility.showProduct ? 'ml-6' : ''}`}
                >
                  {visibility.showProduct && <ProductDropdown />}
                  {visibility.showUseCases && <UseCasesDropdown />}
                  {visibility.showDocs && (
                    <TrackingLink
                      href="/docs/introduction/"
                      className="hover:bg-robin-200/20 flex items-center truncate rounded-full px-2.5 py-1 text-sm font-normal transition-colors"
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
                      className="hover:bg-robin-200/20 flex items-center truncate rounded-full px-2.5 py-1 text-sm font-normal transition-colors"
                      clickType="Nav Click"
                      clickName="Pricing Link"
                      clickText="Pricing"
                      clickLocation="Top Navbar"
                    >
                      Pricing
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
                      variant="secondary"
                      rounded="default"
                      className="bg-muted text-l1-foreground hover:bg-muted hover:text-foreground box-border flex h-8 items-center rounded-md px-3 text-sm font-normal no-underline outline-none"
                      clickType="Secondary CTA"
                      clickName="Sign In Button"
                      clickText="Sign In"
                      clickLocation="Top Navbar"
                      onClick={() => router.push('/login')}
                    >
                      Sign In
                    </TrackingButton>
                    <TrackingLink
                      href="/teams/"
                      clickType="Primary CTA"
                      clickName="Sign Up Button"
                      clickText="Get Started - Free"
                      clickLocation="Top Navbar"
                    >
                      <Button
                        asChild
                        variant="default"
                        rounded="full"
                        className={cn(
                          'homepage-button !bg-primary hover:!bg-accent-primary-hover active:!bg-primary-background-hover !flex !h-8 !gap-0 !overflow-hidden !rounded !p-0 transition-colors duration-200',
                          'start-free-trial-btn text-primary-foreground hover:text-l1-foreground h-8 gap-1.5 px-4 text-sm font-medium'
                        )}
                      >
                        <span id="btn-get-started-website-navbar">
                          <span
                            className={cn(
                              'homepage-button__label flex !h-full min-w-0 !flex-1 items-center justify-center gap-1.5 !px-3 !whitespace-nowrap',
                              '[&_svg:not(.animate-spin)]:hidden'
                            )}
                          >
                            Get Started - Free
                            <ArrowRight size={14} />
                          </span>
                          <span
                            className={cn(
                              'homepage-button__icon !text-primary-foreground hidden !h-full !w-8 !shrink-0 !items-center !justify-center !rounded',
                              '!bg-accent-primary-hover !flex'
                            )}
                            aria-hidden="true"
                          >
                            <ArrowRight size={16} strokeWidth={2.5} />
                          </span>
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
