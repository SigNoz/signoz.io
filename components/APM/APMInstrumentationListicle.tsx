'use client'

import React, { useState } from 'react'
import {
  SiPython,
  SiJavascript,
  SiGo,
  SiPhp,
  SiDotnet,
  SiRubyonrails,
  SiElixir,
  SiRust,
  SiCplusplus,
  SiFlask,
  SiSwift,
  SiFalcon,
  SiDjango,
  SiFastapi,
  SiGunicorn,
  SiCelery,
  SiQuarkus,
  SiApachetomcat,
  SiNodedotjs,
  SiCloudflare,
  SiNextdotjs,
  SiNuxtdotjs,
  SiNginx,
  SiReact,
  SiLaravel,
  SiKotlin,
  SiFlutter,
  SiAndroid,
  SiWordpress,
  SiDeno,
  SiVercel,
} from 'react-icons/si'
import IconCardGrid from '../Card/IconCardGrid'
import { APM_INSTRUMENTATION_ITEMS } from '@/constants/componentItems'

interface APMInstrumentationListicleProps {
  language?: 'python' | 'java' | 'javascript' | 'other' | 'mobile' | 'additional' | 'all'
}

const ICON_MAP: Record<string, React.ReactNode> = {
  // JavaScript
  '/docs/instrumentation/opentelemetry-nodejs': <SiNodedotjs className="h-7 w-7 text-green-500" />,
  '/docs/instrumentation/opentelemetry-nextjs': (
    <SiNextdotjs className="h-7 w-7 rounded-full bg-white text-black" />
  ),
  '/docs/instrumentation/opentelemetry-reactjs': <SiReact className="h-7 w-7 text-blue-400" />,
  '/docs/instrumentation/opentelemetry-react-native': <SiReact className="h-7 w-7 text-blue-400" />,
  '/docs/instrumentation/opentelemetry-nuxtjs': <SiNuxtdotjs className="h-7 w-7 text-green-500" />,
  '/docs/instrumentation/opentelemetry-cloudflare': (
    <SiCloudflare className="h-7 w-7 text-orange-500" />
  ),
  '/docs/frontend-monitoring': <SiJavascript className="h-7 w-7 text-yellow-500" />,
  // Python
  '/docs/instrumentation/python': <SiPython className="h-7 w-7 text-blue-500" />,
  '/docs/instrumentation/django': <SiDjango className="h-7 w-7 text-green-800" />,
  '/docs/instrumentation/fastapi': <SiFastapi className="h-7 w-7 text-teal-500" />,
  '/docs/instrumentation/flask': <SiFlask className="h-7 w-7 rounded-full bg-white text-black" />,
  '/docs/instrumentation/falcon': <SiFalcon className="h-7 w-7 text-green-600" />,
  '/docs/instrumentation/hypercorn-unicorn-support': (
    <SiGunicorn className="h-7 w-7 text-green-500" />
  ),
  '/docs/instrumentation/celery': <SiCelery className="h-7 w-7 text-green-600" />,
  // Java
  '/docs/instrumentation/java/opentelemetry-java': (
    <img src="/img/icons/java-icon.svg" alt="Java" className="h-5 w-5" />
  ),
  '/docs/instrumentation/opentelemetry-quarkus': <SiQuarkus className="h-7 w-7 text-blue-600" />,
  '/docs/instrumentation/tomcat': <SiApachetomcat className="h-7 w-7 text-orange-600" />,
  '/docs/instrumentation/jboss': (
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
      JB
    </span>
  ),
  // Other languages
  '/docs/instrumentation/golang': <SiGo className="h-7 w-7 text-cyan-500" />,
  '/docs/instrumentation/opentelemetry-deno': <SiDeno className="h-7 w-7 text-blue-500" />,
  '/docs/instrumentation/php': <SiPhp className="h-7 w-7 text-purple-500" />,
  '/docs/instrumentation/laravel': <SiLaravel className="h-7 w-7 text-purple-500" />,
  '/docs/instrumentation/dotnet': <SiDotnet className="h-7 w-7 text-blue-600" />,
  '/docs/instrumentation/ruby-on-rails': <SiRubyonrails className="h-7 w-7 text-red-600" />,
  '/docs/instrumentation/elixir': <SiElixir className="h-7 w-7 text-purple-600" />,
  '/docs/instrumentation/rust': <SiRust className="h-7 w-7 text-orange-600" />,
  '/docs/instrumentation/opentelemetry-cpp': <SiCplusplus className="h-7 w-7 text-blue-700" />,
  '/docs/instrumentation/swift': <SiSwift className="h-7 w-7 text-orange-500" />,
  // Mobile
  '/docs/instrumentation/mobile-instrumentation/opentelemetry-java': (
    <SiAndroid className="h-7 w-7 text-green-500" />
  ),
  '/docs/instrumentation/mobile-instrumentation/opentelemetry-kotlin': (
    <SiKotlin className="h-7 w-7 text-purple-500" />
  ),
  '/docs/instrumentation/mobile-instrumentation/opentelemetry-swiftui': (
    <SiSwift className="h-7 w-7 text-orange-500" />
  ),
  '/docs/instrumentation/mobile-instrumentation/opentelemetry-flutter': (
    <SiFlutter className="h-7 w-7 text-blue-400" />
  ),
  // Additional
  '/docs/instrumentation/opentelemetry-nginx': <SiNginx className="h-7 w-7 text-green-500" />,
  '/docs/instrumentation/manual-instrumentation/javascript/opentelemetry-nodejs': (
    <SiJavascript className="h-7 w-7 text-yellow-500" />
  ),
  '/docs/instrumentation/opentelemetry-wordpress': (
    <SiWordpress className="h-7 w-7 text-blue-600" />
  ),
  '/docs/userguide/vercel-to-signoz': (
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black p-1">
      <SiVercel className="h-7 w-7 text-white" />
    </span>
  ),
}

