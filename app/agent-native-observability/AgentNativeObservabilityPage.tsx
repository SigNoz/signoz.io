'use client'

import { ArrowRight, Terminal } from 'lucide-react'
import Button from '@/components/ui/Button'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import FeaturePageHeader from '@/shared/components/molecules/FeaturePages/FeaturePageHeader'
import IconTitleDescriptionCardGrid from '@/shared/components/molecules/FeaturePages/IconTitleDescriptionCard'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import { TRUSTED_BY_LOGOS, FEATURE_CARDS } from './AgentNativeObservabilityPage.constants'
import TrackingLink from '@/components/TrackingLink'
import Image from 'next/image'
import { Card } from '@/components/ui/Card'

const Header: React.FC = () => {
  const headerButtonGroup = (
    <div className="flex flex-col items-start gap-3 md:flex-row">
      <Button
        asChild
        variant="secondary"
        rounded="full"
        className="flex-center flex min-w-[200px] items-center gap-2"
      >
        <TrackingLink
          href="/teams/"
          clickType="Secondary CTA"
          clickName="Agent Native Page Hero Get Started - Free"
          clickLocation="Agent Native Observability Page Hero"
          clickText="Get Started - Free"
        >
          Get Started - Free
          <ArrowRight size={14} />
        </TrackingLink>
      </Button>
      <Button
        asChild
        variant="default"
        rounded="full"
        className="flex-center flex min-w-[200px] items-center gap-2"
      >
        <TrackingLink
          href="/docs/ai/signoz-mcp-server/"
          clickType="Primary CTA"
          clickName="Agent Native Page Hero Connect SigNoz MCP"
          clickLocation="Agent Native Observability Page Hero"
          clickText="Connect SigNoz MCP"
        >
          Connect SigNoz MCP
          <ArrowRight size={14} />
        </TrackingLink>
      </Button>
    </div>
  )

  return (
    <FeaturePageHeader
      title={
        <>
          Introducing Agent Native <br /> Observability
        </>
      }
      description={
        <span className="text-base">
          Connect SigNoz to your coding agents (e.g. Claude Code, Cursor) and debug production
          issues without leaving your dev environment. <br className="hidden md:block" /> Traces,
          logs, metrics, service topology, and your actual codebase — all in one place. No separate
          AI SRE product required.
        </span>
      }
      buttonGroup={headerButtonGroup}
      sectionLayoutClassName="!mt-0 !border-x-1 !border-dashed !border-signoz_slate-400 max-md:-mb-[3rem]"
      heroImageAlt="Agent Native Observability hero"
      heroImage={'/img/platform/AgentNativeObservabilityMeta.webp'}
      buttonDescription={
        <div className="text-sm text-signoz_vanilla-400">
          No learning new Dashboard UX. In-context Observability in your workflows.
        </div>
      }
      className="mt-0"
      align="left"
    />
  )
}

const TrustedByTeams: React.FC = () => {
  return (
    <div className="!border-b-1 relative mx-auto flex max-w-8xl flex-col items-center justify-center gap-10 overflow-hidden border !border-t-0 border-dashed border-signoz_slate-400 py-16 md:w-[80vw]">
      <div className="text-center text-sm font-semibold uppercase tracking-[0.05em] text-signoz_vanilla-400">
        Trusted by the <span className="text-signoz_vanilla-100">best platform teams</span>
      </div>
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-16 gap-y-10 px-4">
        {TRUSTED_BY_LOGOS.map((logo) => (
          <div key={logo.alt} className="flex h-12 items-center justify-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={140}
              height={48}
              className="object-contain"
            />
          </div>
        ))}
      </div>
      <div className="w-full text-center">
        <Button
          variant="secondary"
          rounded="full"
          className="mx-auto flex w-fit items-center gap-2"
          asChild
        >
          <TrackingLink
            href="/case-study/"
            clickType="Secondary CTA"
            clickName="Agent Native Page Customer Stories Button"
            clickLocation="Agent Native Observability Page Logos"
            clickText="Read customer stories"
          >
            <span>Read customer stories</span>
            <ArrowRight size={14} />
          </TrackingLink>
        </Button>
      </div>
    </div>
  )
}

