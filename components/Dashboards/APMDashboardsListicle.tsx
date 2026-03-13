'use client'

import React from 'react'
import { Activity, Database, Globe } from 'lucide-react'
import IconCardGrid from '../Card/IconCardGrid'

interface IconCardData {
  name: string
  href: string
  icon: React.ReactNode
  clickName: string
}

const APMDashboardsData: IconCardData[] = [
  {
    name: 'APM Metrics',
    href: '/docs/dashboards/dashboard-templates/apm-metrics',
    icon: <Activity className="h-7 w-7 text-blue-500" />,
    clickName: 'APM Metrics Dashboard Template',
  },
  {
    name: 'Database Calls Monitoring',
    href: '/docs/dashboards/dashboard-templates/db-calls-monitoring',
    icon: <Database className="h-7 w-7 text-purple-600" />,
    clickName: 'Database Calls Monitoring Dashboard Template',
  },
  {
    name: 'HTTP API Monitoring',
    href: '/docs/dashboards/dashboard-templates/http-api-monitoring',
    icon: <Globe className="h-7 w-7 text-green-600" />,
    clickName: 'HTTP API Monitoring Dashboard Template',
  },
]

export default function APMDashboardsListicle() {
  return (
    <IconCardGrid
      cards={APMDashboardsData}
      sectionName="APM Dashboards Section"
      viewAllText="View all APM dashboards"
      gridCols="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
    />
  )
}
