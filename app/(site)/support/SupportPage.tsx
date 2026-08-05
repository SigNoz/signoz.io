'use client'

import Image from 'next/image'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  BookOpen,
  MessageSquare,
  Mail,
  UserRound,
  Handshake,
  CircleArrowRight,
} from 'lucide-react'
import { Slack, Github } from '@/components/social-icons/SolidIcons'
import { TrustedByTeams } from '@/components/trusted-by'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import FeaturePageHeader from '@/shared/components/molecules/FeaturePages/FeaturePageHeader'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import Divider from '@/shared/components/molecules/FeaturePages/Divider'
import ButtonGroup from '@/shared/components/molecules/FeaturePages/ButtonGroup'
import Button from '@/components/ui/Button'
import DitherCanvas from '@/components/DitherCanvas/DitherCanvas'
import FeatureComparisonGrid from '@/shared/components/molecules/FeaturePages/FeatureComparisonGrid'
import type { ComparisonSection } from '@/shared/components/molecules/FeaturePages/FeatureComparisonGrid'
import {
  SUPPORT_HEADER_BUTTONS,
  SUPPORT_TIERS,
  TABLE_DATA,
  TABLE_FOOTNOTES,
  SEVERITY_DEFINITIONS,
  SUPPORT_STATS,
  ESCALATION_STEPS,
  CONTACT_CHANNELS,
  WHY_DIFFERENT_ITEMS,
  COMPLIANCE_BADGES,
  COMPLIANCE_LINKS,
  BOTTOM_CTA_BUTTONS,
} from './SupportPage.constants'
import type { CellValue } from './SupportPage.constants'
import '@/components/footer/footer-pill-links.css'

import soc2BadgeUrl from '@/public/svgs/icons/SOC-2.svg?url'
import hipaaBadgeUrl from '@/public/svgs/icons/hipaa.svg?url'

const badgeUrlMap: Record<string, typeof soc2BadgeUrl> = {
  '/svgs/icons/SOC-2.svg': soc2BadgeUrl,
  '/svgs/icons/hipaa.svg': hipaaBadgeUrl,
}

// --- Comparison Table ---

const GRID_CLASS = 'grid-cols-[1fr_12rem_12rem_12rem]'

/** Fades row rules toward the right edge (non-blocking Figma polish). */
const TABLE_SEPARATOR_CLASS =
  'bg-gradient-to-r from-[#23262e] from-[55%] via-[#23262e]/70 via-[78%] to-transparent'

const COLUMNS = [
  {
    key: 'community',
    cellClassName: 'px-3 py-3',
    sectionCellClassName: 'bg-signoz_ink-500',
  },
  {
    key: 'teams',
    cellClassName: 'relative px-3 py-3',
    occludeStickyText: true,
  },
  {
    key: 'enterprise',
    cellClassName: 'px-3 py-3',
    sectionCellClassName: 'bg-signoz_ink-500',
  },
]

