'use client'

import { BookOpenText, PenSquare } from 'lucide-react'
import { useRouter } from 'next/navigation'
import TrackingLink from '@/components/TrackingLink'
import TrackingButton from '@/components/TrackingButton'

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
        className="flex h-8 min-w-24 items-center justify-center gap-1.5 truncate rounded-sm border border-[var(--l3-border)] bg-[var(--l3-background)] px-4 py-2 pl-2 pr-2.5 text-center text-xs font-normal not-italic leading-5 text-[var(--l2-foreground)] no-underline outline-none hover:text-[var(--l1-foreground-hover)]"
        clickType="Primary CTA"
        clickName="Signup Button"
        clickText="Signup"
        clickLocation="Top Navbar"
        onClick={() => router.push('/teams')}
      >
        <PenSquare size={12} /> Signup
      </TrackingButton>

      <TrackingButton
        className="flex h-8 min-w-24 items-center justify-center gap-2 truncate rounded-sm border border-[var(--l3-border)] bg-[var(--l3-background)] px-4 py-2 pl-4 pr-3 text-center text-xs font-normal not-italic leading-5 text-[var(--l2-foreground)] no-underline outline-none hover:text-[var(--l1-foreground-hover)]"
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
