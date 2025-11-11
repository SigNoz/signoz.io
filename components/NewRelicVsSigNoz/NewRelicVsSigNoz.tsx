'use client'

import React from 'react'
import Button from '../Button/Button'
import { Scale } from 'lucide-react'

export default function NewRelicVsSigNoz() {
  return (
    <div className="my-8 w-full">
      <div className="transform rounded-xl bg-gradient-to-r from-blue-900/90 to-purple-900/90 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        <div className="space-y-4">
          <h3 className="my-0 text-2xl font-bold text-white">
          Migrate from New Relic - Save up to 67% on your New Relic bill
          </h3>
          <p className="text-gray-300">
            Tired of New Relic's user-based pricing? Even for teams of 10-15 devs, New Relic's pricing for user seats can be a significant portion of your monthly bill.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button>
              <a
                id="newrelic-vs-signoz-compare-button"
                href="/product-comparison/signoz-vs-newrelic/"
                style={{ textDecoration: 'none', color: 'inherit' }}
                className="flex items-center gap-2"
              >
                <Scale className="h-4 w-4" />
                Compare SigNoz vs. New Relic
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
