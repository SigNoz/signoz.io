import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import { fromDom } from 'hast-util-from-dom'
import type { Root as HastRoot, Element as HastElement } from 'hast'
import { expandTabsInHast } from '@/utils/docs/buildCopyMarkdownFromRendered'
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

const FRAMEWORKS = [
  ['react', 'React (Vite/CRA)'],
  ['nextjs-app', 'Next.js (App Router)'],
  ['nextjs-pages', 'Next.js (Pages Router)'],
  ['nuxt', 'Nuxt.js'],
  ['angular', 'Angular'],
  ['vue', 'Vue.js'],
  ['svelte', 'Svelte/SvelteKit'],
] as const

// fromDom camelCases data attributes in hast properties
const collectPanelHeadings = (tree: HastRoot): Map<string, string> => {
  const headings = new Map<string, string>()
  const visit = (node: HastRoot | HastElement) => {
    if (!('children' in node)) return
    node.children.forEach((child) => {
      if (child.type !== 'element') return
      const value = child.properties?.dataTabValue
      if (child.tagName === 'div' && typeof value === 'string') {
        const h3 = child.children.find(
          (grandchild) => grandchild.type === 'element' && grandchild.tagName === 'h3'
        ) as HastElement | undefined
        const text = h3?.children.map((c) => (c.type === 'text' ? c.value : '')).join('')
        if (text !== undefined) headings.set(value, text)
      }
      visit(child)
    })
  }
  visit(tree)
  return headings
}

describe('dropdown-mode Tabs feed expandTabsInHast with labels', () => {
  it('every panel gains an h3 with the tab label (not the value slug)', () => {
    const { container } = render(
      <Tabs entityName="framework-choice">
        {FRAMEWORKS.map(([value, label], index) => (
          <TabItem key={value} value={value} label={label} default={index === 0}>
            {label} content
          </TabItem>
        ))}
      </Tabs>
    )

    expect(container.querySelector('[role="tablist"]')).toBeNull()

    const tree = expandTabsInHast(fromDom(container) as HastRoot)
    const headings = collectPanelHeadings(tree)

    FRAMEWORKS.forEach(([value, label]) => {
      expect(headings.get(value)).toBe(label)
    })
  })

  it('hidden panels are un-hidden so all content is exportable', () => {
    const { container } = render(
      <Tabs entityName="framework-choice">
        {FRAMEWORKS.map(([value, label], index) => (
          <TabItem key={value} value={value} label={label} default={index === 0}>
            {label} content
          </TabItem>
        ))}
      </Tabs>
    )

    const tree = expandTabsInHast(fromDom(container) as HastRoot)

    const seenPanels: string[] = []
    const hiddenPanels: string[] = []
    const visit = (node: HastRoot | HastElement) => {
      if (!('children' in node)) return
      node.children.forEach((child) => {
        if (child.type !== 'element') return
        const value = child.properties?.dataTabValue
        if (child.tagName === 'div' && typeof value === 'string') {
          seenPanels.push(value)
          if (child.properties?.hidden) hiddenPanels.push(value)
        }
        visit(child)
      })
    }
    visit(tree)

    expect(seenPanels).toEqual(expect.arrayContaining(FRAMEWORKS.map(([value]) => value)))
    expect(hiddenPanels).toEqual([])
  })
})
