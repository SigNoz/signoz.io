'use client'

import Image from 'next/image'
import {
  memo,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
  type SVGProps,
} from 'react'
import { ArrowUpRight } from 'lucide-react'

import TrackingLink from '@/components/TrackingLink'
import { EXPERIMENTS } from '@/constants/experiments'
import { cn } from 'app/lib/utils'
import ShapedLogo from '@/public/img/case_study/logos/shaped-logo.svg'
import BlackForestLabsLogo from '@/public/svgs/icons/blackforestlabs.svg'
import BlaxelLogo from '@/public/svgs/icons/blaxel.svg'
import EltropyLogo from '@/public/svgs/icons/eltropy.svg'
import FormanceLogo from '@/public/svgs/icons/formance.svg'
import InkeepLogo from '@/public/svgs/icons/inkeep.svg'
import KernelLogo from '@/public/svgs/icons/kernel.svg'
import ParallelLogo from '@/public/svgs/icons/parallel-ai.svg'
import SalientLogo from '@/public/svgs/icons/salient.svg'
import SarvamLogo from '@/public/svgs/icons/sarvam.svg'
import TavusLogo from '@/public/svgs/icons/tavus.svg'

import styles from './HomepageCustomerProof.module.css'

const experimentId = EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.id
const variantId = EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.variants.VARIANT
const clickLocation = 'Homepage Hero Customer Proof'
const carouselCycleWidth = 3756
const carouselDurationSeconds = 202
type LogoComponent = ComponentType<SVGProps<SVGSVGElement>>
type LogoContext = 'card' | 'quote'

type LogoSpec = {
  Logo?: LogoComponent
  cardWidth?: number
  imageClassName?: string
  imageSrc?: string
  isWordmark?: boolean
  name: string
  quoteWidth?: number
  viewBox?: string
}

const faviconPath = '/img/homepage/customer-logos'

const logos = {
  alienIntelligence: {
    imageSrc: `${faviconPath}/alien-intelligence.png`,
    name: 'Alien Intelligence',
  },
  ariso: { imageSrc: `${faviconPath}/ariso.png`, name: 'Ariso' },
  armur: { imageSrc: `${faviconPath}/armur-ai.jpg`, name: 'Armur AI' },
  auvik: {
    cardWidth: 90,
    imageSrc: `${faviconPath}/auvik.svg`,
    isWordmark: true,
    name: 'Auvik',
  },
  blackForestLabs: {
    Logo: BlackForestLabsLogo,
    name: 'Black Forest Labs',
    cardWidth: 116,
    viewBox: '0 0 974 200',
  },
  blaxel: { Logo: BlaxelLogo, name: 'Blaxel', cardWidth: 92 },
  cisco: { imageSrc: `${faviconPath}/cisco.svg`, name: 'Cisco' },
  eltropy: {
    Logo: EltropyLogo,
    name: 'Eltropy',
    cardWidth: 92,
    viewBox: '72 170 1056 280',
  },
  fiscalNote: { imageSrc: `${faviconPath}/fiscalnote.png`, name: 'FiscalNote' },
  flutterwave: {
    cardWidth: 108,
    imageSrc: `${faviconPath}/flutterwave.svg`,
    imageClassName: 'brightness-0 invert',
    isWordmark: true,
    name: 'Flutterwave',
  },
  formance: { Logo: FormanceLogo, name: 'Formance', cardWidth: 108 },
  formstack: {
    cardWidth: 104,
    imageSrc: `${faviconPath}/formstack.svg`,
    isWordmark: true,
    name: 'Formstack',
  },
  harmonic: { imageSrc: `${faviconPath}/harmonic.png`, name: 'Harmonic Inc.' },
  harmonicAi: {
    cardWidth: 110,
    imageSrc: `${faviconPath}/harmonic-ai.svg`,
    isWordmark: true,
    name: 'Harmonic.ai',
  },
  inkeep: {
    Logo: InkeepLogo,
    name: 'Inkeep',
    cardWidth: 104,
    quoteWidth: 96,
    viewBox: '0 0 446 86',
  },
  kernel: {
    Logo: KernelLogo,
    name: 'Kernel',
    cardWidth: 96,
    quoteWidth: 88,
    viewBox: '136 180 856.406 180',
  },
  lenskart: {
    cardWidth: 108,
    imageSrc: `${faviconPath}/lenskart.svg`,
    imageClassName: 'brightness-0 invert',
    isWordmark: true,
    name: 'Lenskart',
  },
  lgElectronics: {
    cardWidth: 102,
    imageSrc: `${faviconPath}/lg-electronics.svg`,
    isWordmark: true,
    name: 'LG Electronics',
  },
  moneyhub: { imageSrc: `${faviconPath}/moneyhub.png`, name: 'Moneyhub' },
  oracle: {
    cardWidth: 100,
    imageSrc: `${faviconPath}/oracle.svg`,
    isWordmark: true,
    name: 'Oracle',
    quoteWidth: 88,
  },
  parallel: {
    Logo: ParallelLogo,
    name: 'Parallel',
    cardWidth: 104,
    viewBox: '39 190 1322 240',
  },
  racingAndSports: {
    imageSrc: `${faviconPath}/racing-and-sports.png`,
    name: 'Racing & Sports',
  },
  sailResearch: {
    cardWidth: 98,
    imageSrc: `${faviconPath}/sail-research.svg`,
    imageClassName: 'brightness-0 invert',
    isWordmark: true,
    name: 'Sail Research',
  },
  salient: {
    Logo: SalientLogo,
    name: 'Salient',
    cardWidth: 92,
    viewBox: '0 0 97 28',
  },
  sarvam: { Logo: SarvamLogo, name: 'Sarvam AI', cardWidth: 98 },
  shaped: {
    Logo: ShapedLogo,
    name: 'Shaped',
    cardWidth: 104,
    quoteWidth: 94,
  },
  structureFlow: {
    cardWidth: 108,
    imageSrc: `${faviconPath}/structureflow.svg`,
    isWordmark: true,
    name: 'StructureFlow',
  },
  tavus: { Logo: TavusLogo, name: 'Tavus', cardWidth: 88, viewBox: '0 0 102 21' },
  websiteEngineer: {
    imageSrc: `${faviconPath}/website-engineer.png`,
    name: 'The Website Engineer',
  },
  xaira: { imageSrc: `${faviconPath}/xaira.png`, name: 'Xaira' },
  xata: { imageSrc: `${faviconPath}/xata.svg`, name: 'Xata' },
} satisfies Record<string, LogoSpec>

