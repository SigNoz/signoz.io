'use client'

import { ArrowRight, BookOpen, CircleArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import {
  LLM_OBSERVABILITY_CARDS,
  LLM_COMPARISON_TABLE_ROWS,
  LLM_TOOLS_DATA,
  VENDORS,
} from './LlmObservabilityPage.constants'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import GridLayout from '@/shared/components/molecules/FeaturePages/GridLayout'
import FeaturePageHeader from '@/shared/components/molecules/FeaturePages/FeaturePageHeader'
import ButtonGroup from '@/shared/components/molecules/FeaturePages/ButtonGroup'
import UsageBasedPricing from '@/shared/components/molecules/FeaturePages/UsageBasedPricing'
import SigNozStats from '@/shared/components/molecules/FeaturePages/SignozStats'
import IconTitleDescriptionCardGrid from '@/shared/components/molecules/FeaturePages/IconTitleDescriptionCard'
import TrackingLink from '@/components/TrackingLink'
import ComparisonTable from '@/shared/components/molecules/FeaturePages/ComparisonTable'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import CustomerStoriesSection from '@/shared/components/molecules/FeaturePages/CustomerStoriesSection'

const Header: React.FC = () => {
  const headerButtons = [
    {
      text: 'Start your free trial',
      href: '/teams/',
      variant: 'default' as const,
      className: 'flex-center',
      tracking: {
        clickType: 'Primary CTA',
        clickName: 'LLM Observability Hero Start Trial',
        clickLocation: 'LLM Observability Hero',
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
        clickName: 'LLM Observability Hero Docs',
        clickLocation: 'LLM Observability Hero',
        clickText: 'Read Documentation',
      },
    },
  ]

  return (
    <FeaturePageHeader
      title={
        <>
          Monitor LLM Apps and Agents, <br className="hidden md:block" /> Correlate with Logs &
          Metrics
        </>
      }
      description={
        <>
          Track AI workflows, RAG pipelines, and agents alongside microservices. Get unified
          alerting, <br className="hidden md:block" /> dashboards, and correlation across your
          entire stack.
        </>
      }
      buttons={headerButtons}
      sectionLayoutVariant="no-border"
      sectionLayoutClassName="!mt-0 max-md:-mb-[3rem]"
      heroImageAlt="Llm observability hero"
      heroImage="/img/platform/LlmObservabilityMeta.webp"
    />
  )
}

const EverythingYouNeedCards: React.FC = () => {
  return (
    <section className="relative mx-auto w-[100vw] max-w-8xl overflow-hidden border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-signoz_ink-500/50 via-signoz_ink-500/25 to-signoz_ink-500/90" />
      <div className="relative">
        <div className="container">
          <div className="flex flex-col gap-6 pt-32">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <div className="flex flex-col items-center gap-12 text-2xl font-medium leading-[3.25rem] text-signoz_sienna-100">
                <h2 className="mb-6 py-10 text-center text-4xl font-semibold text-signoz_sienna-100">
                  Everything You Need to <br className="hidden md:block" /> Monitor LLM Applications
                </h2>
                <SectionLayout variant="no-border" className="!mx-auto p-0">
                  <IconTitleDescriptionCardGrid cards={LLM_OBSERVABILITY_CARDS} />
                </SectionLayout>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const WorksWithYourFavoriteLLMTools: React.FC = () => {
  return (
    <>
      <section className="relative mx-auto w-[100vw] max-w-8xl overflow-hidden border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-signoz_ink-500/50 via-signoz_ink-500/25 to-signoz_ink-500/90" />
        <div className="relative">
          <div className="container">
            <div className="flex flex-col gap-6">
              <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                <div className="flex flex-col items-center gap-8 font-medium leading-[3.25rem] text-signoz_sienna-100">
                  <h2 className="text-center text-4xl font-semibold text-signoz_sakura-100">
                    Works with Your Favorite LLM Tools
                  </h2>
                  <p className="text-sm leading-relaxed text-signoz_vanilla-400">
                    Automatic instrumentation for every part of your LLM stack. From model{' '}
                    <br className="hidden md:block" /> providers to vector databases to agent
                    frameworks, get instant visibility <br className="hidden md:block" /> without
                    writing custom telemetry code.
                  </p>
                  <Button
                    variant="secondary"
                    rounded="full"
                    className="flex w-fit items-center gap-2"
                    asChild
                  >
                    <TrackingLink
                      href="/docs/llm-observability/"
                      clickType="Secondary CTA"
                      clickName="LLM Observability Integrations Button"
                      clickLocation="LLM Observability Integrations Section"
                      clickText="See All Integrations"
                    >
                      <BookOpen className="h-5 w-5 text-signoz_vanilla-400" />
                      See All Integrations
                      <ArrowRight className="h-5 w-5 text-signoz_vanilla-400" />
                    </TrackingLink>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SectionLayout variant="bordered" className="!mx-auto mt-10 p-0">
        <GridLayout variant="split" className="!gap-y-0">
          {LLM_TOOLS_DATA.map((section, index) => {
            const isDesktopRow1 = index < 2
            const isDesktopCol1 = index % 2 === 0

            const desktopClasses = `
            ${isDesktopCol1 ? 'md:border-r' : ''} 
            ${isDesktopRow1 ? 'md:border-b' : ''}
          `.trim()

            return (
              <div
                key={index}
                className={`flex flex-col gap-6 border-dashed border-signoz_slate-400 px-6 py-8 md:px-10 md:py-12 ${desktopClasses}`}
              >
                <h3 className="m-0 text-xl font-semibold text-signoz_vanilla-100">
                  {section.title}
                </h3>

                <div className="flex flex-col gap-4">
                  {section.items.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <div className="mt-1 shrink-0">
                        <CircleArrowRight className="h-4 w-4 text-signoz_robin-400" />
                      </div>
                      <p className="m-0 text-sm leading-6 text-signoz_vanilla-300">
                        {item.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </GridLayout>
      </SectionLayout>
    </>
  )
}

const HowSigNozCompares: React.FC = () => {
  return (
    <section className="relative mx-auto w-[100vw] max-w-8xl overflow-hidden border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-signoz_ink-500/50 via-signoz_ink-500/25 to-signoz_ink-500/90" />
      <div className="relative">
        <div className="container pb-16">
          <div className="flex flex-col gap-6 py-32">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <div className="flex flex-col items-center gap-12 text-2xl font-medium leading-[3.25rem] text-signoz_sienna-100">
                <h2 className="mb-6 py-10 text-center text-4xl font-semibold text-signoz_sienna-100">
                  How SigNoz Compares to <br /> LLM-Only Tools
                </h2>
                <SectionLayout
                  variant="no-border"
                  className="!mx-auto flex items-center justify-center"
                >
                  <ComparisonTable vendors={VENDORS} rows={LLM_COMPARISON_TABLE_ROWS} />
                </SectionLayout>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
        clickName: 'LLM Observability Bottom CTA Start Trial',
        clickLocation: 'LLM Observability Bottom Section',
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
        clickName: 'LLM Observability Bottom CTA Docs',
        clickLocation: 'LLM Observability Bottom Section',
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
            Start Monitoring Your LLM Apps in <span className="text-red-500">Minutes</span>
          </p>
        </div>
        <div className="flex-[2_2_0%]">
          <div className="border-b border-l border-dashed border-signoz_slate-400 bg-transparent p-0">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="col-span-2 flex flex-col gap-6 p-10">
                <h3 className="m-0 text-2xl font-semibold text-signoz_vanilla-100">
                  Get started in three steps:
                </h3>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="w-6 shrink-0 font-semibold text-red-500">I</span>Sign up for
                    free SigNoz Cloud account
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 shrink-0 font-semibold text-red-500">II</span>Install your
                    framework's instrumentation package
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 shrink-0 font-semibold text-red-500">III</span>Add two
                    lines to initialize tracing
                  </div>
                </div>
                <div className="flex flex-col items-center gap-6 text-justify text-signoz_vanilla-400 lg:items-start">
                  Your existing application code remains completely untouched while traces start
                  flowing to SigNoz in real-time, giving you instant visibility into every aspect of
                  your LLM operations.
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
        </div>
      </div>
    </SectionLayout>
  )
}

const LlmObservabilityPage: React.FC = () => {
  return (
    <FeaturePageLayout>
      <Header />

      <SectionLayout variant="bordered" className="!px-0">
        <EverythingYouNeedCards />
        <HowSigNozCompares />
        <WorksWithYourFavoriteLLMTools />
      </SectionLayout>

      <StartMonitoring />
      <UsageBasedPricing show={['traces', 'metrics', 'logs']} />
      <SigNozStats />
      <CustomerStoriesSection
        tracking={{
          clickName: 'LLM Observability Customer Stories Button',
          clickLocation: 'LLM Observability Testimonials',
        }}
      />
    </FeaturePageLayout>
  )
}

export default LlmObservabilityPage
