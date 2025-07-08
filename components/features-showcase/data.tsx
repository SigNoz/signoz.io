import React from 'react'
import { type TechIconKey } from './icons'

export interface TechIcon {
  iconKey?: TechIconKey
  icon?: React.ReactNode
  name: string
  href?: string
}

export interface FeatureShowcase {
  id: string
  title: string
  description: string
  thumbnail?: string
  videoSrc?: string
  imageSrc?: string
  techIcons: TechIcon[]
  ctaLink: {
    text: string
    href: string
  }
  additionalCTAs?: {
    text: string
    href: string
  }[]
  category: 'core' | 'cloud' | 'advanced'
  badge?: {
    text: string
    type: 'popular' | 'new' | 'enterprise'
  }
  mediaType: 'video' | 'image'
}

export const FEATURE_CATEGORIES = {
  core: {
    label: 'Core Features',
    description: 'Essential observability capabilities',
  },
  cloud: {
    label: 'Cloud Platforms',
    description: 'Cloud provider integrations',
  },
  advanced: {
    label: 'Advanced Features',
    description: 'Specialized monitoring capabilities',
  },
} as const

// Core features loaded immediately for better performance
export const CORE_FEATURES: FeatureShowcase[] = [
  {
    id: 'apm',
    title: 'APM',
    description:
      'Pinpoint performance bottlenecks across your entire application stack in seconds with Out of the box APM.',
    thumbnail: '/showcases/apm/signoz-apm-thumbnail.webp',
    videoSrc: '/showcases/apm/signoz-apm.webm',
    techIcons: [
      {
        iconKey: 'javascript',
        name: 'JavaScript',
        href: '/docs/instrumentation/javascript/',
      },
      {
        iconKey: 'python',
        name: 'Python',
        href: '/docs/instrumentation/python/',
      },
      {
        iconKey: 'java',
        name: 'Java',
        href: '/docs/instrumentation/java/',
      },
      {
        iconKey: 'go',
        name: 'Go',
        href: '/docs/instrumentation/golang/',
      },
      {
        iconKey: 'dotnet',
        name: '.NET',
        href: '/docs/instrumentation/dotnet/',
      },
    ],
    ctaLink: {
      text: 'See all languages',
      href: '/docs/instrumentation/',
    },
    category: 'core',
    mediaType: 'video',
  },
  {
    id: 'logs',
    title: 'Log Management',
    description:
      'Ingest, search, and analyze your logs at any scale with 13x faster aggregation queries than ELK.',
    thumbnail: '/showcases/logs/signoz-logs-thumbnail.webp',
    videoSrc: '/showcases/logs/signoz-logs.webm',
    techIcons: [
      {
        iconKey: 'kubernetes',
        name: 'Kubernetes',
        href: '/docs/userguide/collect_kubernetes_pod_logs/',
      },
      {
        iconKey: 'docker',
        name: 'Docker',
        href: '/docs/userguide/collect_docker_logs/',
      },
      {
        iconKey: 'javascript',
        name: 'JavaScript',
        href: '/docs/logs-management/send-logs/nodejs-pino-logs/',
      },
      {
        iconKey: 'python',
        name: 'Python',
        href: '/docs/userguide/python-logs-auto-instrumentation/',
      },
      {
        iconKey: 'logFiles',
        name: 'Log Files',
        href: '/docs/userguide/collect_logs_from_file/',
      },
      {
        iconKey: 'aws',
        name: 'Cloudwatch',
        href: '/docs/userguide/send-cloudwatch-logs-to-signoz/',
      },
    ],
    ctaLink: {
      text: 'See all log sources',
      href: '/docs/logs-management/send-logs-to-signoz/',
    },
    category: 'core',
    mediaType: 'video',
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    description:
      'Track every host, pod, and container with correlated metrics, traces, and logs - unified dashboard ready in 5 minutes.',
    videoSrc: '/showcases/infrastructure/signoz-infrastructure.webm',
    techIcons: [
      {
        iconKey: 'hostMonitoring',
        name: 'Host Monitoring',
        href: '/docs/userguide/hostmetrics/',
      },
      {
        iconKey: 'kubernetes',
        name: 'Kubernetes',
        href: '/docs/userguide/k8s-metrics/',
      },
      {
        iconKey: 'docker',
        name: 'Docker',
        href: '/docs/metrics-management/docker-container-metrics/',
      },
    ],
    ctaLink: {
      text: 'Read Infrastructure Docs',
      href: '/docs/userguide/hostmetrics/',
    },
    category: 'core',
    mediaType: 'video',
  },
  {
    id: 'traces',
    title: 'Tracing',
    description:
      'Navigate upto million-span traces with intelligent search, flamegraphs, and waterfall views - performance debugging at any scale.',
    videoSrc: '/showcases/traces/signoz-traces.webm',
    techIcons: [
      {
        iconKey: 'javascript',
        name: 'JavaScript',
        href: '/docs/instrumentation/javascript/',
      },
      {
        iconKey: 'python',
        name: 'Python',
        href: '/docs/instrumentation/python/',
      },
      {
        iconKey: 'java',
        name: 'Java',
        href: '/docs/instrumentation/java/',
      },
      {
        iconKey: 'go',
        name: 'Go',
        href: '/docs/instrumentation/golang/',
      },
      {
        iconKey: 'dotnet',
        name: '.NET',
        href: '/docs/instrumentation/dotnet/',
      },
    ],
    ctaLink: {
      text: 'See all languages',
      href: '/docs/instrumentation/',
    },
    category: 'core',
    mediaType: 'video',
  },
  {
    id: 'metrics',
    title: 'Metrics',
    description:
      'Monitor everything with 100+ OpenTelemetry receivers - from RabbitMQ to custom applications in minutes',
    imageSrc: '/showcases/metrics/signoz-metrics.webp',
    techIcons: [
      {
        iconKey: 'prometheus',
        name: 'Prometheus',
        href: '/docs/userguide/send-metrics-cloud/#enable-a-prometheus-receiver',
      },
      {
        iconKey: 'nodejs',
        name: 'NodeJS',
        href: '/opentelemetry/custom-metrics-nodejs/',
      },
      {
        iconKey: 'python',
        name: 'Python',
        href: '/opentelemetry/python-custom-metrics/',
      },
    ],
    ctaLink: {
      text: 'Send metrics doc',
      href: '/docs/userguide/send-metrics-cloud/',
    },
    category: 'core',
    mediaType: 'image',
  },
  {
    id: 'dashboards',
    title: 'Dashboards',
    description:
      'Start monitoring instantly with pre-built dashboards for MySQL, Redis, Kubernetes, and 40+ other technologies - or create custom ones in minutes.',
    videoSrc: '/showcases/dashboards/signoz-dashboards.webm',
    techIcons: [],
    ctaLink: {
      text: 'View Dashboards Doc',
      href: '/docs/userguide/manage-dashboards/',
    },
    additionalCTAs: [
      {
        text: 'Explore Dashboards',
        href: '/metrics-and-dashboards/',
      },
      {
        text: 'Explore Templates',
        href: '/dashboards/',
      },
    ],
    category: 'core',
    mediaType: 'video',
  },
  {
    id: 'exceptions',
    title: 'Exceptions',
    description:
      'Debug faster with automatic exception capture, detailed stack traces, and direct links to the exact trace where errors occurred.',
    videoSrc: '/showcases/exceptions/signoz-exceptions.webm',
    techIcons: [],
    ctaLink: {
      text: 'View Exceptions Doc',
      href: '/docs/userguide/exceptions/',
    },
    additionalCTAs: [
      {
        text: 'Explore exceptions',
        href: '/exceptions-monitoring/',
      },
    ],
    category: 'core',
    mediaType: 'video',
  },
  {
    id: 'alerts',
    title: 'Alerts',
    description:
      'Create alerts on any telemetry data in just 3 steps with notifications to Slack, PagerDuty, Opsgenie, Email, MS Teams, and more via webhooks',
    videoSrc: '/showcases/alerts/signoz-alerts.webm',
    techIcons: [],
    ctaLink: {
      text: 'View Alerts Doc',
      href: '/docs/userguide/alerts-management/',
    },
    additionalCTAs: [
      {
        text: 'Explore alerts',
        href: '/alerts-management/',
      },
    ],
    category: 'core',
    mediaType: 'video',
  }
]

