'use client'

import React, { useState } from 'react'
import {
  SiAmazonec2,
  SiAmazonecs,
  SiAmazoneks,
  SiAwslambda,
  SiAmazonrds,
  SiAmazondynamodb,
  SiAmazons3,
} from 'react-icons/si'
// Using generic Material Design icons for services without Simple Icons
import {
  MdRouter,
  MdSecurity,
  MdMessage,
  MdCloudQueue,
  MdMemory,
  MdHttp,
  MdNotifications,
} from 'react-icons/md'
import IconCardGrid from '../Card/IconCardGrid'
import { AWS_MONITORING_ITEMS } from '@/constants/componentItems'

export default function AWSMonitoringListicle() {
  const sections = [
    { id: 'all', label: 'All' },
    { id: 'compute', label: 'Compute' },
    { id: 'databases', label: 'Databases' },
    { id: 'networking', label: 'Networking' },
    { id: 'messaging', label: 'Messaging' },
    { id: 'storage', label: 'Storage' },
  ]

  const [activeSection, setActiveSection] = useState('all')

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
    '/docs/aws-monitoring/ec2/': <SiAmazonec2 className="h-7 w-7 text-orange-500" />,
    '/docs/aws-monitoring/ecs/': <SiAmazonecs className="h-7 w-7 text-orange-500" />,
    '/docs/aws-monitoring/eks': <SiAmazoneks className="h-7 w-7 text-orange-500" />,
    '/docs/aws-monitoring/lambda': <SiAwslambda className="h-7 w-7 text-orange-500" />,
    '/docs/aws-monitoring/rds': <SiAmazonrds className="h-7 w-7 text-blue-500" />,
    '/docs/aws-monitoring/dynamodb': <SiAmazondynamodb className="h-7 w-7 text-blue-500" />,
    '/docs/aws-monitoring/elasticache': <MdMemory className="h-7 w-7 text-blue-500" />,
    '/docs/aws-monitoring/alb': <MdRouter className="h-7 w-7 text-purple-500" />,
    '/docs/aws-monitoring/elb-logs': <MdRouter className="h-7 w-7 text-purple-500" />,
    '/docs/aws-monitoring/vpc': <MdSecurity className="h-7 w-7 text-green-500" />,
    '/docs/aws-monitoring/api-gateway': <MdHttp className="h-7 w-7 text-purple-500" />,
    '/docs/aws-monitoring/msk': <MdCloudQueue className="h-7 w-7 text-black dark:text-white" />,
    '/docs/aws-monitoring/sqs': <MdMessage className="h-7 w-7 text-pink-500" />,
    '/docs/aws-monitoring/sns': <MdNotifications className="h-7 w-7 text-pink-500" />,
    '/docs/aws-monitoring/s3': <SiAmazons3 className="h-7 w-7 text-green-600" />,
  }

  const computeCards = AWS_MONITORING_ITEMS.compute.map((item) => ({
    ...item,
    icon: ICON_MAP[item.href],
  }))

  const databasesCards = AWS_MONITORING_ITEMS.databases.map((item) => ({
    ...item,
    icon: ICON_MAP[item.href],
  }))

  const networkingCards = AWS_MONITORING_ITEMS.networking.map((item) => ({
    ...item,
    icon: ICON_MAP[item.href],
  }))

  const messagingCards = AWS_MONITORING_ITEMS.messaging.map((item) => ({
    ...item,
    icon: ICON_MAP[item.href],
  }))

  const storageCards = AWS_MONITORING_ITEMS.storage.map((item) => ({
    ...item,
    icon: ICON_MAP[item.href],
  }))

  const renderComputeSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Compute</h2>
      <IconCardGrid
        cards={computeCards}
        sectionName="Compute"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  const renderDatabasesSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Databases</h2>
      <IconCardGrid
        cards={databasesCards}
        sectionName="Databases"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  const renderNetworkingSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Networking</h2>
      <IconCardGrid
        cards={networkingCards}
        sectionName="Networking"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  const renderMessagingSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Messaging</h2>
      <IconCardGrid
        cards={messagingCards}
        sectionName="Messaging"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  const renderStorageSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Storage</h2>
      <IconCardGrid
        cards={storageCards}
        sectionName="Storage"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  return (
    <div>
      <NavigationPills />

      {(activeSection === 'all' || activeSection === 'compute') && renderComputeSection()}
      {(activeSection === 'all' || activeSection === 'databases') && renderDatabasesSection()}
      {(activeSection === 'all' || activeSection === 'networking') && renderNetworkingSection()}
      {(activeSection === 'all' || activeSection === 'messaging') && renderMessagingSection()}
      {(activeSection === 'all' || activeSection === 'storage') && renderStorageSection()}
    </div>
  )
}
