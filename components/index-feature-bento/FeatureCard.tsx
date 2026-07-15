'use client'

import { ArrowUpRight } from 'lucide-react'

import TrackingLink from '@/components/TrackingLink'

import type { BentoFeature } from './FeatureBentoData'
import { FeatureVisual } from './FeatureBentoVisuals'

export default function FeatureCard({ feature }: { feature: BentoFeature }) {
  return (
    <div
      className={`group border-border/25 bg-background hover:border-border/40 relative flex min-h-[430px] w-[82dvw] max-w-md shrink-0 snap-start flex-col overflow-hidden rounded-md border transition-[transform,border-color,box-shadow] duration-300 ease-out will-change-transform focus-within:z-20 hover:z-20 hover:scale-[1.012] hover:shadow-[0_24px_80px_rgba(0,0,0,0.38)] md:min-h-0 md:w-auto md:max-w-none ${feature.layout}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.06),transparent_30%),linear-gradient(180deg,rgba(11,12,14,0.12),rgba(11,12,14,0.82)_78%)]" />
      <div className="wide:p-7 relative z-10 p-5 sm:p-6">
        <TrackingLink
          aria-label={`${feature.product} ${feature.outcome}`}
          className="group/link focus-visible:ring-robin-500/70 relative block max-w-3xl rounded pr-9 no-underline focus:outline-none focus-visible:ring-2"
          clickLocation="Homepage Feature Bento"
          clickName={`${feature.product} Feature Card`}
          clickText={`${feature.product} ${feature.outcome}`}
          clickType="Feature Link"
          href={feature.href}
        >
          <h3 className="text-l1-foreground wide:text-2xl m-0 text-2xl leading-tight font-light tracking-tight md:text-xl">
            <span className="text-foreground group-hover:text-primary-foreground transition-colors">
              {feature.product}
            </span>{' '}
            <span className="text-muted-foreground/70">{feature.outcome}</span>
          </h3>
          <ArrowUpRight
            aria-hidden="true"
            className="text-robin-400 group-hover/link:text-robin-300 absolute top-1 right-0 h-5 w-5 opacity-75 transition-[opacity,transform,color] duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:opacity-100"
            strokeWidth={2}
          />
        </TrackingLink>
      </div>
      <FeatureVisual visual={feature.visual} />
    </div>
  )
}
