'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

import TrackingLink from '@/components/TrackingLink'

import type { BentoFeature } from './FeatureBentoData'
import { FeatureVisual } from './FeatureBentoVisuals'
import { featureBentoAssets } from './featureBentoAssets'

export default function FeatureCard({ feature }: { feature: BentoFeature }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const asset = featureBentoAssets[feature.product] ?? null

  const handleMouseMove = (event: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    card.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative flex min-h-[340px] flex-col overflow-hidden rounded-md border border-[var(--l2-border)] bg-[var(--l2-background)] transition-[border-color] duration-200 focus-within:z-20 hover:z-20 hover:border-[color-mix(in_srgb,var(--l1-foreground)_16%,transparent)] ${feature.layout}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] opacity-0 transition-opacity duration-150 group-hover:opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, color-mix(in srgb, var(--l2-foreground) 34%, transparent) 0.8px, transparent 1.1px)',
          backgroundSize: '22px 22px',
          maskImage:
            'radial-gradient(170px circle at var(--mx, 50%) var(--my, 50%), #000 0%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(170px circle at var(--mx, 50%) var(--my, 50%), #000 0%, transparent 100%)',
        }}
      />

      <div className="relative z-[3] max-w-3xl p-5 pr-12 sm:p-6 sm:pr-14 wide:p-7">
        <h3 className="m-0 text-xl font-normal leading-relaxed tracking-tight text-[var(--l2-foreground)] wide:text-2xl">
          <span className="text-[var(--l1-foreground)]">{feature.product}</span> {feature.outcome}
        </h3>
      </div>

      <div className="relative z-[1] mt-auto min-h-[120px] flex-1 overflow-hidden border-t border-[var(--l2-border)]">
        {asset ? (
          <>
            <Image
              src={asset.src}
              alt={asset.alt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[2]"
              style={{
                background: 'linear-gradient(to bottom, transparent 25%, var(--l2-background) 96%)',
              }}
            />
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
