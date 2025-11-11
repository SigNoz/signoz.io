'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Server, Link as LinkIcon, ArrowDown } from 'lucide-react'
import Button from '@/components/Button/Button'
import Figure from '@/components/Figure/Figure'
import FloatingTableOfContents from '@/components/TableOfContents/FloatingTableOfContents'


interface ReasonSectionProps {
  id: string
  number: string
  title: string
  children: React.ReactNode
  image?: string
  imageAlt?: string
  imageCaption?: string
}

const ReasonSection: React.FC<ReasonSectionProps> = ({ id, number, title, children, image, imageAlt, imageCaption }) => {
  return (
    <section id={id} className="py-8 sm:py-16">
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex items-baseline gap-2 sm:gap-4 mb-4 sm:mb-6">
          <span className="text-xl sm:text-2xl font-bold text-green-400">{number}</span>
          <h3 className="group relative text-2xl sm:text-3xl font-bold text-white">
            <Link href={`#${id}`} className="flex items-center hover:text-gray-300">
              <LinkIcon className="hidden sm:block absolute -left-20 h-5 w-5 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
              {title}
            </Link>
          </h3>
        </div>
        <div className="relative">
          {image && (
            <div className="w-full sm:float-right sm:ml-8 sm:mb-8 mb-6 sm:w-1/2">
              <Figure
                src={image}
                alt={imageAlt || `${title} - OpenTelemetry with SigNoz`}
                caption={imageCaption || title}
              />
            </div>
          )}
          <div className="text-gray-300 space-y-4">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}

const WhyOpenTelemetry: React.FC = () => {
  return (
    <div className="relative bg-[#0A0A0A]">
      <FloatingTableOfContents />
      {/* Hero + Intro Section */}
      <section className="relative">
        {/* Hero Section */}
        <div className="relative bg-[#0A0A0A] py-8 sm:py-16">
          <div className="bg-dot-pattern masked-dots absolute top-0 flex h-full w-full items-center justify-center" />
          
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h1 className="group relative mb-4 sm:mb-6 bg-gradient-to-r from-blue-200 to-purple-400 bg-clip-text text-3xl sm:text-4xl font-bold leading-[1.3] text-transparent lg:text-6xl lg:leading-[1.3]" id="introduction">
                <Link href="#introduction" className="flex items-center hover:text-gray-300">
                  <LinkIcon className="hidden sm:block absolute -left-8 h-6 w-6 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  Why OpenTelemetry?
                </Link>
              </h1>
              <p className="mb-6 sm:mb-8 text-base sm:text-lg font-normal text-gray-300 lg:text-xl">
                OpenTelemetry is the second-largest CNCF project by number of contributors and after almost half a decade since its inception, it has been widely adopted by engineering teams of all shapes & sizes to build resilient applications.
              </p>
              <p className="mb-6 sm:mb-8 text-base sm:text-lg font-normal text-gray-300 lg:text-xl">
                You can get started immediately with OpenTelemetry by signing up for SigNoz cloud. We have an onboarding module that will help you instrument your application with OpenTelemetry and send data to SigNoz for visualization.
              </p>
              <div>
                <Link href="/teams/">
                  <Button className="w-full sm:w-auto flex items-center justify-center gap-2 font-bold">
                    Start Using OpenTelemetry <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="group relative mb-6 sm:mb-8 text-3xl sm:text-4xl font-bold text-white lg:text-5xl" id="top-reasons">
              <Link href="#top-reasons" className="flex items-center hover:text-gray-300">
                <LinkIcon className="hidden sm:block absolute -left-8 h-6 w-6 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
                Top Reasons to Use OpenTelemetry
              </Link>
            </h2>
            <p className="text-base sm:text-lg text-gray-300">
              Whether you're starting your observability journey or have things in place already, you can use OpenTelemetry. It enables its users to use the same underlying instrumentation, data format, and wire protocol regardless of any observability backend you use.
            </p>
          </div>
        </div>
      </section>

      {/* Reason Sections */}
      <ReasonSection
        id="vendor-lock-in"
        number="01"
        title="Get free from vendor lock-in"
      >
        <p>
          By using OpenTelemetry SDKs with your application code, you can break free of any kind of proprietary vendor agents in your code. For robust observability, users need custom integrations. If you are using a vendor agent, you run the risk of getting too tightly coupled with the vendor. In case of things like a sudden change in billing practices, you can't migrate quickly.
        </p>
        <p>
          But if you're using OpenTelemetry, changing vendors can be as simple as changing the configuration for your exporters. You can send your telemetry data to any <Link target="_blank" href="https://signoz.io/blog/opentelemetry-backend/" className="text-blue-400 hover:text-blue-300 underline">OpenTelemetry-compatible backends</Link>.
        </p>
      </ReasonSection>

      <ReasonSection
        id="single-standard"
        number="02"
        title="Have a single standard source for all your telemetry needs"
        image="/img/why-opentelemetry/signoz-apm.webp"
        imageAlt="OpenTelemetry APM metrics correlation with logs and traces in SigNoz"
        imageCaption="With data from an OpenTelemetry instrumented application, SigNoz allows you to correlate APM metrics with other signals like logs and traces"
      >
        <p>
          OpenTelemetry is built to take care of all your observability needs. It can generate all kinds of telemetry signals - logs, metrics, and traces. Having a single source for all your telemetry needs has advantages like less overhead, consistent data formats across signals, less learning curve, etc.
        </p>
        <p>
          The biggest advantage of using OpenTelemetry as a single source comes with having access to much better context while troubleshooting that comes with the correlation of signals.
        </p>
        <p>
          In SigNoz, users can quickly go from application metrics to related logs and traces with data from OpenTelemetry instrumented applications.
        </p>
      </ReasonSection>

      <ReasonSection
        id="semantic-conventions"
        number="03"
        title="Semantic conventions ensure consistency in the data layer"
        image="/img/why-opentelemetry/signoz-hostmetrics.webp"
        imageAlt="OpenTelemetry host metrics, logs, and traces visualization in SigNoz"
        imageCaption="Powered by OpenTelemetry, SigNoz lets you view a host's metrics, logs, and traces in a single pane."
      >
        <p>
          Semantic conventions define a common set of attributes that ensure consistent data labeling across different signals - even those produced by different databases, cloud providers, and frameworks. Many engineering teams struggle to work constantly on standardizing data coming from different sources.
        </p>
        <p>
          Semantic conventions of OpenTelemetry ensure standardized data formats that can integrate and interoperate with various tools.
        </p>
        <p>
          If you instrument your application with OpenTelemetry SDKs and collect infrastructure metrics from your infra (VMs/containers/k8s env) with <Link target="_blank" href="https://signoz.io/blog/opentelemetry-collector-complete-guide/" className="text-blue-400 hover:text-blue-300 underline">OpenTelemetry Collector</Link>, you can correlate all signals for more context while troubleshooting.
        </p>
      </ReasonSection>

      <ReasonSection
        id="otel-collector"
        number="04"
        title="Use OpenTelemetry Collector as your Swiss Army knife"
      >
        <p>
          OpenTelemetry collector is a versatile tool for managing telemetry data efficiently. It acts as the data processing centre for your telemetry data. You can receive and export data in multiple data formats like OTLP, Jaeger, or Prometheus.
        </p>
        <p>
          The collector also comes bundled with processors to process your telemetry data before exporting it to a backend. You can do useful things like sampling, scrubbing off PII data, etc., with the help of the collector.
        </p>
      </ReasonSection>

      <ReasonSection
        id="train-engineers"
        number="05"
        title="Train your engineers on a single standard"
      >
        <p>
          Having an open-source standard in your engineering organization helps build up a consistent knowledge base. Training your engineers on an open-source standard has better ROI compared to training engineers on proprietary tools.
        </p>
        <p>
          You can build upon your knowledge base without worrying about changing the technology. With the increased adoption of OpenTelemetry, you can also expect new engineering hires to be trained in OpenTelemetry already.
        </p>
      </ReasonSection>

      <ReasonSection
        id="growing-support"
        number="06"
        title="Growing Instrumentation support with open-source libraries"
      >
        <p>
          The ultimate aim of OpenTelemetry is to have "built-in" telemetry where software emits high-quality, ubiquitous, rich telemetry without developers having to do anything. Many high-profile open-source software have already incorporated OpenTelemetry-compatible telemetry data by default.
        </p>
        <p>
          For example, <Link href="https://github.com/apache/airflow/issues/37752" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Apache Airflow has integrated support for OpenTelemetry metrics and traces</Link>. Similarly, popular authors of popular Python frameworks like Falcon are <Link href="https://github.com/falconry/falcon/issues/1828" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">discussing</Link> introducing support for built-in telemetry data generated by OpenTelemetry.
        </p>
      </ReasonSection>

      <ReasonSection
        id="dev-tools"
        number="07"
        title="Compatibility with new-age Dev Tools"
      >
        <p>
          New-age developer tools like Tracetest are being built on OpenTelemetry for critical developer workflows like testing. Having standard telemetry data will lead to an open ecosystem for innovation where more tooling will come out to build resilient applications.
        </p>
        <p>
          If you are using OpenTelemetry for your applications, you can easily send data to any of these tools with some minor configurations.
        </p>
      </ReasonSection>

      <ReasonSection
        id="future-proof"
        number="08"
        title="Future-proof your observability"
      >
        <p>
          OpenTelemetry enables application owners to have context-rich, consistent telemetry data from their applications and infrastructure. By using OpenTelemetry, you can future-proof your data layer by not changing technology while changing observability vendors.
        </p>
        <p>
          With its adoption in popular open-source libraries as the choice of built-in telemetry, you are also future-proofing your observability stack. Whether you are starting out or using something already, now is the right time to start using OpenTelemetry.
        </p>
      </ReasonSection>

      {/* Get Started Section */}
      <section className="py-8 sm:py-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="group relative mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold text-white" id="get-started">
              <Link href="#get-started" className="flex items-center hover:text-gray-300">
                <LinkIcon className="hidden sm:block absolute -left-8 h-6 w-6 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
                Get Started with OpenTelemetry
              </Link>
            </h2>
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-gray-300">
                You can follow these docs to get started with OpenTelemetry:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>
                  <Link href="/docs/instrumentation/" className="text-blue-400 hover:text-blue-300">
                    Send Traces with OpenTelemetry
                  </Link>
                </li>
                <li>
                  <Link href="/docs/infrastructure-monitoring/overview/" className="text-blue-400 hover:text-blue-300">
                    Infrastructure Monitoring with OpenTelemetry
                  </Link>
                </li>
                <li>
                  <Link href="/docs/userguide/collect_kubernetes_pod_logs/" className="text-blue-400 hover:text-blue-300">
                    Send Logs with OpenTelemetry
                  </Link>
                </li>
              </ul>
              <p className="text-base sm:text-lg text-gray-300">
                You need an observability backend to send your OpenTelemetry data to. We have built SigNoz from the ground up on top of OpenTelemetry. SigNoz provides logs, metrics, and traces under a single pane of glass and provides the best-in-class visualization for OpenTelemetry data.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/teams/" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto flex items-center justify-center gap-2 font-bold">
                    Start your free trial <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/docs/install/self-host/" className="w-full sm:w-auto">
                  <Button type={Button.TYPES.SECONDARY} className="w-full sm:w-auto flex items-center justify-center gap-2 font-bold">
                    <Server className="h-4 w-4" />
                    Self-Host SigNoz
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WhyOpenTelemetry 
