'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

import Button from '@/components/ui/Button'
import TrackingButton from '@/components/TrackingButton'
import TrackingLink from '@/components/TrackingLink'
import { cn } from 'app/lib/utils'

interface NavCtaButtonsProps {
  location: 'Top Navbar' | 'Mobile Menu'
  className?: string
  onNavigate?: () => void
}

export default function NavCtaButtons({ location, className, onNavigate }: NavCtaButtonsProps) {
  const router = useRouter()

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <TrackingButton
        className="btn-tactile btn-tactile--secondary no-underline"
        clickType="Secondary CTA"
        clickName="Sign In Button"
        clickText="Sign In"
        clickLocation={location}
        onClick={() => {
          router.push('/login')
          onNavigate?.()
        }}
      >
        Sign In
      </TrackingButton>
      <TrackingLink
        href="/teams/"
        clickType="Primary CTA"
        clickName="Sign Up Button"
        clickText="Get Started"
        clickLocation={location}
        onClick={onNavigate}
      >
        <Button asChild variant="default" tactile className="start-free-trial-btn no-underline">
          <span id={location === 'Top Navbar' ? 'btn-get-started-website-navbar' : undefined}>
            Get Started
            <ArrowRight size={14} aria-hidden="true" />
          </span>
        </Button>
      </TrackingLink>
    </div>
  )
}
