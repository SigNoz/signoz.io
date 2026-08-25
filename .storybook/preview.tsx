import React from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { Preview } from '@storybook/nextjs-vite'
import {
  Controls,
  Description,
  Primary,
  Source,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks'
import { withThemeByClassName } from '@storybook/addon-themes'
import { ensure, ThemeProvider, themes } from 'storybook/theming'
import { MdxUsage } from './blocks/MdxUsage'
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

type MdxPanelHost = Element & { __mdxRoot?: Root }

function resolveCanvas(button: HTMLElement | null) {
  const actions = button?.closest('.sbdocs-preview-actions') ?? undefined
  const previewBlock = actions?.closest('.sb-anchor')?.querySelector('.sbdocs-preview') ?? undefined
  const code =
    previewBlock?.querySelector('[data-mdx-usage]')?.getAttribute('data-mdx-usage') ?? undefined
  return { code, actions, previewBlock }
}

function closeMdxPanel(previewBlock: Element, button?: HTMLElement | null): boolean {
  const panel = previewBlock.querySelector<MdxPanelHost>(':scope > .mdx-usage-panel')
  if (!panel) return false
  panel.__mdxRoot?.unmount()
  panel.remove()
  const toggle =
    button ??
    [...previewBlock.parentElement!.querySelectorAll<HTMLElement>('button')].find(
      (b) => b.textContent?.trim() === 'Hide MDX'
    )
  if (toggle) toggle.textContent = 'Show MDX'
  return true
}

function openMdxPanel(
  previewBlock: Element,
  button: HTMLElement,
  actions: Element,
  code: string
): boolean {
  // Mutually exclusive with the native source panel.
  const hideCode = [...actions.querySelectorAll<HTMLElement>('button')].find(
    (b) => b.textContent?.trim() === 'Hide code'
  )
  hideCode?.click()
  const panel = document.createElement('div') as unknown as MdxPanelHost
  panel.className = 'mdx-usage-panel'
  previewBlock.appendChild(panel)
  const root = createRoot(panel)
  panel.__mdxRoot = root
  root.render(
    <ThemeProvider theme={ensure(themes.dark)}>
      <Source code={code.trim()} language="jsx" dark />
    </ThemeProvider>
  )
  button.textContent = 'Hide MDX'
  // If Show code opens while we are open, close ourselves.
  const showCode = [...actions.querySelectorAll<HTMLElement>('button')].find((b) =>
    /show code/i.test(b.textContent ?? '')
  )
  showCode?.addEventListener('click', () => closeMdxPanel(previewBlock), { once: true })
  return true
}

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: { pathname: '/docs' },
    },
    backgrounds: { disable: true },
    docs: {
      theme: themes.dark,
      canvas: {
        additionalActions: [
          {
            title: 'Show MDX',
            onClick: () => {
              const button = document.activeElement as HTMLElement | null
              const { code, actions, previewBlock } = resolveCanvas(button)
              if (!code || !button || !actions || !previewBlock) return
              closeMdxPanel(previewBlock, button) ||
                openMdxPanel(previewBlock, button, actions, code)
            },
          },
          {
            title: 'Copy MDX',
            onClick: () => {
              const { code } = resolveCanvas(document.activeElement as HTMLElement | null)
              if (code) navigator.clipboard.writeText(code.trim())
            },
          },
        ],
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <MdxUsage />
          <Primary />
          <Controls />
          <Stories includePrimary={false} title="Examples" />
        </>
      ),
    },
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
      const mdxUsage = context.parameters.mdxUsage as string | undefined
      return (
        <TooltipProviderWrapper>
          <RegionProvider>
            {prose ? (
              <div
                data-mdx-usage={mdxUsage}
                className="mx-auto box-border w-full max-w-[760px] px-4"
              >
                <article className="prose prose-slate max-w-none py-6 dark:prose-invert">
                  <Story />
                </article>
              </div>
            ) : (
              <div data-mdx-usage={mdxUsage} className="p-6">
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
