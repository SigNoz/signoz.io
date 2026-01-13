'use client'

import React from 'react'
import { SiSpringboot, SiApachetomcat } from 'react-icons/si'
import { TbCoffee } from 'react-icons/tb'
import { FaJava } from 'react-icons/fa'
import IconCardGrid from '../Card/IconCardGrid'

export default function JavaInstrumentationListicle() {
  return (
    <div>
      <div className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">Java Frameworks</h2>
        <IconCardGrid
          cards={[
            {
              name: 'Java / Spring Boot',
              href: '/docs/instrumentation/java/opentelemetry-java',
              icon: <SiSpringboot className="h-7 w-7 text-green-500" />,
              clickName: 'Java Spring Boot Instrumentation Link',
            },
            {
              name: 'Quarkus',
              href: '/docs/instrumentation/java/opentelemetry-quarkus',
              icon: <TbCoffee className="h-7 w-7 text-blue-500" />,
              clickName: 'Quarkus Instrumentation Link',
            },
            {
              name: 'Tomcat',
              href: '/docs/instrumentation/java/opentelemetry-tomcat',
              icon: <SiApachetomcat className="h-7 w-7 text-yellow-500" />,
              clickName: 'Tomcat Instrumentation Link',
            },
            {
              name: 'JBoss / WildFly',
              href: '/docs/instrumentation/java/opentelemetry-jboss',
              icon: <FaJava className="h-7 w-7 text-red-500" />,
              clickName: 'JBoss WildFly Instrumentation Link',
            },
          ]}
          sectionName="Java Frameworks Section"
          gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        />
      </div>

      <div className="mb-10">
        <h2 className="mb-4 text-2xl font-semibold">Advanced</h2>
        <IconCardGrid
          cards={[
            {
              name: 'Manual Instrumentation',
              href: '/docs/instrumentation/java/manual-instrumentation',
              icon: <FaJava className="h-7 w-7 text-orange-500" />,
              clickName: 'Java Manual Instrumentation Link',
            },
          ]}
          sectionName="Java Advanced Section"
          gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        />
      </div>
    </div>
  )
}
