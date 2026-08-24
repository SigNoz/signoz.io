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
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Hosting: Story = {
  name: 'HostingDecision',
  render: () => <HostingDecision />,
}

export const Prerequisites: Story = {
  name: 'CommonPrerequisites',
  render: () => <CommonPrerequisites />,
}

export const KubernetesInstall: Story = {
  name: 'K8sInstall',
  render: () => <K8sInstall />,
}

export const KubernetesOtelDemo: Story = {
  name: 'K8sOtelDemo',
  render: () => <K8sOtelDemo />,
}

export const KubernetesNextSteps: Story = {
  name: 'K8sNextSteps',
  render: () => <K8sNextSteps />,
}

export const Retention: Story = {
  name: 'RetentionInfo',
  render: () => <RetentionInfo />,
}

export const Cloud: Story = {
  name: 'SigNozCloud',
  render: () => <SigNozCloud />,
}

export const Upgrade: Story = {
  name: 'UpgradeInfo',
  render: () => <UpgradeInfo />,
}

export const Help: Story = {
  name: 'GetHelp',
  render: () => <GetHelp />,
}

export const MultiNodeStep1: Story = {
  name: 'MultiNodePart1',
  render: () => <MultiNodePart1 />,
}

export const MultiNodeStep2: Story = {
  name: 'MultiNodePart2',
  render: () => <MultiNodePart2 />,
}

export const InstrumentPrereqs: Story = {
  name: 'PrereqsInstrument',
  render: () => <PrereqsInstrument />,
}

export const Traefik: Story = {
  name: 'TraefikMetrics',
  render: () => <TraefikMetrics />,
}

export const Metrics: Story = {
  name: 'MetricsDefinition',
  render: () => <MetricsDefinition />,
}

export const ClickHouseClient: Story = {
  name: 'CHClientWithOutput',
  render: () => <CHClientWithOutput />,
}
