'use client'

import React from 'react'
import { SiKubernetes } from 'react-icons/si'
import { Server } from 'lucide-react'
import IconCardGrid from '../Card/IconCardGrid'
import { HOST_METRICS_DASHBOARDS_ITEMS } from '@/constants/componentItems'

const ICON_MAP: Record<string, React.ReactNode> = {
  '/docs/dashboards/dashboard-templates/hostmetrics-k8s': (
    <SiKubernetes className="h-7 w-7 text-blue-600" />
  ),
  '/docs/dashboards/dashboard-templates/hostmetrics-vm': (
    <Server className="h-7 w-7 text-green-600" />
  ),
}

const cards = HOST_METRICS_DASHBOARDS_ITEMS.map((item) => ({
  ...item,
  icon: ICON_MAP[item.href],
}))

export default function HostMetricsDashboardsListicle() {
  return (
    <IconCardGrid
      cards={cards}
      sectionName="Host Metrics Dashboards Section"
      viewAllText="View all Host Metrics dashboards"
      gridCols="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
    />
  )
}
