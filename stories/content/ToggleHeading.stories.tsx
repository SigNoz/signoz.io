import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Fragment, isValidElement, type ReactNode } from 'react'
import ToggleHeading from '@/components/Headings/ToggleHeading'
import { markdownToHast, renderHast } from '../lib/markdownFixture'

const collapsedMdx = `
<details>
<ToggleHeading>
## Troubleshooting Langflow Observability
</ToggleHeading>

### No traces in SigNoz

- Confirm the flow actually ran. An idle Langflow instance emits nothing.
- Verify \`TRACELOOP_API_KEY\` is set to a non-empty value. This switches the tracer on.
- OpenTelemetry batches data before sending, so wait 10-30 seconds after running a flow.

</details>
`

const defaultOpenMdx = `
{/* Add the open attribute to render expanded by default */}
<details open>
<ToggleHeading>
## Setup OpenTelemetry Collector (Optional)
</ToggleHeading>

### What is the OpenTelemetry Collector?

Think of the OTel Collector as a middleman between your app and SigNoz. Instead of your application sending data directly to SigNoz, it sends everything to the Collector first, which then forwards it along. See the [collector setup guide](https://signoz.io/docs/tutorial/opentelemetry-binary-usage-in-virtual-machine/) for details.

</details>
`

const previewMdx = [collapsedMdx, defaultOpenMdx].join('\n')

const meta = {
  title: 'MDX Components/Content/ToggleHeading',
  component: ToggleHeading,
  parameters: {
    mdxUsage: collapsedMdx,
    chromatic: { disableSnapshot: true },
  },
} satisfies Meta<typeof ToggleHeading>

export default meta

type Story = StoryObj<typeof meta>

const unwrapFragment = (node: ReactNode): ReactNode =>
  isValidElement(node) && node.type === Fragment
    ? (node.props as { children?: ReactNode }).children
    : node

const toggleStory = (headingMarkdown: string, body: ReactNode, open?: boolean): Story => ({
  args: { children: null },
  loaders: [async () => ({ heading: await markdownToHast(headingMarkdown) })],
  render: (_args, { loaded }) => (
    <details open={open}>
      <ToggleHeading>{unwrapFragment(renderHast(loaded.heading))}</ToggleHeading>
      {body}
    </details>
  ),
})

const collapsedHeading = '## Troubleshooting Langflow Observability'

const collapsedBody = (
  <>
    <h3>No traces in SigNoz</h3>
    <ul>
      <li>Confirm the flow actually ran. An idle Langflow instance emits nothing.</li>
      <li>
        Verify <code>TRACELOOP_API_KEY</code> is set to a non-empty value. This switches the tracer
        on.
      </li>
      <li>
        OpenTelemetry batches data before sending, so wait 10-30 seconds after running a flow.
      </li>
    </ul>
  </>
)

const defaultOpenHeading = '## Setup OpenTelemetry Collector (Optional)'

const defaultOpenBody = (
  <>
    <h3>What is the OpenTelemetry Collector?</h3>
    <p>
      Think of the OTel Collector as a middleman between your app and SigNoz. Instead of your
      application sending data directly to SigNoz, it sends everything to the Collector first, which
      then forwards it along. See the{' '}
      <a href="https://signoz.io/docs/tutorial/opentelemetry-binary-usage-in-virtual-machine/">
        collector setup guide
      </a>{' '}
      for details.
    </p>
  </>
)

export const Preview: Story = {
  args: { children: null },
  parameters: {
    mdxUsage: previewMdx,
    chromatic: { disableSnapshot: false },
  },
  loaders: [
    async () => ({
      collapsed: await markdownToHast(collapsedHeading),
      open: await markdownToHast(defaultOpenHeading),
    }),
  ],
  render: (_args, { loaded }) => (
    <div className="flex flex-col gap-6">
      <details>
        <ToggleHeading>{unwrapFragment(renderHast(loaded.collapsed))}</ToggleHeading>
        {collapsedBody}
      </details>
      <details open>
        <ToggleHeading>{unwrapFragment(renderHast(loaded.open))}</ToggleHeading>
        {defaultOpenBody}
      </details>
    </div>
  ),
}

export const Collapsed: Story = {
  ...toggleStory(collapsedHeading, collapsedBody),
  parameters: {
    mdxUsage: collapsedMdx,
  },
}

export const DefaultOpen: Story = {
  ...toggleStory(defaultOpenHeading, defaultOpenBody, true),
  parameters: {
    mdxUsage: defaultOpenMdx,
  },
}
