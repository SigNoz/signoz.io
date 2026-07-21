'use client'

import dynamic from 'next/dynamic'
import { useSyncExternalStore } from 'react'

const DESKTOP_MEDIA_QUERY = '(min-width: 768px)'
const HERO_GRADIENT_COLORS = ['#0B0C0E', '#121317', '#161922', '#2C3140', '#3F5ECC']

const GradientBlinds = dynamic(() => import('./GradientBlinds'), { ssr: false })

function subscribeToDesktopViewport(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY)
  mediaQuery.addEventListener('change', onStoreChange)
  return () => mediaQuery.removeEventListener('change', onStoreChange)
}

function getDesktopViewportSnapshot() {
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches
}

function getServerViewportSnapshot() {
  return false
}

export default function HomepageHeroShader() {
  const isDesktop = useSyncExternalStore(
    subscribeToDesktopViewport,
    getDesktopViewportSnapshot,
    getServerViewportSnapshot
  )

  if (!isDesktop) return null

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-0 hidden h-[640px] w-full max-w-8xl -translate-x-1/2 [mask-image:linear-gradient(to_bottom,#000_0%,#000_58%,rgba(0,0,0,0.72)_72%,transparent_100%)] md:block"
      data-homepage-hero-shader
    >
      <GradientBlinds
        angle={20}
        blindCount={16}
        blindMinWidth={60}
        className="h-full w-full"
        distortAmount={0}
        dpr={1}
        gradientColors={HERO_GRADIENT_COLORS}
        mixBlendMode="lighten"
        mouseDampening={0.15}
        noise={0.4}
        shineDirection="left"
        spotlightOpacity={0.55}
        spotlightRadius={0.46}
        spotlightSoftness={1.2}
      />
    </div>
  )
}
