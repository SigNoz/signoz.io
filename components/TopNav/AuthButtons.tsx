'use client'

import { Button } from '@headlessui/react'
import { ArrowRight } from 'lucide-react'
import TrackingButton from '@/components/TrackingButton'
import TrackingLink from '@/components/TrackingLink'

interface AuthButtonsProps {
  router?: any
  closeMobileMenu?: () => void
}

export default function AuthButtons({ router, closeMobileMenu }: AuthButtonsProps) {
  return (
    <>
      <TrackingButton
        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-signoz_ink-200"
        clickType="Secondary CTA"
        clickName="Sign In Button"
        clickText="Sign In"
        clickLocation="Mobile Menu"
        onClick={() => {
          router?.push('/login')
          closeMobileMenu?.()
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
        onClick={() => closeMobileMenu?.()}
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
  )
} 