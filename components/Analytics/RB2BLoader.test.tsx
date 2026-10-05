import React from 'react'
import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import RB2BLoader from './RB2BLoader'

const { mockPathname } = vi.hoisted(() => ({ mockPathname: vi.fn() }))
vi.mock('next/navigation', () => ({ usePathname: mockPathname }))

beforeEach(() => {
  vi.stubEnv('NODE_ENV', 'production')
  mockPathname.mockReturnValue('/')
})

afterEach(() => {
  vi.unstubAllEnvs()
  document.getElementById('rb2b-script')?.remove()
})

describe('RB2BLoader', () => {
  it('loads asynchronously and replaces the script only when the pathname changes', () => {
    const { rerender, unmount } = render(<RB2BLoader />)
    const initialScript = document.getElementById('rb2b-script') as HTMLScriptElement
    expect(initialScript.src).toBe(
      'https://ddwl4m2hdecbv.cloudfront.net/b/VN080HZ24Y6J/VN080HZ24Y6J.js.gz'
    )
    expect(initialScript.async).toBe(true)

    rerender(<RB2BLoader />)
    expect(document.getElementById('rb2b-script')).toBe(initialScript)

    mockPathname.mockReturnValue('/docs/')
    rerender(<RB2BLoader />)
    expect(initialScript.isConnected).toBe(false)
    expect(document.querySelectorAll('#rb2b-script')).toHaveLength(1)
    expect(document.getElementById('rb2b-script')).not.toBe(initialScript)

    unmount()
    expect(document.getElementById('rb2b-script')).toBeNull()
  })

  it('does not track local development visits', () => {
    vi.stubEnv('NODE_ENV', 'development')
    render(<RB2BLoader />)
    expect(document.getElementById('rb2b-script')).toBeNull()
  })

  it('waits for the router pathname before loading', () => {
    mockPathname.mockReturnValue(null)
    const { rerender } = render(<RB2BLoader />)
    expect(document.getElementById('rb2b-script')).toBeNull()

    mockPathname.mockReturnValue('/')
    rerender(<RB2BLoader />)
    expect(document.querySelectorAll('#rb2b-script')).toHaveLength(1)
  })
})
