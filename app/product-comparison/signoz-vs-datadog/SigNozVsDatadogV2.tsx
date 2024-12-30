'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import GetStartedSigNoz from '@/components/GetStartedSigNoz/GetStartedSigNoz'
import Button from '@/components/Button/Button'
import { ArrowRight, BookOpen } from 'lucide-react'
import {
  LineChart,
  DraftingCompass,
  ScrollText,
  ArrowDownCircle,
  Users,
  Gauge,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'
import { ChartBar, GitBranch, FileText } from 'lucide-react'
import Figure from '@/components/Figure/Figure'

const SigNozVsDatadogV2 = () => {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A]">
      <div className="bg-dot-pattern masked-dots absolute top-0 flex h-full w-full items-center justify-center" />
      <div className="absolute left-0 right-0 top-0 mx-auto h-[300px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:h-[450px] sm:bg-[center_-500px] md:h-[956px]" />
      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:pt-32">
        {/* Hero Section */}
        <section className="container mx-auto mb-10 flex flex-col items-center justify-between lg:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-10 lg:mb-0 lg:w-2/5"
          >
            <h1 className="mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-5xl font-bold text-transparent lg:text-6xl">
              SigNoz vs Datadog
            </h1>
            <h3 className="mb-8 text-lg font-semibold text-gray-300 lg:text-xl">
              For 20 APM and 50 infra hosts, SigNoz can save up to 80% of your Datadog bill - check
              check comparison with{' '}
              <Link
                href="https://signoz.io/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/"
                className="text-blue-400 hover:text-blue-300"
              >
                detailed spreadsheet
              </Link>
              .
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <Link href="/teams/">
                  <Button className="flex items-center justify-center gap-2 font-bold">
                    Get Started - Free <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/product-comparison/datadog-savings/">
                  <Button
                    type={Button.TYPES.SECONDARY}
                    className="flex items-center justify-center gap-2 font-bold"
                  >
                    <FileText className="h-4 w-4" />
                    Send your bill for comparison
                  </Button>
                </Link>
              </div>
              <div className="ml-2 flex flex-col gap-1">
                <p className="mb-0 flex items-center gap-1 text-sm text-gray-400">
                  <CheckCircle className="h-3.5 w-3.5" />
                  No credit card required
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative lg:-right-8 lg:w-3/5"
          >
            <div className="overflow-hidden rounded-xl shadow-2xl">
              <video autoPlay muted loop className="lg:w-[120%]">
                <source src="/img/unified-observability/showcase.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </section>

        {/* Migration Section */}
        <section className="mx-auto max-w-4xl rounded-xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 px-6 py-12">
          <h3 className="mb-8 text-left text-xl font-bold lg:text-2xl">
            Migrate from Datadog - Save up to 80% on your Datadog bill
          </h3>
          <div className="text-gray-300">
            <p className="mb-6 text-lg">
              We provide support for migrating from Datadog to SigNoz if your monthly billing in
              Datadog is greater than 2000 USD. Request a migration from one of our experts and get
              started with SigNoz quickly.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="https://signoz.io/product-comparison/migrate-from-datadog/"
                className="block max-w-md"
              >
                <Button className="flex w-full items-center justify-center gap-2 font-bold">
                  Request migration support <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link
                href="https://signoz.io/docs/migration/migrate-from-datadog/"
                className="block max-w-md"
              >
                <Button
                  type={Button.TYPES.SECONDARY}
                  className="flex w-full items-center justify-center gap-2 font-bold"
                >
                  <BookOpen className="h-4 w-4" />
                  Docs on migrating from Datadog
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why do Engineering Teams Choose SigNoz over Datadog? */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="flex flex-col items-center">
            <div className="mx-auto mb-8 max-w-4xl text-lg leading-relaxed text-gray-300">
              <h2 className="mb-6 text-3xl font-bold text-white">
                Why do Engineering Teams Choose SigNoz over Datadog?
              </h2>
              <p className="mb-6">
                SigNoz is often referred to as "Open-Source Datadog Alternative" by our users. We
                built SigNoz to address the absence of a great one-stop observability tool in the
                open-source ecosystem. Something that comes with the ease of a SaaS tool like
                Datadog but brings along the benefits of open-source standards.
              </p>
              <p className="mb-8 text-lg font-semibold text-white">
                Top reasons why developers prefer SigNoz over Datadog
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 text-xl font-semibold text-white">
                    True OpenTelemetry(OTel) - native solution
                  </h3>
                  <p>
                    SigNoz is built from the ground up for OpenTelemetry. That means OTel-first
                    docs, visualizations, & features are meant to truly take advantage of
                    OpenTelemetry's potential. Datadog gives preference to its agent. If you want to
                    do OpenTelemetry, SigNoz is the best choice.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold text-white">
                    Flexible Deployment Options
                  </h3>
                  <p>
                    SigNoz provides both cloud & self-hosted versions. You can use the cloud,
                    enterprise self-host, or free, open-source community edition, depending on your
                    needs. Many of our users use{' '}
                    <Link
                      href="https://signoz.io/docs/install/docker/"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      open-source SigNoz
                    </Link>{' '}
                    in dev environments and{' '}
                    <Link
                      href="https://signoz.io/teams/"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      SigNoz Cloud
                    </Link>{' '}
                    for production environments. Privacy-focused users prefer{' '}
                    <Link
                      href="https://signoz.io/pricing/"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      enterprise self-hosted
                    </Link>{' '}
                    version.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold text-white">
                    9x better value for money
                  </h3>
                  <p>
                    Signoz provides{' '}
                    <Link
                      href="https://signoz.io/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      9x more value
                    </Link>{' '}
                    for your money than Datadog.{' '}
                    <Link
                      href="https://signoz.io/blog/datadog-pricing/"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Complex billing practices
                    </Link>
                    , unpredictable pricing, and pricing that sometimes doesn't make sense are
                    common issues that Datadog users highlight. SigNoz offers simple usage-based{' '}
                    <Link
                      href="https://signoz.io/pricing/"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      pricing
                    </Link>{' '}
                    and features that can help you take control of your observability costs better.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Current State Section */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="mb-8 text-left text-2xl font-bold lg:text-3xl">
            Traditional Approach: Fragmented Tools & Complex Environments
          </h2>
          <div className="relative flex flex-wrap items-center gap-8">
            <div className="flex-1 text-gray-300">
              <p className="text-lg">
                Many organizations struggle with disconnected observability tools. Each team
                operates in isolation:
              </p>
              <div className="my-4 space-y-3">
                <div className="flex items-center gap-3">
                  <ChartBar className="h-5 w-5 flex-shrink-0 text-blue-400" />
                  <p className="text-lg">Metrics team manages Prometheus without trace context.</p>
                </div>
                <div className="flex items-center gap-3">
                  <GitBranch className="h-5 w-5 flex-shrink-0 text-purple-400" />
                  <p className="text-lg">
                    Tracing team runs Jaeger/Zipkin without metric correlation.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 flex-shrink-0 text-green-400" />
                  <p className="text-lg">Logging team handles ELK/Splunk without trace linking.</p>
                </div>
              </div>
              <p className="mb-4 text-lg">
                <strong>Result:</strong> Slower resolution times, missed insights, and team
                friction. <br /> In multi-cloud environments, each cloud provider has its own
                monitoring tools, creating a need for centralized data collection to achieve true
                unified observability.
              </p>
            </div>
            <div className="relative w-full flex-shrink-0 lg:w-3/5">
              <figure className="mx-auto max-w-[800px]">
                <Image
                  src="/img/unified-observability/unified-observability-fragmented-setup.webp"
                  alt="Fragmented Tools Diagram"
                  width={800}
                  height={533}
                  className="h-auto w-full rounded-xl shadow-2xl"
                />
                <figcaption className="mt-2 px-4 text-center text-sm text-gray-400">
                  Traditional fragmented setup with disconnected monitoring tools
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* SigNoz Platform Section */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="mb-8 text-left text-2xl font-bold lg:text-3xl">
            SigNoz: Unified Observability Platform Powered by OpenTelemetry
          </h2>
          <div className="relative mb-4 flex flex-wrap items-center gap-8">
            <div className="flex-1 text-gray-300">
              <p className="text-lg">
                Unified observability is more than just monitoring—it's about gaining a
                comprehensive understanding of your entire system's health, performance, and
                behavior in real-time. SigNoz brings together metrics, traces, and logs into a
                single, cohesive platform, enabling you to:
              </p>
              <div className="my-4 space-y-3">
                <div className="flex items-center gap-3">
                  <LineChart className="h-5 w-5 flex-shrink-0 text-blue-400" />
                  <p className="text-lg">
                    Quickly identify and resolve issues across your entire stack spanning multiple
                    clouds.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <DraftingCompass className="h-5 w-5 flex-shrink-0 text-purple-400" />
                  <p className="text-lg">Automatic correlation between different data types.</p>
                </div>
                <div className="flex items-center gap-3">
                  <ScrollText className="h-5 w-5 flex-shrink-0 text-green-400" />
                  <p className="text-lg">Make data-driven decisions with confidence.</p>
                </div>
                <div className="flex items-center gap-3">
                  <Gauge className="h-5 w-5 flex-shrink-0 text-yellow-400" />
                  <p className="text-lg">Reduce mean time to resolution (MTTR).</p>
                </div>
              </div>
            </div>
            <div className="relative w-full flex-shrink-0 lg:w-3/5">
              <figure>
                <Image
                  src="/img/unified-observability/unified-observability-unified-setup.webp"
                  alt="SigNoz Platform"
                  width={800}
                  height={533}
                  className="h-auto w-full rounded-xl shadow-2xl"
                />
                <figcaption className="mb-4 mt-2 px-4 text-center text-sm text-gray-400 sm:px-8">
                  SigNoz unified observability platform bringing metrics, traces and logs together
                </figcaption>
              </figure>
            </div>
          </div>

          {/* OpenTelemetry Section */}
          <section className="container mx-auto rounded-xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 py-12">
            <h3 className="mb-8 text-left text-xl font-bold lg:text-2xl">Why OpenTelemetry?</h3>
            <div className="text-gray-300">
              <p className="mb-6 text-lg">
                SigNoz collects telemetry with OpenTelemetry - a single open source standard for
                instrumenting cloud native applications. Using OpenTelemetry future-proofs your
                observability needs:
              </p>
              <ul className="list-inside list-disc space-y-3 text-lg">
                <li>Frees you from vendor lock-in.</li>
                <li>
                  Semantic conventions ensure consistent data collection across different services
                  and languages.
                </li>
                <li>Extensive language support with SDKs for all major programming languages.</li>
                <li>Active community and industry backing from major cloud providers.</li>
              </ul>
              <div className="mt-8 flex items-center gap-4">
                <Link href="/teams/">
                  <Button className="flex items-center gap-2">
                    Get Started with OpenTelemetry
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Features Carousel */}
          <section className="mx-auto pt-12">
            <h3 className="mb-8 text-left text-xl font-bold lg:text-2xl">
              Why Choose SigNoz as Your Unified Observability Platform?
            </h3>
            <div className="relative overflow-x-auto">
              <div className="flex gap-8">
                {[
                  {
                    title: 'Complete Visibility',
                    description:
                      'Get full-stack observability with metrics, traces, logs, and exceptions in one unified platform',
                  },
                  {
                    title: 'Cost-Effective Solution',
                    description: 'Eliminate expensive vendor lock-in with our open-source approach',
                  },
                  {
                    title: 'Built on top of OpenTelemetry',
                    description:
                      'Future-proof your observability with the fastest-growing observability standard',
                  },
                  {
                    title: 'Custom Dashboards',
                    description:
                      'Create tailored views for different teams and use cases or use templates provided by SigNoz',
                  },
                  {
                    title: 'Flexible Deployment',
                    description:
                      'Choose between self-hosted deployment for complete control or cloud offering for convenience',
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-[300px] flex-shrink-0 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 shadow-xl"
                  >
                    <h3 className="mb-4 text-xl font-bold text-blue-400">{feature.title}</h3>
                    <p className="mb-0 text-gray-300">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </section>

        {/* Need for Unified Observability */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="mb-8 text-left text-2xl font-bold lg:text-3xl">
            Need for Unified Observability
          </h2>
          <div className="mb-4 space-y-12">
            <div className="text-gray-300">
              <p className="mb-6 text-lg">
                Imagine your e-commerce platform experiencing issues across multiple microservices.
                Without a unified observability platform, identifying the root cause of service
                outages becomes a complex challenge:
              </p>
              <figure className="mb-8">
                <Image
                  src="/img/unified-observability/unified-observability-unified-vs-fragmented.webp"
                  alt="Unified vs Fragmented Observability"
                  width={1200}
                  height={600}
                  className="rounded-xl shadow-2xl"
                />
                <figcaption className="mt-2 text-center text-sm text-gray-400">
                  Comparison between unified and fragmented observability approaches
                </figcaption>
              </figure>
              <p className="mb-8 text-lg text-gray-300">
                Multiple services showing alerts, with Auth, API, and User services all failing.
                There's no clear indication of which service failed first, leaving teams scrambling
                to find the root cause.
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h3 className="mb-4 text-xl font-bold">
                  This is the reality of modern architectures:
                </h3>
                <ul className="list-inside list-disc space-y-3 text-lg text-gray-300">
                  <li>Microservices spanning multiple clouds.</li>
                  <li>Complex container orchestration.</li>
                  <li>Serverless functions triggering in chains.</li>
                  <li>Each service generating its own telemetry data.</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-xl font-bold">How it affects your users and business:</h3>
                <ul className="list-inside list-disc space-y-3 text-lg text-gray-300">
                  <li>Periodic latency spikes affecting user experience.</li>
                  <li>High query response times impacting sales.</li>
                  <li>Teams working in silos with incomplete data.</li>
                  <li>Lost Revenue and Brand reputation at stake.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How SigNoz Transforms */}
          <section className="container mx-auto my-8 rounded-xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 px-12 py-12">
            <h3 className="mb-8 text-left text-xl font-bold lg:text-2xl">
              How SigNoz transforms this chaos into clarity
            </h3>
            <div className="flex justify-center">
              <figure>
                <Image
                  src="/img/unified-observability/unified-observability-unified-observabilty-with-signoz.webp"
                  alt="Unified Observability with SigNoz"
                  width={820}
                  height={540}
                  className="rounded-xl shadow-2xl"
                />
                <figcaption className="mb-8 mt-2 text-center text-sm text-gray-400">
                  SigNoz provides a unified view of your entire system's observability data
                </figcaption>
              </figure>
            </div>
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h3 className="mb-4 text-xl font-bold text-gray-200">Platform Response:</h3>
                <ul className="list-inside list-disc space-y-3 text-lg text-gray-300">
                  <li>Automatic correlation of service dependencies</li>
                  <li>Instant identification of failure points</li>
                  <li>Clear visualization of cascading impacts</li>
                  <li>All through one unified dashboard</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-xl font-bold text-gray-200">Development Team Benefits:</h3>
                <ul className="list-inside list-disc space-y-3 text-lg text-gray-300">
                  <li>Immediate root cause visibility</li>
                  <li>Direct correlation with code deployments</li>
                  <li>Comprehensive performance context</li>
                  <li>Single-pane investigation workflow</li>
                </ul>
              </div>
            </div>

            <p className="mb-4 mt-4 text-xl font-bold text-gray-200">The difference is clear:</p>
            <div className="mb-8 space-y-3 text-lg text-gray-300">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 text-red-400" />
                <p className="mb-0">
                  Without Unified Observability: Multiple disconnected alerts across services with
                  no clear cause-effect relationship.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-400" />
                <p className="mb-0">
                  With Unified Observability: Immediate root cause identification with clear service
                  dependency visualization.
                </p>
              </div>
            </div>
            <p className="mb-4 text-xl font-bold text-gray-200">This unified approach means:</p>
            <ul className="mb-0 list-inside list-disc space-y-3 text-lg text-gray-300">
              <li>No more context switching between tools</li>
              <li>Instant correlation of metrics, traces, and logs</li>
              <li>Fast root cause analysis through service dependency mapping</li>
              <li>Development and platform teams working from the same context</li>
            </ul>
          </section>
        </section>

        {/* Role of AI in Unified Observability */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="mb-12 text-left text-2xl font-bold lg:text-3xl">
            Role of AI in Unified Observability
          </h2>
          <div className="relative flex flex-wrap items-center gap-8">
            <div className="flex-1 text-gray-300">
              <p className="text-lg">
                AI and machine learning have transformed observability by automating issue detection
                and resolution in complex systems:
              </p>
              <div className="my-4 space-y-3">
                <div className="flex items-center gap-3">
                  <ChartBar className="h-5 w-5 flex-shrink-0 text-blue-400" />
                  <p className="text-lg">Automated Pattern Recognition and Anomaly Detection</p>
                </div>
                <div className="flex items-center gap-3">
                  <GitBranch className="h-5 w-5 flex-shrink-0 text-purple-400" />
                  <p className="text-lg">Predictive Analytics for Proactive Issue Prevention</p>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 flex-shrink-0 text-green-400" />
                  <p className="text-lg">Intelligent Alert Correlation and Noise Reduction</p>
                </div>
                <div className="flex items-center gap-3">
                  <Gauge className="h-5 w-5 flex-shrink-0 text-yellow-400" />
                  <p className="text-lg">Continuous Learning and Improvement of Insights</p>
                </div>
              </div>
              <p className="text-lg">
                SigNoz offers{' '}
                <Link
                  href="https://signoz.io/blog/introducing-anomaly-detection-for-smarter-alerts/"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Anomaly Detection
                </Link>{' '}
                that enables smarter alerts based on dynamic metrics, moving beyond traditional
                fixed thresholds.
              </p>
            </div>
            <div className="relative w-full flex-shrink-0 lg:w-3/5">
              <figure>
                <Image
                  src="/img/unified-observability/unified-observability-anomaly-detection.webp"
                  alt="Anomaly Detection in SigNoz"
                  width={800}
                  height={533}
                  className="h-auto w-full rounded-xl shadow-2xl"
                />
                <figcaption className="mt-2 text-center text-sm text-gray-400">
                  Anamoly Detection Alert in SigNoz
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Get Started Section */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="mb-12 text-left text-2xl font-bold lg:text-3xl">
            Get started with Unified Observability
          </h2>
          <div className="mb-4 space-y-12">
            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-2xl font-bold">1. Quick SetUp</h3>
                <GetStartedSigNoz />
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-bold">2. Instrument Your Application</h3>
                <ul className="list-inside list-disc space-y-3 text-gray-300">
                  <li>
                    Choose your{' '}
                    <Link
                      href="https://signoz.io/docs/instrumentation/"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      programming language
                    </Link>
                  </li>
                  <li>Install OpenTelemetry SDK</li>
                  <li>Configure your application</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-bold">3. Start Monitoring</h3>
                <ul className="list-inside list-disc space-y-3 text-gray-300">
                  <li>Access the SigNoz UI</li>
                  <li>Import pre-built dashboards</li>
                  <li>Set up initial alerts</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="section-container hidden border !border-b-0 border-dashed border-signoz_slate-400 !px-0 sm:block">
            <div className="flex flex-col sm:flex-row">
              <div className="!w-[100%] flex-1 md:!w-[300px]">
                <div className="space-y-[10vh]">
                  <div className="h-screen">
                    <div className="sticky top-[100px] space-y-4">
                      <p className="px-8 pl-0 pt-10 text-2xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-3xl md:px-0 md:pl-12">
                        Application Performance Monitoring
                      </p>
                      <Link
                        href="/teams"
                        className="bg-signoz_button-500 hover:bg-signoz_button-400 ml-8 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all"
                      >
                        Get Started with APM
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="h-screen">
                    <div className="sticky top-[100px] space-y-4">
                      <p className="px-8 pl-0 pt-10 text-2xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-3xl md:px-0 md:pl-12">
                        Log Management
                      </p>
                      <Link
                        href="/teams"
                        className="bg-signoz_button-500 hover:bg-signoz_button-400 ml-8 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all"
                      >
                        Get Started with Logs
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="h-screen">
                    <div className="sticky top-[100px] space-y-4">
                      <p className="px-8 pl-0 pt-10 text-2xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-3xl md:px-0 md:pl-12">
                        Distributed Tracing
                      </p>
                      <Link
                        href="/teams"
                        className="bg-signoz_button-500 hover:bg-signoz_button-400 ml-8 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all"
                      >
                        Get Started with Distributed Tracing
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="h-screen">
                    <div className="sticky top-[100px] space-y-4">
                      <p className="px-8 pl-0 pt-10 text-2xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-3xl md:px-0 md:pl-12">
                        Infrastructure Monitoring
                      </p>
                      <Link
                        href="/teams"
                        className="bg-signoz_button-500 hover:bg-signoz_button-400 ml-8 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all"
                      >
                        Get Started with Infrastructure Monitoring
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="h-screen">
                    <div className="sticky top-[100px] space-y-4">
                      <p className="px-8 pl-0 pt-10 text-2xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-3xl md:px-0 md:pl-12">
                        Metrics and Dashboards
                      </p>
                      <Link
                        href="/teams"
                        className="bg-signoz_button-500 hover:bg-signoz_button-400 ml-8 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all"
                      >
                        Get Started with Dashboards
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="h-screen">
                    <div className="sticky top-[100px] space-y-4">
                      <p className="px-8 pl-0 pt-10 text-2xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-3xl md:px-0 md:pl-12">
                        Alerts
                      </p>
                      <Link
                        href="/teams"
                        className="bg-signoz_button-500 hover:bg-signoz_button-400 ml-8 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all"
                      >
                        Get Started with Alerts
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="h-screen">
                    <div className="sticky top-[100px] space-y-4">
                      <p className="px-8 pl-0 pt-10 text-2xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-3xl md:px-0 md:pl-12">
                        Exceptions Monitoring
                      </p>
                      <Link
                        href="/teams"
                        className="bg-signoz_button-500 hover:bg-signoz_button-400 ml-8 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all"
                      >
                        Get Started with Exceptions Monitoring
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-[2_2_0%]">
                <div className="space-y-[20vh]">
                  <div className="h-screen pt-[100px]">
                    <Figure
                      src="/img/unified-observability/unified-observability-apm.webp"
                      alt="Application Performance Monitoring in SigNoz"
                      caption="Monitor application metrics like latency, error rates and request rates"
                    />
                  </div>

                  <div className="h-screen pt-[100px]">
                    <Figure
                      src="/img/unified-observability/unified-observability-logs.webp"
                      alt="Logs Management in SigNoz"
                      caption="Ingest, search and analyze your logs at any scale"
                    />
                  </div>

                  <div className="h-screen pt-[100px]">
                    <Figure
                      src="/img/unified-observability/unified-observability-traces.webp"
                      alt="Distributed Tracing in SigNoz"
                      caption="Track user requests across services to identify bottlenecks"
                    />
                  </div>

                  <div className="h-screen pt-[100px]">
                    <Figure
                      src="/img/unified-observability/unified-observability-infrastructure-monitoring.webp"
                      alt="Infrastructure Monitoring in SigNoz"
                      caption="Monitor your infrastructure metrics like CPU, memory, and network"
                    />
                  </div>

                  <div className="h-screen pt-[100px]">
                    <Figure
                      src="/img/unified-observability/unified-observability-metrics-and-dashboards.webp"
                      alt="Metrics and Dashboards in SigNoz"
                      caption="Monitor your metrics and create custom dashboards"
                    />
                  </div>

                  <div className="h-screen pt-[100px]">
                    <Figure
                      src="/img/unified-observability/unified-observability-alerts.webp"
                      alt="Alerts in SigNoz"
                      caption="Set up alerts for your metrics and logs"
                    />
                  </div>

                  <div className="h-screen pt-[100px]">
                    <Figure
                      src="/img/unified-observability/unified-observability-exceptions.webp"
                      alt="Exceptions Monitoring in SigNoz"
                      caption="Monitor your exceptions and errors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="mx-auto max-w-4xl rounded-xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 px-6 py-12">
          <h3 className="mb-8 text-left text-xl font-bold lg:text-2xl">
            Resources to Help You Succeed
          </h3>
          <div className="text-gray-300">
            <p className="mb-6 text-lg">
              Get started quickly with{' '}
              <Link href="https://signoz.io/docs/" className="text-blue-400 hover:text-blue-300">
                comprehensive documentation
              </Link>
              , active community support, and detailed guides:
            </p>
            <ul className="list-inside list-disc space-y-3 text-lg">
              <li>Step-by-step tutorials and integration guides</li>
              <li>Active GitHub community with regular updates</li>
              <li>Detailed API documentation and SDKs</li>
              <li>Best practices and architecture recommendations</li>
            </ul>
          </div>
          <p className="mb-0 mt-8 text-lg">
            Take the first step toward comprehensive observability by signing up for a free trial of
            SigNoz today.
          </p>
          <div className="mt-4">
            <Link href="/teams/" className="block max-w-md">
              <Button className="flex w-full items-center justify-center gap-2 font-bold">
                Get Started - Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SigNozVsDatadogV2
