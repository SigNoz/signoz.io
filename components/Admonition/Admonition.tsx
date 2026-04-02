import React, { useId } from 'react'
import { cn } from 'app/lib/utils'
import InfoCircleIcon from './info-circle.svg'
import ChevronDownIcon from './chevron-down.svg'

type AdmonitionKind = 'note' | 'tip' | 'warning' | 'danger' | 'info' | 'important' | 'default'

const THEMES: Record<
  AdmonitionKind,
  { border: string; bg: string; title: string; body: string; icon: string }
> = {
  note: {
    border: 'border-signoz_robin-500/20',
    bg: 'bg-signoz_robin-500/10',
    title: 'text-signoz_robin-100',
    body: 'text-signoz_robin-300',
    icon: 'text-signoz_robin-100',
  },
  tip: {
    border: 'border-signoz_forest-500/20',
    bg: 'bg-signoz_forest-500/10',
    title: 'text-signoz_forest-100',
    body: 'text-signoz_forest-300',
    icon: 'text-signoz_forest-100',
  },
  warning: {
    border: 'border-signoz_amber-500/20',
    bg: 'bg-signoz_amber-500/10',
    title: 'text-signoz_amber-100',
    body: 'text-signoz_amber-300',
    icon: 'text-signoz_amber-100',
  },
  danger: {
    border: 'border-signoz_cherry-500/20',
    bg: 'bg-signoz_cherry-500/10',
    title: 'text-signoz_cherry-100',
    body: 'text-signoz_cherry-300',
    icon: 'text-signoz_cherry-100',
  },
  info: {
    border: 'border-signoz_robin-500/20',
    bg: 'bg-signoz_robin-500/10',
    title: 'text-signoz_robin-100',
    body: 'text-signoz_robin-300',
    icon: 'text-signoz_robin-100',
  },
  important: {
    border: 'border-violet-500/20',
    bg: 'bg-violet-500/10',
    title: 'text-violet-200',
    body: 'text-violet-300',
    icon: 'text-violet-200',
  },
  default: {
    border: 'border-zinc-500/20',
    bg: 'bg-zinc-500/10',
    title: 'text-zinc-200',
    body: 'text-zinc-300',
    icon: 'text-zinc-200',
  },
}

const TITLES: Record<string, string> = {
  note: 'Note',
  tip: 'Tip',
  warning: 'Warning',
  danger: 'Danger',
  info: 'Info',
  important: 'Important',
}

function normalizeKind(type?: string): AdmonitionKind {
  if (type && type in THEMES) return type as AdmonitionKind
  return 'default'
}

export type AdmonitionProps = {
  type?: string
  title?: string
  variant?: 'sm' | 'lg'
  defaultCollapsed?: boolean | 'true' | 'false'
  children?: React.ReactNode
}

const Admonition = ({
  type,
  title,
  variant = 'lg',
  defaultCollapsed,
  children,
}: AdmonitionProps) => {
  const kind = normalizeKind(type)
  const theme = THEMES[kind]
  const displayTitle = title ?? TITLES[type ?? ''] ?? 'Note'
  const isCollapsible = defaultCollapsed !== undefined
  const isOpen = !(defaultCollapsed === true || defaultCollapsed === 'true')
  const sm = variant === 'sm'
  const toggleId = useId()

  const rootCls = cn(
    'admonition not-prose my-4 rounded-[4px] border border-solid shadow-none',
    sm ? 'p-3' : 'p-4',
    theme.border,
    theme.bg,
    '[&_a]:underline [&_a]:underline-offset-2',
    '[&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em]',
    '[&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed',
    '[&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit'
  )

  const bodyCls = cn(
    'admonition-content max-w-none leading-relaxed',
    sm ? 'pl-[34px] text-sm' : 'pl-[38px] text-base',
    theme.body,
    '[&_p]:mb-3 [&_p:last-child]:mb-0'
  )

  const iconEl = (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center font-medium leading-none',
        sm ? 'h-6 w-6 text-xs' : 'h-7 w-7 text-sm'
      )}
      aria-hidden
    >
      <InfoCircleIcon className={cn(sm ? 'h-3 w-3' : 'h-4 w-4', theme.icon)} />
    </span>
  )

  const titleEl = (
    <span
      className={cn(
        'min-w-0 font-semibold leading-snug tracking-tight',
        sm ? 'text-sm' : 'text-base',
        theme.title
      )}
    >
      {displayTitle}
    </span>
  )

  if (!isCollapsible) {
    return (
      <div className={rootCls}>
        <div className={cn('flex items-center gap-2.5', sm ? 'mb-2' : 'mb-3')}>
          {iconEl}
          {titleEl}
        </div>
        <div className={bodyCls}>{children}</div>
      </div>
    )
  }

  return (
    <div className={cn(rootCls, '[&:has(input:checked)_.adm-chevron]:rotate-180')}>
      <input
        type="checkbox"
        id={toggleId}
        className="peer sr-only"
        defaultChecked={isOpen}
        aria-hidden
      />
      <label htmlFor={toggleId} className="flex cursor-pointer items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          {iconEl}
          {titleEl}
        </div>
        <ChevronDownIcon
          className={cn(
            'adm-chevron shrink-0 opacity-50 transition-transform duration-200',
            sm ? 'h-4 w-4' : 'h-[18px] w-[18px]'
          )}
        />
      </label>
      <div
        className={cn(
          'h-0 overflow-hidden peer-checked:h-auto peer-checked:overflow-visible',
          sm ? 'peer-checked:mt-2' : 'peer-checked:mt-3',
          bodyCls
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default Admonition
