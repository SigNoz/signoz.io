'use client'

import React, { useState } from 'react'
import {
  SiRedis,
  SiPostgresql,
  SiNginx,
  SiMongodb,
  SiClickhouse,
  SiGo,
  SiTypescript,
  SiAmazonwebservices,
  SiMysql,
  SiHasura,
  SiApachedruid,
  SiVercel,
} from 'react-icons/si'
import { BsCloudFill } from 'react-icons/bs'
import IconCardGrid from '../Card/IconCardGrid'
import { INTEGRATIONS_ITEMS } from '@/constants/componentItems'

interface IntegrationsListicleProps {
  category?: 'temporal' | 'databases' | 'aws' | 'all'
}

export default function IntegrationsListicle({ category = 'all' }: IntegrationsListicleProps) {
  // Define all sections with their IDs and labels
  const sections = [
    { id: 'all', label: 'All' },
    { id: 'temporal', label: 'Temporal' },
    { id: 'databases', label: 'Databases' },
    { id: 'aws', label: 'AWS' },
    { id: 'other', label: 'Other' },
  ]

  // State to track the active section
  const [activeSection, setActiveSection] = useState(category === 'all' ? 'all' : category)

  // Navigation pills component
  const NavigationPills = () => (
    <div className="mb-8 flex flex-wrap gap-2">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => setActiveSection(section.id)}
          className={`inline-block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeSection === section.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {section.label}
        </button>
      ))}
    </div>
  )

  // Icon map keyed by href
  const ICON_MAP: Record<string, React.ReactNode> = {
    '/docs/integrations/temporal-cloud-metrics': <BsCloudFill className="h-7 w-7 text-blue-500" />,
    '/docs/integrations/temporal-golang-opentelemetry': <SiGo className="h-7 w-7 text-cyan-500" />,
    '/docs/integrations/temporal-typescript-opentelemetry': (
      <SiTypescript className="h-7 w-7 text-blue-600" />
    ),
    '/docs/integrations/redis': <SiRedis className="h-7 w-7 text-red-500" />,
    '/docs/integrations/postgresql': <SiPostgresql className="h-7 w-7 text-blue-600" />,
    '/docs/integrations/mongodb': <SiMongodb className="h-7 w-7 text-green-600" />,
    '/docs/integrations/clickhouse': <SiClickhouse className="h-7 w-7 text-yellow-500" />,
    '/docs/integrations/opentelemetry-neondb': (
      <img src="/svgs/icons/neon.svg" alt="Neon" className="h-7 w-7 object-contain" />
    ),
    '/docs/integrations/sql-server': (
      <img
        src="/svgs/icons/microsoft-sql-server.svg"
        alt="Microsoft SQL Server"
        className="h-7 w-7 object-contain"
      />
    ),
    '/docs/integrations/aws/one-click-aws-integrations': (
      <SiAmazonwebservices className="h-7 w-7 text-[#FF9900]" />
    ),
    '/docs/integrations/aws-rds-postgres': <SiPostgresql className="h-7 w-7 text-[#FF9900]" />,
    '/docs/integrations/aws-rds-mysql': <SiMysql className="h-7 w-7 text-[#FF9900]" />,
    '/docs/integrations/aws-elasticache-redis': <SiRedis className="h-7 w-7 text-[#FF9900]" />,
    '/docs/integrations/nginx': <SiNginx className="h-7 w-7 text-green-500" />,
    '/docs/integrations/vercel': <SiVercel className="h-7 w-7 text-black dark:text-white" />,
    '/docs/integrations/opentelemetry-hasura': <SiHasura className="h-7 w-7 text-blue-600" />,
    '/docs/integrations/opentelemetry-dbos': (
      <img src="/svgs/icons/dbos.svg" alt="DBOS" className="h-7 w-7 object-contain" />
    ),
    '/docs/integrations/opentelemetry-apache-druid': (
      <SiApachedruid className="h-7 w-7 text-[#29F5E6]" />
    ),
  }

  const temporalCards = INTEGRATIONS_ITEMS.temporal.map((item) => ({
    ...item,
    icon: ICON_MAP[item.href],
  }))

  const databasesCards = INTEGRATIONS_ITEMS.databases.map((item) => ({
    ...item,
    icon: ICON_MAP[item.href],
  }))

  const awsCards = INTEGRATIONS_ITEMS.aws.map((item) => ({
    ...item,
    icon: ICON_MAP[item.href],
  }))

  const otherCards = INTEGRATIONS_ITEMS.other.map((item) => ({
    ...item,
    icon: ICON_MAP[item.href],
  }))

  // Temporal section
  const renderTemporalSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Temporal</h2>
      <IconCardGrid
        cards={temporalCards}
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
        cards={databasesCards}
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
        cards={awsCards}
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
        cards={otherCards}
        sectionName="Other Integrations"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  // Render sections based on the active section
  return (
    <div>
      <NavigationPills />

      {/* Show all sections if activeSection is 'all', otherwise show only the selected section */}
      {(activeSection === 'all' || activeSection === 'temporal') && renderTemporalSection()}
      {(activeSection === 'all' || activeSection === 'databases') && renderDatabasesSection()}
      {(activeSection === 'all' || activeSection === 'aws') && renderAWSSection()}
      {(activeSection === 'all' || activeSection === 'other') && renderOtherSection()}
    </div>
  )
}
