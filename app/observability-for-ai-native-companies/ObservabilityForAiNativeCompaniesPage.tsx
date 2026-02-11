'use client'

import { ArrowDown, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import ProductNav from '@/components/ProductNav/ProductNav'
import Image from 'next/image'
import {
  CAPABILITIES_CARDS1,
  CAPABILITIES_CARDS2,
  LLM_COMPARISON_TABLE_ROWS,
  TRADITIONAL_COMPARISON_TABLE_ROWS,
  VENDORS,
  TRADITIONAL_VENDORS,
  PILLARS_DATA,
  TRUSTED_BY_LOGOS,
} from './ObservabilityForAiNativeCompaniesPage.constants'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import ButtonGroup from '@/shared/components/molecules/FeaturePages/ButtonGroup'
import TestimonialCards from '@/shared/components/molecules/FeaturePages/TestimonialCard'
import UsageBasedPricing from '@/shared/components/molecules/FeaturePages/UsageBasedPricing'
import SigNozStats from '@/shared/components/molecules/FeaturePages/SignozStats'
import IconTitleDescriptionCardGrid from '@/shared/components/molecules/FeaturePages/IconTitleDescriptionCard'
import TrackingLink from '@/components/TrackingLink'
import ComparisonTable from '@/shared/components/molecules/FeaturePages/ComparisonTable'

const Header: React.FC = () => {
  const headerButtons = [
    {
      text: 'Start your free trial',
      href: '/teams/',
      variant: 'default' as const,
      className: 'flex-center',
      tracking: {
        clickType: 'Primary CTA',
        clickName: 'Observability for AI Native Companies Hero Start Trial',
        clickLocation: 'Observability for AI Native Companies Hero',
        clickText: 'Start your free trial',
      },
    },
    {
      text: 'Read Documentation',
      href: '/docs/llm-observability/',
      variant: 'secondary' as const,
      className: 'flex-center',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Observability for AI Native Companies Hero Docs',
        clickLocation: 'Observability for AI Native Companies Hero',
        clickText: 'Read Documentation',
      },
    },
  ]

  return (
    <header className="relative !mx-auto mt-16 !w-[100vw] md:!w-[80vw]">
      <div className="absolute bottom-0 left-[12px] right-[12px] top-0 z-[0] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:left-[24px] md:right-[24px]" />

      <div className="relative !mx-auto flex !w-[100vw] flex-col items-center border !border-b-0 border-dashed border-signoz_slate-400 px-2 pb-4 pt-12 text-center md:!w-[80vw] md:px-5 md:pt-[4rem]">
        <h1 className="text-gradient z-[1] my-4 !p-3 text-2xl font-semibold tracking-tight dark:text-white sm:my-2 sm:my-5 sm:text-3xl md:leading-[3.5rem] lg:text-[44px]">
          Monitor AI Workloads Across LLM <br className="hidden md:block" /> Layer and
          Infrastructure with <br className="hidden md:block" /> Correlated Logs, Metrics, and
          Traces
        </h1>

        <p className="m-0 p-3 text-lg font-normal leading-8 text-signoz_vanilla-400 sm:p-0">
          Track token usage, latency, and costs alongside your microservices, databases, and GPU
          clusters. <br className="hidden md:block" /> Handle high-cardinality data at scale with
          usage-based pricing and span-level alerting for traces.
        </p>
      </div>

      <div className="relative z-[1] !mx-auto mx-2 !w-[100vw] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 pb-12 pt-4 md:mx-5 md:!w-[80vw]">
        <ButtonGroup buttons={headerButtons} />
      </div>

      <SectionLayout
        variant="no-border"
        className="!mt-0 !border-x-1 !border-dashed !border-signoz_slate-400 max-md:-mb-[3rem]"
      >
        <div className="w-full">
          <Image
            src="/img/platform/ObservabilityForAiNativeCompaniesMeta.webp"
            alt="Observability for AI Native Companies hero"
            className="z-1 relative w-full rounded-xl"
            width={10000}
            height={10000}
          />
        </div>
      </SectionLayout>
    </header>
  )
}

