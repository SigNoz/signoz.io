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
  parameters: {
    mdxUsage: `
<DashboardActions
  dashboardJsonV2Url="https://raw.githubusercontent.com/SigNoz/dashboards/refs/heads/main/nginx/nginx.json"
  dashboardJsonV1Url="https://raw.githubusercontent.com/SigNoz/dashboards/refs/heads/main/nginx/v1/nginx.json"
  dashboardName="NGINX"
/>
`,
  },
  args: {
    dashboardJsonV2Url:
      'https://raw.githubusercontent.com/SigNoz/dashboards/refs/heads/main/nginx/nginx.json',
    dashboardJsonV1Url:
      'https://raw.githubusercontent.com/SigNoz/dashboards/refs/heads/main/nginx/v1/nginx.json',
    dashboardName: 'NGINX',
  },
}

export const V2Only: Story = {
  parameters: {
    mdxUsage: `
{/* Omit dashboardJsonV1Url when the dashboard has no V1 variant */}
<DashboardActions
  dashboardJsonV2Url="https://raw.githubusercontent.com/SigNoz/dashboards/refs/heads/main/nginx/nginx.json"
  dashboardName="NGINX"
/>
`,
  },
  args: {
    dashboardJsonV2Url:
      'https://raw.githubusercontent.com/SigNoz/dashboards/refs/heads/main/nginx/nginx.json',
    dashboardName: 'NGINX',
  },
}

export const LegacyUrlAlias: Story = {
  parameters: {
    mdxUsage: `
{/* Legacy alias kept for docs written before dashboardJsonV2Url; prefer dashboardJsonV2Url in new docs */}
<DashboardActions
  dashboardJsonUrl="https://raw.githubusercontent.com/SigNoz/dashboards/refs/heads/main/nginx/nginx.json"
  dashboardName="NGINX"
/>
`,
  },
  args: {
    dashboardJsonUrl:
      'https://raw.githubusercontent.com/SigNoz/dashboards/refs/heads/main/nginx/nginx.json',
    dashboardName: 'NGINX',
  },
}
