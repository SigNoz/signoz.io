import type { ReactNode } from 'react'
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

type HomepageHeroExperimentProps = {
  children: (variant: 'control' | 'ai-agents') => ReactNode
}

export default async function HomepageHeroExperiment({ children }: HomepageHeroExperimentProps) {
  const variant = await getHomepageHeroVariant()
  const isVariant = variant === EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.variants.VARIANT
  const homepageVariant = isVariant ? 'ai-agents' : 'control'

  return (
    <ExperimentTracker experimentId={EXPERIMENTS.HOMEPAGE_HERO_REDESIGN.id} variantId={variant}>
      {children(homepageVariant)}
    </ExperimentTracker>
  )
}
