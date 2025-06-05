import React from 'react'
import {
  SiJavascript,
  SiPython,
  SiGo,
  SiKubernetes,
  SiDocker,
  SiPrometheus,
  SiNodedotjs,
  SiRust,
  SiDotnet,
  SiPhp,
  SiRuby,
  SiAmazon,
  SiGooglecloud,
  SiRedis,
  SiPostgresql,
  SiMongodb,
} from 'react-icons/si'
import TrackingLink from '../../../../components/TrackingLink'
import Button, { BUTTON_TYPES } from '../../../../components/Button/Button'
import { ArrowUpRight, LucideServer, Database, Cloud, Workflow } from 'lucide-react'

const InstrumentationSupport = () => {
  const TechIcon = ({ icon, name }: { icon: React.ReactNode; name: string }) => (
    <div
      className="group relative flex h-10 w-10 items-center justify-center rounded-lg border border-signoz_slate-400/30 bg-signoz_ink-300/30"
      title={name}
    >
      {icon}
      <div className="absolute -top-8 left-1/2 z-10 hidden -translate-x-1/2 transform rounded bg-signoz_ink-200 px-2 py-1 text-xs text-signoz_vanilla-100 group-hover:block">
        {name}
      </div>
    </div>
  )

  const CategorySection = ({
    title,
    description,
    techIcons,
    ctaText,
    ctaHref,
    clickName,
  }: {
    title: string
    description: string
    techIcons: { icon: React.ReactNode; name: string }[]
    ctaText: string
    ctaHref: string
    clickName: string
  }) => (
    <div className="mb-8 last:mb-4">
      <div className="mb-4">
        <h3 className="mb-1 text-lg font-semibold text-signoz_vanilla-100">{title}</h3>
        <p className="text-sm text-signoz_vanilla-400">{description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {techIcons.map((tech, index) => (
          <TechIcon key={index} icon={tech.icon} name={tech.name} />
        ))}
        <TrackingLink
          href={ctaHref}
          clickType="Primary CTA"
          clickName={clickName}
          clickLocation="Pricing Page Instrumentation Section"
          clickText={ctaText}
          className="hover:text-signoz_accent-200 ml-2 flex items-center gap-1 text-sm font-medium text-gray-300 transition-colors"
        >
          {ctaText}
          <ArrowUpRight className="h-3 w-3" />
        </TrackingLink>
      </div>
    </div>
  )

  return (
    <div className="section-container !mx-auto !w-[100vw] border !border-b-0 border-dashed border-signoz_slate-400 !px-0 md:!w-[80vw]">
      <div className="flex flex-col sm:flex-row">
        <div className="!w-[100%] flex-1 md:!w-[300px]">
          <p className="sticky top-[100px] px-8 pl-0 pt-10 text-4xl font-bold !leading-[3.5rem] text-signoz_vanilla-100 sm:text-[44px] md:px-0 md:pl-12">
            Complete <br /> Observability <br /> for <br /> Every <br /> Use Case
          </p>
        </div>
        <div className="flex-[2_2_0%]">
          <div className="ml-0 flex flex-col border !border-b-0 !border-r-0 !border-t-0 border-dashed border-signoz_slate-400 px-8 py-10 md:px-4 md:pl-10">
            {/* APM Section */}
            <CategorySection
              title="APM & Tracing"
              description="Auto-instrument any language with OpenTelemetry"
              techIcons={[
                { icon: <SiJavascript className="h-5 w-5 text-yellow-500" />, name: 'JavaScript' },
                { icon: <SiPython className="h-5 w-5 text-blue-500" />, name: 'Python' },
                {
                  icon: <img src="/img/icons/java-icon.svg" alt="Java" className="h-5 w-5" />,
                  name: 'Java',
                },
                { icon: <SiGo className="h-5 w-5 text-cyan-500" />, name: 'Go' },
                { icon: <SiDotnet className="h-5 w-5 text-purple-500" />, name: '.NET' },
                { icon: <SiPhp className="h-5 w-5 text-purple-600" />, name: 'PHP' },
                { icon: <SiRuby className="h-5 w-5 text-red-500" />, name: 'Ruby' },
                { icon: <SiRust className="h-5 w-5 text-orange-600" />, name: 'Rust' },
              ]}
              ctaText="See all languages"
              ctaHref="/docs/instrumentation/"
              clickName="APM Documentation Link"
            />

            {/* Logs Section */}
            <CategorySection
              title="Logs Management"
              description="Collect, parse, and analyze logs from any source"
              techIcons={[
                { icon: <SiKubernetes className="h-5 w-5 text-blue-600" />, name: 'Kubernetes' },
                { icon: <SiDocker className="h-5 w-5 text-blue-400" />, name: 'Docker' },
                { icon: <SiNodedotjs className="h-5 w-5 text-green-500" />, name: 'Node.js' },
                { icon: <SiPython className="h-5 w-5 text-blue-500" />, name: 'Python' },
                { icon: <SiJavascript className="h-5 w-5 text-yellow-500" />, name: 'JavaScript' },
                {
                  icon: <img src="/img/icons/java-icon.svg" alt="Java" className="h-5 w-5" />,
                  name: 'Java',
                },
                { icon: <SiGo className="h-5 w-5 text-cyan-500" />, name: 'Go' },
                { icon: <SiRuby className="h-5 w-5 text-red-500" />, name: 'Ruby' },
              ]}
              ctaText="See all log sources"
              ctaHref="/docs/logs-management/send-logs-to-signoz/"
              clickName="Logs Documentation Link"
            />

            {/* Infrastructure Section */}
            <CategorySection
              title="Infrastructure Monitoring"
              description="Monitor hosts, containers, and orchestration platforms"
              techIcons={[
                {
                  icon: <LucideServer className="h-5 w-5 text-signoz_robin-500" />,
                  name: 'Infrastructure',
                },
                { icon: <SiDocker className="h-5 w-5 text-blue-400" />, name: 'Docker' },
                { icon: <SiKubernetes className="h-5 w-5 text-blue-600" />, name: 'Kubernetes' },
                { icon: <SiPrometheus className="h-5 w-5 text-orange-500" />, name: 'Prometheus' },
              ]}
              ctaText="See infrastructure docs"
              ctaHref="/docs/infrastructure-monitoring/overview/"
              clickName="Infrastructure Documentation Link"
            />

            {/* Integrations Section */}
            <CategorySection
              title="Cloud, Databases & Integrations"
              description="Pre-built integrations for cloud services, databases, and third-party tools"
              techIcons={[
                { icon: <SiAmazon className="h-5 w-5 text-orange-500" />, name: 'AWS' },
                {
                  icon: <img src="/img/icons/azure-icon.svg" width={20} height={20} alt="Azure" />,
                  name: 'Azure',
                },
                { icon: <SiGooglecloud className="h-5 w-5 text-blue-400" />, name: 'Google Cloud' },
                { icon: <SiRedis className="h-5 w-5 text-red-500" />, name: 'Redis' },
                { icon: <SiPostgresql className="h-5 w-5 text-blue-600" />, name: 'PostgreSQL' },
                { icon: <SiMongodb className="h-5 w-5 text-green-600" />, name: 'MongoDB' },
                { icon: <Database className="h-5 w-5 text-green-500" />, name: 'Databases' },
                { icon: <Workflow className="h-5 w-5 text-purple-600" />, name: 'Temporal' },
              ]}
              ctaText="See all integrations"
              ctaHref="/docs/integrations/integrations-list/"
              clickName="Integrations Documentation Link"
            />

            {/* OpenTelemetry Support Note */}
            <div className="border-signoz_accent-500/50 my-3 border-l-2 pl-4">
              <p className="m-0 text-sm text-signoz_vanilla-400">
                <span className="text-signoz_accent-300 font-medium">OpenTelemetry Native</span> —
                SigNoz supports any language or framework that OpenTelemetry supports. From Rust to
                Elixir, from mobile apps to serverless functions - if it can emit OTLP data, SigNoz
                can monitor it.
              </p>
            </div>

            <div className="mt-6">
              <TrackingLink
                href="/docs/"
                clickType="Primary CTA"
                clickName="View Full Documentation Link"
                clickLocation="Pricing Page Instrumentation Section"
                clickText="View Full Documentation"
                className="pointer-events-none"
              >
                <Button type={BUTTON_TYPES.SECONDARY} className="pointer-events-auto">
                  View Full Documentation
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </TrackingLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstrumentationSupport
