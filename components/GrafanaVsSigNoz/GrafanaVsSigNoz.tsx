'use client'

import React from 'react'
import Button from '../Button/Button'
import { Scale } from 'lucide-react'

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
            <Button>
              <a
                id="grafana-vs-signoz-compare-button"
                href="/product-comparison/signoz-vs-grafana/"
                style={{ textDecoration: 'none', color: 'inherit' }}
                className="flex items-center gap-2"
              >
                <Scale className="h-4 w-4" />
                Compare SigNoz vs. Grafana
              </a>
            </Button>
            <Button href="/teams/" type={Button.TYPES.SECONDARY}>
              <a id="grafana-vs-signoz-try-signoz-button" href="/teams/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Try SigNoz for Free &rarr;
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
