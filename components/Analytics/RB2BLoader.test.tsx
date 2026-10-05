import React from 'react'
import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import RB2BLoader from './RB2BLoader'

const { mockPathname } = vi.hoisted(() => ({ mockPathname: vi.fn() }))
vi.mock('next/navigation', () => ({ usePathname: mockPathname }))

const SCRIPT_URL = 'https://ddwl4m2hdecbv.cloudfront.net/b/VN080HZ24Y6J/VN080HZ24Y6J.js.gz'

beforeEach(() => {
  vi.useFakeTimers()
  vi.stubEnv('NODE_ENV', 'production')
  mockPathname.mockReturnValue('/')
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.useRealTimers()
  document.getElementById('rb2b-script')?.remove()
})

describe('RB2BLoader', () => {
  it('injects asynchronously after idle and replaces the script only when the pathname changes', () => {
    const { rerender, unmount } = render(<RB2BLoader />)
    expect(document.getElementById('rb2b-script')).toBeNull()

    vi.runAllTimers()
    const initialScript = document.getElementById('rb2b-script') as HTMLScriptElement
    expect(initialScript.src).toBe(SCRIPT_URL)
    expect(initialScript.async).toBe(true)

    rerender(<RB2BLoader />)
    vi.runAllTimers()
    expect(document.getElementById('rb2b-script')).toBe(initialScript)

    mockPathname.mockReturnValue('/docs/')
    rerender(<RB2BLoader />)
    vi.runAllTimers()
    expect(initialScript.isConnected).toBe(false)
    expect(document.querySelectorAll('#rb2b-script')).toHaveLength(1)
    expect(document.getElementById('rb2b-script')).not.toBe(initialScript)

    unmount()
    expect(document.getElementById('rb2b-script')).toBeNull()
  })

  it('cancels a pending injection when unmounted before idle', () => {
    const { unmount } = render(<RB2BLoader />)
    unmount()
    vi.runAllTimers()
    expect(document.getElementById('rb2b-script')).toBeNull()
  })

  it('uses requestIdleCallback when available', () => {
    const idle: { callback?: () => void } = {}
    const requestIdleCallback = vi.fn((cb: () => void) => {
      idle.callback = cb
      return 1
    })
    const cancelIdleCallback = vi.fn()
    vi.stubGlobal('requestIdleCallback', requestIdleCallback)
    vi.stubGlobal('cancelIdleCallback', cancelIdleCallback)

    const { unmount } = render(<RB2BLoader />)
    expect(requestIdleCallback).toHaveBeenCalledWith(expect.any(Function), { timeout: 2000 })
    idle.callback?.()
    expect(document.getElementById('rb2b-script')).not.toBeNull()

    unmount()
    expect(cancelIdleCallback).toHaveBeenCalledWith(1)
    expect(document.getElementById('rb2b-script')).toBeNull()

    vi.unstubAllGlobals()
  })

  it('does not track local development visits', () => {
    vi.stubEnv('NODE_ENV', 'development')
    render(<RB2BLoader />)
    vi.runAllTimers()
    expect(document.getElementById('rb2b-script')).toBeNull()
  })

  it('waits for the router pathname before loading', () => {
    mockPathname.mockReturnValue(null)
    const { rerender } = render(<RB2BLoader />)
    vi.runAllTimers()
    expect(document.getElementById('rb2b-script')).toBeNull()

    mockPathname.mockReturnValue('/')
    rerender(<RB2BLoader />)
    vi.runAllTimers()
    expect(document.querySelectorAll('#rb2b-script')).toHaveLength(1)
  })
})
