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
} from 'lucide-react'

export interface TechIcon {
  icon: React.ReactNode
  name: string
  href?: string
}

export interface FeatureShowcase {
  id: string
  title: string
  description: string
  thumbnail: string
  videoSrc: string
  techIcons: TechIcon[]
  ctaLink: {
    text: string
    href: string
  }
  category: 'core' | 'cloud' | 'advanced'
  badge?: {
    text: string
    type: 'popular' | 'new' | 'enterprise'
  }
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
    videoSrc: '/showcases/logs/signoz-logs.mp4',
    techIcons: [
      { icon: <SiJavascript className="h-5 w-5 text-yellow-500" />, name: 'JavaScript', href: '/docs/instrumentation/javascript/' },
      { icon: <SiPython className="h-5 w-5 text-blue-500" />, name: 'Python', href: '/docs/instrumentation/python/' },
      { icon: <img src="/img/icons/java-icon.svg" alt="Java" className="h-5 w-5" />, name: 'Java', href: '/docs/instrumentation/java/' },
      { icon: <SiGo className="h-5 w-5 text-cyan-500" />, name: 'Go', href: '/docs/instrumentation/go/' },
      { icon: <SiDotnet className="h-5 w-5 text-purple-500" />, name: '.NET', href: '/docs/instrumentation/dotnet/' },
      { icon: <SiPhp className="h-5 w-5 text-purple-600" />, name: 'PHP', href: '/docs/instrumentation/php/' },
      { icon: <SiRuby className="h-5 w-5 text-red-500" />, name: 'Ruby', href: '/docs/instrumentation/ruby/' },
      { icon: <SiRust className="h-5 w-5 text-orange-600" />, name: 'Rust', href: '/docs/instrumentation/rust/' },
    ],
    ctaLink: {
      text: 'See all languages',
      href: '/docs/instrumentation/',
    },
    category: 'core',
  },
  {
    id: 'log-management',
    title: 'Log Management',
    description: 'Ingest, search, and analyze your logs at any scale with powerful log management.',
    thumbnail: '/showcases/logs/signoz-logs-thumbnail.webp',
    videoSrc: '/showcases/logs/signoz-logs.mp4',
    techIcons: [
      { icon: <Search className="h-5 w-5 text-blue-500" />, name: 'Log Search', href: '/docs/logs-management/send-logs-to-signoz/' },
      { icon: <SiKubernetes className="h-5 w-5 text-blue-600" />, name: 'Kubernetes', href: '/docs/install/kubernetes/' },
      { icon: <SiDocker className="h-5 w-5 text-blue-400" />, name: 'Docker', href: '/docs/install/docker/' },
      { icon: <SiNodedotjs className="h-5 w-5 text-green-500" />, name: 'Node.js', href: '/docs/instrumentation/javascript/' },
      { icon: <SiPython className="h-5 w-5 text-blue-500" />, name: 'Python', href: '/docs/instrumentation/python/' },
      { icon: <SiJavascript className="h-5 w-5 text-yellow-500" />, name: 'JavaScript', href: '/docs/instrumentation/javascript/' },
      { icon: <img src="/img/icons/java-icon.svg" alt="Java" className="h-5 w-5" />, name: 'Java', href: '/docs/instrumentation/java/' },
      { icon: <Database className="h-5 w-5 text-purple-500" />, name: 'Log Storage' },
    ],
    ctaLink: {
      text: 'See all log sources',
      href: '/docs/logs-management/send-logs-to-signoz/',
    },
    category: 'core',
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    description:
      'Monitor hosts, containers, and orchestration platforms with infrastructure monitoring.',
    thumbnail: '/showcases/logs/signoz-logs-thumbnail.webp',
    videoSrc: '/showcases/logs/signoz-logs.mp4',
    techIcons: [
      { icon: <LucideServer className="h-5 w-5 text-signoz_robin-500" />, name: 'Infrastructure' },
      { icon: <SiDocker className="h-5 w-5 text-blue-400" />, name: 'Docker' },
      { icon: <SiKubernetes className="h-5 w-5 text-blue-600" />, name: 'Kubernetes' },
      { icon: <SiPrometheus className="h-5 w-5 text-orange-500" />, name: 'Prometheus' },
      { icon: <Activity className="h-5 w-5 text-green-500" />, name: 'Host Metrics' },
      { icon: <BarChart3 className="h-5 w-5 text-blue-500" />, name: 'System Metrics' },
    ],
    ctaLink: {
      text: 'See infrastructure docs',
      href: '/docs/infrastructure-monitoring/overview/',
    },
    category: 'core',
  },
  {
    id: 'tracing',
    title: 'Tracing',
    description:
      'Track user requests across services to identify bottlenecks with distributed tracing.',
    thumbnail: '/showcases/logs/signoz-logs-thumbnail.webp',
    videoSrc: '/showcases/logs/signoz-logs.mp4',
    techIcons: [
      { icon: <Activity className="h-5 w-5 text-blue-500" />, name: 'Request Tracing' },
      { icon: <SiKubernetes className="h-5 w-5 text-blue-600" />, name: 'Kubernetes' },
      { icon: <SiDocker className="h-5 w-5 text-blue-400" />, name: 'Docker' },
      { icon: <Globe className="h-5 w-5 text-green-500" />, name: 'Microservices' },
      { icon: <Workflow className="h-5 w-5 text-purple-500" />, name: 'Service Mesh' },
      { icon: <Monitor className="h-5 w-5 text-orange-500" />, name: 'Distributed Systems' },
    ],
    ctaLink: {
      text: 'See all tracing features',
      href: '/docs/distributed-tracing/overview/',
    },
    category: 'core',
  },
  {
    id: 'metrics',
    title: 'Metrics',
    description: 'Custom metrics and configurable dashboards to fit any monitoring use case.',
    thumbnail: '/showcases/logs/signoz-logs-thumbnail.webp',
    videoSrc: '/showcases/logs/signoz-logs.mp4',
    techIcons: [
      { icon: <BarChart3 className="h-5 w-5 text-blue-500" />, name: 'Custom Metrics' },
      { icon: <TrendingUp className="h-5 w-5 text-green-500" />, name: 'Analytics' },
      { icon: <SiPrometheus className="h-5 w-5 text-orange-500" />, name: 'Prometheus' },
      { icon: <Database className="h-5 w-5 text-purple-500" />, name: 'Time Series' },
      { icon: <Activity className="h-5 w-5 text-cyan-500" />, name: 'Real-time' },
    ],
    ctaLink: {
      text: 'See all metrics features',
      href: '/docs/metrics-management/overview/',
    },
    category: 'core',
  },
  {
    id: 'dashboards',
    title: 'Dashboards',
    description: 'Create powerful, customizable dashboards to visualize your observability data.',
    thumbnail: '/showcases/logs/signoz-logs-thumbnail.webp',
    videoSrc: '/showcases/logs/signoz-logs.mp4',
    techIcons: [
      { icon: <BarChart3 className="h-5 w-5 text-blue-500" />, name: 'Custom Dashboards' },
      { icon: <TrendingUp className="h-5 w-5 text-green-500" />, name: 'Data Visualization' },
      { icon: <Monitor className="h-5 w-5 text-purple-500" />, name: 'Real-time Charts' },
      { icon: <Activity className="h-5 w-5 text-orange-500" />, name: 'Live Monitoring' },
      { icon: <Database className="h-5 w-5 text-cyan-500" />, name: 'Query Builder' },
    ],
    ctaLink: {
      text: 'See all dashboard features',
      href: '/docs/dashboards/overview/',
    },
    category: 'core',
  },
  {
    id: 'exceptions',
    title: 'Exceptions',
    description:
      'Record exceptions automatically with stack trace & linked span data for faster debugging.',
    thumbnail: '/showcases/logs/signoz-logs-thumbnail.webp',
    videoSrc: '/showcases/logs/signoz-logs.mp4',
    techIcons: [
      { icon: <Bug className="h-5 w-5 text-red-500" />, name: 'Error Tracking' },
      { icon: <SiJavascript className="h-5 w-5 text-yellow-500" />, name: 'JavaScript' },
      { icon: <SiPython className="h-5 w-5 text-blue-500" />, name: 'Python' },
      { icon: <img src="/img/icons/java-icon.svg" alt="Java" className="h-5 w-5" />, name: 'Java' },
      { icon: <SiGo className="h-5 w-5 text-cyan-500" />, name: 'Go' },
      { icon: <SiDotnet className="h-5 w-5 text-purple-500" />, name: '.NET' },
      { icon: <Layers className="h-5 w-5 text-orange-500" />, name: 'Stack Traces' },
    ],
    ctaLink: {
      text: 'See all exception features',
      href: '/docs/exceptions-monitoring/overview/',
    },
    category: 'core',
  },
  {
    id: 'alerts',
    title: 'Alerts',
    description:
      'Get actionable alerts in your preferred notification channel with smart alerting.',
    thumbnail: '/showcases/logs/signoz-logs-thumbnail.webp',
    videoSrc: '/showcases/logs/signoz-logs.mp4',
    techIcons: [
      { icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />, name: 'Alert Rules' },
      { icon: <Zap className="h-5 w-5 text-orange-500" />, name: 'Notifications' },
      { icon: <Activity className="h-5 w-5 text-green-500" />, name: 'Monitoring' },
      { icon: <Globe className="h-5 w-5 text-blue-500" />, name: 'Webhooks' },
      { icon: <Database className="h-5 w-5 text-purple-500" />, name: 'Alert History' },
    ],
    ctaLink: {
      text: 'See all alert features',
      href: '/docs/alerts-management/overview/',
    },
    category: 'core',
  },
  {
    id: 'aws',
    title: 'AWS',
    description: 'Monitor AWS services and infrastructure with native AWS integrations.',
    thumbnail: '/showcases/logs/signoz-logs-thumbnail.webp',
    videoSrc: '/showcases/logs/signoz-logs.mp4',
    techIcons: [
      { icon: <SiAmazon className="h-5 w-5 text-orange-500" />, name: 'AWS' },
      { icon: <Cloud className="h-5 w-5 text-blue-400" />, name: 'EC2' },
      { icon: <SiKubernetes className="h-5 w-5 text-blue-600" />, name: 'EKS' },
      { icon: <Database className="h-5 w-5 text-green-500" />, name: 'RDS' },
      { icon: <LucideServer className="h-5 w-5 text-purple-500" />, name: 'Lambda' },
    ],
    ctaLink: {
      text: 'See all AWS integrations',
      href: '/docs/integrations/aws/',
    },
    category: 'cloud',
  },
  {
    id: 'azure',
    title: 'Azure',
    description: 'Comprehensive monitoring for Azure services and resources.',
    thumbnail: '/showcases/logs/signoz-logs-thumbnail.webp',
    videoSrc: '/showcases/logs/signoz-logs.mp4',
    techIcons: [
      {
        icon: <img src="/img/icons/azure-icon.svg" width={20} height={20} alt="Azure" />,
        name: 'Azure',
      },
      { icon: <Cloud className="h-5 w-5 text-blue-400" />, name: 'Virtual Machines' },
      { icon: <SiKubernetes className="h-5 w-5 text-blue-600" />, name: 'AKS' },
      { icon: <Database className="h-5 w-5 text-green-500" />, name: 'SQL Database' },
      { icon: <LucideServer className="h-5 w-5 text-purple-500" />, name: 'Functions' },
    ],
    ctaLink: {
      text: 'See all Azure integrations',
      href: '/docs/integrations/azure/',
    },
    category: 'cloud',
  },
  {
    id: 'gcp',
    title: 'GCP',
    description: 'Monitor Google Cloud Platform services with built-in GCP integrations.',
    thumbnail: '/showcases/logs/signoz-logs-thumbnail.webp',
    videoSrc: '/showcases/logs/signoz-logs.mp4',
    techIcons: [
      { icon: <SiGooglecloud className="h-5 w-5 text-blue-400" />, name: 'Google Cloud' },
      { icon: <SiKubernetes className="h-5 w-5 text-blue-600" />, name: 'GKE' },
      { icon: <Cloud className="h-5 w-5 text-green-400" />, name: 'Compute Engine' },
      { icon: <Database className="h-5 w-5 text-orange-500" />, name: 'Cloud SQL' },
      { icon: <LucideServer className="h-5 w-5 text-purple-500" />, name: 'Cloud Functions' },
    ],
    ctaLink: {
      text: 'See all GCP integrations',
      href: '/docs/integrations/gcp/',
    },
    category: 'cloud',
  },
  {
    id: 'frontend-mobile',
    title: 'Frontend & Mobile Monitoring',
    description: 'Monitor frontend applications and mobile apps with real user monitoring.',
    thumbnail: '/showcases/logs/signoz-logs-thumbnail.webp',
    videoSrc: '/showcases/logs/signoz-logs.mp4',
    techIcons: [
      { icon: <Globe className="h-5 w-5 text-blue-500" />, name: 'Web Apps' },
      { icon: <Smartphone className="h-5 w-5 text-green-500" />, name: 'Mobile Apps' },
      { icon: <SiJavascript className="h-5 w-5 text-yellow-500" />, name: 'JavaScript' },
      { icon: <Activity className="h-5 w-5 text-purple-500" />, name: 'Real User Monitoring' },
      { icon: <Monitor className="h-5 w-5 text-orange-500" />, name: 'Performance' },
    ],
    ctaLink: {
      text: 'See all frontend features',
      href: '/docs/frontend-monitoring/overview/',
    },
    category: 'advanced',
  },
  {
    id: 'llm-monitoring',
    title: 'LLM Monitoring',
    description:
      'Monitor Large Language Models and AI applications with specialized LLM observability.',
    thumbnail: '/showcases/logs/signoz-logs-thumbnail.webp',
    videoSrc: '/showcases/logs/signoz-logs.mp4',
    techIcons: [
      { icon: <Brain className="h-5 w-5 text-purple-500" />, name: 'LLM Models' },
      { icon: <Activity className="h-5 w-5 text-blue-500" />, name: 'AI Observability' },
      { icon: <BarChart3 className="h-5 w-5 text-green-500" />, name: 'Model Metrics' },
      { icon: <Database className="h-5 w-5 text-orange-500" />, name: 'Token Usage' },
      { icon: <Monitor className="h-5 w-5 text-cyan-500" />, name: 'Performance' },
    ],
    ctaLink: {
      text: 'See all LLM features',
      href: '/docs/llm-monitoring/overview/',
    },
    category: 'advanced',
    badge: {
      text: 'New',
      type: 'new',
    },
  },
  {
    id: 'correlation',
    title: 'Correlation',
    description: 'Correlate metrics, logs, and traces to get complete observability insights.',
    thumbnail: '/showcases/logs/signoz-logs-thumbnail.webp',
    videoSrc: '/showcases/logs/signoz-logs.mp4',
    techIcons: [
      { icon: <Link className="h-5 w-5 text-blue-500" />, name: 'Data Correlation' },
      { icon: <Activity className="h-5 w-5 text-green-500" />, name: 'Trace to Logs' },
      { icon: <BarChart3 className="h-5 w-5 text-purple-500" />, name: 'Metrics Linking' },
      { icon: <Search className="h-5 w-5 text-orange-500" />, name: 'Cross-Signal' },
      { icon: <Workflow className="h-5 w-5 text-cyan-500" />, name: 'Flow Analysis' },
    ],
    ctaLink: {
      text: 'See all correlation features',
      href: '/docs/correlation/overview/',
    },
    category: 'advanced',
  },
  {
    id: 'cicd-observability',
    title: 'CI/CD Observability',
    description:
      'Monitor your CI/CD pipelines and deployment processes with specialized observability.',
    thumbnail: '/showcases/logs/signoz-logs-thumbnail.webp',
    videoSrc: '/showcases/logs/signoz-logs.mp4',
    techIcons: [
      { icon: <GitBranch className="h-5 w-5 text-blue-500" />, name: 'CI/CD Pipelines' },
      { icon: <Activity className="h-5 w-5 text-green-500" />, name: 'Deployment Tracking' },
      { icon: <Monitor className="h-5 w-5 text-purple-500" />, name: 'Build Monitoring' },
      { icon: <BarChart3 className="h-5 w-5 text-orange-500" />, name: 'Pipeline Metrics' },
      { icon: <AlertTriangle className="h-5 w-5 text-red-500" />, name: 'Failure Detection' },
    ],
    ctaLink: {
      text: 'See all CI/CD features',
      href: '/docs/cicd-observability/overview/',
    },
    category: 'advanced',
  },
  {
    id: 'integrations',
    title: 'Integrations',
    description:
      'Connect with 100+ integrations including databases, message queues, and third-party services.',
    thumbnail: '/showcases/logs/signoz-logs-thumbnail.webp',
    videoSrc: '/showcases/logs/signoz-logs.mp4',
    techIcons: [
      { icon: <SiPostgresql className="h-5 w-5 text-blue-600" />, name: 'PostgreSQL' },
      { icon: <SiRedis className="h-5 w-5 text-red-500" />, name: 'Redis' },
      { icon: <SiMongodb className="h-5 w-5 text-green-600" />, name: 'MongoDB' },
      { icon: <SiApachekafka className="h-5 w-5 text-black" />, name: 'Apache Kafka' },
      { icon: <SiNginx className="h-5 w-5 text-green-600" />, name: 'Nginx' },
      { icon: <Database className="h-5 w-5 text-purple-500" />, name: 'Databases' },
      { icon: <Globe className="h-5 w-5 text-blue-500" />, name: 'APIs' },
    ],
    ctaLink: {
      text: 'See all integrations',
      href: '/docs/integrations/integrations-list/',
    },
    category: 'advanced',
  },
  {
    id: 'external-apis',
    title: 'External APIs',
    description: 'Monitor external API calls, dependencies, and third-party service performance.',
    thumbnail: '/showcases/logs/signoz-logs-thumbnail.webp',
    videoSrc: '/showcases/logs/signoz-logs.mp4',
    techIcons: [
      { icon: <Globe className="h-5 w-5 text-blue-500" />, name: 'External APIs' },
      { icon: <Link className="h-5 w-5 text-green-500" />, name: 'Dependencies' },
      { icon: <Activity className="h-5 w-5 text-purple-500" />, name: 'API Monitoring' },
      { icon: <BarChart3 className="h-5 w-5 text-orange-500" />, name: 'Performance' },
      { icon: <AlertTriangle className="h-5 w-5 text-red-500" />, name: 'Error Tracking' },
    ],
    ctaLink: {
      text: 'See all API features',
      href: '/docs/api-monitoring/overview/',
    },
    category: 'advanced',
  },
  {
    id: 'messaging-queues',
    title: 'Messaging Queues',
    description: 'Monitor message queues, event streams, and asynchronous communication patterns.',
    thumbnail: '/showcases/logs/signoz-logs-thumbnail.webp',
    videoSrc: '/showcases/logs/signoz-logs.mp4',
    techIcons: [
      { icon: <SiApachekafka className="h-5 w-5 text-black" />, name: 'Apache Kafka' },
      { icon: <SiRabbitmq className="h-5 w-5 text-orange-600" />, name: 'RabbitMQ' },
      { icon: <SiRedis className="h-5 w-5 text-red-500" />, name: 'Redis Streams' },
      { icon: <MessageSquare className="h-5 w-5 text-blue-500" />, name: 'Message Queues' },
      { icon: <Workflow className="h-5 w-5 text-purple-600" />, name: 'Event Streaming' },
    ],
    ctaLink: {
      text: 'See all messaging features',
      href: '/docs/messaging-queues/overview/',
    },
    category: 'advanced',
  },
]
