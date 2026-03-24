'use client'

import React from 'react'
import { SiSpringboot, SiApachetomcat } from 'react-icons/si'
import { TbCoffee } from 'react-icons/tb'
import { FaJava } from 'react-icons/fa'
import IconCardGrid from '../Card/IconCardGrid'
import { JAVA_INSTRUMENTATION_ITEMS } from '@/constants/componentItems'

const FRAMEWORKS_ICON_MAP: Record<string, React.ReactNode> = {
  '/docs/instrumentation/java/opentelemetry-java': (
    <SiSpringboot className="h-7 w-7 text-green-500" />
  ),
  '/docs/instrumentation/java/opentelemetry-quarkus': (
    <TbCoffee className="h-7 w-7 text-blue-500" />
  ),
  '/docs/instrumentation/java/opentelemetry-tomcat': (
    <SiApachetomcat className="h-7 w-7 text-yellow-500" />
  ),
  '/docs/instrumentation/java/opentelemetry-jboss': <FaJava className="h-7 w-7 text-red-500" />,
}

const ADVANCED_ICON_MAP: Record<string, React.ReactNode> = {
  '/docs/instrumentation/java/manual-instrumentation': (
    <FaJava className="h-7 w-7 text-orange-500" />
  ),
}

const frameworkCards = JAVA_INSTRUMENTATION_ITEMS.frameworks.map((item) => ({
  ...item,
  icon: FRAMEWORKS_ICON_MAP[item.href],
}))

const advancedCards = JAVA_INSTRUMENTATION_ITEMS.advanced.map((item) => ({
  ...item,
  icon: ADVANCED_ICON_MAP[item.href],
}))

export default function JavaInstrumentationListicle() {
  return (
    <div>
      <div className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">Java Frameworks</h2>
        <IconCardGrid
          cards={frameworkCards}
          sectionName="Java Frameworks Section"
          gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        />
      </div>

      <div className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">Advanced</h2>
        <IconCardGrid
          cards={advancedCards}
          sectionName="Java Advanced Section"
          gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        />
      </div>
    </div>
  )
}
