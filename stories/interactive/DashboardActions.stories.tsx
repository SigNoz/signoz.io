import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import DashboardActions from '@/components/Dashboards/DashboardActions'

const meta = {
  title: 'MDX Components/Interactive/Dashboard Actions',
  component: DashboardActions,
  parameters: {
    mdxUsage: `
<DashboardActions
  dashboardJsonV2Url="https://raw.githubusercontent.com/SigNoz/dashboards/refs/heads/main/nginx/nginx.json"
  dashboardJsonV1Url="https://raw.githubusercontent.com/SigNoz/dashboards/refs/heads/main/nginx/v1/nginx.json"
  dashboardName="NGINX"
/>
`,
  },
} satisfies Meta<typeof DashboardActions>

export default meta

type Story = StoryObj<typeof meta>

export const V2AndV1: Story = {
  args: {
    dashboardJsonV2Url:
      'https://raw.githubusercontent.com/SigNoz/dashboards/refs/heads/main/nginx/nginx.json',
    dashboardJsonV1Url:
      'https://raw.githubusercontent.com/SigNoz/dashboards/refs/heads/main/nginx/v1/nginx.json',
    dashboardName: 'NGINX',
  },
}

export const V2Only: Story = {
  args: {
    dashboardJsonV2Url:
      'https://raw.githubusercontent.com/SigNoz/dashboards/refs/heads/main/nginx/nginx.json',
    dashboardName: 'NGINX',
  },
}

export const LegacyUrlAlias: Story = {
  args: {
    dashboardJsonUrl:
      'https://raw.githubusercontent.com/SigNoz/dashboards/refs/heads/main/nginx/nginx.json',
    dashboardName: 'NGINX',
  },
}
