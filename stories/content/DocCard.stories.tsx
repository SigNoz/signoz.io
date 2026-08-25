import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import DocCard from '@/components/DocCard'
import DocCardContainer from '@/components/DocCardContainer'

const meta = {
  title: 'MDX Components/Content/DocCard',
  component: DocCard,
  parameters: {
    mdxUsage: `
<DocCard
    title="Post Deployment Monitoring"
    description="Compare key metrics before and after a deployment to detect performance regressions or unexpected changes."
    href="https://signoz.io/docs/ai/use-cases/post-deployment-monitoring/"
/>
`,
  },
  args: {
    title: 'Post Deployment Monitoring',
    description:
      'Compare key metrics before and after a deployment to detect performance regressions or unexpected changes.',
    href: 'https://signoz.io/docs/ai/use-cases/post-deployment-monitoring/',
  },
} satisfies Meta<typeof DocCard>

export default meta

type Story = StoryObj<typeof meta>

export const SingleCard: Story = {
  name: 'DocCard',
  parameters: {
    mdxUsage: `
<DocCard
    title="Post Deployment Monitoring"
    description="Compare key metrics before and after a deployment to detect performance regressions or unexpected changes."
    href="https://signoz.io/docs/ai/use-cases/post-deployment-monitoring/"
/>
`,
  },
}

export const Container: Story = {
  name: 'DocCardContainer',
  parameters: {
    mdxUsage: `
<DocCardContainer>

<DocCard
    title="Send Traces"
    description="Instrument your application with OpenTelemetry and send traces to SigNoz."
    href="https://signoz.io/docs/instrumentation/"
/>

<DocCard
    title="Send Logs"
    description="Collect application and infrastructure logs with the OpenTelemetry Collector."
    href="https://signoz.io/docs/userguide/logs/"
/>

</DocCardContainer>
`,
  },
  render: () => (
    <DocCardContainer>
      <DocCard
        title="Send Traces"
        description="Instrument your application with OpenTelemetry and send traces to SigNoz."
        href="https://signoz.io/docs/instrumentation/"
      />
      <DocCard
        title="Send Logs"
        description="Collect application and infrastructure logs with the OpenTelemetry Collector."
        href="https://signoz.io/docs/userguide/logs/"
      />
    </DocCardContainer>
  ),
}

export const CardGrid: Story = {
  parameters: {
    mdxUsage: `
<DocCardContainer>

<DocCard
    title="Send Traces"
    description="Instrument your application with OpenTelemetry and send traces to SigNoz."
    href="https://signoz.io/docs/instrumentation/"
/>

<DocCard
    title="Send Logs"
    description="Collect application and infrastructure logs with the OpenTelemetry Collector."
    href="https://signoz.io/docs/userguide/logs/"
/>

<DocCard
    title="Send Metrics"
    description="Ship host, Kubernetes, and custom metrics using OTLP or Prometheus receivers."
    href="https://signoz.io/docs/userguide/send-metrics-cloud/"
/>

<DocCard
    title="Alerts"
    description="Create threshold and anomaly-based alerts on any signal and route notifications."
    href="https://signoz.io/docs/alerts/"
/>

</DocCardContainer>
`,
  },
  render: () => (
    <DocCardContainer>
      <DocCard
        title="Send Traces"
        description="Instrument your application with OpenTelemetry and send traces to SigNoz."
        href="https://signoz.io/docs/instrumentation/"
      />
      <DocCard
        title="Send Logs"
        description="Collect application and infrastructure logs with the OpenTelemetry Collector."
        href="https://signoz.io/docs/userguide/logs/"
      />
      <DocCard
        title="Send Metrics"
        description="Ship host, Kubernetes, and custom metrics using OTLP or Prometheus receivers."
        href="https://signoz.io/docs/userguide/send-metrics-cloud/"
      />
      <DocCard
        title="Alerts"
        description="Create threshold and anomaly-based alerts on any signal and route notifications."
        href="https://signoz.io/docs/alerts/"
      />
    </DocCardContainer>
  ),
}
