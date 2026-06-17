'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import CustomLink from '@/components/Link'

type Faq = {
  answer: string
  question: string
}

const faqs: Faq[] = [
  {
    question: 'How quickly can we start sending data to SigNoz?',
    answer:
      'Most teams start with OpenTelemetry instrumentation or the OpenTelemetry Collector. For Kubernetes, the SigNoz Helm chart can collect cluster metrics, logs, and traces; for AWS, CloudWatch logs can be routed to SigNoz Cloud. Your exact path depends on language, cloud, and whether you use SigNoz Cloud or self-host.',
  },
  {
    question: 'Can SigNoz replace Datadog, Grafana, or CloudWatch?',
    answer:
      'Yes, for teams that want logs, metrics, traces, dashboards, alerts, and infrastructure monitoring in one OpenTelemetry-native product. Many migrations start by sending OpenTelemetry data to SigNoz, then rebuilding the dashboards, alerts, and incident workflows that matter most.',
  },
  {
    question: 'How is SigNoz pricing calculated?',
    answer:
      'SigNoz pricing is usage based. There is no user-based pricing, no host-based pricing, and no special pricing for custom metrics. Teams can estimate cost from expected logs, traces, metrics volume, and retention, then use ingestion controls to drop noisy telemetry before it is stored.',
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

  return (
    <div className="bg-signoz_ink-500/72 rounded-[18px] border border-signoz_slate-400/35 transition-colors hover:border-signoz_slate-300/50">
      <button
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left md:px-8"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span className="text-[18px] font-medium leading-7 tracking-[-0.2px] text-signoz_vanilla-100 md:text-[20px]">
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
          <p className="m-0 max-w-[820px] px-6 pb-6 text-[15px] leading-7 tracking-[-0.1px] text-signoz_vanilla-400 md:px-8 md:text-[16px]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FaqExperiment() {
  return (
    <section
      className="homepage-variant-only relative left-1/2 mx-auto w-[calc(100dvw-8px)] max-w-none -translate-x-1/2 px-4 py-24 sm:px-6 lg:px-[78px] lg:py-32"
      data-homepage-floating-stop="true"
    >
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.82fr_1.45fr]">
        <div>
          <h2 className="m-0 max-w-[430px] text-[48px] font-medium leading-[1.02] tracking-[-1.4px] text-signoz_vanilla-100 md:text-[72px] md:tracking-[-2.2px]">
            Your questions, answered.
          </h2>
          <p className="m-0 mt-6 max-w-[420px] text-[18px] leading-8 tracking-[-0.2px] text-signoz_vanilla-400">
            Quick answers to the questions teams usually ask while evaluating SigNoz.
          </p>
          <CustomLink
            className="experiment-button experiment-button--primary mt-8 inline-flex h-10 items-center justify-center gap-3 px-4 text-sm"
            href="/contact-us/"
          >
            Contact us
          </CustomLink>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <FaqItem key={faq.question} {...faq} />
          ))}
        </div>
      </div>
    </section>
  )
}
