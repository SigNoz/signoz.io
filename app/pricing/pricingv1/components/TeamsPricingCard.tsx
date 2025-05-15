import React from 'react'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface TeamsPricingCardProps {
  estimatedCost?: number
  isHighVolume?: boolean
}

export default function TeamsPricingCard({
  estimatedCost = 199,
  isHighVolume = false,
}: TeamsPricingCardProps) {
  // Format numbers for display
  const formatNumber = (number: number) =>
    number.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 0 })

  return (
    <div
      className={`pricing-card relative rounded-md ${
        !isHighVolume
          ? 'border border-signoz_robin-500/40 bg-signoz_ink-400/10 shadow-[0_0_20px_rgba(78,116,248,0.2)]'
          : 'border border-dashed border-signoz_slate-400 bg-signoz_ink-400 bg-opacity-5'
      } px-6 py-8 transition-all duration-300`}
    >
      {!isHighVolume && (
        <div className="absolute -top-8 left-0 right-0 py-1 text-center text-base font-medium text-signoz_robin-400">
          Recommended for your usage
        </div>
      )}
      <div>
        <div className="mb-4 flex justify-between">
          <div className="w-[60%]">
            <h3 className="pinkish-gradient mb-1 text-3xl font-bold tracking-tight">Teams</h3>
            <p className="text-base text-gray-400">
              For teams that need high-performing applications.
            </p>
          </div>
          <div className="flex w-[40%] flex-col items-end">
            <span className="text-sm text-signoz_vanilla-400">From</span>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-signoz_vanilla-100">
                ${formatNumber(estimatedCost)}
              </span>
              <span className="ml-1 text-signoz_vanilla-400">/month</span>
            </div>
          </div>
        </div>

        <Link
          href="/teams/"
          className="mb-6 flex w-full items-center justify-center gap-2 rounded-full bg-signoz_robin-100 px-4 py-3 font-medium text-signoz_ink-400 hover:bg-signoz_robin-200"
        >
          Start your 30 day free trial
        </Link>

        <div className="mb-6 text-signoz_robin-300">
          $99 for startups.{' '}
          <Link href="/startups/" className="underline hover:text-signoz_robin-400">
            Check if you qualify and apply
          </Link>
          .
        </div>

        <div className="my-6 w-full border-t border-dashed border-signoz_slate-400"></div>

        <h4 className="mb-4 text-lg font-bold text-signoz_vanilla-100">
          What's included in ${formatNumber(estimatedCost)}/month?
        </h4>
        <ul className="mb-6 space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">Send any mix of logs, traces & metrics</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="mt-1 min-w-4 text-green-500" size={16} />
            <span className="text-signoz_vanilla-400">
              Usage worth ${formatNumber(estimatedCost)} (e.g. {formatNumber(estimatedCost * 3.33)}{' '}
              GB logs/traces or {formatNumber(estimatedCost * 10)} mn metric samples)
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
              Need more? Pay only for what exceeds ${formatNumber(estimatedCost)} based on usage
            </span>
          </li>
        </ul>

        <Link
          href="/pricing/monthly-calculator/"
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-full border border-signoz_robin-500 bg-transparent px-4 py-3 font-medium text-signoz_robin-500 hover:bg-signoz_robin-500/10"
        >
          Estimate your monthly bill
        </Link>

        <div className="mb-6 text-center text-sm text-signoz_vanilla-400">
          <Link href="#" className="hover:text-signoz_vanilla-300">
            Watch video to understand how SigNoz pricing works
          </Link>
        </div>
      </div>
    </div>
  )
}
