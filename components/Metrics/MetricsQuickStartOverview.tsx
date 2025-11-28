'use client'

import React, { useState } from 'react'
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
  SiEnvoyproxy,
} from 'react-icons/si'
import { FaJava, FaServer, FaDatabase, FaCloud } from 'react-icons/fa'
import IconCardGrid from '../Card/IconCardGrid'

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
}

type SectionId = NonNullable<MetricsQuickStartOverviewProps['category']>

export default function MetricsQuickStartOverview({
  category = 'all',
}: MetricsQuickStartOverviewProps) {
  const sections: { id: SectionId; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'collection', label: 'Collection' },
    { id: 'infrastructure', label: 'Infrastructure' },
    { id: 'databases', label: 'Databases' },
    { id: 'web-servers', label: 'Web Servers' },
    { id: 'messaging', label: 'Messaging' },
    { id: 'runtimes', label: 'Runtimes' },
    { id: 'cloud-platforms', label: 'Cloud Platforms' },
  ]

  const [activeSection, setActiveSection] = useState<SectionId>(
    category === 'all' ? 'all' : category
  )

  const NavigationPills = () => (
    <div className="mb-8 flex flex-wrap gap-2">
      {sections.map((section) => (
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

  const renderInfrastructureSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Infrastructure</h2>
      <IconCardGrid
        cards={[
          {
            name: 'Host Metrics',
            href: '/docs/userguide/hostmetrics',
            icon: <FaServer className="h-7 w-7 text-gray-700 dark:text-gray-300" />,
            clickName: 'Host Metrics Link',
          },
          {
            name: 'Docker',
            href: '/docs/metrics-management/docker-container-metrics',
            icon: <SiDocker className="h-7 w-7 text-blue-500" />,
            clickName: 'Docker Metrics Link',
          },
          {
            name: 'Kubernetes',
            href: '/docs/userguide/k8s-metrics',
            icon: <SiKubernetes className="h-7 w-7 text-blue-600" />,
            clickName: 'Kubernetes Metrics Link',
          },
          {
            name: 'AWS ECS',
            href: '/docs/integrations/aws/ecs',
            icon: <SiAmazon className="h-7 w-7 text-orange-500" />,
            clickName: 'AWS ECS Metrics Link',
          },
          {
            name: 'AWS ECS Fargate',
            href: '/docs/opentelemetry-collection-agents/ecs/sidecar/overview/',
            icon: <SiAmazon className="h-7 w-7 text-orange-500" />,
            clickName: 'AWS ECS Fargate Metrics Link',
          },
          {
            name: 'AWS EC2',
            href: '/docs/opentelemetry-collection-agents/ecs/ec2/overview/',
            icon: <SiAmazon className="h-7 w-7 text-orange-500" />,
            clickName: 'AWS EC2 Metrics Link',
          },
          {
            name: 'AWS EKS',
            href: '/docs/aws-monitoring/eks',
            icon: <SiAmazon className="h-7 w-7 text-orange-500" />,
            clickName: 'AWS EKS Metrics Link',
          },
          {
            name: 'GCP Compute Engine',
            href: '/docs/gcp-monitoring/compute-engine/metrics',
            icon: <SiGooglecloud className="h-7 w-7 text-blue-500" />,
            clickName: 'GCP Compute Engine Metrics Link',
          },
          {
            name: 'Azure VM',
            href: '/docs/azure-monitoring/virtual-machines/vm-metrics',
            icon: <FaServer className="h-7 w-7 text-blue-600" />,
            clickName: 'Azure VM Metrics Link',
          },
          {
            name: 'GCP VPC',
            href: '/docs/gcp-monitoring/vpc/metrics',
            icon: <SiGooglecloud className="h-7 w-7 text-blue-500" />,
            clickName: 'GCP VPC Metrics Link',
          },
          {
            name: 'GKE (GCP)',
            href: '/docs/gcp-monitoring/gke/gke-logging-and-metrics',
            icon: <SiKubernetes className="h-7 w-7 text-blue-600" />,
            clickName: 'GKE Metrics Link',
          },
          {
            name: 'Traefik',
            href: '/docs/tutorial/traefik-observability',
            icon: <SiTraefikproxy className="h-7 w-7 text-blue-500" />,
            clickName: 'Traefik Metrics Link',
          },
          {
            name: 'Nomad',
            href: '/docs/integrations/nomad',
            icon: <SiHashicorp className="h-7 w-7 text-purple-600" />,
            clickName: 'Nomad Metrics Link',
          },
          {
            name: 'Envoy',
            href: '/docs/userguide/envoy-metrics',
            icon: <SiEnvoyproxy className="h-7 w-7 text-blue-500" />,
            clickName: 'Envoy Metrics Link',
          },
        ]}
        sectionName="Infrastructure Metrics"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  const renderDatabasesSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Databases</h2>
      <IconCardGrid
        cards={[
          {
            name: 'ClickHouse',
            href: '/docs/integrations/clickhouse',
            icon: <SiClickhouse className="h-7 w-7 text-yellow-400" />,
            clickName: 'ClickHouse Metrics Link',
          },
          {
            name: 'Snowflake',
            href: '/docs/integrations/snowflake',
            icon: <SiSnowflake className="h-7 w-7 text-blue-500" />,
            clickName: 'Snowflake Metrics Link',
          },
          {
            name: 'MongoDB',
            href: '/docs/tutorial/mongodb-metrics',
            icon: <SiMongodb className="h-7 w-7 text-green-500" />,
            clickName: 'MongoDB Metrics Link',
          },
          {
            name: 'MongoDB Atlas',
            href: '/docs/integrations/mongodb-atlas',
            icon: <SiMongodb className="h-7 w-7 text-green-500" />,
            clickName: 'MongoDB Atlas Metrics Link',
          },
          {
            name: 'PostgreSQL',
            href: '/docs/integrations/postgresql',
            icon: <SiPostgresql className="h-7 w-7 text-blue-400" />,
            clickName: 'PostgreSQL Metrics Link',
          },
          {
            name: 'GCP Cloud SQL',
            href: '/docs/gcp-monitoring/cloud-sql/metrics',
            icon: <SiGooglecloud className="h-7 w-7 text-blue-500" />,
            clickName: 'GCP Cloud SQL Metrics Link',
          },
          {
            name: 'Redis',
            href: '/docs/integrations/redis',
            icon: <SiRedis className="h-7 w-7 text-red-500" />,
            clickName: 'Redis Metrics Link',
          },
          {
            name: 'MySQL',
            href: '/docs/metrics-management/mysql-metrics',
            icon: <SiMysql className="h-7 w-7 text-blue-500" />,
            clickName: 'MySQL Metrics Link',
          },
          {
            name: 'SQL Server',
            href: '/docs/integrations/sql-server',
            icon: <FaDatabase className="h-7 w-7 text-red-600" />,
            clickName: 'SQL Server Metrics Link',
          },
          {
            name: 'Azure SQL Database',
            href: '/docs/azure-monitoring/db-metrics',
            icon: <FaDatabase className="h-7 w-7 text-blue-600" />,
            clickName: 'Azure SQL Database Metrics Link',
          },
          {
            name: 'AWS RDS MySQL',
            href: '/docs/integrations/aws-rds-mysql',
            icon: <SiAmazon className="h-7 w-7 text-orange-500" />,
            clickName: 'AWS RDS MySQL Link',
          },
          {
            name: 'AWS RDS PostgreSQL',
            href: '/docs/integrations/aws-rds-postgres',
            icon: <SiAmazon className="h-7 w-7 text-orange-500" />,
            clickName: 'AWS RDS PostgreSQL Link',
          },
          {
            name: 'AWS ElastiCache',
            href: '/docs/integrations/aws-elasticache-redis',
            icon: <SiAmazon className="h-7 w-7 text-orange-500" />,
            clickName: 'AWS ElastiCache Link',
          },
        ]}
        sectionName="Database Metrics"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  const renderWebServersSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Web Servers</h2>
      <IconCardGrid
        cards={[
          {
            name: 'NGINX',
            href: '/docs/metrics-management/nginx-metrics',
            icon: <SiNginx className="h-7 w-7 text-green-600" />,
            clickName: 'NGINX Metrics Link',
          },
          {
            name: 'GCP Cloud Load Balancer',
            href: '/docs/gcp-monitoring/gcp-clb/metrics',
            icon: <SiGooglecloud className="h-7 w-7 text-blue-500" />,
            clickName: 'GCP Cloud Load Balancer Metrics Link',
          },
        ]}
        sectionName="Web Server Metrics"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  const renderMessagingSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Messaging</h2>
      <IconCardGrid
        cards={[
          {
            name: 'Kafka',
            href: '/docs/messaging-queues/kafka',
            icon: <SiApachekafka className="h-7 w-7 text-black dark:text-white" />,
            clickName: 'Kafka Metrics Link',
          },
          {
            name: 'MSK',
            href: '/docs/messaging-queues/msk',
            icon: <SiAmazon className="h-7 w-7 text-orange-500" />,
            clickName: 'MSK Metrics Link',
          },
          {
            name: 'Confluent Kafka',
            href: '/docs/messaging-queues/confluent-kafka',
            icon: <SiApachekafka className="h-7 w-7 text-black dark:text-white" />,
            clickName: 'Confluent Kafka Metrics Link',
          },
          {
            name: 'Strimzi',
            href: '/docs/messaging-queues/strimzi',
            icon: <SiApachekafka className="h-7 w-7 text-black dark:text-white" />,
            clickName: 'Strimzi Metrics Link',
          },
          {
            name: 'Celery',
            href: '/docs/messaging-queues/celery-setup',
            icon: <FaJava className="h-7 w-7 text-green-600" />,
            clickName: 'Celery Metrics Link',
          },
        ]}
        sectionName="Messaging Metrics"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  const renderRuntimesSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Runtimes</h2>
      <IconCardGrid
        cards={[
          {
            name: 'JVM',
            href: '/docs/tutorial/jvm-metrics',
            icon: <FaJava className="h-7 w-7 text-red-600" />,
            clickName: 'JVM Metrics Link',
          },
          {
            name: 'JMX',
            href: '/docs/tutorial/jmx-metrics',
            icon: <FaJava className="h-7 w-7 text-red-600" />,
            clickName: 'JMX Metrics Link',
          },
        ]}
        sectionName="Runtime Metrics"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  const renderCollectionSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Collection</h2>
      <IconCardGrid
        cards={[
          {
            name: 'OTel Receivers',
            href: '/docs/userguide/otel-metrics-receivers',
            icon: <SiOpentelemetry className="h-7 w-7 text-purple-500" />,
            clickName: 'OTel Receivers Link',
          },
          {
            name: 'Prometheus',
            href: '/docs/userguide/prometheus-metrics',
            icon: <SiPrometheus className="h-7 w-7 text-orange-500" />,
            clickName: 'Prometheus Metrics Link',
          },
          {
            name: 'GCP Cloud Monitoring',
            href: '/docs/gcp-monitoring/cloud-monitoring/metrics',
            icon: <SiGooglecloud className="h-7 w-7 text-blue-500" />,
            clickName: 'GCP Cloud Monitoring Metrics Link',
          },
          {
            name: 'HTTP Endpoints',
            href: '/docs/monitor-http-endpoints',
            icon: <FaServer className="h-7 w-7 text-blue-600" />,
            clickName: 'HTTP Endpoints Link',
          },
          {
            name: 'Datadog Receiver',
            href: '/docs/migration/opentelemetry-datadog-receiver',
            icon: <SiDatadog className="h-7 w-7 text-purple-600" />,
            clickName: 'Datadog Receiver Link',
          },
        ]}
        sectionName="Collection Metrics"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  const renderCloudPlatformsSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Cloud Platforms</h2>
      <IconCardGrid
        cards={[
          {
            name: 'GCP Cloud Run',
            href: '/docs/gcp-monitoring/cloud-run/metrics',
            icon: <SiGooglecloud className="h-7 w-7 text-blue-500" />,
            clickName: 'GCP Cloud Run Metrics Link',
          },
          {
            name: 'GCP App Engine',
            href: '/docs/gcp-monitoring/app-engine/metrics',
            icon: <SiGooglecloud className="h-7 w-7 text-blue-500" />,
            clickName: 'GCP App Engine Metrics Link',
          },
          {
            name: 'GCP Cloud Functions',
            href: '/docs/gcp-monitoring/gcp-fns/fns-metrics',
            icon: <SiGooglecloud className="h-7 w-7 text-blue-500" />,
            clickName: 'GCP Cloud Functions Metrics Link',
          },
          {
            name: 'GCP Cloud Storage',
            href: '/docs/gcp-monitoring/gcs/metrics',
            icon: <SiGooglecloud className="h-7 w-7 text-blue-500" />,
            clickName: 'GCP Cloud Storage Metrics Link',
          },
          {
            name: 'Temporal Cloud',
            href: '/docs/integrations/temporal-cloud-metrics',
            icon: <SiTemporal className="h-7 w-7 text-blue-500" />,
            clickName: 'Temporal Cloud Link',
          },
          {
            name: 'Supabase',
            href: '/docs/integrations/supabase',
            icon: <SiPostgresql className="h-7 w-7 text-green-500" />,
            clickName: 'Supabase Metrics Link',
          },
          {
            name: 'ArgoCD',
            href: '/docs/cicd/argocd/argocd-metrics',
            icon: <SiArgo className="h-7 w-7 text-orange-600" />,
            clickName: 'ArgoCD Metrics Link',
          },
          {
            name: 'GitHub Actions',
            href: '/docs/cicd/github/github-metrics',
            icon: <SiGithubactions className="h-7 w-7 text-black dark:text-white" />,
            clickName: 'GitHub Actions Link',
          },
          {
            name: 'Azure App Service',
            href: '/docs/azure-monitoring/app-service/metrics',
            icon: <FaCloud className="h-7 w-7 text-blue-600" />,
            clickName: 'Azure App Service Metrics Link',
          },
          {
            name: 'Azure Functions',
            href: '/docs/azure-monitoring/az-fns/metrics',
            icon: <FaCloud className="h-7 w-7 text-blue-600" />,
            clickName: 'Azure Functions Metrics Link',
          },
          {
            name: 'Azure Container Apps',
            href: '/docs/azure-monitoring/az-container-apps/metrics',
            icon: <FaCloud className="h-7 w-7 text-blue-600" />,
            clickName: 'Azure Container Apps Metrics Link',
          },
          {
            name: 'Azure Blob Storage',
            href: '/docs/azure-monitoring/az-blob-storage/metrics',
            icon: <FaCloud className="h-7 w-7 text-blue-600" />,
            clickName: 'Azure Blob Storage Metrics Link',
          },
        ]}
        sectionName="Cloud Platform Metrics"
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
      {(activeSection === 'all' || activeSection === 'databases') && renderDatabasesSection()}
      {(activeSection === 'all' || activeSection === 'web-servers') && renderWebServersSection()}
      {(activeSection === 'all' || activeSection === 'messaging') && renderMessagingSection()}
      {(activeSection === 'all' || activeSection === 'runtimes') && renderRuntimesSection()}
      {(activeSection === 'all' || activeSection === 'cloud-platforms') &&
        renderCloudPlatformsSection()}
    </div>
  )
}
