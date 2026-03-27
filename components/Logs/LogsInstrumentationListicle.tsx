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
  SiMysql,
  SiDeno,
  SiSupabase,
  SiHasura,
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
  MdOfflineBolt,
} from 'react-icons/md'
import IconCardGrid from '../Card/IconCardGrid'
import { LOGS_INSTRUMENTATION_ITEMS } from '@/constants/componentItems'

interface LogsInstrumentationListicleProps {
  category?: 'platforms' | 'languages' | 'collectors' | 'cloud' | 'all'
}

const ICON_MAP: Record<string, React.ReactNode> = {
  // Platforms
  '/docs/userguide/collect_kubernetes_pod_logs': <SiKubernetes className="h-7 w-7 text-blue-600" />,
  '/docs/userguide/collect_docker_logs': <SiDocker className="h-7 w-7 text-blue-500" />,
  '/docs/userguide/heroku_logs_to_signoz': <SiHeroku className="h-7 w-7 text-purple-600" />,
  '/docs/userguide/vercel-to-signoz': (
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black p-1">
      <SiVercel className="h-7 w-7 text-white" />
    </span>
  ),
  '/docs/logs-management/send-logs/collect-tomcat-access-and-garbage-collector-logs': (
    <SiApachetomcat className="h-7 w-7 text-yellow-600" />
  ),
  '/docs/logs-management/send-logs/windows-events-log': (
    <FaWindows className="h-7 w-7 text-blue-500" />
  ),
  '/docs/logs-management/send-logs/cloudflare-logs': (
    <SiCloudflare className="h-7 w-7 text-orange-500" />
  ),
  '/docs/integrations/opentelemetry-neondb': (
    <img src="/svgs/icons/neon.svg" alt="Neon" className="h-7 w-7 object-contain" />
  ),
  '/docs/logs-management/send-logs/convex-log-streams-signoz': (
    <img src="/img/icons/convex-logo.svg" alt="Convex" className="h-9 w-9" />
  ),
  '/docs/logs-management/send-logs/supabase-logs': (
    <SiSupabase className="h-7 w-7 text-emerald-500" />
  ),
  // Languages
  '/docs/logs-management/send-logs/python-logs': <SiPython className="h-7 w-7 text-blue-500" />,
  '/docs/logs-management/send-logs/java-logs': <FaJava className="h-7 w-7 text-red-600" />,
  '/docs/logs-management/send-logs/nodejs-logs': <SiNodedotjs className="h-7 w-7 text-green-600" />,
  '/docs/logs-management/send-logs/opentelemetry-nodejs-bunyan-logs': (
    <SiNodedotjs className="h-7 w-7 text-green-600" />
  ),
  '/docs/logs-management/send-logs/nodejs-winston-logs': (
    <SiNodedotjs className="h-7 w-7 text-green-600" />
  ),
  '/docs/logs-management/send-logs/nodejs-pino-logs': (
    <SiNodedotjs className="h-7 w-7 text-green-500" />
  ),
  '/docs/logs-management/send-logs/aws-lambda-nodejs': (
    <SiAmazonwebservices className="h-7 w-7 text-orange-400" />
  ),
  '/docs/logs-management/send-logs/logrus-to-signoz': <SiGo className="h-7 w-7 text-cyan-500" />,
  '/docs/logs-management/send-logs/zap-to-signoz': <SiGo className="h-7 w-7 text-cyan-600" />,
  '/docs/instrumentation/opentelemetry-deno': <SiDeno className="h-7 w-7 text-blue-500" />,
  // Collectors
  '/docs/userguide/collect_logs_from_file': <FaFileAlt className="h-7 w-7 text-orange-500" />,
  '/docs/userguide/send-logs-http': <TbHttpGet className="h-7 w-7 text-green-600" />,
  '/docs/userguide/collecting_syslogs': <LuLogIn className="h-7 w-7 text-gray-600" />,
  '/docs/userguide/fluentd_to_signoz': <SiFluentd className="h-7 w-7 text-green-500" />,
  '/docs/userguide/fluentbit_to_signoz': <SiFluentd className="h-7 w-7 text-blue-500" />,
  '/docs/userguide/logstash_to_signoz': (
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
      LS
    </span>
  ),
  '/docs/logs-management/send-logs/vector-logs-to-signoz': (
    <TbBrandOpenSource className="h-7 w-7 text-purple-500" />
  ),
  // Cloud - AWS
  '/docs/aws-monitoring/ec2/ec2-logs': <SiAmazonec2 className="h-7 w-7 text-orange-500" />,
  '/docs/integrations/aws/ecs': <SiAmazonecs className="h-7 w-7 text-orange-500" />,
  '/docs/collection-agents/k8s/k8s-infra/install-k8s-infra/': (
    <SiAmazoneks className="h-7 w-7 text-orange-500" />
  ),
  '/docs/integrations/aws/lambda': <SiAwslambda className="h-7 w-7 text-orange-500" />,
  '/docs/aws-monitoring/s3': <SiAmazons3 className="h-7 w-7 text-green-600" />,
  '/docs/integrations/aws/rds': <SiAmazonrds className="h-7 w-7 text-blue-500" />,
  '/docs/integrations/aws/dynamodb': <SiAmazondynamodb className="h-7 w-7 text-blue-500" />,
  '/docs/integrations/aws/elasticache': <MdMemory className="h-7 w-7 text-blue-500" />,
  '/docs/aws-monitoring/elb': <MdRouter className="h-7 w-7 text-purple-500" />,
  '/docs/integrations/aws/alb': <MdRouter className="h-7 w-7 text-purple-500" />,
  '/docs/integrations/aws/api-gateway': <MdHttp className="h-7 w-7 text-purple-500" />,
  '/docs/integrations/aws/msk': <MdCloudQueue className="h-7 w-7 text-black dark:text-white" />,
  '/docs/integrations/aws/sns': <MdNotifications className="h-7 w-7 text-pink-500" />,
  '/docs/integrations/aws/sqs': <MdMessage className="h-7 w-7 text-pink-500" />,
  '/docs/aws-monitoring/vpc': <MdSecurity className="h-7 w-7 text-green-500" />,
  '/docs/userguide/send-cloudwatch-logs-to-signoz': (
    <SiAmazoncloudwatch className="h-7 w-7 text-pink-600" />
  ),
  // Cloud - Azure
  '/docs/azure-monitoring/app-service/logging/': <MdCloudQueue className="h-7 w-7 text-blue-600" />,
  // Note: '/docs/collection-agents/k8s/k8s-infra/install-k8s-infra/' already mapped above (AKS reuses EKS icon)
  '/docs/azure-monitoring/az-container-apps/logging/': (
    <SiDocker className="h-7 w-7 text-blue-500" />
  ),
  '/docs/azure-monitoring/az-fns/logging/': <MdOfflineBolt className="h-7 w-7 text-orange-500" />,
  '/docs/azure-monitoring/az-blob-storage/logging/': (
    <MdStorage className="h-7 w-7 text-blue-600" />
  ),
  '/docs/azure-monitoring/virtual-machines/vm-metrics': (
    <SiAmazonec2 className="h-7 w-7 text-blue-600" />
  ),
  '/docs/azure-monitoring/mysql-flexible-server': <SiMysql className="h-7 w-7 text-blue-500" />,
  // Cloud - GCP
  '/docs/gcp-monitoring/gcp-fns/logging/': <SiAwslambda className="h-7 w-7 text-blue-500" />,
  '/docs/gcp-monitoring/app-engine/logging/': <SiGooglecloud className="h-7 w-7 text-blue-500" />,
  '/docs/gcp-monitoring/compute-engine/logging/': (
    <SiGooglecloud className="h-7 w-7 text-blue-500" />
  ),
  '/docs/gcp-monitoring/gcs/logging/': <SiGooglecloud className="h-7 w-7 text-blue-500" />,
  '/docs/gcp-monitoring/cloud-sql/logging/': <SiGooglecloud className="h-7 w-7 text-blue-500" />,
  '/docs/gcp-monitoring/gcp-clb/logging/': <MdRouter className="h-7 w-7 text-blue-500" />,
  '/docs/gcp-monitoring/vpc/logging/': <MdSecurity className="h-7 w-7 text-blue-500" />,
  '/docs/gcp-monitoring/gke/gke-logging-and-metrics/': (
    <SiKubernetes className="h-7 w-7 text-blue-500" />
  ),
  '/docs/gcp-monitoring/cloud-run/logging/': <SiGooglecloud className="h-7 w-7 text-blue-500" />,
  '/docs/integrations/opentelemetry-hasura': <SiHasura className="h-7 w-7 text-blue-600" />,
}

