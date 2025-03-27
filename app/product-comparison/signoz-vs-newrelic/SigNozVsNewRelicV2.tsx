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
import NewrelicMigrationFloatingCard from '@/components/MigrationFloatingCard/NewrelicMigrationFloatingCard'
import FloatingTableOfContents from '@/components/TableOfContents/FloatingTableOfContents'
import { XCircle } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'

const data = [
  {
    name: 'Small engineering team',
    SigNoz: 1078,
    NewRelic: 3511,
  },
  {
    name: 'Midsize engineering team',
    SigNoz: 4903,
    NewRelic: 14823,
  },
  {
    name: 'Large engineering team',
    SigNoz: 9412,
    NewRelic: 29152,
  },
]

const ValueComparisonChart = () => {
  return (
    <div className="w-full rounded-lg bg-gray-900 p-6">
      <h4 className="mb-4 text-xl text-white">Get up to 67% more value for money with SigNoz</h4>
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
            <Bar dataKey="NewRelic" fill="#9333ea" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const SigNozVsNewRelicV2 = () => {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A]">
      <div className="bg-dot-pattern masked-dots absolute top-0 flex h-full w-full items-center justify-center" />
      <div className="absolute left-0 right-0 top-0 mx-auto h-[300px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(255,127,80,1)] to-[rgba(220,69,69,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:h-[450px] sm:bg-[center_-500px] md:h-[956px]" />
      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 sm:pb-32 lg:px-8 lg:pt-32">
        {/* Hero Section */}
        <section className="container mx-auto mb-10 flex flex-col items-center justify-between lg:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-10 w-full lg:mb-0 lg:w-2/5"
          >
            <h1 className="mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-5xl font-bold leading-[1.3] text-transparent lg:text-6xl lg:leading-[1.3]">
              SigNoz vs New Relic
            </h1>
            <h3 className="mb-8 text-lg font-semibold text-gray-300 lg:text-xl">
              Tired of New Relic's user-based pricing? Even for teams of 10-15 devs, New Relic's
              pricing for user seats can be a significant portion of your monthly bill - check{' '}
              <Link
                href="/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/"
                className="text-blue-400 hover:text-blue-300"
                target="_blank"
              >
                comparison with detailed spreadsheet
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
                  href="/product-comparison/newrelic-savings/"
                  clickType="Secondary CTA"
                  clickName="NewRelic Savings Form Link"
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
            <div className="overflow-hidden rounded-xl shadow-2xl shadow-blue-400/20">
              <video autoPlay muted loop className="w-full lg:w-[120%]">
                <source src="/img/unified-observability/showcase.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </section>

        {/* Why do Engineering Teams Choose SigNoz over New Relic? */}
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2
            className="group relative mb-12 text-left text-4xl font-bold leading-normal text-white lg:text-5xl lg:leading-normal"
            id="why-choose-signoz"
          >
            <Link href="#why-choose-signoz" className="flex items-center hover:text-gray-300">
              <LinkIcon className="absolute -left-8 h-6 w-6 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
              Why do Engineering Teams Choose SigNoz over New Relic?
            </Link>
          </h2>

          <div className="mb-8">
            <p className="text-lg text-gray-300">
              SigNoz is a great choice as a New Relic Alternative. We built SigNoz to address the
              absence of a great one-stop observability tool in the open-source ecosystem. Something
              that comes with the ease of a SaaS tool like New Relic but brings along the benefits
              of open-source standards.
              <br />
              <br />
              Top reasons why developers prefer SigNoz over New Relic:
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
                  potential. New Relic gives preference to its agent. If you want to do
                  OpenTelemetry, SigNoz is the best choice.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                <ChartBar className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h4 className="mb-8 text-3xl font-bold leading-normal text-white">
                  Arbitrary attribute-based querying powered by Columnar Database
                </h4>
                <p className="text-gray-300">
                  SigNoz uses ClickHouse as a datastore under the hood. ClickHouse is a columnar
                  database built to deliver high querying processing speed for OLAP (Online
                  Analytical Processing), which refers to SQL queries with complex calculations
                  (e.g., aggregations, string processing, arithmetics) over massive datasets.
                  <br />
                  <br />
                  With SigNoz, you can quickly do complex aggregations on any attribute present in
                  your observability data to get valuable insights about your application and
                  infrastructure.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/10">
                <DraftingCompass className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h4 className="mb-8 text-3xl font-bold leading-normal text-white">
                  Flexible Deployment Options
                </h4>
                <p className="text-gray-300">
                  SigNoz provides both cloud & self-hosted versions. You can use the cloud,
                  enterprise self-host, or free, open-source community edition, depending on your
                  needs. Many of our users use{' '}
                  <Link
                    href="/docs/install/docker/"
                    className="text-blue-400 hover:text-blue-300"
                    target="_blank"
                  >
                    open-source SigNoz
                  </Link>{' '}
                  in dev environments and{' '}
                  <Link
                    href="https://signoz.io/teams/"
                    className="text-blue-400 hover:text-blue-300"
                    target="_blank"
                  >
                    SigNoz Cloud
                  </Link>{' '}
                  for production environments. Privacy-focused users prefer{' '}
                  <Link
                    href="/pricing/"
                    className="text-blue-400 hover:text-blue-300"
                    target="_blank"
                  >
                    enterprise self-hosted
                  </Link>{' '}
                  version.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500/10">
                <Users className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <h4 className="mb-8 text-3xl font-bold leading-normal text-white">
                  Better value for money
                </h4>
                <p className="text-gray-300">
                  New Relic charges for data ingest and user seats. New Relic's user seat pricing
                  can go up to $418.8 per full-platform user. User-based pricing is outdated. You
                  never know which engineer might need to access the monitoring tool for debugging.
                  At SigNoz, we don't charge based on user seats.
                </p>
              </div>
            </div>
          </div>
        </section>

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
            {/* OpenTelemetry Support Section */}
            <section>
              <h2
                className="group relative mb-8 text-3xl font-bold leading-normal text-white"
                id="opentelemetry-support"
              >
                <Link
                  href="#opentelemetry-support"
                  className="flex items-center hover:text-gray-300"
                >
                  <LinkIcon className="absolute -left-8 h-6 w-6 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  OpenTelemetry-Native Support
                </Link>
              </h2>

              <p className="mb-6 text-[1.1rem] text-gray-300">
                SigNoz offers the best-in-class support for OpenTelemetry data. New Relic
                prioritizes support for its own agent. If you're using OpenTelemetry or planning to
                use it, SigNoz is a better choice than New Relic.
                <br />
                <br />
                The table below summarizes some key differences in OpenTelemetry support between
                SigNoz and New Relic.
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
                          New Relic
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
                          Out-of-box APM charts
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
                          New Relic doesn't provide APM charts like Apdex from OTel instrumented
                          applications.
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
                          UI based on OTel Data model
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
                          SigNoz respects OTel data hierarchy to show attributes & resource
                          attributes in different colors making it easier for users to identify the
                          type of attributes/tags they use for filtering.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          OTel-based Feature Flags
                        </td>
                        <td className="border-b border-gray-800/50 px-4 py-4">
                          <div className="flex items-center gap-2">
                            <span>Yes (in roadmap)</span>
                          </div>
                        </td>
                        <td className="border-b border-gray-800/50 px-4 py-4">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            <span>No</span>
                          </div>
                        </td>
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Native support for OpenFeature feature flag.{' '}
                          <Link
                            href="https://www.youtube.com/watch?v=RZSEi8csXK0"
                            className="text-blue-400 hover:text-blue-300"
                            target="_blank"
                            rel="nofollow noreferrer"
                          >
                            Learn More
                          </Link>
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
                                rel="nofollow noreferrer"
                              >
                                OpenTelemetry demo app
                              </Link>{' '}
                              on 09 January 2025.
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

              {/* Messaging Queue Monitoring Section */}
              <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
                <h4 className="mb-6 text-2xl font-bold leading-snug text-white">
                  Leveraging OTel data for messaging queue monitoring
                </h4>

                <p className="mb-6 text-[1.1rem] text-gray-300">
                  Most monitoring tools are limited to metrics for monitoring messaging queues like
                  Kafka, Celery, etc. But leveraging OpenTelemetry's trace context propagation and
                  semantic conventions, we've enabled end-to-end observability for messaging queues
                  like Kafka.
                </p>

                <figure className="mb-8">
                  <Image
                    src="/img/product-comparisons/signoz-vs-newrelic/Leveraging OTel data for messaging queue monitoring.webp"
                    alt="Enhance observability of messaging queues with OTel powered correlated trace and metrics"
                    width={800}
                    height={400}
                    className="mb-2 rounded-lg border border-gray-800 bg-gray-900/50 p-2 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.02]"
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
                  <Link href="/docs/messaging-queues/kafka/" target="_blank">
                    <Button type={Button.TYPES.SECONDARY} className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Read Kafka Monitoring Documentation
                    </Button>
                  </Link>
                </div>
              </section>
            </section>

            {/* Arbitrary Attribute-Based Querying Section */}
            <section>
              <h2
                className="group relative mb-8 text-3xl font-bold leading-normal text-white"
                id="attribute-querying"
              >
                <Link href="#attribute-querying" className="flex items-center hover:text-gray-300">
                  <LinkIcon className="absolute -left-8 h-6 w-6 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  Arbitrary Attribute-Based Querying & Aggregation
                </Link>
              </h2>

              <p className="mb-6 text-[1.1rem] text-gray-300">
                SigNoz allows you to query any attribute and create complex aggregations on it. Our
                datastore, ClickHouse is built to support aggregations over massive datasets. New
                Relic's trace and logs explorer comes with quick search features whereas in SigNoz,
                you can use query builder to do both filtering and aggregations on trace, metrics &
                logs data.
              </p>

              <p className="mb-6 text-[1.1rem] text-gray-300">
                In New Relic, you have to use{' '}
                <Link
                  href="https://docs.newrelic.com/docs/nrql/get-started/introduction-nrql-new-relics-query-language/"
                  className="text-blue-400 hover:text-blue-300"
                  target="_blank"
                  rel="nofollow noreferrer"
                >
                  NRQL
                </Link>{' '}
                to create queries that involves aggregations. NRQL has a steep learning curve and is
                complex to understand.
              </p>

              <p className="mb-6 text-[1.1rem] text-gray-300">
                SigNoz allows querying and aggregation with a simple query builder where you can
                create any analytical query with just a few clicks.
              </p>

              <div className="mb-8">
                <p className="mb-4 text-[1.1rem] text-gray-300">
                  Here's a quick demo of filtering for traces coming from a particular environment,
                  then grouping them by k8s pod name to calculate latencies of spans from these
                  pods.
                </p>
                <div className="overflow-hidden rounded-xl shadow-2xl">
                  <video autoPlay muted loop className="w-full">
                    <source
                      src="/img/product-comparisons/signoz-vs-newrelic/Arbitrary Attribute-Based Querying & Aggregation.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  Filtering and complex aggregations can be done with a simple query builder.
                </p>
              </div>
            </section>

            {/* Application Performance Monitoring Section */}
            <section>
              <h2
                className="group relative mb-8 text-3xl font-bold leading-snug text-white"
                id="apm"
              >
                <Link href="#apm" className="flex items-center hover:text-gray-300">
                  <LinkIcon className="absolute -left-8 h-6 w-6 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  Application Performance Monitoring
                </Link>
              </h2>

              <p className="mb-6 text-[1.1rem] text-gray-300">
                Our APM capabilities are on par with those of New Relic. New Relic's APM module
                comes with a segregated view for services instrumented by OpenTelemetry. Out-of-box
                charts for services instrumented with OpenTelemetry are lesser compared to the ones
                done with the New Relic agent.
              </p>

              <figure className="mb-8">
                <Image
                  src="/img/product-comparisons/signoz-vs-newrelic/Application Performance Monitoring.webp"
                  alt="Application instrumented by OpenTelemetry are segregated from those instrumented with NR agents"
                  width={800}
                  height={400}
                  className="mb-2 rounded-lg border border-gray-800 bg-gray-900/50 p-2 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.02]"
                />
                <figcaption className="text-sm text-gray-400">
                  Application instrumented by OpenTelemetry are segregated from those instrumented
                  with NR agents
                </figcaption>
              </figure>

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
                          New Relic
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
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            <span>Limited for OTel data</span>
                          </div>
                        </td>
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          New Relic doesn't provide charts for Apdex, slowest transactions, logs in
                          context for OTel instrumented apps whereas it does it for NR agent.
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
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Yes</span>
                          </div>
                        </td>
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Both SigNoz & New Relic provides latency charts.
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
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Yes</span>
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
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Yes</span>
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
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            <span>No for OTel data</span>
                          </div>
                        </td>
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Apdex is an open standard that defines a method to report, benchmark, and
                          rate application response time. New Relic doesn't provide Apdex for OTel
                          instrumented apps.
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
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Yes</span>
                          </div>
                        </td>
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Check RED metrics for external services.
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
                          Security Insights, Change tracking
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
                          Not available in SigNoz.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Log Management Section */}
            <section>
              <h2
                className="group relative mb-8 text-3xl font-bold leading-normal text-white"
                id="log-management"
              >
                <Link href="#log-management" className="flex items-center hover:text-gray-300">
                  <LinkIcon className="absolute -left-8 h-6 w-6 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  Log Management
                </Link>
              </h2>

              <p className="mb-6 text-[1.1rem] text-gray-300">
                Our logs module, powered by ClickHouse and in-house optimizations, delivers fast
                querying and filtering for logs at scale. <br />
                <br />
                SigNoz supports logs context with the lowest granularity of resources, while New
                Relic does not.
                <br />
                <br />
                In SigNoz, writing complex search and aggregation queries is easy with a
                click-and-select query builder. You can also create alerts directly from Logs
                Explorer. While in New Relic, you need to learn NRQL with no visual cues to create
                alerts.
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
                          New Relic
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
                          Quick Search & Filter
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
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Yes</span>
                          </div>
                        </td>
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Click on detailed view of logs and go to related span if trace id is
                          present in logs.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Customization of logs view
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
                          Customize your logs view with different formats, font sizes, columns etc.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Click & Select Query Builder
                        </td>
                        <td className="border-b border-gray-800/50 px-4 py-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Yes</span>
                          </div>
                        </td>
                        <td className="border-b border-gray-800/50 px-4 py-4">
                          <div className="flex items-center gap-2">
                            <XCircle className="h-4 w-4 text-red-500" />
                            <span>No</span>
                          </div>
                        </td>
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          SigNoz allows you to write complex queries using click & select query
                          builder. In New Relic, you need to learn NRQL to create complex queries.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">Alerts on logs</td>
                        <td className="border-b border-gray-800/50 px-4 py-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Yes</span>
                          </div>
                        </td>
                        <td className="border-b border-gray-800/50 px-4 py-4">
                          <div className="flex items-center gap-2">
                            <XCircle className="h-4 w-4 text-red-500" />
                            <span>No</span>
                          </div>
                        </td>
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Define alert conditions easily with click & select query builder or
                          ClickHouse queries on your logs data in SigNoz. In New Relic, you need to
                          use NRQL with no visual cues to query trace data and then create alerts on
                          them.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          List View, Time Series, & Table View
                        </td>
                        <td className="border-b border-gray-800/50 px-4 py-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Yes</span>
                          </div>
                        </td>
                        <td className="border-b border-gray-800/50 px-4 py-4">
                          <div className="flex items-center gap-2">
                            <XCircle className="h-4 w-4 text-red-500" />
                            <span>No</span>
                          </div>
                        </td>
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          In New Relic, these visualization types are not available in Logs
                          explorer. You can access these visualizations with NRQL.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">Log Patterns</td>
                        <td className="border-b border-gray-800/50 px-4 py-4">
                          <div className="flex items-center gap-2">
                            <XCircle className="h-4 w-4 text-red-500" />
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
                          Log patterns allow you to identify patterns in log data quickly.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">Logs Context</td>
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
                          SigNoz supports logs context with the lowest granularity of resource while
                          New Relic does not.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Distributed Tracing Section */}
            <section>
              <h2
                className="group relative mb-8 text-3xl font-bold leading-normal text-white"
                id="distributed-tracing"
              >
                <Link href="#distributed-tracing" className="flex items-center hover:text-gray-300">
                  <LinkIcon className="absolute -left-8 h-6 w-6 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  Distributed Tracing
                </Link>
              </h2>

              <p className="mb-6 text-[1.1rem] text-gray-300">
                SigNoz provides an easy click & select query builder to create complex queries on
                your trace data. You can also create aggregations on trace data, add it to a
                dashboard and set alerts on them easily. While in New Relic, you need to ramp up on
                NRQL which has a steeper learning curve.
              </p>

              <div className="my-6 overflow-hidden rounded-xl shadow-2xl">
                <video autoPlay muted loop className="w-full">
                  <source
                    src="/img/product-comparisons/signoz-vs-newrelic/Distributed Tracing.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>

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
                          New Relic
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
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Yes</span>
                          </div>
                        </td>
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Search on all your spans using quick search bar. SigNoz also allows quick
                          filters with checkboxes.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">Root span view</td>
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
                          See the list of first span in traces
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">List View (Spans)</td>
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
                          See all your spans in a list view.
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
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                            <span>No</span>
                          </div>
                        </td>
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          List of quick filters like environment, status, operation name to quickly
                          filter specific spans.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">Time Series View</td>
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
                          New Relic doesn't allow visualizations like time series view in trace
                          explorer. You need to use its query editor to create these charts.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Click & Select Query Builder
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
                          SigNoz allows you to write complex queries using click & select query
                          builder. In New Relic, you need to learn NRQL to create complex queries.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">Alerts on traces</td>
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
                          Define alert conditions easily with click & select query builder or
                          ClickHouse queries on your trace data in SigNoz. In New Relic, you need to
                          use NRQL with no visual cues to query trace data and then create alerts on
                          them.
                        </td>
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Anomaly-based alerts
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
                          Set alerts with dynamic thresholds that adapt to historical data,
                          detecting anomalies.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Infrastructure Monitoring Section */}
            <section>
              <h2
                className="group relative mb-8 text-3xl font-bold leading-normal text-white"
                id="infrastructure-monitoring"
              >
                <Link
                  href="#infrastructure-monitoring"
                  className="flex items-center hover:text-gray-300"
                >
                  <LinkIcon className="absolute -left-8 h-6 w-6 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  Infrastructure Monitoring
                </Link>
              </h2>

              <p className="mb-6 text-[1.1rem] text-gray-300">
                If you want to use OpenTelemetry to collect telemetry from both your application and
                infrastructure, then SigNoz is the right choice. One of the biggest advantages of
                using OpenTelemetry is its{' '}
                <Link
                  href="https://opentelemetry.io/docs/concepts/semantic-conventions/"
                  className="text-blue-400 hover:text-blue-300"
                  target="_blank"
                  rel="nofollow noreferrer"
                >
                  semantic convention
                </Link>
                , which standardizes resource attributes across all signals.
              </p>

              <p className="mb-6 text-[1.1rem] text-gray-300">
                You can easily correlate your infrastructure monitoring metrics with logs, traces
                and metrics data generated by other components in your system. This gives better
                context while debugging your application for performance issues.
              </p>

              <p className="mb-6 text-[1.1rem] text-gray-300">
                That said, New Relic currently has a vast array of capabilities when it comes to
                infrastructure monitoring.
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
                          New Relic
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
                          Network Monitoring
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
                          Monitor network telemetry to troubleshoot network issues.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Other Platform Capabilities Section */}
            <section>
              <h2
                className="group relative mb-8 text-3xl font-bold leading-normal text-white"
                id="platform-capabilities"
              >
                <Link
                  href="#platform-capabilities"
                  className="flex items-center hover:text-gray-300"
                >
                  <LinkIcon className="absolute -left-8 h-6 w-6 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  Other Platform Capabilities
                </Link>
              </h2>

              <p className="mb-6 text-[1.1rem] text-gray-300">
                Some of the platform capabilities that we don't offer today and for which New Relic
                is a good choice.
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
                          New Relic
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Real User/Browser Monitoring
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
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Synthetic Monitoring
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
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">Code Profiling</td>
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
                      </tr>
                      <tr className="transition-colors hover:bg-gray-800/50">
                        <td className="border-b border-gray-800/50 px-6 py-4">
                          Security/Vulnerability Management
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
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* Savings Comparison Section */}
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2
            className="group relative mb-12 text-left text-4xl font-bold leading-normal text-white lg:text-5xl lg:leading-normal"
            id="savings"
          >
            <Link href="#savings" className="flex items-center hover:text-gray-300">
              <LinkIcon className="absolute -left-8 h-6 w-6 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
              Save up to 67% on your New Relic Bill
            </Link>
          </h2>

          <div className="mb-8">
            <ValueComparisonChart />
          </div>

          <p className="mb-6 text-[1.1rem] text-gray-300">
            For 20 APM hosts, 50 million indexed spans, 50 infra hosts, and 2500 GB logs data,
            SigNoz can save 67% of your New Relic bill.
            <br />
            <br />
            New Relic's{' '}
            <Link
              href="https://newrelic.com/pricing"
              className="text-blue-400 hover:text-blue-300"
              target="_blank"
              rel="nofollow noreferrer"
            >
              user pricing
            </Link>{' '}
            can go up to $418/user. At scale, the cost of adding users can go up to 66% of the total
            bill.
          </p>

          <figure className="mb-8">
            <Image
              src="/img/product-comparisons/signoz-vs-newrelic/newrelicpricinguserbased.webp"
              alt="User seat billing can constitute a significant portion of your total bill with New Relic."
              width={800}
              height={400}
              className="mb-2 rounded-lg border border-gray-800 bg-gray-900/50 p-2 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.02]"
            />
            <figcaption className="text-sm text-gray-400">
              User seat billing can constitute a significant portion of your total bill with New
              Relic.
            </figcaption>
          </figure>

          <div className="mb-6 rounded-lg border border-gray-800 bg-gray-900/50 p-4">
            <Link
              href="/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/"
              className="text-lg font-medium text-blue-400 hover:text-blue-300"
              target="_blank"
            >
              Detailed pricing comparison between SigNoz, New Relic, Datadog and Grafana →
            </Link>
          </div>
        </section>

        {/* Migration Section */}
        <section className="mx-auto max-w-4xl rounded-xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 px-4 py-12 sm:px-6">
          <h2 className="mb-8 text-left text-xl font-bold lg:text-2xl">
            Migrate from New Relic - Save up to 67% on your New Relic bill
          </h2>
          <div className="text-gray-300">
            <p className="mb-6 text-[1.1rem] text-gray-300">
              We provide support for migrating from New Relic to SigNoz if your monthly billing in
              New Relic is greater than 1000 USD. Request a migration from one of our experts and
              get started with SigNoz quickly.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/product-comparison/migrate-from-newrelic/" className="block max-w-md">
                <Button className="flex w-full items-center justify-center gap-2 font-bold">
                  Request migration support <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/teams/" className="block max-w-md" target="_blank">
                <Button
                  type={Button.TYPES.SECONDARY}
                  className="flex w-full items-center justify-center gap-2 font-bold"
                >
                  Try SigNoz Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <NewrelicMigrationFloatingCard />
      <FloatingTableOfContents />
    </div>
  )
}

export default SigNozVsNewRelicV2
