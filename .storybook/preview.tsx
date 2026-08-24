import React from 'react'
import type { Preview } from '@storybook/nextjs-vite'
import { withThemeByClassName } from '@storybook/addon-themes'
import { themes } from 'storybook/theming'
import { RegionProvider } from '../components/Region/RegionContext'
import { TooltipProviderWrapper } from '../components/TooltipProviderWrapper'
import '../css/tailwind.css'
import '../css/global.css'

document.documentElement.setAttribute('data-theme', 'default')
document.body.classList.add('antialiased')

const STUB_REGIONS = {
  status: 'success',
  data: [
    {
      name: 'us',
      dns: 'us.signoz.cloud',
      clusters: [{ cloud_provider: 'gcp', cloud_region: 'us-central1' }],
    },
    {
      name: 'eu',
      dns: 'eu.signoz.cloud',
      clusters: [{ cloud_provider: 'gcp', cloud_region: 'europe-central2' }],
    },
    {
      name: 'in',
      dns: 'in.signoz.cloud',
      clusters: [{ cloud_provider: 'gcp', cloud_region: 'asia-south1' }],
    },
  ],
}

const realFetch = window.fetch.bind(window)
window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url
  if (url.endsWith('/regions')) {
    return Promise.resolve(
      new Response(JSON.stringify(STUB_REGIONS), {
        headers: { 'Content-Type': 'application/json' },
      })
    )
  }
  return realFetch(input, init)
}

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: { pathname: '/docs' },
    },
    backgrounds: { disable: true },
    docs: { theme: themes.dark },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: { light: 'light', dark: 'dark' },
      defaultTheme: 'dark',
    }),
    (Story, context) => {
      const prose = context.parameters.docsProse !== false
      return (
        <TooltipProviderWrapper>
          <RegionProvider>
            {prose ? (
              <div className="mx-auto box-border w-full max-w-[760px] px-4">
                <article className="prose prose-slate max-w-none py-6 dark:prose-invert">
                  <Story />
                </article>
              </div>
            ) : (
              <div className="p-6">
                <Story />
              </div>
            )}
          </RegionProvider>
        </TooltipProviderWrapper>
      )
    },
  ],
}

export default preview
