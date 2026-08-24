import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import GetStartedSigNoz from '@/components/GetStartedSigNoz/GetStartedSigNoz'
import GetStartedInfrastructureMonitoring from '@/components/GetStartedInfrastructureMonitoring/GetStartedInfrastructureMonitoring'
import InlineCTA from '@/components/InlineCTA/InlineCTA'
import PricingCTA from '@/components/PricingCTA'
import SignUps from '@/components/SignUps/SignUps'

const meta = {
  title: 'MDX Components/CTAs/Get Started',
  component: GetStartedSigNoz,
  parameters: {
    docsProse: false,
    mdxUsage: `
{/* GetStartedSigNoz: standard end-of-article CTA, no props */}
<GetStartedSigNoz />

{/* GetStartedInfrastructureMonitoring: default or showcase variant */}
<GetStartedInfrastructureMonitoring variant="showcase" />

{/* PricingCTA: pricing banner; add concise for the compact version */}
<PricingCTA />
<PricingCTA concise />

{/* InlineCTA: short in-article callout with a message */}
<InlineCTA message="Logs, metrics, traces, and alerts: one OpenTelemetry-native platform. 50+ integrations, set up in minutes." />

{/* SignUps: newsletter signup block, no props */}
<SignUps />
`,
  },
} satisfies Meta<typeof GetStartedSigNoz>

export default meta

type Story = StoryObj<typeof meta>

export const GetStartedSigNozStory: Story = {
  name: 'GetStartedSigNoz',
}

export const GetStartedInfrastructureMonitoringStory: Story = {
  name: 'GetStartedInfrastructureMonitoring',
  render: () => (
    <div className="flex flex-col gap-8">
      <GetStartedInfrastructureMonitoring />
      <GetStartedInfrastructureMonitoring variant="showcase" />
    </div>
  ),
}

export const PricingCTAStory: Story = {
  name: 'PricingCTA',
  render: () => (
    <div className="flex flex-col gap-8">
      <PricingCTA />
      <PricingCTA concise />
    </div>
  ),
}

export const InlineCTAStory: Story = {
  name: 'InlineCTA',
  parameters: { docsProse: true },
  render: () => (
    <>
      <p>
        SigNoz correlates traces, logs, and metrics out of the box, so a failed health check leads
        straight to the slow query behind it.
      </p>
      <InlineCTA message="See traces, logs, and metrics for the same error in one view. Pricing scales with data volume, not host count." />
      <p>
        Because SigNoz is OpenTelemetry-native, the instrumentation you add today keeps working if
        your stack changes tomorrow.
      </p>
    </>
  ),
}

export const SignUpsStory: Story = {
  name: 'SignUps',
  render: () => <SignUps />,
}
