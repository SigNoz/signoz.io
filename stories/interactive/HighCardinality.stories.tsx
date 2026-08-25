import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import CardinalityExplosion from '@/components/HighCardinalityData/CardinalityExplosion'
import DatabaseTable from '@/components/HighCardinalityData/DatabaseTable'
import MemoryGauge from '@/components/HighCardinalityData/MemoryGauge'
import QueryRace from '@/components/HighCardinalityData/QueryRace'
import SamplingAggregation from '@/components/HighCardinalityData/SamplingAggregation'
import UsersAnalogy from '@/components/HighCardinalityData/UsersAnalogy'

const meta = {
  title: 'MDX Components/Interactive/High Cardinality',
  parameters: {
    mdxUsage: `
{/* Interactive graphic from the high-cardinality-data blog post. Prop-less */}
<CardinalityExplosion />
`,
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Explosion: Story = {
  name: 'CardinalityExplosion',
  parameters: {
    mdxUsage: `
<CardinalityExplosion />
`,
  },
  render: () => <CardinalityExplosion />,
}

export const Gauge: Story = {
  name: 'MemoryGauge',
  parameters: {
    mdxUsage: `
<MemoryGauge />
`,
  },
  render: () => <MemoryGauge />,
}

export const Race: Story = {
  name: 'QueryRace',
  parameters: {
    mdxUsage: `
<QueryRace />
`,
  },
  render: () => <QueryRace />,
}

export const Sampling: Story = {
  name: 'SamplingAggregation',
  parameters: {
    mdxUsage: `
<SamplingAggregation />
`,
  },
  render: () => <SamplingAggregation />,
}

export const Analogy: Story = {
  name: 'UsersAnalogy',
  parameters: {
    mdxUsage: `
<UsersAnalogy />
`,
  },
  render: () => <UsersAnalogy />,
}

export const Table: Story = {
  name: 'DatabaseTable',
  parameters: {
    mdxUsage: `
<DatabaseTable />
`,
  },
  render: () => <DatabaseTable />,
}
