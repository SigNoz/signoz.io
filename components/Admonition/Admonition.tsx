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

/**
 * Use callout-* tokens (not warning/success-foreground).
 * *-foreground tokens are for solid filled buttons (near-black text on bright amber)
 * and break when used as titles on tinted callout surfaces in dark mode.
 */
const ADMONITION_THEMES: Record<AdmonitionKind, AdmonitionTheme> = {
  note: {
    root: [
      'border-callout-primary-border bg-callout-primary-background',
      '[&_a]:text-callout-primary-title [&_a]:underline [&_a]:decoration-callout-primary-title [&_a]:underline-offset-2',
      '[&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:!bg-background/60 [&_code]:!text-callout-primary-title',
      '[&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border [&_pre]:!border-callout-primary-border [&_pre]:!bg-background/40 [&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed',
      '[&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
    ].join(' '),
    title: 'text-callout-primary-title',
    bodyMuted: 'text-foreground [&_p]:mb-3 [&_p:last-child]:mb-0',
    icon: (size) => (
      <Info
        className={cn(size === 'lg' ? 'h-4 w-4' : 'h-3 w-3', 'text-callout-primary-icon')}
        aria-hidden
      />
    ),
  },
  tip: {
    root: [
      'border-callout-success-border bg-callout-success-background',
      '[&_a]:text-callout-success-title [&_a]:underline [&_a]:decoration-callout-success-title [&_a]:underline-offset-2',
      '[&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:!bg-background/60 [&_code]:!text-callout-success-title',
      '[&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border [&_pre]:!border-callout-success-border [&_pre]:!bg-background/40 [&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed',
      '[&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
    ].join(' '),
    title: 'text-callout-success-title',
    bodyMuted: 'text-foreground [&_p]:mb-3 [&_p:last-child]:mb-0',
    icon: (size) => (
      <Info
        className={cn(size === 'lg' ? 'h-4 w-4' : 'h-3 w-3', 'text-callout-success-icon')}
        aria-hidden
      />
    ),
  },
  warning: {
    root: [
      'border-callout-warning-border bg-callout-warning-background',
      '[&_a]:text-callout-warning-title [&_a]:underline [&_a]:decoration-callout-warning-title [&_a]:underline-offset-2',
      '[&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:!bg-background/60 [&_code]:!text-callout-warning-title',
      '[&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border [&_pre]:!border-callout-warning-border [&_pre]:!bg-background/40 [&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed',
      '[&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
    ].join(' '),
    title: 'text-callout-warning-title',
    bodyMuted: 'text-foreground [&_p]:mb-3 [&_p:last-child]:mb-0',
    icon: (size) => (
      <Info
        className={cn(size === 'lg' ? 'h-4 w-4' : 'h-3 w-3', 'text-callout-warning-icon')}
        aria-hidden
      />
    ),
  },
  danger: {
    root: [
      'border-callout-error-border bg-callout-error-background',
      '[&_a]:text-callout-error-title [&_a]:underline [&_a]:decoration-callout-error-title [&_a]:underline-offset-2',
      '[&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:!bg-background/60 [&_code]:!text-callout-error-title',
      '[&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border [&_pre]:!border-callout-error-border [&_pre]:!bg-background/40 [&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed',
      '[&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
    ].join(' '),
    title: 'text-callout-error-title',
    bodyMuted: 'text-foreground [&_p]:mb-3 [&_p:last-child]:mb-0',
    icon: (size) => (
      <Info
        className={cn(size === 'lg' ? 'h-4 w-4' : 'h-3 w-3', 'text-callout-error-icon')}
        aria-hidden
      />
    ),
  },
  info: {
    root: [
      'border-callout-primary-border bg-callout-primary-background',
      '[&_a]:text-callout-primary-title [&_a]:underline [&_a]:decoration-callout-primary-title [&_a]:underline-offset-2',
      '[&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:!bg-background/60 [&_code]:!text-callout-primary-title',
      '[&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border [&_pre]:!border-callout-primary-border [&_pre]:!bg-background/40 [&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed',
      '[&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
    ].join(' '),
    title: 'text-callout-primary-title',
    bodyMuted: 'text-foreground [&_p]:mb-3 [&_p:last-child]:mb-0',
    icon: (size) => (
      <Info
        className={cn(size === 'lg' ? 'h-4 w-4' : 'h-3 w-3', 'text-callout-primary-icon')}
        aria-hidden
      />
    ),
  },
  important: {
    root: [
      'border-violet-500/20 bg-violet-500/10',
      '[&_a]:text-violet-700 [&_a]:underline [&_a]:decoration-violet-600 [&_a]:underline-offset-2 dark:[&_a]:text-violet-300',
      '[&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:!bg-background/60 [&_code]:!text-violet-700 dark:[&_code]:!text-violet-200',
      '[&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border [&_pre]:!border-violet-500/25 [&_pre]:!bg-background/40 [&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed',
      '[&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
    ].join(' '),
    title: 'text-violet-700 dark:text-violet-200',
    bodyMuted: 'text-foreground [&_p]:mb-3 [&_p:last-child]:mb-0',
    icon: (size) => (
      <Info
        className={cn(
          size === 'lg' ? 'h-4 w-4' : 'h-3 w-3',
          'text-violet-700 dark:text-violet-200'
        )}
        aria-hidden
      />
    ),
  },
  default: {
    root: [
      'border-border bg-muted/50',
      '[&_a]:text-primary [&_a]:underline [&_a]:decoration-primary/80 [&_a]:underline-offset-2',
      '[&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em] [&_code]:!bg-muted [&_code]:!text-foreground',
      '[&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border [&_pre]:!border-border [&_pre]:!bg-muted [&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed',
      '[&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
    ].join(' '),
    title: 'text-l1-foreground',
    bodyMuted: 'text-foreground [&_p]:mb-3 [&_p:last-child]:mb-0',
    icon: (size) => (
      <Info
        className={cn(size === 'lg' ? 'h-4 w-4' : 'h-3 w-3', 'text-muted-foreground')}
        aria-hidden
      />
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

export const admonitionChevronVariants = cva('shrink-0 text-muted-foreground opacity-70', {
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
