'use client'

import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'

export interface CustomerMetric {
  value: string
  label: string
}

export interface CustomersHeroCta {
  label: string
  href: string
  clickName: string
  variant: 'default' | 'secondary'
}

interface CustomersHeroProps {
  title: ReactNode
  metrics: CustomerMetric[]
  ctas: CustomersHeroCta[]
}

export default function CustomersHero({ title, metrics, ctas }: CustomersHeroProps) {
  return (
    <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)] lg:grid-rows-[auto_auto] lg:items-end lg:gap-x-14 lg:gap-y-6">
      <h1 className="m-0 max-w-3xl text-left text-3xl font-medium leading-none tracking-tight text-[var(--l1-foreground)] sm:text-4xl lg:col-start-1 lg:row-start-1">
        {title}
      </h1>

      <div className="grid gap-4 border-y border-[var(--l2-border)] py-5 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-[var(--l2-border)] lg:col-start-2 lg:row-start-1">
        {metrics.map((metric) => (
          <div className="sm:px-4 sm:first:pl-0" key={metric.value}>
            <div className="text-lg font-semibold tracking-[-0.02em] text-[var(--l1-foreground)] sm:text-2xl">
              {metric.value}
            </div>
            <p className="mt-2 text-xs leading-4 text-[var(--l2-foreground)] sm:max-w-36 sm:text-sm sm:leading-5">
              {metric.label}
            </p>
          </div>
        ))}
      </div>

      <div className="-mt-4 flex flex-col gap-3 sm:flex-row lg:col-start-2 lg:row-start-2 lg:mt-0">
        {ctas.map((cta) => (
          <Button
            asChild
            className="!w-full items-center gap-2 sm:!w-auto sm:min-w-[176px]"
            key={cta.clickName}
            rounded="full"
            variant={cta.variant}
          >
            <TrackingLink
              clickLocation="Customers Hero"
              clickName={cta.clickName}
              clickText={cta.label}
              clickType={cta.variant === 'default' ? 'Primary CTA' : 'Secondary CTA'}
              eventAttributes={{ target: cta.href }}
              href={cta.href}
            >
              {cta.label}
              <ArrowRight size={14} />
            </TrackingLink>
          </Button>
        ))}
      </div>
    </div>
  )
}
