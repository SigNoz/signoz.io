import { Atom, DatabaseZap, ListTree, TextSearch } from 'lucide-react'
import {
  SiPython,
  SiGo,
  SiDotnet,
  SiSpringboot,
  SiExpress,
  SiFlask,
  SiDjango,
  SiApachekafka,
  SiRabbitmq,
} from 'react-icons/si'
import { BiLogoPostgresql } from 'react-icons/bi'
import { GrMysql } from 'react-icons/gr'
import { CarouselCard } from '@/shared/components/molecules/FeaturePages/CarouselCards'
import { BUTTON_CLASS_NAME } from '@/shared/components/molecules/FeaturePages/constants'
import awsIconUrl from '@/public/img/icons/aws-icon.svg?url'
import gcpIconUrl from '@/public/img/icons/gcp-icon.svg?url'
import azureIconUrl from '@/public/img/icons/azure-icon.svg?url'
import redisIconUrl from '@/public/img/icons/redis-icon.svg?url'
import grpcIconUrl from '@/public/img/icons/grpc-icon.svg?url'
import mongoIconUrl from '@/public/img/icons/mongo-icon.svg?url'
import elasticIconUrl from '@/public/img/icons/elastic-icon.svg?url'
import jaegerIconUrl from '@/public/img/icons/jaeger-stag-face-icon.svg?url'
import zipkinIconUrl from '@/public/img/icons/zipkin-icon.svg?url'
import opencensusIconUrl from '@/public/img/icons/opencensus-icon.svg?url'
import javaIconUrl from '@/public/img/icons/java-icon.svg?url'

export const CLOUD_ICONS = [
  { src: awsIconUrl, alt: 'AWS' },
  { src: gcpIconUrl, alt: 'Google Cloud' },
  { src: azureIconUrl, alt: 'Azure' },
]

export const CONTAINER_ICONS = [
  { src: <SiDjango className="h-7 w-7 text-[#44B78B]" />, alt: 'Django' },
  { src: <SiFlask className="h-7 w-7" />, alt: 'Flask' },
  { src: <SiSpringboot className="h-7 w-7 text-[#6DB33F]" />, alt: 'Springboot' },
  { src: <SiExpress className="h-7 w-7" />, alt: 'Express' },
]

export const POPULAR_TOOLS_ICONS = [
  { src: <BiLogoPostgresql className="h-7 w-7 text-blue-600" />, alt: 'Postgres' },
  { src: redisIconUrl, alt: 'Redis' },
  { src: <SiApachekafka className="h-7 w-7" />, alt: 'Apache Kafka' },
  { src: grpcIconUrl, alt: 'gRPC' },
  { src: <GrMysql className="h-7 w-7 text-cyan-600" />, alt: 'MySQL' },
  { src: mongoIconUrl, alt: 'Mongo' },
  { src: <SiRabbitmq className="h-7 w-7 text-orange-600" />, alt: 'RabbitMQ' },
  { src: elasticIconUrl, alt: 'Elastic' },
]

export const LEGACY_FORMAT_SUPPORT_ICONS = [
  { src: jaegerIconUrl, alt: 'Jaeger' },
  { src: zipkinIconUrl, alt: 'Zipkin' },
  { src: opencensusIconUrl, alt: 'OpenCensus' },
]

export const LANGUAGES_ICONS = [
  { src: <SiPython className="h-5 w-5 text-blue-500" />, alt: 'Python' },
  { src: javaIconUrl, alt: 'Java' },
  { src: <SiGo className="h-7 w-7 text-cyan-500" />, alt: 'Golang' },
  { src: <SiDotnet className="h-7 w-7" />, alt: 'Dotnet' },
]

export const DIRECT_INTEGRATIONS = ['OTLP', 'gRPC', 'HTTP']

export const DISTRIBUTED_TRACING_HEADER_BUTTONS = [
  {
    text: 'Start your free trial',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'Distributed Tracing Hero Start Trial',
      clickLocation: 'Distributed Tracing Hero',
      clickText: 'Start your free trial',
    },
  },
  {
    text: 'Read Documentation',
    href: '/docs/instrumentation/overview/',
    variant: 'secondary' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Distributed Tracing Hero Docs',
      clickLocation: 'Distributed Tracing Hero',
      clickText: 'Read Documentation',
    },
  },
]

export const CARDS = [
  {
    icon: <DatabaseZap />,
    title: 'High-Volume Ingestion',
    description:
      'Sustain 20,000 spans/sec and load unlimited spans, with no forced sampling. Battle-tested for AI-scale workloads.',
  },
  {
    icon: <ListTree />,
    title: 'Trace Funnels',
    description:
      'Compare error vs success patterns across services. Industry-first feature for analyzing conversion through distributed systems.',
  },
  {
    icon: <TextSearch />,
    title: 'Full-Text Search on Span Events',
    description:
      'Query span events across structured and unstructured data with CONTAINS and wildcards, no pre-indexing required.',
  },
]

