import React from 'react'
import { LucideDraftingCompass, LucideScrollText, LucideChartNoAxesColumn } from 'lucide-react'
import {
  SiJavascript,
  SiPython,
  SiGo,
  SiKubernetes,
  SiDocker,
  SiPrometheus,
  SiNodedotjs,
} from 'react-icons/si'
import LinksCardGrid, { LinksCardProps } from '@/components/Card/LinksCardGrid'

export default function SendData() {
  const cardData: LinksCardProps[] = [
    {
      title: 'APM / Send Traces',
      description: 'Automatic instrumentation for popular frameworks',
      href: '/docs/instrumentation/',
      icon: <LucideDraftingCompass size={20} className="text-signoz_robin-500" />,
      clickName: 'Auto Instrument Card',
      clickText: 'Auto Instrument',
      internalLinks: [
        {
          name: 'JavaScript',
          href: '/docs/instrumentation/javascript/',
          icon: <SiJavascript className="h-5 w-5 text-yellow-500" />,
          clickName: 'JavaScript Link',
        },
        {
          name: 'Python',
          href: '/docs/instrumentation/python/',
          icon: <SiPython className="h-5 w-5 text-blue-500" />,
          clickName: 'Python Link',
        },
        {
          name: 'Java',
          href: '/docs/instrumentation/java/',
          icon: <img src="/img/icons/java-icon.svg" alt="Java" className="h-5 w-5" />,
          clickName: 'Java Link',
        },
        {
          name: 'Go',
          href: '/docs/instrumentation/golang/',
          icon: <SiGo className="h-5 w-5 text-cyan-500" />,
          clickName: 'Go Link',
        },
      ],
      viewAllHref: '/docs/instrumentation/',
    },
    {
      title: 'Send Logs',
      description: 'Configure log collection and analysis',
      href: '/docs/userguide/logs/',
      icon: <LucideScrollText size={20} className="text-signoz_robin-500" />,
      clickName: 'Send Logs Card',
      clickText: 'Send Logs',
      internalLinks: [
        {
          name: 'Kubernetes',
          href: '/docs/userguide/collect_kubernetes_pod_logs/',
          icon: <SiKubernetes className="h-5 w-5 text-blue-600" />,
          clickName: 'Kubernetes Link',
        },
        {
          name: 'Docker',
          href: '/docs/userguide/collect_docker_logs/',
          icon: <SiDocker className="h-5 w-5 text-blue-400" />,
          clickName: 'Docker Link',
        },
        {
          name: 'Python',
          href: '/docs/userguide/python-logs-auto-instrumentation/',
          icon: <SiPython className="h-5 w-5 text-blue-500" />,
          clickName: 'Python Logs Link',
        },
        {
          name: 'JavaScript',
          href: '/docs/logs-management/send-logs/nodejs-pino-logs/',
          icon: <SiJavascript className="h-5 w-5 text-yellow-500" />,
          clickName: 'JavaScript Logs Link',
        },
      ],
      viewAllHref: '/docs/userguide/logs/',
    },
    {
      title: 'Send Metrics',
      description: 'Configure metrics collection and visualization',
      href: '/docs/userguide/send-metrics-cloud/',
      icon: <LucideChartNoAxesColumn size={20} className="text-signoz_robin-500" />,
      clickName: 'Send Metrics Card',
      clickText: 'Send Metrics',
      internalLinks: [
        {
          name: 'Prometheus',
          href: '/docs/userguide/send-metrics-cloud/#enable-a-prometheus-receiver',
          icon: <SiPrometheus className="h-5 w-5 text-cyan-500" />,
          clickName: 'Prometheus Metrics Link',
        },
        {
          name: 'NodeJS',
          href: '/opentelemetry/custom-metrics-nodejs/',
          icon: <SiNodedotjs className="h-5 w-5 text-yellow-500" />,
          clickName: 'NodeJS Metrics Link',
        },
        {
          name: 'Python',
          href: '/opentelemetry/python-custom-metrics/',
          icon: <SiPython className="h-5 w-5 text-blue-500" />,
          clickName: 'Python Metrics Link',
        },
      ],
      viewAllHref: '/docs/userguide/send-metrics-cloud/',
    },
  ]

  return (
    <div className="mx-auto mb-12 w-full max-w-7xl">
      <div className="mb-6 text-left">
        <h2 className="mb-2 text-2xl font-semibold text-signoz_vanilla-100">
          Start sending data to SigNoz
        </h2>
        <p className="text-base text-signoz_vanilla-400">
          Connect your application to SigNoz in just a few minutes
        </p>
      </div>

      <LinksCardGrid cards={cardData} sectionName="Send Data Section" />
    </div>
  )
}
