import React from 'react'
import Heading from '@/components/ui/Heading'
import SubHeading from '@/components/ui/SubHeading'
import SearchBar from '@/components/ui/SearchBar'

export default function Header() {
  const searchPlaceholders = [
    "Hey, I'm SigNoz AI! Ask me anything about SigNoz...",
    'How do I send Python traces to SigNoz?',
    'Instrument Node.js app for APM',
    'Set up log collection from Docker containers',
    'Migrate from Datadog to SigNoz',
    'Visualize Prometheus metrics in SigNoz',
    'How to send Kubernetes logs?',
    'Migrate from Grafana to SigNoz',
    'Set up SigNoz Cloud for my team',
  ]

  return (
    <div className="mx-auto mb-12 w-full max-w-6xl">
      <div className="text-center">
        <Heading type={1} className="mb-4">
          SigNoz Docs
        </Heading>
        <SubHeading className="mx-auto max-w-3xl text-signoz_vanilla-400">
          Learn how to monitor and troubleshoot your applications with SigNoz using step-by-step
          guides, reference docs, and video tutorials.
        </SubHeading>

        {/* Search Bar */}
        <div className="mt-8 flex justify-center">
          <SearchBar
            placeholder={searchPlaceholders}
            clickLocation="Docs Header"
            className="hidden w-full max-w-2xl sm:flex"
          />
        </div>
      </div>
    </div>
  )
}
