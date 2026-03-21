'use client'

import React from 'react'
import { SiKubernetes } from 'react-icons/si'
import { Server, Container, Activity, Database, Cpu } from 'lucide-react'
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
    name: 'Kubernetes Events',
    href: '/docs/dashboards/dashboard-templates/kubernetes-events',
    icon: <Activity className="h-7 w-7 text-orange-600" />,
    clickName: 'Kubernetes Events Dashboard Template',
  },
  {
    name: 'Kubernetes Pod Metrics (Overall)',
    href: '/docs/dashboards/dashboard-templates/kubernetes-pod-metrics-overall',
    icon: <Container className="h-7 w-7 text-blue-600" />,
    clickName: 'Kubernetes Pod Metrics Overall Dashboard Template',
  },
  {
    name: 'Kubernetes Pod Metrics (Detailed)',
    href: '/docs/dashboards/dashboard-templates/kubernetes-pod-metrics-detailed',
    icon: <Container className="h-7 w-7 text-blue-600" />,
    clickName: 'Kubernetes Pod Metrics Detailed Dashboard Template',
  },
  {
    name: 'Kubernetes Node Metrics (Overall)',
    href: '/docs/dashboards/dashboard-templates/kubernetes-node-metrics-overall',
    icon: <Server className="h-7 w-7 text-green-600" />,
    clickName: 'Kubernetes Node Metrics Overall Dashboard Template',
  },
  {
    name: 'Kubernetes Node Metrics (Detailed)',
    href: '/docs/dashboards/dashboard-templates/kubernetes-node-metrics-detailed',
    icon: <Server className="h-7 w-7 text-green-600" />,
    clickName: 'Kubernetes Node Metrics Detailed Dashboard Template',
  },
  {
    name: 'Kubernetes PVC Metrics',
    href: '/docs/dashboards/dashboard-templates/kubernetes-pvc',
    icon: <Database className="h-7 w-7 text-indigo-600" />,
    clickName: 'Kubernetes PVC Metrics Dashboard Template',
  },
  {
    name: 'Host Metrics',
    href: '/docs/dashboards/dashboard-templates/hostmetrics-k8s',
    icon: <Cpu className="h-7 w-7 text-purple-600" />,
    clickName: 'Host Metrics Dashboard Template',
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
