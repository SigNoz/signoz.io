'use client'

import React from 'react'
import {
  SiAmazonwebservices,
  SiGooglecloud,
  SiDigitalocean,
  SiHelm,
  SiKubernetes,
  SiRedhatopenshift,
  SiArgo,
} from 'react-icons/si'
import IconCardGrid from '../Card/IconCardGrid'
import { K8S_INSTALLATION_ITEMS } from '@/constants/componentItems'

const ICON_MAP: Record<string, React.ReactNode> = {
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
}

const cards = K8S_INSTALLATION_ITEMS.map((item) => ({
  ...item,
  icon: ICON_MAP[item.href],
}))

/**
 * Listicle for SigNoz Kubernetes installation options,
 * based on supported docs categories.
 */
export default function K8sInstallationListicle() {
  return (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Install on Kubernetes</h2>
      <IconCardGrid
        sectionName="Kubernetes"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        cards={cards}
      />
    </div>
  )
}
