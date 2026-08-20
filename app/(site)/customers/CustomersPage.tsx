import type { CustomersPageContent, CustomerStory } from '@/components/Customers/Customers.types'
import CustomerProofMasonry from '@/components/Customers/CustomerProofMasonry'
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

const sectionInnerClassName = 'px-4 sm:px-6 lg:px-16 xl:px-20'
const sectionHeadingClassName =
  'm-0 text-pretty text-3xl font-medium leading-none tracking-tight text-[var(--l1-foreground)] sm:text-4xl'

interface CustomersPageProps {
  content: CustomersPageContent
  stories: CustomerStory[]
}

export default function CustomersPage({ content, stories }: CustomersPageProps) {
  return (
    <FeaturePageLayout showProductNav={false} showDotPattern={false}>
      <DitherCanvas>
        <SectionLayout variant="bordered" className="!px-0">
          <section className={sectionInnerClassName}>
            <div className="pb-12 pt-28 md:pt-40 lg:pt-44">
              <CustomersHero title={HERO_TITLE} metrics={HERO_METRICS} ctas={HERO_CTAS} />
            </div>
          </section>

          <section className={sectionInnerClassName}>
            <div className="pb-16 lg:pb-24">
              <CustomerVideoCarousel videos={content.featuredVideos} />
            </div>
          </section>
        </SectionLayout>
      </DitherCanvas>

      <SectionLayout variant="bordered" className="!px-0">
        <section className={sectionInnerClassName} id="customer-stories">
          <div className="py-16 lg:py-24">
            <h2 className={sectionHeadingClassName}>
              <span className="block">{STORIES_HEADING.primary}</span>
              <span className="block max-w-3xl text-[var(--l2-foreground)]">
                {STORIES_HEADING.secondary}
              </span>
            </h2>
            <div className="mt-12">
              <CustomerStoryLibrary stories={stories} />
            </div>
          </div>
        </section>

        <Divider />

        <section className={sectionInnerClassName}>
          <div className="py-16 lg:py-24">
            <h2 className={sectionHeadingClassName}>
              <span className="block max-w-3xl">{PROOF_HEADING.primary}</span>
              <span className="block max-w-3xl text-[var(--l2-foreground)]">
                {PROOF_HEADING.secondary}
              </span>
            </h2>
            <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-10">
              <div className="min-w-0">
                <CustomerQuoteCarousel quotes={content.quoteCarousel} />
              </div>
              <div className="min-w-0">
                <CustomerProofMasonry quotes={content.proofWall.quotes} />
              </div>
            </div>
          </div>
        </section>
      </SectionLayout>
    </FeaturePageLayout>
  )
}
