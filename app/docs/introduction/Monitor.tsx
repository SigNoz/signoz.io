import React from 'react'
import {
  ArrowRight,
  MonitorSmartphone,
  CloudCog,
  DatabaseZap,
  BrainCircuit,
  Box,
  Server,
  LucideBoxes,
} from 'lucide-react'
import {
  SiKubernetes,
  SiAmazonwebservices,
  SiGooglecloud,
  SiReact,
  SiAndroid,
  SiApachekafka,
  SiDocker,
} from 'react-icons/si'
import LinksCardGrid, { LinksCardProps } from '@/components/Card/LinksCardGrid'

export default function Monitor() {
  const cardData: LinksCardProps[] = [
    {
      title: 'Infrastructure',
      description: 'Monitor your infrastructure and resources',
      href: '/docs/infrastructure-monitoring/overview/',
      icon: <LucideBoxes size={20} className="text-signoz_robin-500" />,
      clickName: 'Infrastructure Card',
      clickText: 'Infrastructure',
      internalLinks: [
        {
          name: 'Host Monitoring',
          href: '/docs/userguide/hostmetrics/',
          icon: <Server className="h-5 w-5 text-orange-500" />,
          clickName: 'Host Monitoring Link',
        },
        {
          name: 'Kubernetes',
          href: '/docs/userguide/k8s-metrics/',
          icon: <SiKubernetes className="h-5 w-5 text-blue-600" />,
          clickName: 'Kubernetes Monitoring Link',
        },
        {
          name: 'Docker',
          href: '/docs/metrics-management/docker-container-metrics/',
          icon: <SiDocker className="h-5 w-5 text-blue-400" />,
          clickName: 'Docker Metrics Link',
        },
      ],
    },
    {
      title: 'Monitor Cloud',
      description: 'Track your cloud resources and services',
      icon: <CloudCog size={20} className="text-signoz_robin-500" />,
      clickName: 'Monitor Cloud Card',
      clickText: 'Monitor Cloud',
      internalLinks: [
        {
          name: 'AWS',
          href: '/docs/ec2-monitoring/',
          icon: <SiAmazonwebservices className="h-5 w-5 text-orange-500" />,
          clickName: 'AWS Monitoring Link',
        },
        {
          name: 'Azure',
          href: '/docs/azure-monitoring/',
          icon: <img src="/img/icons/azure-icon.svg" width={20} height={20} alt="Azure" />,
          clickName: 'Azure Monitoring Link',
        },
        {
          name: 'GCP',
          href: '/docs/gcp-monitoring/',
          icon: <SiGooglecloud className="h-5 w-5 text-red-500" />,
          clickName: 'GCP Monitoring Link',
        },
      ],
    },
    {
      title: 'Specialized Monitoring',
      description: 'Monitor specialized services and applications',
      icon: <DatabaseZap size={20} className="text-signoz_robin-500" />,
      clickName: 'Specialized Monitoring Card',
      clickText: 'Specialized Monitoring',
      internalLinks: [
        {
          name: 'Frontend',
          href: '/docs/frontend-monitoring/opentelemetry-web-vitals/',
          icon: <SiReact className="h-5 w-5 text-blue-400" />,
          clickName: 'Frontend Monitoring Link',
        },
        {
          name: 'Mobile',
          href: '/docs/frontend-and-mobile-monitoring/',
          icon: <SiAndroid className="h-5 w-5 text-green-500" />,
          clickName: 'Mobile Monitoring Link',
        },
        {
          name: 'LLMs',
          href: '/docs/community/llm-monitoring/',
          icon: <BrainCircuit className="h-5 w-5 text-purple-600" />,
          clickName: 'LLMs Monitoring Link',
        },
        {
          name: 'Queues',
          href: '/docs/messaging-queues/kafka/',
          icon: <SiApachekafka className="h-5 w-5 text-black dark:text-white" />,
          clickName: 'Queues Monitoring Link',
        },
      ],
    },
  ]

  return (
    <div className="mx-auto mb-12 w-full max-w-7xl">
      <div className="mb-6 text-left">
        <h2 className="mb-2 text-2xl font-semibold text-signoz_vanilla-100">
          Monitor your applications
        </h2>
        <p className="text-base text-signoz_vanilla-400">
          Monitor your infrastructure, cloud services, and applications
        </p>
      </div>

      <LinksCardGrid cards={cardData} sectionName="Monitor Section" />
    </div>
  )
}
