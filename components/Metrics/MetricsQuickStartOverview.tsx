'use client'

import React, { useState, useEffect } from 'react'
import {
  SiDocker,
  SiKubernetes,
  SiNginx,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiApachekafka,
  SiMysql,
  SiPrometheus,
  SiOpentelemetry,
  SiTraefikproxy,
  SiClickhouse,
  SiHashicorp,
  SiDatadog,
  SiGithubactions,
  SiArgo,
  SiTemporal,
  SiAmazon,
  SiGooglecloud,
  SiSnowflake,
  SiFlydotio,
  SiEnvoyproxy,
  SiGo,
  SiRust,
  SiDotnet,
  SiNodedotjs,
  SiPython,
  SiDeno,
  SiHasura,
  SiApachedruid,
} from 'react-icons/si'
import { FaJava, FaServer, FaDatabase, FaCloud } from 'react-icons/fa'
import { VscGraphLine } from 'react-icons/vsc'
import IconCardGrid from '../Card/IconCardGrid'
import { METRICS_QUICK_START_ITEMS } from '@/constants/componentItems'

interface MetricsQuickStartOverviewProps {
  category?:
    | 'all'
    | 'infrastructure'
    | 'databases'
    | 'web-servers'
    | 'messaging'
    | 'runtimes'
    | 'collection'
    | 'cloud-platforms'
    | 'applications'
}

type SectionId = NonNullable<MetricsQuickStartOverviewProps['category']>

// Define sections outside component to avoid recreation on every render
const SECTIONS: { id: SectionId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'collection', label: 'Collection' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'applications', label: 'Applications' },
  { id: 'databases', label: 'Databases' },
  { id: 'web-servers', label: 'Web Servers' },
  { id: 'messaging', label: 'Messaging' },
  { id: 'runtimes', label: 'Runtimes' },
  { id: 'cloud-platforms', label: 'Cloud Platforms' },
]

