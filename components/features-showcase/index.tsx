import React from 'react'
import { CORE_FEATURES, EXTENDED_FEATURES, FEATURE_CATEGORIES, type FeatureShowcase } from './data'
import { FeaturesShowcaseClient } from './FeaturesShowcaseClient'

// Server component for better performance - following index-header pattern
export const FeaturesShowcase: React.FC = () => {
  // Start with core features for better performance
  const allFeatures = [...CORE_FEATURES, ...EXTENDED_FEATURES]
  
  // Group features by category for better organization
  const featuresByCategory = allFeatures.reduce(
    (acc, feature) => {
      if (!acc[feature.category]) {
        acc[feature.category] = []
      }
      acc[feature.category].push(feature)
      return acc
    },
    {} as Record<string, FeatureShowcase[]>
  )

  // Default to first feature (APM) for server-side rendering
  const defaultFeature =
    CORE_FEATURES.find((feature) => feature.id === 'apm') || CORE_FEATURES[0]

  return (
    <section className="mx-auto mt-10 w-full border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] sm:mt-16 md:mt-20 md:w-[90vw] lg:w-[80vw]">
      <div className="container px-4 pb-8 sm:px-6 sm:pb-12 md:pb-16">
        {/* Header */}
        {/* <div className="flex flex-col gap-6 pb-12">
          <div className="mx-auto mt-[50px] flex max-w-4xl flex-col items-center text-center">
            <div className="text-[32px] font-medium leading-[3.25rem] text-signoz_sienna-100">
              The one-stop observability tool
            </div>
          </div>
        </div> */}

        {/* Features Layout - Client Component for interactivity */}
        <FeaturesShowcaseClient
          featuresByCategory={featuresByCategory}
          defaultFeature={defaultFeature}
          coreFeatures={CORE_FEATURES}
          extendedFeatures={EXTENDED_FEATURES}
        />
      </div>
    </section>
  )
}
