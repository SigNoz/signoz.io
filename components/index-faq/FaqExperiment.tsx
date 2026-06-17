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
    question: 'How quickly can we start sending telemetry to SigNoz?',
    answer:
      'Most teams can start with OpenTelemetry auto-instrumentation or an OpenTelemetry Collector and see traces, logs, or metrics in SigNoz within minutes. The exact setup depends on your language, framework, and whether you use SigNoz Cloud or self-host.',
  },
  {
    question:
      'Can SigNoz replace separate tools for logs, metrics, traces, alerts, and dashboards?',
    answer:
      'Yes. SigNoz brings APM, distributed tracing, logs, metrics, exceptions, alerts, dashboards, and infrastructure monitoring into one OpenTelemetry-native workspace so teams can investigate issues without switching between disconnected tools.',
  },
  {
    question: 'How does SigNoz pricing stay predictable as usage grows?',
    answer:
      'SigNoz uses simple usage-based pricing. There is no user-based pricing, no host-based pricing, and no special pricing for custom metrics. Teams can estimate logs, traces, and metrics cost from expected volume and retention on the pricing page.',
  },
  {
    question: 'Can we self-host SigNoz or run it in our own cloud?',
    answer:
      'Yes. SigNoz supports Cloud, open-source self-hosting, and enterprise deployment options including BYOC and dedicated environments. Enterprise plans are designed for teams that need stronger support, data-residency, compliance, or deployment control.',
  },
  {
    question: 'How does SigNoz help with migration from Datadog, Grafana, or CloudWatch?',
    answer:
      'Teams usually start by sending OpenTelemetry data to SigNoz, then recreate critical dashboards, alerts, and investigation workflows. SigNoz also offers migration support for larger teams, including help with dashboards, alerts, and instrumentation strategy.',
  },
  {
    question: 'What does agent-native observability mean in SigNoz?',
    answer:
      'It means engineers and agents can use the same production telemetry context. SigNoz MCP brings traces, logs, metrics, dashboards, and alerts into local agent workflows, while Noz works inside the product to help investigate, explain, and act on issues.',
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
      data-homepage-floating-cta="Talk to us"
      data-homepage-floating-href="/contact-us/"
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
            className="experiment-button experiment-button--secondary mt-8 inline-flex h-10 items-center justify-center gap-3 px-4 text-sm"
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