const InContextObservability: React.FC = () => {
  return (
    <SectionLayout
      variant="bordered"
      className="flex flex-col items-center justify-center gap-10 !px-8 !py-20 md:!px-0"
    >
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-4xl font-semibold text-signoz_vanilla-100">
          Powerful, In-context Observability
        </h2>
        <p className="text-lg text-signoz_vanilla-400">
          In the tools you need. At the time you need.
        </p>
      </div>
      <div className="mx-auto flex max-w-4xl justify-center gap-10">
        <div className="w-full md:w-1/2">
          <Card variant="gradient">
            <div className="m-6 flex flex-grow flex-col gap-4">
              <div className="flex items-center gap-3">
                <Terminal className="size-6 text-signoz_robin-500" />
                <h3 className="text-2xl font-bold text-signoz_vanilla-100">SigNoz MCP Server</h3>
              </div>
              <p className="text-base text-signoz_vanilla-400">
                Plug into Claude Code, Cursor in minutes. Get full observability context — traces,
                logs, metrics, service topology, deployment history — in every session. Start
                debugging in your terminal today.
              </p>
              <Button
                asChild
                variant="default"
                rounded="full"
                className="flex-center flex !w-fit items-center gap-2"
              >
                <TrackingLink
                  href="/docs/ai/signoz-mcp-server/"
                  clickType="Primary CTA"
                  clickName="Agent Native Page MCP Server Get Started"
                  clickLocation="Agent Native Observability Page In-Context Section"
                  clickText="Get started in minutes"
                >
                  Get started in minutes
                  <ArrowRight size={14} />
                </TrackingLink>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </SectionLayout>
  )
}

const FeatureSections: React.FC = () => {
  return (
    <section className="relative mx-auto max-w-8xl overflow-hidden border !border-b-0 border-dashed border-signoz_slate-400 pt-14 md:w-[80vw]">
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center">
        <div className="flex flex-col items-center gap-14 text-2xl font-medium leading-[3.25rem] text-signoz_sienna-100">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-center text-4xl font-semibold text-signoz_vanilla-100">
              Why Agent Native Observability
            </h2>
            <div className="text-center text-base text-signoz_vanilla-100">
              Debug faster. Ship with confidence. All from your dev environment.
            </div>
          </div>
          <SectionLayout variant="no-border" className="!mx-auto !p-0">
            <IconTitleDescriptionCardGrid cards={FEATURE_CARDS} variant="lg" />
          </SectionLayout>
        </div>
      </div>
    </section>
  )
}

const BottomCTA: React.FC = () => {
  return (
    <SectionLayout
      variant="bordered"
      className="flex flex-col items-center justify-center gap-6 !px-8 !py-20 md:!px-0"
    >
      <h2 className="mx-auto mb-6 max-w-4xl text-center text-4xl font-semibold text-signoz_vanilla-100">
        No more context-switching to a <br className="hidden md:block" /> separate observability
        tool.
      </h2>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
          <Button
            asChild
            variant="default"
            rounded="full"
            className="flex-center flex !w-fit items-center gap-2"
          >
            <TrackingLink
              href="/docs/ai/signoz-mcp-server/"
              clickType="Primary CTA"
              clickName="Agent Native Page Bottom CTA Connect MCP"
              clickLocation="Agent Native Observability Page Bottom CTA"
              clickText="Connect SigNoz MCP"
            >
              Connect SigNoz MCP
              <ArrowRight size={14} />
            </TrackingLink>
          </Button>
          <Button
            asChild
            variant="secondary"
            rounded="full"
            className="flex-center flex !w-fit items-center gap-2"
          >
            <TrackingLink
              href="/teams/"
              clickType="Secondary CTA"
              clickName="Agent Native Page Bottom CTA Get Started - Free"
              clickLocation="Agent Native Observability Page Bottom CTA"
              clickText="Get Started - Free"
            >
              Get Started - Free
              <ArrowRight size={14} />
            </TrackingLink>
          </Button>
        </div>
      </div>
    </SectionLayout>
  )
}

const AgentNativeObservabilityPage: React.FC = () => {
  return (
    <FeaturePageLayout showProductNav={false}>
      <Header />
      <TrustedByTeams />
      <InContextObservability />

      <SectionLayout variant="bordered" className="!px-0">
        <FeatureSections />
        <BottomCTA />
      </SectionLayout>
    </FeaturePageLayout>
  )
}

export default AgentNativeObservabilityPage
