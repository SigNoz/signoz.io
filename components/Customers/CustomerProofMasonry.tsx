'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'

import { cn } from 'app/lib/utils'
import { useLogEvent } from '@/hooks/useLogEvent'
import { getVisibleAttribution } from '@/components/index-header/homepage-customer-proof/HomepageCustomerProof.utils'
import type { LogoComponent } from '@/components/index-header/homepage-customer-proof/HomepageCustomerProof.types'
import EltropyLogo from '@/public/svgs/icons/eltropy.svg'

import { LogoMark, ProofLink } from './ProofWallCards'
import type { ProofLogo, ProofQuote } from './Customers.types'

const quotesPerPage = 6
const cardStaggerMs = 60
const customerProofClickLocation = 'Customers Proof Wall'

const proofLogoComponents: Record<string, LogoComponent> = {
  eltropy: EltropyLogo,
}

function toLogoSpec(logo: ProofLogo) {
  const { componentKey, ...spec } = logo
  return {
    ...spec,
    Logo: componentKey ? proofLogoComponents[componentKey] : undefined,
  }
}

interface CustomerProofMasonryProps {
  quotes: ProofQuote[]
}

export default function CustomerProofMasonry({ quotes }: CustomerProofMasonryProps) {
  const [pageIndex, setPageIndex] = useState(0)
  const logEvent = useLogEvent()
  const pageCount = Math.max(1, Math.ceil(quotes.length / quotesPerPage))
  const pages = Array.from({ length: pageCount }, (_, page) =>
    quotes.slice(page * quotesPerPage, (page + 1) * quotesPerPage)
  )

  const trackControl = (clickName: string, clickText: string) => {
    logEvent({
      eventName: 'Website Click',
      eventType: 'track',
      attributes: {
        clickType: 'Customer Proof',
        clickName,
        clickLocation: customerProofClickLocation,
        clickText,
        pageIndex: pageIndex + 1,
        pageCount,
      },
    })
  }

  const move = (direction: -1 | 1) => {
    setPageIndex((current) => (current + direction + pageCount) % pageCount)
  }

  return (
    <div aria-label="Customer proof" aria-roledescription="carousel" role="region">
      {/* All pages are stacked in one grid cell (hidden pages stay invisible but keep
          their height), so the section height is the tallest page and paging never
          causes a layout shift. */}
      <div className="relative">
        <div className="grid grid-cols-[minmax(0,1fr)]">
          {pages.map((pageQuotes, page) => {
            const isActive = page === pageIndex

            return (
              <div
                aria-hidden={!isActive}
                className={cn(
                  'col-start-1 row-start-1 w-full min-w-0',
                  !isActive && 'pointer-events-none invisible'
                )}
                key={page}
              >
                <div className="columns-1 gap-3 sm:columns-2" key={isActive ? 'active' : 'idle'}>
                  {pageQuotes.map((quote, index) => {
                    const attributionParts = quote.attribution.split(' · ')
                    const personName = attributionParts[0]
                    const attributionDetails = quote.logo
                      ? getVisibleAttribution(quote.attribution, toLogoSpec(quote.logo))
                      : attributionParts.slice(1).join(' · ')

                    return (
                      <div
                        className={cn(
                          'mb-3 break-inside-avoid',
                          isActive && 'customer-proof-card-in'
                        )}
                        key={quote.href + quote.attribution}
                        style={
                          isActive ? { animationDelay: `${index * cardStaggerMs}ms` } : undefined
                        }
                      >
                        <ProofLink
                          ariaLabel={`${quote.quote} — ${quote.attribution}`}
                          className="relative flex flex-col gap-4 rounded-lg border border-solid border-[var(--l2-border)] bg-[var(--l2-background)] p-4 text-left"
                          clickName="Customer Quote Link"
                          clickLocation={customerProofClickLocation}
                          clickText={quote.attribution}
                          href={quote.href}
                          isClone={!isActive}
                        >
                          <blockquote className="m-0 !border-0 !pl-0 pr-4 text-sm font-normal leading-6 text-[var(--l1-foreground)]">
                            “{quote.quote}”
                          </blockquote>
                          <div className="mt-auto flex min-w-0 items-center gap-3">
                            {quote.logo ? (
                              <LogoMark context="quote" decorative logo={toLogoSpec(quote.logo)} />
                            ) : (
                              <span className="truncate text-xs font-medium leading-4 text-[var(--l1-foreground)]">
                                {personName}
                              </span>
                            )}
                            {attributionDetails ? (
                              <span className="min-w-0 truncate text-[10px] leading-[14px] text-[var(--l2-foreground)]">
                                {attributionDetails}
                              </span>
                            ) : null}
                          </div>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="absolute right-3 top-3 text-[var(--l3-foreground)] transition-colors group-hover:text-[var(--l1-foreground)]"
                            size={13}
                          />
                        </ProofLink>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[var(--l1-background)] via-[color-mix(in_srgb,var(--l1-background)_40%,transparent)] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[var(--l1-background)] via-[color-mix(in_srgb,var(--l1-background)_40%,transparent)] to-transparent"
        />
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          aria-label="Previous customer proof"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--l2-border)] bg-[var(--l2-background)] text-[var(--l2-foreground)] transition-colors hover:bg-[var(--l3-background)] hover:text-[var(--l1-foreground)]"
          onClick={() => {
            trackControl('Previous Customer Proof', 'Previous proof')
            move(-1)
          }}
          type="button"
        >
          <ArrowLeft aria-hidden="true" size={16} />
        </button>
        <button
          aria-label="Next customer proof"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--l2-border)] bg-[var(--l2-background)] text-[var(--l2-foreground)] transition-colors hover:bg-[var(--l3-background)] hover:text-[var(--l1-foreground)]"
          onClick={() => {
            trackControl('Next Customer Proof', 'Next proof')
            move(1)
          }}
          type="button"
        >
          <ArrowRight aria-hidden="true" size={16} />
        </button>
      </div>
    </div>
  )
}
