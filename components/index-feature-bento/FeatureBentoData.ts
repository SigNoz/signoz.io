export type BentoFeature = {
  description: string
  href: string
  layout: string
  outcome: string
  product: string
  textureOpacity?: string
  texturePosition: string
}

export const features: BentoFeature[] = [
  {
    product: 'APM.',
    outcome: 'P99, Apdex, database calls, and external calls per service.',
    description:
      'Monitor RED metrics, Apdex, database calls, and external calls from trace-derived service views.',
    href: '/application-performance-monitoring/',
    layout: 'md:col-span-4 md:col-start-1 md:row-span-1 md:row-start-1',
    texturePosition: 'object-left-top',
  },
  {
    product: 'Logs.',
    outcome: 'Columnar database search with trace correlation built in.',
    description:
      'Search logs in a columnar database, parse attributes, and use trace IDs to move between logs and traces.',
    href: '/log-management/',
    layout: 'md:col-span-2 md:col-start-5 md:row-span-1 md:row-start-1',
    texturePosition: 'object-right-top',
  },
  {
    product: 'Tracing.',
    outcome: 'Load and analyze traces with up to a million spans.',
    description:
      'Use flamegraphs, waterfalls, filters, and span aggregates to isolate slow work across high-volume traces.',
    href: '/distributed-tracing/',
    layout: 'md:col-span-2 md:col-start-1 md:row-span-2 md:row-start-2',
    textureOpacity: 'opacity-[0.16]',
    texturePosition: 'object-left-bottom',
  },
  {
    product: 'Alerts.',
    outcome: 'Threshold, anomaly, and Apdex alerts on any telemetry signal.',
    description:
      'Create threshold, anomaly, Apdex, metric, log, or trace alerts and tune them with alert history.',
    href: '/alerts-management/',
    layout: 'md:col-span-2 md:col-start-3 md:row-span-1 md:row-start-2',
    texturePosition: 'object-center',
  },
  {
    product: 'LLM Observability.',
    outcome: 'OpenAI, Azure OpenAI, Gemini, OpenRouter, LiteLLM, and agent telemetry.',
    description:
      'Monitor LiteLLM, OpenRouter, Azure OpenAI, Gemini, Hermes, and other AI workflows through OpenTelemetry.',
    href: '/llm-observability/',
    layout: 'md:col-span-2 md:col-start-3 md:row-span-1 md:row-start-3',
    texturePosition: 'object-right-bottom',
  },
  {
    product: 'Infra Monitoring.',
    outcome: 'Kubernetes, hosts, and cloud metrics next to every service.',
    description:
      'Bring host, Kubernetes, and cloud resource metrics into the same view as application signals.',
    href: '/docs/infrastructure-monitoring/overview/',
    layout: 'md:col-span-2 md:col-start-5 md:row-span-2 md:row-start-2',
    texturePosition: 'object-center',
  },
  {
    product: 'Dashboards.',
    outcome: 'Reusable templates for services, infra, cloud, databases, and LLM usage.',
    description:
      'Start from templates or build custom views for services, infra, cloud, databases, and LLM usage.',
    href: '/metrics-and-dashboards/',
    layout: 'md:col-span-6 md:col-start-1 md:row-span-1 md:row-start-4',
    texturePosition: 'object-left-bottom',
  },
]
