'use client'

import React, { useState } from 'react'
import {
  SiKubernetes,
  SiDocker,
  SiHeroku,
  SiVercel,
  SiPython,
  SiNodedotjs,
  SiFluentd,
  SiApachetomcat,
  SiAmazonwebservices,
  SiGo,
  SiCloudflare,
  SiAmazonec2,
  SiAmazonecs,
  SiAmazoneks,
  SiAwslambda,
  SiAmazonrds,
  SiAmazondynamodb,
  SiAmazons3,
  SiAmazoncloudwatch,
  SiGooglecloud,
  SiRedis,
  SiMysql,
} from 'react-icons/si'
import { TbHttpGet, TbBrandOpenSource } from 'react-icons/tb'
import { FaFileAlt, FaJava, FaWindows } from 'react-icons/fa'
import { LuLogIn } from 'react-icons/lu'
import {
  MdRouter,
  MdSecurity,
  MdMessage,
  MdCloudQueue,
  MdMemory,
  MdHttp,
  MdNotifications,
  MdStorage,
  MdWeb,
  MdDns,
  MdOfflineBolt,
} from 'react-icons/md'
import IconCardGrid from '../Card/IconCardGrid'

interface LogsInstrumentationListicleProps {
  category?: 'platforms' | 'languages' | 'collectors' | 'cloud' | 'all'
}

