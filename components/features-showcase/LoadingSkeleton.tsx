import React from 'react'

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="relative">
      {/* Tab skeleton */}
      <div className="mb-8 overflow-hidden">
        <div className="flex gap-2 pb-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-10 w-24 animate-pulse rounded-md bg-signoz_slate-400/20"
            />
          ))}
        </div>
      </div>

      {/* Content skeleton */}
      <div className="relative grid grid-cols-1 gap-0 overflow-hidden rounded-lg border border-signoz_slate-400/10 bg-signoz_ink-300/10 md:grid-cols-12">
        {/* Left: Video skeleton */}
        <div className="border-r border-signoz_slate-400/10 md:col-span-7">
          <div className="aspect-video w-full animate-pulse bg-signoz_slate-400/20" />
        </div>

        {/* Right: Content skeleton */}
        <div className="flex min-h-[32rem] flex-col justify-between px-6 py-8 md:col-span-5">
          <div className="space-y-4">
            <div className="h-8 w-full animate-pulse rounded bg-signoz_slate-400/20" />
            <div className="h-8 w-3/4 animate-pulse rounded bg-signoz_slate-400/20" />
          </div>
          <div className="flex justify-end">
            <div className="h-12 w-40 animate-pulse rounded bg-signoz_slate-400/20" />
          </div>
        </div>
      </div>
    </div>
  )
}