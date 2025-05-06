'use client'

import React from 'react'
import { TrustedByTeams } from '@/components/trusted-by'
import { ArrowRight, Check, CheckCircle, CircleArrowRight } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Button from '@/components/Button/Button'
import Image from 'next/image'

const EnterprisePricing = dynamic(() => import('@/components/EnterprisePricing'), {
  ssr: false,
})

const GetStartedEnterprise = dynamic(
  () => import('@/components/GetStartedEnterprise').then((mod) => mod.GetStartedEnterprise),
  {
    ssr: false,
  }
)

const icons = [
  { src: '/img/index_features/bar-chart-2.svg', label: 'Metrics' },
  { src: '/img/index_features/drafting-compass.svg', label: 'Traces' },
  { src: '/img/index_features/logs.svg', label: 'Logs' },
  { src: '/img/index_features/layout-grid.svg', label: 'Dashboards' },
  { src: '/img/index_features/bug.svg', label: 'Errors' },
  { src: '/img/index_features/concierge-bell.svg', label: 'Alerts' },
]

export default function Enterprise() {
  return (
    <div className="relative mt-[-56px] bg-signoz_ink-500 ">
      <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
      <div className="absolute left-0 right-0 top-0 mx-auto h-[450px] w-full  flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />
      <main className="landing-section relative z-[1]">
        <div className="relative mt-16 w-full overflow-hidden border-b border-dashed border-signoz_slate-400">
          <header className="relative overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 top-0 z-[-1]" />
            <div className="relative !mx-auto flex w-[90%] flex-col items-start px-4 py-12 text-center md:px-[120px] md:py-24">
              <div className="flex w-full flex-row items-start px-0 md:px-16">
                <div className="flex flex-1 flex-col items-start">
                  <div className="text-sm uppercase text-signoz_sakura-400">Enterprise</div>
                  <div className="mt-3 text-left text-xl font-bold md:text-2xl">
                    SigNoz for Enterprise
                  </div>

                  <div className="mt-4 whitespace-normal text-left text-sm font-light">
                    Suited for larger organisations with advanced security,
                  </div>

                  <div className="mb-4 mt-1 whitespace-normal text-left text-sm font-light">
                    compliance and support requirements.
                  </div>

                  <Button id="btn-get-started-homepage-hero" className="mt-4">
                    <a href="#enterprise-plans" className="flex-center">
                      Check Enterprise plans
                      <ArrowRight size={14} />
                    </a>
                  </Button>
                </div>

                <div className="hidden flex-1 flex-col items-start md:flex">
                  <div className="absolute right-[172px] top-0">
                    <Image
                      src="/svgs/enterprise/hero.svg"
                      alt="enterprise-hero-section"
                      width={272}
                      height={305}
                    />
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
        <div className="border-dashed-container !border-t-0">
          <div className="flex w-full flex-col items-start px-8 py-8 md:px-16 md:py-16">
            <div className="text-sm uppercase text-signoz_vanilla-400">why enterprise?</div>
            <p className="mt-3 max-w-full whitespace-normal text-left text-lg font-bold md:text-2xl">
              With SigNoz Enterprise, you get unmatched scale and flexibility ⎯ along with advanced
              security, compliance, and support
            </p>

            <div className="mt-12 flex w-[70%] flex-row items-start">
              <div className="flex-1">
                <p className="text-md flex flex-row items-center gap-2 font-normal">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />{' '}
                  Volume discounts
                </p>
                <p className="text-md flex flex-row items-center gap-2 font-normal">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />{' '}
                  Dedicated support
                </p>
                <p className="text-md flex flex-row items-center gap-2 font-normal">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />{' '}
                  Personalized onboarding
                </p>
                <p className="text-md flex flex-row items-center gap-2 font-normal">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />{' '}
                  Multi-year commitment
                </p>
                <p className="text-md flex flex-row items-center gap-2 font-normal">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />{' '}
                  Advanced security & compliance
                </p>
              </div>

              <div className="flex-1">
                <p className="text-md flex flex-row items-center gap-2 font-normal">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />{' '}
                  Cost controls with Ingest Guard
                </p>
                <p className="text-md flex flex-row items-center gap-2 font-normal">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />{' '}
                  Finer RBAC and ingestion controls
                </p>
              </div>
            </div>
          </div>
        </div>
        <TrustedByTeams page="enterprise" />
        <div
          className="border-dashed-container enterprise-plans flex flex-col !items-center !justify-center px-8 py-16"
          id="enterprise-plans"
        >
          <div className="mt-3 text-5xl font-bold">Enterprise Plans</div>

          <div className="mt-4 whitespace-normal text-center text-sm font-light">
            We currently offer 3 Enterprise plans for Data Privacy and Flexible Deployment options.
          </div>
        </div>

        {/* Enterprise Cloud */}
        <div className="border-dashed-container flex flex-row">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <div className="flex-1 flex-col items-start border-b-1 border-r-0 border-dashed border-signoz_slate-300 px-8 py-8 md:border-b-0 md:border-r md:border-dashed">
              <div className="mt-3 text-xl font-bold">Enterprise Cloud</div>

              <div className="mt-4 text-lg font-normal">
                For larger orgs with advanced security, compliance and support.
                <br />
                &nbsp;
              </div>

              <div className="mt-9">
                <p className="text-md flex flex-row items-start gap-2 font-normal">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />{' '}
                  Select data region in United States, Europe & India region based on your
                  requirements.
                </p>

                <p className="text-md flex flex-row items-center gap-2 font-normal">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" /> Get
                  discounted custom pricing based on volume.
                </p>

                <p className="text-md flex flex-row items-center gap-2 font-normal">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />{' '}
                  Custom retention for your data
                </p>
              </div>

              <div className="relative mt-9 flex w-full items-center justify-center gap-2">
                <div className="h-2 w-[33%] border !border-l-0 !border-r-0 !border-dashed !border-signoz_slate-300" />
                <div className="relative z-10 text-sm font-normal uppercase">
                  starts at $4000 / month
                </div>
                <div className="h-2 w-[33%] border !border-l-0 !border-r-0 !border-dashed !border-signoz_slate-300" />
              </div>

              <Button
                type={Button.TYPES.SECONDARY}
                className="button-background mt-9 flex h-10 w-full items-center justify-center gap-1.5 rounded-full px-4 py-2 pl-4 pr-3 text-center text-sm font-medium leading-5 text-white no-underline outline-none hover:text-white"
              >
                <Link href="/enterprise-cloud" className="flex-center">
                  Contact us
                  <ArrowRight size={14} />
                </Link>
              </Button>
            </div>

            <div className="relative flex-1 flex-col items-start px-8 py-8">
              <div className="mt-3 text-xl font-bold">Enterprise Self-Hosted</div>

              <div className="mt-4 text-lg font-normal">
                Self-Host with support contract from SigNoz Team. Run SigNoz in your infrastructure
                and get support from SigNoz team.
              </div>

              <div className="mt-9">
                <p className="text-md flex flex-row items-start gap-2 font-normal">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />{' '}
                  Email and dedicated Slack support.
                </p>

                <p className="text-md flex flex-row items-center gap-2 font-normal">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" /> Get
                  Instrumentation Support
                </p>

                <p className="text-md flex flex-row items-center gap-2 font-normal">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />{' '}
                  Dashboard Configuration Support
                </p>

                <p className="text-md flex flex-row items-center gap-2 font-normal">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />{' '}
                  Team Training
                </p>
              </div>

              <Button
                type={Button.TYPES.SECONDARY}
                className="button-background mt-9 flex h-10 w-full items-center justify-center gap-1.5 rounded-full px-4 py-2 pl-4 pr-3 text-center text-sm font-medium leading-5 text-white no-underline outline-none hover:text-white"
              >
                <Link href="/enterprise-self-hosted" className="flex-center">
                  Contact us
                  <ArrowRight size={14} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Bring your own cloud */}
        <div className="border-dashed-container flex flex-row">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <div className="flex-1 flex-col items-start px-8 py-8">
              <div className="mt-3 text-xl font-bold">Bring your own cloud</div>

              <p className="text-md mt-4 font-normal">
                Managed by SigNoz in your cloud. Let the SigNoz team run SigNoz in your cloud
                infrastruture.
              </p>

              <p className="text-md mt-4 whitespace-pre-wrap font-normal">
                The main difference between BYOC and Enterprise Self-hosted is that in BYOC, our
                team is fully responsible for running SigNoz in your cloud, while in enterprise
                self-hosted we provide support for running SigNoz in your infrastrucure.
              </p>

              <Button
                type={Button.TYPES.SECONDARY}
                className="button-background mt-9 flex h-10 w-full items-center justify-center gap-1.5 rounded-full px-4 py-2 pl-4 pr-3 text-center text-sm font-medium leading-5 text-white no-underline outline-none hover:text-white"
              >
                <Link href="/enterprise-self-hosted" className="flex-center">
                  Contact us
                  <ArrowRight size={14} />
                </Link>
              </Button>
            </div>

            <div className="order-first mx-16 my-8 flex flex-1 items-center justify-end md:order-last">
              <Image
                src="/svgs/enterprise/byoc.svg"
                alt="bring-your-own-cloud"
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>

        <section className="mx-auto w-[100vw] border !border-b-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw] ">
          <div className={`container`}>
            <div className="flex flex-col py-20">
              <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                <div className="text-4xl font-bold leading-[3.25rem] text-signoz_sienna-100">
                  Why choose SigNoz Enterprise?
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Unified Observability ⎯ Built for Increased Developer Productivity */}
        <div className="border-dashed-container flex flex-row">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <div className="flex-1 flex-col items-start px-8 py-8">
              <div className="mt-3 text-xl font-bold">
                Unified Observability ⎯ Built for Increased Developer Productivity
              </div>

              <p className="text-md mt-4 font-normal">
                Consolidate your monitoring tools and use SigNoz for logs, metrics, and traces under
                a single pane of glass.
              </p>

              <div className="mt-9">
                <p className="text-md flex flex-row items-start gap-2 font-normal">
                  <CircleArrowRight size={36} className="fill-signoz_robin-500" color="black" />{' '}
                  Reduce your MTTR significantly using correlated signals. Get better context while
                  troubleshooting performance issues.
                </p>

                <p className="text-md flex flex-row items-center gap-2 font-normal">
                  <CircleArrowRight size={36} className="fill-signoz_robin-500" color="black" />{' '}
                  Increase developer productivity by removing siloed monitoring tools. Train your
                  dev & SRE teams on a single tool and get quick ROI.
                </p>

                <p className="text-md flex flex-row items-center gap-2 font-normal">
                  <CircleArrowRight size={36} className="fill-signoz_robin-500" color="black" />{' '}
                  Built on top of OpenTelemetry, use a single open standard inside your codebase
                  while creating a time-proof knowledge base.
                </p>
                <p className="text-md flex flex-row items-center gap-2 font-normal">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" /> Use
                  OpenTelemetry as single open-source standard to generate telemetry data across
                  teams.
                </p>
              </div>
            </div>

            <div className="order-first mx-16 my-8 flex flex-1 items-start justify-end md:order-last">
              <Image
                src="/svgs/enterprise/unified-observability.svg"
                alt="unified-observability"
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
        {/* Columnar Datastore for Handling Ingestion & Querying at scale */}
        <div className="border-dashed-container flex flex-row">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <div className="mx-8 my-8 flex flex-1 items-start justify-start">
              <Image
                src="/svgs/enterprise/columnar-db.svg"
                alt="columnar-db"
                width={460}
                height={460}
              />
            </div>

            <div className="flex-1 flex-col items-start px-8 py-8">
              <div className="mt-3 text-xl font-bold">
                Columnar Datastore for Handling Ingestion & Querying at scale
              </div>

              <p className="text-md mt-4 font-normal">
                Observability data can scale up quickly, and SigNoz is equipped to handle data at
                any scale.
              </p>

              <div className="mt-9 flex flex-col gap-4">
                <div className="flex flex-row items-start gap-4">
                  <CircleArrowRight size={36} className="fill-signoz_robin-500" color="black" />{' '}
                  <div className="font-normal">
                    Powered by ClickHouse (used by likes of{' '}
                    <a
                      href="https://www.uber.com/en-IN/blog/logging/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Uber
                    </a>{' '}
                    and{' '}
                    <a
                      href="https://blog.cloudflare.com/log-analytics-using-clickhouse/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Cloudflare
                    </a>
                    ) - an extremely performant and highly optimized storage for observability data.
                  </div>
                </div>

                <div className="flex flex-row items-start gap-4">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />{' '}
                  <div className="font-normal">
                    Our powerful ingestion engine has a proven track record of handling 10TB+ data
                    ingestion per day.
                  </div>
                </div>

                <div className="flex flex-row items-start gap-4">
                  <CircleArrowRight size={36} className="fill-signoz_robin-500" color="black" />{' '}
                  <div className="font-normal">
                    Lightning fast queries at any scale - query telemetry data with
                    high-cardinality, perform complex aggregations across any attribute to get
                    better insights.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Engineered for limitless growth */}
        <div className="border-dashed-container flex flex-row">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <div className="flex-1 flex-col items-start px-8 py-8">
              <div className="mt-3 text-xl font-bold">Engineered for limitless growth</div>

              <p className="text-md mt-4 font-normal">
                SigNoz leverages modern distributed system principles so that you don't have to!
                Seamlessly scale your observability alongside your enterprise ecosystem.
              </p>

              <div className="mt-9 flex flex-col gap-4">
                <div className="flex flex-row items-start gap-4">
                  <CircleArrowRight size={36} className="fill-signoz_robin-500" color="black" />

                  <div className="font-normal">
                    Unlock comprehensive visibility across your entire stack with unrestricted
                    trace, metric and log ingestion capabilities that eliminate monitoring blind
                    spots.
                  </div>
                </div>

                <div className="flex flex-row items-start gap-4">
                  <CircleArrowRight size={36} className="fill-signoz_robin-500" color="black" />

                  <div className="font-normal">
                    Reduce TCO by leveraging Ingest Guard and eliminating the burden of maintaining
                    complex monitoring infrastructure and dedicated operations teams.
                  </div>
                </div>

                <div className="flex flex-row items-start gap-4">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />

                  <div className="font-normal">
                    Consolidate your mission-critical telemetry data in a unified, enterprise-grade
                    cluster architecture.
                  </div>
                </div>
              </div>
            </div>

            <div className="order-first mx-16 my-8 flex flex-1 items-center justify-end md:order-last">
              <Image
                src="/svgs/enterprise/limitless-growth.svg"
                alt="limitless-growth"
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
        {/* Enterprise-Grade Security, Privacy & Compliance */}
        <div className="border-dashed-container flex flex-row">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <div className="mx-8 my-8 flex flex-1 flex-col items-center justify-start">
              <div className="flex items-start justify-start">
                <Image
                  src="/svgs/enterprise/security.svg"
                  alt="columnar-db"
                  width={300}
                  height={300}
                />
              </div>

              <div className="mt-16 flex flex-col gap-4">
                <div className="flex flex-row items-center gap-16">
                  <div className="flex flex-row items-center gap-2 font-mono text-sm">
                    <CheckCircle size={24} className="fill-signoz_sakura-500" color="black" />
                    SOC 2 Type II
                  </div>
                  <div className="flex flex-row items-center gap-2 font-mono text-sm">
                    <CheckCircle size={24} className="fill-signoz_sakura-500" color="black" />
                    HIPAA Compliant
                  </div>
                </div>

                <div className="flex flex-row gap-4">
                  <div className="flex flex-row items-center gap-2 font-mono text-sm">
                    <CheckCircle size={24} className="fill-signoz_sakura-500" color="black" />
                    BAA Agreement
                    <div className="rounded-full bg-signoz_slate-400 px-2 text-[8px] text-white">
                      ADD-ON
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 flex-col items-start px-8 py-8">
              <div className="mt-3 text-xl font-bold">
                Enterprise-Grade Security, Privacy & Compliance
              </div>

              <div className="mt-9 flex flex-col gap-4">
                <div className="flex flex-row items-start gap-4">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />{' '}
                  <div className="font-normal">
                    Secure your data with state-of-the-art architecture and encryption at rest and
                    in transit.
                  </div>
                </div>

                <div className="flex flex-row items-start gap-4">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />{' '}
                  <div className="font-normal">
                    Control data access with role-based access control (RBAC).
                  </div>
                </div>

                <div className="flex flex-row items-start gap-4">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />{' '}
                  <div className="font-normal">
                    Automated data deletion based on your retention policies ensures data hygiene.
                  </div>
                </div>
              </div>

              <Button
                type={Button.TYPES.SECONDARY}
                className="button-background mt-9 flex h-10 w-full items-center justify-center gap-1.5 rounded-full px-4 py-2 pl-4 pr-3 text-center text-sm font-medium leading-5 text-white no-underline outline-none hover:text-white"
              >
                <Link href="https://trust.signoz.io/" target="_blank" className="flex-center">
                  Visit Trust Center
                  <ArrowRight size={14} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Observability built on Open-Standards */}
        <div className="border-dashed-container flex flex-row">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <div className="flex-1 flex-col items-start px-8 py-8">
              <div className="mt-3 text-xl font-bold">Observability built on Open-Standards</div>

              <p className="text-md mt-4 font-normal">
                SigNoz is built from the ground up for OpenTelemetry. Get free from vendor lock-in
                and future proof your instrumentation.
              </p>

              <div className="mt-9 flex flex-col gap-4">
                <div className="flex flex-row items-start gap-4">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />

                  <div className="font-normal">
                    Stay free from vendor-based proprietary agents inside your codebase.
                  </div>
                </div>

                <div className="flex flex-row items-start gap-4">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />

                  <div className="font-normal">
                    Future-proof your instrumentation with open-source standards.
                  </div>
                </div>

                <div className="flex flex-row items-start gap-4">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />

                  <div className="font-normal">
                    Standardize observability with a single standard for all telemetry signals.
                  </div>
                </div>

                <div className="flex flex-row items-start gap-4">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />

                  <div className="font-normal">
                    Compatibility with other open source standards like Prometheus, OpenFeature,
                    OpenTracing, etc.
                  </div>
                </div>
              </div>
            </div>

            <div className="order-first mx-16 my-8 flex flex-1 items-center justify-end md:order-last">
              <Image src="/svgs/enterprise/otel.svg" alt="otel" width={400} height={400} />
            </div>
          </div>
        </div>

        {/* Enterprise Support & Professional Services */}
        <div className="border-dashed-container flex flex-row">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <div className="flex-1 flex-col items-start px-8 py-8">
              <div className="mt-3 text-xl font-bold">
                Enterprise Support & Professional Services
              </div>

              <p className="text-md mt-4 font-normal">
                We provide professional services and dedicated support for our enterprise customers.
              </p>

              <div className="mt-9 flex flex-col gap-4">
                <div className="flex flex-row items-start gap-4">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />

                  <div className="font-normal">Get dedicated slack channel for support.</div>
                </div>

                <div className="flex flex-row items-start gap-4">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />

                  <div className="font-normal">
                    Migration support from existing monitoring tools.
                  </div>
                </div>

                <div className="flex flex-row items-start gap-4">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />

                  <div className="font-normal">Team training for optimized platform usage.</div>
                </div>

                <div className="flex flex-row items-start gap-4">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />

                  <div className="font-normal">Dashboards & alerts configuration support.</div>
                </div>

                <div className="flex flex-row items-start gap-4">
                  <CircleArrowRight size={24} className="fill-signoz_robin-500" color="black" />

                  <div className="font-normal">SLA with downtime developer pairing</div>
                </div>
              </div>
            </div>

            <div className="order-first mx-16 my-8 flex flex-1 items-start justify-end md:order-last">
              <Image
                src="/svgs/enterprise/enterprise-support.svg"
                alt="enterprise-support"
                width={300}
                height={200}
              />
            </div>
          </div>
        </div>
        <EnterprisePricing />

        <GetStartedEnterprise />
      </main>
    </div>
  )
}
