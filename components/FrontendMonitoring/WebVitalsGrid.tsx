import React from 'react'
import {
  FiBarChart,
  FiShare2
} from 'react-icons/fi'
import IconCardGrid from '../Card/IconCardGrid';

interface IconCardData {
  name: string
  href: string
  icon: React.ReactNode
  clickName: string
}

const integrationsData: IconCardData[] = [
  {
    name: 'Sending Web Vitals as Metrics',
    href: '/docs/frontend-monitoring/web-vitals-with-metrics',
    icon: <FiBarChart className="h-7 w-7 text-red-500" />,
    clickName: 'Sending Web Vitals as Metrics',
  },
  {
    name: 'Sending Web Vitals as Traces',
    href: '/docs/frontend-monitoring/web-vitals-with-traces',
    icon: <FiShare2 className="h-7 w-7 text-blue-600" />,
    clickName: 'Sending Web Vitals as Traces',
  },
]

export default function Integrations() {
  return (
    <IconCardGrid
      title="Web Vitals"
      description="Send web vitals to SigNoz using OpenTelemetry"
      cards={integrationsData}
      sectionName="Web Vitals Section"
    />
  )
}
