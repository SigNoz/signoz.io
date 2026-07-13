import React from 'react'
import DocsIntroCard from '@/components/DocsIntroCard/DocsIntroCard'
import DocsIntroSectionHeader from '@/components/DocsIntroSectionHeader/DocsIntroSectionHeader'
import { SECURITY_CARDS } from './constants'

const SECTION_NAME = 'Security and Compliance Section'

export default function SecurityComplianceSection() {
  return (
    <div className="w-full">
      <DocsIntroSectionHeader
        title="Security & Compliance"
        description="Secure your SigNoz deployment and ensure compliance."
      />
      <div className="grid grid-cols-1 md:grid-cols-3">
        {SECURITY_CARDS.map((card) => (
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