export const INSTRUMENT_SERVICES_PANEL = {
  title: 'Instrument services in minutes',
  description:
    'Auto-instrument your applications with OpenTelemetry across all major languages and frameworks. Change one environment variable to start sending traces to SigNoz.',
  button: {
    text: 'Read Documentation',
    href: '/docs/instrumentation/overview/',
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Distributed Tracing Instrumentation Docs Button',
      clickLocation: 'Distributed Tracing Instrumentation Section',
      clickText: 'Read Documentation',
    },
  },
}

export const FILTER_AND_ANALYZE_CARDS = [
  {
    icon: <Atom />,
    title: 'One-click filters and error highlighting',
    description:
      'Isolate errors, LLM calls, or spans by type (database, HTTP, functions) in one click. Red is reserved for errors, so Highlight Errors surfaces every failure instantly, even in a huge trace.',
  },
  {
    icon: <Atom />,
    title: 'Latency & Error Analysis',
    description:
      'Calculate P95/P99 latencies between any two spans to identify slow handoffs between services. Group traces by deployment version, region, or customer segment to surface systemic issues. Compare error rates against success rates using multi-query formulas.',
  },
  {
    icon: <Atom />,
    title: 'Trace Funnels & Flow Analysis',
    description:
      'Trace Funnels reveal conversion rates through distributed workflows with unlimited steps, showing exactly where requests fail in multi-service journeys. Apply Direct/InDirect Descendant operators to map request propagation and validate service dependencies.',
  },
]

export const MASSIVE_TRACES_SHOWCASE = {
  title: 'Load million-span traces without browser crashes',
  description:
    'The SigNoz trace detail view loads unlimited spans and lets you navigate and filter high-volume traces with ease. Virtualized rendering and progressive loading ensure million-span traces load without UI degradation. This matters as agentic workflows and LLM calls increase spans per trace. The interface stays smooth, so you can zoom and scroll no matter the volume.',
}

export const TRACE_QUERY_BUILDER_SHOWCASE = {
  title: 'Find and analyze traces faster',
  description:
    'Powerful search and queries get you to the signal faster. Filter by session ID, user ID, HTTP headers, or custom tags like LLM model, with auto-complete as you type. Build queries visually and run aggregations like P95 latency by service or region. Go deeper with trace operators to map parent-child spans across your system.',
  button: {
    text: 'Read Documentation',
    href: '/docs/userguide/query-builder-v5/#multi-query-analysis-advanced-comparisons',
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Distributed Tracing Query Builder Docs Button',
      clickLocation: 'Distributed Tracing Query Builder Section',
      clickText: 'Read Documentation',
    },
  },
}

export const TRACE_QUERY_BUILDER_IMAGE = {
  src: '/img/distributed-tracing/find-and-analyze-traces-with-powerful-queries.png',
  alt: 'Find and analyze traces with powerful queries',
}

export const RELATED_LOGS_PANEL = {
  title: 'See related logs of every span',
  description:
    'Click any span to see correlated logs instantly. OpenTelemetry automatically injects trace context into your logs, connecting traces and logs in both directions. Jump from traces to logs with one click, or click `trace_id` in any log to view the complete distributed trace.',
  button: {
    text: 'Read Documentation',
    href: '/docs/traces-management/guides/correlate-traces-and-logs/',
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Distributed Tracing Correlate Logs Docs Button',
      clickLocation: 'Distributed Tracing Storage Section',
      clickText: 'Read Documentation',
    },
  },
  image: '/img/distributed-tracing/see-related-logs-of-every-span.png',
  imageAlt: 'See related logs of every span',
  imageClassName: '-mt-8',
  className: 'py-6',
}

export const CONTROL_TRACES_VOLUME_PANEL = {
  title: 'Control traces volume',
  description:
    "Drop spans you don't need to optimize costs further. Define filter rules to exclude health checks, internal endpoints, or noisy traces. Remove sensitive attributes before storage, or drop entire spans based on service, operation name, or custom span attributes.",
  button: {
    text: 'Read Documentation',
    href: '/docs/traces-management/guides/drop-spans/',
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Distributed Tracing Drop Spans Docs Button',
      clickLocation: 'Distributed Tracing Storage Section',
      clickText: 'Read Documentation',
    },
  },
  image: '/img/distributed-tracing/control-traces-volume.png',
  imageAlt: 'Control traces volume',
  className: 'py-6',
}

export const CORRELATION_CAROUSEL_DATA: Array<CarouselCard> = [
  {
    id: 0,
    title: 'Flame graph with 100,000 spans in a single load',
    description: 'Supports million-span traces with smooth navigation and zoom.',
    image: '/img/distributed-tracing/handle-massive-traces.png',
    isActive: true,
  },
  {
    id: 1,
    title: 'Unlimited spans in the waterfall',
    description: 'The waterfall lists every span, and now loads faster.',
    image: '/img/distributed-tracing/unlimited-spans-in-the-waterfall.webp',
    isActive: false,
  },
  {
    id: 2,
    title: 'Synchronized flame graph and waterfall',
    description: 'Select a span in one and the other follows.',
    image: '/img/distributed-tracing/synchronized-flame-graph-and-waterfall.png',
    isActive: false,
  },
]
