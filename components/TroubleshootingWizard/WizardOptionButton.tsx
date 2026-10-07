'use client'

import { ArrowRight } from 'lucide-react'

type WizardOptionButtonProps = {
  onClick: () => void
  children: React.ReactNode
}

export default function WizardOptionButton({ onClick, children }: WizardOptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full rounded-[4px] border border-[var(--l1-border)] bg-[var(--l2-background)] py-1 text-left transition-colors duration-150 ease-out hover:bg-[var(--l1-background-hover)] focus-visible:bg-[var(--l1-background-hover)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--l1-foreground-hover)] motion-reduce:transition-none"
    >
      <span className="flex items-center justify-between gap-2 px-2 py-1.5">
        <span className="text-[13px] leading-5 text-[var(--l1-foreground)] transition-colors duration-150 group-hover:text-[var(--l1-foreground-hover)] group-focus-visible:text-[var(--l1-foreground-hover)]">
          {children}
        </span>
        <ArrowRight
          aria-hidden
          className="h-3.5 w-3.5 shrink-0 text-[var(--l2-foreground)] transition-[color,transform] duration-150 ease-out group-hover:translate-x-[3px] group-hover:text-[var(--l1-foreground-hover)] group-focus-visible:translate-x-[3px] group-focus-visible:text-[var(--l1-foreground-hover)] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
        />
      </span>
    </button>
  )
}
