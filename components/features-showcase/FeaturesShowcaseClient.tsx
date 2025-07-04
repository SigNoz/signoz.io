'use client'

import React, { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { FEATURES_SHOWCASE, type FeatureShowcase } from './data'
import { VideoPlayer } from './VideoPlayer'
import TrackingLink from '../TrackingLink'

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
      <div className="mb-8 overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-signoz_slate-400/20">
        <div className="flex gap-2 pb-2 min-w-max">
          {allFeatures.map((feature) => (
            <button
              key={feature.id}
              onClick={() => handleTabClick(feature.id)}
              className={`flex-shrink-0 rounded-md px-4 py-2 text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === feature.id
                  ? 'bg-signoz_robin-500 text-white'
                  : 'bg-signoz_ink-300/20 text-signoz_vanilla-300 hover:text-signoz_vanilla-100 hover:bg-signoz_ink-300/40'
              }`}
            >
              {feature.title}
            </button>
          ))}
        </div>
      </div>

      {/* 60-40 Split Layout */}
      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-0 border border-signoz_slate-400/10 rounded-lg overflow-hidden bg-signoz_ink-300/10">
        {/* Left: Video (60% - 7 cols) */}
        <div className="md:col-span-7 border-r border-signoz_slate-400/10">
          <div className="h-full w-full">
            <VideoPlayer
              thumbnailSrc={activeFeature.thumbnail}
              videoSrc={activeFeature.videoSrc}
              title={activeFeature.title}
              className="aspect-video w-full"
            />
          </div>
        </div>

        {/* Right: Content (40% - 5 cols) */}
        <div className="md:col-span-5 px-6 py-8 flex flex-col justify-between min-h-[32rem]">
          {/* Main Content - Aligned to top */}
          <div>
            <p className="text-2xl font-[600] text-signoz_vanilla-400 leading-snug sm:text-3xl sm:leading-snug">
              {activeFeature.description} Use existing tech stack and code from your repo.
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
              className="group inline-flex items-center gap-1.5 rounded-lg bg-signoz_robin-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-signoz_robin-600 hover:scale-105"
            >
              <span>Get Started - Free</span>
              <ArrowUpRight className="h-4 w-4 transition duration-300 ease-in-out group-hover:translate-x-[2px] group-hover:translate-y-[-2px]" />
            </TrackingLink>
          </div>
        </div>

        {/* Tech Icons - Bottom Left of entire component */}
        <div className="absolute bottom-4 left-4 flex items-center gap-3">
          {activeFeature.techIcons.slice(0, 4).map((tech, index) => {
            const iconElement = (
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-signoz_ink-300/20 border border-signoz_slate-400/10 transition-all hover:bg-signoz_ink-300/40 hover:scale-105">
                {tech.icon}
              </div>
            )
            
            return tech.href ? (
              <TrackingLink
                key={index}
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
              <div key={index} title={tech.name}>
                {iconElement}
              </div>
            )
          })}
          {activeFeature.techIcons.length > 4 && (
            <TrackingLink
              href={activeFeature.ctaLink.href}
              clickType="See All Docs"
              clickName={`${activeFeature.title} See All`}
              clickLocation="Features Showcase"
              clickText={activeFeature.ctaLink.text}
              className="group flex items-center gap-2 rounded-lg bg-signoz_ink-300/20 border border-signoz_slate-400/10 px-3 py-2 transition-all hover:bg-signoz_ink-300/40"
              title={activeFeature.ctaLink.text}
            >
              <span className="text-xs text-signoz_vanilla-400 group-hover:text-signoz_vanilla-300 whitespace-nowrap">
                {activeFeature.ctaLink.text}
              </span>
              <ArrowUpRight className="h-3 w-3 text-signoz_vanilla-400 group-hover:text-signoz_vanilla-300" />
            </TrackingLink>
          )}
        </div>
      </div>
    </div>
  )
}
