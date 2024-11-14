'use client'

import React from 'react'
import { SidebarIcons } from '@/components/sidebar-icons/icons'

export enum GUIDES_TOPICS {
  ALL = '#all',
  OPENTELEMETRY = '#opentelemetry',
  KUBERNETES = '#kubernetes',
  FAQs = '#faq',
  LOGGING = '#logging',
  PROMETHEUS = '#prometheus',
  APM = '#apm',
  Monitoring = '#monitoring',
  Grafana = '#grafana',
  Observability = '#observability',
  // DISTRIBUTED = '#distributed-tracing',
  // OBSERVABILITY = '#observability',
  // LOGS = '#logs',
  // PROMETHEUS = '#prometheus',
  // METRICS = '#metrics' ,
  // DOCKER = '#docker'
}

const sidebarItems = [
  { href: GUIDES_TOPICS.ALL, icon: SidebarIcons.All, label: 'All' },
 
  { href: GUIDES_TOPICS.KUBERNETES, icon: SidebarIcons.Kubernetes, label: 'Kubernetes Monitoring' },
  { href: GUIDES_TOPICS.FAQs, icon: SidebarIcons.FAQs, label: 'FAQs' },
  { href: GUIDES_TOPICS.LOGGING, icon: SidebarIcons.LOGGING, label: 'Logging' },
  { href: GUIDES_TOPICS.PROMETHEUS, icon: SidebarIcons.PROMETHEUS, label: 'Prometheus' },
  { href: GUIDES_TOPICS.OPENTELEMETRY, icon: SidebarIcons.Opentelemetry, label: 'Opentelemetry' },
  { href: GUIDES_TOPICS.APM, icon: SidebarIcons.APM, label: 'APM' },
  { href: GUIDES_TOPICS.Monitoring, icon: SidebarIcons.Monitoring, label: 'Monitoring' },
  { href: GUIDES_TOPICS.Observability, icon: SidebarIcons.Observability, label: 'Observability' },
  { href: GUIDES_TOPICS.Grafana, icon: SidebarIcons.Grafana, label: 'Grafana' },
  // { href: GUIDES_TOPICS.DISTRIBUTED, icon: SidebarIcons.Distributed, label: 'Distributed Tracing' },
  // { href: GUIDES_TOPICS.OBSERVABILITY, icon: SidebarIcons.Observability, label: 'Observability' },
  // { href: GUIDES_TOPICS.LOGS, icon: SidebarIcons.Logs, label: 'Logs' },
  // { href: GUIDES_TOPICS.PROMETHEUS, icon: SidebarIcons.Prometheus, label: 'Prometheus' },
  // { href: GUIDES_TOPICS.METRICS, icon: SidebarIcons.Metrics, label: 'Metrics' },
  // { href: GUIDES_TOPICS.DOCKER, icon: SidebarIcons.Docker, label: 'Docker' },
]

const SideBar = ({ onCategoryClick, activeItem }) => {
  return (
    <div className="h-full">
      <div className="flex flex-wrap gap-4 pl-0">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activeItem === item.href
          return (
            <div
              key={index}
              className={`rounded-md p-2 ${isActive ? 'bg-signoz_ink-200' : 'hover:bg-signoz_ink-400'}`}
            >
              <div
                onClick={() => onCategoryClick(item.href)}
                className="min-[240px] flex cursor-pointer items-center text-white"
              >
                <Icon />
                <span className="pl-2.5">{item.label}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SideBar
