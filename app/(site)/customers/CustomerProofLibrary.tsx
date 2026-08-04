'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

import TrackingLink from '@/components/TrackingLink'
import { LogoCard } from '@/components/index-header/homepage-customer-proof/CustomerProofCards'
import { SignozDitherCardBackground } from '@/components/dither-kit/TailwindDitherGradient'
import { cn } from 'app/lib/utils'

import { customerProofFilters, customerQuotes, type CustomerProofFilter } from './customerProof'

export default function CustomerProofLibrary() {
  const [activeFilter, setActiveFilter] = useState<CustomerProofFilter>('All proof')
  const visibleQuotes = useMemo(
    () =>
      activeFilter === 'All proof'
        ? customerQuotes
        : customerQuotes.filter((quote) => quote.themes.includes(activeFilter)),
    [activeFilter]
  )

  return (
    <>
      <div aria-label="Filter customer proof" className="flex flex-wrap gap-2" role="group">
        {customerProofFilters.map((filter) => {
          const count =
            filter === 'All proof'
              ? customerQuotes.length
              : customerQuotes.filter((quote) => quote.themes.includes(filter)).length

          return (
            <button
              aria-pressed={activeFilter === filter}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                activeFilter === filter
                  ? 'border-signoz_sakura-400 bg-signoz_sakura-400 text-signoz_ink-500'
                  : 'border-signoz_slate-400 bg-signoz_ink-400 text-signoz_vanilla-300 hover:border-signoz_slate-300 hover:text-signoz_vanilla-100'
              )}
              key={filter}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              {filter}
              <span className="ml-2 opacity-65">{count}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-8 columns-1 gap-4 md:columns-2 xl:columns-3">
        {visibleQuotes.map((proof, index) => (
          <TrackingLink
            className="group relative mb-4 inline-block w-full break-inside-avoid overflow-hidden rounded-2xl border border-signoz_slate-400 bg-signoz_ink-400 p-6 transition-colors hover:border-signoz_slate-300 hover:bg-signoz_ink-300"
            clickLocation="Customer Proof Library"
            clickName="Customer Proof Source"
            clickText={proof.company || proof.attribution}
            clickType="Customer Proof"
            href={proof.href}
            key={`${proof.attribution}-${proof.quote}`}
            prefetch={false}
            rel={proof.href.startsWith('http') ? 'noopener noreferrer nofollow' : undefined}
            target={proof.href.startsWith('http') ? '_blank' : undefined}
          >
            <SignozDitherCardBackground className="opacity-10" index={index} />
            <div className="relative z-10 flex items-start justify-between gap-4">
              {proof.logo ? (
                <LogoCard
                  className="h-12 min-w-32 flex-1 bg-transparent shadow-none"
                  isClone={false}
                  logo={proof.logo}
                />
              ) : (
                <div className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-signoz_sakura-400">
                  Community proof
                </div>
              )}
              <ArrowUpRight
                aria-hidden="true"
                className="shrink-0 text-signoz_vanilla-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                size={16}
              />
            </div>
            <blockquote className="relative z-10 mt-5 text-pretty text-lg font-normal leading-7 text-signoz_vanilla-100">
              “{proof.quote}”
            </blockquote>
            <div className="relative z-10 mt-5 text-xs leading-5 text-signoz_vanilla-400">
              <span className="font-medium text-signoz_vanilla-200">{proof.attribution}</span>
              {proof.company && !proof.attribution.includes(proof.company) ? (
                <>
                  <span aria-hidden="true"> · </span>
                  {proof.company}
                </>
              ) : null}
            </div>
          </TrackingLink>
        ))}
      </div>
    </>
  )
}
