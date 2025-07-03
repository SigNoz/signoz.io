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
} from 'react-icons/si'
import { Monitor, Database, Server, MessageSquare, Activity } from 'lucide-react'
import IconCardGrid from '../Card/IconCardGrid'

interface IconCardData {
  name: string
  href: string
  icon: React.ReactNode
  clickName: string
}

const DashboardTemplatesData: IconCardData[] = [
  // Infrastructure
  {
    name: 'Host Metrics',
    href: '/docs/dashboards/dashboard-templates/host-metrics',
    icon: <Monitor className="h-7 w-7 text-blue-500" />,
    clickName: 'Host Metrics Dashboard Template',
  },
  {
    name: 'System Overview',
    href: '/docs/dashboards/dashboard-templates/system-overview',
    icon: <Activity className="h-7 w-7 text-green-500" />,
    clickName: 'System Overview Dashboard Template',
  },
  {
    name: 'Network Monitoring',
    href: '/docs/dashboards/dashboard-templates/network-monitoring',
    icon: <Server className="h-7 w-7 text-purple-500" />,
    clickName: 'Network Monitoring Dashboard Template',
  },
  
  // Kubernetes
  {
    name: 'Kubernetes Cluster Overview',
    href: '/docs/dashboards/dashboard-templates/kubernetes-cluster-overview',
    icon: <SiKubernetes className="h-7 w-7 text-blue-600" />,
    clickName: 'Kubernetes Cluster Overview Dashboard Template',
  },
  {
    name: 'Kubernetes Node Metrics - Detailed',
    href: '/docs/dashboards/dashboard-templates/kubernetes-node-metrics-detailed',
    icon: <SiKubernetes className="h-7 w-7 text-blue-500" />,
    clickName: 'Kubernetes Node Metrics Dashboard Template',
  },
  {
    name: 'Kubernetes Pod Metrics',
    href: '/docs/dashboards/dashboard-templates/kubernetes-pod-metrics',
    icon: <SiKubernetes className="h-7 w-7 text-cyan-500" />,
    clickName: 'Kubernetes Pod Metrics Dashboard Template',
  },
  {
    name: 'Container Monitoring',
    href: '/docs/dashboards/dashboard-templates/container-monitoring',
    icon: <SiDocker className="h-7 w-7 text-blue-400" />,
    clickName: 'Container Monitoring Dashboard Template',
  },
  
  // Databases
  {
    name: 'PostgreSQL',
    href: '/docs/dashboards/dashboard-templates/postgresql',
    icon: <SiPostgresql className="h-7 w-7 text-blue-600" />,
    clickName: 'PostgreSQL Dashboard Template',
  },
  {
    name: 'MySQL',
    href: '/docs/dashboards/dashboard-templates/mysql',
    icon: <SiMysql className="h-7 w-7 text-orange-500" />,
    clickName: 'MySQL Dashboard Template',
  },
  {
    name: 'MongoDB',
    href: '/docs/dashboards/dashboard-templates/mongodb',
    icon: <SiMongodb className="h-7 w-7 text-green-600" />,
    clickName: 'MongoDB Dashboard Template',
  },
  {
    name: 'Redis',
    href: '/docs/dashboards/dashboard-templates/redis',
    icon: <SiRedis className="h-7 w-7 text-red-600" />,
    clickName: 'Redis Dashboard Template',
  },
  
  // Web Servers
  {
    name: 'Apache',
    href: '/docs/dashboards/dashboard-templates/apache',
    icon: <SiApache className="h-7 w-7 text-red-600" />,
    clickName: 'Apache Dashboard Template',
  },
  {
    name: 'NGINX',
    href: '/docs/dashboards/dashboard-templates/nginx',
    icon: <SiNginx className="h-7 w-7 text-green-500" />,
    clickName: 'NGINX Dashboard Template',
  },
  
  // Messaging
  {
    name: 'RabbitMQ',
    href: '/docs/dashboards/dashboard-templates/rabbitmq',
    icon: <SiRabbitmq className="h-7 w-7 text-orange-600" />,
    clickName: 'RabbitMQ Dashboard Template',
  },
  {
    name: 'Apache Kafka',
    href: '/docs/dashboards/dashboard-templates/kafka',
    icon: <SiApachekafka className="h-7 w-7 text-gray-800" />,
    clickName: 'Apache Kafka Dashboard Template',
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