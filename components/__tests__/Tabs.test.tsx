import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import React from 'react'
import Tabs from '../Tabs'

const TabItem = ({
  value,
  label,
  children,
}: {
  value: string
  label: string
  default?: boolean
  children?: React.ReactNode
}) => (
  <div value={value} label={label} data-tab-value={value}>
    {children}
  </div>
)

const mockPathname = vi.fn(() => '/docs/install/')

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}))

const mockSearchParams = vi.fn(() => new URLSearchParams())
vi.mock('@/hooks/useSearchParamsState', () => ({
  useSearchParamsState: () => mockSearchParams(),
}))

beforeEach(() => {
  mockPathname.mockReturnValue('/docs/install/')
  mockSearchParams.mockReturnValue(new URLSearchParams())
  window.history.replaceState({}, '', '/docs/install/')
})

const getTabButtons = () => screen.queryAllByRole('tab')
const getTabButton = (name: string) => screen.queryByRole('tab', { name })
const getTabPanels = () =>
  document.querySelectorAll<HTMLDivElement>(
    '[data-tabs-root] > [data-tab-panels] > [data-tab-value]'
  )

const activateTab = (name: string) => {
  fireEvent.mouseDown(getTabButton(name)!)
}

describe('Tabs basic rendering', () => {
  it('renders all tab buttons', () => {
    render(
      <Tabs>
        <TabItem value="cloud" label="Cloud" default>
          Cloud content
        </TabItem>
        <TabItem value="self-host" label="Self-Hosted">
          Self-hosted content
        </TabItem>
      </Tabs>
    )

    expect(getTabButton('Cloud')).toBeTruthy()
    expect(getTabButton('Self-Hosted')).toBeTruthy()
  })

  it('shows the default tab content', () => {
    render(
      <Tabs>
        <TabItem value="cloud" label="Cloud" default>
          Cloud content
        </TabItem>
        <TabItem value="self-host" label="Self-Hosted">
          Self-hosted content
        </TabItem>
      </Tabs>
    )

    const panels = getTabPanels()
    const cloudPanel = Array.from(panels).find((p) => p.getAttribute('data-tab-value') === 'cloud')
    const selfHostPanel = Array.from(panels).find(
      (p) => p.getAttribute('data-tab-value') === 'self-host'
    )

    expect(cloudPanel).not.toHaveAttribute('hidden')
    expect(selfHostPanel).toHaveAttribute('hidden')
  })

  it('switches content on tab click', () => {
    render(
      <Tabs>
        <TabItem value="cloud" label="Cloud" default>
          Cloud content
        </TabItem>
        <TabItem value="self-host" label="Self-Hosted">
          Self-hosted content
        </TabItem>
      </Tabs>
    )

    activateTab('Self-Hosted')

    const panels = getTabPanels()
    const cloudPanel = Array.from(panels).find((p) => p.getAttribute('data-tab-value') === 'cloud')
    const selfHostPanel = Array.from(panels).find(
      (p) => p.getAttribute('data-tab-value') === 'self-host'
    )

    expect(cloudPanel).toHaveAttribute('hidden')
    expect(selfHostPanel).not.toHaveAttribute('hidden')
  })
})

