import NozPathWalk from '@/components/NozPathWalk'
import CustomerStoriesCard from '@/components/index-header/customer-stories/CustomerStoriesCard'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'

import BoothMarquee from './BoothMarquee'
import ClosingCtaSection from './ClosingCtaSection'
import HeroSection from './HeroSection'
import KernelSpotlightSection from './KernelSpotlightSection'
import { NOZ_BADGES, SKYLINE } from './KubeconPage.constants'
import ScaleStatsSection from './ScaleStatsSection'
import WhySignozSection from './WhySignozSection'
import WorthAReadSection from './WorthAReadSection'
import styles from './kubecon.module.css'

/**
 * Noz walks from the top of the hero to the Schedule a demo button, collecting one
 * badge per value. Below that the sections run full width, so the walk stops
 * there rather than drawing over them.
 *
 * The dashed side rails frame the page, but they stop around the customer
 * stories block so they don't double up on that card's own border.
 */
export default function KubeconPage() {
  return (
    <>
      <BoothMarquee />

      <div className="mx-auto w-full max-w-8xl">
        <NozPathWalk badges={NOZ_BADGES} skylineSrc={SKYLINE.src} skylineAlt={SKYLINE.alt}>
          <div className="border-x border-dashed border-[var(--l2-border)]">
            <HeroSection />
          </div>

          <SectionLayout variant="no-border" className="!px-0">
            <div data-noz-anchor>
              <CustomerStoriesCard clickLocation="KubeCon NA 2026 Customer Stories" />
            </div>
          </SectionLayout>

          <div className="border-x border-dashed border-[var(--l2-border)]">
            <WhySignozSection />
          </div>
        </NozPathWalk>

        <div className="border-x border-dashed border-[var(--l2-border)]">
          <ScaleStatsSection />
          <KernelSpotlightSection />

          <SectionLayout variant="no-border" className="px-0 pt-16 lg:pt-20">
            <div className={styles.hatchRule} aria-hidden="true" />
          </SectionLayout>

          <WorthAReadSection />

          <SectionLayout variant="no-border" className="px-0 pt-16 lg:pt-20">
            <div className={styles.hatchRule} aria-hidden="true" />
          </SectionLayout>

          <ClosingCtaSection />
        </div>
      </div>
    </>
  )
}
