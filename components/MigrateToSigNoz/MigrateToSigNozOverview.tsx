import React from 'react'
import {
  SiKubernetes,
  SiGrafana,
  SiElastic,
  SiDatadog,
  SiNewrelic,
  SiOpentelemetry,
} from 'react-icons/si'
import IconCardGrid from '../Card/IconCardGrid'

interface IconCardData {
  name: string
  href: string
  icon: React.ReactNode
  clickName: string
}

const MigrateVendorsData: IconCardData[] = [
  {
    name: 'Migrate from Datadog',
    href: '/docs/migration/migrate-from-datadog/',
    icon: <SiDatadog className="h-7 w-7 text-purple-500" />,
    clickName: 'Migrate from Datadog',
  },
  {
    name: 'Migrate from Grafana',
    href: '/docs/migration/migrate-from-grafana/',
    icon: <SiGrafana className="h-7 w-7 text-orange-500" />,
    clickName: 'Migrate from Grafana',
  },
  {
    name: 'Migrate from ELK',
    href: '/docs/migration/migrate-from-elk/',
    icon: <SiElastic className="h-7 w-7 text-pink-600" />,
    clickName: 'Migrate from ELK',
  },
  {
    name: 'Migrate from New Relic',
    href: '/docs/migration/migrate-from-newrelic/',
    icon: <SiNewrelic className="h-7 w-7 text-green-500" />,
    clickName: 'Migrate from New Relic',
  },
  {
    name: 'Migrate from Honeycomb',
    href: '/docs/migration/migrate-from-honeycomb-to-signoz/',
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/svgs/icons/honeycomb.svg" alt="Honeycomb" className="h-7 w-7 object-contain" />
    ),
    clickName: 'Migrate from Honeycomb',
  },
  {
    name: 'Migrate from OpenTelemetry',
    href: '/docs/migration/migrate-from-opentelemetry-to-signoz/',
    icon: <SiOpentelemetry className="h-7 w-7 text-blue-500" />,
    clickName: 'Migrate from OpenTelemetry',
  },
  {
    name: 'Migrate from Self-Hosted SigNoz',
    href: '/docs/migration/migrate-to-signoz-cloud/',
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/svgs/icons/signoz.svg" alt="SigNoz" className="h-7 w-7 object-contain" />
    ),
    clickName: 'Migrate from Self-Hosted SigNoz',
  },
]

export default function MigrateToSigNoz() {
  return (
    <IconCardGrid
      cards={MigrateVendorsData}
      sectionName="Vendors Migrate Section"
      viewAllText="View all migration guides"
      gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
    />
  )
}
