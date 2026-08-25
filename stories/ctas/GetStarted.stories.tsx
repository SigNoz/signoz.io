import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import GetStartedSigNoz from '@/components/GetStartedSigNoz/GetStartedSigNoz'
import GetStartedInfrastructureMonitoring from '@/components/GetStartedInfrastructureMonitoring/GetStartedInfrastructureMonitoring'
import InlineCTA from '@/components/InlineCTA/InlineCTA'
import PricingCTA from '@/components/PricingCTA'
import SignUps from '@/components/SignUps/SignUps'

const getStartedSigNozMdx = `
{/* GetStartedSigNoz: standard end-of-article CTA, no props */}
<GetStartedSigNoz />
`

const getStartedInfrastructureMonitoringMdx = `
{/* Default variant */}
<GetStartedInfrastructureMonitoring />

{/* Showcase variant */}
<GetStartedInfrastructureMonitoring variant="showcase" />
`

const pricingCTAMdx = `
{/* Full pricing banner */}
<PricingCTA />

{/* Compact version */}
<PricingCTA concise />
`

const inlineCTAMdx = `
SigNoz correlates traces, logs, and metrics out of the box, so a failed health check leads straight to the slow query behind it.

<InlineCTA message="See traces, logs, and metrics for the same error in one view. Pricing scales with data volume, not host count." />

Because SigNoz is OpenTelemetry-native, the instrumentation you add today keeps working if your stack changes tomorrow.
`

const signUpsMdx = `
{/* SignUps: newsletter signup block, no props */}
<SignUps />
`

const previewMdx = [
  getStartedSigNozMdx,
  getStartedInfrastructureMonitoringMdx,
  pricingCTAMdx,
  inlineCTAMdx,
  signUpsMdx,
].join('\n')

const meta = {
  title: 'MDX Components/CTAs/Get Started',
  component: GetStartedSigNoz,
  parameters: {
    docsProse: false,
    mdxUsage: getStartedSigNozMdx,
    chromatic: { disableSnapshot: true },
  },
} satisfies Meta<typeof GetStartedSigNoz>

export default meta

type Story = StoryObj<typeof meta>

export const Preview: Story = {
  parameters: {
    mdxUsage: previewMdx,
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <GetStartedSigNoz />
      <GetStartedInfrastructureMonitoring />
      <GetStartedInfrastructureMonitoring variant="showcase" />
      <PricingCTA />
      <PricingCTA concise />
      <InlineCTA message="See traces, logs, and metrics for the same error in one view. Pricing scales with data volume, not host count." />
      <SignUps />
    </div>
  ),
}

export const GetStartedSigNozStory: Story = {
  name: 'GetStartedSigNoz',
  parameters: {
    mdxUsage: getStartedSigNozMdx,
  },
}

export const GetStartedInfrastructureMonitoringStory: Story = {
  name: 'GetStartedInfrastructureMonitoring',
  parameters: {
    mdxUsage: getStartedInfrastructureMonitoringMdx,
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <GetStartedInfrastructureMonitoring />
      <GetStartedInfrastructureMonitoring variant="showcase" />
    </div>
  ),
}

export const PricingCTAStory: Story = {
  name: 'PricingCTA',
  parameters: {
    mdxUsage: pricingCTAMdx,
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <PricingCTA />
      <PricingCTA concise />
    </div>
  ),
}

export const InlineCTAStory: Story = {
  name: 'InlineCTA',
  parameters: {
    docsProse: true,
    mdxUsage: inlineCTAMdx,
  },
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
  parameters: {
    mdxUsage: signUpsMdx,
  },
  render: () => <SignUps />,
}
