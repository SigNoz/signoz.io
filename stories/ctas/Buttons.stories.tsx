import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import GetStartedOpenTelemetryButton from '@/components/GetStartedOpenTelemetryButton/GetStartedOpenTelemetryButton'
import MCPInstallButton from '@/components/MCPInstallButton/MCPInstallButton'
import MDXButton from '@/components/MDXButton/MDXButton'

const buttonMdx = `
{/* Button: pass href to render an anchor; variant is "default" or "secondary" */}
<Button href="https://signoz.io/teams/">Get Started - Free</Button>

<Button href="https://signoz.io/docs/" variant="secondary" size="sm">Read the docs</Button>
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
<Button href="https://signoz.io/teams/">Get Started - Free</Button>
`,
    chromatic: { disableSnapshot: true },
  },
  args: {
    children: 'Get Started - Free',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'icon'],
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
      <Button href="https://signoz.io/teams/">Get Started - Free</Button>
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
  render: (args) => <Button href="https://signoz.io/teams/" {...args} />,
}

/**
 * The full ladder. Heights must measure 32 / 40 / 44px — this is the story that
 * catches a regression in the tactile size compounds.
 */
export const SizesAndVariants: Story = {
  name: 'Sizes & variants',
  parameters: {
    mdxUsage: buttonMdx,
    chromatic: { disableSnapshot: false },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <div key={size} className="flex items-center gap-3">
          <span className="w-20 font-mono text-xs text-[var(--l2-foreground)]">{size}</span>
          <Button variant="default" size={size}>
            Get Started
            <ArrowRight size={14} aria-hidden="true" />
          </Button>
          <Button variant="secondary" size={size}>
            Book a demo
            <ArrowRight size={14} aria-hidden="true" />
          </Button>
          <Button variant="default" size={size} disabled>
            Disabled
          </Button>
        </div>
      ))}
      <div className="flex items-center gap-3">
        <span className="w-20 font-mono text-xs text-[var(--l2-foreground)]">icon</span>
        <Button variant="default" size="icon" aria-label="Next">
          <ArrowRight size={16} aria-hidden="true" />
        </Button>
        <Button variant="secondary" size="icon" aria-label="Next">
          <ArrowRight size={16} aria-hidden="true" />
        </Button>
      </div>
    </div>
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
