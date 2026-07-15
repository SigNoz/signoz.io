import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'
import { cn } from 'app/lib/utils'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { formatNumber } from './format'
import type { Section } from './types'

interface PricingCalculatorSummaryProps {
  show?: Section[]
  showFooter: boolean
  totalEstimate: number
  isHighVolume: boolean
}

export const PricingCalculatorSummary: React.FC<PricingCalculatorSummaryProps> = ({
  show,
  showFooter,
  totalEstimate,
  isHighVolume,
}) => (
  <>
    {/* Total estimate - always shown */}
    <div
      className={cn(
        'mt-6 flex items-center justify-between rounded-md px-3 py-4',
        show?.length === 1 ? 'bg-muted/40' : 'button-background'
      )}
    >
      <span className="text-l1-foreground text-base font-medium">
        {show?.length === 1 ? 'Monthly estimate for usage-based plan' : 'Monthly estimate'}
      </span>
      <div className="border-border w-[45%] border-b border-dashed"></div>
      <div className="text-l1-foreground text-xl font-bold">${formatNumber(totalEstimate)}</div>
    </div>

    {/* Actions section */}
    {showFooter && (
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {/* Cost comparison link */}
        <div className="mb-4 hidden md:block">
          <a
            href="/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/"
            target="_blank"
            className="bg-card text-foreground hover:bg-l3-background inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm transition-colors"
            rel="noreferrer"
          >
            SigNoz saves you up to 80% on datadog bills.
            <ArrowUpRight size={18} className="ml-1 inline" />
          </a>
        </div>

        <TrackingLink
          href="/teams/"
          clickType="Primary CTA"
          clickName="Sign Up Button"
          clickText="Get Started - Free"
          clickLocation="Pricing Calculator"
        >
          <Button isButton={true} variant={'default'} rounded={'full'} className="w-full">
            Get Started - Free
            <ArrowRight size={14} className="ml-2" />
          </Button>
        </TrackingLink>
      </div>
    )}

    {/* High volume message when applicable */}
    {isHighVolume && (
      <div className="border-primary bg-primary/10 mt-4 rounded-md border border-dashed p-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <span className="text-accent-primary mb-2 text-sm font-medium sm:mb-0">
            For high volume usage, reach out to us for custom pricing and retention options
          </span>
          <TrackingLink
            href="/contact-us/?source=pricing-calculator"
            clickType="Secondary CTA"
            clickName="Volume Discount Form Link"
            clickText="Contact Us"
            clickLocation="Pricing Calculator"
          >
            <Button isButton={true} variant={'secondary'} className="w-full">
              Contact us
            </Button>
          </TrackingLink>
        </div>
      </div>
    )}
  </>
)
