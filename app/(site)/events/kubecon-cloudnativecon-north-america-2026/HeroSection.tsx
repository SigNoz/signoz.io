import { NozSkyline } from '@/components/NozPathWalk'
import ButtonGroup from '@/shared/components/molecules/FeaturePages/ButtonGroup'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'

import EventDetailsCard from './EventDetailsCard'
import { HERO } from './KubeconPage.constants'

export default function HeroSection() {
  return (
    <header className="relative overflow-hidden">
      <NozSkyline />

      <SectionLayout
        variant="no-border"
        className="relative z-[1] px-4 pb-16 pt-16 md:px-10 lg:min-h-[40.5rem] lg:pb-6 lg:pt-[6.75rem]"
      >
        <div className="max-w-[52.5rem]">
          <h1 className="m-0 text-3xl font-medium leading-tight tracking-[-0.02em] sm:text-4xl lg:text-[3rem] lg:leading-[3.75rem]">
            <span className="text-[var(--l1-foreground)]">{HERO.titleLead}</span>{' '}
            <span className="text-[var(--l3-foreground)]">{HERO.titleTrail}</span>
          </h1>
        </div>

        <div className="mt-8 flex max-w-[30.5rem] flex-col gap-6 lg:mt-12">
          <p className="m-0 text-sm leading-6 text-[var(--l2-foreground)]">{HERO.description}</p>
          <div data-noz-anchor>
            <EventDetailsCard />
          </div>
          <ButtonGroup buttons={HERO.buttons} className="!items-start !justify-start" />
        </div>
      </SectionLayout>
    </header>
  )
}
