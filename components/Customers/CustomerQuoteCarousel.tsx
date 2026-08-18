'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { cn } from 'app/lib/utils'
import { useLogEvent } from '@/hooks/useLogEvent'

import type { QuoteSlide } from './Customers.types'

const AUTOPLAY_INTERVAL_MS = 7000

interface CustomerQuoteCarouselProps {
  quotes: QuoteSlide[]
}

export default function CustomerQuoteCarousel({ quotes }: CustomerQuoteCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const logEvent = useLogEvent()

  const trackClick = (
    clickName: string,
    clickText: string,
    quoteIndex: number,
    attributes: Record<string, unknown> = {}
  ) => {
    const quote = quotes[quoteIndex]
    logEvent({
      eventName: 'Website Click',
      eventType: 'track',
      attributes: {
        clickType: 'Customer Quote',
        clickName,
        clickLocation: 'Customers Quote Carousel',
        clickText,
        company: quote.company,
        quoteIndex: quoteIndex + 1,
        quoteCount: quotes.length,
        ...attributes,
      },
    })
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timeout = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % quotes.length)
    }, AUTOPLAY_INTERVAL_MS)

    return () => window.clearTimeout(timeout)
  }, [activeIndex, quotes.length])

  return (
    <div aria-label="Customer quotes" aria-roledescription="carousel" role="region">
      <p aria-live="polite" className="sr-only">
        Quote from {quotes[activeIndex].company}
      </p>

      <div className="grid min-h-96 min-w-0 py-12 lg:py-20">
        {quotes.map((quote, index) => {
          const isActive = index === activeIndex
          const isExternal = quote.href.startsWith('http')

          return (
            <figure
              aria-hidden={!isActive}
              className={cn(
                'col-start-1 row-start-1 flex min-h-80 min-w-0 flex-col items-center justify-center text-center transition-opacity duration-700 ease-in-out motion-reduce:transition-none',
                isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
              )}
              key={quote.company}
            >
              <blockquote className="m-0 w-full max-w-5xl text-pretty !border-0 !pl-0 text-3xl font-medium leading-tight tracking-[-0.03em] text-[var(--l2-foreground)] sm:text-4xl lg:text-5xl">
                “
                {quote.segments.map((segment, segmentIndex) =>
                  segment.emphasis ? (
                    <span className="text-[var(--l1-foreground)]" key={segmentIndex}>
                      {segment.text}
                    </span>
                  ) : (
                    <span key={segmentIndex}>{segment.text}</span>
                  )
                )}
                ”
              </blockquote>

              <figcaption className="mt-10 flex w-full max-w-xl items-center justify-center gap-4 px-2 sm:px-0">
                <Image
                  alt={`${quote.company} logo`}
                  className="max-h-8 w-auto max-w-32 shrink-0 object-contain"
                  height={32}
                  priority
                  src={quote.logo}
                  width={128}
                />
                <span aria-hidden="true" className="h-10 w-px bg-[var(--l2-border)]" />
                <span className="min-w-0 text-left">
                  <span className="block font-medium text-[var(--l1-foreground)]">
                    {quote.person}
                  </span>
                  <span className="mt-1 block text-sm leading-5 text-[var(--l2-foreground)]">
                    {quote.role}
                  </span>
                </span>
              </figcaption>

              <Link
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-primary)] transition-colors hover:text-[var(--accent-primary-hover)]"
                href={quote.href}
                onClick={() =>
                  trackClick('Customer Quote Source Link', quote.sourceLabel, index, {
                    target: quote.href,
                  })
                }
                rel={isExternal ? 'noopener noreferrer nofollow' : undefined}
                tabIndex={isActive ? 0 : -1}
                target={isExternal ? '_blank' : undefined}
              >
                {quote.sourceLabel}
                <ArrowUpRight
                  aria-hidden="true"
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  size={16}
                />
              </Link>
            </figure>
          )
        })}
      </div>

      <div
        aria-label="Choose customer quote"
        className="flex items-center justify-center gap-1 pb-12 lg:pb-20"
        role="group"
      >
        {quotes.map((quote, index) => {
          const isActive = index === activeIndex

          return (
            <button
              aria-label={`Show quote ${index + 1} from ${quote.company}`}
              aria-pressed={isActive}
              className="group flex h-6 w-6 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
              key={quote.company}
              onClick={() => {
                trackClick('Select Customer Quote', `Quote from ${quote.company}`, index)
                setActiveIndex(index)
              }}
              type="button"
            >
              <span
                aria-hidden="true"
                className={cn(
                  'h-1.5 w-1.5 rounded-full transition-colors',
                  isActive
                    ? 'bg-[var(--l1-foreground)]'
                    : 'bg-[var(--l3-border)] group-hover:bg-[var(--l2-foreground)]'
                )}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
