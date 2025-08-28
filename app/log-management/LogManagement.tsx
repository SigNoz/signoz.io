'use client'

import React from 'react'
import TabPanel from '@/components/TabPanel'
import Link from 'next/link'
import { ArrowRight, BookOpen, Atom, Coins, DatabaseZap } from 'lucide-react'
import Button from '@/components/ui/Button'
import StatsCard from '@/components/Card/card'
import { Card } from '@/components/ui/Card'
import Tabs from '@/components/Tabs'
import { Badge } from "@signozhq/badge"
// import FeatureCard from '@/components/FeatureCard/FeatureCard'
import ProductNav from '@/components/ProductNav/ProductNav'
import Image from 'next/image'
import AlternatingSides from '@/components/AlternatingSides/AlternatingSides'
import PricingCalculator from 'app/pricing/pricingv1/components/PricingCalculator'

const FEATURES = [
  {
    title: "Ingest Logs from Anywhere",
    description: "Get native infrastructure support to securely store logs from anywhere. With multiple collection methods to pick up, and bring your own tools to make data ingestion powered by OpenTelemetry standards.",
    buttonText: "Read Documentation",
    buttonLink: "/docs/introduction",
    component: (
      <Tabs entityName="sources">
        <TabPanel value="supported-sources" label="Supported Sources">
          <div className="flex flex-col gap-8">
            {/* Cloud Section */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="mb-4 text-sm font-medium uppercase text-signoz_vanilla-400">CLOUD</h3>
                <div className="grid grid-cols-3 gap-8">
                  <div className="flex items-center">
                    <img src="/img/sources/aws.svg" alt="AWS" className="h-8" />
                  </div>
                  <div className="flex items-center">
                    <img src="/img/sources/gcp.svg" alt="Google Cloud" className="h-8" />
                  </div>
                  <div className="flex items-center">
                    <img src="/img/sources/azure.svg" alt="Azure" className="h-8" />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-4 text-sm font-medium uppercase text-signoz_vanilla-400">CONTAINERS</h3>
                <div className="grid grid-cols-3 gap-8">
                  <div className="flex items-center">
                    <img src="/img/sources/aws.svg" alt="AWS" className="h-8" />
                  </div>
                  <div className="flex items-center">
                    <img src="/img/sources/gcp.svg" alt="Google Cloud" className="h-8" />
                  </div>
                  <div className="flex items-center">
                    <img src="/img/sources/azure.svg" alt="Azure" className="h-8" />
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Tools Section */}
            <div>
              <h3 className="mb-4 text-sm font-medium uppercase text-signoz_vanilla-400">POPULAR TOOLS</h3>
              <div className="grid grid-cols-6 gap-8">
                <div className="flex items-center">
                  <img src="/img/sources/heroku.svg" alt="Heroku" className="h-8" />
                </div>
                <div className="flex items-center">
                  <img src="/img/sources/datadog.svg" alt="Datadog" className="h-8" />
                </div>
                <div className="flex items-center">
                  <img src="/img/sources/splunk.svg" alt="Splunk" className="h-8" />
                </div>
                <div className="flex items-center">
                  <img src="/img/sources/redis.svg" alt="Redis" className="h-8" />
                </div>
                <div className="flex items-center">
                  <img src="/img/sources/mongodb.svg" alt="MongoDB" className="h-8" />
                </div>
                <div className="flex items-center">
                  <img src="/img/sources/nginx.svg" alt="Nginx" className="h-8" />
                </div>
              </div>
            </div>
            <Button variant="ghost" rounded="full" size={null} className="flex justify-center items-center gap-2 w-fit">
              VIEW ALL 50+ SOURCES
            </Button>
          </div>
        </TabPanel>
        <TabPanel value="collection-methods" label="Collection Methods">
          <div className="flex flex-col gap-8">
            {/* OpenTelemetry Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-sm font-medium uppercase text-signoz_vanilla-400 m-0">OPENTELEMETRY</h3>
                <Badge color="vanilla">Recommended</Badge>
              </div>
              <div className="flex items-center gap-8">
                <img src="/img/sources/opentelemetry.svg" alt="OpenTelemetry" className="h-8" />
              </div>
            </div>

            {/* Existing Agents Section */}
            <div>
              <h3 className="mb-4 text-sm font-medium uppercase text-signoz_vanilla-400">EXISTING AGENTS</h3>
              <div className="grid grid-cols-4 gap-8">
                <div className="flex items-center">
                  <img src="/img/sources/fluentbit.svg" alt="Fluent Bit" className="h-8" />
                </div>
                <div className="flex items-center">
                  <img src="/img/sources/fluentd.svg" alt="Fluentd" className="h-8" />
                </div>
                <div className="flex items-center">
                  <img src="/img/sources/vector.svg" alt="Vector" className="h-8" />
                </div>
              </div>
            </div>

            {/* Direct Integrations Section */}
            <div>
              <h3 className="mb-4 text-sm font-medium uppercase text-signoz_vanilla-400">DIRECT INTEGRATIONS</h3>
              <div className="flex flex-wrap gap-2">
                <Badge color="vanilla">HTTP Endpoints</Badge>
                <Badge color="vanilla">SDK Integrations</Badge>
                <Badge color="vanilla">Legacy support</Badge>
              </div>
            </div>

            {/* View Integration Guides */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" rounded="full" size={null}>
                VIEW INTEGRATION GUIDES
              </Button>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    )
  },
  {
    title: "Process on the Fly",
    description: "A powerful log pipeline helps you analyze everything you ingest, including service maps, application logs, and exceptions. Monitoring is effortless using lifecycle alerts including storage usage limits. Manual data manipulation is eliminated.",
    buttonText: "Read Documentation",
    buttonLink: "/docs/introduction",
    component: <Image src="/img/log-management/process-logs.png" alt="Process on the Fly" width={10000} height={10000} />
  },
  {
    title: "Correlate your Signals",
    description: "Monitor logs and traces automatically and easily debug from APM traces to related logs. Metrics correlation is log-based, and easy to add with OpenTelemetry standards.",
    buttonText: "Read Documentation",
    buttonLink: "/docs/introduction",
    component: "PLACEHOLDER_COMPONENT_3" // TODO: Replace with image
  },
  {
    title: "Analyze the Logs",
    description: "Optimized columnar storage design provides the high performance capabilities to scale storage and query millions of logs. Use dynamic alerts, advanced dashboards, and more integrated metrics to get advanced correlation filtering.",
    buttonText: "Read Documentation",
    buttonLink: "/docs/introduction",
    component: <Image src="/img/log-management/analyse-the-logs.png" alt="Analyze the Logs" width={10000} height={10000} />
  }
]
function LogsManagement() {
  return (
    <main className="!mt-[-10px] mb-auto">
      <ProductNav />
      <div className="relative bg-signoz_ink-500">
        <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
        <div className="absolute left-0 right-0 top-0 mx-auto h-[450px] w-full  flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />
        <Header />
        {/* <TrustedByTeams page="LogsManagement" /> */}
        {/* <SigNozFeatures /> */}
        <HeroCards />
        <div className="section-container !mx-auto !w-[100vw] border !border-b-0 border-dashed border-signoz_slate-400 !px-0 md:!w-[80vw]">
        <AlternatingSides items={FEATURES} />
          </div>
        {/* <SigNozUsage /> */}
        <UsageBasedPricing />
        {/* <ExploreDocs /> */}
        <SigNozStats />
        {/* TODO: Customer stories card */}
        {/* <GetStarted page="LogsManagement" /> */}
      </div>
    </main>
  )
}

const CARDS = [
  {
    icon: <Atom />, 
    title: "Advanced Query Builder", 
    description: "Auto-suggestions, JSON filtering, and one-click dashboard creation without learning complex syntax."
  }, 
  {
    icon: <Coins />, 
    title: "Transparent Pricing", 
    description: "Starts at $0.30 per GB with no user seat limitations or hidden retention fees."
  }, 
  {
    icon: <DatabaseZap />, 
    title: "Smart Tiered Storage", 
    description: "Configurable hot retention periods to balance query performance for long-term compliance needs."
  }
];

const HeroCards = () => {
  return (
    <div className="section-container !mx-auto !w-[90vw] border !border-b-0 !border-t-0 border-none border-signoz_slate-400 max-sm:-mb-[3rem] md:!w-[80vw] md:border-dashed p-0">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {CARDS.map((card, index) => (
          <Card key={index} className="p-0 [&>*]:rounded-none [&>*]:border-1 bg-transparent">
            <div className="p-4">
            <div className="grid grid-cols-1 gap-4">
              {card.icon}
              <h3 className="text-xl font-semibold text-signoz_vanilla-100">{card.title}</h3>
            </div>
            <p className="mt-2 text-sm text-signoz_vanilla-400">{card.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default LogsManagement

const PlatformCard = ({ title, description }) => {
  return (
    <div className="rounded-md border border-signoz_slate-500 bg-signoz_ink-400 p-4">
      <h3 className="mb-2 text-base font-medium text-signoz_vanilla-100">{title}</h3>
      <p className="mb-0 text-sm font-normal text-signoz_vanilla-400">{description}</p>
    </div>
  )
}

const FeatureList = () => {
  const features = [
    {
      title: 'Use correlated logs and traces to debug applications.',
      description:
        'Use traces to identify performance bottlenecks and then debug it with logs associated with that trace.',
    },
    {
      title: 'Create alerts from logs.',
      description:
        'For example, create alerts on error logs in the last 5 minutes based on a threshold.',
    },
    {
      title: 'Create dashboards to view all the error logs from different services.',
      description:
        'Query logs for specific conditions and add them to dashboards for continuous monitoring.',
    },
    {
      title: 'Share specific log lines with your teammates while troubleshooting',
      description:
        'Improved collaboration with your teammates while debugging by sharing specific log lines.',
    },
  ]

  return (
    <div className="flex w-full flex-col gap-4">
      {features.map((feature, index) => (
        <PlatformCard key={index} title={feature.title} description={feature.description} />
      ))}
    </div>
  )
}

const DevelopersLoveSigNozCards = () => {
  const Usage = [
    {
      title: 'Cloud',
      description:
        'Add as many teamFully managed, SOC 2-compliant, ideal for teams who want to start quickly without managing infrastructure members as you want.',
    },
    {
      title: 'Self-Host',
      description:
        'For tighter security & data residency requirements. It’s Apache 2.0 open source, built on open standards.'
    },
  ]

  return (
    <div className="flex w-full flex-col gap-4">
      {Usage.map((feature, index) => (
        <PlatformCard key={index} title={feature.title} description={feature.description} />
      ))}
    </div>
  )
}

// const UsageList = () => {
//   const Usage = [
//     {
//       title: 'Pay only for data you send',
//       description:
//         'We don’t have any SKU-based pricing. Get access to all features in the plan selected and only pay for the data you send. Pay only $0.3 per GB of ingested logs.',
//     },
//     {
//       title: 'Add unlimited team members',
//       description:
//         'Observability should be available to every developer at your company. After all, anyone can need debugging. That’s why we don’t charge for user seats, and you can add as many team members as you want.',
//     },
//     {
//       title: 'No Host (container or node) based pricing',
//       description:
//         'For modern cloud-based applications it doesn’t make sense to charge on the basis of number of hosts or containers. You don’t need to worry about auto-scaling during peak hours. Only pay for the amount of data sent no matter the number of hosts.',
//     },
//   ]

//   return (
//     <div className="flex w-full flex-col gap-4">
//       {Usage.map((feature, index) => (
//         <PlatformCard key={index} title={feature.title} description={feature.description} />
//       ))}
//     </div>
//   )
// }

const DocsList = () => {
  const Docs = [
    {
      title: 'Node.js instrumentation',
      description: 'Instrument your Node.js application and monitor with SigNoz',
    },
    {
      title: 'Python instrumentation',
      description: 'Instrument your Python application and monitor with SigNoz',
    },
    {
      title: 'Java instrumentation',
      description: 'Instrument your Java application and monitor with SigNoz',
    },
    {
      title: 'Get started with SigNoz APM',
      description: 'Instrument your Java application and monitor with SigNoz',
    },
  ]

  return (
    <div className="flex w-full flex-col gap-4">
      {Docs.map((feature, index) => (
        <PlatformCard key={index} title={feature.title} description={feature.description} />
      ))}
    </div>
  )
}

const Header = () => {
  return (
    <header className="relative !mx-auto mt-16 !w-[100vw] md:!w-[80vw]">
      <div className="absolute bottom-0 left-[12px] right-[12px] top-0 z-[0] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:left-[24px] md:right-[24px]" />
      <div className="relative !mx-auto flex !w-[100vw] flex-col items-center border !border-b-0 border-dashed border-signoz_slate-400 px-2 pb-4 pt-12 text-center md:!w-[80vw] md:px-5 md:pt-[8.5rem]">
        <div className="absolute left-0 top-[101px] z-[0] h-9 !w-[100vw] border !border-l-0 !border-r-0 border-dashed border-signoz_slate-400 sm:h-14 md:top-[225px] md:!w-[80vw]" />

        <h1 className="text-gradient z-[1] my-4 !p-3 text-2xl font-semibold tracking-tight dark:text-white sm:my-2 sm:my-5 sm:text-3xl md:leading-[3.5rem] lg:text-[44px]">
          High-Performance Log Analytics <br /> Built on Columnar Database
        </h1>

        <p className="m-0 p-3 text-lg font-normal leading-8 text-signoz_vanilla-400 sm:p-0">
          Ingest logs from anywhere, quickly search and analyze with a powerful query <br /> builder backed by ClickHouse, and correlate your logs with other signals.
        </p>
      </div>
      <div className="relative z-[1] !mx-auto mx-2 flex !w-[100vw] flex-col items-center justify-center gap-3 border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 pb-12 pt-4 md:mx-5 md:!w-[80vw] md:flex-row">
        <Button 
          variant="default" 
          rounded="full" 
          className="flex-center !w-fit" 
          id="btn-get-started-homepage-hero"
        >
          Get Started - Free
          <ArrowRight size={14} />
        </Button>

        <Button 
          variant="secondary" 
          rounded="full" 
          className="flex-center !w-fit" 
          id="btn-read-documentation-homepage-hero"
        >
          Read Documentation
          <ArrowRight size={14} />
        </Button>
      </div>
      <div className="section-container !mx-auto !mt-0 !w-[90vw] border !border-b-0 !border-t-0 border-none border-signoz_slate-400 max-sm:-mb-[3rem] md:!w-[80vw] md:border-dashed">
        <div className="w-100 mx-[-28px]">
          <div className="product-explainer-video hero-figure rounded-xl px-3">
            <div className="embed-container">
              <div className="absolute w-full">
                <div className="p-1">
                  <Image
                    src="/img/platform/LogsManagementHero.webp"
                    alt="Custom Thumbnail"
                    className="w-full rounded-xl"
                    width={10000}
                    height={10000}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

const COMPANIES = [
  { image: '/img/users/netapp.svg', imageDesc: 'netapp logo' },
  { image: '/img/users/samsung.svg', imageDesc: 'samsung logo' },
  { image: '/img/users/comcast.svg', imageDesc: 'comcast logo' },
  { image: '/img/users/freo.svg', imageDesc: 'freo logo' },
  { image: '/img/users/hyperface.svg', imageDesc: 'hyperface logo' },
  { image: '/img/users/salesforce.svg', imageDesc: 'salesforce logo' },
  { image: '/img/users/rattle.svg', imageDesc: 'rattle logo' },
  { image: '/img/users/brainfish-icon.svg', imageDesc: 'brainfish logo' },
  { image: '/img/users/gokiwi.svg', imageDesc: 'GoKiwi logo' },
  { image: '/img/users/outplay.svg', imageDesc: 'outplay logo' },
  { image: '/img/users/tuneai.svg', imageDesc: 'tune logo' },
  { image: '/img/users/wombo.svg', imageDesc: 'wombo logo' },
]

const TrustedByTeams = ({ page }) => {
  const customerStoriesId = `btn-customer-stories-${page}-hero`
  return (
    <section
      className={`relative z-[1] !m-0 !mx-auto !w-[100vw]  border !border-b-0 border-dashed border-signoz_slate-400 bg-signoz_ink-500 pt-10 md:!w-[80vw]`}
    >
      <div className="section-container">
        <div className="mb-2 flex flex-col items-center text-center md:mb-12">
          <div className="text-sm font-semibold uppercase leading-5 tracking-[0.05em] text-signoz_vanilla-400">
            Trusted by the <span className="text-signoz_vanilla-100">best platform teams</span>
          </div>
        </div>
        <div className="mb-12 mt-12 grid grid-cols-2 place-content-center gap-y-8 px-2 sm:grid-cols-4 sm:gap-x-8  sm:gap-y-14 md:mt-0 md:grid-cols-6 ">
          {COMPANIES.map((company, idx) => (
            <div key={`${idx}-${company.image}`} className="flex items-center justify-center">
              <img
                className="h-[40px] w-[100px] md:h-[40px] md:w-[120px]"
                src={company.image}
                alt={company.imageDesc}
              />
            </div>
          ))}
        </div>
        <div
          className={`wavy-line relative mx-[-1rem]
          after:absolute after:top-[50%] after:h-0 after:w-full after:bg-transparent after:content-['']
        `}
        >
          <div className="flex flex-col items-center text-center">
            <Button
              id={customerStoriesId}
              className=" button-background relative z-[1] flex h-8 items-center justify-center gap-1.5 truncate rounded-full py-2 pl-4 pr-3 text-center text-sm font-medium not-italic leading-5 text-white no-underline outline-none hover:text-white"
            >
              <Link href="/case-study/" className="flex-center z-[1] mx-2">
                Read customer stories <ArrowRight size={14} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

// const SigNozFeatures = () => {
//   const sections = [
//     {
//       title: 'Logs at any scale powered by a Columnar Database',
//       desc: (
//         <>
//           SigNoz uses ClickHouse (used by likes of Uber & Cloudflare) as datastore ⎯ an extremely
//           fast and highly optimized storage for logs data.
//           <p />
//           It is a column-oriented database built for complex analytical queries ⎯ they are at least
//           1000 times faster in processing most queries. Aggregation and filtering are lightning-fast
//           on log data. For ingestion, we found SigNoz to be 2.5x faster than ELK and about 13 times
//           faster than ELK for aggregation queries.
//           <a
//             href="https://signoz.io/blog/logs-performance-benchmark/"
//             target="_blank"
//             className="text-signoz_robin-300"
//           >
//             {' '}
//             (Logs Perf Benchmark).
//           </a>
//         </>
//       ),
//       figure: '/img/landing/property-no-vendor-lock-in.webp',
//       logo: '/img/log-management/logs.svg',
//     },
//     {
//       title: 'Fast troubleshooting with Query Builder',
//       desc: [
//         'Query your logs quickly with our powerful logs query builder. No need to learn any complex query language, just select some dropdowns and hit Run.',
//         'Get a list of common filters for your logs data and quickly filter your required logs. Apply various aggregations, such as count, sum, and average, and group your log data based on selected attributes. Utilize multiple queries and formulas to dive deeper into your logs data and uncover valuable insights.',
//       ],
//       figure: '/img/landing/property-ease-of-use.webp',
//       logo: '/img/log-management/fast.svg',
//       buttonText: 'Learn More',
//       buttonLink: 'https://signoz.io/docs/userguide/query-builder/',
//     },
//     {
//       title: 'Cost-effective long-term storage of logs',
//       desc: 'You can store your logs in long-term storage for compliance and auditing purposes. You can either forward the logs to your own S3/ Google cloud storage or object storage in SigNoz cloud. The data is stored in ClickHouse native format and you can query it whenever you want. Log forwarding cost is only $0.25 per GB.',
//       figure: '/img/landing/property-covers-all-use-cases.webp',
//       logo: '/img/log-management/wallet.svg',
//       buttonText: 'Learn More',
//       buttonLink: 'https://signoz.io/docs/logs-management/long-term-storage/',
//     },
//     {
//       title: 'Identify Root Cause with Correlated Signals',
//       desc: [
//         'We provide logs, metrics, and traces under a single pane of glass powered by OpenTelemetry SDKs.',
//         'You can correlate your logs with traces and vice-versa to gain better insights while debugging. Powered by OpenTelemetry semantic conventions, correlated signals can help you understand your applications better and identify the root cause of issues faster.',
//       ],
//       figure: '/img/landing/property-standardize-observability.webp',
//       logo: '/img/log-management/signals.svg',
//     },
//   ]

//   const scrollsections = [
//     {
//       title: 'Powerful Query Builder',
//       desc: 'Apply various aggregations, such as count, sum, and average, and group your log data based on selected attributes. Utilize multiple queries and formulas to dive deeper into your logs data and uncover valuable insights.',
//       image: '/img/features/logs/powerful-query-builder.webp',
//       buttonText: 'Learn More',
//       buttonLink: 'https://signoz.io/docs/userguide/query-builder/',
//     },
//     {
//       title: 'Parse Logs with Log Pipelines',
//       desc: "Transform logs before they get ingested to SigNoz to suit your querying and aggregation needs. Powered by OpenTelemetry Opamp, log pipelines enable you to unleash the full potential of your logs by pre-processing them to suit your needs before they get stored. This unlocks valuable logs based queries and dashboards that wouldn't be possible otherwise.",
//       image: '/img/features/logs/logs-pipeline.webp',
//       buttonText: 'Learn More',
//       buttonLink: 'https://signoz.io/docs/logs-pipelines/introduction/',
//     },
//     {
//       title: 'Quick Search & Filter',
//       desc: 'Get a list of common filters for your logs data and quickly filter your required logs with operators like conatins, in, not_in, like, not_like, etc. ',
//       image: '/img/features/logs/quick-search-filter.webp',
//       buttonText: 'Learn More',
//       buttonLink: 'https://signoz.io/docs/product-features/logs-explorer/',
//     },
//     {
//       title: 'Log Visualizations',
//       desc: 'Our logs explorer comes packed with different visualizations to simplify troubleshooting and finding patterns.',
//       image: '/img/features/logs/log-visualizations.webp',
//       buttonText: 'Learn More',
//       buttonLink: 'https://signoz.io/docs/product-features/logs-explorer/#views',
//     },
//     {
//       title: 'Logs in Detail',
//       desc: 'Get a comprehensive view of your logs with a detailed view of logs. See overview, search for attributes, filters based on JSON data, and more to let you explore your logs in detail.',
//       image: '/img/features/logs/logs-in-detail.webp',
//       buttonText: 'Learn More',
//       buttonLink: 'https://signoz.io/docs/product-features/logs-explorer/#log-details',
//     },
//     {
//       title: 'Logs in Context',
//       desc: 'Get more context around a log entry with Context view. For example, for a particular service view logs of the specific host, while that service might be running on multiple hosts.',
//       image: '/img/features/logs/logs-in-context.webp',
//     },
//     {
//       title: 'Saved Views',
//       desc: 'Save views that matter - Apply complex queries and save that view for future reference. Your teammates can also access them if they need to.',
//       image: '/img/features/logs/saved-views.webp',
//     },
//     {
//       title: 'JSON Search',
//       desc: 'Quickly apply filters on JSON data present inside the logs body.',
//       image: '/img/features/logs/json-logs.webp',
//     },
//     {
//       title: 'Live Logs',
//       desc: 'View logs in real-time with Live Logs.',
//       image: '/img/features/logs/live-logs.webp',
//     },
//     {
//       title: 'Correlation with other signals',
//       desc: 'Correlate your logs with traces and vice-versa to get a much richer context while debugging. Using OpenTelemetry for application observability can unlock the true potential of your telemetry data.',
//       image: '/img/features/logs/correlation-of-signals.webp',
//     },
//     {
//       title: 'Add to dashboards & Create Alerts',
//       desc: 'Anything that you query can be added to dashboards for continued monitoring and visualization.',
//       image: '/img/features/logs/add-to-dashboards-logs.webp',
//     },
//     {
//       title: '',
//     },
//   ]
//   return (
//     <>
//       <div className="bg-[url('/img/background_blur/Frame_1862.png')] bg-[length:65%] bg-[center_top_5rem] sm:bg-no-repeat">
//         <section className="mx-auto w-[100vw] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw] ">
//           <div className={`container pb-16`}>
//             <div className="flex flex-col gap-6 pb-44 pt-28 ">
//               <div className="mx-auto mt-[50px] flex max-w-4xl flex-col items-center text-center">
//                 <div className="text-[44px] font-semibold leading-[3.25rem] text-signoz_sienna-100">
//                   Why use SigNoz for <br /> Log Management?
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//       <div className="!mx-auto grid !w-[100vw] grid-cols-1 border !border-l-0 !border-t-0 border-dashed border-signoz_slate-400 sm:grid-cols-2 md:!w-[80vw]">
//         <div className="!mx-auto grid !w-[100vw] grid-cols-1 border !border-b-0 !border-l-0 !border-t-0 border-dashed border-signoz_slate-400 sm:grid-cols-2 md:!w-[80vw]">
//           {sections.map((section, index) => (
//             <Card
//               key={index}
//               // logo={section.logo}
//               subTitle={section.title}
//               description={section.desc}
//               buttonText={section.buttonText}
//               buttonLink={section.buttonLink}
//               logoSize={24}
//               subTitleSize={2}
//             />
//           ))}
//         </div>
//       </div>

//       <div className="bg-[url('/img/background_blur/Frame_1862.png')] bg-[length:65%] bg-[center_top_5rem] sm:bg-no-repeat">
//         <section className="mx-auto w-[100vw] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw] ">
//           <div className={`container pb-16`}>
//             <div className="flex flex-col gap-6 pb-44 pt-28 ">
//               <div className="mx-auto mt-[50px] flex max-w-4xl flex-col items-center text-center">
//                 <div className="text-[44px] font-semibold leading-[3.25rem] text-signoz_sienna-100">
//                   SigNoz Log Management <br /> Overview
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>

//       <div className="!mx-auto grid !w-[100vw] grid-cols-1 border !border-l-0 !border-t-0 border-dashed border-signoz_slate-400 sm:grid-cols-2 md:!w-[80vw]">
//         {scrollsections.map((scrollsections, index) => (
//           <FeatureCard
//             key={index}
//             title={scrollsections.title}
//             description={scrollsections.desc}
//             buttonText={scrollsections.buttonText}
//             buttonLink={scrollsections.buttonLink}
//             img={scrollsections.image}
//           />
//         ))}
//       </div>
//     </>
//   )
// }

// const SigNozUsage = () => {
//   return (
//     <div className="section-container !mx-auto !w-[100vw] border !border-b-0 border-dashed border-signoz_slate-400 !px-0 md:!w-[80vw]">
//       <div className="flex flex-col sm:flex-row">
//         <div className="!w-[100%]  flex-1 md:!w-[300px]">
//           <p className="sticky top-[100px] px-10 pl-0 pt-10 text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-[44px] md:px-0 md:pl-12">
//             Use SigNoz
//             <br /> Logs for...
//           </p>
//         </div>
//         <div className="flex-[2_2_0%]">
//           <div className="ml-0 justify-between gap-8 border !border-b-0 !border-r-0 !border-t-0 border-dashed border-signoz_slate-400 px-10 py-10 sm:flex-row">
//             <FeatureList />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

const UsageBasedPricing = () => {
  return (
    <div className="section-container !mx-auto !w-[100vw] border !border-b-0 border-dashed border-signoz_slate-400 !px-0 md:!w-[80vw]">
      <div className="flex flex-col sm:flex-row">
        <div className="!w-[100%]  flex-1 md:!w-[300px]">
          <p className="sticky top-[100px] px-10 pl-0 pt-10 text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-[44px] md:px-0 md:pl-12">
            Simple
            <br /> usage-based <br /> pricing
          </p>
        </div>
        <div className="flex-[2_2_0%]">
          <Card className="bg-transparent p-0 [&>div]:border-1 [&>div]:rounded-none">
            <div className="px-10 py-10 flex flex-col gap-2">
              <div className="text-2xl font-semibold text-signoz_vanilla-100">
                Pricing you can trust
              </div>
              <p className="text-base font-normal text-signoz_vanilla-400">
                Tired of Datadog’s unpredictable bills or New Relic’s user-based pricing?
                <br />
                We’re here for you.
              </p>
            <PricingCalculator />
            {/* <UsageList /> */}
            <Card className="bg-transparent p-0 [&>div]:border-0">
              <div className="flex items-center justify-center gap-4 p-2 bg-signoz_robin-500/10 rounded-lg">
                <span className="text-base font-normal text-signoz_robin-400">Calculate your exact monthly bill</span>
                <Button variant="default" rounded="full" className="flex-center !w-fit" id="btn-get-started-homepage-hero" to="/pricing/">
                  Check Pricing
                  <ArrowRight size={14} />
                </Button>
                </div>
              </Card>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

// const ExploreDocs = () => {
//   return (
//     <div className="section-container !mx-auto !w-[100vw] border !border-b-0 border-dashed border-signoz_slate-400 !px-0 md:!w-[80vw]">
//       <div className="flex flex-col sm:flex-row">
//         <div className="!w-[100%]  flex-1 md:!w-[300px]">
//           <p className="sticky top-[100px] px-10 pl-0 pt-10 text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-[44px] md:px-0 md:pl-12">
//             Explore Docs
//           </p>
//         </div>
//         <div className="flex-[2_2_0%]">
//           <div className="ml-0 justify-between gap-8 border !border-b-0 !border-r-0 !border-t-0 border-dashed border-signoz_slate-400 px-10 py-10 sm:flex-row">
//             <DocsList />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

const SigNozStats = () => {
  const STATS_LIST = [
    {
      id: 1,
      logo: '/img/index_features/download.svg',
      name: 'OSS Downloads',
      value: '10 million+',
    },
    { id: 2, logo: '/img/index_features/github.svg', name: 'GitHub Stars', value: '23k+' },
    // { id: 3, logo: '/img/index_features/contributions.svg', name: 'Contributors', value: '140+' },
    // { id: 4, logo: '/img/index_features/community.svg', name: 'Community Members', value: '4.5k+' },
  ]
  return (
    <section>
      <div className="">
        <div className="section-container !mx-auto flex !w-[100vw] flex-col border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 !px-0 sm:flex-row md:!w-[80vw]">
          <div className="!w-[300px] flex-1 border !border-b-0 !border-l-0 !border-r-0 border-dashed border-signoz_slate-400">
            <p className="pl-12 pt-10 text-left text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-[44px]">
              Developers <br />
              Love
              <br />
              SigNoz
            </p>
          </div>

          <div className="flex flex-[2_2_0%] flex-col">
            <Card className="p-0 bg-transparent [&>*]:border-1">
              <div className="p-6">
                <DevelopersLoveSigNozCards />
              </div>
              <div className="grid grid-cols-1 text-left sm:grid-cols-2">
                {STATS_LIST.map((stat, index) => (
                  <StatsCard
                    logo={stat.logo}
                    stats={stat.value}
                    description={stat.name}
                    logoSize={24}
                    key={index}
                  />
                ))}
              </div>
              <div className="flex flex-col items-center gap-3 border !border-b-0 !border-r-0 border-dashed border-signoz_slate-400 py-6 sm:flex-row sm:py-6 sm:pl-10">
                <Button variant="default" rounded="full" href="https://signoz.io/slack/" className="flex-center !w-fit" id="btn-join-community-homepage">
                  <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  Join the community
                  <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </Button>
                <Button variant="secondary" rounded="full" href="https://github.com/SigNoz/signoz/" className="flex-center !w-fit" id="btn-github-repo-homepage">
                  <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  GitHub Repository
                  <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

// const GetStarted = ({ page }) => {
//   const getStartedId = `btn-get-started-${page}-bottom`
//   const readDocumentationId = `btn-read-documentation-${page}-bottom`

//   return (
//     <div className="bg-[url('/img/background_blur/Rectangle_959.png')] bg-[length:68%] bg-[center_top_-20rem] sm:bg-no-repeat">
//       <div className="bg-[url('/img/background_blur/Frame_2185.png')] bg-[length:68%] bg-[center_top_-20rem] sm:bg-no-repeat">
//         <section className="!mx-auto !w-[100vw] border !border-b-0 border-dashed border-signoz_slate-400 md:!w-[80vw]">
//           <div className="bg-[url('/img/background_blur/Ellipse_206.png')] bg-[center_top_calc(-250px)] bg-no-repeat">
//             <div className="flex flex-col gap-16">
//               <div className="flex flex-col gap-12">
//                 <p className="mb-0 mt-20 text-center text-4xl font-bold">
//                   Get started with <br /> SigNoz Cloud today
//                 </p>
//                 <div className="flex items-center justify-center gap-3 pt-4 max-sm:flex-col">
//                   <Button variant="default" rounded="full" to="/teams/" className="flex-center !w-fit" id={getStartedId}>
//                     Get Started - Free
//                     <ArrowRight size={14} />
//                   </Button>
//                   <Button variant="secondary" rounded="full" to="/docs/introduction/" className="flex-center !w-fit" id={readDocumentationId}>
//                     <BookOpen size={14} />
//                     Read Documentation
//                   </Button>
//                 </div>
//               </div>
//               <div className="relative flex items-center justify-center">
//                 <img
//                   src="/img/landing/landing_thumbnail.webp"
//                   alt="Custom Thumbnail"
//                   className="z-[0] -mb-36 w-3/5 rounded-lg max-sm:-mb-8"
//                 />
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   )
// }
