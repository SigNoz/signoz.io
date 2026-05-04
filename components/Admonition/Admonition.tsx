'use client'

import { ChevronDown } from 'lucide-react'
import { BsFillExclamationCircleFill as Info } from 'react-icons/bs'

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'app/lib/utils'
import { useState } from 'react'

type AdmonitionKind = 'note' | 'tip' | 'warning' | 'danger' | 'info' | 'important' | 'default'

type AdmonitionTheme = {
  root: string
  title: string
  bodyMuted: string
  icon: (size: 'sm' | 'lg') => React.ReactNode
}

const ADMONITION_THEMES: Record<AdmonitionKind, AdmonitionTheme> = {
  note: {
    root: [
      'border-signoz_robin-500/20 bg-signoz_robin-500/10',
      '[&_a]:text-signoz_robin-500 [&_a]:underline [&_a]:decoration-signoz_robin-500 [&_a]:underline-offset-2',
      '[&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:!bg-signoz_robin-300/10 [&_code]:!text-[#B8C7FC]',
      '[&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border [&_pre]:!border-signoz_robin-500/25 [&_pre]:!bg-signoz_robin-300/10 [&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed',
      '[&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
    ].join(' '),
    title: 'text-signoz_robin-100',
    bodyMuted: 'text-signoz_robin-300 [&_p]:mb-3 [&_p:last-child]:mb-0',
    icon: (size) => (
      <Info
        className={cn(size === 'lg' ? 'h-4 w-4' : 'h-3 w-3', 'text-signoz_robin-100')}
        aria-hidden
      />
    ),
  },
  tip: {
    root: [
      'border-signoz_forest-500/20 bg-signoz_forest-500/10',
      '[&_a]:text-signoz_forest-600 [&_a]:underline [&_a]:decoration-signoz_forest-600 [&_a]:underline-offset-2',
      '[&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:!bg-signoz_forest-300/10 [&_code]:!text-signoz_forest-200',
      '[&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border [&_pre]:!border-signoz_forest-500/25 [&_pre]:!bg-signoz_forest-300/10 [&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed',
      '[&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
    ].join(' '),
    title: 'text-signoz_forest-100',
    bodyMuted: 'text-signoz_forest-300 [&_p]:mb-3 [&_p:last-child]:mb-0',
    icon: (size) => (
      <Info
        className={cn(size === 'lg' ? 'h-4 w-4' : 'h-3 w-3', 'text-signoz_forest-100')}
        aria-hidden
      />
    ),
  },
  warning: {
    root: [
      'border-signoz_amber-500/20 bg-signoz_amber-500/10',
      '[&_a]:text-signoz_amber-600 [&_a]:underline [&_a]:decoration-signoz_amber-600 [&_a]:underline-offset-2',
      '[&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:!bg-signoz_amber-300/10 [&_code]:!text-signoz_amber-200',
      '[&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border [&_pre]:!border-signoz_amber-500/25 [&_pre]:!bg-signoz_amber-300/10 [&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed',
      '[&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
    ].join(' '),
    title: 'text-signoz_amber-100',
    bodyMuted: 'text-signoz_amber-300 [&_p]:mb-3 [&_p:last-child]:mb-0',
    icon: (size) => (
      <Info
        className={cn(size === 'lg' ? 'h-4 w-4' : 'h-3 w-3', 'text-signoz_amber-100')}
        aria-hidden
      />
    ),
  },
  danger: {
    root: [
      'border-signoz_cherry-500/20 bg-signoz_cherry-500/10',
      '[&_a]:text-signoz_cherry-600 [&_a]:underline [&_a]:decoration-signoz_cherry-600 [&_a]:underline-offset-2',
      '[&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:!bg-signoz_cherry-300/10 [&_code]:!text-signoz_cherry-200',
      '[&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border [&_pre]:!border-signoz_cherry-500/25 [&_pre]:!bg-signoz_cherry-300/10 [&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed',
      '[&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
    ].join(' '),
    title: 'text-signoz_cherry-100',
    bodyMuted: 'text-signoz_cherry-300 [&_p]:mb-3 [&_p:last-child]:mb-0',
    icon: (size) => (
      <Info
        className={cn(size === 'lg' ? 'h-4 w-4' : 'h-3 w-3', 'text-signoz_cherry-100')}
        aria-hidden
      />
    ),
  },
  info: {
    root: [
      'border-signoz_robin-500/20 bg-signoz_robin-500/10',
      '[&_a]:text-signoz_robin-500 [&_a]:underline [&_a]:decoration-signoz_robin-500 [&_a]:underline-offset-2',
      '[&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:!bg-signoz_robin-300/10 [&_code]:!text-[#B8C7FC]',
      '[&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border [&_pre]:!border-signoz_robin-500/25 [&_pre]:!bg-signoz_robin-300/10 [&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed',
      '[&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
    ].join(' '),
    title: 'text-signoz_robin-100',
    bodyMuted: 'text-signoz_robin-300 [&_p]:mb-3 [&_p:last-child]:mb-0',
    icon: (size) => (
      <Info
        className={cn(size === 'lg' ? 'h-4 w-4' : 'h-3 w-3', 'text-signoz_robin-100')}
        aria-hidden
      />
    ),
  },
  important: {
    root: [
      'border-violet-500/20 bg-violet-500/10',
      '[&_a]:text-violet-600 [&_a]:underline [&_a]:decoration-violet-600 [&_a]:underline-offset-2',
      '[&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:!bg-violet-500/20 [&_code]:!text-violet-200',
      '[&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border [&_pre]:!border-violet-500/25 [&_pre]:!bg-violet-500/[0.08] [&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed',
      '[&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
    ].join(' '),
    title: 'text-violet-200',
    bodyMuted: 'text-violet-300 [&_p]:mb-3 [&_p:last-child]:mb-0',
    icon: (size) => (
      <Info className={cn(size === 'lg' ? 'h-4 w-4' : 'h-3 w-3', 'text-violet-200')} aria-hidden />
    ),
  },
  default: {
    root: [
      'border-zinc-500/20 bg-zinc-500/10',
      '[&_a]:text-zinc-300 [&_a]:underline [&_a]:decoration-zinc-400/80 [&_a]:underline-offset-2',
      '[&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:!bg-zinc-500/20 [&_code]:!text-zinc-200',
      '[&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border [&_pre]:!border-zinc-500/25 [&_pre]:!bg-zinc-500/[0.08] [&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed',
      '[&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
    ].join(' '),
    title: 'text-zinc-200',
    bodyMuted: 'text-zinc-300 [&_p]:mb-3 [&_p:last-child]:mb-0',
    icon: (size) => (
      <Info className={cn(size === 'lg' ? 'h-4 w-4' : 'h-3 w-3', 'text-zinc-200')} aria-hidden />
    ),
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

export const admonitionRootVariants = cva(
  'admonition not-prose my-4 rounded-[4px] border border-solid shadow-none',
  {
    variants: {
      size: {
        sm: 'p-3',
        lg: 'p-4',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  }
)

export const admonitionHeaderVariants = cva('flex items-center justify-between gap-3', {
  variants: {
    size: {
      sm: 'mb-2',
      lg: 'mb-3',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
})

export const admonitionIconCircleVariants = cva(
  'flex shrink-0 items-center justify-center font-medium leading-none',
  {
    variants: {
      size: {
        sm: 'h-6 w-6 text-xs',
        lg: 'h-7 w-7 text-sm',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  }
)

export const admonitionTitleVariants = cva('min-w-0 font-semibold leading-snug tracking-tight', {
  variants: {
    size: {
      sm: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
})

export const admonitionChevronVariants = cva('shrink-0 opacity-50', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      lg: 'h-[18px] w-[18px]',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
})

export const admonitionContentVariants = cva(
  [
    'admonition-content max-w-none leading-relaxed',
    '[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ul:last-child]:mb-0',
    '[&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_ol:last-child]:mb-0',
    '[&_li]:mb-1 [&_li:last-child]:mb-0',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'pl-[34px] text-sm',
        lg: 'pl-[38px] text-base',
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  }
)

export type AdmonitionSizeVariant = NonNullable<VariantProps<typeof admonitionRootVariants>['size']>

export type AdmonitionProps = {
  type?: string
  title?: string
  variant?: AdmonitionSizeVariant
  defaultCollapsed?: boolean | 'true' | 'false'
  children?: React.ReactNode
}

const Admonition = ({ type, title, variant, defaultCollapsed, children }: AdmonitionProps) => {
  const size = variant ?? 'lg'
  const kind = normalizeKind(type)
  const theme = ADMONITION_THEMES[kind]
  const displayTitle = title ?? getTitle(type)

  const isDefaultCollapsed = defaultCollapsed === true || defaultCollapsed === 'true'
  const [isCollapsed, setIsCollapsed] = useState(isDefaultCollapsed)

  const iconAndTitle = (
    <div className="flex min-w-0 flex-1 items-center gap-2.5">
      <span className={cn(admonitionIconCircleVariants({ size }))} aria-hidden>
        {theme.icon(size)}
      </span>
      <span className={cn(admonitionTitleVariants({ size }), theme.title)}>{displayTitle}</span>
    </div>
  )

  return (
    <div className={cn(admonitionRootVariants({ size }), theme.root)}>
      <div className={cn(admonitionHeaderVariants({ size }), isCollapsed && '!mb-0')}>
        <button
          type="button"
          className="flex w-full items-center justify-between gap-3"
          onClick={() => setIsCollapsed((prev) => !prev)}
          aria-expanded={!isCollapsed}
        >
          {iconAndTitle}
          <ChevronDown
            className={cn(
              admonitionChevronVariants({ size }),
              'transition-transform duration-200',
              isCollapsed ? 'rotate-0' : 'rotate-180'
            )}
            aria-hidden
          />
        </button>
      </div>
      <div
        className={cn(
          admonitionContentVariants({ size }),
          theme.bodyMuted,
          isCollapsed && 'hidden'
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default Admonition
