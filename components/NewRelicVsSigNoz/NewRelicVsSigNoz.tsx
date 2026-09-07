'use client'

import React from 'react'
import Button from '@/components/ui/Button'
import { Scale } from 'lucide-react'

export default function NewRelicVsSigNoz() {
  return (
    <div className="my-8 w-full">
      <div className="transform rounded-xl border border-[color-mix(in_srgb,var(--accent-primary)_25%,transparent)] bg-gradient-to-r from-[color-mix(in_srgb,var(--accent-primary)_12%,var(--l2-background))] to-[color-mix(in_srgb,var(--accent-sakura)_10%,var(--l2-background))] p-8 shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl dark:border-transparent dark:from-blue-900/90 dark:to-purple-900/90">
        <div className="space-y-4">
          <h3 className="my-0 text-2xl font-bold text-[var(--l1-foreground)] dark:text-[var(--base-white)]">
            Migrate from New Relic - Save up to 67% on your New Relic bill
          </h3>
          <p className="text-[var(--l2-foreground)] dark:text-gray-300">
            Tired of New Relic's user-based pricing? Even for teams of 10-15 devs, New Relic's
            pricing for user seats can be a significant portion of your monthly bill.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              href="/newrelic-alternative/"
              variant="legacyPrimary"
              id="newrelic-vs-signoz-compare-button"
              className="flex items-center gap-2"
            >
              <Scale className="h-4 w-4" />
              Compare SigNoz vs. New Relic
            </Button>
            <Button
              href="/teams/"
              variant="legacySecondary"
              id="grafana-vs-signoz-try-signoz-button"
            >
              Try SigNoz for Free &rarr;
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
