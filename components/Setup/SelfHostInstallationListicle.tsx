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
import { SELF_HOST_INSTALLATION_ITEMS } from '@/constants/componentItems'

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

  // Icon map keyed by href
  const ICON_MAP: Record<string, React.ReactNode> = {
    '/docs/install/docker': <SiDocker className="h-7 w-7 text-blue-500" />,
    '/docs/install/docker-swarm': <SiDocker className="h-7 w-7 text-blue-500" />,
    '/docs/install/docker-selinux': <SiDocker className="h-7 w-7 text-blue-500" />,
    '/docs/install/linux': <SiLinux className="h-7 w-7 text-black dark:text-white" />,
    '/docs/install/kubernetes/aws': <SiAmazonwebservices className="h-7 w-7 text-amber-500" />,
    '/docs/install/kubernetes/gcp': <SiGooglecloud className="h-7 w-7 text-blue-400" />,
    '/docs/install/kubernetes/aks': (
      <img src="/img/icons/azure-icon.svg" width={20} height={20} alt="Azure" />
    ),
    '/docs/install/digital-ocean': <SiDigitalocean className="h-7 w-7 text-sky-400" />,
    '/docs/install/kubernetes/others': <SiHelm className="h-7 w-7 text-indigo-500" />,
    '/docs/install/kubernetes/local': <SiKubernetes className="h-7 w-7 text-blue-600" />,
    '/docs/install/argocd': <SiArgo className="h-7 w-7 text-gray-500" />,
    '/docs/install/kubernetes/openshift': <SiRedhatopenshift className="h-7 w-7 text-red-800" />,
    '/docs/install/ecs/': <SiAmazonecs className="h-7 w-7 text-amber-500" />,
    '/docs/install/azure-container-apps': (
      <img src="/img/icons/azure-icon.svg" width={20} height={20} alt="Azure" />
    ),
    '/docs/setup/render': <SiRender className="h-7 w-7 text-black dark:text-white" />,
    'https://railway.com/deploy/signoz': (
      <img src="/img/icons/railway-icon.webp" alt="Railway" className="h-7 w-7 object-contain" />
    ),
    'https://marketplace.digitalocean.com/apps/signoz': (
      <SiDigitalocean className="h-7 w-7 text-sky-400" />
    ),
    'https://www.vultr.com/marketplace/apps/signoz/': (
      <img src="/img/icons/vultr.svg" alt="Vultr" className="h-7 w-7 object-contain" />
    ),
    'https://github.com/coollabsio/coolify/blob/v4.x/templates/compose/signoz.yaml': (
      <img src="/img/icons/coolify-logo.png" alt="Coolify" className="h-7 w-7 object-contain" />
    ),
  }

  const dockerCards = SELF_HOST_INSTALLATION_ITEMS.docker.map((item) => ({
    ...item,
    icon: ICON_MAP[item.href],
  }))

  const binaryCards = SELF_HOST_INSTALLATION_ITEMS.binary.map((item) => ({
    ...item,
    icon: ICON_MAP[item.href],
  }))

  const kubernetesCards = SELF_HOST_INSTALLATION_ITEMS.kubernetes.map((item) => ({
    ...item,
    icon: ICON_MAP[item.href],
  }))

  const othersCards = SELF_HOST_INSTALLATION_ITEMS.others.map((item) => ({
    ...item,
    icon: ICON_MAP[item.href],
  }))

  // Docker: Standalone, Swarm, SELinux
  const renderDocker = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Install on Docker</h2>
      <IconCardGrid
        sectionName="Docker"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        cards={dockerCards}
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
        cards={binaryCards}
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
        cards={kubernetesCards}
      />
    </div>
  )

  const renderOthers = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Install on Others</h2>
      <IconCardGrid
        sectionName="Others"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        cards={othersCards}
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
