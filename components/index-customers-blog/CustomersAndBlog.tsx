import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import TrackingLink from '@/components/TrackingLink'

import {
  HOMEPAGE_BLOG_CARDS,
  HOMEPAGE_CUSTOMERS_STRIP,
  HOMEPAGE_FEATURE_QUOTES,
  type FeatureQuote,
} from './homepageCustomersBlog.constants'

function TextureDivider() {
  return (
    <div
      aria-hidden="true"
      data-markdown-ignore
      className="h-5 w-full"
      style={{
        backgroundImage:
          'repeating-linear-gradient(115deg, color-mix(in srgb, var(--l1-foreground) 14%, transparent) 0 1px, transparent 1px 6px)',
      }}
    />
  )
}

// These cards intentionally stay light in dark mode (per Figma).
const QUOTE_TONES: Record<FeatureQuote['tone'], { card: string; ink: string; sub: string }> = {
  lavender: {
    card: 'linear-gradient(160deg, #dbe6fb 0%, #ece4fa 60%, #f6e9fb 100%)',
    ink: '#16181d',
    sub: '#5a6070',
  },
  citrus: {
    card: '#e3f230',
    ink: '#16181d',
    sub: '#4a521a',
  },
}

function FeatureQuoteCard({ quote }: { quote: FeatureQuote }) {
  const tone = QUOTE_TONES[quote.tone]

  return (
    <figure
      className="m-0 flex min-h-[420px] flex-col justify-between rounded-md p-8 sm:p-10"
      style={{ background: tone.card }}
    >
      <blockquote
        className="m-0 max-w-xl text-2xl font-medium leading-snug tracking-tight sm:text-3xl"
        style={{ color: tone.ink }}
      >
        {quote.quote}
      </blockquote>
      <figcaption className="mt-10 flex items-center gap-3">
        {quote.logoSrc ? (
          <Image
            src={quote.logoSrc}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-contain"
          />
        ) : (
          <span
            aria-hidden="true"
            className="grid h-10 w-10 place-items-center rounded-full border text-sm font-semibold"
            style={{ borderColor: tone.sub, color: tone.ink }}
          >
            {quote.role.charAt(0)}
          </span>
        )}
        <span
          className="border-l pl-3"
          style={{
            borderColor: 'color-mix(in srgb, currentColor 25%, transparent)',
            color: tone.ink,
          }}
        >
          <span className="block text-sm font-semibold">{quote.name}</span>
          <span className="block text-xs" style={{ color: tone.sub }}>
            {quote.role}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}

export default function CustomersAndBlog() {
  return (
    <section
      id="customers"
      className="relative left-1/2 mx-auto w-dvw max-w-none -translate-x-1/2 px-5 py-14 sm:px-6 sm:py-16 lg:px-20 lg:py-20 wide:max-w-8xl wide:px-0"
    >
      <div className="mx-auto max-w-8xl">
        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <FeatureQuoteCard quote={HOMEPAGE_FEATURE_QUOTES[0]} />
          <FeatureQuoteCard quote={HOMEPAGE_FEATURE_QUOTES[1]} />
        </div>

        <div className="mt-10">
          <TextureDivider />
          <div className="flex flex-col justify-between gap-5 py-8 md:flex-row md:items-center">
            <p className="m-0 text-base leading-7 text-[var(--l2-foreground)]">
              {HOMEPAGE_CUSTOMERS_STRIP.lead}{' '}
              <span className="font-semibold text-[var(--l1-foreground)]">
                {HOMEPAGE_CUSTOMERS_STRIP.count}
              </span>{' '}
              {HOMEPAGE_CUSTOMERS_STRIP.tail}
            </p>
            <TrackingLink
              className="btn-tactile btn-tactile--secondary shrink-0 no-underline"
              clickLocation="Homepage Customers Section"
              clickName="Customer Stories Button"
              clickText={HOMEPAGE_CUSTOMERS_STRIP.ctaLabel}
              clickType="Secondary CTA"
              href={HOMEPAGE_CUSTOMERS_STRIP.ctaHref}
            >
              {HOMEPAGE_CUSTOMERS_STRIP.ctaLabel}
              <ArrowRight size={12} aria-hidden="true" />
            </TrackingLink>
          </div>
        </div>

        <div className="rule-fade-x grid gap-y-10 border-t border-[var(--l2-border)] pt-10 md:grid-cols-3 md:gap-y-0">
          {HOMEPAGE_BLOG_CARDS.map((card, index) => (
            <TrackingLink
              key={`${card.title}-${index}`}
              className="md:vrule-solid group flex flex-col no-underline md:px-8 md:pb-6 md:first:pl-0 md:first:before:hidden md:last:pr-0"
              clickLocation="Homepage Blog Cards"
              clickName="Homepage Blog Card"
              clickText={card.title}
              clickType="Blog Link"
              href={card.href}
            >
              <span className="relative block aspect-[16/10] w-full overflow-hidden rounded-md border border-[var(--l2-border)] bg-[var(--l2-background)]">
                {card.imageSrc ? (
                  <Image
                    src={card.imageSrc}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 grid place-items-center text-xs lowercase tracking-widest text-[var(--l2-foreground)]"
                  >
                    image placeholder
                  </span>
                )}
              </span>
              <span className="mt-5 block text-lg font-medium leading-7 text-[var(--l1-foreground)] transition-colors group-hover:text-[var(--bg-robin-300)]">
                {card.title}
              </span>
              <span className="btn-tactile btn-tactile--secondary mt-4 w-fit">
                Read more
                <ArrowRight size={12} aria-hidden="true" />
              </span>
            </TrackingLink>
          ))}
        </div>

        <div className="mt-12">
          <TextureDivider />
        </div>
      </div>
    </section>
  )
}