export default function LogsInstrumentationListicle({
  category = 'all',
}: LogsInstrumentationListicleProps) {
  // Define all sections with their IDs and labels
  const sections = [
    { id: 'all', label: 'All' },
    { id: 'platforms', label: 'Platforms' },
    { id: 'languages', label: 'Languages & Frameworks' },
    { id: 'collectors', label: 'Collectors & Agents' },
    { id: 'cloud', label: 'Cloud' },
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

  // Platform logs
  const renderPlatformsSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Container & Platform Logs</h2>
      <IconCardGrid
        cards={[
          {
            name: 'Kubernetes',
            href: '/docs/userguide/collect_kubernetes_pod_logs',
            icon: <SiKubernetes className="h-7 w-7 text-blue-600" />,
            clickName: 'Kubernetes Logs Link',
          },
          {
            name: 'Docker',
            href: '/docs/userguide/collect_docker_logs',
            icon: <SiDocker className="h-7 w-7 text-blue-500" />,
            clickName: 'Docker Logs Link',
          },
          {
            name: 'Heroku',
            href: '/docs/userguide/heroku_logs_to_signoz',
            icon: <SiHeroku className="h-7 w-7 text-purple-600" />,
            clickName: 'Heroku Logs Link',
          },
          {
            name: 'Vercel',
            href: '/docs/userguide/vercel_logs_to_signoz',
            icon: (
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black p-1">
                <SiVercel className="h-7 w-7 text-white" />
              </span>
            ),
            clickName: 'Vercel Logs Link',
          },
          {
            name: 'Tomcat',
            href: '/docs/logs-management/send-logs/collect-tomcat-access-and-garbage-collector-logs',
            icon: <SiApachetomcat className="h-7 w-7 text-yellow-600" />,
            clickName: 'Tomcat Logs Link',
          },
          {
            name: 'Windows Event',
            href: '/docs/logs-management/send-logs/windows-events-log',
            icon: <FaWindows className="h-7 w-7 text-blue-500" />,
            clickName: 'Windows Logs Link',
          },
          {
            name: 'Cloudflare',
            href: '/docs/logs-management/send-logs/cloudflare-logs',
            icon: <SiCloudflare className="h-7 w-7 text-orange-500" />,
            clickName: 'Cloudflare Logs Link',
          },
          {
            name: 'Convex',
            href: '/docs/logs-management/send-logs/convex-log-streams-signoz',
            icon: <img src="/img/icons/convex-logo.svg" alt="Convex" className="h-9 w-9" />,
            clickName: 'Convex Logs Link',
          },
        ]}
        sectionName="Platform Logs"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  // Language logs
  const renderLanguagesSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Language & Framework Logs</h2>
      <IconCardGrid
        cards={[
          {
            name: 'Python',
            href: '/docs/logs-management/send-logs/python-logs',
            icon: <SiPython className="h-7 w-7 text-blue-500" />,
            clickName: 'Python Logs Link',
          },
          {
            name: 'Java',
            href: '/docs/logs-management/send-logs/java-logs',
            icon: <FaJava className="h-7 w-7 text-red-600" />,
            clickName: 'Java Logs Link',
          },
          {
            name: 'Node.js',
            href: '/docs/logs-management/send-logs/nodejs-logs',
            icon: <SiNodedotjs className="h-7 w-7 text-green-600" />,
            clickName: 'Node.js Logs Link',
          },
          {
            name: 'Bunyan (Node.js)',
            href: '/docs/logs-management/send-logs/opentelemetry-nodejs-bunyan-logs',
            icon: <SiNodedotjs className="h-7 w-7 text-green-600" />,
            clickName: 'Bunyan Logs Link',
          },
          {
            name: 'Winston (Node.js)',
            href: '/docs/logs-management/send-logs/nodejs-winston-logs',
            icon: <SiNodedotjs className="h-7 w-7 text-green-600" />,
            clickName: 'Winston Logs Link',
          },
          {
            name: 'Pino (Node.js)',
            href: '/docs/logs-management/send-logs/nodejs-pino-logs',
            icon: <SiNodedotjs className="h-7 w-7 text-green-500" />,
            clickName: 'Pino Logs Link',
          },
          {
            name: 'Lambda (Node.js)',
            href: '/docs/logs-management/send-logs/aws-lambda-nodejs',
            icon: <SiAmazonwebservices className="h-7 w-7 text-orange-400" />,
            clickName: 'Lambda Node.js Logs Link',
          },
          {
            name: 'Logrus (Go)',
            href: '/docs/logs-management/send-logs/logrus-to-signoz',
            icon: <SiGo className="h-7 w-7 text-cyan-500" />,
            clickName: 'Logrus Logs Link',
          },
          {
            name: 'Zap (Go)',
            href: '/docs/logs-management/send-logs/zap-to-signoz',
            icon: <SiGo className="h-7 w-7 text-cyan-600" />,
            clickName: 'Zap Logs Link',
          },
        ]}
        sectionName="Language Logs"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  // Log Collectors
  const renderCollectorsSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Log Collectors & Agents</h2>
      <IconCardGrid
        cards={[
          {
            name: 'Log Files',
            href: '/docs/userguide/collect_logs_from_file',
            icon: <FaFileAlt className="h-7 w-7 text-orange-500" />,
            clickName: 'File Logs Link',
          },
          {
            name: 'HTTP Logs',
            href: '/docs/userguide/send-logs-http',
            icon: <TbHttpGet className="h-7 w-7 text-green-600" />,
            clickName: 'HTTP Logs Link',
          },
          {
            name: 'Syslogs',
            href: '/docs/userguide/collecting_syslogs',
            icon: <LuLogIn className="h-7 w-7 text-gray-600" />,
            clickName: 'Syslogs Link',
          },
          {
            name: 'FluentD',
            href: '/docs/userguide/fluentd_to_signoz',
            icon: <SiFluentd className="h-7 w-7 text-green-500" />,
            clickName: 'FluentD Logs Link',
          },
          {
            name: 'FluentBit',
            href: '/docs/userguide/fluentbit_to_signoz',
            icon: <SiFluentd className="h-7 w-7 text-blue-500" />,
            clickName: 'FluentBit Logs Link',
          },
          {
            name: 'Logstash',
            href: '/docs/userguide/logstash_to_signoz',
            icon: (
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
                LS
              </span>
            ),
            clickName: 'Logstash Logs Link',
          },
          {
            name: 'Vector',
            href: '/docs/logs-management/send-logs/vector-logs-to-signoz',
            icon: <TbBrandOpenSource className="h-7 w-7 text-purple-500" />,
            clickName: 'Vector Logs Link',
          },
        ]}
        sectionName="Log Collectors"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  // Cloud logs
  const renderCloudSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Cloud Logs</h2>

      <h3 className="mb-4 text-xl font-semibold">AWS</h3>
      <IconCardGrid
        cards={[
          {
            name: 'EC2',
            href: '/docs/aws-monitoring/ec2/ec2-logs',
            icon: <SiAmazonec2 className="h-7 w-7 text-orange-500" />,
            clickName: 'EC2 Logs Link',
          },
          {
            name: 'ECS',
            href: '/docs/integrations/aws/ecs',
            icon: <SiAmazonecs className="h-7 w-7 text-orange-500" />,
            clickName: 'ECS Link',
          },
          {
            name: 'EKS',
            href: '/docs/collection-agents/k8s/k8s-infra/install-k8s-infra/',
            icon: <SiAmazoneks className="h-7 w-7 text-orange-500" />,
            clickName: 'EKS Logs Link',
          },
          {
            name: 'Lambda',
            href: '/docs/integrations/aws/lambda',
            icon: <SiAwslambda className="h-7 w-7 text-orange-500" />,
            clickName: 'AWS Lambda Link',
          },
          {
            name: 'S3',
            href: '/docs/aws-monitoring/s3',
            icon: <SiAmazons3 className="h-7 w-7 text-green-600" />,
            clickName: 'S3 Link',
          },
          {
            name: 'RDS',
            href: '/docs/integrations/aws/rds',
            icon: <SiAmazonrds className="h-7 w-7 text-blue-500" />,
            clickName: 'RDS Link',
          },
          {
            name: 'DynamoDB',
            href: '/docs/integrations/aws/dynamodb',
            icon: <SiAmazondynamodb className="h-7 w-7 text-blue-500" />,
            clickName: 'DynamoDB Link',
          },
          {
            name: 'ElastiCache',
            href: '/docs/integrations/aws/elasticache',
            icon: <MdMemory className="h-7 w-7 text-blue-500" />,
            clickName: 'ElastiCache Link',
          },
          {
            name: 'ELB',
            href: '/docs/aws-monitoring/elb',
            icon: <MdRouter className="h-7 w-7 text-purple-500" />,
            clickName: 'ELB Link',
          },
          {
            name: 'ALB',
            href: '/docs/integrations/aws/alb',
            icon: <MdRouter className="h-7 w-7 text-purple-500" />,
            clickName: 'ALB Link',
          },
          {
            name: 'API Gateway',
            href: '/docs/integrations/aws/api-gateway',
            icon: <MdHttp className="h-7 w-7 text-purple-500" />,
            clickName: 'API Gateway Link',
          },
          {
            name: 'MSK',
            href: '/docs/integrations/aws/msk',
            icon: <MdCloudQueue className="h-7 w-7 text-black dark:text-white" />,
            clickName: 'MSK Link',
          },
          {
            name: 'SNS',
            href: '/docs/integrations/aws/sns',
            icon: <MdNotifications className="h-7 w-7 text-pink-500" />,
            clickName: 'SNS Link',
          },
          {
            name: 'SQS',
            href: '/docs/integrations/aws/sqs',
            icon: <MdMessage className="h-7 w-7 text-pink-500" />,
            clickName: 'SQS Link',
          },
          {
            name: 'VPC',
            href: '/docs/aws-monitoring/vpc',
            icon: <MdSecurity className="h-7 w-7 text-green-500" />,
            clickName: 'VPC Link',
          },
          {
            name: 'Cloudwatch',
            href: '/docs/userguide/send-cloudwatch-logs-to-signoz',
            icon: <SiAmazoncloudwatch className="h-7 w-7 text-pink-600" />,
            clickName: 'Cloudwatch Logs Link',
          },
        ]}
        sectionName="AWS Services"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />

      <h3 className="mb-4 text-xl font-semibold">Azure</h3>
      <IconCardGrid
        cards={[
          {
            name: 'App Service',
            href: '/docs/azure-monitoring/app-service/logging/',
            icon: <MdCloudQueue className="h-7 w-7 text-blue-600" />,
            clickName: 'App Service Logs Link',
          },
          {
            name: 'AKS',
            href: '/docs/collection-agents/k8s/k8s-infra/install-k8s-infra/',
            icon: <SiKubernetes className="h-7 w-7 text-blue-600" />,
            clickName: 'AKS Logs Link',
          },
          {
            name: 'Container Apps',
            href: '/docs/azure-monitoring/az-container-apps/logging/',
            icon: <SiDocker className="h-7 w-7 text-blue-500" />,
            clickName: 'Container Apps Logs Link',
          },
          {
            name: 'Azure Functions',
            href: '/docs/azure-monitoring/az-fns/logging/',
            icon: <MdOfflineBolt className="h-7 w-7 text-orange-500" />,
            clickName: 'Azure Functions Logs Link',
          },
          {
            name: 'Blob Storage',
            href: '/docs/azure-monitoring/az-blob-storage/logging/',
            icon: <MdStorage className="h-7 w-7 text-blue-600" />,
            clickName: 'Blob Storage Logs Link',
          },
          {
            name: 'Virtual Machines',
            href: '/docs/azure-monitoring/virtual-machines/vm-metrics',
            icon: <SiAmazonec2 className="h-7 w-7 text-blue-600" />,
            clickName: 'Azure VMs Link',
          },
          {
            name: 'MySQL Flexible Server',
            href: '/docs/azure-monitoring/mysql-flexible-server',
            icon: <SiMysql className="h-7 w-7 text-blue-500" />,
            clickName: 'Azure MySQL Link',
          },
        ]}
        sectionName="Azure Services"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />

      <h3 className="mb-4 text-xl font-semibold">GCP</h3>
      <IconCardGrid
        cards={[
          {
            name: 'Cloud Functions',
            href: '/docs/gcp-monitoring/gcp-fns/logging/',
            icon: <SiAwslambda className="h-7 w-7 text-blue-500" />,
            clickName: 'Cloud Functions Logs Link',
          },
          {
            name: 'App Engine',
            href: '/docs/gcp-monitoring/app-engine/logging/',
            icon: <SiGooglecloud className="h-7 w-7 text-blue-500" />,
            clickName: 'App Engine Logs Link',
          },
          {
            name: 'Compute Engine',
            href: '/docs/gcp-monitoring/compute-engine/logging/',
            icon: <SiGooglecloud className="h-7 w-7 text-blue-500" />,
            clickName: 'Compute Engine Logs Link',
          },
          {
            name: 'Cloud Storage',
            href: '/docs/gcp-monitoring/gcs/logging/',
            icon: <SiGooglecloud className="h-7 w-7 text-blue-500" />,
            clickName: 'Cloud Storage Logs Link',
          },
          {
            name: 'Cloud SQL',
            href: '/docs/gcp-monitoring/cloud-sql/logging/',
            icon: <SiGooglecloud className="h-7 w-7 text-blue-500" />,
            clickName: 'Cloud SQL Logs Link',
          },
          {
            name: 'Cloud Load Balancer',
            href: '/docs/gcp-monitoring/gcp-clb/logging/',
            icon: <MdRouter className="h-7 w-7 text-blue-500" />,
            clickName: 'Cloud Load Balancer Logs Link',
          },
          {
            name: 'VPC',
            href: '/docs/gcp-monitoring/vpc/logging/',
            icon: <MdSecurity className="h-7 w-7 text-blue-500" />,
            clickName: 'VPC Logs Link',
          },
          {
            name: 'GKE',
            href: '/docs/gcp-monitoring/gke/gke-logging-and-metrics/',
            icon: <SiKubernetes className="h-7 w-7 text-blue-500" />,
            clickName: 'GKE Logs Link',
          },
          {
            name: 'Cloud Run',
            href: '/docs/gcp-monitoring/cloud-run/logging/',
            icon: <SiGooglecloud className="h-7 w-7 text-blue-500" />,
            clickName: 'Cloud Run Logs Link',
          },
        ]}
        sectionName="GCP"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  // Render sections based on the active section
  return (
    <div>
      <NavigationPills />

      {/* Show all sections if activeSection is 'all', otherwise show only the selected section */}
      {(activeSection === 'all' || activeSection === 'platforms') && renderPlatformsSection()}
      {(activeSection === 'all' || activeSection === 'languages') && renderLanguagesSection()}
      {(activeSection === 'all' || activeSection === 'collectors') && renderCollectorsSection()}
      {(activeSection === 'all' || activeSection === 'cloud') && renderCloudSection()}
    </div>
  )
}
