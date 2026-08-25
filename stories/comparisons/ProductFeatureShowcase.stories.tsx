import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ProductFeatureShowcase from '@/components/ProductFeatureShowcase/ProductFeatureShowcase'

const meta = {
  title: 'MDX Components/Comparisons/Product Feature Showcase',
  component: ProductFeatureShowcase,
  parameters: {
    docsProse: false,
    mdxUsage: `
{/* Feature-comparison showcase card used in Datadog-alternative posts */}
<ProductFeatureShowcase />
`,
  },
} satisfies Meta<typeof ProductFeatureShowcase>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    mdxUsage: `
{/* Feature-comparison showcase card used in Datadog-alternative posts */}
<ProductFeatureShowcase />
`,
  },
}