const cardClassName =
  'relative h-full overflow-hidden rounded-[18px] bg-signoz_ink-300 text-signoz_vanilla-100 shadow-[0_0_0_1px_rgba(255,255,255,0.035)]'

type DragState = {
  pointerId: number
  startOffset: number
  startScrollLeft: number
  startX: number
  usesNativeScroll: boolean
}

function normalizeCarouselOffset(offset: number) {
  const remainder = offset % carouselCycleWidth
  return remainder > 0 ? remainder - carouselCycleWidth : remainder
}

function getCarouselTranslateX(element: HTMLDivElement | null) {
  if (!element) return 0

  const transform = window.getComputedStyle(element).transform
  if (!transform || transform === 'none') return 0

  const matrix = transform.match(/^matrix(3d)?\((.+)\)$/)
  if (!matrix) return 0

  const values = matrix[2].split(',').map(Number)
  const translateX = matrix[1] ? values[12] : values[4]
  return Number.isFinite(translateX) ? translateX : 0
}

type ProofLinkProps = {
  ariaLabel: string
  children: ReactNode
  className?: string
  clickName: string
  clickText: string
  href: string
  isClone: boolean
}

function ProofLink({
  ariaLabel,
  children,
  className,
  clickName,
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
      experimentId={experimentId}
      variantId={variantId}
      target="_blank"
      rel={isExternal ? 'noopener noreferrer nofollow' : 'noopener noreferrer'}
      tabIndex={isClone ? -1 : undefined}
      aria-label={isClone ? undefined : ariaLabel}
      className={cn(
        'group transition-colors duration-200 hover:bg-signoz_ink-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-signoz_robin-400 motion-reduce:transition-none',
        className
      )}
    >
      {children}
    </TrackingLink>
  )
}

type LogoMarkProps = {
  context?: LogoContext
  decorative?: boolean
  logo: LogoSpec
}

