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
  SiSpringboot,
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
} from 'react-icons/si'
import IconCardGrid from '../Card/IconCardGrid'

interface APMInstrumentationListicleProps {
  language?: 'python' | 'java' | 'javascript' | 'other' | 'mobile' | 'additional' | 'all'
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

  // Python frameworks
  const renderPythonSection = () => (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Python</h2>
      <IconCardGrid
        cards={[
          {
            name: 'Python',
            href: '/docs/instrumentation/python',
            icon: <SiPython className="h-7 w-7 text-blue-500" />,
            clickName: 'Python Instrumentation Link',
          },
          {
            name: 'Django',
            href: '/docs/instrumentation/django',
            icon: <SiDjango className="h-7 w-7 text-green-800" />,
            clickName: 'Django Instrumentation Link',
          },
          {
            name: 'FastAPI',
            href: '/docs/instrumentation/fastapi',
            icon: <SiFastapi className="h-7 w-7 text-teal-500" />,
            clickName: 'FastAPI Instrumentation Link',
          },
          {
            name: 'Flask',
            href: '/docs/instrumentation/flask',
            icon: <SiFlask className="h-7 w-7 rounded-full bg-white text-black" />,
            clickName: 'Flask Instrumentation Link',
          },
          {
            name: 'Falcon',
            href: '/docs/instrumentation/falcon',
            icon: <SiFalcon className="h-7 w-7 text-green-600" />,
            clickName: 'Falcon Instrumentation Link',
          },
          {
            name: 'Hypercorn/Unicorn',
            href: '/docs/instrumentation/hypercorn-unicorn-support',
            icon: <SiGunicorn className="h-7 w-7 text-green-500" />,
            clickName: 'Hypercorn/Unicorn Instrumentation Link',
          },
          {
            name: 'Celery',
            href: '/docs/instrumentation/celery',
            icon: <SiCelery className="h-7 w-7 text-green-600" />,
            clickName: 'Celery Instrumentation Link',
          },
        ]}
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
        cards={[
          {
            name: 'Java',
            href: '/docs/instrumentation/java',
            icon: <img src="/img/icons/java-icon.svg" alt="Java" className="h-5 w-5" />,
            clickName: 'Java Instrumentation Link',
          },
          {
            name: 'Spring Boot',
            href: '/docs/instrumentation/springboot',
            icon: <SiSpringboot className="h-7 w-7 text-green-600" />,
            clickName: 'Spring Boot Instrumentation Link',
          },
          {
            name: 'Quarkus',
            href: '/docs/instrumentation/opentelemetry-quarkus',
            icon: <SiQuarkus className="h-7 w-7 text-blue-600" />,
            clickName: 'Quarkus Instrumentation Link',
          },
          {
            name: 'Tomcat',
            href: '/docs/instrumentation/tomcat',
            icon: <SiApachetomcat className="h-7 w-7 text-orange-600" />,
            clickName: 'Tomcat Instrumentation Link',
          },
          {
            name: 'JBoss',
            href: '/docs/instrumentation/jboss',
            icon: (
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                JB
              </span>
            ),
            clickName: 'JBoss Instrumentation Link',
          },
        ]}
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
        cards={[
          {
            name: 'Node.js',
            href: '/docs/instrumentation/opentelemetry-nodejs',
            icon: <SiNodedotjs className="h-7 w-7 text-green-500" />,
            clickName: 'Node.js Instrumentation Link',
          },
          {
            name: 'Next.js',
            href: '/docs/instrumentation/opentelemetry-nextjs',
            icon: <SiNextdotjs className="h-7 w-7 rounded-full bg-white text-black" />,
            clickName: 'Next.js Instrumentation Link',
          },
          {
            name: 'ReactJS',
            href: '/docs/instrumentation/opentelemetry-reactjs',
            icon: <SiReact className="h-7 w-7 text-blue-400" />,
            clickName: 'ReactJS Instrumentation Link',
          },
          {
            name: 'React Native',
            href: '/docs/instrumentation/opentelemetry-react-native',
            icon: <SiReact className="h-7 w-7 text-blue-400" />,
            clickName: 'React Native Instrumentation Link',
          },
          {
            name: 'NuxtJS',
            href: '/docs/instrumentation/opentelemetry-nuxtjs',
            icon: <SiNuxtdotjs className="h-7 w-7 text-green-500" />,
            clickName: 'Nuxt.js Instrumentation Link',
          },
          {
            name: 'Cloudflare Workers',
            href: '/docs/instrumentation/opentelemetry-cloudflare',
            icon: <SiCloudflare className="h-7 w-7 text-orange-500" />,
            clickName: 'Cloudflare Workers Instrumentation Link',
          },
          {
            name: 'Frontend Monitoring',
            href: '/docs/frontend-monitoring',
            icon: <SiJavascript className="h-7 w-7 text-yellow-500" />,
            clickName: 'Frontend Monitoring Overview Link',
          },
        ]}
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
        cards={[
          {
            name: 'Golang (Go)',
            href: '/docs/instrumentation/golang',
            icon: <SiGo className="h-7 w-7 text-cyan-500" />,
            clickName: 'Golang Instrumentation Link',
          },
          {
            name: 'PHP',
            href: '/docs/instrumentation/php',
            icon: <SiPhp className="h-7 w-7 text-purple-500" />,
            clickName: 'PHP Instrumentation Link',
          },
          {
            name: 'Laravel',
            href: '/docs/instrumentation/laravel',
            icon: <SiLaravel className="h-7 w-7 text-purple-500" />,
            clickName: 'Laravel Instrumentation Link',
          },
          {
            name: '.NET',
            href: '/docs/instrumentation/dotnet',
            icon: <SiDotnet className="h-7 w-7 text-blue-600" />,
            clickName: '.NET Instrumentation Link',
          },
          {
            name: 'Ruby',
            href: '/docs/instrumentation/ruby-on-rails',
            icon: <SiRubyonrails className="h-7 w-7 text-red-600" />,
            clickName: 'Ruby on Rails Instrumentation Link',
          },
          {
            name: 'Elixir',
            href: '/docs/instrumentation/elixir',
            icon: <SiElixir className="h-7 w-7 text-purple-600" />,
            clickName: 'Elixir Instrumentation Link',
          },
          {
            name: 'Rust',
            href: '/docs/instrumentation/rust',
            icon: <SiRust className="h-7 w-7 text-orange-600" />,
            clickName: 'Rust Instrumentation Link',
          },
          {
            name: 'C++',
            href: '/docs/instrumentation/opentelemetry-cpp',
            icon: <SiCplusplus className="h-7 w-7 text-blue-700" />,
            clickName: 'C++ Instrumentation Link',
          },
          {
            name: 'Swift',
            href: '/docs/instrumentation/swift',
            icon: <SiSwift className="h-7 w-7 text-orange-500" />,
            clickName: 'Swift Instrumentation Link',
          },
        ]}
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
        cards={[
          {
            name: 'Android (Java)',
            href: '/docs/instrumentation/mobile-instrumentation/opentelemetry-java',
            icon: <SiAndroid className="h-7 w-7 text-green-500" />,
            clickName: 'Android (Java) Instrumentation Link',
          },
          {
            name: 'Android (Kotlin)',
            href: '/docs/instrumentation/mobile-instrumentation/opentelemetry-kotlin',
            icon: <SiKotlin className="h-7 w-7 text-purple-500" />,
            clickName: 'Android (Kotlin) Instrumentation Link',
          },
          {
            name: 'iOS (SwiftUI)',
            href: '/docs/instrumentation/mobile-instrumentation/opentelemetry-swiftui',
            icon: <SiSwift className="h-7 w-7 text-orange-500" />,
            clickName: 'iOS (SwiftUI) Instrumentation Link',
          },
          {
            name: 'Flutter',
            href: '/docs/instrumentation/mobile-instrumentation/opentelemetry-flutter',
            icon: <SiFlutter className="h-7 w-7 text-blue-400" />,
            clickName: 'Flutter Instrumentation Link',
          },
        ]}
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
        cards={[
          {
            name: 'NGINX',
            href: '/docs/instrumentation/opentelemetry-nginx',
            icon: <SiNginx className="h-7 w-7 text-green-500" />,
            clickName: 'NGINX Instrumentation Link',
          },
          {
            name: 'Manual JS',
            href: '/docs/instrumentation/manual-instrumentation/javascript/opentelemetry-nodejs',
            icon: <SiJavascript className="h-7 w-7 text-yellow-500" />,
            clickName: 'Manual JavaScript Instrumentation Link',
          },
          {
            name: 'WordPress',
            href: '/docs/instrumentation/opentelemetry-wordpress',
            icon: <SiWordpress className="h-7 w-7 text-blue-600" />,
            clickName: 'WordPress Instrumentation Link',
          },
        ]}
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
