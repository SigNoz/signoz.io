'use client'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

const RelatedJobs = () => {
  return (
    <div className="pt-8 sm:pt-12 md:pt-16">
      <div className="mx-auto flex max-w-4xl flex-col items-start lg:flex-row lg:justify-between">
        <h2 className="mb-4 w-full text-lg font-semibold text-white sm:text-xl lg:mb-0 lg:w-1/3">
          Related Jobs at SigNoz
        </h2>
        <div className="w-full space-y-3 sm:space-y-4 lg:w-2/3">
          <Link
            href="https://signoz.io/careers/"
            target="_blank"
            className="group flex items-center justify-between rounded-lg border border-signoz_ink-300 bg-signoz_ink-400/50 p-4 transition-colors hover:border-signoz_robin-500 sm:p-6"
          >
            <div>
              <h3 className="text-base font-medium text-white sm:text-lg">Backend Engineer</h3>
              <p className="mt-1 text-xs text-gray-400 sm:mt-2 sm:text-sm">Remote</p>
            </div>
            <ExternalLink
              size={20}
              className="text-gray-400 transition-colors group-hover:text-white"
            />
          </Link>

          <Link
            href="https://signoz.io/careers/"
            target="_blank"
            className="group flex items-center justify-between rounded-lg border border-signoz_ink-300 bg-signoz_ink-400/50 p-4 transition-colors hover:border-signoz_robin-500 sm:p-6"
          >
            <div>
              <h3 className="text-base font-medium text-white sm:text-lg">
                Site Reliability Engineer (SRE)
              </h3>
              <p className="mt-1 text-xs text-gray-400 sm:mt-2 sm:text-sm">Remote</p>
            </div>
            <ExternalLink
              size={20}
              className="text-gray-400 transition-colors group-hover:text-white"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RelatedJobs
