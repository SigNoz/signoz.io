import React from 'react'
import {
  SiTemporal,
  SiRedis,
  SiPostgresql,
  SiNginx,
  SiMongodb,
  SiClickhouse,
  SiGo,
  SiTypescript,
  SiAmazonwebservices,
} from 'react-icons/si'
import { BsCloudFill } from 'react-icons/bs'
import IconCardGrid from '../Card/IconCardGrid'
import { FaAws } from 'react-icons/fa'

interface IntegrationsListicleProps {
  category?: 'temporal' | 'databases' | 'aws' | 'all'
}

export default function IntegrationsListicle({ category = 'all' }: IntegrationsListicleProps) {
  // Temporal section
  const renderTemporalSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Temporal</h2>
      <IconCardGrid
        cards={[
          {
            name: 'Cloud Metrics',
            href: '/docs/integrations/temporal-cloud-metrics',
            icon: <BsCloudFill className="h-7 w-7 text-blue-500" />,
            clickName: 'Temporal Cloud Metrics Link',
          },
          {
            name: 'Golang',
            href: '/docs/integrations/temporal-golang-opentelemetry',
            icon: <SiGo className="h-7 w-7 text-cyan-500" />,
            clickName: 'Temporal Golang Link',
          },
          {
            name: 'Typescript',
            href: '/docs/integrations/temporal-typescript-opentelemetry',
            icon: <SiTypescript className="h-7 w-7 text-blue-600" />,
            clickName: 'Temporal Typescript Link',
          },
        ]}
        sectionName="Temporal Integrations"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  // Database integrations
  const renderDatabasesSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Databases</h2>
      <IconCardGrid
        cards={[
          {
            name: 'Redis',
            href: '/docs/integrations/redis',
            icon: <SiRedis className="h-7 w-7 text-red-500" />,
            clickName: 'Redis Integration Link',
          },
          {
            name: 'PostgreSQL',
            href: '/docs/integrations/postgresql',
            icon: <SiPostgresql className="h-7 w-7 text-blue-600" />,
            clickName: 'PostgreSQL Integration Link',
          },
          {
            name: 'MongoDB',
            href: '/docs/integrations/mongodb',
            icon: <SiMongodb className="h-7 w-7 text-green-600" />,
            clickName: 'MongoDB Integration Link',
          },
          {
            name: 'Clickhouse',
            href: '/docs/integrations/clickhouse',
            icon: <SiClickhouse className="h-7 w-7 text-yellow-500" />,
            clickName: 'Clickhouse Integration Link',
          },
        ]}
        sectionName="Database Integrations"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  // AWS integrations
  const renderAWSSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">AWS Integrations</h2>
      <IconCardGrid
        cards={[
          {
            name: 'AWS RDS PostgreSQL',
            href: '/docs/integrations/aws-rds-postgres',
            icon: <SiAmazonwebservices className="h-7 w-7" />,
            clickName: 'AWS RDS PostgreSQL Link',
          },
          {
            name: 'AWS RDS MySQL',
            href: '/docs/integrations/aws-rds-mysql',
            icon: <SiAmazonwebservices className="h-7 w-7" />,
            clickName: 'AWS RDS MySQL Link',
          },
          {
            name: 'AWS Elasticache Redis',
            href: '/docs/integrations/aws-elasticache-redis',
            icon: <SiAmazonwebservices className="h-7 w-7 " />,
            clickName: 'AWS Elasticache Redis Link',
          },
        ]}
        sectionName="AWS Integrations"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  // Other integrations
  const renderOtherSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Other Integrations</h2>
      <IconCardGrid
        cards={[
          {
            name: 'Nginx',
            href: '/docs/integrations/nginx',
            icon: <SiNginx className="h-7 w-7 text-green-500" />,
            clickName: 'Nginx Integration Link',
          },
        ]}
        sectionName="Other Integrations"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  // Render specific section or all sections based on the category prop
  return (
    <div>
      {(category === 'all' || category === 'temporal') && renderTemporalSection()}
      {(category === 'all' || category === 'databases') && renderDatabasesSection()}
      {(category === 'all' || category === 'aws') && renderAWSSection()}
      {category === 'all' && renderOtherSection()}
    </div>
  )
}
