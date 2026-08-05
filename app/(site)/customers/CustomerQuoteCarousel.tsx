'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { cn } from 'app/lib/utils'

const customerQuotes = [
  {
    attribution: 'Mark Nelson',
    company: 'Oracle',
    href: 'https://www.linkedin.com/posts/marknelson6_oracle-backend-for-microservices-and-ai-activity-7366870519129731073-cgU2',
    logo: '/svgs/customer-logos/oracle.svg',
    quoteAfter: ', offering a simplified, unified monitoring, logging, and alerting experience.',
    quoteBefore: 'We’ve transitioned from ',
    quoteEmphasis: 'Grafana to SigNoz',
    role: 'Oracle Backend for Microservices & AI',
    sourceLabel: 'View the original post',
  },
  {
    attribution: 'Hiro Tamada',
    company: 'Kernel',
    href: '/customers/kernel/',
    logo: '/img/case_study/logos/kernel-logo.svg',
    quoteAfter: ', which is crazy reliable infrastructure.',
    quoteBefore: 'Without SigNoz, ',
    quoteEmphasis: 'we cannot achieve what we promise to our users',
    role: 'Founding Engineer',
    sourceLabel: 'Read the story',
  },
  {
    attribution: 'Karl Lyons',
    company: 'Shaped',
    href: '/customers/shaped/',
    logo: '/img/case_study/logos/shaped-logo.svg',
    quoteAfter: '.',
    quoteBefore: 'Every single time we have an issue, ',
    quoteEmphasis: 'SigNoz is always the first place to check',
    role: 'Site Reliability Engineer',
    sourceLabel: 'Read the story',
  },
] as const

const AUTOPLAY_INTERVAL_MS = 7000

export default function CustomerQuoteCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timeout = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % customerQuotes.length)
    }, AUTOPLAY_INTERVAL_MS)

    return () => window.clearTimeout(timeout)
  }, [activeIndex])

  return (
    <div aria-label="Customer quotes" aria-roledescription="carousel" role="region">
      <p aria-live="polite" className="sr-only">
        Quote from {customerQuotes[activeIndex].company}
      </p>

      <div className="grid min-h-96 min-w-0 py-12 lg:py-20">
        {customerQuotes.map((quote, index) => {
          const isActive = index === activeIndex

          return (
            <figure
              aria-hidden={!isActive}
              className={cn(
                'col-start-1 row-start-1 flex min-h-80 min-w-0 flex-col items-center justify-center text-center transition-opacity duration-700 ease-in-out motion-reduce:transition-none',
                isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
              )}
              key={quote.company}
            >
              <blockquote className="m-0 w-full max-w-5xl text-pretty !border-0 !pl-0 text-3xl font-medium leading-tight tracking-[-0.03em] text-signoz_vanilla-400 sm:text-4xl lg:text-5xl">
                “{quote.quoteBefore}
                <span className="text-signoz_vanilla-100">{quote.quoteEmphasis}</span>
                {quote.quoteAfter}”
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
                <span aria-hidden="true" className="h-10 w-px bg-signoz_slate-400" />
                <span className="min-w-0 text-left">
                  <span className="block font-medium text-signoz_vanilla-100">
                    {quote.attribution}
                  </span>
                  <span className="mt-1 block text-sm leading-5 text-signoz_vanilla-400">
                    {quote.role}
                  </span>
                </span>
              </figcaption>

              <Link
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-signoz_robin-400 transition-colors hover:text-signoz_robin-300"
                href={quote.href}
                rel={quote.company === 'Oracle' ? 'noopener noreferrer nofollow' : undefined}
                tabIndex={isActive ? 0 : -1}
                target={quote.company === 'Oracle' ? '_blank' : undefined}
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
        {customerQuotes.map((quote, index) => {
          const isActive = index === activeIndex

          return (
            <button
              aria-label={`Show quote ${index + 1} from ${quote.company}`}
              aria-pressed={isActive}
              className="group flex h-6 w-6 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signoz_robin-400"
              key={quote.company}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <span
                aria-hidden="true"
                className={cn(
                  'h-1.5 w-1.5 rounded-full transition-colors',
                  isActive
                    ? 'bg-signoz_vanilla-100'
                    : 'bg-signoz_slate-300 group-hover:bg-signoz_vanilla-400'
                )}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
