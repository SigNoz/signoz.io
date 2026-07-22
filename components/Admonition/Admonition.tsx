'use client'

import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { BsFillExclamationCircleFill } from 'react-icons/bs'
import { Callout } from '@signozhq/ui/callout'
import type { CalloutColor, CalloutProps } from '@signozhq/ui/callout'
import type { CSSProperties, MouseEvent } from 'react'

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

const CALLOUT_CSS_VARS: CSSProperties = {
  ['--callout-title-color' as string]: 'var(--admonition-title)',
  ['--callout-icon-color' as string]: 'var(--admonition-icon)',
  ['--callout-description-color' as string]: 'var(--admonition-description)',
}

const SHARED_CODE_CHROME =
  '[&_code]:rounded-[2px] [&_code]:!px-1.5 [&_code]:!py-0.5 [&_code]:font-mono [&_code]:text-[0.9em]'
const SHARED_PRE_CHROME = [
  '[&_.relative]:max-w-full [&_.relative]:min-w-0',
  '[&_pre]:max-w-full [&_pre]:min-w-0 [&_pre]:overflow-x-auto [&_pre]:rounded-[2px] [&_pre]:!border',
].join(' ')
const SHARED_PRE_BODY = [
  '[&_pre]:!p-3 [&_pre]:font-mono [&_pre]:leading-relaxed [&_pre]:!text-[var(--admonition-code)]',
  '[&_pre_code]:!bg-transparent [&_pre_code]:!p-0 [&_pre_code]:!text-inherit',
].join(' ')

type ToneTokenClasses = {
  light: string
  dark: string
  code: string
  link: string
  codeSurface: string
  preSurface: string
  listMarker: string
}

const makeTone = ({
  light,
  dark,
  code,
  link,
  codeSurface,
  preSurface,
  listMarker,
}: ToneTokenClasses): ToneStyles => ({
  cssVars: CALLOUT_CSS_VARS,
  content: [
    light,
    dark,
    code,
    link,
    SHARED_CODE_CHROME,
    codeSurface,
    SHARED_PRE_CHROME,
    preSurface,
    SHARED_PRE_BODY,
    listMarker,
  ].join(' '),
})

