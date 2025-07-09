'use client'

import React from 'react'
import { SiKubernetes } from 'react-icons/si'
import { Server } from 'lucide-react'
import IconCardGrid from '../Card/IconCardGrid'

interface IconCardData {
  name: string
  href: string
  icon: React.ReactNode
  clickName: string
}

const HostMetricsDashboardsData: IconCardData[] = [
  {
    name: 'Host Metrics K8s',
    href: '/docs/dashboards/dashboard-templates/hostmetrics-k8s',
    icon: <SiKubernetes className="h-7 w-7 text-blue-600" />,
    clickName: 'Host Metrics K8s Dashboard Template',
  },
  {
    name: 'Host Metrics',
    href: 'https://github.com/SigNoz/dashboards/blob/main/hostmetrics/hostmetrics.json',
    icon: <Server className="h-7 w-7 text-green-600" />,
    clickName: 'Host Metrics Dashboard Template',
  },
]

export default function HostMetricsDashboardsListicle() {
  return (
    <IconCardGrid
      cards={HostMetricsDashboardsData}
      sectionName="Host Metrics Dashboards Section"
      viewAllText="View all Host Metrics dashboards"
      gridCols="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
    />
  )
}
