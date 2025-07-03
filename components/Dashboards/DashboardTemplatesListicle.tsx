'use client'

import React, { useState } from 'react'
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

interface DashboardTemplatesListicleProps {
  category?: 'infrastructure' | 'kubernetes' | 'databases' | 'webservers' | 'messaging' | 'all'
}

export default function DashboardTemplatesListicle({
  category = 'all',
}: DashboardTemplatesListicleProps) {
  // Define all sections with their IDs and labels
  const sections = [
    { id: 'all', label: 'All' },
    { id: 'infrastructure', label: 'Infrastructure' },
    { id: 'kubernetes', label: 'Kubernetes' },
    { id: 'databases', label: 'Databases' },
    { id: 'webservers', label: 'Web Servers' },
    { id: 'messaging', label: 'Messaging' },
  ]

  // State to track the active section
  const [activeSection, setActiveSection] = useState(category === 'all' ? 'all' : category)

  // Navigation pills component
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

  // Infrastructure templates
  const renderInfrastructureSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Infrastructure Monitoring</h2>
      <IconCardGrid
        cards={[
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
        ]}
        sectionName="Infrastructure Templates"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  // Kubernetes templates
  const renderKubernetesSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Kubernetes</h2>
      <IconCardGrid
        cards={[
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
        ]}
        sectionName="Kubernetes Templates"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  // Database templates
  const renderDatabasesSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Databases</h2>
      <IconCardGrid
        cards={[
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
        ]}
        sectionName="Database Templates"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  // Web server templates
  const renderWebServersSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Web Servers</h2>
      <IconCardGrid
        cards={[
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
        ]}
        sectionName="Web Server Templates"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  // Messaging templates
  const renderMessagingSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Messaging</h2>
      <IconCardGrid
        cards={[
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
        ]}
        sectionName="Messaging Templates"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  // Render sections based on the active section or category prop
  return (
    <div>
      <NavigationPills />

      {/* Show all sections if activeSection is 'all', otherwise show only the selected section */}
      {(activeSection === 'all' || activeSection === 'infrastructure') && renderInfrastructureSection()}
      {(activeSection === 'all' || activeSection === 'kubernetes') && renderKubernetesSection()}
      {(activeSection === 'all' || activeSection === 'databases') && renderDatabasesSection()}
      {(activeSection === 'all' || activeSection === 'webservers') && renderWebServersSection()}
      {(activeSection === 'all' || activeSection === 'messaging') && renderMessagingSection()}
    </div>
  )
}
