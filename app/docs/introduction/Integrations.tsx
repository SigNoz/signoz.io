import React from 'react'
import {
  SiRedis,
  SiPostgresql,
  SiNginx,
  SiMongodb,
  SiClickhouse,
  SiAmazonwebservices,
  SiAwslambda,
} from 'react-icons/si'
import IconCardGrid from '../../../components/Card/IconCardGrid'

interface IconCardData {
  name: string
  href: string
  icon: React.ReactNode
  clickName: string
}

const integrationsData: IconCardData[] = [
  {
    name: 'Redis',
    href: '/docs/integrations/redis/',
    icon: <SiRedis className="h-7 w-7 text-red-500" />,
    clickName: 'Redis Integration Link',
  },
  {
    name: 'PostgreSQL',
    href: '/docs/integrations/postgresql/',
    icon: <SiPostgresql className="h-7 w-7 text-blue-600" />,
    clickName: 'PostgreSQL Integration Link',
  },
  {
    name: 'NginX',
    href: '/docs/integrations/nginx/',
    icon: <SiNginx className="h-7 w-7 text-green-500" />,
    clickName: 'NginX Integration Link',
  },
  {
    name: 'MongoDB',
    href: '/docs/integrations/mongodb/',
    icon: <SiMongodb className="h-7 w-7 text-green-600" />,
    clickName: 'MongoDB Integration Link',
  },
  {
    name: 'Clickhouse',
    href: '/docs/integrations/clickhouse/',
    icon: <SiClickhouse className="h-7 w-7 text-yellow-500" />,
    clickName: 'Clickhouse Integration Link',
  },
  {
    name: 'AWS',
    href: '/docs/integrations/aws-rds-postgres/',
    icon: <SiAmazonwebservices className="h-7 w-7 text-orange-500" />,
    clickName: 'AWS Integration Link',
  },
]

export default function Integrations() {
  return (
    <IconCardGrid
      title="Integrations"
      description="Connect SigNoz with your favorite tools and services"
      cards={integrationsData}
      sectionName="Integrations Section"
      viewAllHref="/docs/integrations/integrations-list/"
      viewAllText="View all integrations"
    />
  )
}
