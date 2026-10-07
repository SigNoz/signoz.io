import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

import TrackingLink from '@/components/TrackingLink'
import { cn } from 'app/lib/utils'

import type {
  FeaturedQuoteCardProps,
  LogoCardProps,
  LogoMarkProps,
  ProofLinkProps,
  QuoteCardProps,
} from '@/components/index-header/homepage-customer-proof/HomepageCustomerProof.types'
import {
  getVisibleAttribution,
  isMigrationLabel,
} from '@/components/index-header/homepage-customer-proof/HomepageCustomerProof.utils'

const cardClassName =
  'relative h-full overflow-hidden rounded-none border border-solid border-[var(--l2-border)] bg-[var(--l2-background)] text-[var(--l1-foreground)]'

export function ProofLink({
  ariaLabel,
  children,
  className,
  clickName,
  clickLocation = 'Customers Proof Wall',
  clickText,
  href,
  isClone,
}: ProofLinkProps) {
  const isExternal = href.startsWith('http')

  return (
    <TrackingLink
      href={href}
      clickType="Customer Proof"
      clickName={clickName}
      clickText={clickText}
      clickLocation={clickLocation}
      eventAttributes={{ target: href }}
      target="_blank"
      rel={isExternal ? 'noopener noreferrer nofollow' : 'noopener noreferrer'}
      tabIndex={isClone ? -1 : undefined}
      aria-label={isClone ? undefined : ariaLabel}
      className={cn(
        'group transition-colors duration-200 hover:border-[var(--l3-border)] hover:bg-[var(--l3-background)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent-primary)] motion-reduce:transition-none',
        className
      )}
    >
      {children}
    </TrackingLink>
  )
}

export function LogoMark({ context = 'card', decorative = false, logo }: LogoMarkProps) {
  const { Logo, cardWidth, imageClassName, imageSrc, isWordmark, name, quoteWidth, viewBox } = logo
  const viewBoxProps = viewBox ? { viewBox } : {}
  const isQuote = context === 'quote'
  const logoHeight = isQuote ? 20 : 28
  const logoWidth = isQuote ? (quoteWidth ?? Math.min(cardWidth ?? 104, 96)) : (cardWidth ?? 108)

  if (imageSrc) {
    if (isWordmark) {
      return (
        <span
          aria-hidden={decorative ? true : undefined}
          aria-label={decorative ? undefined : `${name} logo`}
          className="relative flex shrink-0 items-center justify-center"
          role={decorative ? undefined : 'img'}
          style={{ height: logoHeight, width: logoWidth }}
        >
          <Image
            alt=""
            aria-hidden="true"
            className={cn('h-full w-full object-contain', imageClassName)}
            fill
            sizes={`${logoWidth}px`}
            src={imageSrc}
          />
        </span>
      )
    }

    return (
      <span
        aria-hidden={decorative ? true : undefined}
        aria-label={decorative ? undefined : `${name} logo`}
        className={cn('flex min-w-0 items-center justify-center', isQuote ? 'gap-2' : 'gap-2.5')}
        role={decorative ? undefined : 'img'}
      >
        <Image
          alt=""
          aria-hidden="true"
          className={cn(
            'shrink-0 object-contain outline outline-1 -outline-offset-1 outline-[var(--l2-border)]',
            isQuote ? 'h-5 w-5 rounded-[5px]' : 'h-7 w-7 rounded-[7px]'
          )}
          height={logoHeight}
          src={imageSrc}
          width={logoHeight}
        />
        <span
          className={cn(
            'min-w-0 font-medium text-[var(--l1-foreground)]',
            isQuote
              ? 'truncate whitespace-nowrap text-xs leading-4'
              : 'text-pretty text-sm leading-5'
          )}
        >
          {name}
        </span>
      </span>
    )
  }

  if (!Logo) return null

  return (
    <span
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : `${name} logo`}
      className="flex shrink-0 items-center justify-center"
      role={decorative ? undefined : 'img'}
      style={{ height: logoHeight, width: logoWidth }}
    >
      <Logo aria-hidden="true" className="block h-full w-full" {...viewBoxProps} />
    </span>
  )
}

export function LogoCard({ className, clickLocation, href, isClone, logo }: LogoCardProps) {
  const content = (
    <>
      <div className="flex items-center justify-center">
        <LogoMark decorative={Boolean(href)} logo={logo} />
      </div>
      {href ? (
        <ArrowUpRight
          aria-hidden="true"
          className="absolute right-3 top-3 text-[var(--l3-foreground)] transition-colors group-hover:text-[var(--l1-foreground)]"
          size={13}
        />
      ) : null}
    </>
  )
  const classes = cn(cardClassName, 'flex items-center justify-center px-3', className)

  if (!href) {
    return <div className={classes}>{content}</div>
  }

  return (
    <ProofLink
      ariaLabel={`Read the ${logo.name} customer story`}
      className={classes}
      clickName="Customer Logo Link"
      clickLocation={clickLocation}
      clickText={logo.name}
      href={href}
      isClone={isClone}
    >
      {content}
    </ProofLink>
  )
}

