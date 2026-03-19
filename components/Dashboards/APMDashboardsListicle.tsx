'use client'

import React from 'react'
import { Activity, Database, Globe } from 'lucide-react'
import IconCardGrid from '../Card/IconCardGrid'
import { APM_DASHBOARDS_ITEMS } from '@/constants/componentItems'

const ICON_MAP: Record<string, React.ReactNode> = {
  '/docs/dashboards/dashboard-templates/apm-metrics': (
    <Activity className="h-7 w-7 text-blue-500" />
  ),
  '/docs/dashboards/dashboard-templates/db-calls-monitoring': (
    <Database className="h-7 w-7 text-purple-600" />
  ),
  '/docs/dashboards/dashboard-templates/http-api-monitoring': (
    <Globe className="h-7 w-7 text-green-600" />
  ),
}

const cards = APM_DASHBOARDS_ITEMS.map((item) => ({
  ...item,
  icon: ICON_MAP[item.href],
}))

export default function APMDashboardsListicle() {
  return (
    <IconCardGrid
      cards={cards}
      sectionName="APM Dashboards Section"
      viewAllText="View all APM dashboards"
      gridCols="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
    />
  )
}
