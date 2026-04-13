import React from 'react'
import Card from '@/components/Card/card'
import BarChart2Icon from '@/public/img/index_features/bar-chart-2.svg'
import DraftingCompassIcon from '@/public/img/index_features/drafting-compass.svg'
import LogsIcon from '@/public/img/index_features/logs.svg'
import LayoutGridIcon from '@/public/img/index_features/layout-grid.svg'
import BugIcon from '@/public/img/index_features/bug.svg'
import LlmObservabilityIcon from '@/public/img/index_features/llm-observability.svg'
import ConciergeBellIcon from '@/public/img/index_features/concierge-bell.svg'
// Feature graphics as URLs (cacheable with content hash)
import featureGraphic1 from '@/public/img/graphics/homepage/feature-graphic-1.svg?url'
import featureGraphic2 from '@/public/img/graphics/homepage/feature-graphic-2.svg?url'
import featureGraphic3 from '@/public/img/graphics/homepage/feature-graphic-3.svg?url'
import featureGraphic4 from '@/public/img/graphics/homepage/feature-graphic-4.svg?url'
import featureGraphic5 from '@/public/img/graphics/homepage/feature-graphic-5.svg?url'
import featureGraphic6 from '@/public/img/graphics/homepage/feature-graphic-6.svg?url'
import featureGraphic8 from '@/public/img/graphics/homepage/feature-graphic-8.svg?url'
import { cn } from '../../app/lib/utils'

const icons = [
  {
    icon: <BarChart2Icon className="h-4 w-4 sm:h-6 sm:w-6" aria-hidden="true" />,
    label: 'Metrics',
  },
  {
    icon: <DraftingCompassIcon className="h-4 w-4 sm:h-6 sm:w-6" aria-hidden="true" />,
    label: 'Traces',
  },
  { icon: <LogsIcon className="h-4 w-4 sm:h-6 sm:w-6" aria-hidden="true" />, label: 'Logs' },
  {
    icon: <LayoutGridIcon className="h-4 w-4 sm:h-6 sm:w-6" aria-hidden="true" />,
    label: 'Dashboards',
  },
  { icon: <BugIcon className="h-4 w-4 sm:h-6 sm:w-6" aria-hidden="true" />, label: 'Errors' },
  {
    icon: <LlmObservabilityIcon className="h-4 w-4 sm:h-6 sm:w-6" aria-hidden="true" />,
    label: 'LLM/AI',
  },
  {
    icon: <ConciergeBellIcon className="h-4 w-4 sm:h-6 sm:w-6" aria-hidden="true" />,
    label: 'Alerts',
  },
]

const sections = [
  {
    iconTag: 'INGEST DATA',
    text: 'Ingest data from 50+ sources — send your data and start monitoring.',
    // buttonText: 'Explore',
    logo: <BarChart2Icon aria-hidden="true" />,
    img: featureGraphic1,
    imgClassName: 'w-full !bg-transparent',
    imgWidth: 1128,
    imgHeight: 360,
  },
  {
    iconTag: 'APPLICATION PERFORMANCE MONITORING',
    text: 'Monitor & troubleshoot your application performance with APM.',
    buttonText: 'Explore More',
    buttonLink: '/application-performance-monitoring/',
    logo: <BarChart2Icon aria-hidden="true" />,
    img: featureGraphic2,
    imgClassName: 'w-full !bg-transparent',
    imgWidth: 528,
    imgHeight: 320,
  },
  {
    iconTag: 'DISTRIBUTED TRACING',
    text: 'Track user requests across services to identify bottlenecks.',
    buttonText: 'Explore More',
    buttonLink: '/distributed-tracing/',
    logo: <DraftingCompassIcon aria-hidden="true" />,
    img: featureGraphic3,
    imgClassName: 'w-full !bg-transparent',
    imgWidth: 528,
    imgHeight: 320,
  },
  {
    iconTag: 'LOG MANAGEMENT',
    text: 'Ingest, search, and analyze your logs at any scale.',
    buttonText: 'Explore More',
    buttonLink: '/log-management/',
    logo: <LogsIcon aria-hidden="true" />,
    img: featureGraphic4,
    imgClassName: 'w-full !bg-transparent',
    imgWidth: 528,
    imgHeight: 320,
  },
  {
    iconTag: 'METRICS & DASHBOARDS',
    text: 'Infrastructure monitoring, custom metrics & configurable dashboards to fit any use case.',
    buttonText: 'Explore More',
    buttonLink: '/metrics-and-dashboards/',
    logo: <LayoutGridIcon aria-hidden="true" />,
    img: featureGraphic6,
    imgClassName: 'w-full !bg-transparent',
    imgWidth: 528,
    imgHeight: 320,
  },
  {
    iconTag: 'LLM/AI OBSERVABILITY',
    text: 'Track LLM calls, analyze performance, and monitor usage across your AI applications.',
    buttonText: 'Explore More',
    buttonLink: '/llm-observability/',
    logo: <LlmObservabilityIcon aria-hidden="true" />,
    img: featureGraphic8,
    imgClassName: 'w-full !bg-transparent',
    imgWidth: 528,
    imgHeight: 320,
  },
  {
    iconTag: 'ALERTS',
    text: 'Get actionable alerts in your preferred notification channel.',
    buttonText: 'Explore More',
    buttonLink: '/alerts-management/',
    logo: <ConciergeBellIcon aria-hidden="true" />,
    img: featureGraphic5,
    imgClassName: 'w-full !bg-transparent',
    imgWidth: 528,
    imgHeight: 320,
  },
]

