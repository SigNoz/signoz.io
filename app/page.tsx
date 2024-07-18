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
import { NextUIProvider } from '@nextui-org/react'
import { Metadata } from 'next'

import { configureServerSideGrowthBook } from '@/lib/growthbookServer'
import { GrowthBook } from '@growthbook/growthbook'

export const metadata: Metadata = {
  title: 'SigNoz | The Open Source Datadog Alternative',
  openGraph: {
    title: 'SigNoz | The Open Source Datadog Alternative',
    description:
      'SigNoz is an open-source observability tool powered by OpenTelemetry. Get APM, logs, traces, metrics, exceptions, & alerts in a single tool.',
  },
  description:
    'SigNoz is an open-source observability tool powered by OpenTelemetry. Get APM, logs, traces, metrics, exceptions, & alerts in a single tool.',
}

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)

  // Helper to configure cache for next.js
  configureServerSideGrowthBook()

  // Create and initialize a GrowthBook instance
  const gb = new GrowthBook({
    apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
    decryptionKey: process.env.NEXT_PUBLIC_GROWTHBOOK_DECRYPTION_KEY,
  })
  await gb.init({ timeout: 1000 })

  // Get the payload to hydrate the client-side GrowthBook instance
  // We need the decrypted payload so the initial client-render can be synchronous
  const payload = gb.getDecryptedPayload()

  // Cleanup your GrowthBook instance
  gb.destroy()

  return (
    <NextUIProvider>
      <div className="relative mt-[-56px] bg-signoz_ink-500 ">
        <div className="absolute left-0 right-0 top-0 h-screen bg-[url('/img/background_blur/Perlin_noise.png')] bg-[length:55%] bg-[center_top_4rem] sm:bg-no-repeat " />
        <div className="absolute left-0 right-0 top-0 h-screen bg-[url('/img/background_blur/Circle.png')] bg-[length:110%] bg-no-repeat sm:bg-[center_top_-50rem]" />
        <main className="landing-section relative z-[1] pt-12 sm:pt-0">
          <Header payload={payload} />
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
