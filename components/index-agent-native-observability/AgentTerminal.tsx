'use client'

import { Check } from 'lucide-react'
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'

import { useLogEvent } from '@/hooks/useLogEvent'
import { cn } from 'app/lib/utils'
import {
  TERMINAL_SESSIONS,
  type TerminalLogTone,
  type TerminalStep,
  type TerminalTone,
} from './agentNativeTerminalScript'

const TONE_CLASS: Record<TerminalTone, string> = {
  ok: 'text-[var(--agent-t-ok)]',
  bad: 'text-[var(--agent-t-bad)]',
  warn: 'text-[var(--agent-t-warn)]',
  info: 'text-[var(--agent-t-info)]',
  dim: 'text-[var(--l3-foreground)]',
  accent: 'text-[var(--agent-t-accent)]',
  strong: 'font-semibold text-[var(--l1-foreground-hover)]',
}

const ROW_TONE_BORDER: Record<string, string> = {
  bad: 'border-l-[var(--agent-t-bad)]',
  warn: 'border-l-[var(--agent-t-warn)]',
  ok: 'border-l-[color-mix(in_srgb,var(--agent-t-ok)_55%,transparent)]',
  none: 'border-l-transparent',
}

const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

const INLINE_TONE_PATTERN = /\[\[(ok|bad|warn|info|dim|accent|strong):([^\]]*)\]\]/g

