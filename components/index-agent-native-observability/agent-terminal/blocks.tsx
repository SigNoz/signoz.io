import { Check } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from 'app/lib/utils'

import type { TerminalLogTone, TerminalStep } from '../agentNativeTerminalScript'
import styles from './agent-terminal.module.css'
import { renderInline, rowTone, ROW_TONE_BORDER, SPINNER_FRAMES, TONE_CLASS } from './helpers'

export function Caret() {
  return (
    <span
      className={`${styles.caret} ml-px inline-block h-[14px] w-2 translate-y-[2px] bg-[var(--agent-t-accent)]`}
    />
  )
}

export function PromptMarker() {
  return <span className="shrink-0 font-bold text-[var(--agent-t-accent)]">&gt;</span>
}

export function InputLine({ text, isTyping }: { text: string; isTyping: boolean }) {
  return (
    <div
      className={`${styles.line} mb-5 mt-7 flex items-start gap-3 text-[12.5px] leading-[1.7] text-[var(--l1-foreground-hover)] first:mt-0 md:text-[13.5px]`}
    >
      <PromptMarker />
      <span className="min-w-0 whitespace-pre-wrap">
        {text}
        {isTyping ? <Caret /> : null}
      </span>
    </div>
  )
}

export function StepLine({ text }: { text: string }) {
  return (
    <div className={`${styles.line} mb-3 flex items-start gap-3`}>
      <span className="flex h-[22px] w-[15px] shrink-0 items-center justify-center text-[8px] text-[var(--l3-foreground)]">
        ●
      </span>
      <span className="min-w-0">{renderInline(text)}</span>
    </div>
  )
}

export function ToolLine({
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
    <div className={`${styles.line} mb-3 flex items-start gap-3`}>
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

export function TableBlock({
  step,
  visibleRows,
}: {
  step: Extract<TerminalStep, { type: 'table' }>
  visibleRows: number
}) {
  return (
    <div
      className={`${styles.line} my-3 w-fit max-w-full overflow-hidden rounded-[3px] border border-[var(--l3-border)] bg-[var(--l2-background)]`}
    >
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
                className={`${styles.line} [&:hover>td]:bg-[var(--l3-background-60)] [&:last-child>td]:border-b-0 [&:nth-child(even)>td]:bg-[color-mix(in_srgb,var(--l3-background)_30%,transparent)]`}
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

export function TreeBlock({
  step,
  visibleLines,
}: {
  step: Extract<TerminalStep, { type: 'tree' }>
  visibleLines: number
}) {
  return (
    <pre className="my-3 overflow-x-auto whitespace-pre bg-transparent p-0 font-mono text-[11px] leading-[1.8] text-[var(--l2-foreground)] md:text-[12px]">
      {step.lines.slice(0, visibleLines).map((line) => (
        <div key={line} className={styles.line}>
          {renderInline(line)}
        </div>
      ))}
    </pre>
  )
}

export function LogsBlock({
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
          className={`${styles.line} flex gap-3 whitespace-pre text-[11px] md:text-[12px]`}
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

export function SessionStep({
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
        <div
          className={`${styles.line} mb-1 mt-5 font-semibold tracking-[0.01em] text-[var(--l1-foreground-hover)]`}
        >
          {renderInline(step.text)}
        </div>
      )
    case 'text':
      return (
        <div className={`${styles.line} mb-1 whitespace-pre-wrap`}>{renderInline(step.text)}</div>
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
