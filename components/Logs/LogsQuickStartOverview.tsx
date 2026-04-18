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
import { LOGS_QUICK_START_ITEMS } from '@/constants/componentItems'

const ICON_MAP: Record<string, React.ReactNode> = {
  '/docs/userguide/collect_kubernetes_pod_logs': <SiKubernetes className="h-7 w-7 text-blue-600" />,
  '/docs/userguide/collect_docker_logs': <SiDocker className="h-7 w-7 text-blue-500" />,
  '/docs/userguide/collect_logs_from_file': <FaFileAlt className="h-7 w-7 text-orange-500" />,
  '/docs/userguide/collecting_syslogs': <LuLogIn className="h-7 w-7 text-gray-600" />,
  '/docs/logs-management/send-logs/python-logs': <SiPython className="h-7 w-7 text-blue-500" />,
  '/docs/logs-management/send-logs/java-logs': <FaJava className="h-7 w-7 text-red-600" />,
  '/docs/logs-management/send-logs/nodejs-logs': <SiNodedotjs className="h-7 w-7 text-green-600" />,
  '/docs/logs-management/send-logs/logrus-to-signoz': <SiGo className="h-7 w-7 text-cyan-500" />,
  '/docs/userguide/fluentbit_to_signoz': <SiFluentbit className="h-7 w-7 text-blue-500" />,
  '/docs/userguide/logstash_to_signoz': (
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
      LS
    </span>
  ),
  '/docs/userguide/send-logs-http': <TbHttpGet className="h-7 w-7 text-green-600" />,
  '/docs/userguide/send-cloudwatch-logs-to-signoz': (
    <SiAmazonwebservices className="h-7 w-7 text-orange-400" />
  ),
}

const logsData = LOGS_QUICK_START_ITEMS.map((item) => ({
  ...item,
  icon: ICON_MAP[item.href],
}))

export default function LogsQuickStartOverview() {
  return (
    <IconCardGrid
      cards={logsData}
      sectionName="Logs Sources Section"
      viewAllHref="/docs/logs-management/send-logs-to-signoz"
      viewAllText="View all log sources"
      gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
    />
  )
}