const TrustedByTeams: React.FC = () => {
  return (
    <>
      <div className="text-center text-sm font-semibold uppercase tracking-[0.05em] text-signoz_vanilla-400">
        Trusted by the <span className="text-signoz_vanilla-100">best platform teams</span>
      </div>
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-16 gap-y-8 px-4">
        {TRUSTED_BY_LOGOS.map((logo, index) => (
          <div key={index} className="flex h-12 items-center justify-center">
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
            clickName="Observability for AI Native Companies Customer Stories Button"
            clickLocation="Observability for AI Native Companies Testimonials"
            clickText="Read customer stories"
          >
            <span>Read customer stories</span>
            <ArrowRight size={14} />
          </TrackingLink>
        </Button>
      </div>
    </>
  )
}

const CapabilitiesSection: React.FC = () => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
      <div className="flex flex-col items-center gap-12 text-2xl font-medium leading-[3.25rem] text-signoz_sienna-100">
        <h2 className="my-6 py-10 text-center text-4xl font-semibold text-signoz_sienna-100">
          Capabilities That Make Us the <br className="hidden md:block" /> Default Choice for AI
          Companies
        </h2>
        <SectionLayout variant="no-border" className="!mx-auto p-0">
          <div className="border-y border-dashed border-signoz_slate-400 p-8 text-left">
            <h4 className="mb-1 font-semibold text-signoz_robin-400">
              Capabilities that AI Companies Need Most
            </h4>
            <div className="text-sm text-signoz_vanilla-400">
              Features that help you debug non-deterministic LLM outputs, control inference costs,
              track business outcomes, and meet compliance requirements
            </div>
          </div>
          <IconTitleDescriptionCardGrid cards={CAPABILITIES_CARDS1} />
          <div className="relative flex w-full flex-col items-start border border-dashed border-signoz_slate-400/50 p-8">
            <h4 className="text-left font-semibold text-red-400">
              Full-Stack Platform Capabilities
            </h4>
            <div className="text-left text-sm text-signoz_vanilla-400">
              Unlike LLM-only observability tools, we correlate AI layer performance with your
              entire infrastructure - databases, microservices, and application logs.
            </div>
          </div>
          <IconTitleDescriptionCardGrid cards={CAPABILITIES_CARDS2} />
        </SectionLayout>
      </div>
    </div>
  )
}

const CapabilitiesThatMakeUsTheDefaultChoiceForAiCompanies: React.FC = () => {
  return (
    <SectionLayout
      variant="bordered"
      className="relative mx-auto w-[100vw] overflow-hidden border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw]"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-signoz_ink-500/50 via-signoz_ink-500/25 to-signoz_ink-500/90" />
      <div className="relative flex flex-col gap-6 pt-32 md:py-20">
        <TrustedByTeams />
        <CapabilitiesSection />
      </div>
    </SectionLayout>
  )
}

const PillarsOfAiFocusedObservabilityArchitecture: React.FC = () => {
  return (
    <SectionLayout variant="bordered" className="!pb-20 !pt-20">
      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <h2 className="mb-24 text-center text-4xl font-semibold text-signoz_sakura-100">
          4 Pillars of AI-Focused <br className="hidden md:block" /> Observability Architecture
        </h2>
        <IconTitleDescriptionCardGrid cards={PILLARS_DATA} />
      </div>
    </SectionLayout>
  )
}

const CostComparison: React.FC = () => {
  return (
    <SectionLayout
      variant="bordered"
      className="!border-b-1 !border-t-1 border-dashed border-signoz_slate-400 !px-0"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="!w-[100%] flex-1 md:!w-[300px]">
          <div className="sticky top-[100px] min-w-fit px-10 pt-10 md:px-12">
            <h2 className="text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-[44px]">
              Cost <br className="hidden md:block" />
              Comparison
            </h2>
            <div className="mt-4 flex w-fit items-center gap-2 border border-dashed border-signoz_slate-400 px-3 py-1 text-2xl font-semibold text-signoz_vanilla-100">
              <ArrowDown size={24} className="text-signoz_vanilla-400" />
              <span>
                <span className="text-red-500">95%</span> Saved
              </span>
            </div>
          </div>
        </div>
        <div className="flex-[2_2_0%] border-l border-dashed border-signoz_slate-400 p-10">
          <h3 className="mb-4 text-xl font-semibold text-signoz_vanilla-100">
            SigNoz vs Langfuse for 1 Billion Spans/Month
          </h3>
          <p className="mb-8 text-signoz_vanilla-400">
            We charge based on data size while Langfuse charges per unit count. AI applications
            generate more spans due to complex agent workflows and tool calls, making unit-based
            pricing expensive at scale.
          </p>

          <div className="flex flex-col gap-4">
            <div className="rounded-lg p-6">
              <h4 className="mb-2 font-semibold text-signoz_vanilla-100">Langfuse Core</h4>
              <div className="mb-2 font-bold text-signoz_vanilla-100">$60,331/month</div>
              <p className="text-sm text-signoz_vanilla-400">
                Base $29 + $60,302 usage (graduated pricing from 100k to 1B units). Langfuse counts
                traces, observations, and scores as billable units.
              </p>
            </div>

            <div className="rounded-lg p-6">
              <h4 className="mb-2 font-semibold text-signoz_vanilla-100">SigNoz Cloud</h4>
              <div className="mb-2 font-bold text-signoz_vanilla-100">$300 - $3,000/month</div>
              <p className="text-sm text-signoz_vanilla-400">
                Span sizes typically range from 1 KB to 10 KB depending on your instrumentation and
                payload complexity. It also includes traces, logs, and metrics with no separate
                instrumentation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}

const HowSigNozCompares: React.FC = () => {
  return (
    <section className="relative mx-auto w-[100vw] overflow-hidden border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-signoz_ink-500/50 via-signoz_ink-500/25 to-signoz_ink-500/90" />
      <div className="container relative mx-auto flex max-w-4xl flex-col items-center gap-6 pb-16 text-center md:py-20">
        <div className="flex flex-col items-center gap-12 text-2xl font-medium leading-[3.25rem] text-signoz_sienna-100">
          <h2 className="mb-6 py-10 text-center text-4xl font-semibold text-signoz_sienna-100">
            How SigNoz Compares to <br /> LLM-Only Tools
          </h2>
          <SectionLayout variant="no-border" className="!mx-auto flex items-center justify-center">
            <ComparisonTable vendors={VENDORS} rows={LLM_COMPARISON_TABLE_ROWS} />
          </SectionLayout>
        </div>
      </div>
    </section>
  )
}

const HowSigNozComparesToTraditionalTools: React.FC = () => {
  return (
    <section className="relative mx-auto w-[100vw] overflow-hidden border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-signoz_ink-500/50 via-signoz_ink-500/25 to-signoz_ink-500/90" />
      <div className="container relative mx-auto flex max-w-4xl flex-col items-center gap-6 pb-16 text-center md:py-20">
        <div className="flex flex-col items-center gap-12 text-2xl font-medium leading-[3.25rem] text-signoz_sienna-100">
          <h2 className="mb-6 py-10 text-center text-4xl font-semibold text-signoz_sienna-100">
            How SigNoz Compares to <br /> Traditional Tools
          </h2>
          <SectionLayout variant="no-border" className="!mx-auto flex items-center justify-center">
            <ComparisonTable
              vendors={TRADITIONAL_VENDORS}
              rows={TRADITIONAL_COMPARISON_TABLE_ROWS}
            />
          </SectionLayout>
        </div>
      </div>
    </section>
  )
}

const CustomerStories: React.FC = () => {
  return (
    <>
      <section className="relative mx-auto w-[100vw] overflow-hidden border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-signoz_ink-500/50 via-signoz_ink-500/25 to-signoz_ink-500/90" />
        <div className="container relative pb-16">
          <div className="flex flex-col gap-6 py-32">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <div className="flex flex-col items-center gap-12 text-2xl font-medium leading-[3.25rem] text-signoz_sienna-100">
                <Image
                  src="/img/case_study/logos/shaped-logo.svg"
                  alt="Shaped"
                  width={100}
                  height={100}
                />
                Every single time we have an issue, SigNoz is always the first place to check. It
                was super straightforward to migrate - just updating the exporter configuration,
                basically three lines of code.
                <span className="text-sm text-signoz_vanilla-400">
                  <span className="font-semibold">Karl Lyons</span> <br /> Senior SRE, Shaped
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionLayout variant="bordered" className="!mx-auto p-0 max-md:-mb-[3rem]">
        <div className="container pb-16">
          <TestimonialCards />

          <div className="z-5 relative -mt-[25rem] flex h-96 items-end justify-center bg-gradient-to-t from-signoz_ink-500 to-transparent py-6 max-md:py-16">
            <Button variant="secondary" rounded="full" className="flex items-center gap-2" asChild>
              <TrackingLink
                href="/case-study/"
                clickType="Secondary CTA"
                clickName="Observability for AI Native Companies Customer Stories Button"
                clickLocation="Observability for AI Native Companies Testimonials"
                clickText="Read customer stories"
              >
                Read customer stories
                <ArrowRight size={14} />
              </TrackingLink>
            </Button>
          </div>
        </div>
      </SectionLayout>
    </>
  )
}

const StartMonitoring: React.FC = () => {
  const startMonitoringButtons = [
    {
      text: 'Start your free trial',
      href: '/teams/',
      variant: 'default' as const,
      className: 'flex-center',
      tracking: {
        clickType: 'Primary CTA',
        clickName: 'Observability for AI Native Companies Start Monitoring CTA Start Trial',
        clickLocation: 'Observability for AI Native Companies Start Monitoring Section',
        clickText: 'Start your free trial',
      },
    },
    {
      text: 'Read Documentation',
      href: '/docs/llm-observability/',
      variant: 'secondary' as const,
      className: 'flex-center',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Observability for AI Native Companies Start Monitoring CTA Docs',
        clickLocation: 'Observability for AI Native Companies Start Monitoring Section',
        clickText: 'Read Documentation',
      },
    },
  ]
  return (
    <SectionLayout
      variant="bordered"
      className="!border-t-1 border-dashed border-signoz_slate-400 !px-0"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="!w-[100%] flex-1 md:!w-[300px]">
          <p className="sticky top-[100px] px-10 pt-10 text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-[44px] md:px-12">
            Start Monitoring Your AI Apps in <span className="text-red-500">Minutes</span>
          </p>
        </div>
        <div className="grid flex-[2_2_0%] grid-cols-1 border-b border-l border-dashed border-signoz_slate-400 bg-transparent p-0 lg:grid-cols-3">
          <div className="col-span-2 flex flex-col gap-6 p-10">
            <h3 className="m-0 text-2xl font-semibold text-signoz_vanilla-100">
              Get started in three steps:
            </h3>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="w-6 shrink-0 font-semibold text-red-500">I</span>Sign up for free
                SigNoz Cloud account
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 shrink-0 font-semibold text-red-500">II</span>Install your
                framework's instrumentation package
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 shrink-0 font-semibold text-red-500">III</span>Add two lines to
                initialize tracing
              </div>
            </div>
            <div className="flex flex-col items-center gap-6 text-justify text-signoz_vanilla-400 lg:items-start">
              Your existing application code remains completely untouched while traces start flowing
              to SigNoz in real-time, giving you instant visibility into every aspect of your LLM
              operations.
              <ButtonGroup buttons={startMonitoringButtons} />
            </div>
          </div>
          <div className="relative col-span-1 h-full min-h-[400px] w-full">
            <Image
              src="/img/llm-observability/start-monitoring-section.webp"
              alt="Start Monitoring"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}

const ObservabilityForAiNativeCompaniesPage: React.FC = () => {
  return (
    <main className="!mt-[-10px] mb-auto">
      <ProductNav />

      <div className="relative bg-signoz_ink-500">
        <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
        <div className="absolute left-0 right-0 top-0 mx-auto h-[450px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />

        <Header />

        <SectionLayout variant="bordered" className="!px-0">
          <CapabilitiesThatMakeUsTheDefaultChoiceForAiCompanies />
          <HowSigNozCompares />
          <CostComparison />
          <HowSigNozComparesToTraditionalTools />
          <PillarsOfAiFocusedObservabilityArchitecture />
        </SectionLayout>

        <StartMonitoring />
        <UsageBasedPricing show={['traces', 'metrics', 'logs']} />
        <SigNozStats />
        <CustomerStories />
      </div>
    </main>
  )
}

export default ObservabilityForAiNativeCompaniesPage
