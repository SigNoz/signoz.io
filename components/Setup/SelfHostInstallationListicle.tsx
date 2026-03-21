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
  SiLinux,
  SiAmazonecs,
  SiRedhatopenshift,
  SiRender,
} from 'react-icons/si'
import IconCardGrid from '../Card/IconCardGrid'

/**
 * Listicle for SigNoz self-hosted installation options,
 * structured per supported docs categories.
 */
interface SelfHostInstallationListicleProps {
  /** Pre-select section: docker | binary | kubernetes | all */
  platform?: 'all' | 'docker' | 'binary' | 'kubernetes' | 'others'
}

export default function SelfHostInstallationListicle({
  platform = 'all',
}: SelfHostInstallationListicleProps) {
  // Navigation sections
  const sections = [
    { id: 'all', label: 'All' },
    { id: 'docker', label: 'Docker' },
    { id: 'binary', label: 'Binary' },
    { id: 'kubernetes', label: 'Kubernetes' },
    { id: 'others', label: 'Others' },
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

  // Icons
  const dockerIcon = <SiDocker className="h-7 w-7 text-blue-500" />
  const linuxIcon = <SiLinux className="h-7 w-7 text-black dark:text-white" />
  const k8sIcon = <SiKubernetes className="h-7 w-7 text-blue-600" />
  const awsIcon = <SiAmazonwebservices className="h-7 w-7 text-amber-500" />
  const gcpIcon = <SiGooglecloud className="h-7 w-7 text-blue-400" />
  const doIcon = <SiDigitalocean className="h-7 w-7 text-sky-400" />
  const helmIcon = <SiHelm className="h-7 w-7 text-indigo-500" />
  const argocdIcon = <SiArgo className="h-7 w-7 text-gray-500" />
  const awsEcsIcon = <SiAmazonecs className="h-7 w-7 text-amber-500" />
  const redhatOpenshiftIcon = <SiRedhatopenshift className="h-7 w-7 text-red-800" />
  const railwayIcon = (
    <img src="/img/icons/railway-icon.webp" alt="Railway" className="h-7 w-7 object-contain" />
  )
  const vultrIcon = (
    <img src="/img/icons/vultr.svg" alt="Vultr" className="h-7 w-7 object-contain" />
  )
  const coolifyIcon = (
    <img src="/img/icons/coolify-logo.png" alt="Coolify" className="h-7 w-7 object-contain" />
  )

  // Docker: Standalone, Swarm, SELinux
  const renderDocker = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Install on Docker</h2>
      <IconCardGrid
        sectionName="Docker"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        cards={[
          {
            name: 'Standalone',
            href: '/docs/install/docker',
            icon: dockerIcon,
            clickName: 'Install Docker Standalone',
          },
          {
            name: 'Swarm',
            href: '/docs/install/docker-swarm',
            icon: dockerIcon,
            clickName: 'Install Docker Swarm',
          },
          {
            name: 'SELinux',
            href: '/docs/install/docker-selinux',
            icon: dockerIcon,
            clickName: 'Install Docker SELinux',
          },
        ]}
      />
    </div>
  )

  // Binary: Linux
  const renderBinary = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Install Binary</h2>
      <IconCardGrid
        sectionName="Binary"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        cards={[
          {
            name: 'Linux',
            href: '/docs/install/linux',
            icon: linuxIcon,
            clickName: 'Install Binary Linux',
          },
        ]}
      />
    </div>
  )

  // Kubernetes: AWS, GCP, AKS, DigitalOcean, Other Platform, Local, ArgoCD
  const renderKubernetes = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Install on Kubernetes</h2>
      <IconCardGrid
        sectionName="Kubernetes"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        cards={[
          {
            name: 'AWS',
            href: '/docs/install/kubernetes/aws',
            icon: awsIcon,
            clickName: 'Deploy to AWS',
          },
          {
            name: 'GCP',
            href: '/docs/install/kubernetes/gcp',
            icon: gcpIcon,
            clickName: 'Deploy to GCP',
          },
          {
            name: 'AKS',
            href: '/docs/install/kubernetes/aks',
            icon: <img src="/img/icons/azure-icon.svg" width={20} height={20} alt="Azure" />,
            clickName: 'Deploy to AKS',
          },
          {
            name: 'DigitalOcean',
            href: '/docs/install/digital-ocean',
            icon: doIcon,
            clickName: 'Deploy to DigitalOcean',
          },
          {
            name: 'Other Platform',
            href: '/docs/install/kubernetes/others',
            icon: helmIcon,
            clickName: 'Deploy to Other Platform',
          },
          {
            name: 'Local',
            href: '/docs/install/kubernetes/local',
            icon: k8sIcon,
            clickName: 'Deploy Locally',
          },
          {
            name: 'ArgoCD',
            href: '/docs/install/argocd',
            icon: argocdIcon,
            clickName: 'Deploy with ArgoCD',
          },
          {
            name: 'Openshift',
            href: '/docs/install/kubernetes/openshift',
            icon: redhatOpenshiftIcon,
            clickName: 'Deploy to Openshift',
          },
        ]}
      />
    </div>
  )

  const renderOthers = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Install on Others</h2>
      <IconCardGrid
        sectionName="Others"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        cards={[
          { name: 'ECS', href: '/docs/install/ecs/', icon: awsEcsIcon, clickName: 'Deploy to ECS' },
          {
            name: 'Azure Container Apps',
            href: '/docs/install/azure-container-apps',
            icon: <img src="/img/icons/azure-icon.svg" width={20} height={20} alt="Azure" />,
            clickName: 'Deploy to Azure Container Apps',
          },
          {
            name: 'Render',
            href: '/docs/setup/render',
            icon: <SiRender className="h-7 w-7 text-black dark:text-white" />,
            clickName: 'Deploy to Render',
          },
          {
            name: 'Railway',
            href: 'https://railway.com/deploy/signoz',
            icon: railwayIcon,
            clickName: 'Deploy to Railway',
          },
          {
            name: 'DigitalOcean (Marketplace)',
            href: 'https://marketplace.digitalocean.com/apps/signoz',
            icon: doIcon,
            clickName: 'Deploy to DigitalOcean Marketplace',
          },
          {
            name: 'Vultr',
            href: 'https://www.vultr.com/marketplace/apps/signoz/',
            icon: vultrIcon,
            clickName: 'Deploy to Vultr',
          },
          {
            name: 'Coolify',
            href: 'https://github.com/coollabsio/coolify/blob/v4.x/templates/compose/signoz.yaml',
            icon: coolifyIcon,
            clickName: 'Deploy to Coolify',
          },
        ]}
      />
    </div>
  )
  return (
    <div>
      <NavigationPills />
      {(activeSection === 'all' || activeSection === 'docker') && renderDocker()}
      {(activeSection === 'all' || activeSection === 'binary') && renderBinary()}
      {(activeSection === 'all' || activeSection === 'kubernetes') && renderKubernetes()}
      {(activeSection === 'all' || activeSection === 'others') && renderOthers()}
    </div>
  )
}
