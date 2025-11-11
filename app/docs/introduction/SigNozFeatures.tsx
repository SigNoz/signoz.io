import React from 'react'
import {
  ListFilter,
  LayoutDashboard,
  TriangleAlert,
  Bug,
  Waypoints,
  ClipboardList,
} from 'lucide-react'
import IconCardGrid from '../../../components/Card/IconCardGrid'

interface FeatureCardData {
  name: string
  href: string
  icon: React.ReactNode
  clickName: string
}

const featuresData: FeatureCardData[] = [
  {
    name: 'Query Builder',
    href: '/docs/userguide/query-builder/',
    icon: <ListFilter size={24} className="text-signoz_robin-500" />,
    clickName: 'Query Builder Feature Link',
  },
  {
    name: 'Dashboards',
    href: '/docs/userguide/dashboards/',
    icon: <LayoutDashboard size={24} className="text-signoz_robin-500" />,
    clickName: 'Dashboards Feature Link',
  },
  {
    name: 'Alerts',
    href: '/docs/userguide/alerts-management/',
    icon: <TriangleAlert size={24} className="text-signoz_robin-500" />,
    clickName: 'Alerts Feature Link',
  },
  {
    name: 'Exceptions',
    href: '/docs/userguide/exceptions/',
    icon: <Bug size={24} className="text-signoz_robin-500" />,
    clickName: 'Exceptions Feature Link',
  },
  {
    name: 'Trace Explorer',
    href: '/docs/product-features/trace-explorer/',
    icon: <Waypoints size={24} className="text-signoz_robin-500" />,
    clickName: 'Trace Explorer Feature Link',
  },
  {
    name: 'Logs Explorer',
    href: '/docs/product-features/logs-explorer/',
    icon: <ClipboardList size={24} className="text-signoz_robin-500" />,
    clickName: 'Logs Explorer Feature Link',
  },
]

export default function SigNozFeatures() {
  return (
    <IconCardGrid
      title="SigNoz Features"
      description="Explore the powerful features of SigNoz"
      cards={featuresData}
      sectionName="SigNoz Features Section"
    />
  )
}
