import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import PageViewTracker from './PageViewTracker'

const mockLogEvent = vi.fn()
vi.mock('@/hooks/useLogEvent', () => ({
  useLogEvent: () => mockLogEvent,
}))

vi.mock('next/navigation', () => ({
  usePathname: () => '/docs/introduction',
  useSearchParams: () => new URLSearchParams(),
}))

const defineWindowProperty = (target: object, key: string, value: unknown) => {
  Object.defineProperty(target, key, { value, configurable: true, writable: true })
}

describe('PageViewTracker', () => {
  beforeEach(() => {
    mockLogEvent.mockClear()
    localStorage.clear()
    // jsdom reports zero screen dimensions, which the bot heuristics treat as headless
    defineWindowProperty(window, 'screen', { width: 1440, height: 900 })
    defineWindowProperty(document.documentElement, 'scrollHeight', 2000)
    defineWindowProperty(window, 'innerHeight', 800)
    defineWindowProperty(window, 'scrollY', 0)
  })

  it('logs a page view with a session id', () => {
    render(<PageViewTracker />)

    expect(mockLogEvent).toHaveBeenCalledTimes(1)
    const [payload] = mockLogEvent.mock.calls[0]
    expect(payload.eventName).toBe('Website Page View')
    expect(payload.attributes.pageLocation).toBe('/docs/introduction')
    expect(payload.attributes.$session_id).toBeTruthy()
  })

  it('sends a page leave beacon with duration and scroll depth linked to the same session', () => {
    render(<PageViewTracker />)

    const [pageView] = mockLogEvent.mock.calls[0]
    mockLogEvent.mockClear()

    window.dispatchEvent(new Event('pagehide'))

    expect(mockLogEvent).toHaveBeenCalledTimes(1)
    const [payload, options] = mockLogEvent.mock.calls[0]
    expect(payload.eventName).toBe('Website Page Leave')
    expect(payload.attributes.$session_id).toBe(pageView.attributes.$session_id)
    expect(payload.attributes.pageDurationSeconds).toBeGreaterThanOrEqual(0)
    expect(payload.attributes.scrollDepthPercentage).toBe(40)
    expect(options).toEqual({ transport: 'beacon' })
  })

  it('does not send a duplicate page leave once the page is marked left', () => {
    render(<PageViewTracker />)
    mockLogEvent.mockClear()

    window.dispatchEvent(new Event('pagehide'))
    window.dispatchEvent(new Event('pagehide'))

    expect(mockLogEvent).toHaveBeenCalledTimes(1)
  })
})
