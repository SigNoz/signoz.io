import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Region from '@/components/Region/Region'
import RegionTable from '@/components/Region/RegionTable'

const inlineInProseMdx = `
{/* Inside code spans, write the <region> placeholder — it is substituted with the reader's selected region */}
Your ingestion endpoint is \`ingest.<region>.signoz.cloud:443\`. The region segment substitutes the workspace region selected via the \`?region=\` query param (default: \`us\`).
`

const inlineInConfigInstructionsMdx = `
{/* Inline <Region /> renders the reader's selected region in prose (default: us) */}
Set the OTLP endpoint for the <Region /> region before starting your service:

\`OTEL_EXPORTER_OTLP_ENDPOINT=https://ingest.<region>.signoz.cloud:443\`
`

const regionTableMdx = `
{/* <RegionTable /> lists every SigNoz Cloud region with its cloud provider, cloud region, and ingestion endpoint */}
<RegionTable />
`

const meta = {
  title: 'MDX Components/Code/Region',
  component: Region,
  parameters: {
    mdxUsage: inlineInProseMdx,
  },
} satisfies Meta<typeof Region>

export default meta

type Story = StoryObj<typeof meta>

export const InlineInProse: Story = {
  parameters: { mdxUsage: inlineInProseMdx },
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
  parameters: { mdxUsage: inlineInConfigInstructionsMdx },
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
  parameters: { mdxUsage: regionTableMdx },
  render: () => <RegionTable />,
}
