import type { ReactNode } from 'react'

import type { TerminalTone } from '../agentNativeTerminalScript'

export const TONE_CLASS: Record<TerminalTone, string> = {
  ok: 'text-[var(--agent-t-ok)]',
  bad: 'text-[var(--agent-t-bad)]',
  warn: 'text-[var(--agent-t-warn)]',
  info: 'text-[var(--agent-t-info)]',
  dim: 'text-[var(--l3-foreground)]',
  accent: 'text-[var(--agent-t-accent)]',
  strong: 'font-semibold text-[var(--l1-foreground-hover)]',
}

export const ROW_TONE_BORDER: Record<string, string> = {
  bad: 'border-l-[var(--agent-t-bad)]',
  warn: 'border-l-[var(--agent-t-warn)]',
  ok: 'border-l-[color-mix(in_srgb,var(--agent-t-ok)_55%,transparent)]',
  none: 'border-l-transparent',
}

export const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

const INLINE_TONE_PATTERN = /\[\[(ok|bad|warn|info|dim|accent|strong):([^\]]*)\]\]/g

export function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const pattern = new RegExp(INLINE_TONE_PATTERN)
  let lastIndex = 0
  let match: RegExpExecArray | null = pattern.exec(text)

  while (match !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    nodes.push(
      <span key={match.index} className={TONE_CLASS[match[1] as TerminalTone]}>
        {match[2]}
      </span>
    )
    lastIndex = match.index + match[0].length
    match = pattern.exec(text)
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

export function rowTone(row: string[]) {
  const joined = row.join(' ')
  if (joined.includes('[[bad:')) return 'bad'
  if (joined.includes('[[warn:')) return 'warn'
  if (joined.includes('[[ok:')) return 'ok'
  return 'none'
}

export type RunToken = {
  cancelled: boolean
  skip: boolean
  pending: Set<() => void>
}

export function sleep(ms: number, token: RunToken) {
  return new Promise<void>((resolve) => {
    if (token.cancelled || token.skip) {
      resolve()
      return
    }
    const finish = () => {
      clearTimeout(timeoutId)
      token.pending.delete(finish)
      resolve()
    }
    const timeoutId = setTimeout(finish, ms)
    token.pending.add(finish)
  })
}

export function waitWhileHidden(token: RunToken) {
  if (token.cancelled || token.skip || typeof document === 'undefined' || !document.hidden) {
    return Promise.resolve()
  }
  return new Promise<void>((resolve) => {
    const finish = () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      token.pending.delete(finish)
      resolve()
    }
    const onVisibilityChange = () => {
      if (!document.hidden) finish()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    token.pending.add(finish)
  })
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export function subscribeReducedMotion(onChange: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)
  mediaQuery.addEventListener('change', onChange)
  return () => mediaQuery.removeEventListener('change', onChange)
}

export function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

export function getReducedMotionServerSnapshot() {
  return false
}

export function flushToken(token: RunToken | null) {
  if (!token) return
  token.skip = true
  Array.from(token.pending).forEach((finish) => finish())
}
