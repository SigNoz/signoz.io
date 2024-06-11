'use client'

import React from 'react'
import { SidebarIcons } from '@/components/sidebar-icons/icons'

export enum GUIDES_TOPICS{
  ALL = '#all',
  OPENTELEMETRY = '#opentelemetry',
  KUBERNETES = '#kubernetes' ,
  DISTRIBUTED = '#distributed-tracing',
  OBSERVABILITY = '#observability',
  LOGS = '#logs',
  PROMETHEUS = '#prometheus',
  METRICS = '#metrics' ,
  DOCKER = '#docker' 
}

const sidebarItems = [
  { href: GUIDES_TOPICS.ALL, icon: SidebarIcons.All, label: 'All' },
  { href: GUIDES_TOPICS.OPENTELEMETRY, icon: SidebarIcons.Opentelemetry, label: 'Opentelemetry' },
  { href: GUIDES_TOPICS.KUBERNETES, icon: SidebarIcons.Kubernetes, label: 'Kubernetes Monitoring' },
  { href: GUIDES_TOPICS.DISTRIBUTED, icon: SidebarIcons.Distributed, label: 'Distributed Tracing' },
  { href: GUIDES_TOPICS.OBSERVABILITY, icon: SidebarIcons.Observability, label: 'Observability' },
  { href: GUIDES_TOPICS.LOGS, icon: SidebarIcons.Logs, label: 'Logs' },
  { href: GUIDES_TOPICS.PROMETHEUS, icon: SidebarIcons.Prometheus, label: 'Prometheus' },
  { href: GUIDES_TOPICS.METRICS, icon: SidebarIcons.Metrics, label: 'Metrics' },
  { href: GUIDES_TOPICS.DOCKER, icon: SidebarIcons.Docker, label: 'Docker' },
]

const SideBar = ({ onCategoryClick, activeItem }) => {
  return (
    <div className="h-full w-64">
      <ul className="pl-0">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activeItem === item.href
          return (
            <li key={index} className={`rounded-md py-2 pl-3 ${isActive ? 'bg-signoz_ink-200' : 'hover:bg-signoz_ink-400'}`}>
              <div onClick={() => onCategoryClick(item.href)} className="flex items-center text-white cursor-pointer">
                <Icon />
                <span className="pl-2.5">{item.label}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SideBar
