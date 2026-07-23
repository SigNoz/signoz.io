import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
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
  document.querySelectorAll<HTMLDivElement>('[data-tabs-root] > .mt-4 > [data-tab-value]')

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
    const parentPanels = parentRoot.querySelectorAll(':scope > .mt-4 > [data-tab-value]')
    const cloudPanel = Array.from(parentPanels).find(
      (p) => p.getAttribute('data-tab-value') === 'cloud'
    )
    const selfHostPanel = Array.from(parentPanels).find(
      (p) => p.getAttribute('data-tab-value') === 'self-host'
    )

    expect(cloudPanel).toHaveAttribute('hidden')
    expect(selfHostPanel).not.toHaveAttribute('hidden')

    const nestedRoot = document.querySelectorAll('[data-tabs-root]')[1]
    const nestedPanels = nestedRoot.querySelectorAll(':scope > .mt-4 > [data-tab-value]')
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
