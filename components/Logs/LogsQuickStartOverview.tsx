import React from 'react'
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
} from 'react-icons/si'
import { TbHttpGet, TbBrandOpenSource } from 'react-icons/tb'
import { FaFileAlt, FaJava, FaWindows } from 'react-icons/fa'
import { LuLogIn } from 'react-icons/lu'
import IconCardGrid from '../Card/IconCardGrid'

interface IconCardData {
  name: string
  href: string
  icon: React.ReactNode
  clickName: string
}

const logsData: IconCardData[] = [
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
    icon: <SiVercel className="h-7 w-7 text-black" />,
    clickName: 'Vercel Logs Link',
  },
  {
    name: 'HTTP',
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
    name: 'From Files',
    href: '/docs/userguide/collect_logs_from_file',
    icon: <FaFileAlt className="h-7 w-7 text-orange-500" />,
    clickName: 'File Logs Link',
  },
  {
    name: 'Python SDK',
    href: '/docs/userguide/collecting_application_logs_otel_sdk_python',
    icon: <SiPython className="h-7 w-7 text-blue-500" />,
    clickName: 'Python SDK Logs Link',
  },
  {
    name: 'Java SDK',
    href: '/docs/userguide/collecting_application_logs_otel_sdk_java',
    icon: <FaJava className="h-7 w-7 text-red-600" />,
    clickName: 'Java SDK Logs Link',
  },
  {
    name: 'Node.js',
    href: '/docs/logs-management/send-logs/nodejs-winston-logs',
    icon: <SiNodedotjs className="h-7 w-7 text-green-600" />,
    clickName: 'Node.js Logs Link',
  },
  {
    name: 'FluentD',
    href: '/docs/userguide/fluentd_to_signoz',
    icon: <SiFluentd className="h-7 w-7 text-green-500" />,
    clickName: 'FluentD Logs Link',
  },
  {
    name: 'Cloudwatch',
    href: '/docs/userguide/send-cloudwatch-logs-to-signoz',
    icon: <SiAmazonwebservices className="h-7 w-7 text-orange-400" />,
    clickName: 'Cloudwatch Logs Link',
  },
  {
    name: 'Vector',
    href: '/docs/logs-management/send-logs/vector-logs-to-signoz',
    icon: <TbBrandOpenSource className="h-7 w-7 text-purple-500" />,
    clickName: 'Vector Logs Link',
  },
  {
    name: 'Tomcat',
    href: '/docs/logs-management/send-logs/collect-tomcat-access-and-garbage-collector-logs',
    icon: <SiApachetomcat className="h-7 w-7 text-yellow-600" />,
    clickName: 'Tomcat Logs Link',
  },
  {
    name: 'Windows',
    href: '/docs/logs-management/send-logs/windows-events-log',
    icon: <FaWindows className="h-7 w-7 text-blue-500" />,
    clickName: 'Windows Logs Link',
  },
]

export default function LogsQuickStartOverview() {
  return (
    <IconCardGrid
      cards={logsData}
      sectionName="Logs Sources Section"
      viewAllHref="/docs/logs-management/send-logs-to-signoz"
      viewAllText="View all logs sources"
      gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
    />
  )
}
