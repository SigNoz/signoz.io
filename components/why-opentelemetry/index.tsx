import React from 'react'
import styles from './styles.module.css'
import Heading from '../../components/ui/Heading'
import SubHeading from '../../components/ui/SubHeading'
import Card from '../Card/card'
import { BookOpen, ArrowRight } from 'lucide-react'
import { ArrowRightSolid } from '@/components/homepage-icons/icons'
import TrackingLink from '@/components/TrackingLink'

export const WhyOpenTelemetry = () => {
  const REASONS = [
    {
      title: 'No vendor lock-in',
      desc: 'Get free of vendor-based agents inside your codebase.',
      figure: '/img/landing/property-no-vendor-lock-in.webp',
      logo: '/img/index_features/key.svg',
    },
    {
      title: 'Futureproof',
      desc: "OpenTelemetry's extensibility ensures support for any evolving technologies.",
      figure: '/img/landing/property-ease-of-use.webp',
      logo: '/img/index_features/future.svg',
    },
    {
      title: 'Covers all use-cases',
      desc: 'OpenTelemetry is a one-stop solution for all your telemetry needs. Generate logs, metrics, and traces with one SDK.',
      figure: '/img/landing/property-covers-all-use-cases.webp',
      logo: '/img/index_features/cases.svg',
    },
    {
      title: 'Standardize Observability',
      desc: 'A single standard for all telemetry signals means increased developer productivity, consistency across teams.',
      figure: '/img/landing/property-standardize-observability.webp',
      logo: '/img/index_features/easy-to-use.svg',
    },
  ]

  return (
    <>
      <section className="!mx-auto !w-[100vw] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:!w-[80vw]">
        <div className="container bg-[url('/img/background_blur/Ellipse_207.png')] bg-[center_top_calc(-600px)]">
          <div className="flex flex-col items-center py-8 text-center md:py-28">
            <p className="text-center text-sm font-medium uppercase tracking-[.05em] text-signoz_vanilla-400">
              SigNoz is OpenTelemetry-Native
            </p>
            <p className="text-3xl font-semibold leading-[3.5rem] text-signoz_sakura-100 sm:text-[44px]">
              But why OpenTelemetry?
            </p>
            <p className="text-center text-xs font-medium text-signoz_vanilla-100 sm:text-base">
              OpenTelemetry is the second most active project in the CNCF, with only&nbsp;
              <br className="hidden lg:inline" />
              Kubernetes being more active.
            </p>
            <button>
              <TrackingLink 
                href="/why-opentelemetry"
                clickType="Secondary CTA"
                clickName="Why OpenTelemetry Link"
                clickText="Learn why OpenTelemetry is the future"
                clickLocation="Why OpenTelemetry Section"
                className="h-10 px-4 py-2 mt-3 mb-3 rounded-full text-[10px] sm:text-sm flex items-center justify-center gap-1.5 bg-signoz_slate-400 font-medium leading-5 text-white border border-signoz_slate-200 shadow-[0_0_20px_0_rgba(242,71,105,0.20)]"
              >
                <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5"/>Learn why OpenTelemetry is the future<ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </TrackingLink>
            </button>
          </div>
        </div>
      </section>
      <div className="!mx-auto grid !w-[100vw] grid-cols-1 border !border-b-0 !border-l-0 !border-t-0 border-dashed border-signoz_slate-400 sm:grid-cols-2 md:!w-[80vw]">
        {REASONS.map((section, index) => (
          <Card
            logo={section.logo}
            subTitle={section.title}
            description={section.desc}
            logoSize={24}
            key={section.title}
            sectionName="OpenTelemetry Section"
          />
        ))}
      </div>
      <section className="!mx-auto !w-[100vw] border border-dashed border-signoz_slate-400 md:!w-[80vw] ">
        <div className="section-container mb-16">
          <div className="flex flex-col justify-between p-9">
            <div className="flex flex-col justify-between sm:flex-row">
              <div>
                <p className="text-2xl font-semibold text-signoz_vanilla-100">
                  {' '}
                  SigNoz is built from the ground up for OpenTelemetry
                </p>

                <p className="my-3 max-w-[100vw] text-base font-normal leading-9 text-signoz_vanilla-400 sm:w-[42rem] md:max-w-[50vw]">
                  SigNoz offers the best in class support for OpenTelemetry{"'"}s semantic conventions
                  with the best visualizations ⎯ powered by our powerful ingestion engine.
                </p>
                <ul className="ul-no-padding mt-8 md:mt-0 ">
                  <li className="mb-3 flex items-center gap-3 text-sm sm:text-base">
                    <ArrowRightSolid />
                    <span>OpenTelemetry-first docs</span>
                  </li>
                  <li className="mb-3 flex items-center gap-3 text-sm sm:text-base">
                    <ArrowRightSolid />
                    <span>
                      Correlation of signals based on OpenTelemetry{"'"}s semantic conventions
                    </span>
                  </li>
                  <li className="mb-3 flex items-center gap-3 text-sm sm:text-base">
                    <ArrowRightSolid />
                    <span>Exceptions based on OpenTelemetry{"'"}s Trace data</span>
                  </li>
                  <li className="mb-3 flex items-center gap-3 text-sm sm:text-base">
                    <ArrowRightSolid />
                    <span>Messaging queue monitoring based on OTel{"'"}s trace & metric{"'"}s data</span>
                  </li>
                  <li className="mb-3 flex items-center gap-3 text-sm sm:text-base">
                    <ArrowRightSolid />
                    <span>Deployment env and marker support powered by OpenTelemetry</span>
                  </li>
                  <li className="mb-3 flex items-center gap-3 text-sm sm:text-base">
                    <ArrowRightSolid />
                    <span>Configurable observability pipelines supported by Opamp</span>
                  </li>
                  <li className="mb-3 flex items-center gap-3 text-sm sm:text-base">
                    <ArrowRightSolid />
                    <span>Span-based events for richer context while debugging</span>
                  </li>
                </ul>
              </div>
              <div className="card-background mb-6 aspect-[449/352] sm:h-[352px]">
                <img src="/img/graphics/homepage/feature-graphic-otel.webp" alt="" />
              </div>
            </div>
            <TrackingLink
              href="https://signoz.io/blog/is-opentelemetry-a-first-class-citizen-in-your-dashboard-a-datadog-and-newrelic-comparison/"
              className="rounded border border-signoz_slate-500 bg-signoz_ink-400 p-4"
              target="_blank"
              clickType="Nav Click"
              clickName="OpenTelemetry Blog Link"
              clickText="Comparing Datadog and New Relic's support for OpenTelemetry data"
              clickLocation="Why OpenTelemetry Section"
            >
              <p className="mb-2 text-base font-medium text-signoz_vanilla-100">
                Comparing Datadog and New Relic's support for OpenTelemetry data
              </p>
              <p className="m-0 text-sm font-normal leading-9 text-signoz_vanilla-400">
                Walk through how native OpenTelemetry tools compare to APM products that have
                adopted OpenTelemetry only partially.
              </p>
            </TrackingLink>
          </div>
        </div>
      </section>
      <div className="!mx-auto h-12 !w-[100vw] w-full border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:!w-[80vw]" />
    </>
  )
}
