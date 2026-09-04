'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Figure from '../Figure/Figure'

type Feature = {
  title: string
  description: string
  href: string
  ctaLabel: string
  image: {
    src: string
    alt: string
    caption: string
  }
}

const FEATURES: Feature[] = [
  {
    title: 'Application Performance Monitoring',
    description:
      'Out-of-the-box service charts for latency, throughput, error rates, ApDex, and top endpoints.',
    href: '/application-performance-monitoring/',
    ctaLabel: 'Explore APM',
    image: {
      src: '/img/features/apm/apm-charts.webp',
      alt: 'Service performance charts showing latency percentiles, error rate, requests per second, and top endpoints.',
      caption: 'Monitor service latency, error rate, and throughput with ready-to-use dashboards.',
    },
  },
  {
    title: 'Distributed Tracing',
    description:
      'Follow requests across services with flamegraphs, span filters, and trace analytics.',
    href: '/distributed-tracing/',
    ctaLabel: 'Explore Tracing',
    image: {
      src: '/img/features/distributed-tracing/traces-flamegraphs.webp',
      alt: 'Trace flamegraph view highlighting spans across multiple services.',
      caption: 'Understand every request path with trace flamegraphs and rich span insights.',
    },
  },
  {
    title: 'Log Management',
    description: 'Centralize, query, and correlate logs with traces and metrics to debug faster.',
    href: '/log-management/',
    ctaLabel: 'Explore Logs',
    image: {
      src: '/img/features/logs/logs-in-context.webp',
      alt: 'Log stream with filters and related trace context highlighted.',
      caption: 'Tail, search, and pivot logs with instant drill-down into related traces.',
    },
  },
  {
    title: 'Infrastructure Monitoring',
    description:
      'Track Kubernetes and host health with detailed CPU, memory, and network visibility.',
    href: '/docs/infrastructure-monitoring/overview/',
    ctaLabel: 'Explore Infrastructure',
    image: {
      src: '/img/docs/infrastructure-monitoring/kubernetes-pod-metrics.webp',
      alt: 'SigNoz dashboard showing Kubernetes pod metrics and resource utilization.',
      caption: 'Stay ahead of cluster issues with Kubernetes and host infrastructure dashboards.',
    },
  },
  {
    title: 'LLM Observability',
    description:
      'Trace LLM applications with prompt-level visibility, cost tracking, and agent analytics.',
    href: '/docs/llm-observability/',
    ctaLabel: 'Explore LLM Observability',
    image: {
      src: '/img/docs/llm/crewai/crew-dashboard.webp',
      alt: 'Dashboard summarizing LLM runs with tokens, latency, cost, and success metrics.',
      caption:
        'Measure LLM latency, token usage, and cost to keep generative AI experiences reliable.',
    },
  },
  {
    title: 'Metrics & Dashboards',
    description:
      'Build PromQL-powered dashboards and visualize business and SRE metrics in one place.',
    href: '/metrics-and-dashboards/',
    ctaLabel: 'Explore Dashboards',
    image: {
      src: '/img/features/metrics/metrics-query-builder.webp',
      alt: 'Metrics explorer with PromQL query builder and multi-visualization dashboard.',
      caption: 'Create custom dashboards with powerful PromQL and flexible visualizations.',
    },
  },
  {
    title: 'Exceptions Monitoring',
    description: 'Group and triage exceptions with stack traces, trends, and ownership context.',
    href: '/exceptions-monitoring/',
    ctaLabel: 'Explore Exceptions',
    image: {
      src: '/img/features/exceptions/exceptions-overview.webp',
      alt: 'Exceptions overview showing grouped errors with counts and trends.',
      caption: 'Investigate exception spikes with grouped errors and full stack traces.',
    },
  },
  {
    title: 'Alerts Management',
    description:
      'Define alerts on metrics, logs, traces, and anomalies with multi-channel notifications.',
    href: '/alerts-management/',
    ctaLabel: 'Explore Alerts',
    image: {
      src: '/img/features/alerts/metric-based-alert.webp',
      alt: 'Alert rule configuration for metric thresholds with preview chart.',
      caption: 'Trigger metric, log, trace, and anomaly alerts with flexible conditions.',
    },
  },
  {
    title: 'External API Monitoring',
    description:
      'Monitor third-party API latency, throughput, and error rates alongside internal services.',
    href: '/external-apis/',
    ctaLabel: 'Explore External APIs',
    image: {
      src: '/img/external-apis/view-all-external-api-domains.png',
      alt: 'Table listing external API domains with latency, throughput, and error metrics.',
      caption: 'Track every external dependency with per-endpoint performance insights.',
    },
  },
]

