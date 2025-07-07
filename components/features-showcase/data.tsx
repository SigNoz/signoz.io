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

export const FEATURES_SHOWCASE: FeatureShowcase[] = [
  {
    id: 'apm',
    title: 'APM',
    description:
      'Monitor & troubleshoot your application performance with comprehensive APM capabilities.',
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
    description: 'Ingest, search, and analyze your logs at any scale with powerful log management.',
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
      'Monitor hosts, containers, and orchestration platforms with infrastructure monitoring.',
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
      'Track user requests across services to identify bottlenecks with distributed tracing.',
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
    description: 'Custom metrics and configurable dashboards to fit any monitoring use case.',
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
    description: 'Create powerful, customizable dashboards to visualize your observability data.',
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
      'Record exceptions automatically with stack trace & linked span data for faster debugging.',
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
      'Get actionable alerts in your preferred notification channel with smart alerting.',
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
  },
  {
    id: 'cloud-monitoring',
    title: 'Cloud Monitoring',
    description: 'Monitor AWS, GCP, and Azure services with native cloud provider integrations.',
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
    description: 'Monitor frontend applications and mobile apps with real user monitoring.',
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
      'Monitor Large Language Models and AI applications with specialized LLM observability.',
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
    description: 'Correlate metrics, logs, and traces to get complete observability insights.',
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
      'Monitor your CI/CD pipelines and deployment processes with specialized observability.',
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
      'Connect with out of the box integrations including databases, message queues, and third-party services.',
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
    description: 'Monitor external API calls, dependencies, and third-party service performance.',
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
    description: 'Monitor message queues, event streams, and asynchronous communication patterns.',
    videoSrc: '/showcases/messaging-queues/signoz-messaging-queues.webm',
    techIcons: [],
    ctaLink: {
      text: 'View Messaging Queues Doc',
      href: '/docs/messaging-queues/overview/',
    },
    category: 'advanced',
    mediaType: 'video',
  },
]
