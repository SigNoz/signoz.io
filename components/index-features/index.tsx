'use client'

import React, { useState } from 'react'
import Heading from '../../components/ui/Heading'
import SubHeading from '../../components/ui/SubHeading'
import Card from '@/components/Card/card'

export const SigNozFeatures = () => {
  const [tab, setTab] = useState('apm')

  const featureChangeHandler = (value: string) => {
    if (value === tab) {
      setTab('')
    } else {
      setTab(value)
    }
  }

  const icons = [
    { src: '/img/index_features/bar-chart-2.svg', label: 'Metrics' },
    { src: '/img/index_features/drafting-compass.svg', label: 'Traces' },
    { src: '/img/index_features/logs.svg', label: 'Logs' },
    { src: '/img/index_features/layout-grid.svg', label: 'Dashboards' },
    { src: '/img/index_features/bug.svg', label: 'Errors' },
    { src: '/img/index_features/concierge-bell.svg', label: 'Alerts' },
  ]

  const sections = [
    {
      iconTag: 'INGEST DATA',
      text: 'Ingest data from 50+ sources — send your data and start monitoring.',
      // buttonText: 'Explore',
      logo: '/img/index_features/bar-chart-2.svg',
      img: '/img/graphics/homepage/feature-graphic-1.webp',
    },
    {
      iconTag: 'APPLICATION PERFORMANCE MONITORING',
      text: 'Monitor & troubleshoot your application performance with APM.',
      buttonText: 'Explore More',
      buttonLink: "/application-performance-monitoring/",
      logo: '/img/index_features/bar-chart-2.svg',
      img: '/img/graphics/homepage/feature-graphic-2.webp',
    },
    {
      iconTag: 'DISTRIBUTED TRACING',
      text: 'Track user requests across services to identify bottlenecks.',
      buttonText: 'Explore More',
      buttonLink: "/distributed-tracing/",
      logo: '/img/index_features/drafting-compass.svg',
      img: '/img/graphics/homepage/feature-graphic-3.webp',
    },
    {
      iconTag: 'LOG MANAGEMENT',
      text: 'Ingest, search, and analyze your logs at any scale.',
      buttonText: 'Explore More',
      buttonLink: "/log-management/",
      logo: '/img/index_features/logs.svg',
      img: '/img/graphics/homepage/feature-graphic-4.webp',
    },
    {
      iconTag: 'METRICS & DASHBOARDS',
      text: 'Infrastructure monitoring, custom metrics & configurable dashboards to fit any use case.',
      buttonText: 'Explore More',
      buttonLink: "/metrics-and-dashboards/",
      logo: '/img/index_features/layout-grid.svg',
      img: '/img/graphics/homepage/feature-graphic-6.webp',
    },
    {
      iconTag: 'EXCEPTIONS',
      text: 'Record exceptions automatically with stack trace & linked span data.',
      buttonText: 'Explore More',
      buttonLink: "/exceptions-monitoring/",
      logo: '/img/index_features/bug.svg',
      img: '/img/graphics/homepage/feature-graphic-5.webp',
    },
    {
      iconTag: 'ALERTS',
      text: 'Get actionable alerts in your preferred notification channel.',
      buttonText: 'Explore More',
      buttonLink: "/alerts-management/",
      logo: '/img/index_features/concierge-bell.svg',
      img: '/img/graphics/homepage/feature-graphic-7.webp',
    },
  ]

  return (
    <>
      <section className="mx-auto w-[100vw] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 bg-[url('/img/background_blur/Ellipse_388.png')] bg-[center_top_calc(-78px)] md:w-[80vw] ">
        <div className={`container pb-16`}>
          <div className="flex flex-col gap-6 pb-32 ">
            <div className="mx-auto mt-[50px] flex max-w-4xl flex-col items-center text-center">
              <div className="text-[32px] font-medium leading-[3.25rem] text-signoz_sienna-100">
                The one-stop observability tool
              </div>
            </div>

            <div className="flex hidden items-center justify-center md:flex">
              {icons.map((icon, index) => (
                <>
                  <div
                    key={index}
                    className={`text-center ${icon.label === 'Dashboards' ? 'homepage-dashboard-icon' : ''}`}
                  >
                    <div className="homepage-border m-auto flex w-fit items-center justify-center rounded-full p-2 sm:p-4">
                      <img
                        src={icon.src}
                        alt={`${icon.label} Icon`}
                        className="h-4 w-4 sm:h-6 sm:w-6"
                      />
                    </div>
                    <p className="m-auto mt-2 text-xs text-signoz_sienna-300">{icon.label}</p>
                  </div>
                  {index !== icons.length - 1 ? <div className="homepage-separator" /> : null}
                </>
              ))}
            </div>

            <div className="flex flex-col gap-6 px-8 md:hidden md:gap-0">
              <div className="flex justify-between">
                {icons.slice(0, 3).map((icon, index) => (
                  <>
                    <div
                      key={index}
                      className={`w-[120px] text-center ${icon.label === 'Dashboards' ? 'homepage-dashboard-icon' : ''}`}
                    >
                      <div className="homepage-border m-auto flex w-fit items-center justify-center rounded-full p-2 sm:p-4">
                        <img
                          src={icon.src}
                          alt={`${icon.label} Icon`}
                          className="h-4 w-4 sm:h-6 sm:w-6"
                        />
                      </div>
                      <p className="m-auto mt-2 text-xs text-signoz_sienna-300">{icon.label}</p>
                    </div>
                  </>
                ))}
              </div>

              <div className="flex justify-between">
                {icons.slice(3, 6).map((icon, index) => (
                  <>
                    <div
                      key={index}
                      className={`w-[120px] text-center ${icon.label === 'Dashboards' ? 'homepage-dashboard-icon' : ''}`}
                    >
                      <div className="homepage-border m-auto flex w-fit items-center justify-center rounded-full p-2 sm:p-4">
                        <img
                          src={icon.src}
                          alt={`${icon.label} Icon`}
                          className="h-4 w-4 sm:h-6 sm:w-6"
                        />
                      </div>
                      <p className="m-auto mt-2 text-xs text-signoz_sienna-300">{icon.label}</p>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="homepage-observability-container !mx-auto grid !w-[100vw] grid-cols-1 border !border-l-0 !border-t-0 border-dashed border-signoz_slate-400 sm:grid-cols-2 md:!w-[80vw]">
        {sections.map((section, index) => (
          <Card
            iconTag={section.iconTag}
            text={section.text}
            buttonText={section.buttonText}
            buttonLink={section.buttonLink}
            logo={section.logo}
            img={section.img}
            key={section.text}
            sectionName="Features Section"
          />
        ))}
      </div>
    </>
  )
}
