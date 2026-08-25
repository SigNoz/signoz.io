import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import DashboardActions from '@/components/Dashboards/DashboardActions'

const meta = {
  title: 'MDX Components/Interactive/Dashboard Actions',
  component: DashboardActions,
  parameters: {
    chromatic: { disableSnapshot: true },
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

const V2_URL =
  'https://raw.githubusercontent.com/SigNoz/dashboards/refs/heads/main/nginx/nginx.json'
const V1_URL =
  'https://raw.githubusercontent.com/SigNoz/dashboards/refs/heads/main/nginx/v1/nginx.json'

export const Preview: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    mdxUsage: `
{/* Both versions available: the version switch is shown */}
<DashboardActions
  dashboardJsonV2Url="https://raw.githubusercontent.com/SigNoz/dashboards/refs/heads/main/nginx/nginx.json"
  dashboardJsonV1Url="https://raw.githubusercontent.com/SigNoz/dashboards/refs/heads/main/nginx/v1/nginx.json"
  dashboardName="NGINX"
/>

{/* Omit dashboardJsonV1Url when the dashboard has no V1 variant */}
<DashboardActions
  dashboardJsonV2Url="https://raw.githubusercontent.com/SigNoz/dashboards/refs/heads/main/nginx/nginx.json"
  dashboardName="NGINX"
/>

{/* Legacy alias kept for docs written before dashboardJsonV2Url; prefer dashboardJsonV2Url in new docs */}
<DashboardActions
  dashboardJsonUrl="https://raw.githubusercontent.com/SigNoz/dashboards/refs/heads/main/nginx/nginx.json"
  dashboardName="NGINX"
/>
`,
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <DashboardActions
        dashboardJsonV2Url={V2_URL}
        dashboardJsonV1Url={V1_URL}
        dashboardName="NGINX"
      />
      <DashboardActions dashboardJsonV2Url={V2_URL} dashboardName="NGINX" />
      <DashboardActions dashboardJsonUrl={V2_URL} dashboardName="NGINX" />
    </div>
  ),
}

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
