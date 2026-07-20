'use client'

import { BsFillExclamationCircleFill } from 'react-icons/bs'
import { Callout } from '@signozhq/ui/callout'
import type { CalloutColor, CalloutProps } from '@signozhq/ui/callout'
import type { CSSProperties } from 'react'

type AdmonitionSizeVariant = 'sm' | 'lg'

export type AdmonitionProps = {
  type?: string
  title?: string
  variant?: AdmonitionSizeVariant
  defaultCollapsed?: boolean | 'true' | 'false'
  children?: React.ReactNode
  className?: string
}

type CalloutMapping = {
  type: NonNullable<CalloutProps['type']>
  color: CalloutColor
}

type ToneStyles = {
  cssVars: CSSProperties
  content: string
}

const TONE_STYLES: Record<CalloutColor, ToneStyles> = {
  robin: {
    cssVars: {
      ['--callout-title-color' as string]: 'var(--admonition-title)',
      ['--callout-icon-color' as string]: 'var(--admonition-icon)',
      ['--callout-description-color' as string]: 'var(--admonition-description)',
    },
    content: [
      '[--admonition-title:var(--callout-primary-title)] [--admonition-icon:var(--callout-primary-icon)] [--admonition-description:var(--callout-primary-description)]',
      'dark:[--admonition-title:var(--text-robin-100)] dark:[--admonition-icon:var(--text-robin-100)] dark:[--admonition-description:var(--text-robin-300)]',
      '[&_a]:!text-[var(--accent-primary)] [&_a]:underline [&_a]:decoration-[var(--accent-primary)] [&_a]:underline-offset-2',
      '[&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em]',
      '[&_code]:!bg-[var(--callout-primary-background)] [&_code]:!text-[var(--text-robin-200)]',
      '[&_.relative]:max-w-full [&_.relative]:min-w-0',
      '[&_pre]:max-w-full [&_pre]:min-w-0 [&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border',
      '[&_pre]:!border-[var(--callout-primary-border)] [&_pre]:!bg-[var(--callout-primary-background)]',
      '[&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed',
      '[&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
      '[&_ul]:marker:text-[var(--accent-primary)]',
    ].join(' '),
  },
  forest: {
    cssVars: {
      ['--callout-title-color' as string]: 'var(--admonition-title)',
      ['--callout-icon-color' as string]: 'var(--admonition-icon)',
      ['--callout-description-color' as string]: 'var(--admonition-description)',
    },
    content: [
      '[--admonition-title:var(--callout-success-title)] [--admonition-icon:var(--callout-success-icon)] [--admonition-description:var(--callout-success-description)]',
      'dark:[--admonition-title:var(--text-forest-100)] dark:[--admonition-icon:var(--text-forest-100)] dark:[--admonition-description:var(--text-forest-300)]',
      '[&_a]:!text-[var(--accent-forest)] [&_a]:underline [&_a]:decoration-[var(--accent-forest)] [&_a]:underline-offset-2',
      '[&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em]',
      '[&_code]:!bg-[var(--callout-success-background)] [&_code]:!text-[var(--text-forest-200)]',
      '[&_.relative]:max-w-full [&_.relative]:min-w-0',
      '[&_pre]:max-w-full [&_pre]:min-w-0 [&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border',
      '[&_pre]:!border-[var(--callout-success-border)] [&_pre]:!bg-[var(--callout-success-background)]',
      '[&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed',
      '[&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
      '[&_ul]:marker:text-[var(--accent-forest)]',
    ].join(' '),
  },
  amber: {
    cssVars: {
      ['--callout-title-color' as string]: 'var(--admonition-title)',
      ['--callout-icon-color' as string]: 'var(--admonition-icon)',
      ['--callout-description-color' as string]: 'var(--admonition-description)',
    },
    content: [
      '[--admonition-title:var(--callout-warning-title)] [--admonition-icon:var(--callout-warning-icon)] [--admonition-description:var(--callout-warning-description)]',
      'dark:[--admonition-title:var(--text-amber-100)] dark:[--admonition-icon:var(--text-amber-100)] dark:[--admonition-description:var(--text-amber-300)]',
      '[&_a]:!text-[var(--accent-amber)] [&_a]:underline [&_a]:decoration-[var(--accent-amber)] [&_a]:underline-offset-2',
      '[&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em]',
      '[&_code]:!bg-[var(--callout-warning-background)] [&_code]:!text-[var(--text-amber-200)]',
      '[&_.relative]:max-w-full [&_.relative]:min-w-0',
      '[&_pre]:max-w-full [&_pre]:min-w-0 [&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border',
      '[&_pre]:!border-[var(--callout-warning-border)] [&_pre]:!bg-[var(--callout-warning-background)]',
      '[&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed',
      '[&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
      '[&_ul]:marker:text-[var(--accent-amber)]',
    ].join(' '),
  },
  cherry: {
    cssVars: {
      ['--callout-title-color' as string]: 'var(--admonition-title)',
      ['--callout-icon-color' as string]: 'var(--admonition-icon)',
      ['--callout-description-color' as string]: 'var(--admonition-description)',
    },
    content: [
      '[--admonition-title:var(--callout-error-title)] [--admonition-icon:var(--callout-error-icon)] [--admonition-description:var(--callout-error-description)]',
      'dark:[--admonition-title:var(--text-cherry-100)] dark:[--admonition-icon:var(--text-cherry-100)] dark:[--admonition-description:var(--text-cherry-300)]',
      '[&_a]:!text-[var(--accent-cherry)] [&_a]:underline [&_a]:decoration-[var(--accent-cherry)] [&_a]:underline-offset-2',
      '[&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em]',
      '[&_code]:!bg-[var(--callout-error-background)] [&_code]:!text-[var(--text-cherry-200)]',
      '[&_.relative]:max-w-full [&_.relative]:min-w-0',
      '[&_pre]:max-w-full [&_pre]:min-w-0 [&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border',
      '[&_pre]:!border-[var(--callout-error-border)] [&_pre]:!bg-[var(--callout-error-background)]',
      '[&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed',
      '[&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
      '[&_ul]:marker:text-[var(--accent-cherry)]',
    ].join(' '),
  },
  aqua: {
    cssVars: {
      ['--callout-title-color' as string]: 'var(--admonition-title)',
      ['--callout-icon-color' as string]: 'var(--admonition-icon)',
      ['--callout-description-color' as string]: 'var(--admonition-description)',
    },
    content: [
      '[--admonition-title:var(--callout-aqua-title)] [--admonition-icon:var(--callout-aqua-icon)] [--admonition-description:var(--callout-aqua-description)]',
      'dark:[--admonition-title:var(--callout-aqua-title)] dark:[--admonition-icon:var(--callout-aqua-icon)] dark:[--admonition-description:var(--callout-aqua-description)]',
      '[&_a]:!text-[var(--accent-aqua)] [&_a]:underline [&_a]:decoration-[var(--accent-aqua)] [&_a]:underline-offset-2',
      '[&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em]',
      '[&_code]:!bg-[var(--callout-aqua-background)] [&_code]:!text-[var(--text-aqua-200)]',
      '[&_.relative]:max-w-full [&_.relative]:min-w-0',
      '[&_pre]:max-w-full [&_pre]:min-w-0 [&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border',
      '[&_pre]:!border-[var(--callout-aqua-border)] [&_pre]:!bg-[var(--callout-aqua-background)]',
      '[&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed',
      '[&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
      '[&_ul]:marker:text-[var(--accent-aqua)]',
    ].join(' '),
  },
  sakura: {
    cssVars: {
      ['--callout-title-color' as string]: 'var(--admonition-title)',
      ['--callout-icon-color' as string]: 'var(--admonition-icon)',
      ['--callout-description-color' as string]: 'var(--admonition-description)',
    },
    content: [
      '[--admonition-title:var(--text-sakura-600)] [--admonition-icon:var(--text-sakura-600)] [--admonition-description:var(--text-sakura-600)]',
      'dark:[--admonition-title:var(--text-sakura-100)] dark:[--admonition-icon:var(--text-sakura-100)] dark:[--admonition-description:var(--text-sakura-300)]',
      '[&_a]:!text-[var(--accent-sakura)] [&_a]:underline [&_a]:decoration-[var(--accent-sakura)] [&_a]:underline-offset-2',
      '[&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em]',
      '[&_code]:!bg-[color-mix(in_srgb,var(--accent-sakura)_10%,transparent)] [&_code]:!text-[var(--text-sakura-200)]',
      '[&_.relative]:max-w-full [&_.relative]:min-w-0',
      '[&_pre]:max-w-full [&_pre]:min-w-0 [&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border',
      '[&_pre]:!border-[color-mix(in_srgb,var(--accent-sakura)_25%,transparent)]',
      '[&_pre]:!bg-[color-mix(in_srgb,var(--accent-sakura)_10%,transparent)]',
      '[&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed',
      '[&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
      '[&_ul]:marker:text-[var(--accent-sakura)]',
    ].join(' '),
  },
}

