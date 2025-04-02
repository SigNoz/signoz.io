'use client'

import React from 'react'
import { BookText, Calculator } from 'lucide-react'
import TrackingLink from '../../../components/TrackingLink'

interface MigrationLinkData {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  clickName: string
}

const migrationLinks: MigrationLinkData[] = [
  {
    title: 'Migration Guide',
    description: 'Step-by-step guide to migrate from DataDog',
    href: '/docs/migration/migrate-from-datadog/',
    icon: <BookText size={20} className="text-signoz_robin-500" />,
    clickName: 'Datadog Migration Guide Link',
  },
  {
    title: 'Cost Comparison',
    description: 'Compare SigNoz and DataDog pricing',
    href: '/product-comparison/signoz-vs-datadog/#value-for-money',
    icon: <Calculator size={20} className="text-signoz_robin-500" />,
    clickName: 'Datadog Cost Comparison Link',
  },
]

export default function MigrateFromDatadog() {
  const sectionName = 'Migrate From Datadog Section'

  return (
    <div className="mx-auto mb-12 w-full max-w-7xl">
      <div className="mb-6 text-left">
        <h2 className="mb-2 text-2xl font-semibold text-signoz_vanilla-100">
          Migrate from DataDog
        </h2>
        <p className="text-base text-signoz_vanilla-400">
          Seamlessly transition from DataDog to SigNoz
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {migrationLinks.map((link, index) => (
          <TrackingLink
            key={index}
            href={link.href}
            className="flex items-center gap-4 rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 p-4 transition-all hover:border-signoz_robin-500 hover:bg-signoz_ink-300"
            clickType="Migration Link"
            clickName={link.clickName}
            clickText={link.title}
            clickLocation={sectionName}
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-signoz_robin-500/10">
              {link.icon}
            </div>
            <div>
              <h3 className="mb-1 text-base font-bold text-signoz_vanilla-100">{link.title}</h3>
              <p className="mb-0 text-sm text-signoz_vanilla-400">{link.description}</p>
            </div>
          </TrackingLink>
        ))}
      </div>
    </div>
  )
}
