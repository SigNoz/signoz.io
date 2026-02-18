import React from 'react'
import {
  SiKubernetes,
  SiDocker,
  SiPython,
  SiNodedotjs,
  SiFluentbit,
  SiAmazonwebservices,
  SiGo,
} from 'react-icons/si'
import { TbHttpGet } from 'react-icons/tb'
import { FaFileAlt, FaJava } from 'react-icons/fa'
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
    name: 'Log Files',
    href: '/docs/userguide/collect_logs_from_file',
    icon: <FaFileAlt className="h-7 w-7 text-orange-500" />,
    clickName: 'File Logs Link',
  },
  {
    name: 'Syslogs',
    href: '/docs/userguide/collecting_syslogs',
    icon: <LuLogIn className="h-7 w-7 text-gray-600" />,
    clickName: 'Syslogs Link',
  },
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
    name: 'Go',
    href: '/docs/logs-management/send-logs/logrus-to-signoz',
    icon: <SiGo className="h-7 w-7 text-cyan-500" />,
    clickName: 'Go Logs Link',
  },
  {
    name: 'FluentBit',
    href: '/docs/userguide/fluentbit_to_signoz',
    icon: <SiFluentbit className="h-7 w-7 text-blue-500" />,
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
    name: 'HTTP',
    href: '/docs/userguide/send-logs-http',
    icon: <TbHttpGet className="h-7 w-7 text-green-600" />,
    clickName: 'HTTP Logs Link',
  },
  {
    name: 'AWS',
    href: '/docs/userguide/send-cloudwatch-logs-to-signoz',
    icon: <SiAmazonwebservices className="h-7 w-7 text-orange-400" />,
    clickName: 'AWS Logs Link',
  },
]

export default function LogsQuickStartOverview() {
  return (
    <IconCardGrid
      cards={logsData}
      sectionName="Logs Sources Section"
      viewAllHref="/docs/logs-management/send-logs-to-signoz"
      viewAllText="View all log sources"
      gridCols="grid-cols-3 sm:grid-cols-4 md:grid-cols-6"
    />
  )
}
