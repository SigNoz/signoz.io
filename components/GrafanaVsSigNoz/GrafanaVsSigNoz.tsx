'use client'

import React from 'react'
import { Button } from '@signozhq/ui/button'
import { Typography } from '@signozhq/ui/typography'
import { Scale } from 'lucide-react'
import Link from 'next/link'

export default function GrafanaVsSigNoz() {
  return (
    <div className="my-8 w-full">
      <div className="transform rounded-xl border border-[var(--l2-border)] bg-[var(--l2-background)] p-8 shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[var(--accent-primary)] hover:shadow-xl">
        <div className="space-y-4">
          <Typography.Title level={3} className="my-0 text-[var(--l1-foreground)]">
            Migrate from Grafana - Save up to 45% on your Grafana bill
          </Typography.Title>
          <Typography.Text className="text-[var(--l2-foreground)]">
            Tired of juggling multiple tools for observability? SigNoz gives you logs, metrics and
            traces in a single unified platform - making troubleshooting simpler.
          </Typography.Text>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="outlined" color="secondary">
              <Link
                id="grafana-vs-signoz-compare-button"
                href="/grafana-alternative/"
                className="flex items-center gap-2 no-underline"
              >
                <Scale className="h-4 w-4" />
                Compare SigNoz vs. Grafana
              </Link>
            </Button>
            <Button asChild variant="solid" color="primary">
              <Link
                id="grafana-vs-signoz-try-signoz-button"
                href="/teams/"
                className="flex items-center gap-2 no-underline"
              >
                Try SigNoz for Free &rarr;
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
