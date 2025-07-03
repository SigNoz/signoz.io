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
    className="hover:border-signoz_accent-300/30 group relative flex h-8 w-8 items-center justify-center rounded-md border border-signoz_slate-400/20 bg-signoz_ink-300/20 transition-all"
    title={name}
  >
    <div className="text-xs">{icon}</div>
    <div className="absolute -top-8 left-1/2 z-10 hidden -translate-x-1/2 transform rounded bg-signoz_ink-200 px-2 py-1 text-xs text-signoz_vanilla-100 group-hover:block">
      {name}
    </div>
  </div>
)

const getFeatureCTA = (featureId: string) => {
  const featureCtaMap: Record<string, { text: string; href: string }> = {
    'logs-management': {
      text: 'Start with Logs Management in SigNoz - Free',
      href: '/teams/',
    },
    'apm-traces': {
      text: 'Start APM Monitoring in SigNoz - Free',
      href: '/teams/',
    },
    'metrics-monitoring': {
      text: 'Start Metrics Monitoring in SigNoz - Free',
      href: '/teams/',
    },
    'alerts-notifications': {
      text: 'Set Up Alerts in SigNoz - Free',
      href: '/teams/',
    },
    'exceptions-monitoring': {
      text: 'Monitor Exceptions in SigNoz - Free',
      href: '/teams/',
    },
    'aws-monitoring': {
      text: 'Monitor AWS with SigNoz - Free',
      href: '/teams/',
    },
    'kubernetes-monitoring': {
      text: 'Monitor Kubernetes with SigNoz - Free',
      href: '/teams/',
    },
    'gcp-monitoring': {
      text: 'Monitor GCP with SigNoz - Free',
      href: '/teams/',
    },
    'azure-monitoring': {
      text: 'Monitor Azure with SigNoz - Free',
      href: '/teams/',
    },
    'custom-dashboards': {
      text: 'Create Custom Dashboards in SigNoz - Free',
      href: '/teams/',
    },
    'data-retention': {
      text: 'Explore Data Retention in SigNoz - Free',
      href: '/teams/',
    },
    'sso-saml': {
      text: 'Set Up SSO/SAML in SigNoz - Free',
      href: '/teams/',
    },
  }

  return (
    featureCtaMap[featureId] || {
      text: 'Get Started with SigNoz - Free',
      href: '/teams/',
    }
  )
}

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
    const firstFeature = featuresByCategory[category]?.[0]
    if (firstFeature) {
      setActiveTab(firstFeature.id)
    }
  }

  const activeCategoryFeatures = featuresByCategory[activeCategory] || []

  return (
    <div className="space-y-6">
      {/* Category Tabs with CTA */}
      <div className="flex items-center justify-between">
        <div className="inline-flex rounded-lg border border-signoz_slate-400/20 bg-signoz_ink-300/20 p-1">
          {Object.entries(FEATURE_CATEGORIES).map(([category, categoryInfo]) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-signoz_sienna-100 text-gray-700'
                  : 'text-signoz_vanilla-300 hover:text-signoz_vanilla-100'
              }`}
            >
              {categoryInfo.label}
            </button>
          ))}
        </div>

        {/* Dynamic CTA based on active feature */}
        <TrackingLink
          href={getFeatureCTA(activeFeature.id).href}
          clickType="Feature CTA"
          clickName={`${activeFeature.title} CTA`}
          clickLocation="Features Showcase Header"
          clickText={getFeatureCTA(activeFeature.id).text}
          className="bg-signoz_accent-300/10 text-signoz_accent-300 hover:bg-signoz_accent-300/20 flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-all"
        >
          {getFeatureCTA(activeFeature.id).text}
          <ArrowUpRight className="h-3 w-3" />
        </TrackingLink>
      </div>

      {/* Two Column Layout - 20/80 */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Left Sidebar - 20% (1 col) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-2">
            {activeCategoryFeatures.map((feature) => (
              <button
                key={feature.id}
                onClick={() => handleTabClick(feature.id)}
                className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-all ${
                  activeTab === feature.id
                    ? 'bg-signoz_accent-300/20 text-signoz_accent-300 ring-signoz_accent-300/30 ring-1'
                    : 'text-signoz_vanilla-300 hover:bg-signoz_ink-300/30 hover:text-signoz_vanilla-100'
                }`}
              >
                {feature.title}
              </button>
            ))}
          </div>
        </div>

        {/* Right Content - 80% (4 cols) */}
        <div className="lg:col-span-4">
          {/* Large Video Showcase */}
          <div className="mb-6 overflow-hidden rounded-xl border border-signoz_slate-400/20 bg-gradient-to-br from-signoz_ink-300/30 to-signoz_ink-400/30">
            <VideoPlayer
              thumbnailSrc={activeFeature.thumbnail}
              videoSrc={activeFeature.videoSrc}
              title={activeFeature.title}
              className="aspect-video w-full"
            />
          </div>

          {/* Tech Icons & CTA */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {activeFeature.techIcons.slice(0, 6).map((tech, index) => (
                <TechIcon key={index} icon={tech.icon} name={tech.name} />
              ))}
              {activeFeature.techIcons.length > 6 && (
                <span className="text-xs text-signoz_vanilla-400">
                  +{activeFeature.techIcons.length - 6} more
                </span>
              )}
            </div>

            <TrackingLink
              href={activeFeature.ctaLink.href}
              clickType="Primary CTA"
              clickName={`${activeFeature.title} CTA Link`}
              clickLocation="Features Showcase"
              clickText={activeFeature.ctaLink.text}
              className="bg-signoz_accent-300/10 text-signoz_accent-300 hover:bg-signoz_accent-300/20 flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-all"
            >
              {activeFeature.ctaLink.text}
              <ArrowUpRight className="h-3 w-3" />
            </TrackingLink>
          </div>
        </div>
      </div>
    </div>
  )
}
