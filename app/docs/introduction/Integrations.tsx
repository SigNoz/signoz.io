'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import {
  SiRedis,
  SiPostgresql,
  SiNginx,
  SiMongodb,
  SiClickhouse,
  SiAwslambda,
} from 'react-icons/si'
import TrackingLink from '../../../components/TrackingLink'

interface IntegrationData {
  name: string
  href: string
  icon: React.ReactNode
  clickName: string
}

const integrationsData: IntegrationData[] = [
  {
    name: 'Redis',
    href: '/docs/integrations/redis/', // Placeholder link
    icon: <SiRedis className="h-7 w-7 text-red-500" />,
    clickName: 'Redis Integration Link',
  },
  {
    name: 'PostgreSQL',
    href: '/docs/integrations/postgresql/', // Placeholder link
    icon: <SiPostgresql className="h-7 w-7 text-blue-600" />,
    clickName: 'PostgreSQL Integration Link',
  },
  {
    name: 'NginX',
    href: '/docs/integrations/nginx/', // Placeholder link
    icon: <SiNginx className="h-7 w-7 text-green-500" />,
    clickName: 'NginX Integration Link',
  },
  {
    name: 'MongoDB',
    href: '/docs/integrations/mongodb/', // Placeholder link
    icon: <SiMongodb className="h-7 w-7 text-green-600" />,
    clickName: 'MongoDB Integration Link',
  },
  {
    name: 'Clickhouse',
    href: '/docs/integrations/clickhouse/', // Placeholder link
    icon: <SiClickhouse className="h-7 w-7 text-yellow-500" />,
    clickName: 'Clickhouse Integration Link',
  },
  {
    name: 'AWS Lambda',
    href: '/docs/integrations/aws-lambda/', // Placeholder link
    icon: <SiAwslambda className="h-7 w-7 text-orange-500" />,
    clickName: 'AWS Lambda Integration Link',
  },
]

export default function Integrations() {
  const sectionName = 'Integrations Section'

  return (
    <div className="mx-auto mb-12 w-full max-w-7xl">
      <div className="mb-6 text-left">
        <h2 className="mb-2 text-2xl font-semibold text-signoz_vanilla-100">Integrations</h2>
        <p className="text-base text-signoz_vanilla-400">
          Connect SigNoz with your favorite tools and services
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {integrationsData.map((integration, index) => (
          <TrackingLink
            key={index}
            href={integration.href}
            className="flex flex-col items-center justify-center rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 p-4 text-center transition-all hover:border-signoz_robin-500 hover:bg-signoz_ink-300"
            clickType="Integration Link"
            clickName={integration.clickName}
            clickText={integration.name}
            clickLocation={sectionName}
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-md bg-signoz_robin-500/10">
              {integration.icon}
            </div>
            <span className="text-sm font-medium text-signoz_vanilla-100">{integration.name}</span>
          </TrackingLink>
        ))}
      </div>

      <div className="mt-6 text-sm">
        {' '}
        {/* Increased margin-top slightly */}
        <TrackingLink
          href="/docs/integrations/" // Placeholder link for all integrations
          className="inline-flex items-center text-signoz_robin-500 transition-colors hover:text-signoz_robin-400"
          clickType="Nav Click"
          clickName="View All Integrations Link"
          clickText="View all integrations"
          clickLocation={sectionName}
        >
          View all integrations <ArrowRight className="ml-1 h-3 w-3" />
        </TrackingLink>
      </div>
    </div>
  )
}