const ICON_MAP: Record<string, React.ReactNode> = {
  // Infrastructure
  '/docs/userguide/hostmetrics': <FaServer className="h-7 w-7 text-gray-700 dark:text-gray-300" />,
  '/docs/metrics-management/docker-container-metrics': (
    <SiDocker className="h-7 w-7 text-blue-500" />
  ),
  '/docs/userguide/k8s-metrics': <SiKubernetes className="h-7 w-7 text-blue-600" />,
  '/docs/integrations/aws/ecs': <SiAmazon className="h-7 w-7 text-orange-500" />,
  '/docs/opentelemetry-collection-agents/ecs/sidecar/overview/': (
    <SiAmazon className="h-7 w-7 text-orange-500" />
  ),
  '/docs/opentelemetry-collection-agents/ecs/ec2/overview/': (
    <SiAmazon className="h-7 w-7 text-orange-500" />
  ),
  '/docs/aws-monitoring/eks': <SiAmazon className="h-7 w-7 text-orange-500" />,
  '/docs/gcp-monitoring/compute-engine/metrics': (
    <SiGooglecloud className="h-7 w-7 text-blue-500" />
  ),
  '/docs/azure-monitoring/virtual-machines/vm-metrics': (
    <FaServer className="h-7 w-7 text-blue-600" />
  ),
  '/docs/gcp-monitoring/vpc/metrics': <SiGooglecloud className="h-7 w-7 text-blue-500" />,
  '/docs/gcp-monitoring/gke/gke-logging-and-metrics': (
    <SiKubernetes className="h-7 w-7 text-blue-600" />
  ),
  '/docs/tutorial/traefik-observability': <SiTraefikproxy className="h-7 w-7 text-blue-500" />,
  '/docs/integrations/nomad': <SiHashicorp className="h-7 w-7 text-purple-600" />,
  '/docs/metrics-management/fly-metrics': <SiFlydotio className="h-7 w-7 text-purple-500" />,
  '/docs/userguide/envoy-metrics': <SiEnvoyproxy className="h-7 w-7 text-blue-500" />,
  '/docs/metrics-management/nvidia-dcgm-metrics': <FaServer className="h-7 w-7 text-green-500" />,
  '/docs/metrics-management/slurm-metrics': <FaServer className="h-7 w-7 text-blue-600" />,
  '/docs/metrics-management/render-metrics': <FaCloud className="h-7 w-7 text-purple-500" />,
  // Databases
  '/docs/integrations/clickhouse': <SiClickhouse className="h-7 w-7 text-yellow-400" />,
  '/docs/integrations/snowflake': <SiSnowflake className="h-7 w-7 text-blue-500" />,
  '/docs/tutorial/mongodb-metrics': <SiMongodb className="h-7 w-7 text-green-500" />,
  '/docs/integrations/mongodb-atlas': <SiMongodb className="h-7 w-7 text-green-500" />,
  '/docs/integrations/postgresql': <SiPostgresql className="h-7 w-7 text-blue-400" />,
  '/docs/gcp-monitoring/cloud-sql/metrics': <SiGooglecloud className="h-7 w-7 text-blue-500" />,
  '/docs/integrations/redis': <SiRedis className="h-7 w-7 text-red-500" />,
  '/docs/metrics-management/mysql-metrics': <SiMysql className="h-7 w-7 text-blue-500" />,
  '/docs/integrations/opentelemetry-neondb': (
    <img src="/svgs/icons/neon.svg" alt="Neon" className="h-7 w-7 object-contain" />
  ),
  '/docs/integrations/sql-server': <FaDatabase className="h-7 w-7 text-red-600" />,
  '/docs/azure-monitoring/db-metrics': <FaDatabase className="h-7 w-7 text-blue-600" />,
  '/docs/integrations/aws-rds-mysql': <SiAmazon className="h-7 w-7 text-orange-500" />,
  '/docs/integrations/aws-rds-postgres': <SiAmazon className="h-7 w-7 text-orange-500" />,
  '/docs/integrations/aws-elasticache-redis': <SiAmazon className="h-7 w-7 text-orange-500" />,
  // Web Servers
  '/docs/metrics-management/nginx-metrics': <SiNginx className="h-7 w-7 text-green-600" />,
  '/docs/integrations/opentelemetry-kong-gateway': (
    <img src="/img/icons/kong-icon.svg" alt="Kong Gateway" className="h-7 w-7 object-contain" />
  ),
  '/docs/gcp-monitoring/gcp-clb/metrics': <SiGooglecloud className="h-7 w-7 text-blue-500" />,
  // Messaging
  '/docs/messaging-queues/kafka': <SiApachekafka className="h-7 w-7 text-black dark:text-white" />,
  '/docs/messaging-queues/msk': <SiAmazon className="h-7 w-7 text-orange-500" />,
  '/docs/messaging-queues/confluent-kafka': (
    <SiApachekafka className="h-7 w-7 text-black dark:text-white" />
  ),
  '/docs/messaging-queues/strimzi': (
    <SiApachekafka className="h-7 w-7 text-black dark:text-white" />
  ),
  '/docs/messaging-queues/celery-setup': <FaJava className="h-7 w-7 text-green-600" />,
  // Runtimes
  '/docs/metrics-management/send-metrics/applications/opentelemetry-java/#jvm-runtime-metrics': (
    <FaJava className="h-7 w-7 text-red-600" />
  ),
  '/docs/tutorial/jmx-metrics': <FaJava className="h-7 w-7 text-red-600" />,
  // Collection
  '/docs/userguide/otel-metrics-receivers': <SiOpentelemetry className="h-7 w-7 text-purple-500" />,
  '/docs/userguide/prometheus-metrics': <SiPrometheus className="h-7 w-7 text-orange-500" />,
  '/docs/gcp-monitoring/cloud-monitoring/metrics': (
    <SiGooglecloud className="h-7 w-7 text-blue-500" />
  ),
  '/docs/monitor-http-endpoints': <FaServer className="h-7 w-7 text-blue-600" />,
  '/docs/migration/opentelemetry-datadog-receiver': (
    <SiDatadog className="h-7 w-7 text-purple-600" />
  ),
  '/docs/userguide/opentelemetry-statsd': <VscGraphLine className="h-7 w-7 text-blue-500" />,
  // Cloud Platforms
  '/docs/gcp-monitoring/cloud-run/metrics': <SiGooglecloud className="h-7 w-7 text-blue-500" />,
  '/docs/gcp-monitoring/app-engine/metrics': <SiGooglecloud className="h-7 w-7 text-blue-500" />,
  '/docs/gcp-monitoring/gcp-fns/fns-metrics': <SiGooglecloud className="h-7 w-7 text-blue-500" />,
  '/docs/gcp-monitoring/gcs/metrics': <SiGooglecloud className="h-7 w-7 text-blue-500" />,
  '/docs/integrations/temporal-cloud-metrics': <SiTemporal className="h-7 w-7 text-blue-500" />,
  '/docs/integrations/supabase': <SiPostgresql className="h-7 w-7 text-green-500" />,
  '/docs/cicd/argocd/argocd-metrics': <SiArgo className="h-7 w-7 text-orange-600" />,
  '/docs/cicd/github/github-metrics': (
    <SiGithubactions className="h-7 w-7 text-black dark:text-white" />
  ),
  '/docs/azure-monitoring/app-service/metrics': <FaCloud className="h-7 w-7 text-blue-600" />,
  '/docs/azure-monitoring/az-fns/metrics': <FaCloud className="h-7 w-7 text-blue-600" />,
  '/docs/azure-monitoring/az-container-apps/metrics': <FaCloud className="h-7 w-7 text-blue-600" />,
  '/docs/azure-monitoring/az-blob-storage/metrics': <FaCloud className="h-7 w-7 text-blue-600" />,
  // Applications
  '/docs/metrics-management/send-metrics/applications/golang': (
    <SiGo className="h-7 w-7 text-cyan-500" />
  ),
  '/docs/metrics-management/send-metrics/applications/opentelemetry-rust': (
    <SiRust className="h-7 w-7 text-orange-600" />
  ),
  '/docs/metrics-management/send-metrics/applications/opentelemetry-java': (
    <FaJava className="h-7 w-7 text-red-600" />
  ),
  '/docs/metrics-management/send-metrics/applications/opentelemetry-dotnet': (
    <SiDotnet className="h-7 w-7 text-blue-600" />
  ),
  '/docs/metrics-management/send-metrics/applications/opentelemetry-nodejs': (
    <SiNodedotjs className="h-7 w-7 text-green-500" />
  ),
  '/docs/metrics-management/send-metrics/applications/opentelemetry-python': (
    <SiPython className="h-7 w-7 text-blue-500" />
  ),
  '/docs/instrumentation/opentelemetry-deno': <SiDeno className="h-7 w-7 text-blue-500" />,
  '/docs/integrations/opentelemetry-hasura': <SiHasura className="h-7 w-7 text-blue-600" />,
  '/docs/integrations/opentelemetry-apache-druid': (
    <SiApachedruid className="h-7 w-7 text-[#29F5E6]" />
  ),
}