// Keep this article's comparison copy separate from the shared default cards.
const DATADOG_ALTERNATIVE_COPY: Record<string, Partial<Feature>> = {
  'Distributed Tracing': {
    description:
      'Investigate million-span traces with flamegraphs, span filters, and percentiles that show whether a slow span is an outlier.',
    href: 'https://signoz.io/docs/userguide/span-details/',
  },
  'Log Management': {
    description:
      'Use quick filters and saved views to search logs, then open related traces and infrastructure metrics. SigNoz Cloud manages the storage and compute as volume grows.',
  },
  'Infrastructure Monitoring': {
    description:
      'Monitor Kubernetes, Linux hosts, AWS, Azure, and GCP, then connect infrastructure health with application logs and traces.',
  },
  'Metrics & Dashboards': {
    description:
      'Build dashboards with the visual query builder, or use PromQL when needed. Saved views, pinned dashboards, and panel sections keep daily checks close at hand.',
    image: {
      src: '/img/features/metrics/metrics-query-builder.webp',
      alt: 'SigNoz Cloud metrics explorer with visual query controls and a chart.',
      caption: 'Use a shared query builder across signals, with PromQL available for metrics.',
    },
  },
}

const AGENT_NATIVE_FEATURE: Feature = {
  title: 'Agent Native Observability',
  description:
    'Ask Noz to investigate in natural language, or connect your coding agent through the MCP server to give it production logs, metrics, and traces alongside your code.',
  href: 'https://signoz.io/agent-native-observability/',
  ctaLabel: 'Explore Agent Native Observability',
  image: {
    src: '/img/agent-native-observability/mcp-and-noz.webp',
    alt: 'SigNoz Cloud agent-native observability with the MCP server and Noz.',
    caption: 'Bring production context into the tools you already use to investigate and write code.',
  },
}

export default function ProductFeatureShowcase({
  datadogAlternative = false,
}: {
  datadogAlternative?: boolean
}) {
  const features = datadogAlternative
    ? [
        ...FEATURES.map((feature) => ({ ...feature, ...DATADOG_ALTERNATIVE_COPY[feature.title] })),
        AGENT_NATIVE_FEATURE,
      ]
    : FEATURES

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4">
        {features.map((feature) => (
          <section
            key={feature.title}
            className="flex w-full flex-shrink-0 snap-start flex-col gap-4 md:w-8/12"
          >
            <h4 className="text-lg font-semibold">{feature.title}</h4>
            <p className="text-sm text-[var(--l2-foreground)]">{feature.description}</p>
            <Figure
              src={feature.image.src}
              alt={feature.image.alt}
              caption={feature.image.caption}
              className="h-48 w-full object-cover md:h-56"
              figureClassName="m-0 flex flex-col gap-2 overflow-hidden rounded-lg border border-[var(--l3-border)] bg-[var(--l3-background-60)] shadow-sm"
              captionClassName="px-4 pb-4 text-xs italic text-[var(--l2-foreground)]"
            />
            <Link
              href={feature.href}
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent-primary)] transition-colors hover:text-[var(--accent-primary-hover)]"
              prefetch={false}
            >
              {feature.ctaLabel}
              <ArrowRight size={14} />
            </Link>
          </section>
        ))}
      </div>
    </div>
  )
}
