/** @jsxImportSource react */
import { ArrowRight } from 'lucide-react'

interface OpenTelemetryBannerProps {
  title: string
  ctaTitle?: string
  ctaText?: string
  date: string
  readingTime: string
  tags?: string[]
}

const OpenTelemetryBanner = ({ title, date, readingTime, tags = [] }: OpenTelemetryBannerProps) => {
  return (
    <div className="relative w-full px-4 py-12 md:py-16">
      {/* Dotted background pattern */}
      <div className="-z-10">
        <div className="bg-dot-pattern masked-dots absolute top-0 flex h-[200vh] w-full items-center justify-center opacity-100" />
        <div className="absolute left-0 right-0 top-0 mx-auto h-[600px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[1200px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col space-y-6">
          {/* Top row with tags and meta info */}
          <div className="flex items-start justify-between">
            {/* Tags */}
            <div className="flex w-3/4 flex-wrap items-center gap-3">
              <a
                href="/resource-center/opentelemetry/"
                target="_blank"
                className="flex w-fit items-center gap-2 rounded-full border border-signoz_ink-300 bg-signoz_ink-300/50 px-4 py-1.5 text-sm text-gray-400 transition-colors hover:border-signoz_robin-500 hover:text-white"
              >
                <span>Part of OpenTelemetry Track</span>
                <ArrowRight size={14} className="rotate-[-45deg]" />
              </a>
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-2 rounded-full bg-signoz_ink-300 px-4 py-1.5"
                >
                  <span className="text-sm font-medium text-white">{tag}</span>
                </div>
              ))}
            </div>

            {/* Meta info */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span>•</span>
              <span>{readingTime}</span>
            </div>
          </div>

          {/* Title section */}
          <div className="py-2">
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">{title}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpenTelemetryBanner
