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
            <h1 className="mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-4xl font-bold text-transparent lg:text-5xl">
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
            <p className="mb-6 text-[1.1rem] text-gray-300">
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
              <h2 className="mb-8 text-left text-3xl font-bold text-white">
                Why do Engineering Teams Choose SigNoz over Datadog?
              </h2>
              <p className="mb-6 text-[1.1rem] text-gray-300">
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
                  <h3 className="mb-4 text-2xl font-bold text-white">
                    True OpenTelemetry(OTel) - native solution
                  </h3>
                  <p className="text-[1.1rem] text-gray-300">
                    SigNoz is built from the ground up for OpenTelemetry. That means OTel-first
                    docs, visualizations, & features are meant to truly take advantage of
                    OpenTelemetry's potential. Datadog gives preference to its agent. If you want to
                    do OpenTelemetry, SigNoz is the best choice.
                  </p>
                </div>

                <div>
                  <h3 className="mb-4 text-2xl font-bold text-white">
                    Flexible Deployment Options
                  </h3>
                  <p className="text-[1.1rem] text-gray-300">
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
                  <h3 className="mb-4 text-2xl font-bold text-white">9x better value for money</h3>
                  <p className="text-[1.1rem] text-gray-300">
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
        {/* Product Comparison Section */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="mb-12 text-left text-2xl font-bold lg:text-3xl">Product Comparison</h2>

          <div className="space-y-16">
            {/* OpenTelemetry Support */}
            <div>
              <h3 className="mb-6 text-2xl font-bold">OpenTelemetry-Native Support</h3>
              <p className="mb-6 text-[1.1rem] text-gray-300">
                SigNoz offers the best-in-class support for OpenTelemetry data. Datadog prioritizes
                support for its own agent. If you're using OpenTelemetry or planning to use it,
                SigNoz is a better choice than Datadog.
                <br />
                The table below summarizes some key differences in OpenTelemetry support between
                SigNoz and Datadog.
              </p>

              {/* OpenTelemetry Support Table */}
              <div className="mb-8 overflow-x-auto rounded-lg border border-gray-800 bg-gray-900/50">
                <table className="m-0 w-full border-collapse text-left">
                  <thead>
                    <tr>
                      <th className="w-[25%] border-b border-gray-800 bg-gray-900/80 px-6 py-4 font-medium text-gray-400">
                        Feature
                      </th>
                      <th className="w-[12%] border-b border-gray-800 bg-gray-900/80 px-4 py-4 font-medium text-gray-400">
                        SigNoz
                      </th>
                      <th className="w-[12%] border-b border-gray-800 bg-gray-900/80 px-4 py-4 font-medium text-gray-400">
                        Datadog
                      </th>
                      <th className="border-b border-gray-800 bg-gray-900/80 px-6 py-4 font-medium text-gray-400">
                        Remarks
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="transition-colors hover:bg-gray-800/50">
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        OpenTelemetry-first docs
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Yes</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span>No</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        OTel-first docs makes it easier to integrate any data source (instrumented
                        with OpenTelemetry) with SigNoz.
                      </td>
                    </tr>
                    <tr className="transition-colors hover:bg-gray-800/50">
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        Automatic exceptions from OTel trace data
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Yes</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span>No</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        SigNoz provides a tab for Exceptions which lists down all exceptions
                        captured automatically from an OTel instrumented application.
                      </td>
                    </tr>
                    <tr className="transition-colors hover:bg-gray-800/50">
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        OTel-native messaging queue monitoring
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Yes</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span>No</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        Leveraging OTel's trace context propagation & semantic conventions, SigNoz
                        provides end-to-end observability of messaging queues like Kafka & Celery.
                      </td>
                    </tr>
                    <tr className="transition-colors hover:bg-gray-800/50">
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        Kubernetes Monitoring
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Yes</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span>Limited for OTel data</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        SigNoz uses the hostmetrics receiver in OTel Collector to collect all
                        essential metrics from K8s nodes following OTel's semantic conventions.
                      </td>
                    </tr>
                    <tr className="transition-colors hover:bg-gray-800/50">
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        Correlation of Telemetry data
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Yes</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span>Limited for OTel data</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        Jump from logs to related traces, or see host metrics in infra monitoring
                        with out-of-the-box viz. in SigNoz for OTel data.
                      </td>
                    </tr>
                    <tr className="transition-colors hover:bg-gray-800/50">
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        Pricing of OTel metrics
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        Charged like any metric
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        Charged as custom metrics
                      </td>
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        Datadog treats OpenTelemetry metrics as custom metrics which gets very
                        expensive at scale.
                      </td>
                    </tr>
                    <tr className="transition-colors hover:bg-gray-800/50">
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        OTel-based Feature Flags
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                          <span>In Roadmap</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span>No</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        OpenTelemetry data can power features like feature flags which we plan to
                        leverage to enable feature flagging in SigNoz.
                      </td>
                    </tr>
                    <tr className="transition-colors hover:bg-gray-800/50">
                      <td colSpan={4} className="border-b border-gray-800/50 px-6 py-4">
                        <div className="flex items-center justify-between">
                          <p className="w-1/3 text-sm italic text-gray-400">
                            *Based on comparing support for monitoring the{' '}
                            <Link
                              href="https://github.com/open-telemetry/opentelemetry-demo"
                              className="text-blue-400 hover:text-blue-300"
                            >
                              OpenTelemetry demo app
                            </Link>{' '}
                            on 24th December, 2024.
                          </p>
                          <Link href="/teams/">
                            <Button className="flex items-center gap-2">
                              Get Started with OpenTelemetry
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* OpenTelemetry Support Article Link */}
              <div className="mb-8">
                <p className="mb-6 text-[1.1rem] text-gray-300">
                  Legacy observability tools like Datadog and New Relic are incentivized to provide
                  better support for their own agents. Their product functionalities and pricing
                  plans are tightly coupled with users using their proprietary agents.
                </p>

                <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                  <Link
                    href="https://signoz.io/blog/is-opentelemetry-a-first-class-citizen-in-your-dashboard-a-datadog-and-newrelic-comparison/"
                    className="text-lg font-medium text-blue-400 hover:text-blue-300"
                  >
                    Comparing Datadog and New Relic's support for OpenTelemetry data →
                  </Link>
                </div>

                <p className="mb-6 text-[1.1rem] text-gray-300">
                  We built SigNoz on top of OpenTelemetry from Day 1, and we're at the right place
                  to realize the full potential of OpenTelemetry data.
                </p>

                <p className="text-[1.1rem] text-gray-300">
                  Some highlights where we shine as an OpenTelemetry-native observability tool are
                  mentioned below.
                </p>
              </div>

              {/* OpenTelemetry Support Sub Sections */}
              <div>
                {/* OpenTelemetry-first docs & visualization */}
                <div>
                  <h4 className="mb-4 text-xl font-bold">
                    OpenTelemetry-first docs & visualization
                  </h4>

                  <p className="mb-6 text-[1.1rem] text-gray-300">
                    Docs play a crucial role in the developer experience of any dev tool. Our docs
                    are OpenTelemetry-first. Integration with any data source starts with
                    instructions on how to use OpenTelemetry SDKs and libraries.
                  </p>

                  <p className="mb-6 text-[1.1rem] text-gray-300">
                    In Datadog, it's hard to find what you need if you're looking to use
                    OpenTelemetry(and that's coming from us 😃). For example, if you want to
                    instrument your Java application with OpenTelemetry, you can go to our{' '}
                    <Link
                      href="https://signoz.io/docs/instrumentation/opentelemetry-java/"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Java APM docs
                    </Link>
                    , which has clear instructions and different ways to get started with
                    OpenTelemetry. Datadog docs do not provide a clear starting point for someone
                    starting with OpenTelemetry.
                  </p>

                  <p className="mb-6 text-[1.1rem] text-gray-300">
                    It's hard to make OpenTelemetry work with Datadog for many use-cases, and the
                    internet is full of such anecdotes.
                  </p>

                  <figure className="mb-8">
                    <img
                      src="/img/product-comparisons/signoz-vs-datadog/datadog-otel-lambda-integration-issue.webp"
                      alt="User describing their experience of sending telemetry data from AWS Lambdas to Datadog using OpenTelemetry"
                      className="mb-2 rounded-lg"
                    />
                    <figcaption className="text-sm text-gray-400">
                      User describing their experience of sending telemetry data from AWS Lambdas to
                      Datadog using OpenTelemetry. (
                      <Link
                        href="https://stackoverflow.com/questions/78851383/is-there-a-good-option-to-run-the-otel-collector-for-lambdas"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Source
                      </Link>
                      )
                    </figcaption>
                  </figure>

                  <p className="mb-4 text-[1.1rem] text-gray-300">
                    Some of our popular docs that can help you get started:
                  </p>

                  <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <Link
                      href="/docs/instrumentation/opentelemetry-java/"
                      className="rounded-lg bg-gray-800 p-4 transition-colors hover:bg-gray-700"
                    >
                      <div className="flex items-center justify-between font-medium">
                        <span>Java</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                    <Link
                      href="/docs/instrumentation/javascript/"
                      className="rounded-lg bg-gray-800 p-4 transition-colors hover:bg-gray-700"
                    >
                      <div className="flex items-center justify-between font-medium">
                        <span>Javascript</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                    <Link
                      href="/docs/instrumentation/python/"
                      className="rounded-lg bg-gray-800 p-4 transition-colors hover:bg-gray-700"
                    >
                      <div className="flex items-center justify-between font-medium">
                        <span>Python</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                    <Link
                      href="/docs/instrumentation/golang/"
                      className="rounded-lg bg-gray-800 p-4 transition-colors hover:bg-gray-700"
                    >
                      <div className="flex items-center justify-between font-medium">
                        <span>Golang</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                    <Link
                      href="/docs/ec2-monitoring/"
                      className="rounded-lg bg-gray-800 p-4 transition-colors hover:bg-gray-700"
                    >
                      <div className="flex items-center justify-between font-medium">
                        <span>AWS Monitoring</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                    <Link
                      href="/docs/gcp-monitoring/bootstrapping/"
                      className="rounded-lg bg-gray-800 p-4 transition-colors hover:bg-gray-700"
                    >
                      <div className="flex items-center justify-between font-medium">
                        <span>GCP Monitoring</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                    <Link
                      href="/docs/azure-monitoring/bootstrapping/"
                      className="rounded-lg bg-gray-800 p-4 transition-colors hover:bg-gray-700"
                    >
                      <div className="flex items-center justify-between font-medium">
                        <span>Azure Monitoring</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                    <Link
                      href="/docs/"
                      className="rounded-lg bg-gray-800 p-4 transition-colors hover:bg-gray-700"
                    >
                      <div className="flex items-center justify-between font-medium">
                        <span>…more</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Messaging queue monitoring powered by OpenTelemetry */}
              <div>
                <h4 className="mb-4 text-xl font-bold">
                  Messaging queue monitoring powered by OpenTelemetry
                </h4>

                <p className="mb-6 text-[1.1rem] text-gray-300">
                  Most monitoring tools are limited to metrics for monitoring messaging queues like
                  Kafka, Celery, etc. But leveraging OpenTelemetry's trace context propagation and
                  semantic conventions, we've enabled end-to-end observability for messaging queues
                  like Kafka.
                </p>

                <figure className="mb-8">
                  <Image
                    src="/img/product-comparisons/signoz-vs-datadog/messaging-queue-monitoring-otel.webp"
                    alt="Enhance observability of messaging queues with OTel powered correlated trace and metrics"
                    width={800}
                    height={400}
                    className="mb-2 rounded-lg"
                  />
                  <figcaption className="text-sm text-gray-400">
                    Enhance observability of messaging queues with OTel powered correlated trace and
                    metrics
                  </figcaption>
                </figure>

                <div className="mb-6 flex flex-wrap gap-4">
                  <Link href="/teams/" className="block">
                    <Button className="flex items-center gap-2">
                      Start Monitoring Kafka
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/docs/messaging-queues/kafka/" className="block">
                    <Button type={Button.TYPES.SECONDARY} className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Read Kafka Monitoring Documentation
                    </Button>
                  </Link>
                </div>

                <p className="mb-6 text-[1.1rem] text-gray-300">
                  With OpenTelemetry-powered correlated traces and metrics, you can dive deeper when
                  troubleshooting any issue. You can trace the complete path of a message from
                  producer to consumer with traces and resolve your issues quickly.
                </p>

                <div className="mb-8 rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                  <Link
                    href="https://signoz.io/blog/kafka-monitoring-opentelemetry/"
                    className="text-lg font-medium text-blue-400 hover:text-blue-300"
                  >
                    Read about some common debugging scenarios in Kafka and how OpenTelemetry +
                    SigNoz can help →
                  </Link>
                </div>
              </div>

              {/* Powerful correlation between different telemetry signals collected with OpenTelemetry */}
              <div>
                <h4 className="mb-4 text-xl font-bold">
                  Powerful correlation between different telemetry signals collected with
                  OpenTelemetry
                </h4>

                <p className="mb-6 text-[1.1rem] text-gray-300">
                  OpenTelemetry's{' '}
                  <Link
                    href="https://opentelemetry.io/docs/concepts/semantic-conventions/"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    semantic conventions
                  </Link>{' '}
                  provide a standardized way to annotate telemetry data (logs, metrics, and traces)
                  with well-defined attributes, enabling seamless correlation across these signals.
                </p>

                <div className="my-4 overflow-hidden rounded-xl shadow-2xl">
                  <video autoPlay muted loop>
                    <source src="/img/unified-observability/showcase.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <p className="mb-6 text-[1.1rem] text-gray-300">
                  But its true potential can only be realized if the observability backend to which
                  the data is sent to, enables switching between signals easily. In SigNoz, the
                  collection of telemetry signals is powered by OpenTelemetry. And by leveraging its
                  semantic conventions, we have enabled things like:
                </p>

                <ul className="mb-6 list-inside list-disc space-y-3 text-[1.1rem] text-gray-300">
                  <li>APM metrics to traces</li>
                  <li>APM metrics to logs</li>
                  <li>Traces to logs and vice-versa</li>
                  <li>Logs to infra metrics</li>
                  <li>Infra metrics to logs and traces</li>
                </ul>

                <p className="mb-6 text-[1.1rem] text-gray-300">
                  And more is coming in future product roadmap. Correlated signals empower you with
                  rich context to troubleshoot when issues occur.
                </p>

                <div className="mb-8 rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                  <Link
                    href="https://signoz.io/docs/instrumentation/overview/"
                    className="text-lg font-medium text-blue-400 hover:text-blue-300"
                  >
                    Get started with correlated telemetry →
                  </Link>
                </div>
              </div>

              {/* Metrics sent by OpenTelemetry are charged as custom metrics in Datadog */}
              <div>
                <h4 className="mb-4 text-xl font-bold">
                  Metrics sent by OpenTelemetry are charged as custom metrics in Datadog
                </h4>

                <p className="mb-6 text-[1.1rem] text-gray-300">
                  One of the challenges of using OpenTelemetry with Datadog is that it treats any
                  metric sent by using OpenTelemetry SDKs as a custom metric. Custom metrics in
                  Datadog are charged separately and can get{' '}
                  <Link
                    href="https://signoz.io/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/#no-limits-on-custom-metrics-with-signoz"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    very expensive
                  </Link>{' '}
                  at scale.
                </p>

                <figure className="mb-8">
                  <Image
                    src="/img/product-comparisons/signoz-vs-datadog/datadog-opentelemetry-custom-pricing-feedback.webp"
                    alt="User warning about OTel metrics being treated as custom metrics"
                    width={800}
                    height={400}
                    className="mb-2 rounded-lg"
                  />
                  <figcaption className="text-sm text-gray-400">
                    User warning about OTel metrics being treated as custom metrics (
                    <Link
                      href="https://news.ycombinator.com/item?id=38292553"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Source
                    </Link>
                    )
                  </figcaption>
                </figure>

                <p className="mb-6 text-[1.1rem] text-gray-300">
                  At SigNoz, all metrics are treated equally and reasonably priced at $0.1 per
                  million samples.
                </p>

                <div className="mb-8 rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                  <Link
                    href="https://signoz.io/pricing/"
                    className="text-lg font-medium text-blue-400 hover:text-blue-300"
                  >
                    Check SigNoz's Pricing Plans →
                  </Link>
                </div>
              </div>

              {/* OpenTelemery Support Sub Sections End */}
            </div>

            {/* Application Performance Monitoring Section */}
            <div>
              <h3 className="mb-6 text-2xl font-bold">Application Performance Monitoring (APM)</h3>
              <p className="mb-6 text-[1.1rem] text-gray-300">
                Our APM capabilities are on par with those of Datadog. With a simplified user
                interface, lots of users find SigNoz to be much easier to operate and monitor their
                applications with our APM module.
              </p>

              <div className="mb-8 overflow-x-auto rounded-lg border border-gray-800 bg-gray-900/50">
                <table className="m-0 w-full border-collapse text-left">
                  <thead>
                    <tr>
                      <th className="w-[25%] border-b border-gray-800 bg-gray-900/80 px-6 py-4 font-medium text-gray-400">
                        Feature
                      </th>
                      <th className="w-[12%] border-b border-gray-800 bg-gray-900/80 px-4 py-4 font-medium text-gray-400">
                        SigNoz
                      </th>
                      <th className="w-[12%] border-b border-gray-800 bg-gray-900/80 px-4 py-4 font-medium text-gray-400">
                        Datadog
                      </th>
                      <th className="border-b border-gray-800 bg-gray-900/80 px-6 py-4 font-medium text-gray-400">
                        Remarks
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="transition-colors hover:bg-gray-800/50">
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        Out-of-the-box charts for top application metrics
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Yes</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Yes</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        We provide out of box charts for RED metrics and other crucial metrics like
                        Apdex.
                      </td>
                    </tr>
                    <tr className="transition-colors hover:bg-gray-800/50">
                      <td className="border-b border-gray-800/50 px-6 py-4">Request Rate</td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Yes</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <span>Limited</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        DD derives a "primary operation" out of all endpoints and all RED metrics
                        are shown based on this "primary operation". This approach doesn't give you
                        a service-level view of performance.
                      </td>
                    </tr>
                    <tr className="transition-colors hover:bg-gray-800/50">
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        Latency p99, p90, p50
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Yes</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <span>Limited</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-6 py-4">Same as above.</td>
                    </tr>
                    <tr className="transition-colors hover:bg-gray-800/50">
                      <td className="border-b border-gray-800/50 px-6 py-4">Error Rate</td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Yes</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <span>Limited</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-6 py-4">Same as above.</td>
                    </tr>
                    <tr className="transition-colors hover:bg-gray-800/50">
                      <td className="border-b border-gray-800/50 px-6 py-4">Apdex</td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Yes</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Yes</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        Apdex is an open standard that defines a method to report, benchmark, and
                        rate application response time
                      </td>
                    </tr>
                    <tr className="transition-colors hover:bg-gray-800/50">
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        Top-Level Operations Detection
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span>Automatically detects all top-level spans</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span>Limited to endpoint-specific views</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        Datadog lacks full service-level latency aggregation that includes major
                        endpoints in a service.
                      </td>
                    </tr>
                    <tr className="transition-colors hover:bg-gray-800/50">
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        APM Metrics to logs, traces & infra metrics
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Yes</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Yes</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        Go from APM metrics to related logs, traces and infra metrics.
                      </td>
                    </tr>
                    <tr className="transition-colors hover:bg-gray-800/50">
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        Service-Level Alerting
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span>Alerts for overall service metrics</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span>Requires per-endpoint alert setup</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        As Datadog treats just one endpoint as the primary operation in a service,
                        you can not set a service-level alert that will be representative of
                        service-level issues.
                      </td>
                    </tr>
                    <tr className="transition-colors hover:bg-gray-800/50">
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        Database Calls RPS, Database Calls Avg Duration
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Yes</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Yes</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        Check Database calls metrics made from any service.
                      </td>
                    </tr>
                    <tr className="transition-colors hover:bg-gray-800/50">
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        RED Metrics for External Calls
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Yes</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <span>Limited</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        SigNoz simplifies tracking RED metrics for external calls - click on service
                        page of any service, and check external call metrics made by that service.
                      </td>
                    </tr>
                    <tr className="transition-colors hover:bg-gray-800/50">
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        OpenTelemetry-native APM docs
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Yes</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span>No</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        If you want OTel based APM, then SigNoz is a clear choice.
                      </td>
                    </tr>
                    <tr className="transition-colors hover:bg-gray-800/50">
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        OpenTelemetry-first visualization
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Yes</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span>No</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        All our out-of-the box charts are based on OTel data.
                      </td>
                    </tr>
                    <tr className="transition-colors hover:bg-gray-800/50">
                      <td className="border-b border-gray-800/50 px-6 py-4">Code Hotspots</td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span>No</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-4 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Yes</span>
                        </div>
                      </td>
                      <td className="border-b border-gray-800/50 px-6 py-4">
                        Not available in SigNoz
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mb-8">
                <p className="mb-6 text-[1.1rem] text-gray-300">
                  Datadog derives a "primary operation" out of all endpoints for a service, and all
                  RED metrics are shown based on this "primary operation". This is not a correct
                  approach because a service can have N primary operations, all of which are
                  important.
                </p>

                <p className="mb-6 text-[1.1rem] text-gray-300">
                  For example, <code>cart service</code> from the OTel demo app has multiple
                  endpoints with significant RPS:
                </p>

                <ul className="mb-6 list-disc pl-8 text-[1.1rem] text-gray-300">
                  <li>POST /oteldemo.CartService/AddItem</li>
                  <li>POST /oteldemo.CartService/GetCart</li>
                </ul>

                <div className="mb-6">
                  <img
                    src="/img/product-comparisons/signoz-vs-datadog/cart-service-key-operations.webp"
                    alt="Key operations shown for Cart Service in SigNoz"
                    className="rounded-lg"
                  />
                  <p className="mt-2 text-sm text-gray-400">
                    Key operations shown for Cart Service in SigNoz
                  </p>
                </div>

                <p className="mb-6 text-[1.1rem] text-gray-300">
                  Service-level RED metrics in SigNoz are derived from a combination of service top
                  endpoints that are representative of service-level performance.
                </p>

                <p className="mb-6 text-[1.1rem] text-gray-300">
                  On the other hand, Datadog shows service summary derived from stats of only one
                  endpoint, in this case, <code>POST /oteldemo.CartService/GetCart</code>.
                </p>

                <div className="mb-6">
                  <img
                    src="/img/product-comparisons/signoz-vs-datadog/datadog-service-summary-getcart-endpoint.webp"
                    alt="Datadog shows servcie-level metrics derived from only one primary operation"
                    className="rounded-lg"
                  />
                  <p className="mt-2 text-sm text-gray-400">
                    Datadog shows servcie-level metrics derived from only one primary operation
                  </p>
                </div>

                <p className="text-[1.1rem] text-gray-300">
                  This limits things like <strong>Service-Level Alerting.</strong> You will be
                  required to set up alerts per end-point. Service-level alerts are useful to
                  monitor the overall health of your service.
                </p>
              </div>
            </div>

            {/* Log Management Section */}
            <div>
              <h3 className="mb-6 text-2xl font-bold">Log Management</h3>
              <p className="mb-6 text-[1.1rem] text-gray-300">
                Our logs module, powered by ClickHouse and in-house optimizations, delivers fast
                querying and filtering for logs at scale.
              </p>

              <div className="mb-8 overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-4 pr-4"></th>
                      <th className="px-4 py-4">SigNoz</th>
                      <th className="px-4 py-4">Datadog</th>
                      <th className="py-4 pl-4">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="py-4 pr-4 font-medium">High Cardinality filtering at scale</td>
                      <td className="px-4 py-4">✅</td>
                      <td className="px-4 py-4">🟡</td>
                      <td className="py-4 pl-4">
                        Under the hood, SigNoz uses ClickHouse(used by likes of Uber) - an extremely
                        fast and highly optimized storage for observability data.
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-4 pr-4 font-medium">Quick search & filter</td>
                      <td className="px-4 py-4">✅</td>
                      <td className="px-4 py-4">✅</td>
                      <td className="py-4 pl-4">
                        Quickly search and filter your logs by filling attributes, tags, etc. in
                        search bar or using the quick filter menu.
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-4 pr-4 font-medium">Logs to Traces</td>
                      <td className="px-4 py-4">✅</td>
                      <td className="px-4 py-4">🟡 Limited for Otel Data</td>
                      <td className="py-4 pl-4">
                        Click on detailed view of logs and go to related span if trace id is present
                        in logs.
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-4 pr-4 font-medium">Logs to Infra Metrics</td>
                      <td className="px-4 py-4">✅</td>
                      <td className="px-4 py-4">✅</td>
                      <td className="py-4 pl-4">
                        Click on detailed view of logs and see infra metrics from the host
                        generating the logs
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Distributed Tracing Section */}
            <div>
              <h3 className="mb-6 text-2xl font-bold">Distributed Tracing</h3>

              <div className="mb-8 overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-4 pr-4"></th>
                      <th className="px-4 py-4">SigNoz</th>
                      <th className="px-4 py-4">Datadog</th>
                      <th className="py-4 pl-4">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="py-4 pr-4 font-medium">Search on all spans</td>
                      <td className="px-4 py-4">✅</td>
                      <td className="px-4 py-4">🟡 Limited to live search</td>
                      <td className="py-4 pl-4">
                        Datadog allows search on only indexed spans. Live search is available for
                        all spans only for past 15 minutes.
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-4 pr-4 font-medium">Quick Filters</td>
                      <td className="px-4 py-4">✅</td>
                      <td className="px-4 py-4">✅</td>
                      <td className="py-4 pl-4">
                        Use the quick filter menu list to quickly zero down on spans you want to
                        see.
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-4 pr-4 font-medium">Aggregations on trace data</td>
                      <td className="px-4 py-4">✅</td>
                      <td className="px-4 py-4">🟡 Limited to simple operations like count.</td>
                      <td className="py-4 pl-4">
                        SigNoz provides a powerful query builder which allows a list of aggregations
                        like count, min, max, latency, rate_sum, rate_avg. etc.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Infrastructure Monitoring Section */}
            <div>
              <h3 className="mb-6 text-2xl font-bold">Infrastructure Monitoring</h3>
              <p className="mb-6 text-[1.1rem] text-gray-300">
                Datadog is a better choice if you're looking to do only infrastructure monitoring.
                But if you're looking to use OpenTelemetry, SigNoz is a better choice.
              </p>

              <div className="mb-8 overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-4 pr-4"></th>
                      <th className="px-4 py-4">SigNoz</th>
                      <th className="px-4 py-4">Datadog</th>
                      <th className="py-4 pl-4">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="py-4 pr-4 font-medium">K8s Cluster Monitoring</td>
                      <td className="px-4 py-4">✅</td>
                      <td className="px-4 py-4">✅</td>
                      <td className="py-4 pl-4">
                        Get charts for monitoring common resource metrics like CPU, memory, etc.
                        from K8s pods & nodes.
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-4 pr-4 font-medium">VM Monitoring</td>
                      <td className="px-4 py-4">✅</td>
                      <td className="px-4 py-4">✅</td>
                      <td className="py-4 pl-4">
                        Get charts for monitoring common resource metrics like CPU, memory, etc.
                        from VMs.
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-4 pr-4 font-medium">Infra metrics to logs</td>
                      <td className="px-4 py-4">✅</td>
                      <td className="px-4 py-4">✅</td>
                      <td className="py-4 pl-4">Correlate your infra metrics with logs.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Other Platform Capabilities Section */}
            <div>
              <h3 className="mb-6 text-2xl font-bold">Other Platform Capabilities</h3>
              <p className="mb-6 text-[1.1rem] text-gray-300">
                Some of the platform capabilities that we don't offer today and for which Datadog is
                a good choice.
              </p>

              <div className="mb-8 overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-4 pr-4"></th>
                      <th className="px-4 py-4">SigNoz</th>
                      <th className="px-4 py-4">Datadog</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="py-4 pr-4 font-medium">Real User Monitoring</td>
                      <td className="px-4 py-4">❌</td>
                      <td className="px-4 py-4">✅</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-4 pr-4 font-medium">Session Replays</td>
                      <td className="px-4 py-4">❌</td>
                      <td className="px-4 py-4">✅</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-4 pr-4 font-medium">Synthetic Monitoring & Testing</td>
                      <td className="px-4 py-4">❌</td>
                      <td className="px-4 py-4">✅</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-4 pr-4 font-medium">Cloud SIEM</td>
                      <td className="px-4 py-4">❌</td>
                      <td className="px-4 py-4">✅</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="mb-8 text-left text-2xl font-bold lg:text-3xl">
            Traditional Approach: Fragmented Tools & Complex Environments
          </h2>
          <div className="relative flex flex-wrap items-center gap-8">
            <div className="flex-1 text-gray-300">
              <p className="text-[1.1rem] text-gray-300">
                Many organizations struggle with disconnected observability tools. Each team
                operates in isolation:
              </p>
              <div className="my-4 space-y-3">
                <div className="flex items-center gap-3">
                  <ChartBar className="h-5 w-5 flex-shrink-0 text-blue-400" />
                  <p className="text-[1.1rem] text-gray-300">
                    Metrics team manages Prometheus without trace context.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <GitBranch className="h-5 w-5 flex-shrink-0 text-purple-400" />
                  <p className="text-[1.1rem] text-gray-300">
                    Tracing team runs Jaeger/Zipkin without metric correlation.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 flex-shrink-0 text-green-400" />
                  <p className="text-[1.1rem] text-gray-300">
                    Logging team handles ELK/Splunk without trace linking.
                  </p>
                </div>
              </div>
              <p className="mb-4 text-[1.1rem] text-gray-300">
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
              <p className="text-[1.1rem] text-gray-300">
                Unified observability is more than just monitoring—it's about gaining a
                comprehensive understanding of your entire system's health, performance, and
                behavior in real-time. SigNoz brings together metrics, traces, and logs into a
                single, cohesive platform, enabling you to:
              </p>
              <div className="my-4 space-y-3">
                <div className="flex items-center gap-3">
                  <LineChart className="h-5 w-5 flex-shrink-0 text-blue-400" />
                  <p className="text-[1.1rem] text-gray-300">
                    Quickly identify and resolve issues across your entire stack spanning multiple
                    clouds.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <DraftingCompass className="h-5 w-5 flex-shrink-0 text-purple-400" />
                  <p className="text-[1.1rem] text-gray-300">
                    Automatic correlation between different data types.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <ScrollText className="h-5 w-5 flex-shrink-0 text-green-400" />
                  <p className="text-[1.1rem] text-gray-300">
                    Make data-driven decisions with confidence.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Gauge className="h-5 w-5 flex-shrink-0 text-yellow-400" />
                  <p className="text-[1.1rem] text-gray-300">
                    Reduce mean time to resolution (MTTR).
                  </p>
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
              <p className="mb-6 text-[1.1rem] text-gray-300">
                SigNoz collects telemetry with OpenTelemetry - a single open source standard for
                instrumenting cloud native applications. Using OpenTelemetry future-proofs your
                observability needs:
              </p>
              <ul className="list-inside list-disc space-y-3 text-[1.1rem] text-gray-300">
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
                    <p className="mb-0 text-[1.1rem] text-gray-300">{feature.description}</p>
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
              <p className="mb-6 text-[1.1rem] text-gray-300">
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
              <p className="mb-8 text-[1.1rem] text-gray-300">
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
                <ul className="list-inside list-disc space-y-3 text-[1.1rem] text-gray-300">
                  <li>Microservices spanning multiple clouds.</li>
                  <li>Complex container orchestration.</li>
                  <li>Serverless functions triggering in chains.</li>
                  <li>Each service generating its own telemetry data.</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-xl font-bold">How it affects your users and business:</h3>
                <ul className="list-inside list-disc space-y-3 text-[1.1rem] text-gray-300">
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
                <ul className="list-inside list-disc space-y-3 text-[1.1rem] text-gray-300">
                  <li>Automatic correlation of service dependencies</li>
                  <li>Instant identification of failure points</li>
                  <li>Clear visualization of cascading impacts</li>
                  <li>All through one unified dashboard</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-xl font-bold text-gray-200">Development Team Benefits:</h3>
                <ul className="list-inside list-disc space-y-3 text-[1.1rem] text-gray-300">
                  <li>Immediate root cause visibility</li>
                  <li>Direct correlation with code deployments</li>
                  <li>Comprehensive performance context</li>
                  <li>Single-pane investigation workflow</li>
                </ul>
              </div>
            </div>

            <p className="mb-4 mt-4 text-xl font-bold text-gray-200">The difference is clear:</p>
            <div className="mb-8 space-y-3 text-[1.1rem] text-gray-300">
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
            <ul className="mb-0 list-inside list-disc space-y-3 text-[1.1rem] text-gray-300">
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
              <p className="text-[1.1rem] text-gray-300">
                AI and machine learning have transformed observability by automating issue detection
                and resolution in complex systems:
              </p>
              <div className="my-4 space-y-3">
                <div className="flex items-center gap-3">
                  <ChartBar className="h-5 w-5 flex-shrink-0 text-blue-400" />
                  <p className="text-[1.1rem] text-gray-300">
                    Automated Pattern Recognition and Anomaly Detection
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <GitBranch className="h-5 w-5 flex-shrink-0 text-purple-400" />
                  <p className="text-[1.1rem] text-gray-300">
                    Predictive Analytics for Proactive Issue Prevention
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 flex-shrink-0 text-green-400" />
                  <p className="text-[1.1rem] text-gray-300">
                    Intelligent Alert Correlation and Noise Reduction
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Gauge className="h-5 w-5 flex-shrink-0 text-yellow-400" />
                  <p className="text-[1.1rem] text-gray-300">
                    Continuous Learning and Improvement of Insights
                  </p>
                </div>
              </div>
              <p className="text-[1.1rem] text-gray-300">
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
                <ul className="list-inside list-disc space-y-3 text-[1.1rem] text-gray-300">
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
                <ul className="list-inside list-disc space-y-3 text-[1.1rem] text-gray-300">
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
            <p className="mb-6 text-[1.1rem] text-gray-300">
              Get started quickly with{' '}
              <Link href="https://signoz.io/docs/" className="text-blue-400 hover:text-blue-300">
                comprehensive documentation
              </Link>
              , active community support, and detailed guides:
            </p>
            <ul className="list-inside list-disc space-y-3 text-[1.1rem] text-gray-300">
              <li>Step-by-step tutorials and integration guides</li>
              <li>Active GitHub community with regular updates</li>
              <li>Detailed API documentation and SDKs</li>
              <li>Best practices and architecture recommendations</li>
            </ul>
          </div>
          <p className="mb-0 mt-8 text-[1.1rem] text-gray-300">
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
