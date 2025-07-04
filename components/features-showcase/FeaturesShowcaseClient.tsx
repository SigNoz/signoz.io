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

const TechIcon = ({ icon, name, href }: { icon: React.ReactNode; name: string; href?: string }) => {
  const content = (
    <div
      className={`group relative flex h-12 w-12 items-center justify-center rounded-md border transition-all ${
        href
          ? 'cursor-pointer border-signoz_slate-400/20 bg-signoz_ink-300/20 hover:scale-105 hover:border-signoz_robin-400/50 hover:bg-signoz_robin-500/10'
          : 'border-signoz_slate-400/20 bg-signoz_ink-300/20'
      }`}
      title={href ? `Click to see ${name} docs` : name}
    >
      <div className="text-sm">{icon}</div>
      <div
        className={`absolute -top-10 left-1/2 z-10 hidden -translate-x-1/2 transform rounded px-2 py-1 text-xs group-hover:block ${
          href ? 'bg-signoz_robin-500 text-white' : 'bg-signoz_ink-200 text-signoz_vanilla-100'
        }`}
      >
        {href ? `${name} docs` : name}
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  return content
}

const getFeatureCTA = (featureId: string) => {
  const featureCtaMap: Record<string, { text: string; href: string; urgency?: string }> = {
    apm: {
      text: 'Start Free Trial',
      href: '/teams/',
      urgency: 'No credit card required • 30-day trial',
    },
    'log-management': {
      text: 'Try Log Management Free',
      href: '/teams/',
      urgency: 'Save 80% vs competitors',
    },
    infrastructure: {
      text: 'Monitor Infrastructure Free',
      href: '/teams/',
      urgency: 'Full-stack visibility in minutes',
    },
    tracing: {
      text: 'Start Tracing Free',
      href: '/teams/',
      urgency: 'Debug issues 90% faster',
    },
    metrics: {
      text: 'Try Custom Metrics',
      href: '/teams/',
      urgency: 'Unlimited custom metrics',
    },
    dashboards: {
      text: 'Create Dashboards Free',
      href: '/teams/',
      urgency: 'Pre-built templates included',
    },
    exceptions: {
      text: 'Track Exceptions Free',
      href: '/teams/',
      urgency: 'Reduce MTTR by 50%',
    },
    alerts: {
      text: 'Set Up Alerts Free',
      href: '/teams/',
      urgency: 'Smart alerting, less noise',
    },
    aws: {
      text: 'Monitor AWS Free',
      href: '/teams/',
      urgency: 'One-click AWS integration',
    },
    azure: {
      text: 'Try Azure Monitoring',
      href: '/teams/',
      urgency: 'Enterprise-ready solution',
    },
    gcp: {
      text: 'Monitor GCP Free',
      href: '/teams/',
      urgency: 'Native GCP integration',
    },
    'llm-monitoring': {
      text: 'Monitor LLMs Free',
      href: '/teams/',
      urgency: 'Track tokens & performance',
    },
  }

  return (
    featureCtaMap[featureId] || {
      text: 'Start Free Trial',
      href: '/teams/',
      urgency: 'Join 5000+ engineering teams',
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex w-full overflow-x-auto rounded-lg border border-signoz_slate-400/20 bg-signoz_ink-300/20 p-1 sm:w-auto">
          {Object.entries(FEATURE_CATEGORIES).map(([category, categoryInfo]) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium transition-all sm:px-4 sm:text-sm ${
                activeCategory === category
                  ? 'bg-signoz_sienna-100 text-gray-700'
                  : 'text-signoz_vanilla-300 hover:text-signoz_vanilla-100'
              }`}
            >
              {categoryInfo.label}
            </button>
          ))}
        </div>

        {/* Dynamic CTA based on active feature - Hidden on mobile, shown on desktop */}
        <div className="hidden flex-col items-end gap-1 sm:flex">
          <TrackingLink
            href={getFeatureCTA(activeFeature.id).href}
            clickType="Feature CTA"
            clickName={`${activeFeature.title} CTA`}
            clickLocation="Features Showcase Header"
            clickText={getFeatureCTA(activeFeature.id).text}
            className="flex items-center gap-1 rounded-lg bg-signoz_robin-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-signoz_robin-600"
          >
            {getFeatureCTA(activeFeature.id).text}
            <ArrowUpRight className="h-3 w-3" />
          </TrackingLink>
          {getFeatureCTA(activeFeature.id).urgency && (
            <span className="text-xs text-signoz_vanilla-400">
              {getFeatureCTA(activeFeature.id).urgency}
            </span>
          )}
        </div>
      </div>

      {/* Two Column Layout - Mobile responsive */}
      <div className="space-y-6 lg:grid lg:grid-cols-5 lg:gap-8 lg:space-y-0">
        {/* Feature Tabs - Horizontal scroll on mobile, vertical sidebar on desktop */}
        <div className="lg:col-span-1">
          <div className="flex gap-2 overflow-x-auto rounded-xl border border-signoz_slate-400/10 bg-signoz_ink-300/20 p-3 backdrop-blur-md lg:sticky lg:top-24 lg:block lg:space-y-2 lg:overflow-visible">
            {activeCategoryFeatures.map((feature) => (
              <button
                key={feature.id}
                onClick={() => handleTabClick(feature.id)}
                className={`relative flex-shrink-0 rounded-lg px-4 py-3 text-left text-sm font-medium transition-all lg:w-full ${
                  activeTab === feature.id
                    ? 'bg-signoz_accent-300/20 text-signoz_accent-300 ring-signoz_accent-300/30 shadow-lg ring-1'
                    : 'text-signoz_vanilla-300 hover:bg-signoz_ink-300/30 hover:text-signoz_vanilla-100'
                }`}
              >
                <span className="flex flex-wrap items-center justify-between whitespace-nowrap lg:whitespace-normal">
                  <span>{feature.title}</span>
                  {feature.badge && (
                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${
                        feature.badge.type === 'popular'
                          ? 'bg-signoz_robin-500/20 text-signoz_robin-400'
                          : feature.badge.type === 'new'
                            ? 'bg-signoz_forest-500/20 text-signoz_forest-400'
                            : 'bg-signoz_sakura-500/20 text-signoz_sakura-400'
                      }`}
                    >
                      {feature.badge.text}
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Content - 80% (4 cols) */}
        <div className="lg:col-span-4">
          {/* Mobile CTA - Shows only on mobile */}
          <div className="mb-4 flex flex-col items-center gap-1 sm:hidden">
            <TrackingLink
              href={getFeatureCTA(activeFeature.id).href}
              clickType="Feature CTA Mobile"
              clickName={`${activeFeature.title} CTA Mobile`}
              clickLocation="Features Showcase Mobile"
              clickText={getFeatureCTA(activeFeature.id).text}
              className="flex w-full items-center justify-center gap-1 rounded-lg bg-signoz_robin-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-signoz_robin-600"
            >
              {getFeatureCTA(activeFeature.id).text}
              <ArrowUpRight className="h-3 w-3" />
            </TrackingLink>
            {getFeatureCTA(activeFeature.id).urgency && (
              <span className="text-center text-xs text-signoz_vanilla-400">
                {getFeatureCTA(activeFeature.id).urgency}
              </span>
            )}
          </div>

          {/* Large Video Showcase */}
          <div className="relative mb-3 overflow-hidden rounded-xl bg-gradient-to-br from-signoz_ink-300/30 to-signoz_ink-400/30">
            {activeFeature.badge && (
              <div className="absolute left-4 top-4 z-10">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium backdrop-blur-sm ${
                    activeFeature.badge.type === 'popular'
                      ? 'bg-signoz_robin-500/80 text-white'
                      : activeFeature.badge.type === 'new'
                        ? 'bg-signoz_forest-500/80 text-white'
                        : 'bg-signoz_sakura-500/80 text-white'
                  }`}
                >
                  {activeFeature.badge.text}
                </span>
              </div>
            )}
            <VideoPlayer
              thumbnailSrc={activeFeature.thumbnail}
              videoSrc={activeFeature.videoSrc}
              title={activeFeature.title}
              className="aspect-video w-full"
            />
          </div>

          {/* Subtle Caption */}
          <div className="mb-8">
            <p className="text-center text-sm text-signoz_vanilla-400">
              {activeFeature.description}
            </p>
          </div>

          {/* Tech Icons & CTA */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                {activeFeature.techIcons.slice(0, 6).map((tech, index) => (
                  <TechIcon key={index} icon={tech.icon} name={tech.name} href={tech.href} />
                ))}
                {activeFeature.techIcons.length > 6 && (
                  <span className="text-xs text-signoz_vanilla-400">and many more</span>
                )}
              </div>
              <span className="text-signoz_vanilla-500 text-xs">
                Select your tech stack to get started
              </span>
            </div>

            <TrackingLink
              href={activeFeature.ctaLink.href}
              clickType="See All CTA"
              clickName={`${activeFeature.title} See All`}
              clickLocation="Features Showcase"
              clickText={activeFeature.ctaLink.text}
              className="flex items-center gap-1 rounded-lg border border-signoz_slate-400/30 bg-signoz_ink-300/20 px-4 py-2 text-sm font-medium text-signoz_vanilla-100 transition-all hover:bg-signoz_ink-300/40"
            >
              {activeFeature.ctaLink.text}
              <ArrowUpRight className="h-4 w-4" />
            </TrackingLink>
          </div>
        </div>
      </div>
    </div>
  )
}
