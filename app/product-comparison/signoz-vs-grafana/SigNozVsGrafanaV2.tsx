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
  Database,
  Server,
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
import FloatingTableOfContents from '@/components/TableOfContents/FloatingTableOfContents'
import TrackingLink from '@/components/TrackingLink'

const data = [
  {
    name: 'Small engineering team',
    SigNoz: 1078,
    Grafana: 1960,
  },
  {
    name: 'Midsize engineering team',
    SigNoz: 4903,
    Grafana: 8920,
  },
  {
    name: 'Large engineering team',
    SigNoz: 9412,
    Grafana: 17140,
  },
]

const ValueComparisonChart = () => {
  return (
    <div className="w-full rounded-lg bg-gray-900 p-6">
      <h4 className="mb-4 text-xl text-white">Get up to 45% more value for money with SigNoz</h4>
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
            <Bar dataKey="Grafana" fill="#4ade80" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const SigNozVsGrafanaV2 = () => {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A]">
      <FloatingTableOfContents />
      <div className="bg-dot-pattern masked-dots absolute top-0 flex h-full w-full items-center justify-center" />
      <div className="absolute left-0 right-0 top-0 mx-auto h-[300px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(74,222,128,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:h-[450px] sm:bg-[center_-500px] md:h-[956px]" />
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
              SigNoz vs Grafana
            </h1>
            <h3 className="mb-8 text-lg font-normal text-gray-300 lg:text-xl">
              Under the hood, Grafana is powered by multiple tools like Loki, Tempo, Mimir &
              Prometheus. SigNoz is powered by a single columnar datastore to serve logs, metrics,
              and traces in a single pane of glass from Day 1, which enables better context for
              troubleshooting performance issues.
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <TrackingLink
                  href="/teams/"
                  clickType="Primary CTA"
                  clickName="Sign Up Button"
                  clickText="Get Started with SigNoz Cloud"
                  clickLocation="Hero Section"
                >
                  <Button className="flex items-center justify-center gap-2 font-bold">
                    Get Started with SigNoz Cloud <ArrowRight className="h-4 w-4" />
                  </Button>
                </TrackingLink>
                <TrackingLink
                  href="/docs/install/"
                  clickType="Secondary CTA"
                  clickName="Self-Host SigNoz Button"
                  clickText="Self-Host SigNoz"
                  clickLocation="Hero Section"
                >
                  <Button
                    type={Button.TYPES.SECONDARY}
                    className="flex items-center justify-center gap-2 font-bold"
                  >
                    <Server className="h-4 w-4" />
                    Self-Host SigNoz
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

        {/* Why do Engineering Teams Choose SigNoz over Grafana? */}
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2
            className="group relative mb-12 text-left text-4xl font-bold leading-normal text-white lg:text-5xl lg:leading-normal"
            id="why-choose-signoz"
          >
            <Link href="#why-choose-signoz" className="flex items-center hover:text-gray-300">
              <LinkIcon className="absolute -left-8 h-6 w-6 text-green-400 opacity-0 transition-opacity group-hover:opacity-100" />
              Why do Engineering Teams Choose SigNoz over Grafana?
            </Link>
          </h2>

          <div className="mb-8">
            <p className="text-lg text-gray-300">
              SigNoz is loved by developers. With over 20,000+ Github stars, it's one of the top
              projects in the observability domain. We have helped many of our users to make the
              switch from Grafana.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/10">
                <Database className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h4 className="mb-8 text-3xl font-bold leading-normal text-white">
                  Single Application vs Composable Observability
                </h4>
                <p className="text-gray-300">
                  Grafana started as a data visualization tool. It slowly evolved into a tool that
                  can take data from multiple data sources for visualization.
                </p>
                <p className="mt-4 text-gray-300">
                  For observability, Grafana offers the LGTM stack (Loki for logs, Grafana for
                  visualization, Tempo for traces, and Mimir for metrics). You need to configure and
                  maintain multiple configurations for a full-stack observability setup.
                </p>
                <p className="mt-4 text-gray-300">
                  The spread of tooling and configs due to different backends for each signal
                  impacts developer experience and has a steeper learning curve.
                </p>
                <figure className="mb-8">
                  <Image
                    src="/img/blog/2025/01/grafana-challenges.webp"
                    alt="Challenges with Grafana being discussed by users (Source: HackerNews)"
                    width={800}
                    height={400}
                    className="mb-2 rounded-lg border border-gray-800 bg-gray-900/50 p-2 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.02]"
                  />
                  <figcaption className="text-sm text-gray-400">
                    Challenges with Grafana being discussed by users (
                    <Link
                      href="https://news.ycombinator.com/item?id=42660321"
                      rel="nofollow"
                      target="_blank"
                      className="text-blue-500 underline hover:text-blue-400"
                    >
                      Source: HackerNews
                    </Link>
                    )
                  </figcaption>
                </figure>
                <p className="mt-4 text-gray-300">
                  SigNoz is powered by a single columnar datastore, ClickHouse. And SigNoz is
                  OpenTelemetry-native. It’s easier to set up collection of all types telemetry data
                  supported by OpenTelemetry and send it to SigNoz for visualization.
                </p>
                <p className="mt-4 text-gray-300">
                  Ingestion, storage, querying, and visualization are optimized for ease of use and
                  intelligent out-of-box correlation between the three signals.
                </p>
                <p className="mt-4 text-gray-300">
                  For open-source and self-hosted users of SigNoz, there is less operational
                  overhead and a better developer experience because of using a single data store.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                <GitBranch className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h4 className="mb-8 text-3xl font-bold leading-normal text-white">
                  SigNoz optimizes OTel attributes for faster querying, Loki was not built to index
                  and query high-cardinality data
                </h4>
                <p className="text-gray-300">
                  SigNoz allows you to index any kind of OpenTelemetry attribute. By default, we
                  index all resource attribute regardless of its data type and cardinality.
                </p>
                <p className="text-gray-300">
                  Loki only indexes some of the low cardinality attributes, and the default limit of
                  these resource attributes is 15. (
                  <Link
                    href="https://grafana.com/docs/loki/latest/send-data/otel/#loki-configuration"
                    className="text-blue-400 hover:text-blue-300"
                    target="_blank"
                  >
                    Source
                  </Link>
                  )
                </p>
                <p className="text-gray-300">
                  In Loki, while converting attribute values in OTLP to index label values or
                  structured metadata, any non-string values are converted to a string. While SigNoz
                  supports indexing of attributes in string, number, and boolean. For example, in
                  SigNoz, we can index duration, which makes querying and aggregating data faster.
                  In Loki, if you want to perform an aggregation on such data, it happens over
                  non-indexed data.(
                  <Link
                    href="https://grafana.com/docs/loki/latest/send-data/otel/"
                    className="text-blue-400 hover:text-blue-300"
                    target="_blank"
                  >
                    Source
                  </Link>
                  )
                </p>
                <p className="text-gray-300">
                  Loki, by design, is optimized for cost-effective log aggregation and storage
                  rather than high-performance indexing. It doesn't support full-text indexing or
                  advanced indexing on high-cardinality data like some other systems (e.g.,
                  Elasticsearch).
                </p>

                <p className="text-gray-300">
                  Instead, Loki focuses on indexing only labels (tags or metadata), making it ideal
                  for scenarios where structured queries based on metadata are sufficient. So, for
                  normal cases, it will use the labels, which are streams, as the main filter and
                  then filter on the log data that is stored.
                </p>
                <p className="text-gray-300">
                  "As a Loki user or operator, your goal should be to use the fewest labels possible
                  to store your logs." (
                  <Link
                    href="https://grafana.com/blog/2020/08/27/the-concise-guide-to-labels-in-loki/"
                    className="text-blue-400 hover:text-blue-300"
                    target="_blank"
                  >
                    Source: Grafana
                  </Link>
                  )
                </p>
                <p className="mt-4 text-gray-300">
                  We did a logs performance benchmark of open-source SigNoz with Elasticsearch and
                  Loki. Our key findings for Loki showed:
                </p>
                <ul className="mt-2 list-disc pl-6 text-gray-300">
                  <li>Ingestion is mainly limited by the number of streams that it can handle.</li>
                  <li>Loki was not able to return the results of our test queries.</li>
                  <li>Loki took the least amount of storage as it indexed only two keys.</li>
                </ul>
                <div className="mt-4 rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                  <Link
                    href="https://signoz.io/blog/logs-performance-benchmark/"
                    className="text-lg font-medium text-blue-400 hover:text-blue-300"
                    target="_blank"
                  >
                    Read our Logs Performance Benchmark →
                  </Link>
                </div>
                <p className="mt-4 text-gray-300">
                  SigNoz is able to perform fast aggregation queries and also has efficient resource
                  utilization during ingestion.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500/10">
                <ChartBar className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <h4 className="mb-8 text-3xl font-bold leading-normal text-white">
                  SigNoz offers a better dev experience for creating complex aggregations
                </h4>
                <p className="text-gray-300">
                  SigNoz allows you to query any attribute and create complex aggregations on it.
                  Our datastore, ClickHouse is built to support aggregations over massive datasets.
                </p>
                <p className="mt-4 text-gray-300">
                  SigNoz allows querying and aggregation with a simple query builder where you can
                  create any analytical query with just a few clicks.
                </p>
                <p className="mt-4 text-gray-300">
                  Here's a quick demo of filtering for traces coming from a particular environment,
                  then grouping them by k8s pod name to calculate latencies of spans from these
                  pods.
                </p>
                <div className="mb-8">
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
                <p className="mt-4 text-gray-300">
                  In Grafana, you have to learn different query languages for different signals. For
                  example, LogQL for logs, and traceQL for traces.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500/10">
                <ChartBar className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <h4 className="mb-8 text-3xl font-bold leading-normal text-white">
                  SigNoz uses columnar database for faster ingestion & aggregation
                </h4>
                <p className="text-gray-300">
                  SigNoz uses ClickHouse - a fast open-source distributed columnar database for all
                  three types of signals - logs, metrics, and traces. It was built to do analytical
                  queries like `Group By` fast.{' '}
                  <Link
                    href="https://clickhouse.com/docs/en/concepts/why-clickhouse-is-so-fast"
                    className="text-blue-400 hover:text-blue-300"
                    target="_blank"
                  >
                    Read more on what makes ClickHouse so fast →
                  </Link>
                </p>
                <p className="mt-4 text-gray-300">
                  Ingestion and aggregations are lightning-fast while providing best-in-class
                  compression for economical storage.
                </p>
              </div>
            </div>

            {/* <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500/10">
                <ScrollText className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <h4 className="mb-8 text-3xl font-bold leading-normal text-white">
                  Loki was not built to index and query high-cardinality data
                </h4>
                <p className="text-gray-300">
                  Loki doesn't perform well if you want to index and query high-cardinality data.
                  <br />
                  <br />
                  "As a Loki user or operator, your goal should be to use the fewest labels possible
                  to store your logs." (
                  <Link
                    href="https://grafana.com/blog/2020/08/27/the-concise-guide-to-labels-in-loki/"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Source: Grafana
                  </Link>
                  )
                </p>
                <p className="mt-4 text-gray-300">
                  We did a logs performance benchmark of open-source SigNoz with Elasticsearch and
                  Loki. Our key findings for Loki showed:
                </p>
                <ul className="mt-2 list-disc pl-6 text-gray-300">
                  <li>Ingestion is mainly limited by the number of streams that it can handle.</li>
                  <li>Loki was not able to return the results of our test queries.</li>
                  <li>Loki took the least amount of storage as it indexed only two keys.</li>
                </ul>
                <div className="mt-4 rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                  <Link
                    href="https://signoz.io/blog/logs-performance-benchmark/"
                    className="text-lg font-medium text-blue-400 hover:text-blue-300"
                  >
                    Read our Logs Performance Benchmark →
                  </Link>
                </div>
                <p className="mt-4 text-gray-300">
                  SigNoz is able to perform fast aggregation queries and also has efficient resource
                  utilization during ingestion.
                </p>
              </div>
            </div> */}

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                <Server className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h4 className="mb-8 text-3xl font-bold leading-normal text-white">
                  SigNoz is much easier to self-host
                </h4>
                <p className="text-gray-300">
                  If you want a self-hosted solution, SigNoz is a better choice. Since Grafana has
                  multiple backends for different telemetry signals, it's difficult to manage. With
                  SigNoz, you only need to manage a single backend for a full-stack observability
                  setup. We also provide{' '}
                  <Link
                    href="https://signoz.io/pricing/"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    managed self-host services
                  </Link>
                  .
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link href="/docs/install/">
                    <Button className="flex items-center gap-2">
                      Start with Community Edition
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/enterprise/">
                    <Button type={Button.TYPES.SECONDARY} className="flex items-center gap-2">
                      Sign-up for Managed Self-host
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
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
              <LinkIcon className="absolute -left-8 h-6 w-6 text-green-400 opacity-0 transition-opacity group-hover:opacity-100" />
              Product Comparison
            </Link>
          </h2>

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
                      Grafana
                    </th>
                    <th className="border-b border-gray-800 bg-gray-900/80 px-6 py-4 font-medium text-gray-400">
                      Remarks
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="transition-colors hover:bg-gray-800/50">
                    <td className="border-b border-gray-800/50 px-6 py-4">Self-Host</td>
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
                      For Grafana, you need to manage multiple backends if you opt for self-host
                      which is a lot of operational overhead.
                    </td>
                  </tr>
                  <tr className="transition-colors hover:bg-gray-800/50">
                    <td className="border-b border-gray-800/50 px-6 py-4">
                      APM metrics to logs & traces
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
                      You can jump from APM metrics to logs & traces.
                    </td>
                  </tr>
                  <tr className="transition-colors hover:bg-gray-800/50">
                    <td className="border-b border-gray-800/50 px-6 py-4">Traces to logs</td>
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
                      You can jump from traces to associated logs to get more context while
                      troubleshooting.
                    </td>
                  </tr>
                  <tr className="transition-colors hover:bg-gray-800/50">
                    <td className="border-b border-gray-800/50 px-6 py-4">No User-based Pricing</td>
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
                      Grafana charges $20 per active IRM user.{' '}
                      <Link
                        href="https://grafana.com/pricing/#irm"
                        rel="nofollow"
                        className="text-blue-500 underline hover:text-blue-400"
                      >
                        (Source)
                      </Link>
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
                      >
                        Exceptions tab
                      </Link>{' '}
                      that automatically lists down all exceptions captured automatically from an
                      OTel instrumented application.
                    </td>
                  </tr>
                  <tr className="transition-colors hover:bg-gray-800/50">
                    <td className="border-b border-gray-800/50 px-6 py-4">
                      OTel-native Messaging Queue Monitoring
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
                      Indexing on all Otel resource attributes
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
                      Grafana only indexes resources attributes of otel logs by default and the
                      default limit of this resource attributes is 15.
                    </td>
                  </tr>
                  <tr className="transition-colors hover:bg-gray-800/50">
                    <td className="border-b border-gray-800/50 px-6 py-4">
                      Indexing of attributes in string, number, bool
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
                      Loki converts all non-string values to string while indexing. SigNoz supports
                      indexing of attributes in string, number, or boolean.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Better Value for Money Section */}
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2
            className="group relative mb-12 text-left text-4xl font-bold leading-normal text-white lg:text-5xl lg:leading-normal"
            id="value-for-money"
          >
            <Link href="#value-for-money" className="flex items-center hover:text-gray-300">
              <LinkIcon className="absolute -left-8 h-6 w-6 text-green-400 opacity-0 transition-opacity group-hover:opacity-100" />
              Better Value for Money
            </Link>
          </h2>

          <p className="mb-8 text-[1.1rem] text-gray-300">
            We did a pricing comparison of SigNoz with other popularity observability tools
            including Grafana. SigNoz can save up to 45% of your Grafana bill.
          </p>

          <div className="mb-12">
            <ValueComparisonChart />
          </div>

          <div className="mb-8 rounded-lg border border-gray-800 bg-gray-900/50 p-4">
            <Link
              href="https://signoz.io/blog/pricing-comparison-signoz-vs-datadog-vs-newrelic-vs-grafana/"
              className="text-lg font-medium text-blue-400 hover:text-blue-300"
              target="_blank"
            >
              Read detailed pricing comparison →
            </Link>
          </div>
        </section>

        {/* Experience Seamless All-in-one Observability */}
        <section className="mx-auto max-w-4xl rounded-xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 px-4 py-12 sm:px-6">
          <h2 className="mb-8 text-left text-xl font-bold lg:text-2xl">
            Migrate from Grafana - Save up to 45% on your Grafana bill
          </h2>
          <div className="text-gray-300">
            <p className="mb-6 text-[1.1rem] text-gray-300">
              Under the hood, SigNoz is powered by a single datastore for all three signals - logs,
              metrics & traces. Unlike Grafana, SigNoz is also built for all-in-one observability
              from day 1.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/teams/" className="block max-w-md">
                <Button className="flex w-full items-center justify-center gap-2 font-bold">
                  Try SigNoz Cloud <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/docs/install/" className="block max-w-md">
                <Button
                  type={Button.TYPES.SECONDARY}
                  className="flex w-full items-center justify-center gap-2 font-bold"
                >
                  <Server className="h-4 w-4" />
                  Self-Host SigNoz
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SigNozVsGrafanaV2
