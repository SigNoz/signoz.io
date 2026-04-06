import React from 'react'
import { cn } from 'app/lib/utils'

type AdmonitionKind = 'note' | 'tip' | 'warning' | 'danger' | 'info' | 'important' | 'default'

type AdmonitionTheme = {
  root: string
  title: string
  bodyMuted: string
  iconColor: string
}

const ADMONITION_THEMES: Record<AdmonitionKind, AdmonitionTheme> = {
  note: {
    root: 'border-signoz_robin-500/20 bg-signoz_robin-500/10 [&_a]:text-signoz_robin-500 [&_a]:underline [&_a]:decoration-signoz_robin-500 [&_a]:underline-offset-2 [&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:!bg-signoz_robin-300/10 [&_code]:!text-[#B8C7FC] [&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border [&_pre]:!border-signoz_robin-500/25 [&_pre]:!bg-signoz_robin-300/10 [&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed [&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
    title: 'text-signoz_robin-100',
    bodyMuted: 'text-signoz_robin-300 [&_p]:mb-3 [&_p:last-child]:mb-0',
    iconColor: 'text-signoz_robin-100',
  },
  tip: {
    root: 'border-signoz_forest-500/20 bg-signoz_forest-500/10 [&_a]:text-signoz_forest-600 [&_a]:underline [&_a]:decoration-signoz_forest-600 [&_a]:underline-offset-2 [&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:!bg-signoz_forest-300/10 [&_code]:!text-signoz_forest-200 [&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border [&_pre]:!border-signoz_forest-500/25 [&_pre]:!bg-signoz_forest-300/10 [&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed [&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
    title: 'text-signoz_forest-100',
    bodyMuted: 'text-signoz_forest-300 [&_p]:mb-3 [&_p:last-child]:mb-0',
    iconColor: 'text-signoz_forest-100',
  },
  warning: {
    root: 'border-signoz_amber-500/20 bg-signoz_amber-500/10 [&_a]:text-signoz_amber-600 [&_a]:underline [&_a]:decoration-signoz_amber-600 [&_a]:underline-offset-2 [&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:!bg-signoz_amber-300/10 [&_code]:!text-signoz_amber-200 [&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border [&_pre]:!border-signoz_amber-500/25 [&_pre]:!bg-signoz_amber-300/10 [&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed [&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
    title: 'text-signoz_amber-100',
    bodyMuted: 'text-signoz_amber-300 [&_p]:mb-3 [&_p:last-child]:mb-0',
    iconColor: 'text-signoz_amber-100',
  },
  danger: {
    root: 'border-signoz_cherry-500/20 bg-signoz_cherry-500/10 [&_a]:text-signoz_cherry-600 [&_a]:underline [&_a]:decoration-signoz_cherry-600 [&_a]:underline-offset-2 [&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:!bg-signoz_cherry-300/10 [&_code]:!text-signoz_cherry-200 [&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border [&_pre]:!border-signoz_cherry-500/25 [&_pre]:!bg-signoz_cherry-300/10 [&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed [&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
    title: 'text-signoz_cherry-100',
    bodyMuted: 'text-signoz_cherry-300 [&_p]:mb-3 [&_p:last-child]:mb-0',
    iconColor: 'text-signoz_cherry-100',
  },
  info: {
    root: 'border-signoz_robin-500/20 bg-signoz_robin-500/10 [&_a]:text-signoz_robin-500 [&_a]:underline [&_a]:decoration-signoz_robin-500 [&_a]:underline-offset-2 [&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:!bg-signoz_robin-300/10 [&_code]:!text-[#B8C7FC] [&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border [&_pre]:!border-signoz_robin-500/25 [&_pre]:!bg-signoz_robin-300/10 [&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed [&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
    title: 'text-signoz_robin-100',
    bodyMuted: 'text-signoz_robin-300 [&_p]:mb-3 [&_p:last-child]:mb-0',
    iconColor: 'text-signoz_robin-100',
  },
  important: {
    root: 'border-violet-500/20 bg-violet-500/10 [&_a]:text-violet-600 [&_a]:underline [&_a]:decoration-violet-600 [&_a]:underline-offset-2 [&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:!bg-violet-500/20 [&_code]:!text-violet-200 [&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border [&_pre]:!border-violet-500/25 [&_pre]:!bg-violet-500/[0.08] [&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed [&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
    title: 'text-violet-200',
    bodyMuted: 'text-violet-300 [&_p]:mb-3 [&_p:last-child]:mb-0',
    iconColor: 'text-violet-200',
  },
  default: {
    root: 'border-zinc-500/20 bg-zinc-500/10 [&_a]:text-zinc-300 [&_a]:underline [&_a]:decoration-zinc-400/80 [&_a]:underline-offset-2 [&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:!bg-zinc-500/20 [&_code]:!text-zinc-200 [&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border [&_pre]:!border-zinc-500/25 [&_pre]:!bg-zinc-500/[0.08] [&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed [&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
    title: 'text-zinc-200',
    bodyMuted: 'text-zinc-300 [&_p]:mb-3 [&_p:last-child]:mb-0',
    iconColor: 'text-zinc-200',
  },
}

