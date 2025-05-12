import React from 'react'
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
  SiNestjs,
  SiAngular,
  SiNextdotjs,
  SiReact,
  SiNuxtdotjs,
  SiNginx,
  SiExpress,
} from 'react-icons/si'
import IconCardGrid from '../Card/IconCardGrid'

interface APMInstrumentationListicleProps {
  language?: 'python' | 'java' | 'javascript' | 'other' | 'additional' | 'all'
}

export default function APMInstrumentationListicle({
  language = 'all',
}: APMInstrumentationListicleProps) {
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
            name: 'JavaScript',
            href: '/docs/instrumentation/javascript',
            icon: <SiJavascript className="h-7 w-7 text-yellow-500" />,
            clickName: 'JavaScript Instrumentation Link',
          },
          {
            name: 'Express',
            href: '/docs/instrumentation/express',
            icon: <SiExpress className="h-7 w-7 text-gray-700" />,
            clickName: 'Express Instrumentation Link',
          },
          {
            name: 'NestJS',
            href: '/docs/instrumentation/nestjs',
            icon: <SiNestjs className="h-7 w-7 text-red-600" />,
            clickName: 'NestJS Instrumentation Link',
          },
          {
            name: 'Angular',
            href: '/docs/instrumentation/angular',
            icon: <SiAngular className="h-7 w-7 text-red-600" />,
            clickName: 'Angular Instrumentation Link',
          },
          {
            name: 'NextJS',
            href: '/docs/instrumentation/nextjs',
            icon: <SiNextdotjs className="h-7 w-7 rounded-full bg-white text-black" />,
            clickName: 'NextJS Instrumentation Link',
          },
          {
            name: 'ReactJS',
            href: '/docs/instrumentation/opentelemetry-reactjs',
            icon: <SiReact className="h-7 w-7 text-blue-400" />,
            clickName: 'ReactJS Instrumentation Link',
          },
          {
            name: 'NuxtJS',
            href: '/docs/instrumentation/opentelemetry-nuxtjs',
            icon: <SiNuxtdotjs className="h-7 w-7 text-green-500" />,
            clickName: 'NuxtJS Instrumentation Link',
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
            href: '/docs/instrumentation/manual-instrumentation/javascript/nodejs',
            icon: <SiJavascript className="h-7 w-7 text-yellow-500" />,
            clickName: 'Manual JavaScript Instrumentation Link',
          },
        ]}
        sectionName="Additional Options"
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
      />
    </div>
  )

  // Render specific section or all sections based on the language prop
  return (
    <div>
      {(language === 'all' || language === 'javascript') && renderJavaScriptSection()}
      {(language === 'all' || language === 'python') && renderPythonSection()}
      {(language === 'all' || language === 'java') && renderJavaSection()}
      {(language === 'all' || language === 'other') && renderOtherLanguagesSection()}
      {(language === 'all' || language === 'additional') && renderAdditionalSection()}
    </div>
  )
}
