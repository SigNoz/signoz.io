import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import DecimalLauncher from './DecimalLauncher'

const decimal = vi.hoisted(() => {
  let status = 'idle'
  const listeners = new Set<() => void>()
  return {
    functional: false,
    getStatus: () => status,
    setStatus: (next: string) => {
      status = next
      listeners.forEach((listener) => listener())
    },
    subscribe: (listener: () => void) => {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
      }
    },
    open: vi.fn(),
    shown: vi.fn(() => false),
  }
})

vi.mock('@/components/ui/Button', async () => {
  const { forwardRef } = await import('react')
  return {
    Button: forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
      (props, ref) => <button ref={ref} {...props} />
    ),
  }
})

vi.mock('@/hooks/useConsent', () => ({
  useConsent: () => ({ categories: { functional: decimal.functional } }),
}))

vi.mock('@/utils/decimal', () => ({
  DECIMAL_PRIMARY_COLOR: 'rgb(255, 68, 32)',
  isDecimalConfigured: true,
  getDecimalStatus: () => decimal.getStatus(),
  subscribeDecimalStatus: (listener: () => void) => decimal.subscribe(listener),
  isDecimalLauncherShown: () => decimal.shown(),
  openDecimalChat: decimal.open,
}))

const notice = () => screen.queryByRole('dialog', { name: 'Chat with SigNoz AI' })

beforeEach(() => {
  decimal.functional = false
  decimal.setStatus('idle')
  decimal.open.mockReset()
  decimal.shown.mockReturnValue(false)
})

afterEach(() => {
  vi.useRealTimers()
})

describe('DecimalLauncher', () => {
  it('explains the cookie first and loads Decimal only when the visitor starts the chat', () => {
    render(<DecimalLauncher />)

    fireEvent.click(screen.getByRole('button', { name: 'Open chat' }))
    expect(notice()?.textContent).toContain('sets one cookie')
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Start chat' }))
    expect(decimal.open).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole('button', { name: 'Start chat' }))
    expect(decimal.open).toHaveBeenCalledTimes(1)
  })

  it('opens the chat straight away for visitors who allow functional cookies', () => {
    decimal.functional = true
    render(<DecimalLauncher />)

    fireEvent.click(screen.getByRole('button', { name: 'Open chat' }))
    expect(decimal.open).toHaveBeenCalledTimes(1)
    expect(notice()).toBeNull()
  })

  it('shows progress while loading and lets the visitor retry after a failure', () => {
    render(<DecimalLauncher />)
    fireEvent.click(screen.getByRole('button', { name: 'Open chat' }))

    act(() => decimal.setStatus('loading'))
    expect(screen.getByRole<HTMLButtonElement>('button', { name: 'Starting…' }).disabled).toBe(true)

    act(() => decimal.setStatus('failed'))
    expect(screen.getByRole('alert').textContent).toContain("The chat couldn't load")
    expect(screen.getByRole<HTMLButtonElement>('button', { name: 'Start chat' }).disabled).toBe(
      false
    )
  })

  it('closes the notice with Escape', () => {
    render(<DecimalLauncher />)
    fireEvent.click(screen.getByRole('button', { name: 'Open chat' }))
    fireEvent.keyDown(screen.getByRole('button', { name: 'Start chat' }), { key: 'Escape' })
    expect(notice()).toBeNull()
  })

  it('stays until Decimal shows its own launcher', () => {
    vi.useFakeTimers()
    render(<DecimalLauncher />)
    fireEvent.click(screen.getByRole('button', { name: 'Open chat' }))

    act(() => decimal.setStatus('loaded'))
    expect(notice()).toBeNull()
    act(() => vi.advanceTimersByTime(500))
    expect(screen.queryByRole('button', { name: 'Open chat' })).not.toBeNull()

    decimal.shown.mockReturnValue(true)
    act(() => vi.advanceTimersByTime(100))
    expect(screen.queryByRole('button', { name: 'Open chat' })).toBeNull()
  })

  it('steps aside after 10 seconds even if Decimal never shows its launcher', () => {
    vi.useFakeTimers()
    render(<DecimalLauncher />)

    act(() => decimal.setStatus('loaded'))
    act(() => vi.advanceTimersByTime(9900))
    expect(screen.queryByRole('button', { name: 'Open chat' })).not.toBeNull()
    act(() => vi.advanceTimersByTime(200))
    expect(screen.queryByRole('button', { name: 'Open chat' })).toBeNull()
  })
})
