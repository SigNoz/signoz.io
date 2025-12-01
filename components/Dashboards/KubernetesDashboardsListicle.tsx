'use client'

import React from 'react'
import { SiKubernetes } from 'react-icons/si'
import { Server, Container } from 'lucide-react'
import IconCardGrid from '../Card/IconCardGrid'

interface IconCardData {
  name: string
  href: string
  icon: React.ReactNode
  clickName: string
}

const KubernetesDashboardsData: IconCardData[] = [
  {
    name: 'Kubernetes Cluster Metrics (Overview)',
    href: '/docs/dashboards/dashboard-templates/kubernetes-cluster-metrics',
    icon: <SiKubernetes className="h-7 w-7 text-blue-600" />,
    clickName: 'Kubernetes Cluster Metrics Dashboard Template',
  },
  {
    name: 'Kubernetes Pod Metrics (Detailed)',
    href: '/docs/dashboards/dashboard-templates/kubernetes-pod-metrics-detailed',
    icon: <Container className="h-7 w-7 text-blue-600" />,
    clickName: 'Kubernetes Pod Metrics Detailed Dashboard Template',
  },
  {
    name: 'Kubernetes Node Metrics (Detailed)',
    href: '/docs/dashboards/dashboard-templates/kubernetes-node-metrics-detailed',
    icon: <Server className="h-7 w-7 text-green-600" />,
    clickName: 'Kubernetes Node Metrics Detailed Dashboard Template',
  },
]

export default function KubernetesDashboardsListicle() {
  return (
    <IconCardGrid
      cards={KubernetesDashboardsData}
      sectionName="Kubernetes Dashboards Section"
      viewAllText="View all Kubernetes dashboards"
      gridCols="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
    />
  )
}
