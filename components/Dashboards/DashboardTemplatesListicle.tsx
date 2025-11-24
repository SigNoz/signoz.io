import React from 'react'
import {
  SiKubernetes,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiApache,
  SiNginx,
  SiRabbitmq,
  SiApachekafka,
  SiDocker,
  SiJenkins,
  SiSnowflake,
  SiClickhouse,
  SiVercel,
  SiClaude,
  SiGooglegemini,
  SiAnthropic,
  SiAmazonwebservices,
  SiPydantic,
} from 'react-icons/si'
import {
  Monitor,
  Database,
  Server,
  MessageSquare,
  Activity,
  Cloud,
  BarChart3,
  Settings,
  GitBranch,
  Layers,
  Globe,
  Zap,
  Shield,
  HardDrive,
  Cpu,
  Network,
  Container,
  Brain,
  Eye,
  Target,
  Clock,
  Award,
} from 'lucide-react'
import IconCardGrid from '../Card/IconCardGrid'

interface IconCardData {
  name: string
  href: string
  icon: React.ReactNode
  clickName: string
}

const DashboardTemplatesData: IconCardData[] = [
  {
    name: 'Amazon Bedrock',
    href: '/docs/dashboards/dashboard-templates/amazon-bedrock-dashboard',
    icon: <SiAmazonwebservices className="h-7 w-7 text-white" />,
    clickName: 'Amazon Bedrock Dashboard Template',
  },
  {
    name: 'Anthropic API',
    href: '/docs/dashboards/dashboard-templates/anthropic-dashboard',
    icon: <SiAnthropic className="h-7 w-7 text-orange-600" />,
    clickName: 'Anthropic API Dashboard Template',
  },
  {
    name: 'Apache Web Server',
    href: '/docs/dashboards/dashboard-templates/apache-web-server',
    icon: <SiApache className="h-7 w-7 text-red-600" />,
    clickName: 'Apache Web Server Dashboard Template',
  },
  {
    name: 'APM',
    href: '/docs/dashboards/dashboard-templates/apm-dashboards',
    icon: <Activity className="h-7 w-7 text-blue-500" />,
    clickName: 'APM Dashboard Template',
  },
  {
    name: 'ArgoCD',
    href: '/docs/dashboards/dashboard-templates/argocd-dashboard',
    icon: <GitBranch className="h-7 w-7 text-orange-500" />,
    clickName: 'ArgoCD Dashboard Template',
  },
  {
    name: 'Autogen',
    href: '/docs/dashboards/dashboard-templates/autogen-dashboard',
    icon: (
      <img
        src="/svgs/icons/LLMMonitoring/autogen-logo.webp"
        alt="Autogen Icon"
        className="h-7 w-7"
      />
    ),
    clickName: 'Autogen Dashboard Template',
  },
  {
    name: 'AWS ElastiCache Redis',
    href: '/docs/dashboards/dashboard-templates/aws-elasticache-redis',
    icon: <Cloud className="h-7 w-7 text-orange-600" />,
    clickName: 'AWS ElastiCache Redis Dashboard Template',
  },
  {
    name: 'AWS RDS',
    href: 'https://github.com/SigNoz/dashboards/tree/main/aws-rds',
    icon: <Database className="h-7 w-7 text-blue-600" />,
    clickName: 'AWS RDS Dashboard Template',
  },
  {
    name: 'AWS SQS Prometheus',
    href: 'https://github.com/SigNoz/dashboards/tree/main/aws-sqs-prometheus',
    icon: <MessageSquare className="h-7 w-7 text-purple-600" />,
    clickName: 'AWS SQS Prometheus Dashboard Template',
  },
  {
    name: 'Azure OpenAI API',
    href: '/docs/dashboards/dashboard-templates/azure-openai-dashboard',
    icon: (
      <img
        src="/svgs/icons/LLMMonitoring/azure-logo.webp"
        alt="Azure OpenAI Icon"
        className="h-7 w-7"
      />
    ),
    clickName: 'Azure OpenAI API Dashboard Template',
  },
  {
    name: 'CI/CD',
    href: '/docs/dashboards/dashboard-templates/cicd',
    icon: <Settings className="h-7 w-7 text-green-600" />,
    clickName: 'CI/CD Dashboard Template',
  },
  {
    name: 'Claude Code',
    href: '/docs/dashboards/dashboard-templates/claude-code-dashboard/',
    icon: <SiClaude className="h-7 w-7 text-orange-500" />,
    clickName: 'Claude Code Dashboard Template',
  },
  {
    name: 'ClickHouse',
    href: '/docs/dashboards/dashboard-templates/clickhouse-monitoring',
    icon: <SiClickhouse className="h-7 w-7 text-yellow-500" />,
    clickName: 'ClickHouse Dashboard Template',
  },
  {
    name: 'CouchDB',
    href: '/docs/dashboards/dashboard-templates/couchdb',
    icon: <Database className="h-7 w-7 text-red-500" />,
    clickName: 'CouchDB Dashboard Template',
  },
  {
    name: 'Crew AI',
    href: '/docs/dashboards/dashboard-templates/crewai-dashboard',
    icon: (
      <img src="/svgs/icons/LLMMonitoring/crewai-logo.svg" alt="Crew AI Icon" className="h-7 w-7" />
    ),
    clickName: 'Crew AI Dashboard Template',
  },
  {
    name: 'DeepSeek API',
    href: '/docs/dashboards/dashboard-templates/deepseek-dashboard',
    icon: (
      <img
        src="/svgs/icons/LLMMonitoring/deepseek-icon.svg"
        alt="DeepSeek Icon"
        className="h-7 w-7"
      />
    ),
    clickName: 'DeepSeek API Dashboard Template',
  },
  {
    name: 'Docker Container Metrics',
    href: '/docs/dashboards/dashboard-templates/docker-container-metrics',
    icon: <SiDocker className="h-7 w-7 text-blue-400" />,
    clickName: 'Docker Container Metrics Dashboard Template',
  },
  {
    name: 'ECS Infra Metrics',
    href: 'https://github.com/SigNoz/dashboards/tree/main/ecs-infra-metrics',
    icon: <Container className="h-7 w-7 text-orange-500" />,
    clickName: 'ECS Infra Metrics Dashboard Template',
  },
  {
    name: 'Flask Monitoring',
    href: '/docs/dashboards/dashboard-templates/flask-monitoring',
    icon: <Globe className="h-7 w-7 text-black" />,
    clickName: 'Flask Monitoring Dashboard Template',
  },
  {
    name: 'Frontend Monitoring',
    href: '/docs/dashboards/dashboard-templates/frontend-monitoring',
    icon: <Network className="h-7 w-7 text-white" />,
    clickName: 'Frontend Monitoring Dashboard Template',
  },
  {
    name: 'GCP Compute Engine',
    href: 'https://github.com/SigNoz/dashboards/tree/main/gcp/compute-engine',
    icon: <Cloud className="h-7 w-7 text-blue-500" />,
    clickName: 'GCP Compute Engine Dashboard Template',
  },
  {
    name: 'Google Gemini',
    href: 'https://github.com/SigNoz/dashboards/tree/main/google-gemini',
    icon: <SiGooglegemini className="h-7 w-7 text-blue-500" />,
    clickName: 'Google Gemini Dashboard Template',
  },
  {
    name: 'Hadoop',
    href: 'https://github.com/SigNoz/dashboards/tree/main/hadoop',
    icon: <Server className="h-7 w-7 text-yellow-600" />,
    clickName: 'Hadoop Dashboard Template',
  },
  {
    name: 'HAProxy',
    href: '/docs/dashboards/dashboard-templates/haproxy-monitoring',
    icon: <Shield className="h-7 w-7 text-blue-600" />,
    clickName: 'HAProxy Dashboard Template',
  },
  {
    name: 'Host Metrics',
    href: '/docs/dashboards/dashboard-templates/hostmetrics-dashboards',
    icon: <Monitor className="h-7 w-7 text-blue-500" />,
    clickName: 'Host Metrics Dashboard Template',
  },
  {
    name: 'Jenkins',
    href: 'https://github.com/SigNoz/dashboards/tree/main/jenkins',
    icon: <SiJenkins className="h-7 w-7 text-blue-700" />,
    clickName: 'Jenkins Dashboard Template',
  },
  {
    name: 'JMX',
    href: 'https://github.com/SigNoz/dashboards/tree/main/jmx',
    icon: <Cpu className="h-7 w-7 text-red-600" />,
    clickName: 'JMX Dashboard Template',
  },
  {
    name: 'JVM',
    href: '/docs/dashboards/dashboard-templates/jvm-metrics',
    icon: <Cpu className="h-7 w-7 text-orange-600" />,
    clickName: 'JVM Dashboard Template',
  },
  {
    name: 'Kubernetes',
    href: '/docs/dashboards/dashboard-templates/kubernetes-dashboards',
    icon: <SiKubernetes className="h-7 w-7 text-blue-600" />,
    clickName: 'K8s Infra Metrics Dashboard Template',
  },
  {
    name: 'KEDA',
    href: 'https://github.com/SigNoz/dashboards/tree/main/keda',
    icon: <Zap className="h-7 w-7 text-purple-500" />,
    clickName: 'KEDA Dashboard Template',
  },
  {
    name: 'Key Operations',
    href: '/docs/dashboards/dashboard-templates/key-operations',
    icon: <Target className="h-7 w-7 text-green-500" />,
    clickName: 'Key Operations Dashboard Template',
  },
  {
    name: 'LiteLLM',
    href: '/docs/dashboards/dashboard-templates/litellm-dashboards',
    icon: (
      <img
        src="/svgs/icons/LLMMonitoring/litellm-logo.webp"
        alt="LiteLLM Icon"
        className="h-7 w-7"
      />
    ),
    clickName: 'LiteLLM Dashboard Template',
  },
  {
    name: 'LLM Observability',
    href: 'https://github.com/SigNoz/dashboards/tree/main/llm-observability',
    icon: <Brain className="h-7 w-7 text-purple-600" />,
    clickName: 'LLM Observability Dashboard Template',
  },
  {
    name: 'Mastra',
    href: '/docs/dashboards/dashboard-templates/mastra-dashboard',
    icon: (
      <img src="/svgs/icons/LLMMonitoring/mastra-icon.webp" alt="Mastra Icon" className="h-7 w-7" />
    ),
    clickName: 'Mastra Dashboard Template',
  },
  {
    name: 'Memcached',
    href: '/docs/dashboards/dashboard-templates/memcached',
    icon: <HardDrive className="h-7 w-7 text-green-600" />,
    clickName: 'Memcached Dashboard Template',
  },
  {
    name: 'Cost Meter',
    href: '/docs/dashboards/dashboard-templates/cost-meter',
    icon: <BarChart3 className="h-7 w-7 text-blue-500" />,
    clickName: 'Cost Meter Dashboard Template',
  },
  {
    name: 'MongoDB',
    href: 'https://github.com/SigNoz/dashboards/tree/main/mongodb',
    icon: <SiMongodb className="h-7 w-7 text-green-600" />,
    clickName: 'MongoDB Dashboard Template',
  },
  {
    name: 'MySQL',
    href: '/docs/dashboards/dashboard-templates/mysql',
    icon: <SiMysql className="h-7 w-7 text-orange-500" />,
    clickName: 'MySQL Dashboard Template',
  },
  {
    name: 'Nginx',
    href: '/docs/dashboards/dashboard-templates/nginx',
    icon: <SiNginx className="h-7 w-7 text-green-500" />,
    clickName: 'Nginx Dashboard Template',
  },
  {
    name: 'Nomad',
    href: 'https://github.com/SigNoz/dashboards/tree/main/nomad',
    icon: <Layers className="h-7 w-7 text-purple-600" />,
    clickName: 'Nomad Dashboard Template',
  },
  {
    name: 'PostgreSQL',
    href: '/docs/dashboards/dashboard-templates/postgresql',
    icon: <SiPostgresql className="h-7 w-7 text-blue-600" />,
    clickName: 'PostgreSQL Dashboard Template',
  },
  {
    name: 'Pydantic AI',
    href: '/docs/dashboards/dashboard-templates/pydantic-ai-dashboard',
    icon: <SiPydantic className="h-7 w-7 text-pink-600" />,
    clickName: 'Pydantic AI Dashboard Template',
  },
  {
    name: 'RabbitMQ',
    href: '/docs/dashboards/dashboard-templates/rabbitmq',
    icon: <SiRabbitmq className="h-7 w-7 text-orange-600" />,
    clickName: 'RabbitMQ Dashboard Template',
  },
  {
    name: 'Redis',
    href: 'https://github.com/SigNoz/dashboards/tree/main/redis',
    icon: <SiRedis className="h-7 w-7 text-red-600" />,
    clickName: 'Redis Dashboard Template',
  },
  {
    name: 'Semantic Kernel',
    href: '/docs/dashboards/dashboard-templates/semantic-kernel-dashboard',
    icon: (
      <img
        src="/svgs/icons/LLMMonitoring/sk-logo.webp"
        alt="Semantic Kernel Icon"
        className="h-7 w-7"
      />
    ),
    clickName: 'Semantic Kernel Dashboard Template',
  },
  {
    name: 'SigNoz Ingestion Analysis',
    href: '/docs/dashboards/dashboard-templates/signoz-ingestion-analysis',
    icon: <BarChart3 className="h-7 w-7 text-blue-500" />,
    clickName: 'SigNoz Ingestion Analysis Dashboard Template',
  },
  {
    name: 'Snowflake',
    href: 'https://github.com/SigNoz/dashboards/tree/main/snowflake',
    icon: <SiSnowflake className="h-7 w-7 text-blue-400" />,
    clickName: 'Snowflake Dashboard Template',
  },
  {
    name: 'Temporal.io',
    href: 'https://github.com/SigNoz/dashboards/tree/main/temporal.io',
    icon: <Clock className="h-7 w-7 text-blue-600" />,
    clickName: 'Temporal.io Dashboard Template',
  },
  {
    name: 'Vercel AI SDK',
    href: 'https://github.com/SigNoz/dashboards/tree/main/vercel-ai-sdk',
    icon: <SiVercel className="text-black-600 h-7 w-7" />,
    clickName: 'Vercel AI SDK Dashboard Template',
  },
]

export default function DashboardTemplatesListicle() {
  return (
    <IconCardGrid
      cards={DashboardTemplatesData}
      sectionName="Dashboard Templates Section"
      viewAllText="View all dashboard templates"
      gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
    />
  )
}
