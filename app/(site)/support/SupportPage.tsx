'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Check, BookOpen, MessageSquare } from 'lucide-react'
import { Slack, Github } from '@/components/social-icons/SolidIcons'
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
  TRUSTED_BY_LOGOS,
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

import superLogoUrl from '@/public/img/users/super.svg?url'
import hashnodeLogoUrl from '@/public/img/users/hashnode.svg?url'
import zapierLogoUrl from '@/public/img/users/zapier.svg?url'
import incidentIoLogoUrl from '@/public/img/users/incident_io.svg?url'
import mintlifyLogoUrl from '@/public/img/users/mintlify.svg?url'
import soc2BadgeUrl from '@/public/svgs/icons/SOC-2.svg?url'
import hipaaBadgeUrl from '@/public/svgs/icons/hipaa.svg?url'

const logoUrlMap: Record<string, typeof superLogoUrl> = {
  '/img/users/super.svg': superLogoUrl,
  '/img/users/hashnode.svg': hashnodeLogoUrl,
  '/img/users/zapier.svg': zapierLogoUrl,
  '/img/users/incident_io.svg': incidentIoLogoUrl,
  '/img/users/mintlify.svg': mintlifyLogoUrl,
}

const badgeUrlMap: Record<string, typeof soc2BadgeUrl> = {
  '/svgs/icons/SOC-2.svg': soc2BadgeUrl,
  '/svgs/icons/hipaa.svg': hipaaBadgeUrl,
}

// --- Comparison Table ---

const GRID_CLASS = 'grid-cols-[1fr_12rem_12rem_12rem]'

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

const TrustedBySection = () => (
  <div className="flex flex-col items-center gap-8 px-6 py-10">
    <p className="text-center text-sm font-medium uppercase tracking-[0.7px] text-signoz_vanilla-400">
      trusted by <span className="text-white">500+ teams</span>
    </p>
    <div className="flex flex-wrap items-center justify-center gap-[88px]">
      {TRUSTED_BY_LOGOS.map((logo) => (
        <Image
          key={logo.alt}
          src={logoUrlMap[logo.src]}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          className="h-7 w-auto"
        />
      ))}
    </div>
    <Link
      href="/case-study/"
      className="flex items-center gap-1.5 rounded-full bg-[rgba(171,189,255,0.08)] px-4 py-1.5 text-sm font-medium text-white backdrop-blur-[5px] transition-colors hover:bg-[rgba(171,189,255,0.14)]"
    >
      Read customer stories
      <ArrowRight size={14} />
    </Link>
  </div>
)

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
                  {tier.subtitle && <span className="text-sm text-[#adb4c2]">{tier.subtitle}</span>}
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
            <div className="h-px w-full bg-[#23262e]" />
          </div>

          {/* Grid body */}
          <FeatureComparisonGrid
            columns={COLUMNS}
            sections={sections}
            gridClassName={GRID_CLASS}
            sectionHeadingSize="sm"
            stickyOffset="top-[190px]"
            stickyBg=""
            stickyZIndex="z-[8]"
            separator="border"
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
  <div className="px-6 py-10">
    <h3 className="mb-6 text-lg font-semibold text-signoz_vanilla-100">Severity Definitions</h3>
    <div className="flex flex-col gap-6">
      {SEVERITY_DEFINITIONS.map((sev) => (
        <div
          key={sev.level}
          className="grid grid-cols-1 gap-4 border-t border-[#23262e] pt-6 md:grid-cols-[200px_1fr]"
        >
          <div className="text-sm font-semibold text-signoz_vanilla-100">{sev.level}</div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-signoz_vanilla-400">{sev.description}</p>
            <p className="text-sm italic text-signoz_vanilla-400">{sev.example}</p>
          </div>
        </div>
      ))}
    </div>
    <p className="mt-6 text-xs text-signoz_vanilla-400">* After issue is raised by the customer</p>
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

const ContactIcon = ({ icon }: { icon?: string }) => {
  switch (icon) {
    case 'slack':
      return <Slack className="h-4 w-4 fill-signoz_vanilla-100" />
    case 'github':
      return <Github className="h-4 w-4 fill-signoz_vanilla-100" />
    case 'docs':
      return <BookOpen size={16} className="text-signoz_vanilla-100" />
    case 'chat':
      return <MessageSquare size={16} className="text-signoz_vanilla-100" />
    case 'email':
      return <MessageSquare size={16} className="text-signoz_vanilla-100" />
    default:
      return null
  }
}

