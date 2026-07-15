import type { ReactNode } from 'react'
import SectionContainer from '@/components/SectionContainer'

export default function DocsOnboardingSlugLayout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-background">
      <SectionContainer>{children}</SectionContainer>
    </main>
  )
}
