import { ArrowUp, AtSign, Blocks, Bot, ChevronDown, Maximize2, Minus, X } from 'lucide-react'

import { cn } from 'app/lib/utils'

const SUGGESTED_QUESTIONS = [
  'Why is my cache failing?',
  'Where can I monitor my k8s pods?',
  'How can I optimize my signoz bill?',
]

export default function NozChatPanel({ className = '' }: { className?: string }) {
  return (
    <div
      className={cn('rounded-[18px] p-px shadow-[0_34px_120px_rgba(0,0,0,0.58)]', className)}
      style={{
        background:
          'linear-gradient(135deg, color-mix(in srgb, var(--base-white) 16%, transparent), color-mix(in srgb, var(--base-white) 4%, transparent) 42%, color-mix(in srgb, var(--base-white) 9%, transparent))',
      }}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-[17px] bg-[var(--l2-background)]">
        <div className="flex shrink-0 items-center justify-between px-4 pt-3">
          <span className="text-sm font-medium text-[var(--l1-foreground)]">New chat</span>
          <div className="flex items-center gap-0.5 text-[var(--l3-foreground)]">
            {[Minus, Maximize2, X].map((Icon, index) => (
              <span
                key={index}
                className="flex size-6 items-center justify-center rounded-md transition-colors hover:bg-[var(--l3-background)] hover:text-[var(--l2-foreground-hover)]"
              >
                <Icon size={13} strokeWidth={2} />
              </span>
            ))}
          </div>
        </div>

        <div className="min-h-10 flex-1" />

        <div className="px-4">
          <p className="m-0 text-lg font-semibold leading-6 text-[var(--l1-foreground)]">Noz</p>
          <p className="m-0 mt-2 max-w-[36ch] text-sm leading-6 text-[var(--l2-foreground)]">
            I can help you understand and be the all-seeing eye over your entire infrastructure.
            What do you need?
          </p>

          <div className="mt-4 flex flex-col items-start gap-2">
            {SUGGESTED_QUESTIONS.map((question) => (
              <span
                key={question}
                className="cursor-default rounded-md bg-[var(--l3-background)] px-3 py-1.5 text-[13px] leading-5 text-[var(--l2-foreground)] transition-colors hover:bg-[var(--l3-background-hover)] hover:text-[var(--l1-foreground)]"
              >
                {question}
              </span>
            ))}
          </div>

          <div className="mt-3 flex justify-end pr-1 text-[var(--bg-robin-500)]">
            <Bot size={26} strokeWidth={1.6} />
          </div>
        </div>

        <div className="m-4 mt-2 shrink-0 rounded-lg border border-[var(--l2-border)] bg-[var(--l1-background)] px-3 pb-2.5 pt-3">
          <span className="text-sm text-[var(--l3-foreground)]">Ask Noz…</span>
          <div className="mt-7 flex items-center justify-between">
            <span className="-ml-1.5 flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[13px] text-[var(--l2-foreground)] transition-colors hover:bg-[var(--l3-background)] hover:text-[var(--l1-foreground)]">
              <Blocks size={14} strokeWidth={1.8} />
              Skills
              <ChevronDown size={13} strokeWidth={1.8} />
            </span>
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-md text-[var(--l3-foreground)] transition-colors hover:bg-[var(--l3-background)] hover:text-[var(--l2-foreground-hover)]">
                <AtSign size={15} strokeWidth={1.8} />
              </span>
              <span className="flex size-8 items-center justify-center rounded-full bg-[var(--primary-background)] text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-background-hover)]">
                <ArrowUp size={15} strokeWidth={2.2} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
