'use client'

import React, { useState } from 'react'
import { SiDocker, SiKubernetes, SiHelm, SiAmazonecs } from 'react-icons/si'
import { VscVm } from 'react-icons/vsc'
import IconCardGrid from '../Card/IconCardGrid'
import { COLLECTION_AGENTS_ITEMS } from '@/constants/componentItems'

/**
 * Listicle for SigNoz self-hosted installation options,
 * structured per supported docs categories.
 */
interface SelfHostInstallationListicleProps {
  /** Pre-select section: docker | ecs | kubernetes | vm | all */
  platform?: 'all' | 'docker' | 'ecs' | 'kubernetes' | 'vm'
}

export default function SelfHostInstallationListicle({
  platform = 'all',
}: SelfHostInstallationListicleProps) {
  // Navigation sections
  const sections = [
    { id: 'all', label: 'All' },
    { id: 'docker', label: 'Docker' },
    { id: 'ecs', label: 'ECS' },
    { id: 'kubernetes', label: 'Kubernetes' },
    { id: 'vm', label: 'VM' },
  ] as const

  const [activeSection, setActiveSection] = useState<(typeof sections)[number]['id']>(
    sections.map((s) => s.id).includes(platform) ? platform : 'all'
  )

  const NavigationPills = () => (
    <div className="mb-8 flex flex-wrap gap-2">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => setActiveSection(section.id)}
          className={`inline-block rounded-full px-4 py-2 text-sm font-medium transition-colors
            ${
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

  // Icon map keyed by href
  const ICON_MAP: Record<string, React.ReactNode> = {
    '/docs/opentelemetry-collection-agents/docker/install': (
      <SiDocker className="h-7 w-7 text-blue-500" />
    ),
    '/docs/opentelemetry-collection-agents/docker-swarm/install': (
      <SiDocker className="h-7 w-7 text-blue-500" />
    ),
    '/docs/opentelemetry-collection-agents/ecs/ec2/overview': (
      <SiAmazonecs className="h-7 w-7 text-amber-500" />
    ),
    '/docs/opentelemetry-collection-agents/ecs/sidecar/overview': (
      <SiAmazonecs className="h-7 w-7 text-amber-500" />
    ),
    '/docs/opentelemetry-collection-agents/k8s/k8s-infra/overview': (
      <SiKubernetes className="h-7 w-7 text-blue-600" />
    ),
    '/docs/opentelemetry-collection-agents/k8s/otel-operator/overview': (
      <SiHelm className="h-7 w-7 text-indigo-500" />
    ),
    '/docs/opentelemetry-collection-agents/k8s/serverless/overview': (
      <SiKubernetes className="h-7 w-7 text-blue-600" />
    ),
    '/docs/tutorial/opentelemetry-binary-usage-in-virtual-machine/': (
      <VscVm className="h-7 w-7 text-black dark:text-white" />
    ),
  }

  const dockerCards = COLLECTION_AGENTS_ITEMS.docker.map((item) => ({
    ...item,
    icon: ICON_MAP[item.href],
  }))

  const ecsCards = COLLECTION_AGENTS_ITEMS.ecs.map((item) => ({
    ...item,
    icon: ICON_MAP[item.href],
  }))

  const kubernetesCards = COLLECTION_AGENTS_ITEMS.kubernetes.map((item) => ({
    ...item,
    icon: ICON_MAP[item.href],
  }))

  const vmCards = COLLECTION_AGENTS_ITEMS.vm.map((item) => ({
    ...item,
    icon: ICON_MAP[item.href],
  }))

  // Docker: Standalone, Swarm
  const renderDocker = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Collection Agent on Docker</h2>
      <IconCardGrid
        sectionName="Docker"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        cards={dockerCards}
      />
    </div>
  )

  // ECS: EC2 Daemon Service, Serverless Sidecar
  const renderEcs = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Collection Agent on AWS ECS</h2>
      <IconCardGrid
        sectionName="ECS"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        cards={ecsCards}
      />
    </div>
  )

  // Kubernetes: k8s-infra, OpenTelemetry Operator, Serverless (EKS Fargate)
  const renderKubernetes = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Collection Agent on Kubernetes</h2>
      <IconCardGrid
        sectionName="Kubernetes"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        cards={kubernetesCards}
      />
    </div>
  )

  // VM: Linux
  const renderVm = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Collection Agent on VM</h2>
      <IconCardGrid
        sectionName="VM"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        cards={vmCards}
      />
    </div>
  )
  return (
    <div>
      <NavigationPills />
      {(activeSection === 'all' || activeSection === 'docker') && renderDocker()}
      {(activeSection === 'all' || activeSection === 'ecs') && renderEcs()}
      {(activeSection === 'all' || activeSection === 'kubernetes') && renderKubernetes()}
      {(activeSection === 'all' || activeSection === 'vm') && renderVm()}
    </div>
  )
}
