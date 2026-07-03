'use client'

import { ArrowUpRight } from 'lucide-react'

import TrackingLink from '@/components/TrackingLink'

import type { BentoFeature } from './FeatureBentoData'
import { FeatureVisual } from './FeatureBentoVisuals'

export default function FeatureCard({ feature }: { feature: BentoFeature }) {
  return (
    <div
      className={`group relative flex min-h-[430px] w-[82dvw] max-w-md shrink-0 snap-start flex-col overflow-hidden rounded-md border border-signoz_slate-400/25 bg-signoz_ink-500 transition-[transform,border-color,box-shadow] duration-300 ease-out will-change-transform focus-within:z-20 hover:z-20 hover:scale-[1.012] hover:border-signoz_slate-400/40 hover:shadow-[0_24px_80px_rgba(0,0,0,0.38)] md:min-h-0 md:w-auto md:max-w-none ${feature.layout}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.06),transparent_30%),linear-gradient(180deg,rgba(11,12,14,0.12),rgba(11,12,14,0.82)_78%)]" />
      <div className="relative z-10 p-5 sm:p-6 min-[1600px]:p-7">
        <TrackingLink
          aria-label={`${feature.product} ${feature.outcome}`}
          className="group/link relative block max-w-3xl rounded pr-9 no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-signoz_robin-500/70"
          clickLocation="Homepage Feature Bento"
          clickName={`${feature.product} Feature Card`}
          clickText={`${feature.product} ${feature.outcome}`}
          clickType="Feature Link"
          href={feature.href}
        >
          <h3 className="m-0 text-2xl font-light leading-tight tracking-tight text-signoz_vanilla-100 md:text-xl min-[1600px]:text-2xl">
            <span className="text-signoz_vanilla-100 transition-colors group-hover:text-signoz_robin-100">
              {feature.product}
            </span>{' '}
            <span className="text-signoz_vanilla-400/70">{feature.outcome}</span>
          </h3>
          <ArrowUpRight
            aria-hidden="true"
            className="absolute right-0 top-1 h-5 w-5 text-signoz_robin-400 opacity-75 transition-[opacity,transform,color] duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-signoz_robin-300 group-hover/link:opacity-100"
            strokeWidth={2}
          />
        </TrackingLink>
      </div>
      <FeatureVisual visual={feature.visual} />
    </div>
  )
}
