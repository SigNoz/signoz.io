import React from 'react'
import {
  SiJavascript,
  SiPython,
  SiGo,
  SiKubernetes,
  SiDocker,
  SiPrometheus,
  SiNodedotjs,
  SiRust,
  SiDotnet,
  SiPhp,
  SiRuby,
  SiAmazon,
  SiGooglecloud,
  SiRedis,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiElasticsearch,
  SiApachekafka,
  SiNginx,
  SiApache,
  SiRabbitmq,
  SiAmazonwebservices,
  SiReact,
  SiAndroid,
  SiFluentd,
  SiHeroku,
  SiVercel,
  SiApachetomcat,
  SiTypescript,
  SiClickhouse,
  SiTemporal,
} from 'react-icons/si'
import {
  LucideServer,
  Database,
  Cloud,
  Workflow,
  BarChart3,
  AlertTriangle,
  Bug,
  Activity,
  Globe,
  Shield,
  Zap,
  TrendingUp,
  Layers,
  Search,
  Monitor,
  Brain,
  GitBranch,
  Smartphone,
  Link,
  MessageSquare,
  Server,
  FileText,
  LucideBoxes,
  CloudCog,
  DatabaseZap,
  BrainCircuit,
  MonitorSmartphone,
} from 'lucide-react'
import { TbHttpGet, TbBrandOpenSource } from 'react-icons/tb'
import { FaAws, FaFileAlt, FaJava, FaWindows } from 'react-icons/fa'
import { LuLogIn } from 'react-icons/lu'
import { BsCloudFill } from 'react-icons/bs'

export interface TechIcon {
  icon: React.ReactNode
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
    thumbnail: '/showcases/logs/signoz-logs-thumbnail.webp',
    videoSrc: '/showcases/apm/signoz-apm.webm',
    techIcons: [
      {
        icon: <SiJavascript className="h-5 w-5 text-yellow-500" />,
        name: 'JavaScript',
        href: '/docs/instrumentation/javascript/',
      },
      {
        icon: <SiPython className="h-5 w-5 text-blue-500" />,
        name: 'Python',
        href: '/docs/instrumentation/python/',
      },
      {
        icon: <img src="/img/icons/java-icon.svg" alt="Java" className="h-5 w-5" />,
        name: 'Java',
        href: '/docs/instrumentation/java/',
      },
      {
        icon: <SiGo className="h-5 w-5 text-cyan-500" />,
        name: 'Go',
        href: '/docs/instrumentation/golang/',
      },
      {
        icon: <SiDotnet className="h-5 w-5 text-purple-500" />,
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
        icon: <SiKubernetes className="h-5 w-5 text-blue-600" />,
        name: 'Kubernetes',
        href: '/docs/userguide/collect_kubernetes_pod_logs/',
      },
      {
        icon: <SiDocker className="h-5 w-5 text-blue-400" />,
        name: 'Docker',
        href: '/docs/userguide/collect_docker_logs/',
      },
      {
        icon: <SiJavascript className="h-5 w-5 text-yellow-500" />,
        name: 'JavaScript',
        href: '/docs/logs-management/send-logs/nodejs-pino-logs/',
      },
      {
        icon: <SiPython className="h-5 w-5 text-blue-500" />,
        name: 'Python',
        href: '/docs/userguide/python-logs-auto-instrumentation/',
      },
      {
        icon: <FaFileAlt className="h-5 w-5 text-orange-500" />,
        name: 'Log Files',
        href: '/docs/userguide/collect_logs_from_file/',
      },
      {
        icon: <SiAmazonwebservices className="h-5 w-5 text-orange-400" />,
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
        icon: <Server className="h-5 w-5 text-orange-500" />,
        name: 'Host Monitoring',
        href: '/docs/userguide/hostmetrics/',
      },
      {
        icon: <SiKubernetes className="h-5 w-5 text-blue-600" />,
        name: 'Kubernetes',
        href: '/docs/userguide/k8s-metrics/',
      },
      {
        icon: <SiDocker className="h-5 w-5 text-blue-400" />,
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
        icon: <SiJavascript className="h-5 w-5 text-yellow-500" />,
        name: 'JavaScript',
        href: '/docs/instrumentation/javascript/',
      },
      {
        icon: <SiPython className="h-5 w-5 text-blue-500" />,
        name: 'Python',
        href: '/docs/instrumentation/python/',
      },
      {
        icon: <img src="/img/icons/java-icon.svg" alt="Java" className="h-5 w-5" />,
        name: 'Java',
        href: '/docs/instrumentation/java/',
      },
      {
        icon: <SiGo className="h-5 w-5 text-cyan-500" />,
        name: 'Go',
        href: '/docs/instrumentation/golang/',
      },
      {
        icon: <SiDotnet className="h-5 w-5 text-purple-500" />,
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
        icon: <SiPrometheus className="h-5 w-5 text-orange-500" />,
        name: 'Prometheus',
        href: '/docs/userguide/send-metrics-cloud/#enable-a-prometheus-receiver',
      },
      {
        icon: <SiNodedotjs className="h-5 w-5 text-green-500" />,
        name: 'NodeJS',
        href: '/opentelemetry/custom-metrics-nodejs/',
      },
      {
        icon: <SiPython className="h-5 w-5 text-blue-500" />,
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
        icon: <SiPostgresql className="h-5 w-5 text-blue-600" />,
        name: 'PostgreSQL',
        href: '/docs/integrations/postgresql/',
      },
      {
        icon: <SiRedis className="h-5 w-5 text-red-500" />,
        name: 'Redis',
        href: '/docs/integrations/redis/',
      },
      {
        icon: <SiMongodb className="h-5 w-5 text-green-600" />,
        name: 'MongoDB',
        href: '/docs/integrations/mongodb/',
      },
      {
        icon: <SiApachekafka className="h-5 w-5 text-white" />,
        name: 'Apache Kafka',
        href: '/docs/messaging-queues/kafka/',
      },
      {
        icon: <SiNginx className="h-5 w-5 text-green-600" />,
        name: 'Nginx',
        href: '/docs/integrations/nginx/',
      },
      {
        icon: <SiTemporal className="h-5 w-5 text-purple-500" />,
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