const TONE_STYLES: Record<CalloutColor, ToneStyles> = {
  robin: makeTone({
    light:
      '[--admonition-title:var(--callout-primary-title)] [--admonition-icon:var(--callout-primary-icon)] [--admonition-description:var(--callout-primary-description)]',
    dark: 'dark:[--admonition-title:var(--text-robin-100)] dark:[--admonition-icon:var(--text-robin-100)] dark:[--admonition-description:var(--text-robin-300)]',
    code: '[--admonition-code:var(--text-robin-700)] dark:[--admonition-code:var(--text-robin-200)]',
    link: '[&_a]:!text-[var(--accent-primary)] [&_a]:underline [&_a]:decoration-[var(--accent-primary)] [&_a]:underline-offset-2',
    codeSurface:
      '[&_code]:!bg-[var(--callout-primary-background)] [&_code]:!text-[var(--admonition-code)]',
    preSurface:
      '[&_pre]:!border-[var(--callout-primary-border)] [&_pre]:!bg-[var(--callout-primary-background)]',
    listMarker: '[&_ul]:marker:text-[var(--accent-primary)]',
  }),
  forest: makeTone({
    light:
      '[--admonition-title:var(--callout-success-title)] [--admonition-icon:var(--callout-success-icon)] [--admonition-description:var(--callout-success-description)]',
    dark: 'dark:[--admonition-title:var(--text-forest-100)] dark:[--admonition-icon:var(--text-forest-100)] dark:[--admonition-description:var(--text-forest-300)]',
    code: '[--admonition-code:var(--text-forest-700)] dark:[--admonition-code:var(--text-forest-200)]',
    link: '[&_a]:!text-[var(--accent-forest)] [&_a]:underline [&_a]:decoration-[var(--accent-forest)] [&_a]:underline-offset-2',
    codeSurface:
      '[&_code]:!bg-[var(--callout-success-background)] [&_code]:!text-[var(--admonition-code)]',
    preSurface:
      '[&_pre]:!border-[var(--callout-success-border)] [&_pre]:!bg-[var(--callout-success-background)]',
    listMarker: '[&_ul]:marker:text-[var(--accent-forest)]',
  }),
  amber: makeTone({
    light:
      '[--admonition-title:var(--callout-warning-title)] [--admonition-icon:var(--callout-warning-icon)] [--admonition-description:var(--callout-warning-description)]',
    dark: 'dark:[--admonition-title:var(--text-amber-100)] dark:[--admonition-icon:var(--text-amber-100)] dark:[--admonition-description:var(--text-amber-300)]',
    code: '[--admonition-code:var(--text-amber-800)] dark:[--admonition-code:var(--text-amber-200)]',
    link: '[&_a]:!text-[var(--accent-amber)] [&_a]:underline [&_a]:decoration-[var(--accent-amber)] [&_a]:underline-offset-2',
    codeSurface:
      '[&_code]:!bg-[var(--callout-warning-background)] [&_code]:!text-[var(--admonition-code)]',
    preSurface:
      '[&_pre]:!border-[var(--callout-warning-border)] [&_pre]:!bg-[var(--callout-warning-background)]',
    listMarker: '[&_ul]:marker:text-[var(--accent-amber)]',
  }),
  cherry: makeTone({
    light:
      '[--admonition-title:var(--callout-error-title)] [--admonition-icon:var(--callout-error-icon)] [--admonition-description:var(--callout-error-description)]',
    dark: 'dark:[--admonition-title:var(--text-cherry-100)] dark:[--admonition-icon:var(--text-cherry-100)] dark:[--admonition-description:var(--text-cherry-300)]',
    code: '[--admonition-code:var(--text-cherry-700)] dark:[--admonition-code:var(--text-cherry-200)]',
    link: '[&_a]:!text-[var(--accent-cherry)] [&_a]:underline [&_a]:decoration-[var(--accent-cherry)] [&_a]:underline-offset-2',
    codeSurface:
      '[&_code]:!bg-[var(--callout-error-background)] [&_code]:!text-[var(--admonition-code)]',
    preSurface:
      '[&_pre]:!border-[var(--callout-error-border)] [&_pre]:!bg-[var(--callout-error-background)]',
    listMarker: '[&_ul]:marker:text-[var(--accent-cherry)]',
  }),
  aqua: makeTone({
    light:
      '[--admonition-title:var(--callout-aqua-title)] [--admonition-icon:var(--callout-aqua-icon)] [--admonition-description:var(--callout-aqua-description)]',
    dark: 'dark:[--admonition-title:var(--callout-aqua-title)] dark:[--admonition-icon:var(--callout-aqua-icon)] dark:[--admonition-description:var(--callout-aqua-description)]',
    code: '[--admonition-code:var(--text-aqua-700)] dark:[--admonition-code:var(--text-aqua-200)]',
    link: '[&_a]:!text-[var(--accent-aqua)] [&_a]:underline [&_a]:decoration-[var(--accent-aqua)] [&_a]:underline-offset-2',
    codeSurface:
      '[&_code]:!bg-[var(--callout-aqua-background)] [&_code]:!text-[var(--admonition-code)]',
    preSurface:
      '[&_pre]:!border-[var(--callout-aqua-border)] [&_pre]:!bg-[var(--callout-aqua-background)]',
    listMarker: '[&_ul]:marker:text-[var(--accent-aqua)]',
  }),
  sakura: makeTone({
    light:
      '[--admonition-title:var(--text-sakura-600)] [--admonition-icon:var(--text-sakura-600)] [--admonition-description:var(--text-sakura-600)]',
    dark: 'dark:[--admonition-title:var(--text-sakura-100)] dark:[--admonition-icon:var(--text-sakura-100)] dark:[--admonition-description:var(--text-sakura-300)]',
    code: '[--admonition-code:var(--text-sakura-700)] dark:[--admonition-code:var(--text-sakura-200)]',
    link: '[&_a]:!text-[var(--accent-sakura)] [&_a]:underline [&_a]:decoration-[var(--accent-sakura)] [&_a]:underline-offset-2',
    codeSurface:
      '[&_code]:!bg-[color-mix(in_srgb,var(--accent-sakura)_10%,transparent)] [&_code]:!text-[var(--admonition-code)]',
    preSurface:
      '[&_pre]:!border-[color-mix(in_srgb,var(--accent-sakura)_25%,transparent)] [&_pre]:!bg-[color-mix(in_srgb,var(--accent-sakura)_10%,transparent)]',
    listMarker: '[&_ul]:marker:text-[var(--accent-sakura)]',
  }),
}

