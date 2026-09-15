'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

import { useLogEvent } from '@/hooks/useLogEvent'
import { cn } from 'app/lib/utils'

import { TERMINAL_SESSIONS } from '../agentNativeTerminalScript'
import styles from './agent-terminal.module.css'
import { Caret, PromptMarker, SessionStep } from './blocks'
import {
  SPINNER_FRAMES,
  flushToken,
  getReducedMotionServerSnapshot,
  getReducedMotionSnapshot,
  sleep,
  subscribeReducedMotion,
  waitWhileHidden,
  type RunToken,
} from './helpers'

export default function AgentTerminal({ className = '' }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const tokenRef = useRef<RunToken | null>(null)
  const stuckToBottomRef = useRef(true)
  const logEvent = useLogEvent()

  const [isActive, setIsActive] = useState(
    () => typeof window !== 'undefined' && typeof IntersectionObserver === 'undefined'
  )
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  )
  const [sessionIndex, setSessionIndex] = useState(0)
  const [replayNonce, setReplayNonce] = useState(0)
  const [stepCount, setStepCount] = useState(0)
  const [partial, setPartial] = useState(0)
  const [toolDone, setToolDone] = useState(false)
  const [spinnerFrame, setSpinnerFrame] = useState(0)

  // Reset in-render on session switch so a new session never flashes fully rendered.
  const [renderedSessionKey, setRenderedSessionKey] = useState(`${sessionIndex}-${replayNonce}`)
  const sessionKey = `${sessionIndex}-${replayNonce}`
  if (renderedSessionKey !== sessionKey) {
    setRenderedSessionKey(sessionKey)
    if (!prefersReducedMotion) {
      setStepCount(0)
      setPartial(0)
      setToolDone(false)
    }
  }

  const session = TERMINAL_SESSIONS[sessionIndex]
  const sessionDone = stepCount >= session.steps.length

  useEffect(() => {
    const node = rootRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsActive(true)
          observer.disconnect()
        }
      },
      { rootMargin: '120px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isActive) return undefined

    const steps = TERMINAL_SESSIONS[sessionIndex].steps
    const token: RunToken = { cancelled: false, skip: false, pending: new Set() }
    tokenRef.current = token
    const wait = async (ms: number) => {
      await sleep(ms, token)
      await waitWhileHidden(token)
    }

    const run = async () => {
      if (prefersReducedMotion) {
        setStepCount(steps.length)
        setPartial(0)
        setToolDone(true)
        return
      }

      setStepCount(0)
      setPartial(0)
      setToolDone(false)
      stuckToBottomRef.current = true
      if (screenRef.current) screenRef.current.scrollTop = 0

      await wait(240)

      for (let index = 0; index < steps.length; index++) {
        if (token.cancelled) return
        const step = steps[index]
        setStepCount(index)
        setPartial(0)
        setToolDone(false)

        switch (step.type) {
          case 'input': {
            await wait(280)
            for (let i = 0; i < step.text.length; i++) {
              if (token.cancelled) return
              if (token.skip) break
              setPartial(i + 1)
              await wait((step.text[i] === ' ' ? 8 : 15) + Math.random() * 26)
            }
            setPartial(step.text.length)
            await wait(420)
            break
          }
          case 'step':
            await wait(520)
            break
          case 'title':
            await wait(320)
            break
          case 'text':
            await wait(240)
            break
          case 'tool': {
            for (let i = 0; i < 11; i++) {
              if (token.cancelled) return
              if (token.skip) break
              setSpinnerFrame(i % SPINNER_FRAMES.length)
              await wait(80)
            }
            setToolDone(true)
            await wait(460)
            break
          }
          case 'table': {
            for (let rowIndex = 0; rowIndex < step.rows.length; rowIndex++) {
              if (token.cancelled) return
              setPartial(rowIndex + 1)
              if (!token.skip) await wait(110)
            }
            await wait(240)
            break
          }
          case 'tree':
          case 'logs': {
            for (let lineIndex = 0; lineIndex < step.lines.length; lineIndex++) {
              if (token.cancelled) return
              setPartial(lineIndex + 1)
              if (!token.skip) await wait(step.type === 'tree' ? 120 : 150)
            }
            await wait(220)
            break
          }
          case 'spacer':
            break
        }
      }

      if (token.cancelled) return
      setStepCount(steps.length)

      token.skip = false
      await wait(4600)
      if (!token.cancelled) {
        setSessionIndex((current) => (current + 1) % TERMINAL_SESSIONS.length)
      }
    }

    run()

    return () => {
      token.cancelled = true
      Array.from(token.pending).forEach((finish) => finish())
      if (tokenRef.current === token) tokenRef.current = null
    }
  }, [isActive, prefersReducedMotion, sessionIndex, replayNonce])

  useEffect(() => {
    const screen = screenRef.current
    if (screen && stuckToBottomRef.current) {
      screen.scrollTop = screen.scrollHeight
    }
  })

  const handleTabClick = (index: number) => {
    logEvent({
      eventName: 'Website Click',
      eventType: 'track',
      attributes: {
        clickType: 'Agent Prompt Tab',
        clickName: 'Homepage Agent Prompt Tab',
        clickLocation: 'Homepage Agent Native Observability Section',
        clickText: TERMINAL_SESSIONS[index].label,
      },
    })
    setSessionIndex(index)
    setReplayNonce((nonce) => nonce + 1)
  }

  return (
    <div
      ref={rootRef}
      className={cn(
        styles.terminal,
        'flex flex-col overflow-hidden rounded-xl border border-[var(--l2-border)] bg-[var(--l1-background)] shadow-[0_50px_100px_-28px_rgba(0,0,0,0.8)]',
        className
      )}
    >
      <div className="flex h-10 shrink-0 items-center gap-3 border-b border-[var(--l2-border)] bg-[var(--l2-background)] px-3.5">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[var(--bg-cherry-500)]" />
          <span className="size-3 rounded-full bg-[var(--bg-amber-500)]" />
          <span className="size-3 rounded-full bg-[var(--bg-forest-500)]" />
        </div>
        <div className="flex-1 truncate text-center text-xs text-[var(--l2-foreground)]">
          <span className="font-semibold text-[var(--l2-foreground-hover)]">agent</span> —
          signoz-mcp — 132×40
        </div>
        <div className="w-12" />
      </div>

      <div
        className={`${styles.tabStrip} flex shrink-0 overflow-x-auto bg-[var(--l1-background)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
      >
        {TERMINAL_SESSIONS.map((tab, index) => {
          const isSelected = index === sessionIndex

          return (
            <button
              key={tab.id}
              type="button"
              tabIndex={-1}
              onClick={() => handleTabClick(index)}
              className={cn(
                '-ml-px inline-flex shrink-0 items-center justify-center gap-2 border px-3.5 font-mono text-[11px] tracking-[0.01em] transition-colors first-of-type:ml-0 sm:min-w-[124px] sm:px-4 sm:text-[12px]',
                isSelected
                  ? 'border-[var(--l2-border)] border-b-transparent border-t-transparent bg-[var(--l1-background)] py-3 text-[var(--l1-foreground-hover)]'
                  : 'border-[var(--l2-border)] border-t-transparent bg-[var(--l2-background)] py-3 text-[var(--l2-foreground)] hover:text-[var(--l1-foreground-hover)]'
              )}
            >
              <span
                className={cn(
                  'size-[5px] rounded-full bg-[var(--agent-t-accent)]',
                  isSelected ? 'visible' : 'invisible'
                )}
              />
              <span>{tab.label}</span>
            </button>
          )
        })}
        <div className="min-w-3 flex-1 border-b border-[var(--l2-border)]" />
      </div>

      <div
        ref={screenRef}
        onClick={() => flushToken(tokenRef.current)}
        onScroll={() => {
          const screen = screenRef.current
          if (!screen) return
          stuckToBottomRef.current =
            screen.scrollHeight - screen.scrollTop - screen.clientHeight < 60
        }}
        className="min-h-0 flex-1 cursor-text overflow-y-auto overflow-x-hidden px-4 pb-10 pt-5 font-mono text-[12px] leading-[1.75] text-[var(--l2-foreground)] [scrollbar-width:thin] md:px-7 md:text-[13px]"
      >
        <div key={`${session.id}-${replayNonce}`}>
          {session.steps.map((step, index) => {
            if (index > stepCount) return null

            return (
              <SessionStep
                key={`${session.id}-${index}`}
                step={step}
                isCurrent={index === stepCount}
                partial={partial}
                toolDone={toolDone}
                spinnerFrame={spinnerFrame}
              />
            )
          })}
          {sessionDone ? (
            <div className="mt-6 flex items-center gap-3">
              <PromptMarker />
              <Caret />
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex h-8 shrink-0 items-center justify-between gap-4 border-t border-[var(--l2-border)] bg-[var(--l2-background)] px-4 font-mono text-[10px] text-[var(--l2-foreground)]">
        <div className="flex items-center gap-2">
          <span className="size-[7px] rounded-full bg-[var(--agent-t-ok)] shadow-[0_0_0_3px_color-mix(in_srgb,var(--agent-t-ok)_18%,transparent)]" />
          <span>SigNoz Cloud · us-east · MCP connected</span>
        </div>
        <span className="hidden sm:block">click to skip ahead</span>
      </div>
    </div>
  )
}
