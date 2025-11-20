'use client'

import React, { useState } from 'react'
import { SiNodedotjs, SiNextdotjs, SiNuxtdotjs, SiJavascript, SiReact } from 'react-icons/si'
import { LuActivity, LuLogIn } from 'react-icons/lu'
import { TbChartHistogram, TbHeartbeat, TbShieldLock } from 'react-icons/tb'
import { FaRegFileAlt } from 'react-icons/fa'
import IconCardGrid from '../Card/IconCardGrid'

type SectionId = 'all' | 'server' | 'frontend' | 'advanced'

interface JavascriptInstrumentationListicleProps {
  category?: SectionId
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

  const renderServerSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Back-end & Fullstack Runtimes</h2>
      <IconCardGrid
        cards={[
          {
            name: 'Node.js',
            href: '/docs/instrumentation/javascript/opentelemetry-nodejs',
            icon: <SiNodedotjs className="h-7 w-7 text-green-500" />,
            clickName: 'Node.js Instrumentation Link',
          },
          {
            name: 'Next.js',
            href: '/docs/instrumentation/javascript/opentelemetry-nextjs',
            icon: <SiNextdotjs className="h-7 w-7 rounded-full bg-white text-black" />,
            clickName: 'Next.js Instrumentation Link',
          },
          {
            name: 'Nuxt.js',
            href: '/docs/instrumentation/javascript/opentelemetry-nuxtjs',
            icon: <SiNuxtdotjs className="h-7 w-7 text-green-500" />,
            clickName: 'Nuxt.js Instrumentation Link',
          },
        ]}
        sectionName="JavaScript Back-end Section"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  const renderFrontendSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Frontend Monitoring</h2>
      <IconCardGrid
        cards={[
          {
            name: 'Send Frontend Traces',
            href: '/docs/frontend-monitoring/sending-traces-with-opentelemetry',
            icon: <LuActivity className="h-7 w-7 text-sky-500" />,
            clickName: 'Frontend Traces Instrumentation Link',
          },
          {
            name: 'Send Frontend Logs',
            href: '/docs/frontend-monitoring/sending-logs-with-opentelemetry',
            icon: <LuLogIn className="h-7 w-7 text-indigo-500" />,
            clickName: 'Frontend Logs Instrumentation Link',
          },
          {
            name: 'Send Frontend Metrics',
            href: '/docs/frontend-monitoring/sending-metrics-with-opentelemetry',
            icon: <TbChartHistogram className="h-7 w-7 text-emerald-500" />,
            clickName: 'Frontend Metrics Instrumentation Link',
          },
          {
            name: 'React Native',
            href: '/docs/instrumentation/javascript/opentelemetry-react-native',
            icon: <SiReact className="h-7 w-7 text-sky-400" />,
            clickName: 'React Native Instrumentation Link',
          },
          {
            name: 'Monitor Web Vitals',
            href: '/docs/frontend-monitoring/opentelemetry-web-vitals',
            icon: <TbHeartbeat className="h-7 w-7 text-rose-500" />,
            clickName: 'Web Vitals Instrumentation Link',
          },
          {
            name: 'Document Load Timings',
            href: '/docs/frontend-monitoring/document-load',
            icon: <FaRegFileAlt className="h-7 w-7 text-blue-500" />,
            clickName: 'Document Load Instrumentation Link',
          },
        ]}
        sectionName="JavaScript Frontend Section"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  const renderAdvancedSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Manual & Advanced Control</h2>
      <IconCardGrid
        cards={[
          {
            name: 'Manual Node.js Instrumentation',
            href: '/docs/instrumentation/manual-instrumentation/javascript/opentelemetry-nodejs',
            icon: <SiJavascript className="h-7 w-7 text-yellow-500" />,
            clickName: 'Manual Node.js Instrumentation Link',
          },
          {
            name: 'Selective Auto-Instrumentation',
            href: '/docs/instrumentation/manual-instrumentation/javascript/nodejs-selective-instrumentation',
            icon: <SiNodedotjs className="h-7 w-7 text-green-500" />,
            clickName: 'Selective Instrumentation Link',
          },
          {
            name: 'Enable OTLP HTTP CORS',
            href: '/docs/userguide/otlp-http-enable-cors',
            icon: <TbShieldLock className="h-7 w-7 text-purple-500" />,
            clickName: 'OTLP HTTP CORS Guide Link',
          },
        ]}
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
