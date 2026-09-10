'use client'

import { Dialog, DialogContent, DialogTitle } from '@signozhq/ui/dialog'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import TrackingLink from '@/components/TrackingLink'
import TrackingButton from '@/components/TrackingButton'
import { Button } from '@/components/ui/Button'
import { cn } from 'app/lib/utils'
import GitHubStars from '../GithubStars/GithubStars'
import Accordion from '../Accordion/Accordion'
import {
  productDropdownItemsSorted,
  useCasesDropdownItemsSorted,
  comparisonItems,
  resourcesDropdownItems,
} from './constants'

interface MobileMenuProps {
  open: boolean
  onClose: (open: boolean) => void
  isSignupRoute: boolean
}

export default function MobileMenu({ open, onClose, isSignupRoute }: MobileMenuProps) {
  const router = useRouter()
  const closeMobileMenu = () => onClose(false)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        showOverlay={false}
        position="right"
        heightMode="full"
        animation="slide"
        width="narrow"
        className={cn(
          '!z-[1100] overflow-y-auto !border-none !bg-[var(--l1-background)] !shadow-none',
          '!left-0 !right-0 !top-14 !h-[calc(100%-3.5rem)] !w-full !max-w-none'
        )}
      >
        <DialogTitle className="sr-only">Menu</DialogTitle>
        <div className="flex min-h-full w-full flex-col bg-[var(--l1-background)] px-6 py-24 pt-[calc(6rem-56px)]">
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
            <div className="-my-6 divide-y divide-[var(--l1-border)]">
              <MainMenuContent
                isSignupRoute={isSignupRoute}
                onClose={closeMobileMenu}
                router={router}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const MOBILE_LINK_CLASS =
  '-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-[var(--l2-background-hover)]'

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
      <Accordion topic="Use Cases" subtopics={useCasesDropdownItemsSorted} onLinkClick={onClose} />
      <Accordion topic="Compare SigNoz" subtopics={comparisonItems} onLinkClick={onClose} />
      <TrackingLink
        href="/customers/"
        className={MOBILE_LINK_CLASS}
        clickType="Nav Click"
        clickName="Customers Link"
        clickText="Customers"
        clickLocation="Mobile Menu"
        onClick={onClose}
        prefetch={false}
      >
        Customers
      </TrackingLink>
      <TrackingLink
        href="/docs/introduction/"
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
        href="/pricing/"
        className={MOBILE_LINK_CLASS}
        clickType="Nav Click"
        clickName="Pricing Link"
        clickText="Pricing"
        clickLocation="Mobile Menu"
        onClick={onClose}
      >
        Pricing
      </TrackingLink>
      <div className="-mx-3 inline-block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-[var(--l2-background-hover)]">
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
            href="/teams/"
            clickType="Primary CTA"
            clickName="Sign Up Button"
            clickText="Get Started - Free"
            className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-[var(--l2-background-hover)]"
            clickLocation="Mobile Menu"
            onClick={onClose}
          >
            <Button
              asChild
              variant="default"
              className={cn(
                'homepage-button !flex !h-8 !gap-0 !overflow-hidden !rounded !bg-[var(--accent-primary)] !p-0 transition-colors duration-200 hover:!bg-[var(--accent-primary-hover)] active:!bg-[color-mix(in_srgb,var(--accent-primary)_80%,var(--base-black))]',
                'start-free-trial-btn font-heading flex items-center justify-center gap-1 truncate rounded-md border-none px-4 py-2 text-center text-sm font-bold leading-4 text-[var(--base-white)] no-underline outline-none hover:text-[var(--base-white)]'
              )}
              id="btn-get-started-website-navbar"
            >
              <span>
                <span
                  className={cn(
                    'homepage-button__label flex !h-full min-w-0 !flex-1 items-center justify-center gap-1.5 !whitespace-nowrap !px-3',
                    '[&_svg:not(.animate-spin)]:hidden'
                  )}
                >
                  Get Started - Free
                  <ArrowRight size={14} />
                </span>
                <span
                  className={cn(
                    'homepage-button__icon hidden !h-full !w-8 !shrink-0 !items-center !justify-center !rounded !text-[var(--base-white)]',
                    '!flex !bg-[var(--accent-primary-hover)]'
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
    </div>
  )
}
