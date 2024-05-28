/* eslint-disable jsx-a11y/media-has-caption */
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import { Header } from '@/components/index-header'
import BuildForDevelopers from '@/components/build-for-developers'
import DataProtectionLaws from '@/components/data-protection-laws'
import CTA from '@/components/index-cta'
import { SigNozFeatures } from '@/components/index-features'
import LatestInOpenTelementry from '@/components/latest-in-open-telementry'
import Observability from '@/components/observability'
import PricingStructure from '@/components/pricing-structure'
import SigNozStats from '@/components/signoz-stats'
import { Testimonials } from '@/components/testimonials'
import { TrustedByTeams } from '@/components/trusted-by'
import { WhyOpenTelemetry } from '@/components/why-opentelemetry'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return (
    <div className="bg-signoz_ink-500">
      <main className="landing-section">
        <Header />
        <TrustedByTeams />
        <SigNozFeatures />
        <WhyOpenTelemetry />
        <BuildForDevelopers />
        <DataProtectionLaws />
        <Observability />
        <PricingStructure />
        <SigNozStats />
        <Testimonials />
        <LatestInOpenTelementry />
        <CTA />
      </main>
    </div>
  )
}
