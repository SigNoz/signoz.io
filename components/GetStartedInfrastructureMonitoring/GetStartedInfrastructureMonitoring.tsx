'use client'

import React from 'react'
import Button from '../Button/Button'
import { ArrowRight } from 'lucide-react'
import Figure from '../Figure/Figure'
import Link from 'next/link'

interface GetStartedInfrastructureMonitoringProps {
  variant?: 'card' | 'simple' | 'showcase'
}

export default function GetStartedInfrastructureMonitoring({ variant = 'card' }: GetStartedInfrastructureMonitoringProps) {
  if (variant === 'simple') {
    return (
      <div className="my-6 w-full">
        <div className="space-y-4">
          <h3 className="my-0 text-lg font-medium text-gray-700">
            Set Up Infrastructure Monitoring in SigNoz
          </h3>
          <p className="text-gray-600">
            Monitor your infrastructure health and performance with our comprehensive solution. Get started in minutes with our guided setup process.
          </p>
          <div className="pt-2">
            <Button href="/teams/">Start Monitoring Now - Free</Button>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'showcase') {
    return (
      <div className="my-6 w-full">
        <div className="flex flex-col">
          <div className="rounded-lg object-cover shadow-lg m-0">
            <Figure
              src="/img/unified-observability/unified-observability-infrastructure-monitoring.webp"
              alt="Infrastructure Monitoring Dashboard"
              caption="Set Up Infrastructure Monitoring in SigNoz with our Guided Onboarding"
            />
          </div>
          
          <div className="max-w-3xl self-center">
            <div className="hidden md:flex items-start space-x-4 max-w-3xl">
              <div className="flex flex-col text-left">
                <div className="text-sm font-medium text-gray-300 mb-1">1. Choose Data Source</div>
                <div className="text-sm text-gray-500">Host or K8s</div>
              </div>
              <div className="flex items-center mt-4">
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex flex-col text-left">
                <div className="text-sm font-medium text-gray-300 mb-1">2. Configure OTel Collector</div>
                <div className="text-sm text-gray-500">with our templates</div>
              </div>
              <div className="flex items-center mt-4">
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex flex-col text-left">
                <div className="text-sm font-medium text-gray-300 mb-1">3. Visualize your data</div>
                <div className="text-sm text-gray-500">in comprehensive dashboards</div>
              </div>
            </div>
            <div className="md:hidden">
              <p className="text-gray-300">
                Start monitoring your infrastructure in 3 simple steps: First, choose your infrastructure data source (Host or Kubernetes). Then, configure OpenTelemetry Collector with our templates. Finally, visualize your infrastructure data in our comprehensive dashboards.
              </p>
            </div>
          </div>
          <div className='self-center mt-6'>
              <Link href="/teams/">
                <Button>
                  <span className="flex items-center gap-2">
                    Start Monitoring Now - Free
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>
              </Link>
            </div>
        </div>
      </div>
    )
  }

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
              <span className="text-sm text-gray-300">Visualize your infrastructure data</span>
            </div>
          </div>

          <div className="pt-2">
            <Button href="/teams/">
              <span className="flex items-center gap-2">
                Start Monitoring Now - Free
                <ArrowRight className="h-4 w-4" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