function renderInline(text: string): ReactNode[] {
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

function rowTone(row: string[]) {
  const joined = row.join(' ')
  if (joined.includes('[[bad:')) return 'bad'
  if (joined.includes('[[warn:')) return 'warn'
  if (joined.includes('[[ok:')) return 'ok'
  return 'none'
}

type RunToken = {
  cancelled: boolean
  skip: boolean
  pending: Set<() => void>
}

function sleep(ms: number, token: RunToken) {
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

function waitWhileHidden(token: RunToken) {
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

function subscribeReducedMotion(onChange: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)
  mediaQuery.addEventListener('change', onChange)
  return () => mediaQuery.removeEventListener('change', onChange)
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

function getReducedMotionServerSnapshot() {
  return false
}

function flushToken(token: RunToken | null) {
  if (!token) return
  token.skip = true
  Array.from(token.pending).forEach((finish) => finish())
}

function Caret() {
  return (
    <span className="agent-terminal-caret ml-px inline-block h-[14px] w-2 translate-y-[2px] bg-[var(--agent-t-accent)]" />
  )
}

function PromptMarker() {
  return <span className="shrink-0 font-bold text-[var(--agent-t-accent)]">&gt;</span>
}

function InputLine({ text, isTyping }: { text: string; isTyping: boolean }) {
  return (
    <div className="agent-terminal-line mb-5 mt-7 flex items-start gap-3 text-[12.5px] leading-[1.7] text-[var(--l1-foreground-hover)] first:mt-0 md:text-[13.5px]">
      <PromptMarker />
      <span className="min-w-0 whitespace-pre-wrap">
        {text}
        {isTyping ? <Caret /> : null}
      </span>
    </div>
  )
}

function StepLine({ text }: { text: string }) {
  return (
    <div className="agent-terminal-line mb-3 flex items-start gap-3">
      <span className="flex h-[22px] w-[15px] shrink-0 items-center justify-center text-[8px] text-[var(--l3-foreground)]">
        ●
      </span>
      <span className="min-w-0">{renderInline(text)}</span>
    </div>
  )
}

function ToolLine({
  pending,
  text,
  done,
  spinnerFrame,
}: {
  pending: string
  text: string
  done: boolean
  spinnerFrame: number
}) {
  return (
    <div className="agent-terminal-line mb-3 flex items-start gap-3">
      <span
        className={cn(
          'flex h-[22px] w-[15px] shrink-0 items-center justify-center',
          done ? 'text-[var(--agent-t-ok)]' : 'text-[13px] text-[var(--agent-t-accent)]'
        )}
      >
        {done ? <Check size={14} strokeWidth={2.4} /> : SPINNER_FRAMES[spinnerFrame]}
      </span>
      {done ? (
        <span className="min-w-0">{renderInline(text)}</span>
      ) : (
        <span className="min-w-0 text-[var(--l3-foreground)]">{pending}</span>
      )}
    </div>
  )
}

function TableBlock({
  step,
  visibleRows,
}: {
  step: Extract<TerminalStep, { type: 'table' }>
  visibleRows: number
}) {
  return (
    <div className="agent-terminal-line my-3 max-w-full overflow-hidden rounded-[3px] border border-[var(--l3-border)] bg-[var(--l2-background)]">
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 text-[11.5px] leading-[1.6] [font-variant-numeric:tabular-nums] md:text-[12.5px]">
          <thead>
            <tr>
              {step.head.map((heading, columnIndex) => (
                <th
                  key={heading}
                  className={cn(
                    'whitespace-nowrap border-b border-[var(--l3-border)] bg-[var(--l3-background)] px-4 py-2 font-sans text-[9.5px] font-semibold uppercase tracking-[0.09em] text-[var(--l3-foreground)]',
                    step.align[columnIndex] === 'r' ? 'text-right' : 'text-left'
                  )}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {step.rows.slice(0, visibleRows).map((row, rowIndex) => (
              <tr
                key={row[0]}
                className="agent-terminal-line [&:hover>td]:bg-[var(--l3-background-60)] [&:last-child>td]:border-b-0 [&:nth-child(even)>td]:bg-[color-mix(in_srgb,var(--l3-background)_30%,transparent)]"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${rowIndex}-${cellIndex}`}
                    className={cn(
                      'whitespace-nowrap border-b border-[color-mix(in_srgb,var(--l3-border)_55%,transparent)] px-4 py-1.5 align-baseline transition-colors',
                      step.align[cellIndex] === 'r' ? 'text-right' : 'text-left',
                      cellIndex === 0 &&
                        cn(
                          'border-l-2 pl-3.5 text-[var(--l1-foreground-hover)]',
                          ROW_TONE_BORDER[rowTone(row)]
                        )
                    )}
                  >
                    {renderInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function TreeBlock({
  step,
  visibleLines,
}: {
  step: Extract<TerminalStep, { type: 'tree' }>
  visibleLines: number
}) {
  return (
    <pre className="my-3 overflow-x-auto whitespace-pre bg-transparent p-0 font-mono text-[11px] leading-[1.8] text-[var(--l2-foreground)] md:text-[12px]">
      {step.lines.slice(0, visibleLines).map((line) => (
        <div key={line} className="agent-terminal-line">
          {renderInline(line)}
        </div>
      ))}
    </pre>
  )
}

function LogsBlock({
  step,
  visibleLines,
}: {
  step: Extract<TerminalStep, { type: 'logs' }>
  visibleLines: number
}) {
  const levelClass: Record<TerminalLogTone, string> = {
    ok: TONE_CLASS.ok,
    bad: TONE_CLASS.bad,
    warn: TONE_CLASS.warn,
    info: TONE_CLASS.info,
  }

  return (
    <div className="my-1">
      {step.lines.slice(0, visibleLines).map((line) => (
        <div
          key={`${line.ts}-${line.message}`}
          className="agent-terminal-line flex gap-3 whitespace-pre text-[11px] md:text-[12px]"
        >
          <span className="shrink-0 text-[var(--l3-foreground)]">{line.ts}</span>
          <span className={cn('w-[52px] shrink-0 font-semibold', levelClass[line.tone])}>
            {line.level}
          </span>
          <span className="whitespace-pre-wrap">{line.message}</span>
        </div>
      ))}
    </div>
  )
}

function SessionStep({
  step,
  isCurrent,
  partial,
  toolDone,
  spinnerFrame,
}: {
  step: TerminalStep
  isCurrent: boolean
  partial: number
  toolDone: boolean
  spinnerFrame: number
}) {
  switch (step.type) {
    case 'input':
      return (
        <InputLine
          text={isCurrent ? step.text.slice(0, partial) : step.text}
          isTyping={isCurrent}
        />
      )
    case 'step':
      return <StepLine text={step.text} />
    case 'tool':
      return (
        <ToolLine
          pending={step.pending}
          text={step.text}
          done={!isCurrent || toolDone}
          spinnerFrame={spinnerFrame}
        />
      )
    case 'title':
      return (
        <div className="agent-terminal-line mb-1 mt-5 font-semibold tracking-[0.01em] text-[var(--l1-foreground-hover)]">
          {renderInline(step.text)}
        </div>
      )
    case 'text':
      return (
        <div className="agent-terminal-line mb-1 whitespace-pre-wrap">
          {renderInline(step.text)}
        </div>
      )
    case 'table':
      return <TableBlock step={step} visibleRows={isCurrent ? partial : step.rows.length} />
    case 'tree':
      return <TreeBlock step={step} visibleLines={isCurrent ? partial : step.lines.length} />
    case 'logs':
      return <LogsBlock step={step} visibleLines={isCurrent ? partial : step.lines.length} />
    case 'spacer':
      return <div className="h-2.5" />
    default:
      return null
  }
}

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
        'agent-terminal flex flex-col overflow-hidden rounded-xl border border-[var(--l2-border)] bg-[var(--l1-background)] shadow-[0_50px_100px_-28px_rgba(0,0,0,0.8)]',
        className
      )}
    >
      <style>{`
        .agent-terminal {
          --agent-t-ok: var(--bg-forest-700);
          --agent-t-bad: var(--bg-cherry-600);
          --agent-t-warn: var(--bg-amber-700);
          --agent-t-info: var(--bg-robin-600);
          --agent-t-accent: var(--bg-robin-500);
        }
        [data-theme='default'].dark .agent-terminal {
          --agent-t-ok: var(--bg-forest-500);
          --agent-t-bad: var(--bg-cherry-400);
          --agent-t-warn: var(--bg-amber-500);
          --agent-t-info: var(--bg-robin-300);
        }
        @keyframes agent-terminal-line-in {
          from { opacity: 0; transform: translateY(3px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes agent-terminal-caret-blink {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
        .agent-terminal-line { animation: agent-terminal-line-in 0.3s ease both; }
        .agent-terminal-caret { animation: agent-terminal-caret-blink 1.05s steps(1, end) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .agent-terminal-line { animation: none; }
          .agent-terminal-caret { animation: none; }
        }
      `}</style>

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
        className="flex shrink-0 overflow-x-auto bg-[var(--l1-background)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, color-mix(in srgb, var(--l2-foreground) 12%, transparent) 0 1px, transparent 1px 7px)',
        }}
      >
        <div className="w-3 shrink-0 border-b border-[var(--l2-border)]" />
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
                  : 'mt-1 border-[var(--l2-border)] bg-[var(--l2-background)] py-2.5 text-[var(--l2-foreground)] hover:text-[var(--l1-foreground-hover)]'
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