// Additional features loaded on demand
export const EXTENDED_FEATURES: FeatureShowcase[] = [
  {
    id: 'cloud-monitoring',
    title: 'Cloud Monitoring',
    description:
      'Monitor your entire cloud infrastructure with one-click AWS integrations, auto-discovery, and OTel native support for GCP and Azure services.',
    videoSrc: '/showcases/cloud-monitoring/signoz-cloud-monitoring.webm',
    techIcons: [],
    ctaLink: {
      text: 'View AWS Docs',
      href: '/docs/ec2-monitoring/',
    },
    additionalCTAs: [
      {
        text: 'View GCP Docs',
        href: '/docs/gcp-monitoring/',
      },
      {
        text: 'View Azure Docs',
        href: '/docs/azure-monitoring/',
      },
    ],
    category: 'cloud',
    mediaType: 'video',
  },
  {
    id: 'frontend',
    title: 'Frontend & Mobile Monitoring',
    description:
      'Track Core Web Vitals (LCP, CLS, INP) and mobile app performance with OpenTelemetry-powered monitoring across web, iOS, and Android platforms.',
    imageSrc: '/showcases/frontend/signoz-frontend.webp',
    techIcons: [],
    ctaLink: {
      text: 'View Frontend Monitoring Doc',
      href: '/docs/frontend-monitoring/opentelemetry-web-vitals/',
    },
    additionalCTAs: [
      {
        text: 'View Mobile Monitoring Doc',
        href: '/docs/frontend-and-mobile-monitoring/',
      },
    ],
    category: 'advanced',
    mediaType: 'image',
  },
  {
    id: 'llm-monitoring',
    title: 'LLM Monitoring',
    description:
      'Debug LLM failures in production with full trace visibility from prompt to response - track costs, latency, and token usage across OpenAI, Anthropic, and custom models.',
    videoSrc: '/showcases/llm/signoz-llm.webm',
    techIcons: [],
    ctaLink: {
      text: 'View OpenAI Doc',
      href: '/docs/llm/opentelemetry-openai-monitoring/',
    },
    additionalCTAs: [
      {
        text: 'View All Docs',
        href: '/docs/community/llm-monitoring/',
      },
    ],
    category: 'advanced',
    badge: {
      text: 'New',
      type: 'new',
    },
    mediaType: 'video',
  },
  {
    id: 'correlation',
    title: 'Correlation',
    description:
      'Never lose context when debugging - automatic correlation links every trace to its logs, showing the complete story of what went wrong.',
    videoSrc: '/showcases/correlation/signoz-correlation.webm',
    techIcons: [],
    ctaLink: {
      text: 'View Correlation Doc',
      href: '/docs/traces-management/guides/correlate-traces-and-logs/',
    },
    category: 'advanced',
    mediaType: 'video',
  },
  {
    id: 'cicd-observability',
    title: 'CI/CD Observability',
    description:
      'Debug flaky CI/CD pipelines faster with distributed tracing - OpenTelemetry captures every workflow run, job, and step with timing and dependency analysis.',
    imageSrc: '/showcases/cicd/signoz-cicd.webp',
    techIcons: [],
    ctaLink: {
      text: 'GitHub Doc',
      href: '/docs/cicd/github/github-metrics/',
    },
    additionalCTAs: [
      {
        text: 'Jenkins Doc',
        href: '/docs/cicd/jenkins/agent-node-monitoring/',
      },
      {
        text: 'ArgoCD',
        href: '/docs/cicd/argocd/argocd-metrics/',
      },
    ],
    category: 'advanced',
    mediaType: 'image',
  },
  {
    id: 'integrations',
    title: 'Integrations',
    description:
      'Get instant observability for databases, cloud services, and infrastructure with out-of-the-box integrations - PostgreSQL, MongoDB, Redis, AWS, and more.',
    imageSrc: '/showcases/integrations/signoz-integrations.webp',
    techIcons: [
      {
        iconKey: 'postgresql',
        name: 'PostgreSQL',
        href: '/docs/integrations/postgresql/',
      },
      {
        iconKey: 'redis',
        name: 'Redis',
        href: '/docs/integrations/redis/',
      },
      {
        iconKey: 'mongodb',
        name: 'MongoDB',
        href: '/docs/integrations/mongodb/',
      },
      {
        iconKey: 'kafka',
        name: 'Apache Kafka',
        href: '/docs/messaging-queues/kafka/',
      },
      {
        iconKey: 'nginx',
        name: 'Nginx',
        href: '/docs/integrations/nginx/',
      },
      {
        iconKey: 'temporal',
        name: 'Temporal',
        href: '/docs/integrations/temporal-cloud-metrics/',
      },
    ],
    ctaLink: {
      text: 'See all integrations',
      href: '/docs/integrations/integrations-list/',
    },
    category: 'advanced',
    mediaType: 'image',
  },
  {
    id: 'external-apis',
    title: 'External APIs',
    description:
      'Monitor Stripe, SendGrid, or any other third-party services and identify which are causing errors and slowdowns with correlated traces and logs.',
    videoSrc: '/showcases/external-apis/signoz-external-apis.webm',
    techIcons: [],
    ctaLink: {
      text: 'View External API Doc',
      href: '/docs/external-api-monitoring/overview/',
    },
    category: 'advanced',
    mediaType: 'video',
  },
  {
    id: 'messaging-queues',
    title: 'Messaging Queues',
    description:
      'Monitor Kafka producers, consumers, and Celery workers with OpenTelemetry correlation - see the complete message flow from publishing to processing.',
    videoSrc: '/showcases/messaging-queues/signoz-messaging-queues.webm',
    techIcons: [],
    ctaLink: {
      text: 'View Messaging Queues Doc',
      href: '/docs/messaging-queues/overview/',
    },
    category: 'advanced',
    mediaType: 'video',
  }
]

// Combined features for backward compatibility
export const FEATURES_SHOWCASE: FeatureShowcase[] = [
  ...CORE_FEATURES,
  ...EXTENDED_FEATURES
]
