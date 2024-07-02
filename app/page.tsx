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
import WhySelectSignoz from '@/components/why-select-signoz'
import { NextUIProvider } from "@nextui-org/react";

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return (
    <NextUIProvider>
      <div className="bg-signoz_ink-500 relative mt-[-56px]">
        <div className="absolute top-0 right-0 left-0 h-screen bg-[length:55%] bg-no-repeat bg-[center_top_4rem] bg-[url('/img/background_blur/Perlin_noise.png')] " />
        <div className="absolute top-0 right-0 left-0 h-screen bg-[center_top_-50rem] bg-[length:110%] bg-no-repeat bg-[url('/img/background_blur/Circle.png')]" />
        <main className="landing-section pt-12 sm:pt-0 relative z-[1]">
          <Header />
          <TrustedByTeams />
          <SigNozFeatures />
          <BuildForDevelopers />
          <WhyOpenTelemetry />
          <WhySelectSignoz />
          <SigNozStats />
          <Testimonials />
        </main>
      </div>
    </NextUIProvider>
  )
}
