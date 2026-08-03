import React from 'react'
import DocsIntroCard from '@/components/DocsIntroCard/DocsIntroCard'
import DocsIntroSectionHeader from '@/components/DocsIntroSectionHeader/DocsIntroSectionHeader'
import { MIGRATE_CARDS } from './constants'

const SECTION_NAME = 'Migrate Section'

export default function MigrateSection() {
  return (
    <div className="w-full">
      <DocsIntroSectionHeader
        title="Migrate"
        description="Seamlessly transition from your existing observability stack."
        guidesCount={8}
        viewAllHref="/docs/migration/"
      />
      <div className="grid grid-cols-1 md:grid-cols-3">
        {MIGRATE_CARDS.map((card) => (
          <DocsIntroCard
            key={card.clickName}
            {...card}
            clickLocation={SECTION_NAME}
            className="h-[152px]"
          />
        ))}
      </div>
    </div>
  )
}
