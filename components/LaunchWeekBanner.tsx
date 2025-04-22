import React from 'react'
import Link from 'next/link'
import { ArrowRight, Handshake } from 'lucide-react'

export function LaunchWeekBanner() {
  return (
    <Link href="/launch-week/">
      <button className="flex h-10 items-center justify-center gap-1.5 rounded-full border border-signoz_slate-200 bg-signoz_slate-400 px-4 py-2 text-xs font-medium leading-5 text-white shadow-[0_0_14px_0_rgba(78,116,248,0.40)] sm:gap-2 sm:text-sm">
        <Handshake size={14} />
        Join us for SigNoz Launch Week 4.0 <ArrowRight size={14} />
      </button>
    </Link>
  )
}