describe('onboarding hides self-host tabs when entityName="plans"', () => {
  beforeEach(() => {
    mockPathname.mockReturnValue('/docs-onboarding/install/')
  })

  it('hides tab with value="self-host"', () => {
    render(
      <Tabs entityName="plans">
        <TabItem value="cloud" label="Cloud" default>
          Cloud content
        </TabItem>
        <TabItem value="self-host" label="Self-Hosted">
          Self-hosted content
        </TabItem>
      </Tabs>
    )

    expect(getTabButton('Cloud')).toBeTruthy()
    expect(getTabButton('Self-Hosted')).toBeNull()
    expect(screen.queryByText('Self-hosted content')).toBeNull()
  })

  it('hides tab with value="self-hosted"', () => {
    render(
      <Tabs entityName="plans">
        <TabItem value="signoz-cloud" label="SigNoz Cloud" default>
          Cloud content
        </TabItem>
        <TabItem value="self-hosted" label="SigNoz Self-Hosted">
          Self-hosted content
        </TabItem>
      </Tabs>
    )

    expect(getTabButton('SigNoz Cloud')).toBeTruthy()
    expect(getTabButton('SigNoz Self-Hosted')).toBeNull()
    expect(screen.queryByText('Self-hosted content')).toBeNull()
  })

  it('hides tab with value="self-host-deployment"', () => {
    render(
      <Tabs entityName="plans">
        <TabItem value="cloud" label="Cloud" default>
          Cloud content
        </TabItem>
        <TabItem value="self-host-deployment" label="Self-Hosted Deployment">
          Deployment content
        </TabItem>
      </Tabs>
    )

    expect(getTabButton('Cloud')).toBeTruthy()
    expect(getTabButton('Self-Hosted Deployment')).toBeNull()
    expect(screen.queryByText('Deployment content')).toBeNull()
  })

  it('hides tab with value="self-host-daemonset"', () => {
    render(
      <Tabs entityName="plans">
        <TabItem value="cloud" label="Cloud" default>
          Cloud content
        </TabItem>
        <TabItem value="self-host-daemonset" label="Self-Hosted DaemonSet">
          Daemonset content
        </TabItem>
      </Tabs>
    )

    expect(getTabButton('Cloud')).toBeTruthy()
    expect(getTabButton('Self-Hosted DaemonSet')).toBeNull()
    expect(screen.queryByText('Daemonset content')).toBeNull()
  })

  it('hides all self-host variants and keeps only cloud tabs', () => {
    render(
      <Tabs entityName="plans">
        <TabItem value="signoz-cloud" label="SigNoz Cloud" default>
          Cloud content
        </TabItem>
        <TabItem value="self-host" label="Self-Host">
          SH content
        </TabItem>
        <TabItem value="self-hosted" label="Self-Hosted">
          SH2 content
        </TabItem>
        <TabItem value="self-host-deployment" label="Self-Host Deploy">
          SH3 content
        </TabItem>
      </Tabs>
    )

    const buttons = getTabButtons()
    expect(buttons).toHaveLength(1)
    expect(buttons[0]).toHaveTextContent('SigNoz Cloud')
  })

  it('does NOT hide self-host tabs when entityName is not "plans"', () => {
    render(
      <Tabs entityName="environment">
        <TabItem value="cloud" label="Cloud" default>
          Cloud content
        </TabItem>
        <TabItem value="self-host" label="Self-Hosted">
          Self-hosted content
        </TabItem>
      </Tabs>
    )

    expect(getTabButton('Cloud')).toBeTruthy()
    expect(getTabButton('Self-Hosted')).toBeTruthy()
  })

  it('does NOT hide self-host tabs when entityName is undefined', () => {
    render(
      <Tabs>
        <TabItem value="self-host" label="Self-Hosted">
          Self-hosted content
        </TabItem>
        <TabItem value="cloud" label="Cloud">
          Cloud content
        </TabItem>
      </Tabs>
    )

    expect(getTabButton('Self-Hosted')).toBeTruthy()
    expect(getTabButton('Cloud')).toBeTruthy()
  })
})

describe('non-onboarding routes show all tabs', () => {
  it('shows self-host tabs on /docs/ routes', () => {
    mockPathname.mockReturnValue('/docs/install/')
    render(
      <Tabs entityName="plans">
        <TabItem value="cloud" label="Cloud" default>
          Cloud content
        </TabItem>
        <TabItem value="self-host" label="Self-Hosted">
          Self-hosted content
        </TabItem>
      </Tabs>
    )

    expect(getTabButton('Cloud')).toBeTruthy()
    expect(getTabButton('Self-Hosted')).toBeTruthy()
  })
})

