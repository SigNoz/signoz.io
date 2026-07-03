'use client'

import { ChevronDown } from 'lucide-react'
import { type ReactNode } from 'react'
import { useState } from 'react'

import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'
import { useLogEvent } from '@/hooks/useLogEvent'

type Faq = {
  answer: ReactNode
  question: string
}

const faqs: Faq[] = [
  {
    question: 'How quickly can we start sending data to SigNoz?',
    answer: (
      <>
        Most teams start with{' '}
        <TrackingLink
          className="text-signoz_robin-300 underline underline-offset-4 transition-colors hover:text-signoz_robin-200"
          clickLocation="Homepage FAQ Section"
          clickName="Instrumentation Docs Link"
          clickText="OpenTelemetry instrumentation"
          clickType="Inline Link"
          href="/docs/instrumentation/"
        >
          OpenTelemetry instrumentation
        </TrackingLink>{' '}
        or the OpenTelemetry Collector. For Kubernetes, the SigNoz Helm chart can collect cluster
        metrics, logs, and traces; for AWS, CloudWatch logs can be routed to SigNoz Cloud. Your
        exact path depends on language, cloud, and whether you use SigNoz Cloud or self-host.
      </>
    ),
  },
  {
    question: 'Can SigNoz replace Datadog, Grafana, or CloudWatch?',
    answer:
      'Yes, for teams that want logs, metrics, traces, dashboards, alerts, and infrastructure monitoring in one OpenTelemetry-native product. Many migrations start by sending OpenTelemetry data to SigNoz, then rebuilding the dashboards, alerts, and incident workflows that matter most.',
  },
  {
    question: 'How is SigNoz pricing calculated?',
    answer: (
      <>
        SigNoz pricing is usage based. There is no user-based pricing, no host-based pricing, and no
        special pricing for custom metrics. Teams can estimate cost from expected logs, traces,
        metrics volume, and retention with the{' '}
        <TrackingLink
          className="text-signoz_robin-300 underline underline-offset-4 transition-colors hover:text-signoz_robin-200"
          clickLocation="Homepage FAQ Section"
          clickName="Pricing Calculator Link"
          clickText="pricing calculator"
          clickType="Inline Link"
          href="/pricing/#estimate-your-monthly-bill"
        >
          pricing calculator
        </TrackingLink>
        , then use ingestion controls to drop noisy telemetry before it is stored.
      </>
    ),
  },
  {
    question: 'Can we self-host SigNoz or keep data in our cloud?',
    answer:
      'Yes. SigNoz supports Cloud, open-source self-hosting, and enterprise options including dedicated cloud, bring-your-own-cloud, and self-hosting with support. Enterprise plans are built for teams that need data residency, compliance reviews, SSO, migration help, or stronger deployment control.',
  },
  {
    question: 'Can alerts route to the right team?',
    answer:
      'Yes. SigNoz supports alerts on metrics, logs, traces, exceptions, anomaly detection, and Apdex. You can send notifications to channels like Slack, PagerDuty, Opsgenie, MS Teams, email, or webhooks, and use routing policies to send alerts to the right team based on labels such as service, severity, or environment.',
  },
  {
    question: 'How does SigNoz help teams debug incidents faster?',
    answer:
      'SigNoz keeps logs, traces, metrics, exceptions, dashboards, and alerts connected in one workspace. Teams can move from a latency spike to related traces, from a trace to surrounding logs, or from an alert to the service and attributes behind it without stitching context across separate tools.',
  },
]

function FaqItem({ answer, question }: Faq) {
  const [isOpen, setIsOpen] = useState(false)
  const logEvent = useLogEvent()

  return (
    <div className="bg-signoz_ink-500/72 rounded-xl border border-signoz_slate-400/35 transition-colors hover:border-signoz_slate-300/50 sm:rounded-2xl">
      <button
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:gap-6 sm:px-6 sm:py-6 md:px-8"
        onClick={() => {
          logEvent({
            eventName: 'Website Click',
            eventType: 'track',
            attributes: {
              clickType: 'FAQ Toggle',
              clickName: 'Homepage FAQ Toggle',
              clickLocation: 'Homepage FAQ Section',
              clickText: question,
            },
          })
          setIsOpen((current) => !current)
        }}
        type="button"
      >
        <span className="text-base font-medium leading-6 tracking-normal text-signoz_vanilla-100 sm:text-lg sm:leading-7 md:text-xl">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-signoz_vanilla-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`duration-250 grid transition-[grid-template-rows] ease-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="m-0 max-w-4xl px-5 pb-5 text-base leading-7 tracking-normal text-signoz_vanilla-400 sm:px-6 sm:pb-6 md:px-8 md:text-base">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section
      className="relative left-1/2 mx-auto w-[calc(100dvw-8px)] max-w-none -translate-x-1/2 px-5 py-16 sm:px-6 sm:py-24 lg:px-20 lg:py-32 min-[1441px]:max-w-8xl min-[1441px]:px-0"
      data-homepage-floating-stop="true"
    >
      <div className="mx-auto grid max-w-8xl gap-10 lg:grid-cols-3 lg:gap-12">
        <div>
          <h2 className="m-0 max-w-md text-4xl font-medium leading-none tracking-tight text-signoz_vanilla-100 sm:text-5xl md:text-6xl md:leading-none">
            Your questions, answered.
          </h2>
          <p className="m-0 mt-5 max-w-md text-base leading-7 tracking-normal text-signoz_vanilla-400 sm:mt-6 sm:text-lg sm:leading-8">
            Quick answers to the questions teams usually ask while evaluating SigNoz.
          </p>
          <TrackingLink
            className="mt-8 block w-full max-w-sm"
            clickLocation="Homepage FAQ Section"
            clickName="Contact Us Button"
            clickText="Contact us"
            clickType="Primary CTA"
            href="/contact-us/"
          >
            <Button as="span" className="!w-full" variant="legacyPrimary" withIcon>
              Contact us
            </Button>
          </TrackingLink>
        </div>

        <div className="space-y-3 lg:col-span-2">
          {faqs.map((faq) => (
            <FaqItem key={faq.question} {...faq} />
          ))}
        </div>
      </div>
    </section>
  )
}
