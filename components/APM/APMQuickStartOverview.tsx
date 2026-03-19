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
  SiDeno,
} from 'react-icons/si'
import IconCardGrid from '../Card/IconCardGrid'
import { APM_QUICK_START_ITEMS } from '@/constants/componentItems'

const ICON_MAP: Record<string, React.ReactNode> = {
  '/docs/instrumentation/python': <SiPython className="h-7 w-7 text-blue-500" />,
  '/docs/instrumentation/java/overview': (
    <img src="/img/icons/java-icon.svg" alt="Java" className="h-5 w-5" />
  ),
  '/docs/instrumentation/javascript/overview': <SiJavascript className="h-7 w-7 text-yellow-500" />,
  '/docs/instrumentation/opentelemetry-golang': <SiGo className="h-7 w-7 text-cyan-500" />,
  '/docs/instrumentation/php': <SiPhp className="h-7 w-7 text-purple-500" />,
  '/docs/instrumentation/opentelemetry-dotnet': <SiDotnet className="h-7 w-7 text-blue-600" />,
  '/docs/instrumentation/ruby-on-rails': <SiRubyonrails className="h-7 w-7 text-red-600" />,
  '/docs/instrumentation/elixir': <SiElixir className="h-7 w-7 text-purple-600" />,
  '/docs/instrumentation/rust': <SiRust className="h-7 w-7 text-orange-600" />,
  '/docs/instrumentation/opentelemetry-cpp': <SiCplusplus className="h-7 w-7 text-blue-700" />,
  '/docs/instrumentation/swift': <SiSwift className="h-7 w-7 text-orange-500" />,
  '/docs/instrumentation/opentelemetry-deno': <SiDeno className="h-7 w-7 text-blue-500" />,
}

const instrumentationData = APM_QUICK_START_ITEMS.map((item) => ({
  ...item,
  icon: ICON_MAP[item.href],
}))

export default function APMQuickStartOverview() {
  return (
    <IconCardGrid
      cards={instrumentationData}
      sectionName="Instrumentation Languages Section"
      viewAllHref="/docs/instrumentation/"
      viewAllText="View all languages and frameworks"
      gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
    />
  )
}
