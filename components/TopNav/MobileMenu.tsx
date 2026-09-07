'use client'

import { Dialog, DialogContent, DialogTitle } from '@signozhq/ui/dialog'
import { useRouter } from 'next/navigation'
import TrackingLink from '@/components/TrackingLink'
import NavCtaButtons from './NavCtaButtons'
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
        <NavCtaButtons location="Mobile Menu" className="mt-2 px-3" onNavigate={onClose} />
      )}
    </div>
  )
}
