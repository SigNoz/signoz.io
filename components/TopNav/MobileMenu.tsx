'use client'

import { Dialog, Button } from '@headlessui/react'
import { ArrowBigLeft, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import TrackingLink from '@/components/TrackingLink'
import TrackingButton from '@/components/TrackingButton'
import GitHubStars from '../GithubStars/GithubStars'
import DocsSidebar from '../DocsSidebar/DocsSidebar'
import Accordion from '../Accordion/Accordion'
import { productDropdownItemsSorted, resourcesDropdownItems } from './constants'

interface MobileMenuProps {
  open: boolean
  onClose: (open: boolean) => void
  showMainMenu: boolean
  isDocsBasePath: boolean
  isSignupRoute: boolean
  onShowMainMenu: () => void
}

export default function MobileMenu({
  open,
  onClose,
  showMainMenu,
  isDocsBasePath,
  isSignupRoute,
  onShowMainMenu,
}: MobileMenuProps) {
  const router = useRouter()
  const closeMobileMenu = () => onClose(false)

  return (
    <Dialog as="div" open={open} onClose={onClose}>
      <div className="fixed inset-0 top-[56px]" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-50 mt-[56px] w-full overflow-y-auto bg-signoz_ink-500 px-6 py-24 !pt-[calc(6rem-56px)] sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 ">
        <div className="flex items-center justify-between">
          <TrackingLink
            href="/"
            className="-m-1.5 p-1.5"
            clickType="Nav Click"
            clickName="SigNoz Logo"
            clickText="SigNoz"
            clickLocation="Mobile Menu"
            onClick={closeMobileMenu}
          >
            <span className="sr-only">SigNoz</span>
          </TrackingLink>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            {showMainMenu && (
              <MainMenuContent
                isSignupRoute={isSignupRoute}
                onClose={closeMobileMenu}
                router={router}
              />
            )}

            {isDocsBasePath && !showMainMenu && (
              <div className="docs-sidebar-mobile-nav">
                <TrackingButton
                  className="mt-4 inline-flex items-center gap-1 rounded px-1 py-1 text-sm font-bold text-white"
                  clickType="Nav Click"
                  clickName="Back to Main Menu Button"
                  clickText="Back to main menu"
                  clickLocation="Mobile Menu"
                  onClick={onShowMainMenu}
                >
                  <ArrowBigLeft size={16} /> Back to main menu
                </TrackingButton>

                <DocsSidebar onNavItemClick={closeMobileMenu} />
              </div>
            )}
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  )
}

const MOBILE_LINK_CLASS =
  '-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-signoz_ink-200'

function MainMenuContent({
  isSignupRoute,
  onClose,
  router,
}: {
  isSignupRoute: boolean
  onClose: () => void
  router: ReturnType<typeof useRouter>
}) {
  return (
    <div className="space-y-2 py-8">
      <Accordion topic="Product" subtopics={productDropdownItemsSorted} onLinkClick={onClose} />
      <TrackingLink
        href="/why-signoz"
        className={MOBILE_LINK_CLASS}
        clickType="Nav Click"
        clickName="Why Signoz Link"
        clickText="Why Signoz"
        clickLocation="Mobile Menu"
        onClick={onClose}
      >
        Why Signoz
      </TrackingLink>
      <TrackingLink
        href="/docs"
        className={MOBILE_LINK_CLASS}
        clickType="Nav Click"
        clickName="Docs Link"
        clickText="Documentation"
        clickLocation="Mobile Menu"
        onClick={onClose}
        prefetch={false}
      >
        Documentation
      </TrackingLink>

      <Accordion
        topic="Resources"
        subtopics={[...resourcesDropdownItems.learn, ...resourcesDropdownItems.explore]}
        onLinkClick={onClose}
      />
      <TrackingLink
        href="/pricing"
        className={MOBILE_LINK_CLASS}
        clickType="Nav Click"
        clickName="Pricing Link"
        clickText="Pricing"
        clickLocation="Mobile Menu"
        onClick={onClose}
      >
        Pricing
      </TrackingLink>
      <TrackingLink
        href="/case-study"
        className={MOBILE_LINK_CLASS}
        clickType="Nav Click"
        clickName="Customer Stories Link"
        clickText="Customer Stories"
        clickLocation="Mobile Menu"
        onClick={onClose}
      >
        Customer Stories
      </TrackingLink>

      <div className="-mx-3 inline-block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-signoz_ink-200">
        <GitHubStars location="Mobile Menu" />
      </div>

      {!isSignupRoute && (
        <>
          <TrackingButton
            className={MOBILE_LINK_CLASS}
            clickType="Secondary CTA"
            clickName="Sign In Button"
            clickText="Sign In"
            clickLocation="Mobile Menu"
            onClick={() => {
              router.push('/login')
              onClose()
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
            onClick={onClose}
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
  )
}
