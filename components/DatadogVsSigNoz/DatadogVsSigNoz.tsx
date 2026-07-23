'use client'

import React from 'react'
import Button from '@/components/ui/Button'
import { Scale } from 'lucide-react'

export default function DatadogVsSigNoz() {
  return (
    <div className="my-8 w-full">
      <div className="border-border bg-card transform rounded-xl border p-8 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        <div className="space-y-4">
          <h3 className="text-l1-foreground my-0 text-2xl font-bold">
            Cut Your Observability Spend by 80%—Here's How
          </h3>
          <p className="text-muted-foreground">
            Switch from Datadog seamlessly with our automated migration tool, comparable features
            and up to <b>80% cost savings</b>.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              href="/datadog-alternative/"
              variant="legacyPrimary"
              className="flex items-center gap-2"
            >
              <Scale className="h-4 w-4" />
              Compare SigNoz vs. Datadog
            </Button>
            <Button href="/datadog-migration-tool/" variant="legacySecondary">
              Try our Datadog Migration Tool &rarr;
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
