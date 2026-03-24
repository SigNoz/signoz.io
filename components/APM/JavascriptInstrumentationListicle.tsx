'use client'

import React, { useState } from 'react'
import { SiNodedotjs, SiNextdotjs, SiNuxtdotjs, SiJavascript, SiReact } from 'react-icons/si'
import { LuActivity, LuLogIn } from 'react-icons/lu'
import { TbChartHistogram, TbHeartbeat, TbShieldLock } from 'react-icons/tb'
import { FaRegFileAlt } from 'react-icons/fa'
import IconCardGrid from '../Card/IconCardGrid'
import { JAVASCRIPT_INSTRUMENTATION_ITEMS } from '@/constants/componentItems'

type SectionId = 'all' | 'server' | 'frontend' | 'advanced'

interface JavascriptInstrumentationListicleProps {
  category?: SectionId
}

const ICON_MAP: Record<string, React.ReactNode> = {
  // Server
  '/docs/instrumentation/javascript/opentelemetry-nodejs': (
    <SiNodedotjs className="h-7 w-7 text-green-500" />
  ),
  '/docs/instrumentation/javascript/opentelemetry-nextjs': (
    <SiNextdotjs className="h-7 w-7 rounded-full bg-white text-black" />
  ),
  '/docs/instrumentation/javascript/opentelemetry-nuxtjs': (
    <SiNuxtdotjs className="h-7 w-7 text-green-500" />
  ),
  // Frontend
  '/docs/frontend-monitoring/sending-traces-with-opentelemetry': (
    <LuActivity className="h-7 w-7 text-sky-500" />
  ),
  '/docs/frontend-monitoring/sending-logs-with-opentelemetry': (
    <LuLogIn className="h-7 w-7 text-indigo-500" />
  ),
  '/docs/frontend-monitoring/sending-metrics-with-opentelemetry': (
    <TbChartHistogram className="h-7 w-7 text-emerald-500" />
  ),
  '/docs/instrumentation/javascript/opentelemetry-react-native': (
    <SiReact className="h-7 w-7 text-sky-400" />
  ),
  '/docs/frontend-monitoring/opentelemetry-web-vitals': (
    <TbHeartbeat className="h-7 w-7 text-rose-500" />
  ),
  '/docs/frontend-monitoring/document-load': <FaRegFileAlt className="h-7 w-7 text-blue-500" />,
  // Advanced
  '/docs/instrumentation/javascript/nodejs-manual-instrumentation': (
    <SiJavascript className="h-7 w-7 text-yellow-500" />
  ),
  '/docs/instrumentation/javascript/nodejs-selective-instrumentation': (
    <SiNodedotjs className="h-7 w-7 text-green-500" />
  ),
  '/docs/userguide/otlp-http-enable-cors': <TbShieldLock className="h-7 w-7 text-purple-500" />,
}

export default function JavascriptInstrumentationListicle({
  category = 'all',
}: JavascriptInstrumentationListicleProps) {
  const sections: { id: SectionId; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'server', label: 'Back-end & Fullstack' },
    { id: 'frontend', label: 'Frontend Monitoring' },
    { id: 'advanced', label: 'Manual & Advanced' },
  ]

  const [activeSection, setActiveSection] = useState<SectionId>(
    category === 'all' ? 'all' : category
  )

  const NavigationPills = () => (
    <div className="mb-8 flex flex-wrap gap-2">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => setActiveSection(section.id)}
          aria-current={activeSection === section.id ? 'true' : undefined}
          aria-label={`View ${section.label} instrumentation`}
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

  const mapIcons = (items: readonly { name: string; href: string; clickName: string }[]) =>
    items.map((item) => ({
      ...item,
      icon: ICON_MAP[item.href],
    }))

  const renderServerSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Back-end & Fullstack Runtimes</h2>
      <IconCardGrid
        cards={mapIcons(JAVASCRIPT_INSTRUMENTATION_ITEMS.server)}
        sectionName="JavaScript Back-end Section"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  const renderFrontendSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Frontend Monitoring</h2>
      <IconCardGrid
        cards={mapIcons(JAVASCRIPT_INSTRUMENTATION_ITEMS.frontend)}
        sectionName="JavaScript Frontend Section"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  const renderAdvancedSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Manual & Advanced Control</h2>
      <IconCardGrid
        cards={mapIcons(JAVASCRIPT_INSTRUMENTATION_ITEMS.advanced)}
        sectionName="JavaScript Advanced Section"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  return (
    <div>
      <NavigationPills />

      {(activeSection === 'all' || activeSection === 'server') && renderServerSection()}
      {(activeSection === 'all' || activeSection === 'frontend') && renderFrontendSection()}
      {(activeSection === 'all' || activeSection === 'advanced') && renderAdvancedSection()}
    </div>
  )
}
