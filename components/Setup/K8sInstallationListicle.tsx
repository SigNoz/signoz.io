'use client'

import React from 'react'
import {
  SiAmazonwebservices,
  SiGooglecloud,
  SiDigitalocean,
  SiHelm,
  SiKubernetes,
  SiRedhatopenshift,
  SiArgo
} from 'react-icons/si'
import IconCardGrid from '../Card/IconCardGrid'

/**
 * Listicle for SigNoz Kubernetes installation options,
 * based on supported docs categories.
 */
export default function K8sInstallationListicle() {
  // Icons for platforms
  const k8sIcon = <SiKubernetes className="h-7 w-7 text-blue-600" />
  const awsIcon = <SiAmazonwebservices className="h-7 w-7 text-amber-500" />
  const gcpIcon = <SiGooglecloud className="h-7 w-7 text-blue-400" />
  const doIcon = <SiDigitalocean className="h-7 w-7 text-sky-400" />
  const helmIcon = <SiHelm className="h-7 w-7 text-indigo-500" />
  const redhatOpenshiftIcon = <SiRedhatopenshift className='h-7 w-7 text-red-800' />
  const argocdIcon = <SiArgo className="h-7 w-7 text-gray-500" />

  // Kubernetes installation cards
  const cards = [
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
      icon: <img src="/img/icons/azure-icon.svg" width={20} height={20} alt="Azure" />, // Azure icon
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
      icon: argocdIcon, // Using Helm icon for ArgoCD
      clickName: 'Deploy with ArgoCD',
    },
    { name: 'Openshift',
      href: '/docs/install/kubernetes/openshift', 
      icon: redhatOpenshiftIcon, 
      clickName: 'Deploy to OpenShift' 
    },

  ]

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
