'use client'

import React from 'react'
import Heading from '@/components/ui/Heading'
import SubHeading from '@/components/ui/SubHeading'
import { ArrowDown, Server } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'

export default function Header() {
  return (
    <div className="mb-12 w-full max-w-6xl mx-auto">
      <div className="text-center">
        <Heading type={1} className="mb-4">
          SigNoz Docs
        </Heading>
        <SubHeading className="max-w-3xl mx-auto text-signoz_vanilla-400">
          Learn how to monitor and troubleshoot your applications with SigNoz using step-by-step guides, reference docs, and video tutorials.
        </SubHeading>
      </div>

      {/* Quick Start Buttons */}
      <div className="w-full max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mt-12 mb-12">
        <TrackingLink
          href="/docs/tutorial/opentelemetry-binary-usage-in-virtual-machine/"
          className="flex flex-col rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 p-6 hover:bg-signoz_ink-300 hover:border-signoz_robin-500 transition-all"
          clickType="Primary CTA"
          clickName="Quick Start Button"
          clickText="Get started with SigNoz Cloud"
          clickLocation="Docs Introduction Page Header"
        >
          <div className="flex items-center gap-3 mb-2">
            <ArrowDown size={24} className="text-signoz_robin-500" />
            <h2 className="text-xl font-semibold text-signoz_vanilla-100 mb-0">Quick Start</h2>
          </div>
          <p className="text-signoz_vanilla-400 text-left mb-0">Get started with SigNoz Cloud</p>
        </TrackingLink>

        <TrackingLink
          href="/docs/install/self-host/"
          className="flex flex-col rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 p-6 hover:bg-signoz_ink-300 hover:border-signoz_robin-500 transition-all"
          clickType="Secondary CTA"
          clickName="Install Locally Button"
          clickText="Get started with self-hosted SigNoz"
          clickLocation="Docs Introduction Page Header"
        >
          <div className="flex items-center gap-3 mb-2">
            <Server size={24} className="text-signoz_robin-500" />
            <h2 className="text-xl font-semibold text-signoz_vanilla-100 mb-0">Install Locally</h2>
          </div>
          <p className="text-signoz_vanilla-400 text-left mb-0">Get started with self-hosted SigNoz</p>
        </TrackingLink>
      </div>
    </div>
  )
}