const normalizeKind = (type?: string): AdmonitionKind => {
  switch (type) {
    case 'note':
    case 'tip':
    case 'warning':
    case 'danger':
    case 'info':
    case 'important':
      return type
    default:
      return 'default'
  }
}

const getTitle = (type?: string) => {
  switch (type) {
    case 'tip':
      return 'Tip'
    case 'warning':
      return 'Warning'
    case 'danger':
      return 'Danger'
    case 'info':
      return 'Info'
    case 'important':
      return 'Important'
    default:
      return 'Note'
  }
}

const InfoIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
  </svg>
)

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export type AdmonitionProps = {
  type?: string
  title?: string
  variant?: 'sm' | 'lg'
  defaultCollapsed?: boolean | 'true' | 'false'
  children?: React.ReactNode
}

const Admonition = ({ type, title, variant, defaultCollapsed, children }: AdmonitionProps) => {
  const size = variant ?? 'lg'
  const kind = normalizeKind(type)
  const theme = ADMONITION_THEMES[kind]
  const displayTitle = title ?? getTitle(type)
  const isDefaultCollapsed = defaultCollapsed === true || defaultCollapsed === 'true'

  return (
    <details
      className={cn(
        'group/admonition admonition not-prose my-4 rounded-[4px] border border-solid shadow-none',
        size === 'sm' ? 'p-3' : 'p-4',
        theme.root
      )}
      open={!isDefaultCollapsed || undefined}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <span
            className={cn(
              'flex shrink-0 items-center justify-center font-medium leading-none',
              size === 'sm' ? 'h-6 w-6 text-xs' : 'h-7 w-7 text-sm'
            )}
            aria-hidden
          >
            <InfoIcon className={cn(size === 'lg' ? 'h-4 w-4' : 'h-3 w-3', theme.iconColor)} />
          </span>
          <span
            className={cn(
              'min-w-0 font-semibold leading-snug tracking-tight',
              size === 'sm' ? 'text-sm' : 'text-base',
              theme.title
            )}
          >
            {displayTitle}
          </span>
        </div>
        <ChevronDownIcon
          className={cn(
            'shrink-0 opacity-50 transition-transform duration-200',
            size === 'sm' ? 'h-4 w-4' : 'h-[18px] w-[18px]',
            'rotate-0 group-open/admonition:rotate-180'
          )}
        />
      </summary>
      <div
        className={cn(
          'admonition-content mt-3 max-w-none leading-relaxed',
          size === 'sm' ? 'pl-[34px] text-sm' : 'pl-[38px] text-base',
          theme.bodyMuted
        )}
      >
        {children}
      </div>
    </details>
  )
}

export default Admonition
