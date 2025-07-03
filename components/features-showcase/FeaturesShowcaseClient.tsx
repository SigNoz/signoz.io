'use client'

import React, { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { FEATURES_SHOWCASE, FEATURE_CATEGORIES, type FeatureShowcase } from './data'
import { VideoPlayer } from './VideoPlayer'
import TrackingLink from '../TrackingLink'

interface FeaturesShowcaseClientProps {
  featuresByCategory: Record<string, FeatureShowcase[]>
  defaultFeature: FeatureShowcase
}

const TechIcon = ({ icon, name }: { icon: React.ReactNode; name: string }) => (
  <div
    className="group relative flex h-10 w-10 items-center justify-center rounded-lg border border-signoz_slate-400/30 bg-signoz_ink-300/30"
    title={name}
  >
    {icon}
    <div className="absolute -top-8 left-1/2 z-10 hidden -translate-x-1/2 transform rounded bg-signoz_ink-200 px-2 py-1 text-xs text-signoz_vanilla-100 group-hover:block">
      {name}
    </div>
  </div>
)

export const FeaturesShowcaseClient: React.FC<FeaturesShowcaseClientProps> = ({
  featuresByCategory,
  defaultFeature,
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultFeature.id)
  const [activeCategory, setActiveCategory] = useState<string>('core')

  const activeFeature =
    FEATURES_SHOWCASE.find((feature) => feature.id === activeTab) || defaultFeature

  const handleTabClick = (featureId: string) => {
    setActiveTab(featureId)
  }

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
    // Set the first feature of the category as active
    const firstFeature = featuresByCategory[category]?.[0]
    if (firstFeature) {
      setActiveTab(firstFeature.id)
    }
  }

  // Get features for the active category
  const activeCategoryFeatures = featuresByCategory[activeCategory] || []

  return (
    <div className="space-y-8">
      {/* Category Tabs at Top */}
      <div className="flex flex-wrap justify-center gap-2">
        {Object.entries(FEATURE_CATEGORIES).map(([category, categoryInfo]) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`rounded-lg border px-6 py-3 text-sm font-medium transition-all duration-200 ${
              activeCategory === category
                ? 'border-signoz_accent-300 bg-signoz_accent-300/10 text-signoz_accent-300'
                : 'hover:border-signoz_accent-300/50 hover:bg-signoz_accent-300/5 border-signoz_slate-400/30 bg-signoz_ink-300/30 text-signoz_vanilla-100'
            }`}
            aria-pressed={activeCategory === category}
          >
            <div className="font-semibold">{categoryInfo.label}</div>
            <div className="text-xs opacity-80">{categoryInfo.description}</div>
          </button>
        ))}
      </div>

      {/* Features Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Feature Items Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <div className="mb-4">
              <h3 className="text-signoz_accent-300 text-lg font-semibold">
                {FEATURE_CATEGORIES[activeCategory as keyof typeof FEATURE_CATEGORIES].label}
              </h3>
              <p className="text-sm text-signoz_vanilla-400">
                {FEATURE_CATEGORIES[activeCategory as keyof typeof FEATURE_CATEGORIES].description}
              </p>
            </div>
            <div className="space-y-2">
              {activeCategoryFeatures.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => handleTabClick(feature.id)}
                  className={`w-full rounded-lg border px-4 py-3 text-left transition-all duration-200 ${
                    activeTab === feature.id
                      ? 'border-signoz_accent-300 bg-signoz_accent-300/10 text-signoz_accent-300'
                      : 'hover:border-signoz_accent-300/50 hover:bg-signoz_accent-300/5 border-signoz_slate-400/30 bg-signoz_ink-300/30 text-signoz_vanilla-100'
                  }`}
                  aria-pressed={activeTab === feature.id}
                >
                  <div className="font-medium">{feature.title}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-8">
          <div className="rounded-lg border border-signoz_slate-400/30 bg-signoz_ink-300/30 p-6">
            {/* Video Showcase */}
            <div className="mb-6">
              <VideoPlayer
                thumbnailSrc={activeFeature.thumbnail}
                videoSrc={activeFeature.videoSrc}
                title={activeFeature.title}
                className="w-full"
              />
            </div>

            {/* Technology Icons and CTA */}
            <div className="mb-4">
              <h3 className="mb-3 text-lg font-semibold text-signoz_vanilla-100">
                Supported Technologies
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                {activeFeature.techIcons.map((tech, index) => (
                  <TechIcon key={index} icon={tech.icon} name={tech.name} />
                ))}
                <TrackingLink
                  href={activeFeature.ctaLink.href}
                  clickType="Primary CTA"
                  clickName={`${activeFeature.title} CTA Link`}
                  clickLocation="Features Showcase"
                  clickText={activeFeature.ctaLink.text}
                  className="hover:text-signoz_accent-200 ml-2 flex items-center gap-1 text-sm font-medium text-gray-300 transition-colors"
                >
                  {activeFeature.ctaLink.text}
                  <ArrowUpRight className="h-3 w-3" />
                </TrackingLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
