'use client'

import React, { useState, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { type FeatureShowcase } from './data'
import { getIcon } from './icons'
import { VideoPlayer } from './VideoPlayer'
import { ErrorBoundary } from './ErrorBoundary'
import TrackingLink from '../TrackingLink'
import TrackingButton from '../TrackingButton'
import Button, { BUTTON_TYPES } from '../Button/Button'

interface FeaturesShowcaseClientProps {
  featuresByCategory: Record<string, FeatureShowcase[]>
  defaultFeature: FeatureShowcase
  coreFeatures: FeatureShowcase[]
  extendedFeatures: FeatureShowcase[]
}

export const FeaturesShowcaseClient: React.FC<FeaturesShowcaseClientProps> = ({
  defaultFeature,
  coreFeatures,
  extendedFeatures,
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultFeature.id)
  const [loadedFeatures, setLoadedFeatures] = useState<FeatureShowcase[]>(coreFeatures)
  const [hasLoadedExtended, setHasLoadedExtended] = useState(false)

  const activeFeature = loadedFeatures.find((feature) => feature.id === activeTab) || defaultFeature

  const handleTabClick = (featureId: string) => {
    setActiveTab(featureId)

    // Load extended features if not already loaded and trying to access them
    if (!hasLoadedExtended && extendedFeatures.some((f) => f.id === featureId)) {
      setLoadedFeatures((prev) => [...prev, ...extendedFeatures])
      setHasLoadedExtended(true)
    }
  }

  // Load extended features when component is in viewport for better initial performance
  useEffect(() => {
    if (!hasLoadedExtended) {
      // Load immediately when user scrolls or interacts, or after initial render
      const loadExtended = () => {
        setLoadedFeatures((prev) => [...prev, ...extendedFeatures])
        setHasLoadedExtended(true)
      }

      // Load on any user interaction or after idle time
      const events = ['scroll', 'mousemove', 'keydown', 'touchstart']
      const handleUserActivity = () => {
        loadExtended()
        events.forEach((event) => document.removeEventListener(event, handleUserActivity))
      }

      // Add event listeners for user activity
      events.forEach((event) =>
        document.addEventListener(event, handleUserActivity, { passive: true })
      )

      // Fallback: load after idle time using requestIdleCallback
      const useIdleCallback = !!requestIdleCallback
      const idleCallback = useIdleCallback
        ? requestIdleCallback(loadExtended)
        : setTimeout(loadExtended, 500)

      return () => {
        events.forEach((event) => document.removeEventListener(event, handleUserActivity))
        if (useIdleCallback && typeof idleCallback === 'number') {
          cancelIdleCallback(idleCallback)
        } else if (typeof idleCallback === 'number') {
          clearTimeout(idleCallback)
        }
      }
    }
  }, [hasLoadedExtended, extendedFeatures])

  // Get all features for horizontal scroll
  const allFeatures = loadedFeatures

  return (
    <div className="relative">
      {/* Horizontal Scrollable Feature List */}
      <div className="relative mb-4 sm:mb-6 md:mb-8">
        <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-signoz_slate-400/20 overflow-x-auto">
          <div className="flex min-w-max gap-1 pb-2 sm:gap-2">
            {allFeatures.map((feature) => {
              // Show loading state for features not yet loaded
              const isLoading = !hasLoadedExtended && !coreFeatures.some((f) => f.id === feature.id)

              return (
                <TrackingButton
                  key={feature.id}
                  onClick={() => handleTabClick(feature.id)}
                  clickType="Feature Tab"
                  clickName={feature.title}
                  clickLocation="Features Showcase"
                  clickText={feature.title}
                  disabled={isLoading}
                  className={`flex-shrink-0 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-all sm:px-4 sm:py-2 sm:text-sm ${
                    activeTab === feature.id
                      ? 'bg-signoz_sienna-100 text-gray-800'
                      : isLoading
                        ? 'cursor-not-allowed bg-signoz_ink-300/10 text-signoz_vanilla-400 opacity-50'
                        : 'bg-signoz_ink-300/20 text-signoz_vanilla-300 hover:bg-signoz_ink-300/40 hover:text-signoz_vanilla-100'
                  }`}
                >
                  {feature.title}
                </TrackingButton>
              )
            })}
          </div>
        </div>
        {/* Scroll indicator gradient */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-signoz_ink-500 via-signoz_ink-500/50 to-transparent" />
      </div>

      {/* Responsive Layout - Stack on mobile, split on tablet/desktop */}
      <div className="relative flex flex-col overflow-hidden rounded-lg border border-signoz_slate-400/10 bg-signoz_ink-300/10 md:grid md:grid-cols-12 md:gap-0">
        {/* Video/Image Section */}
        <div className="border-b border-signoz_slate-400/10 md:order-1 md:col-span-7 md:border-b-0 md:border-r">
          <div className="h-full w-full">
            <ErrorBoundary>
              <VideoPlayer
                thumbnailSrc={activeFeature.thumbnail}
                videoSrc={activeFeature.videoSrc}
                imageSrc={activeFeature.imageSrc}
                title={activeFeature.title}
                className="aspect-video w-full object-cover"
                mediaType={activeFeature.mediaType}
                isActive={activeTab === activeFeature.id}
              />
            </ErrorBoundary>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex min-h-[20rem] flex-col px-4 py-6 sm:min-h-[24rem] sm:px-6 sm:py-8 md:order-2 md:col-span-5 md:min-h-[32rem] md:justify-between">
          {/* Main Content - Aligned to top */}
          <div>
            <p className="text-xl font-[600] font-medium leading-snug text-signoz_vanilla-400 sm:text-2xl sm:leading-snug md:text-2xl lg:text-3xl">
              {activeFeature.description}
            </p>
          </div>

          {/* Mobile-only: Tech Icons above CTA */}
          <div className="mt-6 flex flex-col gap-6 md:hidden">
            {/* Tech Icons for mobile */}
            <div className="flex flex-wrap items-center justify-start gap-2">
              {activeFeature.techIcons.slice(0, 5).map((tech, index) => {
                const icon = tech.iconKey ? getIcon(tech.iconKey) : tech.icon

                const iconElement = (
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-signoz_slate-400/10 bg-signoz_ink-300/20 transition-all hover:scale-105 hover:bg-signoz_ink-300/40">
                    {icon}
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

              {/* Additional CTAs for mobile */}
              {(activeFeature.techIcons.length === 0 || activeFeature.techIcons.length < 5) && (
                <TrackingLink
                  href={activeFeature.ctaLink.href}
                  clickType="Primary CTA Icon"
                  clickName={`${activeFeature.title} ${activeFeature.ctaLink.text}`}
                  clickLocation="Features Showcase"
                  clickText={activeFeature.ctaLink.text}
                  className="group flex items-center gap-1 rounded-lg border border-signoz_slate-400/10 bg-signoz_ink-300/20 px-2 py-1.5 text-xs transition-all hover:bg-signoz_ink-300/40"
                  title={activeFeature.ctaLink.text}
                >
                  <span className="whitespace-nowrap text-[10px] text-signoz_vanilla-400 group-hover:text-signoz_vanilla-300">
                    {activeFeature.ctaLink.text}
                  </span>
                  <ArrowUpRight className="h-2.5 w-2.5 text-signoz_vanilla-400 group-hover:text-signoz_vanilla-300" />
                </TrackingLink>
              )}

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
                    className="group flex items-center gap-1 rounded-lg border border-signoz_slate-400/10 bg-signoz_ink-300/20 px-2 py-1.5 text-xs transition-all hover:bg-signoz_ink-300/40"
                    title={cta.text}
                  >
                    <span className="whitespace-nowrap text-[10px] text-signoz_vanilla-400 group-hover:text-signoz_vanilla-300">
                      {cta.text}
                    </span>
                    <ArrowUpRight className="h-2.5 w-2.5 text-signoz_vanilla-400 group-hover:text-signoz_vanilla-300" />
                  </TrackingLink>
                ))}
            </div>

            {/* Primary CTA for mobile */}
            <div className="flex justify-start">
              <TrackingLink
                href="/teams/"
                clickType="Get Started CTA"
                clickName={`${activeFeature.title} Get Started`}
                clickLocation="Features Showcase"
                clickText="Get Started - Free"
              >
                <Button
                  type={BUTTON_TYPES.PRIMARY}
                  className="group w-full hover:scale-105 sm:w-auto"
                >
                  <span>Get Started - Free</span>
                  <ArrowUpRight className="h-3 w-3 transition duration-300 ease-in-out group-hover:translate-x-[2px] group-hover:translate-y-[-2px] sm:h-4 sm:w-4" />
                </Button>
              </TrackingLink>
            </div>
          </div>

          {/* Desktop-only: Primary CTA - Bottom Right */}
          <div className="mt-8 hidden md:flex md:justify-end">
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

        {/* Tech Icons & CTAs - Desktop only (hidden on mobile) */}
        <div className="hidden md:absolute md:bottom-8 md:left-6 md:flex md:items-center md:gap-3">
          {/* Tech Icons */}
          {activeFeature.techIcons.slice(0, 5).map((tech, index) => {
            const icon = tech.iconKey ? getIcon(tech.iconKey) : tech.icon

            const iconElement = (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-signoz_slate-400/10 bg-signoz_ink-300/20 transition-all hover:scale-105 hover:bg-signoz_ink-300/40 sm:h-12 sm:w-12">
                {icon}
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
              className="group flex items-center gap-1 rounded-lg border border-signoz_slate-400/10 bg-signoz_ink-300/20 px-2 py-1.5 text-xs transition-all hover:bg-signoz_ink-300/40 sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
              title={activeFeature.ctaLink.text}
            >
              <span className="whitespace-nowrap text-[10px] text-signoz_vanilla-400 group-hover:text-signoz_vanilla-300 sm:text-xs">
                {activeFeature.ctaLink.text}
              </span>
              <ArrowUpRight className="h-2.5 w-2.5 text-signoz_vanilla-400 group-hover:text-signoz_vanilla-300 sm:h-3 sm:w-3" />
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
                className="group flex items-center gap-1 rounded-lg border border-signoz_slate-400/10 bg-signoz_ink-300/20 px-2 py-1.5 text-xs transition-all hover:bg-signoz_ink-300/40 sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
                title={cta.text}
              >
                <span className="whitespace-nowrap text-[10px] text-signoz_vanilla-400 group-hover:text-signoz_vanilla-300 sm:text-xs">
                  {cta.text}
                </span>
                <ArrowUpRight className="h-2.5 w-2.5 text-signoz_vanilla-400 group-hover:text-signoz_vanilla-300 sm:h-3 sm:w-3" />
              </TrackingLink>
            ))}

          {/* Show "See All" if we have more than 5 total items */}
          {activeFeature.techIcons.length + 1 + (activeFeature.additionalCTAs?.length || 0) > 5 && (
            <TrackingLink
              href={activeFeature.ctaLink.href}
              clickType="See All Docs"
              clickName={`${activeFeature.title} See All`}
              clickLocation="Features Showcase"
              clickText={activeFeature.ctaLink.text}
              className="group flex items-center gap-1 rounded-lg border border-signoz_slate-400/10 bg-signoz_ink-300/20 px-2 py-1.5 text-xs transition-all hover:bg-signoz_ink-300/40 sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
              title="See all options"
            >
              <span className="whitespace-nowrap text-[10px] text-signoz_vanilla-400 group-hover:text-signoz_vanilla-300 sm:text-xs">
                {activeFeature.ctaLink.text}
              </span>
              <ArrowUpRight className="h-2.5 w-2.5 text-signoz_vanilla-400 group-hover:text-signoz_vanilla-300 sm:h-3 sm:w-3" />
            </TrackingLink>
          )}
        </div>
      </div>
    </div>
  )
}
