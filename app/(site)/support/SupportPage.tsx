'use client'

import Image from 'next/image'
import {
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
import { CrossSolid } from '@/components/homepage-icons/icons'
import { TrustedByTeams } from '@/components/trusted-by'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import FeaturePageHeader from '@/shared/components/molecules/FeaturePages/FeaturePageHeader'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import Divider from '@/shared/components/molecules/FeaturePages/Divider'
import ButtonGroup from '@/shared/components/molecules/FeaturePages/ButtonGroup'
import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'
import DitherCanvas from '@/components/DitherCanvas/DitherCanvas'
import FeatureComparisonGridWithOcclusion from '@/shared/components/molecules/FeaturePages/FeatureComparisonGridWithOcclusion'
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
  REACH_US_BUTTONS,
  WHY_DIFFERENT_ITEMS,
  COMPLIANCE_BADGES,
  COMPLIANCE_LINKS,
  BOTTOM_CTA_BUTTONS,
} from './SupportPage.constants'
import type { CellValue, SupportStat } from './SupportPage.types'
import '@/components/footer/footer-pill-links.css'

import soc2BadgeUrl from '@/public/svgs/icons/SOC-2.svg?url'
import hipaaBadgeUrl from '@/public/svgs/icons/hipaa.svg?url'

const badgeUrlMap: Record<string, typeof soc2BadgeUrl> = {
  '/svgs/icons/SOC-2.svg': soc2BadgeUrl,
  '/svgs/icons/hipaa.svg': hipaaBadgeUrl,
}

const GRID_CLASS = 'grid-cols-[1fr_12rem_12rem_12rem]'

const TABLE_SEPARATOR_CLASS =
  'bg-[linear-gradient(to_right,transparent_0%,var(--l1-border)_10%,var(--l1-border)_55%,color-mix(in_srgb,var(--l1-border)_70%,transparent)_78%,transparent_100%)]'

const COLUMNS = [
  {
    key: 'community',
    cellClassName: 'px-3 py-3',
    sectionCellClassName: 'bg-[var(--l1-background)]',
  },
  {
    key: 'teams',
    cellClassName: 'relative px-3 py-3',
    occludeStickyText: true,
  },
  {
    key: 'enterprise',
    cellClassName: 'px-3 py-3',
    sectionCellClassName: 'bg-[var(--l1-background)]',
  },
]

