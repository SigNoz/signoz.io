import { ArrowRight } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'

interface InlineCTAProps {
  message: string
  ctaText?: string
  ctaLink?: string
}

export default function InlineCTA({
  message,
  ctaText = 'Get Started - Free',
  ctaLink = '/teams/',
}: InlineCTAProps) {
  return (
    <div className="not-prose my-8 flex flex-col items-start gap-3.5 rounded-2xl border border-signoz_robin-500/20 bg-gradient-to-br from-signoz_slate-500 via-[#1a2340] to-[#1e1a35] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-7">
      <p className="m-0 text-[15px] leading-normal text-gray-200">{message}</p>

      <TrackingLink
        href={ctaLink}
        clickType="Inline CTA"
        clickName={ctaText}
        clickLocation="Article Body"
        clickText={ctaText}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-signoz_robin-500 px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-signoz_robin-400 hover:text-white"
      >
        {ctaText}
        <ArrowRight size={14} />
      </TrackingLink>
    </div>
  )
}
