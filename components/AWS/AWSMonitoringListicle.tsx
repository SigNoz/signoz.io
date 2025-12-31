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

  const renderComputeSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Compute</h2>
      <IconCardGrid
        cards={[
          {
            name: 'EC2',
            href: '/docs/aws-monitoring/ec2/',
            icon: <SiAmazonec2 className="h-7 w-7 text-orange-500" />,
            clickName: 'EC2 Monitoring Link',
          },
          {
            name: 'ECS',
            href: '/docs/aws-monitoring/ecs/',
            icon: <SiAmazonecs className="h-7 w-7 text-orange-500" />,
            clickName: 'ECS Monitoring Link',
          },
          {
            name: 'EKS',
            href: '/docs/aws-monitoring/eks',
            icon: <SiAmazoneks className="h-7 w-7 text-orange-500" />,
            clickName: 'EKS Monitoring Link',
          },
          {
            name: 'Lambda',
            href: '/docs/aws-monitoring/lambda',
            icon: <SiAwslambda className="h-7 w-7 text-orange-500" />,
            clickName: 'Lambda Monitoring Link',
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
            href: '/docs/aws-monitoring/rds',
            icon: <SiAmazonrds className="h-7 w-7 text-blue-500" />,
            clickName: 'RDS Monitoring Link',
          },
          {
            name: 'DynamoDB',
            href: '/docs/aws-monitoring/dynamodb',
            icon: <SiAmazondynamodb className="h-7 w-7 text-blue-500" />,
            clickName: 'DynamoDB Monitoring Link',
          },
          {
            name: 'ElastiCache',
            href: '/docs/aws-monitoring/elasticache',
            icon: <MdMemory className="h-7 w-7 text-blue-500" />,
            clickName: 'ElastiCache Monitoring Link',
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
            href: '/docs/aws-monitoring/alb',
            icon: <MdRouter className="h-7 w-7 text-purple-500" />,
            clickName: 'ALB Monitoring Link',
          },
          {
            name: 'ELB',
            href: '/docs/aws-monitoring/elb-logs',
            icon: <MdRouter className="h-7 w-7 text-purple-500" />,
            clickName: 'ELB Monitoring Link',
          },
          {
            name: 'VPC',
            href: '/docs/aws-monitoring/vpc',
            icon: <MdSecurity className="h-7 w-7 text-green-500" />,
            clickName: 'VPC Monitoring Link',
          },
          {
            name: 'API Gateway',
            href: '/docs/aws-monitoring/api-gateway',
            icon: <MdHttp className="h-7 w-7 text-purple-500" />,
            clickName: 'API Gateway Monitoring Link',
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
            href: '/docs/aws-monitoring/msk',
            icon: <MdCloudQueue className="h-7 w-7 text-black dark:text-white" />,
            clickName: 'MSK Monitoring Link',
          },
          {
            name: 'SQS',
            href: '/docs/aws-monitoring/sqs',
            icon: <MdMessage className="h-7 w-7 text-pink-500" />,
            clickName: 'SQS Monitoring Link',
          },
          {
            name: 'SNS',
            href: '/docs/aws-monitoring/sns',
            icon: <MdNotifications className="h-7 w-7 text-pink-500" />,
            clickName: 'SNS Monitoring Link',
          },
        ]}
        sectionName="Messaging"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  const renderStorageSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Storage</h2>
      <IconCardGrid
        cards={[
          {
            name: 'S3',
            href: '/docs/aws-monitoring/s3',
            icon: <SiAmazons3 className="h-7 w-7 text-green-600" />,
            clickName: 'S3 Monitoring Link',
          },
        ]}
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
