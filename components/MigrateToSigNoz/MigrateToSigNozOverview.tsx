import React from 'react'
import { SiGrafana, SiElastic, SiDatadog, SiNewrelic, SiOpentelemetry } from 'react-icons/si'
import IconCardGrid from '../Card/IconCardGrid'
import { MIGRATE_TO_SIGNOZ_ITEMS } from '@/constants/componentItems'

const ICON_MAP: Record<string, React.ReactNode> = {
  '/docs/migration/migrate-from-datadog-to-signoz/': (
    <SiDatadog className="h-7 w-7 text-purple-500" />
  ),
  '/docs/migration/migrate-from-grafana/': <SiGrafana className="h-7 w-7 text-orange-500" />,
  '/docs/migration/migrate-from-elk/': <SiElastic className="h-7 w-7 text-pink-600" />,
  '/docs/migration/migrate-from-newrelic/': <SiNewrelic className="h-7 w-7 text-green-500" />,
  '/docs/migration/migrate-from-honeycomb-to-signoz/': (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/svgs/icons/honeycomb.svg" alt="Honeycomb" className="h-7 w-7 object-contain" />
  ),
  '/docs/migration/migrate-from-opentelemetry-to-signoz/': (
    <SiOpentelemetry className="h-7 w-7 text-blue-500" />
  ),
  '/docs/migration/migrate-to-signoz-cloud/': (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/svgs/icons/signoz.svg" alt="SigNoz" className="h-7 w-7 object-contain" />
  ),
}

const MigrateVendorsData = MIGRATE_TO_SIGNOZ_ITEMS.map((item) => ({
  ...item,
  icon: ICON_MAP[item.href],
}))

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
