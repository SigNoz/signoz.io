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
const mockReplace = vi.fn()

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
  useRouter: () => ({ replace: mockReplace }),
}))

const mockSearchParams = vi.fn(() => new URLSearchParams())
vi.mock('@/hooks/useSearchParamsState', () => ({
  useSearchParamsState: () => mockSearchParams(),
}))

beforeEach(() => {
  mockPathname.mockReturnValue('/docs/install/')
  mockReplace.mockClear()
  mockSearchParams.mockReturnValue(new URLSearchParams())
})

const getTabButtons = () => screen.queryAllByRole('button')
const getTabButton = (name: string) => screen.queryByRole('button', { name })
const getTabPanels = () =>
  document.querySelectorAll<HTMLDivElement>('[data-tabs-root] > .mt-4 > [data-tab-value]')

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

    fireEvent.click(getTabButton('Self-Hosted')!)

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
  it('calls router.replace with plans param on tab click', () => {
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

    fireEvent.click(getTabButton('Self-Hosted')!)

    expect(mockReplace).toHaveBeenCalledWith(expect.stringContaining('plans=self-host'), {
      scroll: false,
    })
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
