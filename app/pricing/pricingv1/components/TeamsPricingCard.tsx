import React from 'react'
import { CheckCircle, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Button from 'components/Button/Button'
import TeamsPricingVideoModal from './TeamsPricingVideoModal'

export default function TeamsPricingCard() {
  return (
    <div className="pricing-card relative rounded-md border border-dashed border-signoz_slate-400 bg-signoz_ink-400 bg-opacity-5 px-6 py-8 shadow-[0_0_20px_rgba(78,116,248,0.2)] transition-all duration-300">
      <div>
        <div className="mb-4 flex flex-col md:flex-row md:justify-between">
          <div className="w-full md:w-[60%]">
            <h3 className="pinkish-gradient mb-1 text-2xl font-bold tracking-tight md:text-3xl">
              Teams
            </h3>
            <p className="text-base text-gray-400">
              For teams that need high-performing applications.
            </p>
          </div>
          <div className="mt-4 flex w-full flex-col items-start md:mt-0 md:w-[40%] md:items-end">
            <span className="text-sm text-signoz_vanilla-400">starts from</span>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-signoz_vanilla-100 md:text-4xl">$199</span>
              <span className="ml-1 text-signoz_vanilla-400">/month</span>
            </div>
          </div>
        </div>

        <Link href="/teams/">
          <Button className="mb-6 w-full px-4 py-3 md:py-6">Start your 30 day free trial</Button>
        </Link>

        <div className="my-6 w-full border-t border-dashed border-signoz_slate-400"></div>

        <h4 className="mb-4 text-lg font-bold text-signoz_vanilla-100">
          What's included in $199/month?
        </h4>
        <ul className="mb-6 space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">Access to all features.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">Send any mix of logs, traces & metrics</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">
              Usage worth $199 (e.g. 663 GB logs/traces or 1,990 mn metric samples)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">Add unlimited teammates</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">Monitor any number of hosts</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">
              Need more? Pay only for what exceeds $199 based on usage
            </span>
          </li>
        </ul>

        <Link href="#estimate-your-monthly-bill">
          <Button type={Button.TYPES.SECONDARY} className="mb-4 w-full px-4 py-3 md:py-6">
            Estimate your monthly bill
          </Button>
        </Link>

        <div className="mb-6 text-center text-sm text-signoz_vanilla-400">
          <TeamsPricingVideoModal buttonLabel="Understand how SigNoz pricing works" />
        </div>
      </div>
    </div>
  )
}