describe('plans tabs sync to URL', () => {
  it('updates the query string with plans param on tab click (no Next navigation)', () => {
    render(
      <Tabs entityName="plans">
        <TabItem value="cloud" label="Cloud" default>
          Cloud content
        </TabItem>
        <TabItem value="self-host" label="Self-Hosted">
          Self-hosted content
        </TabItem>
      </Tabs>
    )

    activateTab('Self-Hosted')

    expect(window.location.search).toContain('plans=self-host')
  })

  it('restores tab from URL search params', () => {
    mockSearchParams.mockReturnValue(new URLSearchParams('plans=self-host'))

    render(
      <Tabs entityName="plans">
        <TabItem value="cloud" label="Cloud" default>
          Cloud content
        </TabItem>
        <TabItem value="self-host" label="Self-Hosted">
          Self-hosted content
        </TabItem>
      </Tabs>
    )

    const panels = getTabPanels()
    const selfHostPanel = Array.from(panels).find(
      (p) => p.getAttribute('data-tab-value') === 'self-host'
    )
    expect(selfHostPanel).not.toHaveAttribute('hidden')
  })
})

describe('nested tabs do not reset parent plans tab', () => {
  it('parent stays on self-host after nested tab click and URL restore', () => {
    const NestedTabs = () => (
      <Tabs entityName="plans">
        <TabItem value="cloud" label="Cloud" default>
          Cloud content
        </TabItem>
        <TabItem value="self-host" label="Self-Hosted">
          <Tabs entityName="client">
            <TabItem value="npm" label="npm" default>
              npm content
            </TabItem>
            <TabItem value="yarn" label="yarn">
              yarn content
            </TabItem>
          </Tabs>
        </TabItem>
      </Tabs>
    )

    window.history.replaceState({}, '', '/docs/install/?plans=self-host')
    mockSearchParams.mockReturnValue(new URLSearchParams('plans=self-host'))
    const { unmount } = render(<NestedTabs />)

    fireEvent.mouseDown(screen.getByRole('tab', { name: 'yarn' }))
    expect(window.location.search).toContain('plans=self-host')
    expect(window.location.search).toContain('client=yarn')

    mockSearchParams.mockReturnValue(new URLSearchParams('plans=self-host&client=yarn'))

    unmount()
    render(<NestedTabs />)

    const parentRoot = document.querySelectorAll('[data-tabs-root]')[0]
    const parentPanels = parentRoot.querySelectorAll(
      ':scope > [data-tab-panels] > [data-tab-value]'
    )
    const cloudPanel = Array.from(parentPanels).find(
      (p) => p.getAttribute('data-tab-value') === 'cloud'
    )
    const selfHostPanel = Array.from(parentPanels).find(
      (p) => p.getAttribute('data-tab-value') === 'self-host'
    )

    expect(cloudPanel).toHaveAttribute('hidden')
    expect(selfHostPanel).not.toHaveAttribute('hidden')

    const nestedRoot = document.querySelectorAll('[data-tabs-root]')[1]
    const nestedPanels = nestedRoot.querySelectorAll(
      ':scope > [data-tab-panels] > [data-tab-value]'
    )
    const yarnPanel = Array.from(nestedPanels).find(
      (p) => p.getAttribute('data-tab-value') === 'yarn'
    )
    expect(yarnPanel).not.toHaveAttribute('hidden')
  })
})

