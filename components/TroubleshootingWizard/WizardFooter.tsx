'use client'

import { ArrowLeft, Undo2 } from 'lucide-react'

const FOOTER_BUTTON_CLASS =
  'flex items-center gap-1.5 rounded-[2px] px-2 py-1.5 text-[13px] leading-5 text-[var(--l2-foreground)] transition-colors duration-150 hover:text-[var(--l2-foreground-hover)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--l1-foreground-hover)] motion-reduce:transition-none'

type WizardFooterProps = {
  step: number
  onBack: () => void
  backDisabled?: boolean
  onStartOver: () => void
}

export default function WizardFooter({
  step,
  onBack,
  backDisabled,
  onStartOver,
}: WizardFooterProps) {
  return (
    <div className="flex items-center justify-between border-t border-[var(--l1-border)] p-1">
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onBack}
          disabled={backDisabled}
          className={`${FOOTER_BUTTON_CLASS} disabled:pointer-events-none disabled:opacity-40`}
        >
          <ArrowLeft aria-hidden className="h-3.5 w-3.5 shrink-0" />
          Back
        </button>
        <span aria-hidden className="h-3.5 w-px bg-[var(--l1-border)]" />
        <span className="px-2 text-[13px] leading-5 text-[var(--l2-foreground)]">
          Step <span className="font-mono text-[11px] text-[var(--l1-foreground)]">{step}</span>
        </span>
      </div>
      <button type="button" onClick={onStartOver} className={FOOTER_BUTTON_CLASS}>
        <Undo2 aria-hidden className="h-3.5 w-3.5 shrink-0" />
        Start over
      </button>
    </div>
  )
}
