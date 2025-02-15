'use client'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

const RelatedJobs = () => {
  return (
    <div className="border-t border-signoz_ink-300 pt-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-6 text-xl font-semibold text-white">Related Jobs at SigNoz</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="https://jobs.gem.com/signoz/am9icG9zdDq9T1P3W7Wo_S8W95vmBUTm"
            target="_blank"
            className="group flex items-center justify-between rounded-lg border border-signoz_ink-300 bg-signoz_ink-400/50 p-4 transition-colors hover:border-signoz_robin-500"
          >
            <div>
              <h3 className="text-base font-medium text-white">Backend Engineer</h3>
              <p className="mt-1 text-sm text-gray-400">Remote</p>
            </div>
            <ExternalLink
              size={16}
              className="text-gray-400 transition-colors group-hover:text-white"
            />
          </Link>

          <Link
            href="https://jobs.gem.com/signoz/am9icG9zdDp2psmj00RLKrDBrAoeWtiJ"
            target="_blank"
            className="group flex items-center justify-between rounded-lg border border-signoz_ink-300 bg-signoz_ink-400/50 p-4 transition-colors hover:border-signoz_robin-500"
          >
            <div>
              <h3 className="text-base font-medium text-white">Site Reliability Engineer (SRE)</h3>
              <p className="mt-1 text-sm text-gray-400">Remote</p>
            </div>
            <ExternalLink
              size={16}
              className="text-gray-400 transition-colors group-hover:text-white"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RelatedJobs
