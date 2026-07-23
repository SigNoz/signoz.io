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
        Need help? <span className="text-primary">Contact support</span>
      </TrackingLink>

      <TrackingButton
        id="btn-get-started-website-navbar"
        className="border-l2-border bg-muted text-muted-foreground hover:text-l1-foreground flex h-8 min-w-24 items-center justify-center gap-1.5 truncate rounded-sm border px-4 py-2 pr-2.5 pl-2 text-center text-xs leading-5 font-normal not-italic no-underline outline-none"
        clickType="Primary CTA"
        clickName="Signup Button"
        clickText="Signup"
        clickLocation="Top Navbar"
        onClick={() => router.push('/teams')}
      >
        <PenSquare size={12} /> Signup
      </TrackingButton>

      <TrackingButton
        className="border-l2-border bg-muted text-muted-foreground hover:text-l1-foreground flex h-8 min-w-24 items-center justify-center gap-2 truncate rounded-sm border px-4 py-2 pr-3 pl-4 text-center text-xs leading-5 font-normal not-italic no-underline outline-none"
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