const BASE_CONTENT_STYLES = [
  'not-prose my-4 min-w-0 max-w-full overflow-hidden rounded-[4px] p-4',
  '!items-start !gap-2.5',
  '[&>div:first-child]:!m-0 [&>div:first-child]:!flex [&>div:first-child]:!h-7 [&>div:first-child]:!w-7',
  '[&>div:first-child]:!shrink-0 [&>div:first-child]:!items-center [&>div:first-child]:!justify-center',
  '[&_[data-slot=callout-title]]:!flex [&_[data-slot=callout-title]]:!h-7 [&_[data-slot=callout-title]]:!items-center',
  '[&>button]:!m-0 [&>button]:!mt-[5px] [&>button]:!flex [&>button]:!h-[18px] [&>button]:!w-[18px]',
  '[&>button]:!shrink-0 [&>button]:!items-center [&>button]:!justify-center [&>button]:!self-start [&>button]:!p-0',
  '[&_[data-slot=callout-description]]:w-full',
  '[&_[data-slot=callout-description]]:min-w-0',
  '[&_[data-slot=callout-description]]:max-w-full',
  '[&>div]:!gap-0',
  '[&_[data-slot=callout-title]:has(+[data-slot=callout-description])]:!mb-3',
  '[&_[data-slot=callout-title]]:font-semibold',
  '[&_[data-slot=callout-title]]:text-base',
  '[&_[data-slot=callout-title]]:!leading-6',
  '[&_[data-slot=callout-title]]:whitespace-normal',
  '[&_[data-slot=callout-title]]:overflow-visible',
  '[&_[data-slot=callout-title]]:text-clip',
  '[&_[data-slot=callout-description]]:text-base',
  '[&_[data-slot=callout-description]]:!leading-6',
  '[&_[data-slot=callout-description]_p]:!leading-6',
  '[&_[data-slot=callout-description]_li]:!leading-6',
  '[&_strong]:font-bold [&_strong]:text-[inherit]',
  '[&_p]:mb-3 [&_p:last-child]:mb-0',
  '[&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul:last-child]:mb-0',
  '[&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol:last-child]:mb-0',
  '[&_li]:mb-1 [&_li:last-child]:mb-0',
].join(' ')

