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

    expect(screen.getByText('Ask AI about this page')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Open in ChatGPT' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Open in Claude' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Open in Perplexity' })).toBeTruthy()
  })

  it('is marked as human-only chrome for markdown parity', () => {
    const { container } = render(<AskAIRow />)

    expect(container.firstElementChild?.hasAttribute('data-markdown-ignore')).toBe(true)
  })

  it('opens the provider with a prompt for the current page .md URL', () => {
    mockPathname.mockReturnValue('/pricing/')
    render(<AskAIRow />)

    fireEvent.click(screen.getByRole('button', { name: 'Open in Claude' }))

    expect(openSpy).toHaveBeenCalledTimes(1)
    const [url, target, features] = openSpy.mock.calls[0]
    expect(target).toBe('_blank')
    expect(features).toBe('noopener,noreferrer')
    expect(url).toContain('https://claude.ai/new?q=')
    const prompt = decodeURIComponent(url.split('q=')[1])
    expect(prompt).toContain('/pricing.md')
    expect(prompt).toContain('https://signoz.io/llms.txt')
  })

  it('tracks clicks with the footer location and page path', () => {
    render(<AskAIRow />)

    fireEvent.click(screen.getByRole('button', { name: 'Open in ChatGPT' }))

    expect(mockLogEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        eventName: 'Website Click',
        attributes: expect.objectContaining({
          clickName: 'ask_ai_chatgpt',
          clickLocation: 'footer',
          pagePath: '/docs/install/',
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
