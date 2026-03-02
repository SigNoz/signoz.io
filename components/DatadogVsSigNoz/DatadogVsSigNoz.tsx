'use client'

import React from 'react'
import Button from '../Button/Button'
import { Scale } from 'lucide-react'

export default function DatadogVsSigNoz() {
  return (
    <div className="my-8 w-full">
      <div className="transform rounded-xl bg-gradient-to-r from-blue-900/90 to-purple-900/90 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        <div className="space-y-4">
          <h3 className="my-0 text-2xl font-bold text-white">
            Cut Your Observability Spend by 80%—Here's How
          </h3>
          <p className="text-gray-300">
            Switch from Datadog seamlessly with our automated migration tool, comparable features
            and up to <b>80% cost savings</b>.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button>
              <a
                href="/product-comparison/signoz-vs-datadog/"
                style={{ textDecoration: 'none', color: 'inherit' }}
                className="flex items-center gap-2"
              >
                <Scale className="h-4 w-4" />
                Compare SigNoz vs. Datadog
              </a>
            </Button>
            <Button href="/datadog-migration-tool/" type={Button.TYPES.SECONDARY}>
              <a
                href="/datadog-migration-tool/"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Try our Datadog Migration Tool &rarr;
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
