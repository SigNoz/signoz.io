import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Region from '@/components/Region/Region'
import RegionTable from '@/components/Region/RegionTable'

const meta = {
  title: 'MDX Components/Code/Region',
  component: Region,
  parameters: {
    mdxUsage: `
{/* <RegionTable /> lists every SigNoz Cloud region with its endpoints (from docs/ingestion/signoz-cloud/overview) */}
Based on your SigNoz Cloud environment, configure your applications to use the relevant endpoint from the table below:

<RegionTable />

{/* Inline <Region /> renders the reader's selected region (default: us) */}
Set the OTLP endpoint for the <Region /> region before starting your service.
`,
  },
} satisfies Meta<typeof Region>

export default meta

type Story = StoryObj<typeof meta>

export const InlineInProse: Story = {
  render: () => (
    <p>
      Your ingestion endpoint is{' '}
      <code>
        ingest.
        <Region />
        .signoz.cloud:443
      </code>
      . The region segment substitutes the workspace region selected via the <code>
        ?region=
      </code>{' '}
      query param (default: <code>us</code>).
    </p>
  ),
}

export const InlineInConfigInstructions: Story = {
  render: () => (
    <>
      <p>
        Set the OTLP endpoint for the <Region /> region before starting your service:
      </p>
      <p>
        <code>
          OTEL_EXPORTER_OTLP_ENDPOINT=https://ingest.
          <Region />
          .signoz.cloud:443
        </code>
      </p>
    </>
  ),
}

// <RegionTable /> lists every SigNoz Cloud region with its cloud provider,
// cloud region, and ingestion endpoint (with a hover-to-reveal copy button
// per endpoint). Used in docs/ingestion/signoz-cloud/overview.mdx. Data comes
// from the same RegionContext fetch (stubbed us/eu/in in Storybook).
export const Table: Story = {
  name: 'RegionTable',
  render: () => <RegionTable />,
}
