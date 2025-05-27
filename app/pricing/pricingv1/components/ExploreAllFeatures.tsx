import React from 'react'
import Link from 'next/link'
import TrackingLink from '../../../../components/TrackingLink'
import Button from '../../../../components/Button/Button'
import {
  CheckSolid,
  CrossSolid,
  ClockSolid,
  CloudSolid,
  ServerSolid,
} from '../../../../components/homepage-icons/icons'
import Line from '../../../../components/ui/Line'

// Plan header type
type PlanHeader = {
  heading: string
  desc: string
  action: React.ReactNode
}

// Feature row type
type FeatureRow = {
  feature: string
  inCommunity: React.ReactNode
  inTeams: React.ReactNode
  inEnterprise: React.ReactNode
}

// Section type
type FeatureSection = {
  section: string
  features: FeatureRow[]
}

// All features data
const ALL_FEATURES_DATA = {
  HEADER: [
    { heading: '', desc: '' },
    {
      heading: 'Community Edition',
      desc: 'Install & manage yourself',
      action: (
        <TrackingLink
          href={'/docs/introduction'}
          className="button-background flex h-8 w-full items-center justify-center gap-1.5 truncate rounded-full px-4 py-2 text-center text-[9px] font-medium leading-5 text-white sm:text-sm"
          clickType="Secondary CTA"
          clickName="Docs Link"
          clickText="Read Documentation"
          clickLocation="Explore All Features Table"
          id="btn-documentation-pricing-table"
        >
          Read Documentation
        </TrackingLink>
      ),
    },
    {
      heading: 'Teams',
      desc: 'Cloud ⎯ starts at $49/mo',
      action: (
        <TrackingLink
          href={'/teams/'}
          className="flex h-8 w-full items-center justify-center gap-1.5 truncate rounded-full bg-signoz_robin-500 px-4 py-2 text-center text-[9px] font-medium leading-5 text-white sm:text-sm"
          clickType="Primary CTA"
          clickName="Sign Up Button"
          clickText="Get Started"
          clickLocation="Explore All Features Table"
          id="btn-get-started-pricing-table"
        >
          Get Started
        </TrackingLink>
      ),
    },
    {
      heading: 'Enterprise',
      desc: 'Cloud / Self-Hosted',
      action: (
        <TrackingLink
          href={'/contact-us/'}
          className="button-background flex h-8 w-full items-center justify-center gap-1.5 rounded-full px-4 py-2 text-center text-[9px] font-medium text-white sm:text-sm"
          clickType="Secondary CTA"
          clickName="Enterprise Contact Button"
          clickText="Contact Us"
          clickLocation="Explore All Features Table"
          id="btn-contact-us-pricing-table"
        >
          Contact Us
        </TrackingLink>
      ),
    },
  ],
  ROWS: [
    {
      section: 'APM & Distributed Tracing',
      features: [
        {
          feature: 'Out of Box APM metrics',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Filtering and creating dashboards based on traces data',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Creating alerts based on traces data',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Unlimited dashboards & alerts based on traces',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Advanced visualization for very large traces (>10K spans)',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Third Party API Monitoring with error rates, latency tracking',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
      ],
    },
    {
      section: 'Log Management',
      features: [
        {
          feature: 'Parsing logs via pipeline',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Create direct filters from JSON logs',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Saved Views for logs',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Live tail Logging',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Unlimited dashboards & alerts based on logs',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Long Term Log Storage Options',
          inCommunity: <CrossSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
      ],
    },
    {
      section: 'Infrastructure Monitoring',
      features: [
        {
          feature: 'Out of the box dashboards for hostmetrics',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Kubernetes Monitoring',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Container Monitoring',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Unlimited dashboards & alerts based on metrics',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
      ],
    },
    {
      section: 'Cloud Monitoring',
      features: [
        {
          feature: 'AWS monitoring (EC2, ECS, EKS, Lambda, RDS, ELB, VPC)',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Azure monitoring (VM, App Service, Functions, AKS, Container Apps, SQL DB)',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'GCP monitoring (Compute Engine, GKE, Cloud Run, Cloud Functions, App Engine)',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Cloud services metrics, logs, and traces correlation',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
      ],
    },
    {
      section: 'CI/CD Observability',
      features: [
        {
          feature: 'Pipeline health and performance monitoring',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'DORA metrics tracking and visualization',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Repository health and PR metrics',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Pipeline flakiness detection',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
      ],
    },
    {
      section: 'Data Exploration',
      features: [
        {
          feature: 'Metrics Explorer - search, query, and analyze all metrics with quick filters',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Traces Explorer with multiple views (List, Trace, Time Series, Table)',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Advanced Query Builder with filtering, aggregation, and mathematical functions',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
      ],
    },
    {
      section: 'Exceptions Monitoring',
      features: [
        {
          feature: 'Separate view of exceptions based on Trace data',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
      ],
    },
    {
      section: 'Frontend & Mobile Monitoring',
      features: [
        {
          feature: 'Web Vitals monitoring for frontend applications',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Mobile app monitoring (iOS, Android, Flutter)',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
      ],
    },
    {
      section: 'LLM Monitoring',
      features: [
        {
          feature: 'LLM observability with OpenTelemetry',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Integration with Langtrace and OpenLLMetry',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Vector database monitoring with OpenLIT',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
      ],
    },
    {
      section: 'Alerts Management',
      features: [
        {
          feature: 'Create alerts directly from dashboards',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Support for Slack, Pagerduty, OpsGenie & webhooks as alert channel',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Anomaly Detection',
          inCommunity: <CrossSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Alert as Code',
          inCommunity: <CrossSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'MS Teams as alert channel',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
      ],
    },
    {
      section: 'Pre-built Integrations & Dashboards',
      features: [
        {
          feature:
            'Infrastructure & database dashboards (Kubernetes, Docker, PostgreSQL, MongoDB, Redis, MySQL)',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature:
            'Application performance & web service dashboards (APM, NGINX, Apache, RabbitMQ, LLM)',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Single Click AWS Integrations',
          inCommunity: <CrossSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
      ],
    },
    {
      section: 'OTel-native Messaging Queue Monitoring',
      features: [
        {
          feature: 'Producer Latency, Consumer Lag, Partition Latency Views',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
      ],
    },
    {
      section: 'Correlation of Signals',
      features: [
        {
          feature: 'APM metrics to traces',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Traces to logs',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Logs to traces',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Logs to infrastructure metrics',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
      ],
    },
    {
      section: 'Service Dependency Visualization',
      features: [
        {
          feature: 'Overview of your application graph with health indication',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
      ],
    },
    {
      section: 'Security & Compliance',
      features: [
        {
          feature: 'SOC2 Type II Compliant',
          inCommunity: <CrossSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'HIPAA Compliant',
          inCommunity: <CrossSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Data centers in US, EU, and India',
          inCommunity: <CrossSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'BAA Agreement',
          inCommunity: <CrossSolid />,
          inTeams: (
            <div className="flex items-center">
              <span className="ml-1.5 text-[8px] uppercase sm:text-xs">ADD ON</span>
            </div>
          ),
          inEnterprise: <CheckSolid />,
        },
      ],
    },
    {
      section: 'Configuration',
      features: [
        {
          feature: 'SSO support',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'SAML support',
          inCommunity: <CrossSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Support for Multiple Ingestion Keys',
          inCommunity: <CrossSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Support for Rate Limits based on Ingestion keys',
          inCommunity: <CrossSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Dashboard Locking & Access control',
          inCommunity: <CrossSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Access Data in SigNoz from Anywhere (via API keys)',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Security tightening for on-premise installation',
          inCommunity: <CrossSolid />,
          inTeams: <CrossSolid />,
          inEnterprise: (
            <div className="flex items-center">
              <ServerSolid />
              <span className="ml-1.5 text-[10px] max-sm:text-[8px]">ENTERPRISE SELF-MANAGED</span>
            </div>
          ),
        },
        {
          feature: 'Monitor Health of SigNoz',
          inCommunity: <CrossSolid />,
          inTeams: <CrossSolid />,
          inEnterprise: (
            <div className="flex items-center">
              <ServerSolid />
              <span className="ml-1.5 text-[10px] max-sm:text-[8px]">ENTERPRISE SELF-MANAGED</span>
            </div>
          ),
        },
        {
          feature: 'Custom retention for different sources of logs',
          inCommunity: <CrossSolid />,
          inTeams: (
            <div className="flex items-center">
              <ClockSolid height="15" width="15" />
              <span className="ml-1.5 text-[8px] sm:text-xs">COMING SOON</span>
            </div>
          ),
          inEnterprise: (
            <div className="flex items-center">
              <ClockSolid height="15" width="15" />
              <span className="ml-1.5 text-[8px] sm:text-xs">COMING SOON</span>
            </div>
          ),
        },
        {
          feature: 'Finer RBAC with custom roles',
          inCommunity: <CrossSolid />,
          inTeams: <CrossSolid />,
          inEnterprise: (
            <div className="flex items-center">
              <ClockSolid height="15" width="15" />
              <span className="ml-1.5 text-[8px] sm:text-xs">COMING SOON</span>
            </div>
          ),
        },
        {
          feature: 'AWS Private link',
          inCommunity: <CrossSolid />,
          inTeams: <CrossSolid />,
          inEnterprise: (
            <div className="flex items-center">
              <CloudSolid />
              <span className="ml-1.5 text-[8px] sm:text-xs">ENTERPRISE CLOUD</span>
            </div>
          ),
        },
        {
          feature: 'Audit Logs',
          inCommunity: <CrossSolid />,
          inTeams: <CrossSolid />,
          inEnterprise: (
            <div className="flex items-center">
              <ClockSolid height="15" width="15" />
              <span className="ml-1.5 text-[8px] sm:text-xs">COMING SOON</span>
            </div>
          ),
        },
        {
          feature: 'Multi-tenancy',
          inCommunity: <CrossSolid />,
          inTeams: <CrossSolid />,
          inEnterprise: (
            <div className="flex items-center">
              <ClockSolid height="15" width="15" />
              <span className="ml-1.5 text-[8px] sm:text-xs">COMING SOON</span>
            </div>
          ),
        },
      ],
    },
    {
      section: 'Support',
      features: [
        {
          feature: 'Community Support on Slack',
          inCommunity: <CheckSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Email Support',
          inCommunity: <CrossSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'In product chat support',
          inCommunity: <CrossSolid />,
          inTeams: <CheckSolid />,
          inEnterprise: (
            <div className="flex items-center">
              <CloudSolid />
              <span className="ml-1.5 text-[8px] sm:text-xs">ENTERPRISE CLOUD</span>
            </div>
          ),
        },
        {
          feature: 'Support for Migrating DataDog Dashboards',
          inCommunity: <CrossSolid />,
          inTeams: (
            <div className="flex items-center">
              <span className="ml-1.5 text-[8px] uppercase sm:text-xs">for spends above $999</span>
            </div>
          ),
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Dedicated Slack Channel',
          inCommunity: <CrossSolid />,
          inTeams: (
            <div className="flex items-center">
              <span className="ml-1.5 text-[8px] uppercase sm:text-xs">for spends above $999</span>
            </div>
          ),
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Team Training',
          inCommunity: <CrossSolid />,
          inTeams: <CrossSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Dashboard Configuration Support',
          inCommunity: <CrossSolid />,
          inTeams: <CrossSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'Instrumentation Support',
          inCommunity: <CrossSolid />,
          inTeams: <CrossSolid />,
          inEnterprise: <CheckSolid />,
        },
        {
          feature: 'SLA w/ downtime developer pairing',
          inCommunity: <CrossSolid />,
          inTeams: <CrossSolid />,
          inEnterprise: <CheckSolid />,
        },
      ],
    },
  ],
}

const ExploreAllFeatures: React.FC = () => {
  return (
    <div
      id="all-features"
      className="relative !m-0 !mx-auto !w-[100vw] border !border-t-0 border-dashed border-signoz_slate-400 md:!w-[80vw]"
    >
      <div className="mx-auto mb-10 mt-6">
        {/* Header - Using CSS sticky positioning for smoother scrolling */}
        <div className="sticky top-[56px] z-20 bg-[#0f1013]">
          <div className="grid grid-cols-3 gap-1 md:grid-cols-[3fr_1fr_1fr_1fr]">
            {ALL_FEATURES_DATA.HEADER.map((header, idx) => (
              <div
                key={idx}
                className={`${
                  idx === 2
                    ? `flex flex-col justify-between rounded-lg !rounded-b-none bg-signoz_ink-500 p-3 sm:bg-[#16181d]`
                    : idx !== 0
                      ? `flex flex-col justify-between rounded-lg p-3 bg-opacity-${idx * 10}`
                      : 'hidden md:block'
                }`}
              >
                <div className="flex flex-col gap-1">
                  <h2 className="m-0 text-sm max-sm:h-16 md:text-base">{header.heading}</h2>
                  <p className="text-xs text-signoz_vanilla-400">{header.desc}</p>
                </div>
                <div className="flex w-full justify-center">{header.action}</div>
              </div>
            ))}
          </div>
          <Line />
        </div>

        {/* Feature sections */}
        {ALL_FEATURES_DATA.ROWS.map((section, sectionIdx) => (
          <div key={sectionIdx}>
            {/* Section header */}
            <div className="grid grid-cols-1">
              <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 md:grid-cols-[3fr_1fr_1fr_1fr]">
                <div className="mb-3 mt-12 py-2 pl-6 pr-2 text-center text-sm font-medium md:text-left">
                  {section.section}
                </div>
                <div></div>
                <div className="bg-signoz_ink-500 sm:bg-[#16181d]"></div>
                <div></div>
              </div>
            </div>
            <Line />

            {/* Features in this section */}
            <div className="grid grid-cols-1">
              {section.features.map((feature, featureIdx) => (
                <div key={featureIdx}>
                  <div className="grid grid-cols-3 gap-1 md:grid-cols-[3fr_1fr_1fr_1fr]">
                    <h4 className="col-span-3 m-0 py-3 pl-6 pr-2 text-center text-sm font-normal text-signoz_vanilla-400 md:col-span-1 md:text-left">
                      {feature.feature}
                    </h4>
                    <div className="flex items-center justify-center rounded-lg p-3">
                      {feature.inCommunity}
                    </div>
                    <div className="flex items-center justify-center rounded-lg rounded-none bg-signoz_ink-500 p-3 sm:bg-[#16181d]">
                      {feature.inTeams}
                    </div>
                    <div className="flex items-center justify-center rounded-lg p-3">
                      {feature.inEnterprise}
                    </div>
                  </div>
                  <Line />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Bottom rounded corner for Teams column */}
        <div className="grid h-[18px] grid-cols-3 gap-1 md:grid-cols-[3fr_1fr_1fr_1fr]">
          <div />
          <div />
          <div className="rounded-lg !rounded-t-none bg-signoz_ink-500 sm:bg-[#16181d]" />
          <div />
        </div>
      </div>
    </div>
  )
}

export default ExploreAllFeatures
