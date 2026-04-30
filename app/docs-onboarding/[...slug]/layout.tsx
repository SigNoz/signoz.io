import type { ReactNode } from 'react'
import SectionContainer from '@/components/SectionContainer'

export default function DocsOnboardingSlugLayout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-signoz_ink-500">
      <SectionContainer>{children}</SectionContainer>
    </main>
  )
}
