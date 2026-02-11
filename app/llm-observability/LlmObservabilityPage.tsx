'use client'

import { ArrowRight, BookOpen, CircleArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import ProductNav from '@/components/ProductNav/ProductNav'
import Image from 'next/image'
import {
  LLM_OBSERVABILITY_CARDS,
  LLM_COMPARISON_TABLE_ROWS,
  LLM_TOOLS_DATA,
  VENDORS,
} from './LlmObservabilityPage.constants'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import GridLayout from '@/shared/components/molecules/FeaturePages/GridLayout'
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
    <header className="relative !mx-auto mt-16 !w-[100vw] md:!w-[80vw]">
      <div className="absolute bottom-0 left-[12px] right-[12px] top-0 z-[0] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:left-[24px] md:right-[24px]" />

      <div className="relative !mx-auto flex !w-[100vw] flex-col items-center border !border-b-0 border-dashed border-signoz_slate-400 px-2 pb-4 pt-12 text-center md:!w-[80vw] md:px-5 md:pt-[4rem]">
        <h1 className="text-gradient z-[1] my-4 !p-3 text-2xl font-semibold tracking-tight dark:text-white sm:my-2 sm:my-5 sm:text-3xl md:leading-[3.5rem] lg:text-[44px]">
          Monitor LLM Apps and Agents, <br className="hidden md:block" /> Correlate with Logs &
          Metrics
        </h1>

        <p className="m-0 p-3 text-lg font-normal leading-8 text-signoz_vanilla-400 sm:p-0">
          Track AI workflows, RAG pipelines, and agents alongside microservices. Get unified
          alerting, <br className="hidden md:block" /> dashboards, and correlation across your
          entire stack.
        </p>
      </div>

      <div className="relative z-[1] !mx-auto mx-2 !w-[100vw] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 pb-12 pt-4 md:mx-5 md:!w-[80vw]">
        <ButtonGroup buttons={headerButtons} />
      </div>

      <SectionLayout variant="no-border" className="!mt-0 max-md:-mb-[3rem]">
        <div className="w-100 mx-[-28px]">
          <Image
            src="/img/platform/LlmObservabilityMeta.webp"
            alt="Llm observability hero"
            className="relative z-10 w-full rounded-xl"
            width={10000}
            height={10000}
          />
        </div>
      </SectionLayout>
    </header>
  )
}

const EverythingYouNeedCards: React.FC = () => {
  return (
    <section className="relative mx-auto w-[100vw] overflow-hidden border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw]">
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
      <section className="relative mx-auto w-[100vw] overflow-hidden border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw]">
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
    <section className="relative mx-auto w-[100vw] overflow-hidden border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw]">
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

const CustomerStories: React.FC = () => {
  return (
    <>
      <section className="relative mx-auto w-[100vw] overflow-hidden border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-signoz_ink-500/50 via-signoz_ink-500/25 to-signoz_ink-500/90" />

        <div className="relative">
          <div className="container pb-16">
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
                clickName="LLM Observability Customer Stories Button"
                clickLocation="LLM Observability Testimonials"
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
    <main className="!mt-[-10px] mb-auto">
      <ProductNav />

      <div className="relative bg-signoz_ink-500">
        <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
        <div className="absolute left-0 right-0 top-0 mx-auto h-[450px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />

        <Header />

        <SectionLayout variant="bordered" className="!px-0">
          <EverythingYouNeedCards />
          <HowSigNozCompares />
          <WorksWithYourFavoriteLLMTools />
        </SectionLayout>

        <StartMonitoring />
        <UsageBasedPricing show={['traces', 'metrics', 'logs']} />
        <SigNozStats />
        <CustomerStories />
      </div>
    </main>
  )
}

export default LlmObservabilityPage
