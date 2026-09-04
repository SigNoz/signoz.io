'use client'

import React from 'react'
import Button from '@/components/ui/Button'
import { Scale } from 'lucide-react'
import Link from 'next/link'

interface GrafanaVsSigNozProps {
  variant?: 'default' | 'pricing'
}

export default function GrafanaVsSigNoz({ variant = 'default' }: GrafanaVsSigNozProps) {
  const pricingFocused = variant === 'pricing'

  return (
    <div className="my-8 w-full">
      <div className="transform rounded-xl border border-[color-mix(in_srgb,var(--accent-primary)_25%,transparent)] bg-gradient-to-r from-[color-mix(in_srgb,var(--accent-primary)_12%,var(--l2-background))] to-[color-mix(in_srgb,var(--accent-sakura)_10%,var(--l2-background))] p-8 shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl dark:border-transparent dark:from-blue-900/90 dark:to-purple-900/90">
        <div className="space-y-4">
          <h3 className="my-0 text-2xl font-bold text-[var(--l1-foreground)] dark:text-[var(--base-white)]">
            {pricingFocused
              ? 'Compare Grafana Cloud and SigNoz Cloud costs'
              : 'Migrate from Grafana - Save up to 45% on your Grafana bill'}
          </h3>
          <p className="text-[var(--l2-foreground)] dark:text-gray-300">
            {pricingFocused
              ? 'SigNoz Cloud brings logs, metrics, and traces into one platform, with usage-based pricing and no per-host or per-user fees. Compare costs for your telemetry volume and retention.'
              : 'Tired of juggling multiple tools for observability? SigNoz gives you logs, metrics and traces in a single unified platform - making troubleshooting simpler.'}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              id="grafana-vs-signoz-compare-button"
              href={pricingFocused ? 'https://signoz.io/pricing/' : '/grafana-alternative/'}
              className="flex items-center gap-2 no-underline"
            >
              <Button as="span" variant="legacySecondary">
                <Scale className="h-4 w-4" />
                {pricingFocused ? 'Estimate SigNoz Cloud costs' : 'Compare SigNoz vs. Grafana'}
              </Button>
            </Link>
            <Link
              id="grafana-vs-signoz-try-signoz-button"
              href={pricingFocused ? 'https://signoz.io/teams/' : '/teams/'}
              className="flex items-center gap-2 no-underline"
            >
              <Button as="span" variant="legacyPrimary">
                {pricingFocused ? 'Try SigNoz Cloud for Free' : 'Try SigNoz for Free'} &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