const BASE_CONTENT_STYLES = [
  'min-w-0 max-w-full overflow-hidden rounded-[4px] p-4',
  '!items-start !gap-2.5',
  '[&>div:first-child]:!m-0 [&>div:first-child]:!flex [&>div:first-child]:!h-7 [&>div:first-child]:!w-7',
  '[&>div:first-child]:!shrink-0 [&>div:first-child]:!items-center [&>div:first-child]:!justify-center',
  '[&_[data-slot=callout-title]]:!flex [&_[data-slot=callout-title]]:!h-7 [&_[data-slot=callout-title]]:!w-full',
  '[&_[data-slot=callout-title]]:!items-center [&_[data-slot=callout-title]]:!justify-between [&_[data-slot=callout-title]]:!gap-3',
  '[&_[data-slot=callout-description]]:w-full',
  '[&_[data-slot=callout-description]]:min-w-0',
  '[&_[data-slot=callout-description]]:max-w-full',
  '[&>div]:!gap-0',
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

const TITLE_TOGGLE_STYLES = [
  'flex h-full w-full min-w-0 cursor-pointer items-center justify-between gap-3',
  'border-0 bg-transparent p-0 text-left font-inherit text-inherit',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admonition-icon)] focus-visible:ring-offset-2',
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
  // Own collapse state so body always stays in the DOM (SSR + hide), unlike Callout expandable
  const [isCollapsed, setIsCollapsed] = useState(isDefaultCollapsed)
  const tone = TONE_STYLES[mapping.color]
  const descriptionId = useId()

  const toggleCollapsed = () => setIsCollapsed((prev) => !prev)

  const handleIconClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    if (target.closest('[data-slot=callout-description]')) return
    if (target.closest('button')) return
    if (target.closest('[data-slot=callout] > div:first-child')) {
      toggleCollapsed()
    }
  }

  return (
    <div className="not-prose my-4" onClick={handleIconClick}>
      <Callout
        title={
          <button
            type="button"
            className={TITLE_TOGGLE_STYLES}
            aria-expanded={!isCollapsed}
            aria-controls={descriptionId}
            onClick={toggleCollapsed}
          >
            <span className="min-w-0 flex-1">{displayTitle}</span>
            <ChevronDown
              aria-hidden
              className={[
                'h-[18px] w-[18px] shrink-0 opacity-50 transition-transform duration-200',
                isCollapsed ? 'rotate-0' : 'rotate-180',
              ].join(' ')}
            />
          </button>
        }
        type={mapping.type}
        color={mapping.color}
        size={size}
        showIcon
        icon={admonitionIcon}
        action="none"
        style={tone.cssVars}
        className={[
          BASE_CONTENT_STYLES,
          !isCollapsed && '[&_[data-slot=callout-title]]:!mb-3',
          isCollapsed && '[&_[data-slot=callout-description]]:!hidden',
          tone.content,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div id={descriptionId}>{children}</div>
      </Callout>
    </div>
  )
}

export default Admonition
