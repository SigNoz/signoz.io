import Image from 'next/image'
import { ArrowRight, BookOpen } from 'lucide-react'
import { BUTTON_CLASS_NAME } from '@/shared/components/molecules/FeaturePages/constants'
import { IconTitleDescriptionCardData } from '@/shared/components/molecules/FeaturePages/IconTitleDescriptionCard'
import { SplitSectionPanel } from '@/shared/components/molecules/FeaturePages/SplitSection/SplitSection.types'
import { ButtonGroupButton } from '@/shared/components/molecules/FeaturePages/ButtonGroup/ButtonGroup.types'

export const METRICS_DASHBOARDS_HEADER_BUTTONS: ButtonGroupButton[] = [
  {
    text: 'Get Started - Free',
    href: '/teams/',
    variant: 'default' as const,
    icon: <ArrowRight size={14} />,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'Metrics Dashboards Hero Get Started',
      clickLocation: 'Metrics Dashboards Hero',
      clickText: 'Get Started - Free',
    },
  },
  {
    text: 'Read Documentation',
    href: '/docs/introduction/',
    variant: 'secondary' as const,
    icon: <BookOpen size={14} />,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Metrics Dashboards Hero Docs',
      clickLocation: 'Metrics Dashboards Hero',
      clickText: 'Read Documentation',
    },
  },
]

export const METRICS_HERO_IMAGE = {
  src: '/img/features/metrics/metrics-overview1.webp',
  alt: 'SigNoz metrics dashboard showing CPU and memory usage charts by namespace and pod',
}

const cardIcon = (src: string, alt: string) => (
  <Image src={src} alt={alt} width={24} height={24} className="h-5 w-5" />
)

export const WHY_METRICS_MONITORING_CARDS: IconTitleDescriptionCardData[] = [
  {
    icon: cardIcon('/img/log-management/fast.svg', 'Easy-to-Use Query Builder'),
    title: 'Easy-to-Use Query Builder with Advanced Capabilities',
    description:
      'SigNoz comes packed with a powerful query builder. Create queries on your metrics data quickly with an easy-to-use metrics query builder. The click-and-select query builder is made to write queries super easily without knowing any query language. You can combine multiple queries, apply functions, and add formulae to create really complex queries quickly.',
    button: {
      text: 'Learn More',
      href: 'https://signoz.io/docs/userguide/query-builder/',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Metrics Dashboards Query Builder Docs Button',
        clickLocation: 'Metrics Dashboards Why SigNoz Section',
        clickText: 'Learn More',
      },
    },
  },
  {
    icon: cardIcon('/img/features/metrics/blocks.svg', 'Integrations'),
    title: 'Integrations for quick-start monitoring',
    description:
      'Use integrations to start monitoring popular technologies quickly. This enables you to create pre-built dashboards with important logs and metrics that can give you insights into performance. We currently have integrations for AWS services, Redis, MongoDB, Nginx, Clickhouse, Postgresql, and many more.',
    button: {
      text: 'Learn More',
      href: 'https://signoz.io/docs/integrations/integrations-list/',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Metrics Dashboards Integrations Docs Button',
        clickLocation: 'Metrics Dashboards Why SigNoz Section',
        clickText: 'Learn More',
      },
    },
  },
  {
    icon: cardIcon('/img/log-management/signals.svg', 'Delta and cumulative metrics'),
    title: 'Support for both delta and cumulative metrics',
    description: (
      <>
        <p>
          SigNoz supports both delta and cumulative metrics for covering all types of use cases in
          metrics monitoring. Delta metrics help to measure the change in a value over a specific
          interval, while cumulative metrics measure the total value accumulated over time. Send
          metrics from your application in any format and monitor them in SigNoz.
        </p>
        <p className="mb-0">
          Popular tools like Datadog only supports delta metrics, and Prometheus only supports
          cumulative metrics.
        </p>
      </>
    ),
  },
]

