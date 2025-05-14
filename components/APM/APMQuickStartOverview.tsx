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
  SiSwift,
} from 'react-icons/si'
import IconCardGrid from '../Card/IconCardGrid'

interface IconCardData {
  name: string
  href: string
  icon: React.ReactNode
  clickName: string
}

const instrumentationData: IconCardData[] = [
  {
    name: 'Python',
    href: '/docs/instrumentation/python',
    icon: <SiPython className="h-7 w-7 text-blue-500" />,
    clickName: 'Python Instrumentation Link',
  },
  {
    name: 'Java',
    href: '/docs/instrumentation/java',
    icon: <img src="/img/icons/java-icon.svg" alt="Java" className="h-5 w-5" />,
    clickName: 'Java Instrumentation Link',
  },
  {
    name: 'JavaScript',
    href: '/docs/instrumentation/javascript',
    icon: <SiJavascript className="h-7 w-7 text-yellow-500" />,
    clickName: 'JavaScript Instrumentation Link',
  },
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
]

export default function APMQuickStartOverview() {
  return (
    <IconCardGrid
      cards={instrumentationData}
      sectionName="Instrumentation Languages Section"
      viewAllHref="/docs/instrumentation/"
      viewAllText="View all languages and frameworks"
      gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
    />
  )
}
