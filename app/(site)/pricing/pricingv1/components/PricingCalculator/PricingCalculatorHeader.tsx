import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import TrackingButton from '@/components/TrackingButton'

interface PricingCalculatorHeaderProps {
  isMounted: boolean
  showCopiedToast: boolean
  copyLinkToClipboard: () => void
  shareWithTeam: () => Promise<void>
}

export const PricingCalculatorHeader: React.FC<PricingCalculatorHeaderProps> = ({
  isMounted,
  showCopiedToast,
  copyLinkToClipboard,
  shareWithTeam,
}) => (
  <div className="mb-4 flex items-start justify-between">
    <div className="flex-1">
      <span className="group text-l1-foreground/90 relative text-lg font-semibold md:text-2xl">
        Estimate your monthly bill
        {isMounted && (
          <a
            href="#estimate-your-monthly-bill"
            onClick={copyLinkToClipboard}
            className="ml-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            aria-label="Copy link to this section"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="#4E74F8"
              className="linkicon h-6 w-6"
            >
              <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
              <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
            </svg>
          </a>
        )}
      </span>
      {isMounted && (
        <p className="text-muted-foreground mt-1 text-sm">
          You can also set data ingestion limits so you never get a surprise bill.
          <Link
            href="https://signoz.io/docs/ingestion/signoz-cloud/keys/"
            className="text-accent-primary ml-1 font-medium"
          >
            Learn more
            <ArrowUpRight className="inline" size={16} />
          </Link>
        </p>
      )}
    </div>

    {isMounted && (
      <div className="relative ml-4">
        <TrackingButton
          onClick={shareWithTeam}
          clickType="Copy to Clipboard"
          clickName="Share Pricing Calculator Configuration"
          clickLocation="Pricing Calculator Header"
          clickText="Share with your team"
          className="border-border bg-card text-l1-foreground hover:bg-l3-background flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors"
          aria-label="Share calculator configuration with your team"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16,6 12,2 8,6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          Share with your team
        </TrackingButton>

        {/* Toast notification positioned near the button */}
        {showCopiedToast && (
          <div className="bg-primary absolute top-full right-0 mt-2 w-max rounded-md px-3 py-2 text-sm text-white shadow-lg">
            <div className="bg-primary absolute -top-1 right-4 h-2 w-2 rotate-45"></div>
            Configuration copied to clipboard!
          </div>
        )}
      </div>
    )}
  </div>
)
