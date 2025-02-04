'use client'

import React from 'react'
import Button from '../Button/Button'
import { ArrowRight } from 'lucide-react'

export default function GetStartedInfrastructureMonitoring() {
  return (
    <div className="my-6 w-full">
      <div className="rounded-lg bg-gradient-to-r from-gray-900/90 to-gray-800/90 p-6 shadow-md backdrop-blur-sm transition-all duration-300 ease-in-out hover:shadow-lg">
        <div className="space-y-4">
          <h3 className="my-0 text-lg font-medium text-gray-400">
            Set Up Infrastructure Monitoring in SigNoz with our <strong>Guided Onboarding</strong>
          </h3>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-700 text-sm font-medium">1</div>
              <span className="text-sm text-gray-300">Choose your infrastructure data source (Host or Kubernetes)</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-700 text-sm font-medium">2</div>
              <span className="text-sm text-gray-300">Configure OpenTelemetry Collector with our templates</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-700 text-sm font-medium">3</div>
              <span className="text-sm text-gray-300">Access pre-built dashboards and alerts</span>
            </div>
          </div>

          <div className="pt-2">
            <Button href="/teams/">
              <a 
                href="/teams/" 
                style={{ textDecoration: 'none', color: 'inherit' }}
                className="flex items-center gap-2"
              >
                Start Monitoring Now - Free
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
