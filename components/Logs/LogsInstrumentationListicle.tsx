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
} from 'react-icons/si'
import { TbHttpGet, TbBrandOpenSource } from 'react-icons/tb'
import { FaAws, FaFileAlt, FaJava, FaWindows } from 'react-icons/fa'
import { LuLogIn } from 'react-icons/lu'
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
            name: 'Python OTel SDK',
            href: '/docs/userguide/collecting_application_logs_otel_sdk_python',
            icon: <SiPython className="h-7 w-7 text-blue-500" />,
            clickName: 'Python OTel SDK Logs Link',
          },
          {
            name: 'Python Auto-Instrumentation',
            href: '/docs/userguide/python-logs-auto-instrumentation',
            icon: <SiPython className="h-7 w-7 text-blue-600" />,
            clickName: 'Python Auto Logs Link',
          },
          {
            name: 'Java OTel SDK',
            href: '/docs/userguide/collecting_application_logs_otel_sdk_java',
            icon: <FaJava className="h-7 w-7 text-red-600" />,
            clickName: 'Java SDK Logs Link',
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
      <IconCardGrid
        cards={[
          {
            name: 'Cloudwatch',
            href: '/docs/userguide/send-cloudwatch-logs-to-signoz',
            icon: <SiAmazonwebservices className="h-7 w-7 text-orange-400" />,
            clickName: 'Cloudwatch Logs Link',
          },
          {
            name: 'AWS Lambda',
            href: '/docs/logs-management/send-logs/aws-lambda-nodejs',
            icon: <SiAmazonwebservices className="h-7 w-7 text-orange-500" />,
            clickName: 'AWS Lambda Logs Link',
          },
          {
            name: 'Heroku',
            href: '/docs/userguide/heroku_logs_to_signoz',
            icon: <SiHeroku className="h-7 w-7 text-purple-600" />,
            clickName: 'Heroku Cloud Logs Link',
          },
          {
            name: 'Vercel',
            href: '/docs/userguide/vercel_logs_to_signoz',
            icon: (
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black p-1">
                <SiVercel className="h-7 w-7 text-white" />
              </span>
            ),
            clickName: 'Vercel Cloud Logs Link',
          },
          {
            name: 'Cloudflare',
            href: '/docs/logs-management/send-logs/cloudflare-logs',
            icon: <SiCloudflare className="h-7 w-7 text-orange-500" />,
            clickName: 'Cloudflare Cloud Logs Link',
          },
        ]}
        sectionName="Cloud Logs"
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
