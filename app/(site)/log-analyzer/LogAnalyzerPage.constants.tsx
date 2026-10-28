import {
  Braces,
  ChartNoAxesCombined,
  Container,
  FileCode2,
  Radio,
  Search,
  Server,
} from 'lucide-react'
import { BUTTON_CLASS_NAME } from '@/shared/components/molecules/FeaturePages/constants'

export const LOG_ANALYZER_HEADER_BUTTONS = [
  {
    text: 'Get Started - Free',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'Log Analyzer Hero Start Free',
      clickLocation: 'Log Analyzer Hero',
      clickText: 'Get Started - Free',
    },
  },
  {
    text: 'Read Documentation',
    href: '/docs/userguide/logs_query_builder/',
    variant: 'secondary' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Log Analyzer Hero Docs',
      clickLocation: 'Log Analyzer Hero',
      clickText: 'Read Documentation',
    },
  },
]

export const LOG_ANALYSIS_CARDS = [
  {
    icon: <Search />,
    title: 'Search every log',
    description:
      'Filter log bodies and attributes with full-text search, exact values, ranges, and operators such as CONTAINS, IN, and REGEX.',
  },
  {
    icon: <ChartNoAxesCombined />,
    title: 'Analyze patterns',
    description:
      'Group and aggregate logs to compare error volume, severity, service, host, container, and other dimensions over time.',
  },
  {
    icon: <Radio />,
    title: 'Watch logs live',
    description:
      'Stream new records in Live View and apply filters while an incident is active, without refreshing the page.',
  },
]

export const SEARCH_AND_FILTER_SHOWCASE = {
  title: 'Find the logs that explain the problem',
  description:
    'Use the SigNoz Logs Explorer as an online log analyzer for production data. Search log text, select suggested attribute values, combine filters, and inspect the frequency chart before you open an individual record.',
  image: '/img/features/logs/quick-search-filter.webp',
  imageAlt: 'SigNoz Logs Explorer filtering container logs and showing a frequency chart',
  button: {
    text: 'Explore Logs Explorer',
    href: '/docs/userguide/logs_query_builder/',
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Log Analyzer Search Docs',
      clickLocation: 'Log Analyzer Search Section',
      clickText: 'Explore Logs Explorer',
    },
  },
}

export const LIVE_LOGS_PANEL = {
  title: 'Analyze incoming logs in real time',
  description:
    'Open Live View to follow new application and infrastructure logs as they arrive. Pause the stream, keep your active filters, and switch between raw and formatted records during an investigation.',
  button: {
    text: 'Learn about Live View',
    href: '/docs/userguide/logs_query_builder/#live-view',
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Log Analyzer Live View Docs',
      clickLocation: 'Log Analyzer Live View Section',
      clickText: 'Learn about Live View',
    },
  },
  className: 'justify-center',
}

export const LIVE_LOGS_IMAGE = {
  src: '/img/features/logs/live-logs.webp',
  alt: 'Live application logs streaming in SigNoz',
}

export const CORRELATE_LOGS_PANEL = {
  title: 'Move from a log line to its trace',
  description:
    'Inspect structured attributes and use trace and span identifiers to open the related request. SigNoz keeps logs and traces together, so you can test a log-based clue against the complete request path.',
  button: {
    text: 'Learn about log and trace correlation',
    href: '/docs/traces-management/guides/correlate-traces-and-logs/',
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Log Analyzer Correlation Docs',
      clickLocation: 'Log Analyzer Correlation Section',
      clickText: 'Learn about log and trace correlation',
    },
  },
  className: 'justify-center',
}

export const CORRELATE_LOGS_IMAGE = {
  src: '/img/features/logs/correlation-of-signals.webp',
  alt: 'Trace ID in a SigNoz log record with a link to the related trace',
}

export const LOG_SOURCE_SHOWCASE = {
  title: 'Use one log analysis tool across your stack',
  description:
    'Send logs with OpenTelemetry and other supported collection methods. Keep a consistent analysis workflow across applications, containers, servers, and structured event data.',
}

export const LOG_SOURCE_CARDS = [
  {
    icon: <FileCode2 />,
    title: 'Application logs',
    description:
      'Analyze errors, warnings, request events, and custom application fields from your services in one searchable view.',
  },
  {
    icon: <Container />,
    title: 'Kubernetes and container logs',
    description:
      'Filter by cluster, namespace, workload, pod, and container to investigate distributed and short-lived workloads.',
  },
  {
    icon: <Server />,
    title: 'Server and web logs',
    description:
      'Search host, system, NGINX, and other server logs without moving between separate command-line sessions.',
  },
  {
    icon: <Braces />,
    title: 'JSON and OpenTelemetry logs',
    description:
      'Query structured attributes, nested fields, severity, resource data, and trace context from OpenTelemetry logs.',
  },
]

export const LOG_ANALYZER_CTA_BUTTONS = [
  {
    text: 'Get Started - Free',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'Log Analyzer Banner Start Free',
      clickLocation: 'Log Analyzer Bottom Banner',
      clickText: 'Get Started - Free',
    },
  },
  {
    text: 'Read Documentation',
    href: '/docs/logs-management/send-logs-to-signoz/',
    variant: 'secondary' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Log Analyzer Banner Docs',
      clickLocation: 'Log Analyzer Bottom Banner',
      clickText: 'Read Documentation',
    },
  },
]
