import { Header } from '@/components/index-header'
import BuildForDevelopers from '@/components/build-for-developers'
import { SigNozFeatures } from '@/components/index-features'
import SigNozStats from '@/components/signoz-stats'
import { Testimonials } from '@/components/testimonials'
import { TrustedByTeams } from '@/components/trusted-by'
import { AgentNativeObservability } from '@/components/agent-native-observability'
import { WhyOpenTelemetry } from '@/components/why-opentelemetry'
import WhySelectSignoz from '@/components/why-select-signoz'
import { GetStarted } from '@/components/GetStarted'
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

function HomepageContent({ isVariant }: { isVariant: boolean }) {
  const variant = isVariant ? 'ai-agents' : 'control'

  return (
    <>
      <Header variant={variant} />
      <TrustedByTeams page="homepage" className="max-w-8xl" />
      <SigNozFeatures className="max-w-8xl" />
      <AgentNativeObservability className="max-w-8xl" variant={variant} />
      <BuildForDevelopers className="max-w-8xl" />
      <WhyOpenTelemetry className="max-w-8xl" />
      <WhySelectSignoz className="max-w-8xl" />
      <SigNozStats className="max-w-8xl" />
      <Testimonials page="homepage" className="max-w-8xl" />
      <GetStarted page="homepage" className="max-w-8xl" />
    </>
  )
}

export default async function HomepageHeroExperiment() {
  const variant = await getHomepageHeroVariant()
  const isVariant = variant === EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.variants.VARIANT

  return (
    <ExperimentTracker experimentId={EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.id} variantId={variant}>
      <HomepageContent isVariant={isVariant} />
    </ExperimentTracker>
  )
}
