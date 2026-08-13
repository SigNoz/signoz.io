import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AskAIRow from './AskAIRow'
import { buildAgentPrompt } from '../OpenInAI/OpenInAI.utils'

const mockLogEvent = vi.fn()
vi.mock('@/hooks/useLogEvent', () => ({
  useLogEvent: () => mockLogEvent,
}))

const mockPathname = vi.fn(() => '/docs/install/')
vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}))

const openSpy = vi.fn()

beforeEach(() => {
  mockLogEvent.mockClear()
  openSpy.mockClear()
  mockPathname.mockReturnValue('/docs/install/')
  vi.stubGlobal('open', openSpy)
})

describe('AskAIRow', () => {
  it('renders the label and one button per AI provider', () => {
    render(<AskAIRow />)

    expect(screen.getByText('Ask AI about SigNoz')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Open in ChatGPT' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Open in Claude' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Open in AI Mode' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Open in Perplexity' })).toBeTruthy()
  })

  it('lists AI Mode before Perplexity', () => {
    render(<AskAIRow />)

    const labels = screen.getAllByRole('button').map((button) => button.getAttribute('aria-label'))
    expect(labels.indexOf('Open in AI Mode')).toBeLessThan(labels.indexOf('Open in Perplexity'))
  })

  it('is marked as human-only chrome for markdown parity', () => {
    const { container } = render(<AskAIRow />)

    expect(container.firstElementChild?.hasAttribute('data-markdown-ignore')).toBe(true)
  })

  it('opens every provider with the shared SigNoz prompt', () => {
    render(<AskAIRow />)

    fireEvent.click(screen.getByRole('button', { name: 'Open in Claude' }))

    expect(openSpy).toHaveBeenCalledTimes(1)
    const [url, target, features] = openSpy.mock.calls[0]
    expect(target).toBe('_blank')
    expect(features).toBe('noopener,noreferrer')
    expect(url).toContain('https://claude.ai/new?q=')
    const prompt = decodeURIComponent(url.split('q=')[1])
    expect(prompt).toContain('I want to learn more about SigNoz Cloud')
    expect(prompt).toContain('https://signoz.io/agent-native-observability')
  })

  it('opens AI Mode as a Google search with udm=50', () => {
    render(<AskAIRow />)

    fireEvent.click(screen.getByRole('button', { name: 'Open in AI Mode' }))

    const [url] = openSpy.mock.calls[0]
    expect(url).toContain('https://www.google.com/search?udm=50&q=')
    const prompt = decodeURIComponent(url.split('q=')[1])
    expect(prompt).toContain('I want to learn more about SigNoz Cloud')
  })

  it('tracks clicks with the shared clickName and provider in clickText', () => {
    render(<AskAIRow />)

    fireEvent.click(screen.getByRole('button', { name: 'Open in ChatGPT' }))

    expect(mockLogEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        eventName: 'Website Click',
        attributes: expect.objectContaining({
          clickType: 'External Click',
          clickName: 'Open in AI Button',
          clickText: 'ChatGPT',
          clickLocation: 'Footer',
          pageLocation: '/docs/install/',
        }),
      })
    )
  })
})

describe('buildAgentPrompt', () => {
  it('references the .md URL and llms.txt', () => {
    const prompt = buildAgentPrompt('https://signoz.io/docs/install/')

    expect(prompt).toContain('https://signoz.io/docs/install.md')
    expect(prompt).not.toContain('install/.md')
    expect(prompt).toContain('https://signoz.io/llms.txt')
  })

  it('keeps the homepage URL as-is instead of a broken .md suffix', () => {
    const prompt = buildAgentPrompt('https://signoz.io/')

    expect(prompt).toContain('Read https://signoz.io/ ')
    expect(prompt).not.toContain('signoz.io.md')
  })
})
