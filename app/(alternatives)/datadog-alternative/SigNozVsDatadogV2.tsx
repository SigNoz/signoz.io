'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import GetStartedSigNoz from '@/components/GetStartedSigNoz/GetStartedSigNoz'
import Button from '@/components/Button/Button'
import { ArrowRight, BookOpen, Link as LinkIcon } from 'lucide-react'
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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import FAQAccordion from '@/components/FAQAccordion/FAQAccordion'
import MigrationFloatingCard from '@/components/MigrationFloatingCard/MigrationFloatingCard'
import FloatingTableOfContents from '@/components/TableOfContents/FloatingTableOfContents'
import TrackingLink from '@/components/TrackingLink'

const data = [
  {
    name: 'Small engineering team',
    SigNoz: 1078,
    Datadog: 10421,
  },
  {
    name: 'Midsize engineering team',
    SigNoz: 4903,
    Datadog: 30213,
  },
  {
    name: 'Large engineering team',
    SigNoz: 9412,
    Datadog: 68743,
  },
]

const ValueComparisonChart = () => {
  return (
    <div className="w-full rounded-lg bg-gray-900 p-6">
      <h4 className="mb-4 text-xl text-white">Get up to 9x more value for money with SigNoz</h4>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="name"
              stroke="#fff"
              tick={{ fill: '#fff' }}
              tickLine={{ stroke: '#fff' }}
            />
            <YAxis
              stroke="#fff"
              tick={{ fill: '#fff' }}
              tickLine={{ stroke: '#fff' }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '4px',
                color: '#fff',
              }}
              formatter={(value) => [`$${value.toLocaleString()}`, '']}
            />
            <Legend
              wrapperStyle={{
                color: '#fff',
              }}
            />
            <Bar dataKey="SigNoz" fill="#ff7f50" />
            <Bar dataKey="Datadog" fill="#9333ea" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const SigNozVsDatadogV2 = () => {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A]">
      <MigrationFloatingCard />
      <FloatingTableOfContents />
      <div className="bg-dot-pattern masked-dots absolute top-0 flex h-full w-full items-center justify-center" />
      <div className="absolute left-0 right-0 top-0 mx-auto h-[300px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:h-[450px] sm:bg-[center_-500px] md:h-[956px]" />
      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 sm:pb-32 lg:px-8 lg:pt-32">
        {/* Hero Section */}
        <section className="container mx-auto mb-10 flex flex-col items-center justify-between lg:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-10 w-full lg:mb-0 lg:w-2/5"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-blue-200">
              SigNoz vs Datadog
            </p>
            <h1 className="mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-5xl font-bold leading-[1.2] text-transparent lg:text-6xl lg:leading-[1.2]">
              Datadog Alternative
            </h1>
            <h3 className="mb-8 text-lg font-normal text-gray-300 lg:text-xl">
              Teams moving from Datadog save up to 80% on 20 APM and 50 infra hosts—go deeper with
              the{' '}
              <Link
                href="https://signoz.io/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/"
                className="text-blue-400 hover:text-blue-300"
                target="_blank"
              >
                detailed SigNoz vs Datadog spreadsheet
              </Link>
              .
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <TrackingLink
                  href="/teams/"
                  clickType="Primary CTA"
                  clickName="Sign Up Button"
                  clickText="Get Started - Free"
                  clickLocation="Hero Section"
                >
                  <Button className="flex items-center justify-center gap-2 font-bold">
                    Get Started - Free <ArrowRight className="h-4 w-4" />
                  </Button>
                </TrackingLink>
                <TrackingLink
                  href="/product-comparison/datadog-savings/"
                  clickType="Secondary CTA"
                  clickName="DataDog Savings Form Link"
                  clickText="Send your bill for comparison"
                  clickLocation="Hero Section"
                >
                  <Button
                    type={Button.TYPES.SECONDARY}
                    className="flex items-center justify-center gap-2 font-bold"
                  >
                    <FileText className="h-4 w-4" />
                    Send your bill for comparison
                  </Button>
                </TrackingLink>
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
            className="relative w-full lg:-right-8 lg:w-3/5"
          >
            <div className="overflow-hidden rounded-xl shadow-2xl shadow-amber-400/20">
              <video autoPlay muted loop className="w-full lg:w-[120%]">
                <source src="/img/unified-observability/showcase.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </section>

        {/* Why do Engineering Teams Choose SigNoz over Datadog? */}
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2
            className="group relative mb-12 text-left text-4xl font-bold leading-normal text-white lg:text-5xl lg:leading-normal"
            id="why-choose-signoz"
          >
            <Link href="#why-choose-signoz" className="flex items-center hover:text-gray-300">
              <LinkIcon className="absolute -left-8 h-6 w-6 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
              Why do Engineering Teams Choose SigNoz over Datadog?
            </Link>
          </h2>

          <div className="mb-8">
            <p className="text-lg text-gray-300">
              SigNoz is often referred to as "Open-Source Datadog Alternative" by our users. We
              built SigNoz to address the absence of a great one-stop observability tool in the
              open-source ecosystem. Something that comes with the ease of a SaaS tool like Datadog
              but brings along the benefits of open-source standards.
              <br />
              <br />
              Switching from Datadog is now easier with our{' '}
              <Link
                href="/datadog-migration-tool/"
                className="text-blue-400 hover:text-blue-300"
                target="_blank"
              >
                automated migration tool
              </Link>{' '}
              that translates your dashboards in minutes, preserving all configurations and queries.
              <br />
              <br />
              Top reasons why developers prefer SigNoz over Datadog
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500/10">
                <GitBranch className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <h4 className="mb-8 text-3xl font-bold leading-normal text-white">
                  True OpenTelemetry(OTel)-native solution
                </h4>
                <p className="text-gray-300">
                  SigNoz is built from the ground up for OpenTelemetry. That means OTel-first docs,
                  visualizations, & features are meant to truly take advantage of OpenTelemetry's
                  potential. Datadog gives preference to its agent. If you want to do OpenTelemetry,
                  SigNoz is the best choice.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                <DraftingCompass className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h4 className="mb-8 text-3xl font-bold leading-normal text-white">
                  Flexible Deployment Options
                </h4>
                <p className="text-gray-300">
                  SigNoz provides both cloud & self-hosted versions. You can use the cloud,
                  enterprise self-host, or free, open-source community edition, depending on your
                  needs. Many of our users use open-source SigNoz in dev environments and SigNoz
                  Cloud for production environments. Privacy-focused users prefer enterprise
                  self-hosted version.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/10">
                <ChartBar className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h4 className="mb-8 text-3xl font-bold leading-normal text-white">
                  9x better value for money
                </h4>
                <p className="text-gray-300">
                  Signoz provides 9x more value for your money than Datadog. Complex billing
                  practices, unpredictable pricing, and pricing that sometimes doesn't make sense
                  are common issues that Datadog users highlight. SigNoz offers simple usage-based
                  pricing and features that can help you take control of your observability costs
                  better.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Comparison Section */}
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2
            className="group relative mb-12 text-left text-4xl font-bold leading-normal text-white lg:text-5xl lg:leading-normal"
            id="product-comparison"
          >
            <Link href="#product-comparison" className="flex items-center hover:text-gray-300">
              <LinkIcon className="absolute -left-8 h-6 w-6 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
              Product Comparison
            </Link>
          </h2>

          <div className="space-y-16">
            {/* OpenTelemetry Support */}
            <div>
              <h3
                className="group relative mb-8 text-3xl font-bold leading-normal text-white"
                id="opentelemetry-support"
              >
                <Link
                  href="#opentelemetry-support"
                  className="flex items-center hover:text-gray-300"
                >
                  <LinkIcon className="absolute -left-7 h-5 w-5 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  OpenTelemetry-Native Support
                </Link>
              </h3>
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
                <div className="min-w-[800px]">
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
                          SigNoz provides a dedicated{' '}
                          <Link
                            href="https://signoz.io/exceptions-monitoring/"
                            className="text-blue-400 hover:text-blue-300"
                            target="_blank"
                          >
                            Exceptions tab
                          </Link>{' '}
                          that automatically lists down all exceptions captured automatically from
                          an OTel instrumented application.
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
                          Native support for openfeature feature flag.{' '}
                          <Link
                            href="https://www.youtube.com/watch?v=RZSEi8csXK0"
                            className="text-blue-400 hover:text-blue-300"
                            target="_blank"
                          >
                            Learn More
                          </Link>{' '}
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
                                target="_blank"
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
                    target="_blank"
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
                  <h4 className="mb-6 text-2xl font-bold leading-snug text-white">
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
                      target="_blank"
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
                      className="mb-2 rounded-lg border border-gray-800 bg-gray-900/50 p-2 transition-transform duration-300 hover:scale-[1.02]"
                    />
                    <figcaption className="text-sm text-gray-400">
                      User describing their experience of sending telemetry data from AWS Lambdas to
                      Datadog using OpenTelemetry. (
                      <Link
                        href="https://stackoverflow.com/questions/78851383/is-there-a-good-option-to-run-the-otel-collector-for-lambdas"
                        className="text-blue-400 hover:text-blue-300"
                        target="_blank"
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
                      target="_blank"
                      className="rounded-lg bg-gray-800 p-4 transition-colors hover:bg-gray-700"
                    >
                      <div className="flex items-center justify-between font-medium">
                        <span>Java</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                    <Link
                      href="/docs/instrumentation/javascript/"
                      target="_blank"
                      className="rounded-lg bg-gray-800 p-4 transition-colors hover:bg-gray-700"
                    >
                      <div className="flex items-center justify-between font-medium">
                        <span>Javascript</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                    <Link
                      href="/docs/instrumentation/python/"
                      target="_blank"
                      className="rounded-lg bg-gray-800 p-4 transition-colors hover:bg-gray-700"
                    >
                      <div className="flex items-center justify-between font-medium">
                        <span>Python</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                    <Link
                      href="/docs/instrumentation/golang/"
                      target="_blank"
                      className="rounded-lg bg-gray-800 p-4 transition-colors hover:bg-gray-700"
                    >
                      <div className="flex items-center justify-between font-medium">
                        <span>Golang</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                    <Link
                      href="/docs/ec2-monitoring/"
                      target="_blank"
                      className="rounded-lg bg-gray-800 p-4 transition-colors hover:bg-gray-700"
                    >
                      <div className="flex items-center justify-between font-medium">
                        <span>AWS Monitoring</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                    <Link
                      href="/docs/gcp-monitoring/bootstrapping/"
                      target="_blank"
                      className="rounded-lg bg-gray-800 p-4 transition-colors hover:bg-gray-700"
                    >
                      <div className="flex items-center justify-between font-medium">
                        <span>GCP Monitoring</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                    <Link
                      href="/docs/azure-monitoring/bootstrapping/"
                      target="_blank"
                      className="rounded-lg bg-gray-800 p-4 transition-colors hover:bg-gray-700"
                    >
                      <div className="flex items-center justify-between font-medium">
                        <span>Azure Monitoring</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                    <Link
                      href="/docs/"
                      target="_blank"
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
                <h4 className="mb-6 text-2xl font-bold leading-snug text-white">
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
                    className="mb-2 rounded-lg border border-gray-800 bg-gray-900/50 p-2 transition-transform duration-300 hover:scale-[1.02]"
                  />
                  <figcaption className="text-sm text-gray-400">
                    Enhance observability of messaging queues with OTel powered correlated trace and
                    metrics
                  </figcaption>
                </figure>

                <div className="mb-6 flex flex-wrap gap-4">
                  <Link href="/teams/" target="_blank" className="block">
                    <Button className="flex items-center gap-2">
                      Start Monitoring Kafka
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/docs/messaging-queues/kafka/" target="_blank" className="block">
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
                    target="_blank"
                    className="text-lg font-medium text-blue-400 hover:text-blue-300"
                  >
                    Read about some common debugging scenarios in Kafka and how OpenTelemetry +
                    SigNoz can help →
                  </Link>
                </div>
              </div>

              {/* Powerful correlation between different telemetry signals collected with OpenTelemetry */}
              <div>
                <h4 className="mb-6 text-2xl font-bold leading-snug text-white">
                  Powerful correlation between different telemetry signals collected with
                  OpenTelemetry
                </h4>

                <p className="mb-6 text-[1.1rem] text-gray-300">
                  OpenTelemetry's{' '}
                  <Link
                    href="https://opentelemetry.io/docs/concepts/semantic-conventions/"
                    className="text-blue-400 hover:text-blue-300"
                    target="_blank"
                  >
                    semantic conventions
                  </Link>{' '}
                  provide a standardized way to annotate telemetry data (logs, metrics, and traces)
                  with well-defined attributes, enabling seamless correlation across these signals.
                </p>

                <div className="my-4 overflow-hidden rounded-xl shadow-2xl">
                  <video autoPlay muted loop className="lg:w-[120%]">
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
                    target="_blank"
                  >
                    Get started with correlated telemetry →
                  </Link>
                </div>
              </div>

              {/* Metrics sent by OpenTelemetry are charged as custom metrics in Datadog */}
              <div>
                <h4 className="mb-6 text-2xl font-bold leading-snug text-white">
                  Metrics sent by OpenTelemetry are charged as custom metrics in Datadog
                </h4>

                <p className="mb-6 text-[1.1rem] text-gray-300">
                  One of the challenges of using OpenTelemetry with Datadog is that it treats any
                  metric sent by using OpenTelemetry SDKs as a custom metric. Custom metrics in
                  Datadog are charged separately and can get{' '}
                  <Link
                    href="https://signoz.io/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/#no-limits-on-custom-metrics-with-signoz"
                    className="text-blue-400 hover:text-blue-300"
                    target="_blank"
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
                      target="_blank"
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
                    target="_blank"
                  >
                    Check SigNoz's Pricing Plans →
                  </Link>
                </div>
              </div>

              {/* OpenTelemery Support Sub Sections End */}
            </div>

            {/* Application Performance Monitoring Section */}
            <div>
              <h3
                className="group relative mb-8 text-3xl font-bold leading-normal text-white"
                id="apm"
              >
                <Link href="#apm" className="flex items-center hover:text-gray-300">
                  <LinkIcon className="absolute -left-7 h-5 w-5 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  Application Performance Monitoring (APM)
                </Link>
              </h3>
              <p className="mb-6 text-[1.1rem] text-gray-300">
                Our APM capabilities are on par with those of Datadog. With a simplified user
                interface, lots of users find SigNoz to be much easier to operate and monitor their
                applications with our APM module.
              </p>

              <div className="mb-8 overflow-x-auto rounded-lg border border-gray-800 bg-gray-900/50">
                <div className="min-w-[800px]">
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
                          We provide out of box charts for RED metrics and other crucial metrics
                          like Apdex.
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
                          are shown based on this "primary operation". This approach doesn't give
                          you a service-level view of performance.
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
                          SigNoz simplifies tracking RED metrics for external calls - click on
                          service page of any service, and check external call metrics made by that
                          service.
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
                    className="rounded-lg border border-gray-800 bg-gray-900/50 p-2 transition-transform duration-300 hover:scale-[1.02]"
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
                    className="rounded-lg border border-gray-800 bg-gray-900/50 p-2 transition-transform duration-300 hover:scale-[1.02]"
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
              <h3
                className="group relative mb-8 text-3xl font-bold leading-normal text-white"
                id="log-management"
              >
                <Link href="#log-management" className="flex items-center hover:text-gray-300">
                  <LinkIcon className="absolute -left-7 h-5 w-5 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  Log Management
                </Link>
              </h3>
              <p className="mb-6 text-[1.1rem] text-gray-300">
                Our logs module, powered by ClickHouse and in-house optimizations, delivers fast
                querying and filtering for logs at scale.
              </p>

              <div className="mb-8 overflow-x-auto rounded-lg border border-gray-800 bg-gray-900/50">
                <div className="min-w-[800px]">
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
                          High Cardinality filtering at scale
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
                          Under the hood, SigNoz uses ClickHouse(used by likes of Uber) - an
                          extremely fast and highly optimized storage for observability data.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Quick search & filter
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
                          Quickly search and filter your logs by filling attributes, tags, etc. in
                          search bar or using the quick filter menu.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">Logs to Traces</td>
                        <td className="border-b border-gray-800/50 px-4 py-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Yes</span>
                          </div>
                        </td>
                        <td className="border-b border-gray-800/50 px-4 py-4">
                          <div className="flex items-center gap-2">
                            <span>Limited for Otel Data</span>
                          </div>
                        </td>
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Click on detailed view of logs and go to related span if trace id is
                          present in logs.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Logs to Infra Metrics
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
                          Click on detailed view of logs and see infra metrics from the host
                          generating the logs
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">Timeseries plot</td>
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
                          See timeseries plot of logs sent. In SigNoz you can apply different
                          aggregations like count, avg., min, max, etc. In Datadog only count
                          operation is allowed.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">Table View</td>
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
                        <td className="border-b border-gray-800/50 px-6 py-4">Same as above.</td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">List View</td>
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
                          See all your log lines in list view with options to customize the view.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          OTel-based Logs UI
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
                          Our logs UI respects the hierarchy of OTel logs model making it easier for
                          users to identify the type of attributes/tags they use for filtering.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">Saved Views</td>
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
                          Apply filters & aggregations and save them as views for quick access
                          later.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">Log Patterns</td>
                        <td className="border-b border-gray-800/50 px-4 py-4">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
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
                          Logs Patterns help you identify patterns in logs sent. We don't have this
                          currently, but it is there in our product roadmap
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Ability to configure quick filters
                        </td>
                        <td className="border-b border-gray-800/50 px-4 py-4">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
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
                          You can configure the filters in quick filter menu bar which comes handy
                          in fast troubleshooting.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Distributed Tracing Section */}
            <div>
              <h3
                className="group relative mb-8 text-3xl font-bold leading-normal text-white"
                id="distributed-tracing"
              >
                <Link href="#distributed-tracing" className="flex items-center hover:text-gray-300">
                  <LinkIcon className="absolute -left-7 h-5 w-5 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  Distributed Tracing
                </Link>
              </h3>

              <div className="mb-8 overflow-x-auto rounded-lg border border-gray-800 bg-gray-900/50">
                <div className="min-w-[800px]">
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
                          Search on all spans
                        </td>
                        <td className="border-b border-gray-800/50 px-4 py-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Yes</span>
                          </div>
                        </td>
                        <td className="border-b border-gray-800/50 px-4 py-4">
                          <div className="flex items-center gap-2">
                            <span>Limited to live search</span>
                          </div>
                        </td>
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Datadog allows search on only indexed spans. Live search is available for
                          all spans only for past 15 minutes.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">Quick Filters</td>
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
                          Use the quick filter menu list to quickly zero down on spans you want to
                          see.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Aggregations on trace data
                        </td>
                        <td className="border-b border-gray-800/50 px-4 py-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Yes</span>
                          </div>
                        </td>
                        <td className="border-b border-gray-800/50 px-4 py-4">
                          <div className="flex items-center gap-2">
                            <span>Limited to simple operations like count</span>
                          </div>
                        </td>
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          SigNoz provides a powerful query builder which allows a list of
                          aggregations like count, min, max, latency, rate_sum, rate_avg. etc.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Arbitrary attribute-based querying & aggregations
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
                          You can choose any arbitrary attribute to create aggregations in SigNoz.
                          Datadog only allows it on some top level attributes.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">List View</td>
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
                          See all your spans in list view with options to customize the view.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">Time Series</td>
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
                          See all your spans in list view with options to customize the view.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">Table View</td>
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
                          Apply filters based on attributes and apply aggregations like count, min,
                          max, latency and see results in table view. Datadog allows only the count
                          operation.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">See Root Spans</td>
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
                          Root spans are the entry point for any trace. In SigNoz you can view them
                          in a different panel.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Tree Map & Pie Chart View
                        </td>
                        <td className="border-b border-gray-800/50 px-4 py-4">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
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
                          Datadog provides more visualization options for your trace data.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">Flamegraphs</td>
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
                          Flamegraphs are used to commonly to represent trace data.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">Trace Waterfall</td>
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
                          Trace waterfall shows the how order of operations cascades across the
                          total execution time of that trace.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Spans to related logs
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
                          Both SigNoz and Datadog shows related logs with a span. The UX might be
                          different in each case.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Infrastructure Monitoring Section */}
            <div>
              <h3
                className="group relative mb-8 text-3xl font-bold leading-normal text-white"
                id="infrastructure-monitoring"
              >
                <Link
                  href="#infrastructure-monitoring"
                  className="flex items-center hover:text-gray-300"
                >
                  <LinkIcon className="absolute -left-7 h-5 w-5 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  Infrastructure Monitoring
                </Link>
              </h3>
              <p className="mb-6 text-[1.1rem] text-gray-300">
                Datadog is a better choice if you're looking to do only infrastructure monitoring.{' '}
                <br /> <br />
                But if you're looking to use OpenTelemetry, SigNoz is a better choice. OpenTelemetry
                Collector has a{' '}
                <Link
                  href="https://signoz.io/docs/userguide/hostmetrics/"
                  className="text-blue-400 hover:text-blue-300"
                  target="_blank"
                >
                  hostmetrics
                </Link>{' '}
                receiver that allows you to collect important infra metrics. <br /> <br />
                The resource attributes collected with OTel follows the semantic conventions, which
                means it can be correlated easily with other signals like logs and traces.
              </p>

              <div className="mb-8 overflow-x-auto rounded-lg border border-gray-800 bg-gray-900/50">
                <div className="min-w-[800px]">
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
                          K8s Cluster Monitoring
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
                          Get charts for monitoring common resource metrics like CPU, memory, etc.
                          from K8s pods & nodes.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">VM Monitoring</td>
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
                          Get charts for monitoring common resource metrics like CPU, memory, etc.
                          from VMs.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Infra metrics to logs
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
                          Correlate your infra metrics with logs.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Infra metrics to traces
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
                          Correlate your infra metrics with traces.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Host & Container Maps
                        </td>
                        <td className="border-b border-gray-800/50 px-4 py-4">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
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
                          Get a map of your machinces/containers in your infra for a comprehensive
                          view.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Control Infra Monitoring Cost
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
                          In Datadog you cannot control the metrics you send for Infra monitoring,
                          while in SigNoz you will have granular controls on what metrics you want
                          to send from any host.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="mb-6 text-[1.1rem] text-gray-300">
                Datadog has a vast array of capabilities when it comes to infrastructure monitoring.
                You can check out more details about their infrastructure monitoring capabilities on
                their{' '}
                <Link
                  href="https://www.datadoghq.com/product/infrastructure-monitoring/"
                  className="text-blue-400 hover:text-blue-300"
                  target="_blank"
                >
                  website.
                </Link>
              </p>
            </div>

            {/* Other Platform Capabilities Section */}
            <div>
              <h3
                className="group relative mb-8 text-3xl font-bold leading-normal text-white"
                id="platform-capabilities"
              >
                <Link
                  href="#platform-capabilities"
                  className="flex items-center hover:text-gray-300"
                >
                  <LinkIcon className="absolute -left-7 h-5 w-5 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  Other Platform Capabilities
                </Link>
              </h3>
              <p className="mb-6 text-[1.1rem] text-gray-300">
                Some of the platform capabilities that we don't offer today and for which Datadog is
                a good choice.
              </p>

              <div className="mb-8 overflow-x-auto rounded-lg border border-gray-800 bg-gray-900/50">
                <div className="min-w-[800px]">
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
                          Real User Monitoring
                        </td>
                        <td className="border-b border-gray-800/50 px-4 py-4">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
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
                          Monitor real user interactions and frontend performance
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">Session Replays</td>
                        <td className="border-b border-gray-800/50 px-4 py-4">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
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
                          Replay user sessions to debug issues
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Synthetic Monitoring & Testing
                        </td>
                        <td className="border-b border-gray-800/50 px-4 py-4">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
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
                          Simulate and monitor user flows
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">Cloud SIEM</td>
                        <td className="border-b border-gray-800/50 px-4 py-4">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
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
                          Security information and event management
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SigNoz is 9x more value than Datadog */}
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2
            className="group relative mb-12 text-left text-4xl font-bold leading-normal text-white lg:text-5xl lg:leading-normal"
            id="value-for-money"
          >
            <Link href="#value-for-money" className="flex items-center hover:text-gray-300">
              <LinkIcon className="absolute -left-8 h-6 w-6 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
              SigNoz is 9x More Value for Money than Datadog
            </Link>
          </h2>

          <p className="mb-8 text-[1.1rem] text-gray-300">
            Datadog has a very complex pricing tier which makes Datadog bills unpredictable. For 20
            APM hosts, 50 infra hosts, and 2500 GB logs data, SigNoz can provide up to 9x more value
            than Datadog. (
            <Link
              href="https://signoz.io/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/"
              className="text-blue-400 hover:text-blue-300"
            >
              Learn More
            </Link>
            )
          </p>

          <div className="mb-12">
            <ValueComparisonChart />
          </div>

          <p className="mb-8 text-[1.1rem] text-gray-300">
            Some of the highlights of why our pricing plan is better suited at scale are mentioned
            below.
          </p>

          <div className="space-y-12">
            <div>
              <h3
                className="group relative mb-8 text-3xl font-bold leading-normal text-white"
                id="usage-based-pricing"
              >
                <Link href="#usage-based-pricing" className="flex items-center hover:text-gray-300">
                  <LinkIcon className="absolute -left-7 h-5 w-5 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  Simple usage-based pricing
                </Link>
              </h3>
              <p className="text-[1.1rem] text-gray-300">
                Datadog has complex{' '}
                <Link
                  href="https://signoz.io/blog/datadog-pricing/"
                  className="text-blue-400 hover:text-blue-300"
                  target="_blank"
                >
                  SKU-based pricing
                </Link>
                , which is difficult to break down and predict costs. The complex billing structure
                makes it hard to predict how much you will be charged at the end of the month.
              </p>
              <p className="mt-4 text-[1.1rem] text-gray-300">
                We offer a simple usage-based pricing plan based on the amount of data that you send
                to SigNoz.
              </p>
              <div className="mb-8 rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                <Link
                  href="https://signoz.io/pricing/"
                  className="text-lg font-medium text-blue-400 hover:text-blue-300"
                  target="_blank"
                >
                  Check SigNoz Pricing Plans →
                </Link>
              </div>
            </div>

            <div>
              <h3
                className="group relative mb-8 text-3xl font-bold leading-normal text-white"
                id="custom-metrics"
              >
                <Link href="#custom-metrics" className="flex items-center hover:text-gray-300">
                  <LinkIcon className="absolute -left-7 h-5 w-5 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  No special pricing for custom metrics
                </Link>
              </h3>
              <p className="mb-6 text-[1.1rem] text-gray-300">
                Datadog's custom metrics pricing is insane. It charges $0.05 per custom metric. You
                can end up with unpredictable bills, and custom metrics pricing can constitute up to
                52% of your bill for a large engineering team. SigNoz does not treat custom metrics
                differently and charges only $0.1 per million samples.{' '}
                <Link
                  href="https://signoz.io/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/#no-limits-on-custom-metrics-with-signoz"
                  className="text-blue-400 hover:text-blue-300"
                  target="_blank"
                >
                  (Learn more)
                </Link>
              </p>
            </div>

            <div>
              <h3
                className="group relative mb-8 text-3xl font-bold leading-normal text-white"
                id="infra-monitoring-cost"
              >
                <Link
                  href="#infra-monitoring-cost"
                  className="flex items-center hover:text-gray-300"
                >
                  <LinkIcon className="absolute -left-7 h-5 w-5 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  Better controls on infra monitoring cost
                </Link>
              </h3>
              <p className="text-[1.1rem] text-gray-300">
                In Datadog, you don't have any controls on the type of metrics sent to monitor your
                infrastructure. Hence, you can't optimize your infrastructure monitoring bill in
                Datadog. Each infrastructure host is charged at $18 per month.
              </p>
              <p className="mt-4 text-[1.1rem] text-gray-300">
                SigNoz lets you collect infra metrics through the hostmetrics receiver in
                OpenTelemetry Collector, with which you can control what metrics to send.
              </p>
            </div>

            <div>
              <h3
                className="group relative mb-8 text-3xl font-bold leading-normal text-white"
                id="no-host-pricing"
              >
                <Link href="#no-host-pricing" className="flex items-center hover:text-gray-300">
                  <LinkIcon className="absolute -left-7 h-5 w-5 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  No Host (container or node) based pricing
                </Link>
              </h3>
              <p className="mb-6 text-[1.1rem] text-gray-300">
                Because of Datadog's host-based pricing, some users are actually trying to optimize
                their microservices architecture to reduce the cost. The fact that they charge based
                on a number of hosts trips up many teams - and leads to many teams packing more
                services in a single host to keep their DataDog bill under control.
              </p>
              <figure>
                <Image
                  src="/img/product-comparisons/signoz-vs-datadog/datadog-host-based-pricing.webp"
                  alt="Host based pricing issue"
                  width={800}
                  height={400}
                  className="rounded-lg border border-gray-800 bg-gray-900/50 p-2 transition-transform duration-300 hover:scale-[1.02]"
                />
                <figcaption className="mt-2 text-sm text-gray-400">
                  A user discussing how they optimized their architecture to control Datadog costs.
                  (
                  <Link
                    href="https://www.reddit.com/r/sre/comments/1f35d9m/comment/lkcwd8d/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button"
                    className="text-blue-400 hover:text-blue-300"
                    target="_blank"
                  >
                    Source
                  </Link>
                  )
                </figcaption>
              </figure>
            </div>

            <div>
              <h3
                className="group relative mb-8 text-3xl font-bold leading-normal text-white"
                id="ingest-guard"
              >
                <Link href="#ingest-guard" className="flex items-center hover:text-gray-300">
                  <LinkIcon className="absolute -left-7 h-5 w-5 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  Ability to create data ingestion limits with Ingest Guard
                </Link>
              </h3>
              <p className="mb-4 text-[1.1rem] text-gray-300">
                Our{' '}
                <Link
                  href="https://signoz.io/blog/introducing-ingest-guard-feature/"
                  className="text-blue-400 hover:text-blue-300"
                  target="_blank"
                >
                  Ingest Guard feature
                </Link>{' '}
                can help you control observability costs by providing granular controls over data
                ingestion. You can set data ingestion limits with our ingestion keys.
              </p>
              <p className="mb-4 text-[1.1rem] text-gray-300">
                It enables a number of use cases around control of data ingestion and observability
                costs:
              </p>
              <ul className="mb-4 list-inside list-disc space-y-2 text-[1.1rem] text-gray-300">
                <li>
                  Set data ingestion limits based on the type of signal. For example, a daily limit
                  of 100GB on logs data ingestion.
                </li>
                <li>
                  Set data ingestion limits based on engineering teams. For example, you can allot
                  100GBs per day to Team A and 200GBs per day to Team B based on the use case.
                </li>
                <li>
                  Create separate ingestion keys for various environments (e.g., production,
                  staging, development) to control data sent from each environment individually.
                </li>
              </ul>
            </div>
          </div>

          {/* <div className="mt-12">
            <p className="mb-4 text-[1.1rem] italic text-gray-300">
              Listen to Shiv Ansal, CTO at Bands, explaining why he chose SigNoz over Datadog for
              his startup, Bands.
            </p>
            <div className="overflow-hidden rounded-lg">
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/lwRSrDo6N48"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg border border-gray-800 bg-gray-900/50 p-2 transition-transform duration-300 hover:scale-[1.02]"
              ></iframe>
              <Link
                href="https://signoz.io/teams/"
                target="_blank"
                className="block w-full bg-gray-800 py-4 text-center text-lg font-semibold text-white transition-colors hover:bg-gray-700"
              >
                Get Started with SigNoz for Free →
              </Link>
            </div>
          </div> */}
        </section>
        {/* Section End */}

        {/* FAQ Section */}
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2
            className="group relative mb-12 text-left text-4xl font-bold leading-normal text-white lg:text-5xl lg:leading-normal"
            id="faqs"
          >
            <Link href="#faqs" className="flex items-center hover:text-gray-300">
              <LinkIcon className="absolute -left-8 h-6 w-6 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
              FAQs
            </Link>
          </h2>

          <FAQAccordion
            faqs={[
              {
                question: 'Does SigNoz offer a free trial?',
                answer: (
                  <span>
                    Yes, we do offer a free trial. When you{' '}
                    <Link
                      href="https://signoz.io/teams/"
                      className="text-orange-500 hover:text-orange-400"
                    >
                      sign up
                    </Link>{' '}
                    for SigNoz Cloud, you get 30 days of free trial with access to all features.
                  </span>
                ),
              },
              {
                question: 'How do I estimate my usage in SigNoz?',
                answer: (
                  <span>
                    You can use our{' '}
                    <Link
                      href="https://signoz.io/pricing/#estimate-your-monthly-bill"
                      className="text-orange-500 hover:text-orange-400"
                      target="_blank"
                    >
                      pricing calculator
                    </Link>{' '}
                    to estimate your monthly bill with SigNoz.
                  </span>
                ),
              },
              {
                question: 'How is custom metric charged in SigNoz?',
                answer: (
                  <span>
                    All metrics are charged at the same price in SigNoz. We do not categorize any
                    metric as "custom" as is done by Datadog. You can estimate your metrics billing
                    in SigNoz with this{' '}
                    <Link
                      href="https://signoz.io/pricing/metrics-cost-estimation/"
                      className="text-orange-500 hover:text-orange-400"
                      target="_blank"
                    >
                      calculator
                    </Link>
                    .
                  </span>
                ),
              },
            ]}
          />
        </section>

        {/* Migration Section */}
        <section className="mx-auto max-w-4xl rounded-xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 px-4 py-12 sm:px-6">
          <h2 className="mb-8 text-left text-xl font-bold lg:text-2xl">
            Migrate from Datadog - Save up to 80% on your Datadog bill
          </h2>
          <div className="text-gray-300">
            <p className="mb-6 text-[1.1rem] text-gray-300">
              We provide support for migrating from Datadog to SigNoz if your monthly billing in
              Datadog is greater than 1000 USD. Request a migration from one of our experts and get
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
                target="_blank"
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
      </div>
    </div>
  )
}

export default SigNozVsDatadogV2
