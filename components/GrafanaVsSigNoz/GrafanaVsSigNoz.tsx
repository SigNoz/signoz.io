'use client'

import React from 'react'
import Button from '../Button/Button'
import { Scale } from 'lucide-react'
import Link from 'next/link'
export default function GrafanaVsSigNoz() {
  return (
    <div className="my-8 w-full">
      <div className="transform rounded-xl bg-gradient-to-r from-blue-900/90 to-purple-900/90 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        <div className="space-y-4">
          <h3 className="my-0 text-2xl font-bold text-white">
            Migrate from Grafana - Save up to 45% on your Grafana bill
          </h3>
          <p className="text-gray-300">
            Tired of juggling multiple tools for observability? SigNoz gives you logs, metrics and traces in a single unified platform - making troubleshooting simpler.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              id="grafana-vs-signoz-compare-button"
              href="/product-comparison/signoz-vs-grafana/"
              className="flex items-center no-underline gap-2"
            >
              <Button type={Button.TYPES.SECONDARY}>
                <Scale className="h-4 w-4" />
                Compare SigNoz vs. Grafana
              </Button>
            </Link>
            <Link
              id="grafana-vs-signoz-try-signoz-button" 
              href="/teams/"
              className="flex items-center no-underline gap-2"
            >
              <Button>
                Try SigNoz for Free &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
