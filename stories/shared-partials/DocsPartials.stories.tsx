import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import CHClientWithOutput from '@/components/shared/CHClientWithOutput'
import CommonPrerequisites from '@/components/shared/CommonPrerequisites'
import GetHelp from '@/components/shared/GetHelp'
import HostingDecision from '@/components/shared/HostingDecision'
import K8sInstall from '@/components/shared/K8sInstall'
import K8sNextSteps from '@/components/shared/K8sNextSteps'
import K8sOtelDemo from '@/components/shared/K8sOtelDemo'
import MetricsDefinition from '@/components/shared/MetricsDefinition'
import MultiNodePart1 from '@/components/shared/MultiNodePart1'
import MultiNodePart2 from '@/components/shared/MultiNodePart2'
import PrereqsInstrument from '@/components/shared/PrereqsInstrument'
import RetentionInfo from '@/components/shared/RetentionInfo'
import SigNozCloud from '@/components/shared/SigNozCloud'
import TraefikMetrics from '@/components/shared/TraefikMetrics'
import UpgradeInfo from '@/components/shared/UpgradeInfo'

const meta = {
  title: 'MDX Components/Shared Partials/Docs Partials',
  parameters: {
    chromatic: { disableSnapshot: true },
    mdxUsage: `
{/* Self-contained docs partial. Renders a full prewritten section, no props */}
<HostingDecision />
`,
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Preview: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    mdxUsage: `
{/* Self-contained docs partials. Each renders a full prewritten section, no props */}
<RetentionInfo />

<SigNozCloud />

<UpgradeInfo />

<GetHelp />

<MetricsDefinition />

{/* The remaining partials — HostingDecision, CommonPrerequisites, K8sInstall,
K8sOtelDemo, K8sNextSteps, MultiNodePart1, MultiNodePart2, PrereqsInstrument,
TraefikMetrics, CHClientWithOutput — are each a long section; browse them as
individual stories in this file. */}
`,
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <RetentionInfo />
      <SigNozCloud />
      <UpgradeInfo />
      <GetHelp />
      <MetricsDefinition />
    </div>
  ),
}

export const Hosting: Story = {
  name: 'HostingDecision',
  parameters: {
    mdxUsage: `
<HostingDecision />
`,
  },
  render: () => <HostingDecision />,
}

export const Prerequisites: Story = {
  name: 'CommonPrerequisites',
  parameters: {
    mdxUsage: `
<CommonPrerequisites />
`,
  },
  render: () => <CommonPrerequisites />,
}

export const KubernetesInstall: Story = {
  name: 'K8sInstall',
  parameters: {
    mdxUsage: `
<K8sInstall />
`,
  },
  render: () => <K8sInstall />,
}

export const KubernetesOtelDemo: Story = {
  name: 'K8sOtelDemo',
  parameters: {
    mdxUsage: `
<K8sOtelDemo />
`,
  },
  render: () => <K8sOtelDemo />,
}

export const KubernetesNextSteps: Story = {
  name: 'K8sNextSteps',
  parameters: {
    mdxUsage: `
<K8sNextSteps />
`,
  },
  render: () => <K8sNextSteps />,
}

export const Retention: Story = {
  name: 'RetentionInfo',
  parameters: {
    mdxUsage: `
<RetentionInfo />
`,
  },
  render: () => <RetentionInfo />,
}

export const Cloud: Story = {
  name: 'SigNozCloud',
  parameters: {
    mdxUsage: `
<SigNozCloud />
`,
  },
  render: () => <SigNozCloud />,
}

export const Upgrade: Story = {
  name: 'UpgradeInfo',
  parameters: {
    mdxUsage: `
<UpgradeInfo />
`,
  },
  render: () => <UpgradeInfo />,
}

export const Help: Story = {
  name: 'GetHelp',
  parameters: {
    mdxUsage: `
<GetHelp />
`,
  },
  render: () => <GetHelp />,
}

export const MultiNodeStep1: Story = {
  name: 'MultiNodePart1',
  parameters: {
    mdxUsage: `
<MultiNodePart1 />
`,
  },
  render: () => <MultiNodePart1 />,
}

export const MultiNodeStep2: Story = {
  name: 'MultiNodePart2',
  parameters: {
    mdxUsage: `
<MultiNodePart2 />
`,
  },
  render: () => <MultiNodePart2 />,
}

export const InstrumentPrereqs: Story = {
  name: 'PrereqsInstrument',
  parameters: {
    mdxUsage: `
<PrereqsInstrument />
`,
  },
  render: () => <PrereqsInstrument />,
}

export const Traefik: Story = {
  name: 'TraefikMetrics',
  parameters: {
    mdxUsage: `
<TraefikMetrics />
`,
  },
  render: () => <TraefikMetrics />,
}

export const Metrics: Story = {
  name: 'MetricsDefinition',
  parameters: {
    mdxUsage: `
<MetricsDefinition />
`,
  },
  render: () => <MetricsDefinition />,
}

export const ClickHouseClient: Story = {
  name: 'CHClientWithOutput',
  parameters: {
    mdxUsage: `
<CHClientWithOutput />
`,
  },
  render: () => <CHClientWithOutput />,
}
