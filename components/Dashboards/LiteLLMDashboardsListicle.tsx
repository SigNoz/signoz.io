'use client'

import React from 'react'
import { Activity, Database } from 'lucide-react'
import IconCardGrid from '../Card/IconCardGrid'
import { LITELLM_DASHBOARDS_ITEMS } from '@/constants/componentItems'

const ICON_MAP: Record<string, React.ReactNode> = {
  '/docs/dashboards/dashboard-templates/litellm-proxy-dashboard': (
    <Database className="h-7 w-7 text-blue-500" />
  ),
  '/docs/dashboards/dashboard-templates/litellm-sdk-dashboard': (
    <Activity className="h-7 w-7 text-purple-600" />
  ),
}

const cards = LITELLM_DASHBOARDS_ITEMS.map((item) => ({
  ...item,
  icon: ICON_MAP[item.href],
}))

export default function LiteLLMDashboardsListicle() {
  return (
    <IconCardGrid
      cards={cards}
      sectionName="LiteLLM Dashboards Section"
      viewAllText="View all LiteLLM dashboards"
      gridCols="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
    />
  )
}
