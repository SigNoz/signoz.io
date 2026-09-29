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
    <div className="not-prose my-8 flex flex-col items-start gap-3.5 rounded-2xl border border-[color-mix(in_srgb,var(--accent-primary)_20%,transparent)] bg-gradient-to-br from-[color-mix(in_srgb,var(--accent-primary)_10%,var(--l2-background))] via-[color-mix(in_srgb,var(--accent-primary)_6%,var(--l2-background))] to-[color-mix(in_srgb,var(--accent-sakura)_8%,var(--l2-background))] px-6 py-5 dark:from-signoz_slate-500 dark:via-[#1a2340] dark:to-[#1e1a35] sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-7">
      <p className="m-0 text-[15px] leading-normal text-[var(--l1-foreground)]">{message}</p>

      <TrackingLink
        href={ctaLink}
        clickType="Inline CTA"
        clickName={ctaText}
        clickLocation="Article Body"
        clickText={ctaText}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--accent-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--base-white)] no-underline transition-colors hover:bg-[var(--accent-primary-hover)] hover:text-[var(--base-white)]"
      >
        {ctaText}
        <ArrowRight size={14} />
      </TrackingLink>
    </div>
  )
}
