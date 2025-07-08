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
  SiCouchdb,
  SiHadoop,
  SiClickhouse,
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
  Memory,
  Network,
  Container,
  Brain,
  Eye,
  Target,
  Clock,
  Award
} from 'lucide-react'
import IconCardGrid from '../Card/IconCardGrid'

interface IconCardData {
  name: string
  href: string
  icon: React.ReactNode
  clickName: string
}

const DashboardTemplatesData: IconCardData[] = [
  // Infrastructure & Host Metrics
  {
    name: 'Apache Web Server',
    href: '/docs/dashboards/dashboard-templates/apache-web-server',
    icon: <SiApache className="h-7 w-7 text-red-600" />,
    clickName: 'Apache Web Server Dashboard Template',
  },
  {
    name: 'APM',
    href: '/docs/dashboards/dashboard-templates/apm',
    icon: <Activity className="h-7 w-7 text-blue-500" />,
    clickName: 'APM Dashboard Template',
  },
  {
    name: 'ArgoCD',
    href: '/docs/dashboards/dashboard-templates/argocd',
    icon: <GitBranch className="h-7 w-7 text-orange-500" />,
    clickName: 'ArgoCD Dashboard Template',
  },
  {
    name: 'AWS ElastiCache Redis',
    href: '/docs/dashboards/dashboard-templates/aws-elasticache-redis',
    icon: <Cloud className="h-7 w-7 text-orange-600" />,
    clickName: 'AWS ElastiCache Redis Dashboard Template',
  },
  {
    name: 'AWS RDS',
    href: '/docs/dashboards/dashboard-templates/aws-rds',
    icon: <Database className="h-7 w-7 text-blue-600" />,
    clickName: 'AWS RDS Dashboard Template',
  },
  {
    name: 'AWS SQS Prometheus',
    href: '/docs/dashboards/dashboard-templates/aws-sqs-prometheus',
    icon: <MessageSquare className="h-7 w-7 text-purple-600" />,
    clickName: 'AWS SQS Prometheus Dashboard Template',
  },
  {
    name: 'CI/CD',
    href: '/docs/dashboards/dashboard-templates/cicd',
    icon: <Settings className="h-7 w-7 text-green-600" />,
    clickName: 'CI/CD Dashboard Template',
  },
  {
    name: 'ClickHouse',
    href: '/docs/dashboards/dashboard-templates/clickhouse',
    icon: <SiClickhouse className="h-7 w-7 text-yellow-500" />,
    clickName: 'ClickHouse Dashboard Template',
  },
  {
    name: 'Container Metrics Docker',
    href: '/docs/dashboards/dashboard-templates/container-metrics-docker',
    icon: <SiDocker className="h-7 w-7 text-blue-400" />,
    clickName: 'Container Metrics Docker Dashboard Template',
  },
  {
    name: 'CouchDB',
    href: '/docs/dashboards/dashboard-templates/couchdb',
    icon: <SiCouchdb className="h-7 w-7 text-red-500" />,
    clickName: 'CouchDB Dashboard Template',
  },
  {
    name: 'ECS Infra Metrics',
    href: '/docs/dashboards/dashboard-templates/ecs-infra-metrics',
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
    name: 'GCP Compute Engine',
    href: '/docs/dashboards/dashboard-templates/gcp-compute-engine',
    icon: <Cloud className="h-7 w-7 text-blue-500" />,
    clickName: 'GCP Compute Engine Dashboard Template',
  },
  {
    name: 'Hadoop',
    href: '/docs/dashboards/dashboard-templates/hadoop',
    icon: <SiHadoop className="h-7 w-7 text-yellow-600" />,
    clickName: 'Hadoop Dashboard Template',
  },
  {
    name: 'HAProxy',
    href: '/docs/dashboards/dashboard-templates/haproxy',
    icon: <Shield className="h-7 w-7 text-blue-600" />,
    clickName: 'HAProxy Dashboard Template',
  },
  {
    name: 'Host Metrics',
    href: '/docs/dashboards/dashboard-templates/hostmetrics',
    icon: <Monitor className="h-7 w-7 text-blue-500" />,
    clickName: 'Host Metrics Dashboard Template',
  },
  {
    name: 'Jenkins',
    href: '/docs/dashboards/dashboard-templates/jenkins',
    icon: <SiJenkins className="h-7 w-7 text-blue-700" />,
    clickName: 'Jenkins Dashboard Template',
  },
  {
    name: 'JMX',
    href: '/docs/dashboards/dashboard-templates/jmx',
    icon: <Cpu className="h-7 w-7 text-red-600" />,
    clickName: 'JMX Dashboard Template',
  },
  {
    name: 'JVM',
    href: '/docs/dashboards/dashboard-templates/jvm',
    icon: <Memory className="h-7 w-7 text-orange-600" />,
    clickName: 'JVM Dashboard Template',
  },
  {
    name: 'K8s Infra Metrics',
    href: '/docs/dashboards/dashboard-templates/k8s-infra-metrics',
    icon: <SiKubernetes className="h-7 w-7 text-blue-600" />,
    clickName: 'K8s Infra Metrics Dashboard Template',
  },
  {
    name: 'KEDA',
    href: '/docs/dashboards/dashboard-templates/keda',
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
    name: 'LLM Observability',
    href: '/docs/dashboards/dashboard-templates/llm-observability',
    icon: <Brain className="h-7 w-7 text-purple-600" />,
    clickName: 'LLM Observability Dashboard Template',
  },
  {
    name: 'Memcached',
    href: '/docs/dashboards/dashboard-templates/memcached',
    icon: <HardDrive className="h-7 w-7 text-green-600" />,
    clickName: 'Memcached Dashboard Template',
  },
  {
    name: 'MongoDB',
    href: '/docs/dashboards/dashboard-templates/mongodb',
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
    href: '/docs/dashboards/dashboard-templates/nomad',
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
    name: 'RabbitMQ',
    href: '/docs/dashboards/dashboard-templates/rabbitmq',
    icon: <SiRabbitmq className="h-7 w-7 text-orange-600" />,
    clickName: 'RabbitMQ Dashboard Template',
  },
  {
    name: 'Redis',
    href: '/docs/dashboards/dashboard-templates/redis',
    icon: <SiRedis className="h-7 w-7 text-red-600" />,
    clickName: 'Redis Dashboard Template',
  },
  {
    name: 'SigNoz Ingestion Analysis',
    href: '/docs/dashboards/dashboard-templates/signoz-ingestion-analysis',
    icon: <BarChart3 className="h-7 w-7 text-blue-500" />,
    clickName: 'SigNoz Ingestion Analysis Dashboard Template',
  },
  {
    name: 'Snowflake',
    href: '/docs/dashboards/dashboard-templates/snowflake',
    icon: <SiSnowflake className="h-7 w-7 text-blue-400" />,
    clickName: 'Snowflake Dashboard Template',
  },
  {
    name: 'Temporal.io',
    href: '/docs/dashboards/dashboard-templates/temporal-io',
    icon: <Clock className="h-7 w-7 text-blue-600" />,
    clickName: 'Temporal.io Dashboard Template',
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