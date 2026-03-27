import React from 'react'
import { FiBarChart } from 'react-icons/fi'
import { TbTimeline } from 'react-icons/tb'
import { WEB_VITALS_ITEMS } from '@/constants/componentItems'

const ICON_MAP: Record<string, React.ReactNode> = {
  '/docs/frontend-monitoring/web-vitals-with-metrics': (
    <FiBarChart className="h-7 w-7 text-red-500" />
  ),
  '/docs/frontend-monitoring/web-vitals-with-traces': (
    <TbTimeline className="h-7 w-7 text-blue-600" />
  ),
}

const integrationsData = WEB_VITALS_ITEMS.map((item) => ({
  ...item,
  icon: ICON_MAP[item.href],
}))

export default function Integrations() {
  return (
    <div>
      <div className="mb-6 text-left">
        <h2 className="mb-2 text-2xl font-semibold text-signoz_vanilla-100">Web Vitals</h2>
        <p className="text-base text-signoz_vanilla-400">
          Send web vitals to SigNoz using OpenTelemetry
        </p>
      </div>
      <div className={`grid grid-cols-2 gap-4`}>
        {integrationsData.map((card, index) => (
          <a
            key={index}
            href={card.href}
            className="flex flex-col items-center justify-center rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 p-4 text-center no-underline transition-all hover:border-signoz_robin-500 hover:bg-signoz_ink-300"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-md">
              {card.icon}
            </div>
            <span className="text-sm font-medium text-signoz_vanilla-100">{card.name}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
