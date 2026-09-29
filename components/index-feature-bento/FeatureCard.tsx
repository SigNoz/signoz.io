'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

import TrackingLink from '@/components/TrackingLink'

import type { BentoFeature } from './FeatureBentoData'
import { FeatureVisual } from './FeatureBentoVisuals'
import { featureBentoAssets } from './featureBentoAssets'

const SPOT_SIZE = 340
const DOT_GRID = 22

export default function FeatureCard({ feature }: { feature: BentoFeature }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const frame = useRef(0)
  const asset = featureBentoAssets[feature.product] ?? null

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const handleMouseMove = (event: React.MouseEvent) => {
    pointer.current = { x: event.clientX, y: event.clientY }
    if (frame.current) return
    frame.current = requestAnimationFrame(() => {
      frame.current = 0
      const card = cardRef.current
      const spot = spotRef.current
      if (!card || !spot) return
      const rect = card.getBoundingClientRect()
      const left = pointer.current.x - rect.left - SPOT_SIZE / 2
      const top = pointer.current.y - rect.top - SPOT_SIZE / 2
      spot.style.transform = `translate3d(${left}px, ${top}px, 0)`
      spot.style.backgroundPosition = `${-(((left % DOT_GRID) + DOT_GRID) % DOT_GRID)}px ${-(((top % DOT_GRID) + DOT_GRID) % DOT_GRID)}px`
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative flex min-h-[340px] flex-col overflow-hidden rounded-md border border-[var(--l2-border)] bg-[var(--l1-background)] transition-[border-color] duration-200 hover:border-[color-mix(in_srgb,var(--l1-foreground)_16%,transparent)] ${feature.layout}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      >
        <div
          ref={spotRef}
          className="absolute left-0 top-0 opacity-0 transition-opacity duration-150 will-change-transform group-hover:opacity-70"
          style={{
            width: SPOT_SIZE,
            height: SPOT_SIZE,
            transform: 'translate3d(-9999px, -9999px, 0)',
            backgroundImage:
              'radial-gradient(circle at center, color-mix(in srgb, var(--l2-foreground) 34%, transparent) 0.8px, transparent 1.1px)',
            backgroundSize: `${DOT_GRID}px ${DOT_GRID}px`,
            maskImage: 'radial-gradient(closest-side, #000 0%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(closest-side, #000 0%, transparent 100%)',
          }}
        />
      </div>

      <div className="relative z-[3] max-w-3xl p-5 pr-12 sm:p-6 sm:pr-14 wide:p-7">
        <h3 className="m-0 text-xl font-normal leading-relaxed tracking-tight text-[var(--l2-foreground)] wide:text-2xl">
          <span className="text-[var(--l1-foreground)]">{feature.product}</span> {feature.outcome}
        </h3>
      </div>

      <div className="relative z-[1] mt-auto min-h-[120px] flex-1 transform-gpu overflow-hidden">
        {asset ? (
          <>
            <Image
              src={asset.src}
              alt={asset.alt}
              fill
              className={
                asset.className ?? (asset.fit === 'contain' ? 'object-contain' : 'object-cover')
              }
              style={
                asset.className ? undefined : { objectPosition: asset.objectPosition ?? 'bottom' }
              }
              sizes="(max-width: 768px) 100vw, 70vw"
              quality={95}
            />
            {asset.fadeTop && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(to_bottom,var(--l1-background)_16px,transparent)]"
              />
            )}
          </>
        ) : (
          <FeatureVisual visual={feature.visual} />
        )}
      </div>

      {feature.href && (
        <TrackingLink
          aria-label={`${feature.product} ${feature.outcome}`}
          className="absolute inset-0 z-[5] rounded-md no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-background)]"
          clickLocation="Homepage Feature Bento"
          clickName={`${feature.product} Feature Card`}
          clickText={`${feature.product} ${feature.outcome}`}
          clickType="Feature Link"
          href={feature.href}
        >
          <span
            aria-hidden="true"
            className="absolute bottom-4 right-4 z-[6] grid h-10 w-10 place-items-center rounded-full border border-[color-mix(in_srgb,var(--l1-foreground)_8%,transparent)] bg-[var(--l3-background)] text-[var(--l1-foreground)] opacity-100 transition-[opacity,background-color] duration-150 group-hover:bg-[var(--l3-background-hover)] md:opacity-0 md:group-focus-within:opacity-100 md:group-hover:opacity-100"
          >
            <ArrowUpRight size={16} strokeWidth={2} />
          </span>
        </TrackingLink>
      )}
    </div>
  )
}
