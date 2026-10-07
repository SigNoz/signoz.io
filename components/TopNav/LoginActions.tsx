'use client'

import { BookOpenText, PenSquare } from 'lucide-react'
import { useRouter } from 'next/navigation'
import TrackingLink from '@/components/TrackingLink'
import TrackingButton from '@/components/TrackingButton'
import { cn } from 'app/lib/utils'
import { buttonVariants } from '@/components/ui/Button'

export default function LoginActions() {
  const router = useRouter()

  return (
    <div className="flex items-center gap-2">
      <TrackingLink
        href="mailto:cloud-support@signoz.io"
        className="flex-center mr-8 text-xs"
        clickType="Support Link"
        clickName="Contact Support Link"
        clickText="Need help? Contact support"
        clickLocation="Top Navbar"
      >
        Need help? <span className="text-[var(--accent-primary)]">Contact support</span>
      </TrackingLink>

      <TrackingButton
        id="btn-get-started-website-navbar"
        className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'min-w-24 truncate')}
        clickType="Primary CTA"
        clickName="Signup Button"
        clickText="Signup"
        clickLocation="Top Navbar"
        onClick={() => router.push('/teams')}
      >
        <PenSquare size={12} /> Signup
      </TrackingButton>

      <TrackingButton
        className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'min-w-24 truncate')}
        clickType="Secondary CTA"
        clickName="Docs Button"
        clickText="Docs"
        clickLocation="Top Navbar"
        onClick={() => router.push('/docs')}
      >
        <BookOpenText size={12} /> Docs
      </TrackingButton>
    </div>
  )
}