function renderCell(cell: CellValue) {
  switch (cell.type) {
    case 'check':
      return <Check size={18} className="text-signoz_robin-400" />
    case 'dash':
      return <CrossSolid />
    case 'text':
      return <span className="text-sm leading-6 text-[var(--l2-foreground)]">{cell.value}</span>
    case 'link':
      return (
        <TrackingLink
          href={cell.href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          clickType="Nav Click"
          clickName="Status Page Link"
          clickLocation="Support Comparison Table"
          clickText={cell.text}
          className="footer-pill-link !mt-0"
        >
          {cell.text}
          <ArrowUpRight size={14} />
        </TrackingLink>
      )
    case 'check-text':
      return (
        <span className="inline-flex items-center gap-1 text-sm">
          <Check size={16} className="text-signoz_robin-400" />
          <span className="text-[var(--l2-foreground)]">{cell.value}</span>
        </span>
      )
  }
}

function toSections(): ComparisonSection[] {
  return TABLE_DATA.map((cat) => ({
    title: cat.name,
    rows: cat.rows.map((row) => ({
      feature: <span className="text-sm leading-6 text-[var(--l2-foreground)]">{row.label}</span>,
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
      {/* Mobile is a plain horizontal scroller in normal page flow; sticky offsets
          only engage on md+, where the page itself is the scrollport. */}
      <div className="w-full overflow-x-auto text-left text-base leading-normal md:overflow-visible">
        <div className="relative min-w-[52rem] md:min-w-0">
          <div className="pointer-events-none absolute inset-y-0 right-48 z-0 w-48 rounded-lg bg-gradient-to-b from-[var(--l2-background)] from-[73%] to-transparent opacity-80" />

          <div className="sticky top-0 z-[9] bg-[var(--l1-background)] md:top-14">
            <div className={`grid ${GRID_CLASS}`}>
              <div className="bg-[var(--l1-background)]" />
              {SUPPORT_TIERS.map((tier, i) => (
                <div
                  key={tier.name}
                  className={`flex flex-col items-start gap-2.5 px-3 py-4 ${
                    i === 1 ? 'relative bg-[var(--l2-background)]' : 'bg-[var(--l1-background)]'
                  }`}
                >
                  <span className="text-base font-medium leading-7 text-[var(--l1-foreground)]">
                    {tier.name}
                  </span>
                  {/* Reserve subtitle line for CTA tiers so Teams/Enterprise buttons align */}
                  {tier.cta && (
                    <span
                      className={`min-h-5 text-sm leading-5 text-[var(--l2-foreground)] ${
                        tier.subtitle ? '' : 'invisible'
                      }`}
                      aria-hidden={!tier.subtitle}
                    >
                      {tier.subtitle || 'Cloud / Self-Hosted'}
                    </span>
                  )}
                  {tier.cta && (
                    <Button
                      asChild
                      variant={tier.cta.variant}
                      rounded="full"
                      className="flex h-8 !w-fit items-center justify-center gap-2 text-xs font-medium"
                    >
                      <TrackingLink
                        href={tier.cta.href}
                        clickType={tier.cta.tracking.clickType}
                        clickName={tier.cta.tracking.clickName}
                        clickLocation="Support Comparison Table"
                        clickText={tier.cta.text}
                      >
                        {tier.cta.text}
                      </TrackingLink>
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div className={`h-px w-full ${TABLE_SEPARATOR_CLASS}`} />
          </div>
          <FeatureComparisonGridWithOcclusion
            columns={COLUMNS}
            sections={sections}
            gridClassName={GRID_CLASS}
            sectionHeadingSize="sm"
            stickyOffset="top-0 md:top-[189px]"
            stickyBg=""
            stickyZIndex="z-[8]"
            separator="border"
            separatorClassName={TABLE_SEPARATOR_CLASS}
            featureCellClassName="pl-6 py-3"
            featureSectionClassName="pl-6 bg-[var(--l1-background)] !text-[var(--l1-foreground)]"
          />
        </div>
      </div>

      {/* Footnotes */}
      <div className="mt-6 flex flex-col gap-1 px-6">
        {TABLE_FOOTNOTES.map((note, i) => (
          <p key={i} className="text-xs text-[var(--l2-foreground)]">
            {note}
          </p>
        ))}
      </div>
    </div>
  )
}

const SeverityDefinitionsSection = () => (
  <div className="py-10">
    <h3 className="mb-6 px-6 text-lg font-semibold text-[var(--l1-foreground-hover)]">
      Severity Definitions
    </h3>
    <div className="flex flex-col">
      {SEVERITY_DEFINITIONS.map((sev) => (
        <div key={sev.level} className="border-t border-[var(--l1-border)]">
          <div className="grid grid-cols-1 gap-4 px-6 py-6 md:grid-cols-[460px_1fr] md:gap-6">
            <div className="text-sm font-semibold leading-6 text-[var(--l1-foreground-hover)]">
              {sev.level}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm leading-6 text-[var(--l2-foreground)]">{sev.description}</p>
              <p className="text-sm italic leading-6 text-[var(--l2-foreground)]">{sev.example}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    <p className="mt-6 px-6 text-xs text-[var(--l2-foreground)]">
      * After issue is raised by the customer
    </p>
  </div>
)

const StatCard = ({ stat, className = '' }: { stat: SupportStat; className?: string }) => (
  <div className={className}>
    <p className="mb-2 font-mono text-[32px] font-semibold leading-10 text-[var(--l1-foreground-hover)]">
      {stat.value}
    </p>
    <p className="mb-1 text-base font-semibold text-[var(--l1-foreground-hover)]">{stat.title}</p>
    <p className="text-sm text-[var(--l2-foreground)]">{stat.description}</p>
  </div>
)

const StatsSection = () => {
  const pairedStats = SUPPORT_STATS.slice(0, -1)
  const lastStat = SUPPORT_STATS.at(-1)

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="!w-full flex-1 sm:!w-[300px] sm:min-w-fit">
        <div className="sticky top-[100px] flex min-w-fit flex-col items-start justify-start px-10 py-10 sm:px-0 sm:pl-12">
          <h2 className="text-4xl font-bold !leading-[3.5rem] text-[var(--l1-foreground-hover)] sm:text-4xl">
            The numbers
            <br className="hidden sm:block" />
            speak for
            <br className="hidden sm:block" />
            themselves
          </h2>
        </div>
      </div>
      <div className="flex-[2_2_0%]">
        <div className="border-l border-dashed border-[var(--l1-border)] bg-transparent p-0">
          {/* Paired stats side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {pairedStats.map((stat, i) => (
              <StatCard
                key={stat.title}
                stat={stat}
                className={`border-b border-dashed border-[var(--l1-border)] p-8 ${
                  i % 2 === 0 ? 'md:border-r md:border-dashed md:border-[var(--l1-border)]' : ''
                }`}
              />
            ))}
          </div>
          {lastStat && <StatCard stat={lastStat} className="p-8" />}
        </div>
      </div>
    </div>
  )
}

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
        <TrackingLink
          href={item.href}
          target={isExternal && !isMailto ? '_blank' : undefined}
          rel={isExternal && !isMailto ? 'noopener noreferrer nofollow' : undefined}
          clickType="Nav Click"
          clickName="Support Channel Link"
          clickLocation="Support How to Reach Us"
          clickText={item.text}
          className="footer-pill-link !mt-0"
        >
          {label}
        </TrackingLink>
      ) : (
        <span className="inline-flex items-center gap-2 text-sm font-medium leading-[1.35] tracking-[-0.005em] text-[var(--l2-foreground)]">
          {label}
        </span>
      )}
      {item.description && (
        <span className="text-sm leading-[1.35] text-[var(--l2-foreground)]">
          {item.description}
        </span>
      )}
    </div>
  )
}

const DevelopersLoveSigNoz = () => (
  <div className="flex flex-col sm:flex-row">
    <div className="!w-full flex-1 sm:!w-[300px] sm:min-w-fit">
      <div className="sticky top-[100px] flex min-w-fit flex-col items-start justify-start px-10 py-10 sm:px-0 sm:pl-12">
        <h2 className="text-4xl font-bold !leading-[3.5rem] text-[var(--l1-foreground-hover)] sm:text-4xl">
          1000+
          <br className="hidden sm:block" />
          Engineering Teams
          <br className="hidden sm:block" />
          love SigNoz
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
                    className="shrink-0 fill-[var(--primary-background)] text-[var(--l1-background)]"
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
            {REACH_US_BUTTONS.map((button) => (
              <Button
                key={button.text}
                asChild
                variant={button.variant}
                rounded="full"
                className="flex !w-fit items-center gap-2 text-sm"
              >
                <TrackingLink
                  href={button.href}
                  clickType={button.tracking.clickType}
                  clickName={button.tracking.clickName}
                  clickLocation={button.tracking.clickLocation}
                  clickText={button.text}
                >
                  {button.text}
                  {button.icon}
                </TrackingLink>
              </Button>
            ))}
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
        <h2 className="text-4xl font-bold !leading-[3.5rem] text-[var(--l1-foreground-hover)] sm:text-4xl">
          Why SigNoz
          <br className="hidden sm:block" />
          support is
          <br className="hidden sm:block" />
          different
        </h2>
      </div>
    </div>
    <div className="flex-[2_2_0%]">
      <div className="border-l border-dashed border-[var(--l1-border)] bg-transparent p-0">
        {WHY_DIFFERENT_ITEMS.map((item, i) => (
          <div
            key={item.title}
            className={`p-8 ${i < WHY_DIFFERENT_ITEMS.length - 1 ? 'border-b border-dashed border-[var(--l1-border)]' : ''}`}
          >
            <h3 className="mb-3 text-lg font-semibold text-[var(--l1-foreground-hover)]">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-[var(--l2-foreground)]">
              {item.description}
            </p>
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
        <h2 className="text-4xl font-bold !leading-[3.5rem] text-[var(--l1-foreground-hover)] sm:text-4xl">
          Trust &
          <br className="hidden sm:block" />
          Compliance
        </h2>
      </div>
    </div>
    <div className="flex-[2_2_0%]">
      <div className="border-l border-dashed border-[var(--l1-border)] bg-transparent p-0">
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
          <p className="mb-4 text-sm text-[var(--l2-foreground)]">SOC 2 Type II</p>
          <div className="flex flex-col gap-1">
            {COMPLIANCE_LINKS.map((link) => (
              <div key={link.href} className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <TrackingLink
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  clickType="Nav Click"
                  clickName="Compliance Link"
                  clickLocation="Support Trust & Compliance"
                  clickText={link.text}
                  className="footer-pill-link !mt-0"
                >
                  {link.text}
                  <ArrowUpRight size={16} />
                </TrackingLink>
                <span className="text-sm text-[var(--l2-foreground)]">{link.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)

const BottomCTA = () => (
  <div className="flex flex-col items-center gap-6 border-t border-dashed border-[var(--l1-border)] px-6 py-16 text-center">
    <h2 className="text-2xl font-semibold text-[var(--l1-foreground-hover)] sm:text-3xl">
      Not sure which plan is right for you?
    </h2>
    <p className="max-w-xl text-base text-[var(--l2-foreground)]">
      If you&apos;re running SigNoz in production and want to understand your support options, reply
      to this email or book a 20 minute call with the team.
    </p>
    <ButtonGroup buttons={BOTTOM_CTA_BUTTONS} />
  </div>
)

const SupportPage = () => {
  return (
    <FeaturePageLayout showProductNav={false} showDotPattern={false}>
      <DitherCanvas enableClick className="relative z-[1]">
        <FeaturePageHeader
          title={
            <>
              SigNoz Cloud and Self-Hosted SigNoz
              <br className="hidden sm:block" /> support
            </>
          }
          description={
            <span className="block max-w-[567px]">
              Use managed support for SigNoz Cloud and contracted enterprise plans, or community
              <br className="hidden sm:block" />
              support for Self-Hosted SigNoz.
            </span>
          }
          buttons={SUPPORT_HEADER_BUTTONS}
          align="left"
          titleClassName="!my-0 !bg-none !py-0 !text-signoz_vanilla-100 ![background:none] ![-webkit-text-fill-color:unset] sm:!mb-0 lg:!text-[36px] !tracking-[-1.08px]"
          descriptionClassName="!max-w-[567px] !py-2 !text-base !leading-[26px] !text-signoz_vanilla-400 sm:!py-2"
          sectionLayoutVariant="no-border"
          sectionLayoutClassName="!mt-0 !mb-0"
        />
      </DitherCanvas>

      <TrustedByTeams
        page="support"
        className="relative z-[1] max-w-8xl bg-[var(--l1-background)]"
      />

      <SectionLayout variant="bordered" className="border-[var(--l1-border)] !px-0">
        <ComparisonTable />
        <Divider className="border-[var(--l1-border)]" />
        <SeverityDefinitionsSection />
        <Divider className="border-[var(--l1-border)]" />
        <StatsSection />
        <Divider className="border-[var(--l1-border)]" />
        <DevelopersLoveSigNoz />
        <Divider className="border-[var(--l1-border)]" />
        <WhyDifferent />
        <Divider className="border-[var(--l1-border)]" />
        <TrustAndCompliance />
      </SectionLayout>

      <SectionLayout variant="bordered" className="border-[var(--l1-border)] !px-0">
        <BottomCTA />
      </SectionLayout>
    </FeaturePageLayout>
  )
}

export default SupportPage