export const SigNozFeatures = ({ className }: { className?: string }) => {
  return (
    <>
      <section
        className={cn(
          'bg-blur-ellipse-388 mx-auto w-full max-w-8xl border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:w-[80vw]',
          className
        )}
      >
        <div className={`container pb-16`}>
          <div className="flex flex-col gap-6 pb-24 md:pb-32 ">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center sm:mt-[50px]">
              <div className="text-[32px] font-medium leading-[3.25rem] text-signoz_sienna-100">
                The one-stop observability tool
              </div>
              <p className="m-0 mt-3 text-base font-medium text-signoz_sienna-300">
                SigNoz is an open-source Datadog or New Relic alternative for logs, metrics, traces,
                dashboards, alerts, and more.
              </p>
            </div>

            <div className="hidden items-center justify-center md:flex">
              {icons.map((icon, index) => (
                <React.Fragment key={index}>
                  <div
                    className={`text-center ${icon.label === 'Dashboards' ? 'homepage-dashboard-icon' : ''}`}
                  >
                    <div className="homepage-border m-auto flex w-fit items-center justify-center rounded-full p-2 sm:p-4">
                      {icon.icon}
                    </div>
                    <p className="m-auto mt-2 text-xs text-signoz_sienna-300">{icon.label}</p>
                  </div>
                  {index !== icons.length - 1 ? <div className="homepage-separator" /> : null}
                </React.Fragment>
              ))}
            </div>

            <div className="flex flex-col gap-6 px-8 md:hidden md:gap-0">
              <div className="flex justify-between">
                {icons.slice(0, 3).map((icon, index) => (
                  <div
                    key={index}
                    className={`w-[120px] text-center ${icon.label === 'Dashboards' ? 'homepage-dashboard-icon' : ''}`}
                  >
                    <div className="homepage-border m-auto flex w-fit items-center justify-center rounded-full p-2 sm:p-4">
                      {icon.icon}
                    </div>
                    <p className="m-auto mt-2 text-xs text-signoz_sienna-300">{icon.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                {icons.slice(3, 6).map((icon, index) => (
                  <div
                    key={index}
                    className={`w-[120px] text-center ${icon.label === 'Dashboards' ? 'homepage-dashboard-icon' : ''}`}
                  >
                    <div className="homepage-border m-auto flex w-fit items-center justify-center rounded-full p-2 sm:p-4">
                      {icon.icon}
                    </div>
                    <p className="m-auto mt-2 text-xs text-signoz_sienna-300">{icon.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        className={cn(
          'homepage-observability-container mx-auto grid w-full grid-cols-1 border !border-l-0 !border-t-0 border-dashed border-signoz_slate-400 sm:grid-cols-2 md:w-[80vw]',
          className
        )}
      >
        {sections.map((section) => (
          <Card
            iconTag={section.iconTag}
            text={section.text}
            buttonText={section.buttonText}
            buttonLink={section.buttonLink}
            logo={section.logo}
            img={section.img}
            imgClassName={section.imgClassName}
            imgWidth={section.imgWidth}
            imgHeight={section.imgHeight}
            key={section.text}
            sectionName="Features Section"
          />
        ))}
      </div>
    </>
  )
}