export default function MetricsQuickStartOverview({
  category = 'all',
}: MetricsQuickStartOverviewProps) {
  const [activeSection, setActiveSection] = useState<SectionId>(
    category === 'all' ? 'all' : category
  )

  // Check for hash in URL on mount and when hash changes
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.replace('#', '') as SectionId
      if (hash && SECTIONS.some((s) => s.id === hash)) {
        setActiveSection(hash)
      }
    }

    // Check on mount
    checkHash()

    // Listen for hash changes
    window.addEventListener('hashchange', checkHash)

    return () => {
      window.removeEventListener('hashchange', checkHash)
    }
  }, [])

  const NavigationPills = () => (
    <div className="mb-8 flex flex-wrap gap-2">
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          onClick={() => setActiveSection(section.id)}
          className={`inline-block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeSection === section.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {section.label}
        </button>
      ))}
    </div>
  )

  const mapIcons = (items: readonly { name: string; href: string; clickName: string }[]) =>
    items.map((item) => ({
      ...item,
      icon: ICON_MAP[item.href],
    }))

  const renderInfrastructureSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Infrastructure</h2>
      <IconCardGrid
        cards={mapIcons(METRICS_QUICK_START_ITEMS.infrastructure)}
        sectionName="Infrastructure Metrics"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  const renderDatabasesSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Databases</h2>
      <IconCardGrid
        cards={mapIcons(METRICS_QUICK_START_ITEMS.databases)}
        sectionName="Database Metrics"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  const renderWebServersSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Web Servers</h2>
      <IconCardGrid
        cards={mapIcons(METRICS_QUICK_START_ITEMS.webServers)}
        sectionName="Web Server Metrics"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  const renderMessagingSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Messaging</h2>
      <IconCardGrid
        cards={mapIcons(METRICS_QUICK_START_ITEMS.messaging)}
        sectionName="Messaging Metrics"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  const renderRuntimesSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Runtimes</h2>
      <IconCardGrid
        cards={mapIcons(METRICS_QUICK_START_ITEMS.runtimes)}
        sectionName="Runtime Metrics"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  const renderCollectionSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Collection</h2>
      <IconCardGrid
        cards={mapIcons(METRICS_QUICK_START_ITEMS.collection)}
        sectionName="Collection Metrics"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  const renderCloudPlatformsSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Cloud Platforms</h2>
      <IconCardGrid
        cards={mapIcons(METRICS_QUICK_START_ITEMS.cloudPlatforms)}
        sectionName="Cloud Platform Metrics"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  const renderApplicationSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Applications</h2>
      <IconCardGrid
        cards={mapIcons(METRICS_QUICK_START_ITEMS.applications)}
        sectionName="Application Metrics"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  return (
    <div>
      <NavigationPills />
      {(activeSection === 'all' || activeSection === 'collection') && renderCollectionSection()}
      {(activeSection === 'all' || activeSection === 'infrastructure') &&
        renderInfrastructureSection()}
      {(activeSection === 'all' || activeSection === 'applications') && renderApplicationSection()}
      {(activeSection === 'all' || activeSection === 'databases') && renderDatabasesSection()}
      {(activeSection === 'all' || activeSection === 'web-servers') && renderWebServersSection()}
      {(activeSection === 'all' || activeSection === 'messaging') && renderMessagingSection()}
      {(activeSection === 'all' || activeSection === 'runtimes') && renderRuntimesSection()}
      {(activeSection === 'all' || activeSection === 'cloud-platforms') &&
        renderCloudPlatformsSection()}
    </div>
  )
}
