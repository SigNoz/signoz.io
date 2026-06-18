import { Header, HomepageHeroRedesign } from '@/components/index-header'
import BuildForDevelopers from '@/components/build-for-developers'
import { SigNozFeatures } from '@/components/index-features'
import SigNozStats from '@/components/signoz-stats'
import { Testimonials } from '@/components/testimonials'
import { TrustedByTeams } from '@/components/trusted-by'
import { AgentNativeObservability } from '@/components/agent-native-observability'
import { WhyOpenTelemetry } from '@/components/why-opentelemetry'
import WhySelectSignoz from '@/components/why-select-signoz'
import { GetStarted } from '@/components/GetStarted'
import ChatbaseClient from '@/components/Chatbase/ChatbaseClient'
import HomepageFloatingCta from '@/components/homepage-floating-cta/HomepageFloatingCta'
import CustomerStories from '@/components/index-customer-stories/CustomerStories'
import Faq from '@/components/index-faq/Faq'
import AgentNativeObservabilitySection from '@/components/index-agent-native-observability/AgentNativeObservability'
import FeatureBento from '@/components/index-feature-bento/FeatureBento'
import WhySignoz from '@/components/index-why-signoz/WhySignoz'
import Pricing from '@/components/index-pricing/Pricing'
import HomepageGetStarted from '@/components/index-get-started/HomepageGetStarted'
import { ExperimentTracker } from '@/components/ExperimentTracker'
import { EXPERIMENTS } from '@/constants/experiments'
import { getFeatureValue } from '@/utils/growthbookServer'

type HomepageHeroVariant =
  (typeof EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.variants)[keyof typeof EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.variants]
type HomepageHeroFeatureValue = HomepageHeroVariant | boolean

async function getHomepageHeroVariant(): Promise<HomepageHeroVariant> {
  const defaultVariant: HomepageHeroVariant =
    process.env.NODE_ENV === 'development'
      ? EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.variants.VARIANT
      : EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.defaultVariant
  const featureValue = await getFeatureValue<HomepageHeroFeatureValue>(
    EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.flagName,
    defaultVariant
  )

  if (featureValue === true) return EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.variants.VARIANT
  if (featureValue === false) return EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.variants.CONTROL
  if (
    featureValue === EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.variants.VARIANT ||
    featureValue === EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.variants.CONTROL
  ) {
    return featureValue
  }

  return defaultVariant
}

function HomepageControl() {
  return (
    <>
      <Header />
      <TrustedByTeams page="homepage" className="max-w-8xl" />
      <SigNozFeatures className="max-w-8xl" />
      <div>
        <AgentNativeObservability className="max-w-8xl" />
      </div>
      <BuildForDevelopers className="max-w-8xl" />
      <WhyOpenTelemetry className="max-w-8xl" />
      <WhySelectSignoz className="max-w-8xl" />
      <SigNozStats className="max-w-8xl" />
      <Testimonials page="homepage" className="max-w-8xl" />
      <GetStarted page="homepage" className="max-w-8xl" />
      <ChatbaseClient />
    </>
  )
}

function HomepageRedesign() {
  return (
    <div className="homepage-hero-redesign-variant">
      <HomepageHeroRedesign />
      <TrustedByTeams page="homepage" className="homepage-redesign-logo-strip max-w-8xl" />
      <WhySignoz />
      <FeatureBento />
      <AgentNativeObservabilitySection />
      <CustomerStories />
      <HomepageGetStarted />
      <Pricing />
      <Faq />
      <GetStarted page="homepage" className="max-w-8xl" />
      <HomepageFloatingCta />
      <ChatbaseClient />
    </div>
  )
}

export default async function HomepageHeroExperiment() {
  const variant = await getHomepageHeroVariant()
  const isRedesign = variant === EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.variants.VARIANT

  return (
    <ExperimentTracker experimentId={EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.id} variantId={variant}>
      {isRedesign ? <HomepageRedesign /> : <HomepageControl />}
    </ExperimentTracker>
  )
}
