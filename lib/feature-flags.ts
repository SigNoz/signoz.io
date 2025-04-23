import { getFeaturesFromAPI } from './growthbook-server'
import { GrowthBook } from '@growthbook/growthbook'
import { cache } from 'react'

// List of all feature flag keys for better type safety
export const FeatureFlags = {
  LAUNCH_WEEK_BANNER: 'show-launch-week-banner',
  SIMPLIFIED_CTA: 'single-cta-on-home-header',
  // Add more feature flags here as needed
}

// Type-safe feature flag key type
export type FeatureFlagKey = keyof typeof FeatureFlags

// Get a feature flag value with strong typing
export async function getFeatureFlag<T>(flagKey: string, defaultValue: T): Promise<T> {
  const features = await getFeaturesFromAPI()
  const gb = new GrowthBook({ features })
  return gb.getFeatureValue(flagKey, defaultValue) as T
}

// Specific feature flag functions with caching
export const getLaunchWeekBannerEnabled = cache(async (): Promise<boolean> => {
  return getFeatureFlag(FeatureFlags.LAUNCH_WEEK_BANNER, false)
})

export const getSimplifiedCTAEnabled = cache(async (): Promise<boolean> => {
  return getFeatureFlag(FeatureFlags.SIMPLIFIED_CTA, false)
})
