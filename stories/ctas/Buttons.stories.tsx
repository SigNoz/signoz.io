import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Button from '@/components/ui/Button'
import GetStartedOpenTelemetryButton from '@/components/GetStartedOpenTelemetryButton/GetStartedOpenTelemetryButton'
import MCPInstallButton from '@/components/MCPInstallButton/MCPInstallButton'
import MDXButton from '@/components/MDXButton/MDXButton'

const meta = {
  title: 'MDX Components/CTAs/Buttons',
  component: Button,
  parameters: {
    mdxUsage: `
{/* Button: generic UI button; pass href to render it as a link */}
<Button href="https://signoz.io/teams/" variant="default">Get Started - Free</Button>
`,
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

export const Base: Story = {
  name: 'Button',
  args: {
    variant: 'default',
    href: 'https://signoz.io/teams/',
  },
  parameters: {
    mdxUsage: `
{/* Button: generic UI button; pass href to render it as a link */}
<Button href="https://signoz.io/teams/" variant="default">Get Started - Free</Button>
`,
  },
}

export const MDXButtonStory: Story = {
  name: 'MDXButton',
  parameters: {
    mdxUsage: `
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
`,
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
    mdxUsage: `
{/* GetStartedOpenTelemetryButton: fixed CTA, no props */}
<GetStartedOpenTelemetryButton />
`,
  },
  render: () => <GetStartedOpenTelemetryButton />,
}

export const MCPInstallButtonStory: Story = {
  name: 'MCPInstallButton',
  parameters: {
    mdxUsage: `
{/* MCPInstallButton: one-click MCP install links */}
<MCPInstallButton client="cursor" icon="cursor">Add to Cursor</MCPInstallButton>

<MCPInstallButton client="vscode" icon="vscode">Add to VS Code</MCPInstallButton>
`,
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