export function QuoteCard({
  attribution,
  className,
  clickLocation,
  href,
  isClone,
  logo,
  quote,
  theme,
}: QuoteCardProps) {
  const showMigrationLabel = isMigrationLabel(theme)
  const visibleAttribution = getVisibleAttribution(attribution, logo)
  const [personName, ...attributionDetails] = attribution.split(' · ')

  return (
    <ProofLink
      ariaLabel={`${showMigrationLabel ? `${theme}: ` : ''}${quote} — ${attribution}`}
      className={cn(cardClassName, 'flex items-center gap-3 px-4 py-2 text-left', className)}
      clickName="Customer Quote Link"
      clickLocation={clickLocation}
      clickText={theme}
      href={href}
      isClone={isClone}
    >
      <div className="flex h-full w-[120px] shrink-0 flex-col justify-center overflow-hidden">
        {logo ? (
          <div className="flex min-h-5 min-w-0 items-center justify-start overflow-hidden">
            <LogoMark context="quote" decorative logo={logo} />
          </div>
        ) : (
          <div className="min-w-0">
            <div className="truncate text-xs font-medium leading-4 text-[var(--l1-foreground)]">
              {personName}
            </div>
            {attributionDetails.length ? (
              <div className="mt-0.5 line-clamp-2 text-pretty text-[10px] leading-[14px] text-[var(--l2-foreground)]">
                {attributionDetails.join(' · ')}
              </div>
            ) : null}
          </div>
        )}
        {showMigrationLabel ? (
          <div className="mt-1 line-clamp-2 text-pretty text-[10px] font-semibold uppercase leading-[12px] tracking-[0.1em] text-[var(--l2-foreground)]">
            {theme}
          </div>
        ) : null}
        {logo && visibleAttribution ? (
          <div className="mt-0.5 truncate text-[10px] leading-[14px] text-[var(--l2-foreground)]">
            {visibleAttribution}
          </div>
        ) : null}
      </div>
      <blockquote className="m-0 flex min-w-0 flex-1 items-center self-stretch border-l border-[var(--l2-border)] pl-3 pr-2">
        <p className="m-0 line-clamp-3 text-pretty text-xs font-normal leading-4 text-[var(--l1-foreground)]">
          “{quote}”
        </p>
      </blockquote>
      <ArrowUpRight
        aria-hidden="true"
        className="absolute right-3 top-3 text-[var(--l3-foreground)] transition-colors group-hover:text-[var(--l1-foreground)]"
        size={13}
      />
    </ProofLink>
  )
}

export function FeaturedQuoteCard({
  attribution,
  className,
  clickLocation,
  href,
  isClone,
  logo,
  quote,
  theme,
}: FeaturedQuoteCardProps) {
  const showMigrationLabel = isMigrationLabel(theme)
  const visibleAttribution = getVisibleAttribution(attribution, logo)

  return (
    <ProofLink
      ariaLabel={`${showMigrationLabel ? `${theme}: ` : ''}${quote} — ${attribution}`}
      className={cn(cardClassName, 'flex flex-col px-4 py-4 text-left', className)}
      clickName="Customer Quote Link"
      clickLocation={clickLocation}
      clickText={theme}
      href={href}
      isClone={isClone}
    >
      <div className="flex min-h-5 min-w-0 items-center justify-start overflow-hidden">
        {logo ? (
          <LogoMark context="quote" decorative logo={logo} />
        ) : (
          <span className="truncate text-xs font-medium leading-4 text-[var(--l1-foreground)]">
            {attribution}
          </span>
        )}
      </div>
      {showMigrationLabel ? (
        <div className="mt-1.5 text-pretty text-[10px] font-semibold uppercase leading-[12px] tracking-[0.1em] text-[var(--l2-foreground)]">
          {theme}
        </div>
      ) : null}
      {logo && visibleAttribution ? (
        <div className="mt-0.5 truncate pr-5 text-[10px] leading-[14px] text-[var(--l2-foreground)]">
          {visibleAttribution}
        </div>
      ) : null}
      <blockquote className="m-0 mt-2.5 flex min-h-0 flex-1 items-center border-l border-[var(--l2-border)] pl-3 pr-2">
        <p className="m-0 line-clamp-4 text-pretty text-sm font-normal leading-5 text-[var(--l1-foreground)]">
          “{quote}”
        </p>
      </blockquote>
      <ArrowUpRight
        aria-hidden="true"
        className="absolute right-3 top-3 text-[var(--l3-foreground)] transition-colors group-hover:text-[var(--l1-foreground)]"
        size={13}
      />
    </ProofLink>
  )
}
