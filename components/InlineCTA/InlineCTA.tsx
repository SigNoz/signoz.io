import { ArrowRight } from 'lucide-react'
import { Button } from '@signozhq/ui/button'
import { Typography } from '@signozhq/ui/typography'
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
    <div className="not-prose my-8 flex flex-col items-start gap-3.5 rounded-2xl border border-[var(--l2-border)] bg-[var(--l2-background)] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-7">
      <Typography.Text className="m-0 text-[15px] leading-normal text-[var(--l2-foreground)]">
        {message}
      </Typography.Text>

      <Button asChild variant="solid" color="primary" className="shrink-0">
        <TrackingLink
          href={ctaLink}
          clickType="Inline CTA"
          clickName={ctaText}
          clickLocation="Article Body"
          clickText={ctaText}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 no-underline"
        >
          {ctaText}
          <ArrowRight size={14} />
        </TrackingLink>
      </Button>
    </div>
  )
}
