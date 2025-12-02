'use client'

import React, { useState } from 'react'
import {
  SiDocker,
  SiKubernetes,
  SiAmazonwebservices,
  SiGooglecloud,
  SiDigitalocean,
  SiHelm,
  SiArgo,
  SiAmazonecs,
  SiRedhatopenshift,
} from 'react-icons/si'
import { VscVm } from 'react-icons/vsc'
import IconCardGrid from '../Card/IconCardGrid'

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
                ? 'bg-signoz_orange-500 dark:bg-signoz_orange-400 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
        >
          {section.label}
        </button>
      ))}
    </div>
  )

  // Icons
  const dockerIcon = <SiDocker className="h-7 w-7 text-blue-500" />
  const vmIcon = <VscVm className="h-7 w-7 text-black dark:text-white" />
  const k8sIcon = <SiKubernetes className="h-7 w-7 text-blue-600" />
  const awsIcon = <SiAmazonwebservices className="h-7 w-7 text-amber-500" />
  const gcpIcon = <SiGooglecloud className="h-7 w-7 text-blue-400" />
  const doIcon = <SiDigitalocean className="h-7 w-7 text-sky-400" />
  const helmIcon = <SiHelm className="h-7 w-7 text-indigo-500" />
  const argocdIcon = <SiArgo className="h-7 w-7 text-gray-500" />
  const awsEcsIcon = <SiAmazonecs className="h-7 w-7 text-amber-500" />
  const redhatOpenshiftIcon = <SiRedhatopenshift className="h-7 w-7 text-red-800" />

  // Docker: Standalone, Swarm
  const renderDocker = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Collection Agent on Docker</h2>
      <IconCardGrid
        sectionName="Docker"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        cards={[
          {
            name: 'Docker',
            href: '/docs/opentelemetry-collection-agents/docker/install',
            icon: dockerIcon,
            clickName: 'Collection Agent on Docker',
          },
          {
            name: 'Docker Swarm',
            href: '/docs/opentelemetry-collection-agents/docker-swarm/install',
            icon: dockerIcon,
            clickName: 'Collection Agent on Docker Swarm',
          },
        ]}
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
        cards={[
          {
            name: 'ECS EC2 (Daemon Service)',
            href: '/docs/opentelemetry-collection-agents/ecs/ec2/overview',
            icon: awsEcsIcon,
            clickName: 'ECS EC2 Daemon Service',
          },
          {
            name: 'ECS Serverless (Sidecar)',
            href: '/docs/opentelemetry-collection-agents/ecs/sidecar/overview',
            icon: awsEcsIcon,
            clickName: 'ECS Serverless Sidecar',
          },
        ]}
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
        cards={[
          {
            name: 'K8s-Infra (Helm Chart)',
            href: '/docs/opentelemetry-collection-agents/k8s/k8s-infra/overview',
            icon: k8sIcon,
            clickName: 'K8s Infra Overview',
          },
          {
            name: 'OpenTelemetry Operator',
            href: '/docs/opentelemetry-collection-agents/k8s/otel-operator/overview',
            icon: helmIcon,
            clickName: 'OTel Operator Overview',
          },
          {
            name: 'K8s Serverless (EKS Fargate)',
            href: '/docs/opentelemetry-collection-agents/k8s/serverless/overview',
            icon: k8sIcon,
            clickName: 'K8s Serverless Overview',
          },
        ]}
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
        cards={[
          {
            name: 'OpenTelemetry Binary',
            href: '/docs/tutorial/opentelemetry-binary-usage-in-virtual-machine/',
            icon: vmIcon,
            clickName: 'OpenTelemetry Binary',
          },
        ]}
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
