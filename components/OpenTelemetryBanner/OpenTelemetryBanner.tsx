
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
    <div className="relative overflow-hidden">
      <div className="relative w-full px-4 py-8 sm:py-12 md:py-16">
        {/* Dotted background pattern */}
        <div className="-z-10">
          <div className="bg-dot-pattern masked-dots absolute inset-0 flex items-center justify-center opacity-100" />
          <div className="absolute left-0 right-0 top-0 mx-auto h-[600px] w-full flex-shrink-0 rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)] bg-[length:110%] bg-no-repeat opacity-30 blur-[300px] sm:bg-[center_-500px] md:h-[1200px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col space-y-6">
            {/* Top row with tags and meta info */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 sm:w-3/4 sm:gap-3">
                <a
                  href="/resource-center/opentelemetry/"
                  target="_blank"
                  className="flex w-fit items-center gap-2 rounded-full border border-signoz_ink-300 bg-signoz_ink-300/50 px-3 py-1 text-xs text-gray-400 transition-colors hover:border-signoz_robin-500 hover:text-white sm:px-4 sm:py-1.5 sm:text-sm"
                >
                  <span>Part of OpenTelemetry Track</span>
                  <ArrowRight size={14} className="rotate-[-45deg]" />
                </a>
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-2 rounded-full bg-signoz_ink-300 px-3 py-1 sm:px-4 sm:py-1.5"
                  >
                    <span className="text-xs font-medium text-white sm:text-sm">{tag}</span>
                  </div>
                ))}
              </div>

              {/* Meta info */}
              <div className="flex items-center gap-2 text-xs text-gray-400 sm:text-sm">
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
              <h1 className="text-3xl font-bold leading-normal sm:leading-normal md:leading-normal text-white sm:text-4xl md:text-5xl">
                {title}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpenTelemetryBanner
