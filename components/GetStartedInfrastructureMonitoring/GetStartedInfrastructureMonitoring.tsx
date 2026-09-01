'use client'

import React from 'react'
import Button from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import Figure from '../Figure/Figure'

interface GetStartedInfrastructureMonitoringProps {
  variant?: 'card' | 'simple' | 'showcase'
}

export default function GetStartedInfrastructureMonitoring({
  variant = 'card',
}: GetStartedInfrastructureMonitoringProps) {
  if (variant === 'simple') {
    return (
      <div className="my-6 w-full">
        <div className="space-y-4">
          <h3 className="my-0 text-lg font-medium text-[var(--l1-foreground)]">
            Set Up Infrastructure Monitoring in SigNoz
          </h3>
          <p className="text-[var(--l2-foreground)]">
            Monitor your infrastructure health and performance with our comprehensive solution. Get
            started in minutes with our guided setup process.
          </p>
          <div className="pt-2">
            <Button href="/teams/" variant="legacyPrimary">
              Start Monitoring Now - Free
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'showcase') {
    return (
      <div className="my-6 w-full">
        <div className="flex flex-col">
          <div className="m-0 rounded-lg object-cover shadow-lg">
            <Figure
              src="/img/unified-observability/unified-observability-infrastructure-monitoring.webp"
              alt="Infrastructure Monitoring Dashboard"
              caption="Set Up Infrastructure Monitoring in SigNoz with our Guided Onboarding"
            />
          </div>

          <div className="max-w-3xl self-center">
            <div className="hidden max-w-3xl items-start space-x-4 md:flex">
              <div className="flex flex-col text-left">
                <div className="mb-1 text-sm font-medium text-[var(--l1-foreground)]">
                  1. Choose Data Source
                </div>
                <div className="text-sm text-[var(--l3-foreground)]">Host or K8s</div>
              </div>
              <div className="mt-4 flex items-center">
                <ArrowRight className="h-5 w-5 text-[var(--l3-foreground)]" />
              </div>
              <div className="flex flex-col text-left">
                <div className="mb-1 text-sm font-medium text-[var(--l1-foreground)]">
                  2. Configure OTel Collector
                </div>
                <div className="text-sm text-[var(--l3-foreground)]">with our templates</div>
              </div>
              <div className="mt-4 flex items-center">
                <ArrowRight className="h-5 w-5 text-[var(--l3-foreground)]" />
              </div>
              <div className="flex flex-col text-left">
                <div className="mb-1 text-sm font-medium text-[var(--l1-foreground)]">
                  3. Visualize your data
                </div>
                <div className="text-sm text-[var(--l3-foreground)]">
                  in comprehensive dashboards
                </div>
              </div>
            </div>
            <div className="md:hidden">
              <p className="text-[var(--l2-foreground)]">
                Start monitoring your infrastructure in 3 simple steps: First, choose your
                infrastructure data source (Host or Kubernetes). Then, configure OpenTelemetry
                Collector with our templates. Finally, visualize your infrastructure data in our
                comprehensive dashboards.
              </p>
            </div>
          </div>
          <div className="mt-6 self-center">
            <Button href="/teams/" variant="legacyPrimary">
              <span className="flex items-center gap-2">
                Start Monitoring Now - Free
                <ArrowRight className="h-4 w-4" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="my-6 w-full">
      <div className="rounded-lg border border-[var(--l1-border)] bg-gradient-to-r from-[var(--l2-background)] to-[var(--l3-background-60)] p-6 shadow-md backdrop-blur-sm transition-all duration-300 ease-in-out hover:shadow-lg dark:border-transparent dark:from-gray-900/90 dark:to-gray-800/90">
        <div className="space-y-4">
          <h3 className="my-0 text-lg font-medium text-[var(--l2-foreground)]">
            Set Up Infrastructure Monitoring in SigNoz with our <strong>Guided Onboarding</strong>
          </h3>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--l3-background)] text-sm font-medium text-[var(--l1-foreground)]">
                1
              </div>
              <span className="text-sm text-[var(--l2-foreground)]">
                Choose your infrastructure data source (Host or Kubernetes)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--l3-background)] text-sm font-medium text-[var(--l1-foreground)]">
                2
              </div>
              <span className="text-sm text-[var(--l2-foreground)]">
                Configure OpenTelemetry Collector with our templates
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--l3-background)] text-sm font-medium text-[var(--l1-foreground)]">
                3
              </div>
              <span className="text-sm text-[var(--l2-foreground)]">
                Visualize your infrastructure data
              </span>
            </div>
          </div>

          <div className="pt-2">
            <Button href="/teams/" variant="legacyPrimary">
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
