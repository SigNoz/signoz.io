import React from 'react'
import Card from '../Card/card'
import { BookOpen, ArrowRight } from 'lucide-react'
import { ArrowRightSolid } from '@/components/homepage-icons/icons'
import TrackingLink from '@/components/TrackingLink'
import KeyIcon from '@/public/img/index_features/key.svg'
import FutureIcon from '@/public/img/index_features/future.svg'
import CasesIcon from '@/public/img/index_features/cases.svg'
import EasyToUseIcon from '@/public/img/index_features/easy-to-use.svg'
import Image from 'next/image'
import featureGraphicOtel from '@/public/img/graphics/homepage/feature-graphic-otel.svg?url'
import { cn } from '../../app/lib/utils'

const REASONS = [
  {
    title: 'No vendor lock-in',
    desc: 'Get free of vendor-based agents inside your codebase.',
    logo: <KeyIcon className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: 'Futureproof',
    desc: "OpenTelemetry's extensibility ensures support for any evolving technologies.",
    logo: <FutureIcon className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: 'Covers all use-cases',
    desc: 'OpenTelemetry is a one-stop solution for all your telemetry needs. Generate logs, metrics, and traces with one SDK.',
    logo: <CasesIcon className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: 'Standardize Observability',
    desc: 'A single standard for all telemetry signals means increased developer productivity, consistency across teams.',
    logo: <EasyToUseIcon className="h-6 w-6" aria-hidden="true" />,
  },
]

export const WhyOpenTelemetry = ({ className }: { className?: string }) => {
  return (
    <>
      <section
        className={cn(
          'max-w-8xl border-border mx-auto w-full border !border-t-0 !border-b-0 border-dashed',
          className
        )}
      >
        <div className="bg-blur-ellipse-207 container">
          <div className="grid place-items-center py-8 text-center md:py-28">
            <p className="text-muted-foreground text-center text-sm font-medium tracking-[.05em] uppercase">
              SigNoz is OpenTelemetry-Native
            </p>
            <p className="text-sakura-100 text-3xl leading-[3.5rem] font-semibold sm:text-4xl">
              But why OpenTelemetry?
            </p>
            <p className="text-l1-foreground text-center text-xs font-medium sm:text-base">
              OpenTelemetry is the second most active project in the CNCF, with only&nbsp;
              <br className="hidden lg:inline" />
              Kubernetes being more active.
            </p>
            <TrackingLink
              href="/opentelemetry/#why-developers-choose-opentelemetry"
              clickType="Secondary CTA"
              clickName="Why Developers choose OpenTelemetry Link"
              clickText="Learn why Developers choose OpenTelemetry"
              clickLocation="Why OpenTelemetry Section"
              className="border-l2-border bg-muted text-foreground mt-3 mb-3 flex h-10 items-center justify-center gap-1.5 rounded-full border px-4 py-2 text-[10px] leading-5 font-medium shadow-[0_0_20px_0_rgba(242,71,105,0.20)] sm:text-sm"
            >
              <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              Learn why Developers choose OpenTelemetry
              <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </TrackingLink>
          </div>
        </div>
      </section>
      <div
        className={cn(
          'max-w-8xl border-border mx-auto grid w-full grid-cols-1 border !border-t-0 !border-b-0 !border-l-0 border-dashed sm:grid-cols-2',
          className
        )}
      >
        {REASONS.map((section) => (
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
      <section
        className={cn('max-w-8xl border-border mx-auto w-full border border-dashed', className)}
      >
        <div className="mb-16 px-0">
          <div className="grid gap-9 p-9">
            <div className="flex flex-col items-center gap-8 lg:flex-row">
              <div className="min-w-0">
                <p className="text-l1-foreground text-2xl font-semibold">
                  {' '}
                  SigNoz is built from the ground up for OpenTelemetry
                </p>

                <p className="text-muted-foreground my-3 text-base leading-9 font-normal md:max-w-[min(42rem,90%)]">
                  SigNoz offers the best in class support for OpenTelemetry{"'"}s semantic
                  conventions with the best visualizations ⎯ powered by our powerful ingestion
                  engine.
                </p>
                <ul className="ul-no-padding mt-8 md:mt-0">
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
                    <span>
                      Messaging queue monitoring based on OTel{"'"}s trace & metric{"'"}s data
                    </span>
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
              <div className="mx-auto mb-6 shrink-0 sm:h-[300px] 2xl:block">
                <Image
                  className="h-full w-full"
                  src={featureGraphicOtel}
                  alt="Illustration showing SigNoz built on top of OpenTelemetry"
                  width={449}
                  height={352}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <TrackingLink
              href="https://signoz.io/blog/is-opentelemetry-a-first-class-citizen-in-your-dashboard-a-datadog-and-newrelic-comparison/"
              className="border-border bg-card rounded border p-4"
              target="_blank"
              clickType="Nav Click"
              clickName="OpenTelemetry Blog Link"
              clickText="Comparing Datadog and New Relic's support for OpenTelemetry data"
              clickLocation="Why OpenTelemetry Section"
            >
              <p className="text-l1-foreground mb-2 text-base font-medium">
                Comparing Datadog and New Relic's support for OpenTelemetry data
              </p>
              <p className="text-muted-foreground m-0 text-sm leading-9 font-normal">
                Walk through how native OpenTelemetry tools compare to APM products that have
                adopted OpenTelemetry only partially.
              </p>
            </TrackingLink>
          </div>
        </div>
      </section>
      <div
        className={cn(
          'max-w-8xl border-border mx-auto h-12 w-full border !border-t-0 !border-b-0 border-dashed',
          className
        )}
      />
    </>
  )
}
