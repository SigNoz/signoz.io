import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Button from '@/components/ui/Button'
import GetStartedOpenTelemetryButton from '@/components/GetStartedOpenTelemetryButton/GetStartedOpenTelemetryButton'
import MCPInstallButton from '@/components/MCPInstallButton/MCPInstallButton'
import MDXButton from '@/components/MDXButton/MDXButton'

const buttonMdx = `
{/* Button: generic UI button. Wrap it in an anchor to link out, the way
    docs and blog posts do; the inner button element keeps prose from
    underlining the label. */}
<a href="https://signoz.io/teams/">
  <Button variant="default">Get Started - Free</Button>
</a>
`

const mdxButtonMdx = `
{/* MDXButton: tracked CTA; type defaults to "primary", also accepts "secondary" */}
<MDXButton
  href="https://signoz.io/teams/"
  clickName="Start Free Trial CTA"
  clickLocation="Docs Article Body"
>
  Start your free trial
</MDXButton>

<MDXButton
  href="https://signoz.io/docs/instrumentation/"
  type="secondary"
  clickName="Instrumentation Docs CTA"
  clickLocation="Docs Article Body"
>
  Instrument your application
</MDXButton>
`

const getStartedOpenTelemetryMdx = `
{/* GetStartedOpenTelemetryButton: fixed CTA, no props */}
<GetStartedOpenTelemetryButton />
`

const mcpInstallMdx = `
{/* MCPInstallButton: one-click MCP install links */}
<MCPInstallButton client="cursor" icon="cursor">Add to Cursor</MCPInstallButton>

<MCPInstallButton client="vscode" icon="vscode">Add to VS Code</MCPInstallButton>
`

const previewMdx = [buttonMdx, mdxButtonMdx, getStartedOpenTelemetryMdx, mcpInstallMdx].join('\n')

const meta = {
  title: 'MDX Components/CTAs/Buttons',
  component: Button,
  parameters: {
    mdxUsage: `
<a href="https://signoz.io/teams/">
  <Button variant="default">Get Started - Free</Button>
</a>
`,
    chromatic: { disableSnapshot: true },
  },
  args: {
    children: 'Get Started - Free',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'outline',
        'secondary',
        'tertiary',
        'ghost',
        'link',
        'legacyPrimary',
        'legacySecondary',
      ],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    rounded: {
      control: 'radio',
      options: ['default', 'full'],
    },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Preview: Story = {
  parameters: {
    mdxUsage: previewMdx,
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <a href="https://signoz.io/teams/">
        <Button variant="default">Get Started - Free</Button>
      </a>
      <MDXButton
        href="https://signoz.io/teams/"
        clickName="Start Free Trial CTA"
        clickLocation="Docs Article Body"
      >
        Start your free trial
      </MDXButton>
      <MDXButton
        href="https://signoz.io/docs/instrumentation/"
        type="secondary"
        clickName="Instrumentation Docs CTA"
        clickLocation="Docs Article Body"
      >
        Instrument your application
      </MDXButton>
      <GetStartedOpenTelemetryButton />
      <MCPInstallButton client="cursor" icon="cursor">
        Add to Cursor
      </MCPInstallButton>
      <MCPInstallButton client="vscode" icon="vscode">
        Add to VS Code
      </MCPInstallButton>
    </div>
  ),
}

export const Base: Story = {
  name: 'Button',
  args: {
    variant: 'default',
  },
  parameters: {
    mdxUsage: buttonMdx,
  },
  render: (args) => (
    <a href="https://signoz.io/teams/">
      <Button {...args} />
    </a>
  ),
}

export const MDXButtonStory: Story = {
  name: 'MDXButton',
  parameters: {
    mdxUsage: mdxButtonMdx,
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <MDXButton
        href="https://signoz.io/teams/"
        clickName="Start Free Trial CTA"
        clickLocation="Docs Article Body"
      >
        Start your free trial
      </MDXButton>
      <MDXButton
        href="https://signoz.io/docs/instrumentation/"
        type="secondary"
        clickName="Instrumentation Docs CTA"
        clickLocation="Docs Article Body"
      >
        Instrument your application
      </MDXButton>
    </div>
  ),
}

export const GetStartedOpenTelemetryButtonStory: Story = {
  name: 'GetStartedOpenTelemetryButton',
  parameters: {
    mdxUsage: getStartedOpenTelemetryMdx,
  },
  render: () => <GetStartedOpenTelemetryButton />,
}

export const MCPInstallButtonStory: Story = {
  name: 'MCPInstallButton',
  parameters: {
    mdxUsage: mcpInstallMdx,
  },
  render: () => (
    <div className="flex flex-col gap-3">
      <MCPInstallButton client="cursor" icon="cursor">
        Add to Cursor
      </MCPInstallButton>
      <MCPInstallButton client="vscode" icon="vscode">
        Add to VS Code
      </MCPInstallButton>
    </div>
  ),
}
