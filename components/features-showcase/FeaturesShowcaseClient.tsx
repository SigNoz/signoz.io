'use client'

import React, { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { FEATURES_SHOWCASE, type FeatureShowcase } from './data'
import { VideoPlayer } from './VideoPlayer'
import TrackingLink from '../TrackingLink'
import Button, { BUTTON_TYPES } from '../Button/Button'

interface FeaturesShowcaseClientProps {
  featuresByCategory: Record<string, FeatureShowcase[]>
  defaultFeature: FeatureShowcase
}

export const FeaturesShowcaseClient: React.FC<FeaturesShowcaseClientProps> = ({
  defaultFeature,
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultFeature.id)

  const activeFeature =
    FEATURES_SHOWCASE.find((feature) => feature.id === activeTab) || defaultFeature

  const handleTabClick = (featureId: string) => {
    setActiveTab(featureId)
  }

  // Get all features for horizontal scroll
  const allFeatures = FEATURES_SHOWCASE

  return (
    <div className="relative">
      {/* Horizontal Scrollable Feature List */}
      <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-signoz_slate-400/20 mb-8 overflow-x-auto">
        <div className="flex min-w-max gap-2 pb-2">
          {allFeatures.map((feature) => (
            <button
              key={feature.id}
              onClick={() => handleTabClick(feature.id)}
              className={`flex-shrink-0 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-all ${
                activeTab === feature.id
                  ? 'bg-signoz_sienna-100 text-gray-800'
                  : 'bg-signoz_ink-300/20 text-signoz_vanilla-300 hover:bg-signoz_ink-300/40 hover:text-signoz_vanilla-100'
              }`}
            >
              {feature.title}
            </button>
          ))}
        </div>
      </div>

      {/* 60-40 Split Layout */}
      <div className="relative grid grid-cols-1 gap-0 overflow-hidden rounded-lg border border-signoz_slate-400/10 bg-signoz_ink-300/10 md:grid-cols-12">
        {/* Left: Video (60% - 7 cols) */}
        <div className="border-r border-signoz_slate-400/10 md:col-span-7">
          <div className="h-full w-full">
            <VideoPlayer
              key={activeFeature.id}
              thumbnailSrc={activeFeature.thumbnail}
              videoSrc={activeFeature.videoSrc}
              imageSrc={activeFeature.imageSrc}
              title={activeFeature.title}
              className="aspect-video w-full"
              mediaType={activeFeature.mediaType}
            />
          </div>
        </div>

        {/* Right: Content (40% - 5 cols) */}
        <div className="flex min-h-[32rem] flex-col justify-between px-6 py-8 md:col-span-5">
          {/* Main Content - Aligned to top */}
          <div>
            <p className="text-2xl font-[600] font-medium leading-snug text-signoz_vanilla-400 sm:text-3xl sm:leading-snug">
              {activeFeature.description}
            </p>
          </div>

          {/* Primary CTA - Bottom Right */}
          <div className="flex justify-end">
            <TrackingLink
              href="/teams/"
              clickType="Get Started CTA"
              clickName={`${activeFeature.title} Get Started`}
              clickLocation="Features Showcase"
              clickText="Get Started - Free"
            >
              <Button type={BUTTON_TYPES.PRIMARY} className="group hover:scale-105">
                <span>Get Started - Free</span>
                <ArrowUpRight className="h-4 w-4 transition duration-300 ease-in-out group-hover:translate-x-[2px] group-hover:translate-y-[-2px]" />
              </Button>
            </TrackingLink>
          </div>
        </div>

        {/* All CTAs - Bottom Left of entire component */}
        <div className="absolute bottom-8 left-6 flex items-center gap-3">
          {/* Tech Icons */}
          {activeFeature.techIcons.slice(0, 5).map((tech, index) => {
            const iconElement = (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-signoz_slate-400/10 bg-signoz_ink-300/20 transition-all hover:scale-105 hover:bg-signoz_ink-300/40">
                {tech.icon}
              </div>
            )

            return tech.href ? (
              <TrackingLink
                key={`tech-${index}`}
                href={tech.href}
                clickType="Tech Icon"
                clickName={tech.name}
                clickLocation="Features Showcase"
                clickText={tech.name}
                className="block"
                title={`${tech.name} documentation`}
              >
                {iconElement}
              </TrackingLink>
            ) : (
              <div key={`tech-${index}`} title={tech.name}>
                {iconElement}
              </div>
            )
          })}

          {/* Primary CTA as icon if no tech icons or if we have space */}
          {(activeFeature.techIcons.length === 0 || activeFeature.techIcons.length < 5) && (
            <TrackingLink
              href={activeFeature.ctaLink.href}
              clickType="Primary CTA Icon"
              clickName={`${activeFeature.title} ${activeFeature.ctaLink.text}`}
              clickLocation="Features Showcase"
              clickText={activeFeature.ctaLink.text}
              className="group flex items-center gap-2 rounded-lg border border-signoz_slate-400/10 bg-signoz_ink-300/20 px-3 py-2 transition-all hover:bg-signoz_ink-300/40"
              title={activeFeature.ctaLink.text}
            >
              <span className="whitespace-nowrap text-xs text-signoz_vanilla-400 group-hover:text-signoz_vanilla-300">
                {activeFeature.ctaLink.text}
              </span>
              <ArrowUpRight className="h-3 w-3 text-signoz_vanilla-400 group-hover:text-signoz_vanilla-300" />
            </TrackingLink>
          )}

          {/* Additional CTAs as icons */}
          {activeFeature.additionalCTAs
            ?.slice(0, 5 - activeFeature.techIcons.length - 1)
            .map((cta, index) => (
              <TrackingLink
                key={`additional-${index}`}
                href={cta.href}
                clickType="Additional CTA Icon"
                clickName={`${activeFeature.title} ${cta.text}`}
                clickLocation="Features Showcase"
                clickText={cta.text}
                className="group flex items-center gap-2 rounded-lg border border-signoz_slate-400/10 bg-signoz_ink-300/20 px-3 py-2 transition-all hover:bg-signoz_ink-300/40"
                title={cta.text}
              >
                <span className="whitespace-nowrap text-xs text-signoz_vanilla-400 group-hover:text-signoz_vanilla-300">
                  {cta.text}
                </span>
                <ArrowUpRight className="h-3 w-3 text-signoz_vanilla-400 group-hover:text-signoz_vanilla-300" />
              </TrackingLink>
            ))}

          {/* Show "See All" if we have more than 5 total items */}
          {activeFeature.techIcons.length + 1 + (activeFeature.additionalCTAs?.length || 0) > 5 && (
            <TrackingLink
              href={activeFeature.ctaLink.href}
              clickType="See All Docs"
              clickName={`${activeFeature.title} See All`}
              clickLocation="Features Showcase"
              clickText="See All"
              className="group flex items-center gap-2 rounded-lg border border-signoz_slate-400/10 bg-signoz_ink-300/20 px-3 py-2 transition-all hover:bg-signoz_ink-300/40"
              title="See all options"
            >
              <span className="whitespace-nowrap text-xs text-signoz_vanilla-400 group-hover:text-signoz_vanilla-300">
                See All
              </span>
              <ArrowUpRight className="h-3 w-3 text-signoz_vanilla-400 group-hover:text-signoz_vanilla-300" />
            </TrackingLink>
          )}
        </div>
      </div>
    </div>
  )
}
