import Link from 'next/link'
import { ArrowRight, Server, Cloud } from 'lucide-react'
import TrackingLink from '../TrackingLink'

const HostingBanner = () => {
  return (
    <div className="mb-4 overflow-hidden rounded-lg border border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-900/80">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 border-b border-zinc-800 p-3 md:border-b-0 md:border-r">
          <div className="flex items-start gap-2">
            <Server className="h-4 w-4 text-zinc-400" />
            <h3 className="mt-0 text-sm font-medium text-zinc-200">
              Use Self Hosted SigNoz if you need
            </h3>
          </div>
          <ul className="mt-2 space-y-2 pl-6 text-xs">
            <li className="text-zinc-400">Full on-prem control</li>
            <li className="text-zinc-400">Custom build tweaks</li>
            <li className="text-zinc-400">Zero outbound traffic</li>
          </ul>
        </div>

        <div className="flex-1 p-3">
          <div className="flex items-start gap-2">
            <Cloud className="h-4 w-4 text-blue-400" />
            <h3 className="mt-0 text-sm font-medium text-blue-400">
              Otherwise, try SigNoz Cloud to
            </h3>
          </div>
          <ul className="mt-2 space-y-2 pl-6 text-xs">
            <li className="text-zinc-400">Onboard in 5 minutes</li>
            <li className="text-zinc-400">Auto-scale & upgrades</li>
            <li className="text-zinc-400">Zero ops maintenance</li>
          </ul>
          <TrackingLink
            href="/teams/"
            clickType="Primary CTA"
            clickName="Start your 30 day free trial"
            clickLocation="Hosting Decision Card"
            clickText="Start your 30 day free trial"
            className="group mt-2 inline-flex items-center text-xs font-medium text-blue-400 hover:text-blue-300"
          >
            Start your 30 day free trial
            <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
          </TrackingLink>
        </div>
      </div>
    </div>
  )
}

export default HostingBanner
