'use client'

import React from 'react'
import { SiKubernetes } from 'react-icons/si'
import { Server, Container, Activity, Database, Cpu } from 'lucide-react'
import IconCardGrid from '../Card/IconCardGrid'
import { KUBERNETES_DASHBOARDS_ITEMS } from '@/constants/componentItems'

const ICON_MAP: Record<string, React.ReactNode> = {
  '/docs/dashboards/dashboard-templates/kubernetes-cluster-metrics': (
    <SiKubernetes className="h-7 w-7 text-blue-600" />
  ),
  '/docs/dashboards/dashboard-templates/kubernetes-pod-metrics-detailed': (
    <Container className="h-7 w-7 text-blue-600" />
  ),
  '/docs/dashboards/dashboard-templates/kubernetes-pod-metrics-overall': (
    <Container className="h-7 w-7 text-blue-600" />
  ),
  '/docs/dashboards/dashboard-templates/kubernetes-node-metrics-detailed': (
    <Server className="h-7 w-7 text-green-600" />
  ),
  '/docs/dashboards/dashboard-templates/kubernetes-node-metrics-overall': (
    <Server className="h-7 w-7 text-green-600" />
  ),
  '/docs/dashboards/dashboard-templates/kubernetes-events': (
    <Activity className="h-7 w-7 text-orange-600" />
  ),
  '/docs/dashboards/dashboard-templates/kubernetes-pvc': (
    <Database className="h-7 w-7 text-indigo-600" />
  ),
  '/docs/dashboards/dashboard-templates/hostmetrics-k8s': (
    <Cpu className="h-7 w-7 text-purple-600" />
  ),
}

const cards = KUBERNETES_DASHBOARDS_ITEMS.map((item) => ({
  ...item,
  icon: ICON_MAP[item.href],
}))

export default function KubernetesDashboardsListicle() {
  return (
    <IconCardGrid
      cards={cards}
      sectionName="Kubernetes Dashboards Section"
      viewAllText="View all Kubernetes dashboards"
      gridCols="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
    />
  )
}
