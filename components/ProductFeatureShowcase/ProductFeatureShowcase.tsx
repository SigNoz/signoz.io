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

export default function ProductFeatureShowcase() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4">
        {FEATURES.map((feature) => (
          <section
            key={feature.title}
            className="flex w-full flex-shrink-0 snap-start flex-col gap-4 md:w-8/12"
          >
            <h4 className="text-lg font-semibold">{feature.title}</h4>
            <p className="text-sm text-signoz_slate-500 dark:text-signoz_vanilla-400">
              {feature.description}
            </p>
            <Figure
              src={feature.image.src}
              alt={feature.image.alt}
              caption={feature.image.caption}
              className="h-48 w-full object-cover md:h-56"
              figureClassName="m-0 flex flex-col gap-2 overflow-hidden rounded-lg border border-signoz_slate-200/60 bg-signoz_slate-100/60 shadow-sm dark:border-signoz_slate-500/40 dark:bg-signoz_ink-300/50"
              captionClassName="px-4 pb-4 text-xs italic text-signoz_slate-500 dark:text-signoz_vanilla-400"
            />
            <Link
              href={feature.href}
              className="inline-flex items-center gap-1 text-sm font-medium text-signoz_robin-400 transition-colors hover:text-signoz_robin-500"
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
