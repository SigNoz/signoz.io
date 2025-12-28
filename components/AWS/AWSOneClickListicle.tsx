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
  MdMessage,
  MdCloudQueue,
  MdMemory,
  MdHttp,
  MdNotifications,
} from 'react-icons/md'
import IconCardGrid from '../Card/IconCardGrid'

export default function AWSOneClickListicle() {
  const sections = [
    { id: 'all', label: 'All' },
    { id: 'compute', label: 'Compute' },
    { id: 'databases', label: 'Databases' },
    { id: 'networking', label: 'Networking' },
    { id: 'messaging', label: 'Messaging' },
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

  const renderComputeSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Compute</h2>
      <IconCardGrid
        cards={[
          {
            name: 'EC2',
            href: '/docs/integrations/aws/ec2',
            icon: <SiAmazonec2 className="h-7 w-7 text-orange-500" />,
            clickName: 'EC2 Integration Link',
          },
          {
            name: 'ECS',
            href: '/docs/integrations/aws/ecs',
            icon: <SiAmazonecs className="h-7 w-7 text-orange-500" />,
            clickName: 'ECS Integration Link',
          },
          {
            name: 'EKS',
            href: '/docs/integrations/aws/eks',
            icon: <SiAmazoneks className="h-7 w-7 text-orange-500" />,
            clickName: 'EKS Integration Link',
          },
          {
            name: 'Lambda',
            href: '/docs/integrations/aws/lambda',
            icon: <SiAwslambda className="h-7 w-7 text-orange-500" />,
            clickName: 'Lambda Integration Link',
          },
        ]}
        sectionName="Compute"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  const renderDatabasesSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Databases</h2>
      <IconCardGrid
        cards={[
          {
            name: 'RDS',
            href: '/docs/integrations/aws/rds',
            icon: <SiAmazonrds className="h-7 w-7 text-blue-500" />,
            clickName: 'RDS Integration Link',
          },
          {
            name: 'DynamoDB',
            href: '/docs/integrations/aws/dynamodb',
            icon: <SiAmazondynamodb className="h-7 w-7 text-blue-500" />,
            clickName: 'DynamoDB Integration Link',
          },
          {
            name: 'ElastiCache',
            href: '/docs/integrations/aws/elasticache',
            icon: <MdMemory className="h-7 w-7 text-blue-500" />,
            clickName: 'ElastiCache Integration Link',
          },
        ]}
        sectionName="Databases"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  const renderNetworkingSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Networking</h2>
      <IconCardGrid
        cards={[
          {
            name: 'ALB',
            href: '/docs/integrations/aws/alb',
            icon: <MdRouter className="h-7 w-7 text-purple-500" />,
            clickName: 'ALB Integration Link',
          },
          {
            name: 'API Gateway',
            href: '/docs/integrations/aws/api-gateway',
            icon: <MdHttp className="h-7 w-7 text-purple-500" />,
            clickName: 'API Gateway Integration Link',
          },
        ]}
        sectionName="Networking"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  const renderMessagingSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Messaging</h2>
      <IconCardGrid
        cards={[
          {
            name: 'MSK',
            href: '/docs/integrations/aws/msk',
            icon: <MdCloudQueue className="h-7 w-7 text-black dark:text-white" />,
            clickName: 'MSK Integration Link',
          },
          {
            name: 'SQS',
            href: '/docs/integrations/aws/sqs',
            icon: <MdMessage className="h-7 w-7 text-pink-500" />,
            clickName: 'SQS Integration Link',
          },
          {
            name: 'SNS',
            href: '/docs/integrations/aws/sns',
            icon: <MdNotifications className="h-7 w-7 text-pink-500" />,
            clickName: 'SNS Integration Link',
          },
        ]}
        sectionName="Messaging"
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
    </div>
  )
}
