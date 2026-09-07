export type HomepageFaqLink = {
  after: string
  before: string
  href: string
  text: string
  trackingName: string
}

export type HomepageFaqItem = {
  answer: string
  link?: HomepageFaqLink
  question: string
}

function createLinkedAnswer(link: HomepageFaqLink): {
  answer: string
  link: HomepageFaqLink
} {
  return {
    answer: `${link.before}${link.text}${link.after}`,
    link,
  }
}

const instrumentationAnswer = createLinkedAnswer({
  before: 'Most teams start with ',
  text: 'OpenTelemetry instrumentation',
  after:
    ' or the OpenTelemetry Collector. For Kubernetes, the SigNoz Helm chart can collect cluster metrics, logs, and traces; for AWS, CloudWatch logs can be routed to SigNoz Cloud. Your exact path depends on your language, cloud, and whether you use SigNoz Cloud or Self-Hosted SigNoz.',
  href: '/docs/instrumentation/',
  trackingName: 'Instrumentation Docs Link',
})

const pricingAnswer = createLinkedAnswer({
  before:
    'SigNoz Cloud pricing is usage based. There is no user-based pricing, no host-based pricing, and no special pricing for custom metrics. Teams can estimate cost from expected logs, traces, metrics volume, and retention with the ',
  text: 'pricing calculator',
  after: ', then use ingestion controls to drop noisy telemetry before it is stored.',
  href: '/pricing/#estimate-your-monthly-bill',
  trackingName: 'Pricing Calculator Link',
})

export const homepageFaqItems: HomepageFaqItem[] = [
  {
    question: 'How quickly can we start sending data to SigNoz Cloud?',
    answer: instrumentationAnswer.answer,
    link: instrumentationAnswer.link,
  },
  {
    question: 'Can SigNoz Cloud replace Datadog, Grafana, or CloudWatch?',
    answer:
      'Yes, for teams that want logs, metrics, traces, dashboards, alerts, and infrastructure monitoring in one OpenTelemetry-native product. Many migrations start by sending OpenTelemetry data to SigNoz Cloud, then rebuilding the dashboards, alerts, and incident workflows that matter most.',
  },
  {
    question: 'How is SigNoz Cloud pricing calculated?',
    answer: pricingAnswer.answer,
    link: pricingAnswer.link,
  },
  {
    question: 'Can we use Self-Hosted SigNoz or keep data in our cloud?',
    answer:
      'Yes. Choose Self-Hosted SigNoz when you want to operate the observability stack on your own infrastructure. SigNoz Cloud also offers managed regions and enterprise deployment options, including dedicated cloud and bring-your-own-cloud, for teams that need data residency, compliance reviews, SSO, migration help, or stronger deployment control.',
  },
  {
    question: 'Can alerts route to the right team?',
    answer:
      'Yes. SigNoz supports alerts on metrics, logs, traces, exceptions, anomaly detection, and Apdex. You can send notifications to channels like Slack, PagerDuty, Opsgenie, MS Teams, email, or webhooks, and use routing policies to send alerts to the right team based on labels such as service, severity, or environment.',
  },
  {
    question: 'How does SigNoz Cloud help teams debug incidents faster?',
    answer:
      'SigNoz Cloud keeps logs, traces, metrics, exceptions, dashboards, and alerts connected in one workspace. Teams can move from a latency spike to related traces, from a trace to surrounding logs, or from an alert to the service and attributes behind it without stitching context across separate tools.',
  },
]
