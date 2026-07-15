'use client'

import React from 'react'
import Button from '@/components/ui/Button'
import { Scale } from 'lucide-react'
import Link from 'next/link'
export default function GrafanaVsSigNoz() {
  return (
    <div className="my-8 w-full">
      <div className="border-border bg-card transform rounded-xl border p-8 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        <div className="space-y-4">
          <h3 className="text-l1-foreground my-0 text-2xl font-bold">
            Migrate from Grafana - Save up to 45% on your Grafana bill
          </h3>
          <p className="text-muted-foreground">
            Tired of juggling multiple tools for observability? SigNoz gives you logs, metrics and
            traces in a single unified platform - making troubleshooting simpler.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              id="grafana-vs-signoz-compare-button"
              href="/grafana-alternative/"
              className="flex items-center gap-2 no-underline"
            >
              <Button as="span" variant="legacySecondary">
                <Scale className="h-4 w-4" />
                Compare SigNoz vs. Grafana
              </Button>
            </Link>
            <Link
              id="grafana-vs-signoz-try-signoz-button"
              href="/teams/"
              className="flex items-center gap-2 no-underline"
            >
              <Button as="span" variant="legacyPrimary">
                Try SigNoz for Free &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
