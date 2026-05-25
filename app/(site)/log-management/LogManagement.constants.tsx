import { Atom, Coins, DatabaseZap } from 'lucide-react'
import { CarouselCard } from '@/shared/components/molecules/FeaturePages/CarouselCards'

export const CARDS = [
  {
    icon: <Atom />,
    title: 'Advanced Query Builder',
    description: 'Build ClickHouse queries visually with auto-complete for log attributes.',
  },
  {
    icon: <Coins />,
    title: 'Transparent Pricing',
    description: 'Starts at $0.30 per GB with no user seat limitations or hidden retention fees.',
  },
  {
    icon: <DatabaseZap />,
    title: 'Smart Tiered Storage',
    description:
      'Configure hot retention periods to balance query performance with storage costs for compliance.',
  },
]

export const QUERY_BUILDER_CARDS = [
  {
    icon: <Atom />,
    title: 'Visual Query Builder',
    description:
      'Build complex filters with AND/OR logic using auto-complete for attributes and values. Supports operators like CONTAINS, REGEX, IN, and LIKE with real-time suggestions from your actual log data.',
  },
  {
    icon: <Atom />,
    title: 'Aggregations & Grouping',
    description:
      'Run COUNT, SUM, AVG, P50/P95/P99 across billions of logs. Group by multiple dimensions simultaneously and filter results with HAVING clauses for advanced analysis.',
  },
  {
    icon: <Atom />,
    title: 'JSON & Dashboard Creation',
    description:
      'Query nested JSON fields using dot notation like `attributes.user.id`. Create dashboard panels directly from query results or export to CSV for external analysis.',
  },
]

export const CORRELATION_CAROUSEL_DATA: Array<CarouselCard> = [
  {
    id: 0,
    title: 'Logs → Metrics',
    description: 'Jump from logs to relevant service metrics.',
    image: '/img/log-management/Logs-to-Metrics.png',
    isActive: true,
  },
  {
    id: 1,
    title: 'Logs → Traces',
    description: 'Find traces using trace IDs in logs.',
    image: '/img/log-management/Logs-to-Trace.png',
    isActive: false,
  },
  {
    id: 2,
    title: 'APM → Logs',
    description: 'Go from APM metrics to related logs.',
    image: '/img/log-management/APM-to-Logs.png',
    isActive: false,
  },
]