export const METRICS_OVERVIEW_PANELS: SplitSectionPanel[] = [
  {
    title: 'Send metrics from any source',
    description:
      'Infrastructure, application, or database metrics - send all types of time-series data to SigNoz. Create charts and dashboards and add alerts to monitor them.',
  },
  {
    title: 'OpenTelemetry Metrics SDK Support',
    description:
      'SigNoz is OpenTelemetry-native, and it supports all kinds of metrics provided by OpenTelemetry metrics SDK. OpenTelemetry is a powerful observability framework using which you can correlate your application metrics with other signals like traces for richer context while debugging.',
  },
  {
    title: 'Powerful Query Builder',
    description:
      'Create queries on your metrics data quickly with an easy-to-use metrics query builder. Add multiple queries and combine those queries with formulae to create really complex queries quickly.',
    image: '/img/features/metrics/metrics-query-builder.webp',
    imageAlt: 'Powerful Query Builder',
  },
  {
    title: 'Support for Functions',
    description:
      'Metrics Query Builder comes packed with a lot of mathematical functions that you can apply directly to your queries.',
    image: '/img/features/metrics/support-for-functions-metrics.webp',
    imageAlt: 'Support for Functions',
  },
  {
    title: 'Agent-native dashboards',
    description:
      'SigNoz dashboards run on a strictly validated schema, following the open CNCF Perses spec. Agents write to defined fields instead of inferring them. So creating and editing a dashboard is reliable, fast, and lighter on tokens. You can even edit the JSON in-app.',
    image: '/img/features/metrics/agent-native-dashboards.webp',
    imageAlt: 'SigNoz dashboard with the Dashboard JSON panel open for editing',
  },
  {
    title: 'Customized Dashboards',
    description:
      'Enhance your observability with flexible dashboards. Add panels, divide them into sections, go full-screen, and lock them for security. Use variables to create interactive dashboards, filtering charts by hostnames, environments, namespaces, and more.',
    image: '/img/features/metrics/hostmetrics-dashboards.webp',
    imageAlt: 'Customized Dashboards',
  },
  {
    title: 'Advanced querying with ClickHouse Queries',
    description:
      'Your metrics data is stored in ClickHouse - and we give you the ability to write ClickHouse queries directly on your data. This enables in-depth analysis when you want to dig deeper into your data.',
    image: '/img/features/metrics/clickhouse-query-metrics.webp',
    imageAlt: 'Advanced querying with ClickHouse Queries',
    button: {
      text: 'Learn More',
      href: 'https://signoz.io/docs/userguide/writing-clickhouse-traces-query/',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Metrics Dashboards ClickHouse Query Docs Button',
        clickLocation: 'Metrics Dashboards Overview Section',
        clickText: 'Learn More',
      },
    },
  },
  {
    title: 'PromQL Support',
    description:
      'If you’re coming from the Prometheus ecosystem, don’t worry. We support PromQL for querying data and ingesting Prometheus metrics format. ',
    image: '/img/features/metrics/metrics-promql.webp',
    imageAlt: 'PromQL Support',
  },
  {
    title: 'Access to Metrics data through API',
    description:
      'Accessing metrics data through our Metrics API allows you to manage and analyze it efficiently. This opens up many opportunities for integration with other tools, programmatic analysis of metrics data, and customized data handling.',
    button: {
      text: 'Learn More',
      href: 'https://signoz.io/docs/traces-management/trace-api/overview/',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Metrics Dashboards Metrics API Docs Button',
        clickLocation: 'Metrics Dashboards Overview Section',
        clickText: 'Learn More',
      },
    },
  },
  {
    title: 'No separate pricing for custom metrics',
    description:
      'All metrics are treated the same in SigNoz Cloud and are not charged separately. Metrics pricing in SigNoz Cloud is cost-effective, so you can scale your metrics monitoring with peace of mind.',
    button: {
      text: 'Learn More',
      href: 'https://signoz.io/pricing/',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Metrics Dashboards Custom Metrics Pricing Button',
        clickLocation: 'Metrics Dashboards Overview Section',
        clickText: 'Learn More',
      },
    },
  },
]

export const METRICS_PRICING_CARDS = [
  {
    title: 'Pay only for data you send',
    description:
      'SigNoz Cloud doesn’t have any SKU-based pricing. Get access to all features in the selected plan and only pay for the data you send. Pay only $0.10 per million samples for metrics.',
  },
  {
    title: 'No special pricing for custom metrics',
    description:
      'Vendors like Datadog charge $0.05 per custom metric, which limits a team’s ability to send and analyze custom metrics for monitoring. SigNoz Cloud does not add a custom-metric surcharge. The charge remains $0.10 per million samples no matter what type of metrics you send.',
  },
  {
    title: 'Add unlimited team members',
    description:
      'Observability should be available to every developer at your company. After all, anyone can need debugging. That’s why SigNoz Cloud does not charge for user seats, and you can add as many team members as you want.',
  },
  {
    title: 'No Host (container or node) based pricing',
    description:
      'For modern cloud-based applications, it doesn’t make sense to charge based on the number of hosts or containers. With SigNoz Cloud, you don’t need to worry about autoscaling during peak hours. Only pay for the amount of data sent, no matter the number of hosts.',
  },
]

export const ESTIMATE_METRICS_COST_BUTTON: ButtonGroupButton = {
  text: 'Estimate Metrics Cost',
  href: '/pricing/metrics-cost-estimation/',
  variant: 'default' as const,
  icon: <ArrowRight size={14} />,
  tracking: {
    clickType: 'Primary CTA',
    clickName: 'Metrics Dashboards Estimate Metrics Cost',
    clickLocation: 'Metrics Dashboards Pricing Section',
    clickText: 'Estimate Metrics Cost',
  },
}

export const GET_STARTED_BUTTONS: ButtonGroupButton[] = [
  {
    text: 'Get Started - Free',
    href: '/teams/',
    variant: 'default' as const,
    icon: <ArrowRight size={14} />,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'Metrics Dashboards Banner Get Started',
      clickLocation: 'Metrics Dashboards Bottom Banner',
      clickText: 'Get Started - Free',
    },
  },
  {
    text: 'Read Documentation',
    href: '/docs/introduction/',
    variant: 'secondary' as const,
    icon: <BookOpen size={14} />,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Metrics Dashboards Banner Docs',
      clickLocation: 'Metrics Dashboards Bottom Banner',
      clickText: 'Read Documentation',
    },
  },
]

export const GET_STARTED_IMAGE = {
  src: '/img/landing/landing_thumbnail.webp',
  alt: 'SigNoz dashboard with application performance metrics - Metrics and Dashboards',
}