export default function APMInstrumentationListicle({
  language = 'all',
}: APMInstrumentationListicleProps) {
  // Define all sections with their IDs and labels
  const sections = [
    { id: 'all', label: 'All' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'python', label: 'Python' },
    { id: 'java', label: 'Java' },
    { id: 'other', label: 'Other Languages' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'additional', label: 'Additional' },
  ]

  // State to track the active section
  const [activeSection, setActiveSection] = useState(language === 'all' ? 'all' : language)

  // Navigation pills component
  const NavigationPills = () => (
    <div className="mb-8 flex flex-wrap gap-2">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => setActiveSection(section.id)}
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

  // Python frameworks
  const renderPythonSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Python</h2>
      <IconCardGrid
        cards={mapIcons(APM_INSTRUMENTATION_ITEMS.python)}
        sectionName="Python Frameworks"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  // Java frameworks
  const renderJavaSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Java</h2>
      <IconCardGrid
        cards={mapIcons(APM_INSTRUMENTATION_ITEMS.java)}
        sectionName="Java Frameworks"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  // JavaScript frameworks
  const renderJavaScriptSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">JavaScript</h2>
      <IconCardGrid
        cards={mapIcons(APM_INSTRUMENTATION_ITEMS.javascript)}
        sectionName="JavaScript Frameworks"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  // Other languages
  const renderOtherLanguagesSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Other Languages</h2>
      <IconCardGrid
        cards={mapIcons(APM_INSTRUMENTATION_ITEMS.other)}
        sectionName="Other Languages"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  // Mobile frameworks
  const renderMobileSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Mobile</h2>
      <IconCardGrid
        cards={mapIcons(APM_INSTRUMENTATION_ITEMS.mobile)}
        sectionName="Mobile Frameworks"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  // Additional options
  const renderAdditionalSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Additional</h2>
      <IconCardGrid
        cards={mapIcons(APM_INSTRUMENTATION_ITEMS.additional)}
        sectionName="Additional Options"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  // Render sections based on the active section or language prop
  return (
    <div>
      <NavigationPills />

      {/* Show all sections if activeSection is 'all', otherwise show only the selected section */}
      {(activeSection === 'all' || activeSection === 'javascript') && renderJavaScriptSection()}
      {(activeSection === 'all' || activeSection === 'python') && renderPythonSection()}
      {(activeSection === 'all' || activeSection === 'java') && renderJavaSection()}
      {(activeSection === 'all' || activeSection === 'other') && renderOtherLanguagesSection()}
      {(activeSection === 'all' || activeSection === 'mobile') && renderMobileSection()}
      {(activeSection === 'all' || activeSection === 'additional') && renderAdditionalSection()}
    </div>
  )
}
