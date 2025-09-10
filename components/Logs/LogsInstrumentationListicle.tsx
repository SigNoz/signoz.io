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

      <h3 className="mb-4 text-2xl font-semibold">AWS</h3>
      <IconCardGrid
        cards={[
          {
            name: 'EC2',
            href: '/docs/aws-monitoring/ec2-logs/',
            icon: <img src="/img/icons/ec2.svg" width={20} height={20} alt="EC2" />,
            clickName: 'EC2 Logs Link',
          },
          {
            name: 'EKS',
            href: '/docs/collection-agents/k8s/k8s-infra/install-k8s-infra/',
            icon: <img src="/img/icons/eks.svg" width={20} height={20} alt="EKS" />,
            clickName: 'EKS Logs Link',
          },
          {
            name: 'ELB',
            href: '/docs/aws-monitoring/elb-logs/',
            icon: <img src="/img/icons/elb.svg" width={20} height={20} alt="ELB" />,
            clickName: 'ELB Logs Link',
          },
          {
            name: 'VPC',
            href: '/docs/aws-monitoring/vpc-logs/',
            icon: <img src="/img/icons/vpc.svg" width={20} height={20} alt="VPC" />,
            clickName: 'VPC Logs Link',
          },
          {
            name: 'RDS',
            href: '/docs/aws-monitoring/rds-logs/',
            icon: <img src="/img/icons/rds.svg" width={20} height={20} alt="RDS" />,
            clickName: 'RDS Logs Link',
          },
          {
            name: 'Cloudwatch',
            href: '/docs/userguide/send-cloudwatch-logs-to-signoz',
            icon: <img src="/img/icons/cloudwatch.svg" width={20} height={20} alt="Cloudwatch" />,
            clickName: 'Cloudwatch Logs Link',
          },
          {
            name: 'Lambda NodeJS',
            href: '/docs/logs-management/send-logs/aws-lambda-nodejs',
            icon: <img src="/img/icons/lambda.svg" width={20} height={20} alt="Lambda" />,
            clickName: 'AWS Lambda Logs Link',
          },
        ]}
        sectionName="AWS"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
      <h3 className="mb-4 text-2xl font-semibold">Azure</h3>
        <IconCardGrid
        cards={[
          {
            name: 'App Service',
            href: '/docs/azure-monitoring/app-service/logging/',
            icon: <img src="/img/icons/azure-app-service.svg" width={20} height={20} alt="App Service" />,
            clickName: 'App Service Logs Link',
          },
          {
            name: 'AKS',
            href: '/docs/collection-agents/k8s/k8s-infra/install-k8s-infra/',
            icon: <img src="/img/icons/azure-aks.svg" width={20} height={20} alt="AKS" />,
            clickName: 'AKS Logs Link',
          },
          {
            name: 'Container Apps',
            href: '/docs/azure-monitoring/az-container-apps/logging/',
            icon: <img src="/img/icons/azure-container-apps.svg" width={20} height={20} alt="Container Apps" />,
            clickName: 'Container Apps Logs Link',
          },
          {
            name: 'Azure Functions',
            href: '/docs/azure-monitoring/az-fns/logging/',
            icon: <img src="/img/icons/azure-functions.svg" width={20} height={20} alt="Azure Functions" />,
            clickName: 'Azure Functions Logs Link',
          },
          {
            name: 'Blob Storage',
            href: '/docs/azure-monitoring/az-blob-storage/logging/',
            icon: <img src="/img/icons/azure-blob-storage.svg" width={20} height={20} alt="Blob Storage" />,
            clickName: 'Blob Storage Logs Link',
          },
        ]}
        sectionName="Azure"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
      <h3 className="mb-4 text-2xl font-semibold">GCP</h3>
        <IconCardGrid
        cards={[
          {
            name: 'Cloud Functions',
            href: '/docs/gcp-monitoring/gcp-fns/logging/',
            icon: <img src="/img/icons/gcp-cloud-functions.svg" width={20} height={20} alt="Cloud Functions" />,
            clickName: 'Cloud Functions Logs Link',
          },
          {
            name: 'App Engine',
            href: '/docs/gcp-monitoring/app-engine/logging/',
            icon: <img src="/img/icons/gcp-app-engine.svg" width={20} height={20} alt="App Engine" />,
            clickName: 'App Engine Logs Link',
          },
          {
            name: 'Compute Engine',
            href: '/docs/gcp-monitoring/compute-engine/logging/',
            icon: <img src="/img/icons/gcp-compute-engine.svg" width={20} height={20} alt="Compute Engine" />,
            clickName: 'Compute Engine Logs Link',
          },
          {
            name: 'Cloud Storage',
            href: '/docs/gcp-monitoring/gcs/logging/',
            icon: <img src="/img/icons/gcp-cloud-storage.svg" width={20} height={20} alt="Cloud Storage" />,
            clickName: 'Cloud Storage Logs Link',
          },
          {
            name: 'Cloud SQL',
            href: '/docs/gcp-monitoring/cloud-sql/logging/',
            icon: <img src="/img/icons/gcp-cloud-sql.svg" width={20} height={20} alt="Cloud SQL" />,
            clickName: 'Cloud SQL Logs Link',
          },
          {
            name: 'Cloud Load Balancer',
            href: '/docs/gcp-monitoring/gcp-clb/logging/',
            icon: <img src="/img/icons/gcp-cloud-load-balancer.svg" width={20} height={20} alt="Cloud Load Balancer" />,
            clickName: 'Cloud Load Balancer Logs Link',
          },
          {
            name: 'Serverless VPC',
            href: '/docs/gcp-monitoring/vpc/logging/',
            icon: <img src="/img/icons/gcp-vpc.svg" width={20} height={20} alt="VPC" />,
            clickName: 'VPC Logs Link',
          },
          {
            name: 'GKE',
            href: '/docs/gcp-monitoring/gke/gke-logging-and-metrics/',
            icon: <img src="/img/icons/gcp-gke.svg" width={20} height={20} alt="GKE" />,
            clickName: 'GKE Logs Link',
          },
          {
            name: 'Cloud Run',
            href: '/docs/gcp-monitoring/cloud-run/logging/',
            icon: <img src="/img/icons/gcp-cloud-run.svg" width={20} height={20} alt="Cloud Run" />,
            clickName: 'Cloud Run Logs Link',
          },
        ]}
        sectionName="GCP"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
      <h3 className="mb-4 text-2xl font-semibold">Others</h3>
        <IconCardGrid
        cards={[
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
        ]}
        sectionName="Others"
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