const DevelopersLoveSigNoz = () => (
  <div className="flex flex-col sm:flex-row">
    <div className="!w-full flex-1 sm:!w-[300px] sm:min-w-fit">
      <div className="sticky top-[100px] flex min-w-fit flex-col items-start justify-start px-10 py-10 sm:px-0 sm:pl-12">
        <h2 className="text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-4xl">
          Developers
          <br className="hidden sm:block" />
          love
          <br className="hidden sm:block" />
          SigNoz
        </h2>
      </div>
    </div>
    <div className="flex-[2_2_0%]">
      <div className="border-l border-dashed border-signoz_slate-400 bg-transparent p-0">
        {/* Seamless Escalation */}
        <div className="border-b border-dashed border-signoz_slate-400 p-8">
          <h3 className="mb-2 text-xl font-semibold text-signoz_vanilla-100">
            Seamless Escalation
          </h3>
          <p className="mb-6 text-sm text-signoz_vanilla-400">
            Escalate your issues and get support from the right person, right when you need it.
          </p>
          <div className="flex flex-col gap-4">
            {ESCALATION_STEPS.map((step) => (
              <div key={step.level} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-signoz_slate-400">
                  <span className="text-xs font-medium text-signoz_vanilla-400">
                    {step.level.charAt(1)}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-signoz_vanilla-100">
                    {step.level} : {step.title}
                  </span>
                  <p className="mt-1 text-sm text-signoz_vanilla-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to reach us */}
        <div className="p-8">
          <h3 className="mb-2 text-xl font-semibold text-signoz_vanilla-100">How to reach us</h3>
          <p className="mb-6 text-sm text-signoz_vanilla-400">
            {`Tired of Datadog's unpredictable bills or New Relic's user-based pricing? We're here for you.`}
          </p>
          <div className="flex flex-col gap-6">
            {CONTACT_CHANNELS.map((channel) => (
              <div key={channel.category}>
                <h4 className="mb-3 text-sm font-semibold text-signoz_vanilla-100">
                  {channel.category}
                </h4>
                <div className="flex flex-col gap-2">
                  {channel.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      {item.icon && (
                        <span className="mt-0.5 flex-shrink-0">
                          <ContactIcon icon={item.icon} />
                        </span>
                      )}
                      {!item.icon && (
                        <span className="mt-0.5 flex-shrink-0 text-signoz_vanilla-400">
                          &mdash;
                        </span>
                      )}
                      <p className="text-sm text-signoz_vanilla-400">
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                            rel={
                              item.href.startsWith('mailto:')
                                ? undefined
                                : 'noopener noreferrer nofollow'
                            }
                            className="font-semibold text-signoz_vanilla-100 hover:underline"
                          >
                            {item.text}
                            <ArrowUpRight size={14} className="ml-0.5 inline" />
                          </a>
                        ) : (
                          <span className="font-semibold text-signoz_vanilla-100">{item.text}</span>
                        )}
                        {item.description && <> {item.description}</>}
                      </p>
                    </div>
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
          <div className="flex flex-col gap-2">
            {COMPLIANCE_LINKS.map((link) => (
              <p key={link.href} className="text-sm text-signoz_vanilla-400">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="font-semibold text-signoz_robin-400 hover:underline"
                >
                  {link.text}
                  <ArrowUpRight size={14} className="ml-0.5 inline" />
                </a>
                {'  '}
                {link.label}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)

const BottomCTA = () => (
  <div className="flex flex-col items-center gap-6 px-6 py-16 text-center">
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
    <FeaturePageLayout showProductNav={false}>
      <DitherCanvas enableClick className="relative z-[1]">
        <FeaturePageHeader
          title="Enterprise-grade support for every stage of your observability journey"
          description="From open source community to mission-critical production - SigNoz support is built for engineering teams who can't afford downtime."
          buttons={SUPPORT_HEADER_BUTTONS}
          align="left"
          titleClassName="!bg-none !text-signoz_vanilla-100 ![background:none] ![-webkit-text-fill-color:unset] lg:!text-[36px] !tracking-[-1.08px]"
          sectionLayoutVariant="no-border"
          sectionLayoutClassName="!mt-0 !mb-0"
        />
        <SectionLayout variant="bordered" className="!px-0">
          <TrustedBySection />
        </SectionLayout>
      </DitherCanvas>

      <SectionLayout variant="bordered" className="!px-0">
        <Divider />
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
