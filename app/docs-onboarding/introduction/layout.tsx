import type { ReactNode } from 'react'
import SectionContainer from '@/components/SectionContainer'

export default function DocsOnboardingIntroductionLayout({ children }: { children: ReactNode }) {
  return (
    <div className="introduction-page bg-background relative">
      <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
      <div className="absolute top-0 right-0 left-0 mx-auto h-[450px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[956px]" />

      <SectionContainer>
        <div className="max-w-8xl border-border relative !mx-auto flex w-full flex-col items-center border !border-b-0 border-dashed px-8 pt-12 md:px-0 md:px-5 md:pt-24">
          {children}
        </div>
      </SectionContainer>
    </div>
  )
}
