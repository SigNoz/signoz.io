import React from 'react'
import { BookText, Calculator } from 'lucide-react'
import SingleLinkCard from '../../../components/Card/SingleLinkCard'

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
    description: 'Step-by-step guide to migrate from Datadog',
    href: '/docs/migration/migrate-from-datadog/',
    icon: <BookText size={20} className="text-signoz_robin-500" />,
    clickName: 'Datadog Migration Guide Link',
  },
  {
    title: 'Migrate from Grafana',
    description: 'Step-by-step guide to migrate from Grafana',
    href: '/docs/migration/migrate-from-grafana/',
    icon: <BookText size={20} className="text-signoz_robin-500" />,
    clickName: 'Grafana Migration Guide Link',
  },
]

export default function MigrateFromDatadog() {
  const sectionName = 'Migrate From Datadog Section'

  return (
    <div className="mx-auto mb-12 w-full max-w-7xl">
      <div className="mb-6 text-left">
        <h2 className="mb-2 text-2xl font-semibold text-signoz_vanilla-100">
          Migrate from Datadog or Grafana
        </h2>
        <p className="text-base text-signoz_vanilla-400">
          Seamlessly transition from Datadog or Grafana to SigNoz
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {migrationLinks.map((link, index) => (
          <SingleLinkCard
            key={index}
            href={link.href}
            title={link.title}
            description={link.description}
            icon={link.icon}
            clickType="Nav Click"
            clickName={link.clickName}
            clickText={link.title}
            clickLocation={sectionName}
          />
        ))}
      </div>
    </div>
  )
}