describe('environment tab switch preserves nested query params', () => {
  it('switches from k8s to windows while keeping k8s-method', () => {
    window.history.replaceState(
      {},
      '',
      '/docs/instrumentation/opentelemetry-python/?environment=k8s&k8s-method=direct'
    )
    mockPathname.mockReturnValue('/docs/instrumentation/opentelemetry-python/')
    mockSearchParams.mockReturnValue(new URLSearchParams('environment=k8s&k8s-method=direct'))

    render(
      <Tabs entityName="environment">
        <TabItem value="vm" label="VM" default>
          VM content
        </TabItem>
        <TabItem value="k8s" label="Kubernetes">
          <Tabs entityName="k8s-method">
            <TabItem value="direct" label="Direct" default>
              Direct content
            </TabItem>
            <TabItem value="otel-operator" label="OTel Operator">
              Operator content
            </TabItem>
          </Tabs>
        </TabItem>
        <TabItem value="windows" label="Windows">
          Windows content
        </TabItem>
      </Tabs>
    )

    expect(getTabButton('Kubernetes')).toHaveAttribute('aria-selected', 'true')

    activateTab('Windows')

    expect(getTabButton('Windows')).toHaveAttribute('aria-selected', 'true')
    expect(window.location.search).toContain('environment=windows')
    expect(window.location.search).toContain('k8s-method=direct')

    const panels = getTabPanels()
    const windowsPanel = Array.from(panels).find(
      (p) => p.getAttribute('data-tab-value') === 'windows'
    )
    expect(windowsPanel).not.toHaveAttribute('hidden')
  })
})

const FRAMEWORKS = [
  ['react', 'React (Vite/CRA)'],
  ['nextjs-app', 'Next.js (App Router)'],
  ['nextjs-pages', 'Next.js (Pages Router)'],
  ['nuxt', 'Nuxt.js'],
  ['angular', 'Angular'],
  ['vue', 'Vue.js'],
  ['svelte', 'Svelte/SvelteKit'],
] as const

const renderManyTabs = (
  count: number,
  props: Partial<Omit<React.ComponentProps<typeof Tabs>, 'children'>> = {}
) =>
  render(
    <Tabs {...props}>
      {FRAMEWORKS.slice(0, count).map(([value, label], index) => (
        <TabItem key={value} value={value} label={label} default={index === 0}>
          {label} content
        </TabItem>
      ))}
    </Tabs>
  )

const getPills = () =>
  document.querySelectorAll<HTMLButtonElement>('[data-tabs-root] button[data-tab-value]')
const getPill = (value: string) =>
  document.querySelector<HTMLButtonElement>(`[data-tabs-root] button[data-tab-value="${value}"]`)
const getPanel = (value: string) =>
  Array.from(getTabPanels()).find((p) => p.getAttribute('data-tab-value') === value)