function renderCell(cell: CellValue) {
  switch (cell.type) {
    case 'check':
      return <Check size={18} className="text-signoz_robin-400" />
    case 'dash':
      return <span className="text-sm text-[#62687c]">&mdash;</span>
    case 'text':
      return <span className="text-sm leading-6 text-[#adb4c2]">{cell.value}</span>
    case 'link':
      return (
        <a
          href={cell.href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-flex items-center gap-1 text-sm text-[#adb4c2] hover:text-signoz_vanilla-100"
        >
          {cell.text}
          <ArrowUpRight size={14} />
        </a>
      )
    case 'check-text':
      return (
        <span className="inline-flex items-center gap-1 text-sm">
          <Check size={16} className="text-signoz_robin-400" />
          <span className="text-[#adb4c2]">{cell.value}</span>
        </span>
      )
  }
}

function toSections(): ComparisonSection[] {
  return TABLE_DATA.map((cat) => ({
    title: cat.name,
    rows: cat.rows.map((row) => ({
      feature: <span className="text-sm leading-6 text-[#adb4c2]">{row.label}</span>,
      cells: {
        community: renderCell(row.community),
        teams: renderCell(row.teams),
        enterprise: renderCell(row.enterprise),
      },
    })),
  }))
}

// --- Section Components ---

const ComparisonTable = () => {
  const sections = toSections()

  return (
    <div className="py-6">
      <div className="w-full overflow-x-auto text-left text-base leading-normal md:overflow-visible">
        <div className="relative min-w-[40rem] md:min-w-0">
          {/* Gradient overlay behind Teams (middle) column */}
          <div className="pointer-events-none absolute inset-y-0 right-48 z-0 w-48 rounded-lg bg-gradient-to-b from-signoz_ink-300 from-[73%] to-transparent opacity-80" />

          {/* Sticky Tier Header */}
          <div className="sticky top-14 z-[9] bg-signoz_ink-500">
            <div className={`grid ${GRID_CLASS}`}>
              <div className="bg-signoz_ink-500" />
              {SUPPORT_TIERS.map((tier, i) => (
                <div
                  key={tier.name}
                  className={`flex flex-col items-start gap-2.5 px-3 py-4 ${
                    i === 1 ? 'relative bg-[#14161a]' : 'bg-signoz_ink-500'
                  }`}
                >
                  <span className="text-base font-medium leading-7 text-[#eceef2]">
                    {tier.name}
                  </span>
                  {/* Reserve subtitle line for CTA tiers so Teams/Enterprise buttons align */}
                  {tier.cta && (
                    <span
                      className={`min-h-5 text-sm leading-5 text-[#adb4c2] ${
                        tier.subtitle ? '' : 'invisible'
                      }`}
                      aria-hidden={!tier.subtitle}
                    >
                      {tier.subtitle || 'Cloud / Self-Hosted'}
                    </span>
                  )}
                  {tier.cta && (
                    <Button
                      to={tier.cta.href}
                      variant={tier.cta.variant}
                      rounded="full"
                      className="flex h-8 !w-fit items-center justify-center gap-2 text-xs font-medium"
                    >
                      {tier.cta.text}
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div className={`h-px w-full ${TABLE_SEPARATOR_CLASS}`} />
          </div>

          {/* Grid body */}
          <FeatureComparisonGrid
            columns={COLUMNS}
            sections={sections}
            gridClassName={GRID_CLASS}
            sectionHeadingSize="sm"
            stickyOffset="top-[189px]"
            stickyBg=""
            stickyZIndex="z-[8]"
            separator="border"
            separatorClassName={TABLE_SEPARATOR_CLASS}
            featureCellClassName="pl-6 py-3"
            featureSectionClassName="pl-6 bg-signoz_ink-500"
          />
        </div>
      </div>

      {/* Footnotes */}
      <div className="mt-6 flex flex-col gap-1 px-6">
        {TABLE_FOOTNOTES.map((note, i) => (
          <p key={i} className="text-xs text-signoz_vanilla-400">
            {note}
          </p>
        ))}
      </div>
    </div>
  )
}

const SeverityDefinitionsSection = () => (
  <div className="py-10">
    <h3 className="mb-6 px-6 text-lg font-semibold text-signoz_vanilla-100">
      Severity Definitions
    </h3>
    <div className="flex flex-col">
      {SEVERITY_DEFINITIONS.map((sev) => (
        <div key={sev.level} className="border-t border-[#23262e]">
          <div className="grid grid-cols-1 gap-4 px-6 py-6 md:grid-cols-[460px_1fr] md:gap-6">
            <div className="text-sm font-semibold leading-6 text-signoz_vanilla-100">
              {sev.level}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm leading-6 text-signoz_vanilla-400">{sev.description}</p>
              <p className="text-sm italic leading-6 text-signoz_vanilla-400">{sev.example}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    <p className="mt-6 px-6 text-xs text-signoz_vanilla-400">
      * After issue is raised by the customer
    </p>
  </div>
)

const StatsSection = () => (
  <div className="flex flex-col sm:flex-row">
    <div className="!w-full flex-1 sm:!w-[300px] sm:min-w-fit">
      <div className="sticky top-[100px] flex min-w-fit flex-col items-start justify-start px-10 py-10 sm:px-0 sm:pl-12">
        <h2 className="text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-4xl">
          The numbers
          <br className="hidden sm:block" />
          speak for
          <br className="hidden sm:block" />
          themselves
        </h2>
      </div>
    </div>
    <div className="flex-[2_2_0%]">
      <div className="border-l border-dashed border-signoz_slate-400 bg-transparent p-0">
        {/* Top two stats side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {SUPPORT_STATS.slice(0, 2).map((stat, i) => (
            <div
              key={stat.title}
              className={`border-b border-dashed border-signoz_slate-400 p-8 ${
                i === 0 ? 'md:border-r md:border-dashed md:border-signoz_slate-400' : ''
              }`}
            >
              <p className="mb-2 font-mono text-[32px] font-semibold leading-10 text-signoz_vanilla-100">
                {stat.value}
              </p>
              <p className="mb-1 text-base font-semibold text-signoz_vanilla-100">{stat.title}</p>
              <p className="text-sm text-signoz_vanilla-400">{stat.description}</p>
            </div>
          ))}
        </div>
        {/* Bottom stat full width */}
        {SUPPORT_STATS[2] && (
          <div className="p-8">
            <p className="mb-2 font-mono text-[32px] font-semibold leading-10 text-signoz_vanilla-100">
              {SUPPORT_STATS[2].value}
            </p>
            <p className="mb-1 text-base font-semibold text-signoz_vanilla-100">
              {SUPPORT_STATS[2].title}
            </p>
            <p className="text-sm text-signoz_vanilla-400">{SUPPORT_STATS[2].description}</p>
          </div>
        )}
      </div>
    </div>
  </div>
)

/** Fixed 16×16 box so FA Slack/Github glyphs share Lucide’s optical alignment with text. */
const ContactIcon = ({ icon }: { icon?: string }) => {
  const box = 'inline-flex size-4 shrink-0 items-center justify-center'
  switch (icon) {
    case 'slack':
      return (
        <span className={box} aria-hidden>
          <Slack className="h-[15px] w-[15px] fill-current" />
        </span>
      )
    case 'github':
      return (
        <span className={box} aria-hidden>
          <Github className="h-[15px] w-[15px] fill-current" />
        </span>
      )
    case 'docs':
      return <BookOpen size={16} className="shrink-0 text-current" />
    case 'chat':
      return <MessageSquare size={16} className="shrink-0 text-current" />
    case 'email':
      return <Mail size={16} className="shrink-0 text-current" />
    case 'user':
      return <UserRound size={16} className="shrink-0 text-current" />
    case 'sales':
      return <Handshake size={16} className="shrink-0 text-current" />
    default:
      return null
  }
}

const ContactChannelItem = ({
  item,
}: {
  item: { icon?: string; text: string; description?: string; href?: string }
}) => {
  const isExternal = Boolean(item.href && !item.href.startsWith('/') && !item.href.startsWith('#'))
  const isMailto = item.href?.startsWith('mailto:')

  const label = (
    <>
      {item.icon && <ContactIcon icon={item.icon} />}
      <span>{item.text}</span>
      {item.href && <ArrowUpRight size={16} className="shrink-0" />}
    </>
  )

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
      {item.href ? (
        <a
          href={item.href}
          target={isExternal && !isMailto ? '_blank' : undefined}
          rel={isExternal && !isMailto ? 'noopener noreferrer nofollow' : undefined}
          className="footer-pill-link !mt-0"
        >
          {label}
        </a>
      ) : (
        <span className="inline-flex items-center gap-2 text-sm font-medium leading-[1.35] tracking-[-0.005em] text-[var(--l2-foreground)]">
          {label}
        </span>
      )}
      {item.description && (
        <span className="text-sm leading-[1.35] text-signoz_vanilla-400">{item.description}</span>
      )}
    </div>
  )
}

const DevelopersLoveSigNoz = () => (
  <div className="flex flex-col sm:flex-row">
    <div className="!w-full flex-1 sm:!w-[300px] sm:min-w-fit">
      <div className="sticky top-[100px] flex min-w-fit flex-col items-start justify-start px-10 py-10 sm:px-0 sm:pl-12">
        <h2 className="text-4xl font-bold !leading-[3.5rem] text-[var(--l1-foreground-hover)] sm:text-4xl">
          Developers
          <br className="hidden sm:block" />
          love
          <br className="hidden sm:block" />
          SigNoz
        </h2>
      </div>
    </div>
    <div className="flex-[2_2_0%]">
      <div className="border-l border-dashed border-[var(--l1-border)] bg-transparent p-0">
        <div className="border-b border-dashed border-[var(--l1-border)] p-8">
          <h3 className="mb-2 text-2xl font-semibold leading-8 text-[var(--l1-foreground-hover)]">
            Seamless Escalation
          </h3>
          <p className="mb-16 max-w-[474px] text-base font-normal leading-6 text-[var(--l2-foreground)]">
            Escalate your issues and get support from the right person, right when you need it.
          </p>
          <div className="flex max-w-[474px] flex-col gap-6">
            {ESCALATION_STEPS.map((step) => (
              <div key={step.level} className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <CircleArrowRight
                    size={20}
                    className="shrink-0 fill-[var(--primary-background)] text-signoz_ink-400"
                    aria-hidden
                  />
                  <span className="text-base font-medium leading-6 text-[var(--l1-foreground-hover)]">
                    {step.level} : {step.title}
                  </span>
                </div>
                <p className="pl-8 text-sm font-normal leading-5 text-[var(--l2-foreground)]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8">
          <h3 className="mb-2 text-2xl font-semibold leading-8 text-[var(--l1-foreground-hover)]">
            How to reach us
          </h3>
          <p className="mb-6 text-base font-normal leading-6 text-[var(--l2-foreground)]">
            {`Tired of Datadog's unpredictable bills or New Relic's user-based pricing? We're here for you.`}
          </p>
          <div className="flex flex-col gap-6">
            {CONTACT_CHANNELS.map((channel) => (
              <div key={channel.category}>
                <h4 className="mb-3 text-sm font-semibold text-[var(--l1-foreground-hover)]">
                  {channel.category}
                </h4>
                <div className="flex flex-col gap-2">
                  {channel.items.map((item, i) => (
                    <ContactChannelItem key={i} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              to="/contact-us/?source=support-enterprise"
              variant="default"
              rounded="full"
              className="flex !w-fit items-center gap-2 text-sm"
            >
              Enterprise Support
              <ArrowRight size={14} />
            </Button>
            <Button
              to="mailto:cloud-support@signoz.io"
              variant="secondary"
              rounded="full"
              className="flex !w-fit items-center gap-2 text-sm"
            >
              Email the team
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const WhyDifferent = () => (
  <div className="flex flex-col sm:flex-row">
    <div className="!w-full flex-1 sm:!w-[300px] sm:min-w-fit">
      <div className="sticky top-[100px] flex min-w-fit flex-col items-start justify-start px-10 py-10 sm:px-0 sm:pl-12">
        <h2 className="text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-4xl">
          Why SigNoz
          <br className="hidden sm:block" />
          support is
          <br className="hidden sm:block" />
          different
        </h2>
      </div>
    </div>
    <div className="flex-[2_2_0%]">
      <div className="border-l border-dashed border-signoz_slate-400 bg-transparent p-0">
        {WHY_DIFFERENT_ITEMS.map((item, i) => (
          <div
            key={item.title}
            className={`p-8 ${i < WHY_DIFFERENT_ITEMS.length - 1 ? 'border-b border-dashed border-signoz_slate-400' : ''}`}
          >
            <h3 className="mb-3 text-lg font-semibold text-signoz_vanilla-100">{item.title}</h3>
            <p className="text-sm leading-relaxed text-signoz_vanilla-400">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const TrustAndCompliance = () => (
  <div className="flex flex-col sm:flex-row">
    <div className="!w-full flex-1 sm:!w-[300px] sm:min-w-fit">
      <div className="sticky top-[100px] flex min-w-fit flex-col items-start justify-start px-10 py-10 sm:px-0 sm:pl-12">
        <h2 className="text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-4xl">
          Trust &
          <br className="hidden sm:block" />
          Compliance
        </h2>
      </div>
    </div>
    <div className="flex-[2_2_0%]">
      <div className="border-l border-dashed border-signoz_slate-400 bg-transparent p-0">
        <div className="p-8">
          <div className="mb-6 flex flex-wrap items-center gap-6">
            {COMPLIANCE_BADGES.map((badge) => (
              <Image
                key={badge.alt}
                src={badgeUrlMap[badge.src]}
                alt={badge.alt}
                width={badge.width}
                height={badge.height}
              />
            ))}
          </div>
          <p className="mb-4 text-sm text-signoz_vanilla-400">SOC 2 Type I</p>
          <div className="flex flex-col gap-1">
            {COMPLIANCE_LINKS.map((link) => (
              <div key={link.href} className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="footer-pill-link !mt-0"
                >
                  {link.text}
                  <ArrowUpRight size={16} />
                </a>
                <span className="text-sm text-signoz_vanilla-400">{link.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)

const BottomCTA = () => (
  <div className="flex flex-col items-center gap-6 border-t border-dashed border-signoz_slate-400 px-6 py-16 text-center">
    <h2 className="text-2xl font-semibold text-signoz_vanilla-100 sm:text-3xl">
      Not sure which plan is right for you?
    </h2>
    <p className="max-w-xl text-base text-signoz_vanilla-400">
      If you&apos;re running SigNoz in production and want to understand your support options, reply
      to this email or book a 20 minute call with the team.
    </p>
    <ButtonGroup buttons={BOTTOM_CTA_BUTTONS} />
  </div>
)

// --- Main Page Component ---

const SupportPage = () => {
  return (
    <FeaturePageLayout showProductNav={false} showDotPattern={false}>
      <DitherCanvas enableClick className="relative z-[1]">
        <FeaturePageHeader
          title={
            <>
              Enterprise-grade support for every stage of
              <br className="hidden sm:block" /> your observability journey
            </>
          }
          description={
            <span className="block max-w-[567px]">
              From open source community to mission-critical production - SigNoz
              <br className="hidden sm:block" />
              support is built for engineering teams who can&apos;t afford downtime.
            </span>
          }
          buttons={SUPPORT_HEADER_BUTTONS}
          align="left"
          titleClassName="!my-0 !bg-none !py-0 !text-signoz_vanilla-100 ![background:none] ![-webkit-text-fill-color:unset] sm:!mb-0 lg:!text-[36px] !tracking-[-1.08px]"
          descriptionClassName="!max-w-[567px] !py-2 !text-base !leading-[26px] sm:!py-2"
          sectionLayoutVariant="no-border"
          sectionLayoutClassName="!mt-0 !mb-0"
        />
      </DitherCanvas>

      <TrustedByTeams page="support" className="relative z-[1] max-w-8xl bg-signoz_ink-500" />

      <SectionLayout variant="bordered" className="!px-0">
        <ComparisonTable />
        <Divider />
        <SeverityDefinitionsSection />
        <Divider />
        <StatsSection />
        <Divider />
        <DevelopersLoveSigNoz />
        <Divider />
        <WhyDifferent />
        <Divider />
        <TrustAndCompliance />
      </SectionLayout>

      <SectionLayout variant="bordered" className="!px-0">
        <BottomCTA />
      </SectionLayout>
    </FeaturePageLayout>
  )
}

export default SupportPage