// AKS uses the same href as EKS but needs a different icon — override for Azure context
const AZURE_AKS_ICON: React.ReactNode = <SiKubernetes className="h-7 w-7 text-blue-600" />

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

  const mapIcons = (items: readonly { name: string; href: string; clickName: string }[]) =>
    items.map((item) => ({
      ...item,
      icon: ICON_MAP[item.href],
    }))

  const awsCloudItems = LOGS_INSTRUMENTATION_ITEMS.cloud.aws
  const azureCloudItems = LOGS_INSTRUMENTATION_ITEMS.cloud.azure
  const gcpCloudItems = LOGS_INSTRUMENTATION_ITEMS.cloud.gcp

  // Azure AKS shares the same href as EKS; override its icon
  const mapAzureIcons = (items: readonly { name: string; href: string; clickName: string }[]) =>
    items.map((item) => ({
      ...item,
      icon: item.name === 'AKS' ? AZURE_AKS_ICON : ICON_MAP[item.href],
    }))

  // Platform logs
  const renderPlatformsSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Container & Platform Logs</h2>
      <IconCardGrid
        cards={mapIcons(LOGS_INSTRUMENTATION_ITEMS.platforms)}
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
        cards={mapIcons(LOGS_INSTRUMENTATION_ITEMS.languages)}
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
        cards={mapIcons(LOGS_INSTRUMENTATION_ITEMS.collectors)}
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
        cards={mapIcons(awsCloudItems)}
        sectionName="AWS Services"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />

      <h3 className="mb-4 text-xl font-semibold">Azure</h3>
      <IconCardGrid
        cards={mapAzureIcons(azureCloudItems)}
        sectionName="Azure Services"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />

      <h3 className="mb-4 text-xl font-semibold">GCP</h3>
      <IconCardGrid
        cards={mapIcons(gcpCloudItems)}
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
