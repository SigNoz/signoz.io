import type { CustomersPageContent, CustomerStory } from '@/components/Customers/Customers.types'
import CustomerProofWall from '@/components/Customers/CustomerProofWall'
import CustomerQuoteCarousel from '@/components/Customers/CustomerQuoteCarousel'
import CustomersHero from '@/components/Customers/CustomersHero'
import CustomerStoryLibrary from '@/components/Customers/CustomerStoryLibrary'
import CustomerVideoCarousel from '@/components/Customers/CustomerVideoCarousel'
import DitherCanvas from '@/components/DitherCanvas/DitherCanvas'
import Divider from '@/shared/components/molecules/FeaturePages/Divider'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'

import {
  HERO_CTAS,
  HERO_METRICS,
  HERO_TITLE,
  PROOF_HEADING,
  STORIES_HEADING,
} from './CustomersPage.constants'

const sectionPaddingClassName = 'px-4 sm:px-6 lg:px-16 xl:px-20'
const sectionHeadingClassName =
  'm-0 text-pretty text-3xl font-medium leading-none tracking-tight text-[var(--l1-foreground)] sm:text-4xl'

interface CustomersPageProps {
  content: CustomersPageContent
  stories: CustomerStory[]
}

export default function CustomersPage({ content, stories }: CustomersPageProps) {
  return (
    <FeaturePageLayout showProductNav={false} fullWidth>
      <DitherCanvas>
        <SectionLayout variant="bordered" className="!px-0">
          <div className={sectionPaddingClassName}>
            <div className="pb-16 pt-28 md:pb-20 md:pt-40 lg:pt-44 xl:pt-[172px]">
              <CustomersHero title={HERO_TITLE} metrics={HERO_METRICS} ctas={HERO_CTAS} />
              <div className="relative z-10 mt-12 md:mt-16">
                <CustomerVideoCarousel videos={content.featuredVideos} />
              </div>
            </div>
          </div>
        </SectionLayout>
      </DitherCanvas>

      <div className="relative mx-auto max-w-8xl">
        <SectionLayout variant="bordered" className="!px-0">
          <Divider />

          <section className={sectionPaddingClassName} id="customer-stories">
            <div className="py-16 lg:py-20">
              <div className="max-w-7xl">
                <h2 className={sectionHeadingClassName}>
                  <span className="block">{STORIES_HEADING.primary}</span>
                  <span className="block text-[var(--l2-foreground)]">
                    {STORIES_HEADING.secondary}
                  </span>
                </h2>
              </div>
              <div className="mt-12">
                <CustomerStoryLibrary stories={stories} />
              </div>
            </div>
          </section>

          <Divider />

          <section className={sectionPaddingClassName}>
            <CustomerQuoteCarousel quotes={content.quoteCarousel} />
          </section>

          <Divider />

          <section className={sectionPaddingClassName}>
            <div className="py-16 lg:py-24">
              <div className="max-w-7xl">
                <h2 className={sectionHeadingClassName}>
                  {PROOF_HEADING.primary}
                  <span className="block text-[var(--l2-foreground)]">
                    {PROOF_HEADING.secondary}
                  </span>
                </h2>
              </div>
              <div className="mt-12">
                <CustomerProofWall
                  quotes={content.proofWall.quotes}
                  logos={content.proofWall.logos}
                />
              </div>
            </div>
          </section>
        </SectionLayout>
      </div>
    </FeaturePageLayout>
  )
}