const getCalloutMapping = (type?: string): CalloutMapping => {
  switch (type) {
    case 'tip':
      return { type: 'success', color: 'forest' }
    case 'warning':
      return { type: 'warning', color: 'amber' }
    case 'danger':
      return { type: 'error', color: 'cherry' }
    case 'important':
      return { type: 'info', color: 'aqua' }
    case 'info':
    case 'note':
    default:
      return { type: 'info', color: 'robin' }
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

const admonitionIcon = <BsFillExclamationCircleFill aria-hidden />

const Admonition = ({
  type,
  title,
  variant,
  defaultCollapsed,
  children,
  className,
}: AdmonitionProps) => {
  const mapping = getCalloutMapping(type)
  const displayTitle = title ?? getTitle(type)
  const size = variant === 'sm' ? 'small' : 'medium'
  const isDefaultCollapsed = defaultCollapsed === true || defaultCollapsed === 'true'
  const tone = TONE_STYLES[mapping.color]

  return (
    <Callout
      title={displayTitle}
      type={mapping.type}
      color={mapping.color}
      size={size}
      showIcon
      icon={admonitionIcon}
      action="expandable"
      defaultExpanded={!isDefaultCollapsed}
      style={tone.cssVars}
      className={[BASE_CONTENT_STYLES, tone.content, className].filter(Boolean).join(' ')}
    >
      {children}
    </Callout>
  )
}

export default Admonition