describe('pills mode at 6+ items', () => {
  it('renders wrapping pill buttons instead of a tab bar at 6 items', () => {
    renderManyTabs(6, { entityName: 'framework-choice' })

    expect(getTabButtons()).toHaveLength(0)
    expect(getPills()).toHaveLength(6)
    FRAMEWORKS.slice(0, 6).forEach(([value, label]) => {
      expect(getPill(value)).toHaveTextContent(label)
    })
  })

  it('keeps the tab bar at 5 items', () => {
    renderManyTabs(5, { entityName: 'framework-choice' })

    expect(getTabButtons()).toHaveLength(5)
    expect(document.querySelector('[data-tabs-root] [aria-pressed]')).toBeNull()
  })

  it('keeps the panel contract: all panels present, only default visible', () => {
    renderManyTabs(6, { entityName: 'framework-choice' })

    const panels = getTabPanels()
    expect(panels).toHaveLength(6)
    expect(getPanel('react')).not.toHaveAttribute('hidden')
    FRAMEWORKS.slice(1, 6).forEach(([value]) => {
      expect(getPanel(value)).toHaveAttribute('hidden')
    })
  })

  it('marks the active pill and labels panels as regions', () => {
    renderManyTabs(6, { entityName: 'framework-choice' })

    expect(getPill('react')).toHaveAttribute('aria-pressed', 'true')
    expect(getPill('vue')).toHaveAttribute('aria-pressed', 'false')
    FRAMEWORKS.slice(0, 6).forEach(([value, label]) => {
      const panel = getPanel(value)
      expect(panel).toHaveAttribute('role', 'region')
      expect(panel).toHaveAttribute('aria-label', label)
    })
    expect(screen.getByRole('region', { name: 'React (Vite/CRA)' })).toBeTruthy()
  })

  it('does not add region roles in tab-bar mode', () => {
    renderManyTabs(5, { entityName: 'framework-choice' })

    FRAMEWORKS.slice(0, 5).forEach(([value]) => {
      expect(getPanel(value)).not.toHaveAttribute('role')
    })
  })

  it('clicking a pill switches the panel and syncs the URL', () => {
    renderManyTabs(7, { entityName: 'framework-choice' })

    fireEvent.click(getPill('svelte')!)

    expect(getPanel('svelte')).not.toHaveAttribute('hidden')
    expect(getPanel('react')).toHaveAttribute('hidden')
    expect(getPill('svelte')).toHaveAttribute('aria-pressed', 'true')
    expect(window.location.search).toContain('framework-choice=svelte')
  })

  it('restores the selection from URL search params', () => {
    mockSearchParams.mockReturnValue(new URLSearchParams('framework-choice=angular'))
    renderManyTabs(7, { entityName: 'framework-choice' })

    expect(getPill('angular')).toHaveAttribute('aria-pressed', 'true')
    expect(getPanel('angular')).not.toHaveAttribute('hidden')
    expect(getPanel('react')).toHaveAttribute('hidden')
  })

  it('programmatic pill click switches the panel and syncs the URL (DocsTOC path)', () => {
    renderManyTabs(7, { entityName: 'framework-choice' })

    act(() => {
      getPill('vue')!.click()
    })

    expect(getPanel('vue')).not.toHaveAttribute('hidden')
    expect(window.location.search).toContain('framework-choice=vue')
  })

  it('works without entityName and leaves the URL untouched', () => {
    renderManyTabs(6)

    fireEvent.click(getPill('vue')!)

    expect(getPanel('vue')).not.toHaveAttribute('hidden')
    expect(window.location.search).toBe('')
  })
})

describe('pills threshold counts visible children after onboarding filtering', () => {
  const plansItems = [
    ['cloud', 'Cloud'],
    ['aws', 'AWS'],
    ['gcp', 'GCP'],
    ['azure', 'Azure'],
    ['oracle', 'Oracle'],
    ['self-host', 'Self-Host'],
    ['self-hosted', 'Self-Hosted'],
  ].map(([value, label], index) => (
    <TabItem key={value} value={value} label={label} default={index === 0}>
      {label} content
    </TabItem>
  ))

  it('7 items with 2 self-host variants stays a tab bar on onboarding routes', () => {
    mockPathname.mockReturnValue('/docs-onboarding/install/')
    render(<Tabs entityName="plans">{plansItems}</Tabs>)

    expect(getTabButtons()).toHaveLength(5)
    expect(document.querySelector('[data-tabs-root] [aria-pressed]')).toBeNull()
  })

  it('the same 7 items become pills on regular docs routes', () => {
    render(<Tabs entityName="plans">{plansItems}</Tabs>)

    expect(getTabButtons()).toHaveLength(0)
    expect(getPills()).toHaveLength(7)
    expect(getPill('cloud')).toHaveAttribute('aria-pressed', 'true')
  })
})

describe('layout escape hatch', () => {
  it('layout="tabs" keeps the tab bar at 7 items', () => {
    renderManyTabs(7, { entityName: 'framework-choice', layout: 'tabs' })

    expect(getTabButtons()).toHaveLength(7)
    expect(document.querySelector('[data-tabs-root] [aria-pressed]')).toBeNull()
  })

  it('layout="pills" forces pills at 2 items', () => {
    renderManyTabs(2, { entityName: 'framework-choice', layout: 'pills' })

    expect(getTabButtons()).toHaveLength(0)
    expect(getPills()).toHaveLength(2)
  })
})