function LogoMark({ context = 'card', decorative = false, logo }: LogoMarkProps) {
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
            'shrink-0 object-contain outline outline-1 -outline-offset-1 outline-white/10',
            isQuote ? 'h-5 w-5 rounded-[5px]' : 'h-7 w-7 rounded-[7px]'
          )}
          height={logoHeight}
          src={imageSrc}
          width={logoHeight}
        />
        <span
          className={cn(
            'min-w-0 font-medium text-signoz_vanilla-100',
            isQuote
              ? 'truncate whitespace-nowrap text-[11px] leading-[14px]'
              : 'text-pretty text-[13px] leading-4'
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

type LogoCardProps = {
  className?: string
  href?: string
  isClone: boolean
  logo: LogoSpec
}

function LogoCard({ className, href, isClone, logo }: LogoCardProps) {
  const content = (
    <>
      <div className="flex items-center justify-center">
        <LogoMark decorative={Boolean(href)} logo={logo} />
      </div>
      {href ? (
        <ArrowUpRight
          aria-hidden="true"
          className="absolute right-3 top-3 text-signoz_vanilla-400/45 transition-colors group-hover:text-signoz_vanilla-100"
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
      clickName="Homepage Customer Logo"
      clickText={logo.name}
      href={href}
      isClone={isClone}
    >
      {content}
    </ProofLink>
  )
}

type QuoteCardProps = {
  attribution: string
  className?: string
  href: string
  isClone: boolean
  logo?: LogoSpec
  quote: string
  theme: string
}

function isMigrationLabel(theme: string) {
  return /\bmigrat(?:ed|ion)\b/i.test(theme) || /^replaced\b/i.test(theme)
}

function getVisibleAttribution(attribution: string, logo?: LogoSpec) {
  if (!logo) return attribution

  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '')
  const parts = attribution.split(' · ').map((part) => part.trim())
  const companyName = normalize(logo.name)
  const finalPart = normalize(parts.at(-1) ?? '')

  if (finalPart === companyName) {
    return parts.length === 1 ? null : parts.slice(0, -1).join(' · ')
  }

  if (parts.length > 1 && (finalPart.includes(companyName) || companyName.includes(finalPart))) {
    return parts.slice(0, -1).join(' · ')
  }

  return attribution
}

function QuoteCard({ attribution, className, href, isClone, logo, quote, theme }: QuoteCardProps) {
  const showMigrationLabel = isMigrationLabel(theme)
  const visibleAttribution = getVisibleAttribution(attribution, logo)
  const [personName, ...attributionDetails] = attribution.split(' · ')

  return (
    <ProofLink
      ariaLabel={`${showMigrationLabel ? `${theme}: ` : ''}${quote} — ${attribution}`}
      className={cn(
        cardClassName,
        'flex items-center gap-3 px-4 py-2 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.055)]',
        className
      )}
      clickName="Homepage Customer Quote"
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
            <div className="truncate text-[11px] font-medium leading-[14px] text-signoz_vanilla-100">
              {personName}
            </div>
            {attributionDetails.length ? (
              <div className="mt-0.5 line-clamp-2 text-pretty text-[9px] leading-3 text-signoz_vanilla-400/80">
                {attributionDetails.join(' · ')}
              </div>
            ) : null}
          </div>
        )}
        {showMigrationLabel ? (
          <div className="mt-1 line-clamp-2 text-pretty text-[9px] font-semibold uppercase leading-[11px] tracking-[0.1em] text-signoz_vanilla-400">
            {theme}
          </div>
        ) : null}
        {logo && visibleAttribution ? (
          <div className="mt-0.5 truncate text-[9px] leading-3 text-signoz_vanilla-400/80">
            {visibleAttribution}
          </div>
        ) : null}
      </div>
      <blockquote className="m-0 flex min-w-0 flex-1 items-center self-stretch border-l border-white/[0.08] pl-3 pr-2">
        <p className="m-0 line-clamp-3 text-pretty text-[11px] font-normal leading-[14px] tracking-[-0.04px] text-signoz_vanilla-100">
          “{quote}”
        </p>
      </blockquote>
      <ArrowUpRight
        aria-hidden="true"
        className="absolute right-3 top-3 text-signoz_vanilla-400/50 transition-colors group-hover:text-signoz_vanilla-100"
        size={13}
      />
    </ProofLink>
  )
}

type FeaturedQuoteCardProps = QuoteCardProps

function FeaturedQuoteCard({
  attribution,
  className,
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
      className={cn(
        cardClassName,
        'flex flex-col px-4 py-4 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.055)]',
        className
      )}
      clickName="Homepage Customer Quote"
      clickText={theme}
      href={href}
      isClone={isClone}
    >
      <div className="flex min-h-5 min-w-0 items-center justify-start overflow-hidden">
        {logo ? (
          <LogoMark context="quote" decorative logo={logo} />
        ) : (
          <span className="truncate text-[11px] font-medium leading-[14px] text-signoz_vanilla-100">
            {attribution}
          </span>
        )}
      </div>
      {showMigrationLabel ? (
        <div className="mt-1.5 text-pretty text-[9px] font-semibold uppercase leading-[11px] tracking-[0.1em] text-signoz_vanilla-400">
          {theme}
        </div>
      ) : null}
      {logo && visibleAttribution ? (
        <div className="mt-0.5 truncate pr-5 text-[9px] leading-3 text-signoz_vanilla-400/80">
          {visibleAttribution}
        </div>
      ) : null}
      <blockquote className="m-0 mt-2.5 flex min-h-0 flex-1 items-center border-l border-white/[0.12] pl-3 pr-2">
        <p className="m-0 line-clamp-4 text-pretty text-[12px] font-normal leading-[16px] tracking-[-0.05px] text-signoz_vanilla-100">
          “{quote}”
        </p>
      </blockquote>
      <ArrowUpRight
        aria-hidden="true"
        className="absolute right-3 top-3 text-signoz_vanilla-400/50 transition-colors group-hover:text-signoz_vanilla-100"
        size={13}
      />
    </ProofLink>
  )
}

type BentoCellProps = {
  children: ReactNode
  column: number
  columnSpan?: number
  row: number
  rowSpan?: number
}

function BentoCell({ children, column, columnSpan = 1, row, rowSpan = 1 }: BentoCellProps) {
  return (
    <div
      className="min-h-0 min-w-0"
      style={{
        gridColumn: `${column} / span ${columnSpan}`,
        gridRow: `${row} / span ${rowSpan}`,
      }}
    >
      {children}
    </div>
  )
}

const BentoBoard = memo(function BentoBoard({ isClone }: { isClone: boolean }) {
  return (
    <div
      aria-hidden={isClone ? true : undefined}
      className="grid h-[264px] w-[3744px] shrink-0 grid-cols-[repeat(24,minmax(0,1fr))] grid-rows-3 gap-3 pl-3"
      data-proof-clone={isClone ? 'true' : undefined}
    >
      <BentoCell column={4} columnSpan={3} row={1} rowSpan={2}>
        <FeaturedQuoteCard
          attribution="Mark Nelson · Oracle"
          href="https://www.linkedin.com/posts/marknelson6_oracle-backend-for-microservices-and-ai-activity-7366870519129731073-cgU2"
          isClone={isClone}
          logo={logos.oracle}
          quote="We’ve transitioned from Grafana to SigNoz, offering a simplified, unified monitoring, logging, and alerting experience."
          theme="Migrated from Grafana"
        />
      </BentoCell>
      <BentoCell column={7} columnSpan={2} row={1}>
        <LogoCard isClone={isClone} logo={logos.parallel} />
      </BentoCell>
      <BentoCell column={3} row={3}>
        <LogoCard isClone={isClone} logo={logos.auvik} />
      </BentoCell>
      <BentoCell column={1} columnSpan={2} row={2} rowSpan={2}>
        <FeaturedQuoteCard
          attribution="Inkeep"
          href="https://docs.inkeep.com/get-started/traces"
          isClone={isClone}
          logo={logos.inkeep}
          quote="We’ve been using SigNoz as a first-class dependency in our new agent framework."
          theme="Agent framework"
        />
      </BentoCell>
      <BentoCell column={3} row={1}>
        <LogoCard isClone={isClone} logo={logos.sarvam} />
      </BentoCell>
      <BentoCell column={3} row={2}>
        <LogoCard isClone={isClone} logo={logos.flutterwave} />
      </BentoCell>
      <BentoCell column={4} columnSpan={3} row={3}>
        <QuoteCard
          attribution="Hiro Tamada · Kernel"
          href="/case-study/kernel/"
          isClone={isClone}
          logo={logos.kernel}
          quote="SigNoz MCP has been a very big part of our engineering life."
          theme="Agent-native triage"
        />
      </BentoCell>
      <BentoCell column={1} columnSpan={2} row={1}>
        <LogoCard isClone={isClone} logo={logos.lenskart} />
      </BentoCell>
      <BentoCell column={7} columnSpan={2} row={2} rowSpan={2}>
        <FeaturedQuoteCard
          attribution="Karl Lyons · Shaped"
          href="/case-study/shaped/"
          isClone={isClone}
          logo={logos.shaped}
          quote="Every single time we have an issue, SigNoz is always the first place to check."
          theme="Migrated from CloudWatch + Honeycomb"
        />
      </BentoCell>

      <BentoCell column={9} columnSpan={4} row={1}>
        <QuoteCard
          attribution="Leo Blondel · CTO · Alien Intelligence"
          href="/blog/alien-intelligence-ai-sre-workflow-signoz/#what-leo-built-at-alien-intelligence"
          isClone={isClone}
          logo={logos.alienIntelligence}
          quote="Datadog came back and said, ‘The trial’s over — it’s going to cost you over $2K.’ I was like, ‘Sorry, what?’"
          theme="Datadog pricing"
        />
      </BentoCell>
      <BentoCell column={13} row={1}>
        <LogoCard isClone={isClone} logo={logos.eltropy} />
      </BentoCell>
      <BentoCell column={14} columnSpan={3} row={1}>
        <QuoteCard
          attribution="Doug Drechsel · Oracle Developers"
          href="https://medium.com/oracledevs/observability-the-smart-way-automating-metrics-in-java-microservices-2f82340114cb"
          isClone={isClone}
          logo={logos.oracle}
          quote="We chose SigNoz to tie it all together."
          theme="Unified observability"
        />
      </BentoCell>
      <BentoCell column={17} row={1}>
        <LogoCard isClone={isClone} logo={logos.salient} />
      </BentoCell>
      <BentoCell column={18} columnSpan={3} row={1}>
        <QuoteCard
          attribution="Akhil Sharma · Armur AI"
          href="https://www.linkedin.com/posts/akhilsails_at-armur-ai-we-removed-all-observability-activity-7363461664848957440-LbW2"
          isClone={isClone}
          logo={logos.armur}
          quote="At Armur AI, we removed all observability tools and have been using only one — SigNoz."
          theme="Consolidated to SigNoz"
        />
      </BentoCell>
      <BentoCell column={21} columnSpan={2} row={1}>
        <LogoCard isClone={isClone} logo={logos.cisco} />
      </BentoCell>
      <BentoCell column={23} row={1}>
        <LogoCard isClone={isClone} logo={logos.blackForestLabs} />
      </BentoCell>
      <BentoCell column={24} row={1}>
        <LogoCard isClone={isClone} logo={logos.harmonicAi} />
      </BentoCell>

      <BentoCell column={9} columnSpan={3} row={2}>
        <QuoteCard
          attribution="Doug Drechsel · Oracle"
          href="https://www.linkedin.com/posts/dougdrechsel_streamlining-kafka-microservices-and-observability-activity-7457462317891588097-H8nC"
          isClone={isClone}
          logo={logos.oracle}
          quote="One environment variable. Full Kafka observability. Zero code changes."
          theme="Kafka · Zero code changes"
        />
      </BentoCell>
      <BentoCell column={12} row={2}>
        <LogoCard isClone={isClone} logo={logos.structureFlow} />
      </BentoCell>
      <BentoCell column={13} row={2}>
        <LogoCard isClone={isClone} logo={logos.formstack} />
      </BentoCell>
      <BentoCell column={14} row={2}>
        <LogoCard isClone={isClone} logo={logos.tavus} />
      </BentoCell>
      <BentoCell column={15} columnSpan={3} row={2}>
        <QuoteCard
          attribution="Eugene Evenwel · The Website Engineer"
          href="https://thewebsiteengineer.com/blog/how-we-saved-90-on-our-monitoring-bill-by-dropping-new-relic-for-signoz/"
          isClone={isClone}
          logo={logos.websiteEngineer}
          quote="We made the switch to self-hosted SigNoz — and haven’t looked back since."
          theme="Migrated from New Relic"
        />
      </BentoCell>
      <BentoCell column={18} columnSpan={2} row={2}>
        <LogoCard isClone={isClone} logo={logos.lgElectronics} />
      </BentoCell>
      <BentoCell column={20} columnSpan={3} row={2}>
        <QuoteCard
          attribution="Andrew · @buzahuza"
          href="https://x.com/buzahuza/status/1943072730825232893"
          isClone={isClone}
          quote="We replaced our Grafana–Prometheus–Alertmanager–Loki stack with it and we are happy."
          theme="Replaced Grafana stack"
        />
      </BentoCell>
      <BentoCell column={23} row={2}>
        <LogoCard isClone={isClone} logo={logos.xaira} />
      </BentoCell>
      <BentoCell column={24} row={2}>
        <LogoCard isClone={isClone} logo={logos.racingAndSports} />
      </BentoCell>

      <BentoCell column={9} row={3}>
        <LogoCard isClone={isClone} logo={logos.moneyhub} />
      </BentoCell>
      <BentoCell column={10} row={3}>
        <LogoCard isClone={isClone} logo={logos.blaxel} />
      </BentoCell>
      <BentoCell column={11} columnSpan={2} row={3}>
        <LogoCard isClone={isClone} logo={logos.harmonic} />
      </BentoCell>
      <BentoCell column={13} columnSpan={2} row={3}>
        <LogoCard isClone={isClone} logo={logos.fiscalNote} />
      </BentoCell>
      <BentoCell column={15} columnSpan={2} row={3}>
        <LogoCard isClone={isClone} logo={logos.xata} />
      </BentoCell>
      <BentoCell column={17} columnSpan={3} row={3}>
        <QuoteCard
          attribution="Stelios Pavlidis · Founder · Whatoblock.com"
          href="https://www.linkedin.com/posts/steliospavlidis_observability-devops-sre-activity-7417883949152174080-vGcf"
          isClone={isClone}
          quote="Without centralized tracing and logging, this would have taken much longer to isolate."
          theme="Across 200+ nodes"
        />
      </BentoCell>
      <BentoCell column={20} row={3}>
        <LogoCard isClone={isClone} logo={logos.sailResearch} />
      </BentoCell>
      <BentoCell column={21} columnSpan={3} row={3}>
        <QuoteCard
          attribution="Shawn Zhu · Ariso"
          href="https://ariso.ai/blog/signoz-mcp-the-morning-after"
          isClone={isClone}
          logo={logos.ariso}
          quote="Now I have a context-aware ops assistant."
          theme="Agent-native response"
        />
      </BentoCell>
      <BentoCell column={24} row={3}>
        <LogoCard isClone={isClone} logo={logos.formance} />
      </BentoCell>
    </div>
  )
})

export default function HomepageCustomerProof() {
  const [isDragging, setIsDragging] = useState(false)
  const [isExploring, setIsExploring] = useState(false)
  const [animationDelay, setAnimationDelay] = useState(0)
  const viewportRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const dragStateRef = useRef<DragState | null>(null)
  const manualOffsetRef = useRef<number | null>(null)
  const suppressClickRef = useRef(false)

  const updateManualOffset = (offset: number, normalize = true) => {
    const nextOffset = normalize ? normalizeCarouselOffset(offset) : offset
    manualOffsetRef.current = nextOffset
    railRef.current?.style.setProperty('--proof-manual-offset', `${nextOffset}px`)
    return nextOffset
  }

  const beginManualExploration = () => {
    const currentOffset = manualOffsetRef.current ?? getCarouselTranslateX(railRef.current)
    const nextOffset = updateManualOffset(currentOffset)
    setIsExploring(true)
    return nextOffset
  }

  const resumeAutoMotion = () => {
    const currentOffset = manualOffsetRef.current
    if (currentOffset === null) return

    setAnimationDelay((currentOffset / carouselCycleWidth) * carouselDurationSeconds)
    manualOffsetRef.current = null
    setIsExploring(false)
  }

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const handleWheel = (event: globalThis.WheelEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.shiftKey
            ? event.deltaY
            : 0

      if (!delta) return

      event.preventDefault()
      const currentOffset = manualOffsetRef.current ?? getCarouselTranslateX(railRef.current)
      const nextOffset = normalizeCarouselOffset(currentOffset - delta)
      manualOffsetRef.current = nextOffset
      railRef.current?.style.setProperty('--proof-manual-offset', `${nextOffset}px`)
      setIsExploring(true)
    }

    viewport.addEventListener('wheel', handleWheel, { passive: false })
    return () => viewport.removeEventListener('wheel', handleWheel)
  }, [])

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return

    const usesNativeScroll = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const startOffset = usesNativeScroll ? 0 : beginManualExploration()
    dragStateRef.current = {
      pointerId: event.pointerId,
      startOffset,
      startScrollLeft: event.currentTarget.scrollLeft,
      startX: event.clientX,
      usesNativeScroll,
    }
    suppressClickRef.current = false
    setIsDragging(true)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current
    if (!dragState || dragState.pointerId !== event.pointerId) return

    const delta = event.clientX - dragState.startX
    if (Math.abs(delta) > 4) {
      suppressClickRef.current = true
      event.preventDefault()
    }

    if (dragState.usesNativeScroll) {
      event.currentTarget.scrollLeft = dragState.startScrollLeft - delta
    } else {
      updateManualOffset(dragState.startOffset + delta)
    }
  }

  const finishDragging = (event: PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current
    if (!dragState || dragState.pointerId !== event.pointerId) return

    dragStateRef.current = null
    setIsDragging(false)
  }

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    finishDragging(event)
    suppressClickRef.current = false
    resumeAutoMotion()
  }

  const handleFocusCapture = (event: FocusEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (event.target === event.currentTarget) return

      const targetRect = event.target.getBoundingClientRect()
      const viewportRect = event.currentTarget.getBoundingClientRect()
      if (targetRect.left < viewportRect.left) {
        event.currentTarget.scrollLeft -= viewportRect.left - targetRect.left
      } else if (targetRect.right > viewportRect.right) {
        event.currentTarget.scrollLeft += targetRect.right - viewportRect.right
      }
      return
    }

    const currentOffset = beginManualExploration()
    if (event.target === event.currentTarget) return

    const targetRect = event.target.getBoundingClientRect()
    const viewportRect = event.currentTarget.getBoundingClientRect()
    const safeInset = window.matchMedia('(min-width: 768px)').matches ? 48 : 24
    const safeLeft = viewportRect.left + safeInset
    const safeRight = viewportRect.right - safeInset
    let nextOffset = currentOffset

    if (targetRect.left < safeLeft) {
      nextOffset += safeLeft - targetRect.left
    } else if (targetRect.right > safeRight) {
      nextOffset -= targetRect.right - safeRight
    }

    updateManualOffset(Math.min(0, nextOffset), false)
  }

  const handleBlurCapture = (event: FocusEvent<HTMLDivElement>) => {
    if (event.relatedTarget && event.currentTarget.contains(event.relatedTarget)) return
    resumeAutoMotion()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return

    event.preventDefault()
    const distance = event.key === 'ArrowLeft' ? 320 : -320
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      event.currentTarget.scrollLeft -= distance
      return
    }

    const currentOffset = beginManualExploration()
    updateManualOffset(currentOffset + distance)
  }

  const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (suppressClickRef.current) {
      event.preventDefault()
      event.stopPropagation()
      suppressClickRef.current = false
      return
    }

    // Pointer-activated links open in a new tab, so their focus can otherwise keep the rail
    // in manual mode after the user returns. Preserve focus for keyboard activation.
    if (event.detail === 0 || !(event.target instanceof Element)) return

    const link = event.target.closest<HTMLAnchorElement>('a')
    if (!link) return

    resumeAutoMotion()
    link.blur()
  }

  const railStyle: CSSProperties = {
    animationDelay: `${animationDelay}s`,
  }

  return (
    <section
      aria-label="Customer stories"
      className="relative mt-14 pb-14 sm:mt-16 md:pb-20 xl:mt-20"
      data-homepage-customer-proof
    >
      <div className={cn(styles.frame, 'relative')}>
        <div
          aria-label="Customer stories carousel. Hover to pause, then drag or use the left and right arrow keys to explore."
          className={cn(
            styles.viewport,
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signoz_robin-400',
            isDragging && styles.dragging
          )}
          data-proof-carousel-viewport
          onBlurCapture={handleBlurCapture}
          onClickCapture={handleClickCapture}
          onDragStart={(event) => event.preventDefault()}
          onFocusCapture={handleFocusCapture}
          onKeyDown={handleKeyDown}
          onPointerCancel={handlePointerLeave}
          onPointerDown={handlePointerDown}
          onPointerLeave={handlePointerLeave}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDragging}
          ref={viewportRef}
          role="group"
          tabIndex={0}
        >
          <div
            className={cn(styles.rail, isExploring && styles.manual)}
            ref={railRef}
            style={railStyle}
          >
            <BentoBoard isClone={false} />
            <BentoBoard isClone />
            <BentoBoard isClone />
          </div>
        </div>
      </div>
    </section>
  )
}
