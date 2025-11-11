'use client'

import React from 'react'
import { Activity, Database } from 'lucide-react'
import IconCardGrid from '../Card/IconCardGrid'

interface IconCardData {
  name: string
  href: string
  icon: React.ReactNode
  clickName: string
}

const LiteLLMDashboardsData: IconCardData[] = [
  {
    name: 'LiteLLM Proxy',
    href: '/docs/dashboards/dashboard-templates/litellm-proxy-dashboard',
    icon: <Database className="h-7 w-7 text-blue-500" />,
    clickName: 'LiteLLM Proxy Dashboard Template',
  },
  {
    name: 'LiteLLM SDK',
    href: '/docs/dashboards/dashboard-templates/litellm-sdk-dashboard',
    icon: <Activity className="h-7 w-7 text-purple-600" />,
    clickName: 'LiteLLM SDK Dashboard Template',
  },
]

export default function LiteLLMDashboardsListicle() {
  return (
    <IconCardGrid
      cards={LiteLLMDashboardsData}
      sectionName="LiteLLM Dashboards Section"
      viewAllText="View all LiteLLM dashboards"
      gridCols="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
    />
  )
}
