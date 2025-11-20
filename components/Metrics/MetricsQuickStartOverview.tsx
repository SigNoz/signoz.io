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
} from 'react-icons/si'
import { FaJava, FaWindows } from 'react-icons/fa'
import IconCardGrid from '../Card/IconCardGrid'

interface MetricsQuickStartOverviewProps {
  category?: 'all' | 'infrastructure' | 'databases' | 'web-servers' | 'messaging' | 'runtimes'
}

export default function MetricsQuickStartOverview({
  category = 'all',
}: MetricsQuickStartOverviewProps) {
  const sections = [
    { id: 'all', label: 'All' },
    { id: 'infrastructure', label: 'Infrastructure' },
    { id: 'databases', label: 'Databases' },
    { id: 'web-servers', label: 'Web Servers' },
    { id: 'messaging', label: 'Messaging' },
    { id: 'runtimes', label: 'Runtimes' },
  ]

  const [activeSection, setActiveSection] = useState(category === 'all' ? 'all' : category)

  const NavigationPills = () => (
    <div className="mb-8 flex flex-wrap gap-2">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => setActiveSection(section.id as any)}
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
            name: 'Docker',
            href: '/docs/metrics-management/docker-container-metrics',
            icon: <SiDocker className="h-7 w-7 text-blue-500" />,
            clickName: 'Docker Metrics Link',
          },
          {
            name: 'Kubernetes',
            href: '/docs/opentelemetry-collection-agents/k8s/k8s-infra/overview',
            icon: <SiKubernetes className="h-7 w-7 text-blue-600" />,
            clickName: 'Kubernetes Metrics Link',
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
            name: 'MongoDB',
            href: '/docs/metrics-management/mongodb-metrics',
            icon: <SiMongodb className="h-7 w-7 text-green-500" />,
            clickName: 'MongoDB Metrics Link',
          },
          {
            name: 'PostgreSQL',
            href: '/docs/integrations/postgresql',
            icon: <SiPostgresql className="h-7 w-7 text-blue-400" />,
            clickName: 'PostgreSQL Metrics Link',
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
            href: '/docs/integrations/nginx',
            icon: <SiNginx className="h-7 w-7 text-green-600" />,
            clickName: 'NGINX Metrics Link',
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
          }
        ]}
        sectionName="Runtime Metrics"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  return (
    <div>
      <NavigationPills />
      {(activeSection === 'all' || activeSection === 'infrastructure') && renderInfrastructureSection()}
      {(activeSection === 'all' || activeSection === 'databases') && renderDatabasesSection()}
      {(activeSection === 'all' || activeSection === 'web-servers') && renderWebServersSection()}
      {(activeSection === 'all' || activeSection === 'messaging') && renderMessagingSection()}
      {(activeSection === 'all' || activeSection === 'runtimes') && renderRuntimesSection()}
    </div>
  )
}
