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
        show?.length === 1 ? 'bg-signoz_slate-400/40' : 'button-background'
      )}
    >
      <span className="text-base font-medium text-signoz_vanilla-100">
        {show?.length === 1 ? 'Monthly estimate for usage-based plan' : 'Monthly estimate'}
      </span>
      <div className="w-[45%] border-b border-dashed border-signoz_slate-400"></div>
      <div className="text-xl font-bold text-signoz_vanilla-100">
        ${formatNumber(totalEstimate)}
      </div>
    </div>

    {/* Actions section */}
    {showFooter && (
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {/* Cost comparison link */}
        <div className="mb-4 hidden md:block">
          <a
            href="/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/"
            target="_blank"
            className="inline-flex items-center justify-center rounded-md bg-signoz_ink-400 px-5 py-2.5 text-sm text-white transition-colors hover:bg-signoz_ink-300"
            rel="noreferrer"
          >
            SigNoz saves you up to 80% on datadog bills.
            <ArrowUpRight size={18} className="ml-1 inline" />
          </a>
        </div>

        <TrackingLink
          href="/teams"
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
      <div className="mt-4 rounded-md border border-dashed border-signoz_robin-500 bg-signoz_robin-500/10 p-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <span className="mb-2 text-sm font-medium text-signoz_robin-400 sm:mb-0">
            For high volume usage, reach out to us for custom pricing and retention options
          </span>
          <TrackingLink
            href="https://share.hsforms.com/1AZy88ajlRsCPZUP0kSMb2gda5af"
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
