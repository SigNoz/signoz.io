import { fireEvent, render } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import PageViewTracker from './PageViewTracker'

const mocks = vi.hoisted(() => ({
  detectBotClientSide: vi.fn(),
  getAnalyticsSessionId: vi.fn(),
  logEvent: vi.fn(),
  pathname: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  usePathname: () => mocks.pathname(),
  useSearchParams: () => new URLSearchParams(),
}))

vi.mock('../../hooks/useLogEvent', () => ({
  useLogEvent: () => mocks.logEvent,
}))

vi.mock('../../utils/logEvent', () => ({
  detectBotClientSide: () => mocks.detectBotClientSide(),
}))

vi.mock('../../utils/userClient', () => ({
  getOrCreateAnalyticsSessionId: () => mocks.getAnalyticsSessionId(),
}))

const setDocumentHeight = (height: number) => {
  Object.defineProperties(document.documentElement, {
    scrollHeight: { configurable: true, value: height },
    offsetHeight: { configurable: true, value: height },
    clientHeight: { configurable: true, value: height },
  })
  Object.defineProperties(document.body, {
    scrollHeight: { configurable: true, value: height },
    offsetHeight: { configurable: true, value: height },
  })
}

const setScrollY = (value: number) => {
  Object.defineProperty(window, 'scrollY', { configurable: true, value })
}

describe('PageViewTracker', () => {
  beforeEach(() => {
    mocks.logEvent.mockReset()
    mocks.pathname.mockReturnValue('/docs/')
    mocks.getAnalyticsSessionId.mockReturnValue('session-1')
    mocks.detectBotClientSide.mockReturnValue({
      isBot: false,
      botType: undefined,
      reason: undefined,
    })

    window.history.replaceState({}, '', '/docs/')
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 1000 })
    setDocumentHeight(2000)
    setScrollY(0)
  })

  it('sends one page-leave event with duration and maximum scroll depth', () => {
    const now = vi.spyOn(Date, 'now').mockReturnValue(1000)
    render(<PageViewTracker />)

    setScrollY(600)
    now.mockReturnValue(4000)
    fireEvent(window, new Event('pagehide'))
    fireEvent(window, new Event('pagehide'))

    const pageLeaveCalls = mocks.logEvent.mock.calls.filter(
      ([payload]) => payload.eventName === 'Website Page Leave'
    )

    expect(pageLeaveCalls).toHaveLength(1)
    expect(pageLeaveCalls[0]).toEqual([
      {
        eventName: 'Website Page Leave',
        eventType: 'track',
        attributes: expect.objectContaining({
          pageLocation: '/docs/',
          $session_id: 'session-1',
          pageDurationSeconds: 3,
          scrollDepthPercentage: 80,
        }),
      },
      { transport: 'beacon' },
    ])
  })
})
